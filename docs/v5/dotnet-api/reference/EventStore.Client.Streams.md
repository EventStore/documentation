---
title: EventStore.Client.Streams
---

# Namespace: EventStore.Client.Streams
## Class `AppendReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.AppendReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class AppendReq : Google.Protobuf.IMessage<AppendReq>
```

### Method `WithAnyStreamRevision(StreamState)`

#### Syntax
```csharp
public AppendReq WithAnyStreamRevision(StreamState expectedState)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`expectedState` | `StreamState` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.AppendReq` | 



### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<AppendReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `AppendReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendReq()
```


### Constructor `AppendReq(AppendReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendReq(AppendReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.AppendReq` | 



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
public AppendReq.Types.Options Options { get; set; }
```


### Field `ProposedMessageFieldNumber`
Field number for the &quot;proposed_message&quot; field.
#### Syntax
```csharp
public static int ProposedMessageFieldNumber = 2
```


### Property `ProposedMessage`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendReq.Types.ProposedMessage ProposedMessage { get; set; }
```


### Property `ContentCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendReq.ContentOneofCase ContentCase { get; }
```


### Method `ClearContent()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearContent()
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



### Method `Equals(AppendReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(AppendReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq` | 

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



### Method `MergeFrom(AppendReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(AppendReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq` | 



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



## Enum `AppendReq.ContentOneofCase`
Enum of possible cases for the &quot;content&quot; oneof.
### Syntax
```csharp
public enum ContentOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Options | 
ProposedMessage | 
## Class `AppendReq.Types`
Container for nested types declared in the AppendReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `AppendReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.AppendReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<AppendReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<AppendReq.Types.Options> Parser { get; }
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


### Constructor `Options(AppendReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(AppendReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.AppendReq.Types.Options` | 



### Field `StreamNameFieldNumber`
Field number for the &quot;stream_name&quot; field.
#### Syntax
```csharp
public static int StreamNameFieldNumber = 1
```


### Property `StreamName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string StreamName { get; set; }
```


### Field `RevisionFieldNumber`
Field number for the &quot;revision&quot; field.
#### Syntax
```csharp
public static int RevisionFieldNumber = 2
```


### Property `Revision`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong Revision { get; set; }
```


### Field `NoStreamFieldNumber`
Field number for the &quot;no_stream&quot; field.
#### Syntax
```csharp
public static int NoStreamFieldNumber = 3
```


### Property `NoStream`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoStream { get; set; }
```


### Field `AnyFieldNumber`
Field number for the &quot;any&quot; field.
#### Syntax
```csharp
public static int AnyFieldNumber = 4
```


### Property `Any`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Any { get; set; }
```


### Field `StreamExistsFieldNumber`
Field number for the &quot;stream_exists&quot; field.
#### Syntax
```csharp
public static int StreamExistsFieldNumber = 5
```


### Property `StreamExists`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty StreamExists { get; set; }
```


### Property `ExpectedStreamRevisionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendReq.Types.Options.ExpectedStreamRevisionOneofCase ExpectedStreamRevisionCase { get; }
```


### Method `ClearExpectedStreamRevision()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearExpectedStreamRevision()
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



### Method `Equals(AppendReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(AppendReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq.Types.Options` | 

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



### Method `MergeFrom(AppendReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(AppendReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq.Types.Options` | 



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



## Enum `AppendReq.Types.Options.ExpectedStreamRevisionOneofCase`
Enum of possible cases for the &quot;expected_stream_revision&quot; oneof.
### Syntax
```csharp
public enum ExpectedStreamRevisionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Revision | 
NoStream | 
Any | 
StreamExists | 
## Class `AppendReq.Types.ProposedMessage`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.AppendReq.Types.ProposedMessage>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ProposedMessage : Google.Protobuf.IMessage<AppendReq.Types.ProposedMessage>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<AppendReq.Types.ProposedMessage> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ProposedMessage()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ProposedMessage()
```


### Constructor `ProposedMessage(AppendReq.Types.ProposedMessage)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ProposedMessage(AppendReq.Types.ProposedMessage other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq.Types.ProposedMessage` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendReq.Types.ProposedMessage Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.AppendReq.Types.ProposedMessage` | 



### Field `IdFieldNumber`
Field number for the &quot;id&quot; field.
#### Syntax
```csharp
public static int IdFieldNumber = 1
```


### Property `Id`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUID Id { get; set; }
```


### Field `MetadataFieldNumber`
Field number for the &quot;metadata&quot; field.
#### Syntax
```csharp
public static int MetadataFieldNumber = 2
```


### Property `Metadata`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.Collections.MapField<string, string> Metadata { get; }
```


### Field `CustomMetadataFieldNumber`
Field number for the &quot;custom_metadata&quot; field.
#### Syntax
```csharp
public static int CustomMetadataFieldNumber = 3
```


### Property `CustomMetadata`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.ByteString CustomMetadata { get; set; }
```


### Field `DataFieldNumber`
Field number for the &quot;data&quot; field.
#### Syntax
```csharp
public static int DataFieldNumber = 4
```


### Property `Data`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.ByteString Data { get; set; }
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



### Method `Equals(AppendReq.Types.ProposedMessage)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(AppendReq.Types.ProposedMessage other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq.Types.ProposedMessage` | 

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



### Method `MergeFrom(AppendReq.Types.ProposedMessage)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(AppendReq.Types.ProposedMessage other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendReq.Types.ProposedMessage` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.DeleteReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class DeleteReq : Google.Protobuf.IMessage<DeleteReq>
```

### Method `WithAnyStreamRevision(StreamState)`

#### Syntax
```csharp
public DeleteReq WithAnyStreamRevision(StreamState expectedState)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`expectedState` | `StreamState` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.DeleteReq` | 



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
`other` | `EventStore.Client.Streams.DeleteReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.DeleteReq` | 



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
`other` | `EventStore.Client.Streams.DeleteReq` | 

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
`other` | `EventStore.Client.Streams.DeleteReq` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.DeleteReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Streams.DeleteReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.DeleteReq.Types.Options` | 



### Field `StreamNameFieldNumber`
Field number for the &quot;stream_name&quot; field.
#### Syntax
```csharp
public static int StreamNameFieldNumber = 1
```


### Property `StreamName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string StreamName { get; set; }
```


### Field `RevisionFieldNumber`
Field number for the &quot;revision&quot; field.
#### Syntax
```csharp
public static int RevisionFieldNumber = 2
```


### Property `Revision`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong Revision { get; set; }
```


### Field `NoStreamFieldNumber`
Field number for the &quot;no_stream&quot; field.
#### Syntax
```csharp
public static int NoStreamFieldNumber = 3
```


### Property `NoStream`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoStream { get; set; }
```


### Field `AnyFieldNumber`
Field number for the &quot;any&quot; field.
#### Syntax
```csharp
public static int AnyFieldNumber = 4
```


### Property `Any`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Any { get; set; }
```


### Field `StreamExistsFieldNumber`
Field number for the &quot;stream_exists&quot; field.
#### Syntax
```csharp
public static int StreamExistsFieldNumber = 5
```


### Property `StreamExists`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty StreamExists { get; set; }
```


### Property `ExpectedStreamRevisionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq.Types.Options.ExpectedStreamRevisionOneofCase ExpectedStreamRevisionCase { get; }
```


### Method `ClearExpectedStreamRevision()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearExpectedStreamRevision()
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
`other` | `EventStore.Client.Streams.DeleteReq.Types.Options` | 

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
`other` | `EventStore.Client.Streams.DeleteReq.Types.Options` | 



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



## Enum `DeleteReq.Types.Options.ExpectedStreamRevisionOneofCase`
Enum of possible cases for the &quot;expected_stream_revision&quot; oneof.
### Syntax
```csharp
public enum ExpectedStreamRevisionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Revision | 
NoStream | 
Any | 
StreamExists | 
## Class `ReadReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ReadReq : Google.Protobuf.IMessage<ReadReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ReadReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq()
```


### Constructor `ReadReq(ReadReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq(ReadReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq` | 



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
public ReadReq.Types.Options Options { get; set; }
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



### Method `Equals(ReadReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq` | 

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



### Method `MergeFrom(ReadReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq` | 



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



## Class `ReadReq.Types`
Container for nested types declared in the ReadReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `ReadReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<ReadReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Options> Parser { get; }
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


### Constructor `Options(ReadReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(ReadReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options` | 



### Field `StreamFieldNumber`
Field number for the &quot;stream&quot; field.
#### Syntax
```csharp
public static int StreamFieldNumber = 1
```


### Property `Stream`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.StreamOptions Stream { get; set; }
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
public ReadReq.Types.Options.Types.AllOptions All { get; set; }
```


### Field `ReadDirectionFieldNumber`
Field number for the &quot;read_direction&quot; field.
#### Syntax
```csharp
public static int ReadDirectionFieldNumber = 3
```


### Property `ReadDirection`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.ReadDirection ReadDirection { get; set; }
```


### Field `ResolveLinksFieldNumber`
Field number for the &quot;resolve_links&quot; field.
#### Syntax
```csharp
public static int ResolveLinksFieldNumber = 4
```


### Property `ResolveLinks`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool ResolveLinks { get; set; }
```


### Field `CountFieldNumber`
Field number for the &quot;count&quot; field.
#### Syntax
```csharp
public static int CountFieldNumber = 5
```


### Property `Count`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong Count { get; set; }
```


### Field `SubscriptionFieldNumber`
Field number for the &quot;subscription&quot; field.
#### Syntax
```csharp
public static int SubscriptionFieldNumber = 6
```


### Property `Subscription`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.SubscriptionOptions Subscription { get; set; }
```


### Field `FilterFieldNumber`
Field number for the &quot;filter&quot; field.
#### Syntax
```csharp
public static int FilterFieldNumber = 7
```


### Property `Filter`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.FilterOptions Filter { get; set; }
```


### Field `NoFilterFieldNumber`
Field number for the &quot;no_filter&quot; field.
#### Syntax
```csharp
public static int NoFilterFieldNumber = 8
```


### Property `NoFilter`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoFilter { get; set; }
```


### Field `UuidOptionFieldNumber`
Field number for the &quot;uuid_option&quot; field.
#### Syntax
```csharp
public static int UuidOptionFieldNumber = 9
```


### Property `UuidOption`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.UUIDOption UuidOption { get; set; }
```


### Property `StreamOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.StreamOptionOneofCase StreamOptionCase { get; }
```


### Method `ClearStreamOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearStreamOption()
```


### Property `CountOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.CountOptionOneofCase CountOptionCase { get; }
```


### Method `ClearCountOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearCountOption()
```


### Property `FilterOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.FilterOptionOneofCase FilterOptionCase { get; }
```


### Method `ClearFilterOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearFilterOption()
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



### Method `Equals(ReadReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options` | 

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



### Method `MergeFrom(ReadReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options` | 



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



## Class `ReadReq.Types.Options.Types`
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


## Class `ReadReq.Types.Options.Types.StreamOptions`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq.Types.Options.Types.StreamOptions>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class StreamOptions : Google.Protobuf.IMessage<ReadReq.Types.Options.Types.StreamOptions>
```

### Method `FromStreamNameAndRevision(String, StreamPosition)`

#### Syntax
```csharp
public static ReadReq.Types.Options.Types.StreamOptions FromStreamNameAndRevision(string streamName, StreamPosition streamRevision)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`streamName` | `string` | 
`streamRevision` | `StreamPosition` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.StreamOptions` | 



### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Options.Types.StreamOptions> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `StreamOptions()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StreamOptions()
```


### Constructor `StreamOptions(ReadReq.Types.Options.Types.StreamOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StreamOptions(ReadReq.Types.Options.Types.StreamOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.StreamOptions` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.StreamOptions Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.StreamOptions` | 



### Field `StreamNameFieldNumber`
Field number for the &quot;stream_name&quot; field.
#### Syntax
```csharp
public static int StreamNameFieldNumber = 1
```


### Property `StreamName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string StreamName { get; set; }
```


### Field `RevisionFieldNumber`
Field number for the &quot;revision&quot; field.
#### Syntax
```csharp
public static int RevisionFieldNumber = 2
```


### Property `Revision`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong Revision { get; set; }
```


### Field `StartFieldNumber`
Field number for the &quot;start&quot; field.
#### Syntax
```csharp
public static int StartFieldNumber = 3
```


### Property `Start`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Start { get; set; }
```


### Field `EndFieldNumber`
Field number for the &quot;end&quot; field.
#### Syntax
```csharp
public static int EndFieldNumber = 4
```


### Property `End`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty End { get; set; }
```


### Property `RevisionOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.StreamOptions.RevisionOptionOneofCase RevisionOptionCase { get; }
```


### Method `ClearRevisionOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearRevisionOption()
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



### Method `Equals(ReadReq.Types.Options.Types.StreamOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Options.Types.StreamOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.StreamOptions` | 

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



### Method `MergeFrom(ReadReq.Types.Options.Types.StreamOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Options.Types.StreamOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.StreamOptions` | 



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



## Enum `ReadReq.Types.Options.Types.StreamOptions.RevisionOptionOneofCase`
Enum of possible cases for the &quot;revision_option&quot; oneof.
### Syntax
```csharp
public enum RevisionOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Revision | 
Start | 
End | 
## Class `ReadReq.Types.Options.Types.AllOptions`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq.Types.Options.Types.AllOptions>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class AllOptions : Google.Protobuf.IMessage<ReadReq.Types.Options.Types.AllOptions>
```

### Method `FromPosition(Position)`

#### Syntax
```csharp
public static ReadReq.Types.Options.Types.AllOptions FromPosition(Position position)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`position` | `EventStore.Client.Position` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.AllOptions` | 



### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Options.Types.AllOptions> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `AllOptions()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AllOptions()
```


### Constructor `AllOptions(ReadReq.Types.Options.Types.AllOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AllOptions(ReadReq.Types.Options.Types.AllOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.AllOptions` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.AllOptions Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.AllOptions` | 



### Field `PositionFieldNumber`
Field number for the &quot;position&quot; field.
#### Syntax
```csharp
public static int PositionFieldNumber = 1
```


### Property `Position`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.Position Position { get; set; }
```


### Field `StartFieldNumber`
Field number for the &quot;start&quot; field.
#### Syntax
```csharp
public static int StartFieldNumber = 2
```


### Property `Start`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Start { get; set; }
```


### Field `EndFieldNumber`
Field number for the &quot;end&quot; field.
#### Syntax
```csharp
public static int EndFieldNumber = 3
```


### Property `End`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty End { get; set; }
```


### Property `AllOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.AllOptions.AllOptionOneofCase AllOptionCase { get; }
```


### Method `ClearAllOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearAllOption()
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



### Method `Equals(ReadReq.Types.Options.Types.AllOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Options.Types.AllOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.AllOptions` | 

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



### Method `MergeFrom(ReadReq.Types.Options.Types.AllOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Options.Types.AllOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.AllOptions` | 



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



## Enum `ReadReq.Types.Options.Types.AllOptions.AllOptionOneofCase`
Enum of possible cases for the &quot;all_option&quot; oneof.
### Syntax
```csharp
public enum AllOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Position | 
Start | 
End | 
## Enum `ReadReq.Types.Options.Types.ReadDirection`

### Syntax
```csharp
public enum ReadDirection
```

### Fields
Name | Description
--- | ---
Forwards | 
Backwards | 
## Class `ReadReq.Types.Options.Types.SubscriptionOptions`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq.Types.Options.Types.SubscriptionOptions>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class SubscriptionOptions : Google.Protobuf.IMessage<ReadReq.Types.Options.Types.SubscriptionOptions>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Options.Types.SubscriptionOptions> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `SubscriptionOptions()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public SubscriptionOptions()
```


### Constructor `SubscriptionOptions(ReadReq.Types.Options.Types.SubscriptionOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public SubscriptionOptions(ReadReq.Types.Options.Types.SubscriptionOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.SubscriptionOptions` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.SubscriptionOptions Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.SubscriptionOptions` | 



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



### Method `Equals(ReadReq.Types.Options.Types.SubscriptionOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Options.Types.SubscriptionOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.SubscriptionOptions` | 

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



### Method `MergeFrom(ReadReq.Types.Options.Types.SubscriptionOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Options.Types.SubscriptionOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.SubscriptionOptions` | 



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



## Class `ReadReq.Types.Options.Types.Position`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq.Types.Options.Types.Position>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Position : Google.Protobuf.IMessage<ReadReq.Types.Options.Types.Position>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Options.Types.Position> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Position()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Position()
```


### Constructor `Position(ReadReq.Types.Options.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Position(ReadReq.Types.Options.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.Position` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.Position Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.Position` | 



### Field `CommitPositionFieldNumber`
Field number for the &quot;commit_position&quot; field.
#### Syntax
```csharp
public static int CommitPositionFieldNumber = 1
```


### Property `CommitPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CommitPosition { get; set; }
```


### Field `PreparePositionFieldNumber`
Field number for the &quot;prepare_position&quot; field.
#### Syntax
```csharp
public static int PreparePositionFieldNumber = 2
```


### Property `PreparePosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong PreparePosition { get; set; }
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



### Method `Equals(ReadReq.Types.Options.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Options.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.Position` | 

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



### Method `MergeFrom(ReadReq.Types.Options.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Options.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.Position` | 



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



## Class `ReadReq.Types.Options.Types.FilterOptions`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class FilterOptions : Google.Protobuf.IMessage<ReadReq.Types.Options.Types.FilterOptions>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Options.Types.FilterOptions> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `FilterOptions()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public FilterOptions()
```


### Constructor `FilterOptions(ReadReq.Types.Options.Types.FilterOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public FilterOptions(ReadReq.Types.Options.Types.FilterOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.FilterOptions Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions` | 



### Field `StreamNameFieldNumber`
Field number for the &quot;stream_name&quot; field.
#### Syntax
```csharp
public static int StreamNameFieldNumber = 1
```


### Property `StreamName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.FilterOptions.Types.Expression StreamName { get; set; }
```


### Field `EventTypeFieldNumber`
Field number for the &quot;event_type&quot; field.
#### Syntax
```csharp
public static int EventTypeFieldNumber = 2
```


### Property `EventType`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.FilterOptions.Types.Expression EventType { get; set; }
```


### Field `MaxFieldNumber`
Field number for the &quot;max&quot; field.
#### Syntax
```csharp
public static int MaxFieldNumber = 3
```


### Property `Max`

#### Syntax
```csharp
[DebuggerNonUserCode]
public uint Max { get; set; }
```


### Field `CountFieldNumber`
Field number for the &quot;count&quot; field.
#### Syntax
```csharp
public static int CountFieldNumber = 4
```


### Property `Count`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Count { get; set; }
```


### Field `CheckpointIntervalMultiplierFieldNumber`
Field number for the &quot;checkpointIntervalMultiplier&quot; field.
#### Syntax
```csharp
public static int CheckpointIntervalMultiplierFieldNumber = 5
```


### Property `CheckpointIntervalMultiplier`

#### Syntax
```csharp
[DebuggerNonUserCode]
public uint CheckpointIntervalMultiplier { get; set; }
```


### Property `FilterCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.FilterOptions.FilterOneofCase FilterCase { get; }
```


### Method `ClearFilter()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearFilter()
```


### Property `WindowCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.FilterOptions.WindowOneofCase WindowCase { get; }
```


### Method `ClearWindow()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearWindow()
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



### Method `Equals(ReadReq.Types.Options.Types.FilterOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Options.Types.FilterOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions` | 

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



### Method `MergeFrom(ReadReq.Types.Options.Types.FilterOptions)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Options.Types.FilterOptions other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions` | 



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



## Enum `ReadReq.Types.Options.Types.FilterOptions.FilterOneofCase`
Enum of possible cases for the &quot;filter&quot; oneof.
### Syntax
```csharp
public enum FilterOneofCase
```

### Fields
Name | Description
--- | ---
None | 
StreamName | 
EventType | 
## Enum `ReadReq.Types.Options.Types.FilterOptions.WindowOneofCase`
Enum of possible cases for the &quot;window&quot; oneof.
### Syntax
```csharp
public enum WindowOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Max | 
Count | 
## Class `ReadReq.Types.Options.Types.FilterOptions.Types`
Container for nested types declared in the FilterOptions message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `ReadReq.Types.Options.Types.FilterOptions.Types.Expression`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions.Types.Expression>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Expression : Google.Protobuf.IMessage<ReadReq.Types.Options.Types.FilterOptions.Types.Expression>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Options.Types.FilterOptions.Types.Expression> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Expression()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Expression()
```


### Constructor `Expression(ReadReq.Types.Options.Types.FilterOptions.Types.Expression)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Expression(ReadReq.Types.Options.Types.FilterOptions.Types.Expression other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions.Types.Expression` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.FilterOptions.Types.Expression Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions.Types.Expression` | 



### Field `RegexFieldNumber`
Field number for the &quot;regex&quot; field.
#### Syntax
```csharp
public static int RegexFieldNumber = 1
```


### Property `Regex`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Regex { get; set; }
```


### Field `PrefixFieldNumber`
Field number for the &quot;prefix&quot; field.
#### Syntax
```csharp
public static int PrefixFieldNumber = 2
```


### Property `Prefix`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.Collections.RepeatedField<string> Prefix { get; }
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



### Method `Equals(ReadReq.Types.Options.Types.FilterOptions.Types.Expression)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Options.Types.FilterOptions.Types.Expression other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions.Types.Expression` | 

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



### Method `MergeFrom(ReadReq.Types.Options.Types.FilterOptions.Types.Expression)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Options.Types.FilterOptions.Types.Expression other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.FilterOptions.Types.Expression` | 



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



## Class `ReadReq.Types.Options.Types.UUIDOption`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadReq.Types.Options.Types.UUIDOption>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class UUIDOption : Google.Protobuf.IMessage<ReadReq.Types.Options.Types.UUIDOption>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Options.Types.UUIDOption> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `UUIDOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUIDOption()
```


### Constructor `UUIDOption(ReadReq.Types.Options.Types.UUIDOption)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUIDOption(ReadReq.Types.Options.Types.UUIDOption other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.UUIDOption` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.UUIDOption Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadReq.Types.Options.Types.UUIDOption` | 



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
public Empty Structured { get; set; }
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
public Empty String { get; set; }
```


### Property `ContentCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.UUIDOption.ContentOneofCase ContentCase { get; }
```


### Method `ClearContent()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearContent()
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



### Method `Equals(ReadReq.Types.Options.Types.UUIDOption)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Options.Types.UUIDOption other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.UUIDOption` | 

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



### Method `MergeFrom(ReadReq.Types.Options.Types.UUIDOption)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Options.Types.UUIDOption other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadReq.Types.Options.Types.UUIDOption` | 



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



## Enum `ReadReq.Types.Options.Types.UUIDOption.ContentOneofCase`
Enum of possible cases for the &quot;content&quot; oneof.
### Syntax
```csharp
public enum ContentOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Structured | 
String | 
## Enum `ReadReq.Types.Options.StreamOptionOneofCase`
Enum of possible cases for the &quot;stream_option&quot; oneof.
### Syntax
```csharp
public enum StreamOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Stream | 
All | 
## Enum `ReadReq.Types.Options.CountOptionOneofCase`
Enum of possible cases for the &quot;count_option&quot; oneof.
### Syntax
```csharp
public enum CountOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Count | 
Subscription | 
## Enum `ReadReq.Types.Options.FilterOptionOneofCase`
Enum of possible cases for the &quot;filter_option&quot; oneof.
### Syntax
```csharp
public enum FilterOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Filter | 
NoFilter | 
## Class `TombstoneReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.TombstoneReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class TombstoneReq : Google.Protobuf.IMessage<TombstoneReq>
```

### Method `WithAnyStreamRevision(StreamState)`

#### Syntax
```csharp
public TombstoneReq WithAnyStreamRevision(StreamState expectedState)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`expectedState` | `StreamState` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.TombstoneReq` | 



### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<TombstoneReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `TombstoneReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneReq()
```


### Constructor `TombstoneReq(TombstoneReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneReq(TombstoneReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.TombstoneReq` | 



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
public TombstoneReq.Types.Options Options { get; set; }
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



### Method `Equals(TombstoneReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(TombstoneReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneReq` | 

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



### Method `MergeFrom(TombstoneReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(TombstoneReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneReq` | 



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



## Class `TombstoneReq.Types`
Container for nested types declared in the TombstoneReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `TombstoneReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.TombstoneReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<TombstoneReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<TombstoneReq.Types.Options> Parser { get; }
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


### Constructor `Options(TombstoneReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(TombstoneReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.TombstoneReq.Types.Options` | 



### Field `StreamNameFieldNumber`
Field number for the &quot;stream_name&quot; field.
#### Syntax
```csharp
public static int StreamNameFieldNumber = 1
```


### Property `StreamName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string StreamName { get; set; }
```


### Field `RevisionFieldNumber`
Field number for the &quot;revision&quot; field.
#### Syntax
```csharp
public static int RevisionFieldNumber = 2
```


### Property `Revision`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong Revision { get; set; }
```


### Field `NoStreamFieldNumber`
Field number for the &quot;no_stream&quot; field.
#### Syntax
```csharp
public static int NoStreamFieldNumber = 3
```


### Property `NoStream`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoStream { get; set; }
```


### Field `AnyFieldNumber`
Field number for the &quot;any&quot; field.
#### Syntax
```csharp
public static int AnyFieldNumber = 4
```


### Property `Any`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Any { get; set; }
```


### Field `StreamExistsFieldNumber`
Field number for the &quot;stream_exists&quot; field.
#### Syntax
```csharp
public static int StreamExistsFieldNumber = 5
```


### Property `StreamExists`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty StreamExists { get; set; }
```


### Property `ExpectedStreamRevisionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneReq.Types.Options.ExpectedStreamRevisionOneofCase ExpectedStreamRevisionCase { get; }
```


### Method `ClearExpectedStreamRevision()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearExpectedStreamRevision()
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



### Method `Equals(TombstoneReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(TombstoneReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneReq.Types.Options` | 

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



### Method `MergeFrom(TombstoneReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(TombstoneReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneReq.Types.Options` | 



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



## Enum `TombstoneReq.Types.Options.ExpectedStreamRevisionOneofCase`
Enum of possible cases for the &quot;expected_stream_revision&quot; oneof.
### Syntax
```csharp
public enum ExpectedStreamRevisionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Revision | 
NoStream | 
Any | 
StreamExists | 
## Class `StreamsReflection`
Holder for reflection information generated from streams.proto
### Inheritance
↳ `object`
### Syntax
```csharp
public static class StreamsReflection
```

### Property `Descriptor`
File descriptor for streams.proto
#### Syntax
```csharp
public static Google.Protobuf.Reflection.FileDescriptor Descriptor { get; }
```


## Class `ReadResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ReadResp : Google.Protobuf.IMessage<ReadResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ReadResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp()
```


### Constructor `ReadResp(ReadResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp(ReadResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadResp` | 



### Field `EventFieldNumber`
Field number for the &quot;event&quot; field.
#### Syntax
```csharp
public static int EventFieldNumber = 1
```


### Property `Event`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent Event { get; set; }
```


### Field `ConfirmationFieldNumber`
Field number for the &quot;confirmation&quot; field.
#### Syntax
```csharp
public static int ConfirmationFieldNumber = 2
```


### Property `Confirmation`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.SubscriptionConfirmation Confirmation { get; set; }
```


### Field `CheckpointFieldNumber`
Field number for the &quot;checkpoint&quot; field.
#### Syntax
```csharp
public static int CheckpointFieldNumber = 3
```


### Property `Checkpoint`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.Checkpoint Checkpoint { get; set; }
```


### Field `StreamNotFoundFieldNumber`
Field number for the &quot;stream_not_found&quot; field.
#### Syntax
```csharp
public static int StreamNotFoundFieldNumber = 4
```


### Property `StreamNotFound`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.StreamNotFound StreamNotFound { get; set; }
```


### Property `ContentCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.ContentOneofCase ContentCase { get; }
```


### Method `ClearContent()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearContent()
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



### Method `Equals(ReadResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp` | 

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



### Method `MergeFrom(ReadResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp` | 



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



## Enum `ReadResp.ContentOneofCase`
Enum of possible cases for the &quot;content&quot; oneof.
### Syntax
```csharp
public enum ContentOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Event | 
Confirmation | 
Checkpoint | 
StreamNotFound | 
## Class `ReadResp.Types`
Container for nested types declared in the ReadResp message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `ReadResp.Types.ReadEvent`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadResp.Types.ReadEvent>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ReadEvent : Google.Protobuf.IMessage<ReadResp.Types.ReadEvent>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadResp.Types.ReadEvent> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ReadEvent()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadEvent()
```


### Constructor `ReadEvent(ReadResp.Types.ReadEvent)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadEvent(ReadResp.Types.ReadEvent other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.ReadEvent` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadResp.Types.ReadEvent` | 



### Field `EventFieldNumber`
Field number for the &quot;event&quot; field.
#### Syntax
```csharp
public static int EventFieldNumber = 1
```


### Property `Event`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent.Types.RecordedEvent Event { get; set; }
```


### Field `LinkFieldNumber`
Field number for the &quot;link&quot; field.
#### Syntax
```csharp
public static int LinkFieldNumber = 2
```


### Property `Link`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent.Types.RecordedEvent Link { get; set; }
```


### Field `CommitPositionFieldNumber`
Field number for the &quot;commit_position&quot; field.
#### Syntax
```csharp
public static int CommitPositionFieldNumber = 3
```


### Property `CommitPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CommitPosition { get; set; }
```


### Field `NoPositionFieldNumber`
Field number for the &quot;no_position&quot; field.
#### Syntax
```csharp
public static int NoPositionFieldNumber = 4
```


### Property `NoPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoPosition { get; set; }
```


### Property `PositionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent.PositionOneofCase PositionCase { get; }
```


### Method `ClearPosition()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearPosition()
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



### Method `Equals(ReadResp.Types.ReadEvent)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadResp.Types.ReadEvent other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.ReadEvent` | 

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



### Method `MergeFrom(ReadResp.Types.ReadEvent)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadResp.Types.ReadEvent other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.ReadEvent` | 



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



## Enum `ReadResp.Types.ReadEvent.PositionOneofCase`
Enum of possible cases for the &quot;position&quot; oneof.
### Syntax
```csharp
public enum PositionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
CommitPosition | 
NoPosition | 
## Class `ReadResp.Types.ReadEvent.Types`
Container for nested types declared in the ReadEvent message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `ReadResp.Types.ReadEvent.Types.RecordedEvent`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadResp.Types.ReadEvent.Types.RecordedEvent>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class RecordedEvent : Google.Protobuf.IMessage<ReadResp.Types.ReadEvent.Types.RecordedEvent>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadResp.Types.ReadEvent.Types.RecordedEvent> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `RecordedEvent()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public RecordedEvent()
```


### Constructor `RecordedEvent(ReadResp.Types.ReadEvent.Types.RecordedEvent)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public RecordedEvent(ReadResp.Types.ReadEvent.Types.RecordedEvent other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.ReadEvent.Types.RecordedEvent` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent.Types.RecordedEvent Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadResp.Types.ReadEvent.Types.RecordedEvent` | 



### Field `IdFieldNumber`
Field number for the &quot;id&quot; field.
#### Syntax
```csharp
public static int IdFieldNumber = 1
```


### Property `Id`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UUID Id { get; set; }
```


### Field `StreamNameFieldNumber`
Field number for the &quot;stream_name&quot; field.
#### Syntax
```csharp
public static int StreamNameFieldNumber = 2
```


### Property `StreamName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string StreamName { get; set; }
```


### Field `StreamRevisionFieldNumber`
Field number for the &quot;stream_revision&quot; field.
#### Syntax
```csharp
public static int StreamRevisionFieldNumber = 3
```


### Property `StreamRevision`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong StreamRevision { get; set; }
```


### Field `PreparePositionFieldNumber`
Field number for the &quot;prepare_position&quot; field.
#### Syntax
```csharp
public static int PreparePositionFieldNumber = 4
```


### Property `PreparePosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong PreparePosition { get; set; }
```


### Field `CommitPositionFieldNumber`
Field number for the &quot;commit_position&quot; field.
#### Syntax
```csharp
public static int CommitPositionFieldNumber = 5
```


### Property `CommitPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CommitPosition { get; set; }
```


### Field `MetadataFieldNumber`
Field number for the &quot;metadata&quot; field.
#### Syntax
```csharp
public static int MetadataFieldNumber = 6
```


### Property `Metadata`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.Collections.MapField<string, string> Metadata { get; }
```


### Field `CustomMetadataFieldNumber`
Field number for the &quot;custom_metadata&quot; field.
#### Syntax
```csharp
public static int CustomMetadataFieldNumber = 7
```


### Property `CustomMetadata`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.ByteString CustomMetadata { get; set; }
```


### Field `DataFieldNumber`
Field number for the &quot;data&quot; field.
#### Syntax
```csharp
public static int DataFieldNumber = 8
```


### Property `Data`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.ByteString Data { get; set; }
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



### Method `Equals(ReadResp.Types.ReadEvent.Types.RecordedEvent)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadResp.Types.ReadEvent.Types.RecordedEvent other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.ReadEvent.Types.RecordedEvent` | 

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



### Method `MergeFrom(ReadResp.Types.ReadEvent.Types.RecordedEvent)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadResp.Types.ReadEvent.Types.RecordedEvent other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.ReadEvent.Types.RecordedEvent` | 



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



## Class `ReadResp.Types.SubscriptionConfirmation`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadResp.Types.SubscriptionConfirmation>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class SubscriptionConfirmation : Google.Protobuf.IMessage<ReadResp.Types.SubscriptionConfirmation>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadResp.Types.SubscriptionConfirmation> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `SubscriptionConfirmation()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public SubscriptionConfirmation()
```


### Constructor `SubscriptionConfirmation(ReadResp.Types.SubscriptionConfirmation)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public SubscriptionConfirmation(ReadResp.Types.SubscriptionConfirmation other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.SubscriptionConfirmation` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.SubscriptionConfirmation Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadResp.Types.SubscriptionConfirmation` | 



### Field `SubscriptionIdFieldNumber`
Field number for the &quot;subscription_id&quot; field.
#### Syntax
```csharp
public static int SubscriptionIdFieldNumber = 1
```


### Property `SubscriptionId`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string SubscriptionId { get; set; }
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



### Method `Equals(ReadResp.Types.SubscriptionConfirmation)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadResp.Types.SubscriptionConfirmation other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.SubscriptionConfirmation` | 

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



### Method `MergeFrom(ReadResp.Types.SubscriptionConfirmation)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadResp.Types.SubscriptionConfirmation other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.SubscriptionConfirmation` | 



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



## Class `ReadResp.Types.Checkpoint`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadResp.Types.Checkpoint>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Checkpoint : Google.Protobuf.IMessage<ReadResp.Types.Checkpoint>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadResp.Types.Checkpoint> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Checkpoint()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Checkpoint()
```


### Constructor `Checkpoint(ReadResp.Types.Checkpoint)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Checkpoint(ReadResp.Types.Checkpoint other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.Checkpoint` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.Checkpoint Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadResp.Types.Checkpoint` | 



### Field `CommitPositionFieldNumber`
Field number for the &quot;commit_position&quot; field.
#### Syntax
```csharp
public static int CommitPositionFieldNumber = 1
```


### Property `CommitPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CommitPosition { get; set; }
```


### Field `PreparePositionFieldNumber`
Field number for the &quot;prepare_position&quot; field.
#### Syntax
```csharp
public static int PreparePositionFieldNumber = 2
```


### Property `PreparePosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong PreparePosition { get; set; }
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



### Method `Equals(ReadResp.Types.Checkpoint)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadResp.Types.Checkpoint other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.Checkpoint` | 

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



### Method `MergeFrom(ReadResp.Types.Checkpoint)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadResp.Types.Checkpoint other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.Checkpoint` | 



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



## Class `ReadResp.Types.StreamNotFound`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.ReadResp.Types.StreamNotFound>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class StreamNotFound : Google.Protobuf.IMessage<ReadResp.Types.StreamNotFound>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadResp.Types.StreamNotFound> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `StreamNotFound()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StreamNotFound()
```


### Constructor `StreamNotFound(ReadResp.Types.StreamNotFound)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public StreamNotFound(ReadResp.Types.StreamNotFound other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.StreamNotFound` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.StreamNotFound Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.ReadResp.Types.StreamNotFound` | 



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



### Method `Equals(ReadResp.Types.StreamNotFound)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadResp.Types.StreamNotFound other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.StreamNotFound` | 

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



### Method `MergeFrom(ReadResp.Types.StreamNotFound)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadResp.Types.StreamNotFound other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.ReadResp.Types.StreamNotFound` | 



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



## Class `AppendResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.AppendResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class AppendResp : Google.Protobuf.IMessage<AppendResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<AppendResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `AppendResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp()
```


### Constructor `AppendResp(AppendResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp(AppendResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.AppendResp` | 



### Field `SuccessFieldNumber`
Field number for the &quot;success&quot; field.
#### Syntax
```csharp
public static int SuccessFieldNumber = 1
```


### Property `Success`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.Success Success { get; set; }
```


### Field `WrongExpectedVersionFieldNumber`
Field number for the &quot;wrong_expected_version&quot; field.
#### Syntax
```csharp
public static int WrongExpectedVersionFieldNumber = 2
```


### Property `WrongExpectedVersion`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.WrongExpectedVersion WrongExpectedVersion { get; set; }
```


### Property `ResultCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.ResultOneofCase ResultCase { get; }
```


### Method `ClearResult()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearResult()
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



### Method `Equals(AppendResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(AppendResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp` | 

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



### Method `MergeFrom(AppendResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(AppendResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp` | 



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



## Enum `AppendResp.ResultOneofCase`
Enum of possible cases for the &quot;result&quot; oneof.
### Syntax
```csharp
public enum ResultOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Success | 
WrongExpectedVersion | 
## Class `AppendResp.Types`
Container for nested types declared in the AppendResp message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `AppendResp.Types.Position`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.AppendResp.Types.Position>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Position : Google.Protobuf.IMessage<AppendResp.Types.Position>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<AppendResp.Types.Position> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Position()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Position()
```


### Constructor `Position(AppendResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Position(AppendResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.Position` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.Position Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.AppendResp.Types.Position` | 



### Field `CommitPositionFieldNumber`
Field number for the &quot;commit_position&quot; field.
#### Syntax
```csharp
public static int CommitPositionFieldNumber = 1
```


### Property `CommitPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CommitPosition { get; set; }
```


### Field `PreparePositionFieldNumber`
Field number for the &quot;prepare_position&quot; field.
#### Syntax
```csharp
public static int PreparePositionFieldNumber = 2
```


### Property `PreparePosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong PreparePosition { get; set; }
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



### Method `Equals(AppendResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(AppendResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.Position` | 

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



### Method `MergeFrom(AppendResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(AppendResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.Position` | 



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



## Class `AppendResp.Types.Success`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.AppendResp.Types.Success>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Success : Google.Protobuf.IMessage<AppendResp.Types.Success>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<AppendResp.Types.Success> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Success()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Success()
```


### Constructor `Success(AppendResp.Types.Success)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Success(AppendResp.Types.Success other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.Success` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.Success Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.AppendResp.Types.Success` | 



### Field `CurrentRevisionFieldNumber`
Field number for the &quot;current_revision&quot; field.
#### Syntax
```csharp
public static int CurrentRevisionFieldNumber = 1
```


### Property `CurrentRevision`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CurrentRevision { get; set; }
```


### Field `NoStreamFieldNumber`
Field number for the &quot;no_stream&quot; field.
#### Syntax
```csharp
public static int NoStreamFieldNumber = 2
```


### Property `NoStream`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoStream { get; set; }
```


### Field `PositionFieldNumber`
Field number for the &quot;position&quot; field.
#### Syntax
```csharp
public static int PositionFieldNumber = 3
```


### Property `Position`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.Position Position { get; set; }
```


### Field `NoPositionFieldNumber`
Field number for the &quot;no_position&quot; field.
#### Syntax
```csharp
public static int NoPositionFieldNumber = 4
```


### Property `NoPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoPosition { get; set; }
```


### Property `CurrentRevisionOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.Success.CurrentRevisionOptionOneofCase CurrentRevisionOptionCase { get; }
```


### Method `ClearCurrentRevisionOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearCurrentRevisionOption()
```


### Property `PositionOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.Success.PositionOptionOneofCase PositionOptionCase { get; }
```


### Method `ClearPositionOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearPositionOption()
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



### Method `Equals(AppendResp.Types.Success)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(AppendResp.Types.Success other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.Success` | 

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



### Method `MergeFrom(AppendResp.Types.Success)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(AppendResp.Types.Success other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.Success` | 



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



## Enum `AppendResp.Types.Success.CurrentRevisionOptionOneofCase`
Enum of possible cases for the &quot;current_revision_option&quot; oneof.
### Syntax
```csharp
public enum CurrentRevisionOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
CurrentRevision | 
NoStream | 
## Enum `AppendResp.Types.Success.PositionOptionOneofCase`
Enum of possible cases for the &quot;position_option&quot; oneof.
### Syntax
```csharp
public enum PositionOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Position | 
NoPosition | 
## Class `AppendResp.Types.WrongExpectedVersion`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.AppendResp.Types.WrongExpectedVersion>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class WrongExpectedVersion : Google.Protobuf.IMessage<AppendResp.Types.WrongExpectedVersion>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<AppendResp.Types.WrongExpectedVersion> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `WrongExpectedVersion()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public WrongExpectedVersion()
```


### Constructor `WrongExpectedVersion(AppendResp.Types.WrongExpectedVersion)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public WrongExpectedVersion(AppendResp.Types.WrongExpectedVersion other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.WrongExpectedVersion` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.WrongExpectedVersion Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.AppendResp.Types.WrongExpectedVersion` | 



### Field `CurrentRevisionFieldNumber`
Field number for the &quot;current_revision&quot; field.
#### Syntax
```csharp
public static int CurrentRevisionFieldNumber = 1
```


### Property `CurrentRevision`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CurrentRevision { get; set; }
```


### Field `NoStreamFieldNumber`
Field number for the &quot;no_stream&quot; field.
#### Syntax
```csharp
public static int NoStreamFieldNumber = 2
```


### Property `NoStream`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoStream { get; set; }
```


### Field `ExpectedRevisionFieldNumber`
Field number for the &quot;expected_revision&quot; field.
#### Syntax
```csharp
public static int ExpectedRevisionFieldNumber = 3
```


### Property `ExpectedRevision`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong ExpectedRevision { get; set; }
```


### Field `AnyFieldNumber`
Field number for the &quot;any&quot; field.
#### Syntax
```csharp
public static int AnyFieldNumber = 4
```


### Property `Any`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty Any { get; set; }
```


### Field `StreamExistsFieldNumber`
Field number for the &quot;stream_exists&quot; field.
#### Syntax
```csharp
public static int StreamExistsFieldNumber = 5
```


### Property `StreamExists`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty StreamExists { get; set; }
```


### Property `CurrentRevisionOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.WrongExpectedVersion.CurrentRevisionOptionOneofCase CurrentRevisionOptionCase { get; }
```


### Method `ClearCurrentRevisionOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearCurrentRevisionOption()
```


### Property `ExpectedRevisionOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public AppendResp.Types.WrongExpectedVersion.ExpectedRevisionOptionOneofCase ExpectedRevisionOptionCase { get; }
```


### Method `ClearExpectedRevisionOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearExpectedRevisionOption()
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



### Method `Equals(AppendResp.Types.WrongExpectedVersion)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(AppendResp.Types.WrongExpectedVersion other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.WrongExpectedVersion` | 

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



### Method `MergeFrom(AppendResp.Types.WrongExpectedVersion)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(AppendResp.Types.WrongExpectedVersion other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.AppendResp.Types.WrongExpectedVersion` | 



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



## Enum `AppendResp.Types.WrongExpectedVersion.CurrentRevisionOptionOneofCase`
Enum of possible cases for the &quot;current_revision_option&quot; oneof.
### Syntax
```csharp
public enum CurrentRevisionOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
CurrentRevision | 
NoStream | 
## Enum `AppendResp.Types.WrongExpectedVersion.ExpectedRevisionOptionOneofCase`
Enum of possible cases for the &quot;expected_revision_option&quot; oneof.
### Syntax
```csharp
public enum ExpectedRevisionOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
ExpectedRevision | 
Any | 
StreamExists | 
## Class `DeleteResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.DeleteResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Streams.DeleteResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.DeleteResp` | 



### Field `PositionFieldNumber`
Field number for the &quot;position&quot; field.
#### Syntax
```csharp
public static int PositionFieldNumber = 1
```


### Property `Position`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp.Types.Position Position { get; set; }
```


### Field `NoPositionFieldNumber`
Field number for the &quot;no_position&quot; field.
#### Syntax
```csharp
public static int NoPositionFieldNumber = 2
```


### Property `NoPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoPosition { get; set; }
```


### Property `PositionOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp.PositionOptionOneofCase PositionOptionCase { get; }
```


### Method `ClearPositionOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearPositionOption()
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



### Method `Equals(DeleteResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DeleteResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.DeleteResp` | 

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
`other` | `EventStore.Client.Streams.DeleteResp` | 



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



## Enum `DeleteResp.PositionOptionOneofCase`
Enum of possible cases for the &quot;position_option&quot; oneof.
### Syntax
```csharp
public enum PositionOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Position | 
NoPosition | 
## Class `DeleteResp.Types`
Container for nested types declared in the DeleteResp message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `DeleteResp.Types.Position`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.DeleteResp.Types.Position>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Position : Google.Protobuf.IMessage<DeleteResp.Types.Position>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DeleteResp.Types.Position> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Position()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Position()
```


### Constructor `Position(DeleteResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Position(DeleteResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.DeleteResp.Types.Position` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp.Types.Position Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.DeleteResp.Types.Position` | 



### Field `CommitPositionFieldNumber`
Field number for the &quot;commit_position&quot; field.
#### Syntax
```csharp
public static int CommitPositionFieldNumber = 1
```


### Property `CommitPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CommitPosition { get; set; }
```


### Field `PreparePositionFieldNumber`
Field number for the &quot;prepare_position&quot; field.
#### Syntax
```csharp
public static int PreparePositionFieldNumber = 2
```


### Property `PreparePosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong PreparePosition { get; set; }
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



### Method `Equals(DeleteResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DeleteResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.DeleteResp.Types.Position` | 

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



### Method `MergeFrom(DeleteResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DeleteResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.DeleteResp.Types.Position` | 



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



## Class `TombstoneResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.TombstoneResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class TombstoneResp : Google.Protobuf.IMessage<TombstoneResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<TombstoneResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `TombstoneResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneResp()
```


### Constructor `TombstoneResp(TombstoneResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneResp(TombstoneResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.TombstoneResp` | 



### Field `PositionFieldNumber`
Field number for the &quot;position&quot; field.
#### Syntax
```csharp
public static int PositionFieldNumber = 1
```


### Property `Position`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneResp.Types.Position Position { get; set; }
```


### Field `NoPositionFieldNumber`
Field number for the &quot;no_position&quot; field.
#### Syntax
```csharp
public static int NoPositionFieldNumber = 2
```


### Property `NoPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoPosition { get; set; }
```


### Property `PositionOptionCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneResp.PositionOptionOneofCase PositionOptionCase { get; }
```


### Method `ClearPositionOption()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearPositionOption()
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



### Method `Equals(TombstoneResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(TombstoneResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneResp` | 

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



### Method `MergeFrom(TombstoneResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(TombstoneResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneResp` | 



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



## Enum `TombstoneResp.PositionOptionOneofCase`
Enum of possible cases for the &quot;position_option&quot; oneof.
### Syntax
```csharp
public enum PositionOptionOneofCase
```

### Fields
Name | Description
--- | ---
None | 
Position | 
NoPosition | 
## Class `TombstoneResp.Types`
Container for nested types declared in the TombstoneResp message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `TombstoneResp.Types.Position`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Streams.TombstoneResp.Types.Position>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Position : Google.Protobuf.IMessage<TombstoneResp.Types.Position>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<TombstoneResp.Types.Position> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Position()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Position()
```


### Constructor `Position(TombstoneResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Position(TombstoneResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneResp.Types.Position` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public TombstoneResp.Types.Position Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.TombstoneResp.Types.Position` | 



### Field `CommitPositionFieldNumber`
Field number for the &quot;commit_position&quot; field.
#### Syntax
```csharp
public static int CommitPositionFieldNumber = 1
```


### Property `CommitPosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong CommitPosition { get; set; }
```


### Field `PreparePositionFieldNumber`
Field number for the &quot;prepare_position&quot; field.
#### Syntax
```csharp
public static int PreparePositionFieldNumber = 2
```


### Property `PreparePosition`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ulong PreparePosition { get; set; }
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



### Method `Equals(TombstoneResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(TombstoneResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneResp.Types.Position` | 

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



### Method `MergeFrom(TombstoneResp.Types.Position)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(TombstoneResp.Types.Position other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Streams.TombstoneResp.Types.Position` | 



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



## Class `Streams`

### Inheritance
↳ `object`
### Syntax
```csharp
public static class Streams
```

### Property `Descriptor`
Service descriptor
#### Syntax
```csharp
public static Google.Protobuf.Reflection.ServiceDescriptor Descriptor { get; }
```


## Class `Streams.StreamsClient`
Client for Streams
### Inheritance
↳ `Grpc.Core.ClientBase<EventStore.Client.Streams.Streams.StreamsClient>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public class StreamsClient : Grpc.Core.ClientBase<Streams.StreamsClient>
```

### Constructor `StreamsClient(Grpc.Core.ChannelBase)`
Creates a new client for Streams
#### Syntax
```csharp
public StreamsClient(Grpc.Core.ChannelBase channel)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`channel` | `Grpc.Core.ChannelBase` | The channel to use to make remote calls.



### Constructor `StreamsClient(Grpc.Core.CallInvoker)`
Creates a new client for Streams that uses a custom <code>CallInvoker</code>.
#### Syntax
```csharp
public StreamsClient(Grpc.Core.CallInvoker callInvoker)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`callInvoker` | `Grpc.Core.CallInvoker` | The callInvoker to use to make remote calls.



### Constructor `StreamsClient()`
Protected parameterless constructor to allow creation of test doubles.
#### Syntax
```csharp
protected StreamsClient()
```


### Constructor `StreamsClient(ClientBaseConfiguration)`
Protected constructor to allow creation of configured clients.
#### Syntax
```csharp
protected StreamsClient(ClientBaseConfiguration configuration)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`configuration` | `ClientBaseConfiguration` | The client configuration.



### Method `Read(ReadReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncServerStreamingCall<ReadResp> Read(ReadReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.ReadReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncServerStreamingCall<EventStore.Client.Streams.ReadResp>` | 



### Method `Read(ReadReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncServerStreamingCall<ReadResp> Read(ReadReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.ReadReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncServerStreamingCall<EventStore.Client.Streams.ReadResp>` | 



### Method `Append(Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncClientStreamingCall<AppendReq, AppendResp> Append(Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncClientStreamingCall<EventStore.Client.Streams.AppendReq, EventStore.Client.Streams.AppendResp>` | 



### Method `Append(Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncClientStreamingCall<AppendReq, AppendResp> Append(Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncClientStreamingCall<EventStore.Client.Streams.AppendReq, EventStore.Client.Streams.AppendResp>` | 



### Method `Delete(DeleteReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual DeleteResp Delete(DeleteReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.DeleteReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.DeleteResp` | 



### Method `Delete(DeleteReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual DeleteResp Delete(DeleteReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.DeleteReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.DeleteResp` | 



### Method `DeleteAsync(DeleteReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DeleteResp> DeleteAsync(DeleteReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.DeleteReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Streams.DeleteResp>` | 



### Method `DeleteAsync(DeleteReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DeleteResp> DeleteAsync(DeleteReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.DeleteReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Streams.DeleteResp>` | 



### Method `Tombstone(TombstoneReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual TombstoneResp Tombstone(TombstoneReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.TombstoneReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.TombstoneResp` | 



### Method `Tombstone(TombstoneReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual TombstoneResp Tombstone(TombstoneReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.TombstoneReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.TombstoneResp` | 



### Method `TombstoneAsync(TombstoneReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<TombstoneResp> TombstoneAsync(TombstoneReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.TombstoneReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Streams.TombstoneResp>` | 



### Method `TombstoneAsync(TombstoneReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<TombstoneResp> TombstoneAsync(TombstoneReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Streams.TombstoneReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Streams.TombstoneResp>` | 



### Method `NewInstance(ClientBaseConfiguration)`
Creates a new instance of client from given <code>ClientBaseConfiguration</code>.
#### Syntax
```csharp
protected override Streams.StreamsClient NewInstance(ClientBaseConfiguration configuration)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`configuration` | `ClientBaseConfiguration` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Streams.Streams.StreamsClient` | 


