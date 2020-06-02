# HardDelete

The `ES-HardDelete` header controls deleting a stream. By default Event Store soft deletes a stream allowing you to later reuse that stream. If you set the `ES-HardDelete` header Event Store permanently deletes the stream.

:::: tabs
::: tab Request
<<< @/docs/server/5.0/http-api/sample-code/delete-stream/hard-delete-stream.sh#curl
:::
::: tab Response
<<< @/docs/server/5.0/http-api/sample-code/delete-stream/hard-delete-stream.sh#response
:::
::::

This changes the general behaviour from returning a `404` and the stream to be recreated (soft-delete) to the stream now return a `410 Deleted` response.
