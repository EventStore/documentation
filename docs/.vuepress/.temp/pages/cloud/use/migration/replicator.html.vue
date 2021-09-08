<template><h1 id="migrating-data" tabindex="-1"><a class="header-anchor" href="#migrating-data" aria-hidden="true">#</a> Migrating data</h1>
<p>When replacing a self-hosted EventStoreDB cluster with the managed cluster in Event Store Cloud, you might need to migrate the data, so your workloads can switch to the cloud cluster.</p>
<p>Currently, the only way to migrate data to the cloud cluster or instance is live migration by replication. Live migration is done by reading events from the source database (from <code>$all</code>) using a client protocol (TCP or gRPC) and then writing those events to the target database.</p>
<h2 id="limitations" tabindex="-1"><a class="header-anchor" href="#limitations" aria-hidden="true">#</a> Limitations</h2>
<p>Consider the following limitations of live migration to understand if it will work for you.</p>
<h3 id="write-performance" tabindex="-1"><a class="header-anchor" href="#write-performance" aria-hidden="true">#</a> Write performance</h3>
<p>If the target database must get events in exactly the same order as they are in the source database, it's impossible to use concurrent writers. Therefore, the speed of replication will be limited by how much time it takes to append one event to the cloud cluster. For example, if it takes 5 ms to append one event, replicating one million events will take about an hour.</p>
<p>In case your system only requires events to be ordered within a stream, and you have a lot of streams, it is possible to use concurrent writers. As those writers get events partitioned by stream name, the events order in each stream will be kept, but the global order will not. The advantage of using concurrent partitioned writes is performance increase. For example, six writers on a C4-sized instance would give you over 1000 events per second replication speed. In that case, in one hour you can replicate four millions events, not one.</p>
<h3 id="write-load-on-the-source" tabindex="-1"><a class="header-anchor" href="#write-load-on-the-source" aria-hidden="true">#</a> Write load on the source</h3>
<p>If the source cluster keep getting new events appended to its database, ensure that the number of events appended to the source database is significantly less than the number of replicated events for a given time period. The goal there is to ensure that the replication process will ever finish. For example, when you see one million new events written to the source cluster per hour, and you observe one million events being replicated per hour, the replication will never finish.</p>
<h3 id="system-metadata" tabindex="-1"><a class="header-anchor" href="#system-metadata" aria-hidden="true">#</a> System metadata</h3>
<p>When reading events from EventStoreDB, you get several system metadata properties in the event structure on the client side:</p>
<ul>
<li>Event number (position of the event in the stream)</li>
<li>Created date (timestamp when the event was appended to the log)</li>
<li>Commit position (physical event position in the global log)</li>
</ul>
<p>The event number in the target database will start from zero, although it could be any number in the source database, if the stream was ever truncated or deleted.</p>
<p>As all the events written to the target database will be &quot;new&quot;, the <em>Created date</em> timestamp will be set to the moment when the event was replicated.</p>
<p>Due to the fact that in the source database the global log has gaps caused by deleted or truncated streams, as well as expired events, the commit position in the target database will not be the same for all events.</p>
<h2 id="effect-on-workloads" tabindex="-1"><a class="header-anchor" href="#effect-on-workloads" aria-hidden="true">#</a> Effect on workloads</h2>
<p>In addition to the points mentioned in the previous section, keep in mind that changes in event number and commit position will affect your subscriptions.</p>
<p>For catch-up subscriptions, you will have to ensure to provide new checkpoints when moving those workloads to the replicated database.</p>
<p>For persistent subscriptions, you'd need to re-create them in the replicated database, with start position that corresponds with the last known persistent subscription checkpoint in the source database.</p>
<p>The same applies for custom JavaScript projections, which emit new events, except of those that emit links.</p>
<p>Links will not be replicated, as all the system events get filtered out (except stream metadata events). Therefore, all the links would normally be recreated. For example, if you use a category projection and <code>$ce</code> streams, those streams will be re-created by the system projection in the target database. In case you have custom projections, which emit links, those projections need to be recreated and started in the target database, so they can recreate all the links.</p>
<h2 id="executing-the-migration" tabindex="-1"><a class="header-anchor" href="#executing-the-migration" aria-hidden="true">#</a> Executing the migration</h2>
<p>Event Store provides a tool that allows you to replicate events between two clusters or instances. The tool is called Event Store Replicator, and it has its own <a href="https://replicator.eventstore.org" target="_blank" rel="noopener noreferrer">documentation website<OutboundLink/></a>.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Event Store Replicator is an Open Source Software, provided as-is, without warranty, and not covered by the EventStoreDB support contract that you might have.</p>
</div>
<h3 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h3>
<p>You need to run the replication tool on your own infrastructure. The primary condition is that the replicator must be able to reach both source and target EventStoreDB clusters. For example, if you replicate from a self-hosted cluster in AWS to Event Store Cloud in AWS, you'd need to peer between the VPC of the self-hosted cluster and the Event Store Cloud network. We provide <a href="https://replicator.eventstore.org/docs/deployment/" target="_blank" rel="noopener noreferrer">detailed instructions<OutboundLink/></a> about running the replicator in Kubernetes and using Docker Compose.</p>
<p>For the cloud migration scenario, the simplest case that involves no filtering (except scavenge) and transformations, you can use the following configuration:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">replicator</span><span class="token punctuation">:</span>
  <span class="token key atrule">reader</span><span class="token punctuation">:</span>
    <span class="token key atrule">connectionString</span><span class="token punctuation">:</span> ConnectTo=tcp<span class="token punctuation">:</span>//admin<span class="token punctuation">:</span>changeit@my<span class="token punctuation">-</span>instance.acme.company<span class="token punctuation">:</span>1113; HeartBeatTimeout=500; UseSslConnection=false;
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> tcp
  <span class="token key atrule">sink</span><span class="token punctuation">:</span>
    <span class="token key atrule">connectionString</span><span class="token punctuation">:</span> esdb+discover<span class="token punctuation">:</span>//username<span class="token punctuation">:</span>password@clusterid.mesdb.eventstore.cloud<span class="token punctuation">:</span><span class="token number">2113</span>
    <span class="token key atrule">protocol</span><span class="token punctuation">:</span> grpc
    <span class="token key atrule">partitionCount</span><span class="token punctuation">:</span> <span class="token number">1</span>
    <span class="token key atrule">bufferSize</span><span class="token punctuation">:</span> <span class="token number">1000</span>
  <span class="token key atrule">scavenge</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">transform</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">filters</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token key atrule">checkpoint</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"./checkpoint"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>As the replication process runs continuously until you stop it, you can test the source cluster data and gradually move read-only workloads to it, like subscriptions. When you confirm that everything looks fine from the target database, you can move all the other workloads to the new cluster.</p>
<h3 id="example-scenario" tabindex="-1"><a class="header-anchor" href="#example-scenario" aria-hidden="true">#</a> Example scenario</h3>
<p>Here are the steps, which you can perform to migrate in one go:</p>
<ul>
<li>Configure and deploy ES Replicator</li>
<li>Wait until it gets in to the restart loop after all the historical events are replicated</li>
<li>Stop all the workloads, which write to the source database</li>
<li>Ensure all the remaining events are replicated, then stop the replicator</li>
<li>Ensure that all your subscriptions processed all the events in the source database</li>
<li>Record all the necessary checkpoints, or have the ability to subscribe from <em>now</em> in your subscriptions</li>
<li>Move workloads with subscriptions to the target cluster</li>
<li>Move workloads that append events to the target cluster</li>
</ul>
<p>Another option is to move the subscriptions first:</p>
<ul>
<li>Configure and deploy ES Replicator</li>
<li>Wait until it gets in to the restart loop after all the historical events are replicated</li>
<li>Stop all the workloads, which write to the source database</li>
<li>Stop the subscription workload, and find the corresponding checkpoint value in the target database (stream position or global position in <code>$all</code>)</li>
<li>Migrate the subscription workload to the target cluster, using the new checkpoint</li>
</ul>
<p>As the replication process will continue endlessly, you can move some of the subscriptions first, ensure that everything works as expected, then continue by moving more subscriptions as well as workloads, which append events.</p>
<h2 id="more-information" tabindex="-1"><a class="header-anchor" href="#more-information" aria-hidden="true">#</a> More information</h2>
<p>Find out more about replicator features, limitations, as well as deployment guidelines <a href="https://replicator.eventstore.org" target="_blank" rel="noopener noreferrer">in the documentation<OutboundLink/></a>.</p>
<p>If you experience an issue when using Replicator, or you'd like to suggest a new feature, please open an issue in the <a href="https://github.com/EventStore/replicator" target="_blank" rel="noopener noreferrer">GitHub project<OutboundLink/></a>.</p>
</template>
