using EventStore.ClientAPI;
using Newtonsoft.Json;
using System;
using System.Text;

namespace DocsExample
{
    public class WritingListEvents
    {

        private static EventData CreateSample(int i)
        {
            var sampleObject = new { a = i };
            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
            var metadata = Encoding.UTF8.GetBytes("{}");
            var eventPayload = new EventData(Guid.NewGuid(), "event-type", true, data, metadata);
            return eventPayload;
        }

        public static void Main()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            conn.ConnectAsync().Wait();

            conn.AppendToStreamAsync("newstream", ExpectedVersion.Any, new[] { CreateSample(1), CreateSample(2), CreateSample(3) }).Wait();
        }
    }
}