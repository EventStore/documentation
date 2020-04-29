---
outputFileName: index.html
sinceVersion: 2.1.0
---

# Optional HTTP Headers: LongPoll

You use the `ES-LongPoll` header to tell Event Store that when on the head link of a stream and no data is available to wait a period of time to see if data becomes available.

You can use this to give lower latency for Atom clients instead of client initiated polling.

Instead of the client polling every 5 seconds to get data from the feed the client sends a request with `ES-LongPoll: 15`. This instructs Event Store to wait for up to 15 seconds before returning with no result. The latency is therefore lowered from the poll interval to about 10ms from the time an event is written until the time the HTTP connection is notified.

You can see the use of the `ES-LongPoll` header in the following cURL command.

First go to the head of the stream.

### [Request](#tab/tabid-1)

[!code-bash[http-api-read-stream-request](~/code-examples/http-api/read-stream.sh?start=1&end=1)]

### [Response](#tab/tabid-2)

[!code-json[http-api-read-stream-response](~/code-examples/http-api/read-stream.sh?range=3-46,46-46,85-&highlight=23-23)]

* * *

Then fetch the previous `rel` link `http://127.0.0.1:2113/streams/newstream/2/forward/20` and try it. It returns an empty feed.

### [Request](#tab/tabid-3)

[!code-bash[http-api-get-forward-link-request](~/code-examples/http-api/get-forward-link.sh?start=1&end=1)]

### [Response](#tab/tabid-4)

[!code-json[http-api-get-forward-link-response](~/code-examples/http-api/get-forward-link.sh?range=3-)]

* * *

The entries section is empty (there is no further data to provide). Now try the same URI with a long poll header.

### [Request](#tab/tabid-5)

[!code-bash[http-api-longpoll-request](~/code-examples/http-api/longpoll.sh?start=1&end=1)]

* * *

If you do not insert any events into the stream while this is running it takes 10 seconds for the HTTP request to finish. If you append an event to the stream while its running you see the result for that request when you append the event.
