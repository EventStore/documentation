# Networking

| Command line parameter | Environment variable prefixed with `EVENTSTORE_` | Config file YAML | Description |
|:---------|:---------|:-------------|:----------|
| -IntIp<br/>--int-ip=VALUE<br/> | INT_IP | IntIp | Internal IP Address. (Default: 127.0.0.1) |
| -ExtIp<br/>--ext-ip=VALUE<br/> | EXT_IP | ExtIp | External IP Address. (Default: 127.0.0.1) |
| -IntHttpPort<br/>--int-http-port=VALUE<br/> | INT_HTTP_PORT | IntHttpPort | Internal HTTP Port. (Default: 2112) |
| -ExtHttpPort<br/>--ext-http-port=VALUE<br/> | EXT_HTTP_PORT | ExtHttpPort | External HTTP Port. (Default: 2113) |
| -IntTcpPort<br/>--int-tcp-port=VALUE<br/> | INT_TCP_PORT | IntTcpPort | Internal TCP Port. (Default: 1112) |
| -IntSecureTcpPort<br/>--int-secure-tcp-port=VALUE<br/> | INT_SECURE_TCP_PORT | IntSecureTcpPort | Internal Secure TCP Port. (Default: 0) |
| -ExtTcpPort<br/>--ext-tcp-port=VALUE<br/> | EXT_TCP_PORT | ExtTcpPort | External TCP Port. (Default: 1113) |
| -ExtSecureTcpPortAdvertiseAs<br/>--ext-secure-tcp-port-advertise-as=VALUE<br/> | EXT_SECURE_TCP_PORT_ADVERTISE_AS | ExtSecureTcpPortAdvertiseAs | Advertise Secure External Tcp Port As. (Default: 0) |
| -ExtSecureTcpPort<br/>--ext-secure-tcp-port=VALUE<br/> | EXT_SECURE_TCP_PORT | ExtSecureTcpPort | External Secure TCP Port. (Default: 0) |
| -ExtIpAdvertiseAs<br/>--ext-ip-advertise-as=VALUE<br/> | EXT_IP_ADVERTISE_AS | ExtIpAdvertiseAs | Advertise External Tcp Address As. |
| -ExtTcpPortAdvertiseAs<br/>--ext-tcp-port-advertise-as=VALUE<br/> | EXT_TCP_PORT_ADVERTISE_AS | ExtTcpPortAdvertiseAs | Advertise External Tcp Port As. (Default: 0) |
| -ExtHttpPortAdvertiseAs<br/>--ext-http-port-advertise-as=VALUE<br/> | EXT_HTTP_PORT_ADVERTISE_AS | ExtHttpPortAdvertiseAs | Advertise External Http Port As. (Default: 0) |
| -IntIpAdvertiseAs<br/>--int-ip-advertise-as=VALUE<br/> | INT_IP_ADVERTISE_AS | IntIpAdvertiseAs | Advertise Internal Tcp Address As. |
| -IntSecureTcpPortAdvertiseAs<br/>--int-secure-tcp-port-advertise-as=VALUE<br/> | INT_SECURE_TCP_PORT_ADVERTISE_AS | IntSecureTcpPortAdvertiseAs | Advertise Secure Internal Tcp Port As. (Default: 0) |
| -IntTcpPortAdvertiseAs<br/>--int-tcp-port-advertise-as=VALUE<br/> | INT_TCP_PORT_ADVERTISE_AS | IntTcpPortAdvertiseAs | Advertise Internal Tcp Port As. (Default: 0) |
| -IntHttpPortAdvertiseAs<br/>--int-http-port-advertise-as=VALUE<br/> | INT_HTTP_PORT_ADVERTISE_AS | IntHttpPortAdvertiseAs | Advertise Internal Http Port As. (Default: 0) |
| -IntTcpHeartbeatTimeout<br/>--int-tcp-heartbeat-timeout=VALUE<br/> | INT_TCP_HEARTBEAT_TIMEOUT | IntTcpHeartbeatTimeout | Heartbeat timeout for internal TCP sockets (Default: 700) |
| -ExtTcpHeartbeatTimeout<br/>--ext-tcp-heartbeat-timeout=VALUE<br/> | EXT_TCP_HEARTBEAT_TIMEOUT | ExtTcpHeartbeatTimeout | Heartbeat timeout for external TCP sockets (Default: 1000) |
| -IntTcpHeartbeatInterval<br/>--int-tcp-heartbeat-interval=VALUE<br/> | INT_TCP_HEARTBEAT_INTERVAL | IntTcpHeartbeatInterval     | Heartbeat interval for internal TCP sockets (Default: 700) |
| -ExtTcpHeartbeatInterval<br/>--ext-tcp-heartbeat-interval=VALUE<br/> | EXT_TCP_HEARTBEAT_INTERVAL | ExtTcpHeartbeatInterval | Heartbeat interval for external TCP sockets (Default: 2000) |
| -GossipOnSingleNode<br/>--gossip-on-single-node=VALUE<br/> | GOSSIP_ON_SINGLE_NODE | GossipOnSingleNode | When enabled tells a single node to run gossip as if it is a cluster (Default: False) |
| -AdminOnExt<br/>--admin-on-ext=VALUE<br/> | ADMIN_ON_EXT | AdminOnExt | Whether or not to run the admin ui on the external HTTP endpoint (Default: True) |
| -StatsOnExt<br/>--stats-on-ext=VALUE<br/> | STATS_ON_EXT | StatsOnExt | Whether or not to accept statistics requests on the external HTTP endpoint, needed if you use admin ui (Default: True) |
| -GossipOnExt<br/>--gossip-on-ext=VALUE<br/> | GOSSIP_ON_EXT | GossipOnExt | Whether or not to accept gossip requests on the external HTTP endpoint (Default: True) |
| -IntHttpPrefixes<br/>--int-http-prefixes=VALUE<br/> | INT_HTTP_PREFIXES | IntHttpPrefixes | The prefixes that the internal HTTP server should respond to. (Default: n/a) |
| -ExtHttpPrefixes<br/>--ext-http-prefixes=VALUE<br/> | EXT_HTTP_PREFIXES | ExtHttpPrefixes | The prefixes that the external HTTP server should respond to. (Default: n/a) |
| -AddInterfacePrefixes<br/>--add-interface-prefixes=VALUE<br/> 
| -ConnectionPendingSendBytesThreshold<br/>--connection-pending-send-bytes-threshold=VALUE<br/> | CONNECTION_PENDING_SEND_BYTES_THRESHOLD | ConnectionPendingSendBytesThreshold | The maximum number of pending send bytes allowed before a connection is closed. (Default: 10485760) |

| -UseInternalSsl<br/>--use-internal-ssl=VALUE<br/> | USE_INTERNAL_SSL | UseInternalSsl | Whether to use secure internal communication. (Default: False) |
| -DisableInsecureTCP<br/>--disable-insecure-tcp=VALUE<br/> | DISABLE_INSECURE_TCP | DisableInsecureTCP | Whether to disable insecure TCP communication (Default: False) |
| -SslTargetHost<br/>--ssl-target-host=VALUE<br/> | SSL_TARGET_HOST | SslTargetHost | Target host of server's SSL certificate. (Default: n/a) |
| -SslValidateServer<br/>--ssl-validate-server=VALUE<br/> | SSL_VALIDATE_SERVER | SslValidateServer | Whether to validate that server's certificate is trusted. (Default: True) |
| -EnableTrustedAuth<br/>--enable-trusted-auth=VALUE<br/> | ENABLE_TRUSTED_AUTH 
