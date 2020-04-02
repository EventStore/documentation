---
outputFileName: index.html
---

# System stream and event types

## `$persistentSubscriptionConfig`

`$persistentSubscriptionConfig` is a special paged stream that contains all configuration events, for all persistent subscriptions. It uses the following system event types:

- `PersistentConfig`: An event that records a configuration event, the event data contains:
  - `version`: Version of event data
  - `updated`: Updated date
  - `updatedBy`: User who updated configuration
  - `maxCount`: The number of configuration events to save
  - `entries`: Configuration items set by event. Find more details of configuration items for [the .NET API](~/dotnet-api/competing-consumers.md) and [the HTTP API](~/http-api/competing-consumers.md).

## `$all`

[!include[<Reading all events>](~/partials/_all-events.md)]

## `$settings`

[!include[<Settings stream>](~/partials/_settings-acl.md)]

## `$stats`

Event Store has debug and statistics information available about a cluster in the `$stats` stream, find out more in [the stats guide](~/server/stats-debug.md).

## `$scavenges`

`$scavenges` is a special paged stream for all scavenge related events. It uses the following system event types:

- `$scavengeIndexInitialized`: An event that records the initialisation of the scavenge index.
- `$scavengeStarted`: An event that records the beginning of a scavenge event, the event data contains:

  - `scavengeId`: Scavenge event ID
  - `nodeEndpoint`: Node address

- `$scavengeCompleted`: An event that records the completion of a scavenge event, the event data contains:
  - `scavengeId`: Scavenge event ID
  - `nodeEndpoint`: Node address
  - `result`: `Success`, `Failed`, `Stopped`
  - `error`: Error details
  - `timeTaken`: Time taken for the scavenge event in milliseconds
  - `spaceSaved`: Space saved by scavenge event in bytes
