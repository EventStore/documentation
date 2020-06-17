# Diagnostic settings

## Logging

EventStoreDB logs its internal operations to the console (stdout) and to log files. The default location of the log files and the way to change it is described [below](#logs-location).

There are a few options to change the way how EventStoreDB produces logs and how detailed the logs should be.

### Log format

The `--structured-log` enables the structured logging in JSON format that is more machine-friendly and can be ingested by vendor-specific tools like Logstash or Datadog agent. The default value for this option is `true` and you only need to change it if you want plain-next logs.

Here is how the structured log looks like:

```json
{ "PID": "6940", "ThreadID": "23", "Date": "2020-06-16T16:14:02.052976Z", "Level": "Debug", "Logger": "ProjectionManager", "Message": "PROJECTIONS: Starting Projections Manager. (Node State : {state})", "EventProperties": { "state": "Master" } }
{ "PID": "6940", "ThreadID": "15", "Date": "2020-06-16T16:14:02.052976Z", "Level": "Info", "Logger": "ClusterVNodeController", "Message": "========== [{internalHttp}] Sub System '{subSystemName}' initialized.", "EventProperties": { "internalHttp": "127.0.0.1:2112", "subSystemName": "Projections" } }
{ "PID": "6940", "ThreadID": "23", "Date": "2020-06-16T16:14:02.052976Z", "Level": "Debug", "Logger": "MultiStreamMessageWriter", "Message": "PROJECTIONS: Resetting Worker Writer", "EventProperties": {  } }
{ "PID": "6940", "ThreadID": "23", "Date": "2020-06-16T16:14:02.055000Z", "Level": "Debug", "Logger": "ProjectionCoreCoordinator", "Message": "PROJECTIONS: SubComponent Started: {subComponent}", "EventProperties": { "subComponent": "EventReaderCoreService" } }
```

Here is the example of the plain-text log:

```
[PID:12989:023 2020.06.16 16:16:22.054 DEBUG PersistentSubscripti] Persistent subscriptions Became Master so now handling subscriptions
[PID:12989:015 2020.06.16 16:16:22.054 DEBUG StorageScavenger    ] Searching for incomplete scavenges on node 127.0.0.1:2113.
[PID:12989:015 2020.06.16 16:16:22.071 DEBUG StorageScavenger    ] Max age and $ops read permission already set for the $scavenges stream.
[PID:12989:015 2020.06.16 16:16:22.073 DEBUG StorageScavenger    ] No incomplete scavenges found on node 127.0.0.1:2113.
```

Keep in mind that the console output will not use structured logging, the option only affects the log files.

### Logs location

Log files are located in `/var/lib/eventstore` for Linux and macOS, and in the `logs` subdirectory of the EventStoreDB installation directory on Windows. You can change the log files location using the `Log` configuration option.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `-Log` or `--log` |
| YAML                 | `Log` |
| Environment variable | `EVENTSTORE_LOG` |

For example, adding this line to the `eventstore.conf` file will force writing logs to the `/tmp/eventstore/logs` directory:

```
Log: /tmp/eventstore/logs
```

### Log level

By default, EventStoreDB uses the `Debug` log level and it's quite verbose. You can change the level to reduce the amount of space used by the logs, using the logging configuration.

<!TODO>

### HTTP requests logging

EventStoreDB cal also log all the incoming HTTP requests, like many HTTP servers do. Requests are logged before being processed, so unsuccessful requests are logged too.

Use one of the following ways to enable the HTTP requests logging:
 
| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--log-http-requests=true` |
| YAML                 | `LogHttpRequests: True` |
| Environment variable | `EVENTSTORE_LOG_HTTP_REQUESTS=true` |

Logging HTTP requests is disabled by default.

## Stats and metrics

| -StatsPeriodSec<br/>--stats-period-sec=VALUE<br/> | STATS_PERIOD_SEC | StatsPeriodSec | The number of seconds between statistics gathers. (Default: 30) |

| -WriteStatsToDb<br/>--write-stats-to-db=VALUE | WRITE_STATS_TO_DB | WriteStatsToDb | Write stats data to the Event Store database. (Default: False) |

| -EnableHistograms<br/>--enable-histograms=VALUE<br/> | ENABLE_HISTOGRAMS | EnableHistograms | Enables the tracking of various histograms in the backend, typically only used for debugging etc (Default: False) |
