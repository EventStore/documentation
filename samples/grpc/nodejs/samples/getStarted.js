import {
  EventStoreDBClient,
  jsonEvent,
  START,
  FORWARD,
} from "@eventstore/db-client";
import { v4 as uuid } from "uuid";

export default function (router) {
  router.get("/", async function (req, res, next) {
    // #region createClient
    //const client = EventStoreDBClient.connectionString("{connectionString}");
    const client = EventStoreDBClient.connectionString(
      "esdb://bv7mu9qrh41jl17k8ulg-0.mesdb.eventstore.cloud:2113,bv7mu9qrh41jl17k8ulg-1.mesdb.eventstore.cloud:2113,bv7mu9qrh41jl17k8ulg-2.mesdb.eventstore.cloud:2113"
    );
    // #endregion createClient

    // #region createEvent
    const event = jsonEvent({
      eventType: "TestEvent",
      payload: {
        entityId: uuid(),
        importantData: "I wrote my first event!",
      },
    });
    // #endregion createEvent

    // #region writeEvents
    await client.appendToStream("some-stream", event, {
      expectedRevision,
    });
    // #endregion writeEvents

    // #region readEvents
    const events = await client.readStream("some-stream", 10, {
      fromRevision: START,
      direction: FORWARD,
    });
    // #endregion readEvents

    res.render("index", events);
  });
}
