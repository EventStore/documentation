---
outputFileName: index.html
---

# User defined projections

<!-- TODO: Again refactor to shopping cart? -->

You write user defined projections in JavaScript. For example, the `my_demo_projection_result` projection below counts the number of `myEventType` events from the `account-1` stream. It then uses the `transformBy` function to change the final state:

```JavaScript
options({
	resultStreamName: "my_demo_projection_result",
	$includeLinks: false,
	reorderEvents: false,
	processingLag: 0
})

fromStream('account-1')
.when({
	$init:function(){
		return {
			count: 0
		}
	},
	myEventType: function(state, event){
		state.count += 1;
	}
})
.transformBy(function(state){
	state.count = 10;
})
.outputState()
```

<!-- TODO: Show example output, see above comment -->

## User defined projections API

### Options

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>`resultStreamName`</code></td>
            <td>Overrides the default resulting stream name for the `outputState()` transformation, which is `$projections-{projection-name}-result`.</td>
            <td>
            </td>
        </tr>
        <tr>
            <td><code>`$includeLinks`</code></td>
            <td>Configures the projection to include/exclude link to events.</td>
            <td>
                <b>Default: </b>`false`
            </td>
        </tr>
         <tr>
            <td><code>`processingLag`</code></td>
            <td>When `reorderEvents` is enabled, this value is used to compare the total milliseconds between the first and last events in the buffer and if the value is equal or greater, the events in the buffer are processed. The buffer is an ordered list of events.
            </td>
			<td>
                <b>Default: </b>`500ms`
                <p>
	                Only valid for `fromStreams()` selector
                </p>
            </td>
        </tr>
        <tr>
            <td><code>`reorderEvents`</code></td>
            <td>Process events by storing a buffer of events ordered by their prepare position</td>
			<td>
                <b>Default: </b>`false`
                <p>
	                Only valid for `fromStreams()` selector
                </p>
            </td>
        </tr>
	</tbody>
</table>

## Selectors

<table>
    <thead>
        <tr>
            <th>Selector</th>
            <th>Description</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>`fromAll()`</code></td>
            <td>Selects events from the `$all` stream.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`partitionBy`</li>
	            	<li>`when`</li>
	            	<li>`foreachStream`</li>
	            	<li>`outputState`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`fromCategory({category})`</code></td>
            <td>Selects events from the `$ce-{category}` stream.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`partitionBy`</li>
	            	<li>`when`</li>
	            	<li>`foreachStream`</li>
	            	<li>`outputState`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`fromStream({streamId})`</code></td>
            <td>Selects events from the {streamId} stream.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`partitionBy`</li>
	            	<li>`when`</li>
	            	<li>`outputState`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`fromStreams([]streams)`</code></td>
            <td>Selects events from the streams supplied.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`partitionBy`</li>
	            	<li>`when`</li>
	            	<li>`outputState`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`fromStreamsMatching(function filter)`</code></td>
            <td>Selects events from the `$all` stream that returns true for the given filter.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`when`</li>
            	</ul>
            </td>
        </tr>
	</tbody>
</table>

## Filters/Transformations

<table>
    <thead>
        <tr>
            <th>Filter/Partition</th>
            <th>Description</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>`when(handlers)`</code></td>
            <td>Allows only the given events of a particular to pass through the projection.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`$defines_state_transform`</li>
	            	<li>`transformBy`</li>
	            	<li>`filterBy`</li>
	            	<li>`outputTo`</li>
	            	<li>`outputState`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`foreachStream()`</code></td>
            <td>Partitions the state for each of the streams provided.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`when`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`outputState()`</code></td>
            <td>If the projection maintains state, setting this option produces a stream called `$projections-{projection-name}-result` with the state as the event body.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`transformBy`</li>
	            	<li>`filterBy`</li>
	            	<li>`outputTo`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`partitionBy(function(event))`</code></td>
            <td>Partitions a projection by the partition returned from the handler.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`when`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`transformBy(function(state))`</code></td>
            <td>Provides the ability to transform the state of a projection by the provided handler.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`transformBy`</li>
	            	<li>`filterBy`</li>
	            	<li>`outputState`</li>
	            	<li>`outputTo`</li>
            	</ul>
            </td>
        </tr>
        <tr>
            <td><code>`filterBy(function(state))`</code></td>
            <td>Causes projection results to be `null` for any `state` that returns a `false` value from the given predicate.</td>
            <td>
            	<b>Provides</b>
            	<ul>
	            	<li>`transformBy`</li>
	            	<li>`filterBy`</li>
	            	<li>`outputState`</li>
	            	<li>`outputTo`</li>
            	</ul>
            </td>
        </tr>
	</tbody>
</table>

## Handlers

Each handler is provided with the current state of the projection as well as the event that triggered the handler. The event provided through the handler contains the following properties.

-   `isJson`: true/false
-   `data`: {}
-   `body`: s{}
-   `bodyRaw`: string
-   `sequenceNumber`: integer
-   `metadataRaw`: {}
-   `linkMetadataRaw`: string
-   `partition`: string
- `eventType`: string

<table>
    <thead>
        <tr>
            <th>Handler</th>
            <th>Description</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
         <tr>
            <td><code>{event-type}</code></td>
            <td>
                When using `fromAll()` and 2 or more event type handlers are specified and the `$by_event_type` projection is enabled and running, the projection starts as a `fromStreams($et-event-type-foo, $et-event-type-bar)` until the projection has caught up and moves to reading from the transaction log (i.e. from `$all`).
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td><code>`$init`</code></td>
            <td>Provide the initialization for a projection.</td>
            <td>
            	Commonly used to setup the initial state for a projection.
            </td>
        </tr>
        <tr>
            <td><code>`$initShared`</code></td>
            <td>Provide the initialization for a projection where the projection is possibly partitioned.</td>
            <td>
            </td>
        </tr>
        <tr>
            <td><code>`$any`</code></td>
            <td>Event type pattern match that match any event type.</td>
            <td>
            	Commonly used when the user is interested in any event type from the selector.
            </td>
        </tr>
        <tr>
            <td><code>`$deleted`</code></td>
            <td>Called upon the deletion of a stream.</td>
            <td>
                Can only be used with `foreachStream`
            </td>
        </tr>
	</tbody>
</table>

## Functions

<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Notes</th>
        </tr>
    </thead>
    <tbody>
         <tr>
            <td><code>`emit(streamId, eventType, eventBody, metadata)`</code></td>
            <td>Writes an event to the designated stream</td>
            <td>
            </td>
        </tr>
        <tr>
            <td><code>`linkTo(streamId, event, metadata)`</code></td>
            <td>Writes a link to event to the designated stream</td>
            <td>
            </td>
        </tr>
    </tbody>
</table>
