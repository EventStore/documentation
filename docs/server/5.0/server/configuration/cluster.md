# Cluster settings

| Command line parameter | Environment variable prefixed with `EVENTSTORE_` | Config file YAML | Description |
|:-------------|:----------|:-----------|:----------|
| -ClusterSize<br/>--cluster-size=VALUE<br/> | CLUSTER_SIZE | ClusterSize | The number of nodes in the cluster. (Default: 1) |
| -NodePriority<br/>--node-priority=VALUE<br/> | NODE_PRIORITY | NodePriority | The node priority used during master election (Default: 0) |
| -CommitCount<br/>--commit-count=VALUE<br/> | COMMIT_COUNT | CommitCount | The number of nodes which must acknowledge commits before acknowledging to a client. (Default: -1) |
| -PrepareCount<br/>--prepare-count=VALUE<br/> | PREPARE_COUNT | PrepareCount | The number of nodes which must acknowledge prepares. (Default: -1) |
| -DiscoverViaDns<br/>--discover-via-dns=VALUE<br/> | DISCOVER_VIA_DNS | DiscoverViaDns | Whether to use DNS lookup to discover other cluster nodes. (Default: True) |
| -ClusterDns<br/>--cluster-dns=VALUE<br/> | CLUSTER_DNS | ClusterDns | DNS name from which other nodes can be discovered. (Default: fake.dns) |
| -ClusterGossipPort<br/>--cluster-gossip-port=VALUE<br/> | CLUSTER_GOSSIP_PORT | ClusterGossipPort | The port on which cluster nodes' managers are running. (Default: 30777) |
| -GossipSeed<br/>--gossip-seed=VALUE<br/> | GOSSIP_SEED | GossipSeed | Endpoints for other cluster nodes from which to seed gossip (Default: n/a) |
| -GossipIntervalMs<br/>--gossip-interval-ms=VALUE<br/> | GOSSIP_INTERVAL_MS | GossipIntervalMs | The interval in ms that nodes should try to gossip with each other (Default: 1000) |
| -GossipAllowedDifferenceMs<br/>--gossip-allowed-difference-ms=VALUE<br/> | GOSSIP_ALLOWED_DIFFERENCE_MS | GossipAllowedDifferenceMs | The amount of drift, in ms, between clocks on nodes allowed before gossip is rejected. (Default: 60000) |
| -GossipTimeoutMs<br/>--gossip-timeout-ms=VALUE<br/> | GOSSIP_TIMEOUT_MS | GossipTimeoutMs | The timeout in ms of gossip to another node. (Default: 500) |
| -InitializationThreads<br/>--initialization-threads=VALUE | INITIALIZATION_THREADS | InitializationThreads | Number of threads used to load chunk and index files. (Default: 1) |
| -reduceFileCachePressure<br/>--reduce-file-cache-pressure=VALUE| REDUCE_FILE_CACHE_PRESSURE | reduceFileCachePressure   | Disables `FileOptions.RandomAccess` cache flag when opening chunk files. Useful if the Windows File Cache is consuming memory. (Default: False) |
| -DisableFirstLevelHttpAuthorization<br/>--disable-first-level-http-authorization=VALUE | DISABLE_FIRST_LEVEL_HTTP_AUTHORIZATION | DisableFirstLevelHttpAuthorization | Disables authorization layer on endpoints. (Default: True) |
| -SkipIndexVerify<br/>--skip-index-verify=VALUE | SKIP_INDEX_VERIFY | SkipIndexVerify | Skips reading and verification of PTables during start-up. (Default: False) |
| -MaxAutoMergeIndexLevel<br/>--max-auto-merge-index-level=VALUE  | MAX_AUTO_MERGE_INDEX_LEVEL | MaxAutoMergeIndexLevel | Maximum level of index file to merge automatically before manual merge. (Default: 1000) |
| -OptimizeIndexMerge<br/>--optimize-index-merge=VALUE | OPTIMIZE_INDEX_MERGE | OptimizeIndexMerge | Bypasses the checking of file hashes of indexes during startup and after index merges. (Default: False) |
| -WriteStatsToDb<br/>--write-stats-to-db=VALUE | WRITE_STATS_TO_DB | WriteStatsToDb | Write stats data to the Event Store database. (Default: False) |
