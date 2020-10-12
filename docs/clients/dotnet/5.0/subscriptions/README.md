# Subscribe to changes

A common operation is to subscribe to a stream and receive notifications for changes. As new events arrive, you continue following them. 

You can only subscribe to one stream. You can use server-side projections for linking events to new aggregated streams. System projections create pre-defined streams that aggregate events by type or by category and are available out-of-the box. Check the server documentation to learn more about system and user-defined projections.

There are three types of subscription patterns, useful in different situations.

## Volatile subscriptions

This subscription calls a given function for events written after establishing the subscription. They are useful when you need notification of new events with minimal latency, but where it's not necessary to process every event.

For example, if a stream has 100 events in it when a subscriber connects, the subscriber can expect to see event number 101 onwards until the time the subscription is closed or dropped.

## Catch-up subscriptions

This subscription specifies a starting point, in the form of an event number or transaction file position. You call the function for events from the starting point until the end of the stream, and then for subsequently written events.

For example, if you specify a starting point of 50 when a stream has 100 events, the subscriber can expect to see events 51 through 100, and then any events are subsequently written until you drop or close the subscription.

## Persistent subscriptions

::: tip
Persistent subscriptions exist in version 3.2.0 and above of EventStoreDB.
:::

In contrast to volatile and Catch-up types persistent subscriptions are not dropped when connection is closed. Moreover, this subscription type supports the "[competing consumers](https://www.enterpriseintegrationpatterns.com/patterns/messaging/CompetingConsumers.html)" messaging pattern and are useful when you need to distribute messages to many workers. EventStoreDB saves the subscription state server-side and allows for at-least-once delivery guarantees across multiple consumers on the same stream. It is possible to have many groups of consumers compete on the same stream, with each group getting an at-least-once guarantee.


