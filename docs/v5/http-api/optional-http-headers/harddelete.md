# Optional HTTP Headers: HardDelete

The `ES-HardDelete` header controls deleting a stream. By default Event Store soft deletes a stream allowing you to later reuse that stream. If you set the `ES-HardDelete` header Event Store permanently deletes the stream.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/hard-delete-stream.sh)

::::
:::: tab Response

@[code lang=json transclude={3-11}](@/docs/v5/code-examples/http-api/hard-delete-stream.sh)

::::
:::::

This changes the general behaviour from returning a '404' and recreatable to the stream now return a `410 Deleted` response.