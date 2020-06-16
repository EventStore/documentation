# Configuration

EventStoreDB has a number of configuration options that can be changed. You can find all the options described in details in this section.

When you don't change the configuration, EventStoreDB will use sensible defaults, but they might not suit your needs. You can always instruct EventStoreDB to use a different set of options.

There are multiple ways to configure EventStoreDB server, described below.

## Configuration file

You would use the configuration file when you want the server to run with the same set of options every time. YAML files are better for large installations as you can centrally distribute and manage them, or generate them from a configuration management system.

The configuration file has YAML-compatible format. The basic format of the YAML configuration file is as follows:

```yaml
 ---
 Log: "/v5/logs"
 IntHttpPort: 2111
 --- 
```

:::tip
You need to use the three dashes and spacing in your YAML file.
:::

The default configuration file name is `eventstore.conf`. It is located in `/etc/eventstore/` on Linux and the server installation directory on Windows. You can either change this file or create another file and instruct EventStoreDB to use it.

To tell the EventStoreDB server to use a different configuration file, you pass the file path on the command line with `--config=filename`, or use the `CONFIG` environment variable.

## Environment variables

You can set all arguments can also as environment variables. All variables are prefixed with `EVENTSTORE_` and normally follow the pattern `EVENTSTORE_{option}`. For example, setting the `EVENTSTORE_LOG` variable would instruct the server to use a custom location for log files.

Environment variables override all the options specified in configuration files.

## Command line

You can also override options from both configuration files and environment variables using the command line.

For example, starting EventStoreDB with the `--log` option will override the default log files location:

:::: el-tabs
::: el-tab-pane label="macOS"
```
eventstore --log /tmp/eventstore/logs
```
:::
::: el-tab-pane label="Windows"
```
EventStore.ClusterNode.exe --log C:\Temp\EventStore\Logs
```
:::
::::

