---
outputFileName: index.html
---

# Stream metadata

Every stream in Event Store has metadata stream associated with it, prefixed by `$$`, so the metadata stream from a stream called `foo` is `$$foo`. Internally, the metadata includes information such as the ACL of the stream and the maximum count and age for the events in the stream. Client code can also put information into stream metadata for use with projections or through the client API.

This information is not part of the actual event but is metadata associated with the event. Event Store stores stream metadata as JSON, and you can access it over the HTTP APIs.

## Read stream metadata

To read stream metadata over the .NET API you can use methods found on the `EventStoreConnection`. You can use the `GetStreamMetadata` methods in two ways. The first is to return a fluent interface over the stream metadata, and the second is to return you the raw JSON of the stream metadata.

```csharp
Task<StreamMetadataResult> GetStreamMetadataAsync(string stream, UserCredentials userCredentials = null)
```

This returns a `StreamMetadataResult`. The fields on this result are:

| Member                    | Description                                              |
| ------------------------- | -------------------------------------------------------- |
| `string Stream`           | The name of the stream                                   |
| `bool IsStreamDeleted`    | `true` is the stream is deleted, `false` otherwise.      |
| `long MetastreamVersion`  | The version of the metastream format                     |
| `StreamMetadata Metadata` | A `StreamMetadata` object representing the metadata JSON |

You can then access the `StreamMetadata` via the `StreamMetadata` object. It contains typed fields for well known stream metadata entries.

| Member                   | Description                                                                                                                                                                                                                                                                   |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `long? MaxAge`           | The maximum age of events in the stream. Items older than this will be automatically removed.                                                                                                                                                                                 |
| `long? MaxCount`         | The maximum count of events in the stream. When you have more than count the oldest will be removed.                                                                                                                                                                          |
| `long? TruncateBefore`   | When set says that items prior to event 'E' can be truncated and will be removed.                                                                                                                                                                                             |
| `TimeSpan? CacheControl` | The head of a feed in the atom api is not cacheable. This allows you to specify a period of time you want it to be cacheable. Low numbers are best here (say 30-60 seconds) and introducing values here will introduce latency over the atom protocol if caching is occuring. |
| `StreamAcl Acl`          | The access control list for this stream.                                                                                                                                                                                                                                      |

If instead you want to work with raw JSON you can use the raw methods for stream metadata.

```csharp
Task<RawStreamMetadataResult> GetStreamMetadataAsRawBytesAsync(string stream, UserCredentials userCredentials = null)
```

This returns a `RawStreamMetadataResult`. The fields on this result are:

| Member                   | Description                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `string Stream`          | The name of the stream                                                                            |
| `bool IsStreamDeleted`   | True is the stream is deleted, false otherwise.                                                   |
| `long MetastreamVersion` | The version of the metastream (see [Expected Version](optimistic-concurrency-and-idempotence.md)) |
| `byte[] Metadata`        | The raw data of the metadata JSON                                                                 |

> [!NOTE]
> If you enabled [enabled security](~/dotnet-api/connecting-to-a-server.md), reading metadata may require that you pass credentials. By default it is only allowed for admins though you can change this via default ACLs. If you do not pass credentials and they are required you will receive an `AccessedDeniedException`.

## Writing metadata

You can write metadata in both a typed and a raw mechanism. When writing it is generally easier to use the typed mechanism. Both writing mechanisms support an `expectedVersion` which works the same as on any stream and you can use to control concurrency, read [Expected Version](~/dotnet-api/optimistic-concurrency-and-idempotence.md) for further details.

```csharp
Task<WriteResult> SetStreamMetadataAsync(string stream, long expectedMetastreamVersion, StreamMetadata metadata, UserCredentials userCredentials = null)
```

The `StreamMetadata` passed above has a builder that you can access via the `StreamMetadata.Create()` method. The options available on the builder are:

| Method                                        | Description                                                                                                                                                                            |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SetMaxCount(long count)`                     | Sets the maximum count of events in the stream.                                                                                                                                        |
| `SetMaxAge(TimeSpan age)`                     | Sets the maximum age of events in the stream.                                                                                                                                          |
| `SetTruncateBefore(long seq)`                 | Sets the event number from which previous events can be scavenged.\<                                                                                                                   |
| `SetCacheControl(TimeSpan cacheControl)`      | The amount of time the stream head is cachable.                                                                                                                                        |
| `SetReadRoles(string[] roles)`                | Sets the roles allowed to read the underlying stream.                                                                                                                                  |
| `SetWriteRoles(string[] roles)`               | Sets the roles allowed to write to the underlying stream.                                                                                                                              |
| `SetDeleteRoles(string[] roles)`              | Sets the roles allowed to delete the underlying stream.                                                                                                                                |
| `SetMetadataReadRoles(string[] roles)`        | Sets the roles allowed to read the metadata stream.                                                                                                                                    |
| `SetMetadataWriteRoles(string[] roles)`       | Sets the roles allowed to write the metadata stream. Be careful with this privilege as it gives all the privileges for a stream as that use can assign themselves any other privilege. |
| `SetCustomMetadata(string key, string value)` | The SetCustomMetadata method and overloads allow the setting of arbitrary custom fields into the stream metadata.                                                                      |

You can add user-specified metadata via the `SetCustomMetadata` overloads. Some examples of good uses of user-specified metadata are:

-   which adapter is responsible for populating a stream.
-   which projection caused a stream to be created.
-   a correlation ID of some business process.

```csharp
Task<WriteResult> SetStreamMetadataAsync(string stream, long expectedMetastreamVersion, byte[] metadata, UserCredentials userCredentials = null)
```

This method will put the data that is in metadata as the stream metadata. Metadata in this case can be anything in a vector of bytes. The server only understands JSON. Read [Access Control Lists](~/server/users-and-access-control-lists.md) for more information on the format in JSON for access control lists.

> [!NOTE]
> Writing metadata may require that you pass credentials if you have security enabled by default it is only allowed for admins though you can change this via default ACLs. If you do not pass credentials and they are required you will receive an `AccessedDeniedException`.
