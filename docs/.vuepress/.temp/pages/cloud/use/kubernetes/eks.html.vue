<template><h1 id="connect-to-elastic-kubernetes-services" tabindex="-1"><a class="header-anchor" href="#connect-to-elastic-kubernetes-services" aria-hidden="true">#</a> Connect to Elastic Kubernetes Services</h1>
<p>On this page, you find instructions how to set up an AWS Elastic Kubernetes Services (EKS) cluster, so it can connect to an EventStoreDB cluster in Event Store Cloud. As a prerequisite, you have experience with Kubernetes, AWS and networking in Kubernetes, as well as in AWS cloud platform.</p>
<p>EKS clusters require at least two subnets, which are connected to internet using an Internet Gateway. Both subnets must have the auto-assign public IP setting enabled, otherwise the node group won't get properly provisioned.</p>
<p>Before you provision a cluster in Event Store Cloud, you need to have a network, to which the cluster nodes will connect. Nodes in the cluster will get IP addresses from the specified network CIDR block.</p>
<p>You can find more information about the steps needed for provisioning Event Store Cloud resources and connecting them to your own Azure account in the <a href="../../provision/aws">provisioning</a> section.</p>
<p>In this example, we'll use the following network configuration:</p>
<ul>
<li>Event Store Cloud AWS network with IP range <code>172.29.98.0/24</code> (same as we used in the provisioning guidelines)</li>
<li>VPC in the same region (<code>eu-central-1</code>) with IP range <code>172.16.0.0/16</code></li>
<li>Two subnets in the VPC with ranges <code>172.16.0.0/18</code> and <code>172.16.64.0/18</code>, which are both part of the VPC IP range</li>
</ul>
<p>The AWS VPC has a peering connection established with the Event Store Cloud network, as described in the provisioning guide. For the peering link, we used the whole VPC IP range <code>172.16.0.0/16</code>:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/eks-1.png" alt="ESC peering"></p>
</template></Card><p>Now we can provision the EKS cluster. In the networking configuration section of the new cluster, we need to choose the VPC, which is peered with Event Store Cloud:</p>
<Card><template #content><p><img src="@source/cloud/use/kubernetes/images/eks-2.png" alt="EKS networking"></p>
</template></Card><p>After creating the cluster, you need to add the node group, as usual. Each node will get a network interface per subnet of the EKS cluster, so in our case nodes will be attached to two subnets.</p>
<p>When all the deployments are completed, and you added the EKS cluster to your local config, you can try deploying an ephemeral workload using the <code>busybox</code> container image, so you can test the connectivity:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl run -i --tty --rm debug --image<span class="token operator">=</span>busybox --restart<span class="token operator">=</span>Never -- <span class="token function">sh</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>If you run <code>ifconfig</code> in the pod, you will see that the pod got an IP address from one of the subnets:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/ <span class="token comment"># ifconfig</span>
eth0      Link encap:Ethernet  HWaddr <span class="token number">66</span>:93:89:8F:D7:CF
          inet addr:172.16.101.19  Bcast:0.0.0.0  Mask:255.255.255.255
          UP BROADCAST RUNNING MULTICAST  MTU:9001  Metric:1
          RX packets:12 errors:0 dropped:0 overruns:0 frame:0
          TX packets:7 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:1252 <span class="token punctuation">(</span><span class="token number">1.2</span> KiB<span class="token punctuation">)</span>  TX bytes:640 <span class="token punctuation">(</span><span class="token number">640.0</span> B<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>Then, it should be possible to ping the managed EventStoreDB cluster node from the pod, ensuring that everything works as expected:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/ <span class="token comment"># ping c1ut3oto0aembuk4mi6g.mesdb.eventstore.cloud</span>
PING c1ut3oto0aembuk4mi6g.mesdb.eventstore.cloud <span class="token punctuation">(</span><span class="token number">172.29</span>.98.112<span class="token punctuation">)</span>: <span class="token number">56</span> data bytes
<span class="token number">64</span> bytes from <span class="token number">172.29</span>.98.112: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">0</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">63</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">1.049</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.29</span>.98.112: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">63</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.716</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.29</span>.98.112: <span class="token assign-left variable">seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">63</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.713</span> ms
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>At this moment, any workload deployed to the EKS cluster should be able to connect to the Event Store Cloud managed EventStoreDB cluster.</p>
</template>
