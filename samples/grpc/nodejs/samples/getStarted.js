import {
  EventStoreDBClient,
  jsonEvent,
  START,
  FORWARDS,
} from "@eventstore/db-client";
import { v4 as uuid } from "uuid";

export default function (router) {
  router.get("/", async function (req, res, next) {
    // region createClient
    const client = EventStoreDBClient.connectionString("{connectionString}");
    // endregion createClient

    // region createEvent
    const event = jsonEvent({
      type: "TestEvent",
      data: {
        entityId: uuid(),
        importantData: "I wrote my first event!",
      },
    });
    // endregion createEvent

    // region appendEvents
    await client.appendToStream("some-stream", event);
    // endregion appendEvents

    // region readStream
    const events = await client.readStream("some-stream", 10, {
      direction: FORWARDS,
      fromRevision: START,
    });
    // endregion readStream

    res.render("index", events);
  });
}
