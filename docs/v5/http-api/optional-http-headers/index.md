---
outputFileName: index.html
---

# Optional HTTP headers

<!-- TODO: Can Swagger replace this? And sub files -->

Event Store supports custom HTTP headers for requests. The headers were previously in the form `X-ES-ExpectedVersion` but were changed to `ES-ExpectedVersion` in compliance with [RFC-6648](http://tools.ietf.org/html/rfc6648).

The headers supported are:

| Header                                   | Description                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [ES-ExpectedVersion](~/http-api/optional-http-headers/expected-version.md) | The expected version of the stream (allows optimistic concurrency)                                 |
| [ES-ResolveLinkTo](~/http-api/optional-http-headers/resolve-linkto.md)     | Whether to resolve `linkTos` in stream                                                        |
| [ES-RequiresMaster](~/http-api/optional-http-headers/requires-master.md)   | Whether this operation needs to run on the master node                                          |
| [ES-TrustedAuth](~/http-api/optional-http-headers/trusted-intermediary.md) | Allows a trusted intermediary to handle authentication                                             |
| [ES-LongPoll](~/http-api/optional-http-headers/longpoll.md)                | Instructs the server to do a long poll operation on a stream read                                  |
| [ES-HardDelete](~/http-api/optional-http-headers/harddelete.md)            | Instructs the server to hard delete the stream when deleting as opposed to the default soft delete |
| [ES-EventType](~/http-api/optional-http-headers/eventtype.md)              | Instructs the server the event type associated to a posted body                                    |
| [ES-EventId](~/http-api/optional-http-headers/eventid.md)                  | Instructs the server the event id associated to a posted body                                      |
