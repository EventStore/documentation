---
order: 4
---

# Catch-up subscriptions

Subscriptions allow you to subscribe to a stream and receive notifications about new events added to the stream.

You provide an event handler and an optional starting point to the subscription. The handler is called for each event from the starting point onward.

If events already exist, the handler will be called for each event one by one until it reaches the end of the stream. The server will then notify the handler whenever a new event appears.

:::tip
Check the [Getting Started](getting-started.md) guide to learn how to configure and use the client SDK.
:::

## Subscribing from the start

If you need to process all the events in the store, including historical events, you'll need to subscribe from the beginning. You can either subscribe to receive events from a single stream or subscribe to `$all` if you need to process all events in the database.

### Subscribing to a stream

The simplest stream subscription looks like the following :

@[code{subscribe-to-stream}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

The provided handler will be called for every event in the stream.

When you subscribe to a stream with link events, for example the `$ce` category stream, you need to set `resolveLinkTos` to `true`. Read more about it [below](#resolving-link-to-s).

### Subscribing to `$all`

Subscribing to `$all` is similar to subscribing to a single stream. The handler will be called for every event appended after the starting position.

@[code{subscribe-to-all}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## Subscribing from a specific position

The previous examples subscribed to the stream from the beginning. That subscription invoked the handler for every event in the stream before waiting for new events.

Both stream and $all subscriptions accept a starting position if you want to read from a specific point onward. If events already exist at the position you subscribe to, they will be read on the server side and sent to the subscription.

Once caught up, the server will push any new events received on the streams to the client. There is no difference between catching up and live on the client side.

::: warning
The positions provided to the subscriptions are exclusive. You will only receive the next event after the subscribed position.
:::

### Subscribing to a stream

To subscribe to a stream from a specific position, you must provide a *stream position*. This can be `Start`, `End` or a *big int* (unsigned 64 bit integer) position.

The following subscribes to the stream `some-stream` at position `20`, this means that events `21` and onward will be handled:

@[code{subscribe-to-stream-from-position}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

### Subscribing to $all

Subscribing to the `$all` stream is similar to subscribing to a regular stream. The difference is how to specify the starting position. For the `$all` stream, provide a `Position` structure that consists of two big integers: the prepare and commit positions. Use `Start`, `End`, or create a `Position` from specific commit and prepare values.

The corresponding `$all` subscription will subscribe from the event after the one at commit position `1056` and prepare position `1056`.

Please note that this position will need to be a legitimate position in `$all`.

@[code{subscribe-to-all-from-position}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## Subscribing to a stream for live updates

You can subscribe to a stream to get live updates by subscribing to the end of the stream:

@[code{subscribe-to-stream-live}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

And the same works with `$all` :

@[code{subscribe-to-all-live}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

This will not read through the history of the stream but will notify the handler when a new event appears in the respective stream.

Keep in mind that when you subscribe to a stream from a specific position, as described [above](#subscribing-from-a-specific-position), you will also get live updates after your subscription catches up (processes all the historical events).

## Resolving link-to's

Link-to events point to events in other streams in KurrentDB. These are generally created by projections such as the `$by_event_type` projection which links events of the same event type into the same stream. This makes it easier to look up all events of a specific type.

::: tip
[Filtered subscriptions](subscriptions.md#server-side-filtering) make it easier and faster to subscribe to all events of a specific type or matching a prefix.
:::

When reading a stream you can specify whether to resolve link-to's. By default, link-to events are not resolved. You can change this behaviour by setting the `resolveLinkTos` parameter to `true`:

@[code{subscribe-to-stream-resolving-linktos}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## Dropped subscriptions

When a subscription stops or experiences an error, it will be dropped. The subscription provides a `subscriptionDropped` callback, which will get called when the subscription breaks.

The `subscriptionDropped` callback allows you to inspect the reason why the subscription dropped, as well as any exceptions that occurred.

The possible reasons for a subscription to drop are:

| Reason            | Why it might happen                                                                                                  |
|:------------------|:---------------------------------------------------------------------------------------------------------------------|
| `Disposed`        | The client canceled or disposed of the subscription.                                                            |
| `SubscriberError` | An error occurred while handling an event in the subscription handler.                                               |
| `ServerError`     | An error occurred on the server, and the server closed the subscription. Check the server logs for more information. |

Bear in mind that a subscription can also drop because it is slow. The server tried to push all the live events to the subscription when it is in the live processing mode. If the subscription gets the reading buffer overflow and won't be able to acknowledge the buffer, it will break.

### Handling subscription drops

An application, which hosts the subscription, can go offline for some time for different reasons. It could be a crash, infrastructure failure, or a new version deployment. As you rarely would want to reprocess all the events again, you'd need to store the current position of the subscription somewhere, and then use it to restore the subscription from the point where it dropped off:

@[code{subscribe-to-stream-subscription-dropped}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

When subscribed to `$all` you want to keep the event's position in the `$all` stream. As mentioned previously, the `$all` stream position consists of two big integers (prepare and commit positions), not one:

@[code{subscribe-to-all-subscription-dropped}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## User credentials

The user creating a subscription must have read access to the stream it's subscribing to, and only admin users may subscribe to `$all` or create filtered subscriptions.

The code below shows how you can provide user credentials for a subscription. When you specify subscription credentials explicitly, it will override the default credentials set for the client. If you don't specify any credentials, the client will use the credentials specified for the client, if you specified those.

@[code{overriding-user-credentials}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

## Server-side filtering

KurrentDB allows you to filter the events whilst subscribing to the `$all` stream to only receive the events you care about.

You can filter by event type or stream name using a regular expression or a prefix. Server-side filtering is currently only available on the `$all` stream.

::: tip
Server-side filtering was introduced as a simpler alternative to projections. You should consider filtering before creating a projection to include the events you care about.
:::

A simple stream prefix filter looks like this:

@[code{stream-prefix-filtered-subscription}](@grpc:subscribing_to_stream.py;subscribing-to-streams.js;subscribing-to-streams.ts;subscribing_to_stream/SubscribingToStream.java;subscribing-to-streams/Program.cs;subscribingToStream.go;subscribing_to_stream.rs)

The filtering API is described more in-depth in the [filtering section](subscriptions.md#server-side-filtering).

### Filtering out system events

There are events in KurrentDB called system events. These are prefixed with a `$` and under most circumstances you won't care about these. They can be filtered out by passing in a `SubscriptionFilterOptions` when subscribing to the `$all` stream.

@[code{exclude-system}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

::: tip
`$stats` events are no longer stored in KurrentDB by default so there won't be as many `$` events as before.
:::

### Filtering by event type

If you only want to subscribe to events of a given type, there are two options. You can either use a regular expression or a prefix.

#### Filtering by prefix

If you want to filter by prefix, pass in a `SubscriptionFilterOptions` to the subscription with an `EventTypeFilter.Prefix`.

@[code{event-type-prefix}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will only subscribe to events with a type that begin with `customer-`.

#### Filtering by regular expression

It might be advantageous to provide a regular expression when you want to subscribe to multiple event types.

@[code{event-type-regex}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will subscribe to any event that begins with `user` or `company`.

### Filtering by stream name

To subscribe to a stream by name, choose either a regular expression or a prefix.

#### Filtering by prefix

If you want to filter by prefix, pass in a `SubscriptionFilterOptions` to the subscription with an `StreamFilter.Prefix`.

@[code{stream-prefix}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will only subscribe to all streams with a name that begins with `user-`.

#### Filtering by regular expression

To subscribe to multiple streams, use a regular expression.

@[code{stream-regex}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

This will subscribe to any stream with a name that begins with `account` or `savings`.

## Checkpointing

When a catch-up subscription is used to process an `$all` stream containing many events, the last thing you want is for your application to crash midway, forcing you to restart from the beginning.

### What is a checkpoint?

A checkpoint is the position of an event in the `$all` stream to which your application has processed. By saving this position to a persistent store (e.g., a database), it allows your catch-up subscription to:
- Recover from crashes by reading the checkpoint and resuming from that position
- Avoid reprocessing all events from the start

To create a checkpoint, store the event's commit or prepare position.

::: warning
If your database contains events created by the legacy TCP client using the [transaction feature](https://docs.kurrent.io/clients/tcp/dotnet/21.2/appending.html#transactions), you should store both the commit and prepare positions together as your checkpoint.
:::

### Updating checkpoints at regular intervals
The client SDK provides a way to notify your application after processing a configurable number of events. This allows you to periodically save a checkpoint at regular intervals.

@[code{checkpoint}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

By default, the checkpoint notification is sent after every 32 non-system events processed from $all.

### Configuring the checkpoint interval
You can adjust the checkpoint interval to change how often the client is notified. 

@[code{checkpoint-with-interval}](@grpc:server_side_filtering.py;server-side-filtering.js;server-side-filtering.ts;server_side_filtering/ServerSideFiltering.java;server-side-filtering/Program.cs;serverSideFiltering.go;server_side_filtering.rs)

By configuring this parameter, you can balance between reducing checkpoint overhead and ensuring quick recovery in case of a failure.

::: info
The checkpoint interval parameter configures the database to notify the client after `n` * 32 number of events where `n` is defined by the parameter.

For example:
- If `n` = 1, a checkpoint notification is sent every 32 events.
- If `n` = 2, the notification is sent every 64 events.
- If `n` = 3, it is sent every 96 events, and so on.
:::
