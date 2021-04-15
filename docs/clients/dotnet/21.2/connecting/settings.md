# Connection settings

The `EventStoreConnection` class uses the static `Create` methods to create a new connection. All method overloads allow you to settingally specify a name for the connection, which the connection returns when it raises events (see [Connection Events](#connection-events)).

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

| Method | Description |
|:-------|:------------|
| `Create(ConnectionSettings connectionSettings)` | Connects to EventStoreDB using specified settings  |
| `Create(Uri uri)` | Connects to EventStoreDB (see URIs below) with default settings |
| `Create(ConnectionSettings connectionSettings, Uri uri)` | Connects to EventStoreDB (see URIs below) with specified settings |
| `Create(string connectionString)` | Connects to EventStoreDB with settings from connection string |
| `Create(string connectionString, ConnectionSettingsBuilder builder)` | Connects to EventStoreDB by merging connection string settings with pre-populated builder for additional settings |
| `Create(ConnectionSettings connectionSettings, IEndPointDiscover endPointDiscover)` | Connects to an EventStoreDB cluster with custom settings. |

::: tip
The connection returned by these methods is inactive. Use the `ConnectAsync()` method to establish a connection with the server.
:::

## URIs

The create methods support passing of a URI to the connection as opposed to passing `IPEndPoints`. This URI should be in the format of:

- **Single Node**: `tcp://user:password@myserver:11234`
- **Cluster**: `discover://user:password@myserver:1234`

Where the port number points to the TCP port of the EventStoreDB instance (1113 by default) or points to the manager gossip port for discovery purposes.

With the URI based mechanism you can pass a DNS name and the client will resolve it. The client performs a blocking DNS call for single node. If you are worried about blocking DNS due to network issues etc., you should resolve the DNS yourself and pass in an IP address.

### Logging

The .NET client can log to different destinations. By default logging is disabled.

<!-- TODO: Moved, to check. Actually missing settings. -->

| Builder Method | Description |
|:---------------|:------------|
| `UseConsoleLogger()` | Output log messages using `Console.WriteLine`  |
| `UseDebugLogger()` | Output log messages using `Debug.WriteLine` |
| `UseCustomLogger()` | Output log messages to the specified instance of `ILogger` (You should implement this interface in order to log using another library such as NLog or log4net). |
| `EnableVerboseLogging()` | Turns on verbose logging. |

By default information about connection, disconnection and errors are logged, however it can be useful to have more information about specific operations as they are occurring.

### User credentials

EventStoreDB supports [Access Control Lists](/server/generated/v21.2/docs/security/acl.md) that restrict permissions for a stream based on users and groups. `EventStoreConnection` allows you to supply credentials for each operation, however it is often more convenient to set default credentials for all operations on the connection.

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

To configure the client-side of the SSL connection, use the builder method below. For more information on setting up the server end of the EventStoreDB for SSL, see [SSL Setup](/server/generated/v21.2/docs/security/README.md).

```csharp
UseSslConnection(string targetHost, bool validateServer)
```

Uses an SSL-encrypted connection where `targetHost` is the name specified on the SSL certificate installed on the server, and `validateServer` controls whether the connection validates the server certificate.

::: warning
In production systems where credentials are sent from the client to EventStoreDB, you should always use SSL encryption and you should set `validateServer` to `true`.
:::

### Node preference

When connecting to an EventStoreDB HA cluster you can specify that operations are performed on any node, or only on the node that is the master.

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

Cluster settings are now embedded to the connection settings and all overloads that use `ClusterSettings` are obsolete. You can use the connection settings instance to configure cluster connection:

```csharp
var settings = ConnectionSettings
    .Create()
    .SetClusterDns("esdb.acme.cool")
    .SetClusterGossipPort(2113)
    .Build();
var connection = EventStoreConnection.Create(settings);
```

## Connection events

`EventStoreConnection` exposes events that your application can use to be notified of changes to the status of the connection.

<!-- TODO: Not moved. -->

| Event | Description |
|:------|:-------------|
| `EventHandler<ClientConnectionEventArgs> Connected` | Fired when an `IEventStoreConnection` connects to an EventStoreDB server. |
| `EventHandler<ClientConnectionEventArgs> Disconnected` | Fired when an `IEventStoreConnection` disconnects from an EventStoreDB server by some means other than by calling the `Close` method. |
| `EventHandler<ClientReconnectingEventArgs> Reconnecting` | Fired when an `IEventStoreConnection` is attempting to reconnect to an EventStoreDB server following a disconnection. |
| `EventHandler<ClientClosedEventArgs> Closed` | Fired when an `IEventStoreConnection` is closed either using the `Close` method or when reconnection limits are reached without a successful connection being established. |
| `EventHandler<ClientErrorEventArgs> ErrorOccurred` | Fired when an error is thrown on an `IEventStoreConnection`.|
| `EventHandler<ClientAuthenticationFailedEventArgs> AuthenticationFailed` | Fired when a client fails to authenticate to an EventStoreDB server. |

## Compatibility Mode

Enables the client to connect to either server configuration without needing to change the client's connection settings. Read more in [Compatibility Mode documentation](./compatibility-mode.md).

| Builder Method | Description |
|:---------------|:------------|
| `SetCompatibilityMode(string value)` | Specifies if the client should run in a specific version compatibility mode. Set `"auto"` for Auto-Compatibility Mode or `"5"` for v5 Compatibility Mode |
### Auto-Compatibility Mode

Auto-Compatibility mode was added to make the upgrade from an insecure v5 cluster to a secure v20+ cluster easier by allowing the client to connect to either server configuration without needing to change the client's connection settings.

Auto-Compatibility Mode is supported when connecting with Gossip Seeds or Cluster DNS Discovery.

You can enable auto-compatibility mode with `.SetCompatibilityMode("auto")` in the connection settings.

### v5 Compatibility Mode

The v5 Compatibility Mode allows the v21.2 client to connect to a v5 cluster.

You can set this with with `.SetCompatibilityMode("5")` in the connection settings.
