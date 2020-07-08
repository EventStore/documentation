# Cluster settings

Nodes that are part of a cluster cannot discover other nodes unless they are told how to do so. Use settings described on this page to configure your cluster.
 
All cluster nodes should have the same settings when it comes to clustering.

## Cluster nodes



### Cluster size

The cluster size is a pre-defined value. The cluster expects the number of nodes to match this predefined number, otherwise the cluster would be incomplete and therefore unhealthy.

The cluster cannot be dynamically scaled. If you need to change the number of cluster nodes, the cluster size setting must be changed on all nodes before the new node can join.

--cluster-size=VALUE<br/> | CLUSTER_SIZE | ClusterSize | The number of nodes in the cluster. (Default: 1)

### Node priority

The node priority setting can be different for each cluster node. This setting defines how nodes get ordered when the cluster elects its leader. You might want to set the priority to give a more powerful node more weight so it gets elected to as a cluster leader.

You might also manipulate the node priority to free up the node from its leadership role. It might be useful if you struggle with scavenging that specific node due to its high load when being elected as the leader. 

Is it high-low or what?

--node-priority=VALUE<br/> | NODE_PRIORITY | NodePriority | The node priority used during master election (Default: 0) |


## Gossip protocol

Cluster nodes use the gossip protocol to discover each other and select the cluster leader. There could be only one leader and each client application connecting to the cluster would always be directed to the leader node. All writes are executed by the leader node unconditionally, confirmed by a number of other nodes, defined in [acknowledgement](#acknowledgements) section of this page. Subscriptions can connect to follower nodes to offload reads from the leader node.

You need to tell each cluster node how to find other cluster nodes. There are two ways of doing it.

### Using DNS

First, you can use the DNS discovery. If you tell EventStoreDB to use DNS for its gossip, the server will resolve the DNS name to a list of IP addresses and connect to each of those addresses to find other nodes. This method is very flexible because you can change the list of nodes on your DNS server without changing the cluster configuration. The DNS method is also useful in automated deployments scenario when you control both the cluster deployment and the DNS server from your infrastructure-as-code scripts.

To use the DNS discovery, you need to set the `ClusterDns` option to the DNS name that resolves to a list of IP addresses for the cluster nodes. You also need to have the `DiscoverViaDns` option to be set to `true` but it is its default value.

--discover-via-dns=VALUE<br/> | DISCOVER_VIA_DNS | DiscoverViaDns | Whether to use DNS lookup to discover other cluster nodes. (Default: True) |

--cluster-dns=VALUE<br/> | CLUSTER_DNS | ClusterDns | DNS name from which other nodes can be discovered. (Default: fake.dns) |

### Using IP addresses

If you don't want or cannot use the DNS-based configuration, it is possible to tell cluster nodes to call other nodes using their IP addresses. This method is a bit more cumbersome, because each node has to have the list of addresses for other nodes configured, but not its own address.

--gossip-seed=VALUE<br/> | GOSSIP_SEED | GossipSeed | Endpoints for other cluster nodes from which to seed gossip (Default: n/a) |

## ClusterGossipPort

Is it used? I think it's just the external http?

--cluster-gossip-port=VALUE<br/> | CLUSTER_GOSSIP_PORT | ClusterGossipPort | The port on which cluster nodes' managers are running. (Default: 30777) |

## Gossip interval

Cluster nodes try to ensure that the communication with their neighbour nodes isn't broken. They use gossip protocol and call each other after a specified period of time. This period is called the gossip interval. You can change the `GossipInvervalMs` setting so cluster nodes check in with each other more or less frequently.

The default value is one second. For cloud deployments, we recommend using two seconds instead (2000 ms).

--gossip-interval-ms=VALUE<br/> | GOSSIP_INTERVAL_MS | GossipIntervalMs | The interval in ms that nodes should try to gossip with each other (Default: 1000) |

## Time difference toleration

EventStoreDB expects the time on cluster nodes to be in sync. It is however possible that nodes get their clock desynchronized by a small value. This settings allows adjusting the tolerance of how much the clock on different nodes might be out of sync.

If different nodes have their clock out of sync for a number of milliseconds that exceeds the value of this setting, the gossip gets rejected and the node won't be accepted as the cluster member.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--gossip-allowed-difference-ms` |
| YAML                 | `GossipAllowedDifferenceMs` |
| Environment variable | `EVENTSTORE_ALLOWED_DIFFERENCE_MS` |

**Default**: `60000` (in milliseconds), which is one minute.

## Gossip timeout

When nodes call each other using gossip protocol to understand the cluster status, a busy node might delay the response. When a node isn't getting a response from another node, it might consider that other node as dead. Such a situation might trigger the election process.

If your cluster network is congested, you might increase the gossip timeout using the `GossipTimeoutMs` setting, so nodes will be more tolerant to delayed gossip responses. The default value is half a second, but for cloud deployments we recommend setting it to 2.5 seconds (2500 ms).

--gossip-timeout-ms=VALUE<br/> | GOSSIP_TIMEOUT_MS | GossipTimeoutMs | The timeout in ms of gossip to another node. (Default: 500) |


## Gossip on single node

When you run a single-node instance of EventStoreDB, the gossip communication is unnecessary. However, if your production environment uses a multi-node cluster and the test environment runs on a single node, you might want to keep the connection style consistent. EventStoreDB clients use either a single-node or gossip-style connection. So, to prevent changing the connection style, you might want to connect to your single-node instance using the gossip protocol as well. To do so, you'd need to enable gossip for that instance as it is disabled by default.

| -GossipOnSingleNode<br/>--gossip-on-single-node=VALUE<br/> | GOSSIP_ON_SINGLE_NODE | GossipOnSingleNode | When enabled tells a single node to run gossip as if it is a cluster (Default: False) |

## Acknowledgements

## CommitCount

--commit-count=VALUE<br/> | COMMIT_COUNT | CommitCount | The number of nodes which must acknowledge commits before acknowledging to a client. (Default: -1) |

## PrepareCount

--prepare-count=VALUE<br/> | PREPARE_COUNT | PrepareCount | The number of nodes which must acknowledge prepares. (Default: -1) |
