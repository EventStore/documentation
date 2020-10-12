# Exposing endpoints

If you need to disable some of the HTTP endpoints on the [external](./external.md) HTTP interface, you can change some of the settings below. It is possible to disable the Admin UI, stats and gossip port to be exposed externally.

| -AdminOnExt<br/>--admin-on-ext=VALUE<br/> | ADMIN_ON_EXT | AdminOnExt | Whether or not to run the admin ui on the external HTTP endpoint (Default: True) |

| -StatsOnExt<br/>--stats-on-ext=VALUE<br/> | STATS_ON_EXT | StatsOnExt | Whether or not to accept statistics requests on the external HTTP endpoint, needed if you use admin ui (Default: True) |

You can also disable the gossip protocol in the external HTTP interface. If you do that, ensure that the [internal interface](./internal.md) is properly configured. Also, if you use [gossip with DNS](../clustering/using-dns.md), ensure that the [gossip port](../clustering/gossip.md#gossip-port) is set to the [internal HTTP port](./internal.md#ports).

| -GossipOnExt<br/>--gossip-on-ext=VALUE<br/> | GOSSIP_ON_EXT | GossipOnExt | Whether or not to accept gossip requests on the external HTTP endpoint (Default: True) |

