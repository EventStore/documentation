# Advanced options

## MonoMinThreadpoolSize

--mono-min-threadpool-size=VALUE

MONO_MIN_THREADPOOL_SIZE

MonoMinThreadpoolSize

Minimum number of worker threads when running under mono. Set to 0 to leave machine defaults. (Default: 10)

## Force

--force=true

FORCE

Force

Force the Event Store to run in possibly harmful environments such as with Boehm GC. (Default: False)

_This option is rarely used and you shouldn't be using it unless it's advised by Event Store support._

## WorkerThreads

--worker-threads=VALUE
WORKER_THREADS
WorkerThreads

The number of threads to use for pool of worker services. (Default: 5)
