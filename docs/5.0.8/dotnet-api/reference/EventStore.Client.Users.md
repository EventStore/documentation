---
title: EventStore.Client.Users
---

# Namespace: EventStore.Client.Users
## Class `UsermanagementReflection`
Holder for reflection information generated from usermanagement.proto
### Inheritance
↳ `object`
### Syntax
```csharp
public static class UsermanagementReflection
```

### Property `Descriptor`
File descriptor for usermanagement.proto
#### Syntax
```csharp
public static Google.Protobuf.Reflection.FileDescriptor Descriptor { get; }
```


## Class `CreateReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.CreateReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.CreateReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.CreateReq` | 



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
`other` | `EventStore.Client.Users.CreateReq` | 

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
`other` | `EventStore.Client.Users.CreateReq` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.CreateReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.CreateReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.CreateReq.Types.Options` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
```


### Field `PasswordFieldNumber`
Field number for the &quot;password&quot; field.
#### Syntax
```csharp
public static int PasswordFieldNumber = 2
```


### Property `Password`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Password { get; set; }
```


### Field `FullNameFieldNumber`
Field number for the &quot;full_name&quot; field.
#### Syntax
```csharp
public static int FullNameFieldNumber = 3
```


### Property `FullName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string FullName { get; set; }
```


### Field `GroupsFieldNumber`
Field number for the &quot;groups&quot; field.
#### Syntax
```csharp
public static int GroupsFieldNumber = 4
```


### Property `Groups`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.Collections.RepeatedField<string> Groups { get; }
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
`other` | `EventStore.Client.Users.CreateReq.Types.Options` | 

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
`other` | `EventStore.Client.Users.CreateReq.Types.Options` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.CreateResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.CreateResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public CreateResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.CreateResp` | 



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
`other` | `EventStore.Client.Users.CreateResp` | 

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
`other` | `EventStore.Client.Users.CreateResp` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.UpdateReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.UpdateReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.UpdateReq` | 



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
`other` | `EventStore.Client.Users.UpdateReq` | 

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
`other` | `EventStore.Client.Users.UpdateReq` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.UpdateReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.UpdateReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.UpdateReq.Types.Options` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
```


### Field `PasswordFieldNumber`
Field number for the &quot;password&quot; field.
#### Syntax
```csharp
public static int PasswordFieldNumber = 2
```


### Property `Password`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string Password { get; set; }
```


### Field `FullNameFieldNumber`
Field number for the &quot;full_name&quot; field.
#### Syntax
```csharp
public static int FullNameFieldNumber = 3
```


### Property `FullName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string FullName { get; set; }
```


### Field `GroupsFieldNumber`
Field number for the &quot;groups&quot; field.
#### Syntax
```csharp
public static int GroupsFieldNumber = 4
```


### Property `Groups`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.Collections.RepeatedField<string> Groups { get; }
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
`other` | `EventStore.Client.Users.UpdateReq.Types.Options` | 

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
`other` | `EventStore.Client.Users.UpdateReq.Types.Options` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.UpdateResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.UpdateResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UpdateResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.UpdateResp` | 



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
`other` | `EventStore.Client.Users.UpdateResp` | 

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
`other` | `EventStore.Client.Users.UpdateResp` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DeleteReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.DeleteReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DeleteReq` | 



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
`other` | `EventStore.Client.Users.DeleteReq` | 

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
`other` | `EventStore.Client.Users.DeleteReq` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DeleteReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.DeleteReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DeleteReq.Types.Options` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
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
`other` | `EventStore.Client.Users.DeleteReq.Types.Options` | 

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
`other` | `EventStore.Client.Users.DeleteReq.Types.Options` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DeleteResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.DeleteResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DeleteResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DeleteResp` | 



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
`other` | `EventStore.Client.Users.DeleteResp` | 

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
`other` | `EventStore.Client.Users.DeleteResp` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.EnableReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.EnableReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.EnableReq` | 



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
`other` | `EventStore.Client.Users.EnableReq` | 

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
`other` | `EventStore.Client.Users.EnableReq` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.EnableReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.EnableReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.EnableReq.Types.Options` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
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
`other` | `EventStore.Client.Users.EnableReq.Types.Options` | 

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
`other` | `EventStore.Client.Users.EnableReq.Types.Options` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.EnableResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.EnableResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public EnableResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.EnableResp` | 



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
`other` | `EventStore.Client.Users.EnableResp` | 

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
`other` | `EventStore.Client.Users.EnableResp` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DisableReq>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.DisableReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DisableReq` | 



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
`other` | `EventStore.Client.Users.DisableReq` | 

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
`other` | `EventStore.Client.Users.DisableReq` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DisableReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.DisableReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DisableReq.Types.Options` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
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
`other` | `EventStore.Client.Users.DisableReq.Types.Options` | 

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
`other` | `EventStore.Client.Users.DisableReq.Types.Options` | 



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
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DisableResp>`<br>&nbsp;&nbsp;↳ `System.Object`
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
`other` | `EventStore.Client.Users.DisableResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DisableResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DisableResp` | 



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
`other` | `EventStore.Client.Users.DisableResp` | 

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
`other` | `EventStore.Client.Users.DisableResp` | 



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



## Class `DetailsReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DetailsReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class DetailsReq : Google.Protobuf.IMessage<DetailsReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DetailsReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `DetailsReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsReq()
```


### Constructor `DetailsReq(DetailsReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsReq(DetailsReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DetailsReq` | 



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
public DetailsReq.Types.Options Options { get; set; }
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



### Method `Equals(DetailsReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DetailsReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsReq` | 

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



### Method `MergeFrom(DetailsReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DetailsReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsReq` | 



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



## Class `DetailsReq.Types`
Container for nested types declared in the DetailsReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `DetailsReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DetailsReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<DetailsReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DetailsReq.Types.Options> Parser { get; }
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


### Constructor `Options(DetailsReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(DetailsReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DetailsReq.Types.Options` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
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



### Method `Equals(DetailsReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DetailsReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsReq.Types.Options` | 

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



### Method `MergeFrom(DetailsReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DetailsReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsReq.Types.Options` | 



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



## Class `DetailsResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DetailsResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class DetailsResp : Google.Protobuf.IMessage<DetailsResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DetailsResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `DetailsResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsResp()
```


### Constructor `DetailsResp(DetailsResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsResp(DetailsResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DetailsResp` | 



### Field `UserDetailsFieldNumber`
Field number for the &quot;user_details&quot; field.
#### Syntax
```csharp
public static int UserDetailsFieldNumber = 1
```


### Property `UserDetails`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsResp.Types.UserDetails UserDetails { get; set; }
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



### Method `Equals(DetailsResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DetailsResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp` | 

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



### Method `MergeFrom(DetailsResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DetailsResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp` | 



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



## Class `DetailsResp.Types`
Container for nested types declared in the DetailsResp message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `DetailsResp.Types.UserDetails`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DetailsResp.Types.UserDetails>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class UserDetails : Google.Protobuf.IMessage<DetailsResp.Types.UserDetails>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DetailsResp.Types.UserDetails> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `UserDetails()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UserDetails()
```


### Constructor `UserDetails(DetailsResp.Types.UserDetails)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public UserDetails(DetailsResp.Types.UserDetails other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp.Types.UserDetails` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsResp.Types.UserDetails Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DetailsResp.Types.UserDetails` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
```


### Field `FullNameFieldNumber`
Field number for the &quot;full_name&quot; field.
#### Syntax
```csharp
public static int FullNameFieldNumber = 2
```


### Property `FullName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string FullName { get; set; }
```


### Field `GroupsFieldNumber`
Field number for the &quot;groups&quot; field.
#### Syntax
```csharp
public static int GroupsFieldNumber = 3
```


### Property `Groups`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Google.Protobuf.Collections.RepeatedField<string> Groups { get; }
```


### Field `LastUpdatedFieldNumber`
Field number for the &quot;last_updated&quot; field.
#### Syntax
```csharp
public static int LastUpdatedFieldNumber = 4
```


### Property `LastUpdated`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsResp.Types.UserDetails.Types.DateTime LastUpdated { get; set; }
```


### Field `DisabledFieldNumber`
Field number for the &quot;disabled&quot; field.
#### Syntax
```csharp
public static int DisabledFieldNumber = 5
```


### Property `Disabled`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Disabled { get; set; }
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



### Method `Equals(DetailsResp.Types.UserDetails)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DetailsResp.Types.UserDetails other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp.Types.UserDetails` | 

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



### Method `MergeFrom(DetailsResp.Types.UserDetails)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DetailsResp.Types.UserDetails other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp.Types.UserDetails` | 



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



## Class `DetailsResp.Types.UserDetails.Types`
Container for nested types declared in the UserDetails message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `DetailsResp.Types.UserDetails.Types.DateTime`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.DetailsResp.Types.UserDetails.Types.DateTime>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class DateTime : Google.Protobuf.IMessage<DetailsResp.Types.UserDetails.Types.DateTime>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<DetailsResp.Types.UserDetails.Types.DateTime> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `DateTime()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DateTime()
```


### Constructor `DateTime(DetailsResp.Types.UserDetails.Types.DateTime)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DateTime(DetailsResp.Types.UserDetails.Types.DateTime other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp.Types.UserDetails.Types.DateTime` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public DetailsResp.Types.UserDetails.Types.DateTime Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DetailsResp.Types.UserDetails.Types.DateTime` | 



### Field `TicksSinceEpochFieldNumber`
Field number for the &quot;ticks_since_epoch&quot; field.
#### Syntax
```csharp
public static int TicksSinceEpochFieldNumber = 1
```


### Property `TicksSinceEpoch`

#### Syntax
```csharp
[DebuggerNonUserCode]
public long TicksSinceEpoch { get; set; }
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



### Method `Equals(DetailsResp.Types.UserDetails.Types.DateTime)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(DetailsResp.Types.UserDetails.Types.DateTime other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp.Types.UserDetails.Types.DateTime` | 

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



### Method `MergeFrom(DetailsResp.Types.UserDetails.Types.DateTime)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(DetailsResp.Types.UserDetails.Types.DateTime other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.DetailsResp.Types.UserDetails.Types.DateTime` | 



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



## Class `ChangePasswordReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.ChangePasswordReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ChangePasswordReq : Google.Protobuf.IMessage<ChangePasswordReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ChangePasswordReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ChangePasswordReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ChangePasswordReq()
```


### Constructor `ChangePasswordReq(ChangePasswordReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ChangePasswordReq(ChangePasswordReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ChangePasswordReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ChangePasswordReq` | 



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
public ChangePasswordReq.Types.Options Options { get; set; }
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



### Method `Equals(ChangePasswordReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ChangePasswordReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordReq` | 

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



### Method `MergeFrom(ChangePasswordReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ChangePasswordReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordReq` | 



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



## Class `ChangePasswordReq.Types`
Container for nested types declared in the ChangePasswordReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `ChangePasswordReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.ChangePasswordReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<ChangePasswordReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ChangePasswordReq.Types.Options> Parser { get; }
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


### Constructor `Options(ChangePasswordReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(ChangePasswordReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ChangePasswordReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ChangePasswordReq.Types.Options` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
```


### Field `CurrentPasswordFieldNumber`
Field number for the &quot;current_password&quot; field.
#### Syntax
```csharp
public static int CurrentPasswordFieldNumber = 2
```


### Property `CurrentPassword`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string CurrentPassword { get; set; }
```


### Field `NewPasswordFieldNumber`
Field number for the &quot;new_password&quot; field.
#### Syntax
```csharp
public static int NewPasswordFieldNumber = 3
```


### Property `NewPassword`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string NewPassword { get; set; }
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



### Method `Equals(ChangePasswordReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ChangePasswordReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordReq.Types.Options` | 

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



### Method `MergeFrom(ChangePasswordReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ChangePasswordReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordReq.Types.Options` | 



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



## Class `ChangePasswordResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.ChangePasswordResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ChangePasswordResp : Google.Protobuf.IMessage<ChangePasswordResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ChangePasswordResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ChangePasswordResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ChangePasswordResp()
```


### Constructor `ChangePasswordResp(ChangePasswordResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ChangePasswordResp(ChangePasswordResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ChangePasswordResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ChangePasswordResp` | 



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



### Method `Equals(ChangePasswordResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ChangePasswordResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordResp` | 

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



### Method `MergeFrom(ChangePasswordResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ChangePasswordResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ChangePasswordResp` | 



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



## Class `ResetPasswordReq`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.ResetPasswordReq>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ResetPasswordReq : Google.Protobuf.IMessage<ResetPasswordReq>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResetPasswordReq> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ResetPasswordReq()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetPasswordReq()
```


### Constructor `ResetPasswordReq(ResetPasswordReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetPasswordReq(ResetPasswordReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordReq` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetPasswordReq Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ResetPasswordReq` | 



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
public ResetPasswordReq.Types.Options Options { get; set; }
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



### Method `Equals(ResetPasswordReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResetPasswordReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordReq` | 

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



### Method `MergeFrom(ResetPasswordReq)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResetPasswordReq other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordReq` | 



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



## Class `ResetPasswordReq.Types`
Container for nested types declared in the ResetPasswordReq message type.
### Inheritance
↳ `object`

### Inherited members
-  `object.GetType()`
### Syntax
```csharp
[DebuggerNonUserCode]
public static class Types
```


## Class `ResetPasswordReq.Types.Options`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.ResetPasswordReq.Types.Options>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class Options : Google.Protobuf.IMessage<ResetPasswordReq.Types.Options>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResetPasswordReq.Types.Options> Parser { get; }
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


### Constructor `Options(ResetPasswordReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public Options(ResetPasswordReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordReq.Types.Options` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetPasswordReq.Types.Options Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ResetPasswordReq.Types.Options` | 



### Field `LoginNameFieldNumber`
Field number for the &quot;login_name&quot; field.
#### Syntax
```csharp
public static int LoginNameFieldNumber = 1
```


### Property `LoginName`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string LoginName { get; set; }
```


### Field `NewPasswordFieldNumber`
Field number for the &quot;new_password&quot; field.
#### Syntax
```csharp
public static int NewPasswordFieldNumber = 2
```


### Property `NewPassword`

#### Syntax
```csharp
[DebuggerNonUserCode]
public string NewPassword { get; set; }
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



### Method `Equals(ResetPasswordReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResetPasswordReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordReq.Types.Options` | 

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



### Method `MergeFrom(ResetPasswordReq.Types.Options)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResetPasswordReq.Types.Options other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordReq.Types.Options` | 



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



## Class `ResetPasswordResp`

### Inheritance
↳ `Google.Protobuf.IMessage<EventStore.Client.Users.ResetPasswordResp>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public sealed class ResetPasswordResp : Google.Protobuf.IMessage<ResetPasswordResp>
```

### Property `Parser`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.MessageParser<ResetPasswordResp> Parser { get; }
```


### Property `Descriptor`

#### Syntax
```csharp
[DebuggerNonUserCode]
public static Google.Protobuf.Reflection.MessageDescriptor Descriptor { get; }
```


### Constructor `ResetPasswordResp()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetPasswordResp()
```


### Constructor `ResetPasswordResp(ResetPasswordResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetPasswordResp(ResetPasswordResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordResp` | 



### Method `Clone()`

#### Syntax
```csharp
[DebuggerNonUserCode]
public ResetPasswordResp Clone()
```
#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ResetPasswordResp` | 



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



### Method `Equals(ResetPasswordResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public bool Equals(ResetPasswordResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordResp` | 

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



### Method `MergeFrom(ResetPasswordResp)`

#### Syntax
```csharp
[DebuggerNonUserCode]
public void MergeFrom(ResetPasswordResp other)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`other` | `EventStore.Client.Users.ResetPasswordResp` | 



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



## Class `Users`

### Inheritance
↳ `object`
### Syntax
```csharp
public static class Users
```

### Property `Descriptor`
Service descriptor
#### Syntax
```csharp
public static Google.Protobuf.Reflection.ServiceDescriptor Descriptor { get; }
```


## Class `Users.UsersClient`
Client for Users
### Inheritance
↳ `Grpc.Core.ClientBase<EventStore.Client.Users.Users.UsersClient>`<br>&nbsp;&nbsp;↳ `System.Object`
### Syntax
```csharp
public class UsersClient : Grpc.Core.ClientBase<Users.UsersClient>
```

### Constructor `UsersClient(Grpc.Core.ChannelBase)`
Creates a new client for Users
#### Syntax
```csharp
public UsersClient(Grpc.Core.ChannelBase channel)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`channel` | `Grpc.Core.ChannelBase` | The channel to use to make remote calls.



### Constructor `UsersClient(Grpc.Core.CallInvoker)`
Creates a new client for Users that uses a custom <code>CallInvoker</code>.
#### Syntax
```csharp
public UsersClient(Grpc.Core.CallInvoker callInvoker)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`callInvoker` | `Grpc.Core.CallInvoker` | The callInvoker to use to make remote calls.



### Constructor `UsersClient()`
Protected parameterless constructor to allow creation of test doubles.
#### Syntax
```csharp
protected UsersClient()
```


### Constructor `UsersClient(ClientBaseConfiguration)`
Protected constructor to allow creation of configured clients.
#### Syntax
```csharp
protected UsersClient(ClientBaseConfiguration configuration)
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
`request` | `EventStore.Client.Users.CreateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.CreateResp` | 



### Method `Create(CreateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual CreateResp Create(CreateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.CreateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.CreateResp` | 



### Method `CreateAsync(CreateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<CreateResp> CreateAsync(CreateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.CreateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.CreateResp>` | 



### Method `CreateAsync(CreateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<CreateResp> CreateAsync(CreateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.CreateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.CreateResp>` | 



### Method `Update(UpdateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual UpdateResp Update(UpdateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.UpdateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.UpdateResp` | 



### Method `Update(UpdateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual UpdateResp Update(UpdateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.UpdateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.UpdateResp` | 



### Method `UpdateAsync(UpdateReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<UpdateResp> UpdateAsync(UpdateReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.UpdateReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.UpdateResp>` | 



### Method `UpdateAsync(UpdateReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<UpdateResp> UpdateAsync(UpdateReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.UpdateReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.UpdateResp>` | 



### Method `Delete(DeleteReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual DeleteResp Delete(DeleteReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DeleteReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DeleteResp` | 



### Method `Delete(DeleteReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual DeleteResp Delete(DeleteReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DeleteReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DeleteResp` | 



### Method `DeleteAsync(DeleteReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DeleteResp> DeleteAsync(DeleteReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DeleteReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.DeleteResp>` | 



### Method `DeleteAsync(DeleteReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DeleteResp> DeleteAsync(DeleteReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DeleteReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.DeleteResp>` | 



### Method `Disable(DisableReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual DisableResp Disable(DisableReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DisableReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DisableResp` | 



### Method `Disable(DisableReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual DisableResp Disable(DisableReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DisableReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.DisableResp` | 



### Method `DisableAsync(DisableReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DisableResp> DisableAsync(DisableReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DisableReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.DisableResp>` | 



### Method `DisableAsync(DisableReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<DisableResp> DisableAsync(DisableReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DisableReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.DisableResp>` | 



### Method `Enable(EnableReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual EnableResp Enable(EnableReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.EnableReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.EnableResp` | 



### Method `Enable(EnableReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual EnableResp Enable(EnableReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.EnableReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.EnableResp` | 



### Method `EnableAsync(EnableReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<EnableResp> EnableAsync(EnableReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.EnableReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.EnableResp>` | 



### Method `EnableAsync(EnableReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<EnableResp> EnableAsync(EnableReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.EnableReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.EnableResp>` | 



### Method `Details(DetailsReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncServerStreamingCall<DetailsResp> Details(DetailsReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DetailsReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncServerStreamingCall<EventStore.Client.Users.DetailsResp>` | 



### Method `Details(DetailsReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncServerStreamingCall<DetailsResp> Details(DetailsReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.DetailsReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncServerStreamingCall<EventStore.Client.Users.DetailsResp>` | 



### Method `ChangePassword(ChangePasswordReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual ChangePasswordResp ChangePassword(ChangePasswordReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.ChangePasswordReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ChangePasswordResp` | 



### Method `ChangePassword(ChangePasswordReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual ChangePasswordResp ChangePassword(ChangePasswordReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.ChangePasswordReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ChangePasswordResp` | 



### Method `ChangePasswordAsync(ChangePasswordReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ChangePasswordResp> ChangePasswordAsync(ChangePasswordReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.ChangePasswordReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.ChangePasswordResp>` | 



### Method `ChangePasswordAsync(ChangePasswordReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ChangePasswordResp> ChangePasswordAsync(ChangePasswordReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.ChangePasswordReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.ChangePasswordResp>` | 



### Method `ResetPassword(ResetPasswordReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual ResetPasswordResp ResetPassword(ResetPasswordReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.ResetPasswordReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ResetPasswordResp` | 



### Method `ResetPassword(ResetPasswordReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual ResetPasswordResp ResetPassword(ResetPasswordReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.ResetPasswordReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.ResetPasswordResp` | 



### Method `ResetPasswordAsync(ResetPasswordReq, Grpc.Core.Metadata, Nullable<DateTime>, CancellationToken)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ResetPasswordResp> ResetPasswordAsync(ResetPasswordReq request, Grpc.Core.Metadata headers = null, DateTime? deadline = default(DateTime? ), CancellationToken cancellationToken = default(CancellationToken))
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.ResetPasswordReq` | 
`headers` | `Grpc.Core.Metadata` | 
`deadline` | `System.DateTime?` | 
`cancellationToken` | `System.Threading.CancellationToken` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.ResetPasswordResp>` | 



### Method `ResetPasswordAsync(ResetPasswordReq, Grpc.Core.CallOptions)`

#### Syntax
```csharp
public virtual Grpc.Core.AsyncUnaryCall<ResetPasswordResp> ResetPasswordAsync(ResetPasswordReq request, Grpc.Core.CallOptions options)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`request` | `EventStore.Client.Users.ResetPasswordReq` | 
`options` | `Grpc.Core.CallOptions` | 

#### Returns
Type | Description
--- | ---
`Grpc.Core.AsyncUnaryCall<EventStore.Client.Users.ResetPasswordResp>` | 



### Method `NewInstance(ClientBaseConfiguration)`
Creates a new instance of client from given <code>ClientBaseConfiguration</code>.
#### Syntax
```csharp
protected override Users.UsersClient NewInstance(ClientBaseConfiguration configuration)
```
#### Parameters
Name | Type | Description
--- | --- | ---
`configuration` | `ClientBaseConfiguration` | 

#### Returns
Type | Description
--- | ---
`EventStore.Client.Users.Users.UsersClient` | 


