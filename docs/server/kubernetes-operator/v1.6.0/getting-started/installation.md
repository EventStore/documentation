---
title: Installation
order: 2
---

This section covers the various aspects of installing the Operator.

The Operator supports installation [via Helm](#install-using-helm) and
[via the Operator Lifecycle Manager (OLM)](#install-using-olm).  OLM is the recommended way to
install on Red Hat OpenShift clusters, where OLM is installed by default.

::: important
The Operator is an Enterprise-only feature, please [contact us](https://www.kurrent.io/contact) for more information.
:::

## Install Using Helm

### Prerequisites

* A Kubernetes cluster running any [non-EOL version of Kubernetes](https://kubernetes.io/releases/).
* Permission to create resources, deploy the Operator and install CRDs in the target cluster.
* The following CLI tools installed, on your shell’s `$PATH`, with `$KUBECONFIG` pointing to your
  cluster:
  * [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl)
  * [Helm 3 CLI](https://helm.sh/docs/intro/install/)
* A valid Operator license. Please [contact us](https://www.kurrent.io/contact) for more information.

### Configure Helm Repository

Add the Kurrent Helm repository to your local environment:

```bash
helm repo add kurrent-latest \
  'https://packages.kurrent.io/basic/kurrent-latest/helm/charts/'
```

### Basic Installation

The most basic installation will:

- install necessary CRDs
- run the Operator with a `ClusterRole`
- configure the Operator to watch all namespaces

To install in this way, run:

```bash
helm install kurrentdb-operator kurrent-latest/kurrentdb-operator \
  --version 1.5.0 \
  --create-namespace \
  --namespace kurrent-system \
  --set-file operator.license.key=/path/to/license.key \
  --set-file operator.license.file=/path/to/license.lic
```

This command:

- Creates `kurrent-system` and deploys the Operator into it.
- Deploys CRDs.
- Applies the Operator license.
- Populates a new Helm release called `kurrentdb-operator` in the `kurrent` namespace.

*Expected Output*:

```
NAME: kurrentdb-operator
LAST DEPLOYED: Thu Mar 20 14:51:42 2025
NAMESPACE: kurrent-system
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

Additional customizations are described in the following sections.

### Option: Targeting Specific Namespaces

The Operator may be installed to only control resources in specific namespaces.  When installed in
this way, it uses a `Role` in each target namespace rather than a `ClusterRole`.

For example, to configure the Operator to control resources in namespaces `foo` and `bar`, add a
flag like `--set operator.namespaces='{foo,bar}'` to the installation steps described in [Basic
Installation](#basic-installation).

::: important
Make sure the namespaces listed as part of the `operator.namespaces` parameter already exist before
running the Helm installation.
:::

Note that there is no requirement that namespace used for the Helm installation overlap with the
namespaces controlled by the Operator.

### Option: Manual CRD Installation

Some prefer to deploy CRDs manually, rather than through Helm.  In this case, you must manually
install the CRDs before the Helm installation (and again with each upgrade):

```bash
# Download the kurrentdb-operator Helm chart
helm pull kurrent-latest/kurrentdb-operator --version 1.5.0 --untar

# Install the CRDs
kubectl apply -f kurrentdb-operator/templates/crds
```

*Expected Output*:
```
customresourcedefinition.apiextensions.k8s.io/kurrentdbs.kubernetes.kurrent.io created
customresourcedefinition.apiextensions.k8s.io/kurrentdbbackups.kubernetes.kurrent.io created
customresourcedefinition.apiextensions.k8s.io/kurrentdbbackupschedules.kubernetes.kurrent.io created
```

Then, follow the installation steps described in [Basic Installation](#basic-installation) with the
additional flag `--set crds.enabled=false`.

Due to the extra steps at both installation and upgrade, we recommend letting the Helm chart
automatically manage your CRDs.

::: caution
If you set the value of `crds.keep` to `false` (the default is `true`), helm upgrades and rollbacks
can result in data loss.  If `crds.keep` is `false` and `crds.enabled` transitions from `true` to
`false` during an upgrade or rollback, the CRDs will be removed from the cluster, deleting all
`KurrentDBs` and `KurrentDBBackups` and their associated child resources, including the PVCs and
VolumeSnapshots containing your data!
:::

### Upgrading A Helm Installation

The Operator can be upgraded using the following `helm` commands:

```bash
helm repo update kurrent-latest
helm upgrade kurrentdb-operator kurrent-latest/kurrentdb-operator \
  --namespace kurrent \
  --version {version} \
  --reset-then-reuse-values
```

Here's what these commands do:
- Refresh the local Helm repository index
- Locate an existing operator installation in namespace `kurrent`
- Select the target upgrade version `{version}` e.g. `1.5.0`
- Perform the upgrade, preserving values that were set during installation

## Install Using OLM

### Prerequisites

* An OpenShift cluster (version 4.17 or newer), or Kubernetes with OLM installed.
* Permission to create resources, deploy the Operator and install CRDs in the target cluster.
* `oc` (or `kubectl`) installed, on installed, on your shell’s `$PATH`, with `$KUBECONFIG` pointing
  to your cluster
* A valid Operator license. Please [contact us](https://www.kurrent.io/contact) for more information.

### Configure Namespaces

Choose the namespace into which you will install your operator, and also the namespaces you want
your operator to control.  Create the namespaces now:

```bash
# a namespace into which we will install the operator
oc create namespace kurrent-system

# namespaces we want the operator to control
oc create namespace foo bar
```

### Create A `Secret`

The Operator requires a `Secret` in its namespace containing a valid license.  For OLM
installations, the name of the secret must be `kurrentdb-operator`.

```bash
oc create secret generic -n kurrent-system kurrentdb-operator \
    --from-file=licenseKey=/path/to/license.key \
    --from-file=licenseFile=/path/to/license.lic
```

### Create A `CatalogSource`

A `CatalogSource` is the resource that tells OLM where to look for available operator versions.

```bash
oc apply -f - << EOF
apiVersion: operators.coreos.com/v1alpha1
kind: CatalogSource
metadata:
  name: kurrentdb-operator
  namespace: olm
spec:
  sourceType: grpc
  image: docker.kurrent.io/kurrent-latest/kurrentdb-operator-catalog:latest
  displayName: KurrentDB Operator
  publisher: "Kurrent, Inc"
  grpcPodConfig:
    securityContextConfig: restricted
EOF
```

### Create An `OperatorGroup`

An `OperatorGroup` is the resource that tells OLM which namespaces an operator should target.

```bash
oc apply -f - <<EOF
apiVersion: operators.coreos.com/v1
kind: OperatorGroup
metadata:
  name: kurrentdb-operator
  namespace: kurrent-system
spec:
  upgradeStrategy: Default
  targetNamespaces:
  - foo
  - bar
EOF
```

If you wish for the Operator to target all namespaces, omit the `targetNamespaces` field entirely.

### Create A `Subscription`

A `Subscription` is the resource that asks OLM to install a particular operator into a namespace.
Operators installed by the `Subscription` will target namespaces described by the `OperatorGroup`
in that namespace.

```bash
oc apply -f - <<EOF
apiVersion: operators.coreos.com/v1alpha1
kind: Subscription
metadata:
  name: kurrentdb-operator
  namespace: kurrent-system
spec:
  channel: fast-v1
  installPlanApproval: Automatic
  name: kurrentdb-operator
  source: kurrentdb-operator
  sourceNamespace: default
  startingCSV: kurrentdb-operator.v1.5.0
EOF
```

Now with the `CatalogSource`, `OperatorGroup`, and `Subscription` created, the Operator will be
installed automatically by OLM, though it may take a couple minutes for the whole process to
complete.

## Deployment Validation

Whether you installed using Helm or OLM, you can validate that the installation is working with
`kubectl` (or using `oc` on an OpenShift cluster).

Check that the `Deployment` running the operator looks healthy:

```bash
kubectl get -n kurrent-system deployments
```

You should see `1/1` pods ready in the `kurrentdb-operator` Deployment:

```
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
kurrentdb-operator   1/1     1            1           10m
```

If not, check for error events in the Operator namespace for errors like image pull failures,
scheduling problems, or operator crashes:

```bash
kubectl events -n kurrent-system
```

If the Operator is starting successfully but then crashing, check the logs for issues like license
key or file issues:

```bash
kubectl logs -n kurrent-system deployments/kurrentdb-operator
```

If you are stuck, don't hesitate to reach out to support.
