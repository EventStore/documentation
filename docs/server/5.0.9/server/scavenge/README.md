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
Scavenge operations have other options you can set to improve performance, [read the API docs](../../http-api/api.md#scavenge-a-node) for more details.
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

## Stopping a scavenge

Stop a running scavenge operation by issuing a `DELETE` request to the HTTP API with the credentials of an `admin` or `ops` user and the ID of the scavenge you want to stop:

```bash
curl -i -X DELETE http://localhost:2113/admin/scavenge/{scavengeId} -u "admin:changeit"
```

You can also stop scavenges from the _Admin_ page of the Admin UI.

::: tip
Each node in a cluster has its own independent database. As such, when you run a scavenge, you need to issue a scavenge request to each node.
:::

## How often to scavenge

This depends on the following:

- How often you delete streams.
- How you set `$maxAge`, `$maxCount` or `$tb` metadata on your streams.
- Have you enabled [writing stat events](../diagnostics/stats.md#write-stats-to-database) to the database.

You should scavenge more often if you expect a lot of deleted events. For example, if you enable writing stats events to the database, you will get them expiring after 24 hours. Since there are potentially thousands of those events generated per day, you have to scavenge at least once a week.

## Scavenging online

It's safe to run a scavenge while EventStoreDB is running and processing events, as it's designed to be an online operation.

::: warning
Scavenging increases the number of reads/writes made to disk, and it is not recommended when your system is under heavy load.
:::


