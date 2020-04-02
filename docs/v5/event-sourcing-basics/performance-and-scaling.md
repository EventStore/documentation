---
outputFileName: index.html
---

# Performance and scalability

There are also architectural benefits to not deleting data. The storage system becomes an append-only architecture. Append-only architectures typically distribute and scale more easily than updating architectures because there are fewer locks to deal with.

A common performance optimization is the use of "horizontal partitioning" (or "sharding"), where the same schema will exist in many places and a key within the data will determine in which place the data exists.

One problem with horizontal partitioning with an RDMS is that it is necessary to define the key with which the partitioning should operate. This problem goes away when using events. Aggregate IDs are the only partition point in the system. No matter how many aggregates exist or how they may change structures, the aggregate ID associated with events is the only partition point in the system. Horizontally partitioning an Event Store is a simpler process.

## Saving objects

When dealing with a stereotypical system utilizing an RDMS it can be complex to figure out what has changed within the aggregate. Many tools have been built to help alleviate the pain that arises from this task but is the need for a tool a sign of a bigger problem?

Most Object-relational mapping (ORM) tools figure out the changes that occurred within a graph. They do this by maintaining two copies of a given graph. The first held in memory and the second for applications to interact with. When it's time to save, the database logic traverses the graph that the code has interacted with and uses the copy of the original graph to determine what has changed while the graph was in use by the code. These changes are then saved to the data storage system.

In a system that is Domain Event centric, the aggregates are themselves tracking strong events as to what has changed within them. There is no complex process for comparing to another copy of a graph. Instead ask the aggregate for its changes. The operation to ask for changes is far more efficient than having to figure out what has changed.

## Loading objects

A similar issue exists when loading objects. Consider the work that involved with loading a graph of objects in a stereotypical relational database backed system. Often there are many queries that must be issued to build the aggregate. To help minimize the latency cost of these queries many ORMs have introduced a heuristic of "Lazy Loading" also known as "Delayed Loading", where a proxy is given in lieu of the real object. The data is only loaded when some code attempts to use that particular object.

Lazy loading is useful because often a given behavior will only use a certain portion of data out of the aggregate and it prevents the developer from having to explicitly represent which data that is while reducing the cost of the loading of the aggregate. It is this need for reducing cost that shows a problem.

> Aggregates are considered as a whole represented by the Aggregate Root. Conceptually an Aggregate is loaded and saved in its entirety. <cite>Evans, 2001</cite>

Conceptually it is much easier to deal with the concept of an aggregate loaded and saved in its entirety. The concept of lazy loading is not a trivial one and especially when optimizing use cases. The heuristic is needed because loading full aggregates from a relational database is operationally too slow.

When dealing with events as a storage mechanism things are different. There is one thing stored, events. Load all the events for an aggregate and replay them. There can only ever be a single query on the system. There is no need to attempt to implement things like lazy loading.
