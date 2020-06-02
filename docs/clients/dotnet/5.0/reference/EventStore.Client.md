---
title: EventStore.Client
---

# Namespace: EventStore.Client
## Class `AccessDeniedException`

Exception thrown when a user is not authorised to carry out
an operation.

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`

### Inherited members
-  `System.Exception.GetBaseException()`
### Syntax
```csharp
public class AccessDeniedException : Exception, ISerializable
```

### Constructor `AccessDeniedException(String, Exception)`

#### Syntax
```csharp
public AccessDeniedException(string message, Exception innerException)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`message` | `string` | 
`innerException` | `System.Exception` | 



## Class `ClusterAwareHttpHandler`

### Inheritance
↳ `DelegatingHandler`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public class ClusterAwareHttpHandler : DelegatingHandler
```

### Method `Create(EventStoreClientSettings, Nullable<HttpMessageHandler>)`

#### Syntax
```csharp
public static ClusterAwareHttpHandler Create(EventStoreClientSettings settings, HttpMessageHandler? httpMessageHandler = default(HttpMessageHandler? ))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`settings` | `EventStore.Client.EventStoreClientSettings` | 
`httpMessageHandler` | `HttpMessageHandler?` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.ClusterAwareHttpHandler` | 



### Constructor `ClusterAwareHttpHandler(Boolean, IEndpointDiscoverer)`

#### Syntax
```csharp
public ClusterAwareHttpHandler(bool requiresLeader, IEndpointDiscoverer endpointDiscoverer)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`requiresLeader` | `bool` | 
`endpointDiscoverer` | `EventStore.Client.IEndpointDiscoverer` | 



### Method `SendAsync(HttpRequestMessage, CancellationToken)`

#### Syntax
```csharp
protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `HttpRequestMessage` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`System.Threading.Tasks.Task<HttpResponseMessage>` | 



### Method `ExceptionOccurred(Exception)`

#### Syntax
```csharp
public void ExceptionOccurred(Exception exception)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`exception` | `System.Exception` | 



## Class `ClusterMessages`

### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
public class ClusterMessages
```


## Class `ClusterMessages.ClusterInfo`

### Inheritance
↳ `object`
### Syntax
```csharp
public class ClusterInfo
```

### Property `Members`

#### Syntax
```csharp
public ClusterMessages.MemberInfo[] Members { get; set; }
```


## Class `ClusterMessages.MemberInfo`

### Inheritance
↳ `object`
### Syntax
```csharp
public class MemberInfo
```

### Property `InstanceId`

#### Syntax
```csharp
public Guid InstanceId { get; set; }
```


### Property `State`

#### Syntax
```csharp
public ClusterMessages.VNodeState State { get; set; }
```


### Property `IsAlive`

#### Syntax
```csharp
public bool IsAlive { get; set; }
```


### Property `HttpEndPointIp`

#### Syntax
```csharp
public string HttpEndPointIp { get; set; }
```


### Property `HttpEndPointPort`

#### Syntax
```csharp
public int HttpEndPointPort { get; set; }
```


## Enum `ClusterMessages.VNodeState`

### Syntax
```csharp
public enum VNodeState
```

### Fields
Name | Description
--- | ---
Initializing | 
Unknown | 
PreReplica | 
CatchingUp | 
Clone | 
Follower | 
PreLeader | 
Leader | 
Manager | 
ShuttingDown | 
Shutdown | 
ReadOnlyLeaderless | 
PreReadOnlyReplica | 
ReadOnlyReplica | 
ResigningLeader | 
## Class `DiscoveryException`

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`

### Inherited members
-  `System.Exception.GetBaseException()`
### Syntax
```csharp
public class DiscoveryException : Exception, ISerializable
```

### Constructor `DiscoveryException(String, Exception)`

#### Syntax
```csharp
public DiscoveryException(string message, Exception innerException = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`message` | `string` | 
`innerException` | `System.Exception?` | 



## Class `EventData`

### Inheritance
↳ `object`
### Syntax
```csharp
public sealed class EventData
```

### Field `Data`

#### Syntax
```csharp
public ReadOnlyMemory<byte> Data
```


### Field `EventId`

#### Syntax
```csharp
public Uuid EventId
```


### Field `Metadata`

#### Syntax
```csharp
public ReadOnlyMemory<byte> Metadata
```


### Field `Type`

#### Syntax
```csharp
public string Type
```


### Field `ContentType`

#### Syntax
```csharp
public string ContentType
```


### Constructor `EventData(Uuid, String, ReadOnlyMemory<Byte>, Nullable<ReadOnlyMemory<Byte>>, String)`

#### Syntax
```csharp
public EventData(Uuid eventId, string type, ReadOnlyMemory<byte> data, ReadOnlyMemory<byte>? metadata = default(ReadOnlyMemory<byte>? ), string contentType = "application/json")
```
#### Parameters
Name | Type | Description
--- | --- | ---
`eventId` | `EventStore.Client.Uuid` | 
`type` | `string` | 
`data` | `System.ReadOnlyMemory<byte>` | 
`metadata` | `System.ReadOnlyMemory<byte>?` | 
`contentType` | `string` | 



## Class `EventRecord`

### Inheritance
↳ `object`
### Syntax
```csharp
public class EventRecord
```

### Field `EventStreamId`

#### Syntax
```csharp
public string EventStreamId
```


### Field `EventId`

#### Syntax
```csharp
public Uuid EventId
```


### Field `EventNumber`

#### Syntax
```csharp
public StreamPosition EventNumber
```


### Field `EventType`

#### Syntax
```csharp
public string EventType
```


### Field `Data`

#### Syntax
```csharp
public ReadOnlyMemory<byte> Data
```


### Field `Metadata`

#### Syntax
```csharp
public ReadOnlyMemory<byte> Metadata
```


### Field `Created`

#### Syntax
```csharp
public DateTime Created
```


### Field `Position`

#### Syntax
```csharp
public Position Position
```


### Field `ContentType`

#### Syntax
```csharp
public string ContentType
```


### Constructor `EventRecord(String, Uuid, StreamPosition, Position, IDictionary<String, String>, ReadOnlyMemory<Byte>, ReadOnlyMemory<Byte>)`

#### Syntax
```csharp
public EventRecord(string eventStreamId, Uuid eventId, StreamPosition eventNumber, Position position, IDictionary<string, string> metadata, ReadOnlyMemory<byte> data, ReadOnlyMemory<byte> customMetadata)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`eventStreamId` | `string` | 
`eventId` | `EventStore.Client.Uuid` | 
`eventNumber` | `EventStore.Client.StreamPosition` | 
`position` | `EventStore.Client.Position` | 
`metadata` | `System.Collections.Generic.IDictionary<string, string>` | 
`data` | `System.ReadOnlyMemory<byte>` | 
`customMetadata` | `System.ReadOnlyMemory<byte>` | 



## Class `EventStoreClientBase`

### Inheritance
↳ `object`
### Syntax
```csharp
public abstract class EventStoreClientBase : IDisposable
```

### Property `CallInvoker`

#### Syntax
```csharp
protected CallInvoker CallInvoker { get; }
```


### Property `Settings`

#### Syntax
```csharp
protected EventStoreClientSettings Settings { get; }
```


### Constructor `EventStoreClientBase(EventStoreClientSettings, IDictionary<String, Func<RpcException, Exception>>)`

#### Syntax
```csharp
protected EventStoreClientBase(EventStoreClientSettings settings, IDictionary<string, Func<RpcException, Exception>> exceptionMap)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`settings` | `EventStore.Client.EventStoreClientSettings?` | 
`exceptionMap` | `System.Collections.Generic.IDictionary<string, System.Func<RpcException, System.Exception>>` | 



### Method `Dispose()`

#### Syntax
```csharp
public void Dispose()
```


## Class `EventStoreClientConnectivitySettings`

### Inheritance
↳ `object`
### Syntax
```csharp
public class EventStoreClientConnectivitySettings
```

### Property `Address`

#### Syntax
```csharp
public Uri Address { get; set; }
```


### Property `MaxDiscoverAttempts`

#### Syntax
```csharp
public int MaxDiscoverAttempts { get; set; }
```


### Property `GossipSeeds`

#### Syntax
```csharp
public EndPoint[] GossipSeeds { get; }
```


### Property `DnsGossipSeeds`

#### Syntax
```csharp
public DnsEndPoint[] DnsGossipSeeds { get; set; }
```


### Property `IpGossipSeeds`

#### Syntax
```csharp
public IPEndPoint[] IpGossipSeeds { get; set; }
```


### Property `GossipTimeout`

#### Syntax
```csharp
public TimeSpan GossipTimeout { get; set; }
```


### Property `DiscoveryInterval`

#### Syntax
```csharp
public TimeSpan DiscoveryInterval { get; set; }
```


### Property `NodePreference`

#### Syntax
```csharp
public NodePreference NodePreference { get; set; }
```


### Property `Default`

#### Syntax
```csharp
public static EventStoreClientConnectivitySettings Default { get; }
```


## Class `EventStoreClientOperationOptions`

### Inheritance
↳ `object`
### Syntax
```csharp
public class EventStoreClientOperationOptions
```

### Property `TimeoutAfter`

#### Syntax
```csharp
public TimeSpan? TimeoutAfter { get; set; }
```


### Property `ThrowOnAppendFailure`

#### Syntax
```csharp
public bool ThrowOnAppendFailure { get; set; }
```


### Property `Default`

#### Syntax
```csharp
public static EventStoreClientOperationOptions Default { get; }
```


### Method `Clone()`

#### Syntax
```csharp
public EventStoreClientOperationOptions Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.EventStoreClientOperationOptions` | 



## Class `EventStoreClientSettings`

### Inheritance
↳ `object`
### Syntax
```csharp
public class EventStoreClientSettings
```

### Property `Interceptors`

#### Syntax
```csharp
public IEnumerable<Interceptor> Interceptors { get; set; }
```


### Property `ConnectionName`

#### Syntax
```csharp
public string ConnectionName { get; set; }
```


### Property `CreateHttpMessageHandler`

#### Syntax
```csharp
public Func<HttpMessageHandler> CreateHttpMessageHandler { get; set; }
```


### Property `LoggerFactory`

#### Syntax
```csharp
public ILoggerFactory? LoggerFactory { get; set; }
```


### Property `OperationOptions`

#### Syntax
```csharp
public EventStoreClientOperationOptions OperationOptions { get; set; }
```


### Property `ConnectivitySettings`

#### Syntax
```csharp
public EventStoreClientConnectivitySettings ConnectivitySettings { get; set; }
```


### Property `DefaultCredentials`

#### Syntax
```csharp
public UserCredentials DefaultCredentials { get; set; }
```


## Class `ClusterEndpointDiscoverer`

### Inheritance
↳ `object`
### Syntax
```csharp
public class ClusterEndpointDiscoverer : IEndpointDiscoverer
```

### Constructor `ClusterEndpointDiscoverer(Int32, EndPoint[], TimeSpan, TimeSpan, NodePreference, Nullable<HttpMessageHandler>)`

#### Syntax
```csharp
public ClusterEndpointDiscoverer(int maxDiscoverAttempts, EndPoint[] gossipSeeds, TimeSpan gossipTimeout, TimeSpan discoveryInterval, NodePreference nodePreference, HttpMessageHandler? httpMessageHandler = default(HttpMessageHandler? ))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`maxDiscoverAttempts` | `int` | 
`gossipSeeds` | `EndPoint[]` | 
`gossipTimeout` | `System.TimeSpan` | 
`discoveryInterval` | `System.TimeSpan` | 
`nodePreference` | `EventStore.Client.NodePreference` | 
`httpMessageHandler` | `HttpMessageHandler?` | 



### Method `DiscoverAsync()`

#### Syntax
```csharp
public Task<EndPoint> DiscoverAsync()
```
#### Returns
Type | Description
--- | ---
`System.Threading.Tasks.Task<EndPoint>` | 



## Struct `HashCode`

### Syntax
```csharp
public struct HashCode
```

### Field `Hash`

#### Syntax
```csharp
public static HashCode Hash
```


### Method `Combine<T>(Nullable<T>)`

#### Syntax
```csharp
public HashCode Combine<T>(T? value)
    where T : struct
```
#### Generic parameters
Name | Description
--- | ---
`T` | 

#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `T?` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.HashCode` | 



### Method `Combine<T>(T)`

#### Syntax
```csharp
public HashCode Combine<T>(T value)
    where T : struct
```
#### Generic parameters
Name | Description
--- | ---
`T` | 

#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `T` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.HashCode` | 



### Method `Combine(String)`

#### Syntax
```csharp
public HashCode Combine(string value)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `string?` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.HashCode` | 



### Method `Combine<T>(IEnumerable<T>)`

#### Syntax
```csharp
public HashCode Combine<T>(IEnumerable<T> values)
    where T : struct
```
#### Generic parameters
Name | Description
--- | ---
`T` | 

#### Parameters
Name | Type | Description
--- | --- | ---
`values` | `System.Collections.Generic.IEnumerable<T>?` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.HashCode` | 



### Method `Combine(IEnumerable<String>)`

#### Syntax
```csharp
public HashCode Combine(IEnumerable<string> values)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`values` | `System.Collections.Generic.IEnumerable<string>?` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.HashCode` | 



Operator: EventStore.Client.HashCode.op_Implicit(EventStore.Client.HashCode)~System.Int32

## Interface `IEndpointDiscoverer`

### Syntax
```csharp
public interface IEndpointDiscoverer
```

### Method `DiscoverAsync()`

#### Syntax
```csharp
Task<EndPoint> DiscoverAsync()
```
#### Returns
Type | Description
--- | ---
`System.Threading.Tasks.Task<EndPoint>` | 



## Enum `NodePreference`

### Syntax
```csharp
public enum NodePreference
```

### Fields
Name | Description
--- | ---
Leader | 
Follower | 
Random | 
ReadOnlyReplica | 
## Class `NotAuthenticatedException`

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`

### Inherited members
-  `System.Exception.GetBaseException()`
### Syntax
```csharp
public class NotAuthenticatedException : Exception, ISerializable
```

### Constructor `NotAuthenticatedException()`

#### Syntax
```csharp
public NotAuthenticatedException()
```


### Constructor `NotAuthenticatedException(String)`

#### Syntax
```csharp
public NotAuthenticatedException(string message)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`message` | `string` | 



### Constructor `NotAuthenticatedException(String, Exception)`

#### Syntax
```csharp
public NotAuthenticatedException(string message, Exception innerException)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`message` | `string` | 
`innerException` | `System.Exception` | 



### Constructor `NotAuthenticatedException(SerializationInfo, StreamingContext)`

#### Syntax
```csharp
protected NotAuthenticatedException(SerializationInfo info, StreamingContext context)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`info` | `System.Runtime.Serialization.SerializationInfo` | 
`context` | `System.Runtime.Serialization.StreamingContext` | 



## Class `NotLeaderException`

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`
### Syntax
```csharp
public class NotLeaderException : Exception, ISerializable
```

### Property `LeaderEndpoint`

#### Syntax
```csharp
public EndPoint LeaderEndpoint { get; }
```


### Constructor `NotLeaderException(EndPoint, Exception)`

#### Syntax
```csharp
public NotLeaderException(EndPoint newLeaderEndpoint, Exception exception = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`newLeaderEndpoint` | `EndPoint` | 
`exception` | `System.Exception?` | 



## Struct `Position`

A structure referring to a potential logical record position
in the Event Store transaction file.

### Syntax
```csharp
public struct Position : IEquatable<Position>, IComparable<Position>
```

### Field `Start`

Position representing the start of the transaction file

#### Syntax
```csharp
public static Position Start
```


### Field `End`

Position representing the end of the transaction file

#### Syntax
```csharp
public static Position End
```


### Field `CommitPosition`

The commit position of the record

#### Syntax
```csharp
public ulong CommitPosition
```


### Field `PreparePosition`

The prepare position of the record.

#### Syntax
```csharp
public ulong PreparePosition
```


### Constructor `Position(UInt64, UInt64)`

Constructs a position with the given commit and prepare positions.
It is not guaranteed that the position is actually the start of a
record in the transaction file.

The commit position cannot be less than the prepare position.

#### Syntax
```csharp
public Position(ulong commitPosition, ulong preparePosition)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`commitPosition` | `ulong` | The commit position of the record.
`preparePosition` | `ulong` | The prepare position of the record.



Operator: EventStore.Client.Position.op_LessThan(EventStore.Client.Position,EventStore.Client.Position)

Operator: EventStore.Client.Position.op_GreaterThan(EventStore.Client.Position,EventStore.Client.Position)

Operator: EventStore.Client.Position.op_GreaterThanOrEqual(EventStore.Client.Position,EventStore.Client.Position)

Operator: EventStore.Client.Position.op_LessThanOrEqual(EventStore.Client.Position,EventStore.Client.Position)

Operator: EventStore.Client.Position.op_Equality(EventStore.Client.Position,EventStore.Client.Position)

Operator: EventStore.Client.Position.op_Inequality(EventStore.Client.Position,EventStore.Client.Position)

### Method `CompareTo(Position)`

#### Syntax
```csharp
public int CompareTo(Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Position` | 

#### Returns
Type | Description
--- | ---
`int` | 



### Method `Equals(Object)`

Indicates whether this instance and a specified object are equal.

#### Syntax
```csharp
public override bool Equals(object obj)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`obj` | `object?` | Another object to compare to. 

#### Returns
Type | Description
--- | ---
`bool` | 
true if <code data-dev-comment-type="paramref" class="paramref">obj</code> and this instance are the same type and represent the same value; otherwise, false.




### Method `Equals(Position)`

#### Syntax
```csharp
public bool Equals(Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Position` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `GetHashCode()`

Returns the hash code for this instance.

#### Syntax
```csharp
public override int GetHashCode()
```
#### Returns
Type | Description
--- | ---
`int` | 
A 32-bit signed integer that is the hash code for this instance.




### Method `ToString()`

#### Syntax
```csharp
public override string ToString()
```
#### Returns
Type | Description
--- | ---
`string` | 



## Class `RequiredMetadataPropertyMissingException`

Exception thrown when a required metadata property is missing.

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`

### Inherited members
-  `System.Exception.GetBaseException()`
### Syntax
```csharp
public class RequiredMetadataPropertyMissingException : Exception, ISerializable
```

### Constructor `RequiredMetadataPropertyMissingException(String, Exception)`

#### Syntax
```csharp
public RequiredMetadataPropertyMissingException(string missingMetadataProperty, Exception innerException = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`missingMetadataProperty` | `string` | 
`innerException` | `System.Exception?` | 



## Struct `ResolvedEvent`

### Syntax
```csharp
public struct ResolvedEvent
```

### Field `Event`

#### Syntax
```csharp
public EventRecord Event
```


### Field `Link`

#### Syntax
```csharp
public EventRecord Link
```


### Property `OriginalEvent`

#### Syntax
```csharp
public EventRecord OriginalEvent { get; }
```


### Field `OriginalPosition`

Position of the OriginalEvent (unresolved link or event) if available

#### Syntax
```csharp
public Position? OriginalPosition
```


### Property `OriginalStreamId`

#### Syntax
```csharp
public string OriginalStreamId { get; }
```


### Property `OriginalEventNumber`

#### Syntax
```csharp
public StreamPosition OriginalEventNumber { get; }
```


### Property `IsResolved`

#### Syntax
```csharp
public bool IsResolved { get; }
```


### Constructor `ResolvedEvent(EventRecord, EventRecord, Nullable<UInt64>)`

#### Syntax
```csharp
public ResolvedEvent(EventRecord event, EventRecord link, ulong? commitPosition)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`event` | `EventStore.Client.EventRecord` | 
`link` | `EventStore.Client.EventRecord?` | 
`commitPosition` | `ulong?` | 



## Class `ScavengeNotFoundException`

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`
### Syntax
```csharp
public class ScavengeNotFoundException : Exception, ISerializable
```

### Property `ScavengeId`

#### Syntax
```csharp
public string ScavengeId { get; }
```


### Constructor `ScavengeNotFoundException(String, Exception)`

#### Syntax
```csharp
public ScavengeNotFoundException(string scavengeId, Exception exception = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`scavengeId` | `string?` | 
`exception` | `System.Exception?` | 



## Class `StreamDeletedException`

Exception thrown if an operation is attempted on a stream which
has been deleted.

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`
### Syntax
```csharp
public class StreamDeletedException : Exception, ISerializable
```

### Field `Stream`

The name of the deleted stream.

#### Syntax
```csharp
public string Stream
```


### Constructor `StreamDeletedException(String, Exception)`

#### Syntax
```csharp
public StreamDeletedException(string stream, Exception exception = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`stream` | `string` | 
`exception` | `System.Exception?` | 



## Class `StreamNotFoundException`

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`
### Syntax
```csharp
public class StreamNotFoundException : Exception, ISerializable
```

### Field `Stream`

The name of the deleted stream.

#### Syntax
```csharp
public string Stream
```


### Constructor `StreamNotFoundException(String, Exception)`

#### Syntax
```csharp
public StreamNotFoundException(string stream, Exception exception = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`stream` | `string` | 
`exception` | `System.Exception?` | 



## Struct `StreamPosition`

### Syntax
```csharp
public struct StreamPosition : IEquatable<StreamPosition>, IComparable<StreamPosition>
```

### Field `Start`

#### Syntax
```csharp
public static StreamPosition Start
```


### Field `End`

#### Syntax
```csharp
public static StreamPosition End
```


### Method `FromInt64(Int64)`

#### Syntax
```csharp
public static StreamPosition FromInt64(long value)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `long` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.StreamPosition` | 



### Constructor `StreamPosition(UInt64)`

#### Syntax
```csharp
public StreamPosition(ulong value)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `ulong` | 



### Method `CompareTo(StreamPosition)`

#### Syntax
```csharp
public int CompareTo(StreamPosition other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.StreamPosition` | 

#### Returns
Type | Description
--- | ---
`int` | 



### Method `Equals(StreamPosition)`

#### Syntax
```csharp
public bool Equals(StreamPosition other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.StreamPosition` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `Equals(Object)`

#### Syntax
```csharp
public override bool Equals(object obj)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`obj` | `object?` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `GetHashCode()`

#### Syntax
```csharp
public override int GetHashCode()
```
#### Returns
Type | Description
--- | ---
`int` | 



Operator: EventStore.Client.StreamPosition.op_Equality(EventStore.Client.StreamPosition,EventStore.Client.StreamPosition)

Operator: EventStore.Client.StreamPosition.op_Inequality(EventStore.Client.StreamPosition,EventStore.Client.StreamPosition)

Operator: EventStore.Client.StreamPosition.op_Addition(EventStore.Client.StreamPosition,System.UInt64)

Operator: EventStore.Client.StreamPosition.op_Addition(System.UInt64,EventStore.Client.StreamPosition)

Operator: EventStore.Client.StreamPosition.op_Subtraction(EventStore.Client.StreamPosition,System.UInt64)

Operator: EventStore.Client.StreamPosition.op_Subtraction(System.UInt64,EventStore.Client.StreamPosition)

Operator: EventStore.Client.StreamPosition.op_GreaterThan(EventStore.Client.StreamPosition,EventStore.Client.StreamPosition)

Operator: EventStore.Client.StreamPosition.op_LessThan(EventStore.Client.StreamPosition,EventStore.Client.StreamPosition)

Operator: EventStore.Client.StreamPosition.op_GreaterThanOrEqual(EventStore.Client.StreamPosition,EventStore.Client.StreamPosition)

Operator: EventStore.Client.StreamPosition.op_LessThanOrEqual(EventStore.Client.StreamPosition,EventStore.Client.StreamPosition)

### Method `ToInt64()`

#### Syntax
```csharp
public long ToInt64()
```
#### Returns
Type | Description
--- | ---
`long` | 



Operator: EventStore.Client.StreamPosition.op_Implicit(EventStore.Client.StreamPosition)~System.UInt64

Operator: EventStore.Client.StreamPosition.op_Implicit(System.UInt64)~EventStore.Client.StreamPosition

### Method `ToString()`

#### Syntax
```csharp
public override string ToString()
```
#### Returns
Type | Description
--- | ---
`string` | 



### Method `ToUInt64()`

#### Syntax
```csharp
public ulong ToUInt64()
```
#### Returns
Type | Description
--- | ---
`ulong` | 



## Struct `StreamRevision`

### Syntax
```csharp
public struct StreamRevision : IEquatable<StreamRevision>, IComparable<StreamRevision>
```

### Field `None`

#### Syntax
```csharp
public static StreamRevision None
```


### Method `FromInt64(Int64)`

#### Syntax
```csharp
public static StreamRevision FromInt64(long value)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `long` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.StreamRevision` | 



### Constructor `StreamRevision(UInt64)`

#### Syntax
```csharp
public StreamRevision(ulong value)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `ulong` | 



### Method `CompareTo(StreamRevision)`

#### Syntax
```csharp
public int CompareTo(StreamRevision other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.StreamRevision` | 

#### Returns
Type | Description
--- | ---
`int` | 



### Method `Equals(StreamRevision)`

#### Syntax
```csharp
public bool Equals(StreamRevision other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.StreamRevision` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `Equals(Object)`

#### Syntax
```csharp
public override bool Equals(object obj)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`obj` | `object?` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `GetHashCode()`

#### Syntax
```csharp
public override int GetHashCode()
```
#### Returns
Type | Description
--- | ---
`int` | 



Operator: EventStore.Client.StreamRevision.op_Equality(EventStore.Client.StreamRevision,EventStore.Client.StreamRevision)

Operator: EventStore.Client.StreamRevision.op_Inequality(EventStore.Client.StreamRevision,EventStore.Client.StreamRevision)

Operator: EventStore.Client.StreamRevision.op_Addition(EventStore.Client.StreamRevision,System.UInt64)

Operator: EventStore.Client.StreamRevision.op_Addition(System.UInt64,EventStore.Client.StreamRevision)

Operator: EventStore.Client.StreamRevision.op_Subtraction(EventStore.Client.StreamRevision,System.UInt64)

Operator: EventStore.Client.StreamRevision.op_Subtraction(System.UInt64,EventStore.Client.StreamRevision)

Operator: EventStore.Client.StreamRevision.op_GreaterThan(EventStore.Client.StreamRevision,EventStore.Client.StreamRevision)

Operator: EventStore.Client.StreamRevision.op_LessThan(EventStore.Client.StreamRevision,EventStore.Client.StreamRevision)

Operator: EventStore.Client.StreamRevision.op_GreaterThanOrEqual(EventStore.Client.StreamRevision,EventStore.Client.StreamRevision)

Operator: EventStore.Client.StreamRevision.op_LessThanOrEqual(EventStore.Client.StreamRevision,EventStore.Client.StreamRevision)

### Method `ToInt64()`

#### Syntax
```csharp
public long ToInt64()
```
#### Returns
Type | Description
--- | ---
`long` | 



Operator: EventStore.Client.StreamRevision.op_Implicit(EventStore.Client.StreamRevision)~System.UInt64

Operator: EventStore.Client.StreamRevision.op_Implicit(System.UInt64)~EventStore.Client.StreamRevision

### Method `ToString()`

#### Syntax
```csharp
public override string ToString()
```
#### Returns
Type | Description
--- | ---
`string` | 



### Method `ToUInt64()`

#### Syntax
```csharp
public ulong ToUInt64()
```
#### Returns
Type | Description
--- | ---
`ulong` | 



## Struct `StreamState`

### Syntax
```csharp
public struct StreamState : IEquatable<StreamState>
```

### Field `NoStream`

#### Syntax
```csharp
public static StreamState NoStream
```


### Field `Any`

#### Syntax
```csharp
public static StreamState Any
```


### Field `StreamExists`

#### Syntax
```csharp
public static StreamState StreamExists
```


### Method `Equals(StreamState)`

#### Syntax
```csharp
public bool Equals(StreamState other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.StreamState` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `Equals(Object)`

#### Syntax
```csharp
public override bool Equals(object obj)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`obj` | `object?` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `GetHashCode()`

#### Syntax
```csharp
public override int GetHashCode()
```
#### Returns
Type | Description
--- | ---
`int` | 



Operator: EventStore.Client.StreamState.op_Equality(EventStore.Client.StreamState,EventStore.Client.StreamState)

Operator: EventStore.Client.StreamState.op_Inequality(EventStore.Client.StreamState,EventStore.Client.StreamState)

### Method `ToInt64()`

#### Syntax
```csharp
public long ToInt64()
```
#### Returns
Type | Description
--- | ---
`long` | 



Operator: EventStore.Client.StreamState.op_Implicit(EventStore.Client.StreamState)~System.Int32

### Method `ToString()`

#### Syntax
```csharp
public override string ToString()
```
#### Returns
Type | Description
--- | ---
`string` | 



## Enum `SubscriptionDroppedReason`

### Syntax
```csharp
public enum SubscriptionDroppedReason
```

### Fields
Name | Description
--- | ---
Disposed | 
SubscriberError | 
ServerError | 
## Class `SystemRoles`

### Inheritance
↳ `object`
### Syntax
```csharp
public static class SystemRoles
```

### Field `Admins`

#### Syntax
```csharp
public static string Admins = "$admins"
```


### Field `Operations`

#### Syntax
```csharp
public static string Operations = "$ops"
```


### Field `All`

#### Syntax
```csharp
public static string All = "$all"
```


## Class `UserCredentials`

### Inheritance
↳ `object`
### Syntax
```csharp
public class UserCredentials
```

### Field `Username`

#### Syntax
```csharp
public string Username
```


### Field `Password`

#### Syntax
```csharp
public string Password
```


### Constructor `UserCredentials(String, String)`

#### Syntax
```csharp
public UserCredentials(string username, string password)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`username` | `string` | 
`password` | `string` | 



## Class `UserNotFoundException`

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`
### Syntax
```csharp
public class UserNotFoundException : Exception, ISerializable
```

### Property `LoginName`

#### Syntax
```csharp
public string LoginName { get; }
```


### Constructor `UserNotFoundException(String, Exception)`

#### Syntax
```csharp
public UserNotFoundException(string loginName, Exception exception = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`loginName` | `string` | 
`exception` | `System.Exception?` | 



## Struct `Uuid`

### Syntax
```csharp
public struct Uuid : IEquatable<Uuid>
```

### Field `Empty`

#### Syntax
```csharp
public static Uuid Empty
```


### Method `NewUuid()`

#### Syntax
```csharp
public static Uuid NewUuid()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Uuid` | 



### Method `FromGuid(Guid)`

#### Syntax
```csharp
public static Uuid FromGuid(Guid value)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `System.Guid` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Uuid` | 



### Method `Parse(String)`

#### Syntax
```csharp
public static Uuid Parse(string value)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`value` | `string` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Uuid` | 



### Method `FromInt64(Int64, Int64)`

#### Syntax
```csharp
public static Uuid FromInt64(long msb, long lsb)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`msb` | `long` | 
`lsb` | `long` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Uuid` | 



### Method `FromDto(UUID)`

#### Syntax
```csharp
public static Uuid FromDto(UUID dto)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`dto` | `EventStore.Client.UUID` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Uuid` | 



### Method `ToDto()`

#### Syntax
```csharp
public UUID ToDto()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.UUID` | 



### Method `Equals(Uuid)`

#### Syntax
```csharp
public bool Equals(Uuid other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Uuid` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `Equals(Object)`

#### Syntax
```csharp
public override bool Equals(object obj)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`obj` | `object?` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `GetHashCode()`

#### Syntax
```csharp
public override int GetHashCode()
```
#### Returns
Type | Description
--- | ---
`int` | 



Operator: EventStore.Client.Uuid.op_Equality(EventStore.Client.Uuid,EventStore.Client.Uuid)

Operator: EventStore.Client.Uuid.op_Inequality(EventStore.Client.Uuid,EventStore.Client.Uuid)

### Method `ToString()`

#### Syntax
```csharp
public override string ToString()
```
#### Returns
Type | Description
--- | ---
`string` | 



### Method `ToString(String)`

#### Syntax
```csharp
public string ToString(string format)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`format` | `string` | 

#### Returns
Type | Description
--- | ---
`string` | 



### Method `ToGuid()`

#### Syntax
```csharp
public Guid ToGuid()
```
#### Returns
Type | Description
--- | ---
`System.Guid` | 



## Class `WrongExpectedVersionException`

### Inheritance
↳ `object`<br>&nbsp;&nbsp;↳ `System.Exception`
### Syntax
```csharp
public class WrongExpectedVersionException : Exception, ISerializable
```

### Property `StreamName`

#### Syntax
```csharp
public string StreamName { get; }
```


### Property `ExpectedVersion`

If available, the expected version specified for the operation that failed.

#### Syntax
```csharp
public long? ExpectedVersion { get; }
```


### Property `ActualVersion`

If available, the current version of the stream that the operation was attempted on.

#### Syntax
```csharp
public long? ActualVersion { get; }
```


### Constructor `WrongExpectedVersionException(String, Nullable<Int64>, Nullable<Int64>, Exception)`

#### Syntax
```csharp
public WrongExpectedVersionException(string streamName, long? expectedVersion, long? actualVersion, Exception exception = null)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`streamName` | `string` | 
`expectedVersion` | `long?` | 
`actualVersion` | `long?` | 
`exception` | `System.Exception?` | 



## Class `SharedReflection`
Holder for reflection information generated from shared.proto
### Inheritance
↳ `object`
### Syntax
```csharp
public static class SharedReflection
```

### Property `Descriptor`
File descriptor for shared.proto
#### Syntax
```csharp
public static Google.Protobuf.Reflection.FileDescriptor Descriptor { get; }
```


## Class `UUID`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.UUID>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class UUID : Google.Protobuf.IMessage<UUID>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<UUID> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `UUID()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUID()
```


### Constructor `UUID(UUID)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUID(UUID other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.UUID` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUID Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.UUID` | 



### Field `StructuredFieldNumber`
Field number for the &quot;structured&quot; field.
#### Syntax
```csharp
public static int StructuredFieldNumber = 1
```


### Property `Structured`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUID.Types.Structured Structured { get; set; }
```


### Field `StringFieldNumber`
Field number for the &quot;string&quot; field.
#### Syntax
```csharp
public static int StringFieldNumber = 2
```


### Property `String`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string String { get; set; }
```


### Property `ValueCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUID.ValueOneofCase ValueCase { get; }
```


### Method `ClearValue()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearValue()
```


### Method `Equals(Object)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override bool Equals(object other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `object` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `Equals(UUID)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(UUID other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.UUID` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `GetHashCode()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override int GetHashCode()
```
#### Returns
Type | Description
--- | ---
`int` | 



### Method `ToString()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override string ToString()
```
#### Returns
Type | Description
--- | ---
`string` | 



### Method `WriteTo(Google.Protobuf.CodedOutputStream)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void WriteTo(Google.Protobuf.CodedOutputStream output)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`output` | `Google.Protobuf.CodedOutputStream` | 



### Method `CalculateSize()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int CalculateSize()
```
#### Returns
Type | Description
--- | ---
`int` | 



### Method `MergeFrom(UUID)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(UUID other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.UUID` | 



### Method `MergeFrom(Google.Protobuf.CodedInputStream)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(Google.Protobuf.CodedInputStream input)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`input` | `Google.Protobuf.CodedInputStream` | 



## Enum `UUID.ValueOneofCase`
Enum of possible cases for the &quot;value&quot; oneof.
### Syntax
```csharp
public enum ValueOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Structured | 
String | 
## Class `UUID.Types`
Container for nested types declared in the UUID message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `UUID.Types.Structured`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.UUID.Types.Structured>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Structured : Google.Protobuf.IMessage<UUID.Types.Structured>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<UUID.Types.Structured> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Structured()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Structured()
```


### Constructor `Structured(UUID.Types.Structured)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Structured(UUID.Types.Structured other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.UUID.Types.Structured` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUID.Types.Structured Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.UUID.Types.Structured` | 



### Field `MostSignificantBitsFieldNumber`
Field number for the &quot;most_significant_bits&quot; field.
#### Syntax
```csharp
public static int MostSignificantBitsFieldNumber = 1
```


### Property `MostSignificantBits`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long MostSignificantBits { get; set; }
```


### Field `LeastSignificantBitsFieldNumber`
Field number for the &quot;least_significant_bits&quot; field.
#### Syntax
```csharp
public static int LeastSignificantBitsFieldNumber = 2
```


### Property `LeastSignificantBits`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long LeastSignificantBits { get; set; }
```


### Method `Equals(Object)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override bool Equals(object other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `object` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `Equals(UUID.Types.Structured)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(UUID.Types.Structured other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.UUID.Types.Structured` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `GetHashCode()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override int GetHashCode()
```
#### Returns
Type | Description
--- | ---
`int` | 



### Method `ToString()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override string ToString()
```
#### Returns
Type | Description
--- | ---
`string` | 



### Method `WriteTo(Google.Protobuf.CodedOutputStream)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void WriteTo(Google.Protobuf.CodedOutputStream output)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`output` | `Google.Protobuf.CodedOutputStream` | 



### Method `CalculateSize()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int CalculateSize()
```
#### Returns
Type | Description
--- | ---
`int` | 



### Method `MergeFrom(UUID.Types.Structured)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(UUID.Types.Structured other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.UUID.Types.Structured` | 



### Method `MergeFrom(Google.Protobuf.CodedInputStream)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(Google.Protobuf.CodedInputStream input)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`input` | `Google.Protobuf.CodedInputStream` | 



## Class `Empty`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Empty>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Empty : Google.Protobuf.IMessage<Empty>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<Empty> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Empty()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty()
```


### Constructor `Empty(Empty)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty(Empty other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Empty` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `Equals(Object)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override bool Equals(object other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `object` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `Equals(Empty)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(Empty other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Empty` | 

#### Returns
Type | Description
--- | ---
`bool` | 



### Method `GetHashCode()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override int GetHashCode()
```
#### Returns
Type | Description
--- | ---
`int` | 



### Method `ToString()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public override string ToString()
```
#### Returns
Type | Description
--- | ---
`string` | 



### Method `WriteTo(Google.Protobuf.CodedOutputStream)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void WriteTo(Google.Protobuf.CodedOutputStream output)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`output` | `Google.Protobuf.CodedOutputStream` | 



### Method `CalculateSize()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int CalculateSize()
```
#### Returns
Type | Description
--- | ---
`int` | 



### Method `MergeFrom(Empty)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(Empty other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Empty` | 



### Method `MergeFrom(Google.Protobuf.CodedInputStream)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(Google.Protobuf.CodedInputStream input)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`input` | `Google.Protobuf.CodedInputStream` | 


