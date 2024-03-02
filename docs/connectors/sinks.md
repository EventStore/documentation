# Sinks

::: note
Sink configuration will likely change in future versions.
:::


## Console Sink 

The console sink just writes to the console of whichever host the connector is running in.

Here is how to create a console sink connector in JSON:

```json
  {
    "Sink": "console://"
  }
```

## HTTP Sink

The HTTP Sink posts events to specified endpoints and delivers event metadata as HTTP headers.

Here is how to create an HTTP sink connector in JSON:

```json
  {
    "Sink": "https://enkb1keveb5r.x.pipedream.net"
  }
```
