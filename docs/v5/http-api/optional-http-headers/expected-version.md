

# Optional HTTP Headers: Expected Version

When you write to a stream you often want to use `Expected Version` to allow for optimistic concurrency with a stream. You commonly use this for a domain object projection.

i.e., "A write can succeed if I have seen everyone else's writes."

You set `ExpectedVersion` with the syntax `ES-ExpectedVersion: #`, where `#` is an integer version number. There are other special values available:

- `0`, the stream should exist but be empty when writing.
- `-1`, the stream should not exist when writing.
- `-2`, the write should not conflict with anything and should always succeed.
- `-4`, the stream or a metadata stream should exist when writing.

If the `ExpectedVersion` does not match the version of the stream, Event Store returns an HTTP 400 `Wrong expected EventNumber` response. This response contains the current version of the stream in an `ES-CurrentVersion` header.

In the following cURL command `ExpectedVersion` is not set, and it appends or create/append to the stream.

### [Request](#tab/tabid-1)

[!code-bash[http-api-write-event-request](~/code-examples/http-api/write-event.sh?start=1&end=1)]

### [Response](#tab/tabid-2)

[!code-json[http-api-write-event-response](~/code-examples/http-api/write-event.sh?range=3-)]

* * *

The stream 'newstream' has one event. If you append with an expected version of '3', you receive an error.

### [Request](#tab/tabid-3)

[!code-bash[http-api-write-event-wrong-version-request](~/code-examples/http-api/write-event-wrong-version.sh?start=1&end=1)]

### [Response](#tab/tabid-4)

[!code-json[http-api-write-event-wrong-version-response](~/code-examples/http-api/write-event-wrong-version.sh?range=3-)]

* * *

You can see from the `ES-CurrentVersion` header above that the stream is at version 0. Appending with an expected version of 0 works. The expected version is always the version of the last event known in the stream.

### [Request](#tab/tabid-5)

[!code-bash[http-api-write-event-version-request](~/code-examples/http-api/write-event-version.sh?start=1&end=1)]

### [Response](#tab/tabid-6)

[!code-json[http-api-write-event-version-response](~/code-examples/http-api/write-event-version.sh?range=3-)]

* * *