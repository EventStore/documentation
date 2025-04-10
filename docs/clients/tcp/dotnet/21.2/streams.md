---
order: 7
sitemap:
  priority: 0.1
  changefreq: monthly
---

# Stream metadata

Every stream in EventStoreDB has metadata stream associated with it, prefixed by `$$`, so the metadata stream from a stream called `foo` is `$$foo`. Internally, the metadata includes information such as the ACL of the stream and the maximum count and age for the events in the stream. Client code can also put information into stream metadata for use with projections or through the client API.

This information is not part of the actual event but is metadata associated with the event. EventStoreDB stores stream metadata as JSON, and you can access it over the HTTP APIs.

## Read stream metadata

To read stream metadata over the .NET API you can use methods found on the `EventStoreConnection`. You can use the `GetStreamMetadata` methods in two ways. The first is to return a fluent interface over the stream metadata, and the second is to return you the raw JSON of the stream metadata.

```csharp
Task<StreamMetadataResult> GetStreamMetadataAsync(
    string stream, UserCredentials userCredentials = null
);
```

This returns a `StreamMetadataResult`. The fields on this result are:

| Member                    | Description                                              |
|:--------------------------|:---------------------------------------------------------|
| `string Stream`           | The name of the stream                                   |
| `bool IsStreamDeleted`    | `true` is the stream is deleted, `false` otherwise.      |
| `long MetastreamVersion`  | The version of the metastream format                     |
| `StreamMetadata Metadata` | A `StreamMetadata` object representing the metadata JSON |

You can then access the `StreamMetadata` via the `StreamMetadata` object. It contains typed fields for well known stream metadata entries.

| Member | Description |
|:-------|:------------|
| `long? MaxAge` | The maximum age of events in the stream. Items older than this will be automatically removed. |
| `long? MaxCount` | The maximum count of events in the stream. When you have more than count the oldest will be removed. |
| `long? TruncateBefore` | When set says that items prior to event 'E' can be truncated and will be removed. |
| `TimeSpan? CacheControl` | The head of a feed in the atom api is not cacheable. This allows you to specify a period of time you want it to be cacheable. Low numbers are best here (say 30-60 seconds) and introducing values here will introduce latency over the atom protocol if caching is occurring. |
| `StreamAcl Acl` | The access control list for this stream. |

If instead you want to work with raw JSON you can use the raw methods for stream metadata.

```csharp
Task<RawStreamMetadataResult> GetStreamMetadataAsRawBytesAsync(
    string stream, UserCredentials userCredentials = null
);
```

This returns a `RawStreamMetadataResult`. The fields on this result are:

| Member                   | Description                                                                                  |
|:-------------------------|:---------------------------------------------------------------------------------------------|
| `string Stream`          | The name of the stream                                                                       |
| `bool IsStreamDeleted`   | True is the stream is deleted, false otherwise.                                              |
| `long MetastreamVersion` | The version of the meta-stream (see [Expected Version](appending.md#optimistic-concurrency)) |
| `byte[] Metadata`        | The raw data of the metadata JSON                                                            |

::: tip
If you enabled [security](connecting.md#security), reading metadata may require that you pass credentials. By default, it is only allowed for admins though you can change this via default ACLs. If you do not pass credentials, and they are required you will receive an `AccessedDeniedException`.
:::

## Writing metadata

You can write metadata in both a typed and a raw mechanism. When writing it is generally easier to use the typed mechanism. Both writing mechanisms support an `expectedVersion` which works the same as on any stream and you can use to control concurrency, read [Expected Version](appending.md#optimistic-concurrency) for further details.

```csharp
Task<WriteResult> SetStreamMetadataAsync(
    string stream, long expectedMetastreamVersion, 
    StreamMetadata metadata, UserCredentials userCredentials = null
);
```

The `StreamMetadata` passed above has a builder that you can access via the `StreamMetadata.Create()` method. The options available on the builder are:

| Method | Description |
|:-------|:------------|
| `SetMaxCount(long count)` | Sets the maximum count of events in the stream. |
| `SetMaxAge(TimeSpan age)` | Sets the maximum age of events in the stream. |
| `SetTruncateBefore(long seq)` | Sets the event number from which previous events can be scavenged. |
| `SetCacheControl(TimeSpan cacheControl)` | The amount of time the stream head is cacheables. |
| `SetReadRoles(string[] roles)` | Sets the roles allowed to read the underlying stream. |
| `SetWriteRoles(string[] roles)` | Sets the roles allowed to write to the underlying stream. |
| `SetDeleteRoles(string[] roles)` | Sets the roles allowed to delete the underlying stream. |
| `SetMetadataReadRoles(string[] roles)` | Sets the roles allowed to read the metadata stream. |
| `SetMetadataWriteRoles(string[] roles)` | Sets the roles allowed to write the metadata stream. Be careful with this privilege as it gives all the privileges for a stream as that use can assign themselves any other privilege. |
| `SetCustomMetadata(string key, string value)` | The SetCustomMetadata method and overloads allow the setting of arbitrary custom fields into the stream metadata. |

You can add user-specified metadata via the `SetCustomMetadata` overloads. Some examples of good uses of user-specified metadata are:

-   which adapter is responsible for populating a stream.
-   which projection caused a stream to be created.
-   a correlation ID of some business process.

```csharp
Task<WriteResult> SetStreamMetadataAsync(
    string stream, long expectedMetastreamVersion, 
    byte[] metadata, UserCredentials userCredentials = null
);
```

This method will put the data that is in metadata as the stream metadata. Metadata in this case can be anything in a vector of bytes. The server only understands JSON. Read [Access Control Lists](security.md#access-control-lists) for more information on the format in JSON for access control lists.

::: tip
Writing metadata may require that you pass credentials if you have security enabled by default it is only allowed for admins though you can change this via default ACLs. If you do not pass credentials, and they are required you will receive an `AccessedDeniedException`.
:::

## Deleting a stream

Although you cannot delete individual events from a stream, you can delete the whole stream. It's also possible to delete a head portion of the stream by updating [stream metadata](#stream-metadata).

::: note
As EventStoreDB normally works in append-only manner, deleting streams or updating streams metadata would not physically delete anything from the database. Events will be purged from the database when the next scavenge operation runs. You should, therefore, ensure that your database is regularly scavenged.
:::

### Soft delete

By default, when you delete a stream, EventStoreDB soft-deletes it. You can recreate the stream by appending new events to it. If you try to read a soft deleted stream you receive an error response.

Technically, stream deletion is done by setting `$tb` stream metadata property to `long.MaxValue`. Note that if a deleted stream gets new events appended to it, event numbers for newly appended events don't start from zero as it would happen for a new stream. Although the stream has been deleted, EventStoreDB keeps the last known event number for all streams.

```csharp
Task<DeleteResult> DeleteStreamAsync(
    string stream, long expectedVersion, 
    UserCredentials userCredentials = null
);
```

### Hard delete

If you want to prevent new events to be appended to a deleted stream, you should use the hard-delete function. When a stream is hard-deleted, EventStoreDB will append a tombstone event to that stream. The tombstone event never gets scavenged, so the stream will forever be closed for appending new events.

::: warning
A hard delete is permanent and the stream is not removed during scavenge. If you hard delete a stream, you cannot recreate the stream.
:::

```csharp
Task<DeleteResult> DeleteStreamAsync(
    string stream, long expectedVersion, bool hardDelete, 
    UserCredentials userCredentials = null
);
```

### Deleted events and subscriptions

As events don't get immediately removed from the database when a stream gets deleted or truncated, subscriptions might still receive deleted events. There are several possible scenarios for deleted events and catch-up subscriptions:

#### Subscription to `$all`

A catch-up subscription to `$all` gets all the events from all the streams in the database. The normal scenario for such a subscription to be always in live mode, so deletions don't affect it as they only affect already processed events. However, when you set a catch-up subscription to read from a position in the past (or from the beginning), it will also receive deleted events, which haven't been scavenged. It is especially relevant for small databases, as the active chunk never gets scavenged, so all the deleted events can remain in the database for a long time. You can work around this issue by reading the stream metadata form received events when the subscription is in catch-up mode, so you can check if the stream has been deleted or not.

#### Subscription to stream with links

Default projections like `by-category` emit links to special streams, for example `$ce-Order`. Custom projections written in JavaScript can also emit links. Links are very small events, which point to linked events. Normally, when subscribing to a stream with links, you set the `ResolveLinkTos` subscription option to true as you want to get linked events. EventStoreDB will check if the original event has been deleted, but it will still deliver a link to the subscription. The `Event` property in this case will be `null`, so you can skip those events, but can still update the subscription checkpoint.

#### Subscription to a normal stream

Subscriptions to regular streams are unaffected by deleted events as it will never get them. However, if you hard-delete the stream for which you also have a subscription, the subscription will fail.
