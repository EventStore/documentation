# Optional HTTP Headers: Resolve LinkTo

When using projections you can have links placed into another stream. By default Event Store always resolve `linkTo`s for you returning the event that points to the link. You can use the `ES-ResolveLinkTos: false` HTTP header to tell Event Store to return you the actual link and to not resolve it.

You can see the differences in behaviour in the following cURL commands.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/resolve-links.sh)

::::
:::: tab Response

@[code lang=json transclude={3-46}](@/docs/v5/code-examples/http-api/resolve-links.sh)

::::
:::::

::: tip
The content links are pointing to the original projection stream. The linked events are resolved back to where they point. With the header set the links (or embedded content) instead point back to the actual `linkTo` events.
:::

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/http-api/resolve-links-false.sh)

::::
:::: tab Response

@[code lang=json transclude={3-46}](@/docs/v5/code-examples/http-api/resolve-links-false.sh)

::::
:::::