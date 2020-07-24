# Settings not to be documented

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

## Other options

--reduce-file-cache-pressure=VALUE| REDUCE_FILE_CACHE_PRESSURE | reduceFileCachePressure   | Disables `FileOptions.RandomAccess` cache flag when opening chunk files. Useful if the Windows File Cache is consuming memory. (Default: False) |

--initialization-threads=VALUE | INITIALIZATION_THREADS | InitializationThreads | Number of threads used to load chunk and index files. (Default: 1) |

| -ConnectionPendingSendBytesThreshold<br/>--connection-pending-send-bytes-threshold=VALUE<br/> | CONNECTION_PENDING_SEND_BYTES_THRESHOLD | ConnectionPendingSendBytesThreshold | The maximum number of pending send bytes allowed before a connection is closed. (Default: 10485760) |

| -WriteThrough<br/>--write-through=VALUE<br/> | WRITE_THROUGH | WriteThrough | Enables Write Through when writing to the file system, this bypasses filesystem caches. (Default: False) |

| -Unbuffered<br/>--unbuffered=VALUE<br/> | UNBUFFERED | Unbuffered | Enables Unbuffered/DirectIO when writing to the file system, this bypasses filesystem caches. (Default: False)   |

| -BetterOrdering<br/>--better-ordering=VALUE<br/> | BETTER_ORDERING | BetterOrdering | Enable Queue affinity on reads during write process to try to get better ordering. (Default: False) |

| -HashCollisionReadLimit<br/>--hash-collision-read-limit=VALUE<br/> | HASH_COLLISION_READ_LIMIT | HashCollisionReadLimit | The number of events to read per candidate in the case of a hash collision (Default: 100) |
