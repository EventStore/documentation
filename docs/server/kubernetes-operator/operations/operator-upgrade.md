---
title: Operator Upgrade
order: 4
---

The sections below detail how to upgrade the Operator.

## Prerequisites

::: tip
To get the best out of this guide, a basic understanding of [Kubernetes concepts](https://kubernetes.io/docs/concepts/) is essential.
:::

Before upgrading the Operator, the following requirements should be met:

* The Operator has been installed as per the [Installation](../getting-started/installation.md) section.
* The [Helm 3 CLI](https://helm.sh/docs/intro/install/) tool is installed and configured to interact with your Kubernetes cluster.


## Helm

The Operator can be upgraded using the command below:

```bash
helm repo update
helm upgrade kurrentdb-operator kurrentdb-operator-repo/kurrentdb-operator \
  --version {version} \
  --namespace kurrent \
  --set enable.crds=true
```

Here's what the command does:
- Refreshes the local Helm repository index
- Defines where Operator is installed i.e. `kurrent` (feel free to change this)
- Define the upgrade `{version}` version e.g. 1.1.0
- Deploys CRDs (this can be skipped by removing `--set crds.enabled=true`)
- Performs the upgrade (leverages existing release values)
