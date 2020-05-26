---
title: EventStore.Client.Projections
---

# Namespace: EventStore.Client.Projections
## Class `ProjectionmanagementReflection`
Holder for reflection information generated from projectionmanagement.proto
### Inheritance
↳ `object`
### Syntax
```csharp
public static class ProjectionmanagementReflection
```

### Property `Descriptor`
File descriptor for projectionmanagement.proto
#### Syntax
```csharp
public static Google.Protobuf.Reflection.FileDescriptor Descriptor { get; }
```


## Class `CreateReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.CreateReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class CreateReq : Google.Protobuf.IMessage<CreateReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<CreateReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `CreateReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq()
```


### Constructor `CreateReq(CreateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq(CreateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.CreateReq` | 



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
public CreateReq.Types.Options Options { get; set; }
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



### Method `Equals(CreateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(CreateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq` | 

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



### Method `MergeFrom(CreateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(CreateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq` | 



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



## Class `CreateReq.Types`
Container for nested types declared in the CreateReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `CreateReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.CreateReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<CreateReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<CreateReq.Types.Options> Parser { get; }
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


### Constructor `Options(CreateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(CreateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.CreateReq.Types.Options` | 



### Field `OneTimeFieldNumber`
Field number for the &quot;one_time&quot; field.
#### Syntax
```csharp
public static int OneTimeFieldNumber = 1
```


### Property `OneTime`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty OneTime { get; set; }
```


### Field `TransientFieldNumber`
Field number for the &quot;transient&quot; field.
#### Syntax
```csharp
public static int TransientFieldNumber = 2
```


### Property `Transient`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Options.Types.Transient Transient { get; set; }
```


### Field `ContinuousFieldNumber`
Field number for the &quot;continuous&quot; field.
#### Syntax
```csharp
public static int ContinuousFieldNumber = 3
```


### Property `Continuous`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Options.Types.Continuous Continuous { get; set; }
```


### Field `QueryFieldNumber`
Field number for the &quot;query&quot; field.
#### Syntax
```csharp
public static int QueryFieldNumber = 4
```


### Property `Query`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Query { get; set; }
```


### Property `ModeCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Options.ModeOneofCase ModeCase { get; }
```


### Method `ClearMode()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearMode()
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



### Method `Equals(CreateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(CreateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options` | 

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



### Method `MergeFrom(CreateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(CreateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options` | 



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



## Enum `CreateReq.Types.Options.ModeOneofCase`
Enum of possible cases for the &quot;mode&quot; oneof.
### Syntax
```csharp
public enum ModeOneofCase
```

### Fields
Name | Description
--- | ---
None | 
OneTime | 
Transient | 
Continuous | 
## Class `CreateReq.Types.Options.Types`
Container for nested types declared in the Options message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `CreateReq.Types.Options.Types.Transient`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.CreateReq.Types.Options.Types.Transient>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Transient : Google.Protobuf.IMessage<CreateReq.Types.Options.Types.Transient>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<CreateReq.Types.Options.Types.Transient> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Transient()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Transient()
```


### Constructor `Transient(CreateReq.Types.Options.Types.Transient)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Transient(CreateReq.Types.Options.Types.Transient other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options.Types.Transient` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Options.Types.Transient Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.CreateReq.Types.Options.Types.Transient` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
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



### Method `Equals(CreateReq.Types.Options.Types.Transient)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(CreateReq.Types.Options.Types.Transient other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options.Types.Transient` | 

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



### Method `MergeFrom(CreateReq.Types.Options.Types.Transient)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(CreateReq.Types.Options.Types.Transient other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options.Types.Transient` | 



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



## Class `CreateReq.Types.Options.Types.Continuous`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.CreateReq.Types.Options.Types.Continuous>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Continuous : Google.Protobuf.IMessage<CreateReq.Types.Options.Types.Continuous>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<CreateReq.Types.Options.Types.Continuous> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Continuous()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Continuous()
```


### Constructor `Continuous(CreateReq.Types.Options.Types.Continuous)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Continuous(CreateReq.Types.Options.Types.Continuous other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options.Types.Continuous` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Options.Types.Continuous Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.CreateReq.Types.Options.Types.Continuous` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `TrackEmittedStreamsFieldNumber`
Field number for the &quot;track_emitted_streams&quot; field.
#### Syntax
```csharp
public static int TrackEmittedStreamsFieldNumber = 2
```


### Property `TrackEmittedStreams`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool TrackEmittedStreams { get; set; }
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



### Method `Equals(CreateReq.Types.Options.Types.Continuous)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(CreateReq.Types.Options.Types.Continuous other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options.Types.Continuous` | 

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



### Method `MergeFrom(CreateReq.Types.Options.Types.Continuous)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(CreateReq.Types.Options.Types.Continuous other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateReq.Types.Options.Types.Continuous` | 



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



## Class `CreateResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.CreateResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class CreateResp : Google.Protobuf.IMessage<CreateResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<CreateResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `CreateResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateResp()
```


### Constructor `CreateResp(CreateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateResp(CreateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.CreateResp` | 



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



### Method `Equals(CreateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(CreateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateResp` | 

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



### Method `MergeFrom(CreateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(CreateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.CreateResp` | 



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



## Class `UpdateReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.UpdateReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class UpdateReq : Google.Protobuf.IMessage<UpdateReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<UpdateReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `UpdateReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq()
```


### Constructor `UpdateReq(UpdateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq(UpdateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.UpdateReq` | 



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
public UpdateReq.Types.Options Options { get; set; }
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



### Method `Equals(UpdateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(UpdateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateReq` | 

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



### Method `MergeFrom(UpdateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(UpdateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateReq` | 



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



## Class `UpdateReq.Types`
Container for nested types declared in the UpdateReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `UpdateReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.UpdateReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<UpdateReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<UpdateReq.Types.Options> Parser { get; }
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


### Constructor `Options(UpdateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(UpdateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.UpdateReq.Types.Options` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `QueryFieldNumber`
Field number for the &quot;query&quot; field.
#### Syntax
```csharp
public static int QueryFieldNumber = 2
```


### Property `Query`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Query { get; set; }
```


### Field `EmitEnabledFieldNumber`
Field number for the &quot;emit_enabled&quot; field.
#### Syntax
```csharp
public static int EmitEnabledFieldNumber = 3
```


### Property `EmitEnabled`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool EmitEnabled { get; set; }
```


### Field `NoEmitOptionsFieldNumber`
Field number for the &quot;no_emit_options&quot; field.
#### Syntax
```csharp
public static int NoEmitOptionsFieldNumber = 4
```


### Property `NoEmitOptions`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoEmitOptions { get; set; }
```


### Property `EmitOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq.Types.Options.EmitOptionOneofCase EmitOptionCase { get; }
```


### Method `ClearEmitOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearEmitOption()
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



### Method `Equals(UpdateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(UpdateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateReq.Types.Options` | 

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



### Method `MergeFrom(UpdateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(UpdateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateReq.Types.Options` | 



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



## Enum `UpdateReq.Types.Options.EmitOptionOneofCase`
Enum of possible cases for the &quot;emit_option&quot; oneof.
### Syntax
```csharp
public enum EmitOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
EmitEnabled | 
NoEmitOptions | 
## Class `UpdateResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.UpdateResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class UpdateResp : Google.Protobuf.IMessage<UpdateResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<UpdateResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `UpdateResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateResp()
```


### Constructor `UpdateResp(UpdateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateResp(UpdateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.UpdateResp` | 



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



### Method `Equals(UpdateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(UpdateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateResp` | 

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



### Method `MergeFrom(UpdateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(UpdateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.UpdateResp` | 



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



## Class `DeleteReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.DeleteReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class DeleteReq : Google.Protobuf.IMessage<DeleteReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DeleteReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `DeleteReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq()
```


### Constructor `DeleteReq(DeleteReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq(DeleteReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DeleteReq` | 



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
public DeleteReq.Types.Options Options { get; set; }
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



### Method `Equals(DeleteReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DeleteReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteReq` | 

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



### Method `MergeFrom(DeleteReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DeleteReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteReq` | 



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



## Class `DeleteReq.Types`
Container for nested types declared in the DeleteReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `DeleteReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.DeleteReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<DeleteReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DeleteReq.Types.Options> Parser { get; }
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


### Constructor `Options(DeleteReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(DeleteReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DeleteReq.Types.Options` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `DeleteEmittedStreamsFieldNumber`
Field number for the &quot;delete_emitted_streams&quot; field.
#### Syntax
```csharp
public static int DeleteEmittedStreamsFieldNumber = 2
```


### Property `DeleteEmittedStreams`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool DeleteEmittedStreams { get; set; }
```


### Field `DeleteStateStreamFieldNumber`
Field number for the &quot;delete_state_stream&quot; field.
#### Syntax
```csharp
public static int DeleteStateStreamFieldNumber = 3
```


### Property `DeleteStateStream`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool DeleteStateStream { get; set; }
```


### Field `DeleteCheckpointStreamFieldNumber`
Field number for the &quot;delete_checkpoint_stream&quot; field.
#### Syntax
```csharp
public static int DeleteCheckpointStreamFieldNumber = 4
```


### Property `DeleteCheckpointStream`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool DeleteCheckpointStream { get; set; }
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



### Method `Equals(DeleteReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DeleteReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteReq.Types.Options` | 

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



### Method `MergeFrom(DeleteReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DeleteReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteReq.Types.Options` | 



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



## Class `DeleteResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.DeleteResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class DeleteResp : Google.Protobuf.IMessage<DeleteResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DeleteResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `DeleteResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp()
```


### Constructor `DeleteResp(DeleteResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp(DeleteResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DeleteResp` | 



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



### Method `Equals(DeleteResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DeleteResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteResp` | 

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



### Method `MergeFrom(DeleteResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DeleteResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DeleteResp` | 



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



## Class `StatisticsReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.StatisticsReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class StatisticsReq : Google.Protobuf.IMessage<StatisticsReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StatisticsReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `StatisticsReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsReq()
```


### Constructor `StatisticsReq(StatisticsReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsReq(StatisticsReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StatisticsReq` | 



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
public StatisticsReq.Types.Options Options { get; set; }
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



### Method `Equals(StatisticsReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StatisticsReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsReq` | 

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



### Method `MergeFrom(StatisticsReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StatisticsReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsReq` | 



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



## Class `StatisticsReq.Types`
Container for nested types declared in the StatisticsReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `StatisticsReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.StatisticsReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<StatisticsReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StatisticsReq.Types.Options> Parser { get; }
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


### Constructor `Options(StatisticsReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(StatisticsReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StatisticsReq.Types.Options` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `AllFieldNumber`
Field number for the &quot;all&quot; field.
#### Syntax
```csharp
public static int AllFieldNumber = 2
```


### Property `All`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty All { get; set; }
```


### Field `TransientFieldNumber`
Field number for the &quot;transient&quot; field.
#### Syntax
```csharp
public static int TransientFieldNumber = 3
```


### Property `Transient`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Transient { get; set; }
```


### Field `ContinuousFieldNumber`
Field number for the &quot;continuous&quot; field.
#### Syntax
```csharp
public static int ContinuousFieldNumber = 4
```


### Property `Continuous`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Continuous { get; set; }
```


### Field `OneTimeFieldNumber`
Field number for the &quot;one_time&quot; field.
#### Syntax
```csharp
public static int OneTimeFieldNumber = 5
```


### Property `OneTime`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty OneTime { get; set; }
```


### Property `ModeCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsReq.Types.Options.ModeOneofCase ModeCase { get; }
```


### Method `ClearMode()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearMode()
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



### Method `Equals(StatisticsReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StatisticsReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsReq.Types.Options` | 

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



### Method `MergeFrom(StatisticsReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StatisticsReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsReq.Types.Options` | 



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



## Enum `StatisticsReq.Types.Options.ModeOneofCase`
Enum of possible cases for the &quot;mode&quot; oneof.
### Syntax
```csharp
public enum ModeOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Name | 
All | 
Transient | 
Continuous | 
OneTime | 
## Class `StatisticsResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.StatisticsResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class StatisticsResp : Google.Protobuf.IMessage<StatisticsResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StatisticsResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `StatisticsResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsResp()
```


### Constructor `StatisticsResp(StatisticsResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsResp(StatisticsResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StatisticsResp` | 



### Field `DetailsFieldNumber`
Field number for the &quot;details&quot; field.
#### Syntax
```csharp
public static int DetailsFieldNumber = 1
```


### Property `Details`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsResp.Types.Details Details { get; set; }
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



### Method `Equals(StatisticsResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StatisticsResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsResp` | 

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



### Method `MergeFrom(StatisticsResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StatisticsResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsResp` | 



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



## Class `StatisticsResp.Types`
Container for nested types declared in the StatisticsResp message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `StatisticsResp.Types.Details`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.StatisticsResp.Types.Details>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Details : Google.Protobuf.IMessage<StatisticsResp.Types.Details>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StatisticsResp.Types.Details> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Details()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Details()
```


### Constructor `Details(StatisticsResp.Types.Details)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Details(StatisticsResp.Types.Details other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsResp.Types.Details` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StatisticsResp.Types.Details Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StatisticsResp.Types.Details` | 



### Field `CoreProcessingTimeFieldNumber`
Field number for the &quot;coreProcessingTime&quot; field.
#### Syntax
```csharp
public static int CoreProcessingTimeFieldNumber = 1
```


### Property `CoreProcessingTime`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long CoreProcessingTime { get; set; }
```


### Field `VersionFieldNumber`
Field number for the &quot;version&quot; field.
#### Syntax
```csharp
public static int VersionFieldNumber = 2
```


### Property `Version`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long Version { get; set; }
```


### Field `EpochFieldNumber`
Field number for the &quot;epoch&quot; field.
#### Syntax
```csharp
public static int EpochFieldNumber = 3
```


### Property `Epoch`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long Epoch { get; set; }
```


### Field `EffectiveNameFieldNumber`
Field number for the &quot;effectiveName&quot; field.
#### Syntax
```csharp
public static int EffectiveNameFieldNumber = 4
```


### Property `EffectiveName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string EffectiveName { get; set; }
```


### Field `WritesInProgressFieldNumber`
Field number for the &quot;writesInProgress&quot; field.
#### Syntax
```csharp
public static int WritesInProgressFieldNumber = 5
```


### Property `WritesInProgress`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int WritesInProgress { get; set; }
```


### Field `ReadsInProgressFieldNumber`
Field number for the &quot;readsInProgress&quot; field.
#### Syntax
```csharp
public static int ReadsInProgressFieldNumber = 6
```


### Property `ReadsInProgress`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int ReadsInProgress { get; set; }
```


### Field `PartitionsCachedFieldNumber`
Field number for the &quot;partitionsCached&quot; field.
#### Syntax
```csharp
public static int PartitionsCachedFieldNumber = 7
```


### Property `PartitionsCached`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int PartitionsCached { get; set; }
```


### Field `StatusFieldNumber`
Field number for the &quot;status&quot; field.
#### Syntax
```csharp
public static int StatusFieldNumber = 8
```


### Property `Status`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Status { get; set; }
```


### Field `StateReasonFieldNumber`
Field number for the &quot;stateReason&quot; field.
#### Syntax
```csharp
public static int StateReasonFieldNumber = 9
```


### Property `StateReason`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string StateReason { get; set; }
```


### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 10
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `ModeFieldNumber`
Field number for the &quot;mode&quot; field.
#### Syntax
```csharp
public static int ModeFieldNumber = 11
```


### Property `Mode`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Mode { get; set; }
```


### Field `PositionFieldNumber`
Field number for the &quot;position&quot; field.
#### Syntax
```csharp
public static int PositionFieldNumber = 12
```


### Property `Position`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Position { get; set; }
```


### Field `ProgressFieldNumber`
Field number for the &quot;progress&quot; field.
#### Syntax
```csharp
public static int ProgressFieldNumber = 13
```


### Property `Progress`

#### Syntax
```csharp
[DebuggerNonUserCode]
public float Progress { get; set; }
```


### Field `LastCheckpointFieldNumber`
Field number for the &quot;lastCheckpoint&quot; field.
#### Syntax
```csharp
public static int LastCheckpointFieldNumber = 14
```


### Property `LastCheckpoint`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LastCheckpoint { get; set; }
```


### Field `EventsProcessedAfterRestartFieldNumber`
Field number for the &quot;eventsProcessedAfterRestart&quot; field.
#### Syntax
```csharp
public static int EventsProcessedAfterRestartFieldNumber = 15
```


### Property `EventsProcessedAfterRestart`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long EventsProcessedAfterRestart { get; set; }
```


### Field `CheckpointStatusFieldNumber`
Field number for the &quot;checkpointStatus&quot; field.
#### Syntax
```csharp
public static int CheckpointStatusFieldNumber = 16
```


### Property `CheckpointStatus`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string CheckpointStatus { get; set; }
```


### Field `BufferedEventsFieldNumber`
Field number for the &quot;bufferedEvents&quot; field.
#### Syntax
```csharp
public static int BufferedEventsFieldNumber = 17
```


### Property `BufferedEvents`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long BufferedEvents { get; set; }
```


### Field `WritePendingEventsBeforeCheckpointFieldNumber`
Field number for the &quot;writePendingEventsBeforeCheckpoint&quot; field.
#### Syntax
```csharp
public static int WritePendingEventsBeforeCheckpointFieldNumber = 18
```


### Property `WritePendingEventsBeforeCheckpoint`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int WritePendingEventsBeforeCheckpoint { get; set; }
```


### Field `WritePendingEventsAfterCheckpointFieldNumber`
Field number for the &quot;writePendingEventsAfterCheckpoint&quot; field.
#### Syntax
```csharp
public static int WritePendingEventsAfterCheckpointFieldNumber = 19
```


### Property `WritePendingEventsAfterCheckpoint`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int WritePendingEventsAfterCheckpoint { get; set; }
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



### Method `Equals(StatisticsResp.Types.Details)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StatisticsResp.Types.Details other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsResp.Types.Details` | 

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



### Method `MergeFrom(StatisticsResp.Types.Details)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StatisticsResp.Types.Details other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StatisticsResp.Types.Details` | 



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



## Class `StateReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.StateReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class StateReq : Google.Protobuf.IMessage<StateReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StateReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `StateReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StateReq()
```


### Constructor `StateReq(StateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StateReq(StateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StateReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StateReq` | 



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
public StateReq.Types.Options Options { get; set; }
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



### Method `Equals(StateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateReq` | 

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



### Method `MergeFrom(StateReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StateReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateReq` | 



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



## Class `StateReq.Types`
Container for nested types declared in the StateReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `StateReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.StateReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<StateReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StateReq.Types.Options> Parser { get; }
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


### Constructor `Options(StateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(StateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StateReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StateReq.Types.Options` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `PartitionFieldNumber`
Field number for the &quot;partition&quot; field.
#### Syntax
```csharp
public static int PartitionFieldNumber = 2
```


### Property `Partition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Partition { get; set; }
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



### Method `Equals(StateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateReq.Types.Options` | 

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



### Method `MergeFrom(StateReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StateReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateReq.Types.Options` | 



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



## Class `StateResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.StateResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class StateResp : Google.Protobuf.IMessage<StateResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<StateResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `StateResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StateResp()
```


### Constructor `StateResp(StateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StateResp(StateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StateResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StateResp` | 



### Field `StateFieldNumber`
Field number for the &quot;state&quot; field.
#### Syntax
```csharp
public static int StateFieldNumber = 1
```


### Property `State`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.WellKnownTypes.Value State { get; set; }
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



### Method `Equals(StateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(StateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateResp` | 

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



### Method `MergeFrom(StateResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(StateResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.StateResp` | 



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



## Class `ResultReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.ResultReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ResultReq : Google.Protobuf.IMessage<ResultReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResultReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ResultReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResultReq()
```


### Constructor `ResultReq(ResultReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResultReq(ResultReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResultReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResultReq` | 



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
public ResultReq.Types.Options Options { get; set; }
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



### Method `Equals(ResultReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResultReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultReq` | 

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



### Method `MergeFrom(ResultReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResultReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultReq` | 



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



## Class `ResultReq.Types`
Container for nested types declared in the ResultReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `ResultReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.ResultReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<ResultReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResultReq.Types.Options> Parser { get; }
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


### Constructor `Options(ResultReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(ResultReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResultReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResultReq.Types.Options` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `PartitionFieldNumber`
Field number for the &quot;partition&quot; field.
#### Syntax
```csharp
public static int PartitionFieldNumber = 2
```


### Property `Partition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Partition { get; set; }
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



### Method `Equals(ResultReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResultReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultReq.Types.Options` | 

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



### Method `MergeFrom(ResultReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResultReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultReq.Types.Options` | 



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



## Class `ResultResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.ResultResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ResultResp : Google.Protobuf.IMessage<ResultResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResultResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ResultResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResultResp()
```


### Constructor `ResultResp(ResultResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResultResp(ResultResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResultResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResultResp` | 



### Field `ResultFieldNumber`
Field number for the &quot;result&quot; field.
#### Syntax
```csharp
public static int ResultFieldNumber = 1
```


### Property `Result`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.WellKnownTypes.Value Result { get; set; }
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



### Method `Equals(ResultResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResultResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultResp` | 

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



### Method `MergeFrom(ResultResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResultResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResultResp` | 



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



## Class `ResetReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.ResetReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ResetReq : Google.Protobuf.IMessage<ResetReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResetReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ResetReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetReq()
```


### Constructor `ResetReq(ResetReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetReq(ResetReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResetReq` | 



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
public ResetReq.Types.Options Options { get; set; }
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



### Method `Equals(ResetReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResetReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetReq` | 

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



### Method `MergeFrom(ResetReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResetReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetReq` | 



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



## Class `ResetReq.Types`
Container for nested types declared in the ResetReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `ResetReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.ResetReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<ResetReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResetReq.Types.Options> Parser { get; }
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


### Constructor `Options(ResetReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(ResetReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResetReq.Types.Options` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `WriteCheckpointFieldNumber`
Field number for the &quot;write_checkpoint&quot; field.
#### Syntax
```csharp
public static int WriteCheckpointFieldNumber = 2
```


### Property `WriteCheckpoint`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool WriteCheckpoint { get; set; }
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



### Method `Equals(ResetReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResetReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetReq.Types.Options` | 

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



### Method `MergeFrom(ResetReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResetReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetReq.Types.Options` | 



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



## Class `ResetResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.ResetResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ResetResp : Google.Protobuf.IMessage<ResetResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResetResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ResetResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetResp()
```


### Constructor `ResetResp(ResetResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetResp(ResetResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResetResp` | 



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



### Method `Equals(ResetResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResetResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetResp` | 

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



### Method `MergeFrom(ResetResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResetResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.ResetResp` | 



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



## Class `EnableReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.EnableReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class EnableReq : Google.Protobuf.IMessage<EnableReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<EnableReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `EnableReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableReq()
```


### Constructor `EnableReq(EnableReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableReq(EnableReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.EnableReq` | 



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
public EnableReq.Types.Options Options { get; set; }
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



### Method `Equals(EnableReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(EnableReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableReq` | 

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



### Method `MergeFrom(EnableReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(EnableReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableReq` | 



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



## Class `EnableReq.Types`
Container for nested types declared in the EnableReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `EnableReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.EnableReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<EnableReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<EnableReq.Types.Options> Parser { get; }
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


### Constructor `Options(EnableReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(EnableReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.EnableReq.Types.Options` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
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



### Method `Equals(EnableReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(EnableReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableReq.Types.Options` | 

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



### Method `MergeFrom(EnableReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(EnableReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableReq.Types.Options` | 



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



## Class `EnableResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.EnableResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class EnableResp : Google.Protobuf.IMessage<EnableResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<EnableResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `EnableResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableResp()
```


### Constructor `EnableResp(EnableResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableResp(EnableResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.EnableResp` | 



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



### Method `Equals(EnableResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(EnableResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableResp` | 

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



### Method `MergeFrom(EnableResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(EnableResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.EnableResp` | 



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



## Class `DisableReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.DisableReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class DisableReq : Google.Protobuf.IMessage<DisableReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DisableReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `DisableReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableReq()
```


### Constructor `DisableReq(DisableReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableReq(DisableReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DisableReq` | 



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
public DisableReq.Types.Options Options { get; set; }
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



### Method `Equals(DisableReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DisableReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableReq` | 

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



### Method `MergeFrom(DisableReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DisableReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableReq` | 



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



## Class `DisableReq.Types`
Container for nested types declared in the DisableReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `DisableReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.DisableReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<DisableReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DisableReq.Types.Options> Parser { get; }
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


### Constructor `Options(DisableReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(DisableReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DisableReq.Types.Options` | 



### Field `NameFieldNumber`
Field number for the &quot;name&quot; field.
#### Syntax
```csharp
public static int NameFieldNumber = 1
```


### Property `Name`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Name { get; set; }
```


### Field `WriteCheckpointFieldNumber`
Field number for the &quot;write_checkpoint&quot; field.
#### Syntax
```csharp
public static int WriteCheckpointFieldNumber = 2
```


### Property `WriteCheckpoint`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool WriteCheckpoint { get; set; }
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



### Method `Equals(DisableReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DisableReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableReq.Types.Options` | 

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



### Method `MergeFrom(DisableReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DisableReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableReq.Types.Options` | 



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



## Class `DisableResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Projections.DisableResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class DisableResp : Google.Protobuf.IMessage<DisableResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DisableResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `DisableResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableResp()
```


### Constructor `DisableResp(DisableResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableResp(DisableResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DisableResp` | 



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



### Method `Equals(DisableResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DisableResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableResp` | 

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



### Method `MergeFrom(DisableResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DisableResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Projections.DisableResp` | 



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



## Class `Projections`

### Inheritance
↳ `object`
### Syntax
```csharp
public static class Projections
```

### Property `Descriptor`
Service descriptor
#### Syntax
```csharp
public static Google.Protobuf.Reflection.ServiceDescriptor Descriptor { get; }
```


## Class `Projections.ProjectionsClient`
Client for Projections
### Inheritance
↳ `Grpc.Core.ClientBase<EventStore.Client.Projections.Projections.ProjectionsClient>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public class ProjectionsClient : Grpc.Core.ClientBase<Projections.ProjectionsClient>
```

### Constructor `ProjectionsClient(Grpc.Core.ChannelBase)`
Creates a new client for Projections
#### Syntax
```csharp
public ProjectionsClient(Grpc.Core.ChannelBase channel)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`channel` | `Grpc.Core.ChannelBase` | The channel to use to make remote calls.



### Constructor `ProjectionsClient(Grpc.Core.CallInvoker)`
Creates a new client for Projections that uses a custom <code>CallInvoker</code>.
#### Syntax
```csharp
public ProjectionsClient(Grpc.Core.CallInvoker callInvoker)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`callInvoker` | `Grpc.Core.CallInvoker` | The callInvoker to use to make remote calls.



### Constructor `ProjectionsClient()`
Protected parameterless constructor to allow creation of test doubles.
#### Syntax
```csharp
protected ProjectionsClient()
```


### Constructor `ProjectionsClient(ClientBaseConfiguration)`
Protected constructor to allow creation of configured clients.
#### Syntax
```csharp
protected ProjectionsClient(ClientBaseConfiguration configuration)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`configuration` | `ClientBaseConfiguration` | The client configuration.



### Method `Create(CreateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual CreateResp Create(CreateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.CreateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.CreateResp` | 



### Method `Create(CreateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual CreateResp Create(CreateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.CreateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.CreateResp` | 



### Method `CreateAsync(CreateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<CreateResp> CreateAsync(CreateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.CreateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.CreateResp>` | 



### Method `CreateAsync(CreateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<CreateResp> CreateAsync(CreateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.CreateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.CreateResp>` | 



### Method `Update(UpdateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual UpdateResp Update(UpdateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.UpdateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.UpdateResp` | 



### Method `Update(UpdateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual UpdateResp Update(UpdateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.UpdateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.UpdateResp` | 



### Method `UpdateAsync(UpdateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<UpdateResp> UpdateAsync(UpdateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.UpdateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.UpdateResp>` | 



### Method `UpdateAsync(UpdateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<UpdateResp> UpdateAsync(UpdateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.UpdateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.UpdateResp>` | 



### Method `Delete(DeleteReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual DeleteResp Delete(DeleteReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.DeleteReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DeleteResp` | 



### Method `Delete(DeleteReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual DeleteResp Delete(DeleteReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.DeleteReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DeleteResp` | 



### Method `DeleteAsync(DeleteReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DeleteResp> DeleteAsync(DeleteReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.DeleteReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.DeleteResp>` | 



### Method `DeleteAsync(DeleteReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DeleteResp> DeleteAsync(DeleteReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.DeleteReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.DeleteResp>` | 



### Method `Statistics(StatisticsReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncServerStreamingCall<StatisticsResp> Statistics(StatisticsReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.StatisticsReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncServerStreamingCall<EventStore.Client.Projections.StatisticsResp>` | 



### Method `Statistics(StatisticsReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncServerStreamingCall<StatisticsResp> Statistics(StatisticsReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.StatisticsReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncServerStreamingCall<EventStore.Client.Projections.StatisticsResp>` | 



### Method `Disable(DisableReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual DisableResp Disable(DisableReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.DisableReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DisableResp` | 



### Method `Disable(DisableReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual DisableResp Disable(DisableReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.DisableReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.DisableResp` | 



### Method `DisableAsync(DisableReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DisableResp> DisableAsync(DisableReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.DisableReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.DisableResp>` | 



### Method `DisableAsync(DisableReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DisableResp> DisableAsync(DisableReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.DisableReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.DisableResp>` | 



### Method `Enable(EnableReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual EnableResp Enable(EnableReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.EnableReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.EnableResp` | 



### Method `Enable(EnableReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual EnableResp Enable(EnableReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.EnableReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.EnableResp` | 



### Method `EnableAsync(EnableReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<EnableResp> EnableAsync(EnableReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.EnableReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.EnableResp>` | 



### Method `EnableAsync(EnableReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<EnableResp> EnableAsync(EnableReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.EnableReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.EnableResp>` | 



### Method `Reset(ResetReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual ResetResp Reset(ResetReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.ResetReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResetResp` | 



### Method `Reset(ResetReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual ResetResp Reset(ResetReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.ResetReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResetResp` | 



### Method `ResetAsync(ResetReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ResetResp> ResetAsync(ResetReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.ResetReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.ResetResp>` | 



### Method `ResetAsync(ResetReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ResetResp> ResetAsync(ResetReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.ResetReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.ResetResp>` | 



### Method `State(StateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual StateResp State(StateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.StateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StateResp` | 



### Method `State(StateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual StateResp State(StateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.StateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.StateResp` | 



### Method `StateAsync(StateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<StateResp> StateAsync(StateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.StateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.StateResp>` | 



### Method `StateAsync(StateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<StateResp> StateAsync(StateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.StateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.StateResp>` | 



### Method `Result(ResultReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual ResultResp Result(ResultReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.ResultReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResultResp` | 



### Method `Result(ResultReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual ResultResp Result(ResultReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.ResultReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.ResultResp` | 



### Method `ResultAsync(ResultReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ResultResp> ResultAsync(ResultReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.ResultReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.ResultResp>` | 



### Method `ResultAsync(ResultReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ResultResp> ResultAsync(ResultReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Projections.ResultReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Projections.ResultResp>` | 



### Method `RestartSubsystem(Empty, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Empty RestartSubsystem(Empty request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
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



### Method `RestartSubsystem(Empty, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Empty RestartSubsystem(Empty request, Grpc.Core.CallOptions options)
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



### Method `RestartSubsystemAsync(Empty, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> RestartSubsystemAsync(Empty request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
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



### Method `RestartSubsystemAsync(Empty, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<Empty> RestartSubsystemAsync(Empty request, Grpc.Core.CallOptions options)
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



### Method `NewInstance(ClientBaseConfiguration)`
Creates a new instance of client from given <code>ClientBaseConfiguration</code>.
#### Syntax
```csharp
protected override Projections.ProjectionsClient NewInstance(ClientBaseConfiguration configuration)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`configuration` | `ClientBaseConfiguration` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Projections.Projections.ProjectionsClient` | 


