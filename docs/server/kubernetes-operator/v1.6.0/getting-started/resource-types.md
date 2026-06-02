---
title: Configuration Reference
order: 3
---

The Operator supports the following resource types (known as `Kind`'s):
- `KurrentDB`
- `KurrentDBBackup`
- `KurrentDBBackupSchedule`

## KurrentDB

This resource type is used to define a database deployment.

### API

#### KurrentDBSpec

| Field                                                    | Required | Description                                                                                                                              |
|----------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------|
| `replicas` _integer_                                     | Yes      | Number of nodes in a database cluster.  May be 1, 3, 5, or, for [standalone ReadOnly-Replicas][ror], it may be 0.                        |
| `image` _string_                                         | Yes      | KurrentDB container image URL.  See [Selecting An Image][img], below.                                                                    |
| `resources` _[ResourceRequirements][d1]_                 | No       | Database container resource limits and requests                                                                                          |
| `storage` _[PersistentVolumeClaim][d2]_                  | Yes      | Persistent volume claim settings for the underlying data volume                                                                          |
| `network` _[KurrentDBNetwork][d3]_                       | Yes      | Defines the network configuration to use with the database                                                                               |
| `configuration` _yaml_                                   | No       | Additional configuration to use with the database, see [below](#configuring-kurrent-db)                                                  |
| `environmentSecret` _string_                             | No       | The name of a Secret to populate environment variables.  If the secret changes a rolling restart occurs.                                 |
| `sourceBackup` _string_                                  | No       | Backup name to restore a cluster from                                                                                                    |
| `security` _[KurrentDBSecurity][d4]_                     | No       | Security configuration to use for the database. This is optional, if not specified the cluster will be created without security enabled. |
| `licenseSecret` _[SecretKeySelector][d5]_                | No       | A secret that contains the Enterprise license for the database                                                                           |
| `constraints` _[KurrentDBConstraints][d6]_               | No       | Scheduling constraints for the Kurrent DB pod.                                                                                           |
| `readOnlyReplicas` _[KurrentDBReadOnlyReplicasSpec][d7]_ | No       | Read-only replica configuration for the Kurrent DB Cluster.                                                                              |
| `archiver` _[KurrentDBArchiverSpec][d8]_                 | No       | Archiver replica configuration for the Kurrent DB Cluster.                                                                               |
| `extraMetadata` _[KurrentDBExtraMetadataSpec][d9]_       | No       | Additional annotations and labels for child resources.                                                                                   |
| `quorumNodes` _string array_                             | No       | A list of endpoints (in host:port notation) to reach the quorum nodes when .Replicas is zero, see [standalone ReadOnlyReplicas][ror]     |
| `serviceAccountName` _string_                            | No       | A ServiceAccount for pods to run as (defaults to `default` in the current namespace).  Useful for IRSA, see [archiver example][arx].     |
| `telemetryOptOut` _boolean_                              | No       | Opt-out of telemetry in the KurrentDB cluster.                                                                                           |
| `users` _KurrentDBUsersSpec_                             | No       | Initial user configuration.  No deployment should be considered secure without configure initial user passwords.                         |
| `configReloadKey` _string_                               | No       | Has no effect, except a change to this value triggers a config reload.  See [Manually Triggering Reload or Restart][trg].                |
| `rollingRestartKey` _string_                             | No       | Has no effect, except a change to this value triggers a rolling restart.  See [Manually Triggering Reload or Restart][trg].              |
| `fullRestartKey` _string_                                | No       | Has no effect, except a change to this value triggers a full restart.  See [Manually Triggering Reload or Restart][trg].                 |

[img]: #selecting-an-image
[d1]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#resourcerequirements-v1-core
[d2]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#persistentvolumeclaimspec-v1-core
[d3]: #kurrentdbnetwork
[d4]: #kurrentdbsecurity
[d5]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#secretkeyselector-v1-core
[d6]: #kurrentdbconstraints
[d7]: #kurrentdbreadonlyreplicasspec
[d8]: #kurrentdbarchiverspec
[d9]: #kurrentdbextrametadataspec
[ror]: ../operations/database-deployment.md#deploying-standalone-read-only-replicas
[arx]: ../operations/database-deployment.md#three-node-insecure-cluster-with-archiving
[trg]: ../operations/modify-deployments.md#manually-triggering-reload-or-restart

#### KurrentDBReadOnlyReplicasSpec

Other than `replicas`, each of the fields in `KurrentDBReadOnlyReplicasSpec` default to the corresponding values from the main KurrentDBSpec.

| Field                                        | Required | Description                                                      |
|----------------------------------------------|----------|------------------------------------------------------------------|
| `replicas` _integer_                         | No       | Number of read-only replicas in the cluster.  Defaults to zero.  |
| `resources` _[ResourceRequirements][r1]_     | No       | Database container resource limits and requests.                 |
| `storage` _[PersistentVolumeClaim][r2]_      | No       | Persistent volume claim settings for the underlying data volume. |
| `configuration` _yaml_                       | No       | Additional configuration to use with the database.               |
| `constraints` _[KurrentDBConstraints][r3]_   | No       | Scheduling constraints for the Kurrent DB pod.                   |

[r1]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#resourcerequirements-v1-core
[r2]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#persistentvolumeclaimspec-v1-core
[r3]: #kurrentdbconstraints

#### KurrentDBArchiverSpec

Other than `enabled`, each of the fields in `KurrentDBArchiverSpec` default to the corresponding values from the main KurrentDBSpec.

| Field                                        | Required | Description                                                              |
|----------------------------------------------|----------|--------------------------------------------------------------------------|
| `enabled` _bool_                             | No       | If an Archiver node should be added to the cluster.  Defaults to False.  |
| `resources` _[ResourceRequirements][a1]_     | No       | Database container resource limits and requests.                         |
| `storage` _[PersistentVolumeClaim][a2]_      | No       | Persistent volume claim settings for the underlying data volume.         |
| `configuration` _yaml_                       | No       | Additional configuration to use with the database.                       |
| `constraints` _[KurrentDBConstraints][a3]_   | No       | Scheduling constraints for the Kurrent DB pod.                           |

[a1]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#resourcerequirements-v1-core
[a2]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#persistentvolumeclaimspec-v1-core
[a3]: #kurrentdbconstraints

#### KurrentDBConstraints

| Field                                                                | Required | Description                                                                               |
|----------------------------------------------------------------------|----------|-------------------------------------------------------------------------------------------|
| `nodeSelector` _yaml_                                                | No       | Identifies nodes that the Kurrent DB may consider during scheduling.                      |
| `affinity` _[Affinity][c1]_                                          | No       | The node affinity, pod affinity, and pod anti-affinity for scheduling the Kurrent DB pod. |
| `tolerations` _list of [Toleration][c2]_                             | No       | The tolerations for scheduling the Kurrent DB pod.                                        |
| `topologySpreadConstraints` _list of [TopologySpreadConstraint][c3]_ | No       | The topology spread constraints for scheduling the Kurrent DB pod.                        |

[c1]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#affinity-v1-core
[c2]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#toleration-v1-core
[c3]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#topologyspreadconstraint-v1-core

#### KurrentDBExtraMetadataSpec

| Field                                              | Required | Description                                                         |
|----------------------------------------------------|----------|---------------------------------------------------------------------|
| `all` _[ExtraMetadataSpec][m1]_                    | No       | Extra annotations and labels for all child resource types.          |
| `configMaps` _[ExtraMetadataSpec][m1]_             | No       | Extra annotations and labels for ConfigMaps.                        |
| `statefulSets` _[ExtraMetadataSpec][m1]_           | No       | Extra annotations and labels for StatefulSets.                      |
| `pods` _[ExtraMetadataSpec][m1]_                   | No       | Extra annotations and labels for Pods.                              |
| `persistentVolumeClaims` _[ExtraMetadataSpec][m1]_ | No       | Extra annotations and labels for PersistentVolumeClaims.            |
| `headlessServices` _[ExtraMetadataSpec][m1]_       | No       | Extra annotations and labels for the per-cluster headless Services. |
| `headlessPodServices` _[ExtraMetadataSpec][m1]_    | No       | Extra annotations and labels for the per-pod headless Services.     |
| `loadBalancers` _[ExtraMetadataSpec][m1]_          | No       | Extra annotations and labels for LoadBalancer-type Services.        |

[m1]: #extrametadataspec

Note that select kinds of extra metadata support template expansion to allow multiple instances of
a child resource to be distinguished from one another.  In particular, `ConfigMaps`, `StatefulSets`,
and `HeadlessServices` support "per-node-kind" template expansions:
- `{name}` expands to KurrentDB.metadata.name
- `{namespace}` expands to KurretnDB.metadata.namespace
- `{domain}` expands to the KurrnetDBNetwork.domain
- `{nodeTypeSuffix}` expands to `""` for a quorum node, `"-replica"` for a read-only replica node,
  or `"-archiver"` for an archiver node.

Additionally, `HeadlessPodServices` and `LoadBalancers` support "per-pod" template expansions:
- `{name}` expands to KurrentDB.metadata.name
- `{namespace}` expands to KurretnDB.metadata.namespace
- `{domain}` expands to the KurrnetDBNetwork.domain
- `{nodeTypeSuffix}` expands to `""` for a quorum node, `"-replica"` for a read-only replica node,
  or `"-archiver"` for an archiver node.
- `{podName}` expands to the name of the pod corresponding to the resource
- `{podOrdinal}` the ordinal assigned to the pod corresponding to the resource

Notably, `Pods` and `PersistentVolumeClaims` do not support any template expansions, due to how
`StatefulSets` work.

#### ExtraMetadataSpec

| Field                   | Required  | Description
|-------------------------|-----------|-----------------------------------|
| `labels` _object_       | No        | Extra labels for a resource.      |
| `annotations` _object_  | No        | Extra annotations for a resource. |

#### KurrentDBNetwork

| Field                                        | Required | Description                                                                                                         |
|----------------------------------------------|----------|---------------------------------------------------------------------------------------------------------------------|
| `domain` _string_                            | Yes      | Domain used for external DNS e.g. advertised address exposed in the gossip state                                    |
| `loadBalancer` _[KurrentDBLoadBalancer][n1]_ | Yes      | Defines a load balancer to use with the database                                                                    |
| `fqdnTemplate` _string_                      | No       | The template string used to define the external advertised address of a node.  See below.                           |
| `internodeTrafficStrategy` _string_          | No       | How servers dial each other.  One of `"ServiceName"` (default), `"FQDN"`, or `"SplitDNS"`.  See [details][n2].      |
| `clientTrafficStrategy` _string_             | No       | How clients dial servers.  One of `"ServiceName"` or `"FQDN"` (default).  See [details][n2].                        |
| `splitDNSExtraRules` _list of [DNSRule][n3]_ | No       | Advanced configuration for when `internodeTrafficStrategy` is set to `"SplitDNS"`.                                  |
| `nodePort` _integer_                         | No       | The HTTP port that KurrentDB listens on.  Defaults to 2113.  For priviliged ports, see below.                       |
| `replicationPort` _integer_                  | No       | The TCP port for replication traffic from other nodes.  Defaults to 1112.  For priviliged ports, see below.         |
| `nodeTcpPort` _integer_                      | No       | The TCP port for legacy TCP client traffic.  Defaults to 1113.  For priviliged ports, see below.                    |

[n0]: #KurrentDBNetwork
[n1]: #kurrentdbloadbalancer
[n2]: ../operations/advanced-networking.md#traffic-strategy-options
[n3]: #dnsrule

Note that `fqdnTemplate` supports the following expansions:
- `{name}` expands to KurrentDB.metadata.name
- `{namespace}` expands to KurretnDB.metadata.namespace
- `{domain}` expands to the KurrnetDBNetwork.domain
- `{nodeTypeSuffix}` expands to `""` for a quorum node, `"-replica"` for a read-only replica node,
  or `"-archiver"` for an archiver node.
- `{podName}` expands to the name of the pod

When `fqdnTemplate` is empty, it defaults to `{podName}.{name}{nodeTypeSuffix}.{domain}`.

The ports for `nodePort`, `replicationPort`, and `nodeTcpPort` may be chosen arbitrarily, but note
that the Operator always runs nodes as non-root.  Therefore, to utilize priviliged ports (port
numbers less than 1024), you will need to use images with `setcap cap_net_bind_service+ep` applied
to the `kurrentd` binary inside the image.  Kurrent offers Red Hat-certified images which meet this
criteria, see [Selecting An Image][img], below.

#### DNSRule

| Field              | Required | Description                                                                            |
|--------------------|----------|----------------------------------------------------------------------------------------|
| `host` _string_    | Yes      | A host name that should be intercepted.                                                |
| `result` _string_  | Yes      | An IP address to return, or another hostname to look up for the final IP address.      |
| `regex` _boolean_  | No       | Whether `host` and `result` should be treated as regex patterns.  Defaults to `false`. |

Note that when `regex` is `true`, the regex support is provided by the [go standard regex library](
https://pkg.go.dev/regexp/syntax), and [referencing captured groups](
https://pkg.go.dev/regexp#Regexp.Expand) differs from some other regex implementations.  For
example, to redirect lookups matching the pattern

        <podname>.my-db.my-namespace.svc.cluster.local

to

        <podname>.my-domain.com

you could use the following dns rule:

```yaml
host: ([a-z0-9-]*)\.my-db\.my-namespace\.svc\.cluster\.local
result: ${1}.my-domain.com
regex: true
```

#### KurrentDBLoadBalancer

| Field                        | Required | Description                                                                    |
|------------------------------|----------|--------------------------------------------------------------------------------|
| `enabled` _boolean_          | Yes      | Determines if a load balancer should be deployed for each node                 |
| `allowedIps` _string array_  | No       | List of IP ranges allowed by the load balancer (default will allow all access) |
| `loadBalancerClass` _string_ | No       | The `Service.spec.loadBalancerClass` to use.  Defaults to empty.               |

Note that changing the `loadBalancerClass` will require deleting the old load balancer Service completely and recreating it (which make take a while) because `loadBalancerClass` is an immutable field of a Service.

#### KurrentDBSecurity

| Field                                                                  | Required | Description                                                                                                           |
|------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------|
| `certificateReservedNodeCommonName` _string_                           | No       | Common name for the TLS certificate (this maps directly to the database property `CertificateReservedNodeCommonName`) |
| `certificateAuthoritySecret` _[CertificateSecret](#certificatesecret)_ | No       | Secret containing the CA TLS certificate.  Updates trigger a config reload.  Only `.name` is required; See below.     |
| `certificateSecret` _[CertificateSecret](#certificatesecret)_          | Yes      | Secret containing the TLS certificate to use.  Updates trigger a config reload.                                       |
| `certificateSubjectName` _string_                                      | No       | Deprecated field.  The value of this field is always ignored.                                                         |

Note that in `certificateAuthoritySecret`, only `.name` is required.  `.keyName` is optional; if
provided only that Secret key will be mounted into the pod as a CA.  If not provided, all Secret
keys will be mounted as CAs, which allows for rotating CAs without downtime, by trusting both old
and new CAs for a period of time.  `.privateKeyName` is deprecated and ignored.

#### CertificateSecret

| Field                     | Required | Description                                                      |
|---------------------------|----------|------------------------------------------------------------------|
| `name` _string_           | Yes      | Name of the secret holding the certificate details               |
| `keyName` _string_        | Yes      | Key within the secret containing the TLS certificate             |
| `privateKeyName` _string_ | No       | Key within the secret containing the TLS certificate private key |

#### KurrentDBUsersSpec

| Field                                          | Required | Description                                          |
|------------------------------------------------|----------|------------------------------------------------------|
| adminPasswordSecret _[SecretKeySelector][u1]_  | Yes      | Secret containing initial password for `admin` user. |
| opsPasswordSecret _[SecretKeySelector][u1]_    | Yes      | Secret containing initial password for `ops` user.   |
| customUsers _[KurrentDBUserSpec][u2] array_    | No       | Custom users to add to the database.                 |

The `admin` and `ops` passwords are required if users are configured at all.  Those paswords are set
by initial database creation; when set, the database will never accept the default password
(`changeit)`.  No deployment should be considered secure without configuring these two passwords.

The additioanl users described in `customUsers` are optional, and are configured by the Operator
after the first successful health check.

The Operator does not currently support updates to the intial user configuration.  The Secrets
referenced here are not read after the first time the KurrentDB cluster reaches a healhty state,
and may safely be deleted.

[u1]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#secretkeyselector-v1-core
[u2]: #kurrentdbuserspec

#### KurrentDBUserSpec

| Field                                    | Required | Description                                        |
|------------------------------------------|----------|----------------------------------------------------|
| loginName _string_                       | Yes      | The login name of the user.                        |
| fullName _string_                        | Yes      | The display name of the user.                      |
| passwordSecret _[SecretKeySelector][u1]_ | Yes      | The Secret from which the password should be read. |
| groups _string array_                    | No       | Additional groups to add user to, see below.       |

Note that KurrentDB always adds every new user to a group matching its login name, so the groups
listed in `.groups` are in addition to that default behavior.

The Operator does not currently support updates to the intial user configuration.  The Secrets
referenced here are not read after the first time the KurrentDB cluster reaches a healhty state,
and may safely be deleted.

## KurrentDBBackup

This resource type is used to define a backup for an existing database deployment.

:::important
Resources of this type must be created within the same namespace as the target database cluster to backup.
:::

### API

#### KurrentDBBackupSpec

| Field                                                    | Required | Description                                                                                              |
|----------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------|
| `clusterName` _string_                                   | Yes      | Name of the source database cluster                                                                      |
| `nodeName` _string_                                      | No       | Specific node name within the database cluster to use as the backup. If unspecified, the leader is used. |
| `volumeSnapshotClassName` _string_                       | Yes      | The name of the underlying volume snapshot class to use.                                                 |
| `extraMetadata` _[KurrentDBBackupExtraMetadataSpec][b1]_ | No       | Additional annotations and labels for child resources.                                                   |
| `ttl` _string_                                           | No       | A time-to-live for this backup.  If unspecified, the TTL is treated as infinite.                         |

[b1]: #kurrentdbbackupextrametadataspec

The format of the `ttl` may be in years (`y`), weeks (`w`), days (`d`), hours (`h`), or seconds
(`s`), or a combination like `1d12h`

#### KurrentDBBackupExtraMetadataSpec

| Field                                                            | Required | Description                                                                                 |
|------------------------------------------------------------------|----------|---------------------------------------------------------------------------------------------|
| All _[ExtraMetadataSpec](#extrametadataspec)_                    | No       | Extra annotations and labels for all child resource types (currently only VolumeSnapshots). |
| VolumeSnapshots _[ExtraMetadataSpec](#extrametadataspec)_        | No       | Extra annotations and labels for VolumeSnapshots.                                           |

## KurrentDBBackupSchedule

This resource type is used to define a schedule for creating database backups and retention policies.

#### KurrentDBBackupScheduleSpec

| Field                              | Required | Description                                                                                                                  |
|------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------|
| `schedule` _string_                | Yes      | A CronJob-style schedule.  See [Writing a CronJob Spec][s2].                                                                 |
| `timeZone` _string_                | No       | A timezone specification.  Defaults to `Etc/UTC`.                                                                            |
| `template` _[KurrentDBBackup][s1]_ | Yes      | A `KurrentDBBackup` template.                                                                                                |
| `keep` _integer_                   | No       | The maximum of complete backups this schedule will accumulate before it prunes the oldes ones.  If unset, there is no limit. |
| `suspend` _boolean_                | No       |

[s1]: #kurrentdbbackupspec
[s2]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#writing-a-cronjob-spec

Note that the only metadata allowed in `template.metadata` is `name`, `labels`, and `annotations`.
If `name` is provided, it will be extended with an index like `my-name-1` when creating backups,
otherwise created backups will be based on the name of the schedule resource.

## Selecting an Image

When selecting a KurrentDB image, you may choose from one of Kurrent's standard images:

| Versions           | Image                                                    | Link        |
|--------------------|----------------------------------------------------------|-------------|
| 23.10.x to 24.10.x | `docker.eventstore.com/eventstore/eventstoredb-ee:X.Y.Z` | [link][old] |
| 25.0.0 and greater | `docker.kurrent.io/kurrent-latest/kurrentdb:X.Y.Z`       | [link][std] |

Additionally, Kurrent offers Red Hat-certified KurrentDB images.  These images have the additional
property that they have `setcap cap_net_bind_service+ep` applied to the `kurrentd` binary inside the
image, which allows them to be used in conjunction with setting `.spec.network.nodePort` to a
privileged port, like 443.

These same images without the Red Hat Certification (or official Red Hat sha256 checks) are
available without a Red Hat account directly from Kurrent.  This is useful if you want the
`setcap`-enabled image but don't care about the Red Hat Certification.

| Versions           | Certified | Image                                                    | Link        |
|--------------------|-----------|----------------------------------------------------------|-------------|
| 25.0.0 and greater | Yes       | `registry.connect.redhat.com/kurrent-io/kurrentdb:X.Y.Z` | [link][rhc] |
| 25.0.0 and greater | No        | `docker.kurrent.io/kurrent-latest/kurrentdb-rhel8:X.Y.Z` | [link][pre] |

[old]: https://cloudsmith.io/~eventstore/repos/eventstore/packages/?q=format%3Adocker+name%3Aeventstoredb-ee
[std]: https://cloudsmith.io/~eventstore/repos/kurrent-latest/packages/?q=format%3Adocker+name%3Akurrentdb
[rhc]: https://catalog.redhat.com/en/software/containers/kurrent-io/kurrentdb/690a11e9b1dedf2b2890ef75
[pre]: https://cloudsmith.io/~eventstore/repos/kurrent-latest/packages/?q=format%3Adocker+name%3Akurrentdb-rhel8

## Configuring KurrentDB

The [`KurrentDB.spec.configuration` yaml field](#kurrentdbspec) may contain any valid configuration
values for Kurrent DB.  However, some values may be unnecessary, as the Operator provides some
defaults, while other values may be ignored, as the Operator may override them.

The Operator-defined default configuration values, which may be overridden by the user's
`KurrentDB.spec.configuration` are:

| Default Field                | Default Value |
|------------------------------|---------------|
| DisableLogFile               | true          |
| EnableAtomPubOverHTTP        | true          |
| Insecure                     | false         |
| PrepareTimeoutMs             | 3000          |
| CommitTimeoutMs              | 3000          |
| GossipIntervalMs             | 2000          |
| GossipTimeoutMs              | 5000          |
| LeaderElectionTimeoutMs      | 2000          |
| ReplicationHeartbeatInterval | 1000          |
| ReplicationHeartbeatTimeout  | 2500          |
| NodeHeartbeatInterval        | 1000          |
| NodeHeartbeatTimeout         | 2500          |

The Operator-managed configuration values, which take precedence over the user's
`KurrentDB.spec.configuration`, are:

<!-- Values until ReplicationIp are from pkg/kurrent/config.go -->
<!-- Values after ReplicationIp are from pkg/dbs/factory.go, as pod commandArgs -->

| Managed Field                | Value                                                        |
|------------------------------| -------------------------------------------------------------|
| Db                           | hard-coded volume mount point                                |
| Index                        | hard-coded volume mount point                                |
| Log                          | hard-coded volume mount point                                |
| Insecure                     | true if `KurrentDB.spec.security.certificateSecret` is empty |
| DiscoverViaDns               | false (`GossipSeed` is used instead)                         |
| AllowAnonymousEndpointAccess | true                                                         |
| AllowUnknownOptions          | true                                                         |
| NodeIp                       | 0.0.0.0 (to accept traffic from outside pod)                 |
| ReplicationIp                | 0.0.0.0 (to accept traffic from outside pod)                 |
| NodeHostAdvertiseAs          | Derived from pod name                                        |
| ReplicationHostAdvertiseAs   | Derived from pod name                                        |
| AdveritseHostToClientAs      | Derived from `KurrentDB.spec.newtork.fqdnTemplate`           |
| ClusterSize                  | Derived from `KurrentDB.spec.replicas`                       |
| GossipSeed                   | Derived from pod list                                        |
| ReadOnlyReplica              | Automatically set for ReadOnlyReplica and Archiver pods      |
| NodePort                     | Derived from `KurrentDB.spec.network.nodePort`               |
| ReplicationPort              | Derived from `KurrentDB.spec.network.replicationPort`        |
| NodeTcpPort                  | Derived from `KurrentDB.spec.network.nodeTcpPort`            |
