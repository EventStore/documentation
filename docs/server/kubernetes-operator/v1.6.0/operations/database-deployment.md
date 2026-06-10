---
title: Example Deployments
order: 1
---

This page shows various deployment examples of KurrentDB, starting with a
[full example](#recommended-production-settings) showing Kurrent's recommended production settings,
followed by [incremental examples](#from-zero-to-prod) to build up to that, followed by
[additional examples](#additional-examples) illustrating other supported features and topologies.

## Recommended Production Settings

Kurrent recommends all of the following settings for a production KurrentDB deployment:

* Multiple quorum nodes for high availability.

* TLS enabled with self-signed or LetsEncrypt certificates (self-signed is shown here)

* `admin` and `ops` users are configured with non-default passwords

* Enterprise features of KurrentDB are enabled.

* A backup schedule automates regular backups.

* A `StorageClass` with `reclaimPolicy: Retain` is configured for the database

* A `VolumeSnapshotClass` exists for backups and scale-up operations.

Also see [From Zero To Prod](#from-zero-to-prod) for incremental examples to get here.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: kurrent
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-ca
  namespace: kurrent
spec:
  isCA: true
  commonName: myca
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  secretName: myca-tls
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: myca-issuer
  namespace: kurrent
spec:
  ca:
    secretName: myca-tls
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: kurrentdb-node
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydb.kurrent.svc.cluster.local'
    - '*.mydb-replica.kurrent.svc.cluster.local'
    - '*.mydb-archiver.kurrent.svc.cluster.local'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: myca-issuer
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: v1
kind: Secret
metadata:
  name: my-passwords
  namespace: kurrent
type: Opaque
stringData:
  admin: <THE_ADMIN_PASSWORD>
  ops: <THE_OPS_PASSWORD>
  custom: <THE_CUSTOM_USER_PASSWORD>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    internodeTrafficStrategy: ServiceName
    clientTrafficStrategy: ServiceName
  security:
    certificateReservedNodeCommonName: kurrentdb-node
    certificateAuthoritySecret:
      name: myca-tls
      keyName: ca.crt
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  users:
    adminPasswordSecret:
      name: my-passwords
      key: admin
    opsPasswordSecret:
      name: my-passwords
      key: ops
    customUsers:
    - loginName: custom
      fullName: Custom
      passwordSecret:
        name: my-passwords
        key: custom
      groups:
      - $admins
  volumeSnapshotClassName: my-volume-snapshot-class
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackupSchedule
metadata:
  name: my-schedule
  namespace: kurrent
spec:
  schedule: "0 0 * * *"
  timeZone: Etc/UTC
  template:
    spec:
      clusterName: mydb
  keep: 7
```

## From Zero to Prod

This section illustrates how to build up from the simplest possible "Hello, World" deployment in
incremental steps.  Each step shows the diff that is applied in that step as well as the full
manifest up to that point.

### Configure a `StorageClass`

*This is step 1 of 8 in the "From Zero To Prod" series of examples.*

Configure `StorageClass` first because you can't change the StorageClass for the
PersistentVolumes behind your database without deleting and recreating it.

This example illustrates a `StorageClass` in Azure:

- It uses `reclaimPolicy: Retain` to preserve your database disks as a layer of protection against
  data loss (in case you delete the `KurrentDB` accidentally).

- It uses `allowVolumeExpansion: true` to allow you to grow disks without downtime if KurrentDB runs
  out of disk space in the future.

- (Azure-specific): It uses `parameters.skuName: Premium_LRS` to select high-performance,
  low-latency disk for your database.

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
```


### "Hello, World" (single node insecure cluster)

*This is step 2 of 8 in the "From Zero To Prod" series of examples.*

This section illustrates a single-node insecure cluster.  It uses the `StorageClass` you just
created.

::: tabs

@tab Diff

Add a `KurrentDB` and reference the `StorageClass` you created above.

```diff
 apiVersion: storage.k8s.io/v1
 kind: StorageClass
 ...
+---
+apiVersion: kubernetes.kurrent.io/v1
+kind: KurrentDB
+metadata:
+  name: mydb
+  namespace: kurrent
+spec:
+  replicas: 1
+  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
+  resources:
+    requests:
+      cpu: 4000m
+      memory: 16Gi
+  storage:
+    volumeMode: "Filesystem"
+    accessModes:
+      - ReadWriteOnce
+    resources:
+      requests:
+        storage: 100Gi
+    storageClassName: my-storage-class
+  network:
+    domain: mydomain.tld
+    fqdnTemplate: '{podName}.{domain}'
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 1
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
```

:::

### Configuring Your `VolumeSnapshotClass`

*This is step 3 of 8 in the "From Zero To Prod" series of examples.*

You will also want to configure a `VolumeSnapshotClass` (unless your Kubernetes cluster has a
default configured and you want to use that).  The `VolumeSnapshotClass` is used for both backups
and when increasing the number of nodes in the cluster.

::: tabs

@tab Diff

Add a `VolumeSnapshotClass` and reference it in your `KurrentDB`.

```diff
 apiVersion: storage.k8s.io/v1
 kind: StorageClass
 ...
+---
+apiVersion: snapshot.storage.k8s.io/v1
+kind: VolumeSnapshotClass
+metadata:
+  name: my-volume-snapshot-class
+driver: disk.csi.azure.com
+deletionPolicy: Delete
 ---
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
+  volumeSnapshotClassName: my-volume-snapshot-class
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 1
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
  volumeSnapshotClassName: my-volume-snapshot-class
```

:::

### Unlocking Enterprise Features

*This is step 4 of 8 in the "From Zero To Prod" series of examples.*

Take advantage of the awesome enterprise features of our database, like auto-scavenging and
archiving!

Note that this is a distinct license from the Operator license you provided during the Helm
installation.

::: tabs

@tab Diff

Add a `Secret` with your database license key and reference it in your `KurrentDB`.

```diff
 apiVersion: snapshot.storage.k8s.io/v1
 kind: VolumeSnapshotClass
 ...
+---
+apiVersion: v1
+kind: Secret
+metadata:
+  name: my-license-secret
+  namespace: kurrent
+type: Opaque
+stringData:
+  licenseKey: <YOUR_LICENSE_KEY>
 ---
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
+  licenseSecret:
+    name: my-license-secret
+    key: licenseKey
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 1
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  volumeSnapshotClassName: my-volume-snapshot-class
```

:::

### Enabling High Availability

*This is step 5 of 8 in the "From Zero To Prod" series of examples.*

Change your `KurrentDB.spec.replicas` to multiple nodes (3 or 5) to enable high availability.  The
Operator can even make this change safely to an existing cluster with minimal downtime.

::: tabs

@tab Diff

Just change your `.replicas`!

```diff
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
-  replicas: 1
+  replicas: 3
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  volumeSnapshotClassName: my-volume-snapshot-class
```

:::

### Enabling TLS (self-signed)

*This is step 6 of 8 in the "From Zero To Prod" series of examples.*

Before deploying this cluster, be sure to follow the steps in [Using Self-Signed Certificates](
managing-certificates.md#using-self-signed-certificates).

Most examples on this page assume self-signed certificates, but if you prefer a publicly-trusted
certificate authority like LetsEncrypt, you can follow
[the LetsEncrypt example](#enabling-tls-letsencrypt) instead of this step.

::: tabs

@tab Diff

Add the `cert-manager`-related objects to create a CA and leaf certificates.

Reference the CA and TLS key Secrets in your `KurrentDB`.

This example uses Service names as `dnsNames` on the `Certificate`, so it also configures both
`internodeTrafficStrategy` and `clientTrafficStrategy` to `ServiceName`.  See
[Advanced Networking](./advanced-networking.md) for details.

```diff
+---
+apiVersion: cert-manager.io/v1
+kind: Issuer
+metadata:
+  name: selfsigned-issuer
+  namespace: kurrent
+spec:
+  selfSigned: {}
+---
+apiVersion: cert-manager.io/v1
+kind: Certificate
+metadata:
+  name: selfsigned-ca
+  namespace: kurrent
+spec:
+  isCA: true
+  commonName: myca
+  subject:
+    organizations:
+      - Kurrent
+    organizationalUnits:
+      - Cloud
+  secretName: myca-tls
+  privateKey:
+    algorithm: RSA
+    encoding: PKCS1
+    size: 2048
+  issuerRef:
+    name: selfsigned-issuer
+    kind: Issuer
+    group: cert-manager.io
+---
+apiVersion: cert-manager.io/v1
+kind: Issuer
+metadata:
+  name: myca-issuer
+  namespace: kurrent
+spec:
+  ca:
+    secretName: myca-tls
+---
+apiVersion: cert-manager.io/v1
+kind: Certificate
+metadata:
+  name: mydb
+  namespace: kurrent
+spec:
+  secretName: mydb-tls
+  isCA: false
+  usages:
+    - client auth
+    - server auth
+    - digital signature
+    - key encipherment
+  commonName: kurrentdb-node
+  subject:
+    organizations:
+      - Kurrent
+    organizationalUnits:
+      - Cloud
+  dnsNames:
+    - '*.mydb.kurrent.svc.cluster.local'
+    - '*.mydb-replica.kurrent.svc.cluster.local'
+    - '*.mydb-archiver.kurrent.svc.cluster.local'
+  privateKey:
+    algorithm: RSA
+    encoding: PKCS1
+    size: 2048
+  issuerRef:
+    name: myca-issuer
+    kind: Issuer
 ---
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
   network:
     ...
+    internodeTrafficStrategy: ServiceName
+    clientTrafficStrategy: ServiceName
+  security:
+    certificateReservedNodeCommonName: kurrentdb-node
+    certificateAuthoritySecret:
+      name: myca-tls
+      keyName: ca.crt
+    certificateSecret:
+      name: mydb-tls
+      keyName: tls.crt
+      privateKeyName: tls.key
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: kurrent
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-ca
  namespace: kurrent
spec:
  isCA: true
  commonName: myca
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  secretName: myca-tls
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: myca-issuer
  namespace: kurrent
spec:
  ca:
    secretName: myca-tls
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: kurrentdb-node
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydb.kurrent.svc.cluster.local'
    - '*.mydb-replica.kurrent.svc.cluster.local'
    - '*.mydb-archiver.kurrent.svc.cluster.local'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: myca-issuer
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    internodeTrafficStrategy: ServiceName
    clientTrafficStrategy: ServiceName
  security:
    certificateReservedNodeCommonName: kurrentdb-node
    certificateAuthoritySecret:
      name: myca-tls
      keyName: ca.crt
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  volumeSnapshotClassName: my-volume-snapshot-class
```

:::

### Configuring Users

*This is step 7 of 8 in the "From Zero To Prod" series of examples.*

::: tabs

@tab Diff

Add a secret with the desired `admin` and `ops` passwords (and any other custom users you wish to
create) and reference it in your `KurrentDB`.

```diff
+---
+apiVersion: v1
+kind: Secret
+metadata:
+  name: my-passwords
+  namespace: kurrent
+type: Opaque
+stringData:
+  admin: <THE_ADMIN_PASSWORD>
+  ops: <THE_OPS_PASSWORD>
+  custom: <THE_CUSTOM_USER_PASSWORD>
 ---
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
+  users:
+    adminPasswordSecret:
+      name: my-passwords
+      key: admin
+    opsPasswordSecret:
+      name: my-passwords
+      key: ops
+    customUsers:
+    - loginName: custom
+      fullName: Custom
+      passwordSecret:
+        name: my-passwords
+        key: custom
+      groups:
+      - $admins
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: kurrent
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-ca
  namespace: kurrent
spec:
  isCA: true
  commonName: myca
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  secretName: myca-tls
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: myca-issuer
  namespace: kurrent
spec:
  ca:
    secretName: myca-tls
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: kurrentdb-node
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydb.kurrent.svc.cluster.local'
    - '*.mydb-replica.kurrent.svc.cluster.local'
    - '*.mydb-archiver.kurrent.svc.cluster.local'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: myca-issuer
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: v1
kind: Secret
metadata:
  name: my-passwords
  namespace: kurrent
type: Opaque
stringData:
  admin: <THE_ADMIN_PASSWORD>
  ops: <THE_OPS_PASSWORD>
  custom: <THE_CUSTOM_USER_PASSWORD>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    internodeTrafficStrategy: ServiceName
    clientTrafficStrategy: ServiceName
  security:
    certificateReservedNodeCommonName: kurrentdb-node
    certificateAuthoritySecret:
      name: myca-tls
      keyName: ca.crt
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  users:
    adminPasswordSecret:
      name: my-passwords
      key: admin
    opsPasswordSecret:
      name: my-passwords
      key: ops
    customUsers:
    - loginName: custom
      fullName: Custom
      passwordSecret:
        name: my-passwords
        key: custom
      groups:
      - $admins
  volumeSnapshotClassName: my-volume-snapshot-class
```

:::

### Scheduling Backups

*This is the final step in the "From Zero To Prod" series of examples.*

::: tabs

@tab Diff

Just add a `KurrentDBBackupSchedule` with a `CronJob`-like time specification.  Here's an example of
that takes nightly backups (at midnight UTC) and keeps the latest 7 backups.

```diff
 ---
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
+---
+apiVersion: kubernetes.kurrent.io/v1
+kind: KurrentDBBackupSchedule
+metadata:
+  name: my-schedule
+  namespace: kurrent
+spec:
+  schedule: "0 0 * * *"
+  timeZone: Etc/UTC
+  template:
+    spec:
+      clusterName: mydb
+  keep: 7
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: kurrent
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-ca
  namespace: kurrent
spec:
  isCA: true
  commonName: myca
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  secretName: myca-tls
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: myca-issuer
  namespace: kurrent
spec:
  ca:
    secretName: myca-tls
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: kurrentdb-node
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydb.kurrent.svc.cluster.local'
    - '*.mydb-replica.kurrent.svc.cluster.local'
    - '*.mydb-archiver.kurrent.svc.cluster.local'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: myca-issuer
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: v1
kind: Secret
metadata:
  name: my-passwords
  namespace: kurrent
type: Opaque
stringData:
  admin: <THE_ADMIN_PASSWORD>
  ops: <THE_OPS_PASSWORD>
  custom: <THE_CUSTOM_USER_PASSWORD>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    internodeTrafficStrategy: ServiceName
    clientTrafficStrategy: ServiceName
  security:
    certificateReservedNodeCommonName: kurrentdb-node
    certificateAuthoritySecret:
      name: myca-tls
      keyName: ca.crt
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  users:
    adminPasswordSecret:
      name: my-passwords
      key: admin
    opsPasswordSecret:
      name: my-passwords
      key: ops
    customUsers:
    - loginName: custom
      fullName: Custom
      passwordSecret:
        name: my-passwords
        key: custom
      groups:
      - $admins
  volumeSnapshotClassName: my-volume-snapshot-class
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackupSchedule
metadata:
  name: my-schedule
  namespace: kurrent
spec:
  schedule: "0 0 * * *"
  timeZone: Etc/UTC
  template:
    spec:
      clusterName: mydb
  keep: 7
```

:::

## Additional Examples

This section illustrates additional Operator features to help you reach your desired topology and
configuration.

Diffs below are relative to the [Recommended Production Settings](#recommended-production-settings)
unless otherwise stated.

### Deploying Read-Only Replica Nodes

Additional read-only replica nodes can increase the read throughput of your cluster.  Note that
read-only replicas are only allowed in clustered configurations (where `spec.replicas > 1`).

Read-only replica nodes may be configured with different settings than the quorum nodes.  See
[KurrentDBReadOnlyReplicasSpec](../getting-started/resource-types.md#kurrentdbreadonlyreplicasspec)
for details.

::: tabs

@tab Diff

Just add readOnlyReplicas.replicas!

```diff
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
   replicas: 3
+  readOnlyReplicas:
+    replicas: 2
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: kurrent
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-ca
  namespace: kurrent
spec:
  isCA: true
  commonName: myca
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  secretName: myca-tls
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: myca-issuer
  namespace: kurrent
spec:
  ca:
    secretName: myca-tls
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: kurrentdb-node
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydb.kurrent.svc.cluster.local'
    - '*.mydb-replica.kurrent.svc.cluster.local'
    - '*.mydb-archiver.kurrent.svc.cluster.local'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: myca-issuer
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: v1
kind: Secret
metadata:
  name: my-passwords
  namespace: kurrent
type: Opaque
stringData:
  admin: <THE_ADMIN_PASSWORD>
  ops: <THE_OPS_PASSWORD>
  custom: <THE_CUSTOM_USER_PASSWORD>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  readOnlyReplicas:
    replicas: 2
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    internodeTrafficStrategy: ServiceName
    clientTrafficStrategy: ServiceName
  security:
    certificateReservedNodeCommonName: kurrentdb-node
    certificateAuthoritySecret:
      name: myca-tls
      keyName: ca.crt
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  users:
    adminPasswordSecret:
      name: my-passwords
      key: admin
    opsPasswordSecret:
      name: my-passwords
      key: ops
    customUsers:
    - loginName: custom
      fullName: Custom
      passwordSecret:
        name: my-passwords
        key: custom
      groups:
      - $admins
  volumeSnapshotClassName: my-volume-snapshot-class
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackupSchedule
metadata:
  name: my-schedule
  namespace: kurrent
spec:
  schedule: "0 0 * * *"
  timeZone: Etc/UTC
  template:
    spec:
      clusterName: mydb
  keep: 7
```

:::

### Deploying An Archiver Node

Enabling an Archiver node in your cluster allows you to keep your "hot" recent data on local,
high-performance disk, while sending your "cold" older data to cheap blob storage.  This can be a
boon for certain applications.

Archiver nodes are a special case of read-only replicas, so like all read-only replicas, an archiver
can only be enabled in a clustered configuration (`.spec.replicas > 1`).

Also, all nodes in the cluster (not just the archiver) need access to the blob storage backend.  For
production deployments, we recommend configuring IRSA for your cloud (see docs for [AWS][irsaaws],
[Azure][irsaazure], and [GCP][irsagcp]), as this provides the best security and lets the cloud
provider manage the credentials, but in test clusters it may be sufficient to use the
`KurrentDB.spec.environmentSecret` to pass cloud credentials into the KurrentDB pods as environment
variables.

[irsaaws]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
[irsaazure]: https://learn.microsoft.com/en-us/azure/aks/workload-identity-deploy-cluster
[irsagcp]: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/workload-identity#kubernetes-sa-to-iam

::: tabs

@tab Diff

- Enable archiving for all nodes (in `.configuration`)

- Enable the archiver node itself (`.archiver.enabled`)

- Deploy with suitable blob storage credentials (this example assumes [Azure IRSA][irsaazure])

```diff
+---
+apiVersion: v1
+kind: ServiceAccount
+metadata:
+  name: my-irsa-service-account
+  namespace: kurrent
+  annotations:
+    azure.workload.identity/client-id: <USER_ASSIGNED_CLIENT_ID>
 ---
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   replicas: 3
+  archiver:
+    enabled: true
   ...
+  configuration:
+    Archive:
+      Enabled: true
+      RetainAtLeast:
+        Days: 0
+        LogicalBytes: 1073741824  # 1GiB
+      StorageType: S3
+      S3:
+        Region: us-west-1
+        Bucket: my-bucket
+  serviceAccountName: my-irsa-service-account
+  extraMetadata:
+    pods:
+      labels:
+        azure.workload.identity/use: "true"
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: kurrent
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-ca
  namespace: kurrent
spec:
  isCA: true
  commonName: myca
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  secretName: myca-tls
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: myca-issuer
  namespace: kurrent
spec:
  ca:
    secretName: myca-tls
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: kurrentdb-node
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydb.kurrent.svc.cluster.local'
    - '*.mydb-replica.kurrent.svc.cluster.local'
    - '*.mydb-archiver.kurrent.svc.cluster.local'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: myca-issuer
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: v1
kind: Secret
metadata:
  name: my-passwords
  namespace: kurrent
type: Opaque
stringData:
  admin: <THE_ADMIN_PASSWORD>
  ops: <THE_OPS_PASSWORD>
  custom: <THE_CUSTOM_USER_PASSWORD>
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-irsa-service-account
  namespace: kurrent
  annotations:
    azure.workload.identity/client-id: <USER_ASSIGNED_CLIENT_ID>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  archiver:
    enabled: true
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    internodeTrafficStrategy: ServiceName
    clientTrafficStrategy: ServiceName
  security:
    certificateReservedNodeCommonName: kurrentdb-node
    certificateAuthoritySecret:
      name: myca-tls
      keyName: ca.crt
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  configuration:
    Archive:
      Enabled: true
      RetainAtLeast:
        Days: 0
        LogicalBytes: 1073741824  # 1GiB
      StorageType: S3
      S3:
        Region: us-west-1
        Bucket: my-bucket
  serviceAccountName: my-irsa-service-account
  extraMetadata:
    pods:
      labels:
        azure.workload.identity/use: "true"
  users:
    adminPasswordSecret:
      name: my-passwords
      key: admin
    opsPasswordSecret:
      name: my-passwords
      key: ops
    customUsers:
    - loginName: custom
      fullName: Custom
      passwordSecret:
        name: my-passwords
        key: custom
      groups:
      - $admins
  volumeSnapshotClassName: my-volume-snapshot-class
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackupSchedule
metadata:
  name: my-schedule
  namespace: kurrent
spec:
  schedule: "0 0 * * *"
  timeZone: Etc/UTC
  template:
    spec:
      clusterName: mydb
  keep: 7
```

:::

### Deploying With Scheduling Constraints

The pods created for a KurrentDB resource can be configured with any of the constraints commonly
applied to pods:

- [Node Selectors][ns]
- [Affinity and Anti-Affinity][aa]
- [Topology Spread Constraints][ts]
- [Tolerations][tl]
- [Node Name][nn]

If no scheduling constraints are configured, the Operator sets a default soft constraint configuring
pod anti-affinity such that multiple replicas will prefer to run on different nodes, for better
fault tolerance.

In cloud deployments, you may want to maximize uptime by asking each replica of a KurrentDB cluster
to be deployed in a different availability zone.  The following KurrentDB resource does that, and
also requires KurrentDB to schedule pods onto nodes labeled with `machine-size:large`:

[ns]: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector
[aa]: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#affinity-and-anti-affinity
[ts]: https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/
[tl]: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
[nn]: https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodename

::: tabs

@tab Diff

Just add constraints to your `KurrentDB`:


```diff
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
+  constraints:
+    nodeSelector:
+      machine-size: large
+    topologySpreadConstraints:
+    - maxSkew: 1
+      topologyKey: zone
+      labelSelector:
+        matchLabels:
+          app.kubernetes.io/part-of: kurrentdb-operator
+          app.kubernetes.io/name: mydb
+      whenUnsatisfiable: DoNotSchedule
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: kurrent
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-ca
  namespace: kurrent
spec:
  isCA: true
  commonName: myca
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  secretName: myca-tls
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: myca-issuer
  namespace: kurrent
spec:
  ca:
    secretName: myca-tls
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: kurrentdb-node
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydb.kurrent.svc.cluster.local'
    - '*.mydb-replica.kurrent.svc.cluster.local'
    - '*.mydb-archiver.kurrent.svc.cluster.local'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: myca-issuer
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: v1
kind: Secret
metadata:
  name: my-passwords
  namespace: kurrent
type: Opaque
stringData:
  admin: <THE_ADMIN_PASSWORD>
  ops: <THE_OPS_PASSWORD>
  custom: <THE_CUSTOM_USER_PASSWORD>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  constraints:
    nodeSelector:
      machine-size: large
    topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: zone
      labelSelector:
        matchLabels:
          app.kubernetes.io/part-of: kurrentdb-operator
          app.kubernetes.io/name: mydb
      whenUnsatisfiable: DoNotSchedule
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    internodeTrafficStrategy: ServiceName
    clientTrafficStrategy: ServiceName
  security:
    certificateReservedNodeCommonName: kurrentdb-node
    certificateAuthoritySecret:
      name: myca-tls
      keyName: ca.crt
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  users:
    adminPasswordSecret:
      name: my-passwords
      key: admin
    opsPasswordSecret:
      name: my-passwords
      key: ops
    customUsers:
    - loginName: custom
      fullName: Custom
      passwordSecret:
        name: my-passwords
        key: custom
      groups:
      - $admins
  volumeSnapshotClassName: my-volume-snapshot-class
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackupSchedule
metadata:
  name: my-schedule
  namespace: kurrent
spec:
  schedule: "0 0 * * *"
  timeZone: Etc/UTC
  template:
    spec:
      clusterName: mydb
  keep: 7
```

:::

### Custom Database Configuration

If custom parameters are required in the underlying database configuration then these can be
specified using the `configuration` YAML block within a `KurrentDB`. The parameters which are
defaulted or overridden by the operator are listed [in the CRD reference](
../getting-started/resource-types.md#configuring-kurrentdb).

::: tabs

@tab Diff

Just add a `configuration` to your `KurrentDB`:

```diff
 ---
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
+  configuration:
+    RunProjections: all
+    StartStandardProjections: true
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: kurrent
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-ca
  namespace: kurrent
spec:
  isCA: true
  commonName: myca
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  secretName: myca-tls
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: selfsigned-issuer
    kind: Issuer
    group: cert-manager.io
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: myca-issuer
  namespace: kurrent
spec:
  ca:
    secretName: myca-tls
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: kurrentdb-node
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydb.kurrent.svc.cluster.local'
    - '*.mydb-replica.kurrent.svc.cluster.local'
    - '*.mydb-archiver.kurrent.svc.cluster.local'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: myca-issuer
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: v1
kind: Secret
metadata:
  name: my-passwords
  namespace: kurrent
type: Opaque
stringData:
  admin: <THE_ADMIN_PASSWORD>
  ops: <THE_OPS_PASSWORD>
  custom: <THE_CUSTOM_USER_PASSWORD>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  configuration:
    RunProjections: all
    StartStandardProjections: true
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    internodeTrafficStrategy: ServiceName
    clientTrafficStrategy: ServiceName
  security:
    certificateReservedNodeCommonName: kurrentdb-node
    certificateAuthoritySecret:
      name: myca-tls
      keyName: ca.crt
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  users:
    adminPasswordSecret:
      name: my-passwords
      key: admin
    opsPasswordSecret:
      name: my-passwords
      key: ops
    customUsers:
    - loginName: custom
      fullName: Custom
      passwordSecret:
        name: my-passwords
        key: custom
      groups:
      - $admins
  volumeSnapshotClassName: my-volume-snapshot-class
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackupSchedule
metadata:
  name: my-schedule
  namespace: kurrent
spec:
  schedule: "0 0 * * *"
  timeZone: Etc/UTC
  template:
    spec:
      clusterName: mydb
  keep: 7
```

:::

### Enabling TLS (LetsEncrypt)

Instead of self-signed certificates, you may wish to configure certificates through a public
Certificate Authority, like LetsEncrypt.

::: note
You will need to configure your `cert-manager` installation to authenticate with your DNS provider
for automatic certificate issuance.  `cert-manager` documents how to integrate with
[each of their supported DNS providers][cm-dns01], and this example assumes you have followed their
[integration with AzureDNS][cm-az].
:::

[cm-dns01]: https://cert-manager.io/docs/configuration/acme/dns01/
[cm-az]: https://cert-manager.io/docs/configuration/acme/dns01/#supported-dns01-providers

:::: tabs

@tab Diff

::: note
For readability, this diff omits the removal of lines from the
[Enabling TLS (self-signed)](#enabling-tls-self-signed) step.
:::

Add an `Issuer` that connects cert-manager to your DNS provider and to LetsEncrypt.

Add a `Certificate` to be generated by LetsEncrypt.

Reference the TLS key Secret in your `KurrentDB`.

Configure `.network.loadBalancer.enabled: true` so your external clients can access your KurrentDB
according to its `fqdnTemplate`.

Configure `internodeTrafficStrategy` to `SplitDNS` so inter-node traffic avoids hairpin traffic
patterns (see [Advanced Networking](./advanced-networking.md) for detail).

Also configure `clientTrafficStrategy` to `FQDN` so that server nodes advertise themselves to
clients according to the `fqdnTemplate` setting.


```diff
+---
+apiVersion: cert-manager.io/v1
+kind: Issuer
+metadata:
+  name: letsencrypt
+  namespace: kurrent
+spec:
+  acme:
+    server: https://acme-v02.api.letsencrypt.org/directory
+    email: <YOUR_EMAIL_ADDRESS>
+    privateKeySecretRef:
+      name: letsencrypt-issuer-key
+    solvers:
+    - dns01:
+        azureDNS:
+          hostedZoneName: <YOUR_AZURE_ZONE_NAME>
+          resourceGroupName: <YOUR_AZURE_RESOURCE_GROUP>
+          subscriptionID: <YOUR_AZURE_SUBSCRIPTION_ID>
+          environment: AzurePublicCloud
+          managedIdentity:
+            clientID: <YOUR_LETSENCRYPT_CLIENT_ID>
+---
+apiVersion: cert-manager.io/v1
+kind: Certificate
+metadata:
+  name: mydb
+  namespace: kurrent
+spec:
+  secretName: mydb-tls
+  isCA: false
+  usages:
+    - client auth
+    - server auth
+    - digital signature
+    - key encipherment
+  commonName: '*.mydomain.tld'
+  subject:
+    organizations:
+      - Kurrent
+    organizationalUnits:
+      - Cloud
+  dnsNames:
+    - '*.mydomain.tld'
+  privateKey:
+    algorithm: RSA
+    encoding: PKCS1
+    size: 2048
+  issuerRef:
+    name: letsencrypt
+    kind: Issuer
 ---
 apiVersion: kubernetes.kurrent.io/v1
 kind: KurrentDB
 metadata:
   name: mydb
   namespace: kurrent
 spec:
   ...
   network:
     ...
+    loadBalancer:
+      enabled: true
+    internodeTrafficStrategy: SplitDNS
+    clientTrafficStrategy: FQDN
+  security:
+    certificateReservedNodeCommonName: '*.mydomain.tld'
+    certificateSecret:
+      name: mydb-tls
+      keyName: tls.crt
+      privateKeyName: tls.key
```

@tab Full Manifest

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: my-storage-class
provisioner: disk.csi.azure.com
reclaimPolicy: Retain
allowVolumeExpansion: true
parameters:
  skuName: Premium_LRS
volumeBindingMode: WaitForFirstConsumer
---
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshotClass
metadata:
  name: my-volume-snapshot-class
driver: disk.csi.azure.com
deletionPolicy: Delete
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: letsencrypt
  namespace: kurrent
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <YOUR_EMAIL_ADDRESS>
    privateKeySecretRef:
      name: letsencrypt-issuer-key
    solvers:
    - dns01:
        azureDNS:
          hostedZoneName: <YOUR_AZURE_ZONE_NAME>
          resourceGroupName: <YOUR_AZURE_RESOURCE_GROUP>
          subscriptionID: <YOUR_AZURE_SUBSCRIPTION_ID>
          environment: AzurePublicCloud
          managedIdentity:
            clientID: <YOUR_LETSENCRYPT_CLIENT_ID>
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: '*.mydomain.tld'
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydomain.tld'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: letsencrypt
    kind: Issuer
---
apiVersion: v1
kind: Secret
metadata:
  name: my-license-secret
  namespace: kurrent
type: Opaque
stringData:
  licenseKey: <YOUR_LICENSE_KEY>
---
apiVersion: v1
kind: Secret
metadata:
  name: my-passwords
  namespace: kurrent
type: Opaque
stringData:
  admin: <THE_ADMIN_PASSWORD>
  ops: <THE_OPS_PASSWORD>
  custom: <THE_CUSTOM_USER_PASSWORD>
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
    storageClassName: my-storage-class
  network:
    domain: mydomain.tld
    fqdnTemplate: '{podName}.{domain}'
    loadBalancer:
      enabled: true
    internodeTrafficStrategy: SplitDNS
    clientTrafficStrategy: FQDN
  security:
    certificateReservedNodeCommonName: '*.mydomain.tld'
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
  licenseSecret:
    name: my-license-secret
    key: licenseKey
  users:
    adminPasswordSecret:
      name: my-passwords
      key: admin
    opsPasswordSecret:
      name: my-passwords
      key: ops
    customUsers:
    - loginName: custom
      fullName: Custom
      passwordSecret:
        name: my-passwords
        key: custom
      groups:
      - $admins
  volumeSnapshotClassName: my-volume-snapshot-class
---
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDBBackupSchedule
metadata:
  name: my-schedule
  namespace: kurrent
spec:
  schedule: "0 0 * * *"
  timeZone: Etc/UTC
  template:
    spec:
      clusterName: mydb
  keep: 7
```

::::

### Deploying Standalone Read-Only Replicas

::: note
This is an advanced example.  Also read: [Advanced Networking](./advanced-networking.md).
:::

This example illustrates a topology where a pair of read-only replicas is deployed in a different
Kubernetes cluster than where the quorum nodes are deployed.

We make the following assumptions:
- LetsEncrypt certificates are used everywhere, to ease certificate management
- LoadBalancers are enabled to ensure each node is accessible through its FQDN
- `internodeTrafficStrategy` is `"SplitDNS"` to avoid hairpin traffic patterns between servers
- the quorum nodes will have `-qn` suffixes in their FQDN while the read-only replicas will have
  `-rr` suffixes

A LetsEncrypt `Issuer` and `Certificate` should be deployed in **both** clusters.  This example
assumes you have followed their [integration with AzureDNS][cm-az]:

```yaml
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: letsencrypt
  namespace: kurrent
spec:
  acme:
    server: https://acme-v02.api.letsencrypt.org/directory
    email: <YOUR_EMAIL_ADDRESS>
    privateKeySecretRef:
      name: letsencrypt-issuer-key
    solvers:
    - dns01:
        azureDNS:
          hostedZoneName: <YOUR_AZURE_ZONE_NAME>
          resourceGroupName: <YOUR_AZURE_RESOURCE_GROUP>
          subscriptionID: <YOUR_AZURE_SUBSCRIPTION_ID>
          environment: AzurePublicCloud
          managedIdentity:
            clientID: <YOUR_LETSENCRYPT_CLIENT_ID>
---
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: mydb
  namespace: kurrent
spec:
  secretName: mydb-tls
  isCA: false
  usages:
    - client auth
    - server auth
    - digital signature
    - key encipherment
  commonName: '*.mydomain.tld'
  subject:
    organizations:
      - Kurrent
    organizationalUnits:
      - Cloud
  dnsNames:
    - '*.mydomain.tld'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: letsencrypt
    kind: Issuer
```

This `KurrentDB` resource defines the quorum nodes in one cluster:

```yaml
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 3
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
  network:
    domain: mydomain.tld
    loadBalancer:
      enabled: true
    fqdnTemplate: '{podName}-qn.{domain}'
    internodeTrafficStrategy: SplitDNS
    clientTrafficStrategy: FQDN
  security:
    certificateReservedNodeCommonName: '*.mydomain.tld'
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
```

And this `KurrentDB` resource defines the standalone read-only replicas in another cluster.  Notice
that:

- `.replicas` is 0, but `.quorumNodes` is set instead
- `.readOnlyReplicas.replicas` is set
- `fqdnTemplate` differs slightly from above

```yaml
apiVersion: kubernetes.kurrent.io/v1
kind: KurrentDB
metadata:
  name: mydb
  namespace: kurrent
spec:
  replicas: 0
  quorumNodes:
    - mydb-0-qn.mydomain.tld:2113
    - mydb-1-qn.mydomain.tld:2113
    - mydb-2-qn.mydomain.tld:2113
  readOnlyReplicas:
    replicas: 2
  image: docker.kurrent.io/kurrent-latest/kurrentdb:26.0.1
  resources:
    requests:
      cpu: 4000m
      memory: 16Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 100Gi
  network:
    domain: mydomain.tld
    loadBalancer:
      enabled: true
    fqdnTemplate: '{podName}-rr.{domain}'
    internodeTrafficStrategy: SplitDNS
    clientTrafficStrategy: FQDN
  security:
    certificateReservedNodeCommonName: '*.mydomain.tld'
    certificateSecret:
      name: mydb-tls
      keyName: tls.crt
      privateKeyName: tls.key
```

## Accessing Deployments

### External

The Operator will create one service of type `LoadBalancer` per KurrentDB node when the
`spec.network.loadBalancer.enabled` flag is set to `true`.

Each `LoadBalancer`-type Service is annotated with `external-dns.alpha.kubernetes.io/hostname` set
according to the `fqdnTemplate` setting to allow the third-party tool [ExternalDNS][xdns] to
configure external access.

[xdns]: https://github.com/kubernetes-sigs/external-dns

### Internal

The Operator will create headless services to access a KurrentDB cluster internally. This includes:
- One for the underlying statefulset (selects all pods)
- One per pod in the statefulset to support `Ingress` rules that require one target endpoint
