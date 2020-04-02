---
outputFileName: index.html
---

# Optional HTTP Headers: Resolve LinkTo

When using projections you can have links placed into another stream. By default Event Store always resolve `linkTo`s for you returning the event that points to the link. You can use the `ES-ResolveLinkTos: false` HTTP header to tell Event Store to return you the actual link and to not resolve it.

You can see the differences in behaviour in the following cURL commands.

### [Request](#tab/tabid-1)

[!code-bash[http-api-resolve-links-request](~/code-examples/http-api/resolve-links.sh?start=1&end=1)]

### [Response](#tab/tabid-2)

[!code-json[http-api-resolve-links-response](~/code-examples/http-api/resolve-links.sh?range=3-)]

* * *

> [!NOTE]
> The content links are pointing to the original projection stream. The linked events are resolved back to where they point. With the header set the links (or embedded content) instead point back to the actual `linkTo` events.

### [Request](#tab/tabid-3)

[!code-bash[http-api-resolve-links-false-request](~/code-examples/http-api/resolve-links-false.sh?start=1&end=1)]

### [Response](#tab/tabid-4)

[!code-json[http-api-resolve-links-false-response](~/code-examples/http-api/resolve-links-false.sh?range=3-)]

* * *