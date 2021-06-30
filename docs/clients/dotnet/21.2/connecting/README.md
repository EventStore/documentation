# Connecting to EventStoreDB

Describe connecting to the single node and to the cluster.

Gossip seeds, using ip addresses and DNS.

The .NET Client API communicates with EventStoreDB over TCP, using length-prefixed serialised protocol buffers. The API allows for reading and appending operations, as well as for subscriptions to individual event streams or all events appended.

## EventStoreConnection

The `EventStoreConnection` class maintains a full-duplex connection between the client and the EventStoreDB server. `EventStoreConnection` is thread-safe, and we recommend that you create one node per application.

EventStoreDB handles all connections asynchronously, returning either a `Task` or a `Task<T>`.

::: tip
To get maximum performance from a non-blocking connection, we recommend you use it asynchronously.
:::

## Quick start

The code below shows how to connect to an EventStoreDB server, appends to a stream, and read back the events. For more detailed information, read the full pages for connecting to a server using [connection string](connection-string.md) and [connection settings](settings.md), [reading events](../reading/README.md) and [appending to a stream](../appending/README.md)

<xode-group>
<xode-block title="JSON format event">

<<< @/docs/clients/dotnet/21.2/sample-code/DotNetClient/QuickStartJsonFormat.cs
</xode-block>
<xode-block title="Plain-text format event">

<<< @/docs/clients/dotnet/21.2/sample-code/DotNetClient/QuickStartPlainFormat.cs
</xode-block>
</xode-group>

::: tip
We recommended to use the JSON format for data and metadata.
:::

