using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
using System;
using System.Text;
using System.Threading.Tasks;

namespace DocsExample
{
    public class CreatePersistentSubscription
    {
        readonly IEventStoreConnection conn = null;

        public async Task Method()
        {
            // <CreatePersistentSubscription>
            var userCredentials = new UserCredentials("admin", "changeit");

            var settings = PersistentSubscriptionSettings
                .Create()
                .DoNotResolveLinkTos()
                .StartFromCurrent();

            conn.CreatePersistentSubscriptionAsync("newstream", "gr1", settings, userCredentials).Wait();

            var subscription = await conn.ConnectToPersistentSubscriptionAsync(
                "newstream",
                "gr1",
                (_, evt) => Console.WriteLine($"Received: {Encoding.UTF8.GetString(evt.Event.Data)}")
            );
            // </CreatePersistentSubscription>
        }
    }
}
