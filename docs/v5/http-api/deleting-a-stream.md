---
sinceVersion: 2.0.1
---

# Deleting a stream

## Soft deleting

To delete a stream over the Atom interface, issue a `DELETE` request to the resource.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/delete-stream.sh)

::::
:::: tab Response

@[code lang=json transclude={3-12}](@/docs/v5/code-examples/http-api/delete-stream.sh)

::::
:::::

By default when you delete a stream, Event Store soft deletes it. This means you can recreate it later by setting the `$tb` metadata section in the stream. If you try to `GET` a soft deleted stream you receive a 404 response:

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/get-deleted-stream.sh)

::::
:::: tab Response

@[code lang=json transclude={3-12}](@/docs/v5/code-examples/http-api/get-deleted-stream.sh)

::::
:::::

You can recreate the stream by appending new events to it (like creating a new stream):

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/write-event-append.sh)

::::
:::: tab Response

@[code lang=json transclude={3-12}](@/docs/v5/code-examples/http-api/write-event-append.sh)

::::
:::::

The version numbers do not start at zero but at where you soft deleted the stream from

## Hard deleting

You can hard delete a stream. To issue a permanent delete use the `ES-HardDelete` header.

::: warning
A hard delete is permanent and the stream is not removed during a scavenge. If you hard delete a stream, you cannot recreate the stream.
:::

Issue the `DELETE` as before but with the permanent delete header:

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/hard-delete-stream.sh)

::::
:::: tab Response

@[code lang=json transclude={3-11}](@/docs/v5/code-examples/http-api/hard-delete-stream.sh)

::::
:::::

The stream is now permanently deleted, and now the response is a `410`.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/get-deleted-stream.sh)

::::
:::: tab Response

@[code lang=json transclude={3-12}](@/docs/v5/code-examples/http-api/get-deleted-stream.sh)

::::
:::::

If you try to recreate the stream as in the above example you also receive a `410` response.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/write-event-append-deleted.sh)

::::
:::: tab Response

@[code lang=json transclude={3-12}](@/docs/v5/code-examples/http-api/write-event-append-deleted.sh)

::::
:::::