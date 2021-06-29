# Roadmap

The Event Store Cloud roadmap is available on [our website](https://www.eventstore.com/event-store-cloud), scroll down to see the roadmap.

## Migrating to Cloud

### How can I migrate data from my self-hosted database to Event Store Cloud?

We have a replication tool, which is available now. It has certain limitations, especially with performance. Get in touch, so we can help you to analyse your setup and requirements, before we can recommend using the replication tool.

### Do you have indicative performance benchmarks for the offered cluster sizes?

We published such benchmarks available on the [Cloud instance sizing guide](../provision/cloud-instance-guidance/) page.

Please remember, however, that each use case is different, and you might always get better or worse performance, compared with our advertised benchmarking figures. We can help you to analyse your needs and provide more detailed expected performance figures, please get in touch.

## Features

### Are there plans for the scheduled scavenge feature?

Yes, we are actively working on it.

### What is the ETA on the scheduled backup general availability?

The scheduled backup feature has been released in March 2021. Read more in [cloud backup documentation](../ops/scheduled_backups.md).

### Are there plans to enable external access to the backups (e.g. via _Amazon S3_, _Azure Blob Storage_ or _ Google Cloud Storage_)?

We plan to allow backup copies to the customer cloud account in the future. Currently, it's not possible because of security considerations.

### Are there plans to be able get an audit log of access to the console?

Yes, we will present the details of the schedule on the public [roadmap](https://www.eventstore.com/event-store-cloud) page.
