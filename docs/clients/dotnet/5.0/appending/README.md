# Appending events

You can use the client API to append one or more events to a stream atomically. You do this by appending the events to the stream in one operation, or by using transactions.

::: note
Sending events to a non-existing stream, implicitly creates the stream.
:::

It is possible to make an optimistic concurrency check during the append by specifying the version at which you expect the stream to be. Identical append operations are idempotent if the optimistic concurrency check is not disabled. You can find more information on optimistic concurrency and idempotence [here](optimistic-concurrency-and-idempotence.md).

The writing methods all use a type named `EventData` to represent an event to store (described [below](#eventdata)). The client library doesn't perform any serialization work, so you'd need to serialize both your event and its metadata to byte arrays. It allows you to use any serializer.

## Append to a stream in a single batch

The `AppendToStreamAsync` method appends a single event or list of events atomically to the end of a stream, working in an asynchronous manner.

Method definitions:

```csharp
Task<WriteResult> AppendToStreamAsync(string stream, long expectedVersion, params EventData[] events)
```

```csharp
Task<WriteResult> AppendToStreamAsync(string stream, long expectedVersion, UserCredentials userCredentials, params EventData[] events)
```

```csharp
Task<WriteResult> AppendToStreamAsync(string stream, long expectedVersion, IEnumerable<EventData> events)
```

Parameters:

| Parameter | Description |
| :------------------------------ | :------------- |
| `string stream` | The name of the stream to which to append. |
| `long expectedVersion` | The version at which you expect the stream to be in order that an optimistic concurrency check can be performed. This should either be a positive integer, or one of the constants `ExpectedVersion.NoStream`, `ExpectedVersion.EmptyStream`, or to disable the check, `ExpectedVersion.Any`. See [here](optimistic-concurrency-and-idempotence.md) for a broader discussion of this. |
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

You might perform multiple writes to EventStoreDB as one transaction. However, the transaction can only append events to one stream. Transactions across multiple streams are not supported.

You can open a transaction by using the `StartTransactionAsync` method of the `IEventStoreConnection` instance. After you got the transaction instance, you can use it to append events. Finally, you can either commit or roll back the transaction.

A transaction can be long-lived and opening a transaction for a stream doesn't lock it. Another process can write to the same stream. In this case, your transaction might fail if you use idempotent writes with expected version.

Method definitions on `IEventStoreConnection`:

```csharp
Task<EventStoreTransaction> StartTransactionAsync(string stream, long expectedVersion)
```

```csharp
EventStoreTransaction ContinueTransaction(long transactionId)
```

Method definitions on `EventStoreTransaction`:

```csharp
Task WriteAsync(IEnumerable<EventData> events)
```

```csharp
Task WriteAsync(params EventData[] events)
```

```csharp
Task CommitAsync()
```

```csharp
void Rollback()
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

Event Store does not have any built-in serialisation, so the body and metadata for each event are represented in `EventData` as a `byte[]`.

The members on `EventData` are:

| Member | Description |
| :---------------- | :------ |
| `Guid EventId` | A unique identifier representing this event. Event Store uses this for idempotency if you write the same event twice you should use the same identifier both times. |
| `string Type` | The name of the event type. You can use this for pattern matching in projections, so should be a "friendly" name rather than a CLR type name, for example. |
| `bool IsJson` | If the data and metadata fields are serialized as JSON, you should set this to `true`. Setting this to `true` will cause the projections framework to attempt to deserialize the data and metadata later. |
| `byte[] Data` | The serialized data representing the event to be stored. |
| `byte[] Metadata` | The serialized data representing metadata about the event to be stored. |

::: note
 An event size (not only data and metadata) must not exceed 16,777,215 bytes (16MB-1B).
:::
