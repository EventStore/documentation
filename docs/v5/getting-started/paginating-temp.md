## Paginating through Events
<!-- TODO:  Is this too much, speerate section, or just link to main docs? -->
To read a single page of events, you request the stream and then iterate through the event links by executing `GET` requests. This may feel inefficient at first but remember the event URIs and most of the page URIs are infinitely cachable.

You can also `GET` the events in the feed itself if by using `?embed=body` in the request. You can find further information on this [here](/v5/http-apireading-streams.md).

Sometimes your feed may span more than one atom page, and you need to paginate through the feed. You do this by following the relation links in the feed. To read a feed from the beginning to the end you send a `GET` request to the _last_ link and then continue to `GET` the _previous_ page links. Reverse the order of events by sending a `GET` request to the _first_ link and continuing to `GET` the _next_ page links.

<!-- TODO: Add an example -->