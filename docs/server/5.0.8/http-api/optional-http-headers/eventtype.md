# Optional HTTP Headers: EventType

When you write to a stream and don't the `application/vnd.eventstore.events+json/+xml` media type you must specify an event type with the event that you are posting. This isn't required with the custom media type as it's specified within the format itself.

You use the `ES-EventType` header as follows.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](docs/v5/code-examples/http-api/write-event.sh)

::::
:::: tab Response

@[code lang=json transclude={3-13}](docs/v5/code-examples/http-api/write-event.sh)

::::
:::::

If you view the event in the UI or with cURL it has the `EventType` of `SomeEvent`:

<!-- TODO: Does this make sense? If I can't use the custom media type -->

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](docs/v5/code-examples/http-api/read-event.sh)

::::
:::: tab Response

@[code lang=bash transclude={16-44}](docs/v5/code-examples/http-api/read-event.sh)

::::
:::::