---
title: Auto-Scavenge
order: 7
---

## Tutorial: Using Auto-Scavenge

This step-by-step tutorial guides you through using, scheduling and managing  **Auto-Scavenge** in EventStoreDB.

The Auto-scavenge feature is designed to manage and automate cluster scavenges across multiple nodes efficiently. It operates on a scheduled basis using CRON expressions, ensuring that only one node scavenge occurs simultaneously to minimize disruption. To reduce impact on cluster performance the feature prioritizes non-leader nodes for scavenging, with the leader node resigning before its own scavenge is executed.

Auto-scavenge restarts or cancels scavenges if a node is lost, and allows you to pause and resume cluster scavenges as needed. With this comprehensive, automated approach, you can maintain cluster health and performance more effectively.


#### Prerequisites:

* [EventStoreDB 24.10 LTS installed and running](http://@server/quick-start/installation.md)
* [License key](http://@server/quick-start/installation.md#license-keys) for Auto-Scavenge (a valid license is required to use this feature)
* Requires `$ops` or `$admin` role


### Step 1: Verify license key

Ensure you have a valid **license key** to utilize Auto-Scavenge. Without the license, this feature will not function.

### Step 2: Confirm Auto-Scavenge availability

By default, Auto-scavenge is bundled with EventStoreDB 24.10 LTS. You can confirm its availability in the EventStoreDB logs. Look for the following log message:

```
[INF] "AutoScavenge" "24.10.1" plugin enabled.
```

For instructions on accessing EventStoreDB logs, refer to the [log documentation](http://@server/diagnostics/logs.md).

If you do not see the "plugin enabled" entry in the log, check the configuration
 file to see if it has been disabled.

```
AutoScavenge:
  Enabled: false
```

If Auto-scavenge has been disabled, enable it and restart the cluster.

```
AutoScavenge:
  Enabled: true
```

::: note 
Auto-scavenge cannot be enabled at the same time as dev mode or mem-db
:::


### Step 3: Schedule Auto-Scavenging

To schedule Auto-scavenge use the http endpoint `/auto-scavenge/configure` and post a JSON object containing a schedule key with a value in Linux crontab format. 

See [https://en.wikipedia.org/wiki/Cron](https://en.wikipedia.org/wiki/Cron) for an explanation of the format.

#### Example: Configure to scavenge at 03:00 every day

```
POST https://127.0.0.1:2113/auto-scavenge/configure
Content-Type: application/json
Authorization: Basic admin:changeit

   {
    "schedule": "0 3 * * *"
    }
```

Replace admin:changeit with your credentials, and the url with the correct address for your server.

### Step 4: Checking Auto-Scavenge status

A `GET` request to the http endpoint `/auto-scavenge/status` will return Auto-scavenge status.

```
GET https://127.0.0.1:2113/auto-scavenge/status
Authorization: Basic admin:changeit
```

The response below shows that Auto-scavenge has been scheduled and will begin running in 13 hours, 14 minutes and 32.6999115 seconds.

```
{
  "state": "Waiting",
   "schedule": "0 3 * * *",
   "timeUntilNextCycle": "0.13:14:32.6299115"
}
```

See the [Auto-Scavenge documentation](https://docs.kurrent.io/server/v24.10/operations/auto-scavenge.html#http-endpoints) for more information on Auto-scavenge states.

### Step 5 (optional): Pausing Auto-Scavenge

If the status endpoint returns "state": "InProgress" and you want to pause Auto-Scavenge, submit a POST request to the `/auto-scavenge/pause` endpoint.

```
POST https://127.0.0.1:2113/auto-scavenge/pause
Authorization: Basic admin:changeit

```

### Step 6 (optional): Resume Auto-Scavenge

If the status endpoint returns "state": "Paused" and you want to resume Auto-Scavenge, submit a POST request to the `/auto-scavenge/resume` endpoint.

```
POST https://127.0.0.1:2113/auto-scavenge/resume
Authorization: Basic admin:changeit
```


### Summary

By following this tutorial, you should have successfully:

* Scheduled Auto-scavenge to run on EventStoreDB
* Verified Auto-scavenge status from EventStoreDB
* (Optional) Paused Auto-scavenge
* (Optional) Resumed Auto-scavenge

By configuring Auto-scavenge to operate on a scheduled basis, you can ensure that only one node is engaged in scavenging at any given time, and that the leader node is excluded from the process. Additionally, this setup allows for real-time status monitoring and provides the flexibility to pause and resume the Auto-scavenge operation.


