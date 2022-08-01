# Getting started

Get started by connecting your application to EventStoreDB. 

Complete the form below to generate the connection string and examples for different languages and SDKs.

## Connection details

This page can help you to generate the connection string for a single-node or cluster deployment of EventStoreDB. You can use one of the following methods:

- Use the [Event Store Cloud](https://eventstore.com/cloud) cluster ID.
- Use the address of any node of a self-hosted cluster or single-node deployment. You need to have access to the node for the discovery feature to work.
- Specify the deployment details manually.

<Connection></Connection>

## Connecting to EventStoreDB

For your application to start communicating with EventStoreDB, you need to instantiate the client, and configure it accordingly. Below, you will find instructions for supported SDKs.

::: tip Insecure Clusters
All our GRPC clients are secure by default, and must be configured to connect to an insecure server via [a connection string](#connection-string), or the client's configuration.
:::

### Required packages

Install the client SDK package to your project.

:::: code-group
::: code-group-item C#
```:no-line-numbers
$ dotnet add package EventStore.Client.Grpc.Streams --version 21.2
```
:::
::: code-group-item Go
```:no-line-numbers
go get github.com/EventStore/EventStore-Client-Go
```
:::
::: code-group-item Java
```:no-line-numbers
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
:::
::: code-group-item JavaScript
```:no-line-numbers
# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```
:::
::: code-group-item Rust
```:no-line-numbers
No additional configuration is needed having Rust installed. Go check https://rustup.rs.
```
:::
::: code-group-item TypeScript
```:no-line-numbers
# TypeScript Declarations are included in the package.

# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```
:::
::::

### Connection string

Each SDK has its own way to configure the client, but it's always possible to use the connection string. You can use [online configuration tool](https://configurator.eventstore.com) to generate the connection string for your EventStoreDB deployment. The connection string generated with this tool should work with each official SDK of EventStoreDB.

[comment]: <> (<ConnectionString></ConnectionString>)

### Creating a client

First thing first, we need a client.

@[code{createClient}](@grpc:quick-start/Program.cs;quickstart.go;quick_start/QuickStart.java;get-started.js;quickstart.rs;get-started.ts)

The client instance can be used as a singleton across the whole application. It doesn't need to open or close the connection.

### Creating an event

You can write anything to EventStoreDB as events. The client needs a byte array as the event payload. Normally, you'd use a serialized object and it's up to you to choose the serialization method.

::: tip Server-side projections
User-defined server-side projections require events to be serialized to JSON format.

We use JSON for serialization in the documentation examples.
:::

The code snippet below creates an event object instance, serializes it and puts it as payload to the `EventData` structure, which the client is able to write to the database.

@[code{createEvent}](@grpc:quick-start/Program.cs;quickstart.go;quick_start/QuickStart.java;get-started.js;quickstart.rs;get-started.ts)

### Appending events

Each event in the database has its own unique identifier (UUID). The database uses it to ensure idempotent writes, but it only works if you specify the stream revision when appending events to the stream.

In the snippet below, we append the event to the stream `some-stream`.

@[code{appendEvents}](@grpc:quick-start/Program.cs;quickstart.go;quick_start/QuickStart.java;get-started.js;quickstart.rs;get-started.ts)

Here we are appending events without checking if the stream exists or if the stream version matches the expected event version. See more advanced scenarios in [appending events documentation](./appending-events.md).

### Reading events

Finally, we can read events back from the `some-stream` stream.

@[code{readStream}](@grpc:quick-start/Program.cs;quickstart.go;quick_start/QuickStart.java;get-started.js;quickstart.rs;get-started.ts)

When you read events from the stream, you get a collection of `ResolvedEvent` structures. The event payload is returned as a byte array and needs to be deserialized. See more advanced scenarios in [reading events documentation](./reading-events.md).

