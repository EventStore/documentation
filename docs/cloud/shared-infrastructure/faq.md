---
title: FAQ
---

## Cluster provisioning

#### Is it possible to change the cluster instance size or topology?

Not yet, but it's on the roadmap for 2025.

#### Are there plans to support automatic resize of cluster nodes?

Yes, the goal is to support elastic scaling of the database cluster. This is on the road map.

## Migrating to Cloud

#### How can I migrate data from my self-hosted database to Kurrent Cloud?

We have a [replication tool](guides/migration.md), which is available now. It has certain limitations, especially with performance. Get in touch, so we can help you to analyse your setup and requirements, before we can recommend using the replication tool.

## Providers

### Do you plan to support other Cloud providers?

Absolutely! Both GCP and Azure are on the roadmap for 2025.

## Managed KurrentDB

#### Does the admin UI run on the provisioned cluster?

Yes. Go to the clusters list in the Cloud Console, select the cluster you need and click on the **Addresses** tab on the bottom panel. You will find the admin UI URL there.

## Backup and restore

#### Is this possible?

Not yet, but it's on the roadmap for 2025.

## Support

Support is not provided during the preview.

## Security

#### How to get an audit log of access to the console?

The Cloud Console access audit log is in our roadmap. Right now, you can [access the audit logs](ops/account-security.md#audit-log-api) using the `esc` command line tool.

#### Does Kurrent have a security policy?

Kurrent, Inc. has security policies in place.

If you have specific questions please [contact us](https://www.kurrent.io/contact)

## Troubleshooting

### Connectivity

#### Unable to connect to a public cluster

If you are trying to connect to a public cluster and you are not able to, please check the following:

- You are able to resolve the cluster DNS name
- Your IP address has been added to the IP Access List assigned to the cluster
- Your local network policies permit outbound connections to TCP port 2113

It is possible that your local network may be using a transparent web proxy which could cause the common methods of determining your source IP address to be incorrect. If you are on a corporate network or VPN, you may be able to get your network administrator to assist you.
