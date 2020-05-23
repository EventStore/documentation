using EventStore.ClientAPI;
using Newtonsoft.Json;
using System;
using System.Text;
using System.Threading.Tasks;

namespace DocsExample
{
    public class WritingSingleEvent
    {
        public static async Task WriteOneEvent()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            await conn.ConnectAsync();

            var sampleObject = new { a = 2 };
            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
            var metadata = Encoding.UTF8.GetBytes("{}");
            var evt = new EventData(Guid.NewGuid(), "event-type", true, data, metadata);
            await conn.AppendToStreamAsync("newstream", ExpectedVersion.Any, evt);
        }
    }
}