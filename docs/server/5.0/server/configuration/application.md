# Application options

| Command line parameter | Environment variable prefixed with `EVENTSTORE_` | Config file YAML | Description |
|:------------|:---------------|:----------|:-------|

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
| -StartStandardProjections<br/>--start-standard-projections=VALUE<br/> | START_STANDARD_PROJECTIONS | StartStandardProjections | Start the built in system projections. (Default: False) |
| -DisableHTTPCaching<br/>--disable-http-caching=VALUE<br/> | DISABLE_HTTP_CACHING | DisableHTTPCaching | Disable HTTP caching. (Default: False) |
| -MonoMinThreadpoolSize<br/>--mono-min-threadpool-size=VALUE<br/> | MONO_MIN_THREADPOOL_SIZE | MonoMinThreadpoolSize | Minimum number of worker threads when running under mono. Set to 0 to leave machine defaults. (Default: 10) |
| -Force<br/>--force=VALUE<br/> | FORCE | Force | Force the Event Store to run in possibly harmful environments such as with Boehm GC. (Default: False) |
| -StatsPeriodSec<br/>--stats-period-sec=VALUE<br/> | STATS_PERIOD_SEC | StatsPeriodSec | The number of seconds between statistics gathers. (Default: 30) |
| -WorkerThreads<br/>--worker-threads=VALUE<br/> | WORKER_THREADS | WorkerThreads | The number of threads to use for pool of worker services. (Default: 5) |
| -EnableHistograms<br/>--enable-histograms=VALUE<br/> | ENABLE_HISTOGRAMS | EnableHistograms | Enables the tracking of various histograms in the backend, typically only used for debugging etc (Default: False) |
| -LogHttpRequests<br/>--log-http-requests=VALUE<br/> | LOG_HTTP_REQUESTS | LogHttpRequests | Log HTTP Requests and Responses before processing them. (Default: False) |
