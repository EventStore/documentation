# Persistent subscriptions monitoring

The Client API includes helper methods that wrap the HTTP API to allow you to monitor persistent subscriptions. This page describes the methods found in the `PersistentSubscriptions` class. All methods in this class are asynchronous.

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

