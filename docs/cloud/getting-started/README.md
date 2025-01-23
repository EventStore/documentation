---
title: Clusters overview
dir:
    text: "Getting started"
    order: 2
---

# Kurrent Cloud provisioning

Kurrent Cloud allows you to provision managed KurrentDB clusters in AWS, GCP, and Azure.

Clusters can be provisioned with public access enabled or restrict access to private network connection using VPC peering.

## Public access

For public access, the provisioning process is straightforward. You can go to the Clusters screen and click on the `New cluster` button. A Network and IP Access List will be created and the cluster will be deployed.

See the [Public Access Clusters](public.md) guide to get started.

## Private network connection

For private network connection, the provisioning process is a bit more complex. Similar to public access, when you create a cluster, you can specify a private network for your chosen cloud provider. Once the network is created, you will need to initiate a VPC peering connection with your own VPC.

The following guides will walk you through the process of creating a Private Access KurrentDB cluster for each cloud provider:
- [Amazon Web Services (AWS)](./private_access/aws.md)
- [Google Cloud Platform (GCP)](./private_access/gcp.md)
- [Microsoft Azure](./private_access/azure.md)