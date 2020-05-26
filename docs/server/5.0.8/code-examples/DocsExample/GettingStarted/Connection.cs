using System;
using System.Threading.Tasks;
using EventStore.ClientAPI;

namespace DocsExample.GettingStarted
{
    public static class Connection
    {
        public static async Task<IEventStoreConnection> CreateConnection()
        {
            // <Connect>
            var conn = EventStoreConnection .Create(new Uri("tcp://admin:changeit@localhost:1113"));
            await conn.ConnectAsync();
            // </Connect>
            return conn;
        }
    }
}
