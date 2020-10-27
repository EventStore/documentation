---
home: true
heroImage: /eventstore-waves.svg
heroText: EventStoreDB
tagline: The stream database built for Event Sourcing
actionText: Get Started →
actionLink: /v6/introduction/
features:
- title: High availability
  details: EventStoreDB can run as a cluster of nodes containing the same data which remains available for writes provided at least half the nodes are alive and connected.
- title: Optimistic concurrency checks
  details: Writes supports an optimistic concurrency check on the version of the stream to which events are written. If the check fails during writing, EventStoreDB returns an exception to let you know.
- title: Immutable data store
  details: EventStoreDB stores your data as a series of immutable events over time, providing one of the strongest audit log options available (characteristics similar to a blockchain).
---
