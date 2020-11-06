# Connecting to EventStoreDB

## Required packages

Install the client SDK package to your project.

<xode-group>
<xode-block title="C#">

```
$ dotnet add package EventStore.Client.Grpc.Streams --version 20.6.1
```
</xode-block>
<xode-block title="NodeJS" code="connectionString">

```
# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```
</xode-block>
</xode-group>

## Connection string

Each SDK has its own way to configure the client, but it's always possible to use the connection string. The connection string below is generated according to the configuration you specified above, and it should work with each official SDK of EventStoreDB.

You can either put the connection string in the input box below, or use the [connection details](./README.md) page to generate the connection string from your EventStoreDB deployment.

<ConnectionString></ConnectionString>

## Creating a client

First thing first, we need a client.

<xode-group>
<xode-block title="C#" code="connectionString">

<<< @/samples/grpc/dotnet/GrpcDocs/Producer.cs#createClient
</xode-block>
<xode-block title="NodeJS" code="connectionString">

```javascript
const s = "{connectionString}";
```
</xode-block>
</xode-group>

The client instance can be used as a singleton across the whole application. It doesn't need to open or close the connection.

## Creating an event

You can write anything to EventStoreDB as events. The client needs a byte array as the event payload. Normally, you'd use a serialized object and it's up to you to choose the serialization method.

::: tip Server-side projections
User-defined server-side projections require events to be serialized to JSON format.

We use JSON for serialization in the documentation examples.
:::

The code snippet below creates an event object instance, serializes it and puts it as payload to the `EventData` structure, which the client is able to write to the database.

<xode-group>
<xode-block title="C#">

<<< @/samples/grpc/dotnet/GrpcDocs/Producer.cs#createEvent
</xode-block>
<xode-block title="NodeJS">

```javascript
await writeEvents();
```
</xode-block>
</xode-group>

## Writing events

Each event in the database has its own unique identifier (UUID). The database uses it to ensure idempotent writes, but it only works if you specify the stream revision when appending events to the stream.

In the snippet below, we append the event to the stream `testStream`.

<xode-group>
<xode-block title="C#">

<<< @/samples/grpc/dotnet/GrpcDocs/Producer.cs#writingEvent
</xode-block>
<xode-block title="NodeJS">

```javascript
await writeEvents();
```
</xode-block>
</xode-group>

Here we used `StreamState.Any`, which allows us to write an event without checking if the stream exists or if the stream version matches the expected event version.

