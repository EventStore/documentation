# HTTP configuration

HTTP is the primary protocol for EventStoreDB. It is used gRPC communication and HTTP APIs (management, gossip and diagnostics).

Unlike for [TCP protocol](./tcp.md), there is no separation between internal and external communication. The HTTP endpoint always binds to the IP address configured in the `ExtIp` setting.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--ext-ip` |
| YAML                 | `ExtIp` |
| Environment variable | `EVENTSTORE_EXT_IP` |

When the `ExtIp` setting is not provided, EventStoreDB will use the first available non-loopback address. You can also bind HTTP to all available interfaces using `0.0.0.0` as the setting value. If you do that, you'd need to configure the `ExtHostAdvertiseAs` setting (read mode [here](./nat.md)), since `0.0.0.0` is not a valid IP address to connect from the outside world.

The default HTTP port is `2113`. Depending on the [security settings](../security/) of the node, it either responds over plain HTTP or via HTTPS. There is no redirect, so if you try reaching a secure node via HTTP, you can an empty response.

You can change the HTTP port using the `HttpPort` setting:

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--http-port` |
| YAML                 | `HttpPort` |
| Environment variable | `EVENTSTORE_HTTP_PORT` |

**Default**: `2113`

If your network setup requires any kind of IP address, DNS name and port translation for internal or external communication, you can use available [address translation](./nat.md) settings.
