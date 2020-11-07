using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using EventStore.Client;
using GrpcDocs.Contracts;

namespace GrpcDocs {
    public class Producer {
        protected async Task ExecuteAsync(CancellationToken cancellationToken) {
            #region createClient
            var settings = EventStoreClientSettings
                .Create("{connectionString}");
            var client   = new EventStoreClient(settings);
            #endregion createClient

            #region createEvent
            var evt = new TestEvent {
                EntityId = Guid.NewGuid().ToString("N"),
                ImportantData = "I wrote my first event!"
            };

            var eventData = new EventData(
                Uuid.NewUuid(),
                "TestEvent",
                JsonSerializer.SerializeToUtf8Bytes(evt)
            );
            #endregion createEvent

            #region writingEvent
            await client.AppendToStreamAsync(
                "testStream",
                StreamState.Any,
                new[] {eventData},
                cancellationToken: cancellationToken
            );
            #endregion writingEvent
        }
    }
}
