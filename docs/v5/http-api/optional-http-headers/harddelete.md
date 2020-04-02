---
outputFileName: index.html
---

# Optional HTTP Headers: HardDelete

The `ES-HardDelete` header controls deleting a stream. By default Event Store soft deletes a stream allowing you to later reuse that stream. If you set the `ES-HardDelete` header Event Store permanently deletes the stream.

### [Request](#tab/tabid-1)

[!code-bash[http-api-hard-delete-request](~/code-examples/http-api/hard-delete-stream.sh?start=1&end=1)]

### [Response](#tab/tabid-2)

[!code-json[http-api-hard-delete-response](~/code-examples/http-api/hard-delete-stream.sh?range=3-)]

* * *

This changes the general behaviour from returning a '404' and recreatable to the stream now return a `410 Deleted` response.