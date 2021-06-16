# Compatibility Mode

Compatibility Mode was added in v5.0.10 and v21.2.0 of the client to set certain configuration options depending on the Event Store version the client is connecting to. It allows discovering whether the Event Store server is a v5 or v20 server.

::: warning
Changes were not backported to the v20.10 TCP Client version. To use `Compatibility Mode` you have to upgrade to at least v21.2.0. It's fully compatible with v20.10.0. Check the details in the [TCP Compatibility Mode client v21.2 docs](/clients/dotnet/21.2/connecting/compatibility-mode.md).
:::
## Auto-Compatibility Mode

Auto-Compatibility mode was added to make the upgrade from an insecure v5 cluster to a secure v20+ cluster easier by allowing the client to connect to either server configuration without needing to change the client's connection settings.

It does this by sending both an insecure and a secure gossip request when first discovering the server. Whichever of these requests succeeds sets whether the gossip is to be done over HTTP or HTTPS. Once the cluster is discovered, the client will check the gossip to determine whether the TCP connection should be secure or insecure, and connect accordingly.

This means that you no longer need to specify `GossipOverTls` or `UseSslConnection` in the connection settings or connection string.

::: warning
Changes were not backported to the v20.10 TCP Client version. To use `Auto-Compatibility Mode` you have to upgrade to at least v21.2.0. It's fully compatible with v20.10.0. Check the details in the [Auto-Compatibility Mode client v21.2 docs](/clients/dotnet/21.2/connecting/compatibility-mode.md#auto-compatibility-mode).
:::