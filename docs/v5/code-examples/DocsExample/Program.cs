using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using EventStore.ClientAPI;
using EventStore.ClientAPI.Projections;
using EventStore.ClientAPI.SystemData;
using Newtonsoft.Json;
using ConsoleLogger = EventStore.ClientAPI.Common.Log.ConsoleLogger;

namespace DocsExample
{
    class Program
    {
        static class Globals
        {
            public const string FilePath   = "./Seed/event.json";
            public const string StreamName = "newstream";

            public static readonly UserCredentials AdminCredentials = new UserCredentials("admin", "changeit");

            public static readonly ProjectionsManager Projection = new ProjectionsManager(
                log: new ConsoleLogger(),
                httpEndPoint: new IPEndPoint(IPAddress.Parse("127.0.0.1"), 2113),
                operationTimeout: TimeSpan.FromMilliseconds(5000)
            );
        }

        static async Task<IEventStoreConnection> CreateConnection()
        {
            var conn = EventStoreConnection
                .Create(new Uri("tcp://admin:changeit@localhost:1113"));
            await conn.ConnectAsync();
            return conn;
        }

        static List<EventData> ProcessEvents(string filePath)
        {
            var events    = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(filePath));
            var eventData = new List<EventData>();

            foreach (var @event in events)
            {
                var id        = @event.eventId.ToString();
                var eventType = @event.eventType.ToString();

                eventData.Add(
                    new EventData(
                        Guid.Parse(id),
                        eventType,
                        true,
                        Encoding.UTF8.GetBytes(@event.data.ToString()),
                        null
                    )
                );
            }

            return eventData;
        }

        static async Task Main(string[] args)
        {
            try
            {
                var task = args[0] switch
                {
                    "step1"        => Step1(),
                    "step2"        => Step2(),
                    "step2subs"    => Step2Subs(),
                    "step3"        => Step3(),
                    "step3update"  => Step3Update(),
                    "step3options" => Step3ProjectionOptions(),
                    _              => Console.Out.WriteLineAsync("Unknown option")
                };
                await task;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.GetBaseException().Message);
            }

            Console.WriteLine("Press enter to exit");
            Console.ReadLine();
        }

        static async Task Step1()
        {
            var conn           = await CreateConnection();
            var streamName     = Globals.StreamName;
            var step1EventData = ProcessEvents(Globals.FilePath);
            var eventData      = step1EventData.ToArray();

            await conn.AppendToStreamAsync(streamName, ExpectedVersion.Any, eventData);
            Console.WriteLine($"Published {step1EventData.Count} events to '{Globals.StreamName}'");
        }

        static async Task Step2()
        {
            var conn       = await CreateConnection();
            var streamName = Globals.StreamName;

            var readEvents = await conn.ReadStreamEventsForwardAsync(streamName, 0, 10, true);

            foreach (var evt in readEvents.Events)
            {
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));
            }

            var readResult = await conn.ReadEventAsync(streamName, 0, true);
            Console.WriteLine(Encoding.UTF8.GetString(readResult.Event.Value.Event.Data));
        }

        static async Task Step2Subs()
        {
            var conn             = await CreateConnection();
            var streamName       = Globals.StreamName;
            var adminCredentials = Globals.AdminCredentials;

            var settings = PersistentSubscriptionSettings
                .Create()
                .DoNotResolveLinkTos()
                .StartFromCurrent();

            await conn.CreatePersistentSubscriptionAsync(streamName, "examplegroup", settings, adminCredentials);

            await conn.ConnectToPersistentSubscriptionAsync(
                streamName,
                "examplegroup",
                (_, x) =>
                {
                    var data = Encoding.ASCII.GetString(x.Event.Data);
                    Console.WriteLine($"Received: {x.Event.EventStreamId}:{x.Event.EventNumber}");
                    Console.WriteLine(data);
                },
                (sub, reason, ex) => { },
                adminCredentials
            );

            Console.WriteLine("waiting for events. press enter to exit");
            Console.ReadLine();
        }

        static async Task Step3()
        {
            var conn             = await CreateConnection();
            var adminCredentials = Globals.AdminCredentials;
            var projection       = Globals.Projection;

            foreach (var f in Directory.GetFiles("../", "shoppingCart-*"))
            {
                var streamName     = Path.GetFileNameWithoutExtension(f);
                var step3EventData = ProcessEvents(f);
                var eventData      = step3EventData.ToArray();
                await conn.AppendToStreamAsync(streamName, ExpectedVersion.Any, eventData);
            }

            //            TODO: Parse
            const string countItemsProjection = @"
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
                })";
            await projection.CreateContinuousAsync("xbox-one-s-counter", countItemsProjection, adminCredentials);

            var projectionState = await projection.GetStateAsync("xbox-one-s-counter", Globals.AdminCredentials);
            Console.WriteLine(projectionState);
        }

        static async Task Step3Update()
        {
            var conn             = await CreateConnection();
            var projection       = Globals.Projection;
            var adminCredentials = Globals.AdminCredentials;

            const string countItemsProjectionUpdate = @"
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

            await projection.UpdateQueryAsync("xbox-one-s-counter", countItemsProjectionUpdate, adminCredentials);
            await projection.ResetAsync("xbox-one-s-counter", adminCredentials);

            var readEvents = await conn.ReadStreamEventsForwardAsync("$projections-xbox-one-s-counter-result", 0, 10, true);

            foreach (var evt in readEvents.Events)
            {
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));
            }

            const string optionsProjectionOptionsUpdate = @"
                options({ resultStreamName: 'xboxes' })
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

            await projection.UpdateQueryAsync("xbox-one-s-counter", optionsProjectionOptionsUpdate, adminCredentials);

            readEvents = await conn.ReadStreamEventsForwardAsync("xboxes", 0, 10, true);

            foreach (var evt in readEvents.Events)
            {
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));
            }
        }

        static async Task Step3ProjectionOptions()
        {
            var projection       = Globals.Projection;
            var adminCredentials = Globals.AdminCredentials;

            await projection.EnableAsync("$by_category", adminCredentials);

            const string itemCounterProjection = @"
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
                    })";

            await projection.CreateContinuousAsync("shopping-cart-item-counter", itemCounterProjection, true, adminCredentials);

            var projectionState = await projection.GetPartitionStateAsync(
                "shopping-cart-item-counter",
                "shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164",
                adminCredentials
            );
            Console.WriteLine(projectionState);
        }
    }
}
