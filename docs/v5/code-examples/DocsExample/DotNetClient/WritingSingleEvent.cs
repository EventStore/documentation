using EventStore.ClientAPI;
using Newtonsoft.Json;
using System;
using System.Text;

namespace DocsExample
{
    public class WritingSingleEvent
    {
        public static void Main()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            conn.ConnectAsync().Wait();

            var sampleObject = new { a = 2 };
            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
            var metadata = Encoding.UTF8.GetBytes("{}");
            var evt = new EventData(Guid.NewGuid(), "event-type", true, data, metadata);
            conn.AppendToStreamAsync("newstream", ExpectedVersion.Any, evt).Wait();
        }
    }
}