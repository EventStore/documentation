import {
  jsonEvent,
  ANY,
  NO_STREAM,
  START,
  FORWARD,
} from "@eventstore/db-client";
import { v4 as uuid } from "uuid";

export async function appendToStream(client) {
  // region append-to-stream
  const event = jsonEvent({
    id: uuid(),
    eventType: "some-event",
    payload: {
      id: "1",
      value: "some value",
    },
  });

  await client.appendToStream("some-stream", event, {
    expectedRevision: NO_STREAM,
  });
  // endregion append-to-stream
}

export async function appendWithSameId(client) {
  // region append-duplicate-event
  const event = jsonEvent({
    id: uuid(),
    eventType: "some-event",
    payload: {
      id: "1",
      value: "some value",
    },
  });

  await client.appendToStream("same-event-stream", event, {
    expectedRevision: ANY,
  });

  // attempt to append the same event again
  await client.appendToStream("same-event-stream", event, {
    expectedRevision: ANY,
  });
  // endregion append-duplicate-event
}

export async function appendWithNoStream(client) {
  // region append-with-no-stream
  const eventOne = jsonEvent({
    id: uuid(),
    eventType: "some-event",
    payload: {
      id: "1",
      value: "some value",
    },
  });

  const eventTwo = jsonEvent({
    id: uuid(),
    eventType: "some-event",
    payload: {
      id: "2",
      value: "some other value",
    },
  });

  await client.appendToStream("no-stream-stream", eventOne, {
    expectedRevision: NO_STREAM,
  });

  // attempt to append the same event again
  await client.appendToStream("no-stream-stream", eventTwo, {
    expectedRevision: NO_STREAM,
  });
  // endregion append-with-no-stream
}

export async function appendWithConcurrencyCheck(client) {
  // region append-with-concurrency-check
  const events = await client.readStream("concurrency-stream", 10, {
    fromRevision: START,
    direction: FORWARD,
  });
  const lastEvent = events[events.length - 1];
  const revision =
    !!lastEvent || !!lastEvent.event ? lastEvent.event.revision : undefined;

  const clientOneEvent = jsonEvent({
    id: uuid(),
    eventType: "some-event",
    payload: {
      id: "1",
      value: "some value",
    },
  });

  await client.appendToStream("concurrency-stream", clientOneEvent, {
    expectedRevision: revision,
  });

  const clientTwoEvent = jsonEvent({
    id: uuid(),
    eventType: "some-event",
    payload: {
      id: "2",
      value: "some value",
    },
  });

  await client.appendToStream("concurrency-stream", clientTwoEvent, {
    expectedRevision: revision,
  });
  // endregion append-with-concurrency-check
}
