---
order: 1
dir:
  text: "Getting started"
  link: true
  order: 1
---

<CloudBanner />

---
Welcome to the **KurrentDB Kubernetes Operator** guide. In this guide, we’ll refer to the KurrentDB
Kubernetes Operator simply as “the Operator.” Use the Operator to simplify backup, scaling, and
upgrades of KurrentDB clusters on Kubernetes.

:::important
The Operator is an Enterprise-only feature, please [contact us](https://www.kurrent.io/contact) for
more information.
:::

## Why run KurrentDB on Kubernetes?

Kubernetes is the modern enterprise standard for deploying containerized applications at scale. The
Operator streamlines deployment and management of KurrentDB clusters.

## Features

* Deploy single-node or multi-node KurrentDB clusters, even across multiple Kubernetes clusters
* Back up and restore KurrentDB clusters
* Automate backups with a schedule and retention policies
* Automatically detect and load TLS certificate updates
* Configure KurrentDB initial users and passwords
* Perform rolling upgrades and update configurations

### New in 1.6.0

* Fix downtime during node pool upgrades.  The operator now deploys and maintains a
  `PodDisruptionBudget` to ensure that external tooling knows when it is safe to drain a pod from
  the cluster.  See [`podDisruptionBudgets.disable`][pdbs] if you need to disable them for some
  reason.
* Improved health check logic.  Before, health checks were done once every 60 seconds, in the
  `database-health-check` state.   A normal cluster would bounce between that state and
  `database-healthy`.  Now, pod-level health issues are detected immediately, and gossip checks are
  executed every 10 seconds, all while staying in the `database-healthy` state.  This change
  improves both the freshness of the reported status and the ease for external monitoring, since a
  healthy cluster should always stay in `database-healthy`.
* Support online license checks in addition to offline license checks.  If your operator license
  file is missing or expired, the operator can continue as long as your license key is valid and
  your internet connection is working.
* Expose operator license status through Kubernetes API.  Now you can set up automated monitoring
  or reminders for license renewals by examining your KurrentDB's `.status.operatorLicense`.
* Fix PVC selection logic during disk resize handling.  Previously, clusters with PVCs that were
  migrated manually from non-operator-environments could sometimes fail to get resized.
* Fix health check bug after scaling down read-only replicas, which caused the operator to wrongly
  label post-scaledown clusters as `database-unhealthy` for a long while.
* Fix various bugs identified by an AI code audit.  Most were associated with rarely-used options,
  and none had been reported by customers.

[pdbs]: resource-types.md#poddisruptionbudgetsspec

## Supported KurrentDB Versions

The Operator supports running the following major versions of KurrentDB:
- v26.x
- v25.x
- v24.x
- v23.10+

## Supported Hardware Architectures
The Operator is packaged for the following hardware architectures:
- x86\_64
- arm64

## Technical Support

For support questions, please [contact us](https://www.kurrent.io/contact).

## First Steps

Ready to install? Head over to the [installation](installation.md) section.
