---
title: EventStoreDB Core Features
---

# EventStoreDB Core Features

## Stream Indexing

An EventStoreDB index entry is automatically created whenever an event is appended to the event log. The index uses the hash of the stream ID as the key, with the corresponding index entry as the value. Each entry consists of:

- the stream ID
- the event's number within the stream (also known as the version number or sequence number)
- the event's position within the log

<div style="display: flex; max-height: 400px;">

![](./images/conceptual-model-of-the-index.png#light)
    
</div>

<div style="display: flex; max-height: 400px;">

![](./images/conceptual-model-of-the-index-dark.png#dark)
    
</div>


Conceptually, this resembles a simple key-value store, where the stream's ID is the key, and the value is a set of pointers that direct you to the events within the event log.

These pointers don't store the events but reference their positions in the event log. It's important to remember that neither the stream nor the index physically holds the actual events.

## Guaranteed Consistent Ordering in Event Log and Stream

EventStoreDB ensures that all events in both the event log and its streams are consistently ordered by append time. Moreover, the event log maintains a global ordering of events across all streams.

<div style="display: flex; max-height: 400px;">

![](./images/consistent-event-ordering.png#light)

</div>

<div style="display: flex; max-height: 400px;">

![](./images/consistent-event-ordering-dark.png#dark)

</div>

Events within each stream also retain this global ordering, even though they are only a subset of events from the event log. This ordering is crucial for order-sensitive operations where the correct sequence of events is necessary. 

For example, running a complex fraud detection system relies on the precise order of events across multiple accounts and customer interactions.

## Immutable Events

EventStoreDB is designed to be immutable. Once an event is appended, its type, body, or any part of it cannot be modified. The event remains unchanged forever. 

The same principle applies to the event log and stream; once an event is appended, its position is locked. Events are never reordered or shifted within the log or stream. This immutability guarantees data integrity and consistency while enabling performance optimizations.

## Fine-grained Event Streams

EventStoreDB natively supports billions of streams. This enables a design that leverages fine-grained streams, providing precise control to track and isolate individual entities, actions, or processes—even when working at a massive scale with millions or even billions of them.

Organizing events into smaller, more focused streams enhances the speed and efficiency of reads and boosts system performance by processing only the relevant events.

For example, a business can maintain dedicated streams for each of its millions of customers. Each stream would contain the complete history of interactions across various systems, providing an unparalleled, detailed view of the customer journey.

Without fine-grained streams, events are lumped into longer, disorganized streams, leading to a mix of loosely related data. This makes locating and processing events for a specific customer slower and less efficient, as unrelated events have to be sifted through simultaneously.

## Optimistic Concurrency Control

With EventStoreDB, optimistic concurrency control can be applied to prevent accidental overwrites or lost updates due to race conditions.

This is especially important when multiple writers try to append to the same stream concurrently without checking if the stream has already changed. This is crucial to maintain any business constraints that must be enforced across the events in a stream.

For example, a financial institution has a stream representing a digital wallet where overdrawing is prohibited. The stream only contains deposit and withdrawal events regarding the wallet. EventStoreDB prevents someone from making thousands of huge withdrawals simultaneously to draw funds that are not available in reality.

<div style="display: flex; max-height: 250px;">

![](./images/optimistic-concurrency-control.png#light)

</div>

<div style="display: flex; max-height: 250px;">

![](./images/optimistic-concurrency-control-dark.png#dark)

</div>

To achieve this, when an event is appended to a stream, the event should include the stream's expected version number (essentially the stream's last known event number). If this version matches the current stream version, the append will be successful. If it doesn't match, the append fails due to a conflict, signaling that another writer has already appended an event and the stream has changed. This mechanism effectively avoids race condition issues, ensuring that no updates are lost or overwritten unintentionally.

Optimistic concurrency control also operates without requiring resource locks, meaning these protections come without the performance hit of managing locks. This helps maintain high performance even when multiple concurrent writes occur.