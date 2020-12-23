# Writing Events

:::tip
Check [connecting to EventStoreDB instructions](../getting-started/connecting.md#required-packages) to learn how to configure and use the client SDK.
:::

The simplest way to write an event to EventStoreDB is to create an `EventData` object and call `AppendToStream` method.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/writing-events/Program.cs#append-to-stream
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/appending-events/index.js#append-to-stream
</xode-block>
</xode-group>

As you can see `AppendToStream` method allows takes a collection of `EventData`, which makes possible saving more than one event in a single batch.
 
As well as the example above there is also a number of other options for dealing with different scenarios. 

::: tip
If you are new to event sourcing its probably wise to pay special attention to handling concurrency that is detailed below.
:::

## Working with EventData

When appending events to EventStoreDB they must first all be wrapped in an `EventData` object. This allow you to specify the content of the event, the type of event and whether its in Json format. In it's simplest form you need to the three following arguments.

### eventId

This takes the format of a `Uuid` and is used to uniquely identify the event you are trying to append. If two events with the same `Uuid` are appended to the same stream in quick succession EventStoreDB will only append one copy of the event to the stream. 

For example:

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/writing-events/Program.cs#append-duplicate-event
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/appending-events/index.js#append-duplicate-event
</xode-block>
</xode-group>

will result in only a single event being written

![Duplicate Event](/docs/clients/grpc/appending-events/images/duplicate-event.png)

For most scenarios you can just provide `Uuid.NewUuid()` although there are methods for generating a `Uuid` from other types if you need to change how this `Uuid` is generated

### type

An event type should be supplied for each event. This is a unique string used to identify the type of event you are saving. 

It is common to see the explicit event code type name used as the type as it makes serialising and de-serialising of the event easy. However we recommend against this as it couples the storage to the type and will make it more difficult if you need to version the event at a later date.

### data

A byte encoded representation of your event. It is recommended that you store your events as JSON objects as this will allow you to make use of all of EventStoreDB's functionality such as projections. Ultimately though, you can save it using whatever format you like.

### metadata

It is common to need to store additional information along side your event that is part of the event it's self. This can be correlation Id's, timestamps, access information etc. EventStoreDB allows you to store a separate byte array containing this information to keep it separate.

### isJson

Simple boolean field to tell EventStoreDB if the event is stored as json, true by default.

## Handling concurrency

When appending events to a stream you can supply a *stream state* or *stream revision*. Your client can use this to tell EventStoreDB what state or version you expect the stream to be in when you append. If the stream isn't in that state then an exception will be thrown. 

For example if we try and write the same record twice expecting both times that the stream doesn't exist we will get an exception on the second:

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/writing-events/Program.cs#append-with-no-stream
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/appending-events/index.js#append-with-no-stream
</xode-block>
</xode-group>

There are three available stream states: 
- Any
- NoStream
- StreamExists

This check can be used to implement optimistic concurrency. When you retrieve a stream from EventStoreDB, you take note of the current version number, then when you save it back you can determine if somebody else has modified the record in the meantime.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/v20.6.1/samples/writing-events/Program.cs#append-with-concurrency-check
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/appending-events/index.js#append-with-concurrency-check
</xode-block>
</xode-group>

## Options
TODO

## User credentials
The credentials used to append the data can be supplied. Please see [here](/authentication/authenticating-with-username-password.html) for more information.
