# Install Connectors

The Connectors functionality is added to EventStoreDB or to the sidecar
via a plugin. In both cases it is the same plugin.

For the preview and likely for the initial release a package of
EventStoreDB will be created with the plugin pre-installed.

# Set up a an external system

One easy way to do this is to create a `public bin` by visiting
<https://public.requestbin.com/r> this is only suitable for test data.
It will present you with a unique endpoint such as
<https://enkb1keveb5r.x.pipedream.net>

# Set up a connector to connect to your new endpoint.

Download and install the connectors package and run event store.

Use curl or similar to issue the following `POST`. This will create a
connector called `my-connector`, configure it to send events to our
external system, and enable the connector.

``` powershell
$JSON = @'
{
  "Sink": "https://enkb1keveb5r.x.pipedream.net"
}
'@ -replace '"', '\"'

curl.exe -i                           `
  -H "Content-Type: application/json" `
  -u "admin:changeit"                 `
  -d $JSON                            `
  https://localhost:2113/connectors/my-connector
```

- Pass admin credentials

- The sink URL is where the sink will POST to. Adjust it to be your own
  URL created in the previous step.

# Create an event in the EventStoreDB UI

![](connectors:create-event.png)

# See the event appear in your browser

![](connectors:receive-event.png)
