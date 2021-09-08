<template><h1 id="stream-metadata" tabindex="-1"><a class="header-anchor" href="#stream-metadata" aria-hidden="true">#</a> Stream metadata</h1>
<p>Every stream in EventStoreDB has metadata stream associated with it, prefixed by <code>$$</code>, so the metadata stream from a stream called <code>foo</code> is <code>$$foo</code>. Internally, the metadata includes information such as the ACL of the stream and the maximum count and age for the events in the stream. Client code can also put information into stream metadata for use with projections or through the client API.</p>
<p>This information is not part of the actual event but is metadata associated with the event. EventStoreDB stores stream metadata as JSON, and you can access it over the HTTP APIs.</p>
<h2 id="read-stream-metadata" tabindex="-1"><a class="header-anchor" href="#read-stream-metadata" aria-hidden="true">#</a> Read stream metadata</h2>
<p>To read stream metadata over the .NET API you can use methods found on the <code>EventStoreConnection</code>. You can use the <code>GetStreamMetadata</code> methods in two ways. The first is to return a fluent interface over the stream metadata, and the second is to return you the raw JSON of the stream metadata.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>StreamMetadataResult<span class="token punctuation">></span></span> <span class="token function">GetStreamMetadataAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>This returns a <code>StreamMetadataResult</code>. The fields on this result are:</p>
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
<td style="text-align:left">The name of the stream</td>
</tr>
<tr>
<td style="text-align:left"><code>bool IsStreamDeleted</code></td>
<td style="text-align:left"><code>true</code> is the stream is deleted, <code>false</code> otherwise.</td>
</tr>
<tr>
<td style="text-align:left"><code>long MetastreamVersion</code></td>
<td style="text-align:left">The version of the metastream format</td>
</tr>
<tr>
<td style="text-align:left"><code>StreamMetadata Metadata</code></td>
<td style="text-align:left">A <code>StreamMetadata</code> object representing the metadata JSON</td>
</tr>
</tbody>
</table>
<p>You can then access the <code>StreamMetadata</code> via the <code>StreamMetadata</code> object. It contains typed fields for well known stream metadata entries.</p>
<table>
<thead>
<tr>
<th style="text-align:left">Member</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>long? MaxAge</code></td>
<td style="text-align:left">The maximum age of events in the stream. Items older than this will be automatically removed.</td>
</tr>
<tr>
<td style="text-align:left"><code>long? MaxCount</code></td>
<td style="text-align:left">The maximum count of events in the stream. When you have more than count the oldest will be removed.</td>
</tr>
<tr>
<td style="text-align:left"><code>long? TruncateBefore</code></td>
<td style="text-align:left">When set says that items prior to event 'E' can be truncated and will be removed.</td>
</tr>
<tr>
<td style="text-align:left"><code>TimeSpan? CacheControl</code></td>
<td style="text-align:left">The head of a feed in the atom api is not cacheable. This allows you to specify a period of time you want it to be cacheable. Low numbers are best here (say 30-60 seconds) and introducing values here will introduce latency over the atom protocol if caching is occurring.</td>
</tr>
<tr>
<td style="text-align:left"><code>StreamAcl Acl</code></td>
<td style="text-align:left">The access control list for this stream.</td>
</tr>
</tbody>
</table>
<p>If instead you want to work with raw JSON you can use the raw methods for stream metadata.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>RawStreamMetadataResult<span class="token punctuation">></span></span> <span class="token function">GetStreamMetadataAsRawBytesAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>This returns a <code>RawStreamMetadataResult</code>. The fields on this result are:</p>
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
<td style="text-align:left">The name of the stream</td>
</tr>
<tr>
<td style="text-align:left"><code>bool IsStreamDeleted</code></td>
<td style="text-align:left">True is the stream is deleted, false otherwise.</td>
</tr>
<tr>
<td style="text-align:left"><code>long MetastreamVersion</code></td>
<td style="text-align:left">The version of the meta-stream (see <RouterLink to="/clients/dotnet/appending/optimistic-concurrency-and-idempotence.html">Expected Version</RouterLink>)</td>
</tr>
<tr>
<td style="text-align:left"><code>byte[] Metadata</code></td>
<td style="text-align:left">The raw data of the metadata JSON</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>If you enabled <RouterLink to="/clients/dotnet/connecting/">enabled security</RouterLink>, reading metadata may require that you pass credentials. By default, it is only allowed for admins though you can change this via default ACLs. If you do not pass credentials, and they are required you will receive an <code>AccessedDeniedException</code>.</p>
</div>
<h2 id="writing-metadata" tabindex="-1"><a class="header-anchor" href="#writing-metadata" aria-hidden="true">#</a> Writing metadata</h2>
<p>You can write metadata in both a typed and a raw mechanism. When writing it is generally easier to use the typed mechanism. Both writing mechanisms support an <code>expectedVersion</code> which works the same as on any stream and you can use to control concurrency, read <RouterLink to="/clients/dotnet/appending/optimistic-concurrency-and-idempotence.html">Expected Version</RouterLink> for further details.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>WriteResult<span class="token punctuation">></span></span> <span class="token function">SetStreamMetadataAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedMetastreamVersion<span class="token punctuation">,</span> 
    <span class="token class-name">StreamMetadata</span> metadata<span class="token punctuation">,</span> <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>The <code>StreamMetadata</code> passed above has a builder that you can access via the <code>StreamMetadata.Create()</code> method. The options available on the builder are:</p>
<table>
<thead>
<tr>
<th style="text-align:left">Method</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code>SetMaxCount(long count)</code></td>
<td style="text-align:left">Sets the maximum count of events in the stream.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetMaxAge(TimeSpan age)</code></td>
<td style="text-align:left">Sets the maximum age of events in the stream.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetTruncateBefore(long seq)</code></td>
<td style="text-align:left">Sets the event number from which previous events can be scavenged.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetCacheControl(TimeSpan cacheControl)</code></td>
<td style="text-align:left">The amount of time the stream head is cacheables.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetReadRoles(string[] roles)</code></td>
<td style="text-align:left">Sets the roles allowed to read the underlying stream.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetWriteRoles(string[] roles)</code></td>
<td style="text-align:left">Sets the roles allowed to write to the underlying stream.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetDeleteRoles(string[] roles)</code></td>
<td style="text-align:left">Sets the roles allowed to delete the underlying stream.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetMetadataReadRoles(string[] roles)</code></td>
<td style="text-align:left">Sets the roles allowed to read the metadata stream.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetMetadataWriteRoles(string[] roles)</code></td>
<td style="text-align:left">Sets the roles allowed to write the metadata stream. Be careful with this privilege as it gives all the privileges for a stream as that use can assign themselves any other privilege.</td>
</tr>
<tr>
<td style="text-align:left"><code>SetCustomMetadata(string key, string value)</code></td>
<td style="text-align:left">The SetCustomMetadata method and overloads allow the setting of arbitrary custom fields into the stream metadata.</td>
</tr>
</tbody>
</table>
<p>You can add user-specified metadata via the <code>SetCustomMetadata</code> overloads. Some examples of good uses of user-specified metadata are:</p>
<ul>
<li>which adapter is responsible for populating a stream.</li>
<li>which projection caused a stream to be created.</li>
<li>a correlation ID of some business process.</li>
</ul>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>WriteResult<span class="token punctuation">></span></span> <span class="token function">SetStreamMetadataAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedMetastreamVersion<span class="token punctuation">,</span> 
    <span class="token class-name"><span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span></span> metadata<span class="token punctuation">,</span> <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>This method will put the data that is in metadata as the stream metadata. Metadata in this case can be anything in a vector of bytes. The server only understands JSON. Read <RouterLink to="/clients/dotnet/5.0/security.html#access-control-lists">Access Control Lists</RouterLink> for more information on the format in JSON for access control lists.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>Writing metadata may require that you pass credentials if you have security enabled by default it is only allowed for admins though you can change this via default ACLs. If you do not pass credentials, and they are required you will receive an <code>AccessedDeniedException</code>.</p>
</div>
<h2 id="deleting-a-stream" tabindex="-1"><a class="header-anchor" href="#deleting-a-stream" aria-hidden="true">#</a> Deleting a stream</h2>
<p>Although you cannot delete individual events from a stream, you can delete the whole stream. It's also possible to delete a head portion of the stream by updating <a href="#stream-metadata">stream metadata</a>.</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>As EventStoreDB normally works in append-only manner, deleting streams or updating streams metadata would not physically delete anything from the database. Events will be purged from the database when the next scavenge operation runs. You should, therefore, ensure that your database is regularly scavenged.</p>
</div><h3 id="soft-delete" tabindex="-1"><a class="header-anchor" href="#soft-delete" aria-hidden="true">#</a> Soft delete</h3>
<p>By default, when you delete a stream, EventStoreDB soft-deletes it. You can recreate the stream by appending new events to it. If you try to read a soft deleted stream you receive an error response.</p>
<p>Technically, stream deletion is done by setting <code>$tb</code> stream metadata property to <code>long.MaxValue</code>. Note that if a deleted stream gets new events appended to it, event numbers for newly appended events don't start from zero as it would happen for a new stream. Although the stream has been deleted, EventStoreDB keeps the last known event number for all streams.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>DeleteResult<span class="token punctuation">></span></span> <span class="token function">DeleteStreamAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">,</span> 
    <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="hard-delete" tabindex="-1"><a class="header-anchor" href="#hard-delete" aria-hidden="true">#</a> Hard delete</h3>
<p>If you want to prevent new events to be appended to a deleted stream, you should use the hard-delete function. When a stream is hard-deleted, EventStoreDB will append a tombstone event to that stream. The tombstone event never gets scavenged, so the stream will forever be closed for appending new events.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>A hard delete is permanent and the stream is not removed during scavenge. If you hard delete a stream, you cannot recreate the stream.</p>
</div>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token return-type class-name">Task<span class="token punctuation">&lt;</span>DeleteResult<span class="token punctuation">></span></span> <span class="token function">DeleteStreamAsync</span><span class="token punctuation">(</span>
    <span class="token class-name"><span class="token keyword">string</span></span> stream<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">long</span></span> expectedVersion<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">bool</span></span> hardDelete<span class="token punctuation">,</span> 
    <span class="token class-name">UserCredentials</span> userCredentials <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="deleted-events-and-subscriptions" tabindex="-1"><a class="header-anchor" href="#deleted-events-and-subscriptions" aria-hidden="true">#</a> Deleted events and subscriptions</h3>
<p>As events don't get immediately removed from the database when a stream gets deleted or truncated, subscriptions might still receive deleted events. There are several possible scenarios for deleted events and catch-up subscriptions:</p>
<h4 id="subscription-to-all" tabindex="-1"><a class="header-anchor" href="#subscription-to-all" aria-hidden="true">#</a> Subscription to <code>$all</code></h4>
<p>A catch-up subscription to <code>$all</code> gets all the events from all the streams in the database. The normal scenario for such a subscription to be always in live mode, so deletions don't affect it as they only affect already processed events. However, when you set a catch-up subscription to read from a position in the past (or from the beginning), it will also receive deleted events, which haven't been scavenged. It is especially relevant for small databases, as the active chunk never gets scavenged, so all the deleted events can remain in the database for a long time. You can work around this issue by reading the stream metadata form received events when the subscription is in catch-up mode, so you can check if the stream has been deleted or not.</p>
<h4 id="subscription-to-stream-with-links" tabindex="-1"><a class="header-anchor" href="#subscription-to-stream-with-links" aria-hidden="true">#</a> Subscription to stream with links</h4>
<p>Default projections like <code>by-category</code> emit links to special streams, for example <code>$ce-Order</code>. Custom projections written in JavaScript can also emit links. Links are very small events, which point to linked events. Normally, when subscribing to a stream with links, you set the <code>ResolveLinkTos</code> subscription option to true as you want to get linked events. EventStoreDB will check if the original event has been deleted, but it will still deliver a link to the subscription. The <code>Event</code> property in this case will be <code>null</code>, so you can skip those events, but can still update the subscription checkpoint.</p>
<h4 id="subscription-to-a-normal-stream" tabindex="-1"><a class="header-anchor" href="#subscription-to-a-normal-stream" aria-hidden="true">#</a> Subscription to a normal stream</h4>
<p>Subscriptions to regular streams are unaffected by deleted events as it will never get them. However, if you hard-delete the stream for which you also have a subscription, the subscription will fail.</p>
</template>
