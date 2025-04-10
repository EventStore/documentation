---
title: KurrentDB Feature List
---

# KurrentDB Feature List

## Core Features

### <HopeIcon icon="solar:database-linear" size="1.25em"/> Event-Native Database

| Feature Name                                                                                                 | Description                                                                                                                                                                                                                                  |
|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Append-only Log](./concepts.md#event-log)                                                                   | A log where events are only appended and never modified, serving as an immutable audit trail that captures all historical changes within a system.                                                                                           |
| [Immutable Event](./concepts.md#immutable-events)                                                            | All events stored in KurrentDB cannot be altered once appended, ensuring data integrity and simplifying troubleshooting.                                                                                                                  |
| Guaranteed Write                                                                                             | Writes are guaranteed to be fully durable once acknowledged.                                                                                                                                                                                 |
| [Guaranteed Consistent Event Ordering](./concepts.md#guaranteed-consistent-ordering-in-event-log-and-stream) | Events are ordered by their append time across both the event log and streams to facilitate operations where the sequence of execution is crucial. Events are guaranteed to be read in the same consistent order whenever they are consumed. |
| Sequential Event Numbering                                                                                   | An event appended to a stream is automatically assigned a strictly monotonically increasing number (without gap) to ensure reliable state reconstruction and concurrency handling                                                            |
| [Stream Indexing](@server/configuration/indexes.md)                                                          | Events in streams are indexed to provide fast access to groups of events in the event log.                                                                                                                                                   |
| [Fine Grained Stream](./concepts.md#fine-grained-event-streams)                                              | EventStore supports billions of streams, allowing granular event organization to efficiently track the lifecycle of every distinct entity within a system.                                                                                   |
| [Optimistic Concurrency Control](./concepts.md#optimistic-concurrency-control)                               | Concurrent appends that lead to lost updates can be prevented with optimistic concurrency control. This is done in a lock-free manner, to reduce contention and performance overhead.                                                        |
| [Multiple Hosting Options](https://www.kurrent.io/downloads)                                             | KurrentDB is available fully managed with [Kurrent Cloud](/cloud/introduction.md) or self-managed on Linux, Windows, macOS, or with Docker                                                                                            |

### <HopeIcon icon="streamline:projector-board" size="1.25em"/> Projection

| Feature Name | Description |
| --- | --- |
| [By Category System Projection](@server/features/projections/system.md#by-category) | Quickly retrieve indexed events from streams that share the same category. |
| [By Event Type System Projection](@server/features/projections/system.md#by-event-type) | Quickly retrieve indexed events that share the same event type. |
| [By Correlation ID System Projection](@server/features/projections/system.md#by-correlation-id) | Quickly retrieve indexed events with the same correlation ID, enabling data lineage and root cause analysis. |
| [User-Defined Projection](@server/features/projections/custom.md) | Allows users to define custom projections in javascript to transform or filter events to another stream or a state programatically. |

### <HopeIcon icon="uil:message" size="1.25em"/> Subscription

| Feature Name | Description |
| --- | --- |
| [Catch-up Subscription](/clients/grpc/subscriptions.md) | Self-managed subscription of filtered events by stream or event type from a particular position or in real-time as events occur. |
| [Persistent Subscription](@server/features/persistent-subscriptions.md) | Server-managed subscription that supports multiple competing consumers, checkpointing, retries, and parking (i.e., dead-lettering) |

### <HopeIcon icon="vaadin:cluster" size="1.25em"/> Connector

| Feature Name | Description |
| --- | --- |
| [Connector](@server/features/connectors/README.md) | <Badge type="tip" vertical="middle" text="v24.10"/><br><br>Fully configurable integration to external systems that can push events from KurrentDB in real-time. Supports at least once delivery, retry, event filtering, event transformation, automatic checkpointing, leases, and high availability. |
| [HTTP Sink](@server/features/connectors/sinks/http.md) | <Badge type="tip" vertical="middle" text="v24.10"/><br><br>Publishes events from KurrentDB to an HTTP endpoint. |
| [Kafka Sink](@server/features/connectors/sinks/kafka.md) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Publishes events from KurrentDB to Kafka topic or partition using a key found in the events. Supports broker acknowledgment and basic authentication. |
| RabbitMQ Sink | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Publishes events from KurrentDB to a RabbitMQ exchange. Supports broker acknowledgment and basic authentication over a secured connection. |
| MongoDB Sink | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Publishes events from KurrentDB to a MongoDB collection or document. Supports basic authentication. |

### <HopeIcon icon="grommet-icons:cluster" size="1.25em"/> Clustering

| Feature Name | Description |
| --- | --- |
| [High Availability Cluster](@server/configuration/cluster.md) | Ensures high availability and fault tolerance by using secure, quorum-based replication, leader election via the gossip protocol, and configurable node roles and communication, with each node independently maintaining data without shared disks. |
| [Read-only Replica](@server/configuration/cluster.md) | Cluster nodes that replicate data asynchronously from the cluster but do not participate in write operations, elections, or quorum. Used primarily to scale read operations. |

### <HopeIcon icon="material-symbols:sdk-outline" size="1.25em"/> Interface and SDK

| Feature Name | Description |
| --- | --- |
| [KurrentDB Client](/clients/grpc/getting-started.md) | Client SDKs are available in Python, Java, .NET, Node.js, Go, and Rust to use and administer KurrentDB. |
| gRPC API | Provides an API based on the gRPC protocol for high performance, low latency, and streaming support for all KurrentDB operations |
| [HTTP API](@httpapi/api.md) | Offers simple and basic RESTful administration of KurrentDB. |
| TCP API | <Badge type="note" vertical="middle" text="Deprecated"/><br><br>A deprecated API that provides low-level, high throughput TCP access to KurrentDB. Not supported for releases after 23.10. |

### <HopeIcon icon="tdesign:system-interface" size="1.25em"/> User Interface

| Feature Name | Description |
| --- | --- |
| [Admin UI](@server/features/admin-ui.md) | The web-based KurrentDB user interface that manages events, streams, server configurations, monitoring, etc. |
| [Kurrent Navigator](https://navigator.kurrent.io/) | <Badge type="warning" vertical="middle" text="Preview"/><br><br>The next-generation KurrentDB user interface built as a native desktop application. |

## Security

### <HopeIcon icon="carbon:two-factor-authentication" size="1.25em"/> Authentication

| Feature Name                                                                                      | Description                                                                                                                                                                        |
|---------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [User name/Password Authentication](@server/security/user-authentication.md#basic-authentication) | Authenticate users based on credentials provided.                                                                                                                                  |
| [OAuth Authentication](@server/security/user-authentication.md#oauth-authentication)              | <Badge type="info" vertical="middle" text="License Required"/><br><br>Connect to an identity server and authenticate users based on JWT                                            |
| [LDAP Authentication](@server/security/user-authentication.md#ldap-authentication)                | <Badge type="info" vertical="middle" text="License Required"/><br><br> Authenticate users against LDAP-based directory services.                                                   |
| [User X.509 Certificates](@server/security/user-authentication.md#user-x509-certificates)         | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Support user-based X.509 certificates for authentication. |

### <HopeIcon icon="mdi:account-security-outline" size="1.25em"/> Authorization

| Feature Name                                                                               | Description                                                                                                                                                                                                                                |
|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [User Management](@server/security/user-authentication.md)                                 | Create, update, and assign users to pre-defined user groups.                                                                                                                                                                               |
| [Stream Access Control List](@server/security/user-authorization.md#access-control-lists)  | Define which users or groups can read, write, or delete on a stream level.                                                                                                                                                                 |
| [Stream Access Policy](@server/security/user-authorization.md#stream-policy-authorization) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Define access policies to control who can read, write, or delete streams for multiple streams using stream rules. |

### <HopeIcon icon="streamline:device-database-encryption-1" size="1.25em"/> Encryption

| Feature Name                                                                 | Description                                                                                                                                                                        |
|------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Encryption at rest](@server/security/README.md#encryption-at-rest)          | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Secure events stored on disk using file-level encryption. |
| [Encryption in transit](@server/security/protocol-security.md)               | Use TLS to secure data during network transmission.                                                                                                                                |
| [Kurrent Certificate Generation Tool](@server/operations/cert-update.md) | The command line interface that eases the generation of a certificate authority and node certificates for encryption in transit.                                                   |
| [FIPS 140-2](@server/security/README.md#fips-140-2)                          | <Badge type="info" vertical="middle" text="License Required"/><br><br>Compliance with FIPS 140-2 standards for cryptographic modules.                                              |

## Operations

### <HopeIcon icon="uil:setting" size="1.25em"/> Configuration

| Feature Name                                                      | Description                                                                     |
|-------------------------------------------------------------------|---------------------------------------------------------------------------------|
| [Multiple Configuration Options](@server/configuration/README.md) | Configure KurrentDB through YAML, environment variables, or the command line |

### <HopeIcon icon="lucide-lab:broom" size="1.25em"/> Data Cleanup and Housekeeping

| Feature Name                                                                               | Description                                                                                                                                                                                                                         |
|--------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Stream Truncate and Deletion](@server/features/streams.md#soft-delete-and-truncatebefore) | Truncate streams by max age, max count, or before a particular position or delete an entire stream.                                                                                                                                 |
| [Scavenging](@server/operations/scavenge.md)                                               | Manually reclaim disk space for compliance or storage purposes by completely removing truncated and deleted streams from disk.                                                                                                      |
| [Auto-scavenging](@server/operations/auto-scavenge.md)                                     | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Automatically schedule and coordinate scavenging for a cluster in a way that minimizes performance impact. |

### <HopeIcon icon="eos-icons:monitoring" size="1.25em"/> Monitoring

| Feature Name                                                                                      | Description                                                                                                                                                                                     |
|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Logging](@server/diagnostics/logs.md)                                                            | Provides detailed logs for server operations to console and log files.                                                                                                                          |
| [Logs Endpoint](@server/diagnostics/logs.md#logs-download)                                        | <Badge type="tip" vertical="middle" text="v24.10"/><br><br> View or download logs over HTTP for authenticated KurrentDB users without needing file system access.                            |
| [Metrics](@server/diagnostics/metrics.md)                                                         | Collect KurrentDB metrics such as CPU, memory, disk usage, and the status of projections, subscriptions, elections, etc.                                                                     |
| [Metrics with Prometheus](@server/diagnostics/metrics.md)                                         | Allow systems to scrape metrics in Prometheus format for monitoring over an HTTP endpoint.                                                                                                      |
| [Metrics with OpenTelemetry Exporter](@server/diagnostics/integrations.md#opentelemetry-exporter) | <Badge type="tip" vertical="middle" text="v24.10"/><Badge type="info" vertical="middle" text="License Required"/><br><br>Export and push metrics to an endpoint via the OpenTelemetry protocol. |

### <HopeIcon icon="clarity:backup-line" size="1.25em"/> Backup, Replication, and Migration

| Feature Name                                                 | Description                                                                                                   |
|--------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| [Backup and Restore](https://docs.kurrent.io/server/v24.10/operations/backup.html#backup)                                           | Provide functionality for full or differential backups and restores over disk snapshots or file copy backups. |
| [Kurrent Replicator](https://replicator.eventstore.org/) | Facilitate replication or migration of data between different KurrentDB clusters or instances.             |

### <HopeIcon icon="carbon:tools" size="1.25em"/> Administrative Tool

| Feature Name                                     | Description                                                                                                                                                               |
|--------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Kurrent CLI](/commercial-tools/cli-tool.md) | Command line tool for administrative operations on KurrentDB such as scavenge, backup, restore, merge index, delete stream, as well as user and projection management. |

## Next Steps

- [KurrentDB Server Documentation](@server/quick-start/README.md): Gain a deeper understanding about other KurrentDB features. 

- [KurrentDB Client Documentation](/clients/grpc/appending-events.md#handling-concurrency): Explore how to use these features with KurrentDB clients.
  
- [Kurrent Essentials](https://academy.kurrent.io/essentials): Developer greater understanding of these features in this in-depth guide.

- [KurrentDB From Scratch](https://academy.kurrent.io/from-scratch): Get hands-on and build a basic KurrentDB application with this training series.

- [An End-To-End Example With KurrentDB](https://www.youtube.com/watch?v=vIUw-jKpKfQ) Watch how to build an application with KurrentDB