<template><h1 id="connecting-to-eventstoredb" tabindex="-1"><a class="header-anchor" href="#connecting-to-eventstoredb" aria-hidden="true">#</a> Connecting to EventStoreDB</h1>
<p>Describe connecting to the single node and to the cluster.</p>
<p>Gossip seeds, using ip addresses and DNS.</p>
<p>The .NET Client API communicates with EventStoreDB over TCP, using length-prefixed serialised protocol buffers. The API allows for reading and appending operations, as well as for subscriptions to individual event streams or all events appended.</p>
<h2 id="eventstoreconnection" tabindex="-1"><a class="header-anchor" href="#eventstoreconnection" aria-hidden="true">#</a> EventStoreConnection</h2>
<p>The <code>EventStoreConnection</code> class maintains a full-duplex connection between the client and the EventStoreDB server. <code>EventStoreConnection</code> is thread-safe, and we recommend that you create one node per application.</p>
<p>EventStoreDB handles all connections asynchronously, returning either a <code>Task</code> or a <code>Task&lt;T&gt;</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>To get maximum performance from a non-blocking connection, we recommend you use it asynchronously.</p>
</div>
<h2 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start" aria-hidden="true">#</a> Quick start</h2>
<p>The code below shows how to connect to an EventStoreDB server, appends to a stream, and read back the events. For more detailed information, read the full pages for connecting to a server using <a href="#connection-string">connection string</a> and <a href="#connection-settings">connection settings</a>, <RouterLink to="/clients/dotnet/20.10/reading/">reading events</RouterLink> and <RouterLink to="/clients/dotnet/20.10/appending/">appending to a stream</RouterLink></p>
<CodeGroup>
<CodeGroupItem title="JSON format event">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> conn <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Uri</span><span class="token punctuation">(</span><span class="token string">"tcp://admin:changeit@localhost:1113"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">ConnectAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> data     <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{\"a\":\"2\"}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> metadata <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> evt      <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"testEvent"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> data<span class="token punctuation">,</span> metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span><span class="token string">"test-stream"</span><span class="token punctuation">,</span> ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> evt<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> streamEvents  <span class="token operator">=</span> <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">ReadStreamEventsForwardAsync</span><span class="token punctuation">(</span><span class="token string">"test-stream"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> returnedEvent <span class="token operator">=</span> streamEvents<span class="token punctuation">.</span>Events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Event<span class="token punctuation">;</span>

Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>
    <span class="token string">"Read event with data: {0}, metadata: {1}"</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>returnedEvent<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>returnedEvent<span class="token punctuation">.</span>Metadata<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></CodeGroupItem>
<CodeGroupItem title="Plain-text format event">
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> conn <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Uri</span><span class="token punctuation">(</span><span class="token string">"tcp://admin:changeit@localhost:1113"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">ConnectAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> data     <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"some data"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> metadata <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"some metadata"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> evt      <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"testEvent"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> data<span class="token punctuation">,</span> metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span><span class="token string">"test-stream"</span><span class="token punctuation">,</span> ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> evt<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> streamEvents  <span class="token operator">=</span> <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">ReadStreamEventsForwardAsync</span><span class="token punctuation">(</span><span class="token string">"test-stream"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> returnedEvent <span class="token operator">=</span> streamEvents<span class="token punctuation">.</span>Events<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Event<span class="token punctuation">;</span>

Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>
    <span class="token string">"Read event with data: {0}, metadata: {1}"</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>returnedEvent<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>returnedEvent<span class="token punctuation">.</span>Metadata<span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div></CodeGroupItem>
</CodeGroup>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>We recommended using the JSON format for data and metadata.</p>
</div>
<h2 id="connection-string" tabindex="-1"><a class="header-anchor" href="#connection-string" aria-hidden="true">#</a> Connection string</h2>
<p>Many of the <code>EventStoreConnection.Create</code> overloads accept a connection string that you can use to control settings of the connection. A benefit to having these as a connection string instead of using the fluent API is that you can change them between environments without recompiling (i.e. a single node in <code>dev</code> and a cluster in <code>production</code>).</p>
<p>For example, the following code will create a connection to an EventStoreDB local node, and then open the connection:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> connectionString <span class="token operator">=</span> <span class="token string">"ConnectTo=tcp://admin:changeit@localhost:1113;"</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> connection <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>connectionString<span class="token punctuation">,</span> builder<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">ConnectAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Here are all available overloads for the <code>Create</code> methods of the <code>EventStoreConnection</code> class, which use the connection string:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>Create(string connectionString)</code></td>
<td style="text-align:left">Connects to EventStoreDB with settings from connection string</td>
</tr>
<tr>
<td style="text-align:left"><code>Create(string connectionString, ConnectionSettingsBuilder builder)</code></td>
<td style="text-align:left">Connects to EventStoreDB by merging connection string settings with pre-populated builder for additional settings</td>
</tr>
</tbody>
</table>
<p>The connection string format should look familiar to those who have used connection strings in the past. It consists of a series of key/value pairs separated by semicolons.</p>
<p>You can set the following values using the connection string:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Format</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">ConnectTo</td>
<td style="text-align:left">A URI in format described above to connect to</td>
<td style="text-align:left">The URI to connect to</td>
</tr>
<tr>
<td style="text-align:left">GossipSeeds</td>
<td style="text-align:left">Comma separated list of ip:port</td>
<td style="text-align:left">A list of seeds to try to discover from</td>
</tr>
<tr>
<td style="text-align:left">ClusterDns</td>
<td style="text-align:left">String</td>
<td style="text-align:left">The DNS name of the cluster for discovery</td>
</tr>
<tr>
<td style="text-align:left">ExternalGossipPort</td>
<td style="text-align:left">Integer</td>
<td style="text-align:left">The port to try to gossip on</td>
</tr>
<tr>
<td style="text-align:left">DefaultUserCredentials</td>
<td style="text-align:left">String in format username:password</td>
<td style="text-align:left">The default credentials for the connection</td>
</tr>
<tr>
<td style="text-align:left">MaxQueueSize</td>
<td style="text-align:left">Integer</td>
<td style="text-align:left">Maximum number of outstanding operations</td>
</tr>
<tr>
<td style="text-align:left">MaxConcurrentItems</td>
<td style="text-align:left">Integer</td>
<td style="text-align:left">Maximum number of concurrent async operations</td>
</tr>
<tr>
<td style="text-align:left">MaxRetries</td>
<td style="text-align:left">Integer</td>
<td style="text-align:left">Maximum number of retry attempts</td>
</tr>
<tr>
<td style="text-align:left">MaxReconnections</td>
<td style="text-align:left">Integer</td>
<td style="text-align:left">The maximum number of times to try reconnecting</td>
</tr>
<tr>
<td style="text-align:left">RequireMaster</td>
<td style="text-align:left">True/false</td>
<td style="text-align:left">If set the server will only process if it is master</td>
</tr>
<tr>
<td style="text-align:left">ReconnectionDelay</td>
<td style="text-align:left">Integer (milliseconds)</td>
<td style="text-align:left">The delay before attempting to reconnect</td>
</tr>
<tr>
<td style="text-align:left">OperationTimeout</td>
<td style="text-align:left">Integer (milliseconds)</td>
<td style="text-align:left">The time before considering an operation timed out</td>
</tr>
<tr>
<td style="text-align:left">OperationTimeoutCheckPeriod</td>
<td style="text-align:left">Integer (milliseconds)</td>
<td style="text-align:left">The frequency in which to check timeouts</td>
</tr>
<tr>
<td style="text-align:left">UseSslConnection</td>
<td style="text-align:left">True/false</td>
<td style="text-align:left">Whether to use SSL for this connection</td>
</tr>
<tr>
<td style="text-align:left">TargetHost</td>
<td style="text-align:left">String</td>
<td style="text-align:left">The hostname expected on the certificate</td>
</tr>
<tr>
<td style="text-align:left">ValidateServer</td>
<td style="text-align:left">True/false</td>
<td style="text-align:left">Whether to validate the remote server</td>
</tr>
<tr>
<td style="text-align:left">FailOnNoServerResponse</td>
<td style="text-align:left">True/False</td>
<td style="text-align:left">Whether to fail on no server response</td>
</tr>
<tr>
<td style="text-align:left">HeartbeatInterval</td>
<td style="text-align:left">Integer (milliseconds)</td>
<td style="text-align:left">The interval at which to send the server a heartbeat</td>
</tr>
<tr>
<td style="text-align:left">HeartbeatTimeout</td>
<td style="text-align:left">Integer (milliseconds)</td>
<td style="text-align:left">The amount of time to receive a heartbeat response before timing out</td>
</tr>
<tr>
<td style="text-align:left">MaxDiscoverAttempts</td>
<td style="text-align:left">Integer</td>
<td style="text-align:left">The maximum number of attempts to try to discover the cluster</td>
</tr>
<tr>
<td style="text-align:left">GossipTimeout</td>
<td style="text-align:left">Integer (milliseconds)</td>
<td style="text-align:left">The amount of time before timing out a gossip response</td>
</tr>
<tr>
<td style="text-align:left">VerboseLogging</td>
<td style="text-align:left">True/false</td>
<td style="text-align:left">Enables verbose logging</td>
</tr>
<tr>
<td style="text-align:left">Compatibility Mode</td>
<td style="text-align:left">auto, 20</td>
<td style="text-align:left">Enables the client to connect to either server configuration without needing to change the client's connection settings</td>
</tr>
</tbody>
</table>
<p>You can specify only one of <code>ConnectTo</code>, <code>ClusterDns</code> and <code>GossipSeeds</code>. Also, you'd only need to define <code>ExternalGossipPort</code> if you connect to the cluster using the DNS name (<code>ClusterDns</code>). The gossip port is usually the external HTTP port. When connecting to the cluster using <code>GossipSeeds</code>, you need to specify the gossip port for each node address in the list of seeds.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>You can also use spacing instead of camel casing in your connection string.</p>
</div>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ConnectTo=tcp://admin:changeit@localhost:1113; HeartBeatTimeout=500
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Sets the connection string to connect to <code>localhost</code> on the default port and sets the heartbeat timeout to 500ms.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Connect To = tcp://admin:changeit@localhost:1113; HeartBeat Timeout = 500
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Using spaces:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ConnectTo=discover://admin:changeit@mycluster:3114; HeartBeatTimeout=500
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Tells the connection to try gossiping to a manager node found under the DNS <code>mycluster</code> at port <code>3114</code> to connect to the cluster.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>GossipSeeds=192.168.0.2:1111,192.168.0.3:1111; HeartBeatTimeout=500
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Tells the connection to try gossiping to the gossip seeds <code>192.168.0.2</code> or <code>192.168.0.3</code> on port '1111' to discover information about the cluster.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>You can also use the <code>ConnectionString</code> class to return a <code>ConnectionSettings</code> object.</p>
</div>
<h2 id="connection-settings" tabindex="-1"><a class="header-anchor" href="#connection-settings" aria-hidden="true">#</a> Connection settings</h2>
<p>The <code>EventStoreConnection</code> class uses the static <code>Create</code> methods to create a new connection. All method overloads allow you to specify a name for the connection, which the connection returns when it raises events (see <a href="#connection-events">Connection Events</a>).</p>
<p>Instances of <code>ConnectionSettings</code> are created using a fluent builder class:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settingsBuilder <span class="token operator">=</span> ConnectionSettings<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>This creates an instance of <code>ConnectionSettingsBuilder</code> with default settings. You can override these by chaining the additional builder methods described below. When you have a builder with all the settings configured, use the <code>Build</code> method to create the <code>ConnectionSettings</code> instance and then use it to create a connection:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> settingsBuilder<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> connection <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>settings<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Settings builder supports fluent API, so each of its configuration methods returns the reference to itself. It allows you to chain the configuration calls, finalising it by the <code>Build</code> method call:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> ConnectionSettings
    <span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">KeepReconnecting</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> connection <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>
    settings<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Uri</span><span class="token punctuation">(</span><span class="token string">"tcp://admin:changeit@localhost:1113"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>You can also pass the builder instead of the <code>ConnectionSettings</code> instance. In this case, the builder will be implicitly converted to the settings instance by calling the <code>Build</code> method under the hood.</p>
<p>Here are all available overloads for the <code>Create</code> methods of the <code>EventStoreConnection</code> class, which use connection settings:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>Create(ConnectionSettings connectionSettings)</code></td>
<td style="text-align:left">Connects to EventStoreDB using specified settings</td>
</tr>
<tr>
<td style="text-align:left"><code>Create(Uri uri)</code></td>
<td style="text-align:left">Connects to EventStoreDB (see URIs below) with default settings</td>
</tr>
<tr>
<td style="text-align:left"><code>Create(ConnectionSettings connectionSettings, Uri uri)</code></td>
<td style="text-align:left">Connects to EventStoreDB (see URIs below) with specified settings</td>
</tr>
<tr>
<td style="text-align:left"><code>Create(string connectionString)</code></td>
<td style="text-align:left">Connects to EventStoreDB with settings from connection string</td>
</tr>
<tr>
<td style="text-align:left"><code>Create(string connectionString, ConnectionSettingsBuilder builder)</code></td>
<td style="text-align:left">Connects to EventStoreDB by merging connection string settings with pre-populated builder for additional settings</td>
</tr>
<tr>
<td style="text-align:left"><code>Create(ConnectionSettings connectionSettings, IEndPointDiscover endPointDiscover)</code></td>
<td style="text-align:left">Connects to an EventStoreDB cluster with custom settings.</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The connection returned by these methods is inactive. Use the <code>ConnectAsync()</code> method to establish a connection with the server.</p>
</div>
<h3 id="uris" tabindex="-1"><a class="header-anchor" href="#uris" aria-hidden="true">#</a> URIs</h3>
<p>The create methods support passing of a URI to the connection as opposed to passing <code>IPEndPoints</code>. This URI should be in the format of:</p>
<ul>
<li><strong>Single Node</strong>: <code>tcp://user:password@myserver:11234</code></li>
<li><strong>Cluster</strong>: <code>discover://user:password@myserver:1234</code></li>
</ul>
<p>Where the port number points to the TCP port of the EventStoreDB instance (1113 by default) or points to the manager gossip port for discovery purposes.</p>
<p>With the URI based mechanism you can pass a DNS name and the client will resolve it. The client performs a blocking DNS call for single node. If you are worried about blocking DNS due to network issues etc., you should resolve the DNS yourself and pass in an IP address.</p>
<h3 id="logging" tabindex="-1"><a class="header-anchor" href="#logging" aria-hidden="true">#</a> Logging</h3>
<p>The .NET client can log to different destinations. By default logging is disabled.</p>
<!-- TODO: Moved, to check. Actually missing settings. -->
<table>
<thead>
<tr>
<th style="text-align:left">Builder Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>UseConsoleLogger()</code></td>
<td style="text-align:left">Output log messages using <code>Console.WriteLine</code></td>
</tr>
<tr>
<td style="text-align:left"><code>UseDebugLogger()</code></td>
<td style="text-align:left">Output log messages using <code>Debug.WriteLine</code></td>
</tr>
<tr>
<td style="text-align:left"><code>UseCustomLogger()</code></td>
<td style="text-align:left">Output log messages to the specified instance of <code>ILogger</code> (You should implement this interface in order to log using another library such as NLog or log4net).</td>
</tr>
<tr>
<td style="text-align:left"><code>EnableVerboseLogging()</code></td>
<td style="text-align:left">Turns on verbose logging.</td>
</tr>
</tbody>
</table>
<p>By default, information about connection, disconnection and errors are logged, however it can be useful to have more information about specific operations as they are occurring.</p>
<h3 id="user-credentials" tabindex="-1"><a class="header-anchor" href="#user-credentials" aria-hidden="true">#</a> User credentials</h3>
<p>EventStoreDB supports <RouterLink to="/clients/dotnet/20.10/security/acl.html">Access Control Lists</RouterLink> that restrict permissions for a stream based on users and groups. <code>EventStoreConnection</code> allows you to supply credentials for each operation, however it is often more convenient to set default credentials for all operations on the connection.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Builder Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>SetDefaultUserCredentials(UserCredentials credentials)</code></td>
<td style="text-align:left">Sets the default <code>UserCredentials</code> to use for this connection. If you don't supply any credentials, the operation will use these.</td>
</tr>
</tbody>
</table>
<p>You create a <code>UserCredentials</code> object as follows:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> credentials <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">UserCredentials</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">,</span> <span class="token string">"password"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
settingsBuilder<span class="token punctuation">.</span><span class="token function">SetDefaultUserCredentials</span><span class="token punctuation">(</span>credentials<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="security" tabindex="-1"><a class="header-anchor" href="#security" aria-hidden="true">#</a> Security</h3>
<p>The .NET API and EventStoreDB can communicate either over SSL or an unencrypted channel (by default).</p>
<p>To configure the client-side of the SSL connection, use the builder method below. For more information on setting up the server end of the EventStoreDB for SSL, see <RouterLink to="/clients/dotnet/security/">SSL Setup</RouterLink>.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token function">UseSslConnection</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> targetHost<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> validateServer<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Uses an SSL-encrypted connection where <code>targetHost</code> is the name specified on the SSL certificate installed on the server, and <code>validateServer</code> controls whether the connection validates the server certificate.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>In production systems where credentials are sent from the client to EventStoreDB, you should always use SSL encryption and you should set <code>validateServer</code> to <code>true</code>.</p>
</div>
<h3 id="node-preference" tabindex="-1"><a class="header-anchor" href="#node-preference" aria-hidden="true">#</a> Node preference</h3>
<p>When connecting to an EventStoreDB HA cluster you can specify that operations are performed on any node, or only on the node that is the master.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Builder Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>PerformOnMasterOnly()</code></td>
<td style="text-align:left">Require the master to serve all write and read requests (Default).</td>
</tr>
<tr>
<td style="text-align:left"><code>PerformOnAnyNode()</code></td>
<td style="text-align:left">Allow for writes to be forwarded and read requests to be served locally if the current node is not master.</td>
</tr>
</tbody>
</table>
<h3 id="handling-failures" tabindex="-1"><a class="header-anchor" href="#handling-failures" aria-hidden="true">#</a> Handling failures</h3>
<p>The following methods on the <code>ConnectionSettingsBuilder</code> allow you to change the way the connection handles operation failures and connection issues.</p>
<h4 id="reconnections" tabindex="-1"><a class="header-anchor" href="#reconnections" aria-hidden="true">#</a> Reconnections</h4>
<table>
<thead>
<tr>
<th style="text-align:left">Builder Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>WithConnectionTimeoutOf (TimeSpan timeout)</code></td>
<td style="text-align:left">Sets the timeout to connect to a server before aborting and attempting a reconnect (Default: 1 second).</td>
</tr>
<tr>
<td style="text-align:left"><code>LimitReconnectionsTo (int limit)</code></td>
<td style="text-align:left">Limits the number of reconnections this connection can try to make (Default: 10).</td>
</tr>
<tr>
<td style="text-align:left"><code>KeepReconnecting()</code></td>
<td style="text-align:left">Allows infinite reconnection attempts.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetReconnectionDelayTo (TimeSpan reconnectionDelay)</code></td>
<td style="text-align:left">Sets the delay between reconnection attempts (Default: 100ms).</td>
</tr>
<tr>
<td style="text-align:left"><code>SetHeartbeatInterval (TimeSpan interval)</code></td>
<td style="text-align:left">Sets how often the connection should expect heartbeats (lower values detect broken sockets faster) (Default: 750ms).</td>
</tr>
<tr>
<td style="text-align:left"><code>SetHeartbeatTimeout (TimeSpan timeout)</code></td>
<td style="text-align:left">Sets how long to wait without heartbeats before determining a connection to be dead (must be longer than the heartbeat interval) (Default: 1500ms).</td>
</tr>
</tbody>
</table>
<h4 id="operations" tabindex="-1"><a class="header-anchor" href="#operations" aria-hidden="true">#</a> Operations</h4>
<table>
<thead>
<tr>
<th style="text-align:left">Builder Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>SetOperationTimeout (TimeSpan timeout)</code></td>
<td style="text-align:left">Sets the operation timeout duration (Default: 7 seconds).</td>
</tr>
<tr>
<td style="text-align:left"><code>SetTimeoutCheckPeriodTo (TimeSpan timeoutCheckPeriod)</code></td>
<td style="text-align:left">Sets how often to check for timeouts (Default: 1 second).</td>
</tr>
<tr>
<td style="text-align:left"><code>LimitAttemptsForOperationTo (int limit)</code></td>
<td style="text-align:left">Limits the number of operation attempts (Default: 11).</td>
</tr>
<tr>
<td style="text-align:left"><code>LimitRetriesForOperationTo (int limit)</code></td>
<td style="text-align:left">Limits the number of operation retries (Default: 10).</td>
</tr>
<tr>
<td style="text-align:left"><code>KeepRetrying()</code></td>
<td style="text-align:left">Allows infinite operation retries.</td>
</tr>
<tr>
<td style="text-align:left"><code>LimitOperationsQueueTo (int limit)</code></td>
<td style="text-align:left">Sets the limit for number of outstanding operations (Default: 5000).</td>
</tr>
<tr>
<td style="text-align:left"><code>FailOnNoServerResponse()</code></td>
<td style="text-align:left">Marks that no response from server should cause an error on the request.</td>
</tr>
</tbody>
</table>
<h3 id="cluster-settings" tabindex="-1"><a class="header-anchor" href="#cluster-settings" aria-hidden="true">#</a> Cluster settings</h3>
<p>Cluster settings are now embedded to the connection settings and all overloads that use <code>ClusterSettings</code> are obsolete. You can use the connection settings instance to configure cluster connection:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> ConnectionSettings
    <span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetClusterDns</span><span class="token punctuation">(</span><span class="token string">"esdb.acme.cool"</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetClusterGossipPort</span><span class="token punctuation">(</span><span class="token number">2113</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> connection <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>settings<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="connection-events" tabindex="-1"><a class="header-anchor" href="#connection-events" aria-hidden="true">#</a> Connection events</h3>
<p><code>EventStoreConnection</code> exposes events that your application can use to be notified of changes to the status of the connection.</p>
<!-- TODO: Not moved. -->
<table>
<thead>
<tr>
<th style="text-align:left">Event</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>Connected</code></td>
<td style="text-align:left">Successfully connected to server</td>
</tr>
<tr>
<td style="text-align:left"><code>Disconnected</code></td>
<td style="text-align:left">Disconnected from server by some means other than by calling the <code>Close</code> method.</td>
</tr>
<tr>
<td style="text-align:left"><code>Reconnecting</code></td>
<td style="text-align:left">Attempting to reconnect to server following a disconnection</td>
</tr>
<tr>
<td style="text-align:left"><code>Closed</code></td>
<td style="text-align:left">Connection got closed either using the <code>Close</code> method or when reconnection limits are reached without a successful connection being established</td>
</tr>
<tr>
<td style="text-align:left"><code>ErrorOccurred</code></td>
<td style="text-align:left">Connection experienced an error</td>
</tr>
<tr>
<td style="text-align:left"><code>AuthenticationFailed</code></td>
<td style="text-align:left">Failed to authenticate</td>
</tr>
</tbody>
</table>
<h4 id="compatibility-mode" tabindex="-1"><a class="header-anchor" href="#compatibility-mode" aria-hidden="true">#</a> Compatibility Mode</h4>
<p>Compatibility Mode was added in v5.0.10 and v21.2.0 of the client to set certain configuration options depending on the Event Store version the client is connecting to. It allows discovering whether the Event Store server is a v5 or v20 server.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Changes were not backported to the v20.10 TCP Client version. To use <code>Compatibility Mode</code> you have to upgrade to at least v21.2.0. It's fully compatible with v20.10.0. Check the details in the <RouterLink to="/clients/dotnet/21.2/connecting/compatibility-mode.html">TCP Compatibility Mode client v21.2 docs</RouterLink>.</p>
</div>
<h5 id="auto-compatibility-mode" tabindex="-1"><a class="header-anchor" href="#auto-compatibility-mode" aria-hidden="true">#</a> Auto-Compatibility Mode</h5>
<p>Auto-Compatibility mode was added to make the upgrade from an insecure v5 cluster to a secure v20+ cluster easier by allowing the client to connect to either server configuration without needing to change the client's connection settings.</p>
<p>It does this by sending both an insecure and a secure gossip request when first discovering the server. Whichever of these requests succeeds sets whether the gossip is to be done over HTTP or HTTPS. Once the cluster is discovered, the client will check the gossip to determine whether the TCP connection should be secure or insecure, and connect accordingly.</p>
<p>This means that you no longer need to specify <code>GossipOverTls</code> or <code>UseSslConnection</code> in the connection settings or connection string.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Changes were not backported to the v20.10 TCP Client version. To use <code>Auto-Compatibility Mode</code> you have to upgrade to at least v21.2.0. It's fully compatible with v20.10.0. Check the details in the <RouterLink to="/clients/dotnet/21.2/connecting/compatibility-mode.html#auto-compatibility-mode">Auto-Compatibility Mode client v21.2 docs</RouterLink>.</p>
</div>
</template>
