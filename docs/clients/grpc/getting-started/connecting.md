# Connecting to EventStoreDB

## Required packages

Install the client SDK package to your project.

<xode-group>
<xode-block title="C#">

<!-- TODO: when https://github.com/EventStore/EventStore/issues/2707 is resolved and new version with the fix is released - remove the manual Grpc.Net.Client installation -->
```
$ dotnet add package EventStore.Client.Grpc.Streams --version 20.10

# Add the gRPC Client 2.32+ if you're connecting to an insecure cluster
$ dotnet add package Grpc.Net.Client --version 2.34.0
```
</xode-block>
<xode-block title="Java">

```
# Maven
<dependency>
  <groupId>com.eventstore</groupId>
  <artifactId>db-client-java</artifactId>
  <version>0.5</version>
</dependency>

# Gradle
implementation 'com.eventstore:db-client-java:0.5'

# SBT
libraryDependencies += "com.eventstore" % "db-client-java" % "0.6"
```
</xode-block>
<xode-block title="NodeJS">

```
# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```
</xode-block>
<xode-block title="Rust">

```
No additional configuration is needed having Rust installed. Go check https://rustup.rs.
```
</xode-block>
</xode-group>

::: warning Preview clients
The following SDKs are currently in preview and can get API changes:
- NodeJS
- Java
- Go
- Rust
:::

## Connection string

Each SDK has its own way to configure the client, but it's always possible to use the connection string. The connection string below is generated according to the configuration you specified above, and it should work with each official SDK of EventStoreDB.

You can either put the connection string in the input box below, or use the [connection details](./README.md) page to generate the connection string from your EventStoreDB deployment.

<ConnectionString></ConnectionString>

## Creating a client

First thing first, we need a client.

<xode-group>
<xode-block title="C#" code="connectionString">

<<< @/docs/clients/dotnet/generated/21.2.0/samples/quick-start/Program.cs#createClient
</xode-block>
<xode-block title="Java" code="connectionString">

<<< @/docs/clients/java/generated/1.0.0/samples/quick_start/QuickStart.java#createClient
</xode-block>
<xode-block title="NodeJS" code="connectionString">

<<< @/samples/grpc/nodejs/samples/getStarted.js#createClient
</xode-block>
<xode-block title="Rust" code="connectionString">

<<< @/docs/clients/rust/generated/1.0.0/samples/quickstart.rust#createClient
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
<<< @/docs/clients/dotnet/generated/21.2.0/samples/quick-start/Program.cs#createEvent
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/1.0.0/samples/quick_start/QuickStart.java#createEvent
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/getStarted.js#createEvent
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/quickstart.rust#createEvent
</xode-block>
</xode-group>

## Appending events

Each event in the database has its own unique identifier (UUID). The database uses it to ensure idempotent writes, but it only works if you specify the stream revision when appending events to the stream.

In the snippet below, we append the event to the stream `some-stream`.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/21.2.0/samples/quick-start/Program.cs#appendEvents
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/1.0.0/samples/quick_start/QuickStart.java#appendEvents
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/getStarted.js#appendEvents
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/quickstart.rust#appendEvents
</xode-block>
</xode-group>

Here we are appending events without checking if the stream exists or if the stream version matches the expected event version. See more advanced scenarios in [appending events documentation](../appending-events/README.md).

## Reading events

Finally, we can read events back from the `some-stream` stream.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/21.2.0/samples/quick-start/Program.cs#readStream
</xode-block>
<xode-block title="Java">

<<< @/docs/clients/java/generated/1.0.0/samples/quick_start/QuickStart.java#readStream
</xode-block>
<xode-block title="NodeJS">

<<< @/samples/grpc/nodejs/samples/getStarted.js#readStream
</xode-block>
<xode-block title="Rust">

<<< @/docs/clients/rust/generated/1.0.0/samples/quickstart.rust#readStream
</xode-block>
</xode-group>

When you read events from the stream, you get a collection of `ResolvedEvent` structures. The event payload is returned as a byte array and needs to be deserialized. See more advanced scenarios in [reading events documentation](../reading-events/README.md).
