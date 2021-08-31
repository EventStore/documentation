# Considerations for Microsoft Azure

Due to differences between Microsoft Azure and other cloud providers, the provisioning process in Event Store Cloud is different from AWS and GCP. We've made a list of these differences here in order to help you make an informed decision about Cloud providers.

## Network peering

When creating a peering link, Azure requires the user to configure a security principal, referencing the application ID of Event Store Cloud, and also configure and apply a role allowing that principal to modify the network resource of the remote network.

## Disk resize

Currently, it is impossible to expand disks on Event Store Cloud nodes provisioned to Azure. We plan to provide this feature at a later date, but as there is no native support within Azure, implementing this requires more planning and thought on our part.

There are positive ways around this, and we advise you to choose the disk size accordingly from the start, so the volume size will accommodate the growth of your data over time. You can also backup an existing cluster and restore the data to a new cluster with larger disks.

We're aware that Azure Premium SSD volumes have a strict IOPS limit and this limit depends on the volume size. Very small volumes do not provide enough throughput for most production scenarios. We suggest you consider using at least 246 GiB disks to get enough IOPS for the database. You can check the current throughput limits for Azure Premium SSD volumes in [Azure documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd).

## Resource provisioning

Azure resource provisioning speed will almost always be slower and more highly variable than other providers. Please account for this when interacting with provisioned resources on Azure.

## Available Regions

At the moment, you can deploy EventStoreDB clusters only in regions with three or more availability zones, and many Azure regions do not have the minimum number of availability zones to support the deployment of managed EventStoreDB clusters. In the future, we plan to allow the deployment of single node topologies to all regions. We'll also introduce a new topology that allows cluster deployments to a single availability zone.

Currently, we support following Azure regions:
- Australia East,
- Canada Central,
- Central US,
- East US,
- East US 2,
- France Central,
- Japan East,
- North Europe,
- Southeast Asia,
- UK South,
- West Europe,
- West US 2.

## Pricing

Prices for computing resources (virtual machines) in Azure are generally higher, compared with AWS and GCP, and this is reflected in the costs for managed EventStoreDB deployments. As EventStoreDB requires at least two CPU cores and the smallest instance size in Azure is more expensive, the `F1` instance size in Azure is the most expensive of the three cloud providers we offer.  
