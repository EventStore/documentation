---
title: ".NET TCP client 5.0.11"
date: 2021-04-12
author: "Hayley Campbell"
kind: "Post"
tag:
- release notes
---

The TCP client for .NET release extends the auto-compatibility functionality introduced in v5.0.10 to allow it to work with Gossip Seeds as well as ClusterDNS. We hope that this will simplify the upgrade process from v5 to v20.

<!-- more -->

You can get the packages from NuGet here: [EventStore TCP Client](https://www.nuget.org/packages/EventStore.Client/).

```shell
dotnet add package EventStore.Client --version 5.0.11
```

## Changes

- [#2860](https://github.com/EventStore/EventStore/pull/2860) Extend auto-compatibility mode to gossip seeds configuration

### Auto-Compatibility Mode

In the previous v5 release we mentioned that we wanted to make the upgrade from version 5 of EventStoreDB to version 20 less disruptive. As part of that, we introduced auto-compatibility mode for ClusterDNS discovery in the TCP client.

This release extends that feature to make it easier for more configurations.

First, auto-compatibility mode now works for gossip seeds. If auto-compatibility mode is enabled and a gossip seed is specified, the client will attempt to discover whether it should gossip over HTTP or HTTPS.

Second, auto-compatibility mode will also discover whether to use secure or insecure TCP based on the response from the server. This means that you won’t need to explicitly set UseSslConnection in the connection settings.

Please note that auto-compatibility mode does not enable Server Certificate Validation by default. As such, we recommend that you enable this explicitly in your connection settings

### Using Auto-Compatibility Mode

You can enable auto-compatibility mode with

```
CompatibilityMode=auto
```

in the connection string, or with

```
.SetCompatibilityMode("auto")
```

in the connection settings.

You can connect to a cluster running insecure v5, insecure v20, or secure v20 with the following configurations:

Connection String:

```
ConnectTo=discover://{dns_address}:2113;TargetHost={dns_address};CompatibilityMode=auto;ValidateServer=true;
GossipSeeds={node1}:2113,{node2}:2113,{node3}:2113;CompatibilityMode=auto;ValidateServer=true;
```

Connection Settings:

```csharp
var connectionSettings = ConnectionSettings.Create()
    .SetCompatibilityMode("auto");
var clusterSettings = ClusterSettings.Create()
    .DiscoverClusterViaDns()
    .SetClusterDns({dns_address})
    .SetClusterGossipPort(2113);
var connectionSettings = ConnectionSettings.Create()
    .SetGossipSeedEndPoints(gossipSeeds)
    .SetCompatibilityMode("auto");
```

## Documentation

Documentation for .NET TCP Client [can be found here](https://developers.eventstore.com/).

If you have any questions that aren't covered in these release notes or the docs, please feel free to reach out on discuss, GitHub or slack.

## Providing Feedback

If you encounter any issues, please don’t hesitate to open an issue on [GitHub](https://github.com/eventstore/eventstore) if there isn’t one already.

Additionally, there is a fairly active [Discuss](https://discuss.eventstore.com/) community forum, and an `#eventstore` channel on the [DDD-CQRS-ES](https://j.mp/ddd-es-cqrs) Slack community.
