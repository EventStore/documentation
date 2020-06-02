# WIP

## Connecting to Event Store

[Add the JVM client](https://github.com/EventStore/EventStore.JVM#setup) using Maven:

<<< @/docs/clients/java/5.0/sample-code/pom.xml#dependency

And import it in your code.

To use a client API, you use port `1113` and create a connection:

<<< @/docs/clients/java/5.0/sample-code/src/main/java/org/eventstore/sample/WriteEventExample.java#connection

For our JVM examples we use [akka](https://akka.io), a toolkit for building highly concurrent and distributed JVM applications.

## Writing events

The most basic operation is to write a single event to the database.
 You also need an Akka `AbstractActor` to return the response from Event Store:

<<< @/docs/clients/java/5.0/sample-code/src/main/java/org/eventstore/sample/WriteEventExample.java#writeResult
<<< @/docs/clients/java/5.0/sample-code/src/main/java/org/eventstore/sample/WriteEventExample.java#writeEvent

## Reading events

After you wrote an event to the database, you can then read it back. Use the following method passing the stream name, the number of the event to read, and whether to follow links to the event data:

<<< @/docs/clients/java/5.0/sample-code/src/main/java/org/eventstore/sample/ReadMultipleEventsExample.java
