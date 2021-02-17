import {
  START,
  eventTypeFilter,
  streamNameFilter,
  excludeSystemEvents,
} from "@eventstore/db-client";

export async function subscribeToAllExcludeSystemEvents(client) {
  // region exclude-system
  const subscription = client
    .subscribeToAll({
      fromRevision: START,
      filter: excludeSystemEvents(),
    })
    .on("data", function (resolvedEvent) {
      console.log(
        `Received event ${resolvedEvent.event.revision}@${resolvedEvent.event.streamId}`
      );
    });
  // endregion exclude-system
}

export async function subscribeToAllFilteringByEventTypePrefix(client) {
  // region event-type-prefix
  const prefixes = ["customer-"];
  const filter = eventTypeFilter({ prefixes });
  // endregion event-type-prefix
  const subscription = client
    .subscribeToAll({
      fromRevision: START,
      filter,
    })
    .on("data", handleEvent);
}

export async function subscribeToAllFilteringByEventTypeRegex(client) {
  // region event-type-regex
  const regex = /^user|^company/;
  const filter = eventTypeFilter({ regex });
  // endregion event-type-regex
  const subscription = client
    .subscribeToAll({
      fromRevision: START,
      filter,
    })
    .on("data", handleEvent);
}

export async function subscribeToAllFilteringByStreamPrefix(client) {
  // region stream-prefix
  const prefixes = ["user-"];
  const filter = streamNameFilter({ prefixes });
  // endregion stream-prefix
  const subscription = client
    .subscribeToAll({
      fromRevision: START,
      filter,
    })
    .on("data", handleEvent);
}

export async function subscribeToAllFilteringByStreamRegex(client) {
  // region stream-regex
  const regex = /^account|^savings/;
  const filter = streamNameFilter({ regex });
  // endregion stream-regex
  const subscription = client
    .subscribeToAll({
      fromRevision: START,
      filter,
    })
    .on("data", handleEvent);
}

// 		private static async Task CheckpointCallback(EventStoreClient client) {
// 			#region checkpoint
// 			var filter = new SubscriptionFilterOptions(
// 				EventTypeFilter.ExcludeSystemEvents(),
// 				checkpointReached: (s, p, c) =>
// 				{
// 					Console.WriteLine($"checkpoint taken at {p.PreparePosition}");
// 					return Task.CompletedTask;
// 				});
// 			#endregion checkpoint

// 			await client.SubscribeToAllAsync(Position.Start,
// 				(s, e, c) => {
// 					Console.WriteLine(
// 						$"{e.Event.EventType} @ {e.Event.Position.PreparePosition}");
// 					return Task.CompletedTask;
// 				},
// 				filterOptions: filter
// 			);
// 		}

export async function subscribeToAllWithCheckpointInterval(client) {
  // region checkpoint-with-interval
  const excludeSystemEventsRegex = /^[^\$].*/;
  const filter = eventTypeFilter({
    checkpointIntervalMul: 1000,
    regex: excludeSystemEventsRegex,
  });
  // endregion checkpoint-with-interval
  const subscription = client
    .subscribeToStream({
      filter: streamNameFilter({ regex }),
    })
    .on("data", handleEvent);
}

function handleEvent(event) {
  console.log(event);
}

// 		private static async Task CheckpointCallbackWithInterval(EventStoreClient client) {
// 			#region checkpoint-with-interval
// 			var filter = new SubscriptionFilterOptions(
// 				EventTypeFilter.ExcludeSystemEvents(),
// 				checkpointInterval: 1000,
// 				checkpointReached: (s, p, c) =>
// 				{
// 					Console.WriteLine($"checkpoint taken at {p.PreparePosition}");
// 					return Task.CompletedTask;
// 				});
// 			#endregion checkpoint-with-interval

// 			await client.SubscribeToAllAsync(Position.Start,
// 				(s, e, c) => {
// 					Console.WriteLine(
// 						$"{e.Event.EventType} @ {e.Event.Position.PreparePosition}");
// 					return Task.CompletedTask;
// 				},
// 				filterOptions: filter
// 			);
// 		}
// 	}
// }
