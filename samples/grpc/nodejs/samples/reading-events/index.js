import {
  START,
  END,
  FORWARD,
  BACKWARD,
  ErrorType,
} from "@eventstore/db-client";

export async function readFromStream(client) {
  // region read-from-stream
  const events = await client.readEventsFromStream("some-stream", 10, {
    fromRevision: START,
    direction: FORWARD,
  });
  // endregion read-from-stream

  // #region iterate-stream
  for (var resolvedEvent of events) {
    console.log(resolvedEvent.event.data);
  }
  // #endregion iterate-stream

  return events;
}

export async function readFromStreamPosition(client) {
  // region read-from-stream-position
  const events = await client.readEventsFromStream("some-stream", 20, {
    fromRevision: BigInt(10),
    direction: FORWARD,
  });
  // endregion read-from-stream-position

  // #region iterate-stream
  for (var resolvedEvent of events) {
    console.log(resolvedEvent.event.data);
  }
  // #endregion iterate-stream

  return events;
}

export async function readFromStreamPositionCheck(client) {
  // region checking-for-stream-presence
  let events = [];
  try {
    events = await client.readEventsFromStream("some-stream", 20, {
      fromRevision: BigInt(10),
      direction: FORWARD,
    });
  } catch (error) {
    if (error.type == ErrorType.STREAM_NOT_FOUND) return;

    throw error;
  }

  for (var resolvedEvent of events) {
    console.log(resolvedEvent.event.data);
  }
  // #endregion checking-for-stream-presence

  return events;
}

export async function readFromStreamBackwards(client) {
  // region read-from-stream
  const events = await client.readEventsFromStream("some-stream", 10, {
    fromRevision: END,
    direction: BACKWARD,
  });

  for (var resolvedEvent of events) {
    console.log(resolvedEvent.event.data);
  }
  // #endregion reading-backwards

  return events;
}

export async function readFromAllStream(client) {
  // region read-from-all-stream
  const events = await client.readEventsFromStream(10, {
    fromPosition: START,
    direction: FORWARD,
  });
  // endregion read-from-all-stream

  // #region read-from-all-stream-iterate
  for (var resolvedEvent of events) {
    console.log(resolvedEvent.event.data);
  }
  // #endregion read-from-all-stream-iterate

  return events;
}

export async function ignoreSystemEvents(client) {
  // region ignore-system-events
  const events = await client.readEventsFromStream(10, {
    fromPosition: START,
    direction: FORWARD,
  });

  for (var resolvedEvent of events) {
    if (resolvedEvent.event.eventType.startsWith("$")) {
      continue;
    }
    console.log(resolvedEvent.event.eventType);
  }
  // #endregion ignore-system-events

  return events;
}

export async function readFromAllStreamBackwards(client) {
  // region read-from-all-stream-backwards
  const events = await client.readEventsFromStream(10, {
    fromPosition: END,
    direction: BACKWARD,
  });
  // endregion read-from-all-stream-backwards

  // #region read-from-all-stream-iterate
  for (var resolvedEvent of events) {
    console.log(resolvedEvent.event.data);
  }
  // #endregion read-from-all-stream-iterate

  return events;
}

export async function filterOutSystemEvents(client) {
  // region filter-out-system-events
  const events = await client.readEventsFromStream(10, {
    fromPosition: START,
    direction: FORWARD,
  });

  for (var resolvedEvent of events) {
    if (resolvedEvent.event.eventType.startsWith("$")) {
      continue;
    }
    console.log(resolvedEvent.event.eventType);
  }
  // #endregion filter-out-system-events

  return events;
}

export async function readFromAllStreamResolvingLinkTos(client) {
  // region read-from-all-stream-resolving-link-Tos
  const events = await client.readEventsFromStream(10, {
    fromPosition: END,
    direction: BACKWARD,
    resolveLinks: true,
  });
  // endregion read-from-all-stream-resolving-link-Tos

  // #region read-from-all-stream-iterate
  for (var resolvedEvent of events) {
    console.log(resolvedEvent.event.data);
  }
  // #endregion read-from-all-stream-iterate

  return events;
}
