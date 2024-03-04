# Quick tour

This is a quick tour into the basic operations with EventStoreDB using the TCP client. We will look at creating a connection, appending an event and reading an event.

::: warning
The TCP client is considered legacy. We recommend migrating to [the gRPC client](@/clients/grpc/README.md). Check the [migration guide to learn more](migration-to-gRPC.md).
:::

## Requirements

These examples have the following requirements:
- At least [.NET Core SDK 3.1](https://dotnet.microsoft.com/download)
- [Docker](https://www.docker.com/get-started)
- A reference to the [EventStore.Client](https://www.nuget.org/packages/EventStore.Client/) NuGet package

## Run the server

To run the EventStoreDB, create a new file called `docker-compose.yml` and copy the following contents into it:

@[code](./sample-code/docker-compose.yml)

Then run the command.

```
docker-compose up
```

This will launch a new instance of the EventStoreDB server.

## Connect to EventStoreDB

[Install the .NET client API](https://www.nuget.org/packages/EventStore.Client) package to your project using your preferred method.

And require it in your code:

@[code{using}](./sample-code/Program.cs)

To use a client API, you use port `1113` and create a connection:

@[code{connect}](./sample-code/GettingStarted/Connection.cs)

It will create a connection to EventStoreDB running locally in Docker container using the TCP protocol.

## Appending events

The most basic operation is to append a single event to the database:

@[code{appendEvent}](./sample-code/GettingStarted/ConnectEventStore.cs)

## Reading events

After you wrote an event to the database, you can then read it back. Use the following method passing the stream name, the start point in the stream, the number of events to read and whether to follow links to the event data:

@[code{ReadEvents}](./sample-code/Program.cs)

