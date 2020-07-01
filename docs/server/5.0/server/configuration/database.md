# Database settings

## Db

--db=VALUE<br/> | DB | Db | The path the db should be loaded/saved to. (Default: [See default directories](operations/default-directories.md)) |

## MemDb

--mem-db=VALUE<br/> | MEM_DB | MemDb | Keep everything in memory, no directories or files are created. (Default: False) |

## SkipDbVerify

--skip-db-verify=VALUE<br/> | SKIP_DB_VERIFY | SkipDbVerify | Bypasses the checking of file hashes of database during startup (allows for faster startup). (Default: False) |

## MinFlushDelayMs

--min-flush-delay-ms=VALUE<br/> | MIN_FLUSH_DELAY_MS | MinFlushDelayMs | The minimum flush delay in milliseconds. (Default: 2) |

## ???

| -CachedChunks<br/>--cached-chunks=VALUE<br/> | CACHED_CHUNKS | CachedChunks | The number of chunks to cache in unmanaged memory. (Default: -1, or all) |
| -ReaderThreadsCount<br/>--reader-threads-count=VALUE<br/> | READER_THREADS_COUNT | ReaderThreadsCount | The number of reader threads to use for processing reads. (Default: 4) |
| -ChunksCacheSize<br/>--chunks-cache-size=VALUE<br/> | CHUNKS_CACHE_SIZE | ChunksCacheSize | The amount of unmanaged memory to use for caching chunks in bytes. (Default: 536871424) |
| -HashCollisionReadLimit<br/>--hash-collision-read-limit=VALUE<br/> | HASH_COLLISION_READ_LIMIT | HashCollisionReadLimit | The number of events to read per candidate in the case of a hash collision (Default: 100) |

## Prepare and Commit timeout

Having a prepare and commit timeout of 2000 ms (default) means that any write done on the cluster may take up to 2000 ms before the server replies to the client that this write has timed out.

Depending on your client operation timeout settings (default is 7 seconds), increasing the timeout may block a client for up to the minimum of those two timeouts and thus this may reduce the throughput if set to a large value. The server also needs to keep track of all these writes and retries in memory until the time out is over and if a large number of them accumulate over time it may slow things down.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--prepare-timeout-ms` |
| YAML                 | `PrepareTimeoutMs` |
| Environment variable | `EVENTSTORE_PREPARE_TIMEOUT_MS` |

**Default**: `2000` (in milliseconds)

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--commit-out-of-order-projections` |
| YAML                 | `CommitTimeoutMs` |
| Environment variable | `EVENTSTORE_COMMIT_TIMEOUT_MS` |

**Default**: `2000` (in milliseconds)

## ???

| -WriteThrough<br/>--write-through=VALUE<br/> | WRITE_THROUGH | WriteThrough | Enables Write Through when writing to the file system, this bypasses filesystem caches. (Default: False) |
| -Unbuffered<br/>--unbuffered=VALUE<br/> | UNBUFFERED | Unbuffered | Enables Unbuffered/DirectIO when writing to the file system, this bypasses filesystem caches. (Default: False)   |

## Unsafe??

### Disable flush to disk

::: warning
Using this option might cause data loss.
:::

This will prevent EventStoreDB from forcing the flush to disk after writes. Please note that this is unsafe in case of a power outage.

With this option enabled, EventStoreDB will still write data to the disk at the application level but not necessarily at the OS level. Usually, the OS should flush its buffers at regular intervals or when a process exits but it is something that's opaque to EventStoreDB.

| -UnsafeDisableFlushToDisk<br/>--unsafe-disable-flush-to-disk=VALUE<br/> | UNSAFE_DISABLE_FLUSH_TO_DISK | UnsafeDisableFlushToDisk | Disable flushing to disk. (UNSAFE: on power off) (Default: False) |

**Default**: `false`

## Candidates for removal

| -BetterOrdering<br/>--better-ordering=VALUE<br/> | BETTER_ORDERING | BetterOrdering | Enable Queue affinity on reads during write process to try to get better ordering. (Default: False) |
