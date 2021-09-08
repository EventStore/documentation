<template><h1 id="appending-events" tabindex="-1"><a class="header-anchor" href="#appending-events" aria-hidden="true">#</a> Appending events</h1>
<p>When you start working with EventStoreDB, the database is empty. So, the first meaningful operation in this case would be to add one or more events to the database using one of the available client SDKs.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Check <RouterLink to="/clients/grpc/#required-packages">connecting to EventStoreDB instructions</RouterLink> to learn how to configure and use the client SDK.</p>
</div>
<h2 id="append-your-first-event" tabindex="-1"><a class="header-anchor" href="#append-your-first-event" aria-hidden="true">#</a> Append your first event</h2>
<p>The simplest way to append an event to EventStoreDB is to create an <code>EventData</code> object and call <code>AppendToStream</code> method.</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> eventData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
    Uuid<span class="token punctuation">.</span><span class="token function">NewUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">"some-event"</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{\"id\": \"1\" \"value\": \"some value\"}"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"some-stream"</span><span class="token punctuation">,</span>
    StreamState<span class="token punctuation">.</span>NoStream<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        eventData
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">EventData</span> eventData <span class="token operator">=</span> <span class="token class-name">EventData</span>
        <span class="token punctuation">.</span><span class="token function">builderAsJson</span><span class="token punctuation">(</span>
                UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">"some-event"</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">TestEvent</span><span class="token punctuation">(</span>
                        <span class="token string">"1"</span><span class="token punctuation">,</span>
                        <span class="token string">"some value"</span>
                <span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">AppendToStreamOptions</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">expectedRevision</span><span class="token punctuation">(</span><span class="token class-name">ExpectedRevision</span><span class="token punctuation">.</span>NO_STREAM<span class="token punctuation">)</span><span class="token punctuation">;</span>

client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> options<span class="token punctuation">,</span> eventData<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
    <span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
      data<span class="token operator">:</span> <span class="token punctuation">{</span>
        id<span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
        value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> event<span class="token punctuation">,</span> <span class="token punctuation">{</span>
      expectedRevision<span class="token operator">:</span> <span class="token constant">NO_STREAM</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token class-name">TestEvent</span> <span class="token punctuation">{</span>
    id<span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    important_data<span class="token punctuation">:</span> <span class="token string">"some value"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> event <span class="token operator">=</span> <span class="token class-name">EventData</span><span class="token punctuation">::</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string">"some-event"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token class-name">Uuid</span><span class="token punctuation">::</span><span class="token function">new_v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expected_revision</span><span class="token punctuation">(</span><span class="token class-name">ExpectedRevision</span><span class="token punctuation">::</span><span class="token class-name">NoStream</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _ <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> event<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">SomeEvent</span> <span class="token operator">=</span> JSONEventType<span class="token operator">&lt;</span>
  <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    value<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token generic-function"><span class="token function">jsonEvent</span><span class="token generic class-name"><span class="token operator">&lt;</span>SomeEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> event<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> <span class="token constant">NO_STREAM</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></CodeGroupItem>
</CodeGroup>
<p>As you can see, <code>AppendToStream</code> takes a collection of <code>EventData</code>, which makes possible saving more than one event in a single batch.</p>
<p>As well as the example above there is also a number of other options for dealing with different scenarios.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>If you are new to Event Sourcing, please study the <a href="#handling-concurrency">Handling concurrency</a> section below.</p>
</div>
<h2 id="working-with-eventdata" tabindex="-1"><a class="header-anchor" href="#working-with-eventdata" aria-hidden="true">#</a> Working with EventData</h2>
<p>When appending events to EventStoreDB they must first all be wrapped in an <code>EventData</code> object. This allows you to specify the content of the event, the type of event and whether its in Json format. In its simplest form you need to the three following arguments:</p>
<h3 id="eventid" tabindex="-1"><a class="header-anchor" href="#eventid" aria-hidden="true">#</a> eventId</h3>
<p>This takes the format of a <code>Uuid</code> and is used to uniquely identify the event you are trying to append. If two events with the same <code>Uuid</code> are appended to the same stream in quick succession EventStoreDB will only append one copy of the event to the stream.</p>
<p>For example, the following code will only append a single event:</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> eventData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
    Uuid<span class="token punctuation">.</span><span class="token function">NewUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">"some-event"</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{\"id\": \"1\" \"value\": \"some value\"}"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"same-event-stream"</span><span class="token punctuation">,</span>
    StreamState<span class="token punctuation">.</span>Any<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        eventData
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// attempt to append the same event again</span>
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"same-event-stream"</span><span class="token punctuation">,</span>
    StreamState<span class="token punctuation">.</span>Any<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        eventData
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">EventData</span> eventData <span class="token operator">=</span> <span class="token class-name">EventData</span>
        <span class="token punctuation">.</span><span class="token function">builderAsJson</span><span class="token punctuation">(</span>
                UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">"some-event"</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">TestEvent</span><span class="token punctuation">(</span>
                        <span class="token string">"1"</span><span class="token punctuation">,</span>
                        <span class="token string">"some value"</span>
                <span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">AppendToStreamOptions</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">expectedRevision</span><span class="token punctuation">(</span><span class="token class-name">ExpectedRevision</span><span class="token punctuation">.</span>ANY<span class="token punctuation">)</span><span class="token punctuation">;</span>

client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> options<span class="token punctuation">,</span> eventData<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// attempt to append the same event again</span>
client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> options<span class="token punctuation">,</span> eventData<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// attempt to append the same event again</span>
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token class-name">TestEvent</span> <span class="token punctuation">{</span>
    id<span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    important_data<span class="token punctuation">:</span> <span class="token string">"some value"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> event <span class="token operator">=</span> <span class="token class-name">EventData</span><span class="token punctuation">::</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string">"some-event"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token class-name">Uuid</span><span class="token punctuation">::</span><span class="token function">new_v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _ <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> event<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _ <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> event<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token generic-function"><span class="token function">jsonEvent</span><span class="token generic class-name"><span class="token operator">&lt;</span>SomeEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// attempt to append the same event again</span>
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></CodeGroupItem>
</CodeGroup>
<Card><template #content><p><img src="@source/clients/grpc/images/dupicate-event.png" alt="Duplicate Event"></p>
</template></Card><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> type</h3>
<p>An event type should be supplied for each event. This is a unique string used to identify the type of event you are saving.</p>
<p>It is common to see the explicit event code type name used as the type as it makes serialising and de-serialising of the event easy. However, we recommend against this as it couples the storage to the type and will make it more difficult if you need to version the event at a later date.</p>
<h3 id="data" tabindex="-1"><a class="header-anchor" href="#data" aria-hidden="true">#</a> data</h3>
<p>Representation of your event data. It is recommended that you store your events as JSON objects as this will allow you to make use of all of EventStoreDB's functionality such as projections. Ultimately though, you can save it using whatever format you like as eventually, it will be stored as encoded bytes.</p>
<h3 id="metadata" tabindex="-1"><a class="header-anchor" href="#metadata" aria-hidden="true">#</a> metadata</h3>
<p>It is common to need to store additional information along side your event that is part of the event it's self. This can be correlation Id's, timestamps, access information etc. EventStoreDB allows you to store a separate byte array containing this information to keep it separate.</p>
<h3 id="isjson" tabindex="-1"><a class="header-anchor" href="#isjson" aria-hidden="true">#</a> isJson</h3>
<p>Simple boolean field to tell EventStoreDB if the event is stored as json, true by default.</p>
<h2 id="handling-concurrency" tabindex="-1"><a class="header-anchor" href="#handling-concurrency" aria-hidden="true">#</a> Handling concurrency</h2>
<p>When appending events to a stream you can supply a <em>stream state</em> or <em>stream revision</em>. Your client can use this to tell EventStoreDB what state or version you expect the stream to be in when you append. If the stream isn't in that state then an exception will be thrown.</p>
<p>For example if we try and append the same record twice expecting both times that the stream doesn't exist we will get an exception on the second:</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> eventDataOne <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
    Uuid<span class="token punctuation">.</span><span class="token function">NewUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">"some-event"</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{\"id\": \"1\" \"value\": \"some value\"}"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> eventDataTwo <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
    Uuid<span class="token punctuation">.</span><span class="token function">NewUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">"some-event"</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{\"id\": \"2\" \"value\": \"some other value\"}"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span>
    StreamState<span class="token punctuation">.</span>NoStream<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        eventDataOne
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// attempt to append the same event again</span>
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span>
    StreamState<span class="token punctuation">.</span>NoStream<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        eventDataTwo
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">EventData</span> eventDataOne <span class="token operator">=</span> <span class="token class-name">EventData</span>
        <span class="token punctuation">.</span><span class="token function">builderAsJson</span><span class="token punctuation">(</span>
                UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">"some-event"</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">TestEvent</span><span class="token punctuation">(</span>
                        <span class="token string">"1"</span><span class="token punctuation">,</span>
                        <span class="token string">"some value"</span>
                <span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">EventData</span> eventDataTwo <span class="token operator">=</span> <span class="token class-name">EventData</span>
        <span class="token punctuation">.</span><span class="token function">builderAsJson</span><span class="token punctuation">(</span>
                UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token string">"some-event"</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">TestEvent</span><span class="token punctuation">(</span>
                        <span class="token string">"2"</span><span class="token punctuation">,</span>
                        <span class="token string">"some other value"</span>
                <span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">AppendToStreamOptions</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">expectedRevision</span><span class="token punctuation">(</span><span class="token class-name">ExpectedRevision</span><span class="token punctuation">.</span>NO_STREAM<span class="token punctuation">)</span><span class="token punctuation">;</span>

client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span> options<span class="token punctuation">,</span> eventDataOne<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// attempt to append the same event again</span>
client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span> options<span class="token punctuation">,</span> eventDataTwo<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> eventOne <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> eventTwo <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"2"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some other value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span> eventOne<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> <span class="token constant">NO_STREAM</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// attempt to append the same event again</span>
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span> eventTwo<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> <span class="token constant">NO_STREAM</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token class-name">TestEvent</span> <span class="token punctuation">{</span>
    id<span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    important_data<span class="token punctuation">:</span> <span class="token string">"some value"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> event <span class="token operator">=</span> <span class="token class-name">EventData</span><span class="token punctuation">::</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string">"some-event"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token class-name">Uuid</span><span class="token punctuation">::</span><span class="token function">new_v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expected_revision</span><span class="token punctuation">(</span><span class="token class-name">ExpectedRevision</span><span class="token punctuation">::</span><span class="token class-name">NoStream</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _ <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> event<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token class-name">TestEvent</span> <span class="token punctuation">{</span>
    id<span class="token punctuation">:</span> <span class="token string">"2"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    important_data<span class="token punctuation">:</span> <span class="token string">"some other value"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> event <span class="token operator">=</span> <span class="token class-name">EventData</span><span class="token punctuation">::</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string">"some-event"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token class-name">Uuid</span><span class="token punctuation">::</span><span class="token function">new_v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _ <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"same-event-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> event<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> eventOne <span class="token operator">=</span> <span class="token generic-function"><span class="token function">jsonEvent</span><span class="token generic class-name"><span class="token operator">&lt;</span>SomeEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> eventTwo <span class="token operator">=</span> <span class="token generic-function"><span class="token function">jsonEvent</span><span class="token generic class-name"><span class="token operator">&lt;</span>SomeEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"2"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some other value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span> eventOne<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> <span class="token constant">NO_STREAM</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// attempt to append the same event again</span>
<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span> eventTwo<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> <span class="token constant">NO_STREAM</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div></CodeGroupItem>
</CodeGroup>
<p>There are three available stream states:</p>
<ul>
<li><code>Any</code></li>
<li><code>NoStream</code></li>
<li><code>StreamExists</code></li>
</ul>
<p>This check can be used to implement optimistic concurrency. When you retrieve a stream from EventStoreDB, you take note of the current version number, then when you save it back you can determine if somebody else has modified the record in the meantime.</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> clientOneRead <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">ReadStreamAsync</span><span class="token punctuation">(</span>
    Direction<span class="token punctuation">.</span>Forwards<span class="token punctuation">,</span>
    <span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span>
    StreamPosition<span class="token punctuation">.</span>Start<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">configureOperationOptions</span><span class="token punctuation">:</span> options <span class="token operator">=></span> options<span class="token punctuation">.</span>ThrowOnAppendFailure <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> clientOneRevision <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> clientOneRead<span class="token punctuation">.</span><span class="token function">LastAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Event<span class="token punctuation">.</span>EventNumber<span class="token punctuation">.</span><span class="token function">ToUInt64</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> clientTwoRead <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">ReadStreamAsync</span><span class="token punctuation">(</span>Direction<span class="token punctuation">.</span>Forwards<span class="token punctuation">,</span> <span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> StreamPosition<span class="token punctuation">.</span>Start<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> clientTwoRevision <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">await</span> clientTwoRead<span class="token punctuation">.</span><span class="token function">LastAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Event<span class="token punctuation">.</span>EventNumber<span class="token punctuation">.</span><span class="token function">ToUInt64</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> clientOneData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
    Uuid<span class="token punctuation">.</span><span class="token function">NewUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">"some-event"</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{\"id\": \"1\" \"value\": \"clientOne\"}"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span>
    clientOneRevision<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        clientOneData
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> clientTwoData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
    Uuid<span class="token punctuation">.</span><span class="token function">NewUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">"some-event"</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{\"id\": \"2\" \"value\": \"clientTwo\"}"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"no-stream-stream"</span><span class="token punctuation">,</span>
    clientTwoRevision<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> <span class="token punctuation">{</span>
        clientTwoData
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>
       <span class="token class-name">ReadStreamOptions</span> readStreamOptions <span class="token operator">=</span> <span class="token class-name">ReadStreamOptions</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">forwards</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">fromStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token class-name">ReadResult</span> result <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> readStreamOptions<span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ResolvedEvent</span><span class="token punctuation">></span></span> events <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">ResolvedEvent</span> lastEvent <span class="token operator">=</span> events<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>events<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">StreamRevision</span> revision <span class="token operator">=</span> lastEvent<span class="token punctuation">.</span><span class="token function">getEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getStreamRevision</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token class-name">EventData</span> clientOneData <span class="token operator">=</span> <span class="token class-name">EventData</span>
               <span class="token punctuation">.</span><span class="token function">builderAsJson</span><span class="token punctuation">(</span>
                       UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                       <span class="token string">"some-event"</span><span class="token punctuation">,</span>
                       <span class="token keyword">new</span> <span class="token class-name">TestEvent</span><span class="token punctuation">(</span>
                               <span class="token string">"1"</span><span class="token punctuation">,</span>
                               <span class="token string">"clientOne"</span>
                       <span class="token punctuation">)</span><span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token class-name">EventData</span> clientTwoData <span class="token operator">=</span> <span class="token class-name">EventData</span>
               <span class="token punctuation">.</span><span class="token function">builderAsJson</span><span class="token punctuation">(</span>
                       UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                       <span class="token string">"some-event"</span><span class="token punctuation">,</span>
                       <span class="token keyword">new</span> <span class="token class-name">TestEvent</span><span class="token punctuation">(</span>
                               <span class="token string">"2"</span><span class="token punctuation">,</span>
                               <span class="token string">"clientTwo"</span>
                       <span class="token punctuation">)</span><span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


       <span class="token class-name">AppendToStreamOptions</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">expectedRevision</span><span class="token punctuation">(</span>revision<span class="token punctuation">)</span><span class="token punctuation">;</span>

       client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> options<span class="token punctuation">,</span> clientOneData<span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> options<span class="token punctuation">,</span> clientTwoData<span class="token punctuation">)</span>
               <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  fromRevision<span class="token operator">:</span> <span class="token constant">START</span><span class="token punctuation">,</span>
  direction<span class="token operator">:</span> <span class="token constant">FORWARDS</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> revision <span class="token operator">=</span> <span class="token constant">NO_STREAM</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">{</span> event <span class="token punctuation">}</span> <span class="token keyword">of</span> events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  revision <span class="token operator">=</span> event<span class="token operator">?.</span>revision <span class="token operator">??</span> revision<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> clientOneEvent <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> clientOneEvent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> revision<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> clientTwoEvent <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"2"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> clientTwoEvent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> revision<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> options <span class="token operator">=</span> <span class="token class-name">ReadStreamOptions</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">position</span><span class="token punctuation">(</span><span class="token class-name">StreamPosition</span><span class="token punctuation">::</span><span class="token class-name">End</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> last_event <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">read_stream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> <span class="token class-name">Single</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span>
    <span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">"we expect the stream to at least exist."</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">expect</span><span class="token punctuation">(</span><span class="token string">"we expect the stream to have at least one event."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token class-name">TestEvent</span> <span class="token punctuation">{</span>
    id<span class="token punctuation">:</span> <span class="token string">"1"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    important_data<span class="token punctuation">:</span> <span class="token string">"clientOne"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> event <span class="token operator">=</span> <span class="token class-name">EventData</span><span class="token punctuation">::</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string">"some-event"</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token class-name">Uuid</span><span class="token punctuation">::</span><span class="token function">new_v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">expected_revision</span><span class="token punctuation">(</span><span class="token class-name">ExpectedRevision</span><span class="token punctuation">::</span><span class="token class-name">Exact</span><span class="token punctuation">(</span>
    last_event<span class="token punctuation">.</span><span class="token function">get_original_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>revision<span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _ <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> event<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> data <span class="token operator">=</span> <span class="token class-name">TestEvent</span> <span class="token punctuation">{</span>
    id<span class="token punctuation">:</span> <span class="token string">"2"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    important_data<span class="token punctuation">:</span> <span class="token string">"clientTwo"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> event <span class="token operator">=</span> <span class="token class-name">EventData</span><span class="token punctuation">::</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string">"some-event"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>data<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token class-name">Uuid</span><span class="token punctuation">::</span><span class="token function">new_v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _ <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> event<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">readStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>SomeEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  fromRevision<span class="token operator">:</span> <span class="token constant">START</span><span class="token punctuation">,</span>
  direction<span class="token operator">:</span> <span class="token constant">FORWARDS</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> revision<span class="token operator">:</span> AppendExpectedRevision <span class="token operator">=</span> <span class="token constant">NO_STREAM</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token keyword">await</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">{</span> event <span class="token punctuation">}</span> <span class="token keyword">of</span> events<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  revision <span class="token operator">=</span> event<span class="token operator">?.</span>revision <span class="token operator">??</span> revision<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> clientOneEvent <span class="token operator">=</span> <span class="token generic-function"><span class="token function">jsonEvent</span><span class="token generic class-name"><span class="token operator">&lt;</span>SomeEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"1"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> clientOneEvent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> revision<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> clientTwoEvent <span class="token operator">=</span> <span class="token generic-function"><span class="token function">jsonEvent</span><span class="token generic class-name"><span class="token operator">&lt;</span>SomeEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  id<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  type<span class="token operator">:</span> <span class="token string">"some-event"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    id<span class="token operator">:</span> <span class="token string">"2"</span><span class="token punctuation">,</span>
    value<span class="token operator">:</span> <span class="token string">"some value"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"concurrency-stream"</span><span class="token punctuation">,</span> clientTwoEvent<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  expectedRevision<span class="token operator">:</span> revision<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div></CodeGroupItem>
</CodeGroup>
<!-- ## Options TODO -->
<h2 id="user-credentials" tabindex="-1"><a class="header-anchor" href="#user-credentials" aria-hidden="true">#</a> User credentials</h2>
<p>You can provide user credentials to be used to append the data as follows. This will override the default credentials set on the connection.</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"some-stream"</span><span class="token punctuation">,</span>
    StreamState<span class="token punctuation">.</span>Any<span class="token punctuation">,</span>
    <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> eventData <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">userCredentials</span><span class="token punctuation">:</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UserCredentials</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">,</span> <span class="token string">"changeit"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">cancellationToken</span><span class="token punctuation">:</span> cancellationToken
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">UserCredentials</span> credentials <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">UserCredentials</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">,</span> <span class="token string">"changeit"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">AppendToStreamOptions</span> options <span class="token operator">=</span> <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span>credentials<span class="token punctuation">)</span><span class="token punctuation">;</span>

client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> options<span class="token punctuation">,</span> eventData<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> credentials <span class="token operator">=</span> <span class="token punctuation">{</span>
  username<span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">,</span>
  password<span class="token operator">:</span> <span class="token string">"changeit"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> event<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  credentials<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> options <span class="token operator">=</span>
    <span class="token class-name">AppendToStreamOptions</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token class-name">Credentials</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">,</span> <span class="token string">"changeit"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> _ <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>options<span class="token punctuation">,</span> event<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> credentials <span class="token operator">=</span> <span class="token punctuation">{</span>
  username<span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">,</span>
  password<span class="token operator">:</span> <span class="token string">"changeit"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> event<span class="token punctuation">,</span> <span class="token punctuation">{</span>
  credentials<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></CodeGroupItem>
</CodeGroup>
</template>
