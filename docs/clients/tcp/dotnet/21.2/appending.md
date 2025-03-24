---
order: 4
sitemap:
  priority: 0.1
  changefreq: monthly
---

# Appending events

You can use the client API to append one or more events to a stream atomically. You do this by appending the events to the stream in one operation, or by using transactions.

::: note
Sending events to a non-existing stream, implicitly creates the stream.
:::

It is possible to make an optimistic concurrency check during the append by specifying the version at which you expect the stream to be. Identical append operations are idempotent if the optimistic concurrency check is not disabled. You can find more information on optimistic concurrency and idempotence [here](./appending.md#idempotence).

The writing methods all use a type named `EventData` to represent an event to store (described [below](#eventdata)). The client library doesn't perform any serialization work, so you'd need to serialize both your event and its metadata to byte arrays. It allows you to use any serializer.

## Append events to a stream

The `AppendToStreamAsync` method appends a single event or list of events atomically to the end of a stream, working in an asynchronous manner.

Method definitions:

```csharp
// Append one or more events using default connection credentials
Task<WriteResult> AppendToStreamAsync(
    string stream, long expectedVersion, params EventData[] events
);
Task<WriteResult> AppendToStreamAsync(
    string stream, long expectedVersion, IEnumerable<EventData> events
);

// Append one or more events using explicit credentials
Task<WriteResult> AppendToStreamAsync(
    string stream, long expectedVersion, UserCredentials userCredentials, params EventData[] events
);
```

Parameters:

| Parameter | Description |
| :------------------------------ | :------------- |
| `string stream` | The name of the stream to which to append. |
| `long expectedVersion` | The version at which you expect the stream to be in order that an optimistic concurrency check can be performed. This should either be a positive integer, or one of the constants `ExpectedVersion.NoStream`, `ExpectedVersion.EmptyStream`, or to disable the check, `ExpectedVersion.Any`. See [here](./appending.md#idempotence) for a broader discussion of this. |
| `IEnumerable<EventData> events` | The events to append. There is also an overload of each method which takes the events as a `params` array. `events`'s length must not be greater than 4095.|
| `userCredentials` | Specify user on behalf whom write will be executed. |

Example single event in single write:

```csharp
var sampleObject = new { a = 2 };
var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
var metadata = Encoding.UTF8.GetBytes("{}");
var evt = new EventData(Guid.NewGuid(), "event-type", true, data, metadata);
await conn.AppendToStreamAsync("newstream", ExpectedVersion.Any, evt);
```

Example list of events in single write:

```csharp
static EventData CreateSample(int i)
{
    var sampleObject = new { a = i };
    var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
    var metadata = Encoding.UTF8.GetBytes("{}");
    var eventPayload = new EventData(Guid.NewGuid(), "event-type", true, data, metadata);
    return eventPayload;
}

static async Task Main()
{
    var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
    await conn.ConnectAsync();

    await conn.AppendToStreamAsync(
        "newstream", 
        ExpectedVersion.Any, 
        new[] { CreateSample(1), CreateSample(2), CreateSample(3) });
}
```

## Transactions

You might perform multiple writes to KurrentDB as one transaction. However, the transaction can only append events to one stream. Transactions across multiple streams are not supported.

You can open a transaction by using the `StartTransactionAsync` method of the `IEventStoreConnection` instance. After you got the transaction instance, you can use it to append events. Finally, you can either commit or roll back the transaction.

A transaction can be long-lived and opening a transaction for a stream doesn't lock it. Another process can write to the same stream. In this case, your transaction might fail if you use idempotent writes with expected version.

Method definitions on `IEventStoreConnection`:

```csharp
Task<EventStoreTransaction> StartTransactionAsync(string stream, long expectedVersion);
EventStoreTransaction ContinueTransaction(long transactionId);
```

Method definitions on `EventStoreTransaction`:

```csharp
Task WriteAsync(IEnumerable<EventData> events);
Task WriteAsync(params EventData[] events);
Task CommitAsync();
void Rollback();
```

Example:

```csharp
static EventData CreateSample(int i)
{
    var sampleObject = new { a = i };
    var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
    var metadata = Encoding.UTF8.GetBytes("{}");
    var eventPayload = new EventData(
        Guid.NewGuid(), 
        "event-type", 
        true, 
        data, 
        metadata
    );
    return eventPayload;
}

public static async Task Main()
{
    var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
    await conn.ConnectAsync();

    using var transaction = 
        await conn.StartTransactionAsync("newstream", ExpectedVersion.Any);

    await transaction.WriteAsync(CreateSample(1));
    await transaction.WriteAsync(CreateSample(2));
    await conn.AppendToStreamAsync("newstream", ExpectedVersion.Any, CreateSample(3));
    await transaction.WriteAsync(CreateSample(4));
    await transaction.WriteAsync(CreateSample(5));
    await transaction.CommitAsync();
}
```

Because the event `3` is appended outside of the transaction scope and before the transaction commits, it appears first in the stream. The second atomic write to the database is the whole transaction with events `1`, `2`, `4` and `5`.

The stream will therefore contain events in the following order: `3, 1, 2, 4, 5`.

## EventData

The writing methods all use a type named `EventData` to represent an event to be stored. Instances of `EventData` are immutable.

Kurrent does not have any built-in serialisation, so the body and metadata for each event are represented in `EventData` as a `byte[]`.

The members on `EventData` are:

| Member | Description |
| :---------------- | :------ |
| `Guid EventId` | A unique identifier representing this event. Kurrent uses this for idempotency if you write the same event twice you should use the same identifier both times. |
| `string Type` | The name of the event type. You can use this for pattern matching in projections, so should be a "friendly" name rather than a CLR type name, for example. |
| `bool IsJson` | If the data and metadata fields are serialized as JSON, you should set this to `true`. Setting this to `true` will cause the projections framework to attempt to deserialize the data and metadata later. |
| `byte[] Data` | The serialized data representing the event to be stored. |
| `byte[] Metadata` | The serialized data representing metadata about the event to be stored. |

::: note
An event size (not only data and metadata) must not exceed 16,777,215 bytes (16MB-1B).
:::

## Optimistic concurrency

Append operation supports an [optimistic concurrency](https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/optimistic-concurrency) check on the version of the stream to which events are appended.

The .NET API has constants which you can use to represent certain conditions:

| Parameter  | Description |
|:-----------|:------------|
| `ExpectedVersion.Any` | Disables the optimistic concurrency check. |
| `ExpectedVersion.NoStream` | Specifies the expectation that target stream does not yet exist. |
| `ExpectedVersion.EmptyStream`  | Specifies the expectation that the target stream has been explicitly created, but does not yet have any user events appended in it. |
| `ExpectedVersion.StreamExists` | Specifies the expectation that the target stream or its metadata stream has been created, but does not expect the stream to be at a specific event number. |
| `Any other integer value` | The event number that you expect the stream to currently be at. |

If the optimistic concurrency check fails during appending, a `WrongExpectedVersionException` is thrown.

## Idempotence

If identical append operations occur, KurrentDB treats them in a way which makes it idempotent. If a append is treated in this manner, KurrentDB acknowledges it as successful, but duplicate events are not appended. The idempotence check is based on the `EventId` and `stream`. It is possible to reuse an `EventId` across streams whilst maintaining idempotence.

The level of idempotence guarantee depends on whether the optimistic concurrency check is not disabled during appending (by passing `ExpectedVersion.Any` as the `expectedVersion` for the append).

### With expected version

The specified `expectedVersion` is compared to the `currentVersion` of the stream. This will yield one of three results:

- **`expectedVersion > currentVersion`** - a `WrongExpectedVersionException` is thrown.
- **`expectedVersion == currentVersion`** - events are appended and acknowledged.
- **`expectedVersion < currentVersion`** - the `EventId` of each event in the stream starting from `expectedVersion` are compared to those in the append operation. This can yield one of three further results:
  - **All events have been committed already** - the append operation is acknowledged as successful, but no duplicate events appended.
  - **None of the events were previously committed** - a `WrongExpectedVersionException` is thrown.
  - **Some events were previously committed** - this is considered a bad request. If the append operation contains the same events as a previous request, either all or none of the events should have been previously committed. This surfaces as a `WrongExpectedVersionException`.

### With ExpectedVersion.Any

::: warning
Idempotence is **not** guaranteed if you use `ExpectedVersion.Any`. The chance of a duplicate event is small, but is possible.
:::

The idempotence check will yield one of three results:

- **All events have been committed already** - the append operation is acknowledged as successful, but no duplicate events appended.
- **None of the events were previously committed** - the events are appended and the append operation acknowledged.
- **Some events were previously committed** - this is considered a bad request. If the append operation contains the same events as a previous request, either all or none of the events should have been previously committed. This currently surfaces as a `WrongExpectedVersionException`.
