# System stream and event types

## `$persistentSubscriptionConfig`

`$persistentSubscriptionConfig` is a special paged stream that contains all configuration events, for all persistent subscriptions. It uses the following system event types:

- `PersistentConfig`: An event that records a configuration event, the event data contains:
  - `version`: Version of event data
  - `updated`: Updated date
  - `updatedBy`: User who updated configuration
  - `maxCount`: The number of configuration events to save
  - `entries`: Configuration items set by event.

## `$all`

`$all` is a special paged stream for all events. You can use the same paged form of reading described above to read all events for a node by pointing the stream at _/streams/\$all_. As it's a stream like any other, you can perform all operations, except posting to it.

## `$settings`

The `$settings` stream has a special ACL used as the default ACL. This stream controls the default ACL for streams without an ACL and also controls who can create streams in the system, the default state of these is shown below:

```json
{
  "$userStreamAcl": {
    "$r": "$all",
    "$w": "$all",
    "$d": "$all",
    "$mr": "$all",
    "$mw": "$all"
  },
  "$systemStreamAcl": {
    "$r": "$admins",
    "$w": "$admins",
    "$d": "$admins",
    "$mr": "$admins",
    "$mw": "$admins"
  }
}
```

You can rewrite these to the `$settings` stream with the following cURL command:

<<< @/docs/server/5.0/http-api/sample-code/default-settings.sh#curl

The `$userStreamAcl` controls the default ACL for user streams, while all system streams use the `$systemStreamAcl` as the default.

::: tip
The `$w` in `$userStreamAcl` also applies to the ability to create a stream. Members of `$admins` always have access to everything, you cannot remove this permission.
:::

When you set a permission on a stream, it overrides the default values. However, it's not necessary to specify all permissions on a stream. It's only necessary to specify those which differ from the default.

## `$stats`

Event Store has debug and statistics information available about a cluster in the `$stats` stream, find out more in [the stats guide](operations/stats-debug.md).

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
