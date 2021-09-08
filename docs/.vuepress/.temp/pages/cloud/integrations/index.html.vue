<template><h1 id="integrations" tabindex="-1"><a class="header-anchor" href="#integrations" aria-hidden="true">#</a> Integrations</h1>
<p>Event Store Cloud offers integrations between internal sources such as cluster health, <a href="#issues">issue</a> detection, <a href="#notifications">notifications</a> events and sinks which include external services such as Slack and OpsGenie.</p>
<h2 id="integration-sources" tabindex="-1"><a class="header-anchor" href="#integration-sources" aria-hidden="true">#</a> Integration sources</h2>
<p>&quot;Sources&quot; are driven by events or other mechanism inside the Event Store Cloud.</p>
<p>Currently, supported sources include:</p>
<ul>
<li>
<p><a href="#issues">Issues</a> - issues represent a potentially problematic condition detected inside a cluster or other Event Store Cloud resource. Issues consist of multiple &quot;open&quot; events and a single &quot;closed&quot; event and have different levels of severity.</p>
</li>
<li>
<p><a href="#notifications">Notifications</a> - notifications are noteworthy events detected within Event Store Cloud resources or the backend. For example notifications may be emitted when a cluster fails to provision.</p>
</li>
</ul>
<h3 id="issues" tabindex="-1"><a class="header-anchor" href="#issues" aria-hidden="true">#</a> Issues</h3>
<p>Issues represent possibly problematic states detected within the Event Store Cloud. Below, you can find several issue examples.</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>These examples are a subset of issues created by the system. The exact details of why issues are created are subject to change, but the cause of the issue and steps to resolve it will be clear in the messages associated with the related events.</p>
</div><h4 id="core-load-count" tabindex="-1"><a class="header-anchor" href="#core-load-count" aria-hidden="true">#</a> Core load count</h4>
<p>For each node of a cluster, the core load average is measured and divided by the number of physical cores on the node. If the result exceeds 2.0 an issue is opened. This issue is closed when the result consistently dips under 2.0.</p>
<p>If this happens consider increasing the size of the instance type for the cluster.</p>
<h4 id="disk-usage" tabindex="-1"><a class="header-anchor" href="#disk-usage" aria-hidden="true">#</a> Disk usage</h4>
<p>For each node of a cluster, the disk usage is measured several times a minute. If it starts to consistently exceed 80% an issue is opened. The issue is closed when the usage drops below 80%.</p>
<p>If this happens consider either removing data, running scavenge or increasing the disk size for the cluster.</p>
<h4 id="memory-usage" tabindex="-1"><a class="header-anchor" href="#memory-usage" aria-hidden="true">#</a> Memory usage</h4>
<p>For each node of a cluster, the memory usage is measured several times a minute. If it exceeds 90% an issue is opened. The issue is closed when memory usage consistently drops below 90%.</p>
<p>If this happens consider increasing the size of the instance type for the cluster.</p>
<h3 id="notifications" tabindex="-1"><a class="header-anchor" href="#notifications" aria-hidden="true">#</a> Notifications</h3>
<p>Notifications represent noteworthy events which occur within the Event Store Cloud. Below you can find notifications examples.</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>The following represent a subset of events which can lead to notifications.</p>
</div><h4 id="cluster-provisioning-failure" tabindex="-1"><a class="header-anchor" href="#cluster-provisioning-failure" aria-hidden="true">#</a> Cluster provisioning failure</h4>
<p>If, for some reason, the instances backing a cluster fail to provision the resource is marked as defunct by the API and a notification is sent with the message <code>Cluster instances failed to provision</code>.</p>
<h4 id="volume-expansion-failure" tabindex="-1"><a class="header-anchor" href="#volume-expansion-failure" aria-hidden="true">#</a> Volume expansion failure</h4>
<p>If the volume fails to expand while expanding an instances size a notification event is created with the message <code>Cluster volumes failed to provision</code>.</p>
<h2 id="integration-sinks" tabindex="-1"><a class="header-anchor" href="#integration-sinks" aria-hidden="true">#</a> Integration sinks</h2>
<p>&quot;Sinks&quot; are services outside the Event Store Cloud which events from sources can be forwarded to.</p>
<ul>
<li>
<p><a href="#opsgenie-sink">OpsGenie</a> - OpsGenie is an alerting and incidence response tool. It is possible to set up integrations to create OpsGenie alerts when cluster health issues are detected.</p>
</li>
<li>
<p><a href="#slack-sink">Slack</a> - Slack is a communication platform. It is possible to set up integrations which send Slack messages when issues and notifications are created or updated.</p>
</li>
</ul>
<h3 id="slack-sink" tabindex="-1"><a class="header-anchor" href="#slack-sink" aria-hidden="true">#</a> Slack sink</h3>
<p>Slack is a business communications platform.</p>
<p>You can be notified of new events and notifications in your Slack workspace by creating a Slack App and setting up an integration with as described below.</p>
<h4 id="setup-slack" tabindex="-1"><a class="header-anchor" href="#setup-slack" aria-hidden="true">#</a> Setup Slack</h4>
<p>Before adding a Slack integration, you need to create a Slack App and obtain a token through slack.com.</p>
<ol>
<li>Go to <code>https://api.slack.com/apps</code> and click <code>Create New App</code>. Give it any name you wish and select the target workspace, then click <code>Create App</code>.</li>
<li>On the next screen, click on <code>OAuth &amp; Permissions</code>. Under <code>Scopes</code>, <code>Bot Token Scopes</code> and add a scope of <code>chat:write</code>.</li>
<li>At the top of the page, click <code>Install to Workspace</code>.</li>
<li>After installing the app, the <code>OAuth &amp; Permissions</code> page will have a <code>Bot User OAuth Token</code> shown at the top. Copy it for the next step.</li>
<li>Finally, you'll need to invite the Slack app user to the channel you want it to chat with. In Slack, go to the appropriate channel and write the following:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/invite @&lt;name of bot>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h4 id="add-a-new-slack-integration" tabindex="-1"><a class="header-anchor" href="#add-a-new-slack-integration" aria-hidden="true">#</a> Add a new Slack integration</h4>
<ol>
<li>In the Event Store Cloud console, select an organization and then a project.</li>
<li>Once viewing a project, you should see <code>Integrations</code> under the heading <code>Project</code> in the sidebar to the left. Click it.</li>
<li>Click <code>New Integration</code>. Enter a name that will make it easier to find later, and then select Issues or Notifications. Then select the Sink <code>Slack</code> as in the screen below.</li>
</ol>
<Card><template #content><p><img src="@source/cloud/integrations/images/slack-form.png" alt="Set your OpsGenie API Key"></p>
</template></Card><ol start="4">
<li>Under <code>Configuration</code>, next to <code>Channel ID</code>, enter the channel you want the slack bot to communicate with (this must be the same as the place you invited the bot earlier). Remember to start the channel ID with a hash sign if appropriate.</li>
<li>In the box next to <code>Token</code> enter the OAuth token you copied from Slack's website.</li>
<li>Finally, click &quot;Create Integration.&quot;</li>
<li>Now back at the &quot;Integrations&quot; page, click on the row with recently created integration. In the bottom pane you should see a button marked <code>Test integration</code> as in the screen below. Click it.</li>
</ol>
<Card><template #content><p><img src="@source/cloud/integrations/images/slack-details.png" alt="Set your OpsGenie API Key"></p>
</template></Card><ol start="8">
<li>If your Slack App was created correctly you should see a test message in the channel you selected.</li>
<li>If you get an error message double check that you copied the OAuth token and Channel ID into the integration correctly. You may also wish to review the previous step to ensure you gave the app appropriate permissions. You can edit the integration by clicking on the pencil icon in its row.</li>
<li>If you see a Slack message, you can rest you will receive events from the configured source when they occur.</li>
</ol>
<h4 id="details" tabindex="-1"><a class="header-anchor" href="#details" aria-hidden="true">#</a> Details</h4>
<p>If the source is <code>Notifications</code>, a single message will be sent to the configured slack bot for each notification.</p>
<p>If the source is <code>Issues</code>, a single message will be sent for each open issue and given a red bar. Open issues receive new events continuously, however the original Slack message will only be updated to reflect the latest event every five minutes.</p>
<p>When the issue is closed, the original message will be changed to reflect this, and the bar will be changed to green.</p>
<p>In order to send messages to multiple channels, create more integrations in Event Store Cloud using the same credentials.</p>
<h3 id="opsgenie-sink" tabindex="-1"><a class="header-anchor" href="#opsgenie-sink" aria-hidden="true">#</a> OpsGenie sink</h3>
<p>EventStore Cloud platform is using <a href="https://www.atlassian.com/software/opsgenie" target="_blank" rel="noopener noreferrer">OpsGenie<OutboundLink/></a> for its alerting system. Our minimal configuration requires an API key. For simplicity’ sake, we recommend the API key to belong to a responder team.</p>
<p>Those instructions assume you are starting from scratch and don't have a team set up yet. We also assume that you are currently on the landing page after logging in <a href="https://www.atlassian.com/software/opsgenie" target="_blank" rel="noopener noreferrer">OpsGenie<OutboundLink/></a>.</p>
<h4 id="create-a-team-in-opsgenie" tabindex="-1"><a class="header-anchor" href="#create-a-team-in-opsgenie" aria-hidden="true">#</a> Create a team in OpsGenie</h4>
<p>Log in to your OpsGenie instance, then complete the following steps to set up a new team. Skip this step if you already have a team.</p>
<ol>
<li>Click on the <code>Teams</code> tab up top.</li>
<li>Click on the <code>Add team</code> top left.</li>
<li>A popup should show up. Enter your team info like its name and members. Keep in mind that the team will be considered as the responder team in EventStore Cloud.</li>
<li>Once you confirm your new team creation, you should be redirected to your new team dashboard page.</li>
</ol>
<h4 id="generate-the-team-api-key" tabindex="-1"><a class="header-anchor" href="#generate-the-team-api-key" aria-hidden="true">#</a> Generate the team API key</h4>
<p>Follow these steps to generate an API key for the team, which should be alerted when issues happen in Event Store Cloud.</p>
<ol>
<li>Click on the <code>Teams</code> tab up top.</li>
<li>Select your team in the team table.</li>
<li>By selecting your team, you should be redirected to your team dashboard.</li>
<li>Click on <code>Integrations</code>, located in the left sidebar.</li>
<li>Click on the <code>Add integration</code> button.</li>
<li>In the integration list, click on <code>API</code> then the <code>Add</code> button.</li>
<li>By default, the form should be already pre-filled. Make sure that <code>Read Access</code>, <code>Create and Update Access</code>, <code>Delete Access</code> and <code>Enabled</code> are checked.</li>
<li>Click on <code>Save Integration</code> at the bottom.</li>
<li>You can get your API key that should be located just below the <code>Name</code> property.</li>
</ol>
<h4 id="complete-the-integration" tabindex="-1"><a class="header-anchor" href="#complete-the-integration" aria-hidden="true">#</a> Complete the integration</h4>
<ol>
<li>In the Event Store Cloud console, select an organization and then a project.</li>
<li>Once viewing a project, you should see <code>Integrations</code> under the heading <code>Project</code> in the sidebar to the left. Click it.</li>
<li>Click <code>New Integration</code>. Enter a name that will make it easier to find later, and then select Issues or Notifications.</li>
<li>Select the OpsGenie sink and put the API Key as in the screen below:</li>
</ol>
<Card><template #content><p><img src="@source/cloud/integrations/images/opsgenie-apikey-form.png" alt="Set your OpsGenie API Key"></p>
</template></Card><p>and click on the <code>Create integration</code> button.</p>
<p>If all the details were entered correctly, the new integration should be set up. See the example on the screen below.</p>
<Card><template #content><p><img src="@source/cloud/integrations/images/opsgenie-details.png" alt="OpsGenie details"></p>
</template></Card></template>
