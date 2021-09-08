<template><h1 id="optimistic-concurrency-and-idempotence" tabindex="-1"><a class="header-anchor" href="#optimistic-concurrency-and-idempotence" aria-hidden="true">#</a> Optimistic concurrency and idempotence</h1>
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
<h3 id="if-you-specify-an-expected-version" tabindex="-1"><a class="header-anchor" href="#if-you-specify-an-expected-version" aria-hidden="true">#</a> If you specify an expected version</h3>
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
<h3 id="if-you-specify-expectedversion-any" tabindex="-1"><a class="header-anchor" href="#if-you-specify-expectedversion-any" aria-hidden="true">#</a> If you specify <code>ExpectedVersion.Any</code></h3>
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
