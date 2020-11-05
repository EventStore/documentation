# gRPC clients <badge>Preview</badge>

Get started by connecting your application to EventStoreDB. Complete the form below to generate the connection string and examples for different languages and SDKs.

## Connection details

<Connection></Connection>

## Connection string

Each SDK has its own way to configure the client, but it's always possible to use the connection string. The connection string below is generated according to the configuration you specified above, and it should work with each official SDK of EventStoreDB.

<ConnectionString></ConnectionString>

## Connecting to EventStoreDB

First thing first, we need a client.

<!--
<xode-group>
<xode-block title="C#" language="csharp" code="connectionString">
```csharp
var s = "{{connectionString}}";
```
</xode-block>
</xode-group>
-->

Now, we need to write events.

<code-group>
<code-block title="C#">
```csharp
await WriteEvents();
```
</code-block>
</code-group>
