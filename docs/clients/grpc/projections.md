# Projection management

The various gRPC client APIs include dedicated clients that allow you to manage projections.

::: warning
Currently not all clients fully expose all operations.
:::

For a detailed explanation of projections, see the [server documentation](@server/projections.md).

You can find the full sample code from this documentation page in the respective [clients repositories](https://github.com/eventStore/?q=client).

## Required packages

Install the client SDK package to your project.

:::: code-group
::: code-group-item C#
```bash
dotnet add package EventStore.Client.Grpc.ProjectionManagement --version 21.*
```
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```
# Maven
<dependency>
  <groupId>com.eventstore</groupId>
  <artifactId>db-client-java</artifactId>
  <version>1.0.0</version>
</dependency>

# Gradle
implementation 'com.eventstore:db-client-java:1.0.0'

# SBT
libraryDependencies += "com.eventstore" % "db-client-java" % "1.0.0"
```
:::
::: code-group-item JavaScript
```
# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```
:::
::: code-group-item Rust
```
No additional configuration is needed having Rust installed. Go check https://rustup.rs.
```
:::
::: code-group-item TypeScript
```
# TypeScript Declarations are included in the package.

# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```
:::
::::

## Creating a client

Projection management operations are exposed through a dedicated client.

<xode-group>
<xode-block title="C#" code="connectionString">

@[code{createClient}](@grpc/projection-management/Program.cs)

</xode-block>
<xode-block title="Go" code="connectionString">

```
// This is currently not available in the Go client
```
</xode-block>
<xode-block title="Java" code="connectionString">

```
Sample available soon
```

</xode-block>
<xode-block title="JavaScript" code="connectionString">

@[code{createClient}](@grpc/projection-management.js)

</xode-block>
<xode-block title="Rust" code="connectionString">

```
Sample available soon
```

</xode-block>
<xode-block title="TypeScript" code="connectionString">

@[code{createClient}](@grpc/projection-management.ts)

</xode-block>
</xode-group>

## Create a projection

Creates a projection that runs until the last event in the store, and then continues processing new events as they are appended to the store. The query parameter contains the JavaScript you want created as a projection.
Projections have explicit names, and you can enable or disable them via this name.

:::: code-group
::: code-group-item C#
@[code{CreateContinuous}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```
Sample available soon
```
:::
::: code-group-item JavaScript
@[code{CreateContinuous}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{CreateContinuous}](@grpc/projection-management.ts)
:::
::::

Trying to create projections with the same name will result in an error:

:::: code-group
::: code-group-item C#
@[code{CreateContinuous_Conflict}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```
Sample available soon
```
:::
::: code-group-item JavaScript
@[code{CreateContinuous_Conflict}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{CreateContinuous_Conflict}](@grpc/projection-management.ts)
:::
::::

## Restart the subsystem
Restarts the entire projection subsystem. The user must be in the `$ops` or `$admin` group to perform this operation

:::: code-group
::: code-group-item C#
@[code{RestartSubSystem}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client 
```
:::
::: code-group-item JavaScript
@[code{RestartSubSystem}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```
Sample available soon
```
:::
::: code-group-item TypeScript
@[code{RestartSubSystem}](@grpc/projection-management.ts)
:::
::::

## Enable a projection

Enables an existing projection by name.
Once enabled, the projection will start to process events even after restarting the server or the projection subsystem.
You must have access to a projection to enable it, see the [ACL documentation](@server/security.md#access-control-lists)

:::: code-group
::: code-group-item C#
@[code{Enable}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Enable}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Enable}](@grpc/projection-management.ts)
:::
::::

You can only enable an existing projection. When you try to enable a non-existing projection, you'll get an error:

:::: code-group
::: code-group-item C#
@[code{EnableNotFound}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{EnableNotFound}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{EnableNotFound}](@grpc/projection-management.ts)
:::
::::

## Disable a projection

Disables a projection, this will save the projection checkpoint.
Once disabled, the projection will not process events even after restarting the server or the projection subsystem.
You must have access to a projection to disable it, see the [ACL documentation](@server/security.md#access-control-lists)

:::warning
The .net clients up to version 21.2 had an incorrect behavior: they _will not_ save the checkpoint  
:::

:::: code-group
::: code-group-item C#
@[code{Disable}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Disable}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Disable}](@grpc/projection-management.ts)
:::
::::

You can only disable an existing projection. When you try to disable a non-existing projection, you'll get an error:

:::: code-group
::: code-group-item C#
@[code{DisableNotFound}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{DisableNotFound}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{DisableNotFound}](@grpc/projection-management.ts)
:::
::::

## Delete a projection

Deletes a projection

:::: code-group
::: code-group-item C#
```csharp
// This is currently not available in the .net client
```
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Delete}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Delete}](@grpc/projection-management.ts)
:::
::::

You can only delete an existing projection. When you try to delete a non-existing projection, you'll get an error:

:::: code-group
::: code-group-item C#
```csharp
// This is currently not available in the .net client
```
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{DeleteNotFound}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{DeleteNotFound}](@grpc/projection-management.ts)
:::
::::

## Abort a projection

Aborts a projection, this will not save the projection's checkpoint.

:::warning
The .net clients up to version 21.2 had an incorrect behavior: they _will_ save the checkpoint.
:::

:::: code-group
::: code-group-item C#
@[code{Abort}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Abort}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Abort}](@grpc/projection-management.ts)
:::
::::

You can only abort an existing projection. When you try to abort a non-existing projection, you'll get an error:

:::: code-group
::: code-group-item C#
@[code{Abort_NotFound}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Abort_NotFound}](@grpc/projection-management.js)
:::
::: code-group-item Rust

```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Abort_NotFound}](@grpc/projection-management.ts)
:::
::::

## Reset a projection
Resets a projection. This will re-emit events. Streams that are written to from the projection will also be soft deleted.

:::: code-group
::: code-group-item C#
@[code{Reset}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Reset}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Reset}](@grpc/projection-management.ts)
:::
::::

Resetting a projection that does not exist will result in an error.

:::: code-group
::: code-group-item C#
@[code{Reset_NotFound}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Reset_NotFound}](@grpc/projection-management.js)
:::
::: code-group-item Rust

```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Reset_NotFound}](@grpc/projection-management.ts)
:::
::::

## Update a projection

Updates a projection. The name parameter is the name of the projection to be updated. The query parameter contains the new JavaScript.

:::: code-group
::: code-group-item C#
@[code{Update}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Update}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Update}](@grpc/projection-management.ts)
:::
::::

You can only update an existing projection. When you try to update a non-existing projection, you'll get an error:

:::: code-group
::: code-group-item C#
@[code{Update_NotFound}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{Update_NotFound}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{Update_NotFound}](@grpc/projection-management.ts)
:::
::::

## List all projections

Returns a list of all projections, user defined & system projections.
See the [projection details](#projection-details) section for an explanation of the returned values

:::: code-group
::: code-group-item C#
@[code{ListAll}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{ListAll}](@grpc/projection-management.ts)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{ListAll}](@grpc/projection-management.ts)
:::
::::

## List continuous projections

Returns a list of all continuous projections.
See the [projection details](#projection-details) section for an explanation of the returned values

:::: code-group
::: code-group-item C#
@[code{ListContinuous}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{ListContinuous}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{ListContinuous}](@grpc/projection-management.ts)
:::
::::

## Get Status

Gets the status of a named projection.
See the [projection details](#projection-details) section for an explanation of the returned values

:::: code-group
::: code-group-item C#
@[code{GetStatus}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{GetStatus}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{GetStatus}](@grpc/projection-management.ts)
:::
::::

## Get state

Retrieves the state of a projection.

:::: code-group
::: code-group-item C#
```
Sample available soon
```
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```java
// This is currently not available in the java client
```
:::
::: code-group-item JavaScript
@[code{GetState}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{GetState}](@grpc/projection-management.ts)
:::
::::

## Get result

Retrieves the result of the named projection and partition.

:::: code-group
::: code-group-item C#
@[code{GetResult}](@grpc/projection-management/Program.cs)
:::
::: code-group-item Go
```Go
// This is currently not available in the Go client
```
:::
::: code-group-item Java
```
Sample available soon
```
:::
::: code-group-item JavaScript
@[code{GetResult}](@grpc/projection-management.js)
:::
::: code-group-item Rust
```Rust
// This is currently not available in the Rust client
```
:::
::: code-group-item TypeScript
@[code{GetResult}](@grpc/projection-management.ts)
:::
::::

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

| Value              | Description                                                                                                            |
|--------------------|------------------------------------------------------------------------------------------------------------------------|
| Running            | The projection is running and processing events                                                                        |
| Stopped            | The projection is stopped and is no longer processing new events                                                       |
| Faulted            | An error occurred in the projection, `StateReason` will give the fault details, the projection is not processing events |
| Initial            | This is the initial state, before the projection is fully initialised                                                  |
| Suspended          | The projection is suspended and will not process events, this happens while stopping the projection                    |
| LoadStateRequested | The state of the projection is being retrieved, this happens while the projection is starting                          |
| StateLoaded        | The state of the projection is loaded, this happens while the projection is starting                                   |
| Subscribed         | The projection has successfully subscribed to its readers, this happens while the projection is starting               |
| FaultedStopping    | This happens before the projection is stopped due to an error in the projection                                        |
| Stopping           | The projection is being stopped                                                                                        |
| CompletingPhase    | This happens while the projection is stopping                                                                          |
| PhaseCompleted     | This happens while the projection is stopping                                                                          |
