# Optional HTTP headers: EventID

When you write to a stream and don't use the `application/vnd.eventstore.events+json/+xml` media type, you need to specify an event ID with the event you post. This is not required with the custom media type as it is specified within the format (there is an `EventId` on each entry in the format). Event Store uses `EventId` for impotency.

You can include an event ID on an event by specifying this header.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/write-event.sh)

::::
:::: tab Response

@[code lang=json transclude={3-12}](@/docs/v5/code-examples/http-api/write-event.sh)

::::
:::::

If you don't add an `ES-EventId` header on an append where the body is considered the actual event (e.g., not using `application/vnd.eventstore.events+json/+xml`) Event Store generates a unique identifier for you and redirects you to an idempotent URI where you can post your event. If you can create a UUID then you shouldn't use this feature, but it's useful when you cannot create a UUID.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/write-event-no-id.sh)

::::
:::: tab Response

@[code lang=json transclude={3-15}](@/docs/v5/code-examples/http-api/write-event-no-id.sh)

::::
:::::

Event Store returned a `307 Temporary Redirect` with a location header that points to a generated URI that is idempotent for purposes of retrying the post.