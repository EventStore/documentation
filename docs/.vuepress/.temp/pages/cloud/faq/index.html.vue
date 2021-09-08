<template><h2 id="roadmap" tabindex="-1"><a class="header-anchor" href="#roadmap" aria-hidden="true">#</a> Roadmap</h2>
<h4 id="where-can-i-find-the-cloud-roadmap" tabindex="-1"><a class="header-anchor" href="#where-can-i-find-the-cloud-roadmap" aria-hidden="true">#</a> Where can I find the Cloud Roadmap?</h4>
<p>The Event Store Cloud roadmap is available on <a href="https://www.eventstore.com/event-store-cloud" target="_blank" rel="noopener noreferrer">our website<OutboundLink/></a>, scroll down to see the roadmap.</p>
<h2 id="cluster-provisioning" tabindex="-1"><a class="header-anchor" href="#cluster-provisioning" aria-hidden="true">#</a> Cluster provisioning</h2>
<h4 id="is-it-possible-to-change-the-cluster-instance-size-or-topology" tabindex="-1"><a class="header-anchor" href="#is-it-possible-to-change-the-cluster-instance-size-or-topology" aria-hidden="true">#</a> Is it possible to change the cluster instance size or topology?</h4>
<p>We don't have this feature available yet. However, you can always do it using backup and restore.</p>
<h4 id="are-there-plans-to-support-automatic-resize-of-cluster-nodes" tabindex="-1"><a class="header-anchor" href="#are-there-plans-to-support-automatic-resize-of-cluster-nodes" aria-hidden="true">#</a> Are there plans to support automatic resize of cluster nodes?</h4>
<p>You will be able to do an online instance resize, but it won't be auto-scaling. You will have to change the instance size for your clusters yourself, when this feature will become available.</p>
<h4 id="are-there-plans-to-support-automatic-disk-resize" tabindex="-1"><a class="header-anchor" href="#are-there-plans-to-support-automatic-disk-resize" aria-hidden="true">#</a> Are there plans to support automatic disk resize?</h4>
<p>No, you have to resize the disks yourself, read the procedure in the <RouterLink to="/cloud/ops/#expanding-disks">documentation</RouterLink>. Cloud providers set certain limitations on how often you can perform the disk resize operation, please follow your provider guidelines.</p>
<h2 id="migrating-to-cloud" tabindex="-1"><a class="header-anchor" href="#migrating-to-cloud" aria-hidden="true">#</a> Migrating to Cloud</h2>
<h4 id="how-can-i-migrate-data-from-my-self-hosted-database-to-event-store-cloud" tabindex="-1"><a class="header-anchor" href="#how-can-i-migrate-data-from-my-self-hosted-database-to-event-store-cloud" aria-hidden="true">#</a> How can I migrate data from my self-hosted database to Event Store Cloud?</h4>
<p>We have a <RouterLink to="/cloud/use/migration/replicator.html">replication tool</RouterLink>, which is available now. It has certain limitations, especially with performance. Get in touch, so we can help you to analyse your setup and requirements, before we can recommend using the replication tool.</p>
<h2 id="performance" tabindex="-1"><a class="header-anchor" href="#performance" aria-hidden="true">#</a> Performance</h2>
<h4 id="do-you-have-indicative-performance-benchmarks-for-the-offered-cluster-sizes" tabindex="-1"><a class="header-anchor" href="#do-you-have-indicative-performance-benchmarks-for-the-offered-cluster-sizes" aria-hidden="true">#</a> Do you have indicative performance benchmarks for the offered cluster sizes?</h4>
<p>We published such benchmarks available on the <RouterLink to="/cloud/provision/cloud-instance-guidance/">Cloud instance sizing guide</RouterLink> page.</p>
<p>Please remember, however, that each use case is different, and you might always get better or worse performance, compared with our advertised benchmarking figures. We can help you to analyse your needs and provide more detailed expected performance figures, please get in touch.</p>
<h2 id="alerting-and-notifications" tabindex="-1"><a class="header-anchor" href="#alerting-and-notifications" aria-hidden="true">#</a> Alerting and notifications</h2>
<h4 id="is-there-any-type-of-alerting-functionality-for-cluster-issues" tabindex="-1"><a class="header-anchor" href="#is-there-any-type-of-alerting-functionality-for-cluster-issues" aria-hidden="true">#</a> Is there any type of alerting functionality for cluster issues?</h4>
<p>Yes. Learn more in the <a href="../intro#events-and-notifications">Events Console</a> documentation section.</p>
<h4 id="how-do-you-handle-infrastructure-related-issues-which-cause-unavailability-or-degradation-of-service" tabindex="-1"><a class="header-anchor" href="#how-do-you-handle-infrastructure-related-issues-which-cause-unavailability-or-degradation-of-service" aria-hidden="true">#</a> How do you handle infrastructure related issues, which cause unavailability or degradation of service?</h4>
<p>Event Store Cloud site reliability engineering (SRE) team manages cluster availability.</p>
<p>Please ensure to learn about the SLA levels provided by Event Store Cloud in our <a href="https://www.eventstore.com/cloud-services-service-level-agreement" target="_blank" rel="noopener noreferrer">Service Level Agreement<OutboundLink/></a>.</p>
<h2 id="providers" tabindex="-1"><a class="header-anchor" href="#providers" aria-hidden="true">#</a> Providers</h2>
<h3 id="azure" tabindex="-1"><a class="header-anchor" href="#azure" aria-hidden="true">#</a> Azure</h3>
<h4 id="do-you-use-locally-redundant-storage-lrs-or-zone-redundant-storage-zrs" tabindex="-1"><a class="header-anchor" href="#do-you-use-locally-redundant-storage-lrs-or-zone-redundant-storage-zrs" aria-hidden="true">#</a> Do you use Locally-Redundant Storage (LRS) or Zone-Redundant Storage (ZRS)?</h4>
<p>Customer data is only stored on Premium SSD block device targets. We do not utilize Azure file or blob storage for customer data.</p>
<h4 id="we-use-aks-to-simplify-setup-can-you-expose-the-cluster-to-the-public-internet" tabindex="-1"><a class="header-anchor" href="#we-use-aks-to-simplify-setup-can-you-expose-the-cluster-to-the-public-internet" aria-hidden="true">#</a> We use AKS, to simplify setup can you expose the cluster to the public internet?</h4>
<p>We have no plans to expose clusters via a public IP address. We will be providing guidelines on how to connect AKS clusters to Event Store Cloud.</p>
<h4 id="why-can-t-i-resize-disks-in-azure-after-provisioning-the-cluster" tabindex="-1"><a class="header-anchor" href="#why-can-t-i-resize-disks-in-azure-after-provisioning-the-cluster" aria-hidden="true">#</a> Why can't I resize disks in Azure after provisioning the cluster?</h4>
<p>The disk resize operation in Azure requires us to shot down the cluster node. It works differently in GCP and AWS, that's why we are providing this options for GCP and AWS, but not for Azure. We have plans to implement this feature, but there's no ETA at the moment. Due to Azure limitations, disk resize for single-node instances would always involve some downtime.</p>
<h2 id="managed-eventstoredb" tabindex="-1"><a class="header-anchor" href="#managed-eventstoredb" aria-hidden="true">#</a> Managed EventStoreDB</h2>
<h4 id="does-the-admin-ui-run-on-the-provisioned-cluster" tabindex="-1"><a class="header-anchor" href="#does-the-admin-ui-run-on-the-provisioned-cluster" aria-hidden="true">#</a> Does the admin UI run on the provisioned cluster?</h4>
<p>Yes. Go to the clusters list in the Cloud Console, select the cluster you need and click on the <code>Addresses</code> tab on the bottom panel. You will find the admin UI URL there. You need to be connected to a network, which is routed to Event Store Cloud to open the admin UI in your browser.</p>
<h4 id="are-there-plans-for-the-scheduled-scavenge-feature" tabindex="-1"><a class="header-anchor" href="#are-there-plans-for-the-scheduled-scavenge-feature" aria-hidden="true">#</a> Are there plans for the scheduled scavenge feature?</h4>
<p>Yes, we are actively working on it.</p>
<h2 id="backup-and-restore" tabindex="-1"><a class="header-anchor" href="#backup-and-restore" aria-hidden="true">#</a> Backup and restore</h2>
<h4 id="can-i-automate-backups" tabindex="-1"><a class="header-anchor" href="#can-i-automate-backups" aria-hidden="true">#</a> Can I automate backups?</h4>
<p>The scheduled backup feature has been released in March 2021. Read more in <RouterLink to="/cloud/ops/#scheduled-backups">cloud backup documentation</RouterLink>.</p>
<h4 id="can-i-download-a-backup-to-store-it-locally" tabindex="-1"><a class="header-anchor" href="#can-i-download-a-backup-to-store-it-locally" aria-hidden="true">#</a> Can I download a backup to store it locally?</h4>
<p>We plan to allow backup copies to the customer cloud account in the future. Currently, it's not possible because of security considerations.</p>
<h2 id="service-levels" tabindex="-1"><a class="header-anchor" href="#service-levels" aria-hidden="true">#</a> Service levels</h2>
<h4 id="what-is-the-sla-for-event-store-cloud" tabindex="-1"><a class="header-anchor" href="#what-is-the-sla-for-event-store-cloud" aria-hidden="true">#</a> What is the SLA for Event Store Cloud?</h4>
<p>You can find out about the SLA levels provided by Event Store Cloud in our <a href="https://www.eventstore.com/cloud-services-service-level-agreement" target="_blank" rel="noopener noreferrer">Service Level Agreement<OutboundLink/></a>.</p>
<h4 id="are-maintenance-windows-part-of-the-sla" tabindex="-1"><a class="header-anchor" href="#are-maintenance-windows-part-of-the-sla" aria-hidden="true">#</a> Are maintenance windows part of the SLA?</h4>
<p>You can find out about the SLA levels provided by Event Store Cloud in our <a href="https://www.eventstore.com/cloud-services-service-level-agreement" target="_blank" rel="noopener noreferrer">Service Level Agreement<OutboundLink/></a>.</p>
<h2 id="support" tabindex="-1"><a class="header-anchor" href="#support" aria-hidden="true">#</a> Support</h2>
<h4 id="for-same-day-response-what-time-zone-is-your-9am-5pm-response-against" tabindex="-1"><a class="header-anchor" href="#for-same-day-response-what-time-zone-is-your-9am-5pm-response-against" aria-hidden="true">#</a> For same day response, what time zone is your 9am-5pm response against?</h4>
<p>Our support response time windows are provided in GMT time zone. We are expanding our SRE team to handle time zones in North America as well.</p>
<h4 id="what-level-of-access-does-the-customer-have-to-resolve-minor-incidents" tabindex="-1"><a class="header-anchor" href="#what-level-of-access-does-the-customer-have-to-resolve-minor-incidents" aria-hidden="true">#</a> What level of access does the customer have to resolve minor incidents?</h4>
<p>Customers do not have direct access to VMs, where the database cluster nodes are running. A lot of management functions are available via the HTTP API, which is available for customers to access and use.</p>
<p>You can also use our cloud automation tools (<RouterLink to="/cloud/automation/terraform.html">Terraform</RouterLink> provider and CLI) to manage your cloud resources.</p>
<h4 id="if-a-node-goes-down-in-a-cluster-how-is-the-cluster-recovered-and-who-does-it" tabindex="-1"><a class="header-anchor" href="#if-a-node-goes-down-in-a-cluster-how-is-the-cluster-recovered-and-who-does-it" aria-hidden="true">#</a> If a node goes down in a cluster, how is the cluster recovered and who does it?</h4>
<p>If the issue is cloud provider related, our staff manages the replacement.</p>
<p>If it is customer load related, an issue will be created with a call to action for the customer to address.</p>
<p>Please ensure to learn about the SLA levels provided by Event Store Cloud in our <a href="https://www.eventstore.com/cloud-services-service-level-agreement" target="_blank" rel="noopener noreferrer">Service Level Agreement<OutboundLink/></a>.</p>
<h2 id="security" tabindex="-1"><a class="header-anchor" href="#security" aria-hidden="true">#</a> Security</h2>
<h4 id="how-can-i-to-get-an-audit-log-of-access-to-the-console" tabindex="-1"><a class="header-anchor" href="#how-can-i-to-get-an-audit-log-of-access-to-the-console" aria-hidden="true">#</a> How can I to get an audit log of access to the console?</h4>
<p>The Cloud Console access audit log is in our roadmap, we will present the details of the schedule on the public <a href="https://www.eventstore.com/event-store-cloud" target="_blank" rel="noopener noreferrer">roadmap<OutboundLink/></a> page.</p>
<h4 id="does-event-store-have-a-security-policy" tabindex="-1"><a class="header-anchor" href="#does-event-store-have-a-security-policy" aria-hidden="true">#</a> Does Event Store have a security policy?</h4>
<p>Event Store Ltd has a security policy. Our system security hasn't been independently audited yet. We plan to achieve SOC 2 and ISO 27001 by second half 2021.</p>
<p>If you have specific questions please <a href="https://www.eventstore.com/contact" target="_blank" rel="noopener noreferrer">contact us<OutboundLink/></a></p>
<h4 id="has-the-system-been-independently-audited" tabindex="-1"><a class="header-anchor" href="#has-the-system-been-independently-audited" aria-hidden="true">#</a> Has the system been independently audited?</h4>
<p>Our system security hasn't been independently audited yet. We plan to achieve <a href="https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html" target="_blank" rel="noopener noreferrer">SOC 2<OutboundLink/></a> and <a href="https://www.iso.org/isoiec-27001-information-security.html" target="_blank" rel="noopener noreferrer">ISO 27001<OutboundLink/></a> by the second half of 2021.</p>
<p>If you have specific questions please <a href="https://www.eventstore.com/contact" target="_blank" rel="noopener noreferrer">contact us<OutboundLink/></a></p>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting" aria-hidden="true">#</a> Troubleshooting</h2>
<h3 id="connectivity" tabindex="-1"><a class="header-anchor" href="#connectivity" aria-hidden="true">#</a> Connectivity</h3>
<h4 id="are-managed-eventstoredb-clusters-available-via-public-internet" tabindex="-1"><a class="header-anchor" href="#are-managed-eventstoredb-clusters-available-via-public-internet" aria-hidden="true">#</a> Are managed EventStoreDB clusters available via public Internet?</h4>
<p>We consider exposing EventStoreDB clusters to public Internet harmful as it's a database, which contains sensitive business data. Therefore, all managed EventStoreDB instances and clusters only have private IP addresses within their cloud networks (VPCs). You need to establish a peering link between Event Store Cloud network and your own VPC, so you can access the cluster from your cloud workloads.</p>
<h4 id="the-cluster-dns-name-does-not-resolve-on-my-machine-what-do-i-do" tabindex="-1"><a class="header-anchor" href="#the-cluster-dns-name-does-not-resolve-on-my-machine-what-do-i-do" aria-hidden="true">#</a> The cluster DNS name does not resolve on my machine, what do I do?</h4>
<p>Some Internet providers, routers, and DNS servers will not resolve or filter out answers to DNS queries for <code>xxxx.mesdb.eventstore.cloud</code> because the DNS name resolves to a private IP range.</p>
<p>You can check if that's the issue you're experiencing by running the following <code>nslookup</code> query. Replace the domain name by your cluster DNS name.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nslookup</span> buh63kqrh41nfqpviing.mesdb.eventstore.cloud
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>If the answer looks like the following, you're having the issue we just described:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Server:         192.168.192.1
Address:        192.168.192.1#53

Non-authoritative answer:
*** Can't find buh63kqrh41nfqpviing.mesdb.eventstore.cloud: No answer
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>To check if the domain exists, perform the same check with a specific DNS server:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nslookup</span> buh63kqrh41nfqpviing.mesdb.eventstore.cloud <span class="token number">1.1</span>.1.1
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Most probably, you will get a proper DNS resolution answer:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    buh63kqrh41nfqpviing.mesdb.eventstore.cloud
Addresses:  172.29.98.189
172.29.98.150
172.29.98.108
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>If the cluster DNS name resolves using an external DNS server, but your local DNS server fails or rejects to resolve it, you can try the following:</p>
<ul>
<li>If the issue is in the router, and you can configure it, check the router documentation to allow DNS queries, which resolve to private IP ranges.</li>
<li>When you are sure that the router is fine, it might be your Internet provider, which is blocking such queries. Try getting in touch with them to resolve the issue.</li>
<li>You can also reconfigure your router, or your machine, to use public DNS servers like <code>1.1.1.1</code> or <code>8.8.8.8</code>.</li>
</ul>
</template>
