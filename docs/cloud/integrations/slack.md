# Slack

Slack is a business communications platform.

You can be notified of new events and notifications in your Slack workspace by creating a Slack App and setting up an integration with as described below.

## Setup

### Create a Slack App and Obtaining a Token Through Slack.com

Go to `https://api.slack.com/apps` and click "Create New App". Give it any name you wish and select the target workspace, then click "Create App".

On the next screen, click on "OAuth & Permissions". Under "Scopes", "Bot Token Scopes" and add a scope of "chat:write".

At the top of the page, click "Install to Workspace".

After installing the app, the "OAuth & Permissions" page will have a "Bot User OAuth Token" shown at the top. Copy it for the next step.

Finally, you'll need to invite the slack app user to the channel you want it to chat with. In Slack, go to the appropriate channel and write the following:

```
/invite @<name of bot>
```

### Create a new Integration with the Event Store Cloud

In the Event Store Cloud console, select an organization and then a project.

Once viewing a project, you should see the "Integrations" under the heading "Project" in the sidebar to the left. Click it.

Click "New Integration". Enter a name that will make it easier to find later, and then select Issues or Notifications. Then select the Sink "Slack".

Under "Configuration", next to "Channel ID", enter the channel you want the slack bot to communicate with (this must be the same as the place you invited the bot earlier). Remember to start the channel ID with a hash sign if appropriate.

In the box next to "Token" enter the OAuth token you copied from Slack's website.

Finally click "Create Integration."

Now back at the "Integrations" page, click on the row with recently created integration. In the bottom pane you should see a button marked "Test integration." Click it.

If your Slack App was created correctly you should see see a test message in the channel you selected.

If you get an error message double check that you copied the OAuth token and Channel ID into the integration correctly. You may also wish to review the previous step to ensure you gave the app appropriate permissions. You can edit the integration by clicking on the pencil icon in it's row.

If you see a slack message, you can rest you will receive events from the configured source when they occur.


## Details

If the source is "Notifications", a single message will be sent to the configure slack bot for each notification.

If the source is "Issues", a single message will be sent for each open issue and given a red bar. Open issues receive new events continuously, however the original slack message will only be updated to reflect the latest event every five minutes.

When the issue is closed, the original message will be changed to reflect this and the bar will be changed to green.

To send messages to multiple channels, create a two or more integrations in the Event Store Cloud using the same credentials.

