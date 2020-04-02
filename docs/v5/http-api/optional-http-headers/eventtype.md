---
outputFileName: index.html
sinceVersion: 3.0.0
---

# Optional HTTP Headers: EventType

When you write to a stream and don't the `application/vnd.eventstore.events+json/+xml` media type you must specify an event type with the event that you are posting. This isn't required with the custom media type as it's specified within the format itself.

You use the `ES-EventType` header as follows.

### [Request](#tab/tabid-1)

[!code-bash[http-api-write-event-request](~/code-examples/http-api/write-event.sh?start=1&end=1)]

### [Response](#tab/tabid-2)

[!code-json[http-api-write-event-response](~/code-examples/http-api/write-event.sh?range=3-)]

* * *

If you view the event in the UI or with cURL it has the `EventType` of `SomeEvent`:

<!-- TODO: Does this make sense? If I can't use the custom medi type -->

### [Request](#tab/tabid-3)

[!code-bash[http-api-read-event-request](~/code-examples/http-api/read-event.sh?start=1&end=1)]

### [Response](#tab/tabid-4)

[!code-json[http-api-read-event-response](~/code-examples/http-api/read-event.sh?range=16-)]

* * *