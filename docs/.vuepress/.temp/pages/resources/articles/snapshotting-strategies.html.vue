<template><p><img src="@source/resources/articles/images/snapshots/snapshots-1.svg" alt="cover"></p>
<h1 id="snapshotting-strategies" tabindex="-1"><a class="header-anchor" href="#snapshotting-strategies" aria-hidden="true">#</a> Snapshotting Strategies</h1>
<p>Looking at resources from the Internet, you may conclude that snapshots are an essential part of the Event Sourcing system. It may be tempting to read the current state from a single record instead of multiple events. We could store it separate database in parallel to appending a business event. You cannot deny that reading a single entry is faster than reading more of them, right?</p>
<p>In the <a href="https://www.eventstore.com/blog/snapshots-in-event-sourcing" target="_blank" rel="noopener noreferrer">previous article<OutboundLink/></a>, I explained that as inviting as it is, we should treat snapshots as a technical optimisation. As with all optimisations, if they're premature they may create more issues than they solve.</p>
<p>Event Sourcing brings a temporal aspect to the modelling. The size of data grows with each event. Still, that doesn't have to lead to performance issues. Event Stores can handle a vast number of streams. The most important is to keep them short-lived. You can achieve that by using the patterns like <em>&quot;Complete the Books&quot;</em>. For example, instead of keeping the whole history of transactions in a single stream, you can keep them in streams partitioned by month or by day. Hence, snapshots can be not needed as performance may be good enough. Before applying an optimisation, we should always gather the expected metrics and make the benchmarks. Then we can decide if we need to optimise.</p>
<p>Yet, for the performance-critical parts of our application, we may need to tune our solution. Quite often, we realise too late that we didn't do the best job on stream modelling. For such cases, snapshots can be an accurate tactical decision. Thus, this article. It would be best if you did not treat it as an invitation to use snapshots. My aim is to explain how to do it when you really have to.</p>
<p>I'll use <a href="https://developers.eventstore.com/clients/grpc/getting-started?codeLanguage=NodeJS" target="_blank" rel="noopener noreferrer">EventStoreDB gRPC client<OutboundLink/></a>, <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript<OutboundLink/></a> and <a href="https://nodejs.org/en/" target="_blank" rel="noopener noreferrer">NodeJS<OutboundLink/></a>, but I think that it should be easy to translate to other dev environments.</p>
<h2 id="storage" tabindex="-1"><a class="header-anchor" href="#storage" aria-hidden="true">#</a> Storage</h2>
<p><img src="@source/resources/articles/images/snapshots/snapshots-2.svg" alt="02"></p>
<p>Snapshots are the representation of the current state at a certain <em>&quot;point in time&quot;</em>. I'm using quotes as it doesn't have to be a precise time. Technically, &quot;point in time&quot; represents the stream revision, so the last event position when the snapshot was made. The time can be correlated using event (meta)data.</p>
<p>We can store snapshots in any storage. It can be:</p>
<ul>
<li>a record in durable storage (e.g. relational or document database, key-value store, etc.),</li>
<li>in-memory cache entry,</li>
<li>distributed cache entry (e.g. in Redis),</li>
<li>event in the event store.</li>
</ul>
<p>All of them have pros and cons, for example:</p>
<ul>
<li>using additional durable storage introduces more moving pieces, increasing the complexity of the system.</li>
<li>by using a cache, we're risking that cache will be invalidated. We need to define a fallback scenario and prepare for the peaks when we need to rebuild snapshots. When not appropriately tuned, the in-memory cache can eat your service resources and negatively impact the solution performance. Plus, if you're trying to fix an issue with a cache, you usually end with two problems.</li>
</ul>
<p>You should choose your strategy wisely based on your use case.</p>
<h2 id="reading" tabindex="-1"><a class="header-anchor" href="#reading" aria-hidden="true">#</a> Reading</h2>
<p>The premise of making snapshots is to speed up reading. In Event Sourcing, we retrieve the state by reading all stream events and applying them one by one on the state object. For instance, having events <em>BankAcocountCreated</em>, <em>DepositRecorded</em>, <em>CashWithdrawn</em>, we can add the amount from the deposit (100$) and subtract with amount from withdrawal (e.g. 80$). By applying events in such a way, we can calculate the current account balance (e.g. 20$).</p>
<p>If we created a snapshot, then in theory, we could use it as the current state. Why &quot;in theory&quot;? A snapshot is a representation of the state at a certain point in time. It may happen that, between creation and the next read, new events occurred. It's a common scenario. Plus, as I'll describe in the next paragraph, snapshots might not be stored after each change.</p>
<p>Not having the latest state doesn't have to be an issue. Depending on our scenario, we can live with that. Though, typically we want to make the business decisions using the latest state, not to make choices on obsolete information. Therefore, we usually load the snapshot and events that happened after the snapshot was created. What's more, if we represent the snapshot as an event, we can also use it in the regular state aggregation process.</p>
<p>If we define the event type as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">Event<span class="token operator">&lt;</span>
  EventType <span class="token keyword">extends</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  EventData <span class="token keyword">extends</span> object <span class="token operator">=</span> object<span class="token punctuation">,</span>
  EventMetadata <span class="token keyword">extends</span> object <span class="token operator">=</span> object
<span class="token operator">></span></span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  type<span class="token operator">:</span> EventType<span class="token punctuation">;</span>
  data<span class="token operator">:</span> EventData<span class="token punctuation">;</span>
  metadata<span class="token operator">?</span><span class="token operator">:</span> EventMetadata<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Having that, we can derive the snapshot event type:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">SnapshotMetadata</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  snapshottedStreamRevision<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">SnapshotEvent<span class="token operator">&lt;</span>
  EventType <span class="token keyword">extends</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  EventData <span class="token keyword">extends</span> object <span class="token operator">=</span> object<span class="token punctuation">,</span>
  EventMetadata <span class="token keyword">extends</span> SnapshotMetadata <span class="token operator">=</span> SnapshotMetadata
<span class="token operator">></span></span> <span class="token operator">=</span> Event<span class="token operator">&lt;</span>EventType<span class="token punctuation">,</span> EventData<span class="token punctuation">,</span> EventMetadata<span class="token operator">></span> <span class="token operator">&amp;</span> <span class="token punctuation">{</span>
  metadata<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>EventMetadata<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>To retrieve the snapshot follow-up events, we need to get the stream revision on which the snapshot was made. The most convenient is to store it in the metadata.</p>
<hr>
<p>If this syntax looks weird and you are not familiar with TypeScript quirks, don't worry, I will explain it to you. TypeScript allows specifying the restrictions for the generic type parameters. <code>EventType extends string</code> means that type provided has to be <code>string</code>. TypeScript allows <a href="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases" target="_blank" rel="noopener noreferrer">types aliases<OutboundLink/></a> even for the primitive types. This syntax allows us to restrict the generic type param to be <code>string</code> or string type alias.</p>
<p>We can also assign the default type by <code>EventType extends string = string</code>. This is useful to simplify the usage and generic logic.</p>
<p>The above event type definition written in the C# could look like:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Event</span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token return-type class-name"><span class="token keyword">string</span></span> Type <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> Data <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span>  <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">object</span></span> Metadata <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token keyword">set</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Event<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Event</span></span>
    <span class="token keyword">where</span> <span class="token class-name">EventData</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">class</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">new</span> <span class="token return-type class-name">EventData</span> Data
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Data <span class="token keyword">as</span> <span class="token class-name">EventData</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Data <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Event<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">,</span> EventMetadata<span class="token punctuation">></span></span><span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">Event<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span></span>
    <span class="token keyword">where</span> <span class="token class-name">EventData</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">class</span></span>
    <span class="token keyword">where</span> <span class="token class-name">EventMetadata</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token keyword">class</span></span>
<span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">new</span> <span class="token return-type class-name">EventMetadata</span> Metadata
    <span class="token punctuation">{</span>
        <span class="token keyword">get</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Metadata <span class="token keyword">as</span> <span class="token class-name">EventMetadata</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
        <span class="token keyword">set</span> <span class="token punctuation">{</span> <span class="token keyword">base</span><span class="token punctuation">.</span>Metadata <span class="token operator">=</span> <span class="token keyword">value</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>We could make also the event type fully immutable by using <a href="https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype" target="_blank" rel="noopener noreferrer">Readonly<OutboundLink/></a> and defining it as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">type</span> <span class="token class-name">Event<span class="token operator">&lt;</span>
  EventType <span class="token keyword">extends</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  EventData <span class="token keyword">extends</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span><span class="token punctuation">,</span>
  EventMetadata <span class="token keyword">extends</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span> <span class="token operator">=</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span>
<span class="token operator">></span></span> <span class="token operator">=</span> Readonly<span class="token operator">&lt;</span><span class="token punctuation">{</span>
  type<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>EventType<span class="token operator">></span><span class="token punctuation">;</span>
  data<span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>EventData<span class="token operator">></span><span class="token punctuation">;</span>
  metadata<span class="token operator">?</span><span class="token operator">:</span> Readonly<span class="token operator">&lt;</span>EventMetadata<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>However, let's leave it for now and ignore read-only syntax for brevity. I don't want to focus on the TypeScript syntax but on the Snapshotting techniques.</p>
<hr>
<p>Let's take this from the <a href="https://www.eventstore.com/blog/snapshots-in-event-sourcing" target="_blank" rel="noopener noreferrer">previous article<OutboundLink/></a>: a cash register domain. We modelled our stream as all the events (e.g. transactions) registered for the cash register since it was placed at the workstation. We'll use snapshots to tactically resolve performance issues related to loading streams with thousands of events.</p>
<p>With that, we can define the Cash Register entity and its snapshot event type (<code>CashRegisterSnapshoted</code>) as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">CashRegister</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  float<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
  workstation<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  currentCashierId<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">CashRegisterSnapshoted</span> <span class="token operator">=</span> SnapshotEvent<span class="token operator">&lt;</span>
  <span class="token string">'cash-register-snapshoted'</span><span class="token punctuation">,</span>
  CashRegister
<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">type</span> <span class="token class-name">CashRegisterEvent</span> <span class="token operator">=</span>
  <span class="token operator">|</span> PlacedAtWorkStation
  <span class="token operator">|</span> ShiftStarted
  <span class="token operator">|</span> TransactionRegistered
  <span class="token operator">|</span> ShiftFinished
  <span class="token operator">|</span> CashRegisterSnapshoted<span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>We also defined the union type containing all the cash register events. We can use it to define our state application logic (read more details about this process in <a href="https://www.eventstore.com/blog/how-to-get-the-current-entity-state-from-events" target="_blank" rel="noopener noreferrer">my other article<OutboundLink/></a>):</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">when</span><span class="token punctuation">(</span>
  currentState<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>CashRegister<span class="token operator">></span><span class="token punctuation">,</span>
  event<span class="token operator">:</span> CashRegisterEvent
<span class="token punctuation">)</span><span class="token operator">:</span> Partial<span class="token operator">&lt;</span>CashRegister<span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">'placed-at-workstation'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        id<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>cashRegisterId<span class="token punctuation">,</span>
        workstation<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>workstation<span class="token punctuation">,</span>
        float<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">'shift-started'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>currentState<span class="token punctuation">,</span>
        currentCashierId<span class="token operator">:</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>cashierId<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">'transaction-registered'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>currentState<span class="token punctuation">,</span>
        float<span class="token operator">:</span> <span class="token punctuation">(</span>currentState<span class="token punctuation">.</span>float <span class="token operator">??</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">+</span> event<span class="token punctuation">.</span>data<span class="token punctuation">.</span>amount<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">'shift-ended'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>currentState<span class="token punctuation">,</span>
        currentCashierId<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> <span class="token string">'cash-register-snapshoted'</span><span class="token operator">:</span>
      <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>event<span class="token punctuation">.</span>data<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token comment">// Unexpected event type</span>
      <span class="token class-name"><span class="token keyword">return</span></span> <span class="token punctuation">{</span>
        <span class="token operator">...</span>currentState<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p>Even if we don't store the snapshot as the event but into a separate database or cache, we can map it to this structure while reading. Thanks to that, our state aggregation logic will be exactly the same as we don't use snapshots.</p>
<h2 id="reading-snapshot-from-the-separate-stream" tabindex="-1"><a class="header-anchor" href="#reading-snapshot-from-the-separate-stream" aria-hidden="true">#</a> Reading snapshot from the separate stream</h2>
<p><img src="@source/resources/articles/images/snapshots/snapshots-3.svg" alt="03"></p>
<p>Let's define the simple read events wrapper to map the results and return an error instead of throwing an exception. We'll need that later.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name"><span class="token constant">STREAM_NOT_FOUND</span></span> <span class="token operator">=</span>  <span class="token string">'STREAM_NOT_FOUND'</span><span class="token punctuation">;</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">readFromStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>StreamEvent <span class="token keyword">extends</span> Event<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> ReadStreamOptions
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>StreamEvent<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token constant">STREAM_NOT_FOUND</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token keyword">await</span> eventStore<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span>streamName<span class="token punctuation">,</span> options<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> events
      <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolvedEvent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token operator">!</span><span class="token operator">!</span>resolvedEvent<span class="token punctuation">.</span>event<span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span>resolvedEvent<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">&lt;</span>StreamEvent<span class="token operator">></span><span class="token punctuation">{</span>
          type<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>type<span class="token punctuation">,</span>
          data<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>data<span class="token punctuation">,</span>
          metadata<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>metadata<span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">.</span>type <span class="token operator">==</span> ErrorType<span class="token punctuation">.</span><span class="token constant">STREAM_NOT_FOUND</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">'STREAM_NOT_FOUND'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">throw</span> error<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">readLastEventFromStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>StreamEvent <span class="token keyword">extends</span> Event<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>StreamEvent <span class="token operator">|</span> <span class="token constant">STREAM_NOT_FOUND</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">readFromStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>StreamEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span>eventStore<span class="token punctuation">,</span> streamName<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    maxCount<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    fromRevision<span class="token operator">:</span> <span class="token constant">END</span><span class="token punctuation">,</span>
    direction<span class="token operator">:</span> <span class="token string">'backwards'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">===</span> <span class="token string">'STREAM_NOT_FOUND'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>  <span class="token string">'STREAM_NOT_FOUND'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>The general logic to read the last snapshot and follow-up events can be defined as:</p>
<ol>
<li>Read the last snapshot (if it exists).</li>
<li>Read events from the EventStoreDB.</li>
</ol>
<ul>
<li>If a snapshot exists, read events since the last stream revision of which snapshot was created.</li>
<li>Otherwise, read all events.</li>
</ul>
<ol start="3">
<li>Return stream events preceded by the snapshot.</li>
</ol>
<p>Code for that can look like:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">readEventsFromExternalSnapshot</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  StreamEvent <span class="token keyword">extends</span> Event<span class="token punctuation">,</span>
  SnapshotStreamEvent <span class="token keyword">extends</span> SnapshotEvent <span class="token operator">=</span> StreamEvent <span class="token operator">&amp;</span> SnapshotEvent
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  <span class="token function-variable function">getLastSnapshot</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    streamName<span class="token operator">:</span> <span class="token builtin">string</span>
  <span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>SnapshotStreamEvent <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">></span><span class="token punctuation">,</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token punctuation">{</span>
  events<span class="token operator">:</span> <span class="token punctuation">(</span>StreamEvent <span class="token operator">|</span> SnapshotStreamEvent<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  lastSnapshotRevision<span class="token operator">?</span><span class="token operator">:</span> bigint<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> snapshot <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getLastSnapshot</span><span class="token punctuation">(</span>streamName<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> lastSnapshotRevision <span class="token operator">=</span> snapshot
    <span class="token operator">?</span> <span class="token function">BigInt</span><span class="token punctuation">(</span>snapshot<span class="token punctuation">.</span>metadata<span class="token punctuation">.</span>snapshottedStreamRevision<span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> streamEvents <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">readFromStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>StreamEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    streamName<span class="token punctuation">,</span>
    <span class="token punctuation">{</span>
      fromRevision<span class="token operator">:</span> lastSnapshotRevision<span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>streamEvents <span class="token operator">===</span> <span class="token string">'STREAM_NOT_FOUND'</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token string">'STREAM_NOT_FOUND'</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> events <span class="token operator">=</span> snapshot <span class="token operator">?</span> <span class="token punctuation">[</span>snapshot<span class="token punctuation">,</span> <span class="token operator">...</span>streamEvents<span class="token punctuation">]</span> <span class="token operator">:</span> streamEvents<span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    events<span class="token punctuation">,</span>
    lastSnapshotRevision<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>We can inject the <code>getLastSnapshot</code> function with any logic of how to get the last snapshot. We can load it from the cache, other database or the other stream.</p>
<p>If we want to read it from a separate stream, then the code can look like:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">addSnapshotPrefix</span><span class="token punctuation">(</span>streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">snapshot-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>streamName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">readSnapshotFromSeparateStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  SnapshotStreamEvent <span class="token keyword">extends</span> SnapshotEvent
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>SnapshotStreamEvent <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> snapshotStreamName <span class="token operator">=</span> <span class="token function">addSnapshotPrefix</span><span class="token punctuation">(</span>streamName<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> snapshot <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">readLastEventFromStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>SnapshotStreamEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    snapshotStreamName
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> snapshot <span class="token operator">!==</span> <span class="token string">'STREAM_NOT_FOUND'</span> <span class="token operator">?</span> snapshot <span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>We're reading only the last event from the stream, as we're interested in the latest snapshot. If the stream does not exist, we return an empty value instead of throwing an exception. It's a valid case that means that no snapshot was stored yet.</p>
<h2 id="reading-snapshot-from-the-same-stream" tabindex="-1"><a class="header-anchor" href="#reading-snapshot-from-the-same-stream" aria-hidden="true">#</a> Reading snapshot from the same stream</h2>
<p><img src="@source/resources/articles/images/snapshots/snapshots-4.svg" alt="04"></p>
<p>We could also store and read a snapshot in the same stream as regular events. Having that, we won't be reading all stream events but only snapshot and further. To do that, we need to keep the snapshotted revision somewhere. The most convenient way is to put it at the stream level: in the stream metadata. Having that, we can read the last snapshot event position and read events from there.</p>
<p>To read the last snapshot revision code will look like that:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">readStreamMetadata</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  StreamMetadata <span class="token keyword">extends</span> Record<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">unknown</span><span class="token operator">></span>
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> GetStreamMetadataOptions
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>StreamMetadata <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token keyword">await</span> eventStore<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">getStreamMetadata</span><span class="token generic class-name"><span class="token operator">&lt;</span>StreamMetadata<span class="token operator">></span></span></span><span class="token punctuation">(</span>
    streamName<span class="token punctuation">,</span>
    options
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> result<span class="token punctuation">.</span>metadata<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">getLastSnapshotRevisionFromStreamMetadata</span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>bigint <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> streamMetadata <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">readStreamMetadata</span><span class="token generic class-name"><span class="token operator">&lt;</span>SnapshotMetadata<span class="token operator">></span></span></span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    streamName
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> streamMetadata
    <span class="token operator">?</span> <span class="token function">BigInt</span><span class="token punctuation">(</span>streamMetadata<span class="token punctuation">.</span>snapshottedStreamRevision<span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p>Based on that, we can build the main read logic:</p>
<ol>
<li>Read the snapshot event position from the stream metadata.</li>
<li>Return events from the last snapshot position or all if there was no snapshot made.</li>
</ol>
<p>Code for such logic:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">readEventsFromSnapshotInTheSameStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  StreamEvent <span class="token keyword">extends</span> Event<span class="token punctuation">,</span>
  SnapshotStreamEvent <span class="token keyword">extends</span> SnapshotEvent <span class="token operator">=</span> SnapshotEvent <span class="token operator">&amp;</span> StreamEvent
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token punctuation">(</span>StreamEvent <span class="token operator">|</span> SnapshotStreamEvent<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> lastSnapshotRevision <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">getLastSnapshotRevisionFromStreamMetadata</span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    streamName
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token generic-function"><span class="token function">readFromStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>StreamEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span>eventStore<span class="token punctuation">,</span> streamName<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    fromRevision<span class="token operator">:</span> lastSnapshotRevision<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">===</span> <span class="token string">'STREAM_NOT_FOUND'</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token string">'STREAM_NOT_FOUND'</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> events<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="storing-snapshots-to-the-separate-stream" tabindex="-1"><a class="header-anchor" href="#storing-snapshots-to-the-separate-stream" aria-hidden="true">#</a> Storing snapshots to the separate stream</h2>
<p>We already know how to read events using two methods: external storage and the same stream. Now let's discuss how to store them.</p>
<p>In Event Sourcing, events are logically grouped into streams that are entities' representation. All the state mutations end up persisted as events.</p>
<p>A snapshot should be created after the event is appended. For the external storage, it will mean making an additional call. EventStoreDB operations are atomic on the stream level, so storing a snapshot to a different stream will require a separate call.</p>
<p>Let's define then the simple code for storing the snapshot:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">appendEventAndExternalSnapshot</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  State <span class="token keyword">extends</span> object <span class="token operator">=</span> object<span class="token punctuation">,</span>
  StreamEvent <span class="token keyword">extends</span> Event <span class="token operator">=</span> Event<span class="token punctuation">,</span>
  SnapshotStreamEvent <span class="token keyword">extends</span> SnapshotEvent <span class="token operator">=</span> StreamEvent <span class="token operator">&amp;</span> SnapshotEvent
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  <span class="token function-variable function">tryBuildSnapshot</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    newEvent<span class="token operator">:</span> StreamEvent<span class="token punctuation">,</span>
    currentState<span class="token operator">:</span> State<span class="token punctuation">,</span>
    newStreamRevision<span class="token operator">:</span> bigint
  <span class="token punctuation">)</span> <span class="token operator">=></span> SnapshotStreamEvent <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  <span class="token function-variable function">appendSnapshot</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    snapshot<span class="token operator">:</span> SnapshotStreamEvent<span class="token punctuation">,</span>
    streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
    lastSnapshotRevision<span class="token operator">?</span><span class="token operator">:</span> bigint
  <span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>AppendResult<span class="token operator">></span><span class="token punctuation">,</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  newEvent<span class="token operator">:</span> StreamEvent<span class="token punctuation">,</span>
  currentState<span class="token operator">:</span> State<span class="token punctuation">,</span>
  lastSnapshotRevision<span class="token operator">?</span><span class="token operator">:</span> bigint
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>AppendResult<span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> appendResult <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">appendToStream</span><span class="token punctuation">(</span>eventStore<span class="token punctuation">,</span> streamName<span class="token punctuation">,</span> <span class="token punctuation">[</span>newEvent<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> snapshot <span class="token operator">=</span> <span class="token function">tryBuildSnapshot</span><span class="token punctuation">(</span>
    newEvent<span class="token punctuation">,</span>
    currentState<span class="token punctuation">,</span>
    appendResult<span class="token punctuation">.</span>nextExpectedRevision
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>snapshot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token function">appendSnapshot</span><span class="token punctuation">(</span>snapshot<span class="token punctuation">,</span> streamName<span class="token punctuation">,</span> lastSnapshotRevision<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> appendResult<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p>The function takes the current state, a new event generated by the business logic and the last snapshot revision. When the event was successfully appended, we're trying to build a snapshot.</p>
<p>We're also injecting two functions:</p>
<ul>
<li><code>tryBuildSnapshot</code> - responsible for constructing snapshot from the event new event and the current state.</li>
<li><code>appendSnapshot</code> - allows injecting custom storage location logic (separate stream, database or cache).</li>
</ul>
<p>I'll discuss the building strategies in more detail, but let's grasp the main idea first. We're using snapshots to increase the read performance by reading fewer data. However, if we would be doing them after each event, we may downgrade the writes performance. We could, for example, do a snapshot only after set event type. Then we could reduce the amount of additional data and traffic generated by snapshot creation.</p>
<p>For instance, code for building snapshot after each end of the cashier's shift:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">shouldDoSnapshot</span><span class="token punctuation">(</span>newEvent<span class="token operator">:</span> CashRegisterEvent<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> newEvent<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'shift-finished'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">buildCashierSnapshot</span><span class="token punctuation">(</span>
  currentState<span class="token operator">:</span> CashRegister<span class="token punctuation">,</span>
  newStreamRevision<span class="token operator">:</span> bigint
<span class="token punctuation">)</span><span class="token operator">:</span> CashRegisterSnapshoted <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'cash-register-snapshoted'</span><span class="token punctuation">,</span>
    data<span class="token operator">:</span> currentState<span class="token punctuation">,</span>
    metadata<span class="token operator">:</span> <span class="token punctuation">{</span> snapshottedStreamRevision<span class="token operator">:</span> newStreamRevision<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">tryBuildCashierSnapshot</span><span class="token punctuation">(</span>
  newEvent<span class="token operator">:</span> CashRegisterEvent<span class="token punctuation">,</span>
  currentState<span class="token operator">:</span> CashRegister<span class="token punctuation">,</span>
  newStreamRevision<span class="token operator">:</span> bigint
<span class="token punctuation">)</span><span class="token operator">:</span> CashRegisterSnapshoted <span class="token operator">|</span> <span class="token keyword">undefined</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldDoSnapshot</span><span class="token punctuation">(</span>newEvent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token function">buildCashierSnapshot</span><span class="token punctuation">(</span>currentState<span class="token punctuation">,</span> newStreamRevision<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p>If the snapshot should be created, build it and pass it to the <code>appendSnapshot</code> method. This can be any prefered storage or cache. If we'd like to do it to the separate stream in EventStoreDB, see below:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token generic-function"><span class="token function">appendSnapshotToSeparateStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  SnapshotStreamEvent <span class="token keyword">extends</span> SnapshotEvent
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  snapshot<span class="token operator">:</span> SnapshotStreamEvent<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  lastSnapshotRevision<span class="token operator">?</span><span class="token operator">:</span> bigint
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>AppendResult<span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> snapshotStreamName <span class="token operator">=</span> <span class="token function">addSnapshotPrefix</span><span class="token punctuation">(</span>streamName<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>lastSnapshotRevision <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    eventStore<span class="token punctuation">.</span><span class="token function">setStreamMetadata</span><span class="token punctuation">(</span>snapshotStreamName<span class="token punctuation">,</span> <span class="token punctuation">{</span> maxCount<span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token function">appendToStream</span><span class="token punctuation">(</span>eventStore<span class="token punctuation">,</span> snapshotStreamName<span class="token punctuation">,</span> <span class="token punctuation">[</span>snapshot<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>The logic is simple. We're adding the snapshot prefix to the stream name and append snapshot event.</p>
<p>I also applied an additional optimisation here. Usually, we don't need to keep all snapshots, as we just care about the latest one. We can use the <code>$maxCount</code> stream metadata to ensure that there won't be more events in the stream than the defined threshold. If there is more, EventStoreDB will delete old events. Setting <code>$maxCount</code> to 1 will make sure that there is only one snapshot event.</p>
<p>We want to set the stream metadata only once (when the first snapshot is created). We can verify it using the last snapshot revision. If it's not set, then it means that there was no snapshot before.</p>
<h2 id="storing-snapshots-to-the-same-stream" tabindex="-1"><a class="header-anchor" href="#storing-snapshots-to-the-same-stream" aria-hidden="true">#</a> Storing snapshots to the same stream</h2>
<p>Storing events to the same stream does not require an additional call. Well, almost. It requires a further call to update the stream metadata.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">appendEventAndSnapshotToTheSameStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>
  State <span class="token keyword">extends</span> object <span class="token operator">=</span> object<span class="token punctuation">,</span>
  StreamEvent <span class="token keyword">extends</span> Event <span class="token operator">=</span> Event
<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  <span class="token function-variable function">tryBuildSnapshot</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    newEvent<span class="token operator">:</span> StreamEvent<span class="token punctuation">,</span>
    currentState<span class="token operator">:</span> State
  <span class="token punctuation">)</span> <span class="token operator">=></span> StreamEvent <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  newEvent<span class="token operator">:</span> StreamEvent<span class="token punctuation">,</span>
  currentState<span class="token operator">:</span> State
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span>AppendResult<span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> snapshot <span class="token operator">=</span> <span class="token function">tryBuildSnapshot</span><span class="token punctuation">(</span>newEvent<span class="token punctuation">,</span> currentState<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> eventsToAppend <span class="token operator">=</span> snapshot <span class="token operator">?</span> <span class="token punctuation">[</span>newEvent<span class="token punctuation">,</span> snapshot<span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token punctuation">[</span>newEvent<span class="token punctuation">]</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> appendResult <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">appendToStream</span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    streamName<span class="token punctuation">,</span>
    eventsToAppend
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> snapshottedStreamRevision <span class="token operator">=</span> appendResult<span class="token punctuation">.</span>nextExpectedRevision<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">await</span> eventStore<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">setStreamMetadata</span><span class="token generic class-name"><span class="token operator">&lt;</span>SnapshotMetadata<span class="token operator">></span></span></span><span class="token punctuation">(</span>streamName<span class="token punctuation">,</span> <span class="token punctuation">{</span>
    snapshottedStreamRevision<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> appendResult<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>Accordingly to the external storage example, we're trying to build a snapshot. If the snapshot was made, we're appending it together with the new event. Note, the snapshot should be appended after the event.</p>
<p>Afterwards, we need to update stream metadata with the stream revision. This step may be redundant if we're always appending a snapshot after an event.</p>
<p>The main difference to external storage is: we don't need to store the snapshotted revision in the event metadata, as we're keeping it in the stream metadata.</p>
<h2 id="separate-stream-vs-the-same-stream-considerations" tabindex="-1"><a class="header-anchor" href="#separate-stream-vs-the-same-stream-considerations" aria-hidden="true">#</a> Separate stream vs the same stream considerations</h2>
<p>As was described above, two main strategies for reading and storing snapshots:</p>
<ol>
<li>Separate storage (different database, cache, but also a separate stream).</li>
<li>The same stream.</li>
</ol>
<p>Both of them have design implications.</p>
<p>Keeping it separate makes it more vulnerable to transient errors. We need to makes additional calls. Because of that, we have to think about scenarios when one of the calls fail. <em>&quot;Should I revert the previous one?&quot;</em></p>
<p>Nevertheless, for the snapshots, those considerations might not be critical. What worse can happen if the snapshot wasn't stored? We'll read the whole stream and store it the next time. As mentioned, we should treat snapshots as a technical performance optimisation. Our system should be designed to ensure that it's operational even if the optimisation wasn't applied.</p>
<p>When making a decision, we should also consider the snapshots lifetime. Snapshots structure tends to change quite often. Each new event type or update to how the event is interpreted may change the snapshot schema. For example, initially, we just kept the transactions count in the cash register snapshot, as it was enough for the business logic. Then a new requirement came, and we'd like to keep the collection of all transactions.</p>
<p>Now we need to reapply the events, and the old snapshot becomes obsolete. If we keep snapshots in the same stream, then we'll need to read all events and ignore snapshots while applying the events. In the worst case, if we were storing a snapshot after each event, this can double the stream size.</p>
<p>In my opinion, this is much more complicated than just storing a single, latest snapshot in a separate stream. If we set the <code>$maxCount</code> metadata on the snapshot stream, we don't need to keep the redundant snapshots. Rebuild is more straightforward, as we just remove the last snapshot stream event.</p>
<p>The same applies to the external storage or cache. Additionally, we'll also need to consider that we're increasing complexity by adding new pieces.</p>
<p>I recommend using a separate stream for snapshots, but you should evaluate the strategy based on your use case.</p>
<h2 id="storing-snapshot-during-the-command-handling" tabindex="-1"><a class="header-anchor" href="#storing-snapshot-during-the-command-handling" aria-hidden="true">#</a> Storing snapshot during the command handling</h2>
<p>The examples I explained above assume that the snapshotting happens together with appending the event. The typical flow of the event sourcing command (request) handling is:</p>
<ul>
<li>read the stream events,</li>
<li>rebuild the aggregate/entity state from events,</li>
<li>perform the business logic that generates a new event,</li>
<li>store the event
If we want to store the snapshot in the same processing pipeline, we should add the additional step: storing a snapshot.</li>
</ul>
<hr>
<p>As explained in <a href="https://www.eventstore.com/blog/how-to-get-the-current-entity-state-from-events" target="_blank" rel="noopener noreferrer">my other article<OutboundLink/></a>. The process of rebuilding the state based on events is called stream aggregation. The generic method for that can be defined as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">aggregateStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>Aggregate<span class="token punctuation">,</span> StreamEvent <span class="token keyword">extends</span> Event<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  events<span class="token operator">:</span> StreamEvent<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token function-variable function">when</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    currentState<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">,</span>
    event<span class="token operator">:</span> StreamEvent
  <span class="token punctuation">)</span> <span class="token operator">=></span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">,</span>
  <span class="token function-variable function">check</span><span class="token operator">:</span> <span class="token punctuation">(</span>state<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> state <span class="token keyword">is</span> Aggregate
<span class="token punctuation">)</span><span class="token operator">:</span> Aggregate <span class="token punctuation">{</span>
  <span class="token keyword">const</span> state <span class="token operator">=</span> events<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">reduce</span><span class="token generic class-name"><span class="token operator">&lt;</span>Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">>></span></span></span><span class="token punctuation">(</span>when<span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token function">assertStateIsValid</span><span class="token punctuation">(</span>state<span class="token punctuation">,</span> check<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">applyEvent</span><span class="token generic class-name"><span class="token operator">&lt;</span>Aggregate<span class="token punctuation">,</span> StreamEvent <span class="token keyword">extends</span> Event<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  currentState<span class="token operator">:</span> Aggregate<span class="token punctuation">,</span>
  event<span class="token operator">:</span> StreamEvent<span class="token punctuation">,</span>
  <span class="token function-variable function">when</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    currentState<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">,</span>
    event<span class="token operator">:</span> StreamEvent
  <span class="token punctuation">)</span> <span class="token operator">=></span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">,</span>
  <span class="token function-variable function">check</span><span class="token operator">:</span> <span class="token punctuation">(</span>state<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> state <span class="token keyword">is</span> Aggregate
<span class="token punctuation">)</span><span class="token operator">:</span> Aggregate <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">assertStateIsValid</span><span class="token punctuation">(</span><span class="token function">when</span><span class="token punctuation">(</span>currentState<span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">,</span> check<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token generic-function"><span class="token function">assertStateIsValid</span><span class="token generic class-name"><span class="token operator">&lt;</span>Aggregate<span class="token operator">></span></span></span><span class="token punctuation">(</span>
  state<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">,</span>
  <span class="token function-variable function">check</span><span class="token operator">:</span> <span class="token punctuation">(</span>state<span class="token operator">:</span> Partial<span class="token operator">&lt;</span>Aggregate<span class="token operator">></span><span class="token punctuation">)</span> <span class="token operator">=></span> state <span class="token keyword">is</span> Aggregate
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">check</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">throw</span> <span class="token string">'Aggregate state is not valid'</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> state<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>Besides the stream aggregation method, I also defined two others:</p>
<ul>
<li><code>applyEvent</code> - for applying the single event on the current state (to get the new state).</li>
<li><code>assertStateIsValid</code> - type check assertion to make sure that state is correct after aggregation.</li>
</ul>
<p>I'm using the <a href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types" target="_blank" rel="noopener noreferrer">type guards<OutboundLink/></a> TypeScript mechanism. An example of the type guard can be defined as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">isNotEmptyString</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'string'</span> <span class="token operator">&amp;&amp;</span> value<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">isPositiveNumber</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">typeof</span> value <span class="token operator">===</span> <span class="token string">'number'</span> <span class="token operator">&amp;&amp;</span> value <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">isCashRegister</span><span class="token punctuation">(</span>
  cashRegister<span class="token operator">:</span> <span class="token builtin">any</span>
<span class="token punctuation">)</span><span class="token operator">:</span> cashRegister <span class="token keyword">is</span> CashRegister <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    cashRegister <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span>
    <span class="token function">isNotEmptyString</span><span class="token punctuation">(</span>cashRegister<span class="token punctuation">.</span>id<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token function">isPositiveNumber</span><span class="token punctuation">(</span>cashRegister<span class="token punctuation">.</span>float<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token function">isNotEmptyString</span><span class="token punctuation">(</span>cashRegister<span class="token punctuation">.</span>workstation<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span>cashRegister<span class="token punctuation">.</span>currentCashierId <span class="token operator">===</span> <span class="token keyword">undefined</span> <span class="token operator">||</span>
      <span class="token function">isNotEmptyString</span><span class="token punctuation">(</span>cashRegister<span class="token punctuation">.</span>currentCashierId<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>Even if you're not programming in TypeScript and this syntax looks weird, it's always worth making sure that the rebuild state follows the business rules. It's essential to ensure that we handled all events properly. As the application evolves, our business logic changes and events schema may change. Thus, it is worth having the state check and unit tests to reduce unexpected errors related to the wrong state.</p>
<hr>
<p>Getting back to snapshotting. Having all of that and defining the example command handling logic for closing the cashier's shift as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">endShift</span><span class="token punctuation">(</span>
  events<span class="token operator">:</span> CashRegisterEvent<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  command<span class="token operator">:</span> EndShift
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">{</span>
  newState<span class="token operator">:</span> CashRegister<span class="token punctuation">;</span>
  newEvent<span class="token operator">:</span> ShiftEnded<span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> cashRegister <span class="token operator">=</span> <span class="token function">aggregateStream</span><span class="token punctuation">(</span>events<span class="token punctuation">,</span> when<span class="token punctuation">,</span> isCashRegister<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>cashRegister<span class="token punctuation">.</span>currentCashierId <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token string">'SHIFT_NOT_STARTED'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> newEvent<span class="token operator">:</span> ShiftEnded <span class="token operator">=</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> <span class="token string">'shift-finished'</span><span class="token punctuation">,</span>
    data<span class="token operator">:</span> <span class="token punctuation">{</span>
      cashRegisterId<span class="token operator">:</span> cashRegister<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
      finishedAt<span class="token operator">:</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  <span class="token keyword">return</span> <span class="token punctuation">{</span>
    newState<span class="token operator">:</span> <span class="token function">applyEvent</span><span class="token punctuation">(</span>cashRegister<span class="token punctuation">,</span> newEvent<span class="token punctuation">,</span> when<span class="token punctuation">,</span> isCashRegister<span class="token punctuation">)</span><span class="token punctuation">,</span>
    newEvent<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p>Then the application code for getting and storing events can be defined as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">handleEndShift</span><span class="token punctuation">(</span>command<span class="token operator">:</span> EndShift<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> eventStore <span class="token operator">=</span> EventStoreDBClient<span class="token punctuation">.</span><span class="token function">connectionString</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">esdb://localhost:2113?tls=false</span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> streamName <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">cashregister-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>command<span class="token punctuation">.</span>data<span class="token punctuation">.</span>cashRegisterId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

  <span class="token comment">// 1. Read events and snapshot from the separate stream</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> events<span class="token punctuation">,</span> lastSnapshotRevision <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">readCashRegisterEvents</span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    streamName
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 2. Perform business logic handling the command</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> newState<span class="token punctuation">,</span> newEvent <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">endShift</span><span class="token punctuation">(</span>events<span class="token punctuation">,</span> command<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 3. Append the new event and snapshot</span>
  <span class="token keyword">await</span> <span class="token function">storeCashRegister</span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    streamName<span class="token punctuation">,</span>
    newEvent<span class="token punctuation">,</span>
    newState<span class="token punctuation">,</span>
    lastSnapshotRevision
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>If your strategy is to store events in a separate stream, the helper functions can be defined as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">readCashRegisterEvents</span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">readEventsFromExternalSnapshot</span><span class="token generic class-name"><span class="token operator">&lt;</span>CashRegisterEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span>streamName<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">readSnapshotFromSeparateStream</span><span class="token punctuation">(</span>eventStore<span class="token punctuation">,</span> streamName<span class="token punctuation">)</span><span class="token punctuation">,</span>
    eventStore<span class="token punctuation">,</span>
    streamName
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">storeCashRegister</span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  newEvent<span class="token operator">:</span> ShiftFinished<span class="token punctuation">,</span>
  newState<span class="token operator">:</span> CashRegister<span class="token punctuation">,</span>
  lastSnapshotRevision<span class="token operator">?</span><span class="token operator">:</span> bigint
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">appendEventAndExternalSnapshot</span><span class="token punctuation">(</span>
    tryBuildCashierSnapshot<span class="token punctuation">,</span>
    <span class="token punctuation">(</span>snapshot<span class="token punctuation">,</span> streamName<span class="token punctuation">,</span> lastSnapshotRevision<span class="token punctuation">)</span> <span class="token operator">=></span>
      <span class="token function">appendSnapshotToSeparateStream</span><span class="token punctuation">(</span>
        eventStore<span class="token punctuation">,</span>
        snapshot<span class="token punctuation">,</span>
        streamName<span class="token punctuation">,</span>
        lastSnapshotRevision
      <span class="token punctuation">)</span><span class="token punctuation">,</span>
    eventStore<span class="token punctuation">,</span>
    streamName<span class="token punctuation">,</span>
    newEvent<span class="token punctuation">,</span>
    newState<span class="token punctuation">,</span>
    lastSnapshotRevision
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div><p>If we store them in the same stream, the code will look slightly different (as we don't need to pass the last snapshot revision):</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">handleEndShiftSameSnapshotStream</span><span class="token punctuation">(</span>
  command<span class="token operator">:</span> EndShift
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> eventStore <span class="token operator">=</span> EventStoreDBClient<span class="token punctuation">.</span><span class="token function">connectionString</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">esdb://localhost:2113?tls=false</span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> streamName <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">cashregister-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>command<span class="token punctuation">.</span>data<span class="token punctuation">.</span>cashRegisterId<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>

  <span class="token comment">// 1. Read events and snapshot from the same stream</span>
  <span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">readCashRegisterEvents</span><span class="token punctuation">(</span>eventStore<span class="token punctuation">,</span> streamName<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 2. Perform business logic handling the command</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> newState<span class="token punctuation">,</span> newEvent <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">endShift</span><span class="token punctuation">(</span>events<span class="token punctuation">,</span> command<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 3. Append the new event and snapshot</span>
  <span class="token keyword">await</span> <span class="token function">storeCashRegister</span><span class="token punctuation">(</span>eventStore<span class="token punctuation">,</span> streamName<span class="token punctuation">,</span> newEvent<span class="token punctuation">,</span> newState<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">readCashRegisterEvents</span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">readEventsFromSnapshotInTheSameStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>CashRegisterEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    streamName
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">storeCashRegister</span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  streamName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span>
  newEvent<span class="token operator">:</span> ShiftFinished<span class="token punctuation">,</span>
  newState<span class="token operator">:</span> CashRegister
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token generic-function"><span class="token function">appendEventAndSnapshotToTheSameStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>CashRegister<span class="token punctuation">,</span> CashRegisterEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span>
    tryBuildCashierSnapshot<span class="token punctuation">,</span>
    eventStore<span class="token punctuation">,</span>
    streamName<span class="token punctuation">,</span>
    newEvent<span class="token punctuation">,</span>
    newState
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>It should be clear now that we can hide the implementation detail about the snapshotting strategy by adding wrapper methods. What's more, we can use snapshotting for entities with the most considerable amount of events. For the others, we can use the traditional approach. By utilising the tactic presented above, we can keep the primary code snapshotting agnostic.</p>
<h2 id="storing-snapshot-asynchronously-with-subscriptions" tabindex="-1"><a class="header-anchor" href="#storing-snapshot-asynchronously-with-subscriptions" aria-hidden="true">#</a> Storing snapshot asynchronously with subscriptions</h2>
<p>Storing snapshots together in the command handling process seems to be a decent approach. However, like everything, it has pros and cons. The main benefit is that we are sure that we will have a snapshot created after successful processing. This can be useful if we're creating a snapshot after each event.</p>
<p>Yet, as I noted above. This may improve the read events performance but can lead to slowing down writes. Additionally, we're risking transient errors because of the multiple calls. As our intention is to increase performance, we should also consider doing that asynchronously. By that, we won't put the additional effort into the writes.</p>
<p>To do that, we can use <a href="https://developers.eventstore.com/clients/grpc/subscribing-to-streams/" target="_blank" rel="noopener noreferrer">subscriptions<OutboundLink/></a>. EventStoreDB provides the opportunity to subscribe to notifications about new events in either <a href="https://developers.eventstore.com/clients/grpc/subscribing-to-streams/" target="_blank" rel="noopener noreferrer">specific stream<OutboundLink/></a> notifications or the <a href="https://developers.eventstore.com/clients/grpc/subscribing-to-streams/#subscribing-to-all" target="_blank" rel="noopener noreferrer"><code>$all</code> stream<OutboundLink/></a>. The general recommendation is to use <code>$all</code> stream subscriptions (together with a <a href="https://developers.eventstore.com/clients/grpc/subscribing-to-streams/filtering.html#filtering-out-system-events" target="_blank" rel="noopener noreferrer">server-side filtering<OutboundLink/></a>), as they're the most performant. Stream subscriptions are also valid, but having too many of them may also impact database performance. You can also consider using subscriptions to the <a href="https://developers.eventstore.com/server/v5/docs/projections/system-projections.html#by-event-type" target="_blank" rel="noopener noreferrer">event type projection stream<OutboundLink/></a>. The biggest benefit of the EventStoreDB is that they are push-based. That enables event-driven flow and have a positive performance impact (especially comparing to traditional <a href="https://en.wikipedia.org/wiki/Change_data_capture" target="_blank" rel="noopener noreferrer">Change Data Capture<OutboundLink/></a>).</p>
<p>Doing snapshots with a subscription doesn't limit us to a specific pattern. We still can do snapshots to external storage, separate and the same stream. This choice is about when we do it, not how. The general steps needed to perform are:</p>
<ol>
<li>Start a long-living or background process.</li>
<li>Subscribe to events notifications.</li>
<li>On a new event, check if you need to do a snapshot.</li>
<li>If yes, then do it. Otherwise, skip the event handling.</li>
<li>Wait for the upcoming events, and repeat points 2 and 3 when they appear.</li>
</ol>
<p>The simplest way to run the long-living process in NodeJS is running the anonymous async block with <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank" rel="noopener noreferrer">Promise<OutboundLink/></a>. We can pass <code>resolve</code> and <code>reject</code> methods to complete promise when task finished or failed.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span></span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> reject<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">await</span> <span class="token function">subscribeToAll</span><span class="token punctuation">(</span>reject<span class="token punctuation">,</span> resolve<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>Having that, we can define a subscription to <code>$all</code> logic as:</p>
<ol>
<li>Start an EventStoreDB connection.</li>
<li>Read the checkpoint (last processed event position).</li>
<li>Subscribe to $all stream excluding system events (we don't need them for snapshots processing).</li>
<li>Try to do a snapshot when data is received from a subscription.</li>
<li>Store new checkpoint.</li>
<li>When the subscription finishes, complete processing.</li>
<li>When it fails, reject with an error.</li>
</ol>
<p>The code for that can look as:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">subscribeToAll</span><span class="token punctuation">(</span>
  <span class="token function-variable function">reject</span><span class="token operator">:</span> <span class="token punctuation">(</span>error<span class="token operator">:</span> <span class="token builtin">any</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token function-variable function">resolve</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> subscriptionId <span class="token operator">=</span> <span class="token string">'SnapshottingSubscriptionToAll'</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> eventStore <span class="token operator">=</span> EventStoreDBClient<span class="token punctuation">.</span><span class="token function">connectionString</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">esdb://localhost:2113?tls=false</span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> lastCheckpoint <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">loadCheckPoint</span><span class="token punctuation">(</span>subscriptionId<span class="token punctuation">)</span><span class="token punctuation">;</span>

  eventStore
    <span class="token punctuation">.</span><span class="token function">subscribeToAll</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      fromPosition<span class="token operator">:</span> lastCheckpoint <span class="token operator">??</span> <span class="token constant">START</span><span class="token punctuation">,</span>
      filter<span class="token operator">:</span> <span class="token function">excludeSystemEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>resolvedEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      
      <span class="token keyword">await</span> <span class="token function">tryDoSnapshot</span><span class="token punctuation">(</span>eventStore<span class="token punctuation">,</span> resolvedEvent<span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">await</span> <span class="token function">storeCheckpoint</span><span class="token punctuation">(</span>subscriptionId<span class="token punctuation">,</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>position<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 6. End asynchronous process with error</span>
      <span class="token function">reject</span><span class="token punctuation">(</span>error<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// 7. When subscription finished end the process</span>
    <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'close'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'end'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><p>Let's skip the considerations about checkpointing now, as subscriptions are a broader topic for another article. For now, assume that you need to store somewhere information (e.g. as the event in EventStoreDB, record in another database) of the last processed event position. That is necessary to be able to resubscribe from the previous position instead of reprocessing all events.</p>
<p>Snapshot creation gets a bit trickier than the command handling style. We don't have the current stream state, we need to retrieve it. The simplest way to do that is to read all events since the last snapshot and aggregate them, for example:</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">snapshotCashRegisterOnSubscription</span><span class="token punctuation">(</span>
  eventStore<span class="token operator">:</span> EventStoreDBClient<span class="token punctuation">,</span>
  resolvedEvent<span class="token operator">:</span> ResolvedEvent
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token keyword">void</span><span class="token operator">></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token punctuation">{</span>
    type<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>type<span class="token punctuation">,</span>
    data<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>data<span class="token punctuation">,</span>
    metadata<span class="token operator">:</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>metadata<span class="token punctuation">,</span>
  <span class="token punctuation">}</span> <span class="token keyword">as</span> CashRegisterEvent<span class="token punctuation">;</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">shouldDoSnapshot</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> streamName <span class="token operator">=</span> resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>streamId<span class="token punctuation">;</span>

  <span class="token keyword">const</span> <span class="token punctuation">{</span> events<span class="token punctuation">,</span> lastSnapshotRevision <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">readCashRegisterEvents</span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    streamName
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> currentState <span class="token operator">=</span> <span class="token function">aggregateStream</span><span class="token punctuation">(</span>events<span class="token punctuation">,</span> when<span class="token punctuation">,</span> isCashRegister<span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">const</span> snapshot <span class="token operator">=</span> <span class="token function">buildCashierSnapshot</span><span class="token punctuation">(</span>
    currentState<span class="token punctuation">,</span>
    resolvedEvent<span class="token punctuation">.</span>event<span class="token operator">!</span><span class="token punctuation">.</span>revision
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token keyword">await</span> <span class="token function">appendSnapshotToSeparateStream</span><span class="token punctuation">(</span>
    eventStore<span class="token punctuation">,</span>
    snapshot<span class="token punctuation">,</span>
    streamName<span class="token punctuation">,</span>
    lastSnapshotRevision
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>We'd like to avoid reading events constantly. So, checking if a snapshot should be made needs to happen first.</p>
<p>Once that's done, and the event should trigger snapshotting, we have to read stream events. We're reusing the known before <code>readCashRegisterEvents</code> method that will load snapshot and following stream events. There is one thing to consider here, subscription handling happens with a delay to the time event was published. Because of that, when we read events, we may also get those that occurred after the handled event. See the image below.</p>
<p><img src="@source/resources/articles/images/snapshots/snapshots-5.svg" alt="05"></p>
<p>If we receive the <code>ShiftFinished</code> event and try to read snapshot and all following events, then we'll also get a <code>ShiftStarted</code> event that happened later. That doesn't have to be an issue if we're assuming that it's just a technical optimisation. We'll just snapshot the latest state. However, if we make some assumptions about what we expect from the snapshot state, this may be an issue.</p>
<p>We should also consider the snapshotting frequency. If we're doing snapshots too often, we may degrade database performance (especially if we subscribe per stream). We'll have a continuous pattern of actions:</p>
<ul>
<li>listen for an event,</li>
<li>read events,</li>
<li>append new snapshot.</li>
</ul>
<p>It's essential to run tests with production load and tune the check condition if we store snapshots. It's a tradeoffs game.</p>
<p>We can also try strategies like caching the current stream state. We can apply each event from the subscription to keep the current state. Once the event comes that should trigger snapshotting, we can get the current state from the cache instead of reading the events. Beware of keeping too much in the in-memory state. It can (in the edge case) eat all the memory.</p>
<h2 id="when-to-do-snapshots" tabindex="-1"><a class="header-anchor" href="#when-to-do-snapshots" aria-hidden="true">#</a> When to do snapshots?</h2>
<p>I described the popular tactics in the <a href="https://www.eventstore.com/blog/snapshots-in-event-sourcing" target="_blank" rel="noopener noreferrer">previous article<OutboundLink/></a>. Let's have a look at them once again.</p>
<ol>
<li>
<p><strong>Snapshot after each event.</strong> That's the most significant optimisation for the reads we can do. We're loading the least amount of events. However, this is also the worst for writes. We can use this tactic both for command handling and subscriptions. There is no need to check if we should do a snapshot, as this happens every time.</p>
</li>
<li>
<p><strong>Snapshot when the event of a specified type was stored.</strong> This was presented in the samples above.</p>
</li>
</ol>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">shouldDoSnapshot</span><span class="token punctuation">(</span>newEvent<span class="token operator">:</span> CashRegisterEvent<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> newEvent<span class="token punctuation">.</span>type <span class="token operator">===</span> <span class="token string">'shift-ended'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>It's a good pattern if there are circles of life in our stream, for example finishing the cashier's shift, ending the business day, etc. This is a similar approach to &quot;closing the books&quot;. It can be a decent first step to migrating a long-living stream to that pattern.</p>
<ol start="3">
<li><strong>Snapshot every N number of events.</strong> When we know that reading at most N (e.g. 10) events is fine, we can define the threshold and do a snapshot every N events. We can calculate the difference between the last stream revision where the snapshot was made and the current one. If it's higher or equal to the threshold, then we should do a snapshot.</li>
</ol>
<p>We can use the EventStoreDB resolved event metadata to get the handled event revision.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> snapshotTreshold <span class="token operator">=</span> <span class="token number">10n</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">shouldDoSnapshot</span><span class="token punctuation">(</span>
  lastSnapshotRevision<span class="token operator">:</span> bigint <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  resolvedEvent<span class="token operator">:</span> ResolvedEvent
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
resolvedEvent<span class="token punctuation">.</span>event <span class="token operator">&amp;&amp;</span> 
    <span class="token punctuation">(</span>resolvedEvent<span class="token punctuation">.</span>event<span class="token punctuation">.</span>revision <span class="token operator">??</span> <span class="token number">0n</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token punctuation">(</span>lastSnapshotRevision <span class="token operator">??</span> <span class="token number">0n</span><span class="token punctuation">)</span> <span class="token operator">>=</span>
    snapshotTreshold
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ol start="4">
<li><strong>Every selected period.</strong> Storing the snapshot can be scheduled, for example, once a day, every 1 hour, etc. The risk of doing that is that spikes in the event processing may occur between the snapshots storing periods. That may reduce the benefit of doing it.</li>
</ol>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> snapshotTreshold <span class="token operator">=</span> <span class="token number">1000</span> <span class="token operator">*</span> <span class="token number">60</span> <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">shouldDoSnapshot</span><span class="token punctuation">(</span>
  lastSnapshotTimestamp<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>
  resolvedEvent<span class="token operator">:</span> ResolvedEvent
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    resolvedEvent<span class="token punctuation">.</span>event <span class="token operator">&amp;&amp;</span>
    resolvedEvent<span class="token punctuation">.</span>event<span class="token punctuation">.</span>created <span class="token operator">-</span> <span class="token punctuation">(</span>lastSnapshotTimestamp <span class="token operator">??</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">>=</span>
      snapshotTreshold
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>We can use the EventStoreDB resolved event metadata to get the handled event created timestamp. The last snapshot timestamp can be either taken from the snapshot event metadata or stored in the stream metadata the same way as storing the snapshotted stream revision.</p>
<p>Of course, you can mix those techniques or define your own. It's always recommended to tune it to your specific needs.</p>
<h2 id="final-words" tabindex="-1"><a class="header-anchor" href="#final-words" aria-hidden="true">#</a> Final words</h2>
<p>Snapshots are a valid pattern but shouldn't be treated as the foundational part of the system architecture. They should be performance optimisation. As with other optimisations, we should do them for the critical business parts, not try to apply them by default.</p>
<p>If we have to use snapshots, we should analyse the specifics of our data and the expected traffic characteristics. Based on that, we can define our strategy. We should verify our hypothesis, make benchmarks and compare result metrics with the expected ones.</p>
<p>Before deciding to use snapshots, we should reevaluate our stream design. It's essential to make sure that we cannot make our streams short-living (e.g. using the &quot;complete the books&quot; pattern).</p>
<p>Even if we're in urgent need and we have to act tactically, it's worth going back to the drawing board with the business and focus on the modelling. It may appear that we may don't need snapshotting by shaping our domain model differently.</p>
</template>
