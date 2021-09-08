<template><h1 id="persistent-subscriptions" tabindex="-1"><a class="header-anchor" href="#persistent-subscriptions" aria-hidden="true">#</a> Persistent Subscriptions</h1>
<h2 id="creating-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#creating-a-subscription-group" aria-hidden="true">#</a> Creating a subscription group</h2>
<p>The first step of dealing with a subscription group is to create one. You will receive an error if you attempt to create a subscription group multiple times. You must have admin permissions to create a persistent subscription group.</p>
<p>@[code](clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#create-persistent-subscription-to-stream</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>stream</code></td>
<td style="text-align:left">The stream the persistent subscription is on.</td>
</tr>
<tr>
<td style="text-align:left"><code>groupName</code></td>
<td style="text-align:left">The name of the subscription group to create.</td>
</tr>
<tr>
<td style="text-align:left"><code>settings</code></td>
<td style="text-align:left">The settings to use when creating the subscription.</td>
</tr>
<tr>
<td style="text-align:left"><code>credentials</code></td>
<td style="text-align:left">The user credentials to use for this operation.</td>
</tr>
</tbody>
</table>
<h2 id="connecting-to-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#connecting-to-a-subscription-group" aria-hidden="true">#</a> Connecting to a subscription group</h2>
<p>Once you have created a subscription group, clients can connect to that subscription group. A subscription in your application should only have the connection in your code, you should assume that the subscription already exists.</p>
<p>The most important parameter to pass when connecting is the buffer size. This represents how many outstanding messages the server should allow this client. If this number is too small, your subscription will spend much of its time idle as it waits for an acknowledgment to come back from the client. If it's too big, you waste resources and can start causing time out messages depending on the speed of your processing.</p>
<p>@[code](clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#subscribe-to-persistent-subscription-to-stream</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>stream</code></td>
<td style="text-align:left">The stream the persistent subscription is on.</td>
</tr>
<tr>
<td style="text-align:left"><code>groupName</code></td>
<td style="text-align:left">The name of the subscription group to subscribe to.</td>
</tr>
<tr>
<td style="text-align:left"><code>eventAppeared</code></td>
<td style="text-align:left">The action to call when an event arrives over the subscription.</td>
</tr>
<tr>
<td style="text-align:left"><code>subscriptionDropped</code></td>
<td style="text-align:left">The action to call if the subscription is dropped.</td>
</tr>
<tr>
<td style="text-align:left"><code>credentials</code></td>
<td style="text-align:left">The user credentials to use for this operation.</td>
</tr>
<tr>
<td style="text-align:left"><code>bufferSize</code></td>
<td style="text-align:left">The number of in-flight messages this client is allowed. <strong>Default: 10</strong></td>
</tr>
<tr>
<td style="text-align:left"><code>autoAck</code></td>
<td style="text-align:left">Whether to automatically acknowledge messages after eventAppeared returns. <strong>Default: true</strong></td>
</tr>
</tbody>
</table>
<!-- TODO: UNCOMMENT ONCE 21.6.0 is released -->
<!-- ## Subscribing to $all

The ability to subscribe to $all was introduced in 21.6.0. Persistent Subscriptions to $all also support filtering.

You can create a subscription group on $all much the same way you would create a subscription group on a stream:

@[code](clients/dotnet/generated/21.6.0/samples/persistent-subscriptions/Program.cs#create-persistent-subscription-to-all

And then subscribing to it is done in much the same way:

@[code](clients/dotnet/generated/21.6.0/samples/persistent-subscriptions/Program.cs#subscribe-to-persistent-subscription-to-all -->
<h2 id="acknowledgements" tabindex="-1"><a class="header-anchor" href="#acknowledgements" aria-hidden="true">#</a> Acknowledgements</h2>
<p>Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If you enable auto-ack the subscription will automatically acknowledge messages once your handler completes them. If an error occurs, it will shut down your subscription with a message and the error.</p>
<p>You can choose to not auto-ack messages. This can be useful when you have multi-threaded processing of messages in your subscriber and need to pass control to something else. If you want to manually acknowlegde events, you need to set this option when subscribing and then acknowledge or not acknowledge messages as you handle them.</p>
<p>@[code](clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#subscribe-to-persistent-subscription-with-manual-acks</p>
<p>The Nak Actions describe what the server should do with the message:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Action</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>Unknown</code></td>
<td style="text-align:left">The client does not know what action to take. Let the server decide.</td>
</tr>
<tr>
<td style="text-align:left"><code>Park</code></td>
<td style="text-align:left">Park the message and do not resend. Put it on poison queue.</td>
</tr>
<tr>
<td style="text-align:left"><code>Retry</code></td>
<td style="text-align:left">Explicitly retry the message.</td>
</tr>
<tr>
<td style="text-align:left"><code>Skip</code></td>
<td style="text-align:left">Skip this message do not resend and do not put in poison queue.</td>
</tr>
</tbody>
</table>
<h2 id="consumer-strategies" tabindex="-1"><a class="header-anchor" href="#consumer-strategies" aria-hidden="true">#</a> Consumer strategies</h2>
<p>When creating a persistent subscription, you can choose between a number of consumer strategies.</p>
<h3 id="roundrobin-default" tabindex="-1"><a class="header-anchor" href="#roundrobin-default" aria-hidden="true">#</a> RoundRobin (default)</h3>
<p>Distributes events to all clients evenly. If the client <code>bufferSize</code> is reached, the client won't receive more events until it acknowledges or not acknowledges events in its buffer.</p>
<p>This strategy provides equal load balancing between all consumers in the group.</p>
<h3 id="dispatchtosingle" tabindex="-1"><a class="header-anchor" href="#dispatchtosingle" aria-hidden="true">#</a> DispatchToSingle</h3>
<p>Distributes events to a single client until the <code>bufferSize</code> is reached. After that, the next client is selected in a round-robin style, and the process repeats.</p>
<p>This option can be seen as a fall-back scenario for high availability, when a single consumer processes all the events until it reaches its maximum capacity. When that happens, another consumer takes the load to free up the main consumer resources.</p>
<h3 id="pinned" tabindex="-1"><a class="header-anchor" href="#pinned" aria-hidden="true">#</a> Pinned</h3>
<p>For use with an indexing projection such as the system <code>$by_category</code> projection.</p>
<p>EventStoreDB inspects the event for its source stream id, hashing the id to one of 1024 buckets assigned to individual clients. When a client disconnects, its buckets are assigned to other clients. When a client connects, it is assigned some existing buckets. This naively attempts to maintain a balanced workload.</p>
<p>The main aim of this strategy is to decrease the likelihood of concurrency and ordering issues while maintaining load balancing. This is not a guarantee, and you should handle the usual ordering and concurrency issues.</p>
<h2 id="updating-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#updating-a-subscription-group" aria-hidden="true">#</a> Updating a subscription group</h2>
<p>You can edit the settings of an existing subscription group while it is running, you don't need to delete and recreate it to change settings. When you update the subscription group, it resets itself internally, dropping the connections and having them reconnect. You must have admin permissions to update a persistent subscription group.</p>
<p>@[code](clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#update-persistent-subscription</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>stream</code></td>
<td style="text-align:left">The stream the persistent subscription is on.</td>
</tr>
<tr>
<td style="text-align:left"><code>groupName</code></td>
<td style="text-align:left">The name of the subscription group to update.</td>
</tr>
<tr>
<td style="text-align:left"><code>settings</code></td>
<td style="text-align:left">The settings to use when creating the subscription.</td>
</tr>
<tr>
<td style="text-align:left"><code>credentials</code></td>
<td style="text-align:left">The user credentials to use for this operation.</td>
</tr>
</tbody>
</table>
<h2 id="persistent-subscription-settings" tabindex="-1"><a class="header-anchor" href="#persistent-subscription-settings" aria-hidden="true">#</a> Persistent subscription settings</h2>
<p>Both the <code>Create</code> and <code>Update</code> methods take some settings for configuring the persistent subscription.</p>
<p>The following table shows the configuration options you can set on a persistent subscription.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Option</th>
<th style="text-align:left">Description</th>
<th style="text-align:left">Default</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>ResolveLinkTos</code></td>
<td style="text-align:left">Whether the subscription should resolve link events to their linked events.</td>
<td style="text-align:left"><code>false</code></td>
</tr>
<tr>
<td style="text-align:left"><code>StartFrom</code></td>
<td style="text-align:left">The exclusive position in the stream or transaction file the subscription should start from.</td>
<td style="text-align:left"><code>null</code> (start from the end of the stream)</td>
</tr>
<tr>
<td style="text-align:left"><code>ExtraStatistics</code></td>
<td style="text-align:left">Whether to track latency statistics on this subscription.</td>
<td style="text-align:left"><code>false</code></td>
</tr>
<tr>
<td style="text-align:left"><code>MessageTimeout</code></td>
<td style="text-align:left">The amount of time after which to consider a message as timed out and retried.</td>
<td style="text-align:left"><code>30</code> (seconds)</td>
</tr>
<tr>
<td style="text-align:left"><code>MaxRetryCount</code></td>
<td style="text-align:left">The maximum number of retries (due to timeout) before a message is considered to be parked.</td>
<td style="text-align:left"><code>10</code></td>
</tr>
<tr>
<td style="text-align:left"><code>LiveBufferSize</code></td>
<td style="text-align:left">The size of the buffer (in-memory) listening to live messages as they happen before paging occurs.</td>
<td style="text-align:left"><code>500</code></td>
</tr>
<tr>
<td style="text-align:left"><code>ReadBatchSize</code></td>
<td style="text-align:left">The number of events read at a time when paging through history.</td>
<td style="text-align:left"><code>20</code></td>
</tr>
<tr>
<td style="text-align:left"><code>HistoryBufferSize</code></td>
<td style="text-align:left">The number of events to cache when paging through history.</td>
<td style="text-align:left"><code>500</code></td>
</tr>
<tr>
<td style="text-align:left"><code>CheckPointAfter</code></td>
<td style="text-align:left">The amount of time to try to checkpoint after.</td>
<td style="text-align:left"><code>2</code> seconds</td>
</tr>
<tr>
<td style="text-align:left"><code>MinCheckPointCount</code></td>
<td style="text-align:left">The minimum number of messages to process before a checkpoint may be written.</td>
<td style="text-align:left"><code>10</code></td>
</tr>
<tr>
<td style="text-align:left"><code>MaxCheckPointCount</code></td>
<td style="text-align:left">The maximum number of messages not checkpointed before forcing a checkpoint.</td>
<td style="text-align:left"><code>1000</code></td>
</tr>
<tr>
<td style="text-align:left"><code>MaxSubscriberCount</code></td>
<td style="text-align:left">The maximum number of subscribers allowed.</td>
<td style="text-align:left"><code>0</code> (unbounded)</td>
</tr>
<tr>
<td style="text-align:left"><code>NamedConsumerStrategy</code></td>
<td style="text-align:left">The strategy to use for distributing events to client consumers. See the <a href="#consumer-strategies">consumer strategies</a> in this doc.</td>
<td style="text-align:left"><code>RoundRobin</code></td>
</tr>
</tbody>
</table>
<h2 id="deleting-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#deleting-a-subscription-group" aria-hidden="true">#</a> Deleting a subscription group</h2>
<p>Remove a subscription group with the delete operation. Like the creation of groups, you rarely do this in your runtime code and is undertaken by an administrator running a script.</p>
<p>@[code](clients/dotnet/generated/21.2.0/samples/persistent-subscriptions/Program.cs#delete-persistent-subscription</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>stream</code></td>
<td style="text-align:left">The stream the persistent subscription is on.</td>
</tr>
<tr>
<td style="text-align:left"><code>groupName</code></td>
<td style="text-align:left">The name of the subscription group to delete.</td>
</tr>
<tr>
<td style="text-align:left"><code>credentials</code></td>
<td style="text-align:left">The user credentials to use for this operation</td>
</tr>
</tbody>
</table>
</template>
