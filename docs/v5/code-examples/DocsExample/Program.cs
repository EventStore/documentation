using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using DocsExample.GettingStarted;
// <Using>
using EventStore.ClientAPI;
using EventStore.ClientAPI.Projections;
using EventStore.ClientAPI.SystemData;
// </Using>
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
                    "step3"        => Step3_UserProjections.Step3(Globals.AdminCredentials),
                    "step3update"  => Step3_UserProjections.Step3Update(Globals.AdminCredentials),
                    "step3options" => Step3_UserProjections.Step3ProjectionOptions(Globals.AdminCredentials),
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
            var conn           = await Connection.CreateConnection();
            const string streamName = Globals.StreamName;
            var step1EventData = Step3_UserProjections.ReadEvents(Globals.FilePath);
            var eventData      = step1EventData.ToArray();

            await conn.AppendToStreamAsync(streamName, ExpectedVersion.Any, eventData);
            Console.WriteLine($"Published {step1EventData.Count} events to '{Globals.StreamName}'");
        }

        static async Task Step2()
        {
            var conn       = await Connection.CreateConnection();
            var streamName = Globals.StreamName;

            // <ReadEvents>
            var readEvents = await conn.ReadStreamEventsForwardAsync(streamName, 0, 10, true);

            foreach (var evt in readEvents.Events)
            {
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));
            }
            // </ReadEvents>

            // <ReadOneEvent>
            var readResult = await conn.ReadEventAsync(streamName, 0, true);
            Console.WriteLine(Encoding.UTF8.GetString(readResult.Event.Value.Event.Data));
            // </ReadOneEvent>
        }

        static async Task Step2Subs()
        {
            var conn             = await Connection.CreateConnection();
            var streamName       = Globals.StreamName;
            var adminCredentials = Globals.AdminCredentials;

            // <PersistentSubscription>
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

    }
}
