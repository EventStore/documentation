---
order: 3
---

# Microsoft Azure

For Microsoft Azure customers, Event Store Cloud allows provisioning an EventStoreDB cluster in the same cloud. You can create a cluster in the same region to ensure the lowest latency.

::: warning Azure considerations
Microsoft Azure has a few differences that you need to consider when using Event Store Cloud with Azure. We listed all currently known limitations [below on this page](#considerations-for-microsoft-azure). Please ensure you are aware of it before starting to use EventStoreDB in Azure.
:::

Pre-requisites:
- You have an organization registered in Cloud console
- You can log in to the Cloud console as admin
- Your organization has at least one project
- You are the admin of the project
- You have access to create Azure resources in the Azure account of your organization

The provisioning process consists of three steps:
1. Create a network in Event Store Cloud
2. Provision the EventStoreDB instance or cluster
3. Peer the new network with your own Azure network

## Create a network

In the Event Store Cloud console, go to the [project context](../README.md#projects) and switch to `Networks`. Then, click on the `New network` button.

Make sure to fill out the required information:
- Network name
- Cloud provider - Azure
- Region - choose the Azure region
- CIDR block - the new network address range

![Create Azure network](./images/azure/azure-create-network.png)

In order to establish a connection between the cluster network and your own cloud network, you'd need to peer them. Currently, Event Store Cloud only supports peering within the same region. Therefore, ensure that you choose the same region as your own cloud network.

The network address range should not overlap with the address range of other networks in the same region and with your own Azure network, which you will be peering with. As any other cloud network, the CIDR block needs to be within the range specified by RFC1918.

After specifying all the details, click on the `Create network` button. You will be brought back to the networks list where the new network will appear as being provisioned. The provisioning process in Azure might take several minutes. You'd need to click on the refresh button from time to time as the view won't update automatically.

![Azure active network](./images/azure/azure-network-active.png)

By clicking on the network in the list you can inspect the details like its name, status, region and address range.

Wait until the network becomes `Active` in the list before moving to the next step.

## Deploy a managed instance

Within the project scope you can view EventStoreDB clusters for the project if you click on the `Clusters` menu. Initially, the cluster list is empty and you will only see the `New cluster` button.

When you click on the button, you get to the cluster creation form.

On the first part of the form you need to specify the new cluster name, the cloud provider (Azure) and the EventStoreDB version. Further, you need to choose whether to start server-side projections by default.

![Azure cluster first part](./images/azure/azure-new-cluster-1.png)

::: warning Projections impact on performance
Both system projections and user-defined projections produce new events. Carefully consider the impact of enabled projections on database performance. Please refer to the [Performance impact](@server/features/projections.md#performance-impact) section of the projections documentation to learn more.
:::

The next section of the form allows choosing the instance size for cluster nodes. Use the provided instance size guidelines to choose the right size for your cluster. Note that the `F1` size is using burstable VMs, which is not suitable for production use.

::: tip Vertical scaling
At this moment, it is not possible to change the cluster node instance size. You can still resize cluster instances by taking a backup and restoring it to a different cluster with larger or smaller instances.
:::

Further, you need to specify the deployment topology (single node or a three-node HA cluster), and the storage capacity. One disk kind is available at the moment (Premium SSD LRS).

Next, choose the network provisioned previously from the list. All cluster nodes will be attached to that network.

![Azure cluster second part](./images/azure/azure-new-cluster-2.png)

You will get the monthly price for the selected cluster size down below in the form.

Finally, when you click on `Create cluster`, the provisioning process starts and you will get a new cluster available after a few minutes.

## Network peering

When the cluster provisioning process finishes, you get a new cluster (or single node), which is connected to the network created in the first step. You won't be able to connect to the cluster since the network is not exposed to the Internet. In order to get access to the network and consequently to all the clusters in that network, you'd need to peer the Event Store Cloud network to your own Azure network. Normally, your Azure network would be also accessible by applications, which you want to connect to the new cloud EventStoreDB cluster.

::: warning Peering limitations
Currently, you can peer one Event Store Cloud network with only one Azure network on your account. We expect to lift this limitation in the future.
:::

For this example, we'll use an Azure network the same region (UK South).

In Event Store Cloud console, while in the same project context as the new network and cluster, click on `Peering` under the `Project` menu, then click on `New peering`.

Then, give the new peering a name and select the network created earlier.

You also need to find your tenant ID, which is only visible on the Azure AD [properties page](https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Properties). Alternatively, you can use the `Get-AzureADTenantDetails` [PowerShell command](https://docs.microsoft.com/en-us/powershell/module/azuread/Get-AzureADTenantDetail?view=azureadps-2.0).

Finally, you'd need to fill out all the fields:

| Peering form    | Azure network details                                                             |
|:----------------|:----------------------------------------------------------------------------------|
| Peer Tenant ID  | Tenant ID from Azure AD                                                           |
| Peer Network ID | Network resource ID (can be found on the network Properties page or in JSON view) |
| Azure region    | Network region, cannot be changed                                                 |
| Peer routes     | One or more IP ranges for the selected VPC                                        |

For our example, here is the complete form:

![Azure peering - complete form](./images/azure/azure-peering-1.png)

When you click on the `Create peering` button, Event Store Cloud will check if it has permissions to create the peering (see [Azure Considerations](#network-peering-in-azure)). The Cloud console will display a set of pre-populated Azure CLI commands, which you need to execute in order for Event Store Cloud to be able to create the peering.

![Azure peering - sa](./images/azure/azure-peering-2.png)

::: tip Service principal
Event Store Cloud uses one service principal. It means that once you created it, the principal will be used for all the peerings you create. Therefore, you only need to execute the command `az ad sp create` once.
:::

After completing all those commands, click on the `Create peering` button. You'll be redirected to the peering list screen with the new peering resource being provisioned. After a little while, the status will change to `Intiated`. If the status doesn't change after 10 minutes, delete the peering and try again, ensuring the details were entered correctly. Mismatching network region and address range are the most common reasons for the peering to not being provisioned properly.

When the peering is initiated, get back to Azure Portal and navigate to the `Peering` page of your Azure network. There, you will see the newly provisioned peering, which should have `Connected` in the `Peering status` column.

In a short while, the initiated peering in Event Store Cloud console should change its status to `Active`. You might need to refresh the list from time to time as it doesn't update automatically.

::: tip Peering issues
You might see the peering request getting stuck. There are several reasons for this to happen, like your cloud account quota or overlapping CIDR blocks. You can find all the necessary diagnostics in the `Event Console` in Event Store Cloud.
:::

At this moment, you should be able to connect to the EventStoreDB cluster in the cloud from any VM, which is connected to your Azure network.

Depending on your setup, you might already have a connection available from your local machine to the Azure network using a site-to-site or point-to-site VPN. If not, ask your Azure administrator about the connection details.


## Next step

You are now ready to start using the new EventStoreDB cluster in the cloud. Follow the [Using the cloud cluster](../use/README.md) section to learn more.

## Considerations for Microsoft Azure

Due to differences between Microsoft Azure and other cloud providers, the provisioning process in Event Store Cloud is different from AWS and GCP. We've made a list of these differences here in order to help you make an informed decision about Cloud providers.

### Network peering in Azure

When creating a peering link, Azure requires the user to configure a security principal, referencing the application ID of Event Store Cloud, and also configure and apply a role allowing that principal to modify the network resource of the remote network.

### Disk

We're aware that Azure Premium SSD volumes have a strict IOPS limit and this limit depends on the volume size. Very small volumes do not provide enough throughput for most production scenarios. We suggest you consider using at least 246 GiB disks to get enough IOPS for the database. You can check the current throughput limits for Azure Premium SSD volumes in [Azure documentation](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd).
