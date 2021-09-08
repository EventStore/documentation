<template><h1 id="event-store-cloud-provisioning" tabindex="-1"><a class="header-anchor" href="#event-store-cloud-provisioning" aria-hidden="true">#</a> Event Store Cloud provisioning</h1>
<p>Event Store Cloud allows you to provision EventStoreDB clusters in AWS, GCP, and Azure.</p>
<p>The provisioning process consists of the following steps:</p>
<ol>
<li>Create a network in Event Store Cloud.</li>
<li>Peer the new network with your own network at the same cloud.</li>
<li>Deploy the EventStoreDB cluster.</li>
</ol>
<p>Find the detailed guideline for your cloud provider:</p>
<ul>
<li><a href="#amazon-web-services-aws">Amazon Web Services (AWS)</a></li>
<li><a href="#google-cloud-platform-gcp">Google Cloud Platform (GCP)</a></li>
<li><a href="#microsoft-azure">Microsoft Azure</a></li>
</ul>
<p>This is how networking will look like when all provisioning steps are performed:</p>
<Card><template #content><p><img src="@source/cloud/provision/images/es-cloud-networking.svg" alt="ES_Cloud_Networking"></p>
</template></Card><h2 id="amazon-web-services-aws" tabindex="-1"><a class="header-anchor" href="#amazon-web-services-aws" aria-hidden="true">#</a> Amazon Web Services (AWS)</h2>
<p>For AWS customers, Event Store Cloud allows provisioning an EventStoreDB cluster in the same cloud. You can create a cluster in the same region to ensure the lowest latency.</p>
<p>Pre-requisites:</p>
<ul>
<li>You have an organisation registered in Cloud console</li>
<li>You can log in to the Cloud console as admin</li>
<li>Your organisation has at least one project</li>
<li>You are the admin of the project</li>
<li>You have access to create AWS resources in the AWS account of your organisation</li>
</ul>
<p>The provisioning process consists of three steps:</p>
<ol>
<li>Create a network in Event Store Cloud</li>
<li>Provision the EventStoreDB instance or cluster</li>
<li>Peer the new network with your own AWS network</li>
</ol>
<h3 id="create-a-network" tabindex="-1"><a class="header-anchor" href="#create-a-network" aria-hidden="true">#</a> Create a network</h3>
<p>In the Event Store Cloud console, go to the <RouterLink to="/cloud/intro/#projects">project context</RouterLink> and switch to <code>Networks</code>. Then, click on the <code>New network</code> button.</p>
<p>Make sure to fill out the required information:</p>
<ul>
<li>Network name</li>
<li>Cloud provider - AWS</li>
<li>Region - choose the AWS region</li>
<li>CIDR block - the new network address range</li>
</ul>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-create-network.png" alt="Create AWS network"></p>
</template></Card><p>In order to establish a connection between the cluster network and your own cloud network, you'd need to peer them. Currently, Event Store Cloud only supports peering within the same region. Therefore, ensure that you choose the same region as your own cloud network.</p>
<p>The network address range should not overlap with the address range of other networks in the same region and with your own AWS network, which you will be peering with. As any other cloud network, the CIDR block needs to be within the range specified by RFC1918.</p>
<p>After specifying all the details, click on the <code>Create network</code> button. You will be brought back to the networks list where the new network will appear as being provisioned. The provisioning process in AWS might take up to five minutes. You'd need to click on the refresh button from time to time as the view won't update automatically.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-network-active.png" alt="AWS active network"></p>
</template></Card><p>By clicking on the network in the list you can inspect the details like its name, status, region and address range.</p>
<p>Wait until the network becomes <code>Active</code> in the list before moving to the next step.</p>
<h3 id="deploy-a-managed-instance" tabindex="-1"><a class="header-anchor" href="#deploy-a-managed-instance" aria-hidden="true">#</a> Deploy a managed instance</h3>
<p>Within the project scope you can view EventStoreDB clusters for the project if you click on the <code>Clusters</code> menu. Initially, the cluster list is empty and you will only see the <code>New cluster</code> button.</p>
<p>When you click on the button, you get to the cluster creation form.</p>
<p>On the first part of the form you need to specify the new cluster name, the cloud provider (AWS) and the EventStoreDB version (currently it's only 20.6). Further, you need to choose the deployment size (single instance or three-node cluster) and whether to start server-side projections by default.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-new-cluster-1.png" alt="AWS cluster first part"></p>
</template></Card><div class="custom-container warning"><p class="custom-container-title">Projections impact performance</p>
<p>Both system projections and user-defined projections produce new events. Carefully consider the impact of enabled projections on database performance. Please refer to the <RouterLink to="/server/generated/v20.10/docs/projections/">Performance impact</RouterLink> section of the projections documentation to learn more.</p>
</div>
<p>The lower section of the form allows choosing the instance size for cluster nodes. Currently, only three instance sizes are available. The <code>F1</code> size is the lower-edge, aiming mainly to support testing scenarios and experiments due to its low price. Other instance sizes are production-grade.</p>
<div class="custom-container tip"><p class="custom-container-title">Vertical scaling</p>
<p>At this moment, it is not possible to change the cluster node instance size. You can still resize cluster instances by taking a backup and restoring it to a different cluster with larger or smaller instances.</p>
</div>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-new-cluster-2.png" alt="AWS cluster second part"></p>
</template></Card><p>Further, you need to specify the storage capacity. One disk kind is available at the moment, but you can change the disk size. Since we allow customers to expand the storage size online without service interruptions, you can start with smaller storage and expand it when you need more capacity.</p>
<p>Finally, choose the network provisioned previously from the list. All cluster nodes will be attached to that network.</p>
<p>You will get the monthly price for the selected cluster size down below in the form.</p>
<p>Finally, when you click on <code>Create cluster</code>, the provisioning process starts and you will get a new cluster available after a few minutes.</p>
<h3 id="network-peering" tabindex="-1"><a class="header-anchor" href="#network-peering" aria-hidden="true">#</a> Network peering</h3>
<p>When the cluster provisioning process finishes, you get a new cluster (or single instance), which is connected to the network created in the first step. You won't be able to connect to the cluster since the network is not exposed to the Internet. In order to get access to the network and consequently to all the clusters in that network, you'd need to peer the Event Store Cloud network to your own AWS network. Normally, your AWS network would be also accessible by applications, which you want to connect to the new cloud EventStoreDB cluster.</p>
<div class="custom-container warning"><p class="custom-container-title">Peering limitations</p>
<p>Currently, you can peer one Event Store Cloud network with only one AWS VPC on your account. We expect to lift this limitation in the future.</p>
</div>
<p>For this example, we'll use a VPC in AWS in the same region (<code>eu-central-1</code>).</p>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-vpc.png" alt="AWS VPC details"></p>
</template></Card><p>The network page provide us enough details to start the peering process. In Event Store Cloud console, while in the same project context as the new network and cluster, click on <code>Peering</code> under the <code>Project</code> menu, then click on <code>New peering</code>.</p>
<p>Then, give the new peering a name and select the network created earlier.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-peering-1.png" alt="AWS peering - first"></p>
</template></Card><p>Then, you'd need to fill out the remaining fields, using the information from AWS VPC screen.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Peering form</th>
<th style="text-align:left">AWS VPC screen</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Peer AWS Account ID</td>
<td style="text-align:left">Owner ID</td>
</tr>
<tr>
<td style="text-align:left">Peer VPC ID</td>
<td style="text-align:left">VPC ID</td>
</tr>
<tr>
<td style="text-align:left">AWS region</td>
<td style="text-align:left">VPC region, cannot be changed</td>
</tr>
<tr>
<td style="text-align:left">Peer address space</td>
<td style="text-align:left">IPv4 CIDR</td>
</tr>
</tbody>
</table>
<p>For our example, here is the complete form:</p>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-peering-2.png" alt="AWS peering - complete form"></p>
</template></Card><p>When you click on the <code>Create peering</code> button, you'll be redirected to the peering list screen with the new peering resource being provisioned. After a little while, the status will change to <code>Intiated</code>. If the status doesn't change after 10 minutes, delete the peering and try again, ensuring the details were entered correctly. Mismatching network region and address range are most common reasons for the peering to not being provisioned properly.</p>
<p>When the peering is initiated, get back to AWS console and navigate to <code>Virtual Private Cloud</code> - <code>Peering Connections list</code>. There, you will see the incoming peering request.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-peering-3.png" alt="Incoming peering request"></p>
</template></Card><p>Select the pending peering and click on <code>Actions</code> - <code>Accept request</code>. Validate the request details and ensure that all the details match the peering, which you can see in Event Store Cloud console. If everything is correct, click on the <code>Yes, Accept</code> button. After you get a confirmation, you will see the peering in AWS console to become <code>Active</code>. Now, you can get back to Event Store Cloud console, refresh the peering list to ensure that the pending record also changed its status to <code>Active</code>.</p>
<p>Now, although both networks are now connected, AWS doesn't create proper routes automatically. To finish the setup, open the AWS VPC details and click on the route table link, then on the <code>Routes</code> tab. There you'll see that the network has no route to the Event Store Cloud network, so you need to create one.</p>
<p>Click on <code>Edit routes</code> and then <code>Add route</code>. In the <code>Destination</code>, enter the CIDR of the Event Store Cloud network. For the <code>Target</code>, choose the <code>Peering Connection</code> option.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-network-route.png" alt="AWS route"></p>
</template></Card><p>The list of available peering connections will pop up. Select the recently created peering from the list and click on <code>Save routes</code>. The route table would then look like shown on the screenshot below.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/aws/aws-network-route-done.png" alt="AWS route complete"></p>
</template></Card><div class="custom-container tip"><p class="custom-container-title">Peering issues</p>
<p>You might see the peering request getting stuck. There are several reasons for this to happen, like your cloud account quota or overlapping CIDR blocks. You can find all the necessary diagnostics in the <RouterLink to="/cloud/intro/#events-and-notifications">Event Console</RouterLink> in Event Store Cloud.</p>
</div>
<p>At this moment, you should be able to connect to the EventStoreDB cluster in the cloud from any VM, which is connected to your AWS VPC network.</p>
<p>If you are using one or more subnets associated to this VPC, make sure you update the routing table for all of them, not only on the main route table of the VPC.</p>
<p>Depending on your setup, you might already have a connection available from your local machine to the AWS VPC using a site-to-site VPN. If not, ask your AWS administrator about the connection details, which could be a Virtual Private Gateway or Client VPN Endpoint.</p>
<h3 id="next-step" tabindex="-1"><a class="header-anchor" href="#next-step" aria-hidden="true">#</a> Next step</h3>
<p>You are now ready to start using the new EventStoreDB cluster in the cloud. Follow to the <a href="../use">Using the cloud cluster</a> section to learn more.</p>
<h2 id="microsoft-azure" tabindex="-1"><a class="header-anchor" href="#microsoft-azure" aria-hidden="true">#</a> Microsoft Azure</h2>
<p>For Microsoft Azure customers, Event Store Cloud allows provisioning an EventStoreDB cluster in the same cloud. You can create a cluster in the same region to ensure the lowest latency.</p>
<div class="custom-container warning"><p class="custom-container-title">Azure considerations</p>
<p>Microsoft Azure has a few differences that you need to consider when using Event Store Cloud with Azure. We listed all currently known limitations <a href="#considerations-for-microsoft-azure">below on this page</a>. Please ensure you are aware of it before starting to use EventStoreDB in Azure.</p>
</div>
<p>Pre-requisites:</p>
<ul>
<li>You have an organisation registered in Cloud console</li>
<li>You can log in to the Cloud console as admin</li>
<li>Your organisation has at least one project</li>
<li>You are the admin of the project</li>
<li>You have access to create Azure resources in the Azure account of your organisation</li>
</ul>
<p>The provisioning process consists of three steps:</p>
<ol>
<li>Create a network in Event Store Cloud</li>
<li>Provision the EventStoreDB instance or cluster</li>
<li>Peer the new network with your own Azure network</li>
</ol>
<h3 id="create-a-network-1" tabindex="-1"><a class="header-anchor" href="#create-a-network-1" aria-hidden="true">#</a> Create a network</h3>
<p>In the Event Store Cloud console, go to the <RouterLink to="/cloud/intro/#projects">project context</RouterLink> and switch to <code>Networks</code>. Then, click on the <code>New network</code> button.</p>
<p>Make sure to fill out the required information:</p>
<ul>
<li>Network name</li>
<li>Cloud provider - Azure</li>
<li>Region - choose the Azure region</li>
<li>CIDR block - the new network address range</li>
</ul>
<Card><template #content><p><img src="@source/cloud/provision/images/azure/azure-create-network.png" alt="Create Azure network"></p>
</template></Card><p>In order to establish a connection between the cluster network and your own cloud network, you'd need to peer them. Currently, Event Store Cloud only supports peering within the same region. Therefore, ensure that you choose the same region as your own cloud network.</p>
<p>The network address range should not overlap with the address range of other networks in the same region and with your own Azure network, which you will be peering with. As any other cloud network, the CIDR block needs to be within the range specified by RFC1918.</p>
<p>After specifying all the details, click on the <code>Create network</code> button. You will be brought back to the networks list where the new network will appear as being provisioned. The provisioning process in Azure might take several minutes. You'd need to click on the refresh button from time to time as the view won't update automatically.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/azure/azure-network-active.png" alt="Azure active network"></p>
</template></Card><p>By clicking on the network in the list you can inspect the details like its name, status, region and address range.</p>
<p>Wait until the network becomes <code>Active</code> in the list before moving to the next step.</p>
<h3 id="deploy-a-managed-instance-1" tabindex="-1"><a class="header-anchor" href="#deploy-a-managed-instance-1" aria-hidden="true">#</a> Deploy a managed instance</h3>
<p>Within the project scope you can view EventStoreDB clusters for the project if you click on the <code>Clusters</code> menu. Initially, the cluster list is empty and you will only see the <code>New cluster</code> button.</p>
<p>When you click on the button, you get to the cluster creation form.</p>
<p>On the first part of the form you need to specify the new cluster name, the cloud provider (Azure) and the EventStoreDB version (currently it's only 20.6). Further, you need to choose the deployment size (single instance or three-node cluster) and whether to start server-side projections by default.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/azure/azure-new-cluster-1.png" alt="Azure cluster first part"></p>
</template></Card><div class="custom-container warning"><p class="custom-container-title">Projections impact performance</p>
<p>Both system projections and user-defined projections produce new events. Carefully consider the impact of enabled projections on database performance. Please refer to the <RouterLink to="/server/generated/v20.10/docs/projections/#performance-impact">Performance impact</RouterLink> section of the projections documentation to learn more.</p>
</div>
<p>The lower section of the form allows choosing the instance size for cluster nodes. Currently, only three instance sizes are available. The <code>F1</code> size is the lower-edge, aiming mainly to support testing scenarios and experiments due to its low price. Other instance sizes are production-grade.</p>
<div class="custom-container tip"><p class="custom-container-title">Vertical scaling</p>
<p>At this moment, it is not possible to change the cluster node instance size. You can still resize cluster instances by taking a backup and restoring it to a different cluster with larger or smaller instances.</p>
</div>
<Card><template #content><p><img src="@source/cloud/provision/images/azure/azure-new-cluster-2.png" alt="Azure cluster second part"></p>
</template></Card><p>Further, you need to specify the storage capacity. One disk kind is available at the moment (Premium SSD LRS). <strong>As we currently do not support online disk resize for Azure, you need to ensure that the disk size you choose will support your estimated data volume</strong>.</p>
<p>Finally, choose the network provisioned previously from the list. All cluster nodes will be attached to that network.</p>
<p>You will get the monthly price for the selected cluster size down below in the form.</p>
<p>Finally, when you click on <code>Create cluster</code>, the provisioning process starts and you will get a new cluster available after a few minutes.</p>
<h3 id="network-peering-1" tabindex="-1"><a class="header-anchor" href="#network-peering-1" aria-hidden="true">#</a> Network peering</h3>
<p>When the cluster provisioning process finishes, you get a new cluster (or single node), which is connected to the network created in the first step. You won't be able to connect to the cluster since the network is not exposed to the Internet. In order to get access to the network and consequently to all the clusters in that network, you'd need to peer the Event Store Cloud network to your own Azure network. Normally, your Azure network would be also accessible by applications, which you want to connect to the new cloud EventStoreDB cluster.</p>
<div class="custom-container warning"><p class="custom-container-title">Peering limitations</p>
<p>Currently, you can peer one Event Store Cloud network with only one Azure network on your account. We expect to lift this limitation in the future.</p>
</div>
<p>For this example, we'll use an Azure network the same region (UK South).</p>
<p>In Event Store Cloud console, while in the same project context as the new network and cluster, click on <code>Peering</code> under the <code>Project</code> menu, then click on <code>New peering</code>.</p>
<p>Then, give the new peering a name and select the network created earlier.</p>
<p>You also need to find your tenant ID, which is only visible on the Azure AD <a href="https://aad.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Properties" target="_blank" rel="noopener noreferrer">properties page<OutboundLink/></a>. Alternatively, you can use the <code>Get-AzureADTenantDetails</code> <a href="https://docs.microsoft.com/en-us/powershell/module/azuread/Get-AzureADTenantDetail?view=azureadps-2.0" target="_blank" rel="noopener noreferrer">PowerShell command<OutboundLink/></a>.</p>
<p>Finally, you'd need to fill out all the fields:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Peering form</th>
<th style="text-align:left">Azure network details</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Peer Tenant ID</td>
<td style="text-align:left">Tenant ID from Azure AD</td>
</tr>
<tr>
<td style="text-align:left">Peer Network ID</td>
<td style="text-align:left">Network resource ID (can be found on the network Properties page or in JSON view)</td>
</tr>
<tr>
<td style="text-align:left">Azure region</td>
<td style="text-align:left">Network region, cannot be changed</td>
</tr>
<tr>
<td style="text-align:left">Peer address space</td>
<td style="text-align:left">IPv4 CIDR (address space for the whole network)</td>
</tr>
</tbody>
</table>
<p>For our example, here is the complete form:</p>
<Card><template #content><p><img src="@source/cloud/provision/images/azure/azure-peering-1.png" alt="Azure peering - complete form"></p>
</template></Card><p>When you click on the <code>Create peering</code> button, Event Store Cloud will check if it has permissions to create the peering (see <a href="#network-peering-2">Azure Considerations</a>). The Cloud console will display a set of pre-populated Azure CLI commands, which you need to execute in order for Event Store Cloud to be able to create the peering.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/azure/azure-peering-2.png" alt="Azure peering - sa"></p>
</template></Card><p>After completing all those commands, click on the <code>Create peering</code> button. You'll be redirected to the peering list screen with the new peering resource being provisioned. After a little while, the status will change to <code>Intiated</code>. If the status doesn't change after 10 minutes, delete the peering and try again, ensuring the details were entered correctly. Mismatching network region and address range are the most common reasons for the peering to not being provisioned properly.</p>
<p>When the peering is initiated, get back to Azure Portal and navigate to the <code>Peering</code> page of your Azure network. There, you will see the newly provisioned peering, which should have <code>Connected</code> in the <code>Peering status</code> column.</p>
<p>In a short while, the initiated peering in Event Store Cloud console should change its status to <code>Active</code>. You might need to refresh the list from time to time as it doesn't update automatically.</p>
<div class="custom-container tip"><p class="custom-container-title">Peering issues</p>
<p>You might see the peering request getting stuck. There are several reasons for this to happen, like your cloud account quota or overlapping CIDR blocks. You can find all the necessary diagnostics in the <code>Event Console</code> in Event Store Cloud.</p>
</div>
<p>At this moment, you should be able to connect to the EventStoreDB cluster in the cloud from any VM, which is connected to your Azure network.</p>
<p>Depending on your setup, you might already have a connection available from your local machine to the Azure network using a site-to-site or point-to-site VPN. If not, ask your Azure administrator about the connection details.</p>
<h3 id="next-step-1" tabindex="-1"><a class="header-anchor" href="#next-step-1" aria-hidden="true">#</a> Next step</h3>
<p>You are now ready to start using the new EventStoreDB cluster in the cloud. Follow to the <a href="../use">Using the cloud cluster</a> section to learn more.</p>
<h3 id="considerations-for-microsoft-azure" tabindex="-1"><a class="header-anchor" href="#considerations-for-microsoft-azure" aria-hidden="true">#</a> Considerations for Microsoft Azure</h3>
<p>Due to differences between Microsoft Azure and other cloud providers, the provisioning process in Event Store Cloud is different from AWS and GCP. We've made a list of these differences here in order to help you make an informed decision about Cloud providers.</p>
<h4 id="network-peering-2" tabindex="-1"><a class="header-anchor" href="#network-peering-2" aria-hidden="true">#</a> Network peering</h4>
<p>When creating a peering link, Azure requires the user to configure a security principal, referencing the application ID of Event Store Cloud, and also configure and apply a role allowing that principal to modify the network resource of the remote network.</p>
<h4 id="disk-resize" tabindex="-1"><a class="header-anchor" href="#disk-resize" aria-hidden="true">#</a> Disk resize</h4>
<p>Currently, it is impossible to expand disks on Event Store Cloud nodes provisioned to Azure. We plan to provide this feature at a later date, but as there is no native support within Azure, implementing this requires more planning and thought on our part.</p>
<p>There are positive ways around this, and we advise you to choose the disk size accordingly from the start, so the volume size will accommodate the growth of your data over time. You can also backup an existing cluster and restore the data to a new cluster with larger disks.</p>
<p>We're aware that Azure Premium SSD volumes have a strict IOPS limit and this limit depends on the volume size. Very small volumes do not provide enough throughput for most production scenarios. We suggest you consider using at least 246 GiB disks to get enough IOPS for the database. You can check the current throughput limits for Azure Premium SSD volumes in <a href="https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssd" target="_blank" rel="noopener noreferrer">Azure documentation<OutboundLink/></a>.</p>
<h4 id="resource-provisioning" tabindex="-1"><a class="header-anchor" href="#resource-provisioning" aria-hidden="true">#</a> Resource provisioning</h4>
<p>Azure resource provisioning speed will almost always be slower and more highly variable than other providers. Please account for this when interacting with provisioned resources on Azure.</p>
<h4 id="available-regions" tabindex="-1"><a class="header-anchor" href="#available-regions" aria-hidden="true">#</a> Available regions</h4>
<p>At the moment, you can deploy EventStoreDB clusters only in regions with three or more availability zones, and many Azure regions do not have the minimum number of availability zones to support the deployment of managed EventStoreDB clusters. In the future, we plan to allow the deployment of single node topologies to all regions. We'll also introduce a new topology that allows cluster deployments to a single availability zone.</p>
<p>Currently, we support following Azure regions:</p>
<ul>
<li>Australia East,</li>
<li>Canada Central,</li>
<li>Central US,</li>
<li>East US,</li>
<li>East US 2,</li>
<li>France Central,</li>
<li>Japan East,</li>
<li>North Europe,</li>
<li>Southeast Asia,</li>
<li>UK South,</li>
<li>West Europe,</li>
<li>West US 2.</li>
</ul>
<h4 id="pricing" tabindex="-1"><a class="header-anchor" href="#pricing" aria-hidden="true">#</a> Pricing</h4>
<p>Prices for computing resources (virtual machines) in Azure are generally higher, compared with AWS and GCP, and this is reflected in the costs for managed EventStoreDB deployments. As EventStoreDB requires at least two CPU cores, and the smallest instance size in Azure is more expensive, the <code>F1</code> instance size in Azure is the most expensive of the three cloud providers we offer.</p>
<h2 id="google-cloud-platform-gcp" tabindex="-1"><a class="header-anchor" href="#google-cloud-platform-gcp" aria-hidden="true">#</a> Google Cloud Platform (GCP)</h2>
<p>For Google Cloud customers, Event Store Cloud allows provisioning an EventStoreDB cluster in the same cloud. You can create a cluster in the same region to ensure the lowest latency.</p>
<p>Pre-requisites:</p>
<ul>
<li>You have an organisation registered in Cloud console</li>
<li>You can log in to the Cloud console as admin</li>
<li>Your organisation has at least one project</li>
<li>You are the admin of the project</li>
<li>You have access to create Google Cloud resources in the GCP project of your organisation</li>
</ul>
<p>The provisioning process consists of three steps:</p>
<ol>
<li>Create a network in Event Store Cloud</li>
<li>Provision the EventStoreDB instance or cluster</li>
<li>Peer the new network with your own network in GCP</li>
</ol>
<h3 id="create-a-network-2" tabindex="-1"><a class="header-anchor" href="#create-a-network-2" aria-hidden="true">#</a> Create a network</h3>
<p>In the Event Store Cloud console, go to the <RouterLink to="/cloud/intro/#projects">project context</RouterLink> and switch to <code>Networks</code>. Then, click on the <code>New network</code> button.</p>
<p>Make sure to fill out the required information:</p>
<ul>
<li>Network name</li>
<li>Cloud provider - GCP</li>
<li>Region - choose the GCP region</li>
<li>CIDR block - the new network address range</li>
</ul>
<Card><template #content><p><img src="@source/cloud/provision/images/gcp/gcp-create-network.png" alt="Create GCP network"></p>
</template></Card><p>In order to establish a connection between the cluster network and your own cloud network, you'd need to peer them. Currently, Event Store Cloud only supports peering within the same region. Therefore, ensure that you choose the same region as your own cloud network.</p>
<p>The network address range should not overlap with the address range of other networks in the same region and with your own GCP network, which you will be peering with. As any other cloud network, the CIDR block needs to be within the range specified by RFC1918.</p>
<p>After specifying all the details, click on the <code>Create network</code> button. You will be brought back to the networks list where the new network will appear as being provisioned. The provisioning process in GCP might take a little while. You'd need to click on the refresh button from time to time as the view won't update automatically.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/gcp/gcp-network-active.png" alt="GCP active network"></p>
</template></Card><p>By clicking on the network in the list you can inspect the details like its name, status, region and address range.</p>
<p>Wait until the network becomes <code>Active</code> in the list before moving to the next step.</p>
<h3 id="deploy-a-managed-instance-2" tabindex="-1"><a class="header-anchor" href="#deploy-a-managed-instance-2" aria-hidden="true">#</a> Deploy a managed instance</h3>
<p>Within the project scope you can view EventStoreDB clusters for the project if you click on the <code>Clusters</code> menu. Initially, the cluster list is empty and you will only see the <code>New cluster</code> button.</p>
<p>When you click on the button, you get to the cluster creation form.</p>
<p>On the first part of the form you need to specify the new cluster name, the cloud provider (GCP) and the EventStoreDB version (currently it's only 20.6). Further, you need to choose the deployment size (single instance or three-node cluster) and whether to start server-side projections by default.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/gcp/gcp-new-cluster-1.png" alt="GCP cluster first part"></p>
</template></Card><div class="custom-container warning"><p class="custom-container-title">Projections impact performance</p>
<p>Both system projections and user-defined projections produce new events. Carefully consider the impact of enabled projections on database performance. Please refer to the <RouterLink to="/server/generated/v20.10/docs/projections/#performance-impact">Performance impact</RouterLink> section of the projections documentation to learn more.</p>
</div>
<p>The lower section of the form allows choosing the instance size for cluster nodes. Currently, only three instance sizes are available. The <code>F1</code> size is the lower-edge, aiming mainly to support testing scenarios and experiments due to its low price. Two instance sizes are production-grade.</p>
<div class="custom-container tip"><p class="custom-container-title">Vertical scaling</p>
<p>At this moment, it is not possible to change the cluster node instance size. You can still resize cluster instances by taking a backup and restoring it to a different cluster with larger or smaller instances.</p>
</div>
<Card><template #content><p><img src="@source/cloud/provision/images/gcp/gcp-new-cluster-2.png" alt="GCP cluster second part"></p>
</template></Card><p>Further, you need to specify the storage capacity. One disk kind is available at the moment, but you can change the disk size. Since we allow customers to expand the storage size online without service interruptions, you can start with smaller storage and expand it when you need more capacity.</p>
<p>Finally, choose the network provisioned previously from the list. All cluster nodes will be attached to that network.</p>
<p>You will get the monthly price for the selected cluster size down below in the form.</p>
<p>Finally, when you click on <code>Create cluster</code>, the provisioning process starts and you will get a new cluster available after a few minutes.</p>
<h3 id="network-peering-3" tabindex="-1"><a class="header-anchor" href="#network-peering-3" aria-hidden="true">#</a> Network peering</h3>
<p>When the cluster provisioning process finishes, you get a new cluster (or single instance), which is connected to the network created in the first step. You won't be able to connect to the cluster since the network is not exposed to the Internet. In order to get access to the network and consequently to all the clusters in that network, you'd need to peer the Event Store Cloud network to your own GCP VPC network. Normally, your GCP VPC network would be also accessible by applications, which you want to connect to the new cloud EventStoreDB cluster.</p>
<div class="custom-container warning"><p class="custom-container-title">Peering limitations</p>
<p>Currently, you can peer one Event Store Cloud network with only one GCP network on your account. We expect to lift this limitation in the future.</p>
</div>
<p>For this example, we'll use a VPC network in GCP in the same region (<code>europe-west-4</code>).</p>
<Card><template #content><p><img src="@source/cloud/provision/images/gcp/gpc-vpc-details.png" alt="GCP VPC details"></p>
</template></Card><p>Notice that the VPC has one subnet in the same region as the Event Store Cloud network provisioned earlier.</p>
<p>The network page provide us enough details to start the peering process. In Event Store Cloud console, while in the same project context as the new network and cluster, click on <code>Peering</code> under the <code>Project</code> menu, then click on <code>New peering</code>.</p>
<p>Then, give the new peering a name and select the network created earlier. You'd need to fill out the remaining fields, using the information from GCP VPC.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Peering form</th>
<th style="text-align:left">GCP VPC screen</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Peer GCP Project ID</td>
<td style="text-align:left">GCP project ID, found in the project selection popup</td>
</tr>
<tr>
<td style="text-align:left">Peer Network Name</td>
<td style="text-align:left">The VPC name</td>
</tr>
<tr>
<td style="text-align:left">GCP region</td>
<td style="text-align:left">VPC subnet region, cannot be changed</td>
</tr>
<tr>
<td style="text-align:left">Peer address space</td>
<td style="text-align:left">VPC subnet address range</td>
</tr>
</tbody>
</table>
<p>For our example, here is the complete form:</p>
<Card><template #content><p><img src="@source/cloud/provision/images/gcp/gcp-peering-1.png" alt="GCP peering - complete form"></p>
</template></Card><p>When you click on the <code>Create peering</code> button, you'll be redirected to the peering list screen with the new peering resource being provisioned. After a little while, the status will change to <code>Intiated</code>.</p>
<Card><template #content><p><img src="@source/cloud/provision/images/gcp/gcp-peering-2.png" alt="GCP peering - pending"></p>
</template></Card><p>The information on the peering details screen provides some essential information to complete the peering process from GCP side.</p>
<p>When the peering is initiated, get back to Google Cloud console and navigate to <code>VPC network peering</code>. There, click <code>Create connection</code> and then <code>Continue</code>. Give new peering a name and choose the network on GCP side. Next, fill out the remaining values using the initiated peering details:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Event Store Cloud</th>
<th style="text-align:left">GCP connection peering</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Peer Project ID</td>
<td style="text-align:left">Project ID</td>
</tr>
<tr>
<td style="text-align:left">Peer Network Name</td>
<td style="text-align:left">VPC network name</td>
</tr>
</tbody>
</table>
<p><strong>Important</strong>: expand the <code>Exchange custom routes</code> section and enable both <code>Import</code> and <code>Export</code> options for custom routes. It will instruct GCP to create routes automatically.</p>
<p>Here is how our example GCP peering form would look like:</p>
<Card><template #content><p><img src="@source/cloud/provision/images/gcp/gcp-peering-3.png" alt="Incoming peering request"></p>
</template></Card><p>Click the <code>Create</code> button and when in the <code>VPC network peering</code> list, click <code>Refresh</code> until the peering status changes to <code>Active</code>. The peering status in Event Store Cloud console should also change to <code>Active</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">Peering issues</p>
<p>You might see the peering request getting stuck. There are several reasons for this to happen, like your cloud account quota or overlapping CIDR blocks. You can find all the necessary diagnostics in the <code>Event Console</code> in Event Store Cloud.</p>
</div>
<p>At this moment, you should be able to connect to the EventStoreDB cluster in the cloud from any VM, which is connected to your GCP VPC network.</p>
<p>Depending on your setup, you might already have a connection available from your local machine to the GCP VPC using a site-to-site VPN. If not, ask your operations about the connection details.</p>
<h3 id="next-step-2" tabindex="-1"><a class="header-anchor" href="#next-step-2" aria-hidden="true">#</a> Next step</h3>
<p>You are now ready to start using the new EventStoreDB cluster in the cloud. Follow to the <a href="../use">Using the cloud cluster</a> section to learn more.</p>
<h2 id="cloud-instance-sizing-guide" tabindex="-1"><a class="header-anchor" href="#cloud-instance-sizing-guide" aria-hidden="true">#</a> Cloud instance sizing guide</h2>
<p>Use this guide to assess the needs of your application performance, compared with the capability of a given EventStoreDB instance in Event Store Cloud.</p>
<h3 id="instance-performance" tabindex="-1"><a class="header-anchor" href="#instance-performance" aria-hidden="true">#</a> Instance performance</h3>
<p>Performance of the managed EventStoreDB cluster in ES Cloud depends primarily on the instance size for cluster members. In addition, the disk size could affect the instance IOPS limit when it comes to reading and writing events to the database.
We rate instances based on the desired usage. Our current rating include:</p>
<ul>
<li>Micro</li>
<li>Development</li>
<li>Production</li>
</ul>
<h4 id="throughput" tabindex="-1"><a class="header-anchor" href="#throughput" aria-hidden="true">#</a> Throughput</h4>
<p>A wide variety of factors impact total Event throughput on a cluster, including Events per batch and Event size and the active number of streams in the working set.</p>
<p>We have profiled using single event transactions for the production rated clusters and confirmed they can operate at 20k tx/sec throughput (concurrent read and write) given the correct configuration for concurrent clients, a given disk size, and Working Set. It's possible to increase the throughput by using batched write operations, but the impact of batching heavily depends on the batch size in bytes. Before placing any application into production, it is vital to perform a performance test on the planned instance to assess how these factors apply to your application.</p>
<p>The <strong>Working Set</strong> is the number of streams being read from and written to concurrently. It's essential to recognise that writing one million events into one million streams is a very different scenario than writing one million events into a single stream.</p>
<h4 id="cloud-vs-self-hosted-and-development-setups" tabindex="-1"><a class="header-anchor" href="#cloud-vs-self-hosted-and-development-setups" aria-hidden="true">#</a> Cloud vs self-hosted and development setups</h4>
<p>When load testing an application against Event Store Cloud EventStoreDB clusters, performance may differ from a self-hosted solution when utilizing a similar instance size.</p>
<p>Event Store Cloud utilizes <a href="https://en.wikipedia.org/wiki/ZFS" target="_blank" rel="noopener noreferrer">ZFS<OutboundLink/></a> to ensure filesystem integrity/safety as well as block level compression, to ensure the minimization of IOPs and a lower storage cost for data hosted.</p>
<p>ZFS requires additional CPU and memory to provide these capabilities. As such a self-hosted comparison should utilize a similar configuration in order to provide a relevant comparison.</p>
<p>EventStoreDB requires CPU cycles to maintain indexes, and for other maintenance processes. Underpopulated or underloaded databases (such as demo or development setups) require little CPU time and overperform compared to fully populated systems with consistent throughput. Expect performance to level off as workloads increase.</p>
<h4 id="micro-f1-instance-sizes" tabindex="-1"><a class="header-anchor" href="#micro-f1-instance-sizes" aria-hidden="true">#</a> Micro (F1) instance sizes</h4>
<p>F1 instance size is designed for a low-cost development environment. We recommend using it for the experiments like Proof of Concept or extremely low workload like 10-100 events a day per database (cluster). F1 instances are using a burstable CPU class to enable this goal across all supported public clouds.</p>
<p>Due to the burstable CPU class, CPU shares are limited, this results in the following implications:</p>
<ul>
<li>If CPU shares are not available and allocations are increasing this may result in client timeouts to the cluster or an out of memory condition.</li>
<li>CPU shares are required to maintain the cluster state topology via constant gossip message propagation. It means that the cluster needs CPU shares to maintain cluster state even when it's is not under load.</li>
<li>If a continuous load is applied it may be possible to exhaust the allowed CPU shares per time cycle, resulting in client timeouts or out of memory conditions.</li>
<li>When ESC exited Preview and went into GA we increased the size of the backing instance type as the original F1 instance size was too small to provide enough memory and CPU shares to maintain cluster state adequately even at extremely low volumes. A backup and restore is required to move to the new backing size.</li>
</ul>
<h3 id="sizes" tabindex="-1"><a class="header-anchor" href="#sizes" aria-hidden="true">#</a> Sizes</h3>
<table>
<thead>
<tr>
<th style="text-align:left">Size</th>
<th style="text-align:left">Rating</th>
<th style="text-align:left">Working Set (streams)</th>
<th style="text-align:left">Disk size (min)</th>
<th style="text-align:left">Concurrent clients (max)</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><strong>F1</strong></td>
<td style="text-align:left">Micro</td>
<td style="text-align:left">100k</td>
<td style="text-align:left">50 GB</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left"><strong>C4</strong></td>
<td style="text-align:left">Development</td>
<td style="text-align:left">500k</td>
<td style="text-align:left">100 GB</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left"><strong>M8</strong></td>
<td style="text-align:left">Development</td>
<td style="text-align:left">1M</td>
<td style="text-align:left">250 GB</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left"><strong>M16</strong></td>
<td style="text-align:left">Development / Light Production</td>
<td style="text-align:left">6M</td>
<td style="text-align:left">500 GB</td>
<td style="text-align:left">20</td>
</tr>
<tr>
<td style="text-align:left"><strong>M32</strong></td>
<td style="text-align:left">Production</td>
<td style="text-align:left">12M</td>
<td style="text-align:left">1 TB</td>
<td style="text-align:left">250</td>
</tr>
<tr>
<td style="text-align:left"><strong>M64</strong></td>
<td style="text-align:left">Production</td>
<td style="text-align:left">30M</td>
<td style="text-align:left">2 TB</td>
<td style="text-align:left">500</td>
</tr>
<tr>
<td style="text-align:left"><strong>M128</strong></td>
<td style="text-align:left">Production</td>
<td style="text-align:left">62M</td>
<td style="text-align:left">4 TB</td>
<td style="text-align:left">500</td>
</tr>
</tbody>
</table>
</template>
