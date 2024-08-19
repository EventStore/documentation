---
title: Get started
dir:
    text: "Provisioning"
    order: 1
---

# Event Store Cloud provisioning

Event Store Cloud allows you to provision EventStoreDB clusters in AWS, GCP, and Azure.

Currently, managed EventStoreDB instances in Event Store Cloud are only available via private network connection using VPC/VN peering.

The provisioning process consists of the following steps:

1. Create a network in Event Store Cloud.
2. Peer the new network with your own network at the same cloud.
3. Deploy the EventStoreDB cluster.

This is how networking will look like when all provisioning steps are performed:

![ES_Cloud_Networking](./images/es-cloud-networking.svg)

Find the detailed guideline for your cloud provider:
- [Amazon Web Services (AWS)](aws.md)
- [Google Cloud Platform (GCP)](gcp.md)
- [Microsoft Azure](azure.md)

