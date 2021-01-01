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

            ReadStreamOverridingUserCredentials(client, cancellationToken);
            ReadAllOverridingUserCredentials(client, cancellationToken);
        }

        protected void ReadStreamOverridingUserCredentials(EventStoreClient client, CancellationToken cancellationToken)
        {
            #region overriding-user-credentials
            var result = client.ReadStreamAsync(
                Direction.Forwards,
                "some-stream",
                StreamPosition.Start,
                userCredentials: new UserCredentials("admin", "changeit"),
                cancellationToken: cancellationToken);
            #endregion overriding-user-credentials
        }

        protected void ReadAllOverridingUserCredentials(EventStoreClient client, CancellationToken cancellationToken)
        {
            #region read-all-overriding-user-credentials
            var result = client.ReadAllAsync(
                Direction.Forwards,
                Position.Start,
                userCredentials: new UserCredentials("admin", "changeit"),
                cancellationToken: cancellationToken);
            #endregion read-all-overriding-user-credentials
        }
        

        protected void ReadAllResolvingLinkTos(EventStoreClient client, CancellationToken cancellationToken)
        {
            #region read-from-all-stream-resolving-link-Tos
            var result = client.ReadAllAsync(
                Direction.Forwards,
                Position.Start,
                resolveLinkTos: true,
                cancellationToken: cancellationToken);
            #endregion read-from-all-stream-resolving-link-Tos
        }
    }
}