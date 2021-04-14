using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
using System;
using System.Text;
using System.Threading.Tasks;

namespace DocsExample {
    public class PersistentSubscriptions {
        readonly IEventStoreConnection conn = null;

        public async Task Crate() {
            #region CreatePersistentSubscription

            var userCredentials = new UserCredentials("admin", "changeit");

            var settings = PersistentSubscriptionSettings
                .Create()
                .DoNotResolveLinkTos()
                .StartFromCurrent();

            await conn.CreatePersistentSubscriptionAsync(
                "myStream",
                "grour1",
                settings,
                userCredentials
            );

            var subscription = await conn.ConnectToPersistentSubscriptionAsync(
                "myStream",
                "group1",
                (_, evt) => Console.WriteLine($"Received: {Encoding.UTF8.GetString(evt.Event.Data)}")
            );

            #endregion CreatePersistentSubscription
        }
    }
}
