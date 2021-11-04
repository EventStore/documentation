For extracting metrics or logs from your self-managed EventStore server, EventStoreDB Cloud recommends to use [Vector].

## Metrics

There is an official [EventStoreDB source] that you can use to pull relevant metrics from your database.


Below you can find an example that you can use in your `vector.toml` configuration file:
```toml
[sources.eventstoredb_metrics]
type = "eventstoredb_metrics"
endpoint = "https://{your_domain}:2113/stats"
scrape_interval_secs = 3
```

## Logs

To collect logs, you can use the [file source] and configure it to target EventStoreDB log file.

```toml
[sources.eventstoredb_logs]
type = "file"
# If you changed the default log location, please update the filepath accordingly.
include = [ "/var/log/eventstore" ]
read_from = "end"
```

## Last words

In order to use those sources, you need to plug them to a sink. [Vector] provides [many different sinks] from Prometheus to S3. Here's an example using the simplest of them all, the [Console] sink.

```toml
[sinks.console_sink]
type = "console"
inputs = ["eventstoredb_logs"]
target = "stdout"
```

In this example, the sink will print all the EventStoreDB logs from the `eventstoredb_logs` source to STDOUT.

[Vector]: https://vector.dev/docs/
[EventStoreDB source]: https://vector.dev/docs/reference/configuration/sources/eventstoredb_metrics/
[file source]: https://vector.dev/docs/reference/configuration/sources/file/
[many different sinks]: https://vector.dev/docs/reference/configuration/sinks/
[Console]: https://vector.dev/docs/reference/configuration/sinks/console/