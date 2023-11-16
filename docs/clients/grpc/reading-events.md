# Reading events

There are two options for reading events from EventStoreDB. You can either read from an individual stream or you can read from the `$all` stream. The later will return all events in the store.

Each event in EventStoreDB belongs to an individual stream name. When reading events you can pick the name of the stream you want to read from. Then you can choose whether to read that stream forwards or backwards. 

All events have a `StreamPosition`, which is the place of the event in the stream, represented by a *big int* (unsigned 64-bit integer) and a `Position` that is the events logical position that is represented by `CommitPosition` and a `PreparePosition`. This means that when reading events you have to supply a different "position" depending on if you are reading from a stream or the `$all` stream.

:::tip
Check [connecting to EventStoreDB instructions](./README.md#required-packages) to learn how to configure and use the client SDK.
:::

## Reading from a stream

You can read events from individual streams, both all the events, or just a few events from the stream. You can start reading from any position in the stream, and read events both forwards and backwards. It's only possible to read events from one stream at a time. You can also read events from the global event log, which spans across streams. Read more about it in the [Read from `$all`](#reading-from-the-all-stream) section below.

### Reading forwards

The simplest way to read a stream forwards is to supply a stream name, direction and revision to start from. This can either be a *stream position* `Start` or a *big int* (unsigned 64-bit integer):

@[code{read-from-stream}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

This will return an enumerable that can be iterated on:

@[code{iterate-stream}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

There are a number of additional arguments you can provide when reading a stream, listed below.

#### maxCount

Passing in the max count allows you to limit the number of events returned.

#### resolveLinkTos

When using projections to create new events you can set whether the generated events are pointers to existing events. Setting this value to `true` tells EventStoreDB to return the event as well as the event linking to it.

#### configureOperationOptions

You can use the `configureOperationOptions` argument to provide a function that will customise settings for each operation.

#### userCredentials

The `userCredentials` argument is optional. You can use it to override the default credentials specified when creating the client instance.

@[code{overriding-user-credentials}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

### Reading from a revision

Instead of providing the `StreamPosition` you can also provide a specific stream revision as a *big int* (unsigned 64-bit integer).

@[code{read-from-stream-position}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

### Reading backwards

As well as being able to read a stream forwards you can also go backwards. When reading backwards, you need to set the *stream position* the end if you want to read all the events:

@[code{reading-backwards}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

:::tip
You can use reading backwards to find the last position in the stream. Just read backwards one event and get the position.
:::

### Checking if the stream exists

Reading a stream returns a `ReadStreamResult`, which contains a property `ReadState`. This property can have the value `StreamNotFound` and `Ok`.

It is important to check the value of this field before attempting to iterate an empty stream as it will throw an exception. 

For example:

@[code{checking-for-stream-presence}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

## Reading from the $all stream

Reading from the all stream is similar to reading from an individual stream but with some small differences. Primarily the need to provide an admin user account credentials and that you need to provide a transaction log position instead of a stream revision.

### Reading forwards

The simplest way to read the `$all` stream forwards is to supply a direction and transaction log position to start from. This can either be a *stream position* `Start` or a *big int* (unsigned 64-bit integer):

@[code{read-from-all-stream}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

You can iterate asynchronously through the result:

@[code{read-from-all-stream-iterate}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

There are a number of additional arguments you can provide when reading a stream.

#### maxCount

Passing in the max count allows you to limit the number of events that returned.

#### resolveLinkTos

When using projections to create new events you can set whether the generated events are pointers to existing events. Setting this value to true will tell EventStoreDB to return the event as well as the event linking to it.


@[code{read-from-all-stream-resolving-link-Tos}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

#### configureOperationOptions

This argument is generic setting class for all operations that can be set on all operations executed against EventStoreDB.

#### userCredentials
The credentials used to read the data can be supplied. to be used by the subscription as follows. This will override the default credentials set on the connection.

@[code{read-all-overriding-user-credentials}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

### Reading backwards

As well as being able to read a stream forwards you can also go backwards. When reading backwards is the *position* will have to be set to the end if you want to read all the events:

@[code{read-from-all-stream-backwards}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

:::tip
You can use reading backwards to find the last position in the stream. Just read backwards one event and get the position.
:::

### Handling system events

When reading from the all stream EventStoreDB will also return system events. In most cases you won't need to care about these events and they should be ignored.

All system events begin with `$` or `$$` and can be easily ignored by checking the `EventType` property.

@[code{ignore-system-events}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

