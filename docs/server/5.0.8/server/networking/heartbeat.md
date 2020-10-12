# Heartbeat timeouts

EventStoreDB uses heartbeats over all TCP connections to discover dead clients and nodes. Setting heartbeat timeouts requires thought. Set them too short and you receive false positives, set them too long and discovery of dead clients and nodes is slower.

Each heartbeat has two points of configuration. The first is the 'interval', this represents how often the system should consider a heartbeat. EventStoreDB doesn't send a heartbeat for every interval. EventStoreDB sends heartbeat requests if it has not heard from a node within the configured interval. On a busy cluster, you may never see any heartbeats.

The second point of configuration is the _timeout_. This determines how long EventStoreDB server waits for a client or node to respond to a heartbeat request.

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
