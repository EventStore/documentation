<template><h1 id="subscribe-to-changes" tabindex="-1"><a class="header-anchor" href="#subscribe-to-changes" aria-hidden="true">#</a> Subscribe to changes</h1>
<p>A common operation is to subscribe to a stream and receive notifications for changes. As new events arrive, you continue following them.</p>
<p>You can only subscribe to one stream. You can use server-side projections for linking events to new aggregated streams. System projections create pre-defined streams that aggregate events by type or by category and are available out-of-the box. Check the server documentation to learn more about system and user-defined projections.</p>
<p>There are three types of subscription patterns, useful in different situations.</p>
<h2 id="volatile-subscriptions" tabindex="-1"><a class="header-anchor" href="#volatile-subscriptions" aria-hidden="true">#</a> Volatile subscriptions</h2>
<p>This subscription calls a given function for events appended after establishing the subscription. They are useful when you need notification of new events with minimal latency, but where it's not necessary to process every event.</p>
<p>For example, if a stream has 100 events in it when a subscriber connects, the subscriber can expect to see event number 101 onwards until the time the subscription is closed or dropped.</p>
<p>You can set up a volatile subscription the same way as a catch-up subscription (below) without specifying the start position.</p>
<h2 id="catch-up-subscriptions" tabindex="-1"><a class="header-anchor" href="#catch-up-subscriptions" aria-hidden="true">#</a> Catch-up Subscriptions</h2>
<p>Catch-up subscriptions serve the purpose of receiving events from a stream for a single subscriber. Subscribers for catch-up subscriptions get events in order and, therefore, are able to process events sequentially. There is nothing on the server that gets stored for such a subscriber.</p>
<p>You can have multiple subscribers for the same stream and all those subscribers will get all the events from that stream. Subscriptions have no influence on each other and can run on their own pace.</p>
<p>When creating a catch-up subscription on the client side, you can supply the starting position in the stream you are subscribing for. The subscriber will then get events from that position onwards. If the subscriber keeps the last known position in its own storage, it will be able to go down and resubscribe from the stored position in order to only get unprocessed events.</p>
<p>When the subscription starts for the first time and the stream it subscribes to already has events, the subscription will get into a catch-up state and receive historical events. When the subscriber eventually catches up and processes all the historical events, it will switch to real-time mode and will get events as they are appended to the stream. If the stream gets more events that the subscriber can process in real time, the subscriber will lag behind and switch to the catch-up mode again until it manages to process all the pending events and then switches to real-time mode again.</p>
<p>It is, therefore, a sole responsibility of the subscriber to keep the last processed event position, also known as the <em>checkpoint</em> in its own storage. If the subscriber doesn't know the last checkpoint, it will have to subscribe to the beginning of the stream. It is also possible to tell the subscriber to start processing events from the end of the stream, so all the historical events will be ignored. It is useful when you don't care about the history and want to start processing events from now on only.</p>
<p>For regular streams, the checkpoint is a sequence number of the event, which is currently being processed by the subscription. For the <code>$all</code> stream, the checkpoint consists of two positions in the global event storage - prepare position and commit position.</p>
<h3 id="use-case-for-catch-up-subscription" tabindex="-1"><a class="header-anchor" href="#use-case-for-catch-up-subscription" aria-hidden="true">#</a> Use-case for catch-up subscription</h3>
<p>Catch-up subscriptions are typically used for producing <em>read models</em> in event-sourced systems that use the CQRS pattern. Subscribers that update read models are often called <em>projections</em> because they project the event payload to a piece of state in another database. Client-side projections use the same concept as EventStoreDB server-side projections but have a different purpose.</p>
<div class="custom-container tip"><p class="custom-container-title">Storing checkpoints</p>
<p>The best practice for subscriptions that project events to another storage, is to store checkpoints in the same storage. Projecting an event and storing the checkpoint in one transaction allows you t achieve the <em>exactly once</em> event processing.</p>
</div>
<h3 id="subscribing-to-a-stream" tabindex="-1"><a class="header-anchor" href="#subscribing-to-a-stream" aria-hidden="true">#</a> Subscribing to a stream</h3>
<p>You can subscribe to any individual event stream in EventStoreDB. It could be a normal stream, where your software append events, or a stream produced by the server-side projection, either a system projection (like <code>$et-SomethingHappened</code>) or a custom projection.</p>
<p>Use the <code>IEventStoreConnection.SubscribeToStreamFrom</code> method to initiate the subscription. The connection must be open by the time you call this method.</p>
<p>You need to specify the stream, which you want to subscribe to, the last known checkpoint, subscription settings and the event handling function. Optionally, you can a function, which then gets called when the subscription switches from processing historical events to real-time processing, and a function for handling subscription drops.</p>
<div class="custom-container tip"><p class="custom-container-title">Dropping subscription</p>
<p>There are multiple reasons for a subscription to drop. The connection might close due to network issues, the subscription might get overloaded with events, or your event handler will throw an unhandled exception. It is usually a good idea to handle subscription drops and resubscribe when needed, to overcome transient issues. When a subscription drops, the application would keep working but will not process any events.</p>
</div>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">CatchUpSubscriptionSettings</span><span class="token punctuation">(</span>
    <span class="token named-parameter punctuation">maxLiveQueueSize</span><span class="token punctuation">:</span> <span class="token number">10000</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">readBatchSize</span><span class="token punctuation">:</span> <span class="token number">500</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">verboseLogging</span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">resolveLinkTos</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">subscriptionName</span><span class="token punctuation">:</span> <span class="token string">"mySubscription"</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

connection<span class="token punctuation">.</span><span class="token function">SubscribeToStreamFrom</span><span class="token punctuation">(</span>
    <span class="token named-parameter punctuation">stream</span><span class="token punctuation">:</span> <span class="token string">"myStream"</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">lastCheckpoint</span><span class="token punctuation">:</span> StreamPosition<span class="token punctuation">.</span>Start<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">settings</span><span class="token punctuation">:</span> settings<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">eventAppeared</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>sub<span class="token punctuation">,</span> evt<span class="token punctuation">)</span>
        <span class="token operator">=></span> Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLineAsync</span><span class="token punctuation">(</span><span class="token string">"Event appeared"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">liveProcessingStarted</span><span class="token punctuation">:</span> sub
        <span class="token operator">=></span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">"Processing live"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">subscriptionDropped</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>sub<span class="token punctuation">,</span> reason<span class="token punctuation">,</span> exception<span class="token punctuation">)</span>
        <span class="token operator">=></span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"Subscription dropped: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">reason</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>In this code, we create an instance of <code>CatchUpSubscriptionSettings</code>. You can also use <code>CatchUpSubscriptionSettings.Default</code> with default settings instead.</p>
<h3 id="subscribing-to-all" tabindex="-1"><a class="header-anchor" href="#subscribing-to-all" aria-hidden="true">#</a> Subscribing to <code>$all</code></h3>
<p>Subscribing to the global event stream gives you a possibility to create read models from many different event streams. It is a powerful method to create, for example, reporting models with aggregated and denormalized data without using common database operations like <code>JOIN</code>. You must, however, carefully evaluate your subscription performance, as when you subscribe to <code>$all</code>, you'll get absolutely everything what gets appended to the EventStoreDB cluster. You might also need to filter out system events, by checking if event type starts with <code>$</code>. In normal applications, you won't need to process system events.</p>
<p>As mentioned before, the checkpoint for <code>$all</code> is not a single numeric value, like it is for a single stream. You need to handle the checkpoint with two positions instead: commit and prepare position.</p>
<p>For the rest, the code for subscribing to <code>$all</code> is very similar to the previous snippet:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>connection<span class="token punctuation">.</span><span class="token function">SubscribeToAllFrom</span><span class="token punctuation">(</span>
    <span class="token named-parameter punctuation">lastCheckpoint</span><span class="token punctuation">:</span> Position<span class="token punctuation">.</span>Start<span class="token punctuation">,</span> 
    <span class="token named-parameter punctuation">settings</span><span class="token punctuation">:</span> CatchUpSubscriptionSettings<span class="token punctuation">.</span>Default<span class="token punctuation">,</span> 
    <span class="token named-parameter punctuation">eventAppeared</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>sub<span class="token punctuation">,</span> evt<span class="token punctuation">)</span>
        <span class="token operator">=></span> Console<span class="token punctuation">.</span>Out<span class="token punctuation">.</span><span class="token function">WriteLineAsync</span><span class="token punctuation">(</span><span class="token string">"Event appeared"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">liveProcessingStarted</span><span class="token punctuation">:</span> sub
        <span class="token operator">=></span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token string">"Processing live"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">subscriptionDropped</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>sub<span class="token punctuation">,</span> reason<span class="token punctuation">,</span> exception<span class="token punctuation">)</span>
        <span class="token operator">=></span> Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">$"Subscription dropped: </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">reason</span><span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>The differences here are:</p>
<ul>
<li>You don't need to specify the stream name, as we know it's the <code>$all</code> stream.</li>
<li>The checkpoint argument type is <code>Position?</code>, not <code>long?</code></li>
</ul>
<h3 id="unsubscribing" tabindex="-1"><a class="header-anchor" href="#unsubscribing" aria-hidden="true">#</a> Unsubscribing</h3>
<p>Normally, you won't need to explicitly close the subscription as you want it to run as long as your application runs. When the application stops, it is a good practice to stop the connection (<code>IEventStoreConnection.Close</code>) and when the connection closes, it also stops all the subscriptions gracefully.</p>
<p>If you need to stop the subscription without closing the connection, you can use the returned value of <code>ConnectToStreamFrom</code> or <code>ConnectToAllFrom</code>. Those methods return an instance of <code>EventStoreCatchUpSubscription</code> and <code>EventStoreAllCatchUpSubscription</code> respectively. You can use it also for something like processing gap metric, as it gives you access to the current checkpoint. When you need to stop the subscription, you can call its <code>Stop</code> method.</p>
<h2 id="persistent-subscriptions" tabindex="-1"><a class="header-anchor" href="#persistent-subscriptions" aria-hidden="true">#</a> Persistent subscriptions</h2>
<p>In contrast to volatile and Catch-up types persistent subscriptions are not dropped when connection is closed. Moreover, this subscription type supports the &quot;<a href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/CompetingConsumers.html" target="_blank" rel="noopener noreferrer">competing consumers<OutboundLink/></a>&quot; messaging pattern and are useful when you need to distribute messages to many workers. EventStoreDB saves the subscription state server-side and allows for at-least-once delivery guarantees across multiple consumers on the same stream. It is possible to have many groups of consumers compete on the same stream, with each group getting an at-least-once guarantee.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The Administration UI includes a <em>Persistent Subscriptions</em> section where a user can create, update, delete and view subscriptions and their statuses.</p>
</div>
<h3 id="concept" tabindex="-1"><a class="header-anchor" href="#concept" aria-hidden="true">#</a> Concept</h3>
<p>Persistent subscriptions serve the same purpose as catch-up or volatile subscriptions, but in a different way. All subscriptions aim to deliver events in real-time to connected subscribers. But, unlike other subscription types, persistent subscriptions are maintained by the server. In a way, catch-up and persistent subscriptions are similar. Both have a last known position from where the subscription starts getting events. However, catch-up subscriptions must take care about keeping the last known position on the subscriber side and persistent subscriptions keep the position on the server.</p>
<p>Since it is the server who decides from where the subscription should start receiving events and knows where events are delivered, subscribers that use a persistent subscription can be load-balanced and process events in parallel. In contrast, catch-up subscriptions, which are client-driven, always receive and process events sequentially and can only be load-balanced on the client side. Therefore, persistent subscriptions allow using the competing consumers pattern that is common in the world of message brokers.</p>
<p>In order for the server to load-balance subscribers, it uses the concept of consumer groups. All clients that belong to a single consumer group will get a portion of events and that's how load balancing works inside a group. It is possible to create multiple consumer groups for the same stream, and they will be completely independent of each other, receiving and processing events in their own pace and having their own last known position handled by the server.</p>
<Card><template #content><p><img src="@source/clients/dotnet/5.0/images/consumer-groups.jpg" alt="Consumer groups"></p>
</template></Card><div class="custom-container note"><p class="custom-container-title">NOTE</p><p>Just as in the world of message brokers, processing events in a group of consumers running in parallel processes will most likely get evens out of order within a certain window. For example, if a consumer group has ten consumers, ten messages will be distributed among the available consumers, based on the <a href="#consumer-strategies">strategy</a> of the group. Even though some strategies make an attempt to consistently deliver ordered events to a single consumer, it's done on the best effort basis and there is no guarantee of events coming in order with any strategy.</p>
</div><h3 id="creating-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#creating-a-subscription-group" aria-hidden="true">#</a> Creating a subscription group</h3>
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
<h3 id="connecting-to-an-existing-group" tabindex="-1"><a class="header-anchor" href="#connecting-to-an-existing-group" aria-hidden="true">#</a> Connecting to an existing group</h3>
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
<h3 id="acknowledging-events" tabindex="-1"><a class="header-anchor" href="#acknowledging-events" aria-hidden="true">#</a> Acknowledging events</h3>
<p>Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If you enable auto-ack the subscription will automatically acknowledge messages once your handler completes them. If you throw an exception, it will shut down your subscription with a message and the uncaught exception.</p>
<p>You can choose to not auto-ack messages. This can be useful when you have multi-threaded processing of messages in your subscriber and need to pass control to something else. There are methods on the subscription object that you can call <code>Acknowledge,</code> and <code>NotAcknowledge</code> both take a <code>ResolvedEvent</code> (the one you processed) both also have overloads for passing and <code>IEnumerable&lt;ResolvedEvent&gt;</code>.</p>
<h3 id="consumer-strategies" tabindex="-1"><a class="header-anchor" href="#consumer-strategies" aria-hidden="true">#</a> Consumer strategies</h3>
<p>When creating a persistent subscription, the settings allow for different consumer strategies via the <code>WithNamedConsumerStrategy</code> method. Built-in strategies are defined in the enum <code>SystemConsumerStrategies</code>.</p>
<h4 id="roundrobin-default" tabindex="-1"><a class="header-anchor" href="#roundrobin-default" aria-hidden="true">#</a> RoundRobin (default)</h4>
<p>Distributes events to all clients evenly. If the client <code>bufferSize</code> is reached, the client is ignored until events are acknowledged/not acknowledged.</p>
<p>This strategy provides equal load balancing between all consumers in the group.</p>
<h4 id="dispatchtosingle" tabindex="-1"><a class="header-anchor" href="#dispatchtosingle" aria-hidden="true">#</a> DispatchToSingle</h4>
<p>Distributes events to a single client until the <code>bufferSize</code> is reached. After that, the next client is selected in a round robin style, and the process is repeated.</p>
<p>This option can be seen as a fall-back scenario for high availability, when a single consumer processes all the events until it reaches its maximum capacity. When that happens, another consumer takes the load to free up the main consumer resources.</p>
<h4 id="pinned" tabindex="-1"><a class="header-anchor" href="#pinned" aria-hidden="true">#</a> Pinned</h4>
<p>For use with an indexing projection such as the system <code>$by_category</code> projection.</p>
<p>EventStoreDB inspects event for its source stream id, hashing the id to one of 1024 buckets assigned to individual clients. When a client disconnects its buckets are assigned to other clients. When a client connects, it is assigned some of the existing buckets. This naively attempts to maintain a balanced workload.</p>
<p>The main aim of this strategy is to decrease the likelihood of concurrency and ordering issues while maintaining load balancing. <em>This is not a guarantee</em>, and you should handle the usual ordering and concurrency issues.</p>
<h3 id="replay-parked-messages" tabindex="-1"><a class="header-anchor" href="#replay-parked-messages" aria-hidden="true">#</a> Replay parked messages</h3>
<p>Replays all parked messages for a particular persistent subscription <code>subscriptionName</code> on a <code>stream</code> that were parked by a negative acknowledgement action.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token return-type class-name">Task</span> <span class="token function">ReplayParkedMessages</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> 
    <span class="token class-name"><span class="token keyword">string</span></span> subscriptionName<span class="token punctuation">,</span> 
    <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="updating-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#updating-a-subscription-group" aria-hidden="true">#</a> Updating a subscription group</h3>
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
<h3 id="persistent-subscription-settings" tabindex="-1"><a class="header-anchor" href="#persistent-subscription-settings" aria-hidden="true">#</a> Persistent subscription settings</h3>
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
<h3 id="deleting-a-subscription-group" tabindex="-1"><a class="header-anchor" href="#deleting-a-subscription-group" aria-hidden="true">#</a> Deleting a subscription group</h3>
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
<h3 id="monitoring-persistent-subscriptions" tabindex="-1"><a class="header-anchor" href="#monitoring-persistent-subscriptions" aria-hidden="true">#</a> Monitoring persistent subscriptions</h3>
<p>The client API includes helper methods that wrap the HTTP API to allow you to monitor persistent subscriptions. This page describes the methods found in the <code>PersistentSubscriptionsManager</code> class. All methods in this class are asynchronous.</p>
<h4 id="create-the-manager-instance" tabindex="-1"><a class="header-anchor" href="#create-the-manager-instance" aria-hidden="true">#</a> Create the manager instance</h4>
<p>Before accessing any of the methods described below, you need to create an instance of the <code>PersistentSubscriptionsManager</code> class. It needs a logger instance and one of the variations of the <code>EndPoint</code> abstract class. You would normally use either the <code>IpEndPoint</code> or <code>DnsEndPoint</code>. Since all HTTP calls would be redirected to the cluster leader, you can use an IP address of any cluster node. When using the <code>DnsEndPoint</code>, you can specify the DNS name of the cluster.</p>
<p>For example:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> subscriptionManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">PersistentSubscriptionsManager</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">ConsoleLogger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">DnsEndPoint</span><span class="token punctuation">(</span><span class="token string">"esdb.acme.org"</span><span class="token punctuation">,</span> <span class="token number">2113</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    TimeSpan<span class="token punctuation">.</span><span class="token function">FromSeconds</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Notice that you need to specify the HTTP port that your application can reach. Most probably you'd need to use the external HTTP port, which is <code>2113</code> by default.</p>
<h4 id="get-persistent-subscriptions-from-all-streams" tabindex="-1"><a class="header-anchor" href="#get-persistent-subscriptions-from-all-streams" aria-hidden="true">#</a> Get persistent subscriptions from all streams</h4>
<p>Returns information about all persistent subscriptions from all streams.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task</span> <span class="token function">List</span><span class="token punctuation">(</span><span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="get-persistent-subscriptions-for-a-stream" tabindex="-1"><a class="header-anchor" href="#get-persistent-subscriptions-for-a-stream" aria-hidden="true">#</a> Get persistent subscriptions for a stream</h4>
<p>Returns information about the persistent subscription for a stream you specify with <code>stream</code>. You must have access to the stream.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task</span> <span class="token function">List</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="get-persistent-subscription-for-a-stream" tabindex="-1"><a class="header-anchor" href="#get-persistent-subscription-for-a-stream" aria-hidden="true">#</a> Get persistent subscription for a stream</h4>
<p>Gets the details of the persistent subscription <code>subscriptionName</code> on <code>stream</code>. You must have access to the persistent subscription and the stream.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task</span> <span class="token function">Describe</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">string</span></span> subscriptionName<span class="token punctuation">,</span> <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
