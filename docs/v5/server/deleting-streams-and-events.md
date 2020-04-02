---
outputFileName: index.html
---

# Deleting streams and events

Meta data in Event Store defines whether an event is deleted or not. You can use [stream metadata](~/dotnet-api/stream-metadata.md) such as `TruncateBefore`, `MaxAge` and `MaxCount` to filter events considered deleted. When reading a stream, the index checks the stream's metadata to determine whether any of its events have been deleted.

`$all` bypasses the index, meaning that it does not check the metadata to determine whether events exist or not. As such, events that have been deleted are still be readable until a scavenge has removed them. There are requirements for a scavenge to successfully remove events, for more information about this, read the [scavenging guide](~/server/scavenging.md).

> [!WARNING]
> The last event in a stream is always kept as a record of the last event number in the stream.

### Soft delete and `TruncateBefore`

`TruncateBefore` and `$tb` considers any event with an event number lower than its value as deleted.
For example, if you had the following events in a stream :

```text
0@test-stream
1@test-stream
2@test-stream
3@test-stream
```

If you set the `TruncateBefore` or `$tb` value to 3, a read of the stream would result in only reading the last event:

```text
3@test-stream
```

A **Soft delete** makes use of `TruncateBefore` and `$tb`. When you delete a stream, its `TruncateBefore` or `$tb` is set to the streams current last event number. When you read a soft deleted stream, the read returns a `StreamNotFound` or `404` result.
After deleting the stream, you are able to write to it again, continuing from where it left off.

For example, if you soft deleted the above example stream, the `TruncateBefore` or `$tb` is set to 3 (the stream's current event number). If you were to write to the stream again, the next event is written with event number 4. Only events from event number 4 onwards are visible when you read this stream.

### Max count and Max age

**Max count** (`$maxCount` and `MaxCount`) limits the number of events that you can read from a stream. If you try to read a stream that has a max count of 5, you are only able to read the last 5 events, regardless of how many events are in the stream.

**Max age** (`$maxAge` and `MaxAge`) specifies the number of seconds an event can live for. The age is calculated at the time of the read. So if you read a stream with a `MaxAge` of 3 minutes and one of the events in the stream has existed for 4 minutes at the time of the read, it is not returned.

## Hard delete

A **hard delete** writes a `tombstone` event to the stream, permanently deleting it. You cannot recreate the stream, or write to it again. Tombstone events are written with the event type `$streamDeleted`. When you read a hard deleted stream, the read returns a `StreamDeleted` or `410` result.

The events in the deleted stream are liable to be removed in a scavenge, but the tombstone event remains.

> [!WARNING]
> A hard delete of a stream is permanent. You cannot write to the stream or recreate it. As such, you should generally soft delete streams unless you have a specific need to permanently delete the stream.

## Deleted events and projections

If you are intending on using projections and deleting streams, there are some things to take into consideration:

- Due to the nature of `$all`, projections using `fromAll` read any deleted events that have not been scavenged. They also receive any tombstone events from hard deletes.
- Projections that read from a specific stream receive that stream's metadata events. You can filter these out by ignoring events with an event type `$metadata`.
