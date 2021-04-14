# Persistent subscriptions

This page explains how to set up and use persistent subscriptions. 

::: tip
The Administration UI includes a _Persistent Subscriptions_ section where a user can create, update, delete and view subscriptions and their statuses.
:::

## Concepts

As mentioned in the [subscriptions page](README.md#persistent-subscriptions), persistent subscriptions serve the same purpose as catch-up or volatile subscriptions, but in a different way. All subscriptions aim to deliver events in real-time to connected subscribers. But, unlike other subscription types, persistent subscriptions are maintained by the server. In a way, catch-up and persistent subscriptions are similar. Both have a last known position from where the subscription starts getting events. However, catch-up subscriptions must take care about keeping the last known position on the subscriber side and persistent subscriptions keep the position on the server.

Since it is the server who decides from where the subscription should start receiving events and knows where events are delivered, subscribers that use a persistent subscription can be load-balanced and process events in parallel. In contrast, catch-up subscriptions, which are client-driven, always receive and process events sequentially and can only be load-balanced on the client side. Therefore, persistent subscriptions allow using the competing consumers pattern that is common in the world of message brokers.

In order for the server to load-balance subscribers, it uses the concept of consumer groups. All clients that belong to a single consumer group will get a portion of events and that's how load balancing works inside a group. It is possible to create multiple consumer groups for the same stream and they will be completely independent from each other, receiving and processing events in their own pace and having their own last known position handled by the server.

::: card
![Consumer groups](./images/consumer-groups.jpg)
:::

::: warning
Just as in the world of message brokers, processing events in a group of consumers running in parallel processes will most likely get evens out of order within a certain window. For example, if a consumer group has ten consumers, ten messages will be distributed among the available consumers, based on the [strategy](#consumer-strategies) of the group. Even though some strategies make an attempt to consistently deliver ordered events to a single consumer, it's done on the best effort basis and there is no guarantee of events coming in order with any strategy.
:::

## Creating a subscription group

The first step of dealing with a subscription group is to create one. You will receive an error if you attempt to create a subscription group multiple times. You must have admin permissions to create a persistent subscription group.

::: tip
Normally you wouldn't create the subscription group in your general executable code. Maintaining subscription groups can be seen as a _migration_ task, similar to RDBMS schema migrations and therefore needs to run only after it gets changed for some reason.
:::

```csharp
var userCredentials = new UserCredentials("admin", "changeit");

var settings = PersistentSubscriptionSettings
    .Create()
    .StartFromCurrent();

var result = await connection.CreatePersistentSubscriptionAsync(
    "myStream", 
    "agroup", 
    settings, 
    userCredentials
);
```

| Parameter | Description |
|:--------- |:----------- |
| `string stream` | The stream to the persistent subscription is on. |
| `string groupName` | The name of the subscription group to create. |
| `PersistentSubscriptionSettings settings` | The settings to use when creating this subscription. |
| `UserCredentials credentials` | The user credentials to use for this operation. |

## Connecting to a subscription group

Once you have created a subscription group, clients can connect to that subscription group. A subscription in your application should only have the connection in your code, you should assume that the subscription was created via the client API, the restful API, or manually in the UI.

The most important parameter to pass when connecting is the buffer size. This parameter represents how many outstanding messages the server should allow this client. If this number is too small, your subscription will spend much of its time idle as it waits for an acknowledgment to come back from the client. If it's too big, you waste resources and can start causing time out messages depending on the speed of your processing.

::: warning Slow consumers
If you define a large buffer and your consumer is slow, the subscription might time out on the server and send the same buffer again. Such a situation leads to severe performance degradation of the persistent subscription and the cluster node.
:::

```csharp
var subscription = await connection.ConnectToPersistentSubscriptionAsync(
    "myStream", 
    "agroup", 
    (_, evt) 
        => Console.Out.WriteLineAsync("event appeared"),
    (sub, reason, exception) 
        => Console.WriteLine($"Subscription dropped: {reason}")
);
```

| Parameter | Description |
|:--------- |:----------- |
| `string stream` | The stream to the persistent subscription is on. |
| `string groupName` | The name of the subscription group to connect to. |
| `Action eventAppeared` | The action to call when an event arrives over the subscription. |
| `Action subscriptionDropped` | The action to call if the subscription is dropped. |
| `UserCredentials credentials` | The user credentials to use for this operation. |
| `int bufferSize` | The number of in-flight messages this client is allowed. |
| `bool autoAck` | Whether to automatically acknowledge messages after eventAppeared returns. |

## Acknowledgements

Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If you enable auto-ack the subscription will automatically acknowledge messages once your handler completes them. If you throw an exception, it will shut down your subscription with a message and the uncaught exception.

You can choose to not auto-ack messages. This can be useful when you have multi-threaded processing of messages in your subscriber and need to pass control to something else. There are methods on the subscription object that you can call `Acknowledge,` and `NotAcknowledge` both take a `ResolvedEvent` (the one you processed) both also have overloads for passing and `IEnumerable<ResolvedEvent>`.

## Consumer strategies

When creating a persistent subscription, the settings allow for different consumer strategies via the `WithNamedConsumerStrategy` method. Built-in strategies are defined in the enum `SystemConsumerStrategies`.

### RoundRobin (default)

Distributes events to all clients evenly. If the client `bufferSize` is reached, the client is ignored until events are acknowledged/not acknowledged.

This strategy provides equal load balancing between all consumers in the group.

### DispatchToSingle

Distributes events to a single client until the `bufferSize` is reached. After that, the next client is selected in a round robin style, and the process is repeated.

This option can be seen as a fall-back scenario for high availability, when a single consumer processes all the events until it reaches its maximum capacity. When that happens, another consumer takes the load to free up the main consumer resources.

### Pinned

For use with an indexing projection such as the system `$by_category` projection.

EventStoreDB inspects event for its source stream id, hashing the id to one of 1024 buckets assigned to individual clients. When a client disconnects it's buckets are assigned to other clients. When a client connects, it is assigned some of the existing buckets. This naively attempts to maintain a balanced workload.

The main aim of this strategy is to decrease the likelihood of concurrency and ordering issues while maintaining load balancing. _This is not a guarantee_, and you should handle the usual ordering and concurrency issues.

## Replay parked messages

Replays all parked messages for a particular persistent subscription `subscriptionName` on a `stream` that were parked by a negative acknowledgement action.

```csharp
public Task ReplayParkedMessages(
    string stream, 
    string subscriptionName, 
    UserCredentials userCredentials = null
)
```

## Updating a subscription group

You can edit the settings of an existing subscription group while it is running, you don't need to delete and recreate it to change settings. When you update the subscription group, it resets itself internally dropping the connections and having them reconnect. You must have admin permissions to update a persistent subscription group.

```csharp
var settings = PersistentSubscriptionSettings
    .Create()
    .ResolveLinkTos()
    .StartFromCurrent();

var result = await connection.UpdatePersistentSubscriptionAsync(
    stream, "agroup", settings, MyCredentials
);
```

::: tip
If you change settings such as `startFromBeginning`, this doesn't reset the group's checkpoint. If you want to change the current position in an update, you must delete and recreate the subscription group.
:::

| Parameter | Description |
|:--------- |:----------- |
| `string stream` | The stream to the persistent subscription is on. |
| `string groupName` | The name of the subscription group to update. |
| `PersistentSubscriptionSettings settings` | The settings to use when updating this subscription. |
| `UserCredentials credentials` | The user credentials to use for this operation. |

## Persistent subscription settings

Both the `Create` and `Update` methods take a `PersistentSubscriptionSettings` object as a parameter. The methods use this object to provide the settings for the persistent subscription. A fluent builder is available for these options that you can locate using the `Create()` method. For example:

```csharp
var settings = PersistentSubscriptionSettings
    .Create()
    .ResolveLinkTos()
    .StartFromCurrent();
```

The following table shows the options you can set on a persistent subscription.

| Member | Description |
|:-------|:------------|
| `ResolveLinkTos` | Tells the subscription to resolve link events. |
| `DoNotResolveLinkTos` | Tells the subscription to not resolve link events. |
| `PreferRoundRobin` | If possible preference a round robin between the connections with messages (if not possible uses next available). |
| `PreferDispatchToSingle` | If possible preference dispatching to a single connection (if not possible will use next available). |
| `StartFromBeginning` | Start the subscription from the first event in the stream.  |
| `StartFrom(int position)` | Start the subscription from the position-th event in the stream. |
| `StartFromCurrent` | Start the subscription from the current position. |
| `WithMessageTimeoutOf(TimeSpan timeout)` | Sets the timeout for a client before retrying the message. |
| `CheckPointAfter(TimeSpan time)` | The amount of time the system should try to checkpoint after. |
| `MinimumCheckPointCountOf(int count)` | The minimum number of messages to write a checkpoint for. |
| `MaximumCheckPointCountOf(int count)`| The maximum number of messages not checkpointed before forcing a checkpoint. |
| `WithMaxRetriesOf(int count)` | Sets the number of times to retry a message should before considering it a bad message. |
| `WithLiveBufferSizeOf(int count)` | The size of the live buffer (in memory) before resorting to paging. |
| `WithReadBatchOf(int count)` | The size of the read batch when in paging mode. |
| `WithBufferSizeOf(int count)` | The number of messages to buffer when in paging mode. |
| `WithExtraStatistics` | Tells the backend to measure timings on the clients so statistics contain histograms of them. |

## Deleting a subscription group

Remove a subscription group with the delete operation. Like the creation of groups, you rarely do this in your runtime code and is undertaken by an administrator running a script.

```csharp
var result = await connection.DeletePersistentSubscriptionAsync(
    stream, "groupname", AdminCredentials
);
```

| Parameter | Description |
|:--------- |:----------- |
| `string stream` | The stream to the persistent subscription is on. |
| `string groupName` | The name of the subscription group to update.    |
| `UserCredentials credentials` | The user credentials to use for this operation.  |

