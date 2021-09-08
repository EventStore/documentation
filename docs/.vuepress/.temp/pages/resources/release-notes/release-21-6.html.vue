<template><p>We are pleased to announce the official release of EventStoreDB 21.6.0 for the following operating systems:</p>
<ul>
<li>Windows</li>
<li>Ubuntu 16.04</li>
<li>Ubuntu 18.04</li>
<li>Ubuntu 20.04</li>
<li>CentOS 7 (Commercial version)</li>
<li>Amazon Linux 2 (Commercial version)</li>
<li>Oracle Linux 7 (Commercial version)</li>
</ul>
<h2 id="where-can-i-get-the-packages" tabindex="-1"><a class="header-anchor" href="#where-can-i-get-the-packages" aria-hidden="true">#</a> Where Can I Get the Packages?</h2>
<p>Downloads are available on our <a href="https://eventstore.com/downloads/" target="_blank" rel="noopener noreferrer">website<OutboundLink/></a>.</p>
<p>The packages can be installed using the following instructions.</p>
<h4 id="ubuntu-16-04-18-04-20-04-via-packagecloud" tabindex="-1"><a class="header-anchor" href="#ubuntu-16-04-18-04-20-04-via-packagecloud" aria-hidden="true">#</a> Ubuntu 16.04/18.04/20.04 (via <a href="https://packagecloud.io/EventStore/EventStore-OSS" target="_blank" rel="noopener noreferrer">packagecloud<OutboundLink/></a>)</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -s https://packagecloud.io/install/repositories/EventStore/EventStore-OSS/script.deb.sh <span class="token operator">|</span>
<span class="token function">sudo</span> <span class="token function">bash</span>
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> eventstore-oss<span class="token operator">=</span><span class="token number">21.6</span>.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="windows-via-chocolatey" tabindex="-1"><a class="header-anchor" href="#windows-via-chocolatey" aria-hidden="true">#</a> Windows (via <a href="https://chocolatey.org/packages/eventstore-oss" target="_blank" rel="noopener noreferrer">Chocolatey<OutboundLink/></a>)</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>choco <span class="token function">install</span> eventstore-oss -version <span class="token number">21.6</span>.0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="upgrade-procedure" tabindex="-1"><a class="header-anchor" href="#upgrade-procedure" aria-hidden="true">#</a> Upgrade Procedure</h2>
<p>To upgrade a cluster from 20.10.0, a usual rolling upgrade can be done:</p>
<ul>
<li>Pick a node (Start with follower nodes first, then choose the leader last).</li>
<li>Stop the node, upgrade it and start it.</li>
<li>21.6.0 introduced strict configuration check for settings set through environment variables. It won't allow passing unknown settings. If you were using the obsolete settings from the older versions, it's needed to update them. Database logs will provide the failure details, e.g. for <code>EVENTSTORE_EXT_HTTP_PORT</code> you will see the following line <code>Error while parsing options: The option ExtHttpPort is not a known option. (Parameter 'ExtHttpPort')</code> . After replacing with the valid param <code>EVENTSTORE_HTTP_PORT</code> database should start properly.</li>
</ul>
<p>If you are upgrading a cluster from version 5.x and below, please read the upgrade procedure in the 20.6.0 release notes. <a href="https://eventstore.com/blog/event-store-20.6.0-release/" target="_blank" rel="noopener noreferrer">https://eventstore.com/blog/event-store-20.6.0-release<OutboundLink/></a>.</p>
<p>21.6.0 is a feature release and will only be supported until the release of 21.10.0. Check out our <a href="https://www.eventstore.com/eventstoredb-long-term-support-and-release-schedule" target="_blank" rel="noopener noreferrer">release schedule<OutboundLink/></a> for more information, and for help on deciding on when you should upgrade.</p>
<h2 id="changes" tabindex="-1"><a class="header-anchor" href="#changes" aria-hidden="true">#</a> Changes</h2>
<h3 id="persistent-subscriptions-to-all" tabindex="-1"><a class="header-anchor" href="#persistent-subscriptions-to-all" aria-hidden="true">#</a> Persistent Subscriptions to $all</h3>
<p>Persistent Subscriptions over gRPC now support subscribing to the $all stream, with an optional filter. Support for these subscriptions will be released for gRPC clients shortly. These subscriptions can only be created in a gRPC client, not through the UI or the TCP clients.</p>
<h3 id="interpreted-runtime-for-projections" tabindex="-1"><a class="header-anchor" href="#interpreted-runtime-for-projections" aria-hidden="true">#</a> Interpreted Runtime for Projections</h3>
<p>We have introduced a new Interpreted runtime for projections, which replaces the existing V8 engine.</p>
<p>The Interpreted runtime is lighter-weight and easier to maintain than the existing legacy runtime. It will also allow us to package EventStoreDB for ARM processors and to provide a better debugging experience in the future.</p>
<p>This new runtime is enabled by default, but the legacy engine can be re-enabled by setting the <em>ProjectionRuntime</em> flag to <em>Legacy</em>.</p>
<h3 id="experimental-v3-log-format" tabindex="-1"><a class="header-anchor" href="#experimental-v3-log-format" aria-hidden="true">#</a> Experimental v3 Log Format</h3>
<p>21.6.0 includes the first preview of the new log format that we are working on. This new format is the first step towards some exciting new features and improved performance for larger databases.</p>
<p>At the moment, the new log format should behave similarly to the existing one. You can enable it by setting the <em>DbLogFormat</em> option to <em>ExperimentalV3</em> if you want to check it out.</p>
<p>Please be aware that this log format version is not compatible with the log V2 format, and is itself subject to change. As such, it is not meant for running in production, and can only be used for new databases. Tooling for migration will be coming at a later stage.</p>
<h3 id="batchappend-for-grpc" tabindex="-1"><a class="header-anchor" href="#batchappend-for-grpc" aria-hidden="true">#</a> BatchAppend for gRPC</h3>
<p>Support for a more performant append operation has been added to the gRPC proto. This will make appending large numbers of events much faster. This does come with some restrictions such as all appends made using a single user specified at the connection level rather than the operation level. Further documentation and client support will be added shortly.</p>
<h3 id="auto-configuration-on-startup" tabindex="-1"><a class="header-anchor" href="#auto-configuration-on-startup" aria-hidden="true">#</a> Auto Configuration on Startup</h3>
<p>There are a few configuration options that need to be tuned when running EventStoreDB on larger instances or machines in order to make the most of the available resources. To help with that, some options are now configured automatically at startup based on the system resources.</p>
<p>These options are <em>StreamInfoCacheCapacity</em>, <em>ReaderThreadsCount</em>, and <em>WorkerThreads</em>.</p>
<p>If you want to disable this behaviour, you can do so by simply overriding the configuration for the options.</p>
<h4 id="streaminfocachecapacity" tabindex="-1"><a class="header-anchor" href="#streaminfocachecapacity" aria-hidden="true">#</a> StreamInfoCacheCapacity</h4>
<p>StreamInfoCacheCapacity sets the maximum number of entries to keep in the stream info cache. This is the lookup that contains the information of any stream that has recently been read or written to. Having entries in this cache significantly improves write and read performance to cached streams on larger databases.</p>
<p>The cache is configured at startup based on the available free memory at the time. If there is 4gb or more available, it will be configured to take at most 75% of the remaining memory, otherwise it will take at most 50%. The minimum that it can be set to is 100,000 entries.</p>
<h4 id="readerthreadscount" tabindex="-1"><a class="header-anchor" href="#readerthreadscount" aria-hidden="true">#</a> ReaderThreadsCount</h4>
<p>ReaderThreadsCount configures the number of reader threads available to EventStoreDB. Having more reader threads allows more concurrent reads to be processed.</p>
<p>The reader threads count will be set at startup to twice the number of available processors, with a minimum of 4 and a maximum of 16 threads.</p>
<h4 id="workerthreads" tabindex="-1"><a class="header-anchor" href="#workerthreads" aria-hidden="true">#</a> WorkerThreads</h4>
<p>WorkerThreads configures the number of threads available to the pool of worker services.</p>
<p>At startup the number of worker threads will be set to 10 if there are more than 4 reader threads. Otherwise, it will be set to have 5 threads available.</p>
<h2 id="community-contributions" tabindex="-1"><a class="header-anchor" href="#community-contributions" aria-hidden="true">#</a> Community Contributions</h2>
<p>Thank you to the community members who made contributions to this server release!</p>
<ul>
<li><a href="https://github.com/marodev" target="_blank" rel="noopener noreferrer">Marodev<OutboundLink/></a>: Fix ReSharper's &quot;Merge sequential checks in &amp;&amp; or || expression” warnings <a href="https://github.com/EventStore/EventStore/pull/2961" target="_blank" rel="noopener noreferrer">(EventStore#2961)<OutboundLink/></a></li>
<li><a href="https://github.com/StuartFergusonVme" target="_blank" rel="noopener noreferrer">StuartFergusonVme<OutboundLink/></a>: Handle truncated streams when reading events for projections <a href="https://github.com/EventStore/EventStore/pull/2956" target="_blank" rel="noopener noreferrer">(EventStore#2956)<OutboundLink/></a></li>
<li><a href="https://github.com/StevenBlair123" target="_blank" rel="noopener noreferrer">StevenBlair123<OutboundLink/></a>: Prevent scavenged events from being passed to Projections <a href="https://github.com/EventStore/EventStore/pull/2947" target="_blank" rel="noopener noreferrer">(EventStore#2947)<OutboundLink/></a></li>
<li><a href="https://github.com/the-mikedavis" target="_blank" rel="noopener noreferrer">the-mikedavis<OutboundLink/></a>: Add NFIBrokerage/spear as a community gRPC client for Elixir <a href="https://github.com/EventStore/EventStore/pull/2939" target="_blank" rel="noopener noreferrer">(EventStore#2939)<OutboundLink/></a></li>
<li><a href="https://github.com/megakid" target="_blank" rel="noopener noreferrer">megakid<OutboundLink/></a>: Make Microsoft.NETFramework.ReferenceAssemblies reference private <a href="https://github.com/EventStore/EventStore/pull/2859" target="_blank" rel="noopener noreferrer">(EventStore#2859)<OutboundLink/></a></li>
</ul>
<h2 id="providing-feedback" tabindex="-1"><a class="header-anchor" href="#providing-feedback" aria-hidden="true">#</a> Providing Feedback</h2>
<p>If you encounter any issues, please don’t hesitate to open an issue on <a href="https://github.com/eventstore/eventstore" target="_blank" rel="noopener noreferrer">GitHub<OutboundLink/></a> if there isn’t one already.</p>
<p>Additionally, there is an active <a href="https://discuss.eventstore.com/" target="_blank" rel="noopener noreferrer">discuss channel<OutboundLink/></a>, and an #eventstore channel on the <a href="https://j.mp/ddd-es-cqrs" target="_blank" rel="noopener noreferrer">DDD-CQRS-ES<OutboundLink/></a> Slack community.</p>
</template>
