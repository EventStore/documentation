data "eventstorecloud_project" "production" {
  name = "Production Project"
}

resource "eventstorecloud_network" "production" {
  name              = "Production Network"
  project_id        = data.eventstorecloud_project.production.id
  resource_provider = "azure"
  region            = "westus2"
  cidr_block        = "172.21.0.0/16"
}

resource "eventstorecloud_managed_cluster" "production" {
  name             = "Production Cluster"
  project_id       = eventstorecloud_project.Production.project_id
  network_id       = eventstorecloud_network.Production.id
  topology         = "three-node-multi-zone"
  instance_type    = "F1"
  disk_size        = 10
  disk_type        = "premium-ssd-lrs"
  server_version   = "20.10"
  projection_level = "user"
}