# Migration to gRPC client

TCP client is considered legacy. We recommend migrating to the gRPC client. 

We decided to use gRPC as our communication protocol, as it enabled us to standardise client communication. Thanks to that, we benefit from the built-in gRPC functionalities like streaming, back-pressure etc., instead of building the custom implementations. 

As gRPC is a multi-platform and widely adopted standard, it enabled us to provide a unified approach and deliver clients for other dev environments like Go, JVM, NodeJs, Rust.

TCP client will still be getting the necessary bug fixes, but new database features will be only delivered for the gRPC client (e.g. persistent subscription to `$all`).

Having all of that, we encourage you to migrate to the gRPC client. This document outlines the needed steps. Check also the [gRPC documentation](/clients/grpc/) for more details on how to use it.

## Update the target Framework

gRPC client doesn't support .NET Standard. The change comes from using different gRPC implementations for the specific .NET Framework version to tune the performance.

If you were using it in the .NET Standard library, you have to update it to one of:
- .NET 6 (`net6.0`),
- .NET 5 (`net5.0`),
- .NET Core 3.1 (`netcoreapp3.1`),
- .NET Framework 4.8 (`net48`)

We recommend using the latest .NET framework version, so .NET 6.

```xml{3-4}
 <Project Sdk="Microsoft.NET.Sdk">
   <PropertyGroup>
-    <TargetFramework>netstandard2.0</TargetFramework>
+    <TargetFramework>net6.0</TargetFramework>
   </PropertyGroup>
 </Project>
```

## Update package references

To use the gRPC client, you need to replace the TPC client package (`EventStore.Client`) with the gRPC one (`EventStore.Client.Grpc.Streams`). 

```xml{2-3}
 <ItemGroup>
-  <PackageReference Include="EventStore.Client" Version="21.2.1" />
+  <PackageReference Include="EventStore.Client.Grpc.Streams" Version="21.2.0" />
 </ItemGroup>
```

## Migration strategies

You may also consider step by step migration:
- adding gRPC client and keeping TCP one,
- gradually replacing usages, e.g. start with events appends and reads, keeping subscriptions on TCP client. Once that's settled, move the subscriptions code into gRPC.
- removing TCP client package reference as the last step.

You may also consider wrapping common logic into extension methods or repository classes. Adding a temporary wrapping layer lets us centralise and isolate the changes we perform during the migration. Thanks to that, you can replace the inner implementations, keeping usages the same. Read more in Martin Fowler's article [An example of preparatory refactoring](https://martinfowler.com/articles/preparatory-refactoring-example.html).

Sample wrapper for the TCP client may look, e.g.:

```csharp
public class EventStore
{
    readonly IEventStoreConnection _connection;

    public EventStore(IEventStoreConnection connection)
        => _connection = connection;

    public Task AppendEvents(
        string streamName,
        long version,
        params object[] events
    )
    {
        var preparedEvents = events
            .Select(ToEventData)
            .ToArray();

        return _connection.AppendToStreamAsync(
            streamName,
            version,
            preparedEvents
        );

        static EventData ToEventData(object @event) =>
            new EventData(
                Guid.NewGuid(),
                TypeMapper.GetTypeName(@event.GetType()),
                true,
                Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data))
            );
    }

    public Task AppendEvents(
        string streamName,
        params object[] events
    )
        => AppendEvents(streamName, ExpectedVersion.Any, events);

    public async Task<IEnumerable<object>> LoadEvents(string stream)
    {
        const int pageSize = 4096;

        var start  = 0;
        var events = new List<object>();

        do
        {
            var page = await _connection.ReadStreamEventsForwardAsync(
                stream, start, pageSize, true
            );

            if (page.Status == SliceReadStatus.StreamNotFound)
                throw new ArgumentOutOfRangeException(
                    nameof(stream), $"Stream '{stream}' was not found"
                );

            events.AddRange(
                page.Events.Select(Deserialize)
            );
            if (page.IsEndOfStream) break;

            start += pageSize;
        } while (true);

        return events;

        static object Deserialize(this ResolvedEvent resolvedEvent)
        {
            var dataType = TypeMapper.GetType(resolvedEvent.Event.EventType);
            var jsonData = Encoding.UTF8.GetString(resolvedEvent.Event.Data);
            var data = JsonConvert.DeserializeObject(jsonData, dataType);
            return data;
        }
    }

    public async Task<bool> StreamExists(string stream)
    {
        var result = await _connection.ReadEventAsync(stream, 1, false);
        return result.Status != EventReadStatus.NoStream;
    }
}
```

## Differences in connection management

Both TCP and gRPC clients are managing the reconnections. That's the reason why it should be registered as a single instance in the application. 

TCP client requires calling the `ConnectAsync` method at least once to initiate the connection. That wasn't ideal if you wanted to inject an already set up connection, as you either had to call it in the asynchronous way or risk deadlocks.

```csharp
private async Task<IEventStoreConnection> GetEventStoreConnection(string connectionString)
{
    var connection = EventStoreConnection.Create(connectionString);
    await connection.ConnectAsync();
    return connection;
}
```

As TCP client connection logic is not thread-safe (`ConnectAsync` method), other operations are thread-safe. Because of that, you have to ensure that you won't have a race condition. You also should consider handling `Closed` events to manage reconnection if it is closed. 

TCP client supports built-in reconnections; however, you need to be careful about setting the connections options properly. Wrongly defined can cause a flood of reconnections, increasing the chance for failure. For instance, additional retries may worsen if the reason was a high load on the database.

Sample code with reconnections could look like this:

```csharp
private async Task<IEventStoreConnection> GetEventStoreConnection(string connectionString)
{
    var connection = EventStoreConnection.Create(
        connectionString,
        ConnectionSettings.Create()
            .FailOnNoServerResponse()
            .KeepReconnecting()
            .SetOperationTimeoutTo(TimeSpan.FromSeconds(5))
            .LimitAttemptsForOperationTo(7)
            .LimitRetriesForOperationTo(7)
    );
    await connection.ConnectAsync();
    return connection;
}
```

In the gRPC client, the main difference is that there is no constantly open connection, so no reconnections have to be made. You also don't need to call the `ConnectAsync` method. That simplifies the client initialisation and dependency injection. For the TCP client, you either had to inject the `Task<IEventStoreConnection>` and each time await it, e.g.

```csharp
public class EventStore
{
    readonly Task<IEventStoreConnection> connect;

    public EventStore(Task<IEventStoreConnection> connect)
        => this.connect = connect;

    public async Task AppendEvents(
        string streamName,
        long version,
        params object[] events
    )
    {
        var preparedEvents = events
            .Select(ToEventData)
            .ToArray();

        var connection = await connect;
        
        return await connection.AppendToStreamAsync(
            streamName,
            version,
            preparedEvents
        );
    }
}
```

Or initialise it in the application Startup.

For the gRPC client, we can shorten that to:

```csharp
private EventStoreClient GetEventStoreConnection(string connectionString)
{
    var settings = EventStoreClientSettings.Create(connectionString);
    return new EventStoreClient(settings);
}
```

If you're using Dependency Injection, you can safely register it as Singleton in DI Container, e.g.:

```csharp
var client = GetEventStoreConnection(Configuration["eventStore:connectionString"])
services.AddSingleton(client);
```

### Connection string
For the gRPC client, we recommend switching from the settings object to using a connection string. All of the settings are exposed through it. You can use the [online configuration tool](/clients/grpc/#connection-details) to generate the connection string for your EventStoreDB deployment.

## Security
EventStoreDB from version 20.6 is secured by default. The gRPC clients follow that approach. You can use insecure connection by providing `tls=false` connection string param, but we don't recommend it for scenarios other than local development. Access Control List checks are not performed on the insecure connection.

Read more in [database security docs](/server/v21.10/security/).

## Appending events

### Event Data

There are minor changes to the `EventData` signature:
- namespaces was changed from `EventStore.ClientAPI` to `EventStore.Client`
- Event id requires using the `UUID` class instead of `Guid`. We adopted the [Universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) standard to provide unified behaviour between the gRPC clients.
- we are allowed to provide content type. It enables more advanced serialisation scenarios (e.g., using a few non-JSON serialisation formats). Instead of setting the `isJson` flag for the gRPC client, you should provide the text value of the content type. The default one is `application/json`, which is equivalent to setting `isJson` flag to `true`. If you're using the custom format, you should provide its name, e.g. `application/octet-stream`.

::: note
In the samples below, I'm using [Json.NET](https://www.newtonsoft.com/json), as it was commonly used to serialise JSON event data in TCP clients. You may consider [migrating to System.Text.Json](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to) as this may improve performance and remove package dependency. However, keep in mind that it doesn't have full feature parity. If you use some more complex features, they may not work the same way. Check the [gRPC client documentation](/clients/grpc/) for samples using `System.Text.Json.
:::

For the JSON Event Data, you have to change TCP client logic from:

```csharp{1,7,9}
public static EventStore.ClientAPI.EventData ToJsonEventData(
    object @event,
    string eventType,
    object? metadata = null
) =>
    new EventData(
        Guid.NewGuid(),
        eventType,
        true,
        Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(@event)),
        Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(metadata ?? new { }))
    );
```

into:

```csharp{1,7}
public static EventStore.Client.EventData ToJsonEventData(
    object @event,
    string eventType,
    object? metadata = null
) =>
    new EventData(
        EventStore.Client.Uuid.NewUuid(),
        eventType,
        Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(@event)),
        Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(metadata ?? new { }))
    );
```

For binary event data, you have to switch from:

```csharp{1,7,9}
public static EventStore.ClientAPI.EventData ToJsonEventData(
    object @event,
    string eventType,
    object? metadata = null
) =>
    new EventData(
        Guid.NewGuid(),
        eventType,
        false,
        SerializeToByteArray(@event),
        SerializeToByteArray(metadata ?? new { })
    );
```

into:

```csharp{1,7,11}
public static EventStore.Client.EventData ToJsonEventData(
    object @event,
    string eventType,
    object? metadata = null
) =>
    new EventData(
        EventStore.Client.Uuid.NewUuid(),
        eventType,
        SerializeToByteArray(@event),
        SerializeToByteArray(metadata ?? new { }),
        "application/octet-stream"
    );
```
### Optimistic concurrency

Optimistic concurrency handling rules didn't change between the TCP and the gRPC clients. However, the API semantics did. You always had to provide `long` value as the expected stream version in the TCP client. You could use the value that you got from the last event of the stream or general constant values:
- `ExpectedVersion.Any` (-2) - Disables the optimistic concurrency check.
- `ExpectedVersion.NoStream` (-1) - Specifies the expectation that the target stream does not yet exist.
- `ExpectedVersion.StreamExists` (-4) - Specifies the expectation that the target stream or its metadata stream has been created but does not expect the stream to be at a specific event number.

In the gRPC client, we aligned typing and naming around the optimistic concurrency checks:
- we found that the `ExpectedVersion` word is not precise. It's not precisely stating what we are versioning and may be confused with the, e.g. event schema version. In the gRPC client, we're using the `ExpectedRevision` term instead.
- as stream revision cannot be a negative number, the type was changed from `long` to `ulong`,
- to reduce the chance of accidentally providing the wrong revision value, we created a dedicated type: `StreamState`. It has `Any`, `NoStream`, `StreamsExists` values.

If you had wrapper methods similar to [presented above](#migration-strategies). You'd need to update it to:

```csharp{3-4,12-13,24-25}
    public Task AppendEvents(
        string streamName,
-       long version,
+       ulong version
        params object[] events
    )
    {
        var preparedEvents = events
            .Select(ToEventData)
            .ToArray();

-       return _connection.AppendToStreamAsync(
+       return _client.AppendToStreamAsync(
            streamName,
            version,
            preparedEvents
        );
    }

    public Task AppendEvents(
        string streamName,
        params object[] events
    )
-        => AppendEvents(streamName, ExpectedVersion.Any, events);
+        => AppendEvents(streamName, StreamState.Any, events);
```

### Transactions

The most significant breaking change in the gRPC client is that it **does not support transactions anymore**. In the TCP client may perform multiple appends to EventStoreDB as one transaction. The transaction can only append events to one stream. Transactions across multiple streams are not supported. gRPC client still supports appending more than one event to the single stream as an atomic operation. 

A transaction can be long-lived, and opening it for a stream doesn't lock it. Another process can write to the same stream. In this case, your transaction might fail if you use idempotent writes with the expected version. If you use transactions, we recommend reevaluating your consistency guarantees and stream modelling to reduce the need for appending events. If you still need to use them, you may consider adding your own Unit of Work implementation, as, for example:

```csharp
public class EventStoreDBUnitOfWork
{
    private readonly EventStoreClient eventStore;
    private readonly List<EventData> uncommittedEvents = new();
    private readonly string streamName;
    private readonly StreamRevision expectedStreamRevision;

    private EventStoreDBUnitOfWork(EventStoreClient eventStore, string streamName,
        StreamRevision expectedStreamRevision)
    {
        this.eventStore = eventStore;
        this.streamName = streamName;
        this.expectedStreamRevision = expectedStreamRevision;
    }

    public static EventStoreDBUnitOfWork Begin(EventStoreClient eventStore, string streamName,
        StreamRevision expectedStreamRevision) =>
        new(eventStore, streamName, expectedStreamRevision);

    public Task<IWriteResult> Commit(CancellationToken cancellationToken = default)
        => eventStore.AppendToStreamAsync(
            streamName,
            expectedStreamRevision,
            uncommittedEvents.ToArray(),
            cancellationToken: cancellationToken
        );

    public void Append(params EventData[] eventData) =>
        uncommittedEvents.AddRange(eventData);
}
```


## Reading Events

### Read direction

TCP Client have dedicated methods for reading events in the specific direction: 
- `ReadStreamEventsForwardAsync`,
- `ReadStreamEventsBackwardAsync`,
- `ReadAllEventsForwardAsync`,
- `ReadStreamEventsBackwardAsync`.

 In the gRPC client, we unified those methods into methods with the direction parameter:
- `ReadStreamAsync`,
- `ReadAllAsync`.

To read stream forwards, use:

```csharp
await using var readResult = client.ReadStreamAsync(
    Direction.Forwards,
    streamName,
    StreamPosition.Start
);
```

To read stream backwards, use: 

```csharp
await using var readResult = client.ReadStreamAsync(
    Direction.Backwards,
    streamName,
    StreamPosition.End
);
```

Accordingly, to read the `$all` stream forwards, use:

```csharp
await using var readResult = client.ReadAllAsync(
    Direction.Forwards,
    streamName,
    Position.Start
);
```

and to  the `$all` stream backwards:

```csharp
await using var readResult = client.ReadAllAsync(
    Direction.Backwards,
    streamName,
    Position.End
);
```

### Read positions

Both TCP and gRPC clients allow reading the stream from a specific position (representing the location of the particular event in the stream). We decided to make positions more explicit accordingly to the stream revision changes in [appending new events](#appending-events). 

We expanded a `StreamPosition` class that centralises stream position handling. It still has a `Start` and an `End` constant representing the logical stream's position. However, they return no longer `long` values but `StreamPosition` class instance. We replaced `long` values with `ulong` as stream position is always positive.

`StreamPosition` class has an overloaded operator for `ulong` value assignment. 

```csharp
StreamPosition streamPosition = 100L;
```

You can also convert it from the `StreamRevision`:

```csharp
var streamPosition = StreamPosition.FromStreamRevision(streamRevision);
```

For reading from `$all`, the TCP Client has already the `Position` class. gRPC client also has it, but using `ulong` instead of `long` for commit and prepare positions.

### Read result

TCP Client requires paging through the results. You must provide the maximum number of events you want to read in the single read call. In the gRPC client, this is optional. By default, it will try to read all events. To make it efficient, read methods return [IAsyncEnumerable](https://docs.microsoft.com/en-us/archive/msdn-magazine/2019/november/csharp-iterating-with-async-enumerables-in-csharp-8). Which means that it won't load the whole stream at once but iterate sequentially, reducing the memory pressure.

Instead of doing paging like that in TCP client:

```csharp
public async Task<IEnumerable<object>> LoadEvents(string stream)
{
    const int pageSize = 4096;

    var readFrom  = 0;
    var events = new List<object>();
    StreamEventsSlice page;

    do
    {
        var page = await _connection.ReadStreamEventsForwardAsync(
            stream, readFrom, pageSize, true
        );

        if (page.Status == SliceReadStatus.StreamNotFound)
            throw new ArgumentOutOfRangeException(
                nameof(stream), $"Stream '{stream}' was not found"
            );

        events.AddRange(
            page.Events.Select(Deserialize)
        );

        readFrom = stream.NextEventNumber;
    } while (!page.IsEndOfStream);

    return events;
}
```

You can simplify that in the gRPC client into:

```csharp
public async Task<IEnumerable<object>> LoadEvents(string stream)
{
    await using var readResult = _client.ReadStreamAsync(
        Direction.Forwards,
        stream,
        StreamPosition.Start
    );

    if (await readResult.ReadState != ReadState.Ok)
        throw new ArgumentOutOfRangeException(
            nameof(stream), $"Stream '{stream}' was not found"
        );

    return await readResult
        .Select(Deserialize)
        .ToListAsync();
}
```

### Serialisation

The gRPC client uses `ReadOnlyMemory<byte>` instead of byte array to make the events processing more efficient. To support that, you need to modify your deserialisation logic slightly:

```csharp{4-5}
  object Deserialize(this ResolvedEvent resolvedEvent)
  {
      var dataType = TypeMapper.GetType(resolvedEvent.Event.EventType);
-     var jsonData = Encoding.UTF8.GetString(resolvedEvent.Event.Data);
+     var jsonData = Encoding.UTF8.GetString(resolvedEvent.Event.Data.Span);
      var data = JsonConvert.DeserializeObject(jsonData, dataType);
      return data;
  }
```

## Built-in retries

The gRPC client handles reconnections internally. But contrary to the TCP one, it does not have built-in retries for failed operations. It only does retries for the persistent subscriptions. If your codebase depends on them, you should wrap operations with your custom retry policy (e.g. using [Polly](https://github.com/App-vNext/Polly) library).

If you were using the following configuration:

```csharp
var settings = ConnectionSettings.Create()
    .FailOnNoServerResponse()
    .KeepReconnecting()
    .SetOperationTimeoutTo(TimeSpan.FromSeconds(5))
    .LimitRetriesForOperationTo(7);

var connection = EventStoreConnection.Create(
    connectionString,
	settings 
);
```

You can replace it with a retry policy using Polly:

```csharp
public static class RetryScope
{
    private static readonly AsyncPolicyWrap RetryPolicy
        = Policy
            .Handle<Exception>()
            .RetryAsync(7)
            .WrapAsync(Policy.TimeoutAsync(5));

    public static Task ExecuteAsync(
        this EventStoreClient eventStore,
        Func<EventStoreClient, CancellationToken, Task> action,
        CancellationToken cancellationToken
    ) =>
        RetryPolicy.ExecuteAsync(ct => action(eventStore, ct), cancellationToken);

    public static Task<TResult> ExecuteAsync<TResult>(
        this EventStoreClient eventStore,
        Func<EventStoreClient, CancellationToken, Task<TResult>> action,
        CancellationToken cancellationToken
    ) =>
        RetryPolicy.ExecuteAsync(ct => action(eventStore, ct), cancellationToken);
}
```

and use it, e.g. as:

```csharp
public static Task<List<ResolvedEvent>> ReadAllStreamsEventsWithRetry(
    this EventStoreClient eventStore,
    string streamName,
    CancellationToken cancellationToken
) =>
    eventStore.ExecuteAsync(
        async (es, ct) =>
        {
            await using var readResult = es.ReadStreamAsync(
                Direction.Forwards,
                streamName,
                StreamPosition.Start,
                cancellationToken: ct
            );

            if(await readResult.ReadState != ReadState.Ok)
                throw new ArgumentOutOfRangeException(
                    nameof(streamName), $"Stream '{streamName}' was not found"
                );

            return await readResult
                .ToListAsync(ct);
        },
        cancellationToken);
```

::: warning
You should be careful in defining the retry policy. Not all operations are by default idempotent. Reads are, but for instance, if you're not using [optimistic concurrency](/clients/grpc/appending-events.md#handling-concurrency) or do not provide the same event id for appends, it may result in duplicates. You need to decide which exceptions you'd like to retry, e.g. there is no point in retrying `StreamDeleted` as the stream won't reappear. 
:::

## Subscriptions
TODO

## Persistent subscriptions
TODO
