# Terraform provider 

# Installation

## Terraform 0.12

We provide binary releases for macOS, Windows and Linux via GitHub releases. In order for Terraform to find the plugin, the appropriate binary must be placed into the Terraform third-party plugin directory, the location of which varies by operating system:

- `%APPDATA%\terraform.d\plugins` on Windows
- `~/.terraform.d/plugins` on macOS or Linux

Alternatively, the binary can be placed alongside the main `terraform` binary.

On macOS and Linux, you can download the provider using the following commands:

- macOS: `curl -o ./terraform-provider-eventstorecloud.zip -L https://github.com/EventStore/terraform-provider-eventstorecloud/releases/download/v1.5.0/terraform-provider-eventstorecloud_1.5.0_darwin_amd64.zip && unzip ./terraform-provider-eventstorecloud.zip && mv ./terraform-provider-eventstorecloud ~/.terraform.d/plugins/terraform-provider-eventstorecloud`
- Linux: `curl -o ./terraform-provider-eventstorecloud.zip -L https://github.com/EventStore/terraform-provider-eventstorecloud/releases/download/v1.5.0/terraform-provider-eventstorecloud_1.5.0_linux_amd64.zip && unzip ./terraform-provider-eventstorecloud.zip && mv ./terraform-provider-eventstorecloud ~/.terraform.d/plugins/terraform-provider-eventstorecloud`

If you prefer to install from source, use the `make install` target in this repository. You'll need a Go 1.13+
development environment.

## Terraform 0.13+

Terraform now supports third party modules installed via the plugin registry. Add the following to your terraform module
configuration.

```
terraform {
  required_providers {
    eventstorecloud = {
      source = "EventStore/eventstorecloud"
      version = "1.5.0"
    }
  }
}
```

# Provider Configuration

The Event Store Cloud provider must be configured with an access token, however there are several additional
options which may be useful.

Provider configuration options are:

- `token` - (`ESC_TOKEN` via the environment) - *Required* - an access token for Event Store Cloud. Currently this token must be created and displayed with the esc cli tool [esc cli](https://github.com/EventStore/esc). The token id displayed in the cloud console is not a valid token.
- `organization_id` - (`ESC_ORG_ID` via the environment) - *Required* - the identifier of the Event Store Cloud
  organization into which to provision resources.

- `url` - (`ESC_URL` via the environment) - *Optional* - the URL of the Event Store Cloud API. This defaults
  to the public cloud instance of Event Store Cloud, but may be overridden to provision resources in another
  instance.
- `token_store` - (`ESC_TOKEN_STORE` via the environment) - *Optional* - the location on the local filesystem
  of the token cache. This is shared with the Event Store Cloud CLI.

# Resources

All resources in Event Store Cloud can be provisioned using the Terraform provider, and existing projects
can be queried using a data source in the provider.

## Data Source `eventstorecloud_project`

Looks up a project in the organization with which the provider is configured by name.

### Example

```hcl
# This assumes a project with the name "Example Project" exists
data "eventstorecloud_project" "example" {
  name = "Example Project"
}

output "project_id" {
  value = data.eventstorecloud_project.example.id
}
```

### Arguments

- `name` - (`string`, Required) - the name of the project.

### Attributes

As well as the input arguments, the following properties are exposed:

- `id` - (`string`) - the ID of the project.


## Resource `eventstorecloud_project`

Creates a project in the organization with which the provider is configured.

### Example

```hcl
resource "eventstorecloud_project" "example" {
  name = "Example Project"
}
```

### Arguments

- `name` - (`string`, Required) - the name of the project.

### Attributes

As well as the input arguments, the following properties are exposed:

- `id` - (`string`) - the ID of the project.


## Resource `eventstorecloud_network`

Creates a new network in a cloud project. Networks are specific to a given cloud provider and region.

### Example

```hcl
resource "eventstorecloud_project" "example" {
  name = "Example Project"
}

resource "eventstorecloud_network" "example" {
  name = "Example Network"

  project_id = data.eventstorecloud_project.example.id

  resource_provider = "aws"
  region = "us-west-2"
  cidr_block = "172.21.0.0/16"
}
```

### Arguments

- `name` - (`string`, Required) - the name of the network.
- `project_id` - (`string`, Required) - the ID of the project in which the network should be created.
- `resource_provider` - (`string`, Required) - the name of the cloud in which the network should be created. Valid
  values for `resource_provider` are `aws`, `gcp` and `azure`.
- `region` - (`string`, Required) - the name of the region in which the network should be created. Region names must
  be in the format used by the resource provider, for example `us-west-2` for AWS, or `East US` for Azure.
- `cidr_block` - (`string`, Required) - the address space of the network. The maximum prefix length is `/9` however what
  is allowed is provider dependent, and the minimum is `/24`. Smaller networks can hold fewer managed clusters, but may
  be easier to peer to infrastructure hosting applications.

### Attributes

As well as the input arguments, the following properties are exposed:

- `id` - (`string`) - the ID of the network.

## Resource `eventstorecloud_peering`

Creates a new peering in a cloud network. Peerings can be created from customer-managed networks in the same
cloud and region as the network with which the peering exists. A number of arguments have a format dependent
on the cloud provider.

### Example (AWS)

```hcl
resource "eventstorecloud_project" "example" {
  name = "Example Project"
}

resource "eventstorecloud_network" "example" {
  name = "Example Network"

  project_id = data.eventstorecloud_project.example.id

  resource_provider = "aws"
  region = "us-west-2"
  cidr_block = "172.21.0.0/16"
}

resource "eventstorecloud_peering" "example" {
	name = "Peering from AWS into Example Network"

	project_id = eventstorecloud_network.example.project_id
	network_id = eventstorecloud_network.example.id

	peer_resource_provider = eventstorecloud_network.example.resource_provider
	peer_network_region = eventstorecloud_network.example.region

	peer_account_id = "<Customer AWS Account ID>"
	peer_network_id = "<Customer VPC ID>"
	routes = ["<Address space of the customer VPC>"]
}
```

### Arguments

- `name` - (`string`, Required) - the name of the peering.
- `project_id` - (`string`, Required) - the ID of the project in which the peering should be created.
- `network_id` - (`string`, Required) - the ID of the network into which the peering should be created.
- `peer_resource_provider` - (`string`, Required) - the name of the cloud in which the customer managed network exists.
  Currently this must be the same as the resource provider of the Event Store Cloud network.
- `peer_network_region` - (`string`, Required) - the name of the region in which the customer managed network exists.
  Currently this must be the same as the region of the Event Store Cloud network, and specified in the format used by the
  customer cloud - for example `us-west-2` in AWS, and `westus2` for Azure.
- `peer_account_id` - (`string`, Required) - the account identifier for the account in which the customer-managed network
  exists. The required format is dependent on the target cloud:
  - AWS: The Account ID (12 digit numeric value available from the account drop down in the AWS console)
- `peer_network_id` - (`string`, Required) - the network identifier for the customer-managed network. The required format
  is dependent on the target cloud:
  - AWS: The VPC ID (`vpc-XXXXXXXX`, available via the VPC section of the AWS console)
- `routes` - (`string`, Required) - CIDR Blocks representing routes to be created from the Event Store Cloud network into
  the customer-managed network. Typically this consists of one element, the address space of the customer-managed network.

### Attributes

As well as the input arguments, the following properties are exposed:

- `id` - (`string`) - the ID of the peering.
- `provider_metadata` - metadata supplied by the resource provider cloud about the peering link:
  - `aws_peering_link_id` - (`string`) - the ID of the peering link in AWS. Empty if the resource provider is not AWS.
  - `gcp_project_id` - (`string`) - the project ID of the peering link in GCP. Empty if the resource provider is not GCP.
  - `gcp_network_name` - (`string`) - the network name for the peering link in GCP. Empty if the resource provider is not GCP.
  - `gcp_network_id` - (`string`) - GCP Network ID in URL format which can be passed to `google_compute_network_peering` resources. Empty if the peering Provider is not GCP.

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

## Contributing

The Event Store Cloud Terraform provider is released under the Mozilla Public License version 2, like most Terraform
providers. We welcome pull requests and issues! We adhere to the [Contributor Covenant][codeofconduct] Code of Conduct,
and ask that contributors familiarize themselves with it. We also have a set of [Contributing Guidelines][contributing].

[terraform]: (https://terraform.io)
[esc]: https://eventstore.com/event-store-cloud/
[codeofconduct]: https://github.com/EventStore/terraform-provider-eventstorecloud/tree/trunk/CODE-OF-CONDUCT.md
[contributing]: https://github.com/EventStore/terraform-provider-eventstorecloud/tree/trunk/CONTRIBUTING.md
