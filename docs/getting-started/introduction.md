---
title: Introduction
---

# Introduction

## What is EventStoreDB?

EventStoreDB is an event-native database designed specifically to store, process, and deliver application state changes, known as events.

Each event captures a specific change in an application’s state, like placing an order, processing a payment, or shipping an item. By capturing these distinct, incremental updates, EventStoreDB provides a record of each step in a business process.

EventStoreDB offers the following features:

| Feature | Description |
|---------|-------------|
| [Append-only Event Log](./concepts.md#event-log) | A durable, sequential, and immutable log that captures events in a consistent order. |
| [Streams](./concepts.md#event-stream) | Groups and indexes events to organize and speed up retrieval. |
| [Subscription](@server/features/persistent-subscriptions.md) and [Connectors](@server/features/connectors/) | Delivers events to external systems through push or pull options. |
| [Projection](@server/features/projections/) | Transforms and filters events into different streams or state. |
| [Multiple Hosting Options](https://eventstore.com/downloads) | Fully managed with [Event Store Cloud](/cloud/), or self-managed on Linux, Windows, macOS, or with Docker. |
| [Client SDK](@clients/grpc/getting-started.md) | Available in Python, Java, .NET, Node.js, Go, and Rust. |

::: note
To learn more about the concepts of EventStoreDB, such as events, event log, and event stream, [click here](/getting-started/concepts.md).

To learn more about the features of EventStoreDB, [click here](/getting-started/features.md).
:::

## Why EventStoreDB?

Traditional databases often focus on the current state and do this by overwriting data, discarding valuable information about the past.

In contrast, EventStoreDB keeps a complete history of changes, providing organizations with richer, and more contextual data that supports deeper insights - critical in today’s AI and data-driven environment.

EventStoreDB also includes additional features that make it simple to develop event-native applications that enable real-time updates and minimize system dependencies while maintaining data consistency.

Finally, EventStoreDB can reconstruct the current state of any object from its historical events, providing the best of both current and historical representations to answer the "what" and "why" within a single system.

::: info Current State and Historical Events Representations

In a system, any object can represented in one of two distinct ways: by its current state, or by the historical events leading up to that state:

- **Current state** is a snapshot of the object right now, like a digital wallet's balance. 
- **Historical events** are the actions that led to this state, like a wallet's deposits and withdrawals.

Both perspectives are important: the current balance can answer the "what", while historical transactions answer the "why".

To learn more about this topic, [click here](/getting-started/additional-reading/state-vs-event-based-data-model.html).
:::

## Who Uses EventStoreDB?

Data engineers can provide context-rich events from EventStoreDB to data pipelines to analyze historical and behavioral trends, uncovering patterns that traditional databases often miss. These patterns can, for example, reveal why a customer churned or highlight behaviors that lead to high-value contracts.

::: note
To learn more about EventStoreDB's role in a data pipeline, [click here](/getting-started/additional-reading/role-of-eventstoredb-in-a-data-pipeline.html).
:::

Application developers can leverage EventStoreDB’s granular events to build real-time, distributed enterprise applications and break down tightly coupled systems. Events are typically simpler, self-contained, and independent. Unlike the tables and rows in traditional databases that are often interdependent with various functions.

## Where to Use EventStoreDB?

EventStoreDB is valuable for critical enterprise applications and data pipelines with behavior-rich data, where interdependent business objects and processes interact in diverse ways over time. 

Industries such as finance, healthcare, supply chain, and manufacturing benefit from EventStoreDB, as it supports flexible, scalable solutions with a complete audit trail. This enables businesses to maintain clear, comprehensive system oversight, which is essential for meeting compliance requirements and adapting to changing needs.

::: note
To learn more where EventStoreDB fits in your business, [click here](/getting-started/additional-reading/where-eventstoredb-fits-in-your-business.html).
:::

## Next Steps

- [Key Benefits of EventStoreDB](/getting-started/additional-reading/key-benefits-of-eventstoredb.html): Learn what EventStoreDB can do for you. 

- [Event Store Essentials](https://academy.eventstore.com/essentials): Understand fundamental concepts around EventStoreDB.

- [EventStoreDB Training Video Series](https://www.youtube.com/playlist?list=PLWG5TK2D4U_Nb4rWdiQw2jNWYSaBm7lT_): Receive step-by-step video tutorial to create a basic application.