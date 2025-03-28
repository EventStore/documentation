---
title: Database Backup
order: 2
---

The sections below details how database backups can be performed. Refer to the [KurrentDBBackup API](../getting-started/resource-types.md#kurrentdbbackup) for detailed information.

## Prerequisites

::: tip
To get the best out of this guide, a basic understanding of [Kubernetes concepts](https://kubernetes.io/docs/concepts/) is essential.
:::

Before installing and executing the Operator, the following requirements should be met:

* The Kubernetes cluster already has a volume snapshot class configured.
* The Operator has been installed as per the [Installation](../getting-started/installation.md) section.
* A `KurrentDB` has already been deployed that requires backing up.
* The following CLI tools are installed and configured to interact with your Kubernetes cluster. This means the tool must be accessible from your shell's `$PATH`, and your `$KUBECONFIG` environment variable must point to the correct Kubernetes configuration file:
    * [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl)
    * [k9s](https://k9scli.io/topics/install/)

:::important
With the examples listed in this guide, the Operator is assumed to have been deployed such that it can track the `kurrent` namespace for deployments.
:::

## Backing up the leader

Assuming there is a cluster called `kurrentdb-cluster` that resides in the `kurrent` namespace, the following `KurrentDBBackup` resource can be defined:

```yaml
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackup
metadata:
  name: kurrentdb-cluster
spec:
  volumeSnapshotClassName: ebs-vs
  clusterName: kurrentdb-cluster

```

In the example above, the backup definition leverages the `ebs-vs` volume snapshot class to perform the underlying volume snapshot. This class name will vary per Kubernetes cluster/Cloud provider, please consult with your Kubernetes administrator to determine this value.

The `KurrentDBBackup` type takes an optional `nodeName`. If left blank, the leader will be derived based on the gossip state of the database cluster.

The example above can be deployed using the following steps:
- Copy the YAML snippet above to a file called `backup.yaml`
- Run the following command:

```bash
kubectl -n kurrent apply -f backup.yaml
```

Once deployed, navigate to the [Viewing Backups](#viewing-backups) section.

## Backing up a specific node

Assuming there is a cluster called `kurrentdb-cluster` that resides in the `kurrent` namespace, the following `KurrentDBBackup` resource can be defined:

```yaml
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackup
metadata:
  name: kurrentdb-cluster
spec:
  volumeSnapshotClassName: ebs-vs
  clusterName: kurrentdb-cluster
  nodeName: kurrentdb-1

```

In the example above, the backup definition leverages the `ebs-vs` volume snapshot class to perform the underlying volume snapshot. This class name will vary per Kubernetes cluster, please consult with your Kubernetes administrator to determine this value.

The example above can be deployed using the following steps:
- Copy the YAML snippet above to a file called `backup.yaml`
- Run the following command:

```bash
kubectl -n kurrent apply -f backup.yaml
```

Once deployed, navigate to the [Viewing Backups](#viewing-backups) section.

## Viewing Backups

Using the k9s tool, navigate to the namespaces list using the command `:namespaces`, it should show a screen similar to:

![Namespaces](images/database-backup/namespace-list.png)

From here, press the `Return` key on the namespace where the `KurrentDBBackup` was created, in the screen above the namespace is `kurrent`. Now enter the k9s command `:kurrentdbbackups` and press the `Return` key. The following screen will show a list of database backups for the selected namespace.

![Backup Listing](images/database-backup/backup-list.png)