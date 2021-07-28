---
title: "Event Store Replicator"
date: 2021-06-09
author: "Alexey Zimarev"
kind: "Article"
original: "https://www.eventstore.com/blog/event-store-replicator"
tags:
- Tools
---

After customers started using Event Store Cloud, we began receiving questions about migrating their existing databases to the cloud. Back then, we didn't have an answer to that question, although we expected it.

When talking to customers daily, we understand that each customer case is unique. Still, we have a set of attributes that allow us to find out the best solution if it's available. Those attributes are, for example:

*   The database size, which could be large (several terabytes) or relatively small
*   The number of unscavenged events, which could be, for example, stats events
*   The number of unnecessary events that aren't explicitly deleted but are also not needed

For large databases, where all the data must be migrated, it's not easy to create a realistic live migration scenario. Currently, live migration can only be done by reading events from the source database (from `$all`) using a client protocol and then writing those events to the target database. When there's a requirement to keep the order of events intact, events must be written to the target database one by one, as EventStoreDB doesn't support multi-stream transactional writes. Then, we hit the limitation of how fast a single write can go and multiply it by the number of events to copy. If it takes 5 ms to write one event, it's impossible to go beyond copying more than 250 events per second, keeping the global order. It gives us an idea of how fast (or slow) one can copy a larger database. For example, 1 million events would be replicated in an hour, and 100 million events would take more than four days to copy.

Another issue to consider is that if the source database still gets new writes during the live migration, the speed of the copying process needs to exceed the rate at which new events get added to the source database. For example, if you copy 250 events per second and append 250 events per second to the source, the copying process will not move forward the slightest bit.

With all those limitations in mind, we still have a demand to migrate mid- to small-size databases with some millions of events. As I mentioned previously, we see cases when customers have accumulated numerous deleted and useless events, which can be ignored during the migration. Since the speed of appending new events to the target database is the apparent bottleneck, the fewer events we need to copy, the faster the migration will complete.

In addition, we keep getting questions about tooling that could help solve one of the most troublesome issues of production event-sourced systems, which is the event schema versioning and migration. In his book "Versioning in an Event Sourced System", Greg Young promotes the idea that all the data can be migrated from one store to another as part of the new software version deployment process. Of course, again, it very much depends on the database size. It's not feasible to migrate a few terabytes of data for each release when you do a few releases per week. Then again, not all systems are like that. A vast majority of business applications that use EventStoreDB as an event store have much smaller databases. However, such a migration requires tooling, which we never provided. Until today!

Meet Event Store Replicator, the tool that you can use for the following scenarios:

*   Live migration of EventStoreDB from on-premises to Event Store Cloud
*   Replicating data between two EventStoreDB clusters, no matter where they are hosted
*   Filter events by stream name and event type during the migration
*   Filter out events, which should've been scavenged
*   Transform events, including stream name or event type change, change the event schema and data, or even enrich events using external data sources

The replicator can use both TCP and gRPC protocol for both source and target so that you can replicate between different EventStoreDB versions.

The replication process looks like this:

![Overview](./images/replicator/replicator-1.svg)

Internally, we separated each step into its own pipe, then connected all the pipes together:

![Overview](./images/replicator/replicator-2.svg)

Both prepare and sink pipe have buffers, which allows us to balance the performance of those steps, so they don't depend so much on each other. It's not usual that the prepare pipe uses more time compared to the sink pipe. However, it might be the case if you use the externalised HTTP event transformation.

When it comes to writing events to the sink, we have two options. The default option is to use a single writer, so all the events get written to the target cluster one by one, maintaining the original global order of events of the source cluster. The other option is to [partition writes](https://replicator.eventstore.org/docs/features/sinks/writers/) by stream name. In this case, the global order can't be maintained, but all the events in each individual stream would be appended in order. Partitioned sink allows increasing the number of writers, which run in parallel. As a result, the overall performance of the replication process increases significantly. For example, on the same cluster that uses 5 ms on average for a single write, increasing the number of writers to six increases the overall performance from 250 to 1000 events per second.

Within the prepare pipe, we first execute filters. The default filter is what we call a "scavenge filter". It filters out events, which were previously deleted, but remain in the database for some reason. During the replication, we also listen to stream metadata updates that happen in real-time and react accordingly. For example, if you delete a stream after the replication has started, we won't replicate any more events from that stream. Eventually, the replication process will reach the metadata event in $all and will remove the stream in the target cluster if it exists.

The next step in the prepare pipe is event transformation. The default transformer just uses the original event as-is, with one addition. If the event is serialised to JSON, we will add these fields to metadata:

*   `$originalCreatedDate`
*   `$originalEventNumber`
*   `$originalEventPosition`

We included two additional transformers to the tool, which give you more flexibility. The first one is the JavaScript stateless transform that allows you to change the event type and stream and manipulate the event schema, data and metadata. You need to write your own JavaScript function to do this. If the function returns nothing, we will not replicate the event, so you can use [JS transformer](https://replicator.eventstore.org/docs/features/transforms/js/) as an advanced filter. The other transformer can use an external HTTP endpoint to transform events. You can use a local HTTP server, which you host yourself, or a serverless function. The [HTTP transformer](https://replicator.eventstore.org/docs/features/transforms/http/) allows you to do more advanced transformations, for example, enriching events with data from external sources, like databases.

Practically, you need to run the replicator on your own infrastructure. The primary condition is that the replicator must be able to reach both source and target EventStoreDB clusters. For example, if you replicate from a self-hosted cluster in AWS to Event Store Cloud in AWS, you'd need to peer between the VPC of the self-hosted cluster and the Event Store Cloud network. We provide [detailed instructions](https://replicator.eventstore.org/docs/deployment/) about running the replicator in Kubernetes and using Docker Compose.

For the cloud migration scenario, the simplest case that involves no filtering (except scavenge) and transformations, you can use the following configuration:

```yaml
replicator:
  reader:
    connectionString: ConnectTo=tcp://admin:changeit@my-instance.acme.company:1113; HeartBeatTimeout=500; UseSslConnection=false;
    protocol: tcp
  sink:
    connectionString: esdb+discover://username:password@clusterid.mesdb.eventstore.cloud:2113
    protocol: grpc
    partitionCount: 1
    bufferSize: 1000
  scavenge: false
  transform: null
  filters: []
  checkpoint:
    path: "./checkpoint"
```

As the replication process runs continuously until you stop it, you can test the source cluster data and gradually move read-only workloads to it, like subscriptions. When you confirm that everything looks fine from the target database, you can move all the other workloads to the new cluster.

Find out more about replicator features, limitations, as well as deployment guidelines [in the documentation](https://replicator.eventstore.org/).

Disclaimer: Event Store Replicator is an open-source software, provided as-is, without any warranty, and is not covered by Event Store support contract. If you experience an issue when using Replicator, or you'd like to suggest a new feature, please open an issue in the [GitHub project](https://github.com/EventStore/replicator).
