<template><h1 id="quick-tour" tabindex="-1"><a class="header-anchor" href="#quick-tour" aria-hidden="true">#</a> Quick tour</h1>
<p>This is a quick tour into the basic operations with EventStoreDB. We will look at creating a connection, appending an event and reading an event.</p>
<h2 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements" aria-hidden="true">#</a> Requirements</h2>
<p>These examples have the following requirements:</p>
<ul>
<li>At least <a href="https://dotnet.microsoft.com/download" target="_blank" rel="noopener noreferrer">.NET Core SDK 3.1<OutboundLink/></a></li>
<li><a href="https://www.docker.com/get-started" target="_blank" rel="noopener noreferrer">Docker<OutboundLink/></a></li>
<li>A reference to the <a href="https://www.nuget.org/packages/EventStore.Client/" target="_blank" rel="noopener noreferrer">EventStore.Client<OutboundLink/></a> NuGet package</li>
</ul>
<h2 id="run-the-server" tabindex="-1"><a class="header-anchor" href="#run-the-server" aria-hidden="true">#</a> Run the server</h2>
<p>To run the EventStoreDB, create a new file called <code>docker-compose.yml</code> and copy the following contents into it:</p>
<p>@[code](clients/dotnet/20.10/sample-code/docker-compose.yml</p>
<p>Then run the command.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose up
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>This will launch a new instance of the EventStoreDB server.</p>
<h2 id="connect-to-eventstoredb" tabindex="-1"><a class="header-anchor" href="#connect-to-eventstoredb" aria-hidden="true">#</a> Connect to EventStoreDB</h2>
<p><a href="https://www.nuget.org/packages/EventStore.Client" target="_blank" rel="noopener noreferrer">Install the .NET client API<OutboundLink/></a> package to your project using your preferred method.</p>
<p>And require it in your code:</p>
<p>@[code](clients/dotnet/20.10/sample-code/Program.cs#using</p>
<p>To use a client API, you use port <code>1113</code> and create a connection:</p>
<p>@[code](clients/dotnet/20.10/sample-code/GettingStarted/Connection.cs#connect</p>
<p>It will create a connection to EventStoreDB running locally in Docker container using the TCP protocol.</p>
<h2 id="appending-events" tabindex="-1"><a class="header-anchor" href="#appending-events" aria-hidden="true">#</a> Appending events</h2>
<p>The most basic operation is to append a single event to the database:</p>
<p>@[code](clients/dotnet/20.10/sample-code/GettingStarted/ConnectEventStore.cs#appendEvent</p>
<h2 id="reading-events" tabindex="-1"><a class="header-anchor" href="#reading-events" aria-hidden="true">#</a> Reading events</h2>
<p>After you wrote an event to the database, you can then read it back. Use the following method passing the stream name, the start point in the stream, the number of events to read and whether to follow links to the event data:</p>
<p>@[code](clients/dotnet/20.10/sample-code/Program.cs#ReadEvents</p>
</template>
