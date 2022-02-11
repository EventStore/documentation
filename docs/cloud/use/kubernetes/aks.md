# Connect to Azure Kubernetes Services

On this page, you find instructions how to set up an Azure Kubernetes Services (AKS) cluster, so it can connect to an EventStoreDB cluster in Event Store Cloud. As a prerequisite, you have experience with Kubernetes, Azure and networking in Kubernetes as well as in Azure Cloud platform.

Before you provision a cluster in Event Store Cloud, you need to have a network, to which the cluster nodes will connect. Nodes in the cluster will get IP addresses from the specified network CIDR block.

You can find more information about the steps needed for provisioning Event Store Cloud resources and connecting them to your own Azure account in the [provisioning](../../provision/README.md#amazon-web-services-aws) section.

When provisioning a new AKS cluster, you can choose one of the following network configurations:
- **kubenet**, which will create a new VNet using default values
- **Azure CNI**, which allows you to connect the new cluster to an existing VNet

## AKS with Azure CNI

When using the Azure CNI network configuration, you need an existing VNet, or you can configure a new VNet, which will be deployed together with the AKS cluster.

In this example, we'll create the VNet before creating an AKS cluster. The VNet will get the `172.16.0.0/15` IP range, and the `default` subnet will get the `172.16.0.0/16` IP range, so you have enough IP space for other purposes.

::: card
![Create a VNet](../images/aks-1.png)
:::

To be able to work with the cluster, you need to establish a connection between the Event Store Cloud network and your own Virtual Network in Azure. You do it by provisioning a network peering between those two networks as described in the provisioning guide. When creating the peering link, specify the VNet IP range as the remote address.

::: card
![Peering](../images/aks-2.png)
:::

Next, when creating the AKS cluster, choose the previously created VNet and the subnet:

::: card
![AKS networking](../images/aks-3.png)
:::

With Azure CNI, each pod will get an IP address directly from the VNet subnet range, so all the pods will be able to reach the Event Store Cloud resources using the peering link.

When the AKS cluster is provisioned, you can deploy a workload, and it will be able to connect to a managed EventStoreDB instance.

## AKS with kubenet

When creating an AKS cluster with kubenet network configuration, a new VNet will be created in a separate resource group. It is the same resource group where the Kubernetes node pool instances are provisioned. There are no network settings, which you need to change when creating the cluster, except choosing the kubenet configuration.

::: card
![AKS with kubenet](../images/aks-5.png)
:::

After all the resources are deployed, you will find a new resource group in the resource groups list. Such a resource group has a name, which starts with `MC`, for example `MC_aks-setup-docs_esc-demo_westeurope`. Uou can then open the new resource group and find the VNet there:

::: card
![Resource group](../images/aks-4.png)
:::

Open the VNet to find its IP range:

::: card
![Default VNet](../images/aks-6.png)
:::

Use this address space to create a new peering link from Event Store Cloud to the AKS VNet.  When the peering is provisioned, it will look like this:

::: card
![Peering](../images/aks-7.png)
:::

When the peering becomes active, you can deploy a workload to the AKS cluster, and it should be able to reach a managed EventStoreDB instance via the peering link.

