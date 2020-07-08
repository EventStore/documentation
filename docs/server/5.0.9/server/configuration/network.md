# Networking

EventStoreDB 5.0 provides two interfaces: proprietary TCP and REST-contract-based HTTP. Nodes in the cluster communicate with each other using the TCP protocol, but use HTTP for discovering other cluster nodes (gossip).

Server nodes separate internal and external communication explicitly. All the communication between the cluster nodes is considered internal and all the clients that connect to the database are external. EventStoreDB allows you to separate network configurations for internal and external communication. For example, you can use different network interfaces on the node. All the internal communication can go over the isolated private network but access for external clients can be configured on another interface, which is connected to a more open network. You can set restrictions on those external interfaces to make your deployment more secure.

There are multiple options that allow configuring TCP and HTTP protocols, internally and externally, on the server.

## Single node

If you run EventStoreDB as a single node, it only uses two ports. The first port is the external HTTP port, and the default value is `2113`. EventStoreDB uses this port for both the client HTTP APIs and for the management HTTP interface.

The second port used is the TCP interface for clients connecting over the client API, and the default for the port is `1113`.

EventStoreDB in Windows tries to add access via `http.sys` automatically for the `2113` port.

You should ensure that these ports are open and allowed via a firewall.

| -ExtIp<br/>--ext-ip=VALUE<br/> | EXT_IP | ExtIp | External IP Address. (Default: 127.0.0.1) |

| -ExtTcpPort<br/>--ext-tcp-port=VALUE<br/> | EXT_TCP_PORT | ExtTcpPort | External TCP Port. (Default: 1113) |

| -ExtHttpPort<br/>--ext-http-port=VALUE<br/> | EXT_HTTP_PORT | ExtHttpPort | External HTTP Port. (Default: 2113) |

## Cluster node

When running in cluster mode the networking for EventStoreDB is more complex. Cluster mode requires 4 ports to run. The ports are for internal HTTP, internal TCP, external HTTP, and external TCP.

<!-- TODO: And they are? -->

The internal and external interfaces allow for separation of traffic. The internal network is where cluster communications runs, while the external interfaces is where client communications runs.

This separation allows for more secure setups such as putting internal communications on a different network than external client communications. For example, you might want to allow clients over HTTP to talk directly to EventStoreDB, and you can move internal communications to a separate network to ensure the management interface and internal operations are not accessible to external traffic.

The external TCP and HTTP ports are similar to the HTTP and TCP ports of a single node deploy. Event Store runs client requests over the HTTP API through the external HTTP port. You can run without the management API on the external interface (internal only). The external and the internal interfaces support the gossip protocol.

You can control whether the admin interface is available on the external HTTP interface using the `admin-on-ext` [option](command-line-arguments.md). You can control whether gossip is enabled on external interfaces with the `gossip-on-ext` [option](command-line-arguments.md) (you normally want it enabled).

You configure the internal TCP and HTTP ports in the same way as the external. All internal communications for the cluster happen over these interfaces. Elections and internal gossip happen over HTTP. Replication and forwarding of client requests happens over the TCP channel.

When setting up a cluster the nodes must be able to reach each other over both the internal HTTP channel and the internal TCP channel. You should ensure that these ports are open on firewalls on the machines and between the machines.

| -IntIp<br/>--int-ip=VALUE<br/> | INT_IP | IntIp | Internal IP Address. (Default: 127.0.0.1) |

| -IntTcpPort<br/>--int-tcp-port=VALUE<br/> | INT_TCP_PORT | IntTcpPort | Internal TCP Port. (Default: 1112) |

| -IntHttpPort<br/>--int-http-port=VALUE<br/> | INT_HTTP_PORT | IntHttpPort | Internal HTTP Port. (Default: 2112) |

## Heartbeat timeouts

EventStoreDB uses heartbeats over all TCP connections to discover dead clients and nodes. Setting heartbeat timeouts requires thought. Set them too short and you receive false positives, set them too long and discovery of dead clients and nodes is slower.

Each heartbeat has two points of configuration. The first is the 'interval', this represents how often the system should consider a heartbeat. Event Store doesn't send a heartbeat for every interval. Event Store sends heartbeat requests if it has not heard from a node within the configured interval. On a busy cluster, you may never see any heartbeats.

The second point of configuration is the 'timeout'. This determines how long EventStoreDB server waits for a client or node to respond to a heartbeat request.

Different environments need different values for these settings. While low numbers work well on a LAN they tend to not work well in the cloud. The defaults are likely fine on a LAN, for the cloud, consider setting:

- An interval of 5000ms.
- A timeout of 1000ms.

::: tip
If in doubt, choose higher numbers. This adds a small period of time to discover a dead client or node and is better than the alternative, which is false positives.
:::

| -IntTcpHeartbeatTimeout<br/>--int-tcp-heartbeat-timeout=VALUE<br/> | INT_TCP_HEARTBEAT_TIMEOUT | IntTcpHeartbeatTimeout | Heartbeat timeout for internal TCP sockets (Default: 700) |

| -ExtTcpHeartbeatTimeout<br/>--ext-tcp-heartbeat-timeout=VALUE<br/> | EXT_TCP_HEARTBEAT_TIMEOUT | ExtTcpHeartbeatTimeout | Heartbeat timeout for external TCP sockets (Default: 1000) |

| -IntTcpHeartbeatInterval<br/>--int-tcp-heartbeat-interval=VALUE<br/> | INT_TCP_HEARTBEAT_INTERVAL | IntTcpHeartbeatInterval     | Heartbeat interval for internal TCP sockets (Default: 700) |

| -ExtTcpHeartbeatInterval<br/>--ext-tcp-heartbeat-interval=VALUE<br/> | EXT_TCP_HEARTBEAT_INTERVAL | ExtTcpHeartbeatInterval | Heartbeat interval for external TCP sockets (Default: 2000) |

## Advertise as

Due to NAT, or other reasons a node may not be bound to the address it is reachable from other nodes. For example, the machine has an IP address of `192.168.1.13`, but the node is visible to other nodes as 10.114.12.112.

The [option](command-line-arguments.md) `advertise-as` allows you to tell the node that even though it is bound to a given address it should not gossip that address. Instead it uses the address that you tell it to use. In the example above you would configure"

```
--ext-ip 192.168.1.13 --advertise-as 10.114.12.112
```

Or use the equivalent configuration via environment variables or a configuration file. The relevant options are listed below.

| -IntIpAdvertiseAs<br/>--int-ip-advertise-as=VALUE<br/> | INT_IP_ADVERTISE_AS | IntIpAdvertiseAs | Advertise Internal Tcp Address As. |

| -ExtIpAdvertiseAs<br/>--ext-ip-advertise-as=VALUE<br/> | EXT_IP_ADVERTISE_AS | ExtIpAdvertiseAs | Advertise External Tcp Address As. |

If your setup involves not only translating IP addresses, but also changes ports using port forwarding, you would need to change how the ports are advertised too.

| -ExtHttpPortAdvertiseAs<br/>--ext-http-port-advertise-as=VALUE<br/> | EXT_HTTP_PORT_ADVERTISE_AS | ExtHttpPortAdvertiseAs | Advertise External Http Port As. (Default: 0) |

| -IntHttpPortAdvertiseAs<br/>--int-http-port-advertise-as=VALUE<br/> | INT_HTTP_PORT_ADVERTISE_AS | IntHttpPortAdvertiseAs | Advertise Internal Http Port As. (Default: 0) |

| -ExtTcpPortAdvertiseAs<br/>--ext-tcp-port-advertise-as=VALUE<br/> | EXT_TCP_PORT_ADVERTISE_AS | ExtTcpPortAdvertiseAs | Advertise External Tcp Port As. (Default: 0) |

| -IntTcpPortAdvertiseAs<br/>--int-tcp-port-advertise-as=VALUE<br/> | INT_TCP_PORT_ADVERTISE_AS | IntTcpPortAdvertiseAs | Advertise Internal Tcp Port As. (Default: 0) |

## HTTP protocol

EventStoreDB uses the HTTP protocol for several purposes:

- Exposing the [HTTP API](../../http-api) for database clients
- Using the same API for the AdminUI
- Gossip protocol for discovering other cluster members

| -IntHttpPrefixes<br/>--int-http-prefixes=VALUE<br/> | INT_HTTP_PREFIXES | IntHttpPrefixes | The prefixes that the internal HTTP server should respond to. (Default: n/a) |

| -ExtHttpPrefixes<br/>--ext-http-prefixes=VALUE<br/> | EXT_HTTP_PREFIXES | ExtHttpPrefixes | The prefixes that the external HTTP server should respond to. (Default: n/a) |

| -AddInterfacePrefixes<br/>--add-interface-prefixes=VALUE<br/> 
Is this http/https?

## Exposing endpoints

If you need to disable some of the HTTP endpoints on the external HTTP interface, you can change some of the settings below. It is possible to disable the Admin UI, stats and gossip port to be exposed externally.

Whilst the Admin UI and stats endpoints don't influence the cluster functionality, disabling the gossip protocol on the external HTTP interface might result in cluster nodes not being able to discover each other. If you disable the gossip port on the external HTTP interface, make sure that either the gossip DNS or gossip seed setting contains the correct IP addresses or wildcard DNS name tha point to IP addresses of the internal interfaces of your cluster nodes.

| -AdminOnExt<br/>--admin-on-ext=VALUE<br/> | ADMIN_ON_EXT | AdminOnExt | Whether or not to run the admin ui on the external HTTP endpoint (Default: True) |

| -StatsOnExt<br/>--stats-on-ext=VALUE<br/> | STATS_ON_EXT | StatsOnExt | Whether or not to accept statistics requests on the external HTTP endpoint, needed if you use admin ui (Default: True) |

| -GossipOnExt<br/>--gossip-on-ext=VALUE<br/> | GOSSIP_ON_EXT | GossipOnExt | Whether or not to accept gossip requests on the external HTTP endpoint (Default: True) |


