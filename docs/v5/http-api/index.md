---
outputFileName: index.html
---

# Overview

Event Store provides a native interface of AtomPub over HTTP. AtomPub is a RESTful protocol that can reuse many existing components, for example reverse proxies and a client's native HTTP caching. Since events stored in Event Store are immutable, cache expiration can be infinite. Event Store leverages content type negotiation and you can access appropriately serialised events can as JSON or XML according to the request headers.

## Compatibility with AtomPub

Event Store is fully compatible with the [1.0 version of the Atom Protocol](http://tools.ietf.org/html/rfc4287). Event Store adds extensions to the protocol, such as headers for control and custom `rel` links.

### Existing implementations

Many environments have already implemented the AtomPub protocol, which simplifies the process.

| Library     | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| NET (BCL)   | `System.ServiceModel.SyndicationServices`                         |
| JVM         | <http://java-source.net/open-source/rss-rdf-tools>                |
| PHP         | <http://simplepie.org/> or <https://github.com/fguillot/picoFeed> |
| Ruby        | <https://github.com/cardmagic/simple-rss>                         |
| Clojure     | <https://github.com/scsibug/feedparser-clj>                       |
| Go          | <https://github.com/jteeuwen/go-pkg-rss>                          |
| Python      | <http://code.google.com/p/feedparser/>                            |
| node.js     | <https://github.com/danmactough/node-feedparser>                  |
| Objective-C | <https://geekli.st/darvin/repos/MWFeedParser>                     |

> [!NOTE]
> These are not officially supported by Event Store.

### Content types

The preferred way of determining which content type responses Event Store serves is to set the `Accept` header on the request. As some clients do not deal well with HTTP headers when caching, appending a format parameter to the URL is also supported, for example, `?format=xml`.

The accepted content types for POST requests are:

-   `application/xml`
-   `application/vnd.eventstore.events+xml`
-   `application/json`
-   `application/vnd.eventstore.events+json`
-   `text/xml`

The accepted content types for GET requests are:

-   `application/xml`
-   `application/atom+xml`
-   `application/json`
-   `application/vnd.eventstore.atom+json`
-   `text/xml`
-   `text/html`
- `application/vnd.eventstore.streamdesc+json`
