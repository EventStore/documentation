# Event Store Cloud provisioning

Event Store Cloud allows you to provision EventStoreDB clusters in AWS, GCP, and Azure.

The provisioning process consists of the following steps:

1. Create a network in Event Store Cloud.
2. Peer the new network with your own network at the same cloud.
3. Deploy the EventStoreDB cluster.

Find the detailed guideline for your cloud provider:
- [Amazon Web Services (AWS)](aws)
- [Google Cloud Platform (GCP)](gcp)
- [Microsoft Azure](azure)


This is how networking will look like when all provisioning steps are performed:

::: card

![ES_Cloud_Networking](./images/es-cloud-networking.svg)

:::