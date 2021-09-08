<template><h1 id="operational-characteristics-of-event-store-cloud" tabindex="-1"><a class="header-anchor" href="#operational-characteristics-of-event-store-cloud" aria-hidden="true">#</a> Operational characteristics of Event Store Cloud</h1>
<p>Event Store Cloud is a distributed fault tolerant provisioning system and control plane. It is hosted in Amazon AWS. All data components and processing components are distributed across three availability zones. State is backed up, and the platform can be easily restored to another region in the event of a total region failure.</p>
<h1 id="the-impact-of-outages-on-resources" tabindex="-1"><a class="header-anchor" href="#the-impact-of-outages-on-resources" aria-hidden="true">#</a> The impact of outages on resources</h1>
<p>The following is a brief description of what can be expected given an outage of the given component.</p>
<h2 id="event-store-cloud" tabindex="-1"><a class="header-anchor" href="#event-store-cloud" aria-hidden="true">#</a> Event Store Cloud</h2>
<h3 id="cloud-api" tabindex="-1"><a class="header-anchor" href="#cloud-api" aria-hidden="true">#</a> Cloud API</h3>
<p>Performance may be degraded or inaccessible.</p>
<h3 id="web-console" tabindex="-1"><a class="header-anchor" href="#web-console" aria-hidden="true">#</a> Web console</h3>
<p>Performance may be degraded or inaccessible.</p>
<h3 id="provisioned-resources" tabindex="-1"><a class="header-anchor" href="#provisioned-resources" aria-hidden="true">#</a> Provisioned resources</h3>
<p>The availability of provisioned resources (networks, peering links, clusters, and backups) <strong>will not</strong> be affected in the case that Event Store Cloud services become unavailable.</p>
<h2 id="cloud-providers" tabindex="-1"><a class="header-anchor" href="#cloud-providers" aria-hidden="true">#</a> Cloud providers</h2>
<p>Cloud Provider outages may affect the availability of resources or the ability to create, delete, and update resources within Event Store Cloud.</p>
<h3 id="networks-and-peerings" tabindex="-1"><a class="header-anchor" href="#networks-and-peerings" aria-hidden="true">#</a> Networks and peerings</h3>
<p>While networks and peering links at cloud providers are fault tolerant, occasionally events may occur that will degrade or, for a period of time remove network access to resources.</p>
<h3 id="clusters" tabindex="-1"><a class="header-anchor" href="#clusters" aria-hidden="true">#</a> Clusters</h3>
<p>In the event of a failure, single node topology clusters may become unavailable until the service can be restored. Most failures will be handled by Event Store Cloud, however there will be a period of lost connectivity.</p>
<p>Multi-node, multi-zone topology clusters should sustain a single availability failure.</p>
<h3 id="backups" tabindex="-1"><a class="header-anchor" href="#backups" aria-hidden="true">#</a> Backups</h3>
<p>Clusters and single nodes are backed up by volume snapshots at the selected cloud provider. These snapshots are stored within fault tolerant object storage for the provisioned region. It is possible that access to backups may be impacted temporarily. There is also a possibility that scheduled backups will not run for the duration of the outage.</p>
</template>
