# Observability

The EventStoreDB gRPC clients are designed with observability in mind, offering support for OpenTelemetry. This integration provides a set of distributed traces, enabling developers to gain deeper insights into their system.

::: warning
Currently not all clients have support for observability using OpenTelemetry.
:::

::: note
Only the append and subscribe (Catchup and Persistent) operations are instrumented.
:::

## Traces

Traces provides a clear picture of how operations are carried out in a distributed system, making it easier to maintain and enhance the system over time. Traces from the clients can be exported to any compatible collector that supports the OpenTelemetry protocol (OTLP).

For guidance on setting up and utilizing tracing, refer to the [OpenTelemetry](https://opentelemetry.io/) documentation.

### Install Required Packages

:::: code-group
::: code-group-item JavaScript

```
# Yarn
$ yarn add @eventstore/opentelemetry

# NPM
$ npm install --save @eventstore/opentelemetry
```

:::
::: code-group-item TypeScript

```
# TypeScript Declarations are included in the package.

# Yarn
$ yarn add @eventstore/opentelemetry

# NPM
$ npm install --save @eventstore/opentelemetry
```

:::
::: code-group-item Java

```
OpenTelemetry is supported out of the box in the Java client.
```

:::
::: code-group-item C#

```bash
dotnet add package EventStore.Client.Extensions.OpenTelemetry
```

:::
::::

You can click on the links below to view the full code for each client:

- [NodeJS](https://github.com/EventStore/EventStore-Client-NodeJS/blob/master/packages/test/src/samples/opentelemetry.ts)
- [Java](https://github.com/EventStore/EventStoreDB-Client-Java/blob/trunk/db-client-java/src/test/java/com/eventstore/dbclient/samples/opentelemetry/Instrumentation.java)
- [C#](https://github.com/EventStore/EventStore-Client-Dotnet/blob/master/samples/diagnostics/Program.cs)

### Register Instrumentation

:::: code-group
::: code-group-item JavaScript
@[code{register-instrumentation}](@grpc:opentelemetry.js)
:::
::: code-group-item TypeScript
@[code{register-instrumentation}](@grpc:opentelemetry.ts)
:::
::: code-group-item Java
@[code{register-instrumentation}](@grpc:opentelemetry/Instrumentation.java)
:::
::: code-group-item C#
@[code{register-instrumentation}](@grpc:diagnostics/Program.cs)
:::
::::

### With Exporters

You can set up various exporters to send traces to different destinations. Additionally, you have the option to export these traces to a collector of your choice, such as [Jaeger](https://www.jaegertracing.io/) or [Seq](https://datalust.co/seq).

For instance, if you choose to use Jaeger as your exporter, you can view your traces in the Jaeger UI, which provides a powerful interface for querying and visualizing your trace data.

The code snippets below demonstrate how to set up one or more exporters for each client:

:::: code-group
::: code-group-item JavaScript
@[code{setup-exporter}](@grpc:opentelemetry.js)
:::
::: code-group-item TypeScript
@[code{setup-exporter}](@grpc:opentelemetry.ts)
:::
::: code-group-item Java
@[code{setup-exporter}](@grpc:opentelemetry/Instrumentation.java)
:::
::: code-group-item C#
@[code{setup-exporter}](@grpc:diagnostics/Program.cs)
:::
::::
