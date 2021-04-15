# Connection string

Many of the `EventStoreConnection.Create` overloads accept a connection string that you can use to control settings of the connection. A benefit to having these as a connection string instead of using the fluent API is that you can change them between environments without recompiling (i.e. a single node in `dev` and a cluster in `production`).

Here are all available overloads for the `Create` methods of the `EventStoreConnection` class, which use the connection string:

| Method | Description |
|:-------|:------------|
| `Create(string connectionString)` | Connects to EventStoreDB with settings from connection string |
| `Create(string connectionString, ConnectionSettingsBuilder builder)` | Connects to EventStoreDB by merging connection string settings with pre-populated builder for additional settings |

The connection string format should look familiar to those who have used connection strings in the past. It consists of a series of key/value pairs separated by semicolons.

You can set the following values using the connection string:

| Name | Format | Description |
|:-----|:-------|:------------|
| ConnectTo | A URI in format described above to connect to | The URI to connect to |
| GossipSeeds | Comma separated list of ip:port | A list of seeds to try to discover from |
| ClusterDns | String | The DNS name of the cluster for discovery |
| ExternalGossipPort | Integer | The port to try to gossip on |
| DefaultUserCredentials | String in format username:password | The default credentials for the connection |
| MaxQueueSize | Integer | Maximum number of outstanding operations |
| MaxConcurrentItems | Integer | Maximum number of concurrent async operations |
| MaxRetries | Integer | Maximum number of retry attempts |
| MaxReconnections | Integer | The maximum number of times to try reconnecting |
| RequireMaster | True/false | If set the server will only process if it is master |
| ReconnectionDelay | Integer (milliseconds) | The delay before attempting to reconnect |
| OperationTimeout | Integer (milliseconds) | The time before considering an operation timed out |
| OperationTimeoutCheckPeriod | Integer (milliseconds) | The frequency in which to check timeouts |
| UseSslConnection | True/false | Whether to use SSL for this connection |
| TargetHost | String | The hostname expected on the certificate |
| ValidateServer | True/false | Whether to validate the remote server |
| FailOnNoServerResponse | True/False | Whether to fail on no server response |
| HeartbeatInterval | Integer (milliseconds) | The interval at which to send the server a heartbeat |
| HeartbeatTimeout | Integer (milliseconds) | The amount of time to receive a heartbeat response before timing out |
| MaxDiscoverAttempts | Integer | The maximum number of attempts to try to discover the cluster |
| GossipTimeout | Integer (milliseconds) | The amount of time before timing out a gossip response |
| VerboseLogging | True/false | Enables verbose logging |
| Compatibility Mode | auto, 5 | Enables the client to connect to either server configuration without needing to change the client's connection settings |

You can specify only one of `ConnectTo`, `ClusterDns` and `GossipSeeds`. Also, you'd only need to define `ExternalGossipPort` if you connect to the cluster using the DNS name (`ClusterDns`). The gossip port is usually the external HTTP port. When connecting to the cluster using `GossipSeeds`, you need to specify the gossip port for each node address in the list of seeds.

::: tip
You can also use spacing instead of camel casing in your connection string.
:::

```csharp
var connectionString = "ConnectTo=tcp://admin:changeit@localhost:1113; HeartBeatTimeout=500"
```

Sets the connection string to connect to `localhost` on the default port and sets the heartbeat timeout to 500ms.

```csharp
var connectionString = "Connect To = tcp://admin:changeit@localhost:1113; HeartBeat Timeout = 500"
```

Using spaces:

```csharp
var connectionString = "ConnectTo=discover://admin:changeit@mycluster:3114; HeartBeatTimeout=500"
```

Tells the connection to try gossiping to a manager node found under the DNS `mycluster` at port `3114` to connect to the cluster.

```csharp
var connectionString = "GossipSeeds=192.168.0.2:1111,192.168.0.3:1111; HeartBeatTimeout=500"
```

Tells the connection to try gossiping to the gossip seeds `192.168.0.2` or `192.168.0.3` on port '1111' to discover information about the cluster.

::: tip
You can also use the `ConnectionString` class to return a `ConnectionSettings` object.
:::
