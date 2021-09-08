<template><h1 id="persistent-subscriptions" tabindex="-1"><a class="header-anchor" href="#persistent-subscriptions" aria-hidden="true">#</a> Persistent subscriptions</h1>
<p>This page explains how to set up and use persistent subscriptions.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The Administration UI includes a <em>Persistent Subscriptions</em> section where a user can create, update, delete and view subscriptions and their statuses.</p>
</div>
<h2 id="concepts" tabindex="-1"><a class="header-anchor" href="#concepts" aria-hidden="true">#</a> Concepts</h2>
<p>As mentioned in the <RouterLink to="/clients/dotnet/20.10/subscriptions/#persistent-subscriptions">subscriptions page</RouterLink>, persistent subscriptions serve the same purpose as catch-up or volatile subscriptions, but in a different way. All subscriptions aim to deliver events in real-time to connected subscribers. But, unlike other subscription types, persistent subscriptions are maintained by the server. In a way, catch-up and persistent subscriptions are similar. Both have a last known position from where the subscription starts getting events. However, catch-up subscriptions must take care about keeping the last known position on the subscriber side and persistent subscriptions keep the position on the server.</p>
<p>Since it is the server who decides from where the subscription should start receiving events and knows where events are delivered, subscribers that use a persistent subscription can be load-balanced and process events in parallel. In contrast, catch-up subscriptions, which are client-driven, always receive and process events sequentially and can only be load-balanced on the client side. Therefore, persistent subscriptions allow using the competing consumers pattern that is common in the world of message brokers.</p>
<p>In order for the server to load-balance subscribers, it uses the concept of consumer groups. All clients that belong to a single consumer group will get a portion of events and that's how load balancing works inside a group. It is possible to create multiple consumer groups for the same stream and they will be completely independent from each other, receiving and processing events in their own pace and having their own last known position handled by the server.</p>
<Card><template #content><p><img src="@source/clients/dotnet/20.10/subscriptions/images/consumer-groups.jpg" alt="Consumer groups"></p>
</template></Card><div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Just as in the world of message brokers, processing events in a group of consumers running in parallel processes will most likely get evens out of order within a certain window. For example, if a consumer group has ten consumers, ten messages will be distributed among the available consumers, based on the <a href="#consumer-strategies">strategy</a> of the group. Even though some strategies make an attempt to consistently deliver ordered events to a single consumer, it's done on the best effort basis and there is no guarantee of events coming in order with any strategy.</p>
</div>
<h2 id="creating-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#creating-a-subscription-group" aria-hidden="true">#</a> Creating a subscription group</h2>
<p>The first step of dealing with a subscription group is to create one. You will receive an error if you attempt to create a subscription group multiple times. You must have admin permissions to create a persistent subscription group.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Normally you wouldn't create the subscription group in your general executable code. Maintaining subscription groups can be seen as a <em>migration</em> task, similar to RDBMS schema migrations and therefore needs to run only after it gets changed for some reason.</p>
</div>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> userCredentials <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UserCredentials</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">,</span> <span class="token string">"changeit"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> PersistentSubscriptionSettings
    <span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">StartFromCurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">CreatePersistentSubscriptionAsync</span><span class="token punctuation">(</span>
    <span class="token string">"myStream"</span><span class="token punctuation">,</span> 
    <span class="token string">"agroup"</span><span class="token punctuation">,</span> 
    settings<span class="token punctuation">,</span> 
    userCredentials
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string stream</code></td>
<td style="text-align:left">The stream to the persistent subscription is on.</td>
</tr>
<tr>
<td style="text-align:left"><code>string groupName</code></td>
<td style="text-align:left">The name of the subscription group to create.</td>
</tr>
<tr>
<td style="text-align:left"><code>PersistentSubscriptionSettings settings</code></td>
<td style="text-align:left">The settings to use when creating this subscription.</td>
</tr>
<tr>
<td style="text-align:left"><code>UserCredentials credentials</code></td>
<td style="text-align:left">The user credentials to use for this operation.</td>
</tr>
</tbody>
</table>
<h2 id="connecting-to-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#connecting-to-a-subscription-group" aria-hidden="true">#</a> Connecting to a subscription group</h2>
<p>Once you have created a subscription group, clients can connect to that subscription group. A subscription in your application should only have the connection in your code, you should assume that the subscription was created via the client API, the restful API, or manually in the UI.</p>
<p>The most important parameter to pass when connecting is the buffer size. This parameter represents how many outstanding messages the server should allow this client. If this number is too small, your subscription will spend much of its time idle as it waits for an acknowledgment to come back from the client. If it's too big, you waste resources and can start causing time out messages depending on the speed of your processing.</p>
<div class="custom-container warning"><p class="custom-container-title">Slow consumers</p>
<p>If you define a large buffer and your consumer is slow, the subscription might time out on the server and send the same buffer again. Such a situation leads to severe performance degradation of the persistent subscription and the cluster node.</p>
</div>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> subscription <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">ConnectToPersistentSubscriptionAsync</span><span class="token punctuation">(</span>
    <span class="token string">"myStream"</span><span class="token punctuation">,</span> 
    <span class="token string">"agroup"</span><span class="token punctuation">,</span> 
    <span class="token punctuation">(</span>_<span class="token punctuation">,</span> evt<span class="token punctuation">)</span> 
        <span class="token operator">=></span> Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLineAsync</span><span class="token punctuation">(</span><span class="token string">"event appeared"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span>sub<span class="token punctuation">,</span> reason<span class="token punctuation">,</span> exception<span class="token punctuation">)</span> 
        <span class="token operator">=></span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"Subscription dropped: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">reason</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string stream</code></td>
<td style="text-align:left">The stream to the persistent subscription is on.</td>
</tr>
<tr>
<td style="text-align:left"><code>string groupName</code></td>
<td style="text-align:left">The name of the subscription group to connect to.</td>
</tr>
<tr>
<td style="text-align:left"><code>Action eventAppeared</code></td>
<td style="text-align:left">The action to call when an event arrives over the subscription.</td>
</tr>
<tr>
<td style="text-align:left"><code>Action subscriptionDropped</code></td>
<td style="text-align:left">The action to call if the subscription is dropped.</td>
</tr>
<tr>
<td style="text-align:left"><code>UserCredentials credentials</code></td>
<td style="text-align:left">The user credentials to use for this operation.</td>
</tr>
<tr>
<td style="text-align:left"><code>int bufferSize</code></td>
<td style="text-align:left">The number of in-flight messages this client is allowed.</td>
</tr>
<tr>
<td style="text-align:left"><code>bool autoAck</code></td>
<td style="text-align:left">Whether to automatically acknowledge messages after eventAppeared returns.</td>
</tr>
</tbody>
</table>
<h2 id="acknowledgements" tabindex="-1"><a class="header-anchor" href="#acknowledgements" aria-hidden="true">#</a> Acknowledgements</h2>
<p>Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If you enable auto-ack the subscription will automatically acknowledge messages once your handler completes them. If you throw an exception, it will shut down your subscription with a message and the uncaught exception.</p>
<p>You can choose to not auto-ack messages. This can be useful when you have multi-threaded processing of messages in your subscriber and need to pass control to something else. There are methods on the subscription object that you can call <code>Acknowledge,</code> and <code>NotAcknowledge</code> both take a <code>ResolvedEvent</code> (the one you processed) both also have overloads for passing and <code>IEnumerable&lt;ResolvedEvent&gt;</code>.</p>
<h2 id="consumer-strategies" tabindex="-1"><a class="header-anchor" href="#consumer-strategies" aria-hidden="true">#</a> Consumer strategies</h2>
<p>When creating a persistent subscription, the settings allow for different consumer strategies via the <code>WithNamedConsumerStrategy</code> method. Built-in strategies are defined in the enum <code>SystemConsumerStrategies</code>.</p>
<h3 id="roundrobin-default" tabindex="-1"><a class="header-anchor" href="#roundrobin-default" aria-hidden="true">#</a> RoundRobin (default)</h3>
<p>Distributes events to all clients evenly. If the client <code>bufferSize</code> is reached, the client is ignored until events are acknowledged/not acknowledged.</p>
<p>This strategy provides equal load balancing between all consumers in the group.</p>
<h3 id="dispatchtosingle" tabindex="-1"><a class="header-anchor" href="#dispatchtosingle" aria-hidden="true">#</a> DispatchToSingle</h3>
<p>Distributes events to a single client until the <code>bufferSize</code> is reached. After that, the next client is selected in a round robin style, and the process is repeated.</p>
<p>This option can be seen as a fall-back scenario for high availability, when a single consumer processes all the events until it reaches its maximum capacity. When that happens, another consumer takes the load to free up the main consumer resources.</p>
<h3 id="pinned" tabindex="-1"><a class="header-anchor" href="#pinned" aria-hidden="true">#</a> Pinned</h3>
<p>For use with an indexing projection such as the system <code>$by_category</code> projection.</p>
<p>EventStoreDB inspects event for its source stream id, hashing the id to one of 1024 buckets assigned to individual clients. When a client disconnects it's buckets are assigned to other clients. When a client connects, it is assigned some of the existing buckets. This naively attempts to maintain a balanced workload.</p>
<p>The main aim of this strategy is to decrease the likelihood of concurrency and ordering issues while maintaining load balancing. <em>This is not a guarantee</em>, and you should handle the usual ordering and concurrency issues.</p>
<h2 id="replay-parked-messages" tabindex="-1"><a class="header-anchor" href="#replay-parked-messages" aria-hidden="true">#</a> Replay parked messages</h2>
<p>Replays all parked messages for a particular persistent subscription <code>subscriptionName</code> on a <code>stream</code> that were parked by a negative acknowledgement action.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">Task</span> <span class="token function">ReplayParkedMessages</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> 
    <span class="token class-name"><span class="token keyword">string</span></span> subscriptionName<span class="token punctuation">,</span> 
    <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="updating-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#updating-a-subscription-group" aria-hidden="true">#</a> Updating a subscription group</h2>
<p>You can edit the settings of an existing subscription group while it is running, you don't need to delete and recreate it to change settings. When you update the subscription group, it resets itself internally dropping the connections and having them reconnect. You must have admin permissions to update a persistent subscription group.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> PersistentSubscriptionSettings
    <span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">ResolveLinkTos</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">StartFromCurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">UpdatePersistentSubscriptionAsync</span><span class="token punctuation">(</span>
    stream<span class="token punctuation">,</span> <span class="token string">"agroup"</span><span class="token punctuation">,</span> settings<span class="token punctuation">,</span> MyCredentials
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>If you change settings such as <code>startFromBeginning</code>, this doesn't reset the group's checkpoint. If you want to change the current position in an update, you must delete and recreate the subscription group.</p>
</div>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string stream</code></td>
<td style="text-align:left">The stream to the persistent subscription is on.</td>
</tr>
<tr>
<td style="text-align:left"><code>string groupName</code></td>
<td style="text-align:left">The name of the subscription group to update.</td>
</tr>
<tr>
<td style="text-align:left"><code>PersistentSubscriptionSettings settings</code></td>
<td style="text-align:left">The settings to use when updating this subscription.</td>
</tr>
<tr>
<td style="text-align:left"><code>UserCredentials credentials</code></td>
<td style="text-align:left">The user credentials to use for this operation.</td>
</tr>
</tbody>
</table>
<h2 id="persistent-subscription-settings" tabindex="-1"><a class="header-anchor" href="#persistent-subscription-settings" aria-hidden="true">#</a> Persistent subscription settings</h2>
<p>Both the <code>Create</code> and <code>Update</code> methods take a <code>PersistentSubscriptionSettings</code> object as a parameter. The methods use this object to provide the settings for the persistent subscription. A fluent builder is available for these options that you can locate using the <code>Create()</code> method. For example:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> PersistentSubscriptionSettings
    <span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">ResolveLinkTos</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">StartFromCurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>The following table shows the options you can set on a persistent subscription.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Member</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>ResolveLinkTos</code></td>
<td style="text-align:left">Tells the subscription to resolve link events.</td>
</tr>
<tr>
<td style="text-align:left"><code>DoNotResolveLinkTos</code></td>
<td style="text-align:left">Tells the subscription to not resolve link events.</td>
</tr>
<tr>
<td style="text-align:left"><code>PreferRoundRobin</code></td>
<td style="text-align:left">If possible preference a round robin between the connections with messages (if not possible uses next available).</td>
</tr>
<tr>
<td style="text-align:left"><code>PreferDispatchToSingle</code></td>
<td style="text-align:left">If possible preference dispatching to a single connection (if not possible will use next available).</td>
</tr>
<tr>
<td style="text-align:left"><code>StartFromBeginning</code></td>
<td style="text-align:left">Start the subscription from the first event in the stream.</td>
</tr>
<tr>
<td style="text-align:left"><code>StartFrom(int position)</code></td>
<td style="text-align:left">Start the subscription from the position-th event in the stream.</td>
</tr>
<tr>
<td style="text-align:left"><code>StartFromCurrent</code></td>
<td style="text-align:left">Start the subscription from the current position.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithMessageTimeoutOf(TimeSpan timeout)</code></td>
<td style="text-align:left">Sets the timeout for a client before retrying the message.</td>
</tr>
<tr>
<td style="text-align:left"><code>CheckPointAfter(TimeSpan time)</code></td>
<td style="text-align:left">The amount of time the system should try to checkpoint after.</td>
</tr>
<tr>
<td style="text-align:left"><code>MinimumCheckPointCountOf(int count)</code></td>
<td style="text-align:left">The minimum number of messages to write a checkpoint for.</td>
</tr>
<tr>
<td style="text-align:left"><code>MaximumCheckPointCountOf(int count)</code></td>
<td style="text-align:left">The maximum number of messages not checkpointed before forcing a checkpoint.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithMaxRetriesOf(int count)</code></td>
<td style="text-align:left">Sets the number of times to retry a message should before considering it a bad message.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithLiveBufferSizeOf(int count)</code></td>
<td style="text-align:left">The size of the live buffer (in memory) before resorting to paging.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithReadBatchOf(int count)</code></td>
<td style="text-align:left">The size of the read batch when in paging mode.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithBufferSizeOf(int count)</code></td>
<td style="text-align:left">The number of messages to buffer when in paging mode.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithExtraStatistics</code></td>
<td style="text-align:left">Tells the backend to measure timings on the clients so statistics contain histograms of them.</td>
</tr>
</tbody>
</table>
<h2 id="deleting-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#deleting-a-subscription-group" aria-hidden="true">#</a> Deleting a subscription group</h2>
<p>Remove a subscription group with the delete operation. Like the creation of groups, you rarely do this in your runtime code and is undertaken by an administrator running a script.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">DeletePersistentSubscriptionAsync</span><span class="token punctuation">(</span>
    stream<span class="token punctuation">,</span> <span class="token string">"groupname"</span><span class="token punctuation">,</span> AdminCredentials
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string stream</code></td>
<td style="text-align:left">The stream to the persistent subscription is on.</td>
</tr>
<tr>
<td style="text-align:left"><code>string groupName</code></td>
<td style="text-align:left">The name of the subscription group to update.</td>
</tr>
<tr>
<td style="text-align:left"><code>UserCredentials credentials</code></td>
<td style="text-align:left">The user credentials to use for this operation.</td>
</tr>
</tbody>
</table>
</template>
