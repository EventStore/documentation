# Creating and appending to a stream

Sending events to a non-existing stream, implicitly creates the stream.

## Appending to a stream

You can use the client API to append one or more events to a stream atomically. You do this by appending the events to the stream in one operation, or by using transactions.

It is possible to make an optimistic concurrency check during the append operation by specifying the version at which you expect the stream to be. Identical append operations are idempotent if the optimistic concurrency check is not disabled. You can find more information on optimistic concurrency and idempotence [here](/v5/dotnet-api/optimistic-concurrency-and-idempotence.md).

The appending methods all use a type named `EventData` to represent an event to store.

## Append to a stream in a single write

The `AppendToStreamAsync` method writes a single event or list of events atomically to the end of a stream, working in an asynchronous manner.

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

| Parameter | Type | Description |
|:----------|:-----|:------------|
| `stream` | `string` | The name of the stream to which to append. |
| `expectedVersion` | `long` | The version at which you expect the stream to be in order that an optimistic concurrency check can be performed. This should either be a positive integer, or one of the constants `ExpectedVersion.NoStream`, `ExpectedVersion.EmptyStream`, or to disable the check, `ExpectedVersion.Any`. See [here](optimistic-concurrency-and-idempotence.md) for a broader discussion of this. |
| `events` | `IEnumerable<EventData>` | The events to append. There is also an overload of each method which takes the events as a `params` array. `events`'s length must not be greater than 4095. |
| `userCredentials` | `UserCredentials` | Specify user on behalf whom write will be executed. |

Example single event in single write:

<<< @/docs/clients/dotnet/5.0/sample-code/DotNetClient/AppendStreamEvents.cs#AppendOneEvent

Example list of events in single write:

<<< @/docs/clients/dotnet/5.0/sample-code/DotNetClient/AppendStreamEvents.cs#CreateSampleData

## Using a transaction to append to a stream across multiple writes

Method definitions on `EventStoreConnection`:

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

<<< @/docs/clients/dotnet/5.0/sample-code/DotNetClient/AppendStreamEvents.cs#CreateSampleData

events are appended in the following order: `3, 1, 2, 4, 5`.

## EventData

The appending methods all use a type named `EventData` to represent an event to be stored. Instances of `EventData` are immutable.

EventStoreDB does not have any built-in serialisation, so the body and metadata for each event are represented in `EventData` as a `byte[]`.

The members on `EventData` are:

| Member | Type | Description |
|:-------|:-----|:--------|
| `EventId` | `Guid` | A unique identifier representing this event. EventStoreDB uses this for idempotency if you append the same event twice you should use the same identifier both times. |
| `Type`  | `string` | The name of the event type. You can use this for pattern matching in projections, so should be a "friendly" name rather than a CLR type name, for example. |
| `IsJson`  | `bool` | If the data and metadata fields are serialized as JSON, you should set this to `true`. Setting this to `true` will cause the projections framework to attempt to deserialize the data and metadata later. |
| `Data` | `byte[]` | The serialized data representing the event to be stored. |
| `Metadata` | `byte[]` | The serialized data representing metadata about the event to be stored. |

::: tip
An event size (not only data and metadata) must not exceed 16,777,215 bytes (16MB-1B).
:::
