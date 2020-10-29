# EventStoreDB Cloud

::: warning Preview notice
EventStoreDB Cloud is currently in preview. Read more about the Preview phase [here](preview.md).
:::

EventStoreDB Cloud allows you to deploy a managed EventStoreDB cluster in AWS, GCP and Azure (coming soon). The cloud cluster is optimised for the specific cloud provider and provisioned as a multi-zone VM set.

As a customer of EventStoreDB Cloud you get access to the Cloud console, where you can provision and manage EventStoreDB clusters, back and up restore your data, establish the connection between EventStoreDB Cloud networks and your own cloud infrastructure.

The Cloud console uses the [API](../automation/api.md), which is also available for customers. Using the API, you can execute any operation available in the console, programmatically. We also offer the [Terraform provider](https://github.com/EventStore/terraform-provider-eventstorecloud) and the [CLI tool](https://github.com/EventStore/esc) which is built on top of the same API.

Next step: follow our [Cloud quick start](quick-start.md) and get your first EventStoreDB managed cluster ready in minutes.
