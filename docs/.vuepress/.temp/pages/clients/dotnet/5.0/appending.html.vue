<template><h1 id="appending-events" tabindex="-1"><a class="header-anchor" href="#appending-events" aria-hidden="true">#</a> Appending events</h1>
<p>You can use the client API to append one or more events to a stream atomically. You do this by appending the events to the stream in one operation, or by using transactions.</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>Sending events to a non-existing stream, implicitly creates the stream.</p>
</div><p>It is possible to make an optimistic concurrency check during the append by specifying the version at which you expect the stream to be. Identical append operations are idempotent if the optimistic concurrency check is not disabled. You can find more information on optimistic concurrency and idempotence <RouterLink to="/clients/dotnet/5.0/optimistic-concurrency-and-idempotence.html">here</RouterLink>.</p>
<p>The writing methods all use a type named <code>EventData</code> to represent an event to store (described <a href="#eventdata">below</a>). The client library doesn't perform any serialization work, so you'd need to serialize both your event and its metadata to byte arrays. It allows you to use any serializer.</p>
<h2 id="append-events-to-a-stream" tabindex="-1"><a class="header-anchor" href="#append-events-to-a-stream" aria-hidden="true">#</a> Append events to a stream</h2>
<p>The <code>AppendToStreamAsync</code> method appends a single event or list of events atomically to the end of a stream, working in an asynchronous manner.</p>
<p>Method definitions:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token comment">// Append one or more events using default connection credentials</span>
<span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>WriteResult<span class="token punctuation">></span></span> <span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">EventData<span class="token punctuation">[</span><span class="token punctuation">]</span></span> events
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>WriteResult<span class="token punctuation">></span></span> <span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">,</span> <span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> events
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Append one or more events using explicit credentials</span>
<span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>WriteResult<span class="token punctuation">></span></span> <span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">,</span> <span class="token class-name">UserCredentials</span> userCredentials<span class="token punctuation">,</span> <span class="token keyword">params</span> <span class="token class-name">EventData<span class="token punctuation">[</span><span class="token punctuation">]</span></span> events
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Parameters:</p>
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
<td style="text-align:left">The name of the stream to which to append.</td>
</tr>
<tr>
<td style="text-align:left"><code>long expectedVersion</code></td>
<td style="text-align:left">The version at which you expect the stream to be in order that an optimistic concurrency check can be performed. This should either be a positive integer, or one of the constants <code>ExpectedVersion.NoStream</code>, <code>ExpectedVersion.EmptyStream</code>, or to disable the check, <code>ExpectedVersion.Any</code>. See <RouterLink to="/clients/dotnet/5.0/optimistic-concurrency-and-idempotence.html">here</RouterLink> for a broader discussion of this.</td>
</tr>
<tr>
<td style="text-align:left"><code>IEnumerable&lt;EventData&gt; events</code></td>
<td style="text-align:left">The events to append. There is also an overload of each method which takes the events as a <code>params</code> array. <code>events</code>'s length must not be greater than 4095.</td>
</tr>
<tr>
<td style="text-align:left"><code>userCredentials</code></td>
<td style="text-align:left">Specify user on behalf whom write will be executed.</td>
</tr>
</tbody>
</table>
<p>Example single event in single write:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> sampleObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> a <span class="token operator">=</span> <span class="token number">2</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> data <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>JsonConvert<span class="token punctuation">.</span><span class="token function">SerializeObject</span><span class="token punctuation">(</span>sampleObject<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> metadata <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token keyword">var</span></span> evt <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"event-type"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> data<span class="token punctuation">,</span> metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span><span class="token string">"newstream"</span><span class="token punctuation">,</span> ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> evt<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Example list of events in single write:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name">EventData</span> <span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> sampleObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> a <span class="token operator">=</span> i <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> data <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>JsonConvert<span class="token punctuation">.</span><span class="token function">SerializeObject</span><span class="token punctuation">(</span>sampleObject<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> metadata <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> eventPayload <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"event-type"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> data<span class="token punctuation">,</span> metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> eventPayload<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> conn <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Uri</span><span class="token punctuation">(</span><span class="token string">"tcp://admin:changeit@localhost:1113"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">ConnectAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span>
        <span class="token string">"newstream"</span><span class="token punctuation">,</span> 
        ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> 
        <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span> <span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="transactions" tabindex="-1"><a class="header-anchor" href="#transactions" aria-hidden="true">#</a> Transactions</h2>
<p>You might perform multiple writes to EventStoreDB as one transaction. However, the transaction can only append events to one stream. Transactions across multiple streams are not supported.</p>
<p>You can open a transaction by using the <code>StartTransactionAsync</code> method of the <code>IEventStoreConnection</code> instance. After you got the transaction instance, you can use it to append events. Finally, you can either commit or roll back the transaction.</p>
<p>A transaction can be long-lived and opening a transaction for a stream doesn't lock it. Another process can write to the same stream. In this case, your transaction might fail if you use idempotent writes with expected version.</p>
<p>Method definitions on <code>IEventStoreConnection</code>:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>EventStoreTransaction<span class="token punctuation">></span></span> <span class="token function">StartTransactionAsync</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token return-type class-name">EventStoreTransaction</span> <span class="token function">ContinueTransaction</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">long</span></span> transactionId<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>Method definitions on <code>EventStoreTransaction</code>:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task</span> <span class="token function">WriteAsync</span><span class="token punctuation">(</span><span class="token class-name">IEnumerable<span class="token punctuation">&lt;</span>EventData<span class="token punctuation">></span></span> events<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token return-type class-name">Task</span> <span class="token function">WriteAsync</span><span class="token punctuation">(</span><span class="token keyword">params</span> <span class="token class-name">EventData<span class="token punctuation">[</span><span class="token punctuation">]</span></span> events<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token return-type class-name">Task</span> <span class="token function">CommitAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Rollback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Example:</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token keyword">static</span> <span class="token return-type class-name">EventData</span> <span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">int</span></span> i<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> sampleObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token punctuation">{</span> a <span class="token operator">=</span> i <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> data <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span>JsonConvert<span class="token punctuation">.</span><span class="token function">SerializeObject</span><span class="token punctuation">(</span>sampleObject<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> metadata <span class="token operator">=</span> Encoding<span class="token punctuation">.</span>UTF8<span class="token punctuation">.</span><span class="token function">GetBytes</span><span class="token punctuation">(</span><span class="token string">"{}"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name"><span class="token keyword">var</span></span> eventPayload <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventData</span><span class="token punctuation">(</span>
        Guid<span class="token punctuation">.</span><span class="token function">NewGuid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> 
        <span class="token string">"event-type"</span><span class="token punctuation">,</span> 
        <span class="token boolean">true</span><span class="token punctuation">,</span> 
        data<span class="token punctuation">,</span> 
        metadata
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> eventPayload<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">async</span> <span class="token return-type class-name">Task</span> <span class="token function">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token class-name"><span class="token keyword">var</span></span> conn <span class="token operator">=</span> EventStoreConnection<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">Uri</span><span class="token punctuation">(</span><span class="token string">"tcp://admin:changeit@localhost:1113"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">ConnectAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">using</span> <span class="token class-name"><span class="token keyword">var</span></span> transaction <span class="token operator">=</span> 
        <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">StartTransactionAsync</span><span class="token punctuation">(</span><span class="token string">"newstream"</span><span class="token punctuation">,</span> ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">WriteAsync</span><span class="token punctuation">(</span><span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">WriteAsync</span><span class="token punctuation">(</span><span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> conn<span class="token punctuation">.</span><span class="token function">AppendToStreamAsync</span><span class="token punctuation">(</span><span class="token string">"newstream"</span><span class="token punctuation">,</span> ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> <span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">WriteAsync</span><span class="token punctuation">(</span><span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">WriteAsync</span><span class="token punctuation">(</span><span class="token function">CreateSample</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">await</span> transaction<span class="token punctuation">.</span><span class="token function">CommitAsync</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><p>Because the event <code>3</code> is appended outside of the transaction scope and before the transaction commits, it appears first in the stream. The second atomic write to the database is the whole transaction with events <code>1</code>, <code>2</code>, <code>4</code> and <code>5</code>.</p>
<p>The stream will therefore contain events in the following order: <code>3, 1, 2, 4, 5</code>.</p>
<h2 id="eventdata" tabindex="-1"><a class="header-anchor" href="#eventdata" aria-hidden="true">#</a> EventData</h2>
<p>The writing methods all use a type named <code>EventData</code> to represent an event to be stored. Instances of <code>EventData</code> are immutable.</p>
<p>Event Store does not have any built-in serialisation, so the body and metadata for each event are represented in <code>EventData</code> as a <code>byte[]</code>.</p>
<p>The members on <code>EventData</code> are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Member</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>Guid EventId</code></td>
<td style="text-align:left">A unique identifier representing this event. Event Store uses this for idempotency if you write the same event twice you should use the same identifier both times.</td>
</tr>
<tr>
<td style="text-align:left"><code>string Type</code></td>
<td style="text-align:left">The name of the event type. You can use this for pattern matching in projections, so should be a &quot;friendly&quot; name rather than a CLR type name, for example.</td>
</tr>
<tr>
<td style="text-align:left"><code>bool IsJson</code></td>
<td style="text-align:left">If the data and metadata fields are serialized as JSON, you should set this to <code>true</code>. Setting this to <code>true</code> will cause the projections framework to attempt to deserialize the data and metadata later.</td>
</tr>
<tr>
<td style="text-align:left"><code>byte[] Data</code></td>
<td style="text-align:left">The serialized data representing the event to be stored.</td>
</tr>
<tr>
<td style="text-align:left"><code>byte[] Metadata</code></td>
<td style="text-align:left">The serialized data representing metadata about the event to be stored.</td>
</tr>
</tbody>
</table>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>An event size (not only data and metadata) must not exceed 16,777,215 bytes (16MB-1B).</p>
</div><h2 id="optimistic-concurrency" tabindex="-1"><a class="header-anchor" href="#optimistic-concurrency" aria-hidden="true">#</a> Optimistic concurrency</h2>
<p>Append operation supports an <a href="https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/optimistic-concurrency" target="_blank" rel="noopener noreferrer">optimistic concurrency<OutboundLink/></a> check on the version of the stream to which events are appended.</p>
<p>The .NET API has constants which you can use to represent certain conditions:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Parameter</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>ExpectedVersion.Any</code></td>
<td style="text-align:left">Disables the optimistic concurrency check.</td>
</tr>
<tr>
<td style="text-align:left"><code>ExpectedVersion.NoStream</code></td>
<td style="text-align:left">Specifies the expectation that target stream does not yet exist.</td>
</tr>
<tr>
<td style="text-align:left"><code>ExpectedVersion.EmptyStream</code></td>
<td style="text-align:left">Specifies the expectation that the target stream has been explicitly created, but does not yet have any user events appended in it.</td>
</tr>
<tr>
<td style="text-align:left"><code>ExpectedVersion.StreamExists</code></td>
<td style="text-align:left">Specifies the expectation that the target stream or its metadata stream has been created, but does not expect the stream to be at a specific event number.</td>
</tr>
<tr>
<td style="text-align:left"><code>Any other integer value</code></td>
<td style="text-align:left">The event number that you expect the stream to currently be at.</td>
</tr>
</tbody>
</table>
<p>If the optimistic concurrency check fails during appending, a <code>WrongExpectedVersionException</code> is thrown.</p>
<h2 id="idempotence" tabindex="-1"><a class="header-anchor" href="#idempotence" aria-hidden="true">#</a> Idempotence</h2>
<p>If identical append operations occur, EventStoreDB treats them in a way which makes it idempotent. If a append is treated in this manner, EventStoreDB acknowledges it as successful, but duplicate events are not appended. The idempotence check is based on the <code>EventId</code> and <code>stream</code>. It is possible to reuse an <code>EventId</code> across streams whilst maintaining idempotence.</p>
<p>The level of idempotence guarantee depends on whether the optimistic concurrency check is not disabled during appending (by passing <code>ExpectedVersion.Any</code> as the <code>expectedVersion</code> for the append).</p>
<h3 id="with-expected-version" tabindex="-1"><a class="header-anchor" href="#with-expected-version" aria-hidden="true">#</a> With expected version</h3>
<p>The specified <code>expectedVersion</code> is compared to the <code>currentVersion</code> of the stream. This will yield one of three results:</p>
<ul>
<li>
<p><strong><code>expectedVersion &gt; currentVersion</code></strong> - a <code>WrongExpectedVersionException</code> is thrown.</p>
</li>
<li>
<p><strong><code>expectedVersion == currentVersion</code></strong> - events are appended and acknowledged.</p>
</li>
<li>
<p><strong><code>expectedVersion &lt; currentVersion</code></strong> - the <code>EventId</code> of each event in the stream starting from <code>expectedVersion</code> are compared to those in the append operation. This can yield one of three further results:</p>
<ul>
<li>
<p><strong>All events have been committed already</strong> - the append operation is acknowledged as successful, but no duplicate events appended.</p>
</li>
<li>
<p><strong>None of the events were previously committed</strong> - a <code>WrongExpectedVersionException</code> is thrown.</p>
</li>
<li>
<p><strong>Some of the events were previously committed</strong> - this is considered a bad request. If the append operation contains the same events as a previous request, either all or none of the events should have been previously committed. This surfaces as a <code>WrongExpectedVersionException</code>.</p>
</li>
</ul>
</li>
</ul>
<h3 id="with-expectedversion-any" tabindex="-1"><a class="header-anchor" href="#with-expectedversion-any" aria-hidden="true">#</a> With ExpectedVersion.Any</h3>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Idempotence is <strong>not</strong> guaranteed if you use <code>ExpectedVersion.Any</code>. The chance of a duplicate event is small, but is possible.</p>
</div>
<p>The idempotence check will yield one of three results:</p>
<ul>
<li>
<p><strong>All events have been committed already</strong> - the append operation is acknowledged as successful, but no duplicate events appended.</p>
</li>
<li>
<p><strong>None of the events were previously committed</strong> - the events are appended and the append operation acknowledged.</p>
</li>
<li>
<p><strong>Some of the events were previously committed</strong> - this is considered a bad request. If the append operation contains the same events as a previous request, either all or none of the events should have been previously committed. This currently surfaces as a <code>WrongExpectedVersionException</code>.</p>
</li>
</ul>
</template>
