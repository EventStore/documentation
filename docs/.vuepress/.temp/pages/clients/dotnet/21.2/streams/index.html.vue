<template><h1 id="creating-and-appending-to-a-stream" tabindex="-1"><a class="header-anchor" href="#creating-and-appending-to-a-stream" aria-hidden="true">#</a> Creating and appending to a stream</h1>
<p>Sending events to a non-existing stream, implicitly creates the stream.</p>
<h2 id="appending-to-a-stream" tabindex="-1"><a class="header-anchor" href="#appending-to-a-stream" aria-hidden="true">#</a> Appending to a stream</h2>
<p>You can use the client API to append one or more events to a stream atomically. You do this by appending the events to the stream in one operation, or by using transactions.</p>
<p>It is possible to make an optimistic concurrency check during the append operation by specifying the version at which you expect the stream to be. Identical append operations are idempotent if the optimistic concurrency check is not disabled. You can find more information on optimistic concurrency and idempotence <RouterLink to="/clients/dotnet/21.2/appending/optimistic-concurrency-and-idempotence.html">here</RouterLink>.</p>
<p>The appending methods all use a type named <code>EventData</code> to represent an event to store.</p>
<h2 id="append-to-a-stream-in-a-single-write" tabindex="-1"><a class="header-anchor" href="#append-to-a-stream-in-a-single-write" aria-hidden="true">#</a> Append to a stream in a single write</h2>
<p>The <code>AppendToStreamAsync</code> method writes a single event or list of events atomically to the end of a stream, working in an asynchronous manner.</p>
<p>Method definitions:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>WriteResult<span class="token punctuation">></span></span> <span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">EventData<span class="token punctuation">[</span><span class="token punctuation">]</span></span> events<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>WriteResult<span class="token punctuation">></span></span> <span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">,</span> <span class="token class-name">UserCredentials</span> userCredentials<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">EventData<span class="token punctuation">[</span><span class="token punctuation">]</span></span> events<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>WriteResult<span class="token punctuation">></span></span> <span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">,</span> <span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> events<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Parameters:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>stream</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">The name of the stream to which to append.</td>
</tr>
<tr>
<td style="text-align:left"><code>expectedVersion</code></td>
<td style="text-align:left"><code>long</code></td>
<td style="text-align:left">The version at which you expect the stream to be in order that an optimistic concurrency check can be performed. This should either be a positive integer, or one of the constants <code>ExpectedVersion.NoStream</code>, <code>ExpectedVersion.EmptyStream</code>, or to disable the check, <code>ExpectedVersion.Any</code>. See <RouterLink to="/clients/dotnet/21.2/streams/optimistic-concurrency-and-idempotence.html">here</RouterLink> for a broader discussion of this.</td>
</tr>
<tr>
<td style="text-align:left"><code>events</code></td>
<td style="text-align:left"><code>IEnumerable&lt;EventData&gt;</code></td>
<td style="text-align:left">The events to append. There is also an overload of each method which takes the events as a <code>params</code> array. <code>events</code>'s length must not be greater than 4095.</td>
</tr>
<tr>
<td style="text-align:left"><code>userCredentials</code></td>
<td style="text-align:left"><code>UserCredentials</code></td>
<td style="text-align:left">Specify user on behalf whom write will be executed.</td>
</tr>
</tbody>
</table>
<p>Example single event in single write:</p>
<p>@[code](clients/dotnet/21.2/sample-code/DotNetClient/AppendStreamEvents.cs#AppendOneEvent</p>
<p>Example list of events in single write:</p>
<p>@[code](clients/dotnet/21.2/sample-code/DotNetClient/AppendStreamEvents.cs#CreateSampleData</p>
<h2 id="using-a-transaction-to-append-to-a-stream-across-multiple-writes" tabindex="-1"><a class="header-anchor" href="#using-a-transaction-to-append-to-a-stream-across-multiple-writes" aria-hidden="true">#</a> Using a transaction to append to a stream across multiple writes</h2>
<p>Method definitions on <code>EventStoreConnection</code>:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>EventStoreTransaction<span class="token punctuation">></span></span> <span class="token function">StartTransactionAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">EventStoreTransaction</span> <span class="token function">ContinueTransaction</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">long</span></span> transactionId<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Method definitions on <code>EventStoreTransaction</code>:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task</span> <span class="token function">WriteAsync</span><span class="token punctuation">(</span><span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> events<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task</span> <span class="token function">WriteAsync</span><span class="token punctuation">(</span><span class="token keyword">params</span> <span class="token class-name">EventData<span class="token punctuation">[</span><span class="token punctuation">]</span></span> events<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task</span> <span class="token function">CommitAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Example:</p>
<p>@[code](clients/dotnet/21.2/sample-code/DotNetClient/AppendStreamEvents.cs#CreateSampleData</p>
<p>events are appended in the following order: <code>3, 1, 2, 4, 5</code>.</p>
<h2 id="eventdata" tabindex="-1"><a class="header-anchor" href="#eventdata" aria-hidden="true">#</a> EventData</h2>
<p>The appending methods all use a type named <code>EventData</code> to represent an event to be stored. Instances of <code>EventData</code> are immutable.</p>
<p>EventStoreDB does not have any built-in serialisation, so the body and metadata for each event are represented in <code>EventData</code> as a <code>byte[]</code>.</p>
<p>The members on <code>EventData</code> are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Member</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>EventId</code></td>
<td style="text-align:left"><code>Guid</code></td>
<td style="text-align:left">A unique identifier representing this event. EventStoreDB uses this for idempotency if you append the same event twice you should use the same identifier both times.</td>
</tr>
<tr>
<td style="text-align:left"><code>Type</code></td>
<td style="text-align:left"><code>string</code></td>
<td style="text-align:left">The name of the event type. You can use this for pattern matching in projections, so should be a &quot;friendly&quot; name rather than a CLR type name, for example.</td>
</tr>
<tr>
<td style="text-align:left"><code>IsJson</code></td>
<td style="text-align:left"><code>bool</code></td>
<td style="text-align:left">If the data and metadata fields are serialized as JSON, you should set this to <code>true</code>. Setting this to <code>true</code> will cause the projections framework to attempt to deserialize the data and metadata later.</td>
</tr>
<tr>
<td style="text-align:left"><code>Data</code></td>
<td style="text-align:left"><code>byte[]</code></td>
<td style="text-align:left">The serialized data representing the event to be stored.</td>
</tr>
<tr>
<td style="text-align:left"><code>Metadata</code></td>
<td style="text-align:left"><code>byte[]</code></td>
<td style="text-align:left">The serialized data representing metadata about the event to be stored.</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>An event size (not only data and metadata) must not exceed 16,777,215 bytes (16MB-1B).</p>
</div>
</template>
