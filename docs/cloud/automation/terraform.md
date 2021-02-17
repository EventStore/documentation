---
terraform_current_version: 1.5.1
terraform_github_releases: https://github.com/EventStore/terraform-provider-eventstorecloud/releases/download
---

# Terraform provider 

## Installation

The current version of the provider is : {{ $frontmatter.terraform_current_version }}.

The releases are available in Terraform's official [registry][terraform registry] and via [GitHub releases][terraform github releases].

### Terraform 0.13+

Terraform supports third party modules installed via the plugin registry.  
Add the following to your terraform module configuration.


<<< @/docs/cloud/automation/snippets/providers_eventstore.tf.hcl

### Terraform 0.12

In order for Terraform to find the plugin, the appropriate binary must be placed into the Terraform third-party plugin directory.  
The location varies by operating system:

- Linux and macOS `~/.terraform.d/plugins`
- Windows `%APPDATA%\terraform.d\plugins`

Alternatively, the binary can be placed alongside the main `terraform` binary.

You can download the provider using the following commands:

- Linux:

<<< @/docs/cloud/automation/snippets/download_provider_linux.sh
 
- macOS:  

<<< @/docs/cloud/automation/snippets/download_provider_macos.sh

- Windows (PowerShell): 

<<< @/docs/cloud/automation/snippets/download_provider_windows.ps1.powershell

## From Source 

If you prefer to install from source, use the `make install` target in this [repository][terraform github].

You will need a Go 1.13+ development environment.

## Provider Configuration

The Event Store Cloud provider must be configured with an access token.   
There are several additional options that may be useful.

Provider configuration options are:

| Option              | Environment Variable   | Description                                                                                                          |
| :------------------ | :--------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `token`             | `ESC_TOKEN`            | *Required*, your access token for Event Store Cloud                                                                  |
| `organization_id`   | `ESC_ORG_ID`           | *Required*, the identifier of your  Event Store Cloud organization.                                                  |
| `url`               | `ESC_URL`              | *Optional*, the URL of the Event Store Cloud API. This defaults to the public cloud instance of Event Store Cloud    |
| `token_store`       | `ESC_TOKEN_STORE`      | *Optional*, the location on the local filesystem of the token cache. This is shared with the Event Store Cloud CLI.  |
                                                                                                                                                                       
### Obtaining the `token`
Currently this token must be created and displayed with the [esc cli][esc cli github releases] tool.  

The token id displayed in the cloud console is not a valid token.

The command to obtain a token from the esc cli tool is  
`esc access tokens create --email <email>`

## Resources

All resources in Event Store Cloud can be provisioned using the Terraform provider.  
Existing projects can be queried using a data source in the provider.  
More complete samples can be found [here][terraform github samples].

The following resources are available : 
- Projects : `eventstorecloud_project`
- Networks : `eventstorecloud_network`
- Peering  : `eventstorecloud_peering`


## eventstorecloud_project

Looks up and creates project in the organization with which the provider is configured by name.
### Arguments
| Name       | Type   | Description                         |
| :--------- | :----- | :-------------                      |
| name       | string | *Required*, the name of the project |

### Attributes
| Name       | Type   | Description           | 
| :--------- | :----- | :-------------        | 
| id         | string | the ID of the project | 

### Looking up a project

<<< @/docs/cloud/automation/snippets/eventstorecloud_project.lookup.tf.hcl

### Creating a project 

<<< @/docs/cloud/automation/snippets/eventstorecloud_project.create.tf.hcl

## eventstorecloud_network

### Arguments
| Name              | Type   | Description                                                                                      |
| :---------        | :----- | :-------------                                                                                   |
| name              | string | *Required*, the name of the network                                                              |
| project_id        | string | *Required*, the ID of the project in which the network should be created                         |
| resource_provider | string | *Required*, the name of the cloud (`aws`, `gcp`, `azure`) in which the network should be created |
| region            | string | *Required*, the name of the region in which the network should be created                        |
| cidr_block        | string | *Required*, the address space of the network.                                                    |

### Attributes
| Name       | Type   | Description           | 
| :--------- | :----- | :-------------        | 
| id         | string | the ID of the project | 

::: tip
`region` names must be in the format used by the resource provider, for example `us-west-2` for AWS, or `East US` for Azure
:::

::: tip
`cidr_block`: the maximum prefix length is `/9` and  the minimum is `/24`.  
However what is allowed is provider dependent.  
Smaller networks can hold fewer managed clusters, but may be easier to peer to infrastructure hosting your applications.
:::

### Creating a network

<<< @/docs/cloud/automation/snippets/eventstorecloud_network.create.tf.hcl

## eventstorecloud_peering

Creates a new peering in a cloud network.  
Peering can be created from customer-managed networks in the same cloud and region
as the network with which the peering exists.

::: tip
The following arguments have a format dependent on the cloud provider:
- `peer_account_id`
- `peer_network_region`  
- `peer_network_id`
:::

### Arguments
| Name                   | Type   | Description                                                                                                             | 
| :---------             | :----- | :-------------                                                                                                          | 
| name                   | string | *Required*, the name of the peering                                                                                     | 
| project_id             | string | *Required*, the ID of the project in which the peering should be created                                                | 
| network_id             | string | *Required*, the ID of the EventStore Cloud network into which the peering should be created.                            | 
| peer_resource_provider | string | *Required*, the name of the cloud (`aws`, `gcp`, `azure`) in which your managed network exists                          | 
| peer_network_region    | string | *Required*, the name of the region in which your managed network exists.                                                | 
| peer_account_id        | string | *Required*, the account identifier for the account in which your managed network exists                                 | 
| peer_network_id        | string | *Required*, the network identifier for your managed network.                                                            | 
| routes                 | string | *Required*,  CIDR Blocks representing routes to be created from the Event Store Cloud network into your managed network |

### Attributes

| Name                | Type   | Description                                                                                    | 
| :---------          | :----- | :-------------                                                                                 | 
| id                  | string | the ID of the peering                                                                          | 
| provider_metadata   | string | metadata supplied by the resource provider cloud about the peering link:                       | 
| aws_peering_link_id | string | ID of the peering link in AWS.                                                                 | 
| gcp_project_id      | string | project ID of the peering link in GCP                                                          | 
| gcp_network_name    | string | network name for the peering link in GCP                                                       | 
| gcp_network_id      | string | GCP Network ID in URL format which can be passed to `google_compute_network_peering` resources | 

::: tip
`peer_resource_provider`
Currently this must be the same as the resource provider of the Event Store Cloud network.
:::

::: tip
`peer_network_region`
Currently this must be the same as the region of the Event Store Cloud network, and specified in the format used by your
cloud - for example `us-west-2` in AWS, and `westus2` for Azure.
:::

::: tip
`routes`
Typically this consists of one element, the address space of your managed network.
:::

### Creating a peering (AWS)

<<< @/docs/cloud/automation/snippets/eventstorecloud_peering.create.tf.hcl

## Resource `eventstorecloud_managed_cluster`

Creates a new Managed Event StoreDB cluster in a network.

### Example

```hcl
data "eventstorecloud_project" "example" {
  name = "Example Project"
}

resource "eventstorecloud_network" "example" {
  name = "Example Network"

  project_id = data.eventstorecloud_project.example.id

  resource_provider = "aws"
  region = "us-west-2"
  cidr_block = "172.21.0.0/16"
}

resource "eventstorecloud_managed_cluster" "example" {
	name = "Example Cluster"

	project_id = eventstorecloud_network.example.project_id
	network_id = eventstorecloud_network.example.id

	topology = "three-node-multi-az"
	instance_type = "F1"
	disk_size = 24
	disk_type = "gp2"
	server_version = "20.6"
}
```

### Arguments

- `name` - (`string`, Required) - the name of the managed cluster.
- `project_id` - (`string`, Required) - the ID of the project in which the managed cluster should be created.
- `network_id` - (`string`, Required) - the ID of the network in which the managed cluster should be created. This
  determines which cloud and region the managed cluster will be hosted in.
- `topology` - (`string`, Required) - the topology of the managed cluster. This determines the fault tolerance of
  the cluster. Valid values are `single-node` and `three-node-multi-az`. The actual implementation of each topology
  is specific to the resource provider.
- `instance_type` - (`string`, Required) - the size of the instances to use in the managed cluster. This determines
  the performance of the cluster. Valid values are `F1` and `C4`.
- `disk_size` - (`int`, Required) - the size of the data disks in gigabytes. This determines how much data can be
  stored by the cluster. The minimum size is 8GB for a cluster in AWS and 10GB for a cluster in GCP.
- `disk_type` - (`string`, Required) - the type of data disks, which helps determine the performance profile of the
  cluster. Currently `gp2` is the only option.
- `server_version` - (`string`, Required) - the version of Event Store Server with which the cluster is provisioned.
  Currently only `20.6` is available.
- `projection_level` - (`string`, Optional) - the mode in which to enable projections. Valid values are `off`, `system`
  and `user`. Defaults to `off`.

### Attributes

As well as the input arguments, the following properties are exposed:

- `id` - (`string`) - the ID of the network.
- `dns_name` (`string`) - the DNS name at which the cluster can be found from networks peered into cluster network.
- `resource_provider` (`string`) - the resource provider into which the cluster was provisioned. This is controlled by
  the network in which the cluster is created.
- `region` (`string`) - the region in which the cluster was provisioned. This is controlled by the network in which
  the cluster is created.

[terraform github releases]: https://github.com/EventStore/terraform-provider-eventstorecloud/releases
[terraform github]: https://github.com/EventStore/terraform-provider-eventstorecloud
[terraform github samples]: https://github.com/EventStore/terraform-provider-eventstorecloud/tree/trunk/examples
[terraform registry]: https://registry.terraform.io/providers/EventStore/eventstorecloud/latest
[esc cli github]: https://github.com/EventStore/esc
[esc cli github releases]: https://github.com/EventStore/esc/releases