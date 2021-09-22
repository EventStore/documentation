---
title: Using Event Store Cloud
---

## Networking

Each major cloud provider implements the concept of a Virtual Private Cloud (VPC). A VPC gives you as the cloud user an isolated private network, to which you attach cloud compute resources (virtual machines, container orchestrators, etc) or managed resources, like database servers. VPCs are always in private network address spaces and therefore not directly accessible from the outside of the VPC without additional configuration and infrastructure.

Managed EventStoreDB clusters and instances are not accessible via public internet. You have the following options to ensure connectivity between Event Store Cloud and your workloads.

### Cloud network peering

Normally, organisations build internal practices in regard to VPCs isolation and access level. In particular, you would expect that some or all VPCs are available for direct access from local networks on-premises, for developers to be able to access cloud resources. Cloud providers let their customers to connect on-premises networks to VPCs using site-to-site VPN connections. In addition, cloud customers often set up virtual private gateways to allow point-to-site VPN connections for their remote users.

Event Store Cloud deploys EventStoreDB clusters on a project-level VPC (network). By peering that network with your own VPC at the same cloud provider, you get access to the EventStoreDB cluster provisioned and managed by Event Store Cloud. Normally, your Ops engineers would be able to configure the routing and allow connecting to EventStoreDB clusters in the cloud.

Currently, peering links have the following limitations:
- For one peering link you can only specify a single IP range. It means that if your own cloud network has multiple IP ranges, you can only peer one of those. Workloads, which use other IP ranges, won't be able to access managed ESDB instances.
- For Azure, peering links have the "Allow gateway transit" [property](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview#gateways-and-on-premises-connectivity) disabled. As the peering link is created from Event Store Cloud side, you cannot change this property. It means that the workload must be connected to the peered VN to access the managed ESDB instance.

We are addressing the limitations listed above in the coming releases of Event Store Cloud.

### TailScale

Another options to connect to the cloud cluster is to use a third-party VPN offering, which might be easier to use. One example would [TailScale](https://tailscale.com), which is a [WireGuard®](https://www.wireguard.com/) based mesh VPN. In addition to the basic functionality of connecting devices in a mesh network, TailGate also allows connecting a subnet to the private VPN. For that, you'd need to provision a VM in the cloud, which is connected to the network peered with Event Store Cloud network. Since that machine would be able to access the EventStoreDB cluster, by configuring the TailScale [subnet routing](https://tailscale.com/kb/1019/subnets) you will also make the cluster accessible for all users of your TailScale network.

Check our [Tailscale guide](#connect-with-tailscale) for detailed instructions.

## Data migration

Currently, the only way to migrate data to the cloud cluster or instance is by using [live migration](./migration/replicator.md). Live migration can only handle small to medium size databases.

## Cluster connection

Event Store Cloud unconditionally provisions secure EventStoreDB clusters with both TLS for TCP and SSL for HTTP and gRPC enabled. This configuration cannot be changed.

Cloud clusters use SSL certificates signed by the trusted public certificate authority and therefore you won't need to do any additional work that is usually associated with self-signed certificates.

After you provision the cloud cluster, you can find connection details for the cluster in the Cloud console.

::: card 
![Cluster details](./images/cloud-cluster-details.png)
:::

In the cluster details you can find URIs for the EventStoreDB Admin UI and HTTP API, TCP client and gRPC client.

The DNS name of the cluster resolves to IP addresses of all the cluster nodes or to the IP address of a single instance, depending on the deployment topology. When connecting to a multi-node cluster, you'd need to use the seed-based gossip with all the cluster nodes when using 20.6. 

For 20.6+ gRPC clients, we advise to use the [gRPC connection generator](https://developers.eventstore.com/clients/grpc/getting-started/) page in the documentation where you can use your cloud cluster ID to get a properly composed connection string.

Each cluster node has its own DNS name, which can be used for accessing individual nodes for node-specific operations like stats collection or scavenging.

## Connect with Tailscale

In many organisations which work with the cloud, you can find the connection between the cloud networks and your local network already established using a Virtual Private Gateway or Site-to-Site VPN connection. However, if you're starting on the side and want to keep things simple, you can use Tailscale to connect to the Event Store Cloud cluster.

### What is Tailscale?

[Tailscale](https://tailscale.com) is a commercial product built on top of WireGuard®. It allows you to set up a private tunnel VPN in a mesh-style network. In addition to direct connection, Tailscale also has the subnet routing feature using a gateway machine, which should be connected to the target network.

You can use the Solo plan with Tailscale free of charge.

### Get started

First, set up a Tailscale account, then install their client software on your machine. The client will ask you to log in after the installation, and then give you your first machine connected to your private VPN.

Follow the [installation instructions](https://tailscale.com/kb/1017/install) to get started.

### Provision the cloud VM

Next, you need to create a small VM in the cloud, connected to the VPC with the Event Store Cloud.

You can choose the smallest available instance size, like `t4g.nano` in AWS, `f1.micro` in GCP, or `Standard B1ls` in Azure. For this guide we use Ubuntu 20.04 LTS image (18.04 LTS in Azure).

When creating the VM, make sure you:
- Connect the default network interface to the VPC peered with Event Store Cloud
- Enable public IP if you want to connect to the VM from your local machine
- GCP: enable _IP Forwarding_ on the default NIC
- AWS: disable _Source / destination checking_

For existing VMs, you can enable IP forwarding too.

::::: code-group
:::: code-group-item AWS
Select the EC2 instance in the list of instances and in the `Actions` menu choose `Networking` and then `Change source/destination check`. Ensure that the `Stop` checkbox is _enabled_:
::: card
![AWS enable ip forward](./images/aws-ip-forward.png)
:::
::::
:::: code-group-item GCP
On GCP you can enable IP Forward only when creating the VM instance.

On the new VM instance page and scroll down to the `Management, security, disks, networking, sole tenancy` section, expand it, find the `Network interfaces` section and click on the pen icon. There, set the `IP forwarding` to `On`:
::: card
![GCP enable ip forward](./images/gcp-ip-forward.png)
:::
::::
:::::

Remember to create the VM instance in the same region as the VPC, which is peered with Event Store Cloud.

### Set up Tailscale subnet routing

When you get the cloud VM instance running, connect to it using SSH. The easiest way is to use the cloud browser console.

After logging in, install the Tailscale client for the Linux distribution used for the cloud VM, following the [Tailscale guidelines](https://tailscale.com/kb/1017/install). Here you can also find required steps for [Ubuntu 20.04 LTS (focal)](https://tailscale.com/download/linux/ubuntu-2004) and [Ubuntu 18.04 LTS (bionic)](https://tailscale.com/download/linux/ubuntu-1804) distributions.

When the initial steps are completed, you should be able to ping the cloud VM using its internal IP address from your local machine.

Next, visit the Event Store Cloud console and open the peering page. There you will find the peering you created when following the provisioning guidelines. Write down the details from the `Local Address` and `Remote Address` fields.

For this example we will use the following peering details:
::: card
![Peering page example](./images/peering-example.png)
:::

With all the necessary details collected, follow these steps on the cloud VM instance:

_Enable IP forwarding on the machine:_
```bash
echo 'net.ipv4.ip_forward = 1' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p /etc/sysctl.conf
```

_Restart Tailscale client with subnet routing:_
```bash
sudo tailscale up --advertise-routes=10.164.0.0/20,172.22.101.0/24 --accept-routes
```

In the example above we used both address spaces of both sides of the peering as the `advertise-routes` parameter values (comma-separated).

Next, visit your Tailscale Admin Console, find the cloud VM in the list and use the three dots popup menu to enable subnet routing and disable key expiry.

Now, visit the Event Store Cloud console, switch to the Clusters page and choose the EventStoreDB cluster. In the cluster details select the `Addresses` tab and click on the UI link. You should then get the EventStoreDB Admin UI opened in your local machine browser.

This is how the network looks like when using Tailscale:

::: card

![ES_Cloud_Networking_tailsacle](./images/es-cloud-networking-tailscale.svg)

:::

### Future plans

Soon, we want to add out-of-the-box Tailscale network peering, which will create a nano-VM inside Event Store Cloud and set up routing to your Tailscale account automatically.
