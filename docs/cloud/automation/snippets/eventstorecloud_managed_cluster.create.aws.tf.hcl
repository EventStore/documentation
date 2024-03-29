data "eventstorecloud_project" "production" {
  name = "Production Project"
}

resource "eventstorecloud_network" "production" {
  name              = "Production Network"
  project_id        = data.eventstorecloud_project.production.id
  resource_provider = "aws"
  region            = "us-west-2"
  cidr_block        = "172.21.0.0/16"
}

resource "eventstorecloud_managed_cluster" "production" {
  name             = "Production Cluster"
  project_id       = eventstorecloud_project.Production.project_id
  network_id       = eventstorecloud_network.Production.id
  topology         = "three-node-multi-zone"
  instance_type    = "F1"
  disk_size        = 10
  disk_type        = "gp3"
  disk_iops        = 3000
  disk_throughput  = 125
  server_version   = "21.10"
  projection_level = "user"
}