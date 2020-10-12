# NAT and port forward

## Override the address

Due to NAT (network address translation), or other reasons a node may not be bound to the address it is reachable from other nodes. For example, the machine has an IP address of `192.168.1.13`, but the node is visible to other nodes as `10.114.12.112`.

Options described below allow you to tell the node that even though it is bound to a given address it should not gossip that address. When returning links over HTTP, EventStoreDB will also use the specified addresses instead of physical addresses, so the clients that use HTTP can follow those links.

Another case when you might want to specify the advertised address although there's no address translation involved. When you configure EventStoreDB to bind to `0.0.0.0`, it will use the first non-loopback address for gossip. It might or might not be the address you want it to use for internal communication. Whilst the best way to avoid such a situation is to [configure the binding](./internal.md#interface) properly, you can also use the `IntIpAdvertiseAs` setting with the correct internal IP address.

| -IntIpAdvertiseAs<br/>--int-ip-advertise-as=VALUE<br/> | INT_IP_ADVERTISE_AS | IntIpAdvertiseAs | Advertise Internal Tcp Address As. |

| -ExtIpAdvertiseAs<br/>--ext-ip-advertise-as=VALUE<br/> | EXT_IP_ADVERTISE_AS | ExtIpAdvertiseAs | Advertise External Tcp Address As. |

If your setup involves not only translating IP addresses, but also changes ports using port forwarding, you would need to change how the ports are advertised too.

When any of those settings are set to zero (default), EventStoreDB won't override the port and will use the configured port when advertising itself.

| -ExtHttpPortAdvertiseAs<br/>--ext-http-port-advertise-as=VALUE<br/> | EXT_HTTP_PORT_ADVERTISE_AS | ExtHttpPortAdvertiseAs | Advertise External Http Port As. (Default: 0) |

| -IntHttpPortAdvertiseAs<br/>--int-http-port-advertise-as=VALUE<br/> | INT_HTTP_PORT_ADVERTISE_AS | IntHttpPortAdvertiseAs | Advertise Internal Http Port As. (Default: 0) |

| -ExtTcpPortAdvertiseAs<br/>--ext-tcp-port-advertise-as=VALUE<br/> | EXT_TCP_PORT_ADVERTISE_AS | ExtTcpPortAdvertiseAs | Advertise External Tcp Port As. (Default: 0) |

| -IntTcpPortAdvertiseAs<br/>--int-tcp-port-advertise-as=VALUE<br/> | INT_TCP_PORT_ADVERTISE_AS | IntTcpPortAdvertiseAs | Advertise Internal Tcp Port As. (Default: 0) |
