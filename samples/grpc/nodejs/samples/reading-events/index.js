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

// private static async Task ReadFromAllStream(EventStoreClient client) {
//     #region read-from-all-stream
//     var events = client.ReadAllAsync(
//         Direction.Forwards, Position.Start);
//     #endregion read-from-all-stream

//     #region read-from-all-stream-iterate
//     await foreach (var e in events) {
//         Console.WriteLine(Encoding.UTF8.GetString(e.Event.Data.ToArray()));
//     }
//     #endregion read-from-all-stream-iterate
// }

// private static async Task IgnoreSystemEvents(EventStoreClient client) {
//     #region ignore-system-events
//     var events = client.ReadAllAsync(
//         Direction.Forwards, Position.Start);

//     await foreach (var e in events) {
//         if (e.Event.EventType.StartsWith("$")) {
//             continue;
//         }

//         Console.WriteLine(Encoding.UTF8.GetString(e.Event.Data.ToArray()));
//     }
//     #endregion ignore-system-events
// }

// private static async Task ReadFromAllStreamBackwards(EventStoreClient client) {
//     #region read-from-all-stream-backwards
//     var events = client.ReadAllAsync(
//         Direction.Backwards, Position.End);
//     #endregion read-from-all-stream-backwards

//     #region read-from-all-stream-iterate
//     await foreach (var e in events) {
//         Console.WriteLine(Encoding.UTF8.GetString(e.Event.Data.ToArray()));
//     }
//     #endregion read-from-all-stream-iterate
// }

// private static async Task FilteringOutSystemEvents(EventStoreClient client) {
//     var events = client.ReadAllAsync(Direction.Forwards, Position.Start);

//     await foreach (var e in events) {
//         if (!e.Event.EventType.StartsWith("$")) {
//             Console.WriteLine(Encoding.UTF8.GetString(e.Event.Data.ToArray()));
//         }
//     }
// }

// private static async Task ReadFromStreamResolvingLinkTos(EventStoreClient client) {
//     var events = client.ReadAllAsync(Direction.Forwards, Position.Start, resolveLinkTos: true);

//     await foreach (var e in events) {
//         Console.WriteLine(Encoding.UTF8.GetString(e.Event.Data.ToArray()));
//     }
// }
