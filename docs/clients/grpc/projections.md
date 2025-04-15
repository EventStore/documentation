---
order: 6
title: Projections
---

# Projection management

The various gRPC client APIs include dedicated clients that allow you to manage projections.

::: warning
Currently not all clients fully expose all operations.
:::

For a detailed explanation of projections, see the [server documentation](@server/features/projections/README.md).

You can find the full sample code from this documentation page in the respective [clients repositories](https://github.com/kurrent-io/?q=client).

## Required packages

Install the client SDK package to your project.

### NodeJS

Add `@kurrent/kurrentdb-client` to your project using Yarn, NPM, or pnpm.

TypeScript type declarations are included in the package.

::: tabs
@tab npm
```bash
npm install --save @kurrent/kurrentdb-client
```
@tab yarn
```bash
yarn add @kurrent/kurrentdb-client
```
@tab pnpm
```bash
pnpm add @kurrent/kurrentdb-client
```
:::

### Java

Add the `db-client-java` dependency to your project using Maven or Gradle.

::: tabs
@tab Maven
```xml
<dependency>
  <groupId>io.kurrent</groupId>
  <artifactId>db-client-java</artifactId>
  <version>1.0.0</version>
</dependency>
```

@tab Gradle
```
implementation 'io.kurrent:db-client-java:1.0.0'
```

For the most recent version of the KurrentDB client package, see [Maven Central](https://mvnrepository.com/artifact/io.kurrent/kurrentdb-client).
:::

### .NET

For .NET projects, install the `EventStore.Client.Grpc.ProjectionManagement` package from NuGet. It is not the same package as the regular client package.

```bash
dotnet add package EventStore.Client.Grpc.ProjectionManagement --version 23.*
```

### Other languages

Go, Rust and Python clients does not have a dedicated projection management client yet.

## Creating a client

Projection management operations are exposed through a dedicated client.

@[code{createClient}](@grpc:projection-management.js;projection-management.ts;quickstart.py;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Create a projection

Creates a projection that runs until the last event in the store, and then continues processing new events as they are appended to the store. The query parameter contains the JavaScript you want created as a projection.
Projections have explicit names, and you can enable or disable them via this name.

@[code{CreateContinuous}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

Trying to create projections with the same name will result in an error:

@[code{CreateContinuous_Conflict}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Restart the subsystem

It is possible to restart the entire projection subsystem using the projections management client API. The user must be in the `$ops` or `$admin` group to perform this operation.

@[code{RestartSubSystem}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Enable a projection

Enables an existing projection by name.
Once enabled, the projection will start to process events even after restarting the server or the projection subsystem.
You must have access to a projection to enable it, see the [ACL documentation](@server/security/user-authorization.md).

@[code{Enable}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

You can only enable an existing projection. When you try to enable a non-existing projection, you'll get an error:

@[code{EnableNotFound}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Disable a projection

Disables a projection, this will save the projection checkpoint.
Once disabled, the projection will not process events even after restarting the server or the projection subsystem.
You must have access to a projection to disable it, see the [ACL documentation](@server/security/user-authorization.md).

@[code{Disable}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

You can only disable an existing projection. When you try to disable a non-existing projection, you'll get an error:

@[code{DisableNotFound}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Delete a projection

Deletes an existing projection. You must disable the projection before deleting it, running projections cannot be deleted. Deleting a projection includes deleting the checkpoint and the emitted streams.

@[code{Delete}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

You can only delete an existing projection. When you try to delete a non-existing projection, you'll get an error:

@[code{DeleteNotFound}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java)

## Abort a projection

Aborts a projection, this will not save the projection's checkpoint.

@[code{Abort}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

You can only abort an existing projection. When you try to abort a non-existing projection, you'll get an error:

@[code{Abort_NotFound}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Reset a projection

Resets a projection, which causes deleting the projection checkpoint. This will force the projection to start afresh and re-emit events. Streams that are written to from the projection will also be soft-deleted.

@[code{Reset}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

Resetting a projection that does not exist will result in an error.

@[code{Reset_NotFound}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Update a projection

Updates a projection with a given name. The query parameter contains the new JavaScript. Updating system projections using this operation is not supported at the moment.

@[code{Update}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

You can only update an existing projection. When you try to update a non-existing projection, you'll get an error:

@[code{Update_NotFound}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## List all projections

Returns a list of all projections, user defined & system projections.
See the [projection details](#projection-details) section for an explanation of the returned values.

@[code{ListAll}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## List continuous projections

Returns a list of all continuous projections.
See the [projection details](#projection-details) section for an explanation of the returned values.

@[code{ListContinuous}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Get status

Gets the status of a named projection.
See the [projection details](#projection-details) section for an explanation of the returned values.

@[code{GetStatus}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Get state

Retrieves the state of a projection.

@[code{GetState}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Get result

Retrieves the result of the named projection and partition.

@[code{GetResult}](@grpc:projection-management.js;projection-management.ts;projection_management/ProjectionManagement.java;projection-management/Program.cs)

## Projection Details

[List all](#list-all-projections), [list continuous](#list-continuous-projections) and [get status](#get-status) all return the details and statistics of projections

| Field                                | Description                                                                                                                                                                                           |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Name`, `EffectiveName`              | The name of the projection                                                                                                                                                                            |
| `Status`                             | A human readable string of the current statuses of the projection (see below)                                                                                                                         |
| `StateReason`                        | A human readable string explaining the reason of the current projection state                                                                                                                         |
| `CheckpointStatus`                   | A human readable string explaining the current operation performed on the checkpoint : `requested`, `writing`                                                                                         |
| `Mode`                               | `Continuous`, `OneTime` , `Transient`                                                                                                                                                                 |
| `CoreProcessingTime`                 | The total time, in ms, the projection took to handle events since the last restart                                                                                                                    |
| `Progress`                           | The progress, in %, indicates how far this projection has processed event, in case of a restart this could be -1% or some number. It will be updated as soon as a new event is appended and processed |
| `WritesInProgress`                   | The number of write requests to emitted streams currently in progress, these writes can be batches of events                                                                                          |
| `ReadsInProgress`                    | The number of read requests currently in progress                                                                                                                                                     |
| `PartitionsCached`                   | The number of cached projection partitions                                                                                                                                                            |
| `Position`                           | The Position of the last processed event                                                                                                                                                              |
| `LastCheckpoint`                     | The Position of the last checkpoint of this projection                                                                                                                                                |
| `EventsProcessedAfterRestart`        | The number of events processed since the last restart of this projection                                                                                                                              |
| `BufferedEvents`                     | The number of events in the projection read buffer                                                                                                                                                    |
| `WritePendingEventsBeforeCheckpoint` | The number of events waiting to be appended to emitted streams before the pending checkpoint can be written                                                                                           |
| `WritePendingEventsAfterCheckpoint`  | The number of events to be appended to emitted streams since the last checkpoint                                                                                                                      |
| `Version`                            | This is used internally, the version is increased when the projection is edited or reset                                                                                                              |
| `Epoch`                              | This is used internally, the epoch is increased when the projection is reset                                                                                                                          |

The `Status` string is a combination of the following values.
The first 3 are the most common one, as the other one are transient values while the projection is initialised or stopped

| Value              | Description                                                                                                             |
|--------------------|-------------------------------------------------------------------------------------------------------------------------|
| Running            | The projection is running and processing events                                                                         |
| Stopped            | The projection is stopped and is no longer processing new events                                                        |
| Faulted            | An error occurred in the projection, `StateReason` will give the fault details, the projection is not processing events |
| Initial            | This is the initial state, before the projection is fully initialised                                                   |
| Suspended          | The projection is suspended and will not process events, this happens while stopping the projection                     |
| LoadStateRequested | The state of the projection is being retrieved, this happens while the projection is starting                           |
| StateLoaded        | The state of the projection is loaded, this happens while the projection is starting                                    |
| Subscribed         | The projection has successfully subscribed to its readers, this happens while the projection is starting                |
| FaultedStopping    | This happens before the projection is stopped due to an error in the projection                                         |
| Stopping           | The projection is being stopped                                                                                         |
| CompletingPhase    | This happens while the projection is stopping                                                                           |
| PhaseCompleted     | This happens while the projection is stopping                                                                           |
