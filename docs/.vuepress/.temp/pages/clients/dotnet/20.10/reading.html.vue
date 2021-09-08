<template><h1 id="reading-events" tabindex="-1"><a class="header-anchor" href="#reading-events" aria-hidden="true">#</a> Reading events</h1>
<p>You can use the client API to read events from a stream starting from either end of the stream. There is a method for each direction and one for reading a single event.</p>
<h2 id="read-a-single-event" tabindex="-1"><a class="header-anchor" href="#read-a-single-event" aria-hidden="true">#</a> Read a single event</h2>
<p>To read one event, use the following method passing the stream name, the event you want to read and whether to return the event data:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>EventReadResult<span class="token punctuation">></span></span> <span class="token function">ReadEventAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> eventNumber<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> resolveLinkTos<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Example:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> readResult <span class="token operator">=</span> <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">ReadEventAsync</span><span class="token punctuation">(</span>streamName<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
Console<span class="token punctuation">.</span><span class="token function">WriteLine</span><span class="token punctuation">(</span>Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetString</span><span class="token punctuation">(</span>readResult<span class="token punctuation">.</span>Event<span class="token punctuation">.</span>Value<span class="token punctuation">.</span>Event<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>The <code>ReadEventAsync</code> method reads a single event from a stream at a specified position. This is the simplest case of reading events, but is still useful for situations such as reading the last event in the stream used as a starting point for a subscription. This function accepts three parameters:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string stream</code></td>
<td style="text-align:left">The stream to read from</td>
</tr>
<tr>
<td style="text-align:left"><code>long eventNumber</code></td>
<td style="text-align:left">The event number to read (use <code>StreamPosition.End</code> to read the last event in the stream)</td>
</tr>
<tr>
<td style="text-align:left"><code>bool resolveLinkTos</code></td>
<td style="text-align:left">Determines whether any link events encountered in the stream will be resolved. See the discussion on <a href="#resolvedevent">Resolved Events</a> for more information on this</td>
</tr>
</tbody>
</table>
<p>This method returns an instance of <code>EventReadResult</code> which indicates if the read was successful, and if so the <code>ResolvedEvent</code> that was read.</p>
<h2 id="read-a-specific-stream-forwards" tabindex="-1"><a class="header-anchor" href="#read-a-specific-stream-forwards" aria-hidden="true">#</a> Read a specific stream forwards</h2>
<p>The <code>ReadStreamEventsForwardAsync</code> method reads the requested number of events in the order in which they were originally appended to the stream from a nominated starting point in the stream.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>StreamEventsSlice<span class="token punctuation">></span></span> <span class="token function">ReadStreamEventsForwardAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> start<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> count<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> resolveLinkTos
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>The parameters are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string Stream</code></td>
<td style="text-align:left">The name of the stream to read</td>
</tr>
<tr>
<td style="text-align:left"><code>long start</code></td>
<td style="text-align:left">The earliest event to read (inclusive). For the special case of the start of the stream, you should use the constant <code>StreamPosition.Start</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code>int count</code></td>
<td style="text-align:left">The maximum number of events to read in this request (assuming that many exist between the start specified and the end of the stream)</td>
</tr>
<tr>
<td style="text-align:left"><code>bool resolveLinkTos</code></td>
<td style="text-align:left">Determines whether any link events encountered in the stream will be resolved. See the discussion on <a href="#resolvedevent">Resolved Events</a> for more information on this</td>
</tr>
</tbody>
</table>
<p>Bear in mind that there could be many events in the stream. The .NET client always reads events in pages with the default page size of 4096 events. If you need to read the whole stream, you'd have to keep reading pages until the response will indicate that you reached the end of the stream.</p>
<p>The example below uses the <code>ReadStreamEventsForwardAsync</code> method in a loop to page through all events in a stream, reading 200 events at a time to build a list of all the events in the stream.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> streamEvents <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>ResolvedEvent<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">StreamEventsSlice</span> currentSlice<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> nextSliceStart <span class="token operator">=</span> StreamPosition<span class="token punctuation">.</span>Start<span class="token punctuation">;</span>
<span class="token keyword">do</span>
<span class="token punctuation">{</span>
    currentSlice <span class="token operator">=</span> <span class="token keyword">await</span> _connection<span class="token punctuation">.</span><span class="token function">ReadStreamEventsForwardAsync</span><span class="token punctuation">(</span>
        <span class="token string">"myStream"</span><span class="token punctuation">,</span> 
        nextSliceStart<span class="token punctuation">,</span> 
        <span class="token number">200</span><span class="token punctuation">,</span> <span class="token boolean">false</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    nextSliceStart <span class="token operator">=</span> currentSlice<span class="token punctuation">.</span>NextEventNumber<span class="token punctuation">;</span>

    streamEvents<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span>currentSlice<span class="token punctuation">.</span>Events<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>currentSlice<span class="token punctuation">.</span>IsEndOfStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>It's unlikely that client code would need to build a list in this manner. It's far more likely that you would pass events into a left fold to derive the state of some object as of a given event.</p>
</div>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">// Read a specific stream backwards</span>
<span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>StreamEventsSlice<span class="token punctuation">></span></span> <span class="token function">ReadStreamEventsBackwardAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> start<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> count<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> resolveLinkTos
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Read all events forwards</span>
<span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>AllEventsSlice<span class="token punctuation">></span></span> <span class="token function">ReadAllEventsForwardAsync</span><span class="token punctuation">(</span>
    <span class="token class-name">Position</span> position<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> maxCount<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> resolveLinkTos
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Read all events backwards</span>
<span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>AllEventsSlice<span class="token punctuation">></span></span> <span class="token function">ReadAllEventsBackwardAsync</span><span class="token punctuation">(</span>
    <span class="token class-name">Position</span> position<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> maxCount<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> resolveLinkTos
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>These methods also have an optional parameter which allows you to specify the <code>UserCredentials</code> to use for the request. If you don't supply any, the default credentials for the <code>EventStoreConnection</code> are used (<RouterLink to="/clients/dotnet/20.10/connecting.html#user-credentials">see Connecting to a server - user credentials</RouterLink>).</p>
</div>
<h2 id="read-a-stream-backwards" tabindex="-1"><a class="header-anchor" href="#read-a-stream-backwards" aria-hidden="true">#</a> Read a stream backwards</h2>
<p>The <code>ReadStreamEventsBackwardAsync</code> method reads the requested number of events in the reverse order from that in which they were originally appended to the stream from a specified starting point.</p>
<p>The parameters are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string Stream</code></td>
<td style="text-align:left">The name of the stream to read</td>
</tr>
<tr>
<td style="text-align:left"><code>long start</code></td>
<td style="text-align:left">The latest event to read (inclusive). For the end of the stream use the constant <code>StreamPosition.End</code></td>
</tr>
<tr>
<td style="text-align:left"><code>int count</code></td>
<td style="text-align:left">The maximum number of events to read in this request (assuming that many exist between the start specified and the start of the stream)</td>
</tr>
<tr>
<td style="text-align:left"><code>bool resolveLinkTos</code></td>
<td style="text-align:left">Determines whether any link events encountered in the stream will be resolved. See the discussion on <a href="#resolvedevent">Resolved Events</a> for more information on this</td>
</tr>
</tbody>
</table>
<h2 id="read-all-events" tabindex="-1"><a class="header-anchor" href="#read-all-events" aria-hidden="true">#</a> Read all events</h2>
<p>EventStoreDB allows you to read events across all streams using the <code>ReadAllEventsForwardAsync</code> and <code>ReadAllEventsBackwardsAsync</code> methods. These work in the same way as the regular read methods, but use an instance of the global log file <code>Position</code> to reference events rather than the simple integer stream position described previously.</p>
<p>They also return an <code>AllEventsSlice</code> rather than a <code>StreamEventsSlice</code> which is the same except it uses global <code>Position</code>s rather than stream positions.</p>
<h4 id="example-read-all-events-forward-from-start-to-end" tabindex="-1"><a class="header-anchor" href="#example-read-all-events-forward-from-start-to-end" aria-hidden="true">#</a> Example: Read all events forward from start to end</h4>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> allEvents <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">List<span class="token punctuation">&lt;</span>ResolvedEvent<span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">AllEventsSlice</span> currentSlice<span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> nextSliceStart <span class="token operator">=</span> Position<span class="token punctuation">.</span>Start<span class="token punctuation">;</span>
<span class="token keyword">do</span>
<span class="token punctuation">{</span>
    currentSlice <span class="token operator">=</span> <span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">ReadAllEventsForwardAsync</span><span class="token punctuation">(</span>
        nextSliceStart<span class="token punctuation">,</span> 
        <span class="token number">200</span><span class="token punctuation">,</span> <span class="token boolean">false</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    nextSliceStart <span class="token operator">=</span> currentSlice<span class="token punctuation">.</span>NextPosition<span class="token punctuation">;</span>

    allEvents<span class="token punctuation">.</span><span class="token function">AddRange</span><span class="token punctuation">(</span>currentSlice<span class="token punctuation">.</span>Events<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>currentSlice<span class="token punctuation">.</span>IsEndOfStream<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="streameventsslice" tabindex="-1"><a class="header-anchor" href="#streameventsslice" aria-hidden="true">#</a> StreamEventsSlice</h2>
<p>The reading methods for individual streams each return a <code>StreamEventsSlice</code>, which is immutable. The available members on <code>StreamEventsSlice</code> are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Member</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string Stream</code></td>
<td style="text-align:left">The name of the stream for the slice</td>
</tr>
<tr>
<td style="text-align:left"><code>ReadDirection ReadDirection</code></td>
<td style="text-align:left">Either <code>ReadDirection.Forward</code> or <code>ReadDirection.Backward</code> depending on which method was used to read</td>
</tr>
<tr>
<td style="text-align:left"><code>long FromEventNumber</code></td>
<td style="text-align:left">The sequence number of the first event in the stream</td>
</tr>
<tr>
<td style="text-align:left"><code>long LastEventNumber</code></td>
<td style="text-align:left">The sequence number of the last event in the stream</td>
</tr>
<tr>
<td style="text-align:left"><code>long NextEventNumber</code></td>
<td style="text-align:left">The sequence number from which the next read should be performed to continue reading the stream</td>
</tr>
<tr>
<td style="text-align:left"><code>bool IsEndOfStream</code></td>
<td style="text-align:left">Whether this slice contained the end of the stream at the time it was created</td>
</tr>
<tr>
<td style="text-align:left"><code>ResolvedEvent[] Events</code></td>
<td style="text-align:left">An array of the events read. See the description of how to interpret a <a href="#resolvedevent">Resolved Events</a> below for more information on this</td>
</tr>
</tbody>
</table>
<h2 id="resolvedevent" tabindex="-1"><a class="header-anchor" href="#resolvedevent" aria-hidden="true">#</a> ResolvedEvent</h2>
<p>When you read events from a stream (or received over a subscription) you receive an instance of the <code>RecordedEvent</code> class packaged inside a <code>ResolvedEvent</code>.</p>
<p>EventStoreDB supports a special event type called 'Link Events'. Think of these events as pointers to an event in another stream.</p>
<p>In situations where the event you read is a link event, <code>ResolvedEvent</code> allows you to access both the link event itself, as well as the event it points to.</p>
<p>The members of this class are as follows:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Member</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>RecordedEvent Event</code></td>
<td style="text-align:left">The event, or the resolved link event if this <code>ResolvedEvent</code> is a link event</td>
</tr>
<tr>
<td style="text-align:left"><code>RecordedEvent Link</code></td>
<td style="text-align:left">The link event if this <code>ResolvedEvent</code> is a link event</td>
</tr>
<tr>
<td style="text-align:left"><code>RecordedEvent OriginalEvent</code></td>
<td style="text-align:left">Returns the event read or which triggered the subscription. If this <code>ResolvedEvent</code> represents a link event, the link will be the <code>OriginalEvent</code>, otherwise it will be the event</td>
</tr>
<tr>
<td style="text-align:left"><code>bool IsResolved</code></td>
<td style="text-align:left">Indicates whether this <code>ResolvedEvent</code> is a resolved link event</td>
</tr>
<tr>
<td style="text-align:left"><code>Position? OriginalPosition</code></td>
<td style="text-align:left">The logical position of the <code>OriginalEvent</code></td>
</tr>
<tr>
<td style="text-align:left"><code>string OriginalStreamId</code></td>
<td style="text-align:left">The stream name of the <code>OriginalEvent</code></td>
</tr>
<tr>
<td style="text-align:left"><code>long OriginalEventNumber</code></td>
<td style="text-align:left">The event number in the stream of the <code>OriginalEvent</code></td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>To ensure that the EventStoreDB server follows link events when reading, ensure you set the <code>ResolveLinkTos</code> parameter to <code>true</code> when calling read methods.</p>
</div>
<h2 id="recordedevent" tabindex="-1"><a class="header-anchor" href="#recordedevent" aria-hidden="true">#</a> RecordedEvent</h2>
<p><code>RecordedEvent</code> contains all the data about a specific event. Instances of this class are immutable, and expose the following members:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Member</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>string EventStreamId</code></td>
<td style="text-align:left">The Event Stream this event belongs to</td>
</tr>
<tr>
<td style="text-align:left"><code>Guid EventId</code></td>
<td style="text-align:left">The Unique Identifier representing this</td>
</tr>
<tr>
<td style="text-align:left"><code>long EventNumber</code></td>
<td style="text-align:left">The number of this event in the stream</td>
</tr>
<tr>
<td style="text-align:left"><code>string EventType</code></td>
<td style="text-align:left">The event type (supplied when appending)</td>
</tr>
<tr>
<td style="text-align:left"><code>byte[] Data</code></td>
<td style="text-align:left">A byte array representing the data of this event</td>
</tr>
<tr>
<td style="text-align:left"><code>byte[] Metadata</code></td>
<td style="text-align:left">A byte array representing the metadata associated with this event</td>
</tr>
<tr>
<td style="text-align:left"><code>bool IsJson</code></td>
<td style="text-align:left">Indicates whether the content was internally marked as JSON</td>
</tr>
<tr>
<td style="text-align:left"><code>DateTime Created</code></td>
<td style="text-align:left">A timestamp representing when this event was created.</td>
</tr>
<tr>
<td style="text-align:left"><code>long CreatedEpoch</code></td>
<td style="text-align:left">A long representing the milliseconds since the epoch when the was created.</td>
</tr>
</tbody>
</table>
</template>
