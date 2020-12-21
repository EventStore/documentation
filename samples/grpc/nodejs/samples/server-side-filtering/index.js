import { START, STREAM_NAME, EVENT_TYPE } from "@eventstore/db-client";

export async function subscribeToAllExcludeSystemEvents(client) {
  // region exclude-system
  const excludeSystemEventsRegex = /^[^\$].*/;
  const subscription = client
    .subscribeToAll({
      fromRevision: START,
      filter: { filterOn: EVENT_TYPE, regex: excludeSystemEventsRegex },
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
  const filter = { filterOn: EVENT_TYPE, prefixes };
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
  const filter = { filterOn: EVENT_TYPE, regex };
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
  const filter = { filterOn: STREAM_NAME, prefixes };
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
  const filter = { filterOn: STREAM_NAME, regex };
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
  const filter = { filterOn: EVENT_TYPE, checkpointIntervalMul: 1000, regex };
  // endregion checkpoint-with-interval
  const subscription = client
    .subscribeToStream({
      filter: { filterOn: STREAM_NAME, regex },
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
