Major:
- Upgrade to .NET Core, both server and client (not moved yet)
- Kestrel
- gRPC via native client
- Clone node isn't supported, replaced by read-only replica

Life improvements:
- Some options removed (rarely or never used)
- Internal and external HTTP endpoints are combined
- Gossip seed allows using DNS (client and server)
- Everything is TLS/SSL, secure by default
- Development flag for using self-signed
- TLS be default on TCP
- gRPC requires HTTPS
- gRPC connections currently don't show in the UI
- New endpoint to restart the projection system without rebooting the node
- Read-only replica (not participate in elections)
- Master-slave terminology replace by leader-follower
- Resign the master node, so one can perform things like scavenging
- Follow up: set node priority (endpoint) to facilitate the master not to be re-elected. Best effort, not guaranteed.
- Server-side filtering
    - TCP client - event type, stream name, regex and prefix. Read forward, backwards and subscribe to all. Paging can return nothing because it scans by 10K on the server and can return nothing. Subscription - delegate for checkpoint flush.
    - gRPC - only subscribe to all
- (also in v5.0.4) stats not being written to the database. Writing to the db is opt-in in V6 and opt out for V5
- .NET API has a pre-defined filter to ignore system events
- More stats in the stats API (need to check the response) - CPU load avg (only Linux and macOS)
- When does the HTTP server start?
- OAuth (JWT) support for the commercial version (Joao)

Will be in the release:
- Gossip gRPC endpoint

Questions:
- James N, Zach - deployment guidelines, script
- What about the Helm chart?



