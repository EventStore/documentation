using EventStore.ClientAPI;
using System;
using System.Text;
using System.Threading.Tasks;

namespace DocsExample
{
    public class QuickStartPlainFormat
    {
        public static async Task PlainFormat()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            await conn.ConnectAsync();

            var data     = Encoding.UTF8.GetBytes("some data");
            var metadata = Encoding.UTF8.GetBytes("some metadata");
            var evt      = new EventData(Guid.NewGuid(), "testEvent", false, data, metadata);

            await conn.AppendToStreamAsync("test-stream", ExpectedVersion.Any, evt);

            var streamEvents  = await conn.ReadStreamEventsForwardAsync("test-stream", 0, 1, false);
            var returnedEvent = streamEvents.Events[0].Event;

            Console.WriteLine(
                "Read event with data: {0}, metadata: {1}",
                Encoding.UTF8.GetString(returnedEvent.Data),
                Encoding.UTF8.GetString(returnedEvent.Metadata)
            );
        }
    }
}
