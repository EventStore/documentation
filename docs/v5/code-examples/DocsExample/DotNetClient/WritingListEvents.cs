using EventStore.ClientAPI;
using Newtonsoft.Json;
using System;
using System.Text;
using System.Threading.Tasks;

namespace DocsExample
{
    public class WritingListEvents
    {
        private static EventData CreateSample(int i)
        {
            var sampleObject = new {a = i};
            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
            var metadata = Encoding.UTF8.GetBytes("{}");
            var eventPayload = new EventData(Guid.NewGuid(), "event-type", true, data, metadata);
            return eventPayload;
        }

        public static async Task Main()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            await conn.ConnectAsync();

            await conn.AppendToStreamAsync(
                "newstream",
                ExpectedVersion.Any,
                CreateSample(1),
                CreateSample(2),
                CreateSample(3)
            );
        }
    }
}
