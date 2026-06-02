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

### New in 1.5.0

* Support Archiver nodes.  Archiver nodes are a KurrentDB feature that lets you offload your old,
  less-frequently-accessed data into blob storage.  See [an example][arx].
* Support for running KurrentDB pods under a specific `ServiceAccount`, to support IRSA access to
  cloud storage for archiving.  See the [serviceAccountName setting][san] setting.
* Management of initial user configuration.  The `admin` and `ops` passwords can be set on database
  creation, as well as fully custom users.  See [an example of a secure deployment][usr].
* Automatically detect TLS certificate updates and load them into the database with zero downtime.
  With cert-manager (or any automated cert renewal system), certificate rotation now requires zero
  administrator action.
* Support multiple custom certificate authorities.  This supports migrating from one CA to another
  without downtime, and also supports multi-kubernetes-cluster topologies with self-signed
  certificates without having to transfer root CA private keys between clusters. See the
  [certificateAuthoritySecret setting][sec].
* Support 5-node clusters.  A 5-node cluster ensures that, even during a rolling restart, you can
  still lose one node without risk of data loss.
* Support telemetry opt-out.  See the [telemetryOptOut setting][tlm].
* Support loadBalancerClass configuration.  See the [loadBalancerClass setting][lbs].
* Support for non-`cluster.local` cluster domains (automatically detected).
* Label pods with their current role in the KurrentDB cluster.  The label is updated after every
  successful health check, which is about once every minute.
* Support NodePort configuration.
* Allow administrators to explicitly request configuration reloads, rolling restarts, or full
  restarts of a KurrentDB cluster.  See the [Manually Triggering Reload or Restarts][trg] for
  details.

[arx]: ../operations/database-deployment.md#three-node-insecure-cluster-with-archiving
[san]: resource-types.md#kurrentdbspec
[usr]: ../operations/database-deployment.md#three-node-secure-cluster-using-self-signed-certificates
[sec]: resource-types.md#kurrentdbsecurity
[tlm]: resource-types.md#kurrentdbspec
[lbs]: resource-types.md#kurrentdbloadbalancer
[trg]: ../operations/modify-deployments.md#manually-triggering-reload-or-restart

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
