<template><h1 id="connection-string" tabindex="-1"><a class="header-anchor" href="#connection-string" aria-hidden="true">#</a> Connection string</h1>
<p>Many of the <code>EventStoreConnection.Create</code> overloads accept a connection string that you can use to control settings of the connection. A benefit to having these as a connection string instead of using the fluent API is that you can change them between environments without recompiling (i.e. a single node in <code>dev</code> and a cluster in <code>production</code>).</p>
<p>Here are all available overloads for the <code>Create</code> methods of the <code>EventStoreConnection</code> class, which use the connection string:</p>
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
<td style="text-align:left">auto, 5</td>
<td style="text-align:left">Enables the client to connect to either server configuration without needing to change the client's connection settings</td>
</tr>
</tbody>
</table>
<p>You can specify only one of <code>ConnectTo</code>, <code>ClusterDns</code> and <code>GossipSeeds</code>. Also, you'd only need to define <code>ExternalGossipPort</code> if you connect to the cluster using the DNS name (<code>ClusterDns</code>). The gossip port is usually the external HTTP port. When connecting to the cluster using <code>GossipSeeds</code>, you need to specify the gossip port for each node address in the list of seeds.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>You can also use spacing instead of camel casing in your connection string.</p>
</div>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> connectionString <span class="token operator">=</span> <span class="token string">"ConnectTo=tcp://admin:changeit@localhost:1113; HeartBeatTimeout=500"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Sets the connection string to connect to <code>localhost</code> on the default port and sets the heartbeat timeout to 500ms.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> connectionString <span class="token operator">=</span> <span class="token string">"Connect To = tcp://admin:changeit@localhost:1113; HeartBeat Timeout = 500"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Using spaces:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> connectionString <span class="token operator">=</span> <span class="token string">"ConnectTo=discover://admin:changeit@mycluster:3114; HeartBeatTimeout=500"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Tells the connection to try gossiping to a manager node found under the DNS <code>mycluster</code> at port <code>3114</code> to connect to the cluster.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> connectionString <span class="token operator">=</span> <span class="token string">"GossipSeeds=192.168.0.2:1111,192.168.0.3:1111; HeartBeatTimeout=500"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Tells the connection to try gossiping to the gossip seeds <code>192.168.0.2</code> or <code>192.168.0.3</code> on port '1111' to discover information about the cluster.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>You can also use the <code>ConnectionString</code> class to return a <code>ConnectionSettings</code> object.</p>
</div>
</template>
