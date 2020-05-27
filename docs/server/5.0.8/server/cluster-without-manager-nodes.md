---
title: Cluster with only database nodes
---

# Setting up a cluster using only database nodes (OSS)

<!-- TODO: Needs Linux instructions -->

High availability Event Store allows you to run more than one node as a cluster. There are two modes available for clustering:

-   With database nodes only (open source and commercial)
-   [With manager nodes and database nodes](cluster-with-manager-nodes) (commercial only)

This document covers setting up Event Store with only database nodes.

::: tip
When setting up a cluster, you generally want an odd number of nodes as Event Store uses a quorum based algorithm to handle high availability. We recommended you define an odd number of nodes to avoid split brain problems.

Common values for the ‘ClusterSize’ setting are three or five (to have a majority of two nodes and a majority of three nodes).
:::

::: tip Next steps
[Read here](node-roles.md) for more information on the roles available for nodes in an Event Store cluster.
:::

## Running on the same machine

To start, set up three nodes running on a single machine. Run each of the commands below in its own console window. You either need admin privileges or have ACLs setup with IIS if running under Windows. Unix-like operating systems need no configuration. Replace "127.0.0.1" with whatever IP address you want to run on.

```powershell
EventStore.ClusterNode.exe --mem-db --log .\logs\log1 --int-ip 127.0.0.1 --ext-ip 127.0.0.1 --int-tcp-port=1111 --ext-tcp-port=1112 --int-http-port=1113 --ext-http-port=1114 --cluster-size=3 --discover-via-dns=false --gossip-seed=127.0.0.1:2113,127.0.0.1:3113
EventStore.ClusterNode.exe --mem-db --log .\logs\log2 --int-ip 127.0.0.1 --ext-ip 127.0.0.1 --int-tcp-port=2111 --ext-tcp-port=2112 --int-http-port=2113 --ext-http-port=2114 --cluster-size=3 --discover-via-dns=false --gossip-seed=127.0.0.1:1113,127.0.0.1:3113
EventStore.ClusterNode.exe --mem-db --log .\logs\log3 --int-ip 127.0.0.1 --ext-ip 127.0.0.1 --int-tcp-port=3111 --ext-tcp-port=3112 --int-http-port=3113 --ext-http-port=3114 --cluster-size=3 --discover-via-dns=false --gossip-seed=127.0.0.1:1113,127.0.0.1:2113
```

You should now have three nodes running together in a cluster. If you kill one of the nodes, it continues running. This binds to the loopback interface. To access Event Store from outside your machine, specify a different IP address for the `--ext-ip` parameter.

## Running on separate machines

### Using gossip seeds

Most important is to understand the "gossip seeds". You are instructing seed locations for when the node first starts and needs to begin gossiping. Any node can be a seed. By giving each node the other nodes you ensure that there is always another node to gossip with, if a quorum can be built. If you want to move this to run on three machines, change the IPs on the command line to something like this:

```powershell
EventStore.ClusterNode.exe --mem-db --log c:\dbs\cluster\log1 --int-ip 192.168.0.1 --ext-ip 192.168.0.1 --int-tcp-port=1112 --ext-tcp-port=1113 --int-http-port=2112 --ext-http-port=2113 --cluster-size=3 --discover-via-dns=false --gossip-seed=192.168.0.2:2112,192.168.0.3:2112
EventStore.ClusterNode.exe --mem-db --log c:\dbs\cluster\log2 --int-ip 192.168.0.2 --ext-ip 192.168.0.2 --int-tcp-port=1112 --ext-tcp-port=1113 --int-http-port=2112 --ext-http-port=2113 --cluster-size=3 --discover-via-dns=false --gossip-seed=192.168.0.1:2112,192.168.0.3:2112
EventStore.ClusterNode.exe --mem-db --log c:\dbs\cluster\log3 --int-ip 192.168.0.3 --ext-ip 192.168.0.3 --int-tcp-port=1112 --ext-tcp-port=1113 --int-http-port=2112 --ext-http-port=2113 --cluster-size=3 --discover-via-dns=false --gossip-seed=192.168.0.1:2112,192.168.0.2:2112
```

### Using DNS

Entering the commands above into each node is tedious and error-prone (especially as the replica set counts change). Another configuration option is to create a DNS entry that points to all the nodes in the cluster and then specify that DNS entry with the appropriate port:

```powershell
EventStore.ClusterNode.exe --mem-db --log c:\dbs\cluster\log1 --int-ip 192.168.0.1 --ext-ip 192.168.0.1 --int-tcp-port=1112 --ext-tcp-port=1113 --int-http-port=2112 --ext-http-port=2113 --cluster-size=3 --cluster-dns eventstore.local --cluster-gossip-port=2112
EventStore.ClusterNode.exe --mem-db --log c:\dbs\cluster\log2 --int-ip 192.168.0.2 --ext-ip 192.168.0.2 --int-tcp-port=1112 --ext-tcp-port=1113 --int-http-port=2112 --ext-http-port=2113 --cluster-size=3 --cluster-dns eventstore.local --cluster-gossip-port=2112
EventStore.ClusterNode.exe --mem-db --log c:\dbs\cluster\log3 --int-ip 192.168.0.3 --ext-ip 192.168.0.3 --int-tcp-port=1112 --ext-tcp-port=1113 --int-http-port=2112 --ext-http-port=2113 --cluster-size=3 --cluster-dns eventstore.local --cluster-gossip-port=2112
```

::: tip
You can also use the method above for HTTP clients to avoid using a load balancer and fall back to round robin DNS for many deployments.
:::

### Run in docker-compose using DNS

Create a file _docker-compose.yaml_ with following content:

@[code lang=yaml](docs/v5/code-examples/server/docker-compose.yaml)

Run containers:
```bash
docker-compose -f docker-compose.yaml up
```

## Internal vs. external networks

You can optionally segregate all Event Store communications to different networks. For example, internal networks for tasks like replication, and external networks for communication between clients. You can place these communications on segregated networks which is often a good idea for both performance and security purposes.

To setup an internal network, use the command line parameters provided above, but prefixed with `int-`. All communications channels also support enabling SSL for the connections.

## HTTP clients

If you want to use the HTTP API, [then you should add a load balancer](/v5/server/setting-up-varnish-in-linux.md) in front of the three nodes. It does not matter which node receives a request as the requests the node are forwarded to the request internally. With this setup, you can lose any one machine with no data loss.

## Native TCP clients

You can connect to the cluster using the native TCP interface. The client APIs support switching between nodes internally. As such if you have a master failover the connection automatically handle retries on another node.

To set up a connection as above, provide gossip seeds to the connection. The client then uses the gossip seeds to begin gossiping information about the cluster.

@[code lang=cpp](docs/clients/dotnet/5.0.8/code-examples/DocsExample/Server/ConnectClusterGossipSeeds.cs)

As in the example above, you can also use DNS to avoid manually specifying the seeds. You add the nodes to a DNS record and then specify that DNS entry to the connection to locate nodes.

@[code lang=cpp](docs/clients/dotnet/5.0.8/code-examples/DocsExample/Server/ConnectClusterGossipDns.cs)

The connection automatically reconnects during node failures. You can control this behaviour with options on the [`ConnectionSettings`](xref:EventStore.ClientAPI.ConnectionSettings) such as limiting retry attempts or frequency. The connection and durable subscription even manage a subscription during node failures, you will not receive duplicated messages over your durable subscription.

::: tip
For those using the closed source version of Event Store `GossipPort` is an alias for `ManagerPort` as the closed source version includes a node manager on each physical node. This allows for controlling many virtual nodes on a machine with easy configuration. The manager also acts as a supervisor for the nodes.
:::
