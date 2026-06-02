---
title: Modify Deployments
order: 2
---

Updating KurrentDB deployments through the Operator is done by modifying the KurrentDB Custom
Resources (CRs) using standard Kubernetes tools.  Most updates are processed almost immediately, but
there is special logic in place around resizing the number of replicas in a cluster.

## Applying Updates

`KurrentDB` instances support updates to:

- Container Image
- Memory
- CPU
- Volume Size (increases only)
- Replicas (node count)
- Configuration

To update the specification of a `KurrentDB` instance, simply issue a patch command via the kubectl tool. In the examples below, the cluster name is `kurrentdb-cluster`. Once patched, the Operator will take care of augmenting the underlying resources, which will cause database pods to be recreated.

### Container Image

```bash
kubectl -n kurrent patch kurrentdb kurrentdb-cluster --type=merge -p '{"spec":{"image": "docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1"}}'
```

### Memory

```bash
kubectl -n kurrent patch kurrentdb kurrentdb-cluster --type=merge -p '{"spec":{"resources": {"requests": {"memory": "2048Mi"}}}}'
```

### CPU

```bash
kubectl -n kurrent patch kurrentdb kurrentdb-cluster --type=merge -p '{"spec":{"resources": {"requests": {"cpu": "2000m"}}}}'
```

### Volume Size

```bash
kubectl -n kurrent patch kurrentdb kurrentdb-cluster --type=merge -p '{"spec":{"storage": {"resources": {"requests": {"storage": "2048Mi"}}}}}'
```

### Replicas

```bash
kubectl -n kurrent patch kurrentdb kurrentdb-cluster --type=merge -p '{"spec":{"replicas": 3}}'
```

Note that the actual count of replicas in a cluster may take time to update.  See [Updating Replica Count](#updating-replica-count), below.

### Configuration

```bash
kubectl -n kurrent patch kurrentdb kurrentdb-cluster --type=merge -p '{"spec":{"configuration": {"ProjectionsLevel": "all", "StartStandardProjections": "true"}}}'
```

## Updating Primary Replica Count

A user configures the KurrentDB cluster by setting the `.spec.replicas` setting of a KurrentDB
resource.  The current actual number of replicas can be observed as `.status.replicas`.  The process
to grow or shrink the replicas in a cluster safely requires carefully stepping the KurrentDB
cluster through a series of consensus states, which the Operator handles automatically.

In both cases, if the resizing flow gets stuck for some reason, you can cancel the resize by setting
`.spec.replicas` back to its original value.

### Upsizing a KurrentDB Cluster

The steps that the Operator takes to go from 1 to 3 nodes in a KurrentDB cluster are:

- Take a VolumeSnapshot of pod 0 (the initial pod).
- Reconfigure pod 0 to expect a three-node cluster.
- Start a new pod 1 from the VolumeSnapshot.
- Wait for pod 0 and pod 1 to establish quorum.
- Start a new pod 2 from the VolumeSnapshot.

Note that the database cannot process writes between the time that the Operator reconfigures pod 0
for a three-node cluster and when pod 0 and pod 1 establish quorum.  The purpose of the
VolumeSnapshot is to greatly reduce the amount of replication pod 1 must do from pod 0 before quorum
is established, which greatly reduce the amount of downtime during the resize.

### Downsizing a KurrentDB Cluster

The steps that the Operator takes to go from 3 nodes to 1 in a KurrentDB cluster are:

- Make sure pod 0 and pod 1 are caught up with the leader (which may be one of them).
- Stop pod 2.
- Wait for quorum to be re-established between pods 0 and 1.
- Stop pod 1.
- Reconfigure pod 0 as a one-node cluster.

Note that the database cannot process writes briefly after the Operator stops pod 2, and again
briefly after the Operator reconfigures pod 0.

:::important
It is technically possible for data loss to occur when the Operator stops pod 2 if there are active
writes against the database, and either of the other two pods happen to fail at approximately the
same time pod 2 stops.

The frequency of an environment failure should hopefully be low enough that this is not a realistic
concern.  However, to reduce the risk to truly zero, you must ensure that there are no writes
against the database at the time when you downsize your cluster.
:::

## Updating Read-Only Replica Count

Since Read-Only Replica nodes are not electable as leaders, it is simpler to increase or decrease
the number of running read-only replicas.  Still, when adding new read-only replicas, the Operator
uses VolumeSnapshots to expedite the initial catch-up reads for new read-only replicas.

The steps that the Operator takes to increase the number of read-only replicas are:

- Take a VolumeSnapshot of a primary node.
- Start new read-only replica node(s) based on that snapshot.

Since an archiver node is a special kind of read-only replica, the logic for enabling or disabling
an archiver is identical to the read-only replica logic.

## Manually Triggering Reload or Restart

The Operator will automatically trigger a configuration reload, a rolling restart, or a full restart
(where all nodes are brought down before bringing them back up) whenever it is required.  For
example, a configuration reload happens automatically when the database log level is changed or a
TLS certificate or certificate authority is changed, since those are the only hot-reloadable
configurations.  Full restarts are triggered any time that a rolling restart would not be possible,
such as converting an insecure cluster to a secure cluster, when old nodes and new nodes would not
be able to talk to each other.

Additionally, the Operator allows you to manually trigger any of those operations by altering one
of:

- `KurrentDB.spec.configReloadKey`
- `KurrentDB.spec.rollingRestartKey`
- `KurrentDB.spec.fullRestartKey`

Each key starts as an empty string and each time a key is changed, the corresponding operation will
be executed.  Administrators may safely ignore these settings.  Still, they may prove useful in
specific scenarios, such as evaluating the Operator, or testing application performance while the
database executes a rolling restart in a staging environment, before applying a reconfiguration to
the production environment.
