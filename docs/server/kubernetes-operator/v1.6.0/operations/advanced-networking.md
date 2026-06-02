---
title: Advanced Networking
order: 5
---

KurrentDB is a clustered database, and all official KurrentDB clients are cluster-aware.  As a
result, there are times when a client will find out from one server how to connect to another
server.  To make this work, each server advertises how clients and other servers should contact it.

The Operator lets you customize these advertisements.  Such customizations are influenced by your
cluster topology, where your KurrentDB clients will run, and also your security posture.  This page
will help you select the right networking and security configurations for your needs.

## Configuration Options

This document is intended to help pick appropriate traffic strategies and certificate options for
your situation.  Let us first examine the range of possible settings for each.

### Traffic Strategy Options

Servers advertise how they should be dialed by other servers according to the
`KurrentDB.spec.network.internodeTrafficStrategy` setting, which is one of:

* `"ServiceName"` (default): servers use each other's Kubernetes service name to contact each other.

* `"FQDN"`: servers use each other's fully-qualified domain name (FQDN) to contact each other.

* `"SplitDNS"`: servers advertise FQDNs to each other, but a tiny sidecar DNS resolver in each
  server pod intercepts the lookup of FQDNs for local pods and returns their actual pod IP address
  instead (the same IP address returned by the `"ServiceName"` setting).

Servers advertise how they should be dialed by clients according to the
`KurrentDB.spec.network.clientTrafficStrategy` setting, which is one of:

* `"ServiceName"`: clients dial servers using the server's Kubernetes service
  name.

* `"FQDN"` (default): clients dial servers using the server's FQDN.

Note that the `"SplitDNS"` settings is not an option for the `clientTrafficStrategy`, simply because
the KurrentDB Operator does not deploy your clients and so cannot inject a DNS sidecar container
into your client pods.  However, it is possible to write a [CoreDNS rewrite rule][rr] to
accomplish a similar effect as `"SplitDNS"` but for client-to-server traffic.

[rr]: https://coredns.io/2017/05/08/custom-dns-entries-for-kubernetes/

### Certificate Options

Except for test deployments, you always want to provide TLS certificates to your KurrentDB
deployments.  The reason is that insecure deployments disable not only TLS, but also all
authentication and authorization features of the database.

There are three basic options for how to obtain certificates:

* Use self-signed certs: you can put any name in your self-signed certs, including Kubernetes
  service names, which enables `"ServiceName"` traffic strategies.  A common technique is to use
  [cert-manager][cm] to manage the self-signed certificates and to use [trust-manager][tm] to
  distribute trust of those self-signed certificates to clients.

* Use a publicly-trusted certificate provider: you can only put FQDNs on your certificate, which
  limits your traffic strategies to FQDN-based connections (`"FQDN"` or `"SplitDNS"`).

* Use both: self-signed certs on the servers, plus an Ingress using certificates from a public
  certificate provider and configured for TLS termination.  Note that at this time, the Operator
  does not assist with the creation of Ingresses.

[cm]: https://cert-manager.io/
[tm]: https://cert-manager.io/docs/trust/trust-manager/

## Considerations

Now let us consider a few different aspects of your situation to help guide the selection of
options.

### What are your security requirements?

The choice of certificate provider has a security aspect to it.  The KurrentDB servers use the
certificate to authenticate each other, so anybody who has read access to the certificate or who can
produce a matching, trusted certificate, can impersonate another server, and obtain full access to
the database.

The obvious implication of this is that access to the Kubernetes Secrets which contain server
certificates should be limited to those who are authorized to administer the database.

But it may not be obvious that if control of your domain's DNS configuration is shared by many
business units in your organization, it may be the case that self-signed certificates with
`internodeTrafficStrategy` of `"ServiceName"` provides the tightest control over database access.

So your security posture may require that you choose one of:

* self-signed certs and `"ServiceName"` traffic strategies, if all your clients are inside the
  Kubernetes cluster

* self-signed certs on servers with `internodeTrafficStrategy` of `"ServiceName"` plus Ingresses
  configured with publicly-trusted certificate providers and `clientTrafficStrategy` of `"FQDN"`

### Where will your KurrentDB servers run?

If any servers are not in the same Kubernetes cluster, for instance, if you are using the
[standalone read-only-replica feature](
database-deployment.md#deploying-standalone-read-only-replicas) to run a read-only replica in a
second Kubernetes cluster from the quorum nodes, then you will need to pick from a few options to
ensure internode connectivity:

* `internodeTrafficStrategy` of `"SplitDNS"`, so every server connects to others by their FQDN, but
  when a connection begins to another pod in the same cluster, the SplitDNS feature will direct the
  traffic along direct pod-to-pod network interfaces.  This solution assumes FQDNs on certificates,
  which enables you to use publicly trusted certificate authorities to generate certificates for
  each cluster, which can also ease certificate management.

* `internodeTrafficStrategy` of `"ServiceName"`, plus manually-created [ExternalName Services][ens]
  in each Kubernetes cluster for each server in the other cluster.  This solution requires
  self-signed certificates, and also that the certificates on servers in both clusters are signed by
  the same self-signed Certificate Authority.

[ens]: https://kubernetes.io/docs/concepts/services-networking/service/#externalname

### Where will your KurrentDB clients run?

If any of your KurrentDB clients will run outside of Kubernetes, your `clientTrafficStrategy` must
be `"FQDN"` to ensure connectivity.

If your KurrentDB clients are all within Kubernetes, but spread through more than one Kubernetes
cluster, you may use one of:

* `clientTrafficStrategy` of `"FQDN"`.

* `clientTrafficStrategy` of `"ServiceName"` plus manually-created [ExternalName Services][ens] in
  each Kubernetes cluster for each server in the other cluster(s), as described above.

### How bad are hairpin traffic patterns for your deployment?

Hairpin traffic patterns occur when a pod inside a Kubernetes cluster connects to another pod in the
same Kubernetes cluster through its public IP address rather than its pod IP address.  The traffic
moves outside of Kubernetes to the public IP then "hairpin" turns back into the cluster.

For example, with `clientTrafficStrategy` of `"FQDN"`, clients connecting to a server inside the
same cluster will not automatically connect directly to the server pod, even though they are both
inside the Kubernetes cluster and that would be the most direct possible connection.

Hairpin traffic patterns are never good, but they're also not always bad.  You will need to evaluate
the impact in your own environment.  Consider some of the following possibilities:

* In a cloud environment, sometimes internal traffic is cheaper than traffic through a public IP,
  so there could be a financial impact.

* If the FQDN connects to, for example, an nginx ingress, then pushing Kubernetes-internal traffic
  through nginx may either over-burden your nginx instance or it may slow down your traffic
  unnecessarily.

Between servers, hairpin traffic can always be avoided with an `internodeTrafficStrategy` of
`"SplitDNS"`.

For clients, one solution is to prefer a `clientTrafficStrategy` of `"ServiceName"`, or you may
consider adding a [CoreDNS rewrite rule][rr].

## Common Solutions

With the above considerations in mind, let us consider a few common solutions.

### Everything in One Kubernetes Cluster

When all your KurrentDB servers and clients are within a single Kubernetes cluster, life is
easy:

* Set `internodeTrafficStrategy` to `"ServiceName"`.

* Set `clientTrafficStrategy` to `"ServiceName"`.

* Use cert-manager to configure a certificate based on the KurrentDB based around service names.

* Use trust-manager to configure clients to trust the self-signed certificates.

This solution provides the highest possible security, avoids hairpin traffic patterns, and leverages
Kubernetes-native tooling to ease the pain of self-signed certificate management.

### Servers Anywhere, Clients Anywhere

If using publicly trusted certificates is acceptable (see
[above](#what-are-your-security-requirements)), almost every need can be met with one of the
simplest configurations:

* Set `internodeTrafficStrategy` to `"SplitDNS"`.

* Set `clientTrafficStrategy` to `"FQDN"`.

* Use cert-manager to automatically create certificates through an ACME provider like LetsEncrypt.

* If clients may be outside of Kubernetes or multiple Kubernetes clusters are in play, set
  `KurrentDB.spec.network.loadBalancer.enable` to `true`, making your servers publicly accessible.

This solution is still highly secure, provided your domain's DNS management is tightly
controlled.  It also supports virtually every server and client topology.  Server hairpin traffic
never occurs and client hairpin traffic &mdash; if a problem &mdash; can be addressed with a
[CoreDNS rewrite rule][rr].

### Multiple Kubernetes Clusters and a VPC Peering

If you want all your KurrentDB resources within private networking for extra security, but also need
to support multiple Kubernetes clusters in different regions, you can set up a VPC Peering between
your clusters and configure your inter-cluster traffic to use it.

There could be many variants of this solution; we'll describe one based on ServiceNames and one
based on FQDNs.

#### ServiceName-based Variant

* Set `internodeTrafficStrategy` to `"ServiceName"`.

* Set `clientTrafficStrategy` to `"ServiceName"`.

* Ensure that each server has an IP address in the VPC Peering.

* In each Kubernetes cluster, manually configure [ExternalName Services][ens] for each server not in
  that cluster.  ExternalName Services can only redirect to hostnames, not bare IP addresses, so you
  may need to ensure that there is a DNS name to resolve each server's IP address in the VPC
  Peering.

* Use self-signed certificates, and make sure to use the same certificate authority to sign
  certificates in each cluster.

#### FQDN-based Variant

* Set `internodeTrafficStrategy` to `"SplitDNS"`.

* Set `clientTrafficStrategy` to `"FQDN"`.

* Ensure that each server has an IP address in the VPC Peering.

* Ensure that each server's FQDN resolves to the IP address of that server in the VPC peering.

* If client-to-server hairpin traffic within each Kubernetes cluster is a problem, add a [CoreDNS
  rewrite rule][rr] to each cluster to prevent it.

* Use a publicly-trusted certificate authority to create certificates based on the FQDN.  They may
  be generated per-Kubernetes cluster independently, since the certificate trust will be automatic.
