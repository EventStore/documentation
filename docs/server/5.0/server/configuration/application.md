# Application options

## Help

Use `-Help` or `--help` in the command line to get the full list of options.

## Version

To check the EventStoreDB version, use the `-Version` or `--version` option.

For example:

```
$ eventstore --version
EventStore version 5.0.8.0 (HEAD/6b871e5659ed38775372456fb21be6a99392fddb, Thu, 26 Mar 2020 11:42:43 +0100)
```

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `-Help` or `--help` |
| YAML                 |  |
| Environment variable |  | 



| -Defines<br/>--defines=VALUE<br/> | DEFINES | Defines | Run-time conditionals. (Default: n/a) |
| -MonoMinThreadpoolSize<br/>--mono-min-threadpool-size=VALUE<br/> | MONO_MIN_THREADPOOL_SIZE | MonoMinThreadpoolSize | Minimum number of worker threads when running under mono. Set to 0 to leave machine defaults. (Default: 10) |
| -Force<br/>--force=VALUE<br/> | FORCE | Force | Force the Event Store to run in possibly harmful environments such as with Boehm GC. (Default: False) |
| -WorkerThreads<br/>--worker-threads=VALUE<br/> | WORKER_THREADS | WorkerThreads | The number of threads to use for pool of worker services. (Default: 5) |
