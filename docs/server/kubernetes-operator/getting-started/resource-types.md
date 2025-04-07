---
title: Supported Resource Types
order: 3
---

The Operator supports the following resource types (known as `Kind`'s):
- `KurrentDB`
- `KurrentDBBackup`

## KurrentDB

This resource type is used to define a database deployment.

### API

| Field                                                                                                                                       | Required                                                          | Description                                                                                                                              |
|---------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `replicas` _integer_                                                                                                                        | Yes                                                               | Number of nodes in a database cluster (1 or 3)                                                                                           |
| `image` _string_                                                                                                                            | Yes                                                               | KurrentDB container image URL                                                                                                            |
| `resources` _[ResourceRequirements](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#resourcerequirements-v1-core)_     | No                                                                | Database container resource limits and requests                                                                                          |
| `storage` _[PersistentVolumeClaim](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#persistentvolumeclaimspec-v1-core)_ | Yes                                                               | Persistent volume claim settings for the underlying data volume                                                                          |
| `network` _[KurrentDbNetwork](#kurrentdbnetwork)_                                                                                           | Yes                                                               | Defines the network configuration to use with the database                                                                               |
| `configuration` _yaml_                                                                                                                      | No                                                                | Additional configuration to use with the database                                                                                        |
| `sourceBackup` _string_                                                                                                                     | No                                                                | Backup name to restore a cluster from                                                                                                    |
| `security` _[KurrentDbSecurity](#kurrentdbecurity)_                                                                                         | No                                                                | Security configuration to use for the database. This is optional, if not specified the cluster will be created without security enabled. |
| `licenseSecret` _[SecretKeySelector](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#secret-v1-core)_                  | No | A secret that contains the Enterprise license for the database                                                                           |

#### KurrentDbNetwork

| Field                                                            | Required | Description                                                                    |
|------------------------------------------------------------------|----------|--------------------------------------------------------------------------------|
| `domain` _string_                                                | Yes                                                               | Domain used for external DNS e.g. advertised address exposed in the gossip state                                                         |
| `loadBalancer` _[KurrentDbLoadBalancer](#kurrentdbloadbalancer)_ | Yes                                                               | Defines a load balancer to use with the database                                                         |

#### KurrentDbLoadBalancer

| Field               | Required | Description                                                    |
|---------------------|----------|----------------------------------------------------------------|
| `enabled` _boolean_ | Yes                                                               | Determines if a load balancer should be deployed for each node |
| `allowedIps` _string array_                                            | No       | List of IP ranges allowed by the load balancer (default will allow all access)                                        |

#### KurrentDbSecurity

| Field                                                                  | Required | Description                                                                                                           |
|------------------------------------------------------------------------|----------|-----------------------------------------------------------------------------------------------------------------------|
| `certificateSubjectName` _string_                                      | No       | Subject name used in the TLS certificate (this maps directly to the database property `CertificateSubjectName`)                               |
| `certificateReservedNodeCommonName` _string_                           | No       | Common name for the TLS certificate (this maps directly to the database property `CertificateReservedNodeCommonName`) |
| `certificateAuthoritySecret` _[CertificateSecret](#certificatesecret)_ | No       | Secret containing the CA TLS certificate                                                                              |
| `certificateSecret` _[CertificateSecret](#certificatesecret)_          | Yes      | Secret containing the TLS certificate to use                                                                          |

#### CertificateSecret

| Field                     | Required | Description                                                      |
|---------------------------|----------|------------------------------------------------------------------|
| `name` _string_           | Yes      | Name of the secret holding the certificate details               |
| `keyName` _string_        | Yes      | Key within the secret containing the TLS certificate             |
| `privateKeyName` _string_ | No       | Key within the secret containing the TLS certificate private key |


## KurrentDBBackup

This resource type is used to define a backup for an existing database deployment. 

:::important
Resources of this type must be created within the same namespace as the target database cluster to backup.
:::

### API

| Field                  | Required                         | Description                                                                                                                             |
|------------------------|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `clusterName` _string_ | Yes                              | Name of the source database cluster                                                                                                     |
| `nodeName` _string_    | No | Specific node name within the database cluster to use as the backup. If this is not specified, the leader will be picked as the source. |
 | `volumeSnapshotClassName` _string_ | Yes | The name of the underlying volume snapshot class to use.                                                                                |