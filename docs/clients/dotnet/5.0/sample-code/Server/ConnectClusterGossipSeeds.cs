using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
using System;
using System.Net;
using System.Threading.Tasks;

namespace DocsExample {
    public class ConnectClusterGossipSeeds {
        public static async Task Method() {
            #region connect
            var settings = ConnectionSettings.Create()
                .KeepReconnecting()
                .SetGossipTimeout(TimeSpan.FromMilliseconds(500))
                .SetGossipSeedEndPoints(
                    new IPEndPoint(IPAddress.Parse("192.168.0.1"), 2113),
                    new IPEndPoint(IPAddress.Parse("192.168.0.2"), 2113),
                    new IPEndPoint(IPAddress.Parse("192.168.0.3"), 2113)
                )
                .SetDefaultUserCredentials(new UserCredentials("admin", "changeit"));

            var connection = EventStoreConnection.Create(settings);
            await connection.ConnectAsync();
            #endregion connect
        }

        public static async Task ConnectionString() {
            #region connectionString
            var connectionString = "GossipSeeds=192.168.0.2:2113,192.168.0.3:2113;";
            var connection = EventStoreConnection.Create(connectionString);
            await connection.ConnectAsync();
            #endregion connectionString
        }
    }
}
