using System.Threading.Tasks;
using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;

namespace DocsExample
{
    public class ConnectClusterGossipDns
    {
        public static async Task Method()
        {
            var settings = ConnectionSettings.Create().KeepReconnecting();
            settings.SetDefaultUserCredentials(new UserCredentials("admin", "changeit"));

            var cluster = ClusterSettings.Create().DiscoverClusterViaDns();
            cluster.SetClusterDns("eventstore.local").SetClusterGossipPort(2112);

            var conn = EventStoreConnection.Create(settings.Build(), cluster.Build());
            await conn.ConnectAsync();
        }
    }
}
