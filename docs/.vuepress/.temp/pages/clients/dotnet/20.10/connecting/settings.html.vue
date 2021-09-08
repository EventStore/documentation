<template><h1 id="connection-settings" tabindex="-1"><a class="header-anchor" href="#connection-settings" aria-hidden="true">#</a> Connection settings</h1>
<p>The <code>EventStoreConnection</code> class uses the static <code>Create</code> methods to create a new connection. All method overloads allow you to settingally specify a name for the connection, which the connection returns when it raises events (see <a href="#connection-events">Connection Events</a>).</p>
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
<h2 id="uris" tabindex="-1"><a class="header-anchor" href="#uris" aria-hidden="true">#</a> URIs</h2>
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
<p>By default information about connection, disconnection and errors are logged, however it can be useful to have more information about specific operations as they are occurring.</p>
<h3 id="user-credentials" tabindex="-1"><a class="header-anchor" href="#user-credentials" aria-hidden="true">#</a> User credentials</h3>
<p>EventStoreDB supports <RouterLink to="/server/generated/v20.10/docs/security/acl.html">Access Control Lists</RouterLink> that restrict permissions for a stream based on users and groups. <code>EventStoreConnection</code> allows you to supply credentials for each operation, however it is often more convenient to set default credentials for all operations on the connection.</p>
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
<p>To configure the client-side of the SSL connection, use the builder method below. For more information on setting up the server end of the EventStoreDB for SSL, see <RouterLink to="/server/generated/v20.10/docs/security/">SSL Setup</RouterLink>.</p>
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
<h2 id="cluster-settings" tabindex="-1"><a class="header-anchor" href="#cluster-settings" aria-hidden="true">#</a> Cluster settings</h2>
<p>Cluster settings are now embedded to the connection settings and all overloads that use <code>ClusterSettings</code> are obsolete. You can use the connection settings instance to configure cluster connection:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> settings <span class="token operator">=</span> ConnectionSettings
    <span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetClusterDns</span><span class="token punctuation">(</span><span class="token string">"esdb.acme.cool"</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetClusterGossipPort</span><span class="token punctuation">(</span><span class="token number">2113</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> connection <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>settings<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="connection-events" tabindex="-1"><a class="header-anchor" href="#connection-events" aria-hidden="true">#</a> Connection events</h2>
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
<td style="text-align:left"><code>EventHandler&lt;ClientConnectionEventArgs&gt; Connected</code></td>
<td style="text-align:left">Fired when an <code>IEventStoreConnection</code> connects to an EventStoreDB server.</td>
</tr>
<tr>
<td style="text-align:left"><code>EventHandler&lt;ClientConnectionEventArgs&gt; Disconnected</code></td>
<td style="text-align:left">Fired when an <code>IEventStoreConnection</code> disconnects from an EventStoreDB server by some means other than by calling the <code>Close</code> method.</td>
</tr>
<tr>
<td style="text-align:left"><code>EventHandler&lt;ClientReconnectingEventArgs&gt; Reconnecting</code></td>
<td style="text-align:left">Fired when an <code>IEventStoreConnection</code> is attempting to reconnect to an EventStoreDB server following a disconnection.</td>
</tr>
<tr>
<td style="text-align:left"><code>EventHandler&lt;ClientClosedEventArgs&gt; Closed</code></td>
<td style="text-align:left">Fired when an <code>IEventStoreConnection</code> is closed either using the <code>Close</code> method or when reconnection limits are reached without a successful connection being established.</td>
</tr>
<tr>
<td style="text-align:left"><code>EventHandler&lt;ClientErrorEventArgs&gt; ErrorOccurred</code></td>
<td style="text-align:left">Fired when an error is thrown on an <code>IEventStoreConnection</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code>EventHandler&lt;ClientAuthenticationFailedEventArgs&gt; AuthenticationFailed</code></td>
<td style="text-align:left">Fired when a client fails to authenticate to an EventStoreDB server.</td>
</tr>
</tbody>
</table>
</template>
