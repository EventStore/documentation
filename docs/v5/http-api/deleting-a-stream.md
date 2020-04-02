---
outputFileName: index.html
sinceVersion: 2.0.1
---

# Deleting a stream

## Soft deleting

To delete a stream over the Atom interface, issue a `DELETE` request to the resource.

### [Request](#tab/tabid-17)

[!code-bash[http-api-delete-stream-request](~/code-examples/http-api/delete-stream.sh?start=1&end=1)]

### [Response](#tab/tabid-18)

[!code-bash[http-api-delete-stream-response](~/code-examples/http-api/delete-stream.sh?range=3-)]

* * *

By default when you delete a stream, Event Store soft deletes it. This means you can recreate it later by setting the `$tb` metadata section in the stream. If you try to `GET` a soft deleted stream you receive a 404 response:

### [Request](#tab/tabid-1)

[!code-bash[http-api-get-deleted-stream-request](~/code-examples/http-api/get-deleted-stream.sh?start=1&end=1)]

### [Response](#tab/tabid-2)

[!code-bash[http-api-get-deleted-stream-request](~/code-examples/http-api/get-deleted-stream.sh?range=3-)]

* * *

You can recreate the stream by appending new events to it (like creating a new stream):

### [Request](#tab/tabid-3)

[!code-bash[http-api-recreate-request](~/code-examples/http-api/write-event-append.sh?start=1&end=1)]

### [Response](#tab/tabid-4)

[!code-json[http-api-recreate-response](~/code-examples/http-api/write-event-append.sh?range=3-)]

* * *

The version numbers do not start at zero but at where you soft deleted the stream from

## Hard deleting

You can hard delete a stream. To issue a permanent delete use the `ES-HardDelete` header.

> [!WARNING]
> A hard delete is permanent and the stream is not removed during a scavenge. If you hard delete a stream, you cannot recreate the stream.

Issue the `DELETE` as before but with the permanent delete header:

### [Request](#tab/tabid-9)

[!code-bash[http-api-hard-delete-request](~/code-examples/http-api/hard-delete-stream.sh?start=1&end=1)]

### [Response](#tab/tabid-10)

[!code-bash[http-api-hard-delete-response](~/code-examples/http-api/hard-delete-stream.sh?range=3-)]

* * *

The stream is now permanently deleted, and now the response is a `410`.

### [Request](#tab/tabid-11)

[!code-bash[http-api-get-deleted-stream-request](~/code-examples/http-api/get-deleted-stream.sh?start=1&end=1)]

### [Response](#tab/tabid-12)

[!code-bash[http-api-get-deleted-stream-request](~/code-examples/http-api/get-deleted-stream.sh?range=3-)]

* * *

If you try to recreate the stream as in the above example you also receive a `410` response.

### [Request](#tab/tabid-13)

[!code-bash[http-api-recreate-request](~/code-examples/http-api/write-event-append-deleted.sh?start=1&end=1)]

### [Response](#tab/tabid-14)

[!code-json[http-api-recreate-response](~/code-examples/http-api/write-event-append-deleted.sh?range=3-)]

* * *