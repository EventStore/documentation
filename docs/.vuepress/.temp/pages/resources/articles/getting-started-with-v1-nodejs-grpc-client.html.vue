<template><p><img src="@source/resources/articles/images/getting-started-with-v1-nodejs-grpc-client/getting-started-with-v1-nodejs-grpc-client-1.svg" alt="cover"></p>
<p>Back in version 20.6 of EventStoreDB, we added support for connecting to the database via gRPC. This widely adopted standard allows us to provide a unified dev experience across many platforms and environments, enabling first class support for Event Sourcing and Event-Driven Architecture with EventStoreDB. Since then, we've been working hard on writing first party clients for multiple languages and runtimes.</p>
<p>Today we are proud to announce the release of v1.0.0 of our NodeJS client.</p>
<p>If you've been following along with the preview version of the client, you'll have seen that over the last few months, we've put a lot of effort into ensuring consistency between gRPC clients. Our goal is to have a consistent naming and feature set across all clients while following the conventions of each environment.</p>
<p>We wrote the NodeJS client in TypeScript. Thanks to that, you can use it both in the JavaScript project and have proper typing for TypeScript.</p>
<h3 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h3>
<p>To use the gRPC client package, you need to install it either with NPM</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> --save @eventstore/db-client
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>or Yarn</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> @eventstore/db-client
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="connecting-to-the-db-server" tabindex="-1"><a class="header-anchor" href="#connecting-to-the-db-server" aria-hidden="true">#</a> Connecting to the DB server</h3>
<p>You also need to have the EventStoreDB running. The easiest way is to run it via docker:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker run --name esdb-node -it -p <span class="token number">2113</span>:2113 -p <span class="token number">1113</span>:1113 <span class="token punctuation">\</span>
  eventstore/eventstore:latest --insecure --run-projections<span class="token operator">=</span>All
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Note that we're using insecure mode here to speed up the setup. EventStoreDB is secure-by-default. For detailed instructions check the <a href="https://developers.eventstore.com/server/v20/server/installation/" target="_blank" rel="noopener noreferrer">installation guide<OutboundLink/></a> and <a href="https://developers.eventstore.com/server/v20/server/security/#protocol-security" target="_blank" rel="noopener noreferrer">security recommendations<OutboundLink/></a>.</p>
<p>Having the EventStoreDB running, you can connect:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> EventStoreDBClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@eventstore/db-client"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> client <span class="token operator">=</span> EventStoreDBClient<span class="token punctuation">.</span><span class="token function">connectionString</span><span class="token punctuation">(</span><span class="token string">"esdb://localhost:2113?tls=false"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="working-with-events" tabindex="-1"><a class="header-anchor" href="#working-with-events" aria-hidden="true">#</a> Working with Events</h3>
<p>EventStoreDB is a database designed for <a href="https://eventstore.com/blog/what-is-event-sourcing/" target="_blank" rel="noopener noreferrer">Event Sourcing<OutboundLink/></a>. Event Sourcing is an alternative way to persist data. In contrast with state-oriented persistence that only keeps the latest version of the entity state, Event Sourcing stores each state change as a separate event.</p>
<p>Events are logically grouped into streams. In Event Sourcing, streams are the representation of the entities. All the entity state mutation ends up as the persisted event. Entity state is retrieved by reading all the events and applying them one by one in the order of appearance.</p>
<p>Let's append some events! We'll use the cinema ticket reservation as an example.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> userId <span class="token operator">=</span> <span class="token string">"ms_smith"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> movieId <span class="token operator">=</span> <span class="token string">"homealone"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> seatId <span class="token operator">=</span> <span class="token string">"seat1"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> reservationId <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">res_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>movieId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>seatId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">"SeatReserved"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    reservationId<span class="token punctuation">,</span>
    movieId<span class="token punctuation">,</span>
    seatId<span class="token punctuation">,</span>
    userId 
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span>reservationId<span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>EventStoreDB supports both JSON and binary format.</p>
<p>To read stream events, use:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span>reservationId<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>The centrepiece of EventStoreDB is the append-only log (read more in the <a href="https://www.eventstore.com/blog/turning-the-database-inside-out" target="_blank" rel="noopener noreferrer">Turning the database inside out with Event Store<OutboundLink/></a>. That allows maintaining global events ordering and performance improvements.</p>
<p>You can also read events across the streams from the <code>$all</code> log. Reading happens in the global order of appearance.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">readAll</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  direction<span class="token operator">:</span> <span class="token constant">FORWARDS</span><span class="token punctuation">,</span>
  fromPosition<span class="token operator">:</span> <span class="token constant">START</span><span class="token punctuation">,</span>
  maxCount<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="subscribing-to-the-streams" tabindex="-1"><a class="header-anchor" href="#subscribing-to-the-streams" aria-hidden="true">#</a> Subscribing to the streams</h3>
<p>One of the most significant advantages of Event-Driven Architecture is the inversion of services' responsibility. The services are decoupled from each other, thanks to the publish/subscribe approach. E.g. reservation service doesn't have to call the invoice service directly. It publishes an event about reservation confirmation. The invoice service subscribes to the reservation event stream and can issue an invoice right after the notification.</p>
<p>You can subscribe to the specific stream:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>client
  <span class="token punctuation">.</span><span class="token function">subscribeToStream</span><span class="token punctuation">(</span>reservationId<span class="token punctuation">,</span> <span class="token punctuation">{</span> fromRevision<span class="token operator">:</span> <span class="token constant">START</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"data"</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>resolvedEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">handleEvent</span><span class="token punctuation">(</span>resolvedEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Or to all events, e.g. filtering all reservations events (by the stream type prefix):</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> reservationStreamPrefix <span class="token operator">=</span> <span class="token string">"res"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> filter <span class="token operator">=</span> <span class="token function">streamNameFilter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> prefixes<span class="token operator">:</span> <span class="token punctuation">[</span>reservationStreamPrefix <span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> subscription <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">subscribeToAll</span><span class="token punctuation">(</span><span class="token punctuation">{</span> filter <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Subscriptions are readable streams, allowing you to listen to emitted events:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>subscription<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">"data"</span><span class="token punctuation">,</span> handleEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Pipe to a writable or transform stream:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code>subscription<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>yourWritableStream<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>or iterate over events asynchronously:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">for</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">const</span> event <span class="token keyword">of</span> subscription<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">handle</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript" aria-hidden="true">#</a> TypeScript</h3>
<p>Being written in Typescript, the client provides improved IntelliSense for javascript users, but If you're using TypeScript in your project, you can take advantage of the baked in typing, as well as the provided utility types to allow you to strongly type your events.</p>
<p>You can benefit from that with easier event types management. e.g.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">SeatReserved</span><span class="token operator">=</span> JSONEventType<span class="token operator">&lt;</span> 
  <span class="token string">"SeatReserved"</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>  
    reservationId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    movieId<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span>
    seatId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    userId <span class="token operator">:</span> <span class="token builtin">string</span> 
  <span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">;</span> 	 

<span class="token keyword">type</span> <span class="token class-name">SeatChanged</span><span class="token operator">=</span> JSONEventType<span class="token operator">&lt;</span> 
  <span class="token string">"SeatChanged"</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>  
    reservationId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    newSeatId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">;</span> 	 

<span class="token keyword">type</span> <span class="token class-name">ReservationEvents</span> <span class="token operator">=</span> SeatReserved <span class="token operator">|</span> SeatChanged<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>You can use such defined types in the EventStoreDB methods:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> seatReserved <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">"SeatReserved"</span><span class="token punctuation">,</span> 
  data<span class="token operator">:</span> <span class="token punctuation">{</span> 
    reservationId<span class="token punctuation">,</span>
    movieId<span class="token punctuation">,</span>
    seatId<span class="token punctuation">,</span>
    userId
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 	 

<span class="token keyword">const</span> seatChanged <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">"SeatChanged"</span><span class="token punctuation">,</span> 
  data<span class="token operator">:</span> <span class="token punctuation">{</span> 
    reservationId<span class="token punctuation">,</span>
    newSeatId<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span>reservationId<span class="token punctuation">,</span> <span class="token punctuation">[</span>seatReserved<span class="token punctuation">,</span> seatChanged<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 	 

<span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span>reservationId<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">{</span> event <span class="token punctuation">}</span> <span class="token keyword">of</span> events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Events types can be narrowed on type, </span>
  <span class="token comment">// so we can type check on the contained data.</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token operator">?.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">"SeatReserved"</span><span class="token operator">:</span>
      <span class="token function">reserveSeat</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">"SeatChanged"</span><span class="token operator">:</span>
      <span class="token function">updateSeatForReservation</span><span class="token punctuation">(</span>
        event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>reservationId<span class="token punctuation">,</span>
        event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>newSeatId
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">break</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><h3 id="nodejs-version-support" tabindex="-1"><a class="header-anchor" href="#nodejs-version-support" aria-hidden="true">#</a> NodeJS Version support</h3>
<p>We are officially supporting the Active LTS version. At the moment I write this post, it's v14. It should also work at least with v12, but we recommend that you always use the Active LTS.</p>
<h3 id="source-code-and-documentation" tabindex="-1"><a class="header-anchor" href="#source-code-and-documentation" aria-hidden="true">#</a> Source code and documentation</h3>
<p>NodeJS gRPC client is Open Sourced and available under Apache 2.0 License in the <a href="https://github.com/EventStore/EventStore-Client-NodeJS" target="_blank" rel="noopener noreferrer">GitHub Repository<OutboundLink/></a>. You can find <a href="https://developers.eventstore.com/clients/grpc/getting-started?codeLanguage=NodeJS" target="_blank" rel="noopener noreferrer">detailed documentation and samples at here.<OutboundLink/></a> We value the Open Source community. Feel free to send us Pull Requests, Issues or other forms of contribution.</p>
<p>If you have more questions, <a href="https://discuss.eventstore.com" target="_blank" rel="noopener noreferrer">we're available and happy to help on our Discuss forum<OutboundLink/></a>.</p>
</template>
