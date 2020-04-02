---
outputFileName: index.html
---

# Internal architectural overview

<!-- TODO:  Overview image or intro? -->

## Messaging

The architecture style of Event Store is [SEDA (Staged Event Driven Architecture)](https://en.wikipedia.org/wiki/Staged_event-driven_architecture). Messages flow forward through queues internally, including the transaction file, which is also a queue. There are communication endpoints that flow forward through series of queues to be processed. All operations are purely asynchronous. The core processing runs on a single thread reading requests off of a single concurrent queue.

Messages first flow through a state machine that represents the state of the node. In a distributed scenario a node is not always allowed to write (slaves forward writes, not write themselves), or if the node is still initializing its not allowed to read. Each request is handled by a state machine that manages the lifecycle of that request including time outs and acknowledgements throughout the cluster.

Because of this architecture, the main monitoring points of Event Store is the status of the queues. You can view the status in the _health_ area of the admin interface or through the HTTP API. It's also periodically written to a special `$statistics-node:port` stream.

<!-- TODO: Which endpoint -->
<!-- TODO:  IMAGE(s)-->

The most common queue to be slow is the storage writer as it writes to storage in a durable fashion. It uses `fsync` and `flushfile` buffers to ensure that data is persisted to disk and survives, say, a power outage on the machine. The storage writer is capable of writing more than 15,000 transactions to disk per second on the open source single node version.

## Transaction file

Event Store provides durable storage including handling cases where the power may be turned off to a machine through the use of a commit log. The commit log is a conceptual constantly appending file (though it is not implemented this way <!-- TODO:  This is confusing, link to more details? -->). Every write to Event Store appends to this file.

The commit log is built not as one large file but as a series of small files implemented with an abstraction called a 'TFChunk'. For all files it writes, Event Store always writes sequentially, except for checkpoints, although there is a non-performing sequential version of checkpoints.

This results in seeks not being necessary for writes. While less of a problem with SSDs, this can drastically help with performance of spindle drives. It also allows for the possibility to store data for Event Store (both indexes and the transaction file) on write once media.

Entire TFChunks are cached by loading the entire chunk into unmanaged memory. Most of the memory usage by Event Store is unmanaged. It's rare to see it use more than a few hundred megabytes in managed heaps. Even in these scenarios most of the memory is in the large object heap (LOH) and point to native types such as `byte[]` to put a minimum load possible on the garbage collector.

## Scavenging

The chunks in the transaction file are periodically scavenged to remove deleted or old data, and depending on stream rules such as `$maxCount` in the stream metadata, can be compacted.

This process generates new chunks and switches them out atomically, deleting them once they are no longer in use by readers. This gives the benefit that, once completed, TFChunks are immutable. This includes the current chunk. Since it's only written to sequentially it never seeks back to overwrite something.

Every record in the log has an ID. The ID is the logical position at which the record was originally written to disk. This is useful as an identifier, as in a scenario where you are not deleting you know exactly where the record is stored.

When you begin scavenging this location can move. As part of the process of scavenging a TFChunk, a map is written of remappings from the original IDs. This is crucial because index points back to these IDs. This map allows the index and the TFChunks to be scavenged independently. If, during the scavenge process, the overhead of the map outweighs the benefit of the scavenge the scavenge is not performed.

Chunks that are completed also have an MD5 checksum to validate the data inside of them since disks do occasionally go bad or mangle data. This checksum is checked periodically to validate that the data is not corrupted.

## Index

Event Store only has one index. You should use projections for building application level indexes. The index is immutable.

Queries executed against Event Store are always to get an event represented as a sequence number inside of a stream. The index is optimized for this purpose.

Each record in the index is 16 bytes:

-   4 bytes for the hash of the stream ID.
-   4 bytes for the sequence number.
-   8 bytes for the original position the record had in the log.

This identifier of a record is useful as you can avoid additional lookups when writing the record to disk, this can change due to scavenging of the transaction file.

As transactions are written to the transaction file, where an in-memory index is appended. A query hits the in memory index. The in-memory index is implemented as a hash of sorted lists with a fine grained lock on the stream.

When there are enough items in the in-memory index, the index is flushed to disk (known as a 'PTable' or 'Persistent Table'). A PTable is a sorted group of index entries (remember that they are only 16 bytes each). A binary search across the PTables is used to search. The search function has been [memoized](https://en.wikipedia.org/wiki/Memoization) by storing midpoints in memory. Mid point caching reduces the number of seeks from log(n) by the depth to which midpoints are filled and often all are in memory.

## Index rebuilds

You can copy indexes from machine to machine providing the data structure is the same. This guide explains how the index rebuild process works when you add new nodes to a cluster, or backup and restore an index.

TFiles make up a transaction log, but conceptually they are one continuous file. Event Store breaks them up into many files instead of one big file for operational reasons such as incremental back ups. This mechanism also tends to play better with the filesystem.

Rebuilding an index requires starting from position 0 in this large continuous file and then moving forward indexing every item one at a time.

### Rebuilds on a new node

When Event Store starts on a blank machine there are no persistent indexes, there is only a memtable (in memory index). There is a limit to how many items the memory index can store (1 million). When an index hits this number, the index is then moved to a disk based format known as a PTable. Event Store stores what the position was in the TFile for what the PTable represents. In a single index file example it may be `0,12345678` meaning the index covers all transactions between positions `0` and `12345678`.

When Event Store loads the index, it calculates the position that the persistent index covers, in this example, `12345678`.

After loading the index, Event Store then knows that the index covers all events before positions `12345678`, and does not need to take them into account. Event Store then rebuilds the memory index from position `12345678` up to the current, which you can see in log output when Event Store starts.

PTables get merged into larger PTables over time. During this operation they are scavenged for items to be removed. The merging of N PTables to one larger PTable is a linear operation as they are all sorted. Once written to disk, PTables are immutable and have like TFchunks MD5 checksums. Unlike a failure in a TFChunk checksum, if a problem is found within the index it is simply rebuilt.

### Backup and restore

When it comes to restoring Event Store from a backup, Event Store loads the persistent indexes, and finds out the highest logical position covered in the index. Event Store then creates a memtable from that point forward, this process is asynchronous and does not hold up start up.