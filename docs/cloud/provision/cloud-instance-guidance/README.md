# Cloud instance sizing guide

Use this guide to assess the needs of your application performance, compared with the capability of a given EventStoreDB instance in Event Store Cloud.

## Cloud instance performance  

Performance of the managed EventStoreDB cluster in ES Cloud depends primarily on the instance size for cluster members. In addition, the disk size could affect the instance IOPS limit when it comes to reading and writing events to the database.
We rate instances based on the desired usage. Our current rating include:

* Micro 
* Development
* Production 

### Throughput

A wide variety of factors impact total Event throughput on a cluster, including Events per batch and Event size and the active number of streams in the working set.

We have profiled using single event transactions for the production rated clusters and confirmed they can operate at 20k tx/sec throughput (concurrent read and write) given the correct configuration for concurrent clients, a given disk size, and Working Set. It's possible to increase the throughput by using batched write operations, but the impact of batching heavily depends on the batch size in bytes. Before placing any application into production, it is vital to perform a performance test on the planned instance to assess how these factors apply to your application.

The **Working Set** is the number of streams being read from and written to concurrently. It's essential to recognise that writing one million events into one million streams is a very different scenario than writing one million events into a single stream.

### Performance vs self hosted

When load testing an application against Event Store Cloud EventStoreDB clusters, performance may differ from a self hosted solution when utilizing a similar instance size.

Event Store Cloud utilizes ZFS to ensure filesystem integrity/safety as well as block level compression, to ensure the minimization of IOPs and a lower storage cost for data hosted.

ZFS requires additional CPU and memory to provide these capabilities, as such a self hosted comparison should utilize a similar configuration, in order to provide a relevant comparison.

### Micro (F1) instance sizes

This rating is meant to enable a low cost point of entry for developers experimenting with Event Store Cloud, and to satisfy the use case of some customers that require multi-tenancy and whose application presents an extremely low volume workload (10-100) events a day per database (cluster). This size utilizes a burstable CPU class, which is how we achieve this goal across all supported public clouds.

Due to the burstable CPU class, CPU shares are limited, this results in the following implications:

- EventStoreDB runs on the .Net runtime (managed) this means CPU time is required for garbage collection operations, if the shares are not available and allocations are increasing this may result in client timeouts to the cluster, or an OOM condition.
- CPU shares are required to maintain the cluster state topology via constant gossip message propagation. CPU shares are utilized to maintain cluster state even when the cluster is not under load.
- EventStoreDB requires CPU cycles to maintain indexes, and for other maintenance processes, this means that performance may appear to degrade over time with growth of the database.
- If continuous load is applied it may be possible to exhaust the allowed CPU shares per time cycle, resulting in client timeouts or OOM conditions.
- When ESC exited Preview and went into GA we increased the size of the backing instance type as the original F1 instance size was too small to provide enough memory and CPU shares to maintain cluster state adequately even at extremely low volumes. A backup and restore is required to move to the new backing size.

## Sizes

| Size | Rating | Working Set (streams) | Disk size (min) | Concurrent clients (max) |
| :--- | :----- | :---------- | :-------- | :--- |
| **F1** | Micro | 100k | 50 GB |  |
| **C4** | Development | 500k | 100 GB |  |
| **M8** | Development | 1M | 250 GB |  |
| **M16** | Development / Light Production | 6M | 500 GB | 20 |
| **M32** | Production | 12M | 1 TB | 250 |
| **M64** | Production | 30M | 2 TB | 500 |
| **M128** | Production | 62M | 4 TB | 500 |
