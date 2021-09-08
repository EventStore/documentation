<template><h1 id="subscription-basics" tabindex="-1"><a class="header-anchor" href="#subscription-basics" aria-hidden="true">#</a> Subscription basics</h1>
<p>Subscriptions allow you to subscribe to a stream and receive notifications about new events added to the stream.</p>
<p>You provide an event handler and an optional starting point to the subscription. The handler is called for each event from the starting point onward.</p>
<p>If events already exist, the handler will be called for each event one by one until it reaches the end of the stream. From there, the server will notify the handler whenever a new event appears.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Check <RouterLink to="/clients/getting-started/connecting.html#required-packages">connecting to EventStoreDB instructions</RouterLink> to learn how to configure and use the client SDK.</p>
</div>
<h2 id="subscribing-to-a-stream" tabindex="-1"><a class="header-anchor" href="#subscribing-to-a-stream" aria-hidden="true">#</a> Subscribing to a stream</h2>
<p>The simplest stream subscription looks like the following :</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream</p>
</xode-block>
</xode-group>
<p>The provided handler will be called for every event in the stream.</p>
<h2 id="subscribing-to-all" tabindex="-1"><a class="header-anchor" href="#subscribing-to-all" aria-hidden="true">#</a> Subscribing to <code>$all</code></h2>
<p>Subscribing to <code>$all</code> is much the same as subscribing to a single stream. The handler will be called for every event appended after the starting position.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-all</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-all</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-all</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-all</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-all</p>
</xode-block>
</xode-group>
<h2 id="subscribing-from-a-specific-position" tabindex="-1"><a class="header-anchor" href="#subscribing-from-a-specific-position" aria-hidden="true">#</a> Subscribing from a specific position</h2>
<p>The previous examples will subscribe to the stream from the beginning. This will end up calling the handler for every event in the stream and then wait for new events after that.</p>
<p>Both the stream and $all subscriptions accept a starting position if you want to read from a specific point onward. If events already exist at the position you subscribe to, they will be read on the server side and sent to the subscription.</p>
<p>Once caught up, the sever will push any new events received on the streams to the client. There is no difference between catching up and live on the client side.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>The positions provided to the subscriptions are exclusive. You will only receive the next event after the subscribed position.</p>
</div>
<h3 id="subscribing-to-a-stream-1" tabindex="-1"><a class="header-anchor" href="#subscribing-to-a-stream-1" aria-hidden="true">#</a> Subscribing to a stream</h3>
<p>To subscribe to a stream from a specific position, you need to provide a <em>stream position</em>. This can be <code>Start</code>, <code>End</code> or a <em>big int</em> (unsigned 64 bit integer) position.</p>
<p>The following subscribes to the stream <code>some-stream</code> at position <code>20</code>, this means that events <code>21</code> and onward will be handled:</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-from-position</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream-from-position</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream-from-position</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream-from-position</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream-from-position</p>
</xode-block>
</xode-group>
<h3 id="subscribing-to-all-1" tabindex="-1"><a class="header-anchor" href="#subscribing-to-all-1" aria-hidden="true">#</a> Subscribing to $all</h3>
<p>Subscribing to the <code>$all</code> stream is much like subscribing to a regular stream. The only difference is how you need to specify the stream position. For the <code>$all</code> stream, you have to provide a <code>Position</code> structure instead, which consists of two big integers - prepare and commit positions. The <code>Position</code> value can be <code>Start</code>, <code>End</code> or a <code>Position</code> created from a commit and prepare position.</p>
<p>The corresponding <code>$all</code> subscription will subscribe from the event after the one at commit position <code>1056</code> and prepare position <code>1056</code>.</p>
<p>Please note that this position will need to be a legitimate position in <code>$all</code>.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-all-from-position</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-all-from-position</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-all-from-position</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-all-from-position</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-all-from-position</p>
</xode-block>
</xode-group>
<h2 id="subscribing-to-a-stream-for-live-updates" tabindex="-1"><a class="header-anchor" href="#subscribing-to-a-stream-for-live-updates" aria-hidden="true">#</a> Subscribing to a stream for live updates</h2>
<p>You can subscribe to a stream to get live updates by subscribing to the end of the stream:</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-live</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream-live</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream-live</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream-live</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream-live</p>
</xode-block>
</xode-group>
<p>And the same works with <code>$all</code> :</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-all-live</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-all-live</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-all-live</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-all-live</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-all-live</p>
</xode-block>
</xode-group>
<p>This won't read through the history of the stream, but will rather notify the handler when a new event appears in the respective stream.</p>
<p>Keep in mind that when you subscribe to a stream from a certain position, as described <a href="#subscribing-from-a-specific-position">above</a>, you will also get live updates after your subscription catches up (processes all the historical events).</p>
<h2 id="resolving-link-to-s" tabindex="-1"><a class="header-anchor" href="#resolving-link-to-s" aria-hidden="true">#</a> Resolving link-to's</h2>
<p>Link-to events point to events in other streams in EventStoreDB. These are generally created by projections such as the <code>$by_event_type</code> projection which links events of the same event type into the same stream. This makes it easier to look up all events of a certain type.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><RouterLink to="/clients/grpc/filtering.html">Filtered subscriptions</RouterLink> make it easier and faster to subscribe to all events of a certain type or matching a prefix.</p>
</div>
<p>When reading a stream you can specify whether to resolve link-to's or not. By default, link-to events are not resolved. You can change this behaviour by setting the <code>resolveLinkTos</code> parameter to <code>true</code>:</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-resolving-linktos</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream-resolving-linktos</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream-resolving-linktos</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream-resolving-linktos</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream-resolving-linktos</p>
</xode-block>
</xode-group>
<h2 id="dropped-subscriptions" tabindex="-1"><a class="header-anchor" href="#dropped-subscriptions" aria-hidden="true">#</a> Dropped subscriptions</h2>
<p>When a subscription stops or experiences an error, it will be dropped. The subscription provides a <code>subscriptionDropped</code> callback, which will get called when the subscription breaks.</p>
<p>The <code>subscriptionDropped</code> callback allows you to inspect the reason why the subscription dropped, as well as any exceptions that occurred.</p>
<p>The possible reasons for a subscription to drop are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Reason</th>
<th style="text-align:left">Why it might happen</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>Disposed</code></td>
<td style="text-align:left">The subscription got cancelled or disposed by the client.</td>
</tr>
<tr>
<td style="text-align:left"><code>SubscriberError</code></td>
<td style="text-align:left">An error occurred while handling an event in the subscription handler.</td>
</tr>
<tr>
<td style="text-align:left"><code>ServerError</code></td>
<td style="text-align:left">An error occurred on the server, and the server closed the subscription. Check the server logs for more information.</td>
</tr>
</tbody>
</table>
<p>Bear in mind that a subscription can also drop because it is slow. The server tried to push all the live events to the subscription when it is in the live processing mode. If the subscription gets the reading buffer overflow and won't be able to acknowledge the buffer, it will break.</p>
<h3 id="handling-subscription-drops" tabindex="-1"><a class="header-anchor" href="#handling-subscription-drops" aria-hidden="true">#</a> Handling subscription drops</h3>
<p>An application, which hosts the subscription, can go offline for a period of time for different reasons. It could be a crash, infrastructure failure, or a new version deployment. As you rarely would want to reprocess all the events again, you'd need to store the current position of the subscription somewhere, and then use it to restore the subscription from the point where it dropped off:</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-stream-subscription-dropped</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-stream-subscription-dropped</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-stream-subscription-dropped</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-stream-subscription-dropped</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-stream-subscription-dropped</p>
</xode-block>
</xode-group>
<p>When subscribed to <code>$all</code> you want to keep the position of the event in the <code>$all</code> stream. As mentioned previously, the <code>$all</code> stream position consists of two big integers (prepare and commit positions), not one:</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#subscribe-to-all-subscription-dropped</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#subscribe-to-all-subscription-dropped</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#subscribe-to-all-subscription-dropped</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#subscribe-to-all-subscription-dropped</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#subscribe-to-all-subscription-dropped</p>
</xode-block>
</xode-group>
<h2 id="filter-options" tabindex="-1"><a class="header-anchor" href="#filter-options" aria-hidden="true">#</a> Filter options</h2>
<p>Subscriptions to <code>$all</code> can include a filter option. A filtered subscription will only invoke the event handler if the event matches the provided filter.</p>
<p>A simple stream prefix filter looks like this:</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#stream-prefix-filtered-subscription</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#stream-prefix-filtered-subscription</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#stream-prefix-filtered-subscription</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#stream-prefix-filtered-subscription</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#stream-prefix-filtered-subscription</p>
</xode-block>
</xode-group>
<p>The filtering API is described more in-depth in the <RouterLink to="/clients/grpc/filtering.html">filtering section</RouterLink>.</p>
<h2 id="user-credentials" tabindex="-1"><a class="header-anchor" href="#user-credentials" aria-hidden="true">#</a> User credentials</h2>
<p>The user creating a subscription must have read access to the stream it's subscribing to, and only admin users may subscribe to <code>$all</code> or create filtered subscriptions.</p>
<p>The code below shows how you can provide user credentials for a subscription. When you specify subscription credentials explicitly, it will override the default credentials set for the client. If you don't specify any credentials, the client will use the credentials specified for the client, if you specified those.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/subscribing-to-streams/Program.cs#overriding-user-credentials</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/subscribing_to_stream/SubscribingToStream.java#overriding-user-credentials</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.js#overriding-user-credentials</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/subscribing_to_stream.rust#overriding-user-credentials</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/subscribing-to-streams.ts#overriding-user-credentials</p>
</xode-block>
</xode-group>
<h1 id="server-side-filtering" tabindex="-1"><a class="header-anchor" href="#server-side-filtering" aria-hidden="true">#</a> Server-side filtering</h1>
<p>EventStoreDB allows you to filter the events whilst you subscribe to the <code>$all</code> stream so that you only receive the events that you care about.</p>
<p>You can filter by event type or stream name using either a regular expression or a prefix. Server-side filtering is currently only available on the <code>$all</code> stream.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Server-side filtering introduced as a simpler alternative to projections. Before creating a projection to get the events you care about you should first consider filtering.</p>
</div>
<h2 id="filtering-out-system-events" tabindex="-1"><a class="header-anchor" href="#filtering-out-system-events" aria-hidden="true">#</a> Filtering out system events</h2>
<p>There are a number of events in EventStoreDB called system events. These are prefixed with a <code>$</code> and under most circumstances you won't care about these. They can be filtered out by passing in a <code>SubscriptionFilterOptions</code> when subscribing to the <code>$all</code> stream.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#exclude-system</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#exclude-system</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#exclude-system</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#exclude-system</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#exclude-system</p>
</xode-block>
</xode-group>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p><code>$stats</code> events are no longer stored in EventStoreDB by default so there won't be as many <code>$</code> events as before.</p>
</div>
<h2 id="filtering-by-event-type" tabindex="-1"><a class="header-anchor" href="#filtering-by-event-type" aria-hidden="true">#</a> Filtering by event type</h2>
<p>If you only want to subscribe to events of a given type there are two options. You can either use a regular expression or a prefix.</p>
<h3 id="filtering-by-prefix" tabindex="-1"><a class="header-anchor" href="#filtering-by-prefix" aria-hidden="true">#</a> Filtering by prefix</h3>
<p>If you want to filter by prefix pass in a <code>SubscriptionFilterOptions</code> to the subscription with an <code>EventTypeFilter.Prefix</code>.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#event-type-prefix</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#event-type-prefix</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#event-type-prefix</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#event-type-prefix</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#event-type-prefix</p>
</xode-block>
</xode-group>
<p>This will only subscribe to events with a type that begin with <code>customer-</code>.</p>
<h3 id="filtering-by-regular-expression" tabindex="-1"><a class="header-anchor" href="#filtering-by-regular-expression" aria-hidden="true">#</a> Filtering by regular expression</h3>
<p>If you want to subscribe to multiple event types then it might be better to provide a regular expression.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#event-type-regex</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#event-type-regex</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#event-type-regex</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#event-type-regex</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#event-type-regex</p>
</xode-block>
</xode-group>
<p>This will subscribe to any event that begins with <code>user</code> or <code>company</code>.</p>
<h2 id="filtering-by-stream-name" tabindex="-1"><a class="header-anchor" href="#filtering-by-stream-name" aria-hidden="true">#</a> Filtering by stream name</h2>
<p>If you only want to subscribe to streams with a given name there are two options. You can either use a regular expression or a prefix.</p>
<h3 id="filtering-by-prefix-1" tabindex="-1"><a class="header-anchor" href="#filtering-by-prefix-1" aria-hidden="true">#</a> Filtering by prefix</h3>
<p>If you want to filter by prefix pass in a <code>SubscriptionFilterOptions</code> to the subscription with an <code>StreamFilter.Prefix</code>.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#stream-prefix</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#stream-prefix</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#stream-prefix</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#stream-prefix</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#stream-prefix</p>
</xode-block>
</xode-group>
<p>This will only subscribe to streams with a name that begin with <code>user-</code>.</p>
<h3 id="filtering-by-regular-expression-1" tabindex="-1"><a class="header-anchor" href="#filtering-by-regular-expression-1" aria-hidden="true">#</a> Filtering by regular expression</h3>
<p>If you want to subscribe to multiple streams then it might be better to provide a regular expression.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#stream-regex</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#stream-regex</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#stream-regex</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#stream-regex</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#stream-regex</p>
</xode-block>
</xode-group>
<p>This will subscribe to any stream with a name that begins with <code>account</code> or <code>savings</code>.</p>
<h2 id="checkpointing" tabindex="-1"><a class="header-anchor" href="#checkpointing" aria-hidden="true">#</a> Checkpointing</h2>
<p>There is one thing to consider with server-side filtering, and that is when events that match your filter are few and far between. In this scenario, you might find yourself in the situation where EventStoreDB has searched through 1 million events, and the last thing you want to happen is for the server to get to event 900k and then have your client crash. It won't have been able to take a checkpoint and upon a restart, you'd have to go back to the beginning and start again.</p>
<p>In this case you can make use of an additional delegate that will be triggered every n number of events (32 by default).</p>
<p>To make use of it set up <code>checkpointReached</code> on the <code>SubscriptionFilterOptions</code> class.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#checkpoint</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#checkpoint</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#checkpoint</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#checkpoint</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#checkpoint</p>
</xode-block>
</xode-group>
<p>This will be called every <code>n</code> number of events. If you want to be specific about the number of events threshold you can also pass that as a parameter.</p>
<xode-group>
<xode-block title="C#">
<p>@[code](clients/dotnet/generated/21.2.0/samples/server-side-filtering/Program.cs#checkpoint-with-interval</p>
</xode-block>
<xode-block title="Java">
<p>@[code](clients/java/generated/1.0.0/samples/server_side_filtering/ServerSideFiltering.java#checkpoint-with-interval</p>
</xode-block>
<xode-block title="JavaScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.js#checkpoint-with-interval</p>
</xode-block>
<xode-block title="Rust">
<p>@[code](clients/rust/generated/1.0.0/samples/server_side_filtering.rust#checkpoint-with-interval</p>
</xode-block>
<xode-block title="TypeScript">
<p>@[code](clients/node/generated/2.0.0/samples/server-side-filtering.ts#checkpoint-with-interval</p>
</xode-block>
</xode-group>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>This number will be called every <code>n * 32</code> events.</p>
</div>
</template>
