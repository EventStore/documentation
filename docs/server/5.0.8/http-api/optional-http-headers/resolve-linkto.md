# Resolve LinkTo

When using projections you can have links placed into another stream. By default EventStoreDB always resolve `linkTo`s for you returning the event that points to the link. You can use the `ES-ResolveLinkTos: false` HTTP header to tell EventStoreDB to return you the actual link and to not resolve it.

You can see the differences in behaviour in the following cURL commands.

:::: tabs
::: tab Request
<<< @/docs/server/5.0.9/http-api/sample-code/resolve-links.sh#curl
:::
::: tab Response
<<< @/docs/server/5.0.9/http-api/sample-code/resolve-links.sh#response
:::
::::

::: tip
The content links are pointing to the original projection stream. The linked events are resolved back to where they point. With the header set the links (or embedded content) instead point back to the actual `linkTo` events.
:::

:::: tabs
::: tab Request
<<< @/docs/server/5.0.9/http-api/sample-code/resolve-links-false.sh#curl
:::
::: tab Response
<<< @/docs/server/5.0.9/http-api/sample-code/resolve-links-false.sh#response
:::
::::
