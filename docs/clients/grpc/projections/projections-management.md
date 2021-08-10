﻿# Projection management

The various gRPC client APIs includes dedicated clients that allow you to manage projections.

:::note
Currently not all clients fully expose all operations.
:::

## Required packages
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

## Creating a client 

Projection management operations are exposed through a dedicated client. 

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

## Restart the subsystem
Restarts the entire projection subsystem. The user must be in the `$ops` or `$admin` group to perform this operation

<xode-group>
<xode-block title="C#">

```csharp
public async Task RestartSubsystemAsync(UserCredentials? userCredentials = null,CancellationToken cancellationToken = default (CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client 
```
</xode-block>
<xode-block title="NodeJS">

```ts 
restartSubsystem(options?: RestartSubsystemOptions): Promise<void>;
```
</xode-block>
<xode-block title="Rust">

```
TODO 
```
</xode-block>
</xode-group>

## Enable a projection

Enables an existing projection by name.
You must have access to a projection to disable it.

<xode-group>
<xode-block title="C#">

```csharp
public async Task EnableAsync(string name, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default (CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```ts
 enableProjection(projectionName: string, options?: EnableProjectionOptions): Promise<void>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Disable a projection 
 
Disables a projection, this will save the projection checkpoint.
You must have access to a projection to disable it.

:::warning 
The .net clients prior to version 21.6 had an incorrect behavior: they _will not_ save the checkpoint  
:::

<xode-group>
<xode-block title="C#">

```csharp
public Task DisableAsync(string name, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```ts
disableProjection(projectionName: string, options?: DisableProjectionOptions): Promise<void>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
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
<xode-block title="NodeJS">

```ts
deleteProjection(projectionName: string, options?: DeleteProjectionOptions): Promise<void>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Abort a projection

Aborts a projection, this will not save the projection's checkpoint.

:::warning
The .net clients prior to version 21.6 had an incorrect behavior: they _will_ save the checkpoint. 
:::

<xode-group>
<xode-block title="C#">

```csharp
public Task AbortAsync(string name, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default)
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```
// This is currently not available in the NodeJS client
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Reset a projection 
Resets a projection. This will re-emit events. Streams that are written to from the projection will also be soft deleted.

<xode-group>
<xode-block title="C#">

```csharp
public async Task ResetAsync(string name, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```ts
 resetProjection(projectionName: string,options?: ResetProjectionOptions): Promise<void>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Create a continuous projection

Creates a projection that runs until the end of the log and then continues running. The query parameter contains the JavaScript you want created as a continuous projection.
Continuous projections have explicit names, and you can enable or disable them via this name.

<xode-group>
<xode-block title="C#">

```csharp
public async Task CreateContinuousAsync(string name, string query, bool trackEmittedStreams = false, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
public CompletableFuture createContinuous(final String projectionName, final String query)
public CompletableFuture createContinuous(final String projectionName, final String query, CreateContinuousProjectionOptions options)
```
</xode-block>
<xode-block title="NodeJS">

```ts
createContinuousProjection(projectionName: string, query: string, options?: CreateContinuousProjectionOptions): Promise<void>
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Create a one-time projection

Creates a projection that runs until the end of the log and then stops. The query parameter contains the JavaScript you want created as a one time projection.

<xode-group>
<xode-block title="C#">

```csharp
public async Task CreateOneTimeAsync(string query, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
public CompletableFuture createOneTime(final String projectionName, final String query, CreateOneTimeProjectionOptions options)
```
</xode-block>
<xode-block title="NodeJS">

```ts
createOneTimeProjection(query: string, options?: CreateOneTimeProjectionOptions): Promise<void>;
createOneTimeProjection(query: TemplateStringsArray,...parts: string[]): Promise<void>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Update a projection

Updates a projection. The name parameter is the name of the projection to be updated. The query parameter contains the new JavaScript.

<xode-group>
<xode-block title="C#">

```csharp
public async Task UpdateAsync(string name, string query, bool? emitEnabled = null, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```ts
updateProjection(projectionName: string,query: string,options?: UpdateProjectionOptions): Promise<void>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## List all projections

Returns a list of all projections.

<xode-group>
<xode-block title="C#">

```csharp
public IAsyncEnumerable<ProjectionDetails> ListAllAsync(UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```
// This is currently not available in the NodeJS client
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## List continuous projections

Returns a list of all continuous projections

<xode-group>
<xode-block title="C#">

```csharp
public IAsyncEnumerable<ProjectionDetails> ListContinuousAsync(UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```ts
listContinuousProjections(options?: ListProjectionsOptions): Promise<ProjectionDetails[]>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## List one-time projections

Returns a list of all One-Time Projections.

<xode-group>
<xode-block title="C#">

```csharp
public IAsyncEnumerable<ProjectionDetails> ListOneTimeAsync(UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```ts 
 listOneTimeProjections(options?: ListProjectionsOptions): Promise<ProjectionDetails[]>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Get Status 

Gets the status of a named projection

<xode-group>
<xode-block title="C#">

```csharp
public Task<ProjectionDetails> GetStatusAsync(string name, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```ts
 getProjectionStatistics(projectionName: string,options?: GetProjectionStatisticsOptions): Promise<ProjectionDetails>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Get state

Retrieves the state of a projection.

<xode-group>
<xode-block title="C#">

```csharp
public async Task<JsonDocument> GetStateAsync(string name, string? partition = null, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
public async Task<T> GetStateAsync<T>(string name, string? partition = null, JsonSerializerOptions? serializerOptions = null, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))

```
</xode-block>
<xode-block title="Java">

```java
// This is currently not available in the java client
```
</xode-block>
<xode-block title="NodeJS">

```ts
getProjectionState<T = unknown>(projectionName: string,options?: GetProjectionStateOptions): Promise<T>;
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>

## Get result

Retrieves the result of the named projection and partition.

<xode-group>
<xode-block title="C#">

```csharp
public async Task<JsonDocument> GetResultAsync(string name, string? partition = null, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
public async Task<T> GetResultAsync<T>(string name, string? partition = null, JsonSerializerOptions? serializerOptions = null, UserCredentials? userCredentials = null, CancellationToken cancellationToken = default(CancellationToken))
```
</xode-block>
<xode-block title="Java">

```java
public <TResult> CompletableFuture<TResult> getResult(final String projectionName, Class<TResult> type)
public <TResult> CompletableFuture<TResult> getResult(final String projectionName,  Function<TypeFactory, JavaType> javaTypeFunction)

```
</xode-block>
<xode-block title="NodeJS">

```ts
getProjectionResult<T = unknown>(projectionName: string, options?: GetProjectionResultOptions): Promise<T>
```
</xode-block>
<xode-block title="Rust">

```Rust
// This is currently not available in the Rust client
```
</xode-block>
</xode-group>