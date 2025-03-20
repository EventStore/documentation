---
title: Database Restore
order: 3
---

The sections below detail how a database restore can be performed. Refer to the [KurrentDB API](../getting-started/resource-types.md#kurrentdb) for detailed information.

## Prerequisites

::: tip
To get the best out of this guide, a basic understanding of [Kubernetes concepts](https://kubernetes.io/docs/concepts/) is essential.
:::

Before installing and executing the Operator, the following requirements should be met:

* The Operator has been installed as per the [Installation](../getting-started/installation.md) section.
* A `KurrentDB` has already been backed up.
* The following CLI tools are installed and configured to interact with your Kubernetes cluster. This means the tool must be accessible from your shell's `$PATH`, and your `$KUBECONFIG` environment variable must point to the correct Kubernetes configuration file:
    * [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl)
    * [k9s](https://k9scli.io/topics/install/)

:::important
With the examples listed in this guide, the Operator is assumed to have been deployed such that it can track the `kurrent` namespace for deployments.
:::

## Restoring from a backup

A `KurrentDB` cluster can be restored from a backup by specifying an additional field `sourceBackup` as part of the cluster definition. 

For example, if an existing `KurrentDBBackup` exists called `kurrentdb-cluster-backup`, the following snippet could be used to restore it:


```yaml
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: kurrentdb-cluster
  namespace: kurrent
spec:
  replicas: 1
  image: docker.kurrent.io/kurrent-latest/kurrentdb:25.0.0
  sourceBackup: kurrentdb-cluster-backup
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  network:
    domain: kurrentdb-cluster.kurrent.test
    loadBalancer:
      enabled: true
```
