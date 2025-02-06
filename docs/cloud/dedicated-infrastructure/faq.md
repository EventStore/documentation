---
title: FAQ
---

## Cluster provisioning

#### Is it possible to change the cluster instance size or topology?

You can [resize a cluster](ops/README.md#resizing-cluster-nodes), but we do not support changing the topology of an existing cluster. If you need a different topology, you can take a [backup](ops/backups.md#manual-backup) of the existing cluster, and [restore](ops/backups.md#restore-from-backup) that backup to a new cluster.

#### Are there plans to support automatic resize of cluster nodes?

We don't support automatic resizing of clusters. If you wish to automate cluster resizing, the `esc` command line tool, as well as the Terraform and Pulumi providers are options to consider.

#### Are there plans to support automatic disk resize?

Currently, you have to resize the disks yourself. Disks can be expanded on-demand without downtime. Because cloud providers limit how often disk resize operations can be performed the Kurrent Cloud may enforce a waiting period on recently resized clusters before they can get resized again.

#### Can I switch a cluster from private to publicly accessible or vice versa?

We don't support switching clusters from private to publicly accessible or vice versa. If you find yourself in a situation where you need to do that, you can take a [backup](ops/backups.md#manual-backup) of the existing cluster, and [restore](ops/backups.md#restore-from-backup) that backup to the network you need.

## Migrating to Cloud

#### How can I migrate data from my self-hosted database to Kurrent Cloud?

We have a [replication tool](guides/migration.md), which is available now. It has certain limitations, especially with performance. Get in touch, so we can help you to analyse your setup and requirements, before we can recommend using the replication tool.

## Performance

#### Do you have indicative performance benchmarks for the offered cluster sizes?

We published such benchmarks available on the [Cloud instance sizing guide](ops/sizing.md) page.

Please remember, however, that each use case is different, and you might always get better or worse performance, compared with our advertised benchmarking figures. We can help you to analyse your needs and provide more detailed expected performance figures, please get in touch.

## Alerting and notifications

#### Is there any type of alerting functionality for cluster issues?

Yes. Learn more in the [Integrations](integrations/README.md) documentation section.

#### How do you handle infrastructure related issues, which cause unavailability or degradation of service?

Kurrent Cloud site reliability engineering (SRE) team manages cluster availability.

More information about SLA levels provided by Kurrent Cloud can be found in our [Service Level Agreement](https://www.kurrent.io/terms/agreements/kurrent-cloud-services-addendum).

## Providers

### Azure

#### Do you use Locally-Redundant Storage (LRS) or Zone-Redundant Storage (ZRS)?

Customer data is only stored on Premium SSD block device targets. We do not utilize Azure file or blob storage for customer data.

#### We use AKS, to simplify setup can you expose the cluster to the public internet?

We have plans to expose clusters via a public IP address, but it's not available yet. We've provided a [guide](guides/kubernetes.md) on how to connect AKS clusters to Kurrent Cloud.

### Supported regions

### What regions do you support on AWS, GCP and Azure?

At the moment, KurrentDB clusters are only available in regions with three or more availability zones. Each region also need to support a set of services necessary for the provisioning and monitoring of the clusters.

You can see the list of supported regions when you create a new cluster or network in the Cloud Console.

::: note

For AWS, we offer the regions that are enabled by default. We can enable [opt-in regions](https://docs.aws.amazon.com/controltower/latest/userguide/opt-in-region-considerations.html) for an organization on request.

:::

If there is a region that you need, but is missing, please don't hesitate to [let us know](https://www.kurrent.io/contact).

## Managed KurrentDB

#### Does the admin UI run on the provisioned cluster?

Yes. Go to the clusters list in the Cloud Console, select the cluster you need and click on the **Addresses** tab on the bottom panel. You will find the admin UI URL there. You need to be connected to a network, which is routed to Kurrent Cloud to open the admin UI in your browser.

#### Are there plans for the scheduled scavenge feature?

Yes, we are actively working on it.

## Backup and restore

#### Can I automate backups?

The scheduled backup feature has been released in March 2021. Read more in [cloud backup documentation](ops/README.md#scheduled-backups).

#### Can I download a backup to store it locally?

Currently, it's not possible due to security considerations. In the future, we plan to offer data export functionality from the database.

## Service levels

#### What is the SLA for Kurrent Cloud?

You can find out about the SLA levels provided by Kurrent Cloud in our [Service Level Agreement](https://www.kurrent.io/terms/agreements/kurrent-cloud-services-addendum).

#### Are maintenance windows part of the SLA?

You can find out about the SLA levels provided by Kurrent Cloud in our [Service Level Agreement](https://www.kurrent.io/terms/agreements/kurrent-cloud-services-addendum). Any scheduled maintenances will be posted in the Kurrent Cloud Console, as well as on the [Kurrent Cloud Status Page](https://status.eventstore.cloud/).

## Support

#### For same day response, what time zone is your 9am-5pm response against?

Our support response time windows are provided in GMT time zone. We are expanding our SRE team to handle time zones in North America as well.

#### What level of access does the customer have to resolve minor incidents?

Customers do not have direct access to the compute instances where the database cluster nodes are running. However, most management functions are available via the HTTP API, which is available for customers to access and use.

You can also use our cloud automation tools ([Terraform](automation/terraform.md) and [Pulumi](automation/pulumi.md) providers and the [Kurrent Cloud CLI](https://github.com/EventStore/esc)) to manage your cloud resources.

#### If a node goes down in a cluster, how is the cluster recovered and who does it?

Kurrent Support staff will be alerted if a node goes down. We will investigate the issue and take the necessary actions to return the cluster to a healthy state.

If it is a due to load related to the customer's usage of the cluster or exhaustion of disk space, our support staff will attempt to reach out to the customer to address the issue.

You can utilize our [integrations feature](integrations/README.md) to get notified of cluster events, such as high CPU usage, low disk space, or other events.

Please ensure to learn about the SLA levels provided by Kurrent Cloud in our [Service Level Agreement](https://www.kurrent.io/terms/agreements/kurrent-cloud-services-addendum).

## Security

#### How to get an audit log of access to the console?

The Cloud Console access audit log is in our roadmap. Right now, you can [access the audit logs](ops/account-security.md#audit-log-api) using the `esc` command line tool.

#### Does Kurrent have a security policy?

Kurrent, Inc. has security policies in place.

If you have specific questions please [contact us](https://www.kurrent.io/contact)

#### Has the system been independently audited?

Security is a priority at Kurrent, and every feature we build has security in mind. Our Cloud offering maintains [SOC 2](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html) and [ISO 27001](https://www.iso.org/isoiec-27001-information-security.html) certifications, which require annual independent internal audits, as well as external audits as part of our certification process.

If you have specific questions please [contact us](https://www.kurrent.io/contact)

## Troubleshooting

### Connectivity

#### Unable to connect to a public cluster

If you are trying to connect to a public cluster and you are not able to, please check the following:

- You are able to resolve the cluster DNS name
- Your IP address has been added to the IP Access List assigned to the cluster
- Your local network policies permit outbound connections to TCP port 2113

It is possible that your local network may be using a transparent web proxy which could cause the common methods of determining your source IP address to be incorrect. If you are on a corporate network or VPN, you may be able to get your network administrator to assist you.

#### DNS resolution issues

For clusters on private networks, the DNS name will resolve to the private IP addresses of the cluster nodes. Some Internet providers, routers, and DNS servers will not resolve or filter out answers to DNS queries for `xxxx.mesdb.eventstore.cloud` because the DNS name resolves to a private IP range.

You can check if that's the issue you're experiencing by running the following `nslookup` query. Replace the domain name by your cluster DNS name.

``` bash
nslookup buh63kqrh41nfqpviing.mesdb.eventstore.cloud
```

If the answer looks like the following, you're having the issue we just described:

```
Server:         192.168.192.1
Address:        192.168.192.1#53

Non-authoritative answer:
*** Can't find buh63kqrh41nfqpviing.mesdb.eventstore.cloud: No answer
```

To check if the domain exists, perform the same check with a specific DNS server:

``` bash
nslookup buh63kqrh41nfqpviing.mesdb.eventstore.cloud 1.1.1.1
```

Most probably, you will get a proper DNS resolution answer:

```
Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    buh63kqrh41nfqpviing.mesdb.eventstore.cloud
Addresses:  172.29.98.189
172.29.98.150
172.29.98.108
```

If the cluster DNS name resolves using an external DNS server, but your local DNS server fails or rejects to resolve it, you can try the following:

- On a corporate network or VPN, check with your IT department or team responsible for network configuration to allow DNS queries which resolve to private IP ranges
- On a home network, routers typically configure clients to use the DNS servers provided by your Internet provider, which could be blocking such queries
    - You can reconfigure your router to configure clients on your network to use public DNS servers like `1.1.1.1` or `8.8.8.8`
    - You can also change the DNS configuration of your local machine to use public DNS servers like `1.1.1.1` or `8.8.8.8`

## Operational characteristics of Kurrent Cloud

Kurrent Cloud is a distributed fault-tolerant provisioning system and control plane. It is hosted in Amazon AWS. All data components and processing components are distributed across three availability zones. State is backed up, and the platform can be easily restored to another region in the event of a total region failure.

## The impact of outages on resources

The following is a brief description of what can be expected given an outage of the given component.

### Kurrent Cloud

#### Cloud API

- Viewing, creating, updating, and deleting resources may be impacted.
- Integrations and alerting may be impacted.
- Scheduled backup jobs may be impacted.

#### Web console

- Viewing, creating, updating, and deleting resources may be impacted.

#### Provisioned resources

The availability of provisioned resources (networks, peering links, clusters, and backups) **will not** be affected in the case that Kurrent Cloud services become unavailable.

### Cloud providers

Cloud Provider outages may affect the availability of resources or the ability to create, delete, and update resources within Kurrent Cloud.

#### Networks and peerings

While networks and peering links at cloud providers are fault-tolerant, occasionally events may occur that will degrade or, for a period of time remove network access to resources.

#### Clusters

In the event of a single availability zone failure, three-node topology clusters should continue to operate at a degraded level. If a leader node goes down, the remaining follower nodes will elect a new leader and the cluster will continue to function. When the leader node is able to re-join the cluster, it will join as a follower and catch up on any events that were written while it was down.

In the event of a single availability zone failure, single node topology clusters may become unavailable until the service can be restored. Most failures will be handled by Kurrent Cloud, however there will be a period of lost connectivity.

#### Backups

Clusters and single nodes are backed up by volume snapshots at the selected cloud provider. These snapshots are stored within fault-tolerant object storage for the provisioned region. It is possible that access to backups may be impacted temporarily. There is also a possibility that scheduled backups will not run for the duration of the outage.
