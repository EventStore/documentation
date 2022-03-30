---
title: Cloud FAQ
---

## Roadmap

#### Where can I find the Cloud Roadmap?

The Event Store Cloud roadmap is available on [our website](https://www.eventstore.com/event-store-cloud), scroll down to see the roadmap.

## Cluster provisioning

#### Is it possible to change the cluster instance size or topology?

We don't have this feature available yet. However, you can always do it using backup and restore.

#### Are there plans to support automatic resize of cluster nodes?

You will be able to do an online instance resize, but it won't be auto-scaling. You will have to change the instance size for your clusters yourself, when this feature will become available.

#### Are there plans to support automatic disk resize?

Disks can be expanded on-demand in AWS and GCP, for Azure read the procedure in the [documentation](../ops/README.md#expanding-disks).

## Migrating to Cloud

#### How can I migrate data from my self-hosted database to Event Store Cloud?

We have a [replication tool](../use/README.md#migrating-data), which is available now. It has certain limitations, especially with performance. Get in touch, so we can help you to analyse your setup and requirements, before we can recommend using the replication tool.

## Performance

#### Do you have indicative performance benchmarks for the offered cluster sizes?

We published such benchmarks available on the [Cloud instance sizing guide](../provision/README.md#cloud-instance-sizing-guide) page.

Please remember, however, that each use case is different, and you might always get better or worse performance, compared with our advertised benchmarking figures. We can help you to analyse your needs and provide more detailed expected performance figures, please get in touch.

## Alerting and notifications

#### Is there any type of alerting functionality for cluster issues?

Yes. Learn more in the [Events Console](../intro/README.md#events-and-notifications) documentation section.

#### How do you handle infrastructure related issues, which cause unavailability or degradation of service?

Event Store Cloud site reliability engineering (SRE) team manages cluster availability.

Please ensure to learn about the SLA levels provided by Event Store Cloud in our [Service Level Agreement](https://www.eventstore.com/cloud-services-service-level-agreement).

## Providers

### Azure

#### Do you use Locally-Redundant Storage (LRS) or Zone-Redundant Storage (ZRS)?

Customer data is only stored on Premium SSD block device targets. We do not utilize Azure file or blob storage for customer data.

#### We use AKS, to simplify setup can you expose the cluster to the public internet?

We have no plans to expose clusters via a public IP address. We will be providing guidelines on how to connect AKS clusters to Event Store Cloud.

#### Why can't I resize disks in Azure after provisioning the cluster?

The disk resize operation in Azure requires us to shot down the cluster node. It works differently in GCP and AWS, that's why we are providing this options for GCP and AWS, but not for Azure. We have plans to implement this feature, but there's no ETA at the moment. Due to Azure limitations, disk resize for single-node instances would always involve some downtime.

## Managed EventStoreDB

#### Does the admin UI run on the provisioned cluster?

Yes. Go to the clusters list in the Cloud Console, select the cluster you need and click on the `Addresses` tab on the bottom panel. You will find the admin UI URL there. You need to be connected to a network, which is routed to Event Store Cloud to open the admin UI in your browser.

#### Are there plans for the scheduled scavenge feature?

Yes, we are actively working on it.

## Backup and restore

#### Can I automate backups?

The scheduled backup feature has been released in March 2021. Read more in [cloud backup documentation](../ops/README.md#scheduled-backups).

#### Can I download a backup to store it locally?

We plan to allow backup copies to the customer cloud account in the future. Currently, it's not possible because of security considerations.

## Service levels

#### What is the SLA for Event Store Cloud?

You can find out about the SLA levels provided by Event Store Cloud in our [Service Level Agreement](https://www.eventstore.com/cloud-services-service-level-agreement).

#### Are maintenance windows part of the SLA?

You can find out about the SLA levels provided by Event Store Cloud in our [Service Level Agreement](https://www.eventstore.com/cloud-services-service-level-agreement).

## Support

#### For same day response, what time zone is your 9am-5pm response against?

Our support response time windows are provided in GMT time zone. We are expanding our SRE team to handle time zones in North America as well.

#### What level of access does the customer have to resolve minor incidents?

Customers do not have direct access to VMs, where the database cluster nodes are running. A lot of management functions are available via the HTTP API, which is available for customers to access and use.

You can also use our cloud automation tools ([Terraform](../automation/README.md#terraform-provider) provider and CLI) to manage your cloud resources.

#### If a node goes down in a cluster, how is the cluster recovered and who does it?

If the issue is cloud provider related, our staff manages the replacement.

If it is customer load related, an issue will be created with a call to action for the customer to address.

Please ensure to learn about the SLA levels provided by Event Store Cloud in our [Service Level Agreement](https://www.eventstore.com/cloud-services-service-level-agreement).

## Security

#### How can I to get an audit log of access to the console?

The Cloud Console access audit log is in our roadmap, we will present the details of the schedule on the public [roadmap](https://www.eventstore.com/event-store-cloud) page.

#### Does Event Store have a security policy?

Event Store Ltd has security policies in place.

If you have specific questions please [contact us](https://www.eventstore.com/contact)

#### Has the system been independently audited?

Event Store Ltd is aware of the security importance. We're treating it is as a high priority. Our Cloud offering has been independently audited, and we achieved [SOC 2](https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html) and [ISO 27001](https://www.iso.org/isoiec-27001-information-security.html) certification in January 2022.

If you have specific questions please [contact us](https://www.eventstore.com/contact)

## Troubleshooting

### Connectivity

#### Are managed EventStoreDB clusters available via public Internet?

We consider exposing EventStoreDB clusters to public Internet harmful as it's a database, which contains sensitive business data. Therefore, all managed EventStoreDB instances and clusters only have private IP addresses within their cloud networks (VPCs). You need to establish a peering link between Event Store Cloud network and your own VPC, so you can access the cluster from your cloud workloads.

#### The cluster DNS name does not resolve on my machine, what do I do?

Some Internet providers, routers, and DNS servers will not resolve or filter out answers to DNS queries for `xxxx.mesdb.eventstore.cloud` because the DNS name resolves to a private IP range.

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

- If the issue is in the router, and you can configure it, check the router documentation to allow DNS queries, which resolve to private IP ranges.
- When you are sure that the router is fine, it might be your Internet provider, which is blocking such queries. Try getting in touch with them to resolve the issue.
- You can also reconfigure your router, or your machine, to use public DNS servers like `1.1.1.1` or `8.8.8.8`.

## Operational characteristics of Event Store Cloud

Event Store Cloud is a distributed fault-tolerant provisioning system and control plane. It is hosted in Amazon AWS. All data components and processing components are distributed across three availability zones. State is backed up, and the platform can be easily restored to another region in the event of a total region failure.

## The impact of outages on resources

The following is a brief description of what can be expected given an outage of the given component.

### Event Store Cloud

#### Cloud API

Performance may be degraded or inaccessible.

#### Web console

Performance may be degraded or inaccessible.

#### Provisioned resources

The availability of provisioned resources (networks, peering links, clusters, and backups) **will not** be affected in the case that Event Store Cloud services become unavailable.

### Cloud providers

Cloud Provider outages may affect the availability of resources or the ability to create, delete, and update resources within Event Store Cloud.

#### Networks and peerings

While networks and peering links at cloud providers are fault-tolerant, occasionally events may occur that will degrade or, for a period of time remove network access to resources.

#### Clusters

In the event of a failure, single node topology clusters may become unavailable until the service can be restored. Most failures will be handled by Event Store Cloud, however there will be a period of lost connectivity.

Multi-node, multi-zone topology clusters should sustain a single availability failure.

#### Backups

Clusters and single nodes are backed up by volume snapshots at the selected cloud provider. These snapshots are stored within fault-tolerant object storage for the provisioned region. It is possible that access to backups may be impacted temporarily. There is also a possibility that scheduled backups will not run for the duration of the outage.
