---
title: "21.6.0 Release Notes"
date: 2021-07-01
author: "Hayley Campbell "
kind: "Post"
original: "https://www.eventstore.com/blog/21.6.0-release-notes"
tags:
- release notes
---

We are pleased to announce the official release of EventStoreDB 21.6.0 for the following operating systems:

*   Windows
*   Ubuntu 16.04
*   Ubuntu 18.04
*   Ubuntu 20.04
*   CentOS 7 (Commercial version)
*   Amazon Linux 2 (Commercial version)
*   Oracle Linux 7 (Commercial version)

## Where Can I Get the Packages?

Downloads are available on our [website](https://eventstore.com/downloads/).

The packages can be installed using the following instructions.

#### Ubuntu 16.04/18.04/20.04 (via [packagecloud](https://packagecloud.io/EventStore/EventStore-OSS))

```bash
curl -s https://packagecloud.io/install/repositories/EventStore/EventStore-OSS/script.deb.sh |
sudo bash
sudo apt-get install eventstore-oss=21.6.0
```

#### Windows (via [Chocolatey](https://chocolatey.org/packages/eventstore-oss))

```bash
choco install eventstore-oss -version 21.6.0
```

## Upgrade Procedure

To upgrade a cluster from 20.10.0, a usual rolling upgrade can be done:

*   Pick a node (Start with follower nodes first, then choose the leader last).
*   Stop the node, upgrade it and start it.
*   21.6.0 introduced strict configuration check for settings set through environment variables. It won't allow passing unknown settings. If you were using the obsolete settings from the older versions, it's needed to update them. Database logs will provide the failure details, e.g. for `EVENTSTORE_EXT_HTTP_PORT` you will see the following line `Error while parsing options: The option ExtHttpPort is not a known option. (Parameter 'ExtHttpPort')` . After replacing with the valid param `EVENTSTORE_HTTP_PORT` database should start properly.

If you are upgrading a cluster from version 5.x and below, please read the upgrade procedure in the 20.6.0 release notes. [https://eventstore.com/blog/event-store-20.6.0-release](https://eventstore.com/blog/event-store-20.6.0-release/).

21.6.0 is a feature release and will only be supported until the release of 21.10.0. Check out our [release schedule](https://www.eventstore.com/eventstoredb-long-term-support-and-release-schedule) for more information, and for help on deciding on when you should upgrade.

## Changes

### Persistent Subscriptions to $all

Persistent Subscriptions over gRPC now support subscribing to the $all stream, with an optional filter. Support for these subscriptions will be released for gRPC clients shortly. These subscriptions can only be created in a gRPC client, not through the UI or the TCP clients.

### Interpreted Runtime for Projections

We have introduced a new Interpreted runtime for projections, which replaces the existing V8 engine.

The Interpreted runtime is lighter-weight and easier to maintain than the existing legacy runtime. It will also allow us to package EventStoreDB for ARM processors and to provide a better debugging experience in the future.

This new runtime is enabled by default, but the legacy engine can be re-enabled by setting the _ProjectionRuntime_ flag to _Legacy_.

### Experimental v3 Log Format

21.6.0 includes the first preview of the new log format that we are working on. This new format is the first step towards some exciting new features and improved performance for larger databases.

At the moment, the new log format should behave similarly to the existing one. You can enable it by setting the _DbLogFormat_ option to _ExperimentalV3_ if you want to check it out.

Please be aware that this log format version is not compatible with the log V2 format, and is itself subject to change. As such, it is not meant for running in production, and can only be used for new databases. Tooling for migration will be coming at a later stage.

### BatchAppend for gRPC

Support for a more performant append operation has been added to the gRPC proto. This will make appending large numbers of events much faster. This does come with some restrictions such as all appends made using a single user specified at the connection level rather than the operation level. Further documentation and client support will be added shortly.

### Auto Configuration on Startup

There are a few configuration options that need to be tuned when running EventStoreDB on larger instances or machines in order to make the most of the available resources. To help with that, some options are now configured automatically at startup based on the system resources.

These options are _StreamInfoCacheCapacity_, _ReaderThreadsCount_, and _WorkerThreads_.

If you want to disable this behaviour, you can do so by simply overriding the configuration for the options.

#### StreamInfoCacheCapacity

StreamInfoCacheCapacity sets the maximum number of entries to keep in the stream info cache. This is the lookup that contains the information of any stream that has recently been read or written to. Having entries in this cache significantly improves write and read performance to cached streams on larger databases.

The cache is configured at startup based on the available free memory at the time. If there is 4gb or more available, it will be configured to take at most 75% of the remaining memory, otherwise it will take at most 50%. The minimum that it can be set to is 100,000 entries.

#### ReaderThreadsCount

ReaderThreadsCount configures the number of reader threads available to EventStoreDB. Having more reader threads allows more concurrent reads to be processed.

The reader threads count will be set at startup to twice the number of available processors, with a minimum of 4 and a maximum of 16 threads.

#### WorkerThreads

WorkerThreads configures the number of threads available to the pool of worker services.

At startup the number of worker threads will be set to 10 if there are more than 4 reader threads. Otherwise, it will be set to have 5 threads available.

## Community Contributions

Thank you to the community members who made contributions to this server release!

*   [Marodev](https://github.com/marodev): Fix ReSharper's "Merge sequential checks in && or || expression” warnings [(EventStore#2961)](https://github.com/EventStore/EventStore/pull/2961)
*   [StuartFergusonVme](https://github.com/StuartFergusonVme): Handle truncated streams when reading events for projections [(EventStore#2956)](https://github.com/EventStore/EventStore/pull/2956)
*   [StevenBlair123](https://github.com/StevenBlair123): Prevent scavenged events from being passed to Projections [(EventStore#2947)](https://github.com/EventStore/EventStore/pull/2947)
*   [the-mikedavis](https://github.com/the-mikedavis): Add NFIBrokerage/spear as a community gRPC client for Elixir [(EventStore#2939)](https://github.com/EventStore/EventStore/pull/2939)
*   [megakid](https://github.com/megakid): Make Microsoft.NETFramework.ReferenceAssemblies reference private [(EventStore#2859)](https://github.com/EventStore/EventStore/pull/2859)

## Providing Feedback

If you encounter any issues, please don’t hesitate to open an issue on [GitHub](https://github.com/eventstore/eventstore) if there isn’t one already.

Additionally, there is an active [discuss channel](https://discuss.eventstore.com/), and an #eventstore channel on the [DDD-CQRS-ES](https://j.mp/ddd-es-cqrs) Slack community.
