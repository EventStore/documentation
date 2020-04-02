---
outputFileName: index.html
---

# Embedded client

## EmbeddedVNodeBuilder

The `EmbeddedVNodeBuilder` class sets up and builds an Event Store node. You can configure your node through methods provided by the `EmbeddedVNodeBuilder` class.

> [!NOTE]
> The builder used for the `EmbeddedVNodeBuilder` is the same Event Store uses internally to create the `ClusterNode`, see _EventStore.ClusterNode.Program.cs_ for more examples on how to use it.

## Building a node

You have two options when you start creating a node, `EmbeddedVNodeBuilder.AsSingleNode()` or `EmbeddedVNodeBuilder.AsClusterMember(clusterSize)`, which will create a single node or a cluster node respectively. After creating the builder, you can configure the node through the methods provided by the `EmbeddedVNodeBuilder`. These are listed below.

Once you have configured the node, build it with `EmbeddedVNodeBuilder.Build()` which returns the configured `ClusterVNode`.

Start the node with `ClusterVNode.StartAndWaitUntilReady()` or `ClusterVNode.Start()`. `ClusterVNode.StartAndWaitUntilReady()` returns a task that completes once the node has started and all subsystems have finished loading.

For example, to build a single node with default options :

```csharp
var nodeBuilder = EmbeddedVNodeBuilder.AsSingleNode()
                                      .OnDefaultEndpoints()
                                      .RunInMemory();
var node = nodeBuilder.Build();
node.StartAndWaitUntilReady().Wait();
```

To build a node to be part of a cluster with custom endpoints and gossip seeds:

```csharp
var nodeBuilder = EmbeddedVNodeBuilder.AsClusterMember(3)
                      .RunOnDisk("node1db")
                      .WithInternalHttpOn(new IPEndPoint(IPAddress.Loopback, 1112))
                      .WithExternalHttpOn(new IPEndPoint(IPAddress.Loopback, 1113))
                      .WithExternalTcpOn(new IPEndPoint(IPAddress.Loopback, 1114))
                      .WithInternalTcpOn(new IPEndPoint(IPAddress.Loopback, 1115))
                      .DisableDnsDiscovery()
                      .WithGossipSeeds(new IPEndPoint[]
                      {
                          new IPEndPoint(IPAddress.Loopback, 2112),
                          new IPEndPoint(IPAddress.Loopback, 3112)
                      });
var node = nodeBuilder.Build();
node.Start();
```

> [!WARNING]
> When running an embedded cluster, the task returned by `StartAndWaitUntilReady()` only completes on the master node.

## Connecting to an embedded node

You can connect to an embedded Event Store node with the `EmbeddedEventStoreConnection` class. Calling `EmbeddedEventStoreConnection.Create(ClusterVNode)` returns an `IEventStoreConnection` configured to connect to your embedded node. From there you can use the connection as normal in the .NET Client.

```csharp
using(var embeddedConn = EmbeddedEventStoreConnection.Create(node))
{
    embeddedConn.ConnectAsync().Wait();
    embeddedConn.AppendToStreamAsync("testStream", ExpectedVersion.Any,
                    new EventData(Guid.NewGuid(), "eventType", true,
                    Encoding.UTF8.GetBytes("{\"Foo\":\"Bar\"}"), null)).Wait();
}
```

## Logging with an embedded node

To enable logging for an embedded node, you need to initialize the `LogManager` and ensure that you configure the logger with a `log.config` file in your configuration directory.

To initialize the `LogManager`, call this before building the nodes:

```csharp
LogManager.Init(logComponentName, logDirectory, logConfigurationDirectory);
```

## EmbeddedVNodeBuilder options

The following options are available when building an Embedded Node.

### Application options

| Method                                  | Description                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------ |
| `AsSingleNode()`                        | Returns a builder set to construct options for a single node instance                      |
| `AsClusterMember(int clusterSize)`      | Returns a builder set to construct options for a cluster node instance with a cluster size |
| `DisableHTTPCaching()`                  | Disable HTTP Caching                                                                       |
| `WithWorkerThreads(int count)`          | Sets the number of worker threads to use in shared threadpool                              |
| `WithStatsPeriod(TimeSpan statsPeriod)` | Sets the period between statistics gathers                                                 |
| `EnableLoggingOfHttpRequests()`         | Enable logging of HTTP requests and responses before they are processed                    |
| `EnableHistograms()`                    | Enable the tracking of histograms, typically used for debugging                            |
| `EnableTrustedAuth()`                   | Enable trusted authentication by an intermediary in the HTTP                               |

### Certificate options

| Method                                                                                                                                          | Description                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `WithServerCertificateFromFile(string path, string password)`                                                                                   | Sets the Server SSL Certificate loaded from a file              |
| `WithServerCertificate(X509Certificate2 sslCertificate)`                                                                                        | Sets the Server SSL Certificate                                 |
| `WithServerCertificateFromStore(StoreLocation storeLocation, StoreName storeName, string certificateSubjectName, string certificateThumbprint)` | Sets the Server SSL Certificate loaded from a certificate store |
| `WithServerCertificateFromStore(StoreName storeName, string certificateSubjectName, string certificateThumbprint)`                              | Sets the Server SSL Certificate loaded from a certificate store |

### Cluster options

| Method                                                              | Description                                                                                                              |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `WithClusterGossipPort(int port)`                                   | Sets the internal gossip port (used when using cluster DNS, this should point to a known port gossip will be running on) |
| `WithGossipSeeds(params IPEndPoint[] endpoints)`                    | Sets the gossip seeds this node should talk to                                                                           |
| `WithClusterDnsName(string name)`                                   | Sets the DNS name used for the discovery of other cluster nodes                                                          |
| `DisableDnsDiscovery()`                                             | Disable DNS discovery for the cluster                                                                                    |
| `WithGossipInterval(TimeSpan gossipInterval)`                       | Sets the gossip interval                                                                                                 |
| `WithGossipAllowedTimeDifference(TimeSpan gossipAllowedDifference)` | Sets the allowed gossip time difference                                                                                  |
| `WithGossipTimeout(TimeSpan gossipTimeout)`                         | Sets the gossip timeout                                                                                                  |
| `WithPrepareTimeout(TimeSpan prepareTimeout)`                       | Sets the prepare timeout                                                                                                 |
| `WithCommitTimeout(TimeSpan commitTimeout)`                         | Sets the commit timeout                                                                                                  |
| `WithPrepareCount(int prepareCount)`                                | Sets the number of nodes which must acknowledge prepares.                                                                |
| `WithCommitCount(int commitCount)`                                  | Sets the number of nodes which must acknowledge commits before acknowledging to a client.                                |
| `WithNodePriority(int nodePriority)`                                | Sets the node priority used during master election                                                                       |

### Database options

| Method                                                 | Description                                                                                    |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `RunInMemory()`                                        | Sets the builder to run in memory                                                              |
| `RunOnDisk(string path)`                               | Sets the builder to write database files to the specified path                                 |
| `MaximumMemoryTableSizeOf(int size)`                   | Sets the maximum size a memtable is allowed to reach (in count) before moved to be a ptable    |
| `DoNotVerifyDbHashes()`                                | Marks that the existing database files should not be checked for checksums on startup.         |
| `VerifyDbHashes()`                                     | Marks that the existing database files should be checked for checksums on startup.             |
| `WithMinFlushDelay(TimeSpan minFlushDelay)`            | Sets the minimum flush delay                                                                   |
| `DisableScavengeMerging()`                             | Disables the merging of chunks when scavenge is running                                        |
| `WithScavengeHistoryMaxAge(int scavengeHistoryMaxAge)` | The number of days to keep scavenge history (Default: 30)                                      |
| `WithIndexPath(string indexPath)`                      | Sets the path the index should be loaded or saved to                                           |
| `WithIndexCacheDepth(int indexCacheDepth)`             | Sets the depth to cache for the mid point cache in index                                       |
| `WithUnsafeIgnoreHardDelete()`                         | Disables Hard Deletes (UNSAFE: use to remove hard deletes)                                     |
| `WithUnsafeDisableFlushToDisk()`                       | Disables Hard Deletes (UNSAFE: use to remove hard deletes)                                     |
| `WithBetterOrdering()`                                 | Enable queue affinity on reads during write process to try to get better ordering.             |
| `WithTfChunkSize(int chunkSize)`                       | Sets the transaction file chunk size. Default is `TFConsts.ChunkSize`                          |
| `WithTfCachedChunks(int cachedChunks)`                 | The number of chunks to cache in unmanaged memory. Default is `TFConsts.ChunksCacheSize`       |

### Interface options

| Method                                                              | Description                                                                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `OnDefaultEndpoints()`                                              | Sets the default endpoints on localhost (1113 tcp, 2113 http)                                                                       |
| `AdvertiseInternalIPAs(IPAddress intIpAdvertiseAs)`                 | Sets up the Internal IP to advertise                                                                                                |
| `AdvertiseExternalIPAs(IPAddress extIpAdvertiseAs)`                 | Sets up the External IP to advertise                                                                                                |
| `AdvertiseInternalHttpPortAs(int intHttpPortAdvertiseAs)`           | Sets up the Internal HTTP port to advertise                                                                                         |
| `AdvertiseExternalHttpPortAs(int extHttpPortAdvertiseAs)`           | Sets up the External HTTP port to advertise                                                                                         |
| `AdvertiseInternalSecureTCPPortAs(int intSecureTcpPortAdvertiseAs)` | Sets up the Internal Secure TCP port to advertise                                                                                   |
| `AdvertiseExternalSecureTCPPortAs(int extSecureTcpPortAdvertiseAs)` | Sets up the External Secure TCP port to advertise                                                                                   |
| `AdvertiseInternalTCPPortAs(int intTcpPortAdvertiseAs)`             | Sets up the Internal TCP port to advertise                                                                                          |
| `AdvertiseExternalTCPPortAs(int extTcpPortAdvertiseAs)`             | Sets up the External TCP port to advertise                                                                                          |
| `WithInternalHttpOn(IPEndPoint endpoint)`                           | Sets the internal HTTP endpoint to the specified value                                                                              |
| `WithExternalHttpOn(IPEndPoint endpoint)`                           | Sets the external HTTP endpoint to the specified value                                                                              |
| `WithInternalTcpOn(IPEndPoint endpoint)`                            | Sets the internal TCP endpoint to the specified value                                                                               |
| `WithInternalSecureTcpOn(IPEndPoint endpoint)`                      | Sets the internal secure TCP endpoint to the specified value                                                                        |
| `WithExternalTcpOn(IPEndPoint endpoint)`                            | Sets the external TCP endpoint to the specified value                                                                               |
| `WithExternalSecureTcpOn(IPEndPoint endpoint)`                      | Sets the external secure TCP endpoint to the specified value                                                                        |
| `EnableSsl()`                                                       | Sets that SSL should be used on connections                                                                                         |
| `WithSslTargetHost(string targetHost)`                              | Sets the target host of the server's SSL certificate.                                                                               |
| `ValidateSslServer()`                                               | Sets whether to validate that the server's certificate is trusted.                                                                  |
| `NoGossipOnPublicInterface()`                                       | Disables gossip on the public (client) interface                                                                                    |
| `NoAdminOnPublicInterface()`                                        | Disables the admin interface on the public (client) interface                                                                       |
| `NoStatsOnPublicInterface()`                                        | Disables statistics screens on the public (client) interface                                                                        |
| `AddInternalHttpPrefix(string prefix)`                              | Adds a HTTP prefix for the internal HTTP endpoint                                                                                   |
| `AddExternalHttpPrefix(string prefix)`                              | Adds a HTTP prefix for the external HTTP endpoint                                                                                   |
| `DontAddInterfacePrefixes()`                                        | Don't add the interface prefixes (e.g. If the External IP is set to the Loopback address, add <http://localhost:2113/> as a prefix) |
| `WithInternalHeartbeatInterval(TimeSpan heartbeatInterval)`         | Sets the heartbeat interval for the internal network interface.                                                                     |
| `WithExternalHeartbeatInterval(TimeSpan heartbeatInterval)`         | Sets the heartbeat interval for the external network interface.                                                                     |
| `WithInternalHeartbeatTimeout(TimeSpan heartbeatTimeout)`           | Sets the heartbeat timeout for the internal network interface.                                                                      |
| `WithExternalHeartbeatTimeout(TimeSpan heartbeatTimeout)`           | Sets the heartbeat timeout for the external network interface.                                                                      |

### Projections options

| Method                                                                                                                    | Description                                                          |
| ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `StartStandardProjections()`                                                                                              | Start standard projections.                                          |
| `RunProjections(ProjectionType projectionType, int numberOfThreads = Opts.ProjectionThreadsDefault)`                      | Sets the mode and the number of threads on which to run projections. |
| `RunProjections(ClientAPI.Embedded.ProjectionsMode projectionsMode, int numberOfThreads = Opts.ProjectionThreadsDefault)` | Sets the mode and the number of threads on which to run projections. |

## EmbeddedEventStoreConnection

The following methods are available on `EmbeddedEventStoreConnection` for connecting to an embedded node.

| Method                                                                                                 | Description                                                                                         |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| `Create(ClusterVNode eventStore, string connectionName = null)`                                        | Creates a new embedded `IEventStoreConnection` to a single node with default connection settings    |
| `Create(ClusterVNode eventStore, ConnectionSettings connectionSettings, string connectionName = null)` | Creates a new embedded `IEventStoreConnection` to a single node using specific `ConnectionSettings` |
