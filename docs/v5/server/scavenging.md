---
outputFileName: index.html
sinceVersion: 4.0.2
---

# Scavenging events

When you delete events or streams in Event Store, they aren't removed immediately. To permanently delete these events you need to run a 'scavenge' on your database.

A scavenge reclaims disk space by rewriting your database chunks, minus the events to delete, and then deleting the old chunks. Scavenges only affect completed chunks, so deleted events in the current chunk are still there after you run a scavenge.

After processing the chunks, the operation updates the chunk indexes using a merge sort algorithm, skipping events whose data is no longer available.

> [!WARNING]
> Once a scavenge has run, you cannot recover any deleted events.
>
> [!NOTE]
> Before version 4.0.2, a scavenge operation only worked with database chunk files. Since version 4.0.2 that reordering also happens inside the index files.

## Starting a scavenge

Scavenges are not run automatically by Event Store. We recommendation that you set up a scheduled task, for example using cron or Windows Scheduler, to trigger a scavenge as often as you need.

You start a scavenge by issuing an empty `POST` request to the HTTP API with the credentials of an `admin` or `ops` user:

### [Request](#tab/tabid-8)

[!code-bash[server-scavenge-request](~/code-examples/server/scavenge.sh?start=1&end=1)]

> [!NEXT]
> Scavenge operations have other options you can set to improve performance, [read the API docs](xref:eventstore.com%2FHTTP%20API%2F5.0.4%2FScavenge%20a%20node) for more details.

### [Response](#tab/tabid-9)

[!code-http[server-scavenge-response](~/code-examples/server/scavenge.sh?range=3-)]

* * *

> [!NEXT]
> For better scavenge performance, you can set the number of threads to use. If you need to restart a stopped scavenge, you can specify the starting chunk ID. [Find out more in the API reference](xref:eventstore.com%2FHTTP%20API%2F5.0.4%2FScavenge%20a%20node).

You can also start scavenges from the _Admin_ page of the Admin UI.

![Start a scavenge in the Admin UI](~/images/admin-scavenge.png)

> [!TIP]
> Each node in a cluster has its own independent database. As such, when you run a scavenge, you need to issue a scavenge request to each node.

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

> [!TIP]
> Each node in a cluster has its own independent database. As such, when you run a scavenge, you need to issue a scavenge request to each node.

## How often should you run a scavenge

This depends on the following:

-   How often you delete streams.
-   How you set `$maxAge`, `$maxCount` or `$tb` metadata on your streams.

> [!TIP]
> Read the [.NET API](~/dotnet-api/stream-metadata.md) or [HTTP API](~/http-api/stream-metadata.md) docs for more details on setting metadata.

## Scavenging while Event Store is online

It's safe to run a scavenge while Event Store is running and processing events, as it's designed to be an online operation.

> [!WARNING]
> Scavenging increases the number of reads/writes made to disk, and it is not recommended when your system is under heavy load.
