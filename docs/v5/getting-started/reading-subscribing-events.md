# Step 2 - Read events from a stream and subscribe to changes

This getting started guide shows you how to get started with Event Store using the Atom publishing protocol as the primary interface. 

::: warning
The described is for development and evaluation of Event Store. It does not describe a production setup. The HTTP examples use cURL, but you can read Atom feeds with a wide variety of applications and languages.
:::

This second step covers reading events from a stream and subscribing to changes to events in a stream.

## Read a stream of events

Event Store exposes all streams as [atom feeds](http://tools.ietf.org/html/rfc4287), and you can read data from the stream by navigating to the _head URI_ of the stream _http://127.0.0.1:2113/streams/{STREAM_ID}_ with cURL, [use an SDK client](/v5/getting-started/which-api-sdk.md), or click the _Stream Browser_ tab in the Admin UI and you see the stream you created in step 1.

![The Admin UI Dashboard](../images/es-web-admin-stream-browser.png)

::::: tabs
:::: tab HTTP API Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/getting-started/read-stream.sh)

::: tip
This returns the feed in JSON format, you can also use `Accept:application/atom+xml` if you prefer XML.
:::

::::
:::: tab HTTP API Response

@[code lang=bash transclude={3-67}](@/docs/v5/code-examples/getting-started/read-stream.sh)

::::
:::: tab .NET Client API

To use the .NET API, use the following method passing the stream name, the start point in the stream, the number of events to read and whether to follow links to the event data:

@[code lang=cpp transclude={103-105}](@/docs/v5/code-examples/DocsExample/Program.cs)

::: tip Next steps
[Read this guide](/docs/v5/dotnet-api/reading-events.md) for more information on how to read events with the .NET API.
:::

::::
:::: tab JVM client

To use the JVM client, use the following method passing the stream name, the number of the event to read, and whether to follow links to the event data:

@[code lang=java transclude={21-29}](@/docs/v5/code-examples/EventStore.Samples.Java/src/main/java/org/eventstore/sample/ReadMultipleEventsExample.java)

::::
:::::

## Read a single event

The feed has a single item inside of it, the one you posted in [part 1](/v5/getting-started/index.md). You can see details of the event in the _Stream Browser_ tab in the Admin UI by selecting a stream to see its events, and then selecting an event. Or with cURL, issue a `GET` to the `alternate` URI value from the response above.

::::: tabs
:::: tab HTTP API Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/getting-started/read-event.sh)

::: tip
This returns the feed in JSON format, you can also use `Accept:application/atom+xml` if you prefer XML.
:::

::::
:::: tab HTTP API Response

@[code lang=bash transclude={3-17}](@/docs/v5/code-examples/getting-started/read-event.sh)

::::
:::: tab .NET Client API

To use the .NET API, use the following method passing the stream name, the event you want to read and wether to return the event data:

@[code lang=cpp transclude={107-108}](@/docs/v5/code-examples/DocsExample/Program.cs)

::::
:::: tab JVM Client

To use the Java client, use the following method passing the stream name, the event you want to read and if you want to also return the event data:

@[code lang=java transclude={21-29}](@/docs/v5/code-examples/EventStore.Samples.Java/src/main/java/org/eventstore/sample/ReadSingleEventExample.java)

::::
:::::

## Paginating through events

For longer feeds of events than this example, you need to paginate through the feed, reading a certain number of events at a time.

You can use the HTTP API [to paginate](/docs/v5/http-api/reading-streams.md#feed-paging) through the feed using _previous_ and _next_ links within the stream. Or you can [use a read method](/docs/v5/dotnet-api/reading-events.md#example-read-an-entire-stream-forwards-from-start-to-end) of the .NET API (and JVM client), to loop through events a certain number at a time.

## Subscribing to receive stream updates

A common operation is to subscribe to a stream and receive notifications for changes. As new events arrive, you continue following them. Event Store support more than one subscription type however we will start with most commonly used named _persistent subscription_.

### Create a persistent subscription in the Admin UI

You can create subscription and watch events as they arrive under the _Persistent Subscriptions_ tab.

1. Select _Persistent Subscriptions_ tab.
2. Click _New Subscription_ button.
3. Enter a name for this subscription group. If you are not sure what to type have a look at example below.
4. Enter the name of the stream you want to subscribe to.
5. Configure the other options. You can find more information about the options in the [.NET API PersistentSubscriptionSettings object](xref:EventStore.ClientAPI.PersistentSubscriptionSettings).
6. Click _Create_ button to submit the new persistent subscription.

![Subscriptions in the Admin UI](../images/getting-started-subscriptions.png)

### Create a persistent subscription programmatically

::::: tabs
:::: tab HTTP API request

@[code lang=bash transclude={1-2}](@/docs/v5/code-examples/getting-started/creating-subscription.sh)

::::
:::: tab .NET API

@[code lang=cpp transclude={14-21}](@/docs/v5/code-examples/DocsExample/GettingStarted/CreatePersistentSubscription.cs)

::: tip Next steps
Find more details on the parameters used in the example above, read the API documentation for [`PersistentSubscriptionSettings`](xref:EventStore.ClientAPI.PersistentSubscriptionSettings), [`CreatePersistentSubscriptionAsync`](xref:EventStore.ClientAPI.IEventStoreConnection.CreatePersistentSubscriptionAsync*) and [`ConnectToPersistentSubscription`](xref:EventStore.ClientAPI.IEventStoreConnection.ConnectToPersistentSubscriptionAsync*)
:::

::::
:::: tab JVM client API

@[code lang=java transclude={14-34}](@/docs/v5/code-examples/EventStore.Samples.Java/src/main/java/org/eventstore/sample/SubscriptionExample.java)

::::
:::::

### Subscription types

There are three types of subscription patterns, useful in different situations.

#### Volatile subscriptions

This subscription calls a given function for events written after establishing the subscription. They are useful when you need notification of new events with minimal latency, but where it's not necessary to process every event.

For example, if a stream has 100 events in it when a subscriber connects, the subscriber can expect to see event number 101 onwards until the time the subscription is closed or dropped.

#### Catch-up subscriptions

This subscription specifies a starting point, in the form of an event number or transaction file position. You call the function for events from the starting point until the end of the stream, and then for subsequently written events.

For example, if you specify a starting point of 50 when a stream has 100 events, the subscriber can expect to see events 51 through 100, and then any events are subsequently written until you drop or close the subscription.

#### Persistent subscriptions

::: tip
Persistent subscriptions exist in version 3.2.0 and above of Event Store.
:::

In contrast to volatile and Catch-up types persistent subscriptions are not dropped when connection is closed. Moreover, this subscription type supports the "[competing consumers](https://docs.microsoft.com/en-us/azure/architecture/patterns/competing-consumers)" messaging pattern and are useful when you need to distribute messages to many workers. Event Store saves the subscription state server-side and allows for at-least-once delivery guarantees across multiple consumers on the same stream. It is possible to have many groups of consumers compete on the same stream, with each group getting an at-least-once guarantee.

## Next step

In this second part of our getting started guide you learned how to read events from a stream and subscribe to changes. The next part covers projections, used to give you continuous queries of your data.

-   [Step 3 - Projections](/v5/getting-started/projections.md)
