# Catch-up Subscriptions

This page explains how to set up and use catch-up subscriptions. 

## Concepts

Catch-up subscriptions serve the purpose of receiving events from a stream for a single subscriber. Subscribers for catch-up subscriptions get events in order and, therefore, are able to process events sequentially. There is nothing on the server that gets stored for such a subscriber.

You can have multiple subscribers for the same stream and all those subscribers will get all the events from that stream. Subscriptions have no influence on each other and can run on their own pace.

When creating a catch-up subscription on the client side, you can supply the starting position in the stream you are subscribing for. The subscriber will then get events from that position onwards. If the subscriber keeps the last known position in its own storage, it will be able to go down and resubscribe from the stored position in order to only get unprocessed events.

When the subscription starts for the first time and the stream it subscribes to already has events, the subscription will get into a catch-up state and receive historical events. When the subscriber eventually catches up and processes all the historical events, it will switch to real-time mode and will get events as they are appended to the stream. If the stream gets more events that the subscriber can process in real time, the subscriber will lag behind and switch to the catch-up mode again until it manages to process all the pending events and then switches to real-time mode again.

It is, therefore, the sole responsibility of the subscriber to keep the last processed event position, also known as the _checkpoint_ in its own storage. If the subscriber doesn't know the last checkpoint, it will have to subscribe to the beginning of the stream. It is also possible to tell the subscriber to start processing events from the end of the stream, so all the historical events will be ignored. It is useful when you don't care about the history and want to start processing events from now on only.

## Usage

Catch-up subscriptions are typically used for producing _read models_ in event-sourced systems that use the CQRS pattern. Subscribers that update read models are often called _projections_ because they project the event payload to a piece of state in another database. Client-side projections use the same concept as EventStoreDB server-side projections but have essentially different purpose.
