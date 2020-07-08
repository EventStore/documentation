# Setting up projections

You enable projections with the command line argument `--run-projections`. For example, the command below enables all projection modes (system and user-defined):

::: tip Next steps
[Read this guide](../command-line-arguments.md#projections-options) for all the possible parameter values.
:::

::::: el-tabs
:::: el-tab-pane label="Windows"
```powershell
EventStore.ClusterNode.exe --run-projections=all --start-standard-projections=true
```
To disable them again, run:
```powershell
EventStore.ClusterNode.exe --run-projections=none
```
::::
:::: el-tab-pane label="Linux"
Add `EVENTSTORE_RUN_PROJECTIONS=All` and `EVENTSTORE_START_STANDARD_PROJECTIONS=true` to your environment variables, or the _/etc/eventstore/eventstore.conf_ configuration file and start Event Store:
```bash
sudo systemctl start eventstore
```
To disable them again, change the values to `EVENTSTORE_RUN_PROJECTIONS=none`.
::::
:::: el-tab-pane label="Docker"

The Event Store Docker image has projections enabled by default, but you need to enable standard projections:

```bash
docker run --name eventstore-node -it -p 2113:2113 -p 1113:1113 -e EVENTSTORE_RUN_PROJECTIONS=All -e EVENTSTORE_START_STANDARD_PROJECTIONS=true eventstore/eventstore
```

To disable them again:

```bash
docker run --name eventstore-node -it -p 2113:2113 -p 1113:1113 -e EVENTSTORE_RUN_PROJECTIONS=None eventstore/eventstore
```

::::
:::: el-tab-pane label="macOS"

```bash
eventstore --run-projections=all --start-standard-projections=true
```

To disable them again, run:

```bash
eventstore --run-projections=none
```

::: tip
To use the default database location on macOS you need to use `sudo`, or you can change the location with the `--db` parameter.
:::

::::
:::::

You then see new tabs enabled in the Admin UI with the four system projections in a `Stopped` state:

::: el-card :body-style="{ padding: '0px' }" 
![Projections tab](./images/projections-menu-item.png)
:::

::: el-card :body-style="{ padding: '0px' }" 
![Projections default state](./images/projections-default.png)
:::

## Using projections

Refer to the [HTTP API](../../http-api/projections/README.md) documentation or the SDK of your choice to learn how to use projections in your applications.

