<template><h1 id="connecting-to-eventstoredb" tabindex="-1"><a class="header-anchor" href="#connecting-to-eventstoredb" aria-hidden="true">#</a> Connecting to EventStoreDB</h1>
<p>Describe connecting to the single node and to the cluster.</p>
<p>Gossip seeds, using ip addresses and DNS.</p>
<p>The .NET Client API communicates with EventStoreDB over TCP, using length-prefixed serialised protocol buffers. The API allows for reading and appending operations, as well as for subscriptions to individual event streams or all events appended.</p>
<h2 id="eventstoreconnection" tabindex="-1"><a class="header-anchor" href="#eventstoreconnection" aria-hidden="true">#</a> EventStoreConnection</h2>
<p>The <code>EventStoreConnection</code> class maintains a full-duplex connection between the client and the EventStoreDB server. <code>EventStoreConnection</code> is thread-safe, and we recommend that you create one node per application.</p>
<p>EventStoreDB handles all connections asynchronously, returning either a <code>Task</code> or a <code>Task&lt;T&gt;</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>To get maximum performance from a non-blocking connection, we recommend you use it asynchronously.</p>
</div>
<h2 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start" aria-hidden="true">#</a> Quick start</h2>
<p>The code below shows how to connect to an EventStoreDB server, appends to a stream, and read back the events. For more detailed information, read the full pages for connecting to a server using <RouterLink to="/clients/dotnet/21.2/connecting/connection-string.html">connection string</RouterLink> and <RouterLink to="/clients/dotnet/21.2/connecting/settings.html">connection settings</RouterLink>, <RouterLink to="/clients/dotnet/21.2/reading/">reading events</RouterLink> and <RouterLink to="/clients/dotnet/21.2/appending/">appending to a stream</RouterLink></p>
<xode-group>
<xode-block title="JSON format event">
<p>@[code](clients/dotnet/21.2/sample-code/DotNetClient/QuickStartJsonFormat.cs</p>
</xode-block>
<xode-block title="Plain-text format event">
<p>@[code](clients/dotnet/21.2/sample-code/DotNetClient/QuickStartPlainFormat.cs</p>
</xode-block>
</xode-group>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>We recommended to use the JSON format for data and metadata.</p>
</div>
</template>
