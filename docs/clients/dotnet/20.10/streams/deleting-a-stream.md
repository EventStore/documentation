# Deleting a stream

## Soft delete

```csharp
Task<DeleteResult> DeleteStreamAsync(string stream, long expectedVersion, UserCredentials userCredentials = null);
```

<!-- TODO: Need a better explanation -->

By default when you delete a stream, EventStoreDB soft deletes it. You can recreate the stream by appending new events to it. If you try to read a soft deleted stream you receive an error response.

## Hard Delete

You can hard delete a stream.

::: warning
A hard delete is permanent and the stream is not removed during a scavenge. If you hard delete a stream, you cannot recreate the stream.
:::

```csharp
Task<DeleteResult> DeleteStreamAsync(string stream, long expectedVersion, bool hardDelete, UserCredentials userCredentials = null);
```
