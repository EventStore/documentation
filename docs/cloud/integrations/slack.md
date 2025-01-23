---
order: 1
---

# Slack

Slack is a business communications platform.

You can be notified of new events and notifications in your Slack workspace by creating a Slack App and setting up an integration as described below.

## Setup Slack

Before adding a Slack integration, you need to create a Slack App and obtain a token through slack.com.

1. Go to `https://api.slack.com/apps` and click `Create New App`. Give it any name you wish and select the target workspace, then click `Create App`.
2. On the next screen, click on `OAuth & Permissions`. Under `Scopes`, `Bot Token Scopes` and add a scope of `chat:write`.
3. At the top of the page, click `Install to Workspace`.
4. After installing the app, the `OAuth & Permissions` page will have a `Bot User OAuth Token` shown at the top. Copy it for the next step.
5. Finally, you'll need to invite the Slack app user to the channel you want it to chat with. In Slack, go to the appropriate channel and write the following:

```
/invite @<name of bot>
```

## Add a new integration

1. In the Kurrent Cloud console, select an organization and then a project.
2. Once viewing a project, you should see `Integrations` under the heading `Project` in the sidebar to the left. Click it.
3. Click `New Integration`. Enter a name that will make it easier to find later, and then select Issues or Notifications. Then select the Sink `Slack` as in the screen below.
4. Under `Configuration`, next to `Channel ID`, enter the channel you want the slack bot to communicate with (this must be the same as the place you invited the bot earlier). Remember to start the channel ID with a hash sign if appropriate.
5. In the box next to `Token` enter the OAuth token you copied from Slack's website.
6. Finally, click "Create Integration."
7. Now back at the "Integrations" page, click on the row with recently created integration. In the bottom pane you should see a button marked `Test integration` as in the screen below. Click it.
8. If your Slack App was created correctly you should see a test message in the channel you selected.
9. If you get an error message double check that you copied the OAuth token and Channel ID into the integration correctly. You may also wish to review the previous step to ensure you gave the app appropriate permissions. You can edit the integration by clicking on the pencil icon in its row.
10. If you see a Slack message, you can rest you will receive events from the configured source when they occur.

## Details

If the source is `Notifications`, a single message will be sent to the configured slack bot for each notification.

If the source is `Issues`, a single message will be sent for each open issue and given a red bar. Open issues receive new events continuously, however the original Slack message will only be updated to reflect the latest event every five minutes.

When the issue is closed, the original message will be changed to reflect this, and the bar will be changed to green.

In order to send messages to multiple channels, create more integrations in Kurrent Cloud using the same credentials.
