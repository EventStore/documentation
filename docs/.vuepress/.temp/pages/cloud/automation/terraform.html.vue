<template><h1 id="terraform-provider" tabindex="-1"><a class="header-anchor" href="#terraform-provider" aria-hidden="true">#</a> Terraform provider</h1>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2>
<p>The current version of the provider is: {{ $frontmatter.terraform_current_version }}. The releases are available in Terraform official <a href="https://registry.terraform.io/providers/EventStore/eventstorecloud/latest" target="_blank" rel="noopener noreferrer">registry<OutboundLink/></a> and via <a href="https://github.com/EventStore/terraform-provider-eventstorecloud/releases" target="_blank" rel="noopener noreferrer">GitHub releases<OutboundLink/></a>.</p>
<p>The binaries are available for the following platforms:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Processor</th>
<th style="text-align:left">Operating system</th>
<th style="text-align:left">Filename</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">x64</td>
<td style="text-align:left">macOS</td>
<td style="text-align:left"><code>terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_darwin_amd64.zip</code></td>
</tr>
<tr>
<td style="text-align:left">x64</td>
<td style="text-align:left">FreeBSD</td>
<td style="text-align:left"><code>terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_freebsd_amd64.zip</code></td>
</tr>
<tr>
<td style="text-align:left">x64</td>
<td style="text-align:left">Linux</td>
<td style="text-align:left"><code>terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_linux_amd64.zip</code></td>
</tr>
<tr>
<td style="text-align:left">x64</td>
<td style="text-align:left">Windows</td>
<td style="text-align:left"><code>terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_windows_amd64.zip</code></td>
</tr>
<tr>
<td style="text-align:left">arm64</td>
<td style="text-align:left">FreeBSD</td>
<td style="text-align:left"><code>terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_freebsd_arm64.zip</code></td>
</tr>
<tr>
<td style="text-align:left">arm64</td>
<td style="text-align:left">Linux</td>
<td style="text-align:left"><code>terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_linux_arm64.zip</code></td>
</tr>
</tbody>
</table>
<h3 id="terraform-0-13" tabindex="-1"><a class="header-anchor" href="#terraform-0-13" aria-hidden="true">#</a> Terraform 0.13+</h3>
<p>Terraform supports third party modules installed via the plugin registry. Add the following to your terraform module configuration:</p>
<p>@[code](cloud/automation/snippets/providers_eventstore.tf.hcl</p>
<h3 id="terraform-0-12" tabindex="-1"><a class="header-anchor" href="#terraform-0-12" aria-hidden="true">#</a> Terraform 0.12</h3>
<p>In order for Terraform to find the plugin, place the appropriate binary into the Terraform third-party plugin directory. The location varies by operating system:</p>
<ul>
<li>Linux and macOS <code>~/.terraform.d/plugins</code></li>
<li>Windows <code>%APPDATA%\terraform.d\plugins</code></li>
</ul>
<p>Alternatively, the binary can be placed alongside the main <code>terraform</code> binary.</p>
<p>You can download the provider using the following commands:</p>
<xode-group>
<xode-block title="Linux">
<p>@[code](cloud/automation/snippets/download_provider_linux.sh</p>
</xode-block>
<xode-block title="macOS">
<p>@[code](cloud/automation/snippets/download_provider_macos.sh</p>
</xode-block>
<xode-block title="Windows">
<p>@[code](cloud/automation/snippets/download_provider_windows.ps1.powershell</p>
</xode-block>
</xode-group>
<h3 id="building-from-source" tabindex="-1"><a class="header-anchor" href="#building-from-source" aria-hidden="true">#</a> Building from source</h3>
<p>If you prefer to install from source, use the <code>make install</code> target in this <a href="https://github.com/EventStore/terraform-provider-eventstorecloud" target="_blank" rel="noopener noreferrer">repository<OutboundLink/></a>. You will need a Go 1.13+ development environment.</p>
<h2 id="provider-configuration" tabindex="-1"><a class="header-anchor" href="#provider-configuration" aria-hidden="true">#</a> Provider configuration</h2>
<p>The Event Store Cloud provider must be configured with an access token. There are several additional options that may be useful. Provider configuration options are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Option</th>
<th style="text-align:left">Environment Variable</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>token</code></td>
<td style="text-align:left"><code>ESC_TOKEN</code></td>
<td style="text-align:left"><em>Required</em>, your access token for Event Store Cloud.</td>
</tr>
<tr>
<td style="text-align:left"><code>organization_id</code></td>
<td style="text-align:left"><code>ESC_ORG_ID</code></td>
<td style="text-align:left"><em>Required</em>, your Event Store Cloud organization ID.</td>
</tr>
<tr>
<td style="text-align:left"><code>url</code></td>
<td style="text-align:left"><code>ESC_URL</code></td>
<td style="text-align:left"><em>Optional</em>, the URL of the Event Store Cloud API. This defaults to the public cloud instance of Event Store Cloud.</td>
</tr>
<tr>
<td style="text-align:left"><code>token_store</code></td>
<td style="text-align:left"><code>ESC_TOKEN_STORE</code></td>
<td style="text-align:left"><em>Optional</em>, the location on the local filesystem of the token cache. This is shared with the Event Store Cloud CLI.</td>
</tr>
</tbody>
</table>
<h3 id="obtaining-the-access-token" tabindex="-1"><a class="header-anchor" href="#obtaining-the-access-token" aria-hidden="true">#</a> Obtaining the access token</h3>
<p>You can use the <a href="https://console.eventstore.cloud/authentication-tokens" target="_blank" rel="noopener noreferrer">Event Store Cloud console<OutboundLink/></a> or the <a href="https://github.com/EventStore/esc/releases" target="_blank" rel="noopener noreferrer">Event Store Cloud CLI<OutboundLink/></a> (<code>esc-cli</code>) to obtain a token</p>
<p>Use the following command to ge the access token using <code>esc-cli</code>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc access tokens create --email <span class="token operator">&lt;</span>email<span class="token operator">></span>
 
Password:
Token created <span class="token keyword">for</span> audience https://api.eventstore.cloud
FDGco0u_1Ypw9WVVIfAHtIJh0ioUI_XbMhxMlEpiCUlHR
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>If you prefer to use the Cloud Console, navigate to the <a href="https://console.eventstore.cloud/authentication-tokens" target="_blank" rel="noopener noreferrer">Authentication Tokens<OutboundLink/></a> page, then click on &quot;Request refresh token&quot; button.</p>
<Card><template #content><p><img src="@source/cloud/automation/images/token_console.png" alt="token in cloud console"></p>
</template></Card><h3 id="obtaining-the-organisation-id" tabindex="-1"><a class="header-anchor" href="#obtaining-the-organisation-id" aria-hidden="true">#</a> Obtaining the organisation ID</h3>
<p>As for the token, you can use the Cloud Console, or <code>esc-cli</code> to get the organisation ID.</p>
<p>That's how you do it with <code>esc-cli</code>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc resources organizations list
Organization <span class="token punctuation">{</span> id: OrgId<span class="token punctuation">(</span><span class="token string">"9bdf0s5qr76g981z5820"</span><span class="token punctuation">)</span>, name: <span class="token string">"Event Store Ltd"</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>In the Cloud Console, open the <a href="https://console.eventstore.cloud/organizations" target="_blank" rel="noopener noreferrer">organisations page<OutboundLink/></a>. Then, select the organisation from the list and go to its settings. There, you can copy the organisation ID:</p>
<Card><template #content><p><img src="@source/cloud/automation/images/org_id.png" alt="organisation id in the cloud console"></p>
</template></Card><h2 id="resources" tabindex="-1"><a class="header-anchor" href="#resources" aria-hidden="true">#</a> Resources</h2>
<p>All resources in Event Store Cloud can be provisioned using the Terraform provider. Existing projects can be queried using a data source in the provider. More complete samples can be found <a href="https://github.com/EventStore/terraform-provider-eventstorecloud/tree/trunk/examples" target="_blank" rel="noopener noreferrer">here<OutboundLink/></a>.</p>
<p>Using the Terraform provider, you can create, manipulate, and delete the following resources in Event Store Cloud:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Terraform resource</th>
<th style="text-align:left">Event Store Cloud resource</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>eventstorecloud_project</code></td>
<td style="text-align:left"><a href="#projects">Project</a></td>
</tr>
<tr>
<td style="text-align:left"><code>eventstorecloud_network</code></td>
<td style="text-align:left"><a href="#networks">Network</a></td>
</tr>
<tr>
<td style="text-align:left"><code>eventstorecloud_peering</code></td>
<td style="text-align:left"><a href="#network-peerings">Network peering</a></td>
</tr>
<tr>
<td style="text-align:left"><code>eventstorecloud_managed_cluster</code></td>
<td style="text-align:left"><a href="#managed-eventstoredb">Managed EventStoreDB instance or cluster</a></td>
</tr>
</tbody>
</table>
<h3 id="projects" tabindex="-1"><a class="header-anchor" href="#projects" aria-hidden="true">#</a> Projects</h3>
<p>You can create Event Store Cloud projects for the organisation using the <code>eventstorecloud_project</code> resource. You only need to provide the new project name, which must be unique within the organisation.</p>
<p>You need a project to provision any other resource.</p>
<h4 id="arguments" tabindex="-1"><a class="header-anchor" href="#arguments" aria-hidden="true">#</a> Arguments</h4>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>name</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the name of the project.</td>
</tr>
</tbody>
</table>
<h4 id="attributes" tabindex="-1"><a class="header-anchor" href="#attributes" aria-hidden="true">#</a> Attributes</h4>
<p>The Project Terraform resource will get the following attributes:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">Project ID</td>
</tr>
</tbody>
</table>
<p>You will need the project ID to provision other resources within the project.</p>
<h4 id="creating-a-project" tabindex="-1"><a class="header-anchor" href="#creating-a-project" aria-hidden="true">#</a> Creating a project</h4>
<p>Here is an example of a Terraform script to create a project in Event Store Cloud:</p>
<p>@[code](cloud/automation/snippets/eventstorecloud_project.create.tf.hcl</p>
<h3 id="networks" tabindex="-1"><a class="header-anchor" href="#networks" aria-hidden="true">#</a> Networks</h3>
<p>Before provisioning a database cluster, you need a network, which the cluster will connect to. Use the <code>eventstorecloud_network</code> resource to provision a new Event Store Cloud network. The network should be in the same cloud provider, which you plan to use for the database cluster.</p>
<h4 id="arguments-1" tabindex="-1"><a class="header-anchor" href="#arguments-1" aria-hidden="true">#</a> Arguments</h4>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>name</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the new network name.</td>
</tr>
<tr>
<td style="text-align:left"><code>project_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the project ID of the new network (see <a href="#projects">Projects</a>)</td>
</tr>
<tr>
<td style="text-align:left"><code>resource_provider</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the network cloud provider (<code>aws</code> , <code>gcp</code> , <code>azure</code>).</td>
</tr>
<tr>
<td style="text-align:left"><code>region</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the cloud region of the new network (cloud provider-specific).</td>
</tr>
<tr>
<td style="text-align:left"><code>cidr_block</code></td>
<td style="text-align:left">string</td>
<td style="text-align:left"><em>Required</em>, the new network IP range.</td>
</tr>
</tbody>
</table>
<h4 id="attributes-1" tabindex="-1"><a class="header-anchor" href="#attributes-1" aria-hidden="true">#</a> Attributes</h4>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">The project ID</td>
</tr>
</tbody>
</table>
<p>Region names must be in the format used by the cloud resource provider, for example <code>us-west-2</code> for AWS, <code>East US</code> for Azure, <code>us-east1</code> for GCP.</p>
<p><strong>Note</strong> For the IP range, the maximum prefix length is <code>/9</code> and  the minimum is <code>/24</code>. However, cloud providers have their own limitations on the network ranges they support. Learn more in your cloud provider documentation:</p>
<ul>
<li>AWS <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html" target="_blank" rel="noopener noreferrer">VPC Addressing<OutboundLink/></a></li>
<li>Azure <a href="https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq#what-address-ranges-can-i-use-in-my-vnets" target="_blank" rel="noopener noreferrer">Virtual Network FAQ<OutboundLink/></a></li>
<li>GCP <a href="https://cloud.google.com/vpc/docs/vpc#valid-ranges" target="_blank" rel="noopener noreferrer">VPC Network<OutboundLink/></a></li>
</ul>
<p>Smaller networks can hold fewer managed clusters, but may be easier to peer to infrastructure hosting your applications.</p>
<h4 id="creating-a-network" tabindex="-1"><a class="header-anchor" href="#creating-a-network" aria-hidden="true">#</a> Creating a network</h4>
<p>@[code](cloud/automation/snippets/eventstorecloud_network.create.tf.hcl</p>
<h3 id="network-peerings" tabindex="-1"><a class="header-anchor" href="#network-peerings" aria-hidden="true">#</a> Network peerings</h3>
<p>When you got a network provisioned, you can already start creating database clusters. However, you won't be able to connect to your new cluster, unless you create a peering link between the network in Event Store Cloud, and the network on your own cloud account or project.</p>
<p>Use the <code>eventstorecloud_peering</code> resource to initiate the peering link. You will need to collect the details about your own cloud network (VPC or Virtual Network) as described in the arguments list below. Depending on the cloud provider, you'll need to complete some actions on your side to confirm the peering.</p>
<p>At the moment, you can only peer the networks, which are in the same cloud region.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The format of the following arguments depends on the cloud provider:</p>
<ul>
<li><code>peer_account_id</code></li>
<li><code>peer_network_region</code></li>
<li><code>peer_network_id</code></li>
</ul>
</div>
<h4 id="arguments-2" tabindex="-1"><a class="header-anchor" href="#arguments-2" aria-hidden="true">#</a> Arguments</h4>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>name</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the new peering name.</td>
</tr>
<tr>
<td style="text-align:left"><code>project_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the project ID for the new peering.</td>
</tr>
<tr>
<td style="text-align:left"><code>network_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the EventStore Cloud network ID, for which the peering will be created.</td>
</tr>
<tr>
<td style="text-align:left"><code>peer_resource_provider</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the cloud resource provider of the given network (<code>aws</code> , <code>gcp</code> , <code>azure</code>).</td>
</tr>
<tr>
<td style="text-align:left"><code>peer_network_region</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the cloud region of your own network, which you are going to peer with.</td>
</tr>
<tr>
<td style="text-align:left"><code>peer_account_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, your cloud account ID, your cloud network should belong to that account.</td>
</tr>
<tr>
<td style="text-align:left"><code>peer_network_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the network ID for your own cloud network.</td>
</tr>
<tr>
<td style="text-align:left"><code>routes</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, CIDR blocks in your cloud network, which should be routed to the Event Store Cloud network.</td>
</tr>
</tbody>
</table>
<p>Use the following provider-specific values for the <code>peer_account_id</code> argument:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Cloud</th>
<th style="text-align:left">Account ID is</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">AWS</td>
<td style="text-align:left">Account ID</td>
</tr>
<tr>
<td style="text-align:left">GCP</td>
<td style="text-align:left">Project ID</td>
</tr>
<tr>
<td style="text-align:left">Azure</td>
<td style="text-align:left">Tenant ID</td>
</tr>
</tbody>
</table>
<p>For the <code>peer_network_id</code>, use the following cloud network property:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Cloud</th>
<th style="text-align:left">Network ID is</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">AWS</td>
<td style="text-align:left">VPC ID</td>
</tr>
<tr>
<td style="text-align:left">GCP</td>
<td style="text-align:left">VPC name</td>
</tr>
<tr>
<td style="text-align:left">Azure</td>
<td style="text-align:left">Virtual network resource ID</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li><code>peer_resource_provider</code> - currently, this must be the same as the resource provider of the Event Store Cloud network.</li>
<li><code>peer_network_region</code> - currently, this must be the same as the region of the Event Store Cloud network, and specified in the format used by your cloud. For example <code>us-west-2</code> for AWS, <code>westus2</code> for Azure and <code>us-east1</code> for GCP</li>
<li><code>routes</code> - typically, this consists of one element, the address space of a subnet in your managed network.</li>
</ul>
</div>
<h4 id="attributes-2" tabindex="-1"><a class="header-anchor" href="#attributes-2" aria-hidden="true">#</a> Attributes</h4>
<p>After completing the operation, the peering Terraform resource will get the following attributes:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">The peering ID.</td>
</tr>
<tr>
<td style="text-align:left"><code>provider_metadata</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">The peering resource metadata, set by the cloud provider.</td>
</tr>
<tr>
<td style="text-align:left"><code>aws_peering_link_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">The AWS peering link ID.</td>
</tr>
<tr>
<td style="text-align:left"><code>gcp_project_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">GCP project ID.</td>
</tr>
<tr>
<td style="text-align:left"><code>gcp_network_name</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">GCP VPC name.</td>
</tr>
<tr>
<td style="text-align:left"><code>gcp_network_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">GCP network ID in URL format, which can be passed to <code>google_compute_network_peering</code> resources.</td>
</tr>
</tbody>
</table>
<p>For AWS, you'd need to confirm the peering request, use the <code>aws_peering_link_id</code> resource attribute for that purpose.</p>
<p>For GCP, you need to initiate a peering from your cloud account to Event Store Cloud. Use the resource attributes with <code>gcp</code> prefix to automate that part.</p>
<h4 id="creating-a-peering" tabindex="-1"><a class="header-anchor" href="#creating-a-peering" aria-hidden="true">#</a> Creating a peering</h4>
<p>Here is an example how to initiate a peering from Event Store Cloud to your own AWS account:</p>
<p>@[code](cloud/automation/snippets/eventstorecloud_peering.create.tf.hcl</p>
<h3 id="managed-eventstoredb" tabindex="-1"><a class="header-anchor" href="#managed-eventstoredb" aria-hidden="true">#</a> Managed EventStoreDB</h3>
<p>Use the <code>eventstorecloud_managed_cluster</code> resource to provision an EventStoreDB cluster or instance. You will need the <a href="#projects">Project</a> and the <a href="#networks">Network</a> resource information from previously created resources.</p>
<h4 id="arguments-3" tabindex="-1"><a class="header-anchor" href="#arguments-3" aria-hidden="true">#</a> Arguments</h4>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>name</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the name of the managed. cluster.</td>
</tr>
<tr>
<td style="text-align:left"><code>project_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the ID of the project in which the managed cluster should be created.</td>
</tr>
<tr>
<td style="text-align:left"><code>network_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the ID of the EventStore Cloud network into which the managed cluster should be created.</td>
</tr>
<tr>
<td style="text-align:left"><code>topology</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the topology of the managed cluster. This determines the fault tolerance of the cluster. Valid values are <code>single-node</code> and <code>three-node-multi-zone</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code>instance_type</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, the size of the instances to use in the managed cluster.</td>
</tr>
<tr>
<td style="text-align:left"><code>disk_size</code></td>
<td style="text-align:left"><code>int</code></td>
<td style="text-align:left"><em>Required</em>, the size of the data disks in gigabytes. Minimal size is 10Gb. All cluster members will get a disk of the same size.</td>
</tr>
<tr>
<td style="text-align:left"><code>disk_type</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, <code>GP2</code> (AWS), <code>premium-ssd-lrs</code> (Azure), <code>ssd</code> (GCP).</td>
</tr>
<tr>
<td style="text-align:left"><code>server_version</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Required</em>, <code>20.6</code> , <code>20.10</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code>projection_level</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left"><em>Optional</em>, default: <code>off</code> , the mode in which to enable projections. Valid values are <code>off</code> , <code>system</code> , <code>user</code>.</td>
</tr>
</tbody>
</table>
<p>Supported instance sizes are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Size</th>
<th style="text-align:left">Specification</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>F1</code></td>
<td style="text-align:left">2 vCPU 1Gb RAM (burstable instance, not suitable for production)</td>
</tr>
<tr>
<td style="text-align:left"><code>C4</code></td>
<td style="text-align:left">2 vCPU 8Gb RAM</td>
</tr>
<tr>
<td style="text-align:left"><code>M8</code></td>
<td style="text-align:left">2 vCPU 8Gb RAM (same resources as <code>C4</code>, but storage-optimised)</td>
</tr>
<tr>
<td style="text-align:left"><code>M16</code></td>
<td style="text-align:left">4 vCPU 16Gb RAM</td>
</tr>
<tr>
<td style="text-align:left"><code>M32</code></td>
<td style="text-align:left">8 vCPU 32Gb RAM</td>
</tr>
<tr>
<td style="text-align:left"><code>M64</code></td>
<td style="text-align:left">16 vCPU 64Gb RAM</td>
</tr>
<tr>
<td style="text-align:left"><code>M128</code></td>
<td style="text-align:left">32 vCPU 128Gb RAM</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The actual implementation of each topology is specific to the resource provider.</p>
<p>For GCP and AWS clusters you can resize the disks without downtime. In Azure, it is currently not supported, please plan the disk size according to your projected database size.</p>
</div>
<h4 id="attributes-3" tabindex="-1"><a class="header-anchor" href="#attributes-3" aria-hidden="true">#</a> Attributes</h4>
<p>After completing the operation, the EventStoreDB cluster Terraform resource will get the following attributes:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">the ID of the cluster.</td>
</tr>
<tr>
<td style="text-align:left"><code>dns_name</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">the DNS name at which the cluster can be found.</td>
</tr>
<tr>
<td style="text-align:left"><code>resource_provider</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">the resource provider into which the cluster was provisioned.</td>
</tr>
<tr>
<td style="text-align:left"><code>region</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">the region in which the cluster was provisioned.</td>
</tr>
<tr>
<td style="text-align:left"><code>gcp_network_name</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">network name for the peering link in GCP.</td>
</tr>
<tr>
<td style="text-align:left"><code>gcp_network_id</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">GCP Network ID in URL format which can be passed to <code>google_compute_network_peering</code> resources.</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Attribute values for <code>region</code> and <code>resource_provider</code> are controlled by the network in which the cluster is created.</p>
</div>
<h4 id="creating-a-cluster" tabindex="-1"><a class="header-anchor" href="#creating-a-cluster" aria-hidden="true">#</a> Creating a cluster</h4>
<p>Here are the cloud-specific examples of a Terraform script to create a managed EventStoreDB cluster:</p>
<xode-group>
<xode-block title="AWS">
<p>@[code](cloud/automation/snippets/eventstorecloud_managed_cluster.create.aws.tf.hcl</p>
</xode-block>
<xode-block title="Azure">
<p>@[code](cloud/automation/snippets/eventstorecloud_managed_cluster.create.az.tf.hcl</p>
</xode-block>
<xode-block title="GCP">
<p>@[code](cloud/automation/snippets/eventstorecloud_managed_cluster.create.gcp.tf.hcl</p>
</xode-block>
</xode-group>
<h2 id="data-sources" tabindex="-1"><a class="header-anchor" href="#data-sources" aria-hidden="true">#</a> Data sources</h2>
<p>The following data source is available:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Terraform resource</th>
<th style="text-align:left">Event Store Cloud resource</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>eventstorecloud_project</code></td>
<td style="text-align:left"><a href="#project">Project</a></td>
</tr>
</tbody>
</table>
<h3 id="project" tabindex="-1"><a class="header-anchor" href="#project" aria-hidden="true">#</a> Project</h3>
<p>Use the <code>eventstorecloud_project</code> data source to query your Event Store Cloud projects.</p>
<h4 id="arguments-4" tabindex="-1"><a class="header-anchor" href="#arguments-4" aria-hidden="true">#</a> Arguments</h4>
<table>
<thead>
<tr>
<th style="text-align:left">Name</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">name</td>
<td style="text-align:left">string</td>
<td style="text-align:left"><em>Required</em>, the name of the project.</td>
</tr>
<tr>
<td style="text-align:left">id</td>
<td style="text-align:left">string</td>
<td style="text-align:left"><em>Optional</em>, the name of the project.</td>
</tr>
</tbody>
</table>
<h4 id="looking-up-a-project" tabindex="-1"><a class="header-anchor" href="#looking-up-a-project" aria-hidden="true">#</a> Looking up a project</h4>
<p>@[code](cloud/automation/snippets/eventstorecloud_project.lookup.tf.hcl</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The value of <code>eventstorecloud_project.name</code> is case-sensitive, so <code>Production Project</code> is not the same as <code>^production project</code>.</p>
</div>
<h2 id="faq" tabindex="-1"><a class="header-anchor" href="#faq" aria-hidden="true">#</a> FAQ</h2>
<p><strong>Error <code>error obtaining access token: error 400 requesting access token</code></strong></p>
<p>You need to add the access token to your environment variables or the provider configuration. See <a href="#provider-configuration">here</a>.</p>
<p><strong>Error <code>... Forbidden: Access to the requested method for the requested resources was denied</code></strong></p>
<p>Make sure you used the correct organisation ID. Use <a href="#provider-configuration">these guidelines</a> to get the correct value.</p>
<p><strong>Error <code>Your query returned no results. Please change your search criteria and try again.</code></strong></p>
<p>Ensure you entered the correct project name. Remember that data source names are case-sensitive. See <a href="#project">here</a>.</p>
</template>
