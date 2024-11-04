---
title: Concepts
---

# Concepts

## Event

In EventStoreDB, an event is a factual occurrence from the past. It has an *event type* that headlines what happened and an *event body* that outlines the details:

<div style="display: flex; max-height: 200px;">

![](./images/what-are-events.png#light)

</div>

<div style="display: flex; max-height: 200px;">

![](./images/what-are-events-dark.png#dark)

</div>

An event usually represents a state change in an application, its entities, or business processes. In this case below:

1. Ada requested a $1,000 loan. 
2. Bob approved the loan.
3. A loan payment of $50 was received.


<div style="display: flex; max-height: 200px;">

![](./images/examples-of-event.png#light)

</div>

<div style="display: flex; max-height: 200px;">

![](./images/examples-of-event-dark.png#dark)

</div>

::: note
To learn more about how to perform basic operations around events, [click here](/clients/grpc/appending-events.html).
:::

## Event Log

The event log is an append-only sequence of events stored within the database. It is the ultimate source of truth, capturing every event appended to EventStoreDB:

<div style="display: flex; max-height: 200px;">

![](./images/event-log.png#light)

</div>

<div style="display: flex; max-height: 200px;">

![](./images/event-log-dark.png#dark)

</div>

It is append-only. New events are added exclusively to the end of the log—never at the start or in the middle:

<div style="display: flex; max-height: 200px;">

![](./images/event-log-is-append-only.png#light)

</div>

<div style="display: flex; max-height: 200px;">

![](./images/event-log-is-append-only-dark.png#dark)

</div>

Internally, the event log consists of a series of data files that store events in the exact order in which they were appended.

## Event Stream

EventStoreDB's event log can store billions of events, many of which might be unrelated.

Events are commonly arranged into smaller and logically related groups known as **event streams** to keep them organized and speed up retrieval.

Event stream is a sequenced group of events from the event log that is identified by a stream ID:

<div style="display: flex; max-height: 200px;">

![](./images/what-are-event-streams.png#light)

</div>

<div style="display: flex; max-height: 200px;">

![](./images/what-are-event-streams-dark.png#dark)

</div>

### Example of Event Stream

Consider managing a loan system with millions of loan applications and customer events. Searching this vast event log for specific loan or customer details is slow and cumbersome. Instead, organizing events into fine-grained streams using a unique Loan ID or Customer ID allows faster access. 

For example, a stream named "loan-123" would hold only the events related to Loan ID #123, while "customer-321" would contain events specific to Customer ID #321. This setup enables quick access to relevant events without combing through the entire event log.

### Event Stream Basics

Event stream consists of a **stream ID** (a simple string) and a **sequence of events**. 

Event stream improves the read and event retrieval performance through indexing. It also help enforce business constraints across related events using optimistic concurrency control.

To append an event to EventStoreDB, it must be associated with a specific stream ID. This process simultaneously appends the event to the event log and the specified stream:

<div style="display: flex; max-height: 300px;">

![](./images/how-events-are-appended.png#light)

</div>

<div style="display: flex; max-height: 300px;">

![](./images/how-events-are-appended-dark.png#dark)

</div>


::: note
To learn more about streams and its other basic features, [click here](/getting-started/features/eventstoredb-core-features.html#stream-indexing).

To learn more about streams, its structure and behaviors in detail, [click here](@server/features/streams.html).
:::

### Event Stream Design

In EventStoreDB, a stream typically represents an instance of an object, entity, or business process. For example:

| Stream ID | Description |
| --- | --- |
| loan-123 | Represents loan application ID#123 |
| customer-321 | Represents customer ID#321 |
| payment-222 | Represents payment ID#222 from external payment gateway |

However, there are cases where it makes sense for a stream to encompass a more extensive set of events. In these cases, streams may align to a broader set of events: 

| Stream ID | Description |
| --- | --- |
| loan | Represents all loan applications |
| customer | Represents all customers |
| payment-gateway | Represents all events from an external payment gateway  |

Designing streams and deciding which events belong to which stream involves balancing performance, scalability, and maintainability. Understanding the trade-offs is the starting point for designing streams that best suit organizational goals.

## Next Steps

- [EventStoreDB Training Video Series](https://www.youtube.com/playlist?list=PLWG5TK2D4U_Nb4rWdiQw2jNWYSaBm7lT_): Learn more about the details around events, streams, and the event log.

- [EventStoreDB Server Documentation - Stream](@server/features/streams.html): Gain a deeper understanding of how stream works.

- [EventStoreDB Client Documentation](/clients/grpc/getting-started.html): Understand how to work with events and streams programmatically.

- [An End-To-End Example With EventStoreDB](https://www.youtube.com/watch?v=vIUw-jKpKfQ) Watch how to build an application with EventStoreDB