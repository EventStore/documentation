# Providers

## Azure

### Do you use locally-redundant storage (LRS) or zone-redundant storage (ZRS)?

Customer data is only stored on Premium SSD block device targets. We do not utilize Azure file or blob storage for customer data.

### We use AKS, to simplify setup can you expose the cluster to the public internet?

We have no plans to expose clusters via a public IP address. We will be providing guidelines on how to connect AKS clusters to Event Store CLoud.

## Google Cloud Platform

### How can we connect GKE workloads to Event Store Cloud?

Please read our [blog post](https://www.eventstore.com/blog/connecting-event-store-cloud-to-google-kubernetes-engine) on this topic. We will it to the documentation later on.
