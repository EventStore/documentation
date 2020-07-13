# Highly-available cluster

## Cluster nodes

EventStoreDB clusters follow a "shared nothing" philosophy, meaning that clustering requires no shared disks for clustering to work. Instead, several database nodes store your data to ensure it isn't lost in case of a drive failure or a node crashing.

EventStoreDB uses a quorum-based replication model, in which a majority of nodes in the cluster must acknowledge that they committed a write to disk before acknowledging the write to the client. This means that to be able to tolerate the failure of _n_ nodes, the cluster must be of size _(2n + 1)_. A three-database-node cluster can continue to accept writes if one node is unavailable. A five-database-node cluster can continue to accept writes if two nodes are unavailable, and so forth.

A typical deployment topology consists of three physical machines, each running one manager node and one database node. Each of the physical machines may have two network interfaces, one for communicating with other cluster members, and one for serving clients. Although it may be preferable in some situations to run over two separate networks. It's also possible to use different TCP ports on one interface.

## Cluster gossip

EventStoreDB uses a quorum-based replication model. When working normally, a cluster has one database node known as a leader, and the remaining nodes are followers. The leader node is responsible for coordinating writes while it is the leader. Database nodes use a consensus algorithm to determine which database node should be master and which should be followers. EventStoreDB bases the decision as to which node should be the leader on a number of factors.

For database nodes to have this information available to them, the nodes gossip with other nodes in the cluster. Gossip runs over the internal (and optionally the external) HTTP interfaces of database nodes, and over both internal and external interfaces of manager nodes.

## Discovering cluster members

Manager and database nodes need to know about one another to gossip. To start this process, you provide gossip seeds or the addresses where it can find other nodes, to each node. When running with manager nodes, it normally uses the following approach:

-   On each physical machine, configure the database node(s) with a gossip seed of the internal HTTP interface of the manager running on the same physical machine.

-   Configure the managers to discover other managers in one of two ways:
    -   via a DNS entry and a well-known gossip port.
    -   via a list of other managers' addresses.

The preferred method is via a DNS entry. To set this up, create a DNS entry for the cluster with an A record pointing to each member of the cluster. Each manager looks up other nodes in the cluster during the startup process based on the DNS name. Since DNS only provides information about addresses, you need to use a consistent TCP port across the cluster for gossip.

<!-- TODO: Should this be more practical? -->

### Cluster size

The cluster size is a pre-defined value. The cluster expects the number of nodes to match this predefined number, otherwise the cluster would be incomplete and therefore unhealthy.

The cluster cannot be dynamically scaled. If you need to change the number of cluster nodes, the cluster size setting must be changed on all nodes before the new node can join.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--gossip-allowed-difference-ms` |
| YAML                 | `GossipAllowedDifferenceMs` |
| Environment variable | `EVENTSTORE_ALLOWED_DIFFERENCE_MS` |

--cluster-size=VALUE<br/> | CLUSTER_SIZE | ClusterSize | The number of nodes in the cluster. (Default: 1)

### Node priority

The node priority setting can be different for each cluster node. This setting defines how nodes get ordered when the cluster elects its leader. You might want to set the priority to give a more powerful node more weight so it gets elected to as a cluster leader.

You might also manipulate the node priority to free up the node from its leadership role. It might be useful if you struggle with scavenging that specific node due to its high load when being elected as the leader. 

Is it high-low or what?

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--node-priority` |
| YAML                 | `NodePriority` |
| Environment variable | `EVENTSTORE_NODE_PRORITY` |

**Default**: `0`.


