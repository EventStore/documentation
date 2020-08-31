# Connecting to a server

Since EventStoreDB can be deployed either as a single node or as a cluster, the .NET client supports connecting to both. Both scenarios are quite different, so we give two distinct examples here.

The `EventStoreConnection` class maintains a full-duplex connection between the client and the EventStoreDB server. `EventStoreConnection` is thread-safe and we recommend that you create one instance per application.

You might need to have more than one connection open in a single application in some cases. For example, you can use one connection, which is created using default settings and communicates to the cluster leader, for consistent reads and writes. Another connection can be instructed to prefer follower nodes and used for subscriptions. By doing so you can remove some load from the cluster leader.

To create a connection instance, you'd need to use the static `EventStoreConnection.Create` factory method. The connection class implements the `IEventStoreConnection` interface and that's what the `Create` method returns.

## Single node

Connecting to a single node is simple. All you need is to know the IP address or the hostname of the server and ports it exposes. Clients normally connect to external ports. Single-node deployments normally don't need to use internal ports anyway, since internal ports are mainly targeting communication between cluster nodes.

Here is how you can create an `IEventStoreConnection` instance for a single-node deployment running on `localhost`:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/Connection.cs#connect

You'd need to explicitly open the connection after creating it. As a best practice, ensure that the connection gets closed when the application stops.

## Cluster

When connecting to a cluster, the client needs to connect to the gossip endpoint of one or more nodes of the cluster. It will then attempt to get the cluster gossip information from one of the nodes, find out the node suitable for the connection and then connect to that node.

::: tip
Learn more about how the cluster gossip works by looking at the [server documentation](/docs/server/5.0.9/server/clustering/gossip.md).
:::

EventStoreDB clusters can be set up either by using a gossip seed as a list of IP addresses of the cluster nodes, or as a DNS record, which points to IP addresses of the nodes. The .NET client supports both methods also.

### Using the gossip seed

The gossip seed is nothing more than a list of addresses of the cluster nodes, separated by comma. Each entry in the list is the node IP address and its external gossip port. Normally, EventStoreDB cluster nodes use the external HTTP port for gossip (default to `2113`).

::: tip
EventStoreDB 5 only supports IP addresses for the gossip seed. The 20.6 version also supports hostnames.
:::

Here is the example of using the gossip seed to create a connection:

<<< @/docs/clients/dotnet/5.0/sample-code/Server/ConnectClusterGossipSeeds.cs#connect

You can also use DNS to avoid manually specifying the seeds. You add the nodes to a DNS record and then specify that DNS entry to the connection to locate nodes.

<<< @/docs/clients/dotnet/5.0/sample-code/Server/ConnectClusterGossipDns.cs#connect

The connection automatically reconnects during node failures. You can control this behaviour with options on the `ConnectionSettings` such as limiting retry attempts or frequency.

## Connection settings

When calling the `ConnectionSettings.Create` method you get an instance of the `ConnectionSettingsBuilder` back. It has a rich API, allowing you to customise and fine-tune the connection settings. Learn more about all the options you can use for the connection settings on the [Connection settings](options.md) page.

The settings builder can be used to create a `ConnectionSettings` instance by calling the `Build` method. Alternatively, you can use the builder instance itself as connection settings, thanks to the implicit conversion from `ConnectionSettingsBuilder` to `ConnectionSettings`. Keep in mind that when using the implicit conversion, it calls the `Build` method under the hood for each conversion. So, changing the settings builder won't affect any previously created instance of `ConnectionSettings`, but any new instance would include the modified setting.

## Connection string

In both provided examples we used the fluent API for `ConnectionSettings`. In some cases you might prefer using the connection string, which would allow you to separate connection settings per environment using the application configuration file.

<<< @/docs/clients/dotnet/5.0/sample-code/Server/ConnectClusterGossipSeeds.cs#connectionString

Learn more about using connection strings and available options on the [Connection string](connection-string.md) page.

