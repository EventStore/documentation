---
outputFileName: index.html
---

# Rolling snapshots

A rolling snapshot is a projection of the current state of an aggregate at a given point. It represents the state when all events to that point have been replayed. You use rolling snapshots as a heuristic to prevent the need to load all events for the entire history of an aggregate. One way of processing events in the event stream is to replay the events from the beginning of time until the end of the event stream.

The problem is that there may be a large number of events between the beginning of time and the current point. You can imagine that an event stream with a million or more events would be inefficient to load.

The solution is to use a rolling snapshot to place a denormalization of the state at a given point. It is then possible to play the events from that point forward to load the aggregate.

The process of rebuilding an aggregate changes when using rolling snapshots. Instead of reading forward from the beginning of time, you read _backwards_, pushing the events on to a stack until there are no more events left, or a snapshot is found. The snapshot is then applied and the successor events popped off the stack and applied, until the stack is empty.

> [!NOTE]
> Although this is an easy way to conceptualize how rolling snapshots work, this is a less than ideal solution in a production system for various reasons. The general recommendation is to store snapshots separately from events.

The snapshot itself is nothing more than a serialized form of the graph at that given point. By having the state of that graph at that point, replaying all the events prior to that snapshot can be avoided. Snapshots can be generated asynchronously by a process monitoring the Event Store.

Introducing Rolling Snapshots allows control of the worst case when loading from events. The maximum number of events that would be processed can be tuned to optimize performance for the system in question. With the introduction of Rolling Snapshots it is a relatively trivial process to achieve one to two orders of magnitude of performance gain. It is however important to remember that Rolling Snapshots should merely be an optimization; conceptually the event stream is still observed in its entirety.
