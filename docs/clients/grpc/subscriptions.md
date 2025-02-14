---
order: 4
---

# Catch-up subscriptions

Subscriptions allow you to subscribe to a stream and receive notifications about new events added to the stream.

You provide an event handler and an optional starting point to the subscription. The handler is called for each event from the starting point onward.

If events already exist, the handler will be called for each event one by one until it reaches the end of the stream. From there, the server will notify the handler whenever a new event appears.

:::tip
Check the [Getting Started](getting-started.md) guide to learn how to configure and use the client SDK.
:::

## Subscribing from the start

When you need to process all the events in the store, including historical events, you'd need to subscribe from the beginning. You can either subscribe to receive events from a single stream, or subscribe to `$all` if you need to process all events in the database.

### Subscribing to a stream

The simplest stream subscription looks like the following :

@[code{subscribe-to-stream}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

The provided handler will be called for every event in the stream.

When you subscribe to a stream with link events, for example the `$ce` category stream, you need to set `resolveLinkTos` to `true`. Read more about it [below](#resolving-link-to-s).

### Subscribing to `$all`

Subscribing to `$all` is much the same as subscribing to a single stream. The handler will be called for every event appended after the starting position.

@[code{subscribe-to-all}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## Subscribing from a specific position

The previous examples will subscribe to the stream from the beginning. This will end up calling the handler for every event in the stream and then wait for new events after that.

Both the stream and $all subscriptions accept a starting position if you want to read from a specific point onward. If events already exist at the position you subscribe to, they will be read on the server side and sent to the subscription.

Once caught up, the sever will push any new events received on the streams to the client. There is no difference between catching up and live on the client side.

::: warning
The positions provided to the subscriptions are exclusive. You will only receive the next event after the subscribed position.
:::

### Subscribing to a stream

To subscribe to a stream from a specific position, you need to provide a *stream position*. This can be `Start`, `End` or a *big int* (unsigned 64 bit integer) position.

The following subscribes to the stream `some-stream` at position `20`, this means that events `21` and onward will be handled:

@[code{subscribe-to-stream-from-position}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

### Subscribing to $all

Subscribing to the `$all` stream is much like subscribing to a regular stream. The only difference is how you need to specify the stream position. For the `$all` stream, you have to provide a `Position` structure instead, which consists of two big integers - prepare and commit positions. The `Position` value can be `Start`, `End` or a `Position` created from a commit and prepare position.

The corresponding `$all` subscription will subscribe from the event after the one at commit position `1056` and prepare position `1056`.

Please note that this position will need to be a legitimate position in `$all`.

@[code{subscribe-to-all-from-position}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## Subscribing to a stream for live updates

You can subscribe to a stream to get live updates by subscribing to the end of the stream:

@[code{subscribe-to-stream-live}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

And the same works with `$all` :

@[code{subscribe-to-all-live}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

This won't read through the history of the stream, but will rather notify the handler when a new event appears in the respective stream.

Keep in mind that when you subscribe to a stream from a certain position, as described [above](#subscribing-from-a-specific-position), you will also get live updates after your subscription catches up (processes all the historical events).

## Resolving link-to's

Link-to events point to events in other streams in EventStoreDB. These are generally created by projections such as the `$by_event_type` projection which links events of the same event type into the same stream. This makes it easier to look up all events of a certain type.

::: tip
[Filtered subscriptions](subscriptions.md#server-side-filtering) make it easier and faster to subscribe to all events of a certain type or matching a prefix.
:::

When reading a stream you can specify whether to resolve link-to's or not. By default, link-to events are not resolved. You can change this behaviour by setting the `resolveLinkTos` parameter to `true`:

@[code{subscribe-to-stream-resolving-linktos}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## Dropped subscriptions

When a subscription stops or experiences an error, it will be dropped. The subscription provides a `subscriptionDropped` callback, which will get called when the subscription breaks.

The `subscriptionDropped` callback allows you to inspect the reason why the subscription dropped, as well as any exceptions that occurred.

The possible reasons for a subscription to drop are:

| Reason            | Why it might happen                                                                                                  |
|:------------------|:---------------------------------------------------------------------------------------------------------------------|
| `Disposed`        | The subscription got cancelled or disposed by the client.                                                            |
| `SubscriberError` | An error occurred while handling an event in the subscription handler.                                               |
| `ServerError`     | An error occurred on the server, and the server closed the subscription. Check the server logs for more information. |

Bear in mind that a subscription can also drop because it is slow. The server tried to push all the live events to the subscription when it is in the live processing mode. If the subscription gets the reading buffer overflow and won't be able to acknowledge the buffer, it will break.

### Handling subscription drops

An application, which hosts the subscription, can go offline for a period of time for different reasons. It could be a crash, infrastructure failure, or a new version deployment. As you rarely would want to reprocess all the events again, you'd need to store the current position of the subscription somewhere, and then use it to restore the subscription from the point where it dropped off:

@[code{subscribe-to-stream-subscription-dropped}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

When subscribed to `$all` you want to keep the position of the event in the `$all` stream. As mentioned previously, the `$all` stream position consists of two big integers (prepare and commit positions), not one:

@[code{subscribe-to-all-subscription-dropped}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## User credentials

The user creating a subscription must have read access to the stream it's subscribing to, and only admin users may subscribe to `$all` or create filtered subscriptions.

The code below shows how you can provide user credentials for a subscription. When you specify subscription credentials explicitly, it will override the default credentials set for the client. If you don't specify any credentials, the client will use the credentials specified for the client, if you specified those.

@[code{overriding-user-credentials}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## Server-side filtering

EventStoreDB allows you to filter the events whilst you subscribe to the `$all` stream so that you only receive the events that you care about.

You can filter by event type or stream name using either a regular expression or a prefix. Server-side filtering is currently only available on the `$all` stream.

::: tip
Server-side filtering introduced as a simpler alternative to projections. Before creating a projection to get the events you care about you should first consider filtering.
:::

A simple stream prefix filter looks like this:

@[code{stream-prefix-filtered-subscription}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

The filtering API is described more in-depth in the [filtering section](subscriptions.md#server-side-filtering).

### Filtering out system events

There are a number of events in EventStoreDB called system events. These are prefixed with a `$` and under most circumstances you won't care about these. They can be filtered out by passing in a `SubscriptionFilterOptions` when subscribing to the `$all` stream.

@[code{exclude-system}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

::: tip
`$stats` events are no longer stored in EventStoreDB by default so there won't be as many `$` events as before.
:::

### Filtering by event type

If you only want to subscribe to events of a given type there are two options. You can either use a regular expression or a prefix.

#### Filtering by prefix

If you want to filter by prefix pass in a `SubscriptionFilterOptions` to the subscription with an `EventTypeFilter.Prefix`.

@[code{event-type-prefix}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will only subscribe to events with a type that begin with `customer-`.

#### Filtering by regular expression

If you want to subscribe to multiple event types then it might be better to provide a regular expression.

@[code{event-type-regex}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will subscribe to any event that begins with `user` or `company`.

### Filtering by stream name

If you only want to subscribe to a stream with a given name there are two options. You can either use a regular expression or a prefix.

#### Filtering by prefix

If you want to filter by prefix pass in a `SubscriptionFilterOptions` to the subscription with an `StreamFilter.Prefix`.

@[code{stream-prefix}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will only subscribe to all streams with a name that begin with `user-`.

#### Filtering by regular expression

If you want to subscribe to multiple streams then it might be better to provide a regular expression.

@[code{stream-regex}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will subscribe to any stream with a name that begins with `account` or `savings`.

## Checkpointing

There is one thing to consider with server-side filtering, and that is when events that match your filter are few and far between. In this scenario, you might find yourself in the situation where EventStoreDB has searched through 1 million events, and the last thing you want to happen is for the server to get to event 900k and then have your application crash. Without a checkpoint, you would have to go back to the beginning and start again.

A checkpoint is the event position in the $all stream that your application has processed. It can be created by saving the event's position to a persistent store of your choice (e.g., a database). If your application crashes, it can restart, read the checkpoint, and resume the subscription from that position without starting from the beginning.

You should use either the event's commit or prepare position as your checkpoint.

::: warning
If you have a database with events generated by the legacy TCP client with the [transaction feature](https://docs.kurrent.io/clients/tcp/dotnet/21.2/appending.html#transactions), then you should use and save both positions together as your checkpoint.
:::

The client SDK provides mechanisms to notify the application after processing a specified number of events (32 by default). This allows you to write code to create a checkpoint at regular intervals.

@[code{checkpoint}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will be called every `n` number of events. If you want to be specific about the number of events threshold you can also pass that as a parameter.

@[code{checkpoint-with-interval}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

::: warning
This number will be called every `n * 32` events.
:::

