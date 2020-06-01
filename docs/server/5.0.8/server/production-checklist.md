# Before production check list

- Change default passwords for admin and ops users, [more](admin-ui.md#users)
- Consider SSL and/or reverse proxy, [more about ssl](setting-up-ssl.md) [more about proxy](setting-up-varnish-in-linux.md)
- Manage default ACL and consider overriding ACL’s for sensitive streams [more](users-and-access-control-lists.md)
- Manage users (remove unused users & create separate functional application user) [more](users-and-access-control-lists.md)
- Ensure that EVENTSTORE_DISABLE_HTTP_CACHING is set to false [more](caching.md)
- Ensure if eventstore writes data, indexes and logs on a separate drive to avoid competition for IO between the data, index and log files. [more](indexing.md)
- Due to the replication process, all nodes tend to merge index files at about the same time. Ensure MaxAutoMergeIndexLevel is set (read docs for more info) and each node has timely scheduled manual merging with an offset between the nodes, in order to avoid all nodes to rebuild large indexes at the same time [more](indexing.md)
- Ensure code has licence file for EventStore in order to satisfy 3-clause BSD license
- Ensure there is scheduled timely triggered Scavenging process. [more](scavenging.md)
  - Scavenging increases the number of reads/writes made to disk, and it is not recommended when your system is under heavy load.
  - Each node in a cluster has its own independent database. As such, when you run a scavenge, you need to issue a scavenge request to each node. 
- Configure heartbeat values for cloud solutions [more](ports-and-networking.md#heartbeat-timeouts)
- If working in cluster mode ensure that client's are configured for failover and will reconnect to healthy node [more](cluster-without-manager-nodes.md#native-tcp-clients)
- Ensure that client app has proper logger attached
