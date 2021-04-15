# Compatibility Mode

Compatibility Mode was added in v21.2 of the client to set certain configuration options depending on the Event Store version the client is connecting to.

At the moment, the v21.2 client supports two modes:

- "5" to allow connection to v5 Event Store servers.
- "auto" to allow discovering whether the Event Store server is a v5 or v20 (or above) server.

## Auto-Compatibility Mode

Auto-Compatibility mode was added to make the upgrade from an insecure v5 cluster to a secure v20+ cluster easier by allowing the client to connect to either server configuration without needing to change the client's connection settings.

It does this by sending both an insecure and a secure gossip request when first discovering the server. Whichever of these requests succeeds sets whether the gossip is to be done over HTTP or HTTPS. Once the cluster is discovered, the client will check the gossip to determine whether the TCP connection should be secure or insecure, and connect accordingly.

This means that you no longer need to specify `GossipOverTls` or `UseSslConnection` in the connection settings or connection string.

::: note
Since auto-compatibility mode will send two requests at discovery and expect one to fail, you will see a gossip failure in the log when the client starts. This is expected to only happen on the first request.
:::

### Usage

Auto-Compatibility Mode is supported when connecting with Gossip Seeds or Cluster DNS Discovery.

You can enable auto-compatibility mode with `CompatibilityMode=auto` in the connection string, or with `.SetCompatibilityMode("auto")` in the connection settings.

You can connect to a cluster running insecure v5, insecure v20+, or secure v20+ with the following configurations:

### Connection String:

```csharp
var clusterDnsConnectionString = $"ConnectTo=discover://{dns_address}:2113;TargetHost={dns_address};CompatibilityMode=auto;ValidateServer=true;"
```

```csharp
var gossipSeedConnectionSTring = $"GossipSeeds={node1}:2113,{node2}:2113,{node3}:2113;CompatibilityMode=auto;ValidateServer=true;"
```

::: warning
Auto-compatibility mode does not enable Server Certificate Validation by default. As such, we recommend that you enable this explicitly in your connection string.
:::

### Connection Settings:

<xode-group>
<xode-block title="Using Cluster DNS Discovery">

<<< @/docs/clients/dotnet/21.2/sample-code/DotNetClient/CompatibilityMode.cs#AutoCompatibilityWithClusterDns
</xode-block>
<xode-block title="Using Gossip Seeds">

<<< @/docs/clients/dotnet/21.2/sample-code/DotNetClient/CompatibilityMode.cs#AutoCompatibilityWithGossipSeeds
</xode-block>
</xode-group>

## v5 Compatibility Mode

The v5 Compatibility Mode allows the v21.2 client to connect to a v5 cluster.

You can set this with `CompatibilityMode=5` in the connection string, or with `.SetCompatibilityMode("5")` in the connection settings.

For example:

```csharp
var connectionString = $"ConnectTo=discover://{cluster_dns}:2113?TargetHost={cluster_dns};CompatibilityMode=5;"
```