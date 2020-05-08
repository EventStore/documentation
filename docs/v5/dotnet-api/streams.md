# Creating and writing to a stream

Sending events to a non-existing stream, implicitly creates the stream.

## Writing to a stream

You can use the client API to write one or more events to a stream atomically. You do this by appending the events to the stream in one operation, or by using transactions.

It is possible to make an optimistic concurrency check during the write by specifying the version at which you expect the stream to be. Identical write operations are idempotent if the optimistic concurrency check is not disabled. You can find more information on optimistic concurrency and idempotence [here](/dotnet-api/optimistic-concurrency-and-idempotence.md).

The writing methods all use a type named `EventData` to represent an event to store.

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

| Parameter                       | Description                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `string stream`                 | The name of the stream to which to append.                                                                                                                                                                                                                                                                                                                                            |
| `long expectedVersion`          | The version at which you expect the stream to be in order that an optimistic concurrency check can be performed. This should either be a positive integer, or one of the constants `ExpectedVersion.NoStream`, `ExpectedVersion.EmptyStream`, or to disable the check, `ExpectedVersion.Any`. See [here](optimistic-concurrency-and-idempotence.md) for a broader discussion of this. |
| `IEnumerable<EventData> events` | The events to append. There is also an overload of each method which takes the events as a `params` array. `events`'s length must not be greater than 4095.                                                                                                                                                                                                                                                                           |
| `userCredentials`               | Specify user on behalf whom write will be executed. |

Example single event in single write:

@[code lang=cpp transclude={15-19}](@/docs/v5/code-examples/DocsExample/DotNetClient/WritingSingleEvent.cs)

Example list of events in single write:

@[code lang=cpp transclude={11-26}](@/docs/v5/code-examples/DocsExample/DotNetClient/WritingListEvents.cs)

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

@[code lang=cpp transclude={10-33}](@/docs/v5/code-examples/DocsExample/DotNetClient/WritingTransactions.cs)

Events are written in the following order: `3, 1, 2, 4, 5`.

## EventData

The writing methods all use a type named `EventData` to represent an event to be stored. Instances of `EventData` are immutable.

Event Store does not have any built-in serialisation, so the body and metadata for each event are represented in `EventData` as a `byte[]`.

The members on `EventData` are:

| Member            | Description                                                                                                                                                                                               |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Guid EventId`    | A unique identifier representing this event. Event Store uses this for idempotency if you write the same event twice you should use the same identifier both times.                                       |
| `string Type`     | The name of the event type. You can use this for pattern matching in projections, so should be a "friendly" name rather than a CLR type name, for example.                                                |
| `bool IsJson`     | If the data and metadata fields are serialized as JSON, you should set this to `true`. Setting this to `true` will cause the projections framework to attempt to deserialize the data and metadata later. |
| `byte[] Data`     | The serialized data representing the event to be stored.                                                                                                                                                 |
| `byte[] Metadata` | The serialized data representing metadata about the event to be stored.                                                                                                                                   |

::: tip
An event size (not only data and metadata) must not exceed 16,777,215 bytes (16MB-1B).
:::