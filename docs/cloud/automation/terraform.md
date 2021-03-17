---
terraform_current_version: 1.5.1
terraform_github_releases: https://github.com/EventStore/terraform-provider-eventstorecloud/releases/download
---

# Terraform provider 

## Installation

The current version of the provider is: {{ $frontmatter.terraform_current_version }}. The releases are available in Terraform's official [registry][terraform registry] and via [GitHub releases][terraform github releases].

The binaries are available for the following platforms:  

* AMD64
  + Darwin: terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_darwin_amd64.zip 
  + Freebsd: terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_freebsd_amd64.zip
  + Linux: terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_linux_amd64.zip 
  + Windows: terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_windows_amd64.zip
* ARM64  
  + Freebsd: terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_freebsd_arm64.zip 
  + Linux: terraform-provider-eventstorecloud_{{ $frontmatter.terraform_current_version }}_linux_arm64.zip

 

### Terraform 0.13+

Terraform supports third party modules installed via the plugin registry. Add the following to your terraform module configuration:

<<< @/docs/cloud/automation/snippets/providers_eventstore.tf.hcl

### Terraform 0.12

In order for Terraform to find the plugin, the appropriate binary must be placed into the Terraform third-party plugin directory. The location varies by operating system:

* Linux and macOS `~/.terraform.d/plugins`
* Windows `%APPDATA%\terraform.d\plugins`

Alternatively, the binary can be placed alongside the main `terraform` binary.

You can download the provider using the following commands:

* Linux:

<<< @/docs/cloud/automation/snippets/download_provider_linux.sh
 

* macOS:  

<<< @/docs/cloud/automation/snippets/download_provider_macos.sh

* Windows (PowerShell): 

<<< @/docs/cloud/automation/snippets/download_provider_windows.ps1.powershell

### From Source 

If you prefer to install from source, use the `make install` target in this [repository][terraform github]. You will need a Go 1.13+ development environment.

## Provider Configuration

The Event Store Cloud provider must be configured with an access token. There are several additional options that may be useful. Provider configuration options are:

| Option            | Environment Variable | Description                                                                                                         |
| :---------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `token`           | `ESC_TOKEN`          | *Required*, your access token for Event Store Cloud.                                                                |
| `organization_id` | `ESC_ORG_ID`         | *Required*, the identifier of your Event Store Cloud organization.                                                  |
| `url`             | `ESC_URL`            | *Optional*, the URL of the Event Store Cloud API. This defaults to the public cloud instance of Event Store Cloud.  |
| `token_store`     | `ESC_TOKEN_STORE`    | *Optional*, the location on the local filesystem of the token cache. This is shared with the Event Store Cloud CLI. |

                                                                                                                                                                       

### Obtaining the `token`

You can can use the [cloud console][cloud console tokens] or the [Event Store Cloud CLI][esc cli github releases] to obtain a token

The command to obtain a token from the [Event Store Cloud CLI][esc cli github releases] is:

 ``` bash
 esc access tokens create --email <email>
 
 Password:
 Token created for audience https://api.eventstore.cloud
 OeTjTf***********************************0IWP
  ```

In the cloud console:
::: card
![token in cloud console](./images/token_console.png)
:::

### Obtaining the `organization_id`

You can use the [cloud console][cloud console organizations] or the [Event Store Cloud CLI][esc cli github releases] to find your organization id.

The command to obtain the organization from the [Event Store Cloud CLI][esc cli github releases] is:

``` bash
 esc resources organizations list
 Organization { id: OrgId("bt****************80"), name: "Event Store Ltd"
```

In the [cloud console][cloud console organizations]
::: card
![organisation id in the cloud console](./images/organisation_console.png)
:::
## Resources

All resources in Event Store Cloud can be provisioned using the Terraform provider. Existing projects can be queried using a data source in the provider. More complete samples can be found [here][terraform github samples].

The following resources are available: 

* Projects : `eventstorecloud_project`
* Networks : `eventstorecloud_network`
* Peering  : `eventstorecloud_peering`
* Cluster  : `eventstorecloud_managed_cluster`

### eventstorecloud_project

Looks up and creates a project in the organization with which the provider is configured by name.

#### Arguments

| Name | Type   | Description                          |
| :--- | :----- | :----------------------------------- |
| name | string | *Required*, the name of the project. |

#### Attributes

| Name | Type   | Description            |
| :--- | :----- | :--------------------- |
| id   | string | the ID of the project. |

#### Creating a project

<<< @/docs/cloud/automation/snippets/eventstorecloud_project.create.tf.hcl

### eventstorecloud_network

#### Arguments

| Name              | Type   | Description                                                                                           |
| :---------------- | :----- | :---------------------------------------------------------------------------------------------------- |
| name              | string | *Required*, the name of the network.                                                                  |
| project_id        | string | *Required*, the ID of the project in which the network should be created.                             |
| resource_provider | string | *Required*, the name of the cloud ( `aws` , `gcp` , `azure` ) in which the network should be created. |
| region            | string | *Required*, the name of the region in which the network should be created.                            |
| cidr_block        | string | *Required*, the address space of the network.                                                         |

#### Attributes

| Name | Type   | Description            |
| :--- | :----- | :--------------------- |
| id   | string | the ID of the project. |

::: tip
`region` names must be in the format used by the resource provider, for example `us-west-2` for AWS, `East US` for Azure, `us-east1` for GCP.

`cidr_block` : the maximum prefix length is `/9` and  the minimum is `/24` . However what is allowed is provider dependent:  

* AWS [VPC Addressing](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-ip-addressing.html)
* Azure [Virtual Network FAQ](https://docs.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq#what-address-ranges-can-i-use-in-my-vnets)
* GCP [VPC Network](https://cloud.google.com/vpc/docs/vpc#valid-ranges)

Smaller networks can hold fewer managed clusters, but may be easier to peer to infrastructure hosting your applications.
:::

#### Creating a network

<<< @/docs/cloud/automation/snippets/eventstorecloud_network.create.tf.hcl

### eventstorecloud_peering

Creates a new peering in a cloud network. Peering can be created from customer-managed networks in the same cloud and region as the network with which the peering exists.

::: tip
The following arguments have a format dependent on the cloud provider:

* `peer_account_id`
* `peer_network_region`  
* `peer_network_id`

:::

#### Arguments

| Name                   | Type   | Description                                                                                                             |
| :--------------------- | :----- | :---------------------------------------------------------------------------------------------------------------------- |
| name                   | string | *Required*, the name of the peering.                                                                                    |
| project_id             | string | *Required*, the ID of the project in which the peering should be created.                                               |
| network_id             | string | *Required*, the ID of the EventStore Cloud network into which the peering should be created.                            |
| peer_resource_provider | string | *Required*, the name of the cloud ( `aws` , `gcp` , `azure` ) in which your managed network exists.                     |
| peer_network_region    | string | *Required*, the name of the region in which your managed network exists.                                                |
| peer_account_id        | string | *Required*, the account identifier for the account in which your managed network exists.                                |
| peer_network_id        | string | *Required*, the network identifier for your managed network.                                                            |
| routes                 | string | *Required*, CIDR Blocks representing routes to be created from the Event Store Cloud network into your managed network. |

#### Attributes

| Name                | Type   | Description                                                                                     |
| :------------------ | :----- | :---------------------------------------------------------------------------------------------- |
| id                  | string | the ID of the peering.                                                                          |
| provider_metadata   | string | metadata supplied by the resource provider cloud about the peering link.                        |
| aws_peering_link_id | string | ID of the peering link in AWS.                                                                  |
| gcp_project_id      | string | project ID of the peering link in GCP.                                                          |
| gcp_network_name    | string | network name for the peering link in GCP.                                                       |
| gcp_network_id      | string | GCP Network ID in URL format which can be passed to `google_compute_network_peering` resources. |

::: tip
 `peer_resource_provider`

Currently this must be the same as the resource provider of the Event Store Cloud network.

 `peer_network_region`

Currently this must be the same as the region of the Event Store Cloud network, and specified in the format used by your cloud. For example `us-west-2` for AWS, `westus2` for Azure and `us-east1` for GCP

 `routes`

Typically this consists of one element, the address space of your managed network.
:::

#### Creating a peering

<<< @/docs/cloud/automation/snippets/eventstorecloud_peering.create.tf.hcl

### eventstorecloud_managed_cluster

Creates a new Managed Event StoreDB cluster in a network.

#### Arguments

| Name             | Type   | Description                                                                                                                                                      |
| :--------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name             | string | *Required*, the name of the managed. cluster.                                                                                                                    |
| project_id       | string | *Required*, the ID of the project in which the managed cluster should be created.                                                                                |
| network_id       | string | *Required*, the ID of the EventStore Cloud network into which the managed cluster should be created.                                                             |
| topology         | string | *Required*, the topology of the managed cluster. This determines the fault tolerance of the cluster. Valid values are `single-node` and `three-node-multi-zone`. |
| instance_type    | string | *Required*, the size of the instances to use in the managed cluster.                                                                                             |
| disk_size        | int    | *Required*, the size of the data disks in gigabytes.                                                                                                             |
| disk_type        | string | *Required*, `GP2` (AWS), `premium-ssd-lrs` (Azure), `ssd` (GCP).                                                                                                 |
| server_version   | string | *Required*, `20.6` , `20.10`.                                                                                                                                    |
| projection_level | string | *Optional*, default: `off` , the mode in which to enable projections. Valid values are `off` , `system` , `user`.                                                |

::: tip
 The actual implementation of each topology is specific to the resource provider.
 
`instance_type` values can be `F1` , `C4` , `M8` , `M16` , `M32` , `M64` , `M128`

`disk_size` :  The minimum size is 10GB.  
`disk_type` : The value depends on the cloud you are using `GP2` (AWS), `premium-ssd-lrs` (Azure), `ssd` (GCP)
::: 

#### Attributes

| Name              | Type   | Description                                                                                     |
| :---------------- | :----- | :---------------------------------------------------------------------------------------------- |
| id                | string | the ID of the cluster.                                                                          |
| dns_name          | string | the DNS name at which the cluster can be found.                                                 |
| resource_provider | string | the resource provider into which the cluster was provisioned.                                   |
| region            | string | the region in which the cluster was provisioned.                                                |
| gcp_network_name  | string | network name for the peering link in GCP.                                                       |
| gcp_network_id    | string | GCP Network ID in URL format which can be passed to `google_compute_network_peering` resources. |

::: tip
`region` and `resource_provider` values are controlled by the network in which the cluster is created.
:::

#### Creating a cluster

<xode-group>
<xode-block title="AWS">

<<< @/docs/cloud/automation/snippets/eventstorecloud_managed_cluster.create.aws.tf.hcl

</xode-block>
<xode-block title="Azure">

<<< @/docs/cloud/automation/snippets/eventstorecloud_managed_cluster.create.az.tf.hcl

</xode-block>
<xode-block title="GCP">

<<< @/docs/cloud/automation/snippets/eventstorecloud_managed_cluster.create.gcp.tf.hcl

</xode-block>
</xode-group>

## Data sources

The following data source is available: 

* Projects : `eventstorecloud_project`

### eventstorecloud_project

#### Arguments

| Name | Type   | Description                          |
| :--- | :----- | :----------------------------------- |
| name | string | *Required*, the name of the project. |
| id   | string | *Optional*, the name of the project. |

#### Looking up a project

<<< @/docs/cloud/automation/snippets/eventstorecloud_project.lookup.tf.hcl

::: tip
The value of `eventstorecloud_project.name` is case sensitive, so `Production Project` is not the same as `^production project`

:::

## FAQ

### Error `error obtaining access token: error 400 requesting access token`

You need to add the access token to your environment variables or the provider configuration. See [here](#provider-configuration)

### Error `... Forbidden: Access to the requested method for the requested resources was denied`

Make sure you used the correct Organisation Id:  See [here](#provider-configuration)

### Error `Your query returned no results. Please change your search criteria and try again.`

Data source names are case sensitive. See [here](#data-source-eventstorecloud-project)

[terraform github releases]: https://github.com/EventStore/terraform-provider-eventstorecloud/releases
[terraform github]: https://github.com/EventStore/terraform-provider-eventstorecloud
[terraform github samples]: https://github.com/EventStore/terraform-provider-eventstorecloud/tree/trunk/examples
[terraform registry]: https://registry.terraform.io/providers/EventStore/eventstorecloud/latest
[esc cli github]: https://github.com/EventStore/esc
[esc cli github releases]: https://github.com/EventStore/esc/releases
[cloud console tokens]:https://console.eventstore.cloud/authentication-tokens
[cloud console organizations]:https://console.eventstore.cloud/organizations
