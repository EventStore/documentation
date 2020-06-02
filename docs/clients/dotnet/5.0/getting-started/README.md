# WIP

## Connecting to EventStoreDB

[Install the .NET client API](https://www.nuget.org/packages/EventStore.Client) using your preferred method.

Add it to your project:

```shell
dotnet add package EventStore.Client
```

And require it in your code:

<<< @/docs/clients/dotnet/5.0/sample-code/Program.cs#using

To use a client API, you use port `1113` and create a connection:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/Connection.cs#connect

## Writing events

The most basic operation is to write a single event to the database:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/ConnectEventStore.cs#appendEvent

## Reading events

After you wrote an event to the database, you can then read it back. Use the following method passing the stream name, the start point in the stream, the number of events to read and whether to follow links to the event data:

<<< @/docs/clients/dotnet/5.0/sample-code/Program.cs#ReadEvents

