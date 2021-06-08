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
