# Networking

EventStoreDB 5.0 provides two interfaces: proprietary TCP and REST-contract-based HTTP. Nodes in the cluster communicate with each other using the TCP protocol, but use HTTP for discovering other cluster nodes (gossip).

Server nodes separate internal and external communication explicitly. All the communication between the cluster nodes is considered internal and all the clients that connect to the database are external. EventStoreDB allows you to separate network configurations for internal and external communication. For example, you can use different network interfaces on the node. All the internal communication can go over the isolated private network but access for external clients can be configured on another interface, which is connected to a more open network. You can set restrictions on those external interfaces to make your deployment more secure.

There are multiple options that allow configuring TCP and HTTP protocols, internally and externally, on the server.

## Interface options

| -IntIp<br/>--int-ip=VALUE<br/> | INT_IP | IntIp | Internal IP Address. (Default: 127.0.0.1) |

| -IntIpAdvertiseAs<br/>--int-ip-advertise-as=VALUE<br/> | INT_IP_ADVERTISE_AS | IntIpAdvertiseAs | Advertise Internal Tcp Address As. |

| -ExtIp<br/>--ext-ip=VALUE<br/> | EXT_IP | ExtIp | External IP Address. (Default: 127.0.0.1) |

| -ExtIpAdvertiseAs<br/>--ext-ip-advertise-as=VALUE<br/> | EXT_IP_ADVERTISE_AS | ExtIpAdvertiseAs | Advertise External Tcp Address As. |

## HTTP protocol

EventStoreDB uses the HTTP protocol for several purposes:

- Exposing the [HTTP API](../../http-api) for database clients
- Using the same API for the AdminUI
- Gossip protocol for discovering other cluster members

| -IntHttpPort<br/>--int-http-port=VALUE<br/> | INT_HTTP_PORT | IntHttpPort | Internal HTTP Port. (Default: 2112) |

| -ExtHttpPort<br/>--ext-http-port=VALUE<br/> | EXT_HTTP_PORT | ExtHttpPort | External HTTP Port. (Default: 2113) |

| -ExtHttpPortAdvertiseAs<br/>--ext-http-port-advertise-as=VALUE<br/> | EXT_HTTP_PORT_ADVERTISE_AS | ExtHttpPortAdvertiseAs | Advertise External Http Port As. (Default: 0) |

| -IntHttpPortAdvertiseAs<br/>--int-http-port-advertise-as=VALUE<br/> | INT_HTTP_PORT_ADVERTISE_AS | IntHttpPortAdvertiseAs | Advertise Internal Http Port As. (Default: 0) |

| -IntHttpPrefixes<br/>--int-http-prefixes=VALUE<br/> | INT_HTTP_PREFIXES | IntHttpPrefixes | The prefixes that the internal HTTP server should respond to. (Default: n/a) |

| -ExtHttpPrefixes<br/>--ext-http-prefixes=VALUE<br/> | EXT_HTTP_PREFIXES | ExtHttpPrefixes | The prefixes that the external HTTP server should respond to. (Default: n/a) |

| -AddInterfacePrefixes<br/>--add-interface-prefixes=VALUE<br/> 
Is this http/https?

| -UseInternalSsl<br/>--use-internal-ssl=VALUE<br/> | USE_INTERNAL_SSL | UseInternalSsl | Whether to use secure internal communication. (Default: False) |

| -SslTargetHost<br/>--ssl-target-host=VALUE<br/> | SSL_TARGET_HOST | SslTargetHost | Target host of server's SSL certificate. (Default: n/a) |

| -SslValidateServer<br/>--ssl-validate-server=VALUE<br/> | SSL_VALIDATE_SERVER | SslValidateServer | Whether to validate that server's certificate is trusted. (Default: True) |

| -EnableTrustedAuth<br/>--enable-trusted-auth=VALUE<br/> | ENABLE_TRUSTED_AUTH 
What is this???

## TCP protocol

| -IntTcpPort<br/>--int-tcp-port=VALUE<br/> | INT_TCP_PORT | IntTcpPort | Internal TCP Port. (Default: 1112) |

| -ExtTcpPort<br/>--ext-tcp-port=VALUE<br/> | EXT_TCP_PORT | ExtTcpPort | External TCP Port. (Default: 1113) |

| -IntSecureTcpPort<br/>--int-secure-tcp-port=VALUE<br/> | INT_SECURE_TCP_PORT | IntSecureTcpPort | Internal Secure TCP Port. (Default: 0) |

| -ExtSecureTcpPortAdvertiseAs<br/>--ext-secure-tcp-port-advertise-as=VALUE<br/> | EXT_SECURE_TCP_PORT_ADVERTISE_AS | ExtSecureTcpPortAdvertiseAs | Advertise Secure External Tcp Port As. (Default: 0) |

| -ExtSecureTcpPort<br/>--ext-secure-tcp-port=VALUE<br/> | EXT_SECURE_TCP_PORT | ExtSecureTcpPort | External Secure TCP Port. (Default: 0) |

| -ExtTcpPortAdvertiseAs<br/>--ext-tcp-port-advertise-as=VALUE<br/> | EXT_TCP_PORT_ADVERTISE_AS | ExtTcpPortAdvertiseAs | Advertise External Tcp Port As. (Default: 0) |

| -IntSecureTcpPortAdvertiseAs<br/>--int-secure-tcp-port-advertise-as=VALUE<br/> | INT_SECURE_TCP_PORT_ADVERTISE_AS | IntSecureTcpPortAdvertiseAs | Advertise Secure Internal Tcp Port As. (Default: 0) |

| -IntTcpPortAdvertiseAs<br/>--int-tcp-port-advertise-as=VALUE<br/> | INT_TCP_PORT_ADVERTISE_AS | IntTcpPortAdvertiseAs | Advertise Internal Tcp Port As. (Default: 0) |

| -IntTcpHeartbeatTimeout<br/>--int-tcp-heartbeat-timeout=VALUE<br/> | INT_TCP_HEARTBEAT_TIMEOUT | IntTcpHeartbeatTimeout | Heartbeat timeout for internal TCP sockets (Default: 700) |

| -ExtTcpHeartbeatTimeout<br/>--ext-tcp-heartbeat-timeout=VALUE<br/> | EXT_TCP_HEARTBEAT_TIMEOUT | ExtTcpHeartbeatTimeout | Heartbeat timeout for external TCP sockets (Default: 1000) |

| -IntTcpHeartbeatInterval<br/>--int-tcp-heartbeat-interval=VALUE<br/> | INT_TCP_HEARTBEAT_INTERVAL | IntTcpHeartbeatInterval     | Heartbeat interval for internal TCP sockets (Default: 700) |

| -ExtTcpHeartbeatInterval<br/>--ext-tcp-heartbeat-interval=VALUE<br/> | EXT_TCP_HEARTBEAT_INTERVAL | ExtTcpHeartbeatInterval | Heartbeat interval for external TCP sockets (Default: 2000) |

| -DisableInsecureTCP<br/>--disable-insecure-tcp=VALUE<br/> | DISABLE_INSECURE_TCP | DisableInsecureTCP | Whether to disable insecure TCP communication (Default: False) |
How can it be false by default if 5.0 has insecure by default?


## Exposing endpoints

If you need to disable some of the HTTP endpoints on the external HTTP interface, you can change some of the settings below. It is possible to disable the Admin UI, stats and gossip port to be exposed externally.

Whilst the Admin UI and stats endpoints don't influence the cluster functionality, disabling the gossip protocol on the external HTTP interface might result in cluster nodes not being able to discover each other. If you disable the gossip port on the external HTTP interface, make sure that either the gossip DNS or gossip seed setting contains the correct IP addresses or wildcard DNS name tha point to IP addresses of the internal interfaces of your cluster nodes.

| -AdminOnExt<br/>--admin-on-ext=VALUE<br/> | ADMIN_ON_EXT | AdminOnExt | Whether or not to run the admin ui on the external HTTP endpoint (Default: True) |

| -StatsOnExt<br/>--stats-on-ext=VALUE<br/> | STATS_ON_EXT | StatsOnExt | Whether or not to accept statistics requests on the external HTTP endpoint, needed if you use admin ui (Default: True) |

| -GossipOnExt<br/>--gossip-on-ext=VALUE<br/> | GOSSIP_ON_EXT | GossipOnExt | Whether or not to accept gossip requests on the external HTTP endpoint (Default: True) |

## Candidates for removal

| -ConnectionPendingSendBytesThreshold<br/>--connection-pending-send-bytes-threshold=VALUE<br/> | CONNECTION_PENDING_SEND_BYTES_THRESHOLD | ConnectionPendingSendBytesThreshold | The maximum number of pending send bytes allowed before a connection is closed. (Default: 10485760) |

