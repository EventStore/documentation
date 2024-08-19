---
order: 3
---

# Connecting to cloud Kubernetes

Below, you can find instructions for connecting workloads running cloud-managed Kubernetes clusters to managed EventStoreDB clusters running in Event Store Cloud.

## AWS Elastic Kubernetes Services

In this section, you find instructions on how to set up an AWS Elastic Kubernetes Services (EKS) cluster, so it can connect to an EventStoreDB cluster in Event Store Cloud. As a prerequisite, you have experience with Kubernetes, AWS and networking in Kubernetes, as well as in AWS cloud platform.

EKS clusters require at least two subnets, which are connected to internet using an Internet Gateway. Both subnets must have the auto-assign public IP setting enabled, otherwise the node group won't get properly provisioned.

Before you provision a cluster in Event Store Cloud, you need to have a network, to which the cluster nodes will connect. Nodes in the cluster will get IP addresses from the specified network CIDR block.

You can find more information about the steps needed for provisioning Event Store Cloud resources and connecting them to your own Azure account in the [provisioning](../provision/README.md#amazon-web-services-aws) section.

In this example, we'll use the following network configuration:

- Event Store Cloud AWS network with IP range `172.29.98.0/24` (same as we used in the provisioning guidelines)
- VPC in the same region (`eu-central-1`) with IP range `172.16.0.0/16`
- Two subnets in the VPC with ranges `172.16.0.0/18` and `172.16.64.0/18`, which are both part of the VPC IP range

The AWS VPC has a peering connection established with the Event Store Cloud network, as described in the provisioning guide. For the peering link, we used the whole VPC IP range `172.16.0.0/16`:

![ESC peering](./images/eks-1.png)

Now we can provision the EKS cluster. In the networking configuration section of the new cluster, we need to choose the VPC, which is peered with Event Store Cloud:

![EKS networking](./images/eks-2.png)

After creating the cluster, you need to add the node group, as usual. Each node will get a network interface per subnet of the EKS cluster, so in our case nodes will be attached to two subnets.

When all the deployments are completed, and you added the EKS cluster to your local config, you can try deploying an ephemeral workload using the `busybox` container image, so you can test the connectivity:

```bash:no-line-numbers
$ kubectl run -i --tty --rm debug --image=busybox --restart=Never -- sh
```

If you run `ifconfig` in the pod, you will see that the pod got an IP address from one of the subnets:

```bash
/ # ifconfig
eth0      Link encap:Ethernet  HWaddr 66:93:89:8F:D7:CF
          inet addr:172.16.101.19  Bcast:0.0.0.0  Mask:255.255.255.255
          UP BROADCAST RUNNING MULTICAST  MTU:9001  Metric:1
          RX packets:12 errors:0 dropped:0 overruns:0 frame:0
          TX packets:7 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:1252 (1.2 KiB)  TX bytes:640 (640.0 B)
```

Then, it should be possible to ping the managed EventStoreDB cluster node from the pod, ensuring that everything works as expected:

```bash
/ # ping c1ut3oto0aembuk4mi6g.mesdb.eventstore.cloud
PING c1ut3oto0aembuk4mi6g.mesdb.eventstore.cloud (172.29.98.112): 56 data bytes
64 bytes from 172.29.98.112: seq=0 ttl=63 time=1.049 ms
64 bytes from 172.29.98.112: seq=1 ttl=63 time=0.716 ms
64 bytes from 172.29.98.112: seq=2 ttl=63 time=0.713 ms
```

At this moment, any workload deployed to the EKS cluster should be able to connect to the Event Store Cloud managed EventStoreDB cluster.

## Google Kubernetes Engine

In this section, you find instructions on how to set up a Google Kubernetes Engine (GKE) cluster, so it can connect to an EventStoreDB cluster in Event Store Cloud. As a prerequisite, you have experience with Kubernetes, GKE and networking in Kubernetes as well as in Google Cloud Platform (GCP).

Before you provision a cluster in Event Store Cloud, you need to have a network, to which the cluster nodes will connect. Nodes in the cluster will get IP addresses from the specified network CIDR.

In order to be able to work with the cluster, you need to establish a connection between the Event Store Cloud network and your own VPC Network in Google Cloud. You do it by provisioning a network peering between those two networks.

You can find more information about the steps needed for provisioning Event Store Cloud resources and connecting them to your own GCP project in the [provisioning](../provision/README.md#google-cloud-platform-gcp) section.

### Planning IP ranges

The challenge is to set up IP ranges for both VPCs, the GKE cluster, and the peering in a way that pods running in Kubernetes would be able to reach the EventStoreDB cluster in Event Store Cloud.

![GKE and ESC topology](./images/gke-1.png)

When creating the Standard GKE cluster from GCP Console, the Networking section has the _Advanced networking_ options subsection. There you find the _Pod address range_ setting. It is available for clusters with any type of routing (static routes or VPC-native).

![GKE network settings](./images/gke-2.png)

If the _Pod address range_ option is left blank, the cluster will get a private IP range for the pods. For example, the cluster with static routing got the `10.120.0.0/14` CIDR block for the pods:

![GKE network settings](./images/gke-3.png)

When using VPC-native routing, this new range would be added to the selected VPC network subnet, in addition to the main IP range.

The issue that you'll experience when leaving the pod IP range blank and letting the provisioner to define it for you, is that IP range won't be a part of the configured network peering IP range in Event Store Cloud. For the current example, the `subnet-esc` has the IP range `172.30.0.0/16` and that's what we used when creating the peering as described in our documentation. As the new pod address range (`10.120.0.0/14`) is not part of the IP range known to the peering, those pods won't be able to connect to the EventStoreDB cloud cluster.

It could be solvable when using the VPC-native routing for the GKE cluster, as the pod IP range would be added to the subnet. However, the currently available Event Store Cloud version only allows you to have one peering with a given subnet, and the peering has only one remote IP range. It means that we can neither add the pods IP range to the existing peering, nor could we create a new peering with this new range.

The issue can be fixed by defining a custom pod address IP range, which is a part of the peering IP range. In our documentation we recommend using your VPN network subnet CIDR block as the _Remote Address_ field value when creating the peering. However, you can specify a larger range, which could include both the main subnet range, and the additional range for the GKE pods.

### Example IP ranges

Let's have a look at a working configuration. In this example, we use the following resources:

- VPC network `vpc-esc` on the customer's side
- Subnet `subnet-esc` within the `vpc-esc` network with the primary IP range `172.30.0.0/16`
- VPC-native GKE cluster (Standard or Autopilot) with pod address range `172.31.128.0/17`

Now, for the Event Store Cloud network peering, we need to find a range, which covers both the subnet default range, and the additional GKE range. In our case, we could use the `172.30.0.0/15` range as it includes both ranges. The `172.30.0.0/15` netmask can be divided as follows:

| Subnet address  | Range of addresses            | Usable IPs                    | Hosts |
|:----------------|:------------------------------|:------------------------------|:------|
| 172.30.0.0/16   | 172.30.0.0 - 172.30.255.255`  | 172.30.0.1 - 172.30.255.254   | 65534 |
| 172.31.0.0/17   | 172.31.0.0 - 172.31.127.255   | 172.31.0.1 - 172.31.127.254   | 32766 |
| 172.31.128.0/17 | 172.31.128.0 - 172.31.255.255 | 172.31.128.1 - 172.31.255.254 | 32766 |

So, here we see that the subnet uses the larger range, and the GKE pod address range uses a smaller range, plus we have one range free for something else.

### GKE networking configuration

When provisioning the GKE cluster, we should specify `172.31.128.0/17` as the pod address range in the cluster networking configuration for a new Standard cluster:

![GKE network settings](./images/gke-5.png)

Similarly, the range can be specified for a new Autopilot cluster:

![GKE network settings](./images/gke-6.png)

When the cluster is deployed, you can see that the range is properly assigned:

![GKE network settings](./images/gke-7.png)

When looking at the `subnet-esc`, we can see those ranges shown in the GCP Console:

![GKE subnet](./images/gke-8.png)

The network peering resource in Event Store Cloud in this case looks like this:

![ESC peering](./images/gke-9.png)

When creating a peering, you don't have to specify a particular subnet of the VPC network, which you peer with. There's no check if the given IP range actually exists in the peered network. Therefore, we can specify the range we need, even if it doesn't match with the primary range of any subnet. By using the larger range, which covers both the primary and secondary ranges, we made the EventStoreDB cluster available for pods in the GKE cluster.

### Ensure the connection

To confirm that everything works as expected, you can deploy an ephemeral `busybox` container to the Kubernetes cluster and try reaching out to the EventStoreDB cloud cluster:

```bash:no-line-numbers
$ kubectl run -i --tty --rm debug --image=busybox --restart=Never -- sh
```

If you don't see a command prompt, try pressing enter.

```bash
/ # ping c0brj8qrh41g7drr2i4g-0.mesdb.eventstore.cloud
PING c0brj8qrh41g7drr2i4g-0.mesdb.eventstore.cloud (172.22.110.29): 56 data bytes
64 bytes from 172.22.110.29: seq=0 ttl=63 time=2.655 ms
64 bytes from 172.22.110.29: seq=1 ttl=63 time=1.234 ms
64 bytes from 172.22.110.29: seq=2 ttl=63 time=1.246 ms
```

Finally, we can deploy applications to the GKE cluster, which can connect to the Event Store Cloud managed EventStoreDB instances.

The overall network topology would look like this, when we complement the initial diagram with IP addresses and network masks:

![ESC GKE topology](./images/gke-10.png)

## Azure Kubernetes Services

In this section, you find instructions on how to set up an Azure Kubernetes Services (AKS) cluster, so it can connect to an EventStoreDB cluster in Event Store Cloud. As a prerequisite, you have experience with Kubernetes, Azure and networking in Kubernetes as well as in Azure Cloud platform.

Before you provision a cluster in Event Store Cloud, you need to have a network, to which the cluster nodes will connect. Nodes in the cluster will get IP addresses from the specified network CIDR block.

You can find more information about the steps needed for provisioning Event Store Cloud resources and connecting them to your own Azure account in the [provisioning](@cloud/provision/README.md#microsoft-azure) section.

When provisioning a new AKS cluster, you can choose one of the following network configurations:
- **kubenet**, which will create a new VNet using default values
- **Azure CNI**, which allows you to connect the new cluster to an existing VNet

### AKS with Azure CNI

When using the Azure CNI network configuration, you need an existing VNet, or you can configure a new VNet, which will be deployed together with the AKS cluster.

In this example, we'll create the VNet before creating an AKS cluster. The VNet will get the `172.16.0.0/15` IP range, and the `default` subnet will get the `172.16.0.0/16` IP range, so you have enough IP space for other purposes.

![Create a VNet](./images/aks-1.png)

To be able to work with the cluster, you need to establish a connection between the Event Store Cloud network and your own Virtual Network in Azure. You do it by provisioning a network peering between those two networks as described in the provisioning guide. When creating the peering link, specify the VNet IP range as the remote address.

![Peering](./images/aks-2.png)

Next, when creating the AKS cluster, choose the previously created VNet and the subnet:

![AKS networking](./images/aks-3.png)

With Azure CNI, each pod will get an IP address directly from the VNet subnet range, so all the pods will be able to reach the Event Store Cloud resources using the peering link.

When the AKS cluster is provisioned, you can deploy a workload, and it will be able to connect to a managed EventStoreDB instance.

### AKS with kubenet

When creating an AKS cluster with kubenet network configuration, a new VNet will be created in a separate resource group. It is the same resource group where the Kubernetes node pool instances are provisioned. There are no network settings, which you need to change when creating the cluster, except choosing the kubenet configuration.

![AKS with kubenet](./images/aks-5.png)

After all the resources are deployed, you will find a new resource group in the resource groups list. Such a resource group has a name, which starts with `MC`, for example `MC_aks-setup-docs_esc-demo_westeurope`. Uou can then open the new resource group and find the VNet there:

![Resource group](./images/aks-4.png)

Open the VNet to find its IP range:

![Default VNet](./images/aks-6.png)

Use this address space to create a new peering link from Event Store Cloud to the AKS VNet.  When the peering is provisioned, it will look like this:

![Peering](./images/aks-7.png)

When the peering becomes active, you can deploy a workload to the AKS cluster, and it should be able to reach a managed EventStoreDB instance via the peering link.

