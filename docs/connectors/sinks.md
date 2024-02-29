

::: tip
Sink configuration will likely change in future versions.
:::


# Console Sink 

The console sink just writes to the console of whichever host the connector is running in.

Here is sample JSON to create a Console Sink connector:

```json
    {
      "Sink": "console://"
    }
```

# HTTP Sink <span id="http_sink"></span>

The HTTP Sink posts events to specified endpoints and delivers event metadata as HTTP headers.

Here is sample JSON to create an HTTP Sink connector:

```json
    {
      "Sink": "https://enkb1keveb5r.x.pipedream.net"
    }
```
