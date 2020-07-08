# Must die

This getting started guide shows you how to get started with Event Store using the Atom publishing protocol as the primary interface. 

::: warning
The described is for development and evaluation of Event Store. It does not describe a production setup. The HTTP examples use cURL, but you can read Atom feeds with a wide variety of applications and languages.
:::

This first step covers installation and running Event Store, and writing your first event.

## Interacting with an Event Store server

There are three ways to interact with Event Store:

1.  [With the Admin UI](../admin-ui.md)
2.  [With the HTTP API](../../http-api/README.md)
3.  With a [Client API](../which-api-sdk.md).

## Discover Event Store via Admin UI

Event Store ships with GUI called Admin UI, which allows browsing statistics, streams and events manipulation, user management and more. Admin UI is visible under `2113` port, navigate to <http://127.0.0.1:2113/> in your web browser to see it.

::: tip
The default username is `admin` and password is `changeit`.
:::

::: el-card :body-style="{ padding: '0px' }" 
![The Admin UI Dashboard](../images/es-web-admin-dashboard.png)
:::

## First call to HTTP API

Event Store expose HTTP API that allows cross-platform integration. API is exposed under the same port `2113` as Admin UI. For example `curl -i http://127.0.0.1:2113/stats` for the HTTP API.

## Use AdminUI to write and read events

Event Store operates on a concept of Event Streams, and the first operation we look at is how to write to a stream. If you are Event Sourcing a domain model, a stream equates to an aggregate function. Event Store can handle hundreds of millions of streams, so create as many as you need.

If you post to a stream that doesn't exist, Event Store creates it before adding the events.

### Writing events

You can write events using the Admin UI by clicking the _Stream Browser_ tab, the _Add Event_ button, filling in the form with relevant values and clicking the _Add_ button at the bottom of the page.

::: el-card :body-style="{ padding: '0px' }" 
![Creating an event with the Admin UI interface](./images/getting-started-add-event.gif)
:::

Open a text editor, copy and paste the following event definition, and save it as _event.json_.

<<< @/docs/server/5.0.9/http-api/sample-code/event.json

### Reading events

The feed has a single item inside of it, the one you posted. You can see details of the event in the _Stream Browser_ tab in the Admin UI by selecting a stream to see its events, and then selecting an event.

::: el-card :body-style="{ padding: '0px' }" 
![The Admin UI Dashboard](../images/es-web-admin-stream-browser.png)
:::
