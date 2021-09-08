---
title: Operational characteristics
---

# Operational characteristics of Event Store Cloud

Event Store Cloud is a distributed fault tolerant provisioning system and control plane. It is hosted in Amazon AWS. All data components and processing components are distributed across three availability zones. State is backed up, and the platform can be easily restored to another region in the event of a total region failure.

# The impact of outages on resources

The following is a brief description of what can be expected given an outage of the given component.

## Event Store Cloud

### Cloud API

Performance may be degraded or inaccessible.

### Web console 

Performance may be degraded or inaccessible.

### Provisioned resources

The availability of provisioned resources (networks, peering links, clusters, and backups) **will not** be affected in the case that Event Store Cloud services become unavailable.

## Cloud providers

Cloud Provider outages may affect the availability of resources or the ability to create, delete, and update resources within Event Store Cloud.

### Networks and peerings

While networks and peering links at cloud providers are fault tolerant, occasionally events may occur that will degrade or, for a period of time remove network access to resources.

### Clusters

In the event of a failure, single node topology clusters may become unavailable until the service can be restored. Most failures will be handled by Event Store Cloud, however there will be a period of lost connectivity.

Multi-node, multi-zone topology clusters should sustain a single availability failure.

### Backups

Clusters and single nodes are backed up by volume snapshots at the selected cloud provider. These snapshots are stored within fault tolerant object storage for the provisioned region. It is possible that access to backups may be impacted temporarily. There is also a possibility that scheduled backups will not run for the duration of the outage.
