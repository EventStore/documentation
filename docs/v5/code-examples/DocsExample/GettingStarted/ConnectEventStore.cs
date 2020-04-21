using EventStore.ClientAPI;
using System;
using System.Text;

namespace DocsExample
{
    public class ConnectEventStore
    {
        private static readonly IEventStoreConnection conn = null;

        public static void Method(){
            var streamName = "newstream";
            var eventType = "event-type";
            var data = "{ \"a\":\"2\"}";
            var metadata = "{}";
            var eventPayload = new EventData(Guid.NewGuid(), eventType, true, Encoding.UTF8.GetBytes(data), Encoding.UTF8.GetBytes(metadata));
            conn.AppendToStreamAsync(streamName, ExpectedVersion.Any, eventPayload).Wait();
        }
    }
}