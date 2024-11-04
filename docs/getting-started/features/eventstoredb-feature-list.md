---
title: EventStoreDB Feature List
---

# EventStoreDB Feature List

## Core Features

### Event-Native Database

| Feature Name | Description |
| --- | --- |
| Append-only Log | A log where events are only appended and never modified, serving as an immutable audit trail that captures all historical changes within a system. |
| Immutable Event | All events stored in EventStoreDB cannot be altered once appended, ensuring data integrity and simplify troubleshooting. |
| Guaranteed Write | Writes are guaranteed to be fully durable once acknowledged. |
| Guaranteed Consistent Event Ordering | Events are ordered by their append time across both the event log and streams to facilitate operations where the sequence of execution is crucial. Events is guaranteed to be read in the same consistent order whenever it is consumed. |
| Sequential Event Numbering | An event appended to a stream is automatically assigned a strictly monotonically increasing number (without gap) to ensure reliable state reconstruction and concurrency handling |
| [Stream Indexing](@server/configuration/indexes.html) | Events in streams are indexed to provide fast access to groups of events in the event log. |
| Fine Grained Stream | EventStore supports billions of streams, allowing granular event organization to efficiently track the lifecycle of every distinct entity within a system. |
| [Optimistic Concurrency Control](/clients/grpc/appending-events.html#handling-concurrency) | Concurrent appends that lead to lost updates can be prevented with optimistic concurrency control. This is done in a lock free way, to reduce contention and performance overhead. |
| [Multiple Hosting Options](https://www.eventstore.com/downloads) | EventStoreDB is available fully managed with [Event Store Cloud](/cloud/), or self-managed on Linux, Windows, macOS, or with Docker |

### Projection

| Feature Name | Description |
| --- | --- |
| [By Category System Projection](@server/features/projections/system.html#by-category) | Quickly retrieve indexed events from streams that share the same category. |
| [By Event Type System Projection](@server/features/projections/system.html#by-event-type) | Quickly retrieve indexed events that share the same event type. |
| [By Correlation ID System Projection](@server/features/projections/system.html#by-correlation-id) | Quickly retrieve indexed events that share the same correlation ID. Enabling data lineage and root cause analysis. |
| [User-Defined Projection](@server/features/projections/custom.html) | Allows users to define custom projections in javascript to transform or filter events to another stream or a state programatically. |

### Subscription

| Feature Name | Description |
| --- | --- |
| [Catch-up Subscription](/clients/grpc/subscriptions.html) | Self-managed subscription of filtered events by stream or event type from a particular position, or real-time as events occur. |
| [Persistent Subscription](@server/features/persistent-subscriptions.html) | Server-managed subscription that supports multiple competing consumers, check pointing, retries, and parking (i.e. dead-lettering) |

### Connector

| Feature Name | Description |
| --- | --- |
| [Connector](@server/features/connectors/) | <Badge type="tip" vertical="middle" text="v24.10"/><br><br>Fully configurable integration to external systems that can push events from EventStoreDB in real-time. Supports at least once delivery, retry, event filtering, event transformation, automatic checkpointing, leases, and high availability. |
| [HTTP Sink](@server/features/connectors/sinks/http.html) | <Badge type="tip" vertical="middle" text="v24.10"/><br><br>Publishes events from EventStoreDB to a HTTP endpoints. |
| [Kafka Sink](@server/features/connectors/sinks/kafka.html) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Publishes events from EventStoreDB to Kafka topic or partition using a key found in the events. Supports broker acknowledgement, basic authentication. |
| RabbitMQ Sink | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Publishes events from EventStoreDB to a RabbitMQ exchange. Supports broker acknowledgement, basic authentication, over secured connection. |
| MongoDB Sink | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Publishes events from EventStoreDB to a MongoDB collection or document. Supports basic authentication. |

### Clustering

| Feature Name | Description |
| --- | --- |
| [High Availability Cluster](@server/configuration/cluster.html) | Ensures high availability and fault tolerance by using secure, quorum-based replication, leader election via the gossip protocol, and configurable node roles and communication, with each node independently maintaining data without shared disks |
| [Read-only Replica](@server/configuration/cluster.html) | Cluster nodes that replicate data asynchronously from the cluster but does not participate in write operations, elections, or quorum. Used primarily to scale read operations |

### Interface and SDK

| Feature Name | Description |
| --- | --- |
| [EventStoreDB Client](/clients/grpc/getting-started.html) | Client SDKs are available in Python, Java, .NET, node.js, go, and rust to use and administer EventStoreDB. |
| gRPC API | Provides an API based on the gRPC protocol for high performance, low latency, and streaming support for all EventStoreDB operations |
| [HTTP API](/http-api/v24.10%20Preview%201/api.html) | Provides simple and basic RESTful administration of EventStoreDB. |
| TCP API | <Badge type="note" vertical="middle" text="Deprecated"/><br><br>The deprecated API that provides a low-level, high throughput TCP access to EventStoreDB. Not supported for releases after 23.10. |

### User Interface

| Feature Name | Description |
| --- | --- |
| [Admin UI](@server/features/admin-ui.html) | The classic web-based EventStoreDB user interface for managing events, streams, server configurations, and monitoring. |
| [Event Store Navigator](https://learn.eventstore.com/event-store-navigator-preview) | <Badge type="warning" vertical="middle" text="Preview"/><br><br>The next generation EventStoreDB user interface built as a native desktop application. |

## Security

### Authentication

| Feature Name | Description |
| --- | --- |
| [User name/Password Authentication](@server/configuration/security.html#authentication) | Authenticate users based on credentials provided. |
| OAuth Authentication | <Badge type="info" vertical="middle" text="License Required"/><br><br>Connect to an identity server and authenticate users based on JWT |
| [LDAP Authentication](@server/configuration/security.html#ldap-authentication)  |<Badge type="info" vertical="middle" text="License Required"/><br><br> Authenticate users against LDAP-based directory services. |
| [User X.509 Certificates](@server/configuration/security.html#user-x-509-certificates) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Support user-based X.509 certificates for authentication. |

### Authorization

| Feature Name | Description |
| --- | --- |
| [User Management](@server/configuration/security.html#authentication) | Create, update and assign users to pre-defined user groups. |
| [Stream Access Control List](@server/configuration/security.html#access-control-lists) | Define which users or groups can read, write, or delete on a stream level. |
| [Stream Access Policy](@server/configuration/security.html#stream-policy-authorization-plugin) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Define access policies to control who can read, write, or delete streams for multiple streams using stream rules. |

### Encryption

| Feature Name | Description |
| --- | --- |
| [Encryption at rest](@server/configuration/security.html#encryption-at-rest) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Secure events stored on disk using file level encryption. |
| [Encryption in transit](@server/configuration/security.html#protocol-security) | Use TLS to secure data during network transmission. |
| [Event Store Certificate Generation Tool](@server/operations/cert-update.html) | The command line interface to ease the generation of a certificate authority and node certificates for encryption in transit. |
| [FIPS 140-2](@server/configuration/security.html#fips-140-2) | <Badge type="info" vertical="middle" text="License Required"/><br><br>Compliance with FIPS 140-2 standards for cryptographic modules. |

## Operations

### Configuration

| Feature Name | Description |
| --- | --- |
| [Multiple Configuration Options](@server/configuration/) | Configure EventStoreDB through YAML, environment variables, or command line |

### Data Cleanup and Housekeeping

| Feature Name | Description |
| --- | --- |
| [Stream Truncate and Deletion](@server/features/streams.html#soft-delete-and-truncatebefore) | Truncate streams by max age, max count, or before a particular position in the stream or delete an entire stream. |
| [Scavenging](@server/operations/scavenge.html) | Manually reclaim disk space for compliance or storage purposes by completely removing truncated and deleted streams from disk. |
| [Auto-scavenging](@server/operations/auto-scavenge.html) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Automatically schedule and coordinate scavenging for a cluster in a way that minimizes performance impact. |

### Monitoring

| Feature Name | Description |
| --- | --- |
| [Logging](@server/diagnostics/logs.html) | Provides detailed logs for server operations to console and log files. |
| [Logs Endpoint](@server/diagnostics/logs.html#logs-download)  |<Badge type="tip" vertical="middle" text="v24.10"/><br><br> View or download logs over HTTP for authenticated EventStoreDB users without the need of file system access. |
| [Metrics](@server/diagnostics/metrics.html) | Collect EventStoreDB metrics such as CPU, memory, disk usage as well as status of projection, subscriptions, elections, etc. |
| [Metrics with Prometheus](@server/diagnostics/metrics.html) | Allow systems to scrape metrics in Prometheus format for monitoring over an HTTP endpoint. |
| [Metrics with OpenTelemetry Exporter](@server/diagnostics/integrations.html#opentelemetry-exporter) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Export and push metrics to an endpoint via the OpenTelemetry protocol. |

### Backup, Replication, and Migration

| Feature Name | Description |
| --- | --- |
| Backup and Restore | Provide functionality for full or differential backups and restores over disk snapshots or file copy backups. |
| [Event Store Replicator](https://replicator.eventstore.org/) | Facilitate replication or migration of data between different EventStoreDB clusters or instances. |

### Administrative Tool

| Feature Name | Description |
| --- | --- |
| [Event Store CLI](/commercial-tools/cli-tool.html) | Command line tool for administrative operations on EventStoreDB such as scavenge, backup, restore, merge index, delete stream as well as user and projection management |

## Next Steps

- [EventStoreDB Server Documentation](@server/quick-start/): Gain a deeper understanding about other EventStoreDB features. 

- [EventStoreDB Client Documentation](/clients/grpc/appending-events.html#handling-concurrency): Explore how to use these features with EventStoreDB clients.
  
- [Event Store Essentials](https://academy.eventstore.com/essentials): Developer greater understanding of these features in this in-depth guide.

- [EventStoreDB From Scratch](https://academy.eventstore.com/from-scratch): Get hands-on and build a basic EventStoreDB application with this training series.

- [An End-To-End Example With EventStoreDB](https://www.youtube.com/watch?v=vIUw-jKpKfQ) Watch how to build an application with EventStoreDB