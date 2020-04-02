---
outputFileName: index.html
---

# Persistent subscriptions management

The Client API includes helper methods that use the HTTP API to allow you to manage persistent subscriptions. This document describes the methods found in the `PersistentSubscriptions` class. All methods in this class are asynchronous.

## Methods

### Get information for all persistent subscriptions from all streams

Returns information about all persistent subscriptions from all streams.

```csharp
public Task List(UserCredentials userCredentials = null)
```

### Get information about the persistent subscriptions for a stream

Returns information about the persistent subscription for a stream you specify with `stream`. You must have access to the stream.

```csharp
public Task List(string stream, UserCredentials userCredentials = null)
```

### Get information for a persistent subscription for a stream

Gets the details of the persistent subscription `subscriptionName` on `stream`. You must have access to the persistent subscription and the stream.

```csharp
public Task Describe(string stream, string subscriptionName, UserCredentials userCredentials = null)
```

### Replay parked messages

Replays all parked messages for a particular persistent subscription `subscriptionName` on a `stream` that were parked by a negative acknowledgement action.

```csharp
public Task ReplayParkedMessages(string stream, string subscriptionName, UserCredentials userCredentials = null)
```
