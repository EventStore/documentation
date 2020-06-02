using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
using System;
using System.Net;
using System.Threading.Tasks;

namespace DocsExample
{
    public class ConnectClusterGossipSeeds
    {
        public static async Task Method()
        {
            var settings = ConnectionSettings.Create().KeepReconnecting();
            settings.SetDefaultUserCredentials(new UserCredentials("admin", "changeit"));

            var conn = EventStoreConnection.Create(
                settings,
                ClusterSettings.Create()
                    .DiscoverClusterViaGossipSeeds()
                    .SetGossipTimeout(TimeSpan.FromMilliseconds(500))
                    .SetGossipSeedEndPoints(
                        new IPEndPoint(IPAddress.Parse("192.168.0.1"), 2112),
                        new IPEndPoint(IPAddress.Parse("192.168.0.2"), 2112),
                        new IPEndPoint(IPAddress.Parse("192.168.0.3"), 2112)
                    )
            );
            await conn.ConnectAsync();
        }
    }
}
