---
sinceVersion: 2.0.1
---

# Deleting a stream

## Soft deleting

To delete a stream over the Atom interface, issue a `DELETE` request to the resource.

:::: el-tabs type="border-card"
::: el-tab label="Request"
<<< @/docs/server/5.0.9/http-api/sample-code/delete-stream/deleted-stream.sh
:::
::: el-tab label="Response"
<<< @/docs/server/5.0.9/http-api/sample-code/delete-stream/deleted-stream-response.txt
:::
::::

By default when you delete a stream, EventStoreDB soft deletes it. This means you can recreate it later by setting the `$tb` metadata section in the stream. If you try to `GET` a soft deleted stream you receive a 404 response:

:::: el-tabs type="border-card"
::: el-tab label="Request"
<<< @/docs/server/5.0.9/http-api/sample-code/delete-stream/get-deleted-stream.sh
:::
::: el-tab label="Response"
<<< @/docs/server/5.0.9/http-api/sample-code/delete-stream/get-deleted-stream-response.txt
:::
::::

You can recreate the stream by appending new events to it (like creating a new stream):

:::: el-tabs type="border-card"
::: el-tab label="Request"
<<< @/docs/server/5.0.9/http-api/sample-code/write-event-append.sh#curl
:::
::: el-tab label="Response"
<<< @/docs/server/5.0.9/http-api/sample-code/write-event-append.sh#response
:::
::::

The version numbers do not start at zero but at where you soft deleted the stream from

## Hard deleting

You can hard delete a stream. To issue a permanent delete use the `ES-HardDelete` header.

::: warning
A hard delete is permanent and the stream is not removed during a scavenge. If you hard delete a stream, you cannot recreate the stream.
:::

Issue the `DELETE` as before but with the permanent delete header:

:::: el-tabs type="border-card"
::: el-tab label="Request"
<<< @/docs/server/5.0.9/http-api/sample-code/delete-stream/hard-delete-stream.sh#curl
:::
::: el-tab label="Response"
<<< @/docs/server/5.0.9/http-api/sample-code/delete-stream/hard-delete-stream.sh#response
:::
::::

The stream is now permanently deleted, and now the response is a `410`.

:::: el-tabs type="border-card"
::: el-tab label="Request"
<<< @/docs/server/5.0.9/http-api/sample-code/get-deleted-stream.sh#curl
:::
::: el-tab label="Response"
<<< @/docs/server/5.0.9/http-api/sample-code/get-deleted-stream.sh#response
:::
::::

If you try to recreate the stream as in the above example you also receive a `410` response.

:::: el-tabs type="border-card"
::: el-tab label="Request"
<<< @/docs/server/5.0.9/http-api/sample-code/write-event-append-deleted.sh#curl
:::
::: el-tab label="Response"
<<< @/docs/server/5.0.9/http-api/sample-code/write-event-append-deleted.sh#response
:::
::::
