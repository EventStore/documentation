# Quick tour

This is a quick tour into the basic operations with EventStoreDb. We will look at creating a connection, writing an event and reading an event.

## Requirements

These examples have the following requirements:
- At least [.NET Core SDK 3.1](https://dotnet.microsoft.com/download)
- [Docker](https://www.docker.com/get-started)
- A reference to the [EventStore.Client](https://www.nuget.org/packages/EventStore.Client/) NuGet package

## Run the server

To run the EventStoreDB, create a new file called `docker-compose.yml` and copy the following contents into it:

<<< @/docs/clients/dotnet/5.0/sample-code/docker-compose.yml

Then run the command.

```
docker-compose up
```

This will launch a new instance of the EventStoreDb server.

## Connect to EventStoreDB

[Install the .NET client API](https://www.nuget.org/packages/EventStore.Client) package to your project using your preferred method.

And require it in your code:

<<< @/docs/clients/dotnet/5.0/sample-code/Program.cs#using

To use a client API, you use port `1113` and create a connection:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/Connection.cs#connect

It will create a connection to EventStoreDB running locally in Docker container using the TCP protocol.

## Write events

The most basic operation is to write a single event to the database:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/ConnectEventStore.cs#appendEvent

Learn more about writing data to EventStoreDB on the [Writing events](../writing) page.

## Read events

After you wrote an event to the database, you can then read it back. Use the following method passing the stream name, the start point in the stream, the number of events to read and whether to follow links to the event data:

<<< @/docs/clients/dotnet/5.0/sample-code/Program.cs#ReadEvents

Learn more about reading data from EventStoreDB on the [Reading events](../reading) page.

