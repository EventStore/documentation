using System;
using System.Threading.Tasks;
using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;

namespace DocsExample {
    public class ConnectClusterGossipDns {
        public static async Task Method() {
            #region connect
            var settings = ConnectionSettings.Create()
                .KeepReconnecting()
                .SetClusterDns("eventstore.local")
                .SetClusterGossipPort(2113)
                .SetGossipTimeout(TimeSpan.FromMilliseconds(500))
                .SetDefaultUserCredentials(new UserCredentials("admin", "changeit"));

            var connection = EventStoreConnection.Create(settings);
            await connection.ConnectAsync();
            #endregion connect
        }
    }
}
