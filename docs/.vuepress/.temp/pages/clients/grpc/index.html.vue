<template><h1 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting started</h1>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">ReadStreamAsync</span><span class="token punctuation">(</span>
    Direction<span class="token punctuation">.</span>Forwards<span class="token punctuation">,</span>
    <span class="token string">"some-stream"</span><span class="token punctuation">,</span>
    StreamPosition<span class="token punctuation">.</span>Start<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">cancellationToken</span><span class="token punctuation">:</span> cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> events <span class="token operator">=</span> <span class="token keyword">await</span> result<span class="token punctuation">.</span><span class="token function">ToListAsync</span><span class="token punctuation">(</span>cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">ReadStreamOptions</span> options <span class="token operator">=</span> <span class="token class-name">ReadStreamOptions</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">forwards</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">fromStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">ReadResult</span> result <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ResolvedEvent</span><span class="token punctuation">></span></span> events <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span><span class="token constant">STREAM_NAME</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  direction<span class="token operator">:</span> <span class="token constant">FORWARDS</span><span class="token punctuation">,</span>
  fromRevision<span class="token operator">:</span> <span class="token constant">START</span><span class="token punctuation">,</span>
  maxCount<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> result <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">read_stream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token class-name">Default</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">ReadResult</span><span class="token punctuation">::</span><span class="token class-name">Ok</span><span class="token punctuation">(</span>events<span class="token punctuation">)</span> <span class="token operator">=</span> result <span class="token punctuation">{</span>
    <span class="token comment">// Doing something productive with the events.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">readStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>TestEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token constant">STREAM_NAME</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  direction<span class="token operator">:</span> <span class="token constant">FORWARDS</span><span class="token punctuation">,</span>
  fromRevision<span class="token operator">:</span> <span class="token constant">START</span><span class="token punctuation">,</span>
  maxCount<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></CodeGroupItem>
</CodeGroup>
<p>Get started by connecting your application to EventStoreDB. Complete the form below to generate the connection string and examples for different languages and SDKs.</p>
<h2 id="connection-details" tabindex="-1"><a class="header-anchor" href="#connection-details" aria-hidden="true">#</a> Connection details</h2>
<p>This page can help you to generate the connection string for a single-node or cluster deployment of EventStoreDB. You can use one of the following methods:</p>
<ul>
<li>Use the <a href="https://eventstore.com/cloud" target="_blank" rel="noopener noreferrer">Event Store Cloud<OutboundLink/></a> cluster ID.</li>
<li>Use the address of any node of a self-hosted cluster or single-node deployment. You need to have access to the node for the discovery feature to work.</li>
<li>Specify the deployment details manually.</li>
</ul>
<h2 id="connecting-to-eventstoredb" tabindex="-1"><a class="header-anchor" href="#connecting-to-eventstoredb" aria-hidden="true">#</a> Connecting to EventStoreDB</h2>
<h3 id="required-packages" tabindex="-1"><a class="header-anchor" href="#required-packages" aria-hidden="true">#</a> Required packages</h3>
<p>Install the client SDK package to your project.</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-text ext-text"><pre v-pre class="language-text"><code>$ dotnet add package EventStore.Client.Grpc.Streams --version 21.2
</code></pre></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-text ext-text"><pre v-pre class="language-text"><code># Maven
&lt;dependency>
  &lt;groupId>com.eventstore&lt;/groupId>
  &lt;artifactId>db-client-java&lt;/artifactId>
  &lt;version>0.5&lt;/version>
&lt;/dependency>

# Gradle
implementation 'com.eventstore:db-client-java:0.5'

# SBT
libraryDependencies += "com.eventstore" % "db-client-java" % "0.6"
</code></pre></div></CodeGroupItem>
<p>::: JavaScript</p>
<div class="language-text ext-text"><pre v-pre class="language-text"><code># Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
</code></pre></div><p>:::</p>
<CodeGroupItem title="Rust">
<div class="language-text ext-text"><pre v-pre class="language-text"><code>No additional configuration is needed having Rust installed. Go check https://rustup.rs.
</code></pre></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-text ext-text"><pre v-pre class="language-text"><code># Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
</code></pre></div></CodeGroupItem>
</CodeGroup>
<div class="custom-container warning"><p class="custom-container-title">Preview clients</p>
<p>The following SDKs are currently in preview and can get API changes:</p>
<ul>
<li>NodeJS</li>
<li>Java</li>
<li>Go</li>
<li>Rust</li>
</ul>
</div>
<h3 id="connection-string" tabindex="-1"><a class="header-anchor" href="#connection-string" aria-hidden="true">#</a> Connection string</h3>
<p>Each SDK has its own way to configure the client, but it's always possible to use the connection string. The connection string below is generated according to the configuration you specified above, and it should work with each official SDK of EventStoreDB.</p>
<p>You can either put the connection string in the input box below, or use the <RouterLink to="/clients/grpc/">connection details</RouterLink> page to generate the connection string from your EventStoreDB deployment.</p>
<h3 id="creating-a-client" tabindex="-1"><a class="header-anchor" href="#creating-a-client" aria-hidden="true">#</a> Creating a client</h3>
<p>First thing first, we need a client.</p>
<xode-group>
<xode-block title="C#" code="connectionString">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> EventStoreClientSettings
    <span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token string">"{connectionString}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventStoreClient</span><span class="token punctuation">(</span>settings<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></xode-block>
<xode-block title="Java" code="connectionString">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">EventStoreDBClientSettings</span> settings <span class="token operator">=</span> <span class="token class-name">EventStoreDBConnectionString</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token string">"{connectionString}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">EventStoreDBClient</span> client <span class="token operator">=</span> <span class="token class-name">EventStoreDBClient</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>settings<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></xode-block>
<xode-block title="JavaScript" code="connectionString">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> client <span class="token operator">=</span> EventStoreDBClient<span class="token punctuation">.</span>connectionString<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">esdb+discover://</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">CLOUD_ID</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.mesdb.eventstore.cloud</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></xode-block>
<xode-block title="Rust" code="connectionString">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> settings <span class="token operator">=</span> <span class="token string">"{connectionString}"</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> client <span class="token operator">=</span> <span class="token class-name">Client</span><span class="token punctuation">::</span><span class="token function">new</span><span class="token punctuation">(</span>settings<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></xode-block>
<xode-block title="TypeScript" code="connectionString">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> client <span class="token operator">=</span> EventStoreDBClient<span class="token punctuation">.</span>connectionString<span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">esdb+discover://</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token constant">CLOUD_ID</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.mesdb.eventstore.cloud</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></xode-block>
</xode-group>
<p>The client instance can be used as a singleton across the whole application. It doesn't need to open or close the connection.</p>
<h3 id="creating-an-event" tabindex="-1"><a class="header-anchor" href="#creating-an-event" aria-hidden="true">#</a> Creating an event</h3>
<p>You can write anything to EventStoreDB as events. The client needs a byte array as the event payload. Normally, you'd use a serialized object and it's up to you to choose the serialization method.</p>
<div class="custom-container tip"><p class="custom-container-title">Server-side projections</p>
<p>User-defined server-side projections require events to be serialized to JSON format.</p>
<p>We use JSON for serialization in the documentation examples.</p>
</div>
<p>The code snippet below creates an event object instance, serializes it and puts it as payload to the <code>EventData</code> structure, which the client is able to write to the database.</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> evt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestEvent</span>
<span class="token punctuation">{</span>
    EntityId <span class="token operator">=</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token string">"N"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    ImportantData <span class="token operator">=</span> <span class="token string">"I wrote my first event!"</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> eventData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
    Uuid<span class="token punctuation">.</span><span class="token function">NewUuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">"TestEvent"</span><span class="token punctuation">,</span>
    JsonSerializer<span class="token punctuation">.</span><span class="token function">SerializeToUtf8Bytes</span><span class="token punctuation">(</span>evt<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">TestEvent</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TestEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
event<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span>UUID<span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
event<span class="token punctuation">.</span><span class="token function">setImportantData</span><span class="token punctuation">(</span><span class="token string">"I wrote my first event!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">EventData</span> eventData <span class="token operator">=</span> <span class="token class-name">EventData</span>
        <span class="token punctuation">.</span><span class="token function">builderAsJson</span><span class="token punctuation">(</span><span class="token string">"TestEvent"</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>
    <span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token function">jsonEvent</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      type<span class="token operator">:</span> <span class="token string">"TestEvent"</span><span class="token punctuation">,</span>
      data<span class="token operator">:</span> <span class="token punctuation">{</span>
        entityId<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        importantData<span class="token operator">:</span> <span class="token string">"I wrote my first event!"</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> event <span class="token operator">=</span> <span class="token class-name">TestEvent</span> <span class="token punctuation">{</span>
    id<span class="token punctuation">:</span> <span class="token class-name">Uuid</span><span class="token punctuation">::</span><span class="token function">new_v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    important_data<span class="token punctuation">:</span> <span class="token string">"I wrote my first event!"</span><span class="token punctuation">.</span><span class="token function">to_string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">let</span> event_data <span class="token operator">=</span> <span class="token class-name">EventData</span><span class="token punctuation">::</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token string">"TestEvent"</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">id</span><span class="token punctuation">(</span><span class="token class-name">Uuid</span><span class="token punctuation">::</span><span class="token function">new_v4</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">type</span> <span class="token class-name">TestEvent</span> <span class="token operator">=</span> JSONEventType<span class="token operator">&lt;</span>
  <span class="token string">"TestEvent"</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    entityId<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
    importantData<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token generic-function"><span class="token function">jsonEvent</span><span class="token generic class-name"><span class="token operator">&lt;</span>TestEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  type<span class="token operator">:</span> <span class="token string">"TestEvent"</span><span class="token punctuation">,</span>
  data<span class="token operator">:</span> <span class="token punctuation">{</span>
    entityId<span class="token operator">:</span> <span class="token function">uuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    importantData<span class="token operator">:</span> <span class="token string">"I wrote my first event!"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></CodeGroupItem>
</CodeGroup>
<h3 id="appending-events" tabindex="-1"><a class="header-anchor" href="#appending-events" aria-hidden="true">#</a> Appending events</h3>
<p>Each event in the database has its own unique identifier (UUID). The database uses it to ensure idempotent writes, but it only works if you specify the stream revision when appending events to the stream.</p>
<p>In the snippet below, we append the event to the stream <code>some-stream</code>.</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"some-stream"</span><span class="token punctuation">,</span>
    StreamState<span class="token punctuation">.</span>Any<span class="token punctuation">,</span>
    <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> eventData <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">cancellationToken</span><span class="token punctuation">:</span> cancellationToken
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> eventData<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token constant">STREAM_NAME</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code>client
    <span class="token punctuation">.</span><span class="token function">append_to_stream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token class-name">Default</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> event_data<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">appendToStream</span><span class="token punctuation">(</span><span class="token constant">STREAM_NAME</span><span class="token punctuation">,</span> event<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></CodeGroupItem>
</CodeGroup>
<p>Here we are appending events without checking if the stream exists or if the stream version matches the expected event version. See more advanced scenarios in <RouterLink to="/clients/appending-events/">appending events documentation</RouterLink>.</p>
<h3 id="reading-events" tabindex="-1"><a class="header-anchor" href="#reading-events" aria-hidden="true">#</a> Reading events</h3>
<p>Finally, we can read events back from the <code>some-stream</code> stream.</p>
<CodeGroup>
<CodeGroupItem title="C#">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">ReadStreamAsync</span><span class="token punctuation">(</span>
    Direction<span class="token punctuation">.</span>Forwards<span class="token punctuation">,</span>
    <span class="token string">"some-stream"</span><span class="token punctuation">,</span>
    StreamPosition<span class="token punctuation">.</span>Start<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">cancellationToken</span><span class="token punctuation">:</span> cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> events <span class="token operator">=</span> <span class="token keyword">await</span> result<span class="token punctuation">.</span><span class="token function">ToListAsync</span><span class="token punctuation">(</span>cancellationToken<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Java">
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">ReadStreamOptions</span> options <span class="token operator">=</span> <span class="token class-name">ReadStreamOptions</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">forwards</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">fromStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">ReadResult</span> result <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ResolvedEvent</span><span class="token punctuation">></span></span> events <span class="token operator">=</span> result<span class="token punctuation">.</span><span class="token function">getEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="JavaScript">
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">readStream</span><span class="token punctuation">(</span><span class="token constant">STREAM_NAME</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  direction<span class="token operator">:</span> <span class="token constant">FORWARDS</span><span class="token punctuation">,</span>
  fromRevision<span class="token operator">:</span> <span class="token constant">START</span><span class="token punctuation">,</span>
  maxCount<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Rust">
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code><span class="token keyword">let</span> result <span class="token operator">=</span> client
    <span class="token punctuation">.</span><span class="token function">read_stream</span><span class="token punctuation">(</span><span class="token string">"some-stream"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token class-name">Default</span><span class="token punctuation">::</span><span class="token function">default</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token keyword">await</span><span class="token operator">?</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">ReadResult</span><span class="token punctuation">::</span><span class="token class-name">Ok</span><span class="token punctuation">(</span>events<span class="token punctuation">)</span> <span class="token operator">=</span> result <span class="token punctuation">{</span>
    <span class="token comment">// Doing something productive with the events.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="TypeScript">
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">const</span> events <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">readStream</span><span class="token generic class-name"><span class="token operator">&lt;</span>TestEvent<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token constant">STREAM_NAME</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  direction<span class="token operator">:</span> <span class="token constant">FORWARDS</span><span class="token punctuation">,</span>
  fromRevision<span class="token operator">:</span> <span class="token constant">START</span><span class="token punctuation">,</span>
  maxCount<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></CodeGroupItem>
</CodeGroup>
<p>When you read events from the stream, you get a collection of <code>ResolvedEvent</code> structures. The event payload is returned as a byte array and needs to be deserialized. See more advanced scenarios in <RouterLink to="/clients/grpc/reading-events.html">reading events documentation</RouterLink>.</p>
</template>
