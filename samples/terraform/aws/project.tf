provider "eventstorecloud"{
//token = "nKE-XXnWF4DXh0ZMcVfj7VQ9bRT0EhyvG4V2mY2b91Vc2"
//organization_id = "bt77lfqrh41scaatc180"
}

output "eventstorcloud_token" {
  value = "eventstorecloud.token"
}
resource "eventstorecloud_project" "aws_project" {
  name = "aws project"
}


output "aws_project_id" {
  value = eventstorecloud_project.aws_project.id
}