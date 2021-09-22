# Integrations

Event Store Cloud offers integrations between internal sources such as cluster health, [issue](#issues) detection, [notifications](#notifications) events and sinks which include external services such as Slack and OpsGenie.

## Integration sources

"Sources" are driven by events or other mechanism inside the Event Store Cloud.

Currently, supported sources include:

* [Issues](#issues) - issues represent a potentially problematic condition detected inside a cluster or other Event Store Cloud resource. Issues consist of multiple "open" events and a single "closed" event and have different levels of severity.

* [Notifications](#notifications) - notifications are noteworthy events detected within Event Store Cloud resources or the backend. For example notifications may be emitted when a cluster fails to provision.

### Issues

Issues represent possibly problematic states detected within the Event Store Cloud. Below, you can find several issue examples.

::: note
These examples are a subset of issues created by the system. The exact details of why issues are created are subject to change, but the cause of the issue and steps to resolve it will be clear in the messages associated with the related events.
:::

#### Core load count

For each node of a cluster, the core load average is measured and divided by the number of physical cores on the node. If the result exceeds 2.0 an issue is opened. This issue is closed when the result consistently dips under 2.0.

If this happens consider increasing the size of the instance type for the cluster.

#### Disk usage

For each node of a cluster, the disk usage is measured several times a minute. If it starts to consistently exceed 80% an issue is opened. The issue is closed when the usage drops below 80%.

If this happens consider either removing data, running scavenge or increasing the disk size for the cluster.

#### Memory usage

For each node of a cluster, the memory usage is measured several times a minute. If it exceeds 90% an issue is opened. The issue is closed when memory usage consistently drops below 90%.

If this happens consider increasing the size of the instance type for the cluster.

### Notifications

Notifications represent noteworthy events which occur within the Event Store Cloud. Below you can find notifications examples.

::: note
The following represent a subset of events which can lead to notifications.
:::

#### Cluster provisioning failure

If, for some reason, the instances backing a cluster fail to provision the resource is marked as defunct by the API and a notification is sent with the message `Cluster instances failed to provision`.

#### Volume expansion failure

If the volume fails to expand while expanding an instances size a notification event is created with the message `Cluster volumes failed to provision`.

## Integration sinks

"Sinks" are services outside the Event Store Cloud which events from sources can be forwarded to.

* [OpsGenie](#opsgenie-sink) - OpsGenie is an alerting and incidence response tool. It is possible to set up integrations to create OpsGenie alerts when cluster health issues are detected.

* [Slack](#slack-sink) - Slack is a communication platform. It is possible to set up integrations which send Slack messages when issues and notifications are created or updated.

### Slack sink

Slack is a business communications platform.

You can be notified of new events and notifications in your Slack workspace by creating a Slack App and setting up an integration with as described below.

#### Setup Slack

Before adding a Slack integration, you need to create a Slack App and obtain a token through slack.com.

1. Go to `https://api.slack.com/apps` and click `Create New App`. Give it any name you wish and select the target workspace, then click `Create App`.
2. On the next screen, click on `OAuth & Permissions`. Under `Scopes`, `Bot Token Scopes` and add a scope of `chat:write`.
3. At the top of the page, click `Install to Workspace`.
4. After installing the app, the `OAuth & Permissions` page will have a `Bot User OAuth Token` shown at the top. Copy it for the next step.
5. Finally, you'll need to invite the Slack app user to the channel you want it to chat with. In Slack, go to the appropriate channel and write the following:

```
/invite @<name of bot>
```

#### Add a new Slack integration

1. In the Event Store Cloud console, select an organization and then a project.
2. Once viewing a project, you should see `Integrations` under the heading `Project` in the sidebar to the left. Click it.
3. Click `New Integration`. Enter a name that will make it easier to find later, and then select Issues or Notifications. Then select the Sink `Slack` as in the screen below.

::: card
![Set your OpsGenie API Key](./images/slack-form.png)
:::

4. Under `Configuration`, next to `Channel ID`, enter the channel you want the slack bot to communicate with (this must be the same as the place you invited the bot earlier). Remember to start the channel ID with a hash sign if appropriate.
5. In the box next to `Token` enter the OAuth token you copied from Slack's website.
6. Finally, click "Create Integration."
7. Now back at the "Integrations" page, click on the row with recently created integration. In the bottom pane you should see a button marked `Test integration` as in the screen below. Click it.

::: card
![Set your OpsGenie API Key](./images/slack-details.png)
:::

8. If your Slack App was created correctly you should see a test message in the channel you selected.
9. If you get an error message double check that you copied the OAuth token and Channel ID into the integration correctly. You may also wish to review the previous step to ensure you gave the app appropriate permissions. You can edit the integration by clicking on the pencil icon in its row.
10. If you see a Slack message, you can rest you will receive events from the configured source when they occur.

#### Details

If the source is `Notifications`, a single message will be sent to the configured slack bot for each notification.

If the source is `Issues`, a single message will be sent for each open issue and given a red bar. Open issues receive new events continuously, however the original Slack message will only be updated to reflect the latest event every five minutes.

When the issue is closed, the original message will be changed to reflect this, and the bar will be changed to green.

In order to send messages to multiple channels, create more integrations in Event Store Cloud using the same credentials.

### OpsGenie sink

EventStore Cloud platform is using [OpsGenie] for its alerting system. Our minimal configuration requires an API key. For simplicity’ sake, we recommend the API key to belong to a responder team.

Those instructions assume you are starting from scratch and don't have a team set up yet. We also assume that you are currently on the landing page after logging in [OpsGenie].

#### Create a team in OpsGenie

Log in to your OpsGenie instance, then complete the following steps to set up a new team. Skip this step if you already have a team.

1. Click on the `Teams` tab up top.
2. Click on the `Add team` top left.
3. A popup should show up. Enter your team info like its name and members. Keep in mind that the team will be considered as the responder team in EventStore Cloud.
4. Once you confirm your new team creation, you should be redirected to your new team dashboard page.

#### Generate the team API key

Follow these steps to generate an API key for the team, which should be alerted when issues happen in Event Store Cloud.

1. Click on the `Teams` tab up top.
2. Select your team in the team table.
3. By selecting your team, you should be redirected to your team dashboard.
4. Click on `Integrations`, located in the left sidebar.
5. Click on the `Add integration` button.
6. In the integration list, click on `API` then the `Add` button.
7. By default, the form should be already pre-filled. Make sure that `Read Access`, `Create and Update Access`, `Delete Access` and `Enabled` are checked.
8. Click on `Save Integration` at the bottom.
9. You can get your API key that should be located just below the `Name` property.

#### Complete the integration

1. In the Event Store Cloud console, select an organization and then a project.
2. Once viewing a project, you should see `Integrations` under the heading `Project` in the sidebar to the left. Click it.
3. Click `New Integration`. Enter a name that will make it easier to find later, and then select Issues or Notifications.
4. Select the OpsGenie sink and put the API Key as in the screen below:

::: card
![Set your OpsGenie API Key](./images/opsgenie-apikey-form.png)
:::

and click on the `Create integration` button.

If all the details were entered correctly, the new integration should be set up. See the example on the screen below.

::: card
![OpsGenie details](./images/opsgenie-details.png)
:::

[OpsGenie]: https://www.atlassian.com/software/opsgenie
