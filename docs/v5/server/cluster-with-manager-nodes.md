---
outputFileName: index.html
commercial: true
---

<!-- TODO: How much of this is also relevant to OSS? -->

# Setting up a cluster with manager nodes

High availability Event Store allows you to run more than one node as a cluster. There are two modes available for clustering:

-   [With database nodes only](~/server/cluster-without-manager-nodes.md) (open source and commercial)
-   With manager nodes and database nodes (commercial only)

This document covers setting up Event Store with manager nodes and database nodes.

[!include[<Node number>](~/partials/_cluster-size.md)]

## Manager nodes

Each physical (or virtual) machine in an Event Store cluster typically runs one manager node and one database node. It's also possible to have multiple database nodes per physical machine, running under one manager node.

Manager nodes have a number of responsibilities:

-   They are responsible for starting the database nodes and supervising them to ensure they rest in case of a crash or termination owing to abnormal circumstances. Event Store calls this the _watchdog_ service.
-   They communicate with other manager nodes to find cluster state, and relay that information to the database nodes under management.
-   They provide a known endpoint for clients to connect to and discover cluster information.
-   When running on Windows, manager nodes run as Windows services.

## Configuring nodes

Each database or manager node [can have a variety of configuration sources](~/server/command-line-arguments.md). Each source has a priority and determines running configuration by evaluating each source and applying the option from the source with the highest priority.

From lowest to highest priority, the sources of configuration are:

-   Default settings.
-   Settings specified in a configuration file written using YAML.
-   Settings specified in environment variables.
-   Settings specified as command line options to the node.

You can check the configuration of a node by passing the `-WhatIf` flag to the process.

## Typical deployment topologies

Event Store clusters follow a "shared nothing" philosophy, meaning that clustering requires no shared disks for clustering to work. Instead, several database nodes store your data to ensure it isn't lost in case of a drive failure or a node crashing.

Event Store uses a quorum-based replication model, in which a majority of nodes in the cluster must acknowledge that they committed a write to disk before acknowledging the write to the client. This means that to be able to tolerate the failure of _n_ nodes, the cluster must be of size _(2n + 1)_. A three-database-node cluster can continue to accept writes if one node is unavailable. A five-database-node cluster can continue to accept writes if two nodes are unavailable, and so forth.

A typical deployment topology consists of three physical machines, each running one manager node and one database node. Each of the physical machines may have two network interfaces, one for communicating with other cluster members, and one for serving clients. Although it may be preferable in some situations to run over two separate networks. It's also possible to use different TCP ports on one interface.

## Cluster gossip

Event Store uses a quorum-based replication model. When working normally, a cluster has one database node known as a master, and the remaining nodes are slaves. The master node is responsible for coordinating writes while it is the master. Database nodes use a consensus algorithm to determine which database node should be master and which should be slaves. Event Store bases the decision as to which node should be the master on a number of factors ([some of which are configurable](~/server/command-line-arguments.md#cluster-options)).

For database nodes to have this information available to them, the nodes gossip with other nodes in the cluster. Gossip runs over the internal (and optionally the external) HTTP interfaces of database nodes, and over both internal and external interfaces of manager nodes.

## Discovering cluster members

Manager and database nodes need to know about one another to gossip. To start this process, you provide gossip seeds or the addresses where it can find other nodes, to each node. When running with manager nodes, it normally uses the following approach:

-   On each physical machine, configure the database node(s) with a gossip seed of the internal HTTP interface of the manager running on the same physical machine.

-   Configure the managers to discover other managers in one of two ways:
    -   via a DNS entry and a well-known gossip port.
    -   via a list of other managers' addresses.

The preferred method is via a DNS entry. To set this up, create a DNS entry for the cluster with an A record pointing to each member of the cluster. Each manager looks up other nodes in the cluster during the startup process based on the DNS name. Since DNS only provides information about addresses, you need to use a consistent TCP port across the cluster for gossip.

<!-- TODO: Should this be more practical? -->

## Example 1 - a three-machine cluster

This example shows the configuration for a three node cluster, running in the typical setup of one manager node and one database node per physical machine, with cluster discovery via DNS. Each machine has one network interface, therefore uses different ports for the internal and external traffic. All nodes, in this case, are running Windows, so the manager nodes run as Windows services.

The important points for writing configuration files are:

-   Node IP Addresses: 192.168.1.11, 192.168.1.12 and 192.168.13
-   TCP ports: (defaults):
    -   Manager Nodes:
        -   Internal HTTP: 30777
        -   External HTTP: 30778
    -   Database Nodes:
        -   Internal TCP: 1112
        -   External TCP: 1113
        -   Internal HTTP: 2112
        -   External HTTP: 2113
-   DNS Entry Name: cluster1.eventstore.local

To configure the cluster correctly, there are a number of steps to follow:

1.  Set up a DNS entry named `cluster1.eventstore.local` with an A record for each node.
2.  Write the database node configuration file for each machine.
3.  Write the manager node configuration file for each machine.
4.  Write the watchdog configuration file for each machine.
5.  Deploy Event Store and the configuration files to each machine.
6.  (**Windows-specific**) Add HTTP URL ACL entries to allow starting HTTP servers on the required HTTP ports.
7.  (**Windows-specific**) Install the manager as a service and start the service.
8.  (**Linux-specific**) Configure the manager as a daemon.

### DNS entry

It depends on which DNS server you use, but the eventual lookup should read:

```bash
$ nslookup cluster1.eventstore.local

Server: 192.168.1.2
Address:  192.168.1.2#53
Name: cluster.eventstore.local
Address:  192.168.1.11
Name: cluster.eventstore.local
Address:  192.168.1.12
Name: cluster.eventstore.local
Address:  192.168.1.13
```

### Database node configuration

All three nodes are similar in configuration.

The important configuration points are the:

- IP Addresses for internal and external interfaces.
- The ports for each endpoint.
- The location of the database file.
- The size of the cluster
- The endpoints from which to seed gossip (in this case the local manager).

We assume that Event Store stores data on the \_D:\_ drive.

You write the configuration files in YAML, and is the following for the first node:

Filename: _database.yaml_

```yaml
Db: d:\es-data
IntIp: 192.168.1.11
ExtIp: 192.168.1.11
IntTcpPort: 1112
IntHttpPort: 2112
ExtTcpPort: 1113
ExtHttpPort: 2113
DiscoverViaDns: false
GossipSeed: ['192.168.1.11:30777']
ClusterSize: 3
```

For each following node, the IP Addresses change, as does the gossip seed, since it is the manager running on the same physical machine as each node.

### Manager configuration

Again, all three nodes are similar in configuration.

The important configuration points are the:

- IP addresses for the internal and external interfaces.
- The ports for the HTTP endpoints.
- The log location.
- The DNS information about other nodes.

Another important configuration item is which database nodes the manager is responsible for starting. You define this in a separate file (the watchdog configuration), the path to which you specify as `WatchdogConfig` in the manager configuration.

You write the configuration files in YAML, and is the following for the first node:

Filename: _manager.yaml_

```yaml
IntIp: 192.168.1.11
ExtIp: 192.168.1.11
IntHttpPort: 30777
ExtHttpPort: 30778
DiscoverViaDns: true
ClusterDns: cluster1.eventstore.local
ClusterGossipPort: 30777
EnableWatchdog: true
WatchdogConfig: c:\EventStore-Config\watchdog.esconfig
Log: d:\manager-log
```

### Watchdog configuration

The watchdog configuration file details which database nodes the manager is responsible for starting and supervising. Unlike the other configuration files, the manager configuration uses a custom format instead of YAML. Each node for which the manager is responsible has one line in the file, which starts with a `#` symbol and then details the command line options given to the database node when it starts it. Under normal circumstances, this is the path to the database node's configuration file.

For the first node in the example cluster, the watchdog configuration file reads as follows:

```text
# --config c:\EventStore-Config\database.yaml
```

### Deploying Event Store software and configuration

With configuration files for each node written, you can now deploy Event Store and the configuration. Although it's possible to use relative paths when writing configuration files, it's preferable to use absolute paths to reduce the potential for confusion.

In this example, Event Store is deployed on each node in \_c:\\EventStore-HA-v\_, and the configuration files for that node are deployed into \_C:\\EventStore-Config\_. No installation process is necessary, you unzip the packaged distribution into your preferred location.

### Adding HTTP ACL entries for HTTP servers (Windows-specific)

<!-- TODO: Check this -->

To allow for non-elevated users to run HTTP servers on Windows, you must add entries to the access control list using `netsh`. By default, the manager node runs as `NT AUTHORITY\Local Service`, so this is the user who must have permission to run the HTTP server.

The commands used to add these entries on node one are as follows (Run as an elevated user):

```powershell
# Database Node Internal HTTP Interface
netsh http add urlacl url=http://192.168.1.11:2112/ user="NT AUTHORITY\LOCAL SERVICE"

# Database Node External HTTP Interface
netsh http add urlacl url=http://192.168.1.11:2113/ user="NT AUTHORITY\LOCAL SERVICE"

# Manager Node Internal HTTP Interface
netsh http add urlacl url=http://192.168.1.11:30777/ user="NT AUTHORITY\LOCAL SERVICE"

# Manager Node External HTTP Interface
netsh http add urlacl url=http://192.168.1.11:30778/ user="NT AUTHORITY\LOCAL SERVICE"
```

### Configure the manager node as a service (Windows-specific)

You can install manager nodes as a Windows service so they can start on boot rather than running in interactive mode. Each manager service is given an instance name, which becomes the name of the service (and part of the description for easy identification). The service is installed by default with a startup type of "Automatic (Delayed Start)".

#### Installing the service

To install the manager node on machine 1, use the following command:

```powershell
C:\EventStore-HA-v\> EventStore.WindowsManager.exe install -InstanceName es-cluster1 -ManagerConfig C:\EventStore-Config\manager.yaml
```

The service is then visible in the services list, with a description of "Event Store Manager (es-cluster1)".

#### Uninstalling the service

To uninstall the manager node service, use the following command (where the instance name matches the name used during installation).

```powershell
C:\EventStore-HA-v\> EventStore.WindowsManager.exe uninstall -InstanceName es-cluster1
```

#### Manually starting and stopping the service

-   To start the manager node use the `net start es-cluster1` command.
-   To stop the manager node use the `net stop es-cluster1` command.