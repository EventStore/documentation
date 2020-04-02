---
outputFileName: index.html
---

# Competing consumers

This document explains how to use .NET API for setting up and consuming competing consumer subscription groups. For an overview of competing consumers and how they relate to other subscription types, please see the [overview document](~/getting-started/projections.md).

> [!NOTE]
> The Administration UI includes a _Competing Consumers_ section where a user can create, update, delete and view subscriptions and their statuses.


## Creating a persistent subscription

Before interacting with a subscription group, you need to create one. You will receive an error if you attempt to create a subscription group more than once. This requires [admin permissions](~/server/users-and-access-control-lists.md).

```csharp
Task<PersistentSubscriptionCreateResult> CreatePersistentSubscriptionAsync(string stream, string groupName, PersistentSubscriptionSettings settings, UserCredentials credentials);
```

## Updating a persistent subscription

You can edit the settings of an existing subscription while it is running. This action drops the current subscribers and resets the subscription internally. This requires [admin permissions](~/server/users-and-access-control-lists.md).

```csharp
Task<PersistentSubscriptionUpdateResult> UpdatePersistentSubscriptionAsync(string stream, string groupName, PersistentSubscriptionSettings settings, UserCredentials credentials);
```

## Deleting a persistent subscription

<!-- TODO: Explanation? -->

```csharp
Task<PersistentSubscriptionDeleteResult> DeletePersistentSubscriptionAsync(string stream, string groupName, UserCredentials userCredentials = null);
```

## Connecting to a persistent subscription

<!-- TODO: Explanation? -->

```csharp
EventStorePersistentSubscription ConnectToPersistentSubscription(
   string groupName,
   string stream,
   Func<EventStorePersistentSubscription, ResolvedEvent, Task> eventAppeared,
   Action<EventStorePersistentSubscription, SubscriptionDropReason, Exception> subscriptionDropped = null,
   UserCredentials userCredentials = null,
   int bufferSize = 10,
   bool autoAck = true);
```

## Persistent subscription settings

Both the `Create` and `Update` methods take a `PersistentSubscriptionSettings` object as a parameter. The methods use this object to provide the settings for the persistent subscription. A fluent builder is available for these options that you can locate using the `Create()` method. The following table shows the options you can set on a persistent subscription.

| Member                                   | Description                                                                                                       |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ResolveLinkTos`                         | Tells the subscription to resolve link events.                                                                    |
| `DoNotResolveLinkTos`                    | Tells the subscription to not resolve link events.                                                                |
| `PreferRoundRobin`                       | If possible preference a round robin between the connections with messages (if not possible uses next available). |
| `PreferDispatchToSingle`                 | If possible preference dispatching to a single connection (if not possible will use next available).              |
| `StartFromBeginning`                     | Start the subscription from the first event in the stream.                                                        |
| `StartFrom(int position)`                | Start the subscription from the position-th event in the stream.                                                  |
| `StartFromCurrent`                       | Start the subscription from the current position.                                                                 |
| `WithMessageTimeoutOf(TimeSpan timeout)` | Sets the timeout for a client before retrying the message.                                                        |
| `CheckPointAfter(TimeSpan time)`         | The amount of time the system should try to checkpoint after.                                                     |
| `MinimumCheckPointCountOf(int count)`    | The minimum number of messages to write a checkpoint for.                                                         |
| `MaximumCheckPointCountOf(int count)`    | The maximum number of messages not checkpointed before forcing a checkpoint.                                      |
| `WithMaxRetriesOf(int count)`            | Sets the number of times to retry a message should before considering it a bad message.                           |
| `WithLiveBufferSizeOf(int count)`        | The size of the live buffer (in memory) before resorting to paging.                                               |
| `WithReadBatchOf(int count)`             | The size of the read batch when in paging mode.                                                                   |
| `WithBufferSizeOf(int count)`            | The number of messages to buffer when in paging mode.                                                             |
| `WithExtraStatistics`                    | Tells the backend to measure timings on the clients so statistics contain histograms of them.                     |

## Creating a subscription group

The first step of dealing with a subscription group is to create one. You will receive an error if you attempt to create a subscription group multiple times. You must have admin permissions to create a persistent subscription group.

> [!NOTE]
> Normally you wouldn't create the subscription group in your general executable code. Instead, you create it as a step during an install or as an admin task when setting up Event Store. You should assume the subscription exists in your code.

```csharp
PersistentSubscriptionSettings settings = PersistentSubscriptionSettings.Create()
                                                                .DoNotResolveLinkTos()
                                                                .StartFromCurrent();
_result = _conn.CreatePersistentSubscriptionAsync(_stream,
                                                  "agroup",
                                                  settings,
                                                  MyCredentials).Result;
```

| Parameter                                 | Description                                          |
| ----------------------------------------- | ---------------------------------------------------- |
| `string stream`                           | The stream to the persistent subscription is on.     |
| `string groupName`                        | The name of the subscription group to create.        |
| `PersistentSubscriptionSettings settings` | The settings to use when creating this subscription. |
| `UserCredentials credentials`             | The user credentials to use for this operation.      |

## Updating a subscription group

You can edit the settings of an existing subscription group while it is running, you don't need to delete and recreate it to change settings. When you update the subscription group, it resets itself internally dropping the connections and having them reconnect. You must have admin permissions to update a persistent subscription group.

```csharp
PersistentSubscriptionSettings settings = PersistentSubscriptionSettings.Create()
                                                                .DoNotResolveLinkTos()
                                                                .StartFromCurrent();
_result = _conn.UpdatePersistentSubscriptionAsync(_stream,
                                                  "agroup",
                                                  settings,
                                                  MyCredentials).Result;
```

> [!NOTE]
> If you change settings such as `startFromBeginning`, this doesn't reset the group's checkpoint. If you want to change the current position in an update, you must delete and recreate the subscription group.

| Parameter                                 | Description                                          |
| ----------------------------------------- | ---------------------------------------------------- |
| `string stream`                           | The stream to the persistent subscription is on.     |
| `string groupName`                        | The name of the subscription group to update.        |
| `PersistentSubscriptionSettings settings` | The settings to use when updating this subscription. |
| `UserCredentials credentials`             | The user credentials to use for this operation.      |

## Deleting a subscription group

Remove a subscription group with the delete operation. Like the creation of groups, you rarely do this in your runtime code and is undertaken by an administrator running a script.

```csharp
var result = _conn.DeletePersistentSubscriptionAsync(stream,
                                                     "groupname",
                                                     DefaultData.AdminCredentials).Result;
```

| Parameter                     | Description                                      |
| ----------------------------- | ------------------------------------------------ |
| `string stream`               | The stream to the persistent subscription is on. |
| `string groupName`            | The name of the subscription group to update.    |
| `UserCredentials credentials` | The user credentials to use for this operation.  |

## Connecting to a subscription group

Once you have created a subscription group, clients can connect to that subscription group. A subscription in your application should only have the connection in your code, you should assume that the subscription was created via the client API, the restful API, or manually in the UI.

The most important parameter to pass when connecting is the buffer size. This parameter represents how many outstanding messages the server should allow this client. If this number is too small, your subscription will spend much of its time idle as it waits for an acknowledgment to come back from the client. If it's too big, you waste resources and can start causing time out messages depending on the speed of your processing.

```csharp
var subscription = _conn.ConnectToPersistentSubscription("foo",
                                                         "nonexisting2",
                                                         (sub, e) => Console.Write("appeared"),
                                                         (sub, reason, ex) =>{});
```

| Parameter                     | Description                                                                |
| ----------------------------- | -------------------------------------------------------------------------- |
| `string stream`               | The stream to the persistent subscription is on.                           |
| `string groupName`            | The name of the subscription group to connect to.                          |
| `Action eventAppeared`        | The action to call when an event arrives over the subscription.            |
| `Action subscriptionDropped`  | The action to call if the subscription is dropped.                         |
| `UserCredentials credentials` | The user credentials to use for this operation.                            |
| `int bufferSize`              | The number of in-flight messages this client is allowed.                   |
| `bool autoAck`                | Whether to automatically acknowledge messages after eventAppeared returns. |

## Acknowledgements

Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If you enable auto-ack the subscription will automatically acknowledge messages once your handler completes them. If you throw an exception, it will shut down your subscription with a message and the uncaught exception.

You can choose to not auto-ack messages. This can be useful when you have multi-threaded processing of messages in your subscriber and need to pass control to something else. There are methods on the subscription object that you can call `Acknowledge,` and `NotAcknowledge` both take a `ResolvedEvent` (the one you processed) both also have overloads for passing and `IEnumerable<ResolvedEvent>`.

## Consumer strategies

When creating a persistent subscription, the settings allow for different consumer strategies via the `WithNamedConsumerStrategy` method. Built-in strategies are defined in the enum `SystemConsumerStrategies`.

> [!NOTE]
> HTTP clients bypass the consumer strategy which means it ignores any ordering or pinning.

### RoundRobin (default)

Distributes events to all clients evenly. If the client bufferSize is reached the client is ignored until events are acknowledged/not acknowledged.                 |

### DispatchToSingle

Distributes events to a single client until the bufferSize is reached. After which the next client is selected in a round robin style, and the process is repeated.

### Pinned

For use with an indexing projection such as the system `$by_category` projection.

Event Store inspects event for its source stream id, hashing the id to one of 1024 buckets assigned to individual clients. When a client disconnects it's buckets are assigned to other clients. When a client connects, it is assigned some of the existing buckets. This naively attempts to maintain a balanced workload.

The main aim of this strategy is to decrease the likelihood of concurrency and ordering issues while maintaining load balancing. _This is not a guarantee_, and you should handle the usual ordering and concurrency issues.
