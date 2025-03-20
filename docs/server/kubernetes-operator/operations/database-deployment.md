---
title: Database Deployment
order: 1
---

The sections below detail the different deployment options. For detailed information on the various properties, visit the [KurrentDB API](../getting-started/resource-types.md#kurrentdb) section.

## Prerequisites

::: tip
To get the best out of this guide, a basic understanding of [Kubernetes concepts](https://kubernetes.io/docs/concepts/) is essential.
:::

Before deploying a `KurrentDB` cluster, the following requirements should be met:

* The Operator has been installed as per the [Installation](../getting-started/installation.md) section.
* The following CLI tools are installed and configured to interact with your Kubernetes cluster. This means the tool must be accessible from your shell's `$PATH`, and your `$KUBECONFIG` environment variable must point to the correct Kubernetes configuration file:
    * [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl)
    * [k9s](https://k9scli.io/topics/install/)

:::important
With the examples listed in this guide, the Operator is assumed to have been deployed such that it can track the `kurrent` namespace for deployments.
:::

## Single Node Insecure Cluster

The following `KurrentDB` resource type defines a single node cluster with the following properties:
- The database will be deployed in the `kurrent` namespace with the name `kurrentdb-sn-cluster`
- Security is not enabled
- KurrentDB version 24.10.4 will be used
- 1vcpu will be requested as the minimum (upper bound is unlimited)
- 1gb of memory will be used
- 512mb of storage will be allocated for the data disk
- The KurrentDB instance that is provisioned will be exposed as `kurrentdb-0.kurrentdb-sn-cluster.kurrent.test`

```yaml
apiVersion: kubernetes.kurrent.io/v1alpha1
kind: KurrentDB
metadata:
  name: kurrentdb-sn-cluster
  namespace: kurrent
spec:
  replicas: 1
  image: docker.eventstore.com/eventstore/eventstoredb-ee:24.10.4
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 512Mi
  network:
    domain: kurrentdb-sn-cluster.kurrent.test
```

This can be deployed using the following steps:
- Copy the YAML snippet above to a file called `cluster.yaml`
- Ensure that the `kurrent` namespace has been created
- Running the following command:

```bash
kubectl apply -f cluster.yaml
```

Once deployed, navigate to the [Viewing Deployments](#viewing-deployments) section.

## Three Node Insecure Cluster

The following `KurrentDB` resource type defines a three node cluster with the following properties:
- The database will be deployed in the `kurrent` namespace with the name `kurrentdb-cluster`
- Security is not enabled
- KurrentDB version 24.10.4 will be used
- 1vcpu will be requested as the minimum (upper bound is unlimited) per node
- 1gb of memory will be used per node
- 512mb of storage will be allocated for the data disk per node
- The KurrentDB instances that are provisioned will be exposed as `kurrentdb-{idx}.kurrentdb-cluster.kurrent.test`

```yaml
apiVersion: kubernetes.kurrent.io/v1alpha1
kind: KurrentDB
metadata:
  name: kurrentdb-sn-cluster
  namespace: kurrent
spec:
  replicas: 3
  image: docker.eventstore.com/eventstore/eventstoredb-ee:24.10.4
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 512Mi
  network:
    domain: kurrentdb-cluster.kurrent.test
```

This can be deployed using the following steps:
- Copy the YAML snippet above to a file called `cluster.yaml`
- Ensure that the `kurrent` namespace has been created
- Running the following command:

```bash
kubectl apply -f cluster.yaml
```

Once deployed, navigate to the [Viewing Deployments](#viewing-deployments) section.

## Single Node Secure Cluster (using self-signed certificates)

The following `KurrentDB` resource type defines a single node cluster with the following properties:
- The database will be deployed in the `kurrent` namespace with the name `kurrentdb-sn-cluster`
- Security is enabled using self-signed certificates
- KurrentDB version 24.10.4 will be used
- 1vcpu will be requested as the minimum (upper bound is unlimited)
- 1gb of memory will be used
- 512mb of storage will be allocated for the data disk
- The KurrentDB instance that is provisioned will be exposed as `kurrentdb-0.kurrentdb-sn-cluster.kurrent.test`

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: kurrentdb-sn-cluster
  namespace: kurrent
spec:
  secretName: kurrentdb-sn-cluster-tls
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
    - '*.kurrent.svc.cluster.local'
    - '*.kurrentdb-sn-cluster.kurrent.test'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: ca-issuer
    kind: Issuer
---
apiVersion: kubernetes.kurrent.io/v1alpha1
kind: KurrentDB
metadata:
  name: kurrentdb-sn-cluster
  namespace: kurrent
spec:
  replicas: 1
  image: docker.eventstore.com/eventstore/eventstoredb-ee:24.10.4
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 512Mi
  network:
    domain: kurrentdb-sn-cluster.kurrent.test
  security:
    certificateAuthoritySecret:
      name: ca-tls
      keyName: ca.crt
    certificateSecret:
      name: kurrentdb-sn-cluster-tls
      keyName: tls.crt
      privateKeyName: tls.key
```

Before deploying this cluster, ensure that the steps described in section [Using Self-Signed certificates](managing-certificates.md#using-self-signed-certificates) have been followed.

Follow these steps to deploy the cluster:
- Copy the YAML snippet above to a file called `cluster.yaml`
- Ensure that the `kurrent` namespace has been created
- Running the following command:

```bash
kubectl apply -f cluster.yaml
```

Once deployed, navigate to the [Viewing Deployments](#viewing-deployments) section.

## Three Node Secure Cluster (using self-signed certificates)

The following `KurrentDB` resource type defines a three node cluster with the following properties:
- The database will be deployed in the `kurrent` namespace with the name `kurrentdb-cluster`
- Security is enabled using self-signed certificates
- KurrentDB version 24.10.4 will be used
- 1vcpu will be requested as the minimum (upper bound is unlimited) per node
- 1gb of memory will be used per node
- 512mb of storage will be allocated for the data disk per node
- The KurrentDB instance that is provisioned will be exposed as `kurrentdb-{idx}.kurrentdb-cluster.kurrent.test`

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: kurrentdb-cluster
  namespace: kurrent
spec:
  secretName: kurrentdb-cluster-tls
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
    - '*.kurrent.svc.cluster.local'
    - '*.kurrentdb-cluster.kurrent.test'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: ca-issuer
    kind: Issuer
---
apiVersion: kubernetes.kurrent.io/v1alpha1
kind: KurrentDB
metadata:
  name: kurrentdb-cluster
  namespace: kurrent
spec:
  replicas: 3
  image: docker.eventstore.com/eventstore/eventstoredb-ee:24.10.4
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 512Mi
  network:
    domain: kurrentdb-cluster.kurrent.test
  security:
    certificateAuthoritySecret:
      name: ca-tls
      keyName: ca.crt
    certificateSecret:
      name: kurrentdb-cluster-tls
      keyName: tls.crt
      privateKeyName: tls.key
```

Before deploying this cluster, ensure that the steps described in section [Using Self-Signed certificates](managing-certificates.md#using-self-signed-certificates) have been followed.

Follow these steps to deploy the cluster:
- Copy the YAML snippet above to a file called `cluster.yaml`
- Ensure that the `kurrent` namespace has been created
- Running the following command:

```bash
kubectl apply -f cluster.yaml
```

Once deployed, navigate to the [Viewing Deployments](#viewing-deployments) section.

## Single Node Secure Cluster (using LetsEncrypt)

The following `KurrentDB` resource type defines a single node cluster with the following properties:
- The database will be deployed in the `kurrent` namespace with the name `kurrentdb-sn-cluster`
- Security is enabled using certificates from LetsEncrypt
- KurrentDB version 24.10.4 will be used
- 1vcpu will be requested as the minimum (upper bound is unlimited)
- 1gb of memory will be used
- 512mb of storage will be allocated for the data disk
- The KurrentDB instance that is provisioned will be exposed as `kurrentdb-0.kurrentdb-sn-cluster.kurrent.test`

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: kurrentdb-sn-cluster
  namespace: kurrent
spec:
  secretName: kurrentdb-sn-cluster-tls
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
    - '*.kurrent.svc.cluster.local'
    - '*.kurrentdb-sn-cluster.kurrent.test'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: letsencrypt
    kind: Issuer
---
apiVersion: kubernetes.kurrent.io/v1alpha1
kind: KurrentDB
metadata:
  name: kurrentdb-sn-cluster
  namespace: kurrent
spec:
  replicas: 1
  image: docker.eventstore.com/eventstore/eventstoredb-ee:24.10.4
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 512Mi
  network:
    domain: kurrentdb-sn-cluster.kurrent.test
  security:
    certificateSecret:
      name: kurrentdb-sn-cluster-tls
      keyName: tls.crt
      privateKeyName: tls.key
```

Before deploying this cluster, ensure that the steps described in section [Using LetsEncrypt certificates](managing-certificates.md#using-trusted-certificates-via-letsencrypt) have been followed.

Follow these steps to deploy the cluster:
- Copy the YAML snippet above to a file called `cluster.yaml`
- Ensure that the `kurrent` namespace has been created
- Running the following command:

```bash
kubectl apply -f cluster.yaml
```

## Three Node Secure Cluster (using self-signed certificates)

The following `KurrentDB` resource type defines a three node cluster with the following properties:
- The database will be deployed in the `kurrent` namespace with the name `kurrentdb-cluster`
- Security is enabled using certificates from LetsEncrypt
- KurrentDB version 24.10.4 will be used
- 1vcpu will be requested as the minimum (upper bound is unlimited) per node
- 1gb of memory will be used per node
- 512mb of storage will be allocated for the data disk per node
- The KurrentDB instance that is provisioned will be exposed as `kurrentdb-{idx}.kurrentdb-cluster.kurrent.test`

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: kurrentdb-cluster
  namespace: kurrent
spec:
  secretName: kurrentdb-cluster-tls
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
    - '*.kurrent.svc.cluster.local'
    - '*.kurrentdb-cluster.kurrent.test'
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  issuerRef:
    name: letsencrypt
    kind: Issuer
---
apiVersion: kubernetes.kurrent.io/v1alpha1
kind: KurrentDB
metadata:
  name: kurrentdb-cluster
  namespace: kurrent
spec:
  replicas: 3
  image: docker.eventstore.com/eventstore/eventstoredb-ee:24.10.4
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 512Mi
  network:
    domain: kurrentdb-cluster.kurrent.test
  security:
    certificateSecret:
      name: kurrentdb-cluster-tls
      keyName: tls.crt
      privateKeyName: tls.key
```

Before deploying this cluster, ensure that the steps described in section [Using LetsEncrypt certificates](managing-certificates.md#using-trusted-certificates-via-letsencrypt) have been followed.

Follow these steps to deploy the cluster:
- Copy the YAML snippet above to a file called `cluster.yaml`
- Ensure that the `kurrent` namespace has been created
- Running the following command:

```bash
kubectl apply -f cluster.yaml
```

Once deployed, navigate to the [Viewing Deployments](#viewing-deployments) section.


## Viewing Deployments

Using the k9s tool, navigate to the namespaces list using the command `:namespaces`, it should show a screen similar to:

![Namespaces](images/database-deployment/namespace-list.png)

From here, press the `Return` key on the namespace where `KurrentDB` was deployed, in the screen above the namespace is `kurrent`. Now enter the k9s command `:kurrentdbs` and press the `Return` key. The following screen will show a list of deployed databases for the selected namespace, as shown below:

![Databases](images/database-deployment/database-list.png)

Summary information is shown on this screen, for more information press the `d` key on the selected database. The following screen will provide additional information about the deplpoyment:

![Database Details](images/database-deployment/db-decribe.png)

Scrolling further will also show the events related to the deployment, such as:

- transitions between states
- gossip endpoint
- leader details

## Custom Database Configuration

If custom parameters are required in the underlying database configuration then these can be specified using the `configuration` YAML block within a `KurrentDB`. Note, these values will be passed through as-is.

For example, to enable projections, the deployment configuration looks as follows:

```yaml
apiVersion: kubernetes.kurrent.io/v1alpha1
kind: KurrentDB
metadata:
  name: kurrentdb-sn-cluster
  namespace: kurrent
spec:
  replicas: 1
  image: docker.eventstore.com/eventstore/eventstoredb-ee:24.10.4
  configuration:
    RunProjections: all
    StartStandardProjections: true
  resources:
    requests:
      cpu: 1000m
      memory: 1Gi
  storage:
    volumeMode: "Filesystem"
    accessModes:
      - ReadWriteOnce
    resources:
      requests:
        storage: 512Mi
  network:
    domain: kurrentdb-sn-cluster.kurrent.test
```

## Adjusting Deployment Resources

`KurrentDB` instances support refinements to:

- Memory
- CPU
- Disk Size (increases only)