# Logger Sink Connector

## Overview

The logger sink logs a message about the connector and record details and can be used for testing purposes.

## Usage

:::: code-group
::: code-group-item Powershell

```powershell
$JSON = @"
{
  "settings": {
    "InstanceTypeName": "EventStore.Connectors.Testing.LoggerSink",
    "Subscription:Filter:Scope": "Stream",
    "Subscription:Filter:Expression": "some-stream",
    "Subscription:InitialPosition": "Earliest"
  }
}
"@ `

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -d $JSON `
  http://localhost:2113/connectors/logger-sink-connector
```

:::
::: code-group-item Bash

```bash
JSON='{
  "settings": {
    "InstanceTypeName": "EventStore.Connectors.Testing.LoggerSink",
    "Subscription:Filter:Scope": "Stream",
    "Subscription:Filter:Expression": "some-stream",
    "Subscription:InitialPosition": "Earliest"
  }
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON" \
  http://localhost:2113/connectors/logger-sink-connector
```

:::
::::