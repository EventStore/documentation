using System;
using System.Threading.Tasks;
using EventStore.ClientAPI;

namespace DocsExample {
    public class CatchUp {
        IEventStoreConnection connection;

        public CatchUp(IEventStoreConnection conn) => connection = conn;

        public async Task Subscribe() {
            #region SubscribeToStream
            var settings = new CatchUpSubscriptionSettings(
                maxLiveQueueSize: 10000,
                readBatchSize: 500,
                verboseLogging: false,
                resolveLinkTos: true,
                subscriptionName: "mySubscription"
            );

            connection.SubscribeToStreamFrom(
                stream: "myStream",
                lastCheckpoint: StreamPosition.Start,
                settings: settings,
                eventAppeared: (sub, evt)
                    => Console.Out.WriteLineAsync("Event appeared"),
                liveProcessingStarted: sub
                    => Console.WriteLine("Processing live"),
                subscriptionDropped: (sub, reason, exception)
                    => Console.WriteLine($"Subscription dropped: {reason}")
            );
            #endregion SubscribeToStream
            
            #region SubscribeToAll
            connection.SubscribeToAllFrom(
                lastCheckpoint: Position.Start, 
                settings: CatchUpSubscriptionSettings.Default, 
                eventAppeared: (sub, evt)
                    => Console.Out.WriteLineAsync("Event appeared"),
                liveProcessingStarted: sub
                    => Console.WriteLine("Processing live"),
                subscriptionDropped: (sub, reason, exception)
                    => Console.WriteLine($"Subscription dropped: {reason}")
            );
            #endregion SubscribeToAll
        }
    }
}
