# Catch-up Subscriptions

This page explains how to set up and use catch-up subscriptions. 

## Concepts

Catch-up subscriptions serve the purpose of receiving events from a stream for a single subscriber. Subscribers for catch-up subscriptions get events in order and, therefore, are able to process events sequentially. There is nothing on the server that gets stored for such a subscriber.

You can have multiple subscribers for the same stream and all those subscribers will get all the events from that stream. Subscriptions have no influence on each other and can run on their own pace.

When creating a catch-up subscription on the client side, you can supply the starting position in the stream you are subscribing for. The subscriber will then get events from that position onwards. If the subscriber keeps the last known position in its own storage, it will be able to go down and resubscribe from the stored position in order to only get unprocessed events.

When the subscription starts for the first time and the stream it subscribes to already has events, the subscription will get into a catch-up state and receive historical events. When the subscriber eventually catches up and processes all the historical events, it will switch to real-time mode and will get events as they are appended to the stream. If the stream gets more events that the subscriber can process in real time, the subscriber will lag behind and switch to the catch-up mode again until it manages to process all the pending events and then switches to real-time mode again.

It is, therefore, a sole responsibility of the subscriber to keep the last processed event position, also known as the _checkpoint_ in its own storage. If the subscriber doesn't know the last checkpoint, it will have to subscribe to the beginning of the stream. It is also possible to tell the subscriber to start processing events from the end of the stream, so all the historical events will be ignored. It is useful when you don't care about the history and want to start processing events from now on only.

For regular streams, the checkpoint is a sequence number of the event, which is currently being processed by the subscription. For the `$all` stream, the checkpoint consists of two positions in the global event storage - prepare position and commit position.

## Usage

Catch-up subscriptions are typically used for producing _read models_ in event-sourced systems that use the CQRS pattern. Subscribers that update read models are often called _projections_ because they project the event payload to a piece of state in another database. Client-side projections use the same concept as EventStoreDB server-side projections but have a different purpose.

::: tip Storing checkpoints
The best practice for subscriptions that project events to another storage, is to store checkpoints in the same storage. Projecting an event and storing the checkpoint in one transaction allows you t achieve the _exactly once_ event processing.
:::

## Subscribing to a stream

You can subscribe to any individual event stream in EventStoreDB. It could be a normal stream, where your software append events, or a stream produced by the server-side projection, either a system projection (like `$et-SomethingHappened`) or a custom projection. 

Use the `IEventStoreConnection.SubscribeToStreamFrom` method to initiate the subscription. The connection must be open by the time you call this method.

You need to specify the stream, which you want to subscribe to, the last known checkpoint, subscription settings and the event handling function. Optionally, you can a function, which then gets called when the subscription switches from processing historical events to real-time processing, and a function for handling subscription drops.

::: tip Dropping subscription
There are multiple reasons for a subscription to drop. The connection might close due to network issues, the subscription might get overloaded with events, or your event handler will throw an unhandled exception. It is usually a good idea to handle subscription drops and resubscribe when needed, to overcome transient issues. When a subscription drops, the application would keep working but will not process any events.
:::

<<< @/docs/clients/dotnet/5.0/sample-code/Subscriptions/CatchUp.cs#SubscribeToStream

In this code, we create an instance of `CatchUpSubscriptionSettings`. You can also use `CatchUpSubscriptionSettings.Default` with default settings instead.

## Subscribing to `$all`

Subscribing to the global event stream gives you a possibility to create read models from many different event streams. It is a powerful method to create, for example, reporting models with aggregated and denormalized data without using common database operations like `JOIN`. You must, however, carefully evaluate your subscription performance, as when you subscribe to `$all`, you'll get absolutely everything what gets appended to the EventStoreDB cluster. You might also need to filter out system events, by checking if event type starts with `$`. In normal applications, you won't need to process system events.

As mentioned before, the checkpoint for `$all` is not a single numeric value, like it is for a single stream. You need to handle the checkpoint with two positions instead: commit and prepare position.

For the rest, the code for subscribing to `$all` is very similar to the previous snippet:

<<< @/docs/clients/dotnet/5.0/sample-code/Subscriptions/CatchUp.cs#SubscribeToAll

The differences here are:
- You don't need to specify the stream name, as we know it's the `$all` stream.
- The checkpoint argument type is `Position?`, not `long?`

## Unsubscribing

Normally, you won't need to explicitly close the subscription as you want it to run as long as your application runs. When the application stops, it is a good practice to stop the connection (`IEventStoreConnection.Close`) and when the connection closes, it also stops all the subscriptions gracefully.

If you need to stop the subscription without closing the connection, you can use the returned value of `ConnectToStreamFrom` or `ConnectToAllFrom`. Those methods return an instance of `EventStoreCatchUpSubscription` and `EventStoreAllCatchUpSubscription` respectively. You can use it also for something like processing gap metric, as it gives you access to the current checkpoint. When you need to stop the subscription, you can call its `Stop` method.



