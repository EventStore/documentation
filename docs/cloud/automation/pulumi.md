---
order: 3
---

# Pulumi provider

Kurrent Cloud provides a Pulumi provider to automate the provisioning of KurrentDB clusters. The provider is available via the [Pulumi Registry][pulumi provider].

## Installation

This package is available in many languages in the standard packaging formats.

### Get the plugin

For projects that use .NET and Go Pulumi SDK you have to install the provider before trying to update the stack.

Use the following command to add the plugin to your environment:

```bash
pulumi plugin install resource eventstorecloud [version] \
  --server https://github.com/EventStore/pulumi-eventstorecloud/releases/download/[version]
```

Example:

```bash
pulumi plugin install resource eventstorecloud v0.2.3 \
  --server https://github.com/EventStore/pulumi-eventstorecloud/releases/download/v0.2.7
```

### Configuration

The following configuration points are available for the `eventstorecloud` provider:

- `eventstorecloud:organizationId` - the organization ID for an existing organization in Kurrent Cloud
- `eventstorecloud:token` - a valid refresh token for an Kurrent Cloud account with admin access to the organization

### Node.js (Java/TypeScript)

To use from JavaScript or TypeScript in Node.js, install using either `npm`:

```bash
npm install @eventstore/pulumi-eventstorecloud
```

or `yarn`:

```bash
yarn add @eventstore/pulumi-eventstorecloud
```

### .NET

Add the NuGet package `Pulumi.EventStoreCloud` to your Pulumi project, which uses the .NET Pulumi SDK.

### Go

To use from Go, use `go get` to grab the latest version of the library

```bash
go get github.com/EventStore/pulumi-eventstorecloud/sdk/go/eventstorecloud
```

## Usage

Find comprehensive usage examples in the [Pulumi Registry][pulumi provider].

[pulumi provider]: https://www.pulumi.com/registry/packages/eventstorecloud/
