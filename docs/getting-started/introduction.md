---
title: Introduction
---

# Introduction

## What is EventStoreDB?

EventStoreDB is an event-native database designed specifically to store, process, and deliver application state changes, known as events.

Each event captures a specific change in an application’s state, like placing an order, processing a payment, or shipping an order. Capturing distinct, incremental update in a business process.

EventStoreDB offers the following features:

| Feature | Description |
|---------|-------------|
| Append-only Log | Audit trail that captures all historical changes as events for one or more systems. |
| Streams | Groups and indexes events to organize and speed up retrieval. |
| Subscription and Connectors | Delivers events to external systems through push or pull options. |
| Projection | Transforms and filters events into different streams or state. |
| Multiple Hosting Options | Fully managed with [Event Store Cloud](https://developers.eventstore.com/cloud/), or self-managed on Linux, Windows, macOS, or with Docker. |
| Client SDK | Available in Python, Java, .NET, Node.js, Go, and Rust. |

## Why EventStoreDB?

Traditional databases typically focus on storing the current state(\*) and often lack the means to manage historical events(\*) effectively.

EventStoreDB, however, keeps a complete history of changes, giving organizations access to deeper insights needed for adaptability in today’s AI and data-driven environment.

EventStoreDB also includes additional event-native features that enables real-time updates, reduces system dependencies, and maintains data consistency, enhancing flexibility, scalability, and maintainability across applications.

Finally, EventStoreDB can reconstruct the current state from historical events, delivering the best of both worlds by answering the "what", "how", and "why" within a single system.

::: info * Current State vs Historical Events

In a system, any object can be represented in two distinct ways: by its current state, or by the historical events leading up to that state:

- **Current state** is a snapshot of the object right now, like a digital wallet's balance. 
- **Historical events** are the actions taken over time to reach this state, such as deposits and withdrawals.

Both perspectives are important: the current balance can answer the "what", while historical transactions answer the "how" and "why".

:::

## Who Uses EventStoreDB?

Data engineers can provide context-rich events from EventStoreDB to data scientists to analyze historical and behavioral trends, uncovering patterns that traditional databases often miss. These patterns can, for example, reveal why a customer churned or highlight behaviors that lead to high-value contracts.

Application developers can leverage EventStoreDB’s granular events to build real-time, distributed enterprise applications and break down tightly coupled systems. Events are typically simpler, self-contained, and independent. Unlike the tables and rows in traditional databases that are often interdependent with various functions.

## Where to Use EventStoreDB?

EventStoreDB is valuable for critical enterprise applications and data pipelines with behavior-rich data, where interdependent business objects and processes interact in diverse ways over time. 

Industries such as finance, healthcare, supply chain, and manufacturing benefit from EventStoreDB, as it supports flexible, scalable solutions with a complete audit trail. This enables businesses to maintain clear, comprehensive system oversight, which is essential for meeting compliance requirements and adapting to changing needs.