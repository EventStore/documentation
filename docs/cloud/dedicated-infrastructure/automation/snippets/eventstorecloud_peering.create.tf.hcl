resource "eventstorecloud_project" "production" {
  name = "Production Project"
}

resource "eventstorecloud_network" "production" {
  name = "Production Network"

  project_id = data.eventstorecloud_project.production.id

  resource_provider = "aws"
  region            = "us-west-2"
  cidr_block        = "172.21.0.0/16"
}

resource "eventstorecloud_peering" "production" {
  name = "Peering from AWS into Production Network"

  project_id = eventstorecloud_network.Production.project_id
  network_id = eventstorecloud_network.Production.id

  peer_resource_provider = eventstorecloud_network.Production.resource_provider
  peer_network_region    = eventstorecloud_network.Production.region

  peer_account_id = "<Customer AWS Account ID>"
  peer_network_id = "<Customer VPC ID>"
  routes          = ["<Address space of the customer VPC>"]
}
