---
outputFileName: index.html
sinceVersion: 3.0.0
---

# Optional HTTP headers: EventID

When you write to a stream and don't use the `application/vnd.eventstore.events+json/+xml` media type, you need to specify an event ID with the event you post. This is not required with the custom media type as it is specified within the format (there is an `EventId` on each entry in the format). Event Store uses `EventId` for impotency.

You can include an event ID on an event by specifying this header.

### [Request](#tab/tabid-1)

[!code-bash[http-api-write-event-request](~/code-examples/http-api/write-event.sh?start=1&end=1)]

### [Response](#tab/tabid-2)

[!code-json[http-api-write-event-response](~/code-examples/http-api/write-event.sh?range=3-)]

* * *

If you don't add an `ES-EventId` header on an append where the body is considered the actual event (e.g., not using `application/vnd.eventstore.events+json/+xml`) Event Store generates a unique identifier for you and redirects you to an idempotent URI where you can post your event. If you can create a UUID then you shouldn't use this feature, but it's useful when you cannot create a UUID.

### [Request](#tab/tabid-3)

[!code-bash[http-api-write-event-no-id-request](~/code-examples/http-api/write-event-no-id.sh?start=1&end=1)]

### [Response](#tab/tabid-4)

[!code-json[http-api-write-event-no-id-response](~/code-examples/http-api/write-event-no-id.sh?range=3-)]

* * *

Event Store returned a `307 Temporary Redirect` with a location header that points to a generated URI that is idempotent for purposes of retrying the post.
