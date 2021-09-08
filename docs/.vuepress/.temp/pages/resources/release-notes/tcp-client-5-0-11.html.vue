<template><p>The TCP client for .NET release extends the auto-compatibility functionality introduced in v5.0.10 to allow it to work with Gossip Seeds as well as ClusterDNS. We hope that this will simplify the upgrade process from v5 to v20.</p>
<!-- more -->
<p>You can get the packages from NuGet here: <a href="https://www.nuget.org/packages/EventStore.Client/" target="_blank" rel="noopener noreferrer">EventStore TCP Client<OutboundLink/></a>.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dotnet <span class="token function">add</span> package EventStore.Client --version <span class="token number">5.0</span>.11
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="changes" tabindex="-1"><a class="header-anchor" href="#changes" aria-hidden="true">#</a> Changes</h2>
<ul>
<li><a href="https://github.com/EventStore/EventStore/pull/2860" target="_blank" rel="noopener noreferrer">#2860<OutboundLink/></a> Extend auto-compatibility mode to gossip seeds configuration</li>
</ul>
<h3 id="auto-compatibility-mode" tabindex="-1"><a class="header-anchor" href="#auto-compatibility-mode" aria-hidden="true">#</a> Auto-Compatibility Mode</h3>
<p>In the previous v5 release we mentioned that we wanted to make the upgrade from version 5 of EventStoreDB to version 20 less disruptive. As part of that, we introduced auto-compatibility mode for ClusterDNS discovery in the TCP client.</p>
<p>This release extends that feature to make it easier for more configurations.</p>
<p>First, auto-compatibility mode now works for gossip seeds. If auto-compatibility mode is enabled and a gossip seed is specified, the client will attempt to discover whether it should gossip over HTTP or HTTPS.</p>
<p>Second, auto-compatibility mode will also discover whether to use secure or insecure TCP based on the response from the server. This means that you won’t need to explicitly set UseSslConnection in the connection settings.</p>
<p>Please note that auto-compatibility mode does not enable Server Certificate Validation by default. As such, we recommend that you enable this explicitly in your connection settings</p>
<h3 id="using-auto-compatibility-mode" tabindex="-1"><a class="header-anchor" href="#using-auto-compatibility-mode" aria-hidden="true">#</a> Using Auto-Compatibility Mode</h3>
<p>You can enable auto-compatibility mode with</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>CompatibilityMode=auto
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>in the connection string, or with</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>.SetCompatibilityMode("auto")
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>in the connection settings.</p>
<p>You can connect to a cluster running insecure v5, insecure v20, or secure v20 with the following configurations:</p>
<p>Connection String:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ConnectTo=discover://{dns_address}:2113;TargetHost={dns_address};CompatibilityMode=auto;ValidateServer=true;
GossipSeeds={node1}:2113,{node2}:2113,{node3}:2113;CompatibilityMode=auto;ValidateServer=true;
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Connection Settings:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> connectionSettings <span class="token operator">=</span> ConnectionSettings<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetCompatibilityMode</span><span class="token punctuation">(</span><span class="token string">"auto"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> clusterSettings <span class="token operator">=</span> ClusterSettings<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">DiscoverClusterViaDns</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetClusterDns</span><span class="token punctuation">(</span><span class="token punctuation">{</span>dns_address<span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetClusterGossipPort</span><span class="token punctuation">(</span><span class="token number">2113</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> connectionSettings <span class="token operator">=</span> ConnectionSettings<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetGossipSeedEndPoints</span><span class="token punctuation">(</span>gossipSeeds<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetCompatibilityMode</span><span class="token punctuation">(</span><span class="token string">"auto"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation" aria-hidden="true">#</a> Documentation</h2>
<p>Documentation for .NET TCP Client <a href="https://developers.eventstore.com/" target="_blank" rel="noopener noreferrer">can be found here<OutboundLink/></a>.</p>
<p>If you have any questions that aren't covered in these release notes or the docs, please feel free to reach out on discuss, GitHub or slack.</p>
<h2 id="providing-feedback" tabindex="-1"><a class="header-anchor" href="#providing-feedback" aria-hidden="true">#</a> Providing Feedback</h2>
<p>If you encounter any issues, please don’t hesitate to open an issue on <a href="https://github.com/eventstore/eventstore" target="_blank" rel="noopener noreferrer">GitHub<OutboundLink/></a> if there isn’t one already.</p>
<p>Additionally, there is a fairly active <a href="https://discuss.eventstore.com/" target="_blank" rel="noopener noreferrer">Discuss<OutboundLink/></a> community forum, and an <code>#eventstore</code> channel on the <a href="https://j.mp/ddd-es-cqrs" target="_blank" rel="noopener noreferrer">DDD-CQRS-ES<OutboundLink/></a> Slack community.</p>
</template>
