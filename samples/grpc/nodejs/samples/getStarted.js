import { EventStoreDBClient } from "@eventstore/db-client";

export default function(router) {
    router.get("/", async function(req, res, next) {
        // #region createClient
        const client = EventStoreConnection.connectionString("{connectionString}");
        // #endregion createClient

        // #region readEvents
        const streamName = "testStream";
        const events = await client.readEventsFromStream(streamName, 10, {
            fromRevision: "start",
            direction: "forward" 
        });
        // #endregion readEvents

        res.render("index", events);
    });

}
