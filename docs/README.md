---
home: true
title: EventStoreDB - The stream database built for Event Sourcing
description: EventStoreDB - The stream database built for Event Sourcing
heroText: EventStoreDB
tagline: Early preview of the next-gen documentation. It is not entirely complete and you can expect inconsistencies, broken links and missing examples. Please be tolerant to those issues as we are working hard to polish it!
actionText: I understand and won't complain much →
actionLink: /latest.html
features:
- title: High availability
  details: EventStoreDB can run as a cluster of nodes containing the same data which remains available for writes provided at least half the nodes are alive and connected.
- title: Optimistic concurrency checks
  details: Writes supports an optimistic concurrency check on the version of the stream to which events are written. If the check fails during writing, EventStoreDB returns an exception to let you know.
- title: Immutable data store
  details: EventStoreDB stores your data as a series of immutable events over time, providing one of the strongest audit log options available (characteristics similar to a blockchain).
footer: Copyright © 2020 EventStoreDB Limited
---
