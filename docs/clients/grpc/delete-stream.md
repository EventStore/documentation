# Deleting events

In EventStoreDB, you can delete events and streams either partially or completely. Settings like $maxAge and $maxCount help control how long events are kept or how many events are stored in a stream, but they won't delete the entire stream.
When you need to fully remove a stream, EventStoreDB offers two options: Soft Delete and Hard Delete.

## Soft Delete

Soft delete in EventStoreDB allows you to mark a stream for deletion without completely removing it, so you can still add new events later. While you can do this through the UI, using code is often better for automating the process,
handling many streams at once, or including custom rules. Code is especially helpful for large-scale deletions or when you need to integrate soft deletes into other workflows.

:::: code-group
::: code-group-item Python
```:no-line-numbers
 client.delete_stream(stream_name, current_version=6)
```
:::
::: code-group-item JavaScript
```:no-line-numbers
 await client.deleteStream(streamName);
```
:::
::: code-group-item TypeScript
```:no-line-numbers
 await client.deleteStream(streamName);
```
:::
::: code-group-item Java
```:no-line-numbers
 client.deleteStream(streamName, DeleteStreamOptions.get()).get();
```
:::
::: code-group-item C#
```:no-line-numbers
 await client.DeleteAsync(streamName, StreamState.Any);
```
:::
::: code-group-item Go
```:no-line-numbers
 options := esdb.DeleteStreamOptions{
    ExpectedRevision: esdb.Any{},
 }

 _, err = client.DeleteStream(context.Background(), streamName, options)
```
:::
::: code-group-item Rust
```:no-line-numbers
 let options = DeleteStreamOptions::default();
    
 client
    .delete_stream(stream_name, &options)
    .await?;
```
:::
::::

> **Note:** Clicking the delete button in the UI performs a soft delete, setting the TruncateBefore value to remove all events up to a certain point. While this marks the events for deletion, actual removal occurs during the next scavenging process. The stream can still be reopened by appending new events.

> **Note:** To perform a soft delete using HTTP API, please refer to this link [https://developers.eventstore.com/http-api/v24.6/#soft-deleting](https://developers.eventstore.com/http-api/v24.6/#soft-deleting).

---

## Hard Delete

Hard delete in EventStoreDB permanently removes a stream and its events. While you can use the HTTP API, code is often better for automating the process, managing multiple streams, and ensuring precise control. Code is especially useful when you need to integrate hard delete into larger workflows or apply specific conditions.

:::: code-group
::: code-group-item Python
```:no-line-numbers
 client.tombstone_stream(stream_name, current_version=4)
```
:::
::: code-group-item JavaScript
```:no-line-numbers
 await client.tombstoneStream(streamName);
```
:::
::: code-group-item TypeScript
```:no-line-numbers
 await client.tombstoneStream(streamName);
```
:::
::: code-group-item Java
```:no-line-numbers
  client.tombstoneStream(streamName, DeleteStreamOptions.get()).get();
```
:::
::: code-group-item C#
```:no-line-numbers
 await client.TombstoneAsync(streamName, StreamState.Any);
```
:::
::: code-group-item Go
```:no-line-numbers
 options := esdb.TombstoneStreamOptions{
   ExpectedRevision: esdb.Any{},
 }

 _, err = client.TombstoneStream(context.Background(), streamName, options)
```
:::
::: code-group-item Rust
```:no-line-numbers
 let options = TombstoneStreamOptions::default();

 client
   .tombstone_stream(stream_name, &options)
   .await?;
```
:::
::::

---

> **Note:** To perform a hard delete using HTTP API, please refer to this link [https://developers.eventstore.com/http-api/v24.6/#hard-deleting](https://developers.eventstore.com/http-api/v24.6/#hard-deleting).