# Providers

## Azure

### Do you use locally-redundant storage (LRS) or zone-redundant storage (ZRS)?

Customer data is only stored on Premium SSD block device targets. We do not utilize Azure file or blob storage for customer data.

### We use AKS, to simplify setup can you expose the cluster to the public internet?

We have no plans to expose clusters via a public IP address. We will be providing guidelines on how to connect AKS clusters to Event Store Cloud.

### Why can't I resize disks in Azure after provisioning the cluster?

The disk resize operation in Azure requires us to shot down the cluster node. It works differently in GCP and AWS, that's why we are providing this options for GCP and AWS, but not for Azure. We have plans to implement this feature, but there's no ETA at the moment. Due to Azure limitations, disk resize for single-node instances would always involve some downtime.

## Google Cloud Platform

### How can we connect GKE workloads to Event Store Cloud?

Please read our [blog post](https://www.eventstore.com/blog/connecting-event-store-cloud-to-google-kubernetes-engine) on this topic. We will be adding it to the documentation soon.
