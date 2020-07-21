# Scavenging events

When you delete events or streams in EventStoreDB, they aren't removed immediately. To permanently delete these events you need to run a 'scavenge' on your database.

A scavenge reclaims disk space by rewriting your database chunks, minus the events to delete, and then deleting the old chunks. Scavenges only affect completed chunks, so deleted events in the current chunk are still there after you run a scavenge.

After processing the chunks, the operation updates the chunk indexes using a merge sort algorithm, skipping events whose data is no longer available.

::: warning
Once a scavenge has run, you cannot recover any deleted events.
:::

::: tip
Before version 4.0.2, a scavenge operation only worked with database chunk files. Since version 4.0.2 that reordering also happens inside the index files.
:::

## Starting a scavenge

Scavenges are not run automatically by EventStoreDB. We recommendation that you set up a scheduled task, for example using cron or Windows Scheduler, to trigger a scavenge as often as you need.

You start a scavenge by issuing an empty `POST` request to the HTTP API with the credentials of an `admin` or `ops` user:

::::: el-tabs type="border-card"
:::: el-tab-pane label="Request"
<<< @/docs/server/5.0.9/server/sample-code/scavenge.sh#curl

::: tip Next steps
Scavenge operations have other options you can set to improve performance, [read the API docs](http://none) for more details.
:::

::::
:::: el-tab-pane label="Response"
<<< @/docs/server/5.0.9/server/sample-code/scavenge.sh#response
::::
:::::

::: tip Next steps
For better scavenge performance, you can set the number of threads to use. If you need to restart a stopped scavenge, you can specify the starting chunk ID.
:::

You can also start scavenges from the _Admin_ page of the Admin UI.

::: el-card :body-style="{ padding: '0px' }" 
![Start a scavenge in the Admin UI](../images/admin-scavenge.png)
:::

::: tip
Each node in a cluster has its own independent database. As such, when you run a scavenge, you need to issue a scavenge request to each node.
:::

### How often to run a scavenge

This depends on the following:

-   How often you delete streams.
-   Depending on how you set `$maxAge`, `$maxCount` or `$tb` metadata on your streams.

## Stopping a scavenge

Stop a running scavenge operation by issuing a `DELETE` request to the HTTP API with the credentials of an `admin` or `ops` user and the ID of the scavenge you want to stop:

```bash
curl -i -X DELETE http://localhost:2113/admin/scavenge/{scavengeId} -u "admin:changeit"
```

You can also stop scavenges from the _Admin_ page of the Admin UI.

::: tip
Each node in a cluster has its own independent database. As such, when you run a scavenge, you need to issue a scavenge request to each node.
:::

## How often should you run a scavenge

This depends on the following:

-   How often you delete streams.
-   How you set `$maxAge`, `$maxCount` or `$tb` metadata on your streams.

## Scavenging online

It's safe to run a scavenge while EventStoreDB is running and processing events, as it's designed to be an online operation.

::: warning
Scavenging increases the number of reads/writes made to disk, and it is not recommended when your system is under heavy load.
:::

## Scavenging options

Scavenging is a necessary regular operation to free up disk space by cleaning up deleted events. Read more about it on the [scavenging page](../operations/scavenging.md). Below you can find some options that change the way how scavenging works on the server node.

### Disable scavenge merging

--disable-scavenge-merging=VALUE<br/> | DISABLE_SCAVENGE_MERGING | DisableScavengeMerging | Disables the merging of chunks when scavenge is running (Default: False) |

### Scavenge history

--scavenge-history-max-age=VALUE<br/> | SCAVENGE_HISTORY_MAX_AGE | ScavengeHistoryMaxAge | The number of days to keep scavenge history (Default: 30) |

### Always keep scavenged

--always-keep-scavenged=VALUE<br/> | ALWAYS_KEEP_SCAVENGED | AlwaysKeepScavenged | Always keeps the newer chunks from a scavenge operation. (Default: False) |

### Ignore hard delete

When you delete a stream, you can use either a soft delete or hard delete. When a stream is soft-deleted, all events from the stream get scavenged during the next scavenging run. It means that you can reopen the stream by writing to it again. When using hard delete, the stream gets closed with a tombstone event. Such an event tells the database that the stream cannot be reopened, so any attempt to write to the hard-deleted stream will fail. The tombstone event doesn't get scavenged.

You can override this behaviour and tell EventStoreDB that you want to delete all the traces of hard-deleted streams too, using the option specified below. After a scavenge operation runs, all hard-deleted streams will be open for writing new events again.

::: warning
Setting this option to `true` effectively disables hard deletes and allows clients to write to deleted streams. For that reason, the option is considered unsafe and should be used with caution.
:::

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--unsafe-ignore-hard-delete` |
| YAML                 | `UnsafeIgnoreHardDelete` |
| Environment variable | `EVENTSTORE_UNSAFE_IGNORE_HARD_DELETE` | 

