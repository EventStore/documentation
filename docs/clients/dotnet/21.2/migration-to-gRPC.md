# Migration to gRPC client

The TCP client is considered legacy. We recommend migrating to the gRPC client. 

We decided to use gRPC as our communication protocol, as it enabled us to standardise client communication. Thanks to that, we benefit from the built-in gRPC functionalities like streaming, back-pressure,etc., instead of building custom implementations. 

As gRPC is multi-platform and a widely adopted standard, it has enabled us to provide a unified approach and deliver clients for other dev environments like Go, JVM, NodeJs, and Rust.

The TCP client will still get necessary bug fixes, but new database features will be only delivered for gRPC clients (e.g., persistent subscription to `$all`).

Having all of that, we encourage you to migrate to the gRPC client. This document outlines the needed steps. Please see the [gRPC documentation](/clients/grpc/) for more details on how to use it.

## Update the target Framework

The gRPC client doesn't support .NET Standard. The change comes from using different gRPC implementations for the specific .NET Framework version to tune the performance.

If you were using it in the .NET Standard library, you have to update it to one of:
- .NET 6 (`net6.0`),
- .NET 5 (`net5.0`),
- .NET Core 3.1 (`netcoreapp3.1`).

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

To use the gRPC client, you need to replace the TCP client package (`EventStore.Client`) with the gRPC one (`EventStore.Client.Grpc.Streams`). 

```xml{2-3}
 <ItemGroup>
-  <PackageReference Include="EventStore.Client" Version="21.2.1" />
+  <PackageReference Include="EventStore.Client.Grpc.Streams" Version="21.2.0" />
 </ItemGroup>
```

## Migration strategies

You may also consider a step by step migration:
- add the gRPC client and keeping the TCP one,
- gradually replace usages, e.g., start with event append and reads, keeping subscriptions on TCP client. Once that's settled, move the subscriptions code into gRPC.
- remove the TCP client package reference as the last step.

You may also consider wrapping common logic into extension methods or repository classes. Adding a temporary wrapping layer lets us centralise and isolate the changes we perform during the migration. Thanks to that, you can replace the inner implementations, keeping usages the same. Read more in Martin Fowler's article [An example of preparatory refactoring](https://martinfowler.com/articles/preparatory-refactoring-example.html).

Sample wrapper for the TCP client:

```csharp
public class EventStore
{
    readonly IEventStoreConnection tcpConnection;

    public EventStore(IEventStoreConnection tcpConnection)
        => this.tcpConnection = tcpConnection;

    public Task AppendEvents(
        string streamName,
        long version,
        params object[] events
    )
    {
        var preparedEvents = events
            .Select(ToEventData)
            .ToArray();

        return tcpConnection.AppendToStreamAsync(
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
            var page = await tcpConnection.ReadStreamEventsForwardAsync(
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
        var result = await tcpConnection.ReadEventAsync(stream, 1, false);
        return result.Status != EventReadStatus.NoStream;
    }
}
```

## Differences in connection management

Both the TCP and gRPC clients manage reconnections. Therefore it should be registered as a single instance in the application. 

The TCP client requires calling the `ConnectAsync` method at least once to initiate the connection. That wasn't ideal if you wanted to inject an already set up connection, as you either had to call it asynchronously or risk deadlocks.

```csharp
private async Task<IEventStoreConnection> GetEventStoreConnection(string connectionString)
{
    var tcpConnection = EventStoreConnection.Create(connectionString);
    await tcpConnection.ConnectAsync();
    return tcpConnection;
}
```

The TCP client connection logic is not thread-safe (`ConnectAsync` method), however the other operations are thread-safe. Because of that, you have to ensure that you won't have a race condition. You also should consider handling `Closed` events to manage reconnection if it is closed. 

The TCP client supports built-in reconnections; however, you need to be careful about setting the connections options properly. Wrongly defined settings can cause a flood of reconnections, increasing the chance for failure. For instance, additional retries may worsen if the reason was a high load on the database.

Sample code with reconnections could look like this:

```csharp
private async Task<IEventStoreConnection> GetEventStoreConnection(string connectionString)
{
    var tcpConnection = EventStoreConnection.Create(
        connectionString,
        ConnectionSettings.Create()
            .FailOnNoServerResponse()
            .KeepReconnecting()
            .SetOperationTimeoutTo(TimeSpan.FromSeconds(5))
            .LimitAttemptsForOperationTo(7)
            .LimitRetriesForOperationTo(7)
    );
    await tcpConnection.ConnectAsync();
    return tcpConnection;
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

        var tcpConnection = await connect;
        
        return await tcpConnection.AppendToStreamAsync(
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
For the gRPC client, we recommend switching from the settings object to using a connection string. All of the settings are exposed through it. The TCP client and gRPC client connection strings are not compatible with each other. However, a unified approach to using connection strings instead of settings can help in the step by the step migration. 

You can use the [online configuration tool](/clients/grpc/#connection-details) to generate the connection string for your EventStoreDB deployment. If you connect to your database, it'll automatically grab the config and generate a connection string.

## Security
EventStoreDB from version 20.6 is secured by default. The gRPC clients follow that approach. You can use an insecure connection by providing `tls=false` in the connection string, but we don't recommend it for scenarios other than local development. Access Control List checks are not performed on an insecure connection.

Read more in [database security docs](/server/v21.10/security/).

## Appending events

### Event Data

There are minor changes to the `EventData` signature:
- The namespace was changed from `EventStore.ClientAPI` to `EventStore.Client`
- Event id requires using the `Uuid` class instead of `Guid`. We adopted the [Universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) standard to provide unified behaviour between all gRPC clients.
- we are allowed to provide content type. It enables more advanced serialisation scenarios (e.g., using a few non-JSON serialisation formats). Instead of setting the `isJson` flag for the gRPC client, you should provide the text value of the content type. The default one is `application/json`, which is equivalent to setting `isJson` flag to `true`. If you're using the custom format, you should provide its name, e.g. `application/octet-stream`.

::: note
In the samples below, I'm using [Json.NET](https://www.newtonsoft.com/json), as it was commonly used to serialise JSON event data in TCP clients. You may consider [migrating to System.Text.Json](https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-migrate-from-newtonsoft-how-to) as this may improve performance and remove package dependency. However, keep in mind that it doesn't have full feature parity. If you use some more complex features, they may not work the same way. Check the [gRPC client documentation](/clients/grpc/) for samples using `System.Text.Json`.
:::

For the JSON Event Data, you have to change the TCP client logic from:

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

to:

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

to:

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

-       return tcpConnection.AppendToStreamAsync(
+       return grpcClient.AppendToStreamAsync(
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

The most significant breaking change in the gRPC client is that it **does not support transactions anymore**. The TCP client may perform multiple appends to EventStoreDB in one transaction. The transaction can only append events to one stream. Transactions across multiple streams are not supported. The gRPC client still supports appending more than one event to the single stream as an atomic operation. 

A transaction can be long-lived, and opening it for a stream doesn't lock it. Another process can write to the same stream. In this case, your transaction might fail if you use idempotent writes with the expected version. If you use transactions, we recommend reevaluating your consistency guarantees and stream modelling to reduce the need for appending events. If you still need to use them, you may consider adding your own Unit of Work implementation, as, for example:

```csharp
public class EventStoreDBUnitOfWork
{
    private readonly EventStoreClient grpcClient;
    private readonly List<EventData> uncommittedEvents = new();
    private readonly string streamName;
    private readonly StreamRevision expectedStreamRevision;

    private EventStoreDBUnitOfWork(EventStoreClient grpcClient, string streamName,
        StreamRevision expectedStreamRevision)
    {
        this.grpcClient = grpcClient;
        this.streamName = streamName;
        this.expectedStreamRevision = expectedStreamRevision;
    }

    public static EventStoreDBUnitOfWork Begin(EventStoreClient grpcClient, string streamName,
        StreamRevision expectedStreamRevision) =>
        new(grpcClient, streamName, expectedStreamRevision);

    public Task<IWriteResult> Commit(CancellationToken cancellationToken = default)
        => grpcClient.AppendToStreamAsync(
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

The TCP Client has dedicated methods for reading events in the specific direction: 
- `ReadStreamEventsForwardAsync`,
- `ReadStreamEventsBackwardAsync`,
- `ReadAllEventsForwardAsync`,
- `ReadStreamEventsBackwardAsync`.

In the gRPC client, we unified those methods into methods with the direction parameter:
- `ReadStreamAsync`,
- `ReadAllAsync`.

To read a stream forwards, use:

```csharp
await using var readResult = grpcClient.ReadStreamAsync(
    Direction.Forwards,
    streamName,
    StreamPosition.Start
);
```

To read a stream backwards, use: 

```csharp
await using var readResult = grpcClient.ReadStreamAsync(
    Direction.Backwards,
    streamName,
    StreamPosition.End
);
```

Accordingly, to read the `$all` stream forwards, use:

```csharp
await using var readResult = grpcClient.ReadAllAsync(
    Direction.Forwards,
    streamName,
    Position.Start
);
```

and to read the `$all` stream backwards:

```csharp
await using var readResult = grpcClient.ReadAllAsync(
    Direction.Backwards,
    streamName,
    Position.End
);
```

### Read positions

Both TCP and gRPC clients allow reading the stream from a specific position (representing the location of the particular event in the stream). We decided to make positions more explicit according to the stream revision changes in [appending new events](#appending-events). 

We expanded a `StreamPosition` class that centralises stream position handling. It still has a `Start` and an `End` constant representing the logical stream's position. However, they no longer return `long` values but a `StreamPosition` class instance. We replaced `long` values with `ulong` as stream position is always positive.

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

The TCP Client requires paging through the results. You must provide the maximum number of events you want to read in the single read call. In the gRPC client, this is optional. By default, it will try to read all events. To make it efficient, read methods return [IAsyncEnumerable](https://docs.microsoft.com/en-us/archive/msdn-magazine/2019/november/csharp-iterating-with-async-enumerables-in-csharp-8). Which means that it won't load the whole stream at once but iterate sequentially, reducing the memory pressure.

Instead of doing paging like this in TCP client:

```csharp
public async Task<IEnumerable<object>> LoadEvents(string stream)
{
    const int pageSize = 4096;

    var readFrom  = 0;
    var events = new List<object>();
    StreamEventsSlice page;

    do
    {
        var page = await tcpConnection.ReadStreamEventsForwardAsync(
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
    await using var readResult = grpcClient.ReadStreamAsync(
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

The gRPC client uses `ReadOnlyMemory<byte>` instead of a byte array to make event processing more efficient. To support that, you will need to modify your deserialisation logic slightly:

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

The gRPC client handles reconnections internally. But contrary to the TCP client, it does not have built-in retries for failed operations. It only does retries for the persistent subscriptions. If your codebase depends on them, you should wrap operations with your custom retry policy (e.g. using [Polly](https://github.com/App-vNext/Polly)).

If you were using the following configuration:

```csharp
var settings = ConnectionSettings.Create()
    .FailOnNoServerResponse()
    .KeepReconnecting()
    .SetOperationTimeoutTo(TimeSpan.FromSeconds(5))
    .LimitRetriesForOperationTo(7);

var tcpConnection = EventStoreConnection.Create(
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
        this EventStoreClient grpcClient,
        Func<EventStoreClient, CancellationToken, Task> action,
        CancellationToken cancellationToken
    ) =>
        RetryPolicy.ExecuteAsync(ct => action(grpcClient, ct), cancellationToken);

    public static Task<TResult> ExecuteAsync<TResult>(
        this EventStoreClient grpcClient,
        Func<EventStoreClient, CancellationToken, Task<TResult>> action,
        CancellationToken cancellationToken
    ) =>
        RetryPolicy.ExecuteAsync(ct => action(grpcClient, ct), cancellationToken);
}
```

and use it, e.g. as:

```csharp
public static Task<List<ResolvedEvent>> ReadStreamWithRetryAsync(
    this EventStoreClient grpcClient,
    string streamName,
    CancellationToken cancellationToken
) =>
    grpcClient.ExecuteAsync(
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
You should be careful in defining the retry policy. Not all operations are idempotent by default. Reads are idempotent, however, if you're not using [optimistic concurrency](/clients/grpc/appending-events.md#handling-concurrency) or do not provide the same event id for appends, it may result in duplicates. You need to decide which exceptions you'd like to retry, e.g., there is no point in retrying `StreamDeleted` as the stream won't reappear. 
:::

## Catch-up Subscriptions

We unified catch-up subscriptions API in the gRPC client. In the TCP client, you have multiple methods for subscribing to EventStoreDB, e.g., `SubscribeToStreamAsync`, `SubscribeToStreamFrom`, `FilteredSubscribeToAllAsync`, etc. Now you have two main options:
- subscribing to a single stream using `SubscribeToStreamAsync`,
- subscribing to the `$all` stream using `SubscribeToAllAsync`.

Both methods include overloads for specific configurations and optional parameters with sane defaults. The recommendation is to use the default settings and modify them when needed.

### Positions

As with other operations, we aligned the subscription checkpoint/position handling. Accordingly, for [reading](#reading-events), instead of using `Nullable<Int64>`, we introduced the following types:
- `StreamPosition` for a single stream subscription,
- `Position` for the `$all` stream.

Each subscription method has an overload taking either a specific position or the default one (from the start). For instance, if you were previously using a unified approach:

```csharp
long? streamPosition = GetLastCheckpoint();

tcpConnection.SubscribeToStreamFrom(
    streamName,
    streamPosition,
    false,
    EventAppeared,
    SubscriptionDropped
);
```

Now you'd need to call different overloads:

```csharp
StreamPosition? streamPosition = GetLastCheckpoint();

if (streamPosition.HasValue)
{
    await grpcClient.SubscribeToStreamAsync(
        streamName,
        streamPosition.Value,
        EventAppeared,
        false,
        SubscriptionDropped
    );
}
else
{
    await grpcClient.SubscribeToStreamAsync(
        streamName,
        EventAppeared,
        false,
        SubscriptionDropped
    );
}
```

Accordingly, you need to perform the same change for subscription to the `$all` stream.

```csharp
long? position = GetLastCheckpoint();

tcpConnection.SubscribeToAllFrom(
    position,
    false,
    EventAppeared,
    SubscriptionDropped
);
```

Now you'd need to call different overloads:

```csharp
Position? position = GetLastCheckpoint();

if (streamPosition.HasValue)
{
    await grpcClient.SubscribeToAllAsync(
        position.Value,
        EventAppeared,
        false,
        SubscriptionDropped
    );
}
else
{
    await grpcClient.SubscribeToAllAsync(
        EventAppeared,
        false,
        SubscriptionDropped
    );
}
```

### Events filtering

EventStoreDB allows you to filter the events whilst you subscribe to the `$all` stream so that you only receive the events that you care about. The TCP client provides that option via the `FilteredSubscribeToAll` method. As was mentioned above, this method was unified with `SubscribeToAllAsync`. 

Thus, instead of such call in TCP:

```csharp
var filter = Filter.ExcludeSystemEvents;
var filteredSettings = CatchUpSubscriptionFilteredSettings.Default;

tcpConnection.FilteredSubscribeToAllFrom(
    position,
    filter,
    filteredSettings,
    EventAppeared,
    LiveProcessingStarted,
    SubscriptionDropped
);
```

You need to use:

```csharp
var filter = 
    new SubscriptionFilterOptions (EventTypeFilter.ExcludeSystemEvents());

await grpcClient.SubscribeToAllAsync(
    position,
    EventAppeared,
    false,
    SubscriptionDropped,
    filter
);
```

The `CatchUpSubscriptionFilteredSettings` and `Filter` types from the TCP client were unified into single `SubscriptionFilterOptions` in gRPC.

Read more in the [gRPC server-side filtering docs](/clients/grpc/subscriptions.md#server-side-filtering).

### Knowing when live processing started

The TCP client provides the possibility to provide a handler that will be called when live processing starts:

```csharp{6}
tcpConnection.SubscribeToStreamFrom(
    streamName,
    streamPosition,
    false,
    EventAppeared,
    subscription => Console.WriteLine("Processing live"),
    SubscriptionDropped
);
```

gRPC clients do not provide such a feature. However, you can handle that by comparing the current stream (or the `$all` stream) position with the position of the last received event from the subscription. You also need to define a threshold. If the system is live, new events will constantly appear, and you might not get fully caught up (especially for the `$all` stream).

You can perform gap measurement:

```csharp
public static class GapMeasurement
{
    public static async Task<ulong> GetStreamSubscriptionGap
    (
        this EventStoreClient grpcClient,
        string streamName,
        StreamPosition subscriptionLastPosition,
        CancellationToken cancellationToken
    )
    {
        var getCurrentLastEvent = await grpcClient
            .ReadStreamAsync(
                Direction.Backwards,
                streamName,
                StreamPosition.End,
                1,
                resolveLinkTos: false,
                cancellationToken: cancellationToken
            ).LastAsync(cancellationToken);

        var currentLastPosition = getCurrentLastEvent.Event.EventNumber.ToUInt64();

        return subscriptionLastPosition - currentLastPosition;
    }

    public static async Task<ulong> GetAllStreamSubscriptionGap
    (
        this EventStoreClient grpcClient,
        Position subscriptionLastPosition,
        CancellationToken cancellationToken
    )
    {
        var getCurrentLastEvent = await grpcClient
            .ReadAllAsync(
                Direction.Backwards,
                Position.End,
                1,
                resolveLinkTos: false,
                cancellationToken: cancellationToken
            ).LastAsync(cancellationToken);

        var currentLastPosition = getCurrentLastEvent.Event.Position.CommitPosition;

        // Warning: the $all stream position is not autoincremented number.
        // It doesn't represent the event number in the $all stream.
        // It's a logical position representing the location in the storage.
        return subscriptionLastPosition.CommitPosition - currentLastPosition;
    }
}
```

Having the gap calculated, you can verify if it's below the defined threshold:

```csharp
private const uint SubscriptionThreshold = 10;

public static async Task<bool> IsLive(Func<Task<ulong>> getSubscriptionGap)
{
    var subscriptionGap = await getSubscriptionGap();

    return subscriptionGap < SubscriptionThreshold;
}

```

You can use this logic in:
- the event appeared callback,
- the [checkpoint reached callback](/clients/grpc/subscriptions.md#checkpointing) if you're using a filtered subscription. 

You may also consider some performance improvements like checking once every few events or using a cache for reads.

### Resolving linked events

[Projections in EventStoreDB](/server/v21.10/projections/) let you append new events or link existing events to streams. Links won't contain the original event data. ESDB can resolve it automatically depending on the value you passed to the operation call.

The TCP client by default resolved linked events. gRPC changes that behaviour to only resolve them if you ask for that explicitly.

To do that, you need to pass `true` to the `resolveLinkTos` param, e.g., for a regular stream:

```csharp{4}
await grpcClient.SubscribeToStreamAsync(
    streamName,
    EventAppeared,
    true,
    SubscriptionDropped
);
````

or for the `$all` stream:

```csharp{3}
await grpcClient.SubscribeToAllAsync(
    EventAppeared,
    true,
    SubscriptionDropped
);
```

Read more in the [resolve link-to's gRPC docs](/clients/grpc/subscriptions.md#resolving-link-to-s).

## Persistent subscriptions
TODO
