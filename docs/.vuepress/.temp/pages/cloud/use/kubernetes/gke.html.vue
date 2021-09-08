<template><h1 id="connect-to-google-kubernetes-engine" tabindex="-1"><a class="header-anchor" href="#connect-to-google-kubernetes-engine" aria-hidden="true">#</a> Connect to Google Kubernetes Engine</h1>
<p>On this page, you find instructions how to set up a Google Kubernetes Engine (GKE) cluster, so it can connect to an EventStoreDB cluster in Event Store Cloud. As a prerequisite, you have experience with Kubernetes, GKE and networking in Kubernetes as well as in Google Cloud Platform (GCP).</p>
<p>Before you provision a cluster in Event Store Cloud, you need to have a network, to which the cluster nodes will connect. Nodes in the cluster will get IP addresses from the specified network CIDR.</p>
<p>In order to be able to work with the cluster, you need to establish a connection between the Event Store Cloud network and your own VPC Network in Google Cloud. You do it by provisioning a network peering between those two networks.</p>
<p>You can find more information about the steps needed for provisioning Event Store Cloud resources and connecting them to your own GCP project in the <a href="../../provision/gcp">provisioning</a> section.</p>
<h2 id="planning-ip-ranges" tabindex="-1"><a class="header-anchor" href="#planning-ip-ranges" aria-hidden="true">#</a> Planning IP ranges</h2>
<p>The challenge is to set up IP ranges for both VPCs, the GKE cluster, and the peering in a way that pods running in Kubernetes would be able to reach the EventStoreDB cluster in Event Store Cloud.</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-1.png" alt="GKE and ESC topology"></p>
</template></Card><p>When creating the Standard GKE cluster from GCP Console, the Networking section has the <em>Advanced networking</em> options subsection. There you find the <em>Pod address range</em> setting. It is available for clusters with any type of routing (static routes or VPC-native).</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-2.png" alt="GKE network settings"></p>
</template></Card><p>If the <em>Pod address range</em> option is left blank, the cluster will get a private IP range for the pods. For example, the cluster with static routing got the <code>10.120.0.0/14</code> CIDR block for the pods:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-3.png" alt="GKE network settings"></p>
</template></Card><p>When using VPC-native routing, this new range would be added to the selected VPC network subnet, in addition to the main IP range.</p>
<p>The issue that you'll experience when leaving the pod IP range blank and letting the provisioner to define it for you, is that IP range won't be a part of the configured network peering IP range in Event Store Cloud. For the current example, the <code>subnet-esc</code> has the IP range <code>172.30.0.0/16</code> and that's what we used when creating the peering as described in our documentation. As the new pod address range (<code>10.120.0.0/14</code>) is not part of the IP range known to the peering, those pods won't be able to connect to the EventStoreDB cloud cluster.</p>
<p>It could be solvable when using the VPC-native routing for the GKE cluster, as the pod IP range would be added to the subnet. However, the currently available Event Store Cloud version only allows you to have one peering with a given subnet, and the peering has only one remote IP range. It means that we can neither add the pods IP range to the existing peering, nor could we create a new peering with this new range.</p>
<p>The issue can be fixed by defining a custom pod address IP range, which is a part of the peering IP range. In our documentation we recommend using your VPN network subnet CIDR block as the <em>Remote Address</em> field value when creating the peering. However, you can specify a larger range, which could include both the main subnet range, and the additional range for the GKE pods.</p>
<h2 id="example-ip-ranges" tabindex="-1"><a class="header-anchor" href="#example-ip-ranges" aria-hidden="true">#</a> Example IP ranges</h2>
<p>Let's have a look at a working configuration. In this example, we use the following resources:</p>
<ul>
<li>VPC network <code>vpc-esc</code> on the customer's side</li>
<li>Subnet <code>subnet-esc</code> within the <code>vpc-esc</code> network with the primary IP range <code>172.30.0.0/16</code></li>
<li>VPC-native GKE cluster (Standard or Autopilot) with pod address range <code>172.31.128.0/17</code></li>
</ul>
<p>Now, for the Event Store Cloud network peering, we need to find a range, which covers both the subnet default range, and the additional GKE range. In our case, we could use the <code>172.30.0.0/15</code> range as it includes both ranges. The <code>172.30.0.0/15</code> netmask can be divided as follows:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Subnet address</th>
<th style="text-align:left">Range of addresses</th>
<th style="text-align:left">Usable IPs</th>
<th style="text-align:left">Hosts</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">172.30.0.0/16</td>
<td style="text-align:left">172.30.0.0 - 172.30.255.255`</td>
<td style="text-align:left">172.30.0.1 - 172.30.255.254</td>
<td style="text-align:left">65534</td>
</tr>
<tr>
<td style="text-align:left">172.31.0.0/17</td>
<td style="text-align:left">172.31.0.0 - 172.31.127.255</td>
<td style="text-align:left">172.31.0.1 - 172.31.127.254</td>
<td style="text-align:left">32766</td>
</tr>
<tr>
<td style="text-align:left">172.31.128.0/17</td>
<td style="text-align:left">172.31.128.0 - 172.31.255.255</td>
<td style="text-align:left">172.31.128.1 - 172.31.255.254</td>
<td style="text-align:left">32766</td>
</tr>
</tbody>
</table>
<p>So, here we see that the subnet uses the larger range, and the GKE pod address range uses a smaller range, plus we have one range free for something else.</p>
<h2 id="gke-networking-configuration" tabindex="-1"><a class="header-anchor" href="#gke-networking-configuration" aria-hidden="true">#</a> GKE networking configuration</h2>
<p>When provisioning the GKE cluster, we should specify <code>172.31.128.0/17</code> as the pod address range in the cluster networking configuration for a new Standard cluster:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-5.png" alt="GKE network settings"></p>
</template></Card><p>Similarly, the range can be specified for a new Autopilot cluster:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-6.png" alt="GKE network settings"></p>
</template></Card><p>When the cluster is deployed, you can see that the range is properly assigned:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-7.png" alt="GKE network settings"></p>
</template></Card><p>When looking at the <code>subnet-esc</code>, we can see those ranges shown in the GCP Console:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-8.png" alt="GKE subnet"></p>
</template></Card><p>The network peering resource in Event Store Cloud in this case looks like this:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-9.png" alt="ESC peering"></p>
</template></Card><p>When creating a peering, you don't have to specify a particular subnet of the VPC network, which you peer with. There's no check if the given IP range actually exists in the peered network. Therefore, we can specify the range we need, even if it doesn't match with the primary range of any subnet. By using the larger range, which covers both the primary and secondary ranges, we made the EventStoreDB cluster available for pods in the GKE cluster.</p>
<h2 id="ensure-the-connection" tabindex="-1"><a class="header-anchor" href="#ensure-the-connection" aria-hidden="true">#</a> Ensure the connection</h2>
<p>To confirm that everything works as expected, you can deploy an ephemeral <code>busybox</code> container to the Kubernetes cluster and try reaching out to the EventStoreDB cloud cluster:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl run -i --tty --rm debug --image<span class="token operator">=</span>busybox --restart<span class="token operator">=</span>Never -- <span class="token function">sh</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>If you don't see a command prompt, try pressing enter.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/ <span class="token comment"># ping c0brj8qrh41g7drr2i4g-0.mesdb.eventstore.cloud</span>
PING c0brj8qrh41g7drr2i4g-0.mesdb.eventstore.cloud <span class="token punctuation">(</span><span class="token number">172.22</span>.110.29<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.22</span>.110.29: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">63</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">2.655</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.22</span>.110.29: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">63</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">1.234</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.22</span>.110.29: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">63</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">1.246</span> ms
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Finally, we can deploy applications to the GKE cluster, which can connect to the Event Store Cloud managed EventStoreDB instances.</p>
<p>The overall network topology would look like this, when we complement the initial diagram with IP addresses and network masks:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/gke-10.png" alt="ESC GKE topology"></p>
</template></Card></template>
