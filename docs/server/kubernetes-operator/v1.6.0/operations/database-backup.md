---
title: Database Backup
order: 3
---

The sections below detail how database backups can be performed. Refer to the [KurrentDBBackup API](../getting-started/resource-types.md#kurrentdbbackup) for detailed information.

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
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  sourceBackup: kurrentdb-cluster-backup
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  network:
    domain: kurrent.test
    loadBalancer:
      enabled: true
```

## Automatically delete backups with a TTL

A TTL can be set on a backup to delete the backup after a certain amount of time has passed since
its creation.  For example, to delete the backup 5 days after it was created:

```yaml
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackup
metadata:
  name: kurrentdb-cluster
spec:
  volumeSnapshotClassName: ebs-vs
  clusterName: kurrentdb-cluster
  ttl: 5d
```

## Scheduling Backups

A `KurrentDBBackupSchedule` can be created with a CronJob-like schedule.

Schedules also support a `.spec.keep` setting to automatically limit how many backups created by
that schedule are retained.  Using a schedule with `.keep` is slightly safer than using TTLs on the
individual backups.  This is because if, for some reason, you ceased to be able to create new
backups, the TTL will continue to delete backups until you have none left, while in the same
situation .keep would leave all your old snapshots in place until a new one could be created.

For example, to create a new backup every midnight (UTC), and to
keep the last 7 such backups at any time, you could create a `KurrentDBBackupSchedule` resource like
this:

```yaml
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackupSchedule
metadata:
  name: my-backup-schedule
spec:
  schedule: "0 0 * * *"
  timeZone: Etc/UTC
  template:
    metadata:
      name: my-backup
    spec:
      volumeSnapshotClassName: ebs-vs
      clusterName: kurrentdb-cluster
  keep: 7
```
