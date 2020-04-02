---
outputFileName: index.html
---

# Creating and writing to a stream

You write to a stream over HTTP using a `POST` request to the resource of the stream. If the stream does not exist then the stream is implicitly created.

## Event Store media types

Event Store supports a custom media type for posting events, `application/vnd.eventstore.events+json` or `application/vnd.eventstore.events+xml`. This format allows for extra functionality that posting events as `application/json` or `application/xml` does not. For example it allows you to post multiple events in a single batch.

<!-- TODO: And more? Why not use it? And why are these examples not using it? -->

The format represents data with the following jschema (`eventId` must be a UUID).

```json
[
    {
      "eventId"    : "string",
      "eventType"  : "string",
      "data"       : "object",
      "metadata"   : "object"
    }
]
```

## Writing a single event

If you issue a `POST` request with data to a stream and the correct content type set it writes the event to the stream, and generates a `201` response from the server, giving you the location of the event. Using the following event, which [you can also download as a file](~/code-examples/http-api/event.json):

[!code-json[http-api-writing-single-event](~/code-examples/http-api/event.json)]

`POST` the following request to create a stream and add an event to it:

### [Request](#tab/tabid-1)

[!code-bash[http-api-write-event-request](~/code-examples/http-api/write-event.sh?start=1&end=1)]

### [Response](#tab/tabid-2)

[!code-json[http-api-write-event-response](~/code-examples/http-api/write-event.sh?range=3-)]

* * *

Some clients may not be able to generate a unique identifier (or may not want to) for the event ID. You need this ID for idempotence purposes and Event Store can generate it for you.

If you leave off the `ES-EventId` header you see different behavior:

### [Request](#tab/tabid-3)

[!code-bash[http-api-write-event-no-id-request](~/code-examples/http-api/write-event-no-id.sh?start=1&end=1)]

### [Response](#tab/tabid-4)

[!code-json[http-api-write-event-no-id-response](~/code-examples/http-api/write-event-no-id.sh?range=3-)]

* * *

In this case Event Store has responded with a `307 Temporary Redirect`. The location points to another URI that you can post the event to. This new URI is idempotent for posting, even without an event ID.

### [Request](#tab/tabid-5)

[!code-bash[http-api-write-event-follow-request](~/code-examples/http-api/write-event-follow.sh?start=1&end=1)]

### [Response](#tab/tabid-6)

[!code-json[http-api-write-event-follow-response](~/code-examples/http-api/write-event-follow.sh?range=3-)]

* * *

It's generally recommended to include an event ID if possible as it results in fewer round trips between the client and the server.

When posting to either the stream or to the returned redirect, clients must include the `EventType` header. If you forget to include the header you receive an error.

### [Request](#tab/tabid-7)

[!code-bash[http-api-write-event-no-type-request](~/code-examples/http-api/write-event-no-type.sh?start=1&end=1)]

### [Response](#tab/tabid-8)

[!code-json[http-api-write-event-no-type-response](~/code-examples/http-api/write-event-no-type.sh?start=3&end=12&highlight=1)]

* * *

## Batch writes

You can include more than one write in a single post by placing multiple events inside of the array representing the events, including metadata.

For example, the below has two events:

[!code-json[http-api-multiple-events](~/code-examples/http-api/multiple-events.json)]

When you write multiple events in a single post, Event Store treats them transactionally, it writes all events together or fails.

### [Request](#tab/tabid-17)

[!code-bash[http-api-write-multiple-events-request](~/code-examples/http-api/write-multiple-events.sh?start=1&end=1)]

### [Response](#tab/tabid-18)

[!code-json[http-api-write-multiple-events-response](~/code-examples/http-api/write-multiple-events.sh?range=3-)]

* * *

### Appending events

To append events, issue a `POST` request to the same resource with a new `eventId`:

[!code-json[http-api-append-event](~/code-examples/http-api/event-append.json)]

### [Request](#tab/tabid-11)

[!code-bash[http-api-write-event-append-request](~/code-examples/http-api/write-event-append.sh?start=1&end=1)]

### [Response](#tab/tabid-12)

[!code-json[http-api-write-event-append-response](~/code-examples/http-api/write-event-append.sh?range=3-)]

* * *

## Data-only events

Version 3.7.0 of Event Store added support for the `application/octet-stream` content type to support data-only binary events. When creating these events, you need to provide the `ES-EventType` and `ES-EventId` headers and cannot have metadata associated with the event. In the example below `SGVsbG8gV29ybGQ=` is the data you `POST` to the stream:

### [Request](#tab/tabid-13)

[!code-bash[http-api-write-event-data-request](~/code-examples/http-api/write-data-event.sh?start=1&end=1)]

### [Response](#tab/tabid-14)

[!code-json[http-api-write-event-data-response](~/code-examples/http-api/write-data-event.sh?range=3-)]

* * *

## Expected version header

The expected version header represents the version of the stream you expect.

For example if you write to a stream at version 1, then you expect it to be at version 1 next time you write. This can allow for optimistic locking when multiple applications are reading/writing to streams.

If your expected version is not the current version you receive an HTTP status code of 400.

> [!WARNING]
> See the idempotency section below, if you post the same event twice it is idempotent and won't return a version error.

First write an event to a stream, setting a version:

[!code-json[http-api-append-event](~/code-examples/http-api/event-version.json)]

[Download](~/code-examples/http-api/event-version.json)

### [Request](#tab/tabid-15)

[!code-bash[http-api-write-event-version-request](~/code-examples/http-api/write-event-version.sh?start=1&end=1)]

### [Response](#tab/tabid-16)

[!code-json[http-api-write-event-version-response](~/code-examples/http-api/write-event-version.sh?range=3-)]

* * *

If you now write to the stream with the incorrect version, you receive an HTTP status code 400 error.

### [Request](#tab/tabid-17)

[!code-bash[http-api-write-event-wrong-version-request](~/code-examples/http-api/write-event-wrong-version.sh?start=1&end=1)]

### [Response](#tab/tabid-18)

[!code-json[http-api-write-event-wrong-version-response](~/code-examples/http-api/write-event-wrong-version.sh?start=3&end=13&highlight=1)]

* * *

There are special values you can use in the expected version header:

-   `-2` states that this write should never conflict and should **always** succeed.
-   `-1` states that the stream should not exist at the time of the writing (this write creates it).
-   `0` states that the stream should exist but should be empty.


## Idempotency

Appends to streams are idempotent based upon the `EventId` assigned in your post. If you were to re-run the last command it returns the same value again.

This is important behaviour as it's how you implement error handling. If you receive a timeout, broken connection, no answer, etc from your HTTP `POST` then it's your responsibility to retry the post. You must also keep the same UUID that you assigned to the event in the first `POST`.

If you are using the expected version parameter with your post, then Event Store is 100% idempotent. If you use `-2` as your expected version value, Event Store does its best to keep events idempotent but cannot assure that everything is fully idempotent and you end up in 'at-least-once' messaging. [Read this guide](~/http-api/optimistic-concurrency-and-idempotence.md) for more details on idempotency.