---
home: true
heroText: EventStoreDB Documentation
tagline: The stream database built for Event Sourcing
extraText: Click here for EventStoreDB v5 docs
extraLink: /v5/
actions:
- text: Database server →
  link: /latest.html
- text: gRPC clients →
  link: /clients/grpc/getting-started/
- text: Event Store Cloud →
  link: /cloud/
features:
- title: "Event Sourcing"
  details: EventStoreDB is built to support Event Sourcing. We support idempotent writes and reading events from individual streams.
- title: gRPC for clients
  details: Using gRPC protocol for client-server communication allows us to provide SDKs for a wide range of languages and platforms.
- title: Immutable data
  details: EventStoreDB stores your data as a series of immutable events over time, providing one of the strongest audit log options available (characteristics similar to a blockchain).
footer: Copyright © 2020 EventStoreDB Limited
---

## Latest updates

### 30 December 2020
- <badge>preview</badge> Extended [gRPC clients](/clients/grpc/getting-started/) page with documentation and samples for [writing](clients/grpc/appending-events/README.md) and [reading](clients/grpc/reading-events/README.md) events, [subscribing to streams](clients/grpc/subscribing-to-streams/README.md).

### 23 December 2020
-  Added [Cloud EventStoreDB in Azure](cloud/provision/azure/README.md) documentation.
 
### 19 December 2020
-  Improve [subscriptions documentation](clients/dotnet/5.0/subscriptions/README.md) documentation.

### 6 November 2020
- Fixes for the deployment configurator.
- <badge>preview</badge> Added the combined [gRPC clients](/clients/grpc/getting-started/) page.

### 28 October 2020
- Many fixes in v5 server documentation.
- Documentation for v20 server essentially covers everything.
- <badge>preview</badge> Server configurator for v20 is [available](/server/20.6/server/installation/)!

### 12 October 2020
- We have added the initial version of the [Cloud](/cloud/intro/) docs, including detailed instructions for provisioning resources in AWS and GCP.
