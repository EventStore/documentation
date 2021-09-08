# Subscription basics

Subscriptions allow you to subscribe to a stream and receive notifications about new events added to the stream.

You provide an event handler and an optional starting point to the subscription. The handler is called for each event from the starting point onward.

If events already exist, the handler will be called for each event one by one until it reaches the end of the stream. From there, the server will notify the handler whenever a new event appears.

:::tip
Check [connecting to EventStoreDB instructions](../getting-started/connecting.md#required-packages) to learn how to configure and use the client SDK.
:::

## Subscribing to a stream

The simplest stream subscription looks like the following :

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream
</xode-block>
</xode-group>

The provided handler will be called for every event in the stream.

## Subscribing to `$all`

Subscribing to `$all` is much the same as subscribing to a single stream. The handler will be called for every event appended after the starting position.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-all
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-all
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-all
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-all
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-all
</xode-block>
</xode-group>

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

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-from-position
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream-from-position
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream-from-position
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream-from-position
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream-from-position
</xode-block>
</xode-group>

### Subscribing to $all

Subscribing to the `$all` stream is much like subscribing to a regular stream. The only difference is how you need to specify the stream position. For the `$all` stream, you have to provide a `Position` structure instead, which consists of two big integers - prepare and commit positions. The `Position` value can be `Start`, `End` or a `Position` created from a commit and prepare position.

The corresponding `$all` subscription will subscribe from the event after the one at commit position `1056` and prepare position `1056`.

Please note that this position will need to be a legitimate position in `$all`.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-all-from-position
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-all-from-position
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-all-from-position
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-all-from-position
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-all-from-position
</xode-block>
</xode-group>

## Subscribing to a stream for live updates

You can subscribe to a stream to get live updates by subscribing to the end of the stream:

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-live
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream-live
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream-live
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream-live
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream-live
</xode-block>
</xode-group>

And the same works with `$all` :

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-all-live
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-all-live
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-all-live
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-all-live
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-all-live
</xode-block>
</xode-group>

This won't read through the history of the stream, but will rather notify the handler when a new event appears in the respective stream.

Keep in mind that when you subscribe to a stream from a certain position, as described [above](#subscribing-from-a-specific-position), you will also get live updates after your subscription catches up (processes all the historical events).

## Resolving link-to's

Link-to events point to events in other streams in EventStoreDB. These are generally created by projections such as the `$by_event_type` projection which links events of the same event type into the same stream. This makes it easier to look up all events of a certain type.

::: tip
[Filtered subscriptions](./filtering.md) make it easier and faster to subscribe to all events of a certain type or matching a prefix.
:::

When reading a stream you can specify whether to resolve link-to's or not. By default, link-to events are not resolved. You can change this behaviour by setting the `resolveLinkTos` parameter to `true`:

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-resolving-linktos
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream-resolving-linktos
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream-resolving-linktos
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream-resolving-linktos
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream-resolving-linktos
</xode-block>
</xode-group>

## Dropped subscriptions

When a subscription stops or experiences an error, it will be dropped. The subscription provides a `subscriptionDropped` callback, which will get called when the subscription breaks.

The `subscriptionDropped` callback allows you to inspect the reason why the subscription dropped, as well as any exceptions that occurred.

The possible reasons for a subscription to drop are:

| Reason            | Why it might happen                                                                                                  |
| :---------------- | :------------------------------------------------------------------------------------------------------------------- |
| `Disposed`        | The subscription got cancelled or disposed by the client.                                                            |
| `SubscriberError` | An error occurred while handling an event in the subscription handler.                                               |
| `ServerError`     | An error occurred on the server, and the server closed the subscription. Check the server logs for more information. |

Bear in mind that a subscription can also drop because it is slow. The server tried to push all the live events to the subscription when it is in the live processing mode. If the subscription gets the reading buffer overflow and won't be able to acknowledge the buffer, it will break.

### Handling subscription drops

An application, which hosts the subscription, can go offline for a period of time for different reasons. It could be a crash, infrastructure failure, or a new version deployment. As you rarely would want to reprocess all the events again, you'd need to store the current position of the subscription somewhere, and then use it to restore the subscription from the point where it dropped off:

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-subscription-dropped
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream-subscription-dropped
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream-subscription-dropped
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream-subscription-dropped
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream-subscription-dropped
</xode-block>
</xode-group>

When subscribed to `$all` you want to keep the position of the event in the `$all` stream. As mentioned previously, the `$all` stream position consists of two big integers (prepare and commit positions), not one:

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-all-subscription-dropped
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-all-subscription-dropped
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-all-subscription-dropped
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-all-subscription-dropped
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-all-subscription-dropped
</xode-block>
</xode-group>

## Filter options

Subscriptions to `$all` can include a filter option. A filtered subscription will only invoke the event handler if the event matches the provided filter.

A simple stream prefix filter looks like this:

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#stream-prefix-filtered-subscription
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#stream-prefix-filtered-subscription
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#stream-prefix-filtered-subscription
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#stream-prefix-filtered-subscription
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#stream-prefix-filtered-subscription
</xode-block>
</xode-group>

The filtering API is described more in-depth in the [filtering section](./filtering.md).

## User credentials

The user creating a subscription must have read access to the stream it's subscribing to, and only admin users may subscribe to `$all` or create filtered subscriptions.

The code below shows how you can provide user credentials for a subscription. When you specify subscription credentials explicitly, it will override the default credentials set for the client. If you don't specify any credentials, the client will use the credentials specified for the client, if you specified those.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#overriding-user-credentials
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#overriding-user-credentials
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#overriding-user-credentials
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#overriding-user-credentials
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#overriding-user-credentials
</xode-block>
</xode-group>

# Server-side filtering

EventStoreDB allows you to filter the events whilst you subscribe to the `$all` stream so that you only receive the events that you care about.

You can filter by event type or stream name using either a regular expression or a prefix. Server-side filtering is currently only available on the `$all` stream.

::: tip
Server-side filtering introduced as a simpler alternative to projections. Before creating a projection to get the events you care about you should first consider filtering.
:::

## Filtering out system events

There are a number of events in EventStoreDB called system events. These are prefixed with a `$` and under most circumstances you won't care about these. They can be filtered out by passing in a `SubscriptionFilterOptions` when subscribing to the `$all` stream.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#exclude-system
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#exclude-system
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#exclude-system
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#exclude-system
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#exclude-system
</xode-block>
</xode-group>

::: tip
`$stats` events are no longer stored in EventStoreDB by default so there won't be as many `$` events as before.
:::

## Filtering by event type

If you only want to subscribe to events of a given type there are two options. You can either use a regular expression or a prefix.

### Filtering by prefix

If you want to filter by prefix pass in a `SubscriptionFilterOptions` to the subscription with an `EventTypeFilter.Prefix`.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#event-type-prefix
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#event-type-prefix
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#event-type-prefix
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#event-type-prefix
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#event-type-prefix
</xode-block>
</xode-group>

This will only subscribe to events with a type that begin with `customer-`.

### Filtering by regular expression

If you want to subscribe to multiple event types then it might be better to provide a regular expression.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#event-type-regex
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#event-type-regex
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#event-type-regex
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#event-type-regex
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#event-type-regex
</xode-block>
</xode-group>

This will subscribe to any event that begins with `user` or `company`.

## Filtering by stream name

If you only want to subscribe to streams with a given name there are two options. You can either use a regular expression or a prefix.

### Filtering by prefix

If you want to filter by prefix pass in a `SubscriptionFilterOptions` to the subscription with an `StreamFilter.Prefix`.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#stream-prefix
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#stream-prefix
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#stream-prefix
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#stream-prefix
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#stream-prefix
</xode-block>
</xode-group>

This will only subscribe to streams with a name that begin with `user-`.

### Filtering by regular expression

If you want to subscribe to multiple streams then it might be better to provide a regular expression.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#stream-regex
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#stream-regex
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#stream-regex
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#stream-regex
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#stream-regex
</xode-block>
</xode-group>

This will subscribe to any stream with a name that begins with `account` or `savings`.

## Checkpointing

There is one thing to consider with server-side filtering, and that is when events that match your filter are few and far between. In this scenario, you might find yourself in the situation where EventStoreDB has searched through 1 million events, and the last thing you want to happen is for the server to get to event 900k and then have your client crash. It won't have been able to take a checkpoint and upon a restart, you'd have to go back to the beginning and start again.

In this case you can make use of an additional delegate that will be triggered every n number of events (32 by default).

To make use of it set up `checkpointReached` on the `SubscriptionFilterOptions` class.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#checkpoint
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#checkpoint
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#checkpoint
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#checkpoint
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#checkpoint
</xode-block>
</xode-group>

This will be called every `n` number of events. If you want to be specific about the number of events threshold you can also pass that as a parameter.

<xode-group>
<xode-block title="C#">

@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#checkpoint-with-interval
</xode-block>
<xode-block title="Java">

@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#checkpoint-with-interval
</xode-block>
<xode-block title="JavaScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#checkpoint-with-interval
</xode-block>
<xode-block title="Rust">

@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#checkpoint-with-interval
</xode-block>
<xode-block title="TypeScript">

@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#checkpoint-with-interval
</xode-block>
</xode-group>

::: warning
This number will be called every `n * 32` events.
:::

