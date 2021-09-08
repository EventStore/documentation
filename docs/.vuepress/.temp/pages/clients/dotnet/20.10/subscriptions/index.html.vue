<template><h1 id="subscribe-to-changes" tabindex="-1"><a class="header-anchor" href="#subscribe-to-changes" aria-hidden="true">#</a> Subscribe to changes</h1>
<p>A common operation is to subscribe to a stream and receive notifications for changes. As new events arrive, you continue following them.</p>
<p>You can only subscribe to one stream. You can use server-side projections for linking events to new aggregated streams. System projections create pre-defined streams that aggregate events by type or by category and are available out-of-the box. Check the server documentation to learn more about system and user-defined projections.</p>
<p>There are three types of subscription patterns, useful in different situations.</p>
<h2 id="volatile-subscriptions" tabindex="-1"><a class="header-anchor" href="#volatile-subscriptions" aria-hidden="true">#</a> Volatile subscriptions</h2>
<p>This subscription calls a given function for events appended after establishing the subscription. They are useful when you need notification of new events with minimal latency, but where it's not necessary to process every event.</p>
<p>For example, if a stream has 100 events in it when a subscriber connects, the subscriber can expect to see event number 101 onwards until the time the subscription is closed or dropped.</p>
<h2 id="catch-up-subscriptions" tabindex="-1"><a class="header-anchor" href="#catch-up-subscriptions" aria-hidden="true">#</a> Catch-up subscriptions</h2>
<p>This subscription specifies a starting point, in the form of an event number or transaction file position. You call the function for events from the starting point until the end of the stream, and then for subsequently appended events.</p>
<p>For example, if you specify a starting point of 50 when a stream has 100 events, the subscriber can expect to see events 51 through 100, and then any events are subsequently appended until you drop or close the subscription.</p>
<h2 id="persistent-subscriptions" tabindex="-1"><a class="header-anchor" href="#persistent-subscriptions" aria-hidden="true">#</a> Persistent subscriptions</h2>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Persistent subscriptions exist in version 3.2.0 and above of EventStoreDB.</p>
</div>
<p>In contrast to volatile and Catch-up types persistent subscriptions are not dropped when connection is closed. Moreover, this subscription type supports the &quot;<a href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/CompetingConsumers.html" target="_blank" rel="noopener noreferrer">competing consumers<OutboundLink/></a>&quot; messaging pattern and are useful when you need to distribute messages to many workers. EventStoreDB saves the subscription state server-side and allows for at-least-once delivery guarantees across multiple consumers on the same stream. It is possible to have many groups of consumers compete on the same stream, with each group getting an at-least-once guarantee.</p>
</template>
