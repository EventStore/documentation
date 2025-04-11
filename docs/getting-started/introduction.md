---
title: Introduction
---

# Introduction

## What is KurrentDB?

KurrentDB is an event-native database designed specifically to store, process, and deliver application state changes, known as events.

Each event captures a specific change in the state. Examples include when an order is placed, a payment is processed, or an item is shipped. By capturing all these incremental updates, KurrentDB captures temporal context and provides a complete audit trail of a business process.

KurrentDB offers the following features:

| Feature | Description                                                                                                               |
|---------|---------------------------------------------------------------------------------------------------------------------------|
| [Append-only Event Log](./concepts.md#event-log) | A durable, sequential, and immutable log that captures events in a consistent order.                                      |
| [Streams](./concepts.md#event-stream) | Groups and indexes events to organize and speed up retrieval.                                                             |
| [Subscriptions](@server/features/persistent-subscriptions.md) and [Connectors](@server/features/connectors/README.md) | Delivers events to external systems through push or pull options.                                                         |
| [Projection](@server/features/projections/README.md) | Transforms and filters events into different streams or state.                                                            |
| [Multiple Hosting Options](https://kurrent.io/downloads) | Fully managed with [Kurrent Cloud](/cloud/introduction.md), or self-managed on Linux, Windows, macOS, or with Docker. |
| [Client SDK](@clients/grpc/getting-started.md) | Available in Python, Java, .NET, Node.js, Go, and Rust.                                                                   |

::: note
To learn more about the concepts of KurrentDB, such as events, event log, and event stream, [click here](/getting-started/concepts.md).

To learn more about the features of KurrentDB, [click here](/getting-started/features.md).
:::

## Why KurrentDB?

Traditional databases often focus only on current state and overwrite data, which discards valuable information about the past and the events that shaped the current state.

In contrast, KurrentDB keeps a complete history of changes, providing organizations with richer, and more contextual data that supports deeper insights - critical in today’s AI and data-driven environment.

::: details Use Case: Machine Learning

A German tool manufacturer leveraged historical events from KurrentDB on manufacturing times and tool specifications (such as length and diameter) to [predict manufacturing durations for custom tools](https://www.kurrent.io/blog/from-data-to-insights-using-event-log-data-to-train-machine-learning-models). This prediction was then integrated into an online quote system, which automated the generation of instant, more accurate quotes—a significant improvement over the previous method of the sales team creating quotes based mainly on their experience.
:::

KurrentDB also includes additional features that make it simple to develop event-native applications that enable real-time updates and minimize system dependencies while maintaining data consistency.

::: details Use Case: Real-time Streaming

You can use KurrentDB to streamline your payment process. Holcim, a global construction material provider [replaced batch processing with real-time streaming of payment statuses](https://www.kurrent.io/case-studies/holcim) from SAP system to depots.  In doing so, Holcim eliminated the previous day-long wait for payment verification and order collection. 

These types of significant improvements in customer service and operational efficiency can provide a competitive edge regardless of industry.
:::

Finally, KurrentDB can reconstruct the current state of any object from its historical events. In doing so, KurrentDB provides the current and historical context that allows organizations to clearly understand the "what" and "why" (and "when") within a single system.

::: info Current State and Historical Events Representations

In a system, any object can represented in one of two distinct ways: by its current state, or by the historical events leading up to that state:

- **Current state** is a snapshot of the object right now, like a digital wallet's balance. 
- **Historical events** are the actions that led to this state, like a wallet's deposits and withdrawals.

Both perspectives are important: the current balance can answer the "what", while historical transactions answer the "why".

To learn more about this topic, [click here](/getting-started/evaluate/state-vs-event-based-data-model.html).
:::

## Who Uses KurrentDB?

Data engineers can provide context-rich events from KurrentDB to data pipelines to analyze historical and behavioral trends, uncovering patterns that traditional databases often miss. These patterns can, for example, reveal why a customer churned or highlight behaviors that lead to high-value contracts.

::: note
To learn more about KurrentDB's role in a data pipeline, [click here](/getting-started/evaluate/data-pipeline.md).
:::

Application developers can leverage EventStoreDB’s granular events to build real-time, distributed enterprise applications and break down tightly coupled systems. Events are typically simpler, self-contained, and independent. Unlike the tables and rows in traditional databases that are often interdependent with various functions.

::: details Use Case: Modernize Legacy Systems

Insureon, an independent marketplace for online delivery of small business insurance, used KurrentDB to [modernize its legacy monolithic system](https://www.kurrent.io/case-studies/insureon), which was brittle and challenging to deploy. With KurrentDB, Insureon could provide new solutions faster without sacrificing scalability. This dramatically improved the company's business creativity and agility.
:::

## Where to Use KurrentDB?

KurrentDB is valuable for critical enterprise applications and data pipelines with behavior-rich data, where interdependent business objects and processes interact in diverse ways over time. 

Industries such as finance, healthcare, supply chain, and manufacturing benefit from KurrentDB, as it supports flexible, scalable solutions with a complete audit trail. This enables businesses to maintain clear, comprehensive system oversight, which is essential for meeting compliance requirements and adapting to changing needs.

::: note
To learn more where KurrentDB fits in your business, [click here](/getting-started/evaluate/business-process-support.md).
:::

## Next Steps

- [How KurrentDB Supports your Business Processes](/getting-started/evaluate/business-process-support.md): Learn what KurrentDB can do for you. 

- [Kurrent Essentials](https://academy.kurrent.io/essentials): Understand fundamental concepts around KurrentDB.

- [KurrentDB Training Video Series](https://www.youtube.com/playlist?list=PLWG5TK2D4U_Nb4rWdiQw2jNWYSaBm7lT_): Receive step-by-step video tutorial to create a basic application.