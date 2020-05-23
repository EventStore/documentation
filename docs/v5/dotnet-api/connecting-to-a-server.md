# Connecting to a server

## EventStoreConnection

The `EventStoreConnection` class maintains a full-duplex connection between the client and the Event Store server. `EventStoreConnection` is thread-safe and we recommend that you create one instance per application.

All operations are fully asynchronous and return either a `Task` or a `Task<T>`. If you need to execute synchronously, call `.Wait()`, or `Result` on the asynchronous version.

To get maximum performance from the connection we recommend that you use it asynchronously.

## Creating a connection

The `EventStoreConnection` classes uses the static `Create` methods to create a new connection. All method overloads allow you to optionally specify a name for the connection, which the connection returns when it raises events (see [Connection Events](#connection-events)).

| Method | Description |
|:-------|:------------|
| `Create(ConnectionSettings connectionSettings)` | Connects to Event Store using specified settings  |
| `Create(Uri uri)` | Connects to Event Store (see URIs below) with default settings |
| `Create(ConnectionSettings connectionSettings, Uri uri)` | Connects to Event Store (see URIs below) with specified settings |
| `Create(string connectionString)` | Connects to Event Store with settings from connection string |
| `Create(string connectionString, ConnectionSettingsBuilder builder)` | Connects to Event Store by merging connection string settings with pre-populated builder |
| `Create(IPEndPoint tcpEndPoint)` | **Obsolete** Connects to a single node with default settings |
| `Create(ConnectionSettings settings, IPEndPoint tcpEndPoint)`        | **Obsolete** Connects to a single node with custom settings (see [Customising Connection Settings](#customising-connection-settings)) |
| `Create(ConnectionSettings connectionSettings, ClusterSettings clusterSettings)` | **Obsolete** Connects to an Event Store HA cluster with custom settings (see [Cluster Settings](#cluster-settings)) |
| `Create(ConnectionSettings connectionSettings, IEndPointDiscover endPointDiscover)` | Connects to an Event Store HA cluster with custom settings (see [Cluster Settings](#cluster-settings)) |

::: tip
The connection returned by these methods is inactive. Use the `ConnectAsync()` method to establish a connection with the server.
:::

## URIs

The create methods support passing of a URI to the connection as opposed to passing `IPEndPoints`. This URI should be in the format of:

- **Single Node**: `tcp://user:password@myserver:11234`
- **Cluster**: `discover://user:password@myserver:1234`

Where the port number points to the TCP port of the Event Store instance (1113 by default) or points to the manager gossip port for discovery purposes.

With the URI based mechanism you can pass a domain name and the client will resolve it.

::: tip
The client performs a blocking DNS call for single node. If you are worried about blocking DNS due to network issues etc., you should resolve the DNS yourself and pass in an IP address.
:::

## Customising connection settings

### Connection string

Many of the overloads accept a connection string that you can use to control settings of the connection. A benefit to having these as a connection string instead of using the fluent API is that you can change them between environments without recompiling (i.e. a single node in `dev` and a cluster in `production`).

The connection string format should look familiar to those who have used connection strings in the past. It consists of a series of key/value pairs separated by semicolons.

You can set the following values using the connection string:

<!-- TODO: Moved, to check and what about ConnectTo? -->

| Name | Format | Description |
|:-----|:-------|:------------|
| VerboseLogging | True/false | Enables verbose logging |
| MaxQueueSize | Integer | Maximum number of outstanding operations |
| MaxConcurrentItems | Integer | Maximum number of concurrent async operations |
| MaxRetries | Integer | Maximum number of retry attempts |
| MaxReconnections | Integer | The maximum number of times to try reconnecting |
| RequireMaster | True/false | If set the server will only process if it is master |
| ReconnectionDelay | Integer (milliseconds) | The delay before attempting to reconnect |
| OperationTimeout | Integer (milliseconds) | The time before considering an operation timed out |
| OperationTimeoutCheckPeriod | Integer (milliseconds) | The frequency in which to check timeouts |
| DefaultUserCredentials | String in format username:password | The default credentials for the connection |
| UseSslConnection | True/false | Whether to use SSL for this connection |
| TargetHost | String | The hostname expected on the certificate |
| ValidateServer | True/false | Whether to validate the remote server |
| FailOnNoServerResponse | True/False | Whether to fail on no server response |
| HeartbeatInterval | Integer (milliseconds) | The interval at which to send the server a heartbeat |
| HeartbeatTimeout | Integer (milliseconds) | The amount of time to receive a heartbeat response before timing out |
| ClusterDns | String | The DNS name of the cluster for discovery |
| MaxDiscoverAttempts | Integer | The maximum number of attempts to try to discover the cluster |
| ExternalGossipPort | Integer | The port to try to gossip on |
| GossipTimeout | Integer (milliseconds) | The amount of time before timing out a gossip response |
| GossipSeeds | Comma separated list of ip:port | A list of seeds to try to discover from |
| ConnectTo | A URI in format described above to connect to | The URI to connect to |

::: tip
You can also use spacing instead of camel casing in your connection string.
:::

```csharp
var connectionString = "ConnectTo=tcp://admin:changeit@localhost:1113; HeartBeatTimeout=500"
```

Sets the connection string to connect to `localhost` on the default port and sets the heartbeat timeout to 500ms.

```csharp
var connectionString = "Connect To = tcp://admin:changeit@localhost:1113; Gossip Timeout = 500"
```

Using spaces:

```csharp
var connectionString = "ConnectTo=discover://admin:changeit@mycluster:3114; HeartBeatTimeout=500"
```

Tells the connection to try gossiping to a manager node found under the DNS 'mycluster' at port '3114' to connect to the cluster.

```csharp
var connectionString = "GossipSeeds=192.168.0.2:1111,192.168.0.3:1111; HeartBeatTimeout=500"
```

Tells the connection to try gossiping to the gossip seeds `192.168.0.2` or `192.168.0.3` on port '1111' to discover information about the cluster.

::: tip
You can also use the `ConnectionString` class to return a `ConnectionSettings` object.
:::

### Fluent API

Settings used for modifying the behavior of an `EventStoreConnection` are encapsulated into an object of type `ConnectionSettings` passed as a parameter to the `Create` methods listed above.

Instances of `ConnectionSettings` are created using a fluent builder class:

```csharp
ConnectionSettings settings = ConnectionSettings.Create();
```

This creates an instance of `ConnectionSettings` with default options. You can override these by chaining the additional builder methods described below.

### Logging

The .NET API can log information to different destinations. By default logging is disabled.

<!-- TODO: Moved, to check. Actually missing options. -->

| Builder Method | Description |
|:---------------|:------------|
| `UseConsoleLogger()` | Output log messages using `Console.WriteLine`  |
| `UseDebugLogger()` | Output log messages using `Debug.WriteLine` |
| `UseCustomLogger()` | Output log messages to the specified instance of `ILogger` (You should implement this interface in order to log using another library such as NLog or log4net). |
| `EnableVerboseLogging()` | Turns on verbose logging. |

By default information about connection, disconnection and errors are logged, however it can be useful to have more information about specific operations as they are occurring.

### User credentials

Event Store supports [Access Control Lists](~/server/users-and-access-control-lists.md) that restrict permissions for a stream based on users and groups. `EventStoreConnection` allows you to supply credentials for each operation, however it is often more convenient to set default credentials for all operations on the connection.

| Builder Method | Description |
|:---------------|:------------|
| `SetDefaultUserCredentials(UserCredentials credentials)` | Sets the default `UserCredentials` to use for this connection. If you don't supply any credentials, the operation will use these. |

You create a `UserCredentials` object as follows:

```csharp
UserCredentials credentials = new UserCredentials("username","password");
```

### Security

The .NET API and Event Store can communicate either over SSL or an unencrypted channel (by default).

To configure the client-side of the SSL connection, use the builder method below. For more information on setting up the server end of the Event Store for SSL, see [SSL Setup](/server/setting-up-ssl.md).

```csharp
UseSslConnection(string targetHost, bool validateServer)
```

Uses an SSL-encrypted connection where `targetHost` is the name specified on the SSL certificate installed on the server, and `validateServer` controls whether the connection validates the server certificate.

::: warning
In production systems where credentials are sent from the client to Event Store, you should always use SSL encryption and you should set `validateServer` to `true`.
:::

### Node preference

When connecting to an Event Store HA cluster you can specify that operations are performed on any node, or only on the node that is the master.

| Builder Method | Description |
|:---------------|:------------|
| `PerformOnMasterOnly()` | Require the master to serve all write and read requests (Default).                                         |
| `PerformOnAnyNode()`    | Allow for writes to be forwarded and read requests to be served locally if the current node is not master. |

### Handling failures

The following methods on the `ConnectionSettingsBuilder` allow you to change the way the connection handles operation failures and connection issues.

#### Reconnections

| Builder Method | Description |
|:---------------|:------------|
| `WithConnectionTimeoutOf (TimeSpan timeout)`  | Sets the timeout to connect to a server before aborting and attempting a reconnect (Default: 1 second). |
| `LimitReconnectionsTo (int limit)` | Limits the number of reconnections this connection can try to make (Default: 10). |
| `KeepReconnecting()` | Allows infinite reconnection attempts.|
| `SetReconnectionDelayTo (TimeSpan reconnectionDelay)` | Sets the delay between reconnection attempts (Default: 100ms).|
| `SetHeartbeatInterval (TimeSpan interval)`| Sets how often the connection should expect heartbeats (lower values detect broken sockets faster) (Default: 750ms). |
| `SetHeartbeatTimeout (TimeSpan timeout)` | Sets how long to wait without heartbeats before determining a connection to be dead (must be longer than the heartbeat interval) (Default: 1500ms). |

#### Operations

| Builder Method | Description |
|:---------------|:------------|
| `SetOperationTimeout (TimeSpan timeout)` | Sets the operation timeout duration (Default: 7 seconds). |
| `SetTimeoutCheckPeriodTo (TimeSpan timeoutCheckPeriod)` | Sets how often to check for timeouts (Default: 1 second). |
| `LimitAttemptsForOperationTo (int limit)` | Limits the number of operation attempts (Default: 11). |
| `LimitRetriesForOperationTo (int limit)` | Limits the number of operation retries (Default: 10). |
| `KeepRetrying()` | Allows infinite operation retries. |
| `LimitOperationsQueueTo (int limit)` | Sets the limit for number of outstanding operations (Default: 5000). |
| `FailOnNoServerResponse()` | Marks that no response from server should cause an error on the request. |

## Cluster settings

When connecting to an Event Store HA cluster you must pass an instance of `ClusterSettings` as well as the usual `ConnectionSettings`. Primarily yu use this to tell the `EventStoreConnection` how to discover all the nodes in the cluster. A connection to a cluster will automatically handle reconnecting to a new node if the current connection fails.

### Using DNS discovery

DNS discovery uses a single DNS entry with several records listing all node IP addresses. The `EventStoreConnection` will then use a well known port to gossip with the nodes.

Use `ClusterSettings.Create().DiscoverClusterViaDns()` followed by:

<!-- TODO: Moved, to check. -->

| Builder Method | Description |
|:---------------|:------------|
| `SetClusterDns(string clusterDns)` | Sets the DNS name under which to list cluster nodes. |
| `SetClusterGossipPort(int clusterGossipPort)` | Sets the well-known port on which the cluster gossip is taking place. |
| `SetMaxDiscoverAttempts(int maxDiscoverAttempts)` | Sets the maximum number of attempts for discovery (Default: 10). |
| `SetGossipTimeout(TimeSpan timeout)` | Sets the period after which gossip times out if none is received (Default: 1 second). |

::: tip
 If you are using the commercial edition of Event Store HA with Manager nodes in place, the gossip port should be the port number of the external HTTP port on which the managers are running. If you are using the open source edition of Event Store HA the gossip port should be the External HTTP port that the nodes are running on. If you cannot use a well-known port for this across all nodes you can instead use gossip seed discovery and set the `IPEndPoint` of some seed nodes instead.
 :::

### Connecting using gossip seeds

The second supported method for node discovery uses a hardcoded set of `IPEndPoint`s as gossip seeds.

Use `ClusterSettings.Create().DiscoverClusterViaGossipSeeds()` followed by:

<!-- TODO: Moved, to check. -->

| Builder Method | Description |
|:---------------| ------------|
| `SetGossipSeedEndPoints(params IPEndPoint[] gossipSeeds)` | Sets gossip seed endpoints for the client. |
| `SetGossipSeedEndPoints(params GossipSeed[] gossipSeeds)` | Same as above, but allows a specific `Host` header to be sent with all HTTP requests. |
| `SetMaxDiscoverAttempts(int maxDiscoverAttempts)` | Sets the maximum number of attempts for discovery (Default: 10). |
| `SetGossipTimeout(TimeSpan timeout)` | Sets the period after which gossip times out if none is received (Default: 1 second). |

## Connection events

`EventStoreConnection` exposes events that your application can use to be notified of changes to the status of the connection.

<!-- TODO: Not moved. -->

| Event | Description |
|:------|:-------------|
| `EventHandler<ClientConnectionEventArgs> Connected` | Fired when an `IEventStoreConnection` connects to an Event Store server. |
| `EventHandler<ClientConnectionEventArgs> Disconnected` | Fired when an `IEventStoreConnection` disconnects from an Event Store server by some means other than by calling the `Close` method. |
| `EventHandler<ClientReconnectingEventArgs> Reconnecting` | Fired when an `IEventStoreConnection` is attempting to reconnect to an Event Store server following a disconnection. |
| `EventHandler<ClientClosedEventArgs> Closed` | Fired when an `IEventStoreConnection` is closed either using the `Close` method or when reconnection limits are reached without a successful connection being established. |
| `EventHandler<ClientErrorEventArgs> ErrorOccurred` | Fired when an error is thrown on an `IEventStoreConnection`.|
| `EventHandler<ClientAuthenticationFailedEventArgs> AuthenticationFailed` | Fired when a client fails to authenticate to an Event Store server. |
