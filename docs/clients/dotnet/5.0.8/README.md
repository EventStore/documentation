# Overview

The .NET Client API communicates with Event Store over TCP, using length-prefixed serialised protocol buffers. The API allows for reading and writing operations, as well as for subscriptions to individual event streams or all events written.

A prerequisite to this chapter is finishing [Getting Started](~/getting-started/index.md) guide and having the Event Store .NET Client NuGet package installed.

## EventStoreConnection

The `EventStoreConnection` class maintains a full-duplex connection between the client and the Event Store server. `EventStoreConnection` is thread-safe, and we recommend that you create one node per application.

Event Store handles all connections asynchronously, returning either a `Task` or a `Task<T>`.

::: tip
To get maximum performance from a non-blocking connection, we recommend you use it asynchronously.
:::

## Quick start

The code below shows how to connect to an Event Store server, write to a stream, and read back the events. For more detailed information, read the full pages for [connecting to a server](connecting-to-a-server.md), [reading events](reading-events.md) and [writing to a stream](streams.md#writing-to-a-stream)

::::: el-tabs
:::: el-tab-pane label="JSON format event"

<<< @/docs/clients/dotnet/sample-code/DotNetClient/QuickStartJsonFormat.cs

::::
:::: el-tab-pane label="Plain-text format event"
<<< @/docs/clients/dotnet/sample-code/DotNetClient/QuickStartPlainFormat.cs
::::
:::::

::: tip
We recommended to use the JSON format for data and metadata.
:::
