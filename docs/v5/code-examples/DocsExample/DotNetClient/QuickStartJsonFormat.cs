using EventStore.ClientAPI;
using System;
using System.Text;

namespace DocsExample
{
    public class QuickStartJsonFormat
    {
        public static void Main()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            conn.ConnectAsync().Wait();

            var data = Encoding.UTF8.GetBytes("{\"a\":\"2\"}");
            var metadata = Encoding.UTF8.GetBytes("{}");
            var evt = new EventData(Guid.NewGuid(), "testEvent", true, data, metadata);

            conn.AppendToStreamAsync("test-stream", ExpectedVersion.Any, evt).Wait();

            var streamEvents = conn.ReadStreamEventsForwardAsync("test-stream", 0, 1, false).Result;
            var returnedEvent = streamEvents.Events[0].Event;

            Console.WriteLine("Read event with data: {0}, metadata: {1}",
                Encoding.UTF8.GetString(returnedEvent.Data),
                Encoding.UTF8.GetString(returnedEvent.Metadata));
        }
    }
}