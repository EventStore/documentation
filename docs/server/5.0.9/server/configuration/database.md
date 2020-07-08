# Database settings

## Database location

EventStoreDB has a single database, which is spread across ever-growing number of physical files on the file system. Those files are called chunks and new data is always adds new data to the end of the latest chunk. When the chunk grows over 256 MiB, the server closes the chunk and opens a new one.

Normally, you'd want to keep the database files separated from the OS and other application files. The `Db` setting tells EventStoreDB where to put those chunk files. If the database server won't find anything at the specified location, it will create a new database.

--db=VALUE<br/> | DB | Db | The path the db should be loaded/saved to. (Default: [See default directories](operations/default-directories.md)) |

## In-memory database

When running EventStoreDB for educational purposes or in some automated test environment, you might want to prevent it from saving any data to the disk. EventStoreDB can keep the data in memory as soon as it has enough available RAM. When you shut down the instance that uses in-memory database, all the data will be lost.

--mem-db=VALUE<br/> | MEM_DB | MemDb | Keep everything in memory, no directories or files are created. (Default: False) |

## Skip database verification

--skip-db-verify=VALUE<br/> | SKIP_DB_VERIFY | SkipDbVerify | Bypasses the checking of file hashes of database during startup (allows for faster startup). (Default: False) |

## Chunk cache

You can increase the number of chunk files that are cached if you have free memory on the nodes. 

The [stats response](../operations/diagnostics.md#stats-and-metrics) contains two fields: `es-readIndex-cachedRecord` and `es-readIndex-notCachedRecord`. Statistic values for those fields tell you how many times a chunk file was retrieved from the cache and from the disk. We expect the two most recent chunks (the current chunk and the previous one) to be most frequently accessed and therefore cached.

If you observe that the `es-readIndex-notCachedRecord` stats value gets significantly higher than the `es-readIndex-cachedRecord`, you can try adjusting the chunk cache.

One setting is `ChunkCacheSize` and it tells the server how much memory it can use to cache chunks (in bytes). The chunk size is 256 MiB max, so the default cache size (two chunks) is 0.5 GiB. To increase the cache size to four chunks, you can set the value to 1 GiB (`1073741824` bytes). You'd also need to tell the server how many chunk files you want to keep in cache. For example, to double the number of cached chunks, set the `CachedChunks` setting to `4`.

Remember that only the latest chunks get cached. Also consider that the OS has its own file cache and increasing the chunk cache might not bring the desired performance benefit.

| -CachedChunks<br/>--cached-chunks=VALUE<br/> | CACHED_CHUNKS | CachedChunks | The number of chunks to cache in unmanaged memory. (Default: -1, or all) |


| -ChunksCacheSize<br/>--chunks-cache-size=VALUE<br/> | CHUNKS_CACHE_SIZE | ChunksCacheSize | The amount of unmanaged memory to use for caching chunks in bytes. (Default: 536871424) |


## Prepare and Commit timeout

Having a prepare and commit timeout of 2000 ms (default) means that any write done on the cluster may take up to 2000 ms before the server replies to the client that this write has timed out.

Depending on your client operation timeout settings (default is 7 seconds), increasing the timeout may block a client for up to the minimum of those two timeouts and thus this may reduce the throughput if set to a large value. The server also needs to keep track of all these writes and retries in memory until the time out is over and if a large number of them accumulate over time it may slow things down.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--prepare-timeout-ms` |
| YAML                 | `PrepareTimeoutMs` |
| Environment variable | `EVENTSTORE_PREPARE_TIMEOUT_MS` |

**Default**: `2000` (in milliseconds)

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--commit-out-of-order-projections` |
| YAML                 | `CommitTimeoutMs` |
| Environment variable | `EVENTSTORE_COMMIT_TIMEOUT_MS` |

**Default**: `2000` (in milliseconds)




