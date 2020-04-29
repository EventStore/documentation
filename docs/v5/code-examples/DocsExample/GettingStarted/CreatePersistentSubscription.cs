using EventStore.ClientAPI;
using EventStore.ClientAPI.SystemData;
using System;
using System.Text;

namespace DocsExample
{
    public class CreatePersistentSubscription
    {
        private static readonly IEventStoreConnection conn = null;

        public static void Method(){
            var userCredentials = new UserCredentials("admin", "changeit");
            var settings = PersistentSubscriptionSettings.Create()
                .DoNotResolveLinkTos().StartFromCurrent();
            conn.CreatePersistentSubscriptionAsync("newstream", "gr1", settings, userCredentials).Wait();
            var subscription = conn.ConnectToPersistentSubscriptionAsync(
            "newstream", "gr1", (_, evt) =>
            {
                Console.WriteLine("Received: " + Encoding.UTF8.GetString(evt.Event.Data));
            }).Result;
        }
    }
}