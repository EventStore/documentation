---
title: "Getting started with v1 Java gRPC client"
date: 2021-03-01
author: "Oskar Dudycz"
kind: "Article"
original: "https://www.eventstore.com/blog/getting-started-with-v1-java-grpc-client"
tags:
- release notes
- Java
---

The first release of EventStoreDB gRPC happened on 23rd November 2020, one day after my birthday. If you're a JVM developer, I have a gift for you. I proudly announce the v1 release!

The last few months have been busy. We were working hard to align both the feature set and naming conventions between the gRPC clients. If you were a preview version user, you might find some breaking API changes, but it should be stable from now on.

The Java client supports all Java versions from 8\. You can use it also in Scala, Kotlin and Groovy.

### Installation

To use the gRPC client package, you need to install it either with Maven:

```xml
<dependency>
  <groupId>com.eventstore</groupId>
  <artifactId>db-client-java</artifactId>
  <version>1.0</version>
</dependency>
```

Scala SBT

```bash
libraryDependencies += "com.eventstore" % "db-client-java" % "1.0"
```

Gradle Groovy:

```bash
libraryDependencies += "com.eventstore" % "db-client-java" % "1.0"
```

or Gradle Kotlin:

```bash
implementation("com.eventstore:db-client-java:1.0")
```

### Connecting to the DB server

EventStoreDB is cross-platform, and you can run it natively on your OS. However, the easiest way to get started with a local setup is running it with Docker.

```bash
docker run --name esdb-node -it -p 2113:2113 -p 1113:1113 \
  eventstore/eventstore:latest --insecure --run-projections=All
```

After that, you should have the single-node EventStoreDB setup, and you can connect with the gRPC client.

```java
EventStoreDBClientSettings settings = 	       EventStoreDBConnectionString.parse("esdb://localhost:2113?tls=false");
EventStoreDBClient client = EventStoreDBClient.create(settings);
```

You may notice <span style="font-style: italic;">"?tls=false"</span> and <span style="font-style: italic;">"--insecure"</span> params in the setup. EventStoreDB is secure-by-default. Those settings allow connecting without using the HTTPS/TLS setup. Using this setting is okay for the local dev environment but should not be used on production. For detailed instructions check the [installation guide](https://developers.eventstore.com/server/v20/server/installation/) and [security recommendations](https://developers.eventstore.com/server/v20/server/security/#protocol-security).

### Working with Events

The centrepiece of EventStoreDB are operations on events. Following the Event Sourcing principles, you could use it to keep the application's state a series of events. The event should be recorded as a result of each business operation.

Multiple series of events are called streams. You can represent the entity as the sequence of events (state mutations) correlated by the entity id. In Event Sourcing, the entity state is rebuilt by reading all stream events and applying them one by one in order of appearance.

I'll use the cinema ticket reservation example and Java. However, our API is also compatible with Scala, Kotlin and Groovy.

You can append events by:

```java
String userId = "ms_smith";
String movieId = "homealone";
String seatId = "seat1";
String reservationId = String.format(res_%s_%s, movieId, seatId);

SeatReserved event = new SeatReserved();
event.setReservationId(reservationId);
event.setMovieId(movieId );
event.setSeatId (seatId);

EventData eventData = EventData
    .builderAsJson("SeatReserved", event)
    .build();

client.appendToStream("some-stream", eventData)
    .get();
```

At first, we're setting up the event data, then wrapping it using EventData class. EventStoreDB allows serialising data in JSON and binary format. EventData provides builder methods to make that easier. We're using [Jackson](https://github.com/FasterXML/jackson) internally for serialisation.

gRPC client operations are returning the [Future](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/Future.html) because of their asynchronous nature.

For reading events, you have two options.

1. Reading from the stream: this method is typically used for reading the entity state. You can read streams forwards or backwards, and even read from a specific position. Additional read options can be set through the options class.

```java
ReadStreamOptions options = ReadStreamOptions.get()
    .forwards()
    .fromStart();

ReadResult result = client.readStream("some-stream", options)
    .get();

List events = result.getEvents();
```

You don't need to provide all options explicitly. If you're okay with using the default options, then you can call the read method without them. This call will be identical to the one above:

```java
ReadResult result = client.readStream("some-stream")
    .get();

List events = result.getEvents();
```

We use the same pattern in other methods.

2. Reading from all stream: EventStoreDB underneath is an append-only log. This log is also known as the _$all_ stream. All events are added there one after another in the order of occurrence. Thanks to that, EventStoreDB can keep the events global ordering. You're getting events across the streams in the order as they were added by reading from it.

```java
long maxCount = 10;

ReadResult result = client.readAll(maxCount)
    .get();

List events = result.getEvents();
```

### Subscribing to the streams

One of the most significant advantages of Event-Driven Architecture is observability. Each action in the system triggers an event. The event gathers business information about the fact registered in the system. This is a simple but powerful feature: it allows modelling the complex business workflows by splitting the work into smaller chunks. Having that, we achieve loosely coupled architecture.

EventStoreDB provides the subscription functionality to enable that. You can subscribe to the single stream:

```java
SubscriptionListener listener = new SubscriptionListener() {
    @Override
    public void onEvent(Subscription subscription, ResolvedEvent event) {
        System.out.println("Received event"
            + event.getOriginalEvent().getStreamRevision()
            + "@" + event.getOriginalEvent().getStreamId());
        HandleEvent(event);
    }
};
client.subscribeToStream("some-stream", listener);
```

or to the _$all_ stream:

```java
SubscriptionListener listener = new SubscriptionListener() {
    @Override
    public void onEvent(Subscription subscription, ResolvedEvent event) {
        System.out.println("Received event"
            + event.getOriginalEvent().getStreamRevision().getValueUnsigned()
            + "@" + event.getOriginalEvent().getStreamId());
        HandleEvent(event);
    }
};
client.subscribeToAll(listener);
```

You'll get an asynchronous notification about each appended event through _SubscriptionListener_ callback method. This enables you to:

* update your read model(s) based on the event data,
* pipe the notification into the external queuing systems like RabbitMQ, Kafka.

The neat feature of EventStoreDB subscriptions is that you can filter them by e.g. event type, stream prefix, regex. You can get only notifications about the events that you’re interested in. Filtering will happen on the server-side, so it’s also a potential performance improvement.

```java
SubscriptionListener listener = new SubscriptionListener() {
    @Override
    public void onEvent(Subscription subscription, ResolvedEvent event) {
      handle(event);
    }
};
String reservationStreamPrefix = "res";

SubscriptionFilter filter = SubscriptionFilter.newBuilder()
    .withStreamNamePrefix(reservationStreamPrefix)
    .build();

SubscribeToAllOptions options = SubscribeToAllOptions.get()
    .filter(filter);

client.subscribeToAll(
    listener,
    options
);
```

### Source code and documentation

Java gRPC client is Open Sourced and available under Apache 2.0 License in the [GitHub Repository](https://github.com/EventStore/EventStoreDB-Client-Java/). You can find [detailed documentation and samples here](https://developers.eventstore.com/clients/grpc/getting-started?codeLanguage=Java). We value the Open Source community. Feel free to send us Pull Requests, Issues or other forms of contribution. If you have more questions, [we're available and happy to help on our Discuss forum](https://discuss.eventstore.com).