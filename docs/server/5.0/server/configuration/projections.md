# Projections

Settings in this section concern projections that are running on the server. Read more about projections [here](../projections/README.md).

:::warning
Server-side projections impact the performance of the EventStoreDB server. For example, some standard [system projections](../projections/system-projections.md) like Category or Event Type projections produce new (link) events that are stored in the database in addition to the original event. This effectively doubles or triples the number of events written and therefore creates pressure on the IO of the server node. We often call this effect "write amplification".
:::

## Start standard projections

This option instructs the server to start standard system projections when the server starts. However, the `RunProjections` parameter affects if those projections will be enabled or not, read more about this below. Standard projections are not started by default.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `-StartStandardProjections` or `--start-standard-projections` |
| YAML                 | `StartStandardProjections` |
| Environment variable | `EVENTSTORE_START_STANDARD_PROJECTIONS` |

**Default**: `false`, system projections won't start by default.

## Run projections

The `RunProjections` option tells the server if you want to run all projections, only system projections or no projections at all. Hence that the `StartSystemProjections` setting has no effect on custom projections.

The option accepts three values: `None`, `System` and `All`.
 
When the option value is set to `None`, the projections subsystem of EventStoreDB will be completely disabled and the Projections menu in the Admin UI will be disabled.

By using the `System` value for this option, you can instruct the server to enable system projections when the server starts. However, system projections will only start if the `StartStandardProjections` option is set to `true`. When the `RunProjections` option value is `System` (or `All`) but the `StartSystemProjections` option value is `false`, system projections will be enabled but not start. You can start them later manually via the Admin UI or via an API call.

Finally, you can set `RunProjections` to `All` and it will enable both system and custom projections. The `StartSystemProjections` will still control if system projections will be started or not. As for custom projections, only those that were started before the server node shutdown, will start again. Stopped projections will remain stopped even after the server restart.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `-RunProjections` or `--run-projections` |
| YAML                 | `RunProjections` |
| Environment variable | `EVENTSTORE_RUN_PROJECTIONS` |

**Default**: `None`, all projections are disabled by default.

Accepted values are `None`, `System` and `All`.

## Projection threads

Projections always run on a single node of the cluster, which is the leader node. That;s the same node that is used to accept all the write operations and the default node for read operations. Since projections might intensively use the node CPU, it might be beneficial to adjust the number of threads used by the projections subsystem. 

Use the `ProjectionThreads` option to do so. Adjusting the number of threads for projections only makes sense if the server node runs on a machine with multiple CPU cores.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `-ProjectionThreads` or `--projection-threads` |
| YAML                 | `ProjectionThreads` |
| Environment variable | `EVENTSTORE_PROJECTION_THREADS` |

**Default**: `3`

## Fault out of order projections

Not sure how it could happen.

| -FaultOutOfOrderProjections<br/>--fault-out-of-order-projections=VALUE<br/> | FAULT_OUT_OF_ORDER_PROJECTIONS | FaultOutOfOrderProjections | Specify if a projection should be faulted when there is a discontinuity in event ordering (Default: False) |
