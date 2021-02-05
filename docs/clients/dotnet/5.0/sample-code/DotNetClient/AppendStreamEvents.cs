using EventStore.ClientAPI;
using Newtonsoft.Json;
using System;
using System.Text;
using System.Threading.Tasks;

namespace DocsExample
{
    public class AppendStreamEvents
    {
        #region AppendOneEvent
        public static async Task AppendOneEvent()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            await conn.ConnectAsync();

            var sampleObject = new { a = 2 };
            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
            var metadata = Encoding.UTF8.GetBytes("{}");
            var evt = new EventData(Guid.NewGuid(), "event-type", true, data, metadata);

            await conn.AppendToStreamAsync("newstream", ExpectedVersion.Any, evt);
        }
        #endregion AppendOneEvent

        #region CreateSampleData
        static EventData CreateSample(int i)
        {
            var sampleObject = new { a = i };
            var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(sampleObject));
            var metadata = Encoding.UTF8.GetBytes("{}");
            var eventPayload = new EventData(Guid.NewGuid(), "event-type", true, data, metadata);
            return eventPayload;
        }
        #endregion CreateSampleData

        #region AppendMultipleEvents
        public static async Task WriteEvents()
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
        #endregion AppendMultipleEvents

        #region WriteTransaction
        public static async Task WriteTransaction()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            await conn.ConnectAsync();

            using var transaction = await conn.StartTransactionAsync("newstream", ExpectedVersion.Any);

            await transaction.WriteAsync(CreateSample(1));
            await transaction.WriteAsync(CreateSample(2));
            await conn.AppendToStreamAsync("newstream", ExpectedVersion.Any, CreateSample(3));
            await transaction.WriteAsync(CreateSample(4));
            await transaction.WriteAsync(CreateSample(5));
            await transaction.CommitAsync();
        }
        #endregion WriteTransaction
    }
}
