# Considerations for Microsoft Azure

Due to differences between Microsoft Azure and other cloud providers, the provisioning process in Event Store Cloud is different from AWS and GCP. Event Store Cloud also has certain limitations when it comes to Azure, which you can also find on this page.

## Network peering

When creating peering links in Azure require the user to configure a security principle referencing the application ID of Event Store Cloud, as well as configure and apply a role allowing that principle to modify the network resource of the remote network. Event Store Cloud console provides the necessary Azure CLI commands at creation time, to support this operation.

## Disk resize

Currently, it is impossible to expand disks on EventStoreDB cloud nodes provisioned to Azure. We plan to provide this feature at a later date, as an implementation for Azure requires a great deal more orchestration, as there is no native support within the platform itself.

We advise to choose the disk size accordingly from the start, so the volume size will accommodate the growth of your data over time. Another workaround would be to backup an existing cluster and restore the data to a new cluster with larger disks.

Keep in mind that Azure Premium SSD volumes have severe IOPS limit and this limit depends on the volume size. Very small volumes do not provide enough throughput for most of production scenarios. Consider using at least 246 GiB disks to get enough IOPS for the database. You can check the current throughput limits for Azure Premium SSD volumes in [Azure documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd).

## Resource provisioning

Azure resource provisioning speed will almost always be slower and more highly variable than other providers. Please account for this when interacting with provisioned resources on Azure.

## Performance and reliability

During our tests and usage, Azure has proved to be the least reliable of all the support cloud providers. We have noticed substandard network performance and substandard disk IO performance when compared to AWS and GCP.

Many Azure regions do not have the minimum number of availability zones required to support the deployment of managed EventStoreDB clusters. At the moment, you can only deploy EventStoreDB clusters in regions with three or more availability zones. In the future, we plan to allow the deployment of single node topologies to all regions. We'll also introduce a new topology that allows cluster deployments to a single availability zone.

## Pricing

Prices for compute resources (virtual machines) in Azure are generally higher, compared with AWS and GCP. Therefore, you will find that managed EventStoreDB deployments in Azure are more expensive.

In particular, the `F1` instance size in Azure is much more expensive than the same size in AWS and GCP. It's because we require at least two CPU cores and the smallest suitable instance size in Azure is significantly more expensive, compared to other cloud providers.
