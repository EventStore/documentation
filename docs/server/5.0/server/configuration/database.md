# Database settings

## Db

--db=VALUE<br/> | DB | Db | The path the db should be loaded/saved to. (Default: [See default directories](operations/default-directories.md)) |

## MemDb

--mem-db=VALUE<br/> | MEM_DB | MemDb | Keep everything in memory, no directories or files are created. (Default: False) |

## SkipDbVerify

--skip-db-verify=VALUE<br/> | SKIP_DB_VERIFY | SkipDbVerify | Bypasses the checking of file hashes of database during startup (allows for faster startup). (Default: False) |

## MinFlushDelayMs

--min-flush-delay-ms=VALUE<br/> | MIN_FLUSH_DELAY_MS | MinFlushDelayMs | The minimum flush delay in milliseconds. (Default: 2) |

## ???

| -CachedChunks<br/>--cached-chunks=VALUE<br/> | CACHED_CHUNKS | CachedChunks | The number of chunks to cache in unmanaged memory. (Default: -1, or all) |
| -ReaderThreadsCount<br/>--reader-threads-count=VALUE<br/> | READER_THREADS_COUNT | ReaderThreadsCount | The number of reader threads to use for processing reads. (Default: 4) |
| -ChunksCacheSize<br/>--chunks-cache-size=VALUE<br/> | CHUNKS_CACHE_SIZE | ChunksCacheSize | The amount of unmanaged memory to use for caching chunks in bytes. (Default: 536871424) |
| -HashCollisionReadLimit<br/>--hash-collision-read-limit=VALUE<br/> | HASH_COLLISION_READ_LIMIT | HashCollisionReadLimit | The number of events to read per candidate in the case of a hash collision (Default: 100) |


## ???

| -WriteThrough<br/>--write-through=VALUE<br/> | WRITE_THROUGH | WriteThrough | Enables Write Through when writing to the file system, this bypasses filesystem caches. (Default: False) |
| -Unbuffered<br/>--unbuffered=VALUE<br/> | UNBUFFERED | Unbuffered | Enables Unbuffered/DirectIO when writing to the file system, this bypasses filesystem caches. (Default: False)   |
| -PrepareTimeoutMs<br/>--prepare-timeout-ms=VALUE<br/> | PREPARE_TIMEOUT_MS | PrepareTimeoutMs | Prepare timeout (in milliseconds). (Default: 2000) |
| -CommitTimeoutMs<br/>--commit-timeout-ms=VALUE<br/> | COMMIT_TIMEOUT_MS | CommitTimeoutMs | Commit timeout (in milliseconds). (Default: 2000) |
| -UnsafeDisableFlushToDisk<br/>--unsafe-disable-flush-to-disk=VALUE<br/> | UNSAFE_DISABLE_FLUSH_TO_DISK | UnsafeDisableFlushToDisk | Disable flushing to disk. (UNSAFE: on power off) (Default: False) |
| -BetterOrdering<br/>--better-ordering=VALUE<br/> | BETTER_ORDERING | BetterOrdering | Enable Queue affinity on reads during write process to try to get better ordering. (Default: False) |
