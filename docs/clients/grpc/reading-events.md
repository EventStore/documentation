---
order: 3
---

# Reading events

There are two options for reading events from KurrentDB. You can either: 
    1. Read from an individual stream, or 
    2. Read from the `$all` stream, which will return all events in the store.

Each event in KurrentDB belongs to an individual stream. When reading events, pick the name of the stream from which you want to read the events and choose whether to read the stream forwards or backwards. 

All events have a `StreamPosition` and a `Position`.  `StreamPosition` is a *big int* (unsigned 64-bit integer) and represents the place of the event in the stream. `Position` is the event's logical position, and is represented by `CommitPosition` and a `PreparePosition`. Note that when reading events you will supply a different "position" depending on whether you are reading from an individual stream or the `$all` stream.

:::tip
Check [connecting to KurrentDB instructions](getting-started.md#required-packages) to learn how to configure and use the client SDK.
:::

## Reading from a stream

You can read all the events or a sample of the events from individual streams, starting from any position in the stream, and can read either forward or backward. It is only possible to read events from a single stream at a time. You can read events from the global event log, which spans across streams. Learn more about this process in the [Read from `$all`](#reading-from-the-all-stream) section below.

### Reading forwards

The simplest way to read a stream forwards is to supply a stream name, read direction, and revision from which to start. The revision can either be a *stream position* `Start` or a *big int* (unsigned 64-bit integer):

@[code{read-from-stream}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

This will return an enumerable that can be iterated on:

@[code{iterate-stream}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

There are a number of additional arguments you can provide when reading a stream, listed below.

#### maxCount

Passing in the max count will limit the number of events returned.

#### resolveLinkTos

When using projections to create new events, you can set whether the generated events are pointers to existing events. Setting this value to `true` tells KurrentDB to return the event as well as the event linking to it.

#### configureOperationOptions

You can use the `configureOperationOptions` argument to provide a function that will customise settings for each operation.

#### userCredentials

The `userCredentials` argument is optional. It is used to override the default credentials specified when creating the client instance.

@[code{overriding-user-credentials}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

### Reading from a revision

Instead of providing the `StreamPosition` you can also provide a specific stream revision as a *big int* (unsigned 64-bit integer).

@[code{read-from-stream-position}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

### Reading backwards

In addition to reading a stream forwards, streams can be read backwards. To read all the events backwards, set the *stream position* to the end:

@[code{reading-backwards}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

:::tip
Read one event backwards to find the last position in the stream.
:::

### Checking if the stream exists

Reading a stream returns a `ReadStreamResult`, which contains a property `ReadState`. This property can have the value `StreamNotFound` or `Ok`.

It is important to check the value of this field before attempting to iterate an empty stream, as it will throw an exception. 

For example:

@[code{checking-for-stream-presence}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

## Reading from the $all stream

Reading from the `$all` stream is similar to reading from an individual stream, but please note there are differences. One significant difference is the need to provide admin user account credentials to read from the `$all` stream.  Additionally, you need to provide a transaction log position instead of a stream revision when reading from the `$all` stream.

### Reading forwards

The simplest way to read the `$all` stream forwards is to supply a read direction and the transaction log position from which you want to start. The transaction log postion can either be a *stream position* `Start` or a *big int* (unsigned 64-bit integer):

@[code{read-from-all-stream}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

You can iterate asynchronously through the result:

@[code{read-from-all-stream-iterate}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

There are a number of additional arguments you can provide when reading the `$all` stream.

#### maxCount

Passing in the max count allows you to limit the number of events that returned.

#### resolveLinkTos

When using projections to create new events you can set whether the generated events are pointers to existing events. Setting this value to true will tell KurrentDB to return the event as well as the event linking to it.

@[code{read-from-all-stream-resolving-link-Tos}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

#### configureOperationOptions

This argument is generic setting class for all operations that can be set on all operations executed against KurrentDB.

#### userCredentials
The credentials used to read the data can be used by the subscription as follows. This will override the default credentials set on the connection.

@[code{read-all-overriding-user-credentials}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

### Reading backwards

In addition to reading the `$all` stream forwards, it can be read backwards. To read all the events backwards, set the *position* to the end:

@[code{read-from-all-stream-backwards}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

:::tip
Read one event backwards to find the last position in the `$all` stream.
:::

### Handling system events

KurrentDB will also return system events when reading from the `$all` stream. In most cases you can ignore these events.

All system events begin with `$` or `$$` and can be easily ignored by checking the `EventType` property.

@[code{ignore-system-events}](@grpc:reading_events.py;reading-events.js;reading-events.ts;reading_events/ReadingEvents.java;reading-events/Program.cs;readingEvents.go;reading_events.rs)

