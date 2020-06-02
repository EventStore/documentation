---
title: Which API or SDK to use
---

:::: el-steps :active="4" align-center
::: el-step title="Install" description="Install, run, and write your first event"
:::
::: el-step title="Read" description="Read events and subscribe to changes"
:::
::: el-step title="Project" description="Use default and custom projections"
:::
::: el-step title="Choose SDK" description="Which SDK to use?"
:::
::::

# Which API or SDK to use

This getting started guide shows you how to get started with Event Store using the Atom publishing protocol as the primary interface. This final step covers the different APIs, and client SDKs Event Store has available with the aim of helping you choose which one suits your use case.

## TCP

Event Store offers a low-level protocol in the form of an asynchronous TCP protocol that exchanges protobuf objects. At present this protocol has adapters for .NET and the JVM.

### Event Store supported clients

-   [.NET Client / .NET Core](http://www.nuget.org/packages/EventStore.Client)
-   [JVM Client](https://github.com/EventStore/EventStore.JVM)

### Community developed clients

-   [Node.js](https://www.npmjs.com/package/event-store-client)
-   [Node.js](https://www.npmjs.com/package/ges-client)
-   [Node.js](https://github.com/nicdex/eventstore-node)
-   [Haskell](https://github.com/YoEight/eventstore)
-   [Erlang](https://bitbucket.org/anakryiko/erles)
-   [F#](https://github.com/haf/EventStore.Client.FSharp)
-   [Elixir](https://github.com/exponentially/extreme)
-   [Java 8](https://github.com/msemys/esjc)
-   [Maven plugin](https://github.com/fuinorg/event-store-maven-plugin)
-   [Rust](https://github.com/YoEight/eventstore-rs)
-   [Go](https://github.com/jdextraze/go-gesclient)
-   [PHP](https://github.com/prooph/event-store-client/)

## HTTP

Event Store also offers an HTTP-based interface, based specifically on the [AtomPub protocol](http://tools.ietf.org/html/rfc5023). As it operates over HTTP, this is less efficient, but nearly every environment supports it.

### Event Store supported clients

-   [HTTP API](/v5/http-api/index.md)

### Community developed clients

-   [PHP](https://github.com/dbellettini/php-eventstore-client)
-   [PHP](https://github.com/prooph/event-store-http-client/)
-   [Python](https://github.com/madedotcom/atomicpuppy)
-   [Ruby](https://github.com/arkency/http_eventstore)
-   [Go](https://github.com/jetbasrawi/go.geteventstore)

If you have a client to add, click the 'Improve this Doc' link on the top right of the page to submit a pull request.

## Which to use?

Many factors go into the choice of which of the protocols (TCP vs. HTTP) to use. Both have their strengths and weaknesses.

### TCP is faster

This speed especially applies to subscribers as events pushed to the subscriber, whereas with Atom the subscribers poll the head of the atom feed to check if new events are available. The difference can be as high as 2–3 times higher (sub 10ms for TCP, vs. seconds for Atom).

Also, the number of writes per second supported is often dramatically higher when using TCP. At the time of writing, standard Event Store appliances can service around 2000 writes/second over HTTP compared to 15,000-20,000/second over TCP. This increase might be a deciding factor if you are in a high-performance environment.

### AtomPub is more scalable for large numbers of subscribers

This scalability is due to the ability to use intermediary caching with Atom feeds. Most URIs returned by Event Store point to immutable data and are infinitely cachable. Therefore on a replay of a projection, much of the data required is likely available on a local or intermediary cache. This can also lead to lower network traffic.

Atom tends to operate better in a large heterogeneous environment where you have callers from different platforms. This is especially true if you have to integrate with different teams or external vendors. Atom is an industry standard and well-documented protocol whereas the TCP protocol is a custom protocol they would need to understand.

Most platforms have good existing tooling for Atom including feed readers. None of this tooling exists for analyzing traffic with the TCP protocol.

::: tip
Our recommendation would be to use AtomPub as your primary protocol unless you have low subscriber SLAs or need higher throughput on reads and writes than Atom can offer. This is due to the open nature and ease of use of the Atom protocol. Often in integration scenarios, these are more important than raw performance.
:::

## Next step

Congratulations! You've reached the end of our getting started guide, what's next?

-   **Want to use the .NET client?** [Find more here](/v5/dotnet-api/index.md).
-   **Want to use the HTTP API?** [Find out more here](/v5/http-api/index.md).
