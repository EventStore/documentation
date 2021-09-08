<template><h1 id="compatibility-mode" tabindex="-1"><a class="header-anchor" href="#compatibility-mode" aria-hidden="true">#</a> Compatibility Mode</h1>
<p>Compatibility Mode was added in v21.2 of the client to set certain configuration options depending on the Event Store version the client is connecting to.</p>
<p>At the moment, the v21.2 client supports two modes:</p>
<ul>
<li>&quot;5&quot; to allow connection to v5 Event Store servers.</li>
<li>&quot;auto&quot; to allow discovering whether the Event Store server is a v5 or v20 (or above) server.</li>
</ul>
<h2 id="auto-compatibility-mode" tabindex="-1"><a class="header-anchor" href="#auto-compatibility-mode" aria-hidden="true">#</a> Auto-Compatibility Mode</h2>
<p>Auto-Compatibility mode was added to make the upgrade from an insecure v5 cluster to a secure v20+ cluster easier by allowing the client to connect to either server configuration without needing to change the client's connection settings.</p>
<p>It does this by sending both an insecure and a secure gossip request when first discovering the server. Whichever of these requests succeeds sets whether the gossip is to be done over HTTP or HTTPS. Once the cluster is discovered, the client will check the gossip to determine whether the TCP connection should be secure or insecure, and connect accordingly.</p>
<p>This means that you no longer need to specify <code>GossipOverTls</code> or <code>UseSslConnection</code> in the connection settings or connection string.</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>Since auto-compatibility mode will send two requests at discovery and expect one to fail, you will see a gossip failure in the log when the client starts. This is expected to only happen on the first request.</p>
</div><h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3>
<p>Auto-Compatibility Mode is supported when connecting with Gossip Seeds or Cluster DNS Discovery.</p>
<p>You can enable auto-compatibility mode with <code>CompatibilityMode=auto</code> in the connection string, or with <code>.SetCompatibilityMode(&quot;auto&quot;)</code> in the connection settings.</p>
<p>You can connect to a cluster running insecure v5, insecure v20+, or secure v20+ with the following configurations:</p>
<h3 id="connection-string" tabindex="-1"><a class="header-anchor" href="#connection-string" aria-hidden="true">#</a> Connection String:</h3>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> clusterDnsConnectionString <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">$"ConnectTo=discover://</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">dns_address</span><span class="token punctuation">}</span></span><span class="token string">:2113;TargetHost=</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">dns_address</span><span class="token punctuation">}</span></span><span class="token string">;CompatibilityMode=auto;ValidateServer=true;"</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> gossipSeedConnectionSTring <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">$"GossipSeeds=</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">node1</span><span class="token punctuation">}</span></span><span class="token string">:2113,</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">node2</span><span class="token punctuation">}</span></span><span class="token string">:2113,</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">node3</span><span class="token punctuation">}</span></span><span class="token string">:2113;CompatibilityMode=auto;ValidateServer=true;"</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Auto-compatibility mode does not enable Server Certificate Validation by default. As such, we recommend that you enable this explicitly in your connection string.</p>
</div>
<h3 id="connection-settings" tabindex="-1"><a class="header-anchor" href="#connection-settings" aria-hidden="true">#</a> Connection Settings:</h3>
<xode-group>
<xode-block title="Using Cluster DNS Discovery">
<p>@[code](clients/dotnet/21.2/sample-code/DotNetClient/CompatibilityMode.cs#AutoCompatibilityWithClusterDns</p>
</xode-block>
<xode-block title="Using Gossip Seeds">
<p>@[code](clients/dotnet/21.2/sample-code/DotNetClient/CompatibilityMode.cs#AutoCompatibilityWithGossipSeeds</p>
</xode-block>
</xode-group>
<h2 id="v5-compatibility-mode" tabindex="-1"><a class="header-anchor" href="#v5-compatibility-mode" aria-hidden="true">#</a> v5 Compatibility Mode</h2>
<p>The v5 Compatibility Mode allows the v21.2 client to connect to a v5 cluster.</p>
<p>You can set this with <code>CompatibilityMode=5</code> in the connection string, or with <code>.SetCompatibilityMode(&quot;5&quot;)</code> in the connection settings.</p>
<p>For example:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> connectionString <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">$"ConnectTo=discover://</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">cluster_dns</span><span class="token punctuation">}</span></span><span class="token string">:2113?TargetHost=</span><span class="token interpolation"><span class="token punctuation">{</span><span class="token expression language-csharp">cluster_dns</span><span class="token punctuation">}</span></span><span class="token string">;CompatibilityMode=5;"</span></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></template>
