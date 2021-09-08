<template><h1 id="connect-to-azure-kubernetes-services" tabindex="-1"><a class="header-anchor" href="#connect-to-azure-kubernetes-services" aria-hidden="true">#</a> Connect to Azure Kubernetes Services</h1>
<p>On this page, you find instructions how to set up an Azure Kubernetes Services (AKS) cluster, so it can connect to an EventStoreDB cluster in Event Store Cloud. As a prerequisite, you have experience with Kubernetes, Azure and networking in Kubernetes as well as in Azure Cloud platform.</p>
<p>Before you provision a cluster in Event Store Cloud, you need to have a network, to which the cluster nodes will connect. Nodes in the cluster will get IP addresses from the specified network CIDR block.</p>
<p>You can find more information about the steps needed for provisioning Event Store Cloud resources and connecting them to your own Azure account in the <a href="../../provision/azure">provisioning</a> section.</p>
<p>When provisioning a new AKS cluster, you can choose one of the following network configurations:</p>
<ul>
<li><strong>kubenet</strong>, which will create a new VNet using default values</li>
<li><strong>Azure CNI</strong>, which allows you to connect the new cluster to an existing VNet</li>
</ul>
<h2 id="aks-with-azure-cni" tabindex="-1"><a class="header-anchor" href="#aks-with-azure-cni" aria-hidden="true">#</a> AKS with Azure CNI</h2>
<p>When using the Azure CNI network configuration, you need an existing VNet, or you can configure a new VNet, which will be deployed together with the AKS cluster.</p>
<p>In this example, we'll create the VNet before creating an AKS cluster. The VNet will get the <code>172.16.0.0/15</code> IP range, and the <code>default</code> subnet will get the <code>172.16.0.0/16</code> IP range, so you have enough IP space for other purposes.</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/aks-1.png" alt="Create a VNet"></p>
</template></Card><p>To be able to work with the cluster, you need to establish a connection between the Event Store Cloud network and your own Virtual Network in Azure. You do it by provisioning a network peering between those two networks as described in the provisioning guide. When creating the peering link, specify the VNet IP range as the remote address.</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/aks-2.png" alt="Peering"></p>
</template></Card><p>Next, when creating the AKS cluster, choose the previously created VNet and the subnet:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/aks-3.png" alt="AKS networking"></p>
</template></Card><p>With Azure CNI, each pod will get an IP address directly from the VNet subnet range, so all the pods will be able to reach the Event Store Cloud resources using the peering link.</p>
<p>When the AKS cluster is provisioned, you can deploy a workload, and it will be able to connect to a managed EventStoreDB instance.</p>
<h2 id="aks-with-kubenet" tabindex="-1"><a class="header-anchor" href="#aks-with-kubenet" aria-hidden="true">#</a> AKS with kubenet</h2>
<p>When creating an AKS cluster with kubenet network configuration, a new VNet will be created in a separate resource group. It is the same resource group where the Kubernetes node pool instances are provisioned. There are no network settings, which you need to change when creating the cluster, except choosing the kubenet configuration.</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/aks-5.png" alt="AKS with kubenet"></p>
</template></Card><p>After all the resources are deployed, you will find a new resource group in the resource groups list. Such a resource group has a name, which starts with <code>MC</code>, for example <code>MC_aks-setup-docs_esc-demo_westeurope</code>. Uou can then open the new resource group and find the VNet there:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/aks-4.png" alt="Resource group"></p>
</template></Card><p>Open the VNet to find its IP range:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/aks-6.png" alt="Default VNet"></p>
</template></Card><p>Use this address space to create a new peering link from Event Store Cloud to the AKS VNet.  When the peering is provisioned, it will look like this:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/aks-7.png" alt="Peering"></p>
</template></Card><p>When the peering becomes active, you can deploy a workload to the AKS cluster, and it should be able to reach a managed EventStoreDB instance via the peering link.</p>
</template>
