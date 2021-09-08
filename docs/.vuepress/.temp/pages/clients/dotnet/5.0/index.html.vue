<template><h1 id="quick-tour" tabindex="-1"><a class="header-anchor" href="#quick-tour" aria-hidden="true">#</a> Quick tour</h1>
<p>This is a quick tour into the basic operations with EventStoreDB using the TCP client. We will look at creating a connection, appending an event and reading an event.</p>
<h2 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements" aria-hidden="true">#</a> Requirements</h2>
<p>These examples have the following requirements:</p>
<ul>
<li>At least <a href="https://dotnet.microsoft.com/download" target="_blank" rel="noopener noreferrer">.NET Core SDK 3.1<OutboundLink/></a></li>
<li><a href="https://www.docker.com/get-started" target="_blank" rel="noopener noreferrer">Docker<OutboundLink/></a></li>
<li>A reference to the <a href="https://www.nuget.org/packages/EventStore.Client/" target="_blank" rel="noopener noreferrer">EventStore.Client<OutboundLink/></a> NuGet package</li>
</ul>
<h2 id="run-the-server" tabindex="-1"><a class="header-anchor" href="#run-the-server" aria-hidden="true">#</a> Run the server</h2>
<p>To run the EventStoreDB, create a new file called <code>docker-compose.yml</code> and copy the following contents into it:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3.7'</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>

  <span class="token key atrule">eventstore</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> esdb<span class="token punctuation">-</span>docs
    <span class="token key atrule">image</span><span class="token punctuation">:</span> eventstore/eventstore<span class="token punctuation">:</span>release<span class="token punctuation">-</span>5.0.10
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">'2113:2113'</span>
      <span class="token punctuation">-</span> <span class="token string">'1113:1113'</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">EVENTSTORE_EXT_HTTP_PORT</span><span class="token punctuation">:</span> <span class="token number">2113</span>
      <span class="token key atrule">EVENTSTORE_EXT_TCP_PORT</span><span class="token punctuation">:</span> <span class="token number">1113</span>
      <span class="token key atrule">EVENTSTORE_RUN_PROJECTIONS</span><span class="token punctuation">:</span> all
      <span class="token key atrule">EVENTSTORE_START_STANDARD_PROJECTIONS</span><span class="token punctuation">:</span> <span class="token string">'true'</span>
      <span class="token key atrule">PROJECTION_THREADS</span><span class="token punctuation">:</span> <span class="token number">8</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>Then run the command.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose up
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>This will launch a new instance of the EventStoreDB server.</p>
<h2 id="connect-to-eventstoredb" tabindex="-1"><a class="header-anchor" href="#connect-to-eventstoredb" aria-hidden="true">#</a> Connect to EventStoreDB</h2>
<p><a href="https://www.nuget.org/packages/EventStore.Client" target="_blank" rel="noopener noreferrer">Install the .NET client API<OutboundLink/></a> package to your project using your preferred method.</p>
<p>And require it in your code:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token namespace">EventStore<span class="token punctuation">.</span>ClientAPI</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">EventStore<span class="token punctuation">.</span>ClientAPI<span class="token punctuation">.</span>Projections</span><span class="token punctuation">;</span>
<span class="token keyword">using</span> <span class="token namespace">EventStore<span class="token punctuation">.</span>ClientAPI<span class="token punctuation">.</span>SystemData</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>To use a client API, you use port <code>1113</code> and create a connection:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> connection <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Uri</span><span class="token punctuation">(</span><span class="token string">"tcp://admin:changeit@localhost:1113"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">ConnectAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>It will create a connection to EventStoreDB running locally in Docker container using the TCP protocol.</p>
<h2 id="appending-events" tabindex="-1"><a class="header-anchor" href="#appending-events" aria-hidden="true">#</a> Appending events</h2>
<p>The most basic operation is to append a single event to the database:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> streamName <span class="token operator">=</span> <span class="token string">"newstream"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> eventType  <span class="token operator">=</span> <span class="token string">"event-type"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> data       <span class="token operator">=</span> <span class="token string">"{ \"a\":\"2\"}"</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token class-name"><span class="token keyword">string</span></span> metadata   <span class="token operator">=</span> <span class="token string">"{}"</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> eventPayload <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
    <span class="token named-parameter punctuation">eventId</span><span class="token punctuation">:</span> Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">type</span><span class="token punctuation">:</span> eventType<span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">isJson</span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">data</span><span class="token punctuation">:</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token named-parameter punctuation">metadata</span><span class="token punctuation">:</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> result <span class="token operator">=</span> <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>streamName<span class="token punctuation">,</span> ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> eventPayload<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="reading-events" tabindex="-1"><a class="header-anchor" href="#reading-events" aria-hidden="true">#</a> Reading events</h2>
<p>After you wrote an event to the database, you can then read it back. Use the following method passing the stream name, the start point in the stream, the number of events to read and whether to follow links to the event data:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> readEvents <span class="token operator">=</span> <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">ReadStreamEventsForwardAsync</span><span class="token punctuation">(</span>streamName<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> evt <span class="token keyword">in</span> readEvents<span class="token punctuation">.</span>Events<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>evt<span class="token punctuation">.</span>Event<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></template>
