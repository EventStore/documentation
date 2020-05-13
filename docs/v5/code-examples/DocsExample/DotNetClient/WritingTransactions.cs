using EventStore.ClientAPI;
using Newtonsoft.Json;
using System;
using System.Text;

namespace DocsExample
{
    public class WritingTransactions
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

            using (var transaction = conn.StartTransactionAsync("newstream", ExpectedVersion.Any).Result)
            {
                transaction.WriteAsync(CreateSample(1)).Wait();
                transaction.WriteAsync(CreateSample(2)).Wait();
                conn.AppendToStreamAsync("newstream", ExpectedVersion.Any, CreateSample(3)).Wait();
                transaction.WriteAsync(CreateSample(4)).Wait();
                transaction.WriteAsync(CreateSample(5)).Wait();
                transaction.CommitAsync().Wait();
            }
        }
    }
}