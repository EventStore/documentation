---
order: 5
sitemap:
  priority: 0.1
  changefreq: monthly
---

# Reading events

You can use the client API to read events from a stream starting from either end of the stream. There is a method for each direction and one for reading a single event.

## Read a single event

To read one event, use the following method passing the stream name, the event you want to read and whether to return the event data:

```csharp
Task<EventReadResult> ReadEventAsync(string stream, long eventNumber, bool resolveLinkTos);
```

Example:

@[code{ReadOneEvent}](./sample-code/Program.cs)

The `ReadEventAsync` method reads a single event from a stream at a specified position. This is the simplest case of reading events, but is still useful for situations such as reading the last event in the stream used as a starting point for a subscription. This function accepts three parameters:

| Parameter | Description |
|:----------|:------------|
| `string stream` | The stream to read from |
| `long eventNumber` | The event number to read (use `StreamPosition.End` to read the last event in the stream) |
| `bool resolveLinkTos` | Determines whether any link events encountered in the stream will be resolved. See the discussion on [Resolved Events](#resolvedevent) for more information on this |

This method returns an instance of `EventReadResult` which indicates if the read was successful, and if so the `ResolvedEvent` that was read.

## Read a specific stream forwards

The `ReadStreamEventsForwardAsync` method reads the requested number of events in the order in which they were originally appended to the stream from a nominated starting point in the stream.

```csharp
Task<StreamEventsSlice> ReadStreamEventsForwardAsync(
    string stream, long start, int count, bool resolveLinkTos
);
```

The parameters are:

| Parameter | Description |
|:----------|:------------|
| `string Stream` | The name of the stream to read |
| `long start`    | The earliest event to read (inclusive). For the special case of the start of the stream, you should use the constant `StreamPosition.Start`. |
| `int count` | The maximum number of events to read in this request (assuming that many exist between the start specified and the end of the stream) |
| `bool resolveLinkTos` | Determines whether any link events encountered in the stream will be resolved. See the discussion on [Resolved Events](#resolvedevent) for more information on this |

Bear in mind that there could be many events in the stream. The .NET client always reads events in pages with the default page size of 4096 events. If you need to read the whole stream, you'd have to keep reading pages until the response will indicate that you reached the end of the stream.

The example below uses the `ReadStreamEventsForwardAsync` method in a loop to page through all events in a stream, reading 200 events at a time to build a list of all the events in the stream.

```csharp
var streamEvents = new List<ResolvedEvent>();

StreamEventsSlice currentSlice;
var nextSliceStart = StreamPosition.Start;
do
{
    currentSlice = await _connection.ReadStreamEventsForwardAsync(
        "myStream", 
        nextSliceStart, 
        200, false
    );

    nextSliceStart = currentSlice.NextEventNumber;

    streamEvents.AddRange(currentSlice.Events);
} while (!currentSlice.IsEndOfStream);
```

::: tip
It's unlikely that client code would need to build a list in this manner. It's far more likely that you would pass events into a left fold to derive the state of some object as of a given event.
:::

```csharp
// Read a specific stream backwards
Task<StreamEventsSlice> ReadStreamEventsBackwardAsync(
    string stream, long start, int count, bool resolveLinkTos
);

// Read all events forwards
Task<AllEventsSlice> ReadAllEventsForwardAsync(
    Position position, int maxCount, bool resolveLinkTos
);

// Read all events backwards
Task<AllEventsSlice> ReadAllEventsBackwardAsync(
    Position position, int maxCount, bool resolveLinkTos
);
```

::: tip
These methods also have an optional parameter which allows you to specify the `UserCredentials` to use for the request. If you don't supply any, the default credentials for the `EventStoreConnection` are used ([see Connecting to a server - user credentials](connecting.md#user-credentials)).
:::

## Read a stream backwards

The `ReadStreamEventsBackwardAsync` method reads the requested number of events in the reverse order from that in which they were originally appended to the stream from a specified starting point.

The parameters are:

| Parameter | Description |
|:----------|:------------|
| `string Stream` | The name of the stream to read |
| `long start` | The latest event to read (inclusive). For the end of the stream use the constant `StreamPosition.End` |
| `int count` | The maximum number of events to read in this request (assuming that many exist between the start specified and the start of the stream) |
| `bool resolveLinkTos` | Determines whether any link events encountered in the stream will be resolved. See the discussion on [Resolved Events](#resolvedevent) for more information on this |

## Read all events

EventStoreDB allows you to read events across all streams using the `ReadAllEventsForwardAsync` and `ReadAllEventsBackwardsAsync` methods. These work in the same way as the regular read methods, but use an instance of the global log file `Position` to reference events rather than the simple integer stream position described previously.

They also return an `AllEventsSlice` rather than a `StreamEventsSlice` which is the same except it uses global `Position`s rather than stream positions.

#### Example: Read all events forward from start to end

```csharp
var allEvents = new List<ResolvedEvent>();

AllEventsSlice currentSlice;
var nextSliceStart = Position.Start;
do
{
    currentSlice = await connection.ReadAllEventsForwardAsync(
        nextSliceStart, 
        200, false
    );

    nextSliceStart = currentSlice.NextPosition;

    allEvents.AddRange(currentSlice.Events);
} while (!currentSlice.IsEndOfStream);
```

## StreamEventsSlice

The reading methods for individual streams each return a `StreamEventsSlice`, which is immutable. The available members on `StreamEventsSlice` are:

| Member | Description |
|:-------|:------------|
| `string Stream` | The name of the stream for the slice |
| `ReadDirection ReadDirection` | Either `ReadDirection.Forward` or `ReadDirection.Backward` depending on which method was used to read  |
| `long FromEventNumber` | The sequence number of the first event in the stream |
| `long LastEventNumber` | The sequence number of the last event in the stream |
| `long NextEventNumber` | The sequence number from which the next read should be performed to continue reading the stream |
| `bool IsEndOfStream` | Whether this slice contained the end of the stream at the time it was created |
| `ResolvedEvent[] Events` | An array of the events read. See the description of how to interpret a [Resolved Events](#resolvedevent) below for more information on this |

## ResolvedEvent

When you read events from a stream (or received over a subscription) you receive an instance of the `RecordedEvent` class packaged inside a `ResolvedEvent`.

EventStoreDB supports a special event type called 'Link Events'. Think of these events as pointers to an event in another stream.

In situations where the event you read is a link event, `ResolvedEvent` allows you to access both the link event itself, as well as the event it points to.

The members of this class are as follows:

| Member | Description |
|:-------|:------------|
| `RecordedEvent Event` | The event, or the resolved link event if this `ResolvedEvent` is a link event |
| `RecordedEvent Link`  | The link event if this `ResolvedEvent` is a link event |
| `RecordedEvent OriginalEvent` | Returns the event read or which triggered the subscription. If this `ResolvedEvent` represents a link event, the link will be the `OriginalEvent`, otherwise it will be the event |
| `bool IsResolved`             | Indicates whether this `ResolvedEvent` is a resolved link event |
| `Position? OriginalPosition`  | The logical position of the `OriginalEvent` |
| `string OriginalStreamId`     | The stream name of the `OriginalEvent` |
| `long OriginalEventNumber`    | The event number in the stream of the `OriginalEvent` |

::: tip
To ensure that the EventStoreDB server follows link events when reading, ensure you set the `ResolveLinkTos` parameter to `true` when calling read methods.
:::

## RecordedEvent

`RecordedEvent` contains all the data about a specific event. Instances of this class are immutable, and expose the following members:

| Member | Description  |
|:-------|:-------------|
| `string EventStreamId` | The Event Stream this event belongs to |
| `Guid EventId`         | The Unique Identifier representing this |
| `long EventNumber`     | The number of this event in the stream |
| `string EventType`     | The event type (supplied when appending) |
| `byte[] Data`          | A byte array representing the data of this event |
| `byte[] Metadata`      | A byte array representing the metadata associated with this event  |
| `bool IsJson` | Indicates whether the content was internally marked as JSON |
| `DateTime Created` | A timestamp representing when this event was created.  |
| `long CreatedEpoch` | A long representing the milliseconds since the epoch when the was created. |

