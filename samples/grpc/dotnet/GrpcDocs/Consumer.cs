using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using EventStore.Client;

namespace GrpcDocs
{
    public class Consumer
    {
        protected async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            #region createClient
            var settings = EventStoreClientSettings
                .Create("{connectionString}");
            var client = new EventStoreClient(settings);
            #endregion createClient

            #region readStream
            var result = client.ReadStreamAsync(
                Direction.Forwards,
                "some-stream",
                StreamPosition.Start,
                cancellationToken: cancellationToken);

            var events = await result.ToListAsync(cancellationToken);
            #endregion readStream
        }
    }
}