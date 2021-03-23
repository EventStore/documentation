# Cloud EventStoreDB in Azure

For Microsoft Azure customers, Event Store Cloud allows provisioning an EventStoreDB cluster in the same cloud. You can create a cluster in the same region to ensure lowest latency.

::: warning Azure considerations
Microsoft Azure has a few differences that you need to consider when using Event Store Cloud with Azure. We listed all currently known limitations on a [separate page](./considerations.md). Please ensure you are aware of it before starting to use EventStoreDB in Azure.
:::

Pre-requisites:
- You are a Preview customer of Event Store Cloud
- You have an organisation registered in Cloud console
- You can login to the Cloud console as admin
- Your organisation has at least one project
- You are the admin of the project
- You have access to create Azure resources in the Azure account of your organisation

The provisioning process consists of three steps:
1. Create a network in Event Store Cloud
2. Provision the EventStoreDB instance or cluster
3. Peer the new network with your own Azure network

## Create a network

In the Event Store Cloud console, go to the [project context](../../intro/quick-start.md#projects) and switch to `Networks`. Then, click on the `New network` button.
 
 Make sure to fill out the required information:
 - Network name
 - Cloud provider - Azure
 - Region - choose the Azure region
 - CIDR block - the new network address range

::: card
![Create Azure network](./images/azure-create-network.png)
:::
 
 In order to establish a connection between the cluster network and your own cloud network, you'd need to peer them. Currently, Event Store Cloud only supports peering within the same region. Therefore, ensure that you choose the same region as your own cloud network.
 
 The network address range should not overlap with the address range of other networks in the same region and with your own Azure network, which you will be peering with. As any other cloud network, the CIDR block needs to be within the range specified by RFC1918.
 
After specifying all the details, click on the `Create network` button. You will be brought back to the networks list where the new network will appear as being provisioned. The provisioning process in Azure might take several minutes. You'd need to click on the refresh button from time to time as the view won't update automatically.

::: card
![Azure active network](./images/azure-network-active.png)
:::

By clicking on the network in the list you can inspect the details like its name, status, region and address range.

Wait until the network becomes `Active` in the list before moving to the next step.

## Deploy EventStoreDB

Within the project scope you can view EventStoreDB clusters for the project if you click on the `Clusters` menu. Initially, the cluster list is empty and you will only see the `New cluster` button.

When you click on the button, you get to the cluster creation form.

On the first part of the form you need to specify the new cluster name, the cloud provider (Azure) and the EventStoreDB version (currently it's only 20.6). Further, you need to choose the deployment size (single instance or three-node cluster) and whether to start server-side projections by default.

::: card
![Azure cluster first part](./images/azure-new-cluster-1.png)
:::

::: warning Projections impact performance
Both system projections and user-defined projections produce new events. Carefully consider the impact of enabled projections on database performance. Please refer to the [Performance impact](../../..//server/generated/v5/docs/server/projections/README.md#performance-impact) section of the projections documentation to learn more.
:::

The lower section of the form allows choosing the instance size for cluster nodes. Currently, only three instance sizes are available. The `F1` size is the lower-edge, aiming mainly to support testing scenarios and experiments due to its low price. Other instance sizes are production-grade.

::: tip Vertical scaling
At this moment, it is not possible to change the cluster node instance size. You can still resize cluster instances by taking a backup and restoring it to a different cluster with larger or smaller instances.
:::

::: card
![Azure cluster second part](./images/azure-new-cluster-2.png)
:::

Further, you need to specify the storage capacity. One disk kind is available at the moment (Premium SSD LRS), but you can change the disk size. As we currently do not support online disk resize for Azure, you need to ensure that the disk size you choose will support your estimated data volume.

Finally, choose the network provisioned previously from the list. All cluster nodes will be attached to that network.

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

| Peering form | Azure network details |
| :----------- | :------------- |
| Peer Tenant ID | Tenant ID from Azure AD |
| Peer Network ID | Network resource ID (can be found on the network Properties page or in JSON view) |
| Azure region | Network region, cannot be changed |
| Peer address space | IPv4 CIDR (address space for the whole network) |

For our example, here is the complete form:

::: card
![Azure peering - complete form](./images/azure-peering-1.png)
:::

When you click on the `Create peering` button, Event Store Cloud will check if it has permissions to create the peering (see [Azure Considerations](./considerations.md#network-peering)). The Cloud console will display a set of pre-populated Azure CLI commands, which you need to execute in order for Event Store Cloud to be able to create the peering.

::: card
![Azure peering - sa](./images/azure-peering-2.png)
:::

After completing all those commands, click on the `Create peering` button. You'll be redirected to the peering list screen with the new peering resource being provisioned. After a little while, the status will change to `Intiated`. If the status doesn't change after 10 minutes, delete the peering and try again, ensuring the details were entered correctly. Mismatching network region and address range are most common reasons for the peering to not being provisioned properly.

When the peering is initiated, get back to Azure Portal and navigate to the `Peering` page of your Azure network. There, you will see the newly provisioned peering, which should have `Connected` in the `Peering status` column.

In a short while, the initiated peering in Event Store Cloud console should change its status to `Active`. You might need to refresh the list from time to time as it doesn't update automatically.

::: tip Peering issues
You might see the peering request getting stuck. There are several reasons for this to happen, like your cloud account quota or overlapping CIDR blocks. You can find all the necessary diagnostics in the `Event Console` in Event Store Cloud.
:::

At this moment, you should be able to connect to the EventStoreDB cluster in the cloud from any VM, which is connected to your Azure network.

Depending on your set up, you might already have a connection available from your local machine to the Azure network using a site-to-site or point-to-site VPN. If not, ask your Azure administrator about the connection details.

## Next step

You are now ready to start using the new EventStoreDB cluster in the cloud. Follow to the [Using the cloud cluster](../../use) section to learn more.


 
