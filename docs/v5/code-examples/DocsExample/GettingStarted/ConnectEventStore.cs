using EventStore.ClientAPI;
using System;
using System.Text;
using System.Threading.Tasks;

namespace DocsExample
{
    public class ConnectEventStore
    {
        readonly IEventStoreConnection conn = null;

        public async Task Method()
        {
            // <AppendEvent>
            const string streamName = "newstream";
            const string eventType  = "event-type";
            const string data       = "{ \"a\":\"2\"}";
            const string metadata   = "{}";

            var eventPayload = new EventData(
                eventId: Guid.NewGuid(),
                type: eventType,
                isJson: true,
                data: Encoding.UTF8.GetBytes(data),
                metadata: Encoding.UTF8.GetBytes(metadata)
            );
            var result = await conn.AppendToStreamAsync(streamName, ExpectedVersion.Any, eventPayload);
            // </AppendEvent>
        }
    }
}
