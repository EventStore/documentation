using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using EventStore.ClientAPI;
using EventStore.ClientAPI.Exceptions;
using EventStore.ClientAPI.Projections;
using EventStore.ClientAPI.SystemData;
using Newtonsoft.Json;
using ConsoleLogger = EventStore.ClientAPI.Common.Log.ConsoleLogger;


namespace DocsExample
{
    class Program
    {
        public static class Globals
        {
            public const String filePath = "../event.json";
            public const String streamName = "newstream";

            public static readonly UserCredentials AdminCredentials = new UserCredentials("admin", "changeit");

            public static readonly ProjectionsManager Projection = new ProjectionsManager(new ConsoleLogger(),
                new IPEndPoint(IPAddress.Parse("127.0.0.1"), 2113), TimeSpan.FromMilliseconds(5000));
        }

        private static IEventStoreConnection CreateConnection()
        {
            var conn = EventStoreConnection.Create(new Uri("tcp://admin:changeit@localhost:1113"));
            conn.ConnectAsync().Wait();
            return conn;
        }

        private static List<EventData> ProcessEvents(String filePath)
        {
            var events = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(filePath));
            var eventData = new List<EventData>();
            foreach (var @event in events)
            {
                var id = @event.eventId.ToString();
                var eventType = @event.eventType.ToString();
                eventData.Add(new EventData(Guid.Parse(id), eventType, true,
                    Encoding.UTF8.GetBytes(@event.data.ToString()), null));
            }

            return eventData;
        }

        static void Main(string[] args)
        {
            try
            {
                switch (args[0])
                {
                    case "step1":
                        Step1();
                        break;
                    case "step2":
                        Step2();
                        break;
                    case "step2subs":
                        Step2Subs();
                        break;
                    case "step3":
                        Step3();
                        break;
                    case "step3update":
                        Step3Update();
                        break;
                    case "step3options":
                        Step3ProjectionOptions();
                        break;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.GetBaseException().Message);
            }

            Console.WriteLine("Press enter to exit");
            Console.ReadLine();
        }

        static void Step1()
        {
            var conn = CreateConnection();
            var streamName = Globals.streamName;
            var step1EventData = ProcessEvents(Globals.filePath);
            var eventData = step1EventData.ToArray();

            conn.AppendToStreamAsync(streamName, ExpectedVersion.Any, eventData).Wait();
            Console.WriteLine($"Published {step1EventData.Count} events to '{Globals.streamName}'");
        }

        static void Step2()
        {
            var conn = CreateConnection();
            var streamName = Globals.streamName;

            var readEvents = conn.ReadStreamEventsForwardAsync(streamName, 0, 10, true).Result;
            foreach (var evt in readEvents.Events)
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));

            var readResult = conn.ReadEventAsync(streamName, 0, true).Result;
            Console.WriteLine(Encoding.UTF8.GetString(readResult.Event.Value.Event.Data));
        }

        static void Step2Subs()
        {
            //            Run this first
            var conn = CreateConnection();
            var streamName = Globals.streamName;
            var adminCredentials = Globals.AdminCredentials;

            PersistentSubscriptionSettings settings = PersistentSubscriptionSettings.Create()
                .DoNotResolveLinkTos()
                .StartFromCurrent();

            conn.CreatePersistentSubscriptionAsync(streamName, "examplegroup", settings, adminCredentials).Wait();

            conn.ConnectToPersistentSubscription(streamName, "examplegroup", (_, x) =>
            {
                var data = Encoding.ASCII.GetString(x.Event.Data);
                Console.WriteLine("Received: " + x.Event.EventStreamId + ":" + x.Event.EventNumber);
                Console.WriteLine(data);
            }, (sub, reason, ex) => { }, adminCredentials);

            Console.WriteLine("waiting for events. press enter to exit");
            Console.ReadLine();
        }

        static void Step3()
        {
            var conn = CreateConnection();
            var adminCredentials = Globals.AdminCredentials;
            var projection = Globals.Projection;

            foreach (string f in Directory.GetFiles("../", "shoppingCart-*"))
            {
                var streamName = Path.GetFileNameWithoutExtension(f);
                var step3EventData = ProcessEvents(f);
                var eventData = step3EventData.ToArray();
                conn.AppendToStreamAsync(streamName, ExpectedVersion.Any, eventData).Wait();
            }

            //            TODO: Parse
            string countItemsProjection = @"
                    fromAll().when({
                    $init: function(){
                        return {
                            count: 0
                        }
                    },
                    ItemAdded: function(s,e){
                        if(e.body.Description.indexOf('Xbox One S') >= 0){
                            s.count += 1;
                        }
                    }
        })
    ";
            projection.CreateContinuousAsync("xbox-one-s-counter", countItemsProjection, adminCredentials).Wait();

            var projectionState = projection.GetStateAsync("xbox-one-s-counter", Globals.AdminCredentials);
            Console.WriteLine(projectionState.Result);
        }

        static void Step3Update()
        {
            var conn = CreateConnection();
            var projection = Globals.Projection;
            var adminCredentials = Globals.AdminCredentials;

            string countItemsProjectionUpdate = @"
                    fromAll()
                        .when({
                            $init: function(){
                                return {
                                    count: 0
                                }
                            },
                        ItemAdded: function(s,e){
                            if(e.body.Description.indexOf('Xbox One S') >= 0){
                                s.count += 1;
                            }
                        }
                    }).outputState()";

            projection.UpdateQueryAsync("xbox-one-s-counter", countItemsProjectionUpdate, adminCredentials).Wait();
            projection.ResetAsync("xbox-one-s-counter", adminCredentials).Wait();

            var readEvents = conn.ReadStreamEventsForwardAsync("$projections-xbox-one-s-counter-result", 0, 10, true)
                .Result;
            foreach (var evt in readEvents.Events)
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));

            string optionsProjectionOptionsUpdate = @"
                    options({
                      resultStreamName: 'xboxes'
                                })
                                fromAll()
                                    .when({
                                    $init: function(){
                                        return {
                                            count: 0
                                        }
                                    },
                                    ItemAdded: function(s,e){
                                        if(e.body.Description.indexOf('Xbox One S') >= 0){
                                            s.count += 1;
                                        }
                                    }
                                }).outputState()";

            projection.UpdateQueryAsync("xbox-one-s-counter", optionsProjectionOptionsUpdate, adminCredentials).Wait();

            readEvents = conn.ReadStreamEventsForwardAsync("xboxes", 0, 10, true).Result;
            foreach (var evt in readEvents.Events)
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));
        }

        static void Step3ProjectionOptions()
        {
            //            var conn = CreateConnection();
            var projection = Globals.Projection;
            var adminCredentials = Globals.AdminCredentials;

            projection.EnableAsync("$by_category", adminCredentials).Wait();

            string itemCounterProjection = @"
                fromCategory('shoppingCart')
                    .foreachStream()
                    .when({
                        $init: function(){
                            return {
                                count: 0
                            }
                        },
                        ItemAdded: function(s,e){
                            s.count += 1;
                        }
                    })
            ";

            projection.CreateContinuousAsync("shopping-cart-item-counter", itemCounterProjection, true, adminCredentials).Wait();

            var projectionState = projection.GetPartitionStateAsync("shopping-cart-item-counter", "shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164", adminCredentials);
            Console.WriteLine(projectionState.Result);
        }
    }
}