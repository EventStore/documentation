---
order: 3
---

# Migrating data

When replacing a self-hosted KurrentDB cluster with the managed cluster in Kurrent Cloud, you might need to migrate the data, so your workloads can switch to the cloud cluster.

Currently, the only way to migrate data to the cloud cluster or instance is live migration by replication. Live migration is done by reading events from the source database (from `$all`) using a client protocol (TCP or gRPC) and then writing those events to the target database.

## Limitations

Consider the following limitations of live migration to understand if it will work for you.

### Write performance

If the target database must get events in exactly the same order as they are in the source database, it's impossible to use concurrent writers. Therefore, the speed of replication will be limited by how much time it takes to append one event to the cloud cluster. For example, if it takes 5 ms to append one event, replicating one million events will take about an hour.

In case your system only requires events to be ordered within a stream, and you have a lot of streams; it is possible to use concurrent writers. As those writers get events partitioned by stream name, the events order in each stream will be kept, but the global order will not. The advantage of using concurrent partitioned writes is performance increase. For example, six writers on a C4-sized instance would give you over 1000 events per second replication speed. In that case, in one hour you can replicate four million events, not one.

### Write load on the source

If the source cluster keeps getting new events appended to its database, ensure that the number of events appended to the source database is significantly less than the number of replicated events for a given time period. The goal there is to ensure that the replication process will ever finish. For example, when you see one million new events written to the source cluster per hour, and you observe one million events being replicated per hour, the replication will never finish.

### System metadata

When reading events from KurrentDB, you get several system metadata properties in the event structure on the client side:

- Event number (position of the event in the stream)
- Created date (timestamp when the event was appended to the log)
- Commit position (physical event position in the global log)

The event number in the target database will start from zero, although it could be any number in the source database if the stream was ever truncated or deleted.

As all the events written to the target database will be "new", the _Created date_ timestamp will be set to the moment when the event was replicated.

Due to the fact that in the source database the global log has gaps caused by deleted or truncated streams, as well as expired events, the commit position in the target database will not be the same for all events.

## Effect on workloads

In addition to the points mentioned in the previous section, keep in mind that changes in event number and commit position will affect your subscriptions.

For catch-up subscriptions, you will have to ensure to provide new checkpoints when moving those workloads to the replicated database.

For persistent subscriptions, you'd need to re-create them in the replicated database, with start position that corresponds with the last known persistent subscription checkpoint in the source database.

The same applies for custom JavaScript projections, which emit new events, except of those that emit links.

Links will not be replicated, as all the system events get filtered out (except stream metadata events). Therefore, all the links would normally be recreated. For example, if you use a category projection and `$ce` streams, those streams will be re-created by the system projection in the target database. In case you have custom projections, which emit links, those projections need to be recreated and started in the target database, so they can recreate all the links.

## Executing the migration

Kurrent provides a tool that allows you to replicate events between two clusters or instances. The tool is called Kurrent Replicator, and it has its own [documentation website](https://replicator.eventstore.org).

::: warning
Kurrent Replicator is an Open Source Software, provided as-is, without warranty, and not covered by the Kurrent support contract that you might have.
:::

### Deployment

You need to run the replication tool on your own infrastructure. The primary condition is that the replicator must be able to reach both source and target KurrentDB clusters. For example, if you replicate from a self-hosted cluster in AWS to Kurrent Cloud in AWS, you'd need to peer between the VPC of the self-hosted cluster and the Kurrent Cloud network. We provide [detailed instructions](https://replicator.eventstore.org/docs/deployment/) about running the replicator in Kubernetes and using Docker Compose.

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

### Example scenario

Here are the steps, which you can perform to migrate in one go:

- Configure and deploy ES Replicator
- Wait until it gets in to the restart loop after all the historical events are replicated
- Stop all the workloads, which write to the source database
- Ensure all the remaining events are replicated, then stop the replicator
- Ensure that all your subscriptions processed all the events in the source database
- Record all the necessary checkpoints, or have the ability to subscribe from _now_ in your subscriptions
- Move workloads with subscriptions to the target cluster
- Move workloads that append events to the target cluster

Another option is to move the subscriptions first:

- Configure and deploy Kurrent Replicator
- Wait until it gets in to the restart loop after all the historical events are replicated
- Stop all the workloads, which write to the source database
- Stop the subscription workload, and find the corresponding checkpoint value in the target database (stream position or global position in `$all`)
- Migrate the subscription workload to the target cluster, using the new checkpoint

As the replication process will continue endlessly, you can move some of the subscriptions first, ensure that everything works as expected, then continue by moving more subscriptions as well as workloads, which append events.

## More information

Find out more about replicator features, limitations, as well as deployment guidelines [in the documentation](https://replicator.eventstore.org).

If you experience an issue when using Replicator, or you'd like to suggest a new feature, please open an issue in the [GitHub project](https://github.com/EventStore/replicator).
