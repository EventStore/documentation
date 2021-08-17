# Projection management

The various gRPC client APIs include dedicated clients that allow you to manage projections.

:::warning
Currently not all clients fully expose all operations.
:::

For a detailed explanation of projections, see the [server documentation](/server/v21.6/docs/projections/).

You can find the full sample code from these documentation on the respective [clients repositories](https://github.com/eventStore/?q=client)

## Required packages
Install the client SDK package to your project.

<xode-group>
<xode-block title="C#">

```bash
dotnet add package EventStore.Client.Grpc.ProjectionManagement --version 21.*
```
</xode-block>
<xode-block title="Java">

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
</xode-block>
<xode-block title="JavaScript">

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
<xode-block title="TypeScript">

```
# Yarn
$ yarn add @eventstore/db-client

# NPM
$ npm install --save @eventstore/db-client
```
</xode-block>
</xode-group>

## Creating a client 

Projection management operations are exposed through a dedicated client. 

<xode-group>
<xode-block title="C#" code="connectionString">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#createClient

</xode-block>
<xode-block title="Java" code="connectionString">

```
Sample available soon
```

</xode-block>
<xode-block title="JavaScript" code="connectionString">

```
Sample available soon
```

</xode-block>
<xode-block title="Rust" code="connectionString">

```
Sample available soon
```

</xode-block>

<xode-block title="TypeScript" code="connectionString">

```
Sample available soon
```
</xode-block>
</xode-group>

## Create a projection

Creates a projection that runs until the last event in the store, and then continues processing new events as they are appended to the store. The query parameter contains the JavaScript you want created as a projection.
Projections have explicit names, and you can enable or disable them via this name.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#CreateContinuous

</xode-block>
<xode-block title="Java">

```
Sample available soon
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

Trying to create projections with the same name will result in an error:

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#CreateContinuous_Conflict

</xode-block>
<xode-block title="Java">

```
Sample available soon
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Restart the subsystem
Restarts the entire projection subsystem. The user must be in the `$ops` or `$admin` group to perform this operation

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#RestartSubSystem

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client 
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```
Sample available soon
```

</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Enable a projection

Enables an existing projection by name.
Once enabled, the projection will start to process events even after restarting the server or the projection subsystem. 
You must have access to a projection to enable it, see the [ACL documentation](/server/v21.2/docs/security/acl.html#stream-acl)

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#Enable

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

Enabling a projection that does not exists results in an error: 

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#EnableNotFound

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Disable a projection 
 
Disables a projection, this will save the projection checkpoint.
Once disabled, the projection will not process events even after restarting the server or the projection subsystem.
You must have access to a projection to disable it, see the [ACL documentation](/server/v21.2/docs/security/acl.html#stream-acl)

:::warning 
The .net clients up to version 21.2 had an incorrect behavior: they _will not_ save the checkpoint  
:::

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#Disable

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

Disabling a projection that does not exists results in an error:

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#DisableNotFound

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>


## Delete a projection

Deletes a projection

<xode-group>
<xode-block title="C#">

```csharp
// This is currently not available in the .net client
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```

</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Abort a projection

Aborts a projection, this will not save the projection's checkpoint.

:::warning
The .net clients up to version 21.2 had an incorrect behavior: they _will_ save the checkpoint. 
:::

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#Abort

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

Trying to abort a projection that does not exists will result in an error:

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#Abort_NotFound

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScrip">

```
Sample available soon
```
</xode-block>
</xode-group>

## Reset a projection 
Resets a projection. This will re-emit events. Streams that are written to from the projection will also be soft deleted.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#Reset

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

Resetting a projection that does not exists will result in an error. 

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#Reset_NotFound

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Update a projection

Updates a projection. The name parameter is the name of the projection to be updated. The query parameter contains the new JavaScript.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#Update

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

You can only update an existing projection. When you try to update a non-existing projection, you'll get an error:

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#Update_NotFound

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## List all projections

Returns a list of all projections, user defined & system projections.
See the [projection details](#projection-details) section for an explanation of the returned values

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#ListAll

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
// This is currently not available in the JavaScript client
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
// This is currently not available in the TypeScript client
```
</xode-block>
</xode-group>

## List continuous projections

Returns a list of all continuous projections.
See the [projection details](#projection-details) section for an explanation of the returned values

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#ListContinuous

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Get Status 

Gets the status of a named projection.
See the [projection details](#projection-details) section for an explanation of the returned values

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#GetStatus

</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Get state

Retrieves the state of a projection.

<xode-group>
<xode-block title="C#">

```
Sample available soon
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Get result

Retrieves the result of the named projection and partition.

<xode-group>
<xode-block title="C#">

<<< @/docs/clients/dotnet/generated/main/samples/projection-management/Program.cs#GetResult

</xode-block>
<xode-block title="Java">

```
Sample available soon
```
</xode-block>
<xode-block title="JavaScript">

```
Sample available soon
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
<xode-block title="TypeScript">

```
Sample available soon
```
</xode-block>
</xode-group>

## Projection Details

[List all](#list-all-projections), [list continuous](#list-continuous-projections) and [get status](#get-status) all return the details and statistics of projections

| Field | Description |
| --- | --- |
| `Name`, `EffectiveName`               | The name of the projection  |
| `Status`                              | A human readable string of the current statuses of the projection (see below) |
| `StateReason`                         | A human readable string explaining the reason of the current projection state |
| `CheckpointStatus`                    | A human readable string explaining the current operation performed on the checkpoint : `requested`, `writing` |
| `Mode`                                | `Continuous`, `OneTime` , `Transient` |
| `CoreProcessingTime`                  | The total time, in ms, the projection took to handle events since the last restart |
| `Progress`                            | The progress, in %, indicates how far this projection has processed event, in case of a restart this could be -1% or some number. It will be updated as soon as a new event is appended and processed |
| `WritesInProgress`                    | The number of events & metadata currently being appended to emitted streams |
| `ReadsInProgress`                     | The number of events currently being read |
| `PartitionsCached`                    | The number of cached projection partitions |
| `Position`                            | The Position of the last processed event |
| `LastCheckpoint`                      | The Position of the last checkpoint of this projection |
| `EventsProcessedAfterRestart`         | The number of events processed since the last restart of this projection|
| `BufferedEvents`                      | The number of events in the projection read buffer |
| `WritePendingEventsBeforeCheckpoint`  | The number of events to be appended to emitted streams before the next checkpoint is written |
| `WritePendingEventsAfterCheckpoint`   | The number of events to be appended to emitted streams since the last checkpoint |
| `Version`                             | This is used internally, the version is increased when the projection is edited or reset |
| `Epoch`                               | This is used internally, the epoch is increased when the projection is reset |

The `Status` string is a combination of the following values.
The first 3 are the most common one, as the other one are transient values while the projection is initialised or stopped 

| Value| Description |
| --- | --- |
| Running | The projection is running and processing events |
| Stopped | The projection is stopped and is no longer processing new events |
| Faulted | An error occured in the projection, `StateReason` will give the fault details, the projection is not processing events |
| Initial | This is the initial state, before the projection is fully initialised |
| Suspended | The projection is suspended and will not process events, this happens while stopping the projection |
| LoadStateRequested | The state of the projection is being retrieved, this happens while the projection is starting |
| StateLoaded | The state of the projection is loaded, this happens while the projection is starting |
| Subscribed | The projection has successfully subscribed to its readers, this happens while the projection is starting |
| FaultedStopping | This happens before the projection is stopped due to an error in the projection |
| Stopping | The projection is being stopped |
| CompletingPhase | This happens while the projection is stopping |
| PhaseCompleted | This happens while the projection is stopping |