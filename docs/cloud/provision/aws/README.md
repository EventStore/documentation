# Cloud EventStoreDB in AWS

For AWS customers, Event Store Cloud allows provisioning an EventStoreDB cluster in the same cloud. You can create a cluster in the same region to ensure lowest latency.

Pre-requisites:
- You are a Preview customer of Event Store Cloud
- You have an organisation registered in Cloud console
- You can login to the Cloud console as admin
- Your organisation has at least one project
- You are the admin of the project
- You have access to create AWS resources in the AWS account of your organisation

The provisioning process consists of three steps:
1. Create a network in Event Store Cloud
2. Provision the EventStoreDB instance or cluster
3. Peer the new network with your own AWS network

## Create a network

In the Event Store Cloud console, go to the [project context](../quick-start.md#projects) and switch to `Networks`. Then, click on the `New network` button.
 
 Make sure to fill out the required information:
 - Network name
 - Cloud provider - AWS
 - Region - choose the AWS region
 - CIDR block - the new network address range
 
::: el-card :body-style="{ padding: '0px' }" 
![Create AWS network](./images/aws-create-network.png)
:::
 
 In order to establish a connection between the cluster network and your own cloud network, you'd need to peer them. Currently, Event Store Cloud only supports peering within the same region. Therefore, ensure that you choose the same region as your own cloud network.
 
 The network address range should not overlap with the address range of other networks in the same region and with your own AWS network, which you will be peering with. As any other cloud network, the CIDR block needs to be within the range specified by RFC1918.
 
After specifying all the details, click on the `Create network` button. You will be brought back to the networks list where the new network will appear as being provisioned. The provisioning process in AWS might take up to five minutes. You'd need to click on the refresh button from time to time as the view won't update automatically.

::: el-card :body-style="{ padding: '0px' }" 
![AWS active network](./images/aws-network-active.png)
:::

By clicking on the network in the list you can inspect the details like its name, status, region and address range.

Wait until the network becomes `Active` in the list before moving to the next step.

## Deploy EventStoreDB

Within the project scope you can view EventStoreDB clusters for the project if you click on the `Clusters` menu. Initially, the cluster list is empty and you will only see the `New cluster` button.

When you click on the button, you get to the cluster creation form.

On the first part of the form you need to specify the new cluster name, the cloud provider (AWS) and the EventStoreDB version (currently it's only 20.6). Further, you need to choose the deployment size (single instance or three-node cluster) and whether to start server-side projections by default.

::: el-card :body-style="{ padding: '0px' }" 
![AWS cluster first part](./images/aws-new-cluster-1.png)
:::

::: warning Projections impact performance
Both system projections and user-defined projections produce new events. Carefully consider the impact of enabled projections on database performance. Please refer to the [Performance impact](../../server/5.0.9/server/projections/README.md#performance-impact) section of the projections documentation to learn more.
:::

The lower section of the form allows choosing the instance size for cluster nodes. Currently, only three instance sizes are available. The `F1` size is the lower-edge, aiming mainly to support testing scenarios and experiments due to its low price. Two other sizes - `C4` and `M4` are production-grade.

Moving forward, Event Store Cloud would have more instance sizes available.

::: el-card :body-style="{ padding: '0px' }" 
![AWS cluster second part](./images/aws-new-cluster-2.png)
:::

Further, you need to specify the storage capacity. One one disk kind is available at the moment, but you can change the disk size. Since we allow customers to expand the storage size online without service interruptions, you can start with smaller storage and expand it when you need more capacity.

Finally, choose the network provisioned previously from the list. All cluster nodes will be attached to that network.

The screenshot above shows that we do not calculate the cluster price just yet, it will be available in a short while. Please consult the pricing schedule that we make available to all onboarded customers for more details.

Finally, when you click on `Create cluster`, the provisioning process starts and you will get a new cluster available after a few minutes.

## Network peering

When the cluster provisioning process finishes, you get a new cluster (or single instance), which is connected to the network created in the first step. You won't be able to connect to the cluster since the network is not exposed to the Internet. In order to get access to the network and consequently to all the clusters in that network, you'd need to peer the Event Store Cloud network to your own AWS network. Normally, your AWS network would be also accessible by applications, which you want to connect to the new cloud EventStoreDB cluster.

For this example, we'll use a VPC in AWS in the same region (`eu-central-1`).

::: el-card :body-style="{ padding: '0px' }" 
![AWS VPC details](./images/aws-vpc.png)
:::

The network page provide us enough details to start the peering process. In Event Store Cloud console, while in the same project context as the new network and cluster, click on `Peering` under the `Project` menu, then click on `New peering`.

Then, give the new peering a name and select the network created earlier.

::: el-card :body-style="{ padding: '0px' }" 
![AWS peering - first](./images/aws-peering-1.png) 
:::

Then, you'd need to fill out the remaining fields, using the information from AWS VPC screen.

| Peering form | AWS VPC screen |
| :----------- | :------------- |
| Peer AWS Account ID | Owner ID |
| Peer VPC ID | VPC ID |
| AWS region | VPC region, cannot be changed |
| Peer address space | IPv4 CIDR |

For our example, here is the complete form:

::: el-card :body-style="{ padding: '0px' }" 
![AWS peering - complete form](./images/aws-peering-2.png)
:::

When you click on the `Create peering` button, you'll be redirected to the peering list screen with the new peering resource being provisioned. After a little while, the status will change to `Intiated`. If the status doesn't change after 10 minutes, delete the peering and try again, ensuring the details were entered correctly. Mismatching network region and address range are most common reasons for the peering to not being provisioned properly.

When the peering is initiated, get back to AWS console and navigate to `Virtual Private Cloud` - `Peering Connections list`. There, you will see the incoming peering request.

::: el-card :body-style="{ padding: '0px' }" 
![Incoming peering request](./images/aws-peering-3.png)
:::

Select the pending peering and click on `Actions` - `Accept request`. Validate the request details and ensure that all the details match the peering, which you can see in Event Store Cloud console. If everything is correct, click on the `Yes, Accept` button. After you get a confirmation, you will see the peering in AWS console to become `Active`. Now, you can get back to Event Store Cloud console, refresh the peering list to ensure that the pending record also changed its status to `Active`.

Now, although both networks are now connected, AWS doesn't create proper routes automatically. To finish the setup, open the AWS VPC details and click on the route table link, then on the `Routes` tab. There you'll see that the network has no route to the Event Store Cloud network, so you need to create one.

Click on `Edit routes` and then `Add route`. In the `Destination`, enter the CIDR of the Event Store Cloud network. For the `Target`, choose the `Peering Connection` option.

::: el-card :body-style="{ padding: '0px' }" 
![AWS route](./images/aws-network-route.png)
:::

The list of available peering connections will pop up. Select the recently created peering from the list and click on `Save routes`. The route table would then look like shown on the screenshot below.

::: el-card :body-style="{ padding: '0px' }" 
![AWS route complete](./images/aws-network-route-done.png)
:::

At this moment, you should be able to connect to the EventStoreDB cluster in the cloud from any VM, which is connected to your AWS VPC network.

Depending on your set up, you might already have a connection available from your local machine to the AWS VPC using a site-to-site VPN. If not, ask your AWS administrator about the connection details, which could be a Virtual Private Gateway or Client VPN Endpoint.

You can also use a EC2 VM attached to the AWS network with a publicly exposed RDP connection, or with some easy-to-use virtual VPN connectivity, like [TailScale](tailscale.md).


 
