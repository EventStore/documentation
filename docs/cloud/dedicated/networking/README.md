---
dir:
  order: 5
  link: true
---

# Networking

Each major cloud provider implements the concept of a Virtual Private Cloud (VPC). AWS and GCP have VPCs, while Azure has Azure Virtual Network (VNet). A VPC gives you as the cloud user an isolated private network, to which you attach cloud compute resources (virtual machines, container orchestrators, etc) or managed resources, like database servers. VPCs are always in private network address spaces and therefore not directly accessible from the outside of the VPC without additional configuration and infrastructure.

Kurrent Cloud Networks are project level resources. When you create a network in Kurrent Cloud, a VPC/VNet is created in the cloud provider's region requested. All Kurrent Cloud Networks are created with at least three availability zones. This is to ensure that the cluster can withstand the loss of a single availability zone with minimal impact to the cluster's availability. If a single node is unable to communicate with the other nodes in the cluster, once connectivity is restored, that node will catch up on the events that were missed while the node was offline and resume normal operation as a follower node.

When you create a KurrentDB Managed Cluster, you choose to create a cluster on an existing Network or to create a new Network. Once the cluster is created, you cannot change the Network of the cluster. If you need to change the Network of a cluster, you can create a backup of the cluster and restore that backup to a new cluster on the desired network. When this is done, a new cluster ID is generated and any existing connection strings will need to be updated to use the new cluster address.

::: tip Network Isolation

Even though multiple clusters can share the same Network, each cluster is isolated from other clusters using the cloud provider's network security groups/firewall rules. This means that you can create multiple clusters on the same network without risk of a cluster being used as a way to gain unauthorized access to another cluster's data.

:::

## Network Types

Kurrent Cloud supports two types of networks:

- **Private Network**: A private network is a network have no inbound access from the Internet. Clusters on Private Networks are only accessible from a VPC/VNet peered with the Kurrent Cloud Private Network.
- **Public Network**: A public network is a network that is accessible from the public internet. Clusters on Public Networks are protected by an IP Access List.

## Network Costs

Kurrent Cloud charges for networks based on the cloud provider and the region of the network, as well as the type of connection. Private Networks have a higher base cost than Public Networks because they require additional resources compared to Public Networks. However, Private Networks also have a lower cost per GB of data transfer.

### Network Transfer Usage

Kurrent Cloud charges for network transfer usage based on the cloud provider and region, as well as the source and destination of the traffic.

Some cloud providers charge for inbound and outbound traffic across availability zones, while others do not. For three-node clusters, individual nodes are created in different availability zones, so in addition to usage from client connections, there is also usage between the cluster nodes that traverses availability zones.

When using peering links with Private Networks, when both sides of the peering link are in the same region, the traffic is typically charged the same as that for traffic across availability zones. When using cross-region peering, traffic is charged based on the source and destination regions of the traffic.

For Public Networks, data transfer between Kurrent Cloud Networks and the public internet is charged only for egress traffic. If the provider charges for cross availability zone traffic, there will also be usage charges for three-node clusters.
