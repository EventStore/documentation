# Connect to Google Kubernetes Engine

On this page, you find instructions how to set up a Google Kubernetes Engine (GKE) cluster, so it can connect to an EventStoreDB cluster in Event Store Cloud. As a prerequisite, you have experience with Kubernetes, GKE and networking in Kubernetes as well as in Google Cloud Platform (GCP).

Before you provision a cluster in Event Store Cloud, you need to have a network, to which the cluster nodes will connect. Nodes in the cluster will get IP addresses from the specified network CIDR.

In order to be able to work with the cluster, you need to establish a connection between the Event Store Cloud network and your own VPC Network in Google Cloud. You do it by provisioning a network peering between those two networks.

You can find more information about the steps needed for provisioning Event Store Cloud resources and connecting them to your own GCP project in the [provisioning](../../provision/README.md#google-cloud-platform-gcp) section.

## Planning IP ranges

The challenge is to set up IP ranges for both VPCs, the GKE cluster, and the peering in a way that pods running in Kubernetes would be able to reach the EventStoreDB cluster in Event Store Cloud.

::: card
![GKE and ESC topology](../images/gke-1.png)
:::

When creating the Standard GKE cluster from GCP Console, the Networking section has the _Advanced networking_ options subsection. There you find the _Pod address range_ setting. It is available for clusters with any type of routing (static routes or VPC-native).

::: card
![GKE network settings](../images/gke-2.png)
:::

If the _Pod address range_ option is left blank, the cluster will get a private IP range for the pods. For example, the cluster with static routing got the `10.120.0.0/14` CIDR block for the pods:

::: card
![GKE network settings](../images/gke-3.png)
:::

When using VPC-native routing, this new range would be added to the selected VPC network subnet, in addition to the main IP range.

The issue that you'll experience when leaving the pod IP range blank and letting the provisioner to define it for you, is that IP range won't be a part of the configured network peering IP range in Event Store Cloud. For the current example, the `subnet-esc` has the IP range `172.30.0.0/16` and that's what we used when creating the peering as described in our documentation. As the new pod address range (`10.120.0.0/14`) is not part of the IP range known to the peering, those pods won't be able to connect to the EventStoreDB cloud cluster.

It could be solvable when using the VPC-native routing for the GKE cluster, as the pod IP range would be added to the subnet. However, the currently available Event Store Cloud version only allows you to have one peering with a given subnet, and the peering has only one remote IP range. It means that we can neither add the pods IP range to the existing peering, nor could we create a new peering with this new range.

The issue can be fixed by defining a custom pod address IP range, which is a part of the peering IP range. In our documentation we recommend using your VPN network subnet CIDR block as the _Remote Address_ field value when creating the peering. However, you can specify a larger range, which could include both the main subnet range, and the additional range for the GKE pods.

## Example IP ranges

Let's have a look at a working configuration. In this example, we use the following resources:

- VPC network `vpc-esc` on the customer's side
- Subnet `subnet-esc` within the `vpc-esc` network with the primary IP range `172.30.0.0/16`
- VPC-native GKE cluster (Standard or Autopilot) with pod address range `172.31.128.0/17`

Now, for the Event Store Cloud network peering, we need to find a range, which covers both the subnet default range, and the additional GKE range. In our case, we could use the `172.30.0.0/15` range as it includes both ranges. The `172.30.0.0/15` netmask can be divided as follows:

| Subnet address | Range of addresses | Usable IPs | Hosts |
| :------------- | :----------------- | :---------- | :---- |
| 172.30.0.0/16 | 172.30.0.0 - 172.30.255.255` | 172.30.0.1 - 172.30.255.254 | 65534 |
| 172.31.0.0/17 | 172.31.0.0 - 172.31.127.255 | 172.31.0.1 - 172.31.127.254 | 32766 |
| 172.31.128.0/17 | 172.31.128.0 - 172.31.255.255 | 172.31.128.1 - 172.31.255.254 | 32766 |

So, here we see that the subnet uses the larger range, and the GKE pod address range uses a smaller range, plus we have one range free for something else.

## GKE networking configuration

When provisioning the GKE cluster, we should specify `172.31.128.0/17` as the pod address range in the cluster networking configuration for a new Standard cluster:

::: card
![GKE network settings](../images/gke-5.png)
:::

Similarly, the range can be specified for a new Autopilot cluster:

::: card
![GKE network settings](../images/gke-6.png)
:::

When the cluster is deployed, you can see that the range is properly assigned:

::: card
![GKE network settings](../images/gke-7.png)
:::

When looking at the `subnet-esc`, we can see those ranges shown in the GCP Console:

::: card
![GKE subnet](../images/gke-8.png)
:::

The network peering resource in Event Store Cloud in this case looks like this:

::: card
![ESC peering](../images/gke-9.png)
:::

When creating a peering, you don't have to specify a particular subnet of the VPC network, which you peer with. There's no check if the given IP range actually exists in the peered network. Therefore, we can specify the range we need, even if it doesn't match with the primary range of any subnet. By using the larger range, which covers both the primary and secondary ranges, we made the EventStoreDB cluster available for pods in the GKE cluster.

## Ensure the connection

To confirm that everything works as expected, you can deploy an ephemeral `busybox` container to the Kubernetes cluster and try reaching out to the EventStoreDB cloud cluster:

```bash
$ kubectl run -i --tty --rm debug --image=busybox --restart=Never -- sh
```

If you don't see a command prompt, try pressing enter.

```bash
/ # ping c0brj8qrh41g7drr2i4g-0.mesdb.eventstore.cloud
PING c0brj8qrh41g7drr2i4g-0.mesdb.eventstore.cloud (172.22.110.29): 56 data bytes
64 bytes from 172.22.110.29: seq=0 ttl=63 time=2.655 ms
64 bytes from 172.22.110.29: seq=1 ttl=63 time=1.234 ms
64 bytes from 172.22.110.29: seq=2 ttl=63 time=1.246 ms
```

Finally, we can deploy applications to the GKE cluster, which can connect to the Event Store Cloud managed EventStoreDB instances.

The overall network topology would look like this, when we complement the initial diagram with IP addresses and network masks:

::: card
![ESC GKE topology](../images/gke-10.png)
:::
