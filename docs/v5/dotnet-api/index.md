# Overview

The .NET Client API communicates with Event Store over TCP, using length-prefixed serialised protocol buffers. The API allows for reading and writing operations, as well as for subscriptions to individual event streams or all events written.

A prerequisite to this chapter is finishing [Getting Started](~/getting-started/index.md) guide and having the Event Store NuGet package installed.

## EventStoreConnection

The `EventStoreConnection` class maintains a full-duplex connection between the client and the Event Store server. `EventStoreConnection` is thread-safe, and we recommend that you create one node per application.

Event Store handles all connections asynchronously, returning either a `Task` or a `Task<T>`. If you need to execute synchronously, call `.Wait()` on the asynchronous version.

::: tip
To get maximum performance from a non-blocking connection, we recommend you use it asynchronously.
:::

## Quick start

The code below shows how to connect to an Event Store server, write to a stream, and read back the events. For more detailed information, read the full pages for [connecting to a server](/dotnet-api/connecting-to-a-server.md), [reading events](/dotnet-api/reading-events.md) and [writing to a stream](/dotnet-api/streams.md#writing-to-a-stream)

::::: tabs
:::: tab JSON format event

@[code lang=cpp](@/docs/v5/code-examples/DocsExample/DotNetClient/QuickStartJsonFormat.cs)

::::
:::: tab Plain-text format event

@[code lang=cpp](@/docs/v5/code-examples/DocsExample/DotNetClient/QuickStartPlainFormat.cs)

::::
:::::

::: tip
We recommended to use the JSON format for data and metadata.
:::