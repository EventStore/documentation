---
title: Getting Started
---

# Introduction

## What is EventStoreDB?

EventStoreDB is an event-native database, representing a new class of databases designed specifically to store, process, and deliver application state changes known as events.

An event records a change in an application’s state—like placing an order, processing a payment, or fulfilling a shipment. Each event captures a distinct, incremental change in a business process.

EventStoreDB offers the following features:

| Feature | Description |
|---------|-------------|
| Append-only Log | Audit trail that captures all historical changes as events for one or more systems. |
| Streams | Groups and indexes events to organize and speed up retrieval. |
| Subscription and Connectors | Delivers events to external systems through push or pull options. |
| Projection | Transforms and filters events to different streams or state. |
| Multiple Hosting Options | Fully managed with [Event Store Cloud](https://developers.eventstore.com/cloud/), or self-managed on Linux, Windows, macOS, or with Docker. |
| Client SDK | Available in Python, Java, .NET, Node.js, Go, and Rust. |


## Why EventStoreDB?

Traditional databases are typically optimized to store only the current snapshot of business data (e.g., the latest product price) and do not keep the changes (e.g., price adjustments) that led to it. Yet, these discarded changes often reveal trends and patterns that are critical to business analytics (e.g. customer price sensitivity). 

By preserving a complete history of changes, EventStoreDB enables organizations to uncover deeper insights essential for for remaining agile and adaptive, especially in today’s AI and data-driven world. 

Additionally, EventStoreDB enables real-time updates and reduces system dependencies, enhancing flexibility, scalability, and independent adaptability across applications.

## Who Uses EventStoreDB?

Data engineers can provide context-rich events from EventStoreDB to data scientists to analyze historical and behavioral trends, uncovering patterns that traditional databases often miss. These patterns can, for example, reveal why a customer churned or highlight behaviors that lead to high-value contracts.

Application developers can leverage EventStoreDB’s granular events to build real-time, distributed applications and break down tightly coupled systems. Events are typically simpler, self-contained, and independent—unlike the tables and rows in traditional databases that are interdependent with various functions.

## Where to Use EventStoreDB?

EventStoreDB is particularly valuable for critical enterprise applications and analytical pipelines with complex, behavior-rich data, where interdependent business objects and processes interact in diverse ways over time. 

Industries such as finance, healthcare, supply chain, and manufacturing benefit significantly from EventStoreDB, as it supports flexible, scalable solutions with a complete audit trail. This enables businesses to maintain clear, comprehensive system oversight, which is essential for meeting compliance requirements and adapting to changing needs.