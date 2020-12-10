# Subscription basics

Subscriptions allow you to subscribe to a stream and receive notifications for changes in the stream.

You provide an event handler and an optional starting point to the subscription. The handler is called for each event from the starting point onward.

If events already exist, the handler will be called for each event one by one until it reaches the end of the stream. From there, the server will notify the handler whenever a new event appears.

## Subscribing to a stream

The simplest stream subscription looks like the following :

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-stream

The provided handler will be called for every event in the stream.

## Subscribing to `$all`

Subscribing to `$all` is much the same as subscribing to a single stream. The handler will be called for every event written after the starting position.

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-all

## Subscribing from a specific position

The previous examples will subscribe to the stream from the beginning. This will end up calling the handler for every event in the stream and then wait for new events after that.

Both the stream and $all subscriptions accept a starting position if you want to read from a specific point onward.
If events already exist at the position you subscribe to, they will be read on the server side and sent to the subscription.

Once caught up, the sever will push any new events received on the streams to the client. There is no difference between catching up and live on the client side.

::: warning
The positions provided to the subscriptions are exclusive. You will only receive the next event after the subscribed position.
:::

### Subscribing to a stream

To subscribe to a stream from a specific position, you need to provide a `StreamPosition`. This can be `StreamPosition.Start`, `StreamPosition.End` or a position provided by `StreamPosition.FromInt64`.

The following subscribes to the stream "some-stream" at position 20, this means that events 21 and onward will be handled:

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-from-position

### Subscribing to $all

Subscribing to $all is much like subscribing to a stream, but you need to provide a `Position` instead. This can be `Position.Start`, `Position.End` or a `Position` created from a commit and prepare position.

The corresponding `$all` subscription will subscribe from the event after the one at commit position `1056` and prepare position `1056`.

Please note that this position will need to be a legitimate position in `$all`.

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-all-from-position

## Subscribing to a stream for live updates

You can subscribe to a stream to get live updates by subscribing to the end of the stream :

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-live

And the same works with `$all` :

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-all-live

This won't read through the history of the stream, but will rather notify the handler when a new event appears in the respective stream.

## Resolving link-to's

Link-to events point to events in other streams in EventStoreDB. These are generally created by projections such as the `$by_event_type` projection which links events of the same event type into the same stream. This makes it easier to look up all events of a certain type.

::: tip
Filtered subscriptions make it easier and faster to subscribe to all events of a certain type or matching a prefix. See the Filtering section for more information.
:::

When reading a stream you can specify whether to resolve link tos or not. By default, link-to events are not resolved. You can set this with the `resolveLinkTos` parameter :

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-resolving-linktos

## Dropped subscriptions

When a subscription stops or experiences an error, it will be dropped. The subscription provides a `subscriptionDropped` handler which will get called when this happens.

The `subscriptionDropped` handler allows you to inspect the reason the subscription dropped as well as any exceptions that occurred.

The possible reasons for a subscription dropping are :

| Reason | Why it might happen |
| :----- | :------------------ |
| `Disposed` | The subscription got cancelled or disposed by the client. |
| `SubscriberError` | An error occurred while handling an event in the subscription handler. |
| `ServerError` | An error occurred on the server, and the server closed the subscription. Check the server logs for more information. |

### Handling subscription drops

You can start from where you left off by keeping a record of the last processed event and continuing from there :

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-subscription-dropped

When subscribed to `$all` you want to keep the position of the event in the `$all` stream :

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#subscribe-to-all-subscription-dropped

## Filter options

Subscriptions to `$all` can include a filter option. This will only notify the event handler if the event matches the provided filter.

A simple stream prefix filter looks like this :

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#stream-prefix-filtered-subscription

The filtering api is described more in-depth in the filtering section. 

## User credentials

The user creating a subscription must have read access to the stream it's subscribing to, and only admin users may subscribe to $all or create filtered subscriptions.

You can provide user credentials to be used by the subscription as follows. This will override the default credentials set on the connection.

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/subscribing-to-streams/Program.cs#overriding-user-credentials