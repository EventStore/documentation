# Migration to gRCP Client

TCP client is considered legacy. We recommend migrating to the gRPC client. This document outlines the needed steps.

## Update the target Framework

gRPC client doesn't support .NET Standard. The change comes from using different gRPC implementations for the specific .NET Framework version to tune the performance.

If you were using it in the .NET Standard library, you have to update it to one of:
- .NET 6 (`net6.0`),
- .NET 5 (`net5.0`),
- .NET Core 3.1 (`netcoreapp3.1`),
- .NETFramework 4.8 (`net48`)

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
- gradually replacing usages,
- removing TCP client package reference as the last step.

You may also consider wrapping common logic into extension methods or repository classes. Then you can replace the inner implementations, keeping usages the same. It may be disputable if wrapping the client logic is the best practice, but it can certainly ease the migration effort.

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

## Differences in Connection Management

Both TCP and gRPC clients are managing the reconnections. That's the reason why it should be registered as a single instance in the application. 

TCP client requires calling the `ConnectAsync` method at least once to initiate the connection. That wasn't ideal if you wanted to inject an already set up connection, as you either had to call it in asynchronous mode risking deadlocks.

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

### Connection String
TODO

### Security
TODO

## Appending events

### Event Data

There are minor changes to the `EventData` signature:
- namespaces was changed from `EventStore.ClientAPI` to `EventStore.Client`
- Event id requires using the `UUID` class instead of `Guid`. We adopted the [Universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) standard to provide unified behaviour between the gRPC clients.
- we are allowed to provide content type. It enables more advanced serialisation scenarios (e.g., using a few non-JSON serialisation formats). Instead of setting the `isJson` flag for the gRPC client, you should provide the text value of the content type. The default one is `application/json`, which is equivalent to setting `isJson` flag to `true`. If you're using the custom format, you should provide its name, e.g. `application/octet-stream`.

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

### Serialisation
The gRPC client uses `ReadOnlyMemory<byte>` instead of `byte` array to make the events processing more efficient. 

## Built-in retries
