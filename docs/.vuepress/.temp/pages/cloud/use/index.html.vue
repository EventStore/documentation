<template><h2 id="networking" tabindex="-1"><a class="header-anchor" href="#networking" aria-hidden="true">#</a> Networking</h2>
<p>Each major cloud provider implements the concept of a Virtual Private Cloud (VPC). A VPC gives you as the cloud user an isolated private network, to which you attach cloud compute resources (virtual machines, container orchestrators, etc) or managed resources, like database servers. VPCs are always in private network address spaces and therefore not directly accessible from the outside of the VPC without additional configuration and infrastructure.</p>
<p>Managed EventStoreDB clusters and instances are not accessible via public internet. You have the following options to ensure connectivity between Event Store Cloud and your workloads.</p>
<h3 id="cloud-network-peering" tabindex="-1"><a class="header-anchor" href="#cloud-network-peering" aria-hidden="true">#</a> Cloud network peering</h3>
<p>Normally, organisations build internal practices in regard to VPCs isolation and access level. In particular, you would expect that some or all VPCs are available for direct access from local networks on-premises, for developers to be able to access cloud resources. Cloud providers let their customers to connect on-premises networks to VPCs using site-to-site VPN connections. In addition, cloud customers often set up virtual private gateways to allow point-to-site VPN connections for their remote users.</p>
<p>Event Store Cloud deploys EventStoreDB clusters on a project-level VPC (network). By peering that network with your own VPC at the same cloud provider, you get access to the EventStoreDB cluster provisioned and managed by Event Store Cloud. Normally, your Ops engineers would be able to configure the routing and allow connecting to EventStoreDB clusters in the cloud.</p>
<p>Currently, peering links have the following limitations:</p>
<ul>
<li>For one peering link you can only specify a single IP range. It means that if your own cloud network has multiple IP ranges, you can only peer one of those. Workloads, which use other IP ranges, won't be able to access managed ESDB instances.</li>
<li>For Azure, peering links have the &quot;Allow gateway transit&quot; <a href="https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview#gateways-and-on-premises-connectivity" target="_blank" rel="noopener noreferrer">property<OutboundLink/></a> disabled. As the peering link is created from Event Store Cloud side, you cannot change this property. It means that the workload must be connected to the peered VN to access the managed ESDB instance.</li>
</ul>
<p>We are addressing the limitations listed above in the coming releases of Event Store Cloud.</p>
<h3 id="tailscale" tabindex="-1"><a class="header-anchor" href="#tailscale" aria-hidden="true">#</a> TailScale</h3>
<p>Another options to connect to the cloud cluster is to use a third-party VPN offering, which might be easier to use. One example would <a href="https://tailscale.com" target="_blank" rel="noopener noreferrer">TailScale<OutboundLink/></a>, which is a <a href="https://www.wireguard.com/" target="_blank" rel="noopener noreferrer">WireGuard®<OutboundLink/></a> based mesh VPN. In addition to the basic functionality of connecting devices in a mesh network, TailGate also allows connecting a subnet to the private VPN. For that, you'd need to provision a VM in the cloud, which is connected to the network peered with Event Store Cloud network. Since that machine would be able to access the EventStoreDB cluster, by configuring the TailScale <a href="https://tailscale.com/kb/1019/subnets" target="_blank" rel="noopener noreferrer">subnet routing<OutboundLink/></a> you will also make the cluster accessible for all users of your TailScale network.</p>
<p>Check our <a href="#connect-with-tailscale">Tailscale guide</a> for detailed instructions.</p>
<h2 id="data-migration" tabindex="-1"><a class="header-anchor" href="#data-migration" aria-hidden="true">#</a> Data migration</h2>
<p>Currently, the only way to migrate data to the cloud cluster or instance is by using <RouterLink to="/cloud/use/migration/replicator.html">live migration</RouterLink>. Live migration can only handle small to medium size databases.</p>
<h2 id="cluster-connection" tabindex="-1"><a class="header-anchor" href="#cluster-connection" aria-hidden="true">#</a> Cluster connection</h2>
<p>Event Store Cloud unconditionally provisions secure EventStoreDB clusters with both TLS for TCP and SSL for HTTP and gRPC enabled. This configuration cannot be changed.</p>
<p>Cloud clusters use SSL certificates signed by the trusted public certificate authority and therefore you won't need to do any additional work that is usually associated with self-signed certificates.</p>
<p>After you provision the cloud cluster, you can find connection details for the cluster in the Cloud console.</p>
<Card><template #content><p><img src="@source/cloud/use/images/cloud-cluster-details.png" alt="Cluster details"></p>
</template></Card><p>In the cluster details you can find URIs for the EventStoreDB Admin UI and HTTP API, TCP client and gRPC client.</p>
<p>The DNS name of the cluster resolves to IP addresses of all the cluster nodes or to the IP address of a single instance, depending on the deployment topology. When connecting to a multi-node cluster, you'd need to use the seed-based gossip with all the cluster nodes when using 20.6.</p>
<p>For 20.6+ gRPC clients, we advise to use the <a href="https://developers.eventstore.com/clients/grpc/getting-started/" target="_blank" rel="noopener noreferrer">gRPC connection generator<OutboundLink/></a> page in the documentation where you can use your cloud cluster ID to get a properly composed connection string.</p>
<p>Each cluster node has its own DNS name, which can be used for accessing individual nodes for node-specific operations like stats collection or scavenging.</p>
<h2 id="connect-with-tailscale" tabindex="-1"><a class="header-anchor" href="#connect-with-tailscale" aria-hidden="true">#</a> Connect with Tailscale</h2>
<p>In many organisations which work with the cloud, you can find the connection between the cloud networks and your local network already established using a Virtual Private Gateway or Site-to-Site VPN connection. However, if you're starting on the side and want to keep things simple, you can use Tailscale to connect to the Event Store Cloud cluster.</p>
<h3 id="what-is-tailscale" tabindex="-1"><a class="header-anchor" href="#what-is-tailscale" aria-hidden="true">#</a> What is Tailscale?</h3>
<p><a href="https://tailscale.com" target="_blank" rel="noopener noreferrer">Tailscale<OutboundLink/></a> is a commercial product built on top of WireGuard®. It allows you to set up a private tunnel VPN in a mesh-style network. In addition to direct connection, Tailscale also has the subnet routing feature using a gateway machine, which should be connected to the target network.</p>
<p>You can use the Solo plan with Tailscale free of charge.</p>
<h3 id="get-started" tabindex="-1"><a class="header-anchor" href="#get-started" aria-hidden="true">#</a> Get started</h3>
<p>First, set up a Tailscale account, then install their client software on your machine. The client will ask you to log in after the installation, and then give you your first machine connected to your private VPN.</p>
<p>Follow the <a href="https://tailscale.com/kb/1017/install" target="_blank" rel="noopener noreferrer">installation instructions<OutboundLink/></a> to get started.</p>
<h3 id="provision-the-cloud-vm" tabindex="-1"><a class="header-anchor" href="#provision-the-cloud-vm" aria-hidden="true">#</a> Provision the cloud VM</h3>
<p>Next, you need to create a small VM in the cloud, connected to the VPC with the Event Store Cloud.</p>
<p>You can choose the smallest available instance size, like <code>t4g.nano</code> in AWS, <code>f1.micro</code> in GCP, or <code>Standard B1ls</code> in Azure. For this guide we use Ubuntu 20.04 LTS image (18.04 LTS in Azure).</p>
<p>When creating the VM, make sure you:</p>
<ul>
<li>Connect the default network interface to the VPC peered with Event Store Cloud</li>
<li>Enable public IP if you want to connect to the VM from your local machine</li>
<li>GCP: enable <em>IP Forwarding</em> on the default NIC</li>
<li>AWS: disable <em>Source / destination checking</em></li>
</ul>
<p>For existing VMs, you can enable IP forwarding too.</p>
<CodeGroup>
<CodeGroupItem title="AWS">
<p>Select the EC2 instance in the list of instances and in the <code>Actions</code> menu choose <code>Networking</code> and then <code>Change source/destination check</code>. Ensure that the <code>Stop</code> checkbox is <em>enabled</em>:</p>
<Card><template #content><p><img src="@source/cloud/use/images/aws-ip-forward.png" alt="AWS enable ip forward"></p>
</template></Card></CodeGroupItem>
<CodeGroupItem title="GCP">
<p>On GCP you can enable IP Forward only when creating the VM instance.</p>
<p>On the new VM instance page and scroll down to the <code>Management, security, disks, networking, sole tenancy</code> section, expand it, find the <code>Network interfaces</code> section and click on the pen icon. There, set the <code>IP forwarding</code> to <code>On</code>:</p>
<Card><template #content><p><img src="@source/cloud/use/images/gcp-ip-forward.png" alt="GCP enable ip forward"></p>
</template></Card></CodeGroupItem>
</CodeGroup>
<p>Remember to create the VM instance in the same region as the VPC, which is peered with Event Store Cloud.</p>
<h3 id="set-up-tailscale-subnet-routing" tabindex="-1"><a class="header-anchor" href="#set-up-tailscale-subnet-routing" aria-hidden="true">#</a> Set up Tailscale subnet routing</h3>
<p>When you get the cloud VM instance running, connect to it using SSH. The easiest way is to use the cloud browser console.</p>
<p>After logging in, install the Tailscale client for the Linux distribution used for the cloud VM, following the <a href="https://tailscale.com/kb/1017/install" target="_blank" rel="noopener noreferrer">Tailscale guidelines<OutboundLink/></a>. Here you can also find required steps for <a href="https://tailscale.com/download/linux/ubuntu-2004" target="_blank" rel="noopener noreferrer">Ubuntu 20.04 LTS (focal)<OutboundLink/></a> and <a href="https://tailscale.com/download/linux/ubuntu-1804" target="_blank" rel="noopener noreferrer">Ubuntu 18.04 LTS (bionic)<OutboundLink/></a> distributions.</p>
<p>When the initial steps are completed, you should be able to ping the cloud VM using its internal IP address from your local machine.</p>
<p>Next, visit the Event Store Cloud console and open the peering page. There you will find the peering you created when following the provisioning guidelines. Write down the details from the <code>Local Address</code> and <code>Remote Address</code> fields.</p>
<p>For this example we will use the following peering details:</p>
<Card><template #content><p><img src="@source/cloud/use/images/peering-example.png" alt="Peering page example"></p>
</template></Card><p>With all the necessary details collected, follow these steps on the cloud VM instance:</p>
<p><em>Enable IP forwarding on the machine:</em></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">'net.ipv4.ip_forward = 1'</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> -a /etc/sysctl.conf
<span class="token function">sudo</span> sysctl -p /etc/sysctl.conf
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><em>Restart Tailscale client with subnet routing:</em></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> tailscale up --advertise-routes<span class="token operator">=</span><span class="token number">10.164</span>.0.0/20,172.22.101.0/24 --accept-routes
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>In the example above we used both address spaces of both sides of the peering as the <code>advertise-routes</code> parameter values (comma-separated).</p>
<p>Next, visit your Tailscale Admin Console, find the cloud VM in the list and use the three dots popup menu to enable subnet routing and disable key expiry.</p>
<p>Now, visit the Event Store Cloud console, switch to the Clusters page and choose the EventStoreDB cluster. In the cluster details select the <code>Addresses</code> tab and click on the UI link. You should then get the EventStoreDB Admin UI opened in your local machine browser.</p>
<p>This is how the network looks like when using Tailscale:</p>
<Card><template #content><p><img src="@source/cloud/use/images/es-cloud-networking-tailscale.svg" alt="ES_Cloud_Networking_tailsacle"></p>
</template></Card><h3 id="future-plans" tabindex="-1"><a class="header-anchor" href="#future-plans" aria-hidden="true">#</a> Future plans</h3>
<p>Soon, we want to add out-of-the-box Tailscale network peering, which will create a nano-VM inside Event Store Cloud and set up routing to your Tailscale account automatically.</p>
</template>
