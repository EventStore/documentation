---
sitemap.priority: 0.005
---

# Connecting to EventStoreDB

Describe connecting to the single node and to the cluster.

Gossip seeds, using ip addresses and DNS.

The .NET Client API communicates with EventStoreDB over TCP, using length-prefixed serialised protocol buffers. The API allows for reading and appending operations, as well as for subscriptions to individual event streams or all events appended.

## EventStoreConnection

The `EventStoreConnection` class maintains a full-duplex connection between the client and the EventStoreDB server. `EventStoreConnection` is thread-safe, and we recommend that you create one node per application.

EventStoreDB handles all connections asynchronously, returning either a `Task` or a `Task<T>`.

::: tip
To get maximum performance from a non-blocking connection, we recommend you use it asynchronously.
:::

## Quick start

The code below shows how to connect to an EventStoreDB server, appends to a stream, and read back the events. For more detailed information, read the full pages for connecting to a server using [connection string](#connection-string) and [connection settings](#connection-settings), [reading events](reading.md) and [appending to a stream](appending.md)

:::: code-group
::: code-group-item JSON format event
@[code{12-28}](./sample-code/DotNetClient/QuickStartJsonFormat.cs)
:::
::: code-group-item Plain-text format event
@[code{12-28}](./sample-code/DotNetClient/QuickStartPlainFormat.cs)
:::
::::

::: tip
We recommended using the JSON format for data and metadata.
:::

## Connection string

Many of the `EventStoreConnection.Create` overloads accept a connection string that you can use to control settings of the connection. A benefit to having these as a connection string instead of using the fluent API is that you can change them between environments without recompiling (i.e. a single node in `dev` and a cluster in `production`).

For example, the following code will create a connection to an EventStoreDB local node, and then open the connection:

```csharp
var connectionString = "ConnectTo=tcp://admin:changeit@localhost:1113;";
var connection = EventStoreConnection.Create(connectionString, builder);
await connection.ConnectAsync();
```

Here are all available overloads for the `Create` methods of the `EventStoreConnection` class, which use the connection string:

| Method                                                               | Description                                                                                                       |
|:---------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------|
| `Create(string connectionString)`                                    | Connects to EventStoreDB with settings from connection string                                                     |
| `Create(string connectionString, ConnectionSettingsBuilder builder)` | Connects to EventStoreDB by merging connection string settings with pre-populated builder for additional settings |

The connection string format should look familiar to those who have used connection strings in the past. It consists of a series of key/value pairs separated by semicolons.

You can set the following values using the connection string:

| Name                        | Format                                        | Description                                                                                                             |
|:----------------------------|:----------------------------------------------|:------------------------------------------------------------------------------------------------------------------------|
| ConnectTo                   | A URI in format described above to connect to | The URI to connect to                                                                                                   |
| GossipSeeds                 | Comma separated list of ip:port               | A list of seeds to try to discover from                                                                                 |
| ClusterDns                  | String                                        | The DNS name of the cluster for discovery                                                                               |
| ExternalGossipPort          | Integer                                       | The port to try to gossip on                                                                                            |
| DefaultUserCredentials      | String in format username:password            | The default credentials for the connection                                                                              |
| MaxQueueSize                | Integer                                       | Maximum number of outstanding operations                                                                                |
| MaxConcurrentItems          | Integer                                       | Maximum number of concurrent async operations                                                                           |
| MaxRetries                  | Integer                                       | Maximum number of retry attempts                                                                                        |
| MaxReconnections            | Integer                                       | The maximum number of times to try reconnecting                                                                         |
| RequireMaster               | True/false                                    | If set the server will only process if it is master                                                                     |
| ReconnectionDelay           | Integer (milliseconds)                        | The delay before attempting to reconnect                                                                                |
| OperationTimeout            | Integer (milliseconds)                        | The time before considering an operation timed out                                                                      |
| OperationTimeoutCheckPeriod | Integer (milliseconds)                        | The frequency in which to check timeouts                                                                                |
| UseSslConnection            | True/false                                    | Whether to use SSL for this connection                                                                                  |
| TargetHost                  | String                                        | The hostname expected on the certificate                                                                                |
| ValidateServer              | True/false                                    | Whether to validate the remote server                                                                                   |
| FailOnNoServerResponse      | True/False                                    | Whether to fail on no server response                                                                                   |
| HeartbeatInterval           | Integer (milliseconds)                        | The interval at which to send the server a heartbeat                                                                    |
| HeartbeatTimeout            | Integer (milliseconds)                        | The amount of time to receive a heartbeat response before timing out                                                    |
| MaxDiscoverAttempts         | Integer                                       | The maximum number of attempts to try to discover the cluster                                                           |
| GossipTimeout               | Integer (milliseconds)                        | The amount of time before timing out a gossip response                                                                  |
| VerboseLogging              | True/false                                    | Enables verbose logging                                                                                                 |
| Compatibility Mode          | auto, 20                                      | Enables the client to connect to either server configuration without needing to change the client's connection settings |

You can specify only one of `ConnectTo`, `ClusterDns` and `GossipSeeds`. Also, you'd only need to define `ExternalGossipPort` if you connect to the cluster using the DNS name (`ClusterDns`). The gossip port is usually the external HTTP port. When connecting to the cluster using `GossipSeeds`, you need to specify the gossip port for each node address in the list of seeds.

::: tip
You can also use spacing instead of camel casing in your connection string.
:::

```
ConnectTo=tcp://admin:changeit@localhost:1113; HeartBeatTimeout=500
```

Sets the connection string to connect to `localhost` on the default port and sets the heartbeat timeout to 500ms.

```
Connect To = tcp://admin:changeit@localhost:1113; HeartBeatTimeout=500
```

Using spaces:

```
ConnectTo=discover://admin:changeit@mycluster:3114; HeartBeatTimeout=500
```

Tells the connection to try gossiping to a manager node found under the DNS `mycluster` at port `3114` to connect to the cluster.

```
GossipSeeds=192.168.0.2:1111,192.168.0.3:1111; HeartBeatTimeout=500
```

Tells the connection to try gossiping to the gossip seeds `192.168.0.2` or `192.168.0.3` on port '1111' to discover information about the cluster.

::: tip
You can also use the `ConnectionString` class to return a `ConnectionSettings` object.
:::

## Connection settings

The `EventStoreConnection` class uses the static `Create` methods to create a new connection. All method overloads allow you to specify a name for the connection, which the connection returns when it raises events (see [Connection Events](#connection-events)).

Instances of `ConnectionSettings` are created using a fluent builder class:

```csharp
var settingsBuilder = ConnectionSettings.Create();
```

This creates an instance of `ConnectionSettingsBuilder` with default settings. You can override these by chaining the additional builder methods described below. When you have a builder with all the settings configured, use the `Build` method to create the `ConnectionSettings` instance and then use it to create a connection:

```csharp
var settings = settingsBuilder.Build();
var connection = EventStoreConnection.Create(settings);
```

Settings builder supports fluent API, so each of its configuration methods returns the reference to itself. It allows you to chain the configuration calls, finalising it by the `Build` method call:

```csharp
var settings = ConnectionSettings
    .Create()
    .KeepReconnecting()
    .Build();
var connection = EventStoreConnection.Create(
    settings, new Uri("tcp://admin:changeit@localhost:1113")
);
```

You can also pass the builder instead of the `ConnectionSettings` instance. In this case, the builder will be implicitly converted to the settings instance by calling the `Build` method under the hood.

Here are all available overloads for the `Create` methods of the `EventStoreConnection` class, which use connection settings:

| Method                                                                              | Description                                                                                                       |
|:------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------|
| `Create(ConnectionSettings connectionSettings)`                                     | Connects to EventStoreDB using specified settings                                                                 |
| `Create(Uri uri)`                                                                   | Connects to EventStoreDB (see URIs below) with default settings                                                   |
| `Create(ConnectionSettings connectionSettings, Uri uri)`                            | Connects to EventStoreDB (see URIs below) with specified settings                                                 |
| `Create(string connectionString)`                                                   | Connects to EventStoreDB with settings from connection string                                                     |
| `Create(string connectionString, ConnectionSettingsBuilder builder)`                | Connects to EventStoreDB by merging connection string settings with pre-populated builder for additional settings |
| `Create(ConnectionSettings connectionSettings, IEndPointDiscover endPointDiscover)` | Connects to an EventStoreDB cluster with custom settings.                                                         |

::: tip
The connection returned by these methods is inactive. Use the `ConnectAsync()` method to establish a connection with the server.
:::

### URIs

The create methods support passing of a URI to the connection as opposed to passing `IPEndPoints`. This URI should be in the format of:

- **Single Node**: `tcp://user:password@myserver:11234`
- **Cluster**: `discover://user:password@myserver:1234`

Where the port number points to the TCP port of the EventStoreDB instance (1113 by default) or points to the manager gossip port for discovery purposes.

With the URI based mechanism you can pass a DNS name and the client will resolve it. The client performs a blocking DNS call for single node. If you are worried about blocking DNS due to network issues etc., you should resolve the DNS yourself and pass in an IP address.

### Logging

The .NET client can log to different destinations. By default logging is disabled.

<!-- TODO: Moved, to check. Actually missing settings. -->

| Builder Method           | Description                                                                                                                                                     |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `UseConsoleLogger()`     | Output log messages using `Console.WriteLine`                                                                                                                   |
| `UseDebugLogger()`       | Output log messages using `Debug.WriteLine`                                                                                                                     |
| `UseCustomLogger()`      | Output log messages to the specified instance of `ILogger` (You should implement this interface in order to log using another library such as NLog or log4net). |
| `EnableVerboseLogging()` | Turns on verbose logging.                                                                                                                                       |

By default, information about connection, disconnection and errors are logged, however it can be useful to have more information about specific operations as they are occurring.

### User credentials

EventStoreDB supports [Access Control Lists](security.md#access-control-lists) that restrict permissions for a stream based on users and groups. `EventStoreConnection` allows you to supply credentials for each operation, however it is often more convenient to set default credentials for all operations on the connection.

| Builder Method | Description |
|:---------------|:------------|
| `SetDefaultUserCredentials(UserCredentials credentials)` | Sets the default `UserCredentials` to use for this connection. If you don't supply any credentials, the operation will use these. |

You create a `UserCredentials` object as follows:

```csharp
var credentials = new UserCredentials("username", "password");
settingsBuilder.SetDefaultUserCredentials(credentials);
```

### Security

The .NET API and EventStoreDB can communicate either over SSL or an unencrypted channel (by default).

To configure the client-side of the SSL connection, use the builder method below. For more information on setting up the server end of the EventStoreDB for SSL, see [SSL Setup](security.md).

```csharp
UseSslConnection(string targetHost, bool validateServer)
```

Uses an SSL-encrypted connection where `targetHost` is the name specified on the SSL certificate installed on the server, and `validateServer` controls whether the connection validates the server certificate.

::: warning
In production systems where credentials are sent from the client to EventStoreDB, you should always use SSL encryption and you should set `validateServer` to `true`.
:::

### Node preference

When connecting to an EventStoreDB HA cluster you can specify that operations are performed on any node, or only on the node that is the master.

| Builder Method          | Description                                                                                                |
|:------------------------|:-----------------------------------------------------------------------------------------------------------|
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

| Builder Method                                          | Description                                                              |
|:--------------------------------------------------------|:-------------------------------------------------------------------------|
| `SetOperationTimeout (TimeSpan timeout)`                | Sets the operation timeout duration (Default: 7 seconds).                |
| `SetTimeoutCheckPeriodTo (TimeSpan timeoutCheckPeriod)` | Sets how often to check for timeouts (Default: 1 second).                |
| `LimitAttemptsForOperationTo (int limit)`               | Limits the number of operation attempts (Default: 11).                   |
| `LimitRetriesForOperationTo (int limit)`                | Limits the number of operation retries (Default: 10).                    |
| `KeepRetrying()`                                        | Allows infinite operation retries.                                       |
| `LimitOperationsQueueTo (int limit)`                    | Sets the limit for number of outstanding operations (Default: 5000).     |
| `FailOnNoServerResponse()`                              | Marks that no response from server should cause an error on the request. |

### Cluster settings

Cluster settings are now embedded to the connection settings and all overloads that use `ClusterSettings` are obsolete. You can use the connection settings instance to configure cluster connection:

```csharp
var settings = ConnectionSettings
    .Create()
    .SetClusterDns("esdb.acme.cool")
    .SetClusterGossipPort(2113)
    .Build();
var connection = EventStoreConnection.Create(settings);
```

### Connection events

`EventStoreConnection` exposes events that your application can use to be notified of changes to the status of the connection.

<!-- TODO: Not moved. -->

| Event | Description |
|:------|:------------|
| `Connected` | Successfully connected to server |
| `Disconnected` | Disconnected from server by some means other than by calling the `Close` method. |
| `Reconnecting` | Attempting to reconnect to server following a disconnection |
| `Closed` |  Connection got closed either using the `Close` method or when reconnection limits are reached without a successful connection being established |
| `ErrorOccurred` |  Connection experienced an error |
| `AuthenticationFailed` | Failed to authenticate |

### Compatibility Mode

Enables the client to connect to either server configuration without needing to change the client's connection settings.

| Builder Method | Description |
|:---------------|:------------|
| `SetCompatibilityMode(string value)` | Specifies if the client should run in a specific version compatibility mode. Set `"auto"` for Auto-Compatibility Mode or `"20"` for v20 Compatibility Mode |

#### Auto-compatibility mode

Auto-compatibility mode was added to make the upgrade from an insecure v5 cluster to a secure v20+ cluster easier by allowing the client to connect to either server configuration without needing to change the client's connection settings.

It does this by sending both an insecure and a secure gossip request when first discovering the server. Whichever of these requests succeeds sets whether the gossip is to be done over HTTP or HTTPS. Once the cluster is discovered, the client will check the gossip to determine whether the TCP connection should be secure or insecure, and connect accordingly.

This means that you no longer need to specify `GossipOverTls` or `UseSslConnection` in the connection settings or connection string.

::: note
Since auto-compatibility mode will send two requests at discovery and expect one to fail, you will see a gossip failure in the log when the client starts. This is expected to only happen on the first request.
:::

##### Usage

Auto-Compatibility Mode is supported when connecting with Gossip Seeds or Cluster DNS Discovery.

You can enable auto-compatibility mode with `CompatibilityMode=auto` in the connection string, or with `.SetCompatibilityMode("auto")` in the connection settings.

You can connect to a cluster running insecure v5, insecure v20+, or secure v20+ with the following configurations:

###### Connection string

```csharp
var clusterDnsConnectionString = $"ConnectTo=discover://{dns_address}:2113;TargetHost={dns_address};CompatibilityMode=auto;ValidateServer=true;"
```

```csharp
var gossipSeedConnectionSTring = $"GossipSeeds={node1}:2113,{node2}:2113,{node3}:2113;CompatibilityMode=auto;ValidateServer=true;"
```

::: warning
Auto-compatibility mode does not enable Server Certificate Validation by default. As such, we recommend that you enable this explicitly in your connection string.
:::

###### Connection settings

:::: code-group
::: code-group-item Cluster DNS Discovery
@[code{AutoCompatibilityWithClusterDns}](./sample-code/DotNetClient/CompatibilityMode.cs)
:::
::: code-group-item Gossip Seeds
@[code{AutoCompatibilityWithGossipSeeds}](./sample-code/DotNetClient/CompatibilityMode.cs)
:::
::::

###### v5 Compatibility Mode

The v5 Compatibility Mode allows the v21.2 client to connect to a v5 cluster.

You can set this with `CompatibilityMode=5` in the connection string, or with `.SetCompatibilityMode("5")` in the connection settings.

For example:

```csharp
var connectionString = $"ConnectTo=discover://{cluster_dns}:2113?TargetHost={cluster_dns};CompatibilityMode=5;"
```
