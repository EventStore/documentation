# Migration to gRCP Client

TCP client is considered legacy. We recommend migrating to the gRPC client. This document outlines the needed steps.

## Update the target Framework

gRPC client doesn't support .NET Standard. If you were using it in the .NET Standard library, you have to update it to one of:
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

You may also consider wrapping common logic into extension methods or repository classes. Then you can replace the inner implementations, keeping usages the same, e.g.:

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
        if (events == null || !events.Any()) return Task.CompletedTask;

        var preparedEvents = events
            .Select(
                @event =>
                    new EventData(
                        Guid.NewGuid(),
                        TypeMapper.GetTypeName(@event.GetType()),
                        true,
                        Serialize(@event),
                        Serialize(
                            new EventMetadata
                            {
                                ClrType = @event.GetType().FullName
                            }
                        )
                    )
            )
            .ToArray();

        return _connection.AppendToStreamAsync(
            streamName,
            version,
            preparedEvents
        );

        static byte[] Serialize(object data)
            => Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(data));
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
private IEventStoreConnection GetEventStoreConnection(string connectionString)
{
    var connection = EventStoreConnection.Create(uri);
    connection.ConnectAsync().Wait();
    return connection;
}
```

As TCP client is not thread-safe, you had to maintain it and ensure that we don't have a race condition. You also need to handle `Closed` events to manage reconnection if it is closed. The example code could look like this:

```csharp
public class EventStoreDBConnectionProvider
{
    private readonly object reconnectLock = new();
    private IEventStoreConnection? instance;
    private string? eventStoreDBUri;

    public IEventStoreConnection Connect(string uri)
    {
        if (instance != null && eventStoreDBUri == uri)
            return instance;

        instance?.Close();

        return Reconnect(uri);
    }

    private IEventStoreConnection Reconnect(string uri)
    {
        try
        {
            Monitor.Enter(reconnectLock);

            var temp = EventStoreConnection.Create(uri);

            Interlocked.Exchange(ref instance, temp);
            Interlocked.Exchange(ref eventStoreDBUri, uri);
        }
        finally
        {
            Monitor.Exit(reconnectLock);
        }

        instance.Closed += (sth, args) =>
        {
            Interlocked.Exchange(ref eventStoreDBUri, null);
            Reconnect(uri);
        };

        instance.ConnectAsync().Wait();

        return instance;
    }
}
```

In the gRPC client, you don't need to maintain it yourself. The gRPC client will handle that internally. It's enough to provide such initialisation:

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

## Differences in appending events

### Transactions

The most significant breaking change in the gRPC client is that it **does not support transactions anymore**. In the TCP client may perform multiple appends to EventStoreDB as one transaction. The transaction can only append events to one stream. Transactions across multiple streams are not supported. gRPC client still supports appending more than one event to the single stream as an atomic operation. 

A transaction can be long-lived, and opening it for a stream doesn't lock it. Another process can write to the same stream. In this case, your transaction might fail if you use idempotent writes with the expected version. If you use transactions, we recommend reevaluating your consistency guarantees and stream modelling to reduce the need for appending events. If you still need to use them, you may consider adding your own Unit of Work implementation, as, e.g.:

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
