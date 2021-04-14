# Persistent subscriptions monitoring

The Client API includes helper methods that wrap the HTTP API to allow you to monitor persistent subscriptions. This page describes the methods found in the `PersistentSubscriptionsManager` class. All methods in this class are asynchronous.

## Create the manager instance

Before accessing any of the methods described below, you need to create an instance of the `PersistentSubscriptionsManager` class. It needs a logger instance and one of the variations of the `EndPoint` abstract class. You would normally use either the `IpEndPoint` or `DnsEndPoint`. Since all HTTP calls would be redirected to the cluster leader, you can use an IP address of any cluster node. When using the `DnsEndPoint`, you can specify the DNS name of the cluster.

For example:

```csharp
var subscriptionManager = new PersistentSubscriptionsManager(
    new ConsoleLogger(),
    new DnsEndPoint("esdb.acme.org", 2113),
    TimeSpan.FromSeconds(1)
);
```

Notice that you need to specify the HTTP port that your application can reach. Most probably you'd need to use the external HTTP port, which is `2113` by default.

## Get all persistent subscriptions from all streams

Returns information about all persistent subscriptions from all streams.

```csharp
public Task List(UserCredentials userCredentials = null)
```

## Get persistent subscriptions for a stream

Returns information about the persistent subscription for a stream you specify with `stream`. You must have access to the stream.

```csharp
public Task List(string stream, UserCredentials userCredentials = null)
```

## Get persistent subscription for a stream

Gets the details of the persistent subscription `subscriptionName` on `stream`. You must have access to the persistent subscription and the stream.

```csharp
public Task Describe(string stream, string subscriptionName, UserCredentials userCredentials = null)
```

