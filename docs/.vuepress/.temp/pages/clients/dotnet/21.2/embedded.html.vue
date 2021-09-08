<template><h1 id="embedded-client" tabindex="-1"><a class="header-anchor" href="#embedded-client" aria-hidden="true">#</a> Embedded client</h1>
<h2 id="embeddedvnodebuilder" tabindex="-1"><a class="header-anchor" href="#embeddedvnodebuilder" aria-hidden="true">#</a> EmbeddedVNodeBuilder</h2>
<p>The <code>EmbeddedVNodeBuilder</code> class sets up and builds an EventStoreDB node. You can configure your node through methods provided by the <code>EmbeddedVNodeBuilder</code> class.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The builder used for the <code>EmbeddedVNodeBuilder</code> is the same EventStoreDB uses internally to create the <code>ClusterNode</code>, see <em>EventStore.ClusterNode.Program.cs</em> for more examples on how to use it.</p>
</div>
<h2 id="building-a-node" tabindex="-1"><a class="header-anchor" href="#building-a-node" aria-hidden="true">#</a> Building a node</h2>
<p>You have two options when you start creating a node, <code>EmbeddedVNodeBuilder.AsSingleNode()</code> or <code>EmbeddedVNodeBuilder.AsClusterMember(clusterSize)</code>, which will create a single node or a cluster node respectively. After creating the builder, you can configure the node through the methods provided by the <code>EmbeddedVNodeBuilder</code>. These are listed below.</p>
<p>Once you have configured the node, build it with <code>EmbeddedVNodeBuilder.Build()</code> which returns the configured <code>ClusterVNode</code>.</p>
<p>Start the node with <code>ClusterVNode.StartAndWaitUntilReady()</code> or <code>ClusterVNode.Start()</code>. <code>ClusterVNode.StartAndWaitUntilReady()</code> returns a task that completes once the node has started and all subsystems have finished loading.</p>
<p>For example, to build a single node with default options :</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> nodeBuilder <span class="token operator">=</span> EmbeddedVNodeBuilder
    <span class="token punctuation">.</span><span class="token function">AsSingleNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">OnDefaultEndpoints</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
    <span class="token punctuation">.</span><span class="token function">RunInMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name"><span class="token keyword">var</span></span> node <span class="token operator">=</span> nodeBuilder<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> node<span class="token punctuation">.</span><span class="token function">StartAndWaitUntilReady</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>To build a node to be part of a cluster with custom endpoints and gossip seeds:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> nodeBuilder <span class="token operator">=</span> EmbeddedVNodeBuilder
    <span class="token punctuation">.</span><span class="token function">AsClusterMember</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">RunOnDisk</span><span class="token punctuation">(</span><span class="token string">"node1db"</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithInternalHttpOn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Loopback<span class="token punctuation">,</span> <span class="token number">1112</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithExternalHttpOn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Loopback<span class="token punctuation">,</span> <span class="token number">1113</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithExternalTcpOn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Loopback<span class="token punctuation">,</span> <span class="token number">1114</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithInternalTcpOn</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Loopback<span class="token punctuation">,</span> <span class="token number">1115</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">DisableDnsDiscovery</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">WithGossipSeeds</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint<span class="token punctuation">[</span><span class="token punctuation">]</span></span>
    <span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Loopback<span class="token punctuation">,</span> <span class="token number">2112</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token constructor-invocation class-name">IPEndPoint</span><span class="token punctuation">(</span>IPAddress<span class="token punctuation">.</span>Loopback<span class="token punctuation">,</span> <span class="token number">3112</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> node <span class="token operator">=</span> nodeBuilder<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
node<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>When running an embedded cluster, the task returned by <code>StartAndWaitUntilReady()</code> only completes on the master node.</p>
</div>
<h2 id="connecting-to-an-embedded-node" tabindex="-1"><a class="header-anchor" href="#connecting-to-an-embedded-node" aria-hidden="true">#</a> Connecting to an embedded node</h2>
<p>You can connect to an embedded EventStoreDB node with the <code>EmbeddedEventStoreConnection</code> class. Calling <code>EmbeddedEventStoreConnection.Create(ClusterVNode)</code> returns an <code>IEventStoreConnection</code> configured to connect to your embedded node. From there you can use the connection as normal in the .NET Client.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> embeddedConn <span class="token operator">=</span> EmbeddedEventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>node<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">await</span> embeddedConn<span class="token punctuation">.</span><span class="token function">ConnectAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> embeddedConn<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token string">"some-stream"</span><span class="token punctuation">,</span> 
    ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">,</span>
    <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"eventType"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{\"Foo\":\"Bar\"}"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="logging-with-an-embedded-node" tabindex="-1"><a class="header-anchor" href="#logging-with-an-embedded-node" aria-hidden="true">#</a> Logging with an embedded node</h2>
<p>To enable logging for an embedded node, you need to initialize the <code>LogManager</code> and ensure that you configure the logger with a <code>log.config</code> file in your configuration directory.</p>
<p>To initialize the <code>LogManager</code>, call this before building the nodes:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>LogManager<span class="token punctuation">.</span><span class="token function">Init</span><span class="token punctuation">(</span>logComponentName<span class="token punctuation">,</span> logDirectory<span class="token punctuation">,</span> logConfigurationDirectory<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="embeddedvnodebuilder-options" tabindex="-1"><a class="header-anchor" href="#embeddedvnodebuilder-options" aria-hidden="true">#</a> EmbeddedVNodeBuilder options</h2>
<p>The following options are available when building an Embedded Node.</p>
<h3 id="application-options" tabindex="-1"><a class="header-anchor" href="#application-options" aria-hidden="true">#</a> Application options</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>AsSingleNode()</code></td>
<td style="text-align:left">Returns a builder set to construct options for a single node instance</td>
</tr>
<tr>
<td style="text-align:left"><code>AsClusterMember(int clusterSize)</code></td>
<td style="text-align:left">Returns a builder set to construct options for a cluster node instance with a cluster size</td>
</tr>
<tr>
<td style="text-align:left"><code>DisableHTTPCaching()</code></td>
<td style="text-align:left">Disable HTTP Caching</td>
</tr>
<tr>
<td style="text-align:left"><code>WithWorkerThreads(int count)</code></td>
<td style="text-align:left">Sets the number of worker threads to use in shared threadpool</td>
</tr>
<tr>
<td style="text-align:left"><code>WithStatsPeriod(TimeSpan statsPeriod)</code></td>
<td style="text-align:left">Sets the period between statistics gathers</td>
</tr>
<tr>
<td style="text-align:left"><code>EnableLoggingOfHttpRequests()</code></td>
<td style="text-align:left">Enable logging of HTTP requests and responses before they are processed</td>
</tr>
<tr>
<td style="text-align:left"><code>EnableHistograms()</code></td>
<td style="text-align:left">Enable the tracking of histograms, typically used for debugging</td>
</tr>
<tr>
<td style="text-align:left"><code>EnableTrustedAuth()</code></td>
<td style="text-align:left">Enable trusted authentication by an intermediary in the HTTP</td>
</tr>
</tbody>
</table>
<h3 id="certificate-options" tabindex="-1"><a class="header-anchor" href="#certificate-options" aria-hidden="true">#</a> Certificate options</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>WithServerCertificateFromFile(string path, string password)</code></td>
<td style="text-align:left">Sets the Server SSL Certificate loaded from a file</td>
</tr>
<tr>
<td style="text-align:left"><code>WithServerCertificate(X509Certificate2 sslCertificate)</code></td>
<td style="text-align:left">Sets the Server SSL Certificate</td>
</tr>
<tr>
<td style="text-align:left"><code>WithServerCertificateFromStore(StoreLocation storeLocation, StoreName storeName, string certificateSubjectName, string certificateThumbprint)</code></td>
<td style="text-align:left">Sets the Server SSL Certificate loaded from a certificate store</td>
</tr>
<tr>
<td style="text-align:left"><code>WithServerCertificateFromStore(StoreName storeName, string certificateSubjectName, string certificateThumbprint)</code></td>
<td style="text-align:left">Sets the Server SSL Certificate loaded from a certificate store</td>
</tr>
</tbody>
</table>
<h3 id="cluster-options" tabindex="-1"><a class="header-anchor" href="#cluster-options" aria-hidden="true">#</a> Cluster options</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>WithClusterGossipPort(int port)</code></td>
<td style="text-align:left">Sets the internal gossip port (used when using cluster DNS, this should point to a known port gossip will be running on)</td>
</tr>
<tr>
<td style="text-align:left"><code>WithGossipSeeds(params IPEndPoint[] endpoints)</code></td>
<td style="text-align:left">Sets the gossip seeds this node should talk to</td>
</tr>
<tr>
<td style="text-align:left"><code>WithClusterDnsName(string name)</code></td>
<td style="text-align:left">Sets the DNS name used for the discovery of other cluster nodes</td>
</tr>
<tr>
<td style="text-align:left"><code>DisableDnsDiscovery()</code></td>
<td style="text-align:left">Disable DNS discovery for the cluster</td>
</tr>
<tr>
<td style="text-align:left"><code>WithGossipInterval(TimeSpan gossipInterval)</code></td>
<td style="text-align:left">Sets the gossip interval</td>
</tr>
<tr>
<td style="text-align:left"><code>WithGossipAllowedTimeDifference(TimeSpan gossipAllowedDifference)</code></td>
<td style="text-align:left">Sets the allowed gossip time difference</td>
</tr>
<tr>
<td style="text-align:left"><code>WithGossipTimeout(TimeSpan gossipTimeout)</code></td>
<td style="text-align:left">Sets the gossip timeout</td>
</tr>
<tr>
<td style="text-align:left"><code>WithPrepareTimeout(TimeSpan prepareTimeout)</code></td>
<td style="text-align:left">Sets the prepare timeout</td>
</tr>
<tr>
<td style="text-align:left"><code>WithCommitTimeout(TimeSpan commitTimeout)</code></td>
<td style="text-align:left">Sets the commit timeout</td>
</tr>
<tr>
<td style="text-align:left"><code>WithPrepareCount(int prepareCount)</code></td>
<td style="text-align:left">Sets the number of nodes which must acknowledge prepares.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithCommitCount(int commitCount)</code></td>
<td style="text-align:left">Sets the number of nodes which must acknowledge commits before acknowledging to a client.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithNodePriority(int nodePriority)</code></td>
<td style="text-align:left">Sets the node priority used during master election</td>
</tr>
</tbody>
</table>
<h3 id="database-options" tabindex="-1"><a class="header-anchor" href="#database-options" aria-hidden="true">#</a> Database options</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>RunInMemory()</code></td>
<td style="text-align:left">Sets the builder to run in memory</td>
</tr>
<tr>
<td style="text-align:left"><code>RunOnDisk(string path)</code></td>
<td style="text-align:left">Sets the builder to write database files to the specified path</td>
</tr>
<tr>
<td style="text-align:left"><code>MaximumMemoryTableSizeOf(int size)</code></td>
<td style="text-align:left">Sets the maximum size a memtable is allowed to reach (in count) before moved to be a ptable</td>
</tr>
<tr>
<td style="text-align:left"><code>DoNotVerifyDbHashes()</code></td>
<td style="text-align:left">Marks that the existing database files should not be checked for checksums on startup.</td>
</tr>
<tr>
<td style="text-align:left"><code>VerifyDbHashes()</code></td>
<td style="text-align:left">Marks that the existing database files should be checked for checksums on startup.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithMinFlushDelay(TimeSpan minFlushDelay)</code></td>
<td style="text-align:left">Sets the minimum flush delay</td>
</tr>
<tr>
<td style="text-align:left"><code>DisableScavengeMerging()</code></td>
<td style="text-align:left">Disables the merging of chunks when scavenge is running</td>
</tr>
<tr>
<td style="text-align:left"><code>WithScavengeHistoryMaxAge(int scavengeHistoryMaxAge)</code></td>
<td style="text-align:left">The number of days to keep scavenge history (Default: 30)</td>
</tr>
<tr>
<td style="text-align:left"><code>WithIndexPath(string indexPath)</code></td>
<td style="text-align:left">Sets the path the index should be loaded or saved to</td>
</tr>
<tr>
<td style="text-align:left"><code>WithIndexCacheDepth(int indexCacheDepth)</code></td>
<td style="text-align:left">Sets the depth to cache for the mid point cache in index</td>
</tr>
<tr>
<td style="text-align:left"><code>WithUnsafeIgnoreHardDelete()</code></td>
<td style="text-align:left">Disables Hard Deletes (UNSAFE: use to remove hard deletes)</td>
</tr>
<tr>
<td style="text-align:left"><code>WithUnsafeDisableFlushToDisk()</code></td>
<td style="text-align:left">Disables Hard Deletes (UNSAFE: use to remove hard deletes)</td>
</tr>
<tr>
<td style="text-align:left"><code>WithBetterOrdering()</code></td>
<td style="text-align:left">Enable queue affinity on reads during write process to try to get better ordering.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithTfChunkSize(int chunkSize)</code></td>
<td style="text-align:left">Sets the transaction file chunk size. Default is <code>TFConsts.ChunkSize</code></td>
</tr>
<tr>
<td style="text-align:left"><code>WithTfCachedChunks(int cachedChunks)</code></td>
<td style="text-align:left">The number of chunks to cache in unmanaged memory. Default is <code>TFConsts.ChunksCacheSize</code></td>
</tr>
</tbody>
</table>
<h3 id="interface-options" tabindex="-1"><a class="header-anchor" href="#interface-options" aria-hidden="true">#</a> Interface options</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>OnDefaultEndpoints()</code></td>
<td style="text-align:left">Sets the default endpoints on localhost (1113 tcp, 2113 http)</td>
</tr>
<tr>
<td style="text-align:left"><code>AdvertiseInternalIPAs(IPAddress intIpAdvertiseAs)</code></td>
<td style="text-align:left">Sets up the Internal IP to advertise</td>
</tr>
<tr>
<td style="text-align:left"><code>AdvertiseExternalIPAs(IPAddress extIpAdvertiseAs)</code></td>
<td style="text-align:left">Sets up the External IP to advertise</td>
</tr>
<tr>
<td style="text-align:left"><code>AdvertiseInternalHttpPortAs(int intHttpPortAdvertiseAs)</code></td>
<td style="text-align:left">Sets up the Internal HTTP port to advertise</td>
</tr>
<tr>
<td style="text-align:left"><code>AdvertiseExternalHttpPortAs(int extHttpPortAdvertiseAs)</code></td>
<td style="text-align:left">Sets up the External HTTP port to advertise</td>
</tr>
<tr>
<td style="text-align:left"><code>AdvertiseInternalSecureTCPPortAs(int intSecureTcpPortAdvertiseAs)</code></td>
<td style="text-align:left">Sets up the Internal Secure TCP port to advertise</td>
</tr>
<tr>
<td style="text-align:left"><code>AdvertiseExternalSecureTCPPortAs(int extSecureTcpPortAdvertiseAs)</code></td>
<td style="text-align:left">Sets up the External Secure TCP port to advertise</td>
</tr>
<tr>
<td style="text-align:left"><code>AdvertiseInternalTCPPortAs(int intTcpPortAdvertiseAs)</code></td>
<td style="text-align:left">Sets up the Internal TCP port to advertise</td>
</tr>
<tr>
<td style="text-align:left"><code>AdvertiseExternalTCPPortAs(int extTcpPortAdvertiseAs)</code></td>
<td style="text-align:left">Sets up the External TCP port to advertise</td>
</tr>
<tr>
<td style="text-align:left"><code>WithInternalHttpOn(IPEndPoint endpoint)</code></td>
<td style="text-align:left">Sets the internal HTTP endpoint to the specified value</td>
</tr>
<tr>
<td style="text-align:left"><code>WithExternalHttpOn(IPEndPoint endpoint)</code></td>
<td style="text-align:left">Sets the external HTTP endpoint to the specified value</td>
</tr>
<tr>
<td style="text-align:left"><code>WithInternalTcpOn(IPEndPoint endpoint)</code></td>
<td style="text-align:left">Sets the internal TCP endpoint to the specified value</td>
</tr>
<tr>
<td style="text-align:left"><code>WithInternalSecureTcpOn(IPEndPoint endpoint)</code></td>
<td style="text-align:left">Sets the internal secure TCP endpoint to the specified value</td>
</tr>
<tr>
<td style="text-align:left"><code>WithExternalTcpOn(IPEndPoint endpoint)</code></td>
<td style="text-align:left">Sets the external TCP endpoint to the specified value</td>
</tr>
<tr>
<td style="text-align:left"><code>WithExternalSecureTcpOn(IPEndPoint endpoint)</code></td>
<td style="text-align:left">Sets the external secure TCP endpoint to the specified value</td>
</tr>
<tr>
<td style="text-align:left"><code>EnableSsl()</code></td>
<td style="text-align:left">Sets that SSL should be used on connections</td>
</tr>
<tr>
<td style="text-align:left"><code>WithSslTargetHost(string targetHost)</code></td>
<td style="text-align:left">Sets the target host of the server's SSL certificate.</td>
</tr>
<tr>
<td style="text-align:left"><code>ValidateSslServer()</code></td>
<td style="text-align:left">Sets whether to validate that the server's certificate is trusted.</td>
</tr>
<tr>
<td style="text-align:left"><code>NoGossipOnPublicInterface()</code></td>
<td style="text-align:left">Disables gossip on the public (client) interface</td>
</tr>
<tr>
<td style="text-align:left"><code>NoAdminOnPublicInterface()</code></td>
<td style="text-align:left">Disables the admin interface on the public (client) interface</td>
</tr>
<tr>
<td style="text-align:left"><code>NoStatsOnPublicInterface()</code></td>
<td style="text-align:left">Disables statistics screens on the public (client) interface</td>
</tr>
<tr>
<td style="text-align:left"><code>AddInternalHttpPrefix(string prefix)</code></td>
<td style="text-align:left">Adds a HTTP prefix for the internal HTTP endpoint</td>
</tr>
<tr>
<td style="text-align:left"><code>AddExternalHttpPrefix(string prefix)</code></td>
<td style="text-align:left">Adds a HTTP prefix for the external HTTP endpoint</td>
</tr>
<tr>
<td style="text-align:left"><code>DontAddInterfacePrefixes()</code></td>
<td style="text-align:left">Don't add the interface prefixes (e.g. If the External IP is set to the Loopback address, add <a href="http://localhost:2113/" target="_blank" rel="noopener noreferrer">http://localhost:2113/<OutboundLink/></a> as a prefix)</td>
</tr>
<tr>
<td style="text-align:left"><code>WithInternalHeartbeatInterval(TimeSpan heartbeatInterval)</code></td>
<td style="text-align:left">Sets the heartbeat interval for the internal network interface.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithExternalHeartbeatInterval(TimeSpan heartbeatInterval)</code></td>
<td style="text-align:left">Sets the heartbeat interval for the external network interface.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithInternalHeartbeatTimeout(TimeSpan heartbeatTimeout)</code></td>
<td style="text-align:left">Sets the heartbeat timeout for the internal network interface.</td>
</tr>
<tr>
<td style="text-align:left"><code>WithExternalHeartbeatTimeout(TimeSpan heartbeatTimeout)</code></td>
<td style="text-align:left">Sets the heartbeat timeout for the external network interface.</td>
</tr>
</tbody>
</table>
<h3 id="projections-options" tabindex="-1"><a class="header-anchor" href="#projections-options" aria-hidden="true">#</a> Projections options</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>StartStandardProjections()</code></td>
<td style="text-align:left">Start standard projections.</td>
</tr>
<tr>
<td style="text-align:left"><code>RunProjections(ProjectionType projectionType, int numberOfThreads = Opts.ProjectionThreadsDefault)</code></td>
<td style="text-align:left">Sets the mode and the number of threads on which to run projections.</td>
</tr>
<tr>
<td style="text-align:left"><code>RunProjections(ClientAPI.Embedded.ProjectionsMode projectionsMode, int numberOfThreads = Opts.ProjectionThreadsDefault)</code></td>
<td style="text-align:left">Sets the mode and the number of threads on which to run projections.</td>
</tr>
</tbody>
</table>
<h2 id="embeddedeventstoreconnection" tabindex="-1"><a class="header-anchor" href="#embeddedeventstoreconnection" aria-hidden="true">#</a> EmbeddedEventStoreConnection</h2>
<p>The following methods are available on <code>EmbeddedEventStoreConnection</code> for connecting to an embedded node.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>Create(ClusterVNode eventStore, string connectionName = null)</code></td>
<td style="text-align:left">Creates a new embedded <code>IEventStoreConnection</code> to a single node with default connection settings</td>
</tr>
<tr>
<td style="text-align:left"><code>Create(ClusterVNode eventStore, ConnectionSettings connectionSettings, string connectionName = null)</code></td>
<td style="text-align:left">Creates a new embedded <code>IEventStoreConnection</code> to a single node using specific <code>ConnectionSettings</code></td>
</tr>
</tbody>
</table>
</template>
