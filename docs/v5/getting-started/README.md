---
outputFileName: index.html
---

# Step 1 - Install, run, and write your first event

!!!include(docs/v5/getting-started/_intro.md)!!!

This first step covers installation and running Event Store, and writing your first event.

## Interacting with an Event Store server

There are three ways to interact with Event Store:

1.  [With the Admin UI](/v5/server/admin-ui.md).
2.  [With the HTTP API](/v5/http-api/index.md).
3.  With a Client API, which you need to install first. Our documentation covers the [.NET Core client API](~/dotnet-api/index.md) and the [JVM client](https://github.com/EventStore/EventStore.JVM) but [others](~/getting-started/which-api-sdk.md) are available.

## Discover Event Store via Admin UI

Event Store ships with GUI called Admin UI, which allows browsing statistics, streams and events manipulation, user management and more. Admin UI is visible under `2113` port, navigate to <http://127.0.0.1:2113/> in your web browser to see it.

> [!TIP]
> The default username and password is `admin:changeit`

![The Admin UI Dashboard](/v5/getting-started/images/es-web-admin-dashboard.png)

## First call to HTTP API

Event Store expose HTTP API that allows cross-platform integration. API is exposed under the same port `2113` as Admin UI. For example `curl -i http://127.0.0.1:2113/stats` for the HTTP API.

## Connecting to Event Store

Get on the fast-track with native SDK for your language of choice. Full list of supported SDS's available [here](~/getting-started/which-api-sdk.md).

### [.NET client](#tab/tabid-dotnet-client)

[Install the .NET client API](https://www.nuget.org/packages/EventStore.Client) using your preferred method.

Add it to your project:

```shell
dotnet add package EventStore.Client
```

And require it in your code:

```csharp
using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
```

### [JVM client](#tab/tabid-jvm-client)

[Add the JVM client](https://github.com/EventStore/EventStore.JVM#setup) using Maven:

```xml
<dependency>
    <groupId>com.geteventstore</groupId>
    <artifactId>eventstore-client_2.12</artifactId>
    <version>7.0.2</version>
</dependency>
```

And import it in your code.

<!-- TODO: Add more detail -->

* * *

To use a client API, you use port `1113` and create a connection:

### [.NET client](#tab/tabid-dotnet-client-connect)

When using the .NET client, you also need to give the connection a name.


> [!NEXT]
> In this example we used the [`EventStoreConnection.Create()`](xref:EventStore.ClientAPI.EventStoreConnection.Create(System.String,System.String)) overloaded method but [others are available](xref:EventStore.ClientAPI.EventStoreConnection).

### [JVM client](#tab/tabid-jvm-client-connect)


> [!NOTE]
> For our JVM examples we use [akka](https://akka.io), a toolkit for building highly concurrent and distributed JVM applications.

* * *

## Writing events to an Event Stream

Event Store operates on a concept of Event Streams, and the first operation we look at is how to write to a stream. If you are Event Sourcing a domain model, a stream equates to an aggregate function. Event Store can handle hundreds of millions of streams, so create as many as you need.

If you post to a stream that doesn't exist, Event Store creates it before adding the events.

### Writing events using the admin UI

You can write events using the Admin UI by clicking the _Stream Browser_ tab, the _Add Event_ button, filling in the form with relevant values and clicking the _Add_ button at the bottom of the page.

![Creating an event with the Admin UI interface](/v5/images/getting-started
-add-event.gif)

Open a text editor, copy and paste the following event definition, and save it as _event.json_.

[!code-json[getting-started-write-event-json](~/code-examples/getting-started/event.json "The contents of event.json")]

### Writing events programmatically

### [HTTP API](#tab/tabid-4)

Use the following cURL command, passing the name of the stream and the events to write:

[!code-bash[getting-started-write-event-request](~/code-examples/getting-started/write-event.sh?start=1&end=1)]

> [!NEXT]
> Read [this guide](~/http-api/creating-writing-a-stream.md) for more information on how to write events with the HTTP API.

> [!NOTE]
> You can also post events to the HTTP API as XML, by changing the `Content-Type` header to `XML`.

### [.NET client](#tab/tabid-5)

To use the .NET client, use the following method, passing the name of the stream, the version, and the events to write:

[!code-csharp[getting-started-write-event-request](../../EventStore.Samples.Dotnet/DocsExample/GettingStarted/ConnectEventStore.cs?range=12-17)]

> [!NEXT]
> Read [this guide](~/http-api/creating-writing-a-stream.md) for more information on how to write events with the .NET API. We don't cover version checking in this guide, but you can read more in [the optimistic concurrency guide](~/dotnet-api/optimistic-concurrency-and-idempotence.md).

### [JVM client](#tab/tabid-6)

To use the JVM Client, use the following method, passing the name of the stream, the version, and the events to write. You also need an Akka `AbstractActor` to return the response from Event Store:

[!code-java[getting-started-connection](../../EventStore.Samples.Java/src/main/java/org/eventstore/sample/WriteEventExample.java?start=18&end=41)]

* * *

## Next step

In this first part of our getting started guide you learned how to install and run Event Store and write your first event. The next part covers reading events from a stream.

-   [Step 2 - Read events from a stream and subscribe to changes](~/getting-started/reading-subscribing-events.md)
