---
title: EventStore.Client.PersistentSubscriptions
---

# Namespace: EventStore.Client.PersistentSubscriptions
## Class `PersistentsubscriptionsReflection`
Holder for reflection information generated from persistentsubscriptions.proto
### Inheritance
↳ `object`
### Syntax
```csharp
public static class PersistentsubscriptionsReflection
```

### Property `Descriptor`
File descriptor for persistentsubscriptions.proto
#### Syntax
```csharp
public static Google.Protobuf.Reflection.FileDescriptor Descriptor { get; }
```


## Class `ReadReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadReq` | 



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


### Field `AckFieldNumber`
Field number for the &quot;ack&quot; field.
#### Syntax
```csharp
public static int AckFieldNumber = 2
```


### Property `Ack`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Ack Ack { get; set; }
```


### Field `NackFieldNumber`
Field number for the &quot;nack&quot; field.
#### Syntax
```csharp
public static int NackFieldNumber = 3
```


### Property `Nack`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Nack Nack { get; set; }
```


### Property `ContentCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.ContentOneofCase ContentCase { get; }
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



### Method `Equals(ReadReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq` | 



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



## Enum `ReadReq.ContentOneofCase`
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
Ack | 
Nack | 
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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options` | 



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


### Field `GroupNameFieldNumber`
Field number for the &quot;group_name&quot; field.
#### Syntax
```csharp
public static int GroupNameFieldNumber = 2
```


### Property `GroupName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string GroupName { get; set; }
```


### Field `BufferSizeFieldNumber`
Field number for the &quot;buffer_size&quot; field.
#### Syntax
```csharp
public static int BufferSizeFieldNumber = 3
```


### Property `BufferSize`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int BufferSize { get; set; }
```


### Field `UuidOptionFieldNumber`
Field number for the &quot;uuid_option&quot; field.
#### Syntax
```csharp
public static int UuidOptionFieldNumber = 4
```


### Property `UuidOption`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.UUIDOption UuidOption { get; set; }
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options` | 



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


## Class `ReadReq.Types.Options.Types.UUIDOption`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options.Types.UUIDOption>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options.Types.UUIDOption` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Options.Types.UUIDOption Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options.Types.UUIDOption` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options.Types.UUIDOption` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Options.Types.UUIDOption` | 



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
## Class `ReadReq.Types.Ack`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadReq.Types.Ack>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Ack : Google.Protobuf.IMessage<ReadReq.Types.Ack>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Ack> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Ack()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Ack()
```


### Constructor `Ack(ReadReq.Types.Ack)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Ack(ReadReq.Types.Ack other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Ack` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Ack Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadReq.Types.Ack` | 



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
public Google.Protobuf.ByteString Id { get; set; }
```


### Field `IdsFieldNumber`
Field number for the &quot;ids&quot; field.
#### Syntax
```csharp
public static int IdsFieldNumber = 2
```


### Property `Ids`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.Collections.RepeatedField<UUID> Ids { get; }
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



### Method `Equals(ReadReq.Types.Ack)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Ack other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Ack` | 

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



### Method `MergeFrom(ReadReq.Types.Ack)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Ack other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Ack` | 



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



## Class `ReadReq.Types.Nack`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadReq.Types.Nack>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Nack : Google.Protobuf.IMessage<ReadReq.Types.Nack>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ReadReq.Types.Nack> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Nack()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Nack()
```


### Constructor `Nack(ReadReq.Types.Nack)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Nack(ReadReq.Types.Nack other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Nack` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Nack Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadReq.Types.Nack` | 



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
public Google.Protobuf.ByteString Id { get; set; }
```


### Field `IdsFieldNumber`
Field number for the &quot;ids&quot; field.
#### Syntax
```csharp
public static int IdsFieldNumber = 2
```


### Property `Ids`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.Collections.RepeatedField<UUID> Ids { get; }
```


### Field `ActionFieldNumber`
Field number for the &quot;action&quot; field.
#### Syntax
```csharp
public static int ActionFieldNumber = 3
```


### Property `Action`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadReq.Types.Nack.Types.Action Action { get; set; }
```


### Field `ReasonFieldNumber`
Field number for the &quot;reason&quot; field.
#### Syntax
```csharp
public static int ReasonFieldNumber = 4
```


### Property `Reason`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Reason { get; set; }
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



### Method `Equals(ReadReq.Types.Nack)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ReadReq.Types.Nack other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Nack` | 

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



### Method `MergeFrom(ReadReq.Types.Nack)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ReadReq.Types.Nack other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.ReadReq.Types.Nack` | 



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



## Class `ReadReq.Types.Nack.Types`
Container for nested types declared in the Nack message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Enum `ReadReq.Types.Nack.Types.Action`

### Syntax
```csharp
public enum Action
```

### Fields
Name | Description
--- | ---
Unknown | 
Park | 
Retry | 
Skip | 
Stop | 
## Class `ReadResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadResp` | 



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


### Field `SubscriptionConfirmationFieldNumber`
Field number for the &quot;subscription_confirmation&quot; field.
#### Syntax
```csharp
public static int SubscriptionConfirmationFieldNumber = 2
```


### Property `SubscriptionConfirmation`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.SubscriptionConfirmation SubscriptionConfirmation { get; set; }
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp` | 



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
SubscriptionConfirmation | 
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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent` | 



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


### Field `RetryCountFieldNumber`
Field number for the &quot;retry_count&quot; field.
#### Syntax
```csharp
public static int RetryCountFieldNumber = 5
```


### Property `RetryCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int RetryCount { get; set; }
```


### Field `NoRetryCountFieldNumber`
Field number for the &quot;no_retry_count&quot; field.
#### Syntax
```csharp
public static int NoRetryCountFieldNumber = 6
```


### Property `NoRetryCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Empty NoRetryCount { get; set; }
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


### Property `CountCase`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent.CountOneofCase CountCase { get; }
```


### Method `ClearCount()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void ClearCount()
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent` | 



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
## Enum `ReadResp.Types.ReadEvent.CountOneofCase`
Enum of possible cases for the &quot;count&quot; oneof.
### Syntax
```csharp
public enum CountOneofCase
```

### Fields
Name | Description
--- | ---
None | 
RetryCount | 
NoRetryCount | 
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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent.Types.RecordedEvent>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent.Types.RecordedEvent` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.ReadEvent.Types.RecordedEvent Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent.Types.RecordedEvent` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent.Types.RecordedEvent` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.ReadEvent.Types.RecordedEvent` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.ReadResp.Types.SubscriptionConfirmation>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.SubscriptionConfirmation` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ReadResp.Types.SubscriptionConfirmation Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.ReadResp.Types.SubscriptionConfirmation` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.SubscriptionConfirmation` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.ReadResp.Types.SubscriptionConfirmation` | 



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



## Class `CreateReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.CreateReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.CreateReq` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq` | 



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


## Enum `CreateReq.Types.ConsumerStrategy`

### Syntax
```csharp
public enum ConsumerStrategy
```

### Fields
Name | Description
--- | ---
DispatchToSingle | 
RoundRobin | 
Pinned | 
## Class `CreateReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.CreateReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.CreateReq.Types.Options` | 



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


### Field `GroupNameFieldNumber`
Field number for the &quot;group_name&quot; field.
#### Syntax
```csharp
public static int GroupNameFieldNumber = 2
```


### Property `GroupName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string GroupName { get; set; }
```


### Field `SettingsFieldNumber`
Field number for the &quot;settings&quot; field.
#### Syntax
```csharp
public static int SettingsFieldNumber = 3
```


### Property `Settings`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Settings Settings { get; set; }
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
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq.Types.Options` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq.Types.Options` | 



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



## Class `CreateReq.Types.Settings`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.CreateReq.Types.Settings>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Settings : Google.Protobuf.IMessage<CreateReq.Types.Settings>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<CreateReq.Types.Settings> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Settings()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Settings()
```


### Constructor `Settings(CreateReq.Types.Settings)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Settings(CreateReq.Types.Settings other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq.Types.Settings` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Settings Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.CreateReq.Types.Settings` | 



### Field `ResolveLinksFieldNumber`
Field number for the &quot;resolve_links&quot; field.
#### Syntax
```csharp
public static int ResolveLinksFieldNumber = 1
```


### Property `ResolveLinks`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool ResolveLinks { get; set; }
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


### Field `ExtraStatisticsFieldNumber`
Field number for the &quot;extra_statistics&quot; field.
#### Syntax
```csharp
public static int ExtraStatisticsFieldNumber = 3
```


### Property `ExtraStatistics`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool ExtraStatistics { get; set; }
```


### Field `MessageTimeoutFieldNumber`
Field number for the &quot;message_timeout&quot; field.
#### Syntax
```csharp
public static int MessageTimeoutFieldNumber = 4
```


### Property `MessageTimeout`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long MessageTimeout { get; set; }
```


### Field `MaxRetryCountFieldNumber`
Field number for the &quot;max_retry_count&quot; field.
#### Syntax
```csharp
public static int MaxRetryCountFieldNumber = 5
```


### Property `MaxRetryCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int MaxRetryCount { get; set; }
```


### Field `CheckpointAfterFieldNumber`
Field number for the &quot;checkpoint_after&quot; field.
#### Syntax
```csharp
public static int CheckpointAfterFieldNumber = 6
```


### Property `CheckpointAfter`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long CheckpointAfter { get; set; }
```


### Field `MinCheckpointCountFieldNumber`
Field number for the &quot;min_checkpoint_count&quot; field.
#### Syntax
```csharp
public static int MinCheckpointCountFieldNumber = 7
```


### Property `MinCheckpointCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int MinCheckpointCount { get; set; }
```


### Field `MaxCheckpointCountFieldNumber`
Field number for the &quot;max_checkpoint_count&quot; field.
#### Syntax
```csharp
public static int MaxCheckpointCountFieldNumber = 8
```


### Property `MaxCheckpointCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int MaxCheckpointCount { get; set; }
```


### Field `MaxSubscriberCountFieldNumber`
Field number for the &quot;max_subscriber_count&quot; field.
#### Syntax
```csharp
public static int MaxSubscriberCountFieldNumber = 9
```


### Property `MaxSubscriberCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int MaxSubscriberCount { get; set; }
```


### Field `LiveBufferSizeFieldNumber`
Field number for the &quot;live_buffer_size&quot; field.
#### Syntax
```csharp
public static int LiveBufferSizeFieldNumber = 10
```


### Property `LiveBufferSize`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int LiveBufferSize { get; set; }
```


### Field `ReadBatchSizeFieldNumber`
Field number for the &quot;read_batch_size&quot; field.
#### Syntax
```csharp
public static int ReadBatchSizeFieldNumber = 11
```


### Property `ReadBatchSize`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int ReadBatchSize { get; set; }
```


### Field `HistoryBufferSizeFieldNumber`
Field number for the &quot;history_buffer_size&quot; field.
#### Syntax
```csharp
public static int HistoryBufferSizeFieldNumber = 12
```


### Property `HistoryBufferSize`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int HistoryBufferSize { get; set; }
```


### Field `NamedConsumerStrategyFieldNumber`
Field number for the &quot;named_consumer_strategy&quot; field.
#### Syntax
```csharp
public static int NamedConsumerStrategyFieldNumber = 13
```


### Property `NamedConsumerStrategy`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.ConsumerStrategy NamedConsumerStrategy { get; set; }
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



### Method `Equals(CreateReq.Types.Settings)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(CreateReq.Types.Settings other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq.Types.Settings` | 

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



### Method `MergeFrom(CreateReq.Types.Settings)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(CreateReq.Types.Settings other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.CreateReq.Types.Settings` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.CreateResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.CreateResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.CreateResp` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.CreateResp` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.CreateResp` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.UpdateReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.UpdateReq` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq` | 



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


## Enum `UpdateReq.Types.ConsumerStrategy`

### Syntax
```csharp
public enum ConsumerStrategy
```

### Fields
Name | Description
--- | ---
DispatchToSingle | 
RoundRobin | 
Pinned | 
## Class `UpdateReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Options` | 



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


### Field `GroupNameFieldNumber`
Field number for the &quot;group_name&quot; field.
#### Syntax
```csharp
public static int GroupNameFieldNumber = 2
```


### Property `GroupName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string GroupName { get; set; }
```


### Field `SettingsFieldNumber`
Field number for the &quot;settings&quot; field.
#### Syntax
```csharp
public static int SettingsFieldNumber = 3
```


### Property `Settings`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq.Types.Settings Settings { get; set; }
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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Options` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Options` | 



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



## Class `UpdateReq.Types.Settings`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Settings>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Settings : Google.Protobuf.IMessage<UpdateReq.Types.Settings>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<UpdateReq.Types.Settings> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `Settings()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Settings()
```


### Constructor `Settings(UpdateReq.Types.Settings)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Settings(UpdateReq.Types.Settings other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Settings` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq.Types.Settings Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Settings` | 



### Field `ResolveLinksFieldNumber`
Field number for the &quot;resolve_links&quot; field.
#### Syntax
```csharp
public static int ResolveLinksFieldNumber = 1
```


### Property `ResolveLinks`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool ResolveLinks { get; set; }
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


### Field `ExtraStatisticsFieldNumber`
Field number for the &quot;extra_statistics&quot; field.
#### Syntax
```csharp
public static int ExtraStatisticsFieldNumber = 3
```


### Property `ExtraStatistics`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool ExtraStatistics { get; set; }
```


### Field `MessageTimeoutFieldNumber`
Field number for the &quot;message_timeout&quot; field.
#### Syntax
```csharp
public static int MessageTimeoutFieldNumber = 4
```


### Property `MessageTimeout`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long MessageTimeout { get; set; }
```


### Field `MaxRetryCountFieldNumber`
Field number for the &quot;max_retry_count&quot; field.
#### Syntax
```csharp
public static int MaxRetryCountFieldNumber = 5
```


### Property `MaxRetryCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int MaxRetryCount { get; set; }
```


### Field `CheckpointAfterFieldNumber`
Field number for the &quot;checkpoint_after&quot; field.
#### Syntax
```csharp
public static int CheckpointAfterFieldNumber = 6
```


### Property `CheckpointAfter`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long CheckpointAfter { get; set; }
```


### Field `MinCheckpointCountFieldNumber`
Field number for the &quot;min_checkpoint_count&quot; field.
#### Syntax
```csharp
public static int MinCheckpointCountFieldNumber = 7
```


### Property `MinCheckpointCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int MinCheckpointCount { get; set; }
```


### Field `MaxCheckpointCountFieldNumber`
Field number for the &quot;max_checkpoint_count&quot; field.
#### Syntax
```csharp
public static int MaxCheckpointCountFieldNumber = 8
```


### Property `MaxCheckpointCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int MaxCheckpointCount { get; set; }
```


### Field `MaxSubscriberCountFieldNumber`
Field number for the &quot;max_subscriber_count&quot; field.
#### Syntax
```csharp
public static int MaxSubscriberCountFieldNumber = 9
```


### Property `MaxSubscriberCount`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int MaxSubscriberCount { get; set; }
```


### Field `LiveBufferSizeFieldNumber`
Field number for the &quot;live_buffer_size&quot; field.
#### Syntax
```csharp
public static int LiveBufferSizeFieldNumber = 10
```


### Property `LiveBufferSize`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int LiveBufferSize { get; set; }
```


### Field `ReadBatchSizeFieldNumber`
Field number for the &quot;read_batch_size&quot; field.
#### Syntax
```csharp
public static int ReadBatchSizeFieldNumber = 11
```


### Property `ReadBatchSize`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int ReadBatchSize { get; set; }
```


### Field `HistoryBufferSizeFieldNumber`
Field number for the &quot;history_buffer_size&quot; field.
#### Syntax
```csharp
public static int HistoryBufferSizeFieldNumber = 12
```


### Property `HistoryBufferSize`

#### Syntax
```csharp
[DebuggerNonUserCode]
public int HistoryBufferSize { get; set; }
```


### Field `NamedConsumerStrategyFieldNumber`
Field number for the &quot;named_consumer_strategy&quot; field.
#### Syntax
```csharp
public static int NamedConsumerStrategyFieldNumber = 13
```


### Property `NamedConsumerStrategy`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq.Types.ConsumerStrategy NamedConsumerStrategy { get; set; }
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



### Method `Equals(UpdateReq.Types.Settings)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(UpdateReq.Types.Settings other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Settings` | 

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



### Method `MergeFrom(UpdateReq.Types.Settings)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(UpdateReq.Types.Settings other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.PersistentSubscriptions.UpdateReq.Types.Settings` | 



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



## Class `UpdateResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.UpdateResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.UpdateResp` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateResp` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.UpdateResp` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.DeleteReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.DeleteReq` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteReq` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteReq` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.DeleteReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.DeleteReq.Types.Options` | 



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


### Field `GroupNameFieldNumber`
Field number for the &quot;group_name&quot; field.
#### Syntax
```csharp
public static int GroupNameFieldNumber = 2
```


### Property `GroupName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string GroupName { get; set; }
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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteReq.Types.Options` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteReq.Types.Options` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.PersistentSubscriptions.DeleteResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.DeleteResp` | 



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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteResp` | 

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
`other` | `EventStore.Client.PersistentSubscriptions.DeleteResp` | 



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



## Class `PersistentSubscriptions`

### Inheritance
↳ `object`
### Syntax
```csharp
public static class PersistentSubscriptions
```

### Property `Descriptor`
Service descriptor
#### Syntax
```csharp
public static Google.Protobuf.Reflection.ServiceDescriptor Descriptor { get; }
```


## Class `PersistentSubscriptions.PersistentSubscriptionsClient`
Client for PersistentSubscriptions
### Inheritance
↳ `Grpc.Core.ClientBase<EventStore.Client.PersistentSubscriptions.PersistentSubscriptions.PersistentSubscriptionsClient>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public class PersistentSubscriptionsClient : Grpc.Core.ClientBase<PersistentSubscriptions.PersistentSubscriptionsClient>
```

### Constructor `PersistentSubscriptionsClient(Grpc.Core.ChannelBase)`
Creates a new client for PersistentSubscriptions
#### Syntax
```csharp
public PersistentSubscriptionsClient(Grpc.Core.ChannelBase channel)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`channel` | `Grpc.Core.ChannelBase` | The channel to use to make remote calls.



### Constructor `PersistentSubscriptionsClient(Grpc.Core.CallInvoker)`
Creates a new client for PersistentSubscriptions that uses a custom <code>CallInvoker</code>.
#### Syntax
```csharp
public PersistentSubscriptionsClient(Grpc.Core.CallInvoker callInvoker)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`callInvoker` | `Grpc.Core.CallInvoker` | The callInvoker to use to make remote calls.



### Constructor `PersistentSubscriptionsClient()`
Protected parameterless constructor to allow creation of test doubles.
#### Syntax
```csharp
protected PersistentSubscriptionsClient()
```


### Constructor `PersistentSubscriptionsClient(ClientBaseConfiguration)`
Protected constructor to allow creation of configured clients.
#### Syntax
```csharp
protected PersistentSubscriptionsClient(ClientBaseConfiguration configuration)
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
`request` | `EventStore.Client.PersistentSubscriptions.CreateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.CreateResp` | 



### Method `Create(CreateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual CreateResp Create(CreateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.CreateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.CreateResp` | 



### Method `CreateAsync(CreateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<CreateResp> CreateAsync(CreateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.CreateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.PersistentSubscriptions.CreateResp>` | 



### Method `CreateAsync(CreateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<CreateResp> CreateAsync(CreateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.CreateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.PersistentSubscriptions.CreateResp>` | 



### Method `Update(UpdateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual UpdateResp Update(UpdateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.UpdateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.UpdateResp` | 



### Method `Update(UpdateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual UpdateResp Update(UpdateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.UpdateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.UpdateResp` | 



### Method `UpdateAsync(UpdateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<UpdateResp> UpdateAsync(UpdateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.UpdateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.PersistentSubscriptions.UpdateResp>` | 



### Method `UpdateAsync(UpdateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<UpdateResp> UpdateAsync(UpdateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.UpdateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.PersistentSubscriptions.UpdateResp>` | 



### Method `Delete(DeleteReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual DeleteResp Delete(DeleteReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.DeleteReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.DeleteResp` | 



### Method `Delete(DeleteReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual DeleteResp Delete(DeleteReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.DeleteReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.DeleteResp` | 



### Method `DeleteAsync(DeleteReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DeleteResp> DeleteAsync(DeleteReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.DeleteReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.PersistentSubscriptions.DeleteResp>` | 



### Method `DeleteAsync(DeleteReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DeleteResp> DeleteAsync(DeleteReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.PersistentSubscriptions.DeleteReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.PersistentSubscriptions.DeleteResp>` | 



### Method `Read(Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncDuplexStreamingCall<ReadReq, ReadResp> Read(Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
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
`Grpc.Core.AsyncDuplexStreamingCall<EventStore.Client.PersistentSubscriptions.ReadReq, EventStore.Client.PersistentSubscriptions.ReadResp>` | 



### Method `Read(Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncDuplexStreamingCall<ReadReq, ReadResp> Read(Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncDuplexStreamingCall<EventStore.Client.PersistentSubscriptions.ReadReq, EventStore.Client.PersistentSubscriptions.ReadResp>` | 



### Method `NewInstance(ClientBaseConfiguration)`
Creates a new instance of client from given <code>ClientBaseConfiguration</code>.
#### Syntax
```csharp
protected override PersistentSubscriptions.PersistentSubscriptionsClient NewInstance(ClientBaseConfiguration configuration)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`configuration` | `ClientBaseConfiguration` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.PersistentSubscriptions.PersistentSubscriptions.PersistentSubscriptionsClient` | 


