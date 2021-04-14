using System;
using System.Text;
using System.Threading.Tasks;
using EventStore.ClientAPI;
using System.Net;

namespace DocsExample.DotNetClient
{
    public class CompatibilityMode
    {
        public static async Task AutoCompatibilityWithClusterDns()
        {
            var dnsAddress = "my-address";
            #region AutoCompatibilityWithClusterDns
            var connectionSettings = ConnectionSettings.Create()
                .SetCompatibilityMode("auto");
            var clusterSettings = ClusterSettings.Create()
                .DiscoverClusterViaDns()
                .SetClusterDns(dnsAddress)
                .SetClusterGossipPort(2113);

            var conn = EventStoreConnection.Create(connectionSettings, clusterSettings);
            await conn.ConnectAsync();
            #endregion AutoCompatibilityWithClusterDns
        }

        public static async Task AutoCompatibilityWithGossipSeeds()
        {
            var node1 = IPAddress.Loopback;
            var node2 = IPAddress.Loopback;
            var node3 = IPAddress.Loopback;

            #region AutoCompatibilityWithGossipSeeds
            var connectionSettings = ConnectionSettings.Create()
                .SetGossipSeedEndPoints(
                    new IPEndPoint(node1, 2113),
                    new IPEndPoint(node2, 2113),
                    new IPEndPoint(node3, 2113))
                .SetCompatibilityMode("auto");

            var conn = EventStoreConnection.Create(connectionSettings);
            await conn.ConnectAsync();
            #endregion AutoCompatibilityWithGossipSeeds
        }
    }
}
