# This assumes a project with the name "Production" exists
data "eventstorecloud_project" "production" {
  name = "Production Project"
}
output "project_id" {
  value = data.eventstorecloud_project.production.id
}