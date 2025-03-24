---
title: Concepts
---

# Concepts

## Event

In EventStoreDB, an event is a factual occurrence from the past. It has an *event type* that headlines what happened and an *event body* that outlines the details:

![What are events](./images/what-are-events.png#light =x200)

![What are events](./images/what-are-events-dark.png#dark =x200)

An event usually represents a state change in an application, its entities, or business processes. In this case below:

1. Ada requested a $1,000 loan. 
2. Bob approved the loan.
3. A loan payment of $50 was received.

![Examples of events](./images/examples-of-event.png#light)

![Examples of events](./images/examples-of-event-dark.png#dark)

::: note
To learn more about how to perform basic operations around events, [click here](/clients/grpc/appending-events.md).
:::

## Event Log

The event log is an append-only sequence of events stored within the database. It is the ultimate source of truth, capturing every event appended to EventStoreDB:

![Event log](./images/event-log.png#light)

![Event log](./images/event-log-dark.png#dark)

New events are added exclusively to the end of the log—never at the start or in the middle:

![Immutable log](./images/event-log-is-append-only.png#light)

![Immutable log](./images/event-log-is-append-only-dark.png#dark)

Internally, the event log consists of a series of data files that store events in the exact order in which they were appended.

## Event Stream

EventStoreDB's event log can store billions of events, many of which might be unrelated.

Events are commonly arranged into smaller, logically related groups known as **event streams** to keep them organized and speed up retrieval.

An event stream is a sequenced group of events from the event log that is identified by a stream ID:

![Event stream](./images/what-are-event-streams.png#light)

![Event stream](./images/what-are-event-streams-dark.png#dark)

### Example of Event Stream

Consider managing a loan system with millions of loan applications and customer events. Searching a single, vast event log for specific loan or customer details is slow and cumbersome. Instead, organizing events into fine-grained streams using a unique Loan ID or Customer ID allows faster access. 

For example, a stream named "loan-123" would hold only the events related to Loan ID #123, while "customer-321" would contain events specific to Customer ID #321. This setup enables quick access to relevant events without combing through the entire event log.

### Event Stream Basics

Event stream consists of a **stream ID** (a simple string) and a **sequence of events**. 

Event streams improve the read and event retrieval performance through indexing. It also helps enforce business constraints across related events using optimistic concurrency control.

To append an event to EventStoreDB, it must be associated with a specific stream ID. This process simultaneously appends the event to the event log and the specified stream:

![How events are appended](./images/how-events-are-appended.png#light)

![How events are appended](./images/how-events-are-appended-dark.png#dark)

::: note
To learn more about streams, its structure and behaviors in detail, [click here](@server/features/streams.md).
:::

### Event Stream Design

In EventStoreDB, a stream typically represents an instance of an object, entity, or business process. For example:

| Stream ID    | Description                                                        |
|--------------|--------------------------------------------------------------------|
| loan-123     | Represents loan application ID#123                                 |
| customer-321 | Represents customer ID#321                                         |
| payment-222  | Represents payment process ID#222 from an external payment gateway |

However, there are cases where it makes sense for a stream to encompass a more extensive set of events. In these cases, streams may align to a broader set of events: 

| Stream ID       | Description                                            |
|-----------------|--------------------------------------------------------|
| loan            | Represents all loan applications                       |
| customer        | Represents all customers                               |
| payment-gateway | Represents all events from an external payment gateway |

Designing streams and deciding which events belong to which stream involves balancing performance, scalability, and maintainability. Understanding the trade-offs is the starting point for designing streams that best suit organizational goals.

## Immutable Events

EventStoreDB is designed to be immutable. Once an event is appended, its type, body, or any part of it cannot be modified. The event remains unchanged forever. 

The same principle applies to the event log and stream; once an event is appended, its position is locked. Events are never reordered or shifted within the log or stream. This immutability guarantees data integrity and consistency while enabling performance optimizations.

::: note
While events can not be updated, streams can be truncated for housekeeping purposes. To learn how this works, [click here](@server/features/streams.md#deleting-streams-and-events)
:::

## Stream Indexing

An EventStoreDB index entry is automatically created whenever an event is appended to the event log. The index uses the hash of the stream ID as the key, with the corresponding index entry as the value. Each entry consists of:

- the stream ID
- the event's number within the stream (also known as the version number or sequence number)
- the event's position within the log

![Conceptual model of the index](./images/conceptual-model-of-the-index.png#light)

![Conceptual model of the index](./images/conceptual-model-of-the-index-dark.png#dark)

Conceptually, this resembles a simple key-value store, where the stream's ID is the key, and the value is a set of pointers that direct you to the events within the event log.

These pointers don't store the events but reference their positions in the event log. It's important to remember that neither the stream nor the index physically hold the actual events.

::: note
To learn more about how indexing works in detail, [click here](@server/configuration/indexes.md). 
:::

## Guaranteed Consistent Ordering in Event Log and Stream

EventStoreDB ensures that all events in both the event log and its streams are consistently ordered by append time. Moreover, the event log maintains a global ordering of events across all streams.

![Global order](./images/consistent-event-ordering.png#light)

![Global order](./images/consistent-event-ordering-dark.png#dark)

Events within each stream also retain this global ordering, even though they are only a subset of events from the event log. This ordering is crucial for order-sensitive operations where the correct sequence of events is necessary. 

For example, running a complex fraud detection system relies on the precise order of events across multiple accounts and customer interactions.

## Fine-grained Event Streams

EventStoreDB natively supports billions of streams. This enables a design that leverages fine-grained streams, providing precise control to track and isolate individual entities, actions, or processes—even when working at a massive scale.

Organizing events into smaller, more focused streams enhances the speed and efficiency of reads and boosts system performance by processing only the relevant events.

For example, a business can maintain dedicated streams for each of its millions of customers. Each stream would contain the complete history of interactions across various systems, providing an unparalleled, detailed view of the customer journey.

Without fine-grained streams, events are lumped into longer, disorganized streams, leading to a mix of loosely related data. This makes locating and processing events for a specific customer slower and less efficient, as unrelated events must be sifted through simultaneously.

## Optimistic Concurrency Control

With EventStoreDB, optimistic concurrency control can be applied to prevent accidental overwrites or lost updates due to race conditions.

This is especially important when multiple writers try to append to the same stream concurrently without checking if the stream has already changed. This is crucial to enforce business constraints across events in a stream.

For example, a financial institution has a stream representing a digital wallet where overdrawing is prohibited. The stream contains deposit and withdrawal events specific to the wallet. EventStoreDB prevents someone from making multiple withdrawals simultaneously to draw funds that are not available.

![Optimistic concurrency](./images/optimistic-concurrency-control.png#light)

![Optimistic concurrency](./images/optimistic-concurrency-control-dark.png#dark)

Optimistic concurrency control also operates without requiring resource locks, meaning these protections come without the performance hit of managing locks. This helps maintain high performance even when multiple concurrent writes occur.

::: note
To learn more about how to apply optimistic concurrency control, [click here](/clients/grpc/appending-events.md#handling-concurrency)
:::

## Next Steps

- [Event Store Essentials](https://academy.kurrent.io/essentials): Understand more about these features in this in-depth guide.

- [EventStoreDB Training Video Series](https://www.youtube.com/playlist?list=PLWG5TK2D4U_Nb4rWdiQw2jNWYSaBm7lT_): Learn more about the details around events, streams, and the event log.

- [EventStoreDB Server Documentation](@server/quick-start/README.md): Gain a deeper understanding about other EventStoreDB features.

- [EventStoreDB Server Documentation - Stream](@server/features/streams.md): Gain a deeper understanding of how stream works.

- [EventStoreDB Server Documentation - Indexing](@server/configuration/indexes.md): Learn more about how stream and indexing work in detail.

- [EventStoreDB Client Documentation](/clients/grpc/getting-started.md): Understand how to work with events and streams programmatically.

- [EventStoreDB Client Documentation - Handling Concurrency](/clients/grpc/appending-events.md#handling-concurrency): Understand how use optimistic concurrency control with an EventStoreDB client.

- [An End-To-End Example With EventStoreDB](https://www.youtube.com/watch?v=vIUw-jKpKfQ) Watch how to build an application with EventStoreDB