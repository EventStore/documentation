# Persistent Subscriptions

## Creating a Subscription Group

The first step of dealing with a subscription group is to create one. You will receive an error if you attempt to create a subscription group multiple times. You must have admin permissions to create a persistent subscription group.

<<< @/docs/clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#create-persistent-subscription-to-stream

| Parameter | Description |
|:----------|:------------|
| stream | The stream the persistent subscription is on. |
| groupName | The name of the subscription group to create. |
| settings | The settings to use when creating the subscription. |
| credentials | The user credentials to use for this operation |

## Connecting to a subscription group

Once you have created a subscription group, clients can connect to that subscription group. A subscription in your application should only have the connection in your code, you should assume that the subscription was already created.

The most important parameter to pass when connecting is the buffer size. This represents how many outstanding messages the server should allow this client. If this number is too small, your subscription will spend much of its time idle as it waits for an acknowledgment to come back from the client. If it's too big, you waste resources and can start causing time out messages depending on the speed of your processing.

<<< @/docs/clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#subscribe-to-persistent-subscription-to-stream

| Parameter | Description |
|:----------|:------------|
| stream | The stream the persistent subscription is on. |
| groupName | The name of the subscription group to subscribe to. |
| eventAppeared	| The action to call when an event arrives over the subscription. |
| subscriptionDropped | The action to call if the subscription is dropped. |
| credentials | The user credentials to use for this operation. |
| bufferSize | The number of in-flight messages this client is allowed. **Default: 10**|
| autoAck | Whether to automatically acknowledge messages after eventAppeared returns. **Default: True** |

<!-- TODO: UNCOMMENT ONCE 21.6.0 is released -->
<!-- ## Subscribing to $all

The ability to subscribe to $all was introduced in 21.6.0. Persistent Subscriptions to $all also support filtering.

You can create a subscription group on $all much the same way you would create a subscription group on a stream:

<<< @/docs/clients/dotnet/generated/21.6.0/samples/persistent-subscriptions/Program.cs#create-persistent-subscription-to-all

And then subscribing to it is done in much the same way:

<<< @/docs/clients/dotnet/generated/21.6.0/samples/persistent-subscriptions/Program.cs#subscribe-to-persistent-subscription-to-all -->

## Acknowledgements

Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If you enable auto-ack the subscription will automatically acknowledge messages once your handler completes them. If an error occurs, it will shut down your subscription with a message and the error.

You can choose to not auto-ack messages. This can be useful when you have multi-threaded processing of messages in your subscriber and need to pass control to something else. If you want to manually acknowlegde events, you need to set this option when subscribing and then acknowledge or not acknowledge messages as you handle them.

<<< @/docs/clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#subscribe-to-persistent-subscription-with-manual-acks

The Nak Actions describe what the server should do with the message:

| Action | Description |
|:-------|:------------|
| Unknown | The client does not know what action to take. Let the server decide. |
| Park | Park the message and do not resend. Put it on poison queue. |
| Retry | Explicitly retry the message. |
| Skip | Skip this message do not resend and do not put in poison queue. |

## Consumer strategies

When creating a persistent subscription, you can choose between a number of consumer strategies.

### RoundRobin (default)

Distributes events to all clients evenly. If the client `bufferSize` is reached, the client is ignored until events are acknowledged/not acknowledged.

This strategy provides equal load balancing between all consumers in the group.

### DispatchToSingle

Distributes events to a single client until the `bufferSize` is reached. After that, the next client is selected in a round robin style, and the process is repeated.

This option can be seen as a fall-back scenario for high availability, when a single consumer processes all the events until it reaches its maximum capacity. When that happens, another consumer takes the load to free up the main consumer resources.

### Pinned

For use with an indexing projection such as the system `$by_category` projection.

EventStoreDB inspects the event for its source stream id, hashing the id to one of 1024 buckets assigned to individual clients. When a client disconnects its buckets are assigned to other clients. When a client connects, it is assigned some of the existing buckets. This naively attempts to maintain a balanced workload.

The main aim of this strategy is to decrease the likelihood of concurrency and ordering issues while maintaining load balancing. This is not a guarantee, and you should handle the usual ordering and concurrency issues.

## Updating a subscription group

You can edit the settings of an existing subscription group while it is running, you don't need to delete and recreate it to change settings. When you update the subscription group, it resets itself internally, dropping the connections and having them reconnect. You must have admin permissions to update a persistent subscription group.

<<< @/docs/clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#update-persistent-subscription

| Parameter | Description |
|:----------|:------------|
| stream | The stream the persistent subscription is on. |
| groupName | The name of the subscription group to update. |
| settings | The settings to use when creating the subscription. |
| credentials | The user credentials to use for this operation |

## Persistent subscription settings

Both the Create and Update methods take some settings for configuring the persistent subscription.

The following table shows the configuration options you can set on a persistent subscription.

| Option | Description | Default |
|:-------|:------------|:--------|
| ResolveLinkTos | Whether the subscription should resolve linkTo events to their linked events. | False |
| StartFrom | The exclusive position in the stream or transaction file the subscription should start from. | Null (Start from the End of the Stream) |
| ExtraStatistics | Whether to track latency statistics on this subscription. | False |
| MessageTimeout | The amount of time after which to consider a message as timed out and retried. | 30 seconds |
| MaxRetryCount | The maximum number of retries (due to timeout) before a message is considered to be parked. | 10 |
| LiveBufferSize | The size of the buffer (in-memory) listening to live messages as they happen before paging occurs. | 500 |
| ReadBatchSize | The number of events read at a time when paging through history. | 20 |
| HistoryBufferSize | The number of events to cache when paging through history. | 500 |
| CheckPointAfter | The amount of time to try to checkpoint after. | 2 seconds |
| MinCheckPointCount | The minimum number of messages to process before a checkpoint may be written. | 10 |
| MaxCheckPointCount | The maximum number of messages not checkpointed before forcing a checkpoint. | 1000 |
| MaxSubscriberCount | The maximum number of subscribers allowed. | 0 (Unbounded) |
| NamedConsumerStrategy | The strategy to use for distributing events to client consumers. See the Consumer Strategies in this doc. | Round Robin |

## Deleting a subscription group

Remove a subscription group with the delete operation. Like the creation of groups, you rarely do this in your runtime code and is undertaken by an administrator running a script.

<<< @/docs/clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#delete-persistent-subscription

| Parameter | Description |
|:----------|:------------|
| stream | The stream the persistent subscription is on. |
| groupName | The name of the subscription group to delete. |
| credentials | The user credentials to use for this operation |