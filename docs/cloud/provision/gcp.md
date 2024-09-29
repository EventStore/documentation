---
title: Google Cloud Platform
order: 3
---

For Google Cloud customers, Event Store Cloud allows provisioning an EventStoreDB cluster in the same cloud. You can create a cluster in the same region to ensure the lowest latency.

Pre-requisites:
- You have an organization registered in Cloud console
- You can log in to the Cloud console as admin
- Your organization has at least one project
- You are the admin of the project
- You have access to create Google Cloud resources in the GCP project of your organization

The provisioning process consists of three steps:
1. Create a network in Event Store Cloud
2. Provision the EventStoreDB instance or cluster
3. Peer the new network with your own network in GCP

### Create a network

In the Event Store Cloud console, go to the [project context](../README.md#projects) and switch to `Networks`. Then, click on the `New network` button.

Make sure to fill out the required information:
- Network name
- Cloud provider - GCP
- Region - choose the GCP region
- CIDR block - the new network address range

![Create GCP network](./images/gcp/gcp-create-network.png)

To establish a connection between the cluster network and your own cloud network, you'd need to peer them. Currently, Event Store Cloud only supports peering within the same region. Therefore, ensure that you choose the same region as your own cloud network.

The network address range should not overlap with the address range of other networks in the same region and with your own GCP network, which you will be peering with. As any other cloud network, the CIDR block needs to be within the range specified by RFC1918.

After specifying all the details, click on the `Create network` button. You will be brought back to the networks list where the new network will appear as being provisioned. The provisioning process in GCP might take a little while. You'd need to click on the refresh button from time to time as the view won't update automatically.

![GCP active network](./images/gcp/gcp-network-active.png)

By clicking on the network in the list you can inspect the details like its name, status, region and address range.

Wait until the network becomes `Active` in the list before moving to the next step.

### Deploy a managed instance

Within the project scope you can view EventStoreDB clusters for the project if you click on the `Clusters` menu. Initially, the cluster list is empty and you will only see the `New cluster` button.

When you click on the button, you get to the cluster creation form.

On the first part of the form you need to specify the new cluster name, the cloud provider (GCP) and the EventStoreDB version. Further, you need to choose whether to start server-side projections by default.

![GCP cluster first part](./images/gcp/gcp-new-cluster-1.png)

::: warning Projections impact on performance
Both system projections and user-defined projections produce new events. Carefully consider the impact of enabled projections on database performance. Please refer to the [Performance impact](@server/features/projections/README.md#performance-impact) section of the projections documentation to learn more.
:::

The next section of the form allows choosing the instance size for cluster nodes. Use the provided instance size guidelines to choose the right size for your cluster. Note that the `F1` size is using burstable VMs, which is not suitable for production use.

::: tip Vertical scaling
At this moment, it is not possible to change the cluster node instance size. You can still resize cluster instances by taking a backup and restoring it to a different cluster with larger or smaller instances.
:::

Further, you need to specify the storage capacity. One disk kind is available at the moment, but you can change the disk size. Since we allow customers to expand the storage size online without service interruptions, you can start with smaller storage and expand it when you need more capacity.

Next, choose the network provisioned previously from the list. All cluster nodes will be attached to that network.

![GCP cluster second part](./images/gcp/gcp-new-cluster-2.png)

You will get the monthly price for the selected cluster size down below in the form.

Finally, when you click on `Create cluster`, the provisioning process starts, and you will get a new cluster available after a few minutes.

### Network peering

When the cluster provisioning process finishes, you get a new cluster (or single instance), which is connected to the network created in the first step. You won't be able to connect to the cluster since the network is not exposed to the Internet. In order to get access to the network and consequently to all the clusters in that network, you'd need to peer the Event Store Cloud network to your own GCP VPC network. Normally, your GCP VPC network would be also accessible by applications, which you want to connect to the new cloud EventStoreDB cluster.

::: warning Peering limitations
Currently, you can peer one Event Store Cloud network with only one GCP network on your account. We expect to lift this limitation in the future.
:::

For this example, we'll use a VPC network in GCP in the same region (`europe-west-4`).

![GCP VPC details](./images/gcp/gpc-vpc-details.png)

Notice that the VPC has one subnet in the same region as the Event Store Cloud network provisioned earlier.

The network page provide us enough details to start the peering process. In Event Store Cloud console, while in the same project context as the new network and cluster, click on `Peering` under the `Project` menu, then click on `New peering`.

Then, give the new peering a name and select the network created earlier. You'd need to fill out the remaining fields, using the information from GCP VPC. As you are peering with the whole VPC, you can specify multiple IP ranges for different subnets, or multiple IP ranges for the same subnet (GKE aliases, for example) as separate peer routes. However, the routed IP ranges must belong to subnets in the same region as the Event Store Cloud network.

| Peering form        | GCP VPC screen                                       |
|:--------------------|:-----------------------------------------------------|
| Peer GCP Project ID | GCP project ID, found in the project selection popup |
| Peer Network Name   | The VPC name                                         |
| GCP region          | VPC subnet region, cannot be changed                 |
| Peer routes         | One or more VPC subnet address ranges                |

For our example, here is the complete form:

![GCP peering - complete form](./images/gcp/gcp-peering-1.png)

::: note
Multiple peer routes are useful in case you want to peer with a subnet that has multiple IP ranges (aliases). A typical example would be aif you have a VPC-native GKE cluster, and you need pods in that cluster to work with Event Store Cloud. Then, you need to add the pod IP range to the peer route in addition to the subnet's primary IP range.

:::

::: warning
After you create a peering, you can't change the peer routes. If you would need to modify the routes, delete the peering and create it again with the updated set of peer routes. The limitation applies even in cases where a cloud provider supports dynamic route updates, e.g. in GCP. The reason is that the EventStore automation creates firewall rules for the peer routes when the peering is created. The firewall rules are not updated dynamically to prevent security breaches.
:::

When you click on the `Create peering` button, you'll be redirected to the peering list screen with the new peering resource being provisioned. After a little while, the status will change to `Intiated`.

![GCP peering - pending](./images/gcp/gcp-peering-2.png)

The information on the peering details screen provides some essential information to complete the peering process from GCP side.

When the peering is initiated, get back to Google Cloud console and navigate to `VPC network peering`. There, click `Create connection` and then `Continue`. Give new peering a name and choose the network on GCP side. Next, fill out the remaining values using the initiated peering details:

| Event Store Cloud | GCP connection peering |
|:------------------|:-----------------------|
| Peer Project ID   | Project ID             |
| Peer Network Name | VPC network name       |

Your Event Store Cloud Peered Project ID should be formatted as estenant-{organization id}. 
The Peer Network Name should be the Network ID of your VPC Network on Event Store Cloud.
View the screenshot below for more information.

**Important**: expand the `Exchange custom routes` section and enable both `Import` and `Export` options for custom routes. It will instruct GCP to create routes automatically.

Here is what our example GCP peering form would look like:

![Incoming peering request](./images/gcp/gcp-peering-3.png)

Click the `Create` button and when in the `VPC network peering` list, click `Refresh` until the peering status changes to `Active`. The peering status in Event Store Cloud console should also change to `Active`.

::: tip Peering issues
You might see the peering request getting stuck. There are several reasons for this to happen, like your cloud account quota or overlapping CIDR blocks. You can find all the necessary diagnostics in the Event Console in Event Store Cloud.
:::

At this moment, you should be able to connect to the EventStoreDB cluster in the cloud from any VM, which is connected to your GCP VPC network.

Depending on your setup, you might already have a connection available from your local machine to the GCP VPC using a site-to-site VPN. If not, ask your operations about the connection details.

### Next step

You are now ready to start using the new EventStoreDB cluster in the cloud. Follow the [Using the cloud cluster](../use/README.md) section to learn more.

