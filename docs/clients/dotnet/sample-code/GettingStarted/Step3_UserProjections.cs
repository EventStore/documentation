using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using EventStore.ClientAPI;
using EventStore.ClientAPI.Common.Log;
using EventStore.ClientAPI.Projections;
using EventStore.ClientAPI.SystemData;
using Newtonsoft.Json;

namespace DocsExample.GettingStarted
{
    public class Step3_UserProjections
    {
        #region ReadEventsFunction
        public static List<EventData> ReadEvents(string filePath)
        {
            var events    = JsonConvert.DeserializeObject<dynamic>(File.ReadAllText(filePath));
            var eventData = new List<EventData>();

            foreach (var @event in events)
            {
                var id        = @event.eventId.ToString();
                var eventType = @event.eventType.ToString();

                eventData.Add(new EventData(Guid.Parse(id), eventType, true, Encoding.UTF8.GetBytes(@event.data.ToString()), null));
            }

            return eventData;
        }
        #endregion ReadEventsFunction

        static ProjectionsManager GetProjectionsManager()
        {
            #region ProjectionsManager
            var projectionsManager = new ProjectionsManager(
                log: new ConsoleLogger(),
                httpEndPoint: new IPEndPoint(IPAddress.Parse("127.0.0.1"), 2113),
                operationTimeout: TimeSpan.FromMilliseconds(5000)
            );
            #endregion ProjectionsManager
            return projectionsManager;
        }

        public static async Task Step3(UserCredentials adminCredentials)
        {
            var conn = await Connection.CreateConnection();

            #region SeedEvents
            foreach (var f in Directory.GetFiles("../", "shoppingCart-*"))
            {
                var streamName     = Path.GetFileNameWithoutExtension(f);
                var step3EventData = ReadEvents(f);
                var eventData      = step3EventData.ToArray();
                await conn.AppendToStreamAsync(streamName, ExpectedVersion.Any, eventData);
            }
            #endregion SeedEvents

            var projectionsManager = GetProjectionsManager();

            // TODO: Parse
            #region CreateUserProjection
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
            await projectionsManager.CreateContinuousAsync("xbox-one-s-counter", countItemsProjection, adminCredentials);
            #endregion CreateUserProjection

            #region GetProjectionState
            var projectionState = await projectionsManager.GetStateAsync("xbox-one-s-counter", adminCredentials);
            Console.WriteLine(projectionState);
            #endregion GetProjectionState
        }

        public static async Task Step3Update(UserCredentials adminCredentials)
        {
            var conn = await Connection.CreateConnection();

            var projection = GetProjectionsManager();

            #region UpdateUserProjection
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
            #endregion UpdateUserProjection

            #region ResetUserProjection
            await projection.ResetAsync("xbox-one-s-counter", adminCredentials);
            #endregion ResetUserProjection

            #region QueryUpdatedProjection
            var readEvents = await conn.ReadStreamEventsForwardAsync("$projections-xbox-one-s-counter-result", 0, 10, true);

            foreach (var evt in readEvents.Events)
            {
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));
            }
            #endregion QueryUpdatedProjection

            #region UpdateProjectionProperties
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
            #endregion UpdateProjectionProperties

            #region ReadUpdatedProjectionStream
            readEvents = await conn.ReadStreamEventsForwardAsync("xboxes", 0, 10, true);

            foreach (var evt in readEvents.Events)
            {
                Console.WriteLine(Encoding.UTF8.GetString(evt.Event.Data));
            }
            #endregion ReadUpdatedProjectionStream
        }

        public static async Task Step3ProjectionOptions(UserCredentials adminCredentials)
        {
            var projectionsManager = GetProjectionsManager();

            #region EnableCategoryProjection
            await projectionsManager.EnableAsync("$by_category", adminCredentials);
            #endregion EnableCategoryProjection

            #region CreatePartitionedProjection
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

            await projectionsManager.CreateContinuousAsync(
                name: "shopping-cart-item-counter",
                query: itemCounterProjection,
                trackEmittedStreams: true,
                userCredentials: adminCredentials
            );
            #endregion CreatePartitionedProjection

            #region GetPartitionedProjectionState
            var projectionState = await projectionsManager.GetPartitionStateAsync(
                name: "shopping-cart-item-counter",
                partitionId: "shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164",
                userCredentials: adminCredentials
            );
            Console.WriteLine(projectionState);
            #endregion GetPartitionedProjectionState
        }
    }
}
