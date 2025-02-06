---
title: Private Networks
order: 3
---

When you create a KurrentDB cluster with private access, that cluster is only accessible from the VPC/VNet that is peered with the Kurrent Cloud Private Network.

## Cloud network peering

For all of the cloud providers supported by Kurrent Cloud, you can peer a Private Network with one or more VPC/VNets in the same or different region. This allows you a great deal of flexibility in how you can access your clusters. When you use cross-region peering, you will see increased latency for your connections to the cluster, and there are increased costs for data transfer depending on the source and destination regions of the traffic. When possible, we recommend keeping peerings within the same region.

### Security for peering links

It is important to understand that peering links can allow bi-directional traffic from either side of the peering link. While security is a top priority for Kurrent Cloud and we do everything we can to ensure the security of the compute instances, always follow best practices to limit what traffic is allowed to transit the peering link into your VPCs/VNets.

Unless you are using the [Connectors](../../server/v24.10/features/connectors/) feature, due diligence should be taken to ensure inbound traffic originating from the Kurrent Cloud Private Network is denied. See your cloud provider's documentation to learn how to configure security groups, firewall rules, etc. to restrict network traffic from peered VPC/VNets.

:::tip Connectors
With the release of KurrentDB 24.10, we have added the [Connectors](../../server/v24.10/features/connectors/) feature. Connectors run on the server-side and use a catch-up subscription to receive events, filter or transform them, and push them to an external system. This feature is a great way to extend the capabilities of your KurrentDB cluster, but it also means that the KurrentDB cluster nodes will be connecting to external systems. If you are using Connectors to push events to a system that is on the peered VPC/VNet, you will need to ensure that your network configuration allows ingress traffic from the KurrentDB cluster nodes.
:::

:::note Alternative Private Network Connectivity
AWS PrivateLink, GCP Private Service Connect, and Azure Private Link provide private connectivity to third party services from within a VPC/VNet without the need for establishing peering links. We plan to add support for these services in the near future.
:::

## End-user connectivity

### VPN connection from on-premises

Normally, organizations build internal practices in regard to VPCs isolation and access level. In particular, you would expect that some or all VPCs are available for direct access from local networks on-premises or via VPN connections for developers to be able to access cloud resources. Cloud providers let their customers to connect on-premises networks to VPCs using site-to-site VPN connections. Cloud customers often set up VPN gateways in their VPCs to allow point-to-site VPN connections for their remote users.

Kurrent Cloud deploys KurrentDB clusters on a project-level VPC (network). By peering that network with your own VPC at the same cloud provider, you get access to the KurrentDB cluster provisioned and managed by Kurrent Cloud. Normally, your Ops engineers would be able to configure the routing and allow connecting to KurrentDB clusters in the cloud.

#### Note for Azure

Azure has a property for peering links called [Allow gateway transit](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview#gateways-and-on-premises-connectivity). This property allows the peered virtual network to use the virtual network gateway of the peered virtual network. When Kurrent Cloud creates an Azure peering link, this property is disabled. As the peering link is created from Kurrent Cloud side, there is no way for the option to be changed on the customer's side of the peering link. This means that when connecting to a Private KurrentDB cluster from a Azure Virtual Network, connections must originate from the peered virtual network.

The two most common use cases that are impacted by this limitation are:

1. Users who are connecting to a Azure Virtual Network using a point-to-site or site-to-site VPN connection will not be able to connect directly to the managed KurrentDB instance.
2. Customers who are utilizing a hub and spoke network architecture will not be able to connect directly to the managed KurrentDB instance.

We will be addressing this limitation in the future, and we have recommendations for how to work around this limitation.
