# Deleting events

In KurrentDB, you can delete events and streams either partially or completely. Settings like $maxAge and $maxCount help control how long events are kept or how many events are stored in a stream, but they won't delete the entire stream.
When you need to fully remove a stream, KurrentDB offers two options: Soft Delete and Hard Delete.

## Soft delete

Soft delete in KurrentDB allows you to mark a stream for deletion without completely removing it, so you can still add new events later. While you can do this through the UI, using code is often better for automating the process,
handling many streams at once, or including custom rules. Code is especially helpful for large-scale deletions or when you need to integrate soft deletes into other workflows.

::: tabs#lang
@tab Python
```python
client.delete_stream(stream_name, current_version=6)
```
@tab JavaScript
```javascript
await client.deleteStream(streamName);
```
@tab TypeScript
```typescript
await client.deleteStream(streamName);
```
@tab Java
```java
client.deleteStream(streamName, DeleteStreamOptions.get()).get();
```
@tab C##
```csharp
await client.DeleteAsync(streamName, StreamState.Any);
```
@tab Go
```go
options := esdb.DeleteStreamOptions{
    ExpectedRevision: esdb.Any{},
}
_, err = client.DeleteStream(context.Background(), streamName, options)
```
@tab Rust
```rust
let options = DeleteStreamOptions::default();
client
    .delete_stream(stream_name, &options)
    .await?;
```
:::

::: note 
Clicking the delete button in the UI performs a soft delete, 
setting the TruncateBefore value to remove all events up to a certain point. 
While this marks the events for deletion, actual removal occurs during the next scavenging process. 
The stream can still be reopened by appending new events.
:::

## Hard delete

Hard delete in KurrentDB permanently removes a stream and its events. While you can use the HTTP API, code is often better for automating the process, managing multiple streams, and ensuring precise control. Code is especially useful when you need to integrate hard delete into larger workflows or apply specific conditions. Note that when a stream is hard deleted, you cannot reuse the stream name, it will raise an exception if you try to append to it again.

::: tabs#lang
@tab Python
```python
client.tombstone_stream(stream_name, current_version=4)
```
@tab JavaScript
```javascript
await client.tombstoneStream(streamName);
```
@tab TypeScript
```typescript
await client.tombstoneStream(streamName);
```
@tab Java
```java
client.tombstoneStream(streamName, DeleteStreamOptions.get()).get();
```
@tab C##
```csharp
await client.TombstoneAsync(streamName, StreamState.Any);
```
@tab Go
```go
options := esdb.TombstoneStreamOptions{
    ExpectedRevision: esdb.Any{},
}
_, err = client.TombstoneStream(context.Background(), streamName, options)
```
@tab Rust
```rust
let options = TombstoneStreamOptions::default();
client
    .tombstone_stream(stream_name, &options)
    .await?;
```
:::