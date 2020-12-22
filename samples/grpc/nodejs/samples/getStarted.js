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
    const client = EventStoreDBClient.connectionString("{connectionString}");
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

    const expectedRevision = 20;
    // #region appendEvents
    await client.appendToStream("some-stream", event, {
      expectedRevision,
    });
    // #endregion appendEvents

    // #region readStream
    const events = await client.readStream("some-stream", 10, {
      fromRevision: START,
      direction: FORWARD,
    });
    // #endregion readStream

    res.render("index", events);
  });
}
