---
title: EventStore.Client.Operations
---

# EventStore.Client.Operations
## Class `OperationsReflection`
Holder for reflection information generated from operations.proto
### Inheritance
↳ `object`
### Syntax
```csharp
public static class OperationsReflection
```

### Property `Descriptor`
File descriptor for operations.proto
#### Syntax
```csharp
public static Google.Protobuf.Reflection.FileDescriptor Descriptor { get; }
```


## Class `StartScavengeReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Operations.StartScavengeReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class StartScavengeReq : Google.Protobuf.IMessage<StartScavengeReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StartScavengeReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `StartScavengeReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StartScavengeReq()
```


### Constructor `StartScavengeReq(StartScavengeReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StartScavengeReq(StartScavengeReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StartScavengeReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StartScavengeReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.StartScavengeReq` | 



### Field `OptionsFieldNumber`
Field number for the &quot;options&quot; field.
#### Syntax
```csharp
public static int OptionsFieldNumber = 1
```


### Property `Options`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StartScavengeReq.Types.Options Options { get; set; }
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



### Method `Equals(StartScavengeReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StartScavengeReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StartScavengeReq` | 

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



### Method `MergeFrom(StartScavengeReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StartScavengeReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StartScavengeReq` | 



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



## Class `StartScavengeReq.Types`
Container for nested types declared in the StartScavengeReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `StartScavengeReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Operations.StartScavengeReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<StartScavengeReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StartScavengeReq.Types.Options> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Options()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options()
```


### Constructor `Options(StartScavengeReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(StartScavengeReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StartScavengeReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StartScavengeReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.StartScavengeReq.Types.Options` | 



### Field `ThreadCountFieldNumber`
Field number for the &quot;thread_count&quot; field.
#### Syntax
```csharp
public static int ThreadCountFieldNumber = 1
```


### Property `ThreadCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int ThreadCount { get; set; }
```


### Field `StartFromChunkFieldNumber`
Field number for the &quot;start_from_chunk&quot; field.
#### Syntax
```csharp
public static int StartFromChunkFieldNumber = 2
```


### Property `StartFromChunk`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int StartFromChunk { get; set; }
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



### Method `Equals(StartScavengeReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StartScavengeReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StartScavengeReq.Types.Options` | 

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



### Method `MergeFrom(StartScavengeReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StartScavengeReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StartScavengeReq.Types.Options` | 



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



## Class `StopScavengeReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Operations.StopScavengeReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class StopScavengeReq : Google.Protobuf.IMessage<StopScavengeReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StopScavengeReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `StopScavengeReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StopScavengeReq()
```


### Constructor `StopScavengeReq(StopScavengeReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StopScavengeReq(StopScavengeReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StopScavengeReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StopScavengeReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.StopScavengeReq` | 



### Field `OptionsFieldNumber`
Field number for the &quot;options&quot; field.
#### Syntax
```csharp
public static int OptionsFieldNumber = 1
```


### Property `Options`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StopScavengeReq.Types.Options Options { get; set; }
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



### Method `Equals(StopScavengeReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StopScavengeReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StopScavengeReq` | 

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



### Method `MergeFrom(StopScavengeReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StopScavengeReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StopScavengeReq` | 



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



## Class `StopScavengeReq.Types`
Container for nested types declared in the StopScavengeReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `StopScavengeReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Operations.StopScavengeReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<StopScavengeReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StopScavengeReq.Types.Options> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Options()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options()
```


### Constructor `Options(StopScavengeReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(StopScavengeReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StopScavengeReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StopScavengeReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.StopScavengeReq.Types.Options` | 



### Field `ScavengeIdFieldNumber`
Field number for the &quot;scavenge_id&quot; field.
#### Syntax
```csharp
public static int ScavengeIdFieldNumber = 1
```


### Property `ScavengeId`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string ScavengeId { get; set; }
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



### Method `Equals(StopScavengeReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StopScavengeReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StopScavengeReq.Types.Options` | 

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



### Method `MergeFrom(StopScavengeReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StopScavengeReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.StopScavengeReq.Types.Options` | 



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



## Class `ScavengeResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Operations.ScavengeResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ScavengeResp : Google.Protobuf.IMessage<ScavengeResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ScavengeResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ScavengeResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ScavengeResp()
```


### Constructor `ScavengeResp(ScavengeResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ScavengeResp(ScavengeResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.ScavengeResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ScavengeResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.ScavengeResp` | 



### Field `ScavengeIdFieldNumber`
Field number for the &quot;scavenge_id&quot; field.
#### Syntax
```csharp
public static int ScavengeIdFieldNumber = 1
```


### Property `ScavengeId`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string ScavengeId { get; set; }
```


### Field `ScavengeResultFieldNumber`
Field number for the &quot;scavenge_result&quot; field.
#### Syntax
```csharp
public static int ScavengeResultFieldNumber = 2
```


### Property `ScavengeResult`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ScavengeResp.Types.ScavengeResult ScavengeResult { get; set; }
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



### Method `Equals(ScavengeResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ScavengeResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.ScavengeResp` | 

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



### Method `MergeFrom(ScavengeResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ScavengeResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.ScavengeResp` | 



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



## Class `ScavengeResp.Types`
Container for nested types declared in the ScavengeResp message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Enum `ScavengeResp.Types.ScavengeResult`

### Syntax
```csharp
public enum ScavengeResult
```

### Fields
Name | Description
--- | ---
Started | 
InProgress | 
Stopped | 
## Class `SetNodePriorityReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Operations.SetNodePriorityReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class SetNodePriorityReq : Google.Protobuf.IMessage<SetNodePriorityReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<SetNodePriorityReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `SetNodePriorityReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public SetNodePriorityReq()
```


### Constructor `SetNodePriorityReq(SetNodePriorityReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public SetNodePriorityReq(SetNodePriorityReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.SetNodePriorityReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public SetNodePriorityReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.SetNodePriorityReq` | 



### Field `PriorityFieldNumber`
Field number for the &quot;priority&quot; field.
#### Syntax
```csharp
public static int PriorityFieldNumber = 1
```


### Property `Priority`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int Priority { get; set; }
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



### Method `Equals(SetNodePriorityReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(SetNodePriorityReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.SetNodePriorityReq` | 

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



### Method `MergeFrom(SetNodePriorityReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(SetNodePriorityReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Operations.SetNodePriorityReq` | 



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



## Class `Operations`

### Inheritance
↳ `object`
### Syntax
```csharp
public static class Operations
```

### Property `Descriptor`
Service descriptor
#### Syntax
```csharp
public static Google.Protobuf.Reflection.ServiceDescriptor Descriptor { get; }
```


## Class `Operations.OperationsClient`
Client for Operations
### Inheritance
↳ `Grpc.Core.ClientBase<EventStore.Client.Operations.Operations.OperationsClient>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public class OperationsClient : Grpc.Core.ClientBase<Operations.OperationsClient>
```

### Constructor `OperationsClient(Grpc.Core.ChannelBase)`
Creates a new client for Operations
#### Syntax
```csharp
public OperationsClient(Grpc.Core.ChannelBase channel)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`channel` | `Grpc.Core.ChannelBase` | The channel to use to make remote calls.



### Constructor `OperationsClient(Grpc.Core.CallInvoker)`
Creates a new client for Operations that uses a custom <code>CallInvoker</code>.
#### Syntax
```csharp
public OperationsClient(Grpc.Core.CallInvoker callInvoker)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`callInvoker` | `Grpc.Core.CallInvoker` | The callInvoker to use to make remote calls.



### Constructor `OperationsClient()`
Protected parameterless constructor to allow creation of test doubles.
#### Syntax
```csharp
protected OperationsClient()
```


### Constructor `OperationsClient(ClientBaseConfiguration)`
Protected constructor to allow creation of configured clients.
#### Syntax
```csharp
protected OperationsClient(ClientBaseConfiguration configuration)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`configuration` | `ClientBaseConfiguration` | The client configuration.



### Method `StartScavenge(StartScavengeReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual ScavengeResp StartScavenge(StartScavengeReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.StartScavengeReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.ScavengeResp` | 



### Method `StartScavenge(StartScavengeReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual ScavengeResp StartScavenge(StartScavengeReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.StartScavengeReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.ScavengeResp` | 



### Method `StartScavengeAsync(StartScavengeReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ScavengeResp> StartScavengeAsync(StartScavengeReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.StartScavengeReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Operations.ScavengeResp>` | 



### Method `StartScavengeAsync(StartScavengeReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ScavengeResp> StartScavengeAsync(StartScavengeReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.StartScavengeReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Operations.ScavengeResp>` | 



### Method `StopScavenge(StopScavengeReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual ScavengeResp StopScavenge(StopScavengeReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.StopScavengeReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.ScavengeResp` | 



### Method `StopScavenge(StopScavengeReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual ScavengeResp StopScavenge(StopScavengeReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.StopScavengeReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.ScavengeResp` | 



### Method `StopScavengeAsync(StopScavengeReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ScavengeResp> StopScavengeAsync(StopScavengeReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.StopScavengeReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Operations.ScavengeResp>` | 



### Method `StopScavengeAsync(StopScavengeReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ScavengeResp> StopScavengeAsync(StopScavengeReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.StopScavengeReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Operations.ScavengeResp>` | 



### Method `Shutdown(Empty, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Empty Shutdown(Empty request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `Shutdown(Empty, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Empty Shutdown(Empty request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `ShutdownAsync(Empty, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> ShutdownAsync(Empty request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Empty>` | 



### Method `ShutdownAsync(Empty, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> ShutdownAsync(Empty request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Empty>` | 



### Method `MergeIndexes(Empty, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Empty MergeIndexes(Empty request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `MergeIndexes(Empty, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Empty MergeIndexes(Empty request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `MergeIndexesAsync(Empty, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> MergeIndexesAsync(Empty request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Empty>` | 



### Method `MergeIndexesAsync(Empty, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> MergeIndexesAsync(Empty request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Empty>` | 



### Method `ResignNode(Empty, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Empty ResignNode(Empty request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `ResignNode(Empty, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Empty ResignNode(Empty request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `ResignNodeAsync(Empty, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> ResignNodeAsync(Empty request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Empty>` | 



### Method `ResignNodeAsync(Empty, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> ResignNodeAsync(Empty request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Empty` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Empty>` | 



### Method `SetNodePriority(SetNodePriorityReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Empty SetNodePriority(SetNodePriorityReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.SetNodePriorityReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `SetNodePriority(SetNodePriorityReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Empty SetNodePriority(SetNodePriorityReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.SetNodePriorityReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Empty` | 



### Method `SetNodePriorityAsync(SetNodePriorityReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> SetNodePriorityAsync(SetNodePriorityReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.SetNodePriorityReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Empty>` | 



### Method `SetNodePriorityAsync(SetNodePriorityReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> SetNodePriorityAsync(SetNodePriorityReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Operations.SetNodePriorityReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Empty>` | 



### Method `NewInstance(ClientBaseConfiguration)`
Creates a new instance of client from given <code>ClientBaseConfiguration</code>.
#### Syntax
```csharp
protected override Operations.OperationsClient NewInstance(ClientBaseConfiguration configuration)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`configuration` | `ClientBaseConfiguration` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Operations.Operations.OperationsClient` | 


