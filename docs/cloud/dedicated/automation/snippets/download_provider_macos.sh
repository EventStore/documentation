curl -o ./terraform-provider-eventstorecloud.zip -L \
  https://github.com/EventStore/terraform-provider-eventstorecloud/releases/download/v1.5.12/terraform-provider-eventstorecloud_1.5.12_darwin_amd64.zip
unzip ./terraform-provider-eventstorecloud.zip
mv ./terraform-provider-eventstorecloud ~/.terraform.d/plugins/terraform-provider-eventstorecloud
