import {EventStoreConnection, readEventsFromStream} from "@eventstore/db-client";

export default function(router) {
    router.get("/", async function(req, res, next) {
        // #region createClient
        const client = EventStoreConnection.connectionString("{connectionString}");
        // #endregion createClient

        // #region readEvents
        const events = await readEventsFromStream("testStream")
            .fromStart()
            .forward()
            .count(10)
            .execute(client);
        // #endregion readEvents

        res.render("index", { title: "Express" });
    });

}
