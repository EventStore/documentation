# Reading from a stream

When using EventStoreDB it's possible to read events from a given stream.

## Reading forwards

The simplest way to read a stream forwards is to supply a stream name, direction and revision to start from. This can either be a *stream position* `Start` or a an *big int* (unsigned 64 bit integer):

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/reading-events/Program.cs#read-from-stream
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/reading-events/index.js#read-from-stream
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/0.7/samples/reading_events/ReadingEvents.java#read-from-stream
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/reading_events.rust#read-from-stream
</xode-block>
</xode-group>

This will return an enumerable that can be iterated on:

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/reading-events/Program.cs#iterate-stream
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/reading-events/index.js#iterate-stream
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/0.7/samples/reading_events/ReadingEvents.java#iterate-stream
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/reading_events.rust#iterate-stream
</xode-block>
</xode-group>
 
There are a number of additional arguments you can provide when reading a stream

### maxCount

Passing in the max count allows you to limit the number of events that returned. 

### resolveLinkTos

When using projections to create new events you can set whether the generated events are pointers to existing events. Setting this value to true will tell EventStoreDB to return the event as well as the event linking to it.

### configureOperationOptions

This argument is generic setting class for all operations that can be set on all operations executed against EventStoreDB.

### userCredentials
The credentials used to read the data can be supplied. to be used by the subscription as follows. This will override the default credentials set on the connection.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/reading-events/Program.cs#overriding-user-credentials
</xode-block>
<xode-block title="NodeJS"> 

<<< @/samples/grpc/nodejs/samples/reading-events/index.js#overriding-user-credentials
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/0.7/samples/reading_events/ReadingEvents.java#overriding-user-credentials
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/reading_events.rust#overriding-user-credentials
</xode-block>
</xode-group>

## Reading from a revision

As well as providing a `StreamPosition` you can also provide a specific stream revision in the form of a *big int* (unsigned 64 bit integer).

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/reading-events/Program.cs#read-from-stream-position
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/reading-events/index.js#read-from-stream-position
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/0.7/samples/reading_events/ReadingEvents.java#read-from-stream-position
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/reading_events.rust#read-from-position
</xode-block>
</xode-group>

## Reading backwards

As well as being able to read a stream forwards you can also go backwards. When reading backwards is the *stream position* will have to be set to the end if you want to read all the events:

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/reading-events/Program.cs#reading-backwards 
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/reading-events/index.js#reading-backwards 
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/0.7/samples/reading_events/ReadingEvents.java#reading-backwards
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/reading_events.rust#reading-backwards
</xode-block>
</xode-group>

:::tip
You can use reading backwards to find the last position in the stream. Just read backwards one event and get the position.
:::

## Checking for stream presence 
Reading a stream returns a `ReadStreamResult` this contains a property `ReadState`. This property can have the value `StreamNotFound` and `Ok`.

It is important to check the value of this field before attempting to iterate an empty stream as it will throw an exception. For example.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/reading-events/Program.cs#checking-for-stream-presence
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/reading-events/index.js#checking-for-stream-presence
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/0.7/samples/reading_events/ReadingEvents.java#checking-for-stream-presence
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/reading_events.rust#checking-for-stream-presence
</xode-block>
</xode-group>