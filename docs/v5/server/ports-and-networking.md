---
outputFileName: index.html
---

# Ports and networking

## Single node

If you run Event Store as a single node, it only uses two ports. The first port is the external HTTP port, and the default value is `2113`. Event Store uses this port for both the client HTTP APIs and for the management HTTP interface.

The second port used is the TCP interface for clients connecting over the client API, and the default for the port is `1113`.

Event Store in Windows tries to add access via `http.sys` automatically for the `2113` port.

You should ensure that these ports are open and allowed via a firewall.

## Cluster node

When running in cluster mode the networking for Event Store is more complex. Cluster mode requires 4 ports to run. The ports are for internal HTTP, internal TCP, external HTTP, and external TCP.

<!-- TODO: And they are? -->

The internal and external interfaces allow for separation of traffic. The internal network is where cluster communications runs, while the external interfaces is where client communications runs.

This separation allows for more secure setups such as putting internal communications on a different network than external client communications. For example, you might want to allow clients over HTTP to talk directly to Event Store, and you can move internal communications to a separate network to ensure the management interface and internal operations are not accessible to external traffic.

The external TCP and HTTP ports are similar to the HTTP and TCP ports of a single node deploy. Event Store runs client requests over the HTTP API through the external HTTP port. You can run without the management API on the external interface (internal only). The external and the internal interfaces support the gossip protocol.

You can control whether the admin interface is available on the external HTTP interface using the `admin-on-ext` [option](~/server/command-line-arguments.md). You can control whether gossip is enabled on external interfaces with the `gossip-on-ext` [option](~/server/command-line-arguments.md) (you normally want it enabled).

You configure the internal TCP and HTTP ports in the same way as the external. All internal communications for the cluster happen over these interfaces. Elections and internal gossip happen over HTTP. Replication and forwarding of client requests happens over the TCP channel.

When setting up a cluster the nodes must be able to reach each other over both the internal HTTP channel and the internal TCP channel. You should ensure that these ports are open on firewalls on the machines and between the machines.

## Heartbeat timeouts

Event Store uses heartbeats over all TCP connections to discover dead clients and nodes. Setting heartbeat timeouts requires thought. Set them too short and you receive false positives, set them too long and discovery of dead clients and nodes is slower.

Each heartbeat has two points of configuration. The first is the 'interval', this represents how often the system should consider a heartbeat. Event Store doesn't send a heartbeat for every interval. Event Store sends heartbeat requests if it has not heard from a node within the configured interval. On a busy cluster, you may never see any heartbeats.

The second point of configuration is the 'timeout'. This determines how long Event Store waits for a client or node to respond to a heartbeat request.

Different environments need different values for these settings. While low numbers work well on a LAN they tend to not work well in the cloud. The defaults are likely fine on a LAN, for the cloud, consider setting:

- An interval of 5000ms.
- A timeout of 1000ms.

> [!TIP]
> If in doubt, choose higher numbers. This adds a small period of time to discover a dead client or node and is better than the alternative, which is false positives.

## Advertise as

Due to NAT, or other reasons a node may not be bound to the address it is reachable from other nodes. For example, the machine has an IP address of 192.168.1.13, but the node is visible to other nodes as 10.114.12.112.

The [option](~/server/command-line-arguments.md) `advertise-as` allows you to tell the node that even though it is bound to a given address it should not gossip that address. Instead it uses the address that you tell it to use. In the example above you would configure"

```bash
--ext-ip 192.168.1.13 --advertise-as 10.114.12.112
```

Or use the equivalent configuration via environment variables or a configuration file.