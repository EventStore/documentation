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
| [Stream Indexing](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/indexes.html) | Events in streams are indexed to provide fast access to groups of events in the event log. |
| Fine Grained Stream | EventStore supports billions of streams, allowing granular event organization to efficiently track the lifecycle of every distinct entity within a system. |
| [Optimistic Concurrency Control](https://developers.eventstore.com/clients/grpc/appending-events.html#handling-concurrency) | Concurrent appends that lead to lost updates can be prevented with optimistic concurrency control. This is done in a lock free way, to reduce contention and performance overhead. |
| [Multiple Hosting Options](https://www.eventstore.com/downloads) | EventStoreDB is available fully managed with [Event Store Cloud](https://www.eventstore.com/event-store-cloud), or self-managed on Linux, Windows, macOS, or with Docker |

### Projection

| Feature Name | Description |
| --- | --- |
| [By Category System Projection](https://developers.eventstore.com/server/v24.10%20Preview%201/features/projections/system.html#by-category) | Quickly retrieve indexed events from streams that share the same category. |
| [By Event Type System Projection](https://developers.eventstore.com/server/v24.10%20Preview%201/features/projections/system.html#by-event-type) | Quickly retrieve indexed events that share the same event type. |
| [By Correlation ID System Projection](https://developers.eventstore.com/server/v24.10%20Preview%201/features/projections/system.html#by-correlation-id) | Quickly retrieve indexed events that share the same correlation ID. Enabling data lineage and root cause analysis. |
| [User-Defined Projection](https://developers.eventstore.com/server/v24.10%20Preview%201/features/projections/custom.html) | Allows users to define custom projections in javascript to transform or filter events to another stream or a state programatically. |

### Subscription

| Feature Name | Description |
| --- | --- |
| [Catch-up Subscription](https://developers.eventstore.com/clients/grpc/subscriptions.html) | Self-managed subscription of filtered events by stream or event type from a particular position, or real-time as events occur. |
| [Persistent Subscription](https://developers.eventstore.com/server/v24.10%20Preview%201/features/persistent-subscriptions.html) | Server-managed subscription that supports multiple competing consumers, check pointing, retries, and parking (i.e. dead-lettering) |

### Connector

| Feature Name | Description |
| --- | --- |
| [Connector](https://developers.eventstore.com/server/v24.10%20Preview%201/features/connectors/) [24.10] | Fully configurable integration to external systems that can push events from EventStoreDB in real-time. Supports at least once delivery, retry, event filtering, event transformation, automatic checkpointing, leases, and high availability. |
| [HTTP Sink](https://developers.eventstore.com/server/v24.10%20Preview%201/features/connectors/sinks/http.html) [24.10] | Publishes events from EventStoreDB to a HTTP endpoints. |
| [Kafka Sink](https://developers.eventstore.com/server/v24.10%20Preview%201/features/connectors/sinks/kafka.html) [24.10] [License Required] | Publishes events from EventStoreDB to Kafka topic or partition using a key found in the events. Supports broker acknowledgement, basic authentication. |
| RabbitMQ Sink [24.10] [License Required] | Publishes events from EventStoreDB to a RabbitMQ exchange. Supports broker acknowledgement, basic authentication, over secured connection. |
| MongoDB Sink [24.10] [License Required] | Publishes events from EventStoreDB to a MongoDB collection or document. Supports basic authentication. |

### Clustering

| Feature Name | Description |
| --- | --- |
| [High Availability Cluster](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/cluster.html) | Ensures high availability and fault tolerance by using secure, quorum-based replication, leader election via the gossip protocol, and configurable node roles and communication, with each node independently maintaining data without shared disks |
| [Read-only Replica](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/cluster.html) | Cluster nodes that replicate data asynchronously from the cluster but does not participate in write operations, elections, or quorum. Used primarily to scale read operations |

### Interface and SDK

| Feature Name | Description |
| --- | --- |
| [EventStoreDB Client](https://developers.eventstore.com/clients/grpc/getting-started.html) | Client SDKs are available in Python, Java, .NET, node.js, go, and rust to use and administer EventStoreDB. |
| gRPC API | Provides an API based on the gRPC protocol for high performance, low latency, and streaming support for all EventStoreDB operations |
| [HTTP API](https://developers.eventstore.com/http-api/v24.10%20Preview%201/api.html) | Provides simple and basic RESTful administration of EventStoreDB. |
| TCP API [Deprecated] | The deprecated API that provides a low-level, high throughput TCP access to EventStoreDB. Not supported for releases after 23.10. |

### User Interface

| Feature Name | Description |
| --- | --- |
| [Admin UI](https://developers.eventstore.com/server/v24.10%20Preview%201/features/admin-ui.html) [Deprecated] | The deprecated web-based EventStoreDB user interface for managing events, streams, server configurations, and monitoring. |
| [Event Store Navigator](https://learn.eventstore.com/event-store-navigator-preview) [Preview] | The next generation EventStoreDB user interface built as a native desktop application. |

## Security

### Authentication

| Feature Name | Description |
| --- | --- |
| [User name/Password Authentication](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#authentication) | Authenticate users based on credentials provided. |
| OAuth Authentication [License Required] | Connect to an identity server and authenticate users based on JWT |
| [LDAP Authentication](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#ldap-authentication) [License Required]  | Authenticate users against LDAP-based directory services. |
| [User X.509 Certificates](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#user-x-509-certificates) [24.10][License Required] | Support user-based X.509 certificates for authentication. |

### Authorization

| Feature Name | Description |
| --- | --- |
| [User Management](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#authentication) | Create, update and assign users to pre-defined user groups. |
| [Stream Access Control List](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#access-control-lists) | Define which users or groups can read, write, or delete on a stream level. |
| [Stream Access Policy](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#stream-policy-authorization-plugin) [24.10] [License Required] | Define access policies to control who can read, write, or delete streams for multiple streams using stream rules. |

### Encryption

| Feature Name | Description |
| --- | --- |
| [Encryption at rest](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#encryption-at-rest) [24.10] [License Required] | Secure events stored on disk using file level encryption. |
| [Encryption in transit](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#protocol-security) | Use TLS to secure data during network transmission. |
| [Event Store Certificate Generation Tool](https://developers.eventstore.com/server/v24.10%20Preview%201/operations/cert-update.html) | The command line interface to ease the generation of a certificate authority and node certificates for encryption in transit. |
| [FIPS 140-2](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/security.html#fips-140-2) [License Required] | Compliance with FIPS 140-2 standards for cryptographic modules. |

## Operations

### Configuration

| Feature Name | Description |
| --- | --- |
| [Multiple Configuration Options](https://developers.eventstore.com/server/v24.10%20Preview%201/configuration/) | Configure EventStoreDB through YAML, environment variables, or command line |
| [Event Store Configurator](https://configurator.eventstore.com/) | A configuration wizard that help generate instructions for configuration, certificates, and client connection based on specification of the environment |

### Data Cleanup and Housekeeping

| Feature Name | Description |
| --- | --- |
| [Stream Truncate and Deletion](https://developers.eventstore.com/server/v24.10%20Preview%201/features/streams.html#soft-delete-and-truncatebefore) | Truncate streams by max age, max count, or before a particular position in the stream or delete an entire stream. |
| [Scavenging](https://developers.eventstore.com/server/v24.10%20Preview%201/operations/scavenge.html) | Manually reclaim disk space for compliance or storage purposes by completely removing truncated and deleted streams from disk. |
| [Auto-scavenging](https://developers.eventstore.com/server/v24.10%20Preview%201/operations/auto-scavenge.html) [24.10] [License Required] | Automatically schedule and coordinate scavenging for a cluster in a way that minimizes performance impact. |

### Monitoring

| Feature Name | Description |
| --- | --- |
| [Logging](https://developers.eventstore.com/server/v24.10%20Preview%201/diagnostics/logs.html) | Provides detailed logs for server operations to console and log files. |
| [Logs Endpoint](https://developers.eventstore.com/server/v24.10%20Preview%201/diagnostics/logs.html#logs-download) [24.10]  | View or download logs over HTTP for authenticated EventStoreDB users without the need of file system access. |
| [Metrics](https://developers.eventstore.com/server/v24.10%20Preview%201/diagnostics/metrics.html) | Collect EventStoreDB metrics such as CPU, memory, disk usage as well as status of projection, subscriptions, elections, etc. |
| [Metrics with Prometheus](https://developers.eventstore.com/server/v24.10%20Preview%201/diagnostics/metrics.html) | Allow systems to scrape metrics in Prometheus format for monitoring over an HTTP endpoint. |
| [Metrics with OpenTelemetry Exporter](https://developers.eventstore.com/server/v24.10%20Preview%201/diagnostics/integrations.html#opentelemetry-exporter) [24.10] [License Required] | Export and push metrics to an endpoint via the OpenTelemetry protocol. |

### Backup, Replication, and Migration

| Feature Name | Description |
| --- | --- |
| Backup and Restore | Provide functionality for full or differential backups and restores over disk snapshots or file copy backups. |
| [Event Store Replicator](https://replicator.eventstore.org/) | Facilitate replication or migration of data between different EventStoreDB clusters or instances. |

### Administrative Tool

| Feature Name | Description |
| --- | --- |
| [Event Store CLI](https://developers.eventstore.com/commercial-tools/cli-tool.html) | Command line tool for administrative operations on EventStoreDB such as scavenge, backup, restore, merge index, delete stream as well as user and projection management |

[Stephen’s working notes](https://www.notion.so/Stephen-s-working-notes-123e266ccf7f809b8f6bed44a4c0ce0e?pvs=21)