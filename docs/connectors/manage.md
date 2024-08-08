# Manage Connectors

::: note
The Connector management API is idempotent.
:::

## Create

Create a connector by sending a `POST` request to `connectors/create`.

:::: code-group
::: code-group-item Powershell

```powershell
$JSON = @"
{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
  "Name": "HttpSink",
  "Settings": {
    "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
    "Url": "https://enkb1keveb5r.x.pipedream.net"
  }
}
"@

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -d $JSON `
  http://localhost:2113/v1/connectors/create
```

:::
::: code-group-item Bash

```bash
JSON='{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
  "Name": "HttpSink",
  "Settings": {
    "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
    "Url": "https://enkb1keveb5r.x.pipedream.net"
  }
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON" \
  http://localhost:2113/v1/connectors/create
```

:::
::::

::: tip
Replace `https://enkb1keveb5r.x.pipedream.net` with your own sink URL.
:::

| Parameter                                 | Description                                                                                                                                                                  |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Url`                                     | The URL where the sink will POST to.                                                                                                                                         |
| `Method`                                  | The HTTP method to use for the request. The default value is `POST`                                                                                                          |
| `Resilience:Enabled`                      | Enables or disables the retry mechanism. Default is `true`.                                                                                                                  |
| `Resilience:RetryOnHttpCodes`             | Specifies the HTTP status codes that trigger a retry. Supports specific codes (e.g., `404`, `500`) and ranges (e.g., `5xx`). By default, retries on any non-2xx status code. |
| `Resilience:MaxRetries`                   | The maximum number of retry attempts. A value of `-1` indicates unlimited retries.                                                                                           |
| `Resilience:FirstDelayBound:UpperLimitMs` | The maximum delay in milliseconds between retries for the first retry delay bound.                                                                                           |
| `Resilience:FirstDelayBound:DelayMs`      | The initial delay in milliseconds between retries for the first retry delay bound.                                                                                           |

#### Filter Options

The filter types available include Stream Filters, Event Type Filters, and
JsonPath Filters. Stream Filters can select events based on stream IDs, either
by specifying a prefix or using regular expressions. Similarly, Event Type
Filters allow selection based on event types, also using prefixes or regular
expressions. Additionally, JsonPath Filters provide a way to filter events using
[JsonPath](https://goessner.net/articles/JsonPath/) expressions applied to the
event content.

**Example Filters:**

1. **Stream ID Prefix Filter**

   ```json
   {
     "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
     "Name": "StreamIdPrefixFilter",
     "Settings": {
       "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
       "Subscription:ConsumeFilter:Scope": "Stream",
       "Subscription:ConsumeFilter:Expression": "prefix_"
     }
   }
   ```

2. **Event Type Regex Filter**

   ```json
   {
     "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
     "Name": "EventTypeRegexFilter",
     "Settings": {
       "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
       "Subscription:ConsumeFilter:Scope": "Record",
       "Subscription:ConsumeFilter:Expression": "^eventType.*"
     }
   }
   ```

3. **JsonPath Filter**
   ```json
   {
     "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
     "Name": "JsonPathFilter",
     "Settings": {
       "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
       "Url": "https://example-url.com",
       "Subscription:ConsumeFilter:Scope": "Record",
       "Subscription:ConsumeFilter:Expression": "$[?($.data.testField=='testValue')]"
     }
   }
   ```

| Parameter     | Description                                              |
| :------------ | :------------------------------------------------------- |
| `ConnectorId` | The unique identifier of the connector to be created.    |
| `Name`        | The name of the connector.                               |
| `Settings`    | A JSON object containing the settings for the connector. |

<!-- ## List

List all connectors by sending a `GET` request to `connectors/list`.

:::: code-group
::: code-group-item Powershell
```powershell
curl.exe -i -u "admin:changeit" https://localhost:2113/connectors/list
```
:::
::: code-group-item Bash
```bash
curl -i -u "admin:changeit" https://localhost:2113/connectors/list
```
:::
:::: -->

## Start

Start a connector by sending a `POST` request to `connectors/start`.

:::: code-group
::: code-group-item Powershell

```powershell
curl.exe -i -u "admin:changeit" -X POST `
    -H "Content-Type: application/json" `
    -d '{"ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567"}' `
    https://localhost:2113/v1/connectors/start
```

:::
::: code-group-item Bash

```bash
curl -i -u "admin:changeit" -X POST \
    -H "Content-Type: application/json" \
    -d '{"ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567"}' \
    https://localhost:2113/v1/connectors/start
```

:::
::::

| Parameter     | Description                                           |
| :------------ | :---------------------------------------------------- |
| `ConnectorId` | The unique identifier of the connector to be started. |

## Stop

Disable a connector by sending a `POST` request to `/connectors/stop`. The system will not activate disabled connectors.

:::: code-group
::: code-group-item Powershell

```powershell
curl.exe -i -u "admin:changeit" -X POST `
    -H "Content-Type: application/json" `
    -d '{"ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567"}' `
    https://localhost:2113/v1/connectors/stop
```

:::
::: code-group-item Bash

```bash
curl -i -u "admin:changeit" -X POST \
    -H "Content-Type: application/json" \
    -d '{"ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567"}' \
    https://localhost:2113/v1/connectors/stop
```

:::
::::

| Parameter     | Description                                           |
| :------------ | :---------------------------------------------------- |
| `ConnectorId` | The unique identifier of the connector to be stopped. |

## Reset

Reset a connector's checkpoint by sending a `POST` request to `/connectors/reset`.

With an empty payload the connector will be reset to the beginning.

:::: code-group
::: code-group-item Powershell

```powershell
curl.exe -i -u "admin:changeit" -X POST `
    -H "Content-Type: application/json" `
    -d '{"ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567"}' `
    https://localhost:2113/v1/connectors/reset
```

:::
::: code-group-item Bash

```bash
curl -i -u "admin:changeit" -X POST \
    -H "Content-Type: application/json" \
    -d '{"ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567"}' \
    https://localhost:2113/v1/connectors/reset
```

:::
::::

When the `ResetConnector` command is issued, the connector will be stopped if it is
running and will be reset to the specified `LogPosition` if provided. If no
`LogPosition` is provided, the connector will reset to the beginning.

:::: code-group
::: code-group-item Powershell

```powershell
$JSON = @"
{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
  "LogPosition": 123456789
}
"@

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -u admin:changeit `
  -d $JSON `
  https://localhost:2113/v1/connectors/reset
```

:::
::: code-group-item Bash

```bash
JSON='{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
  "LogPosition": 123456789
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -u admin:changeit \
  -d "$JSON" \
  https://localhost:2113/v1/connectors/reset
```

:::
::::

| Parameter     | Description                                            |
| :------------ | :----------------------------------------------------- |
| `ConnectorId` | The unique identifier of the connector to be reset.    |
| `LogPosition` | The log position to reset the connector to (optional). |

## Delete

Delete a connector by sending a `DELETE` request to `/connectors`.

:::: code-group
::: code-group-item Powershell

```powershell
$JSON = @"
{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567"
}
"@

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -u admin:changeit `
  -d $JSON `
  https://localhost:2113/v1/connectors/delete
```

:::
::: code-group-item Bash

```bash
JSON='{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567"
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -u admin:changeit \
  -d "$JSON" \
  https://localhost:2113/v1/connectors/delete
```

:::
::::

| Parameter     | Description                                           |
| :------------ | :---------------------------------------------------- |
| `ConnectorId` | The unique identifier of the connector to be deleted. |

## Rename

To rename a connector, send a `POST` request to `/connectors/rename`.

:::: code-group
::: code-group-item Powershell

```powershell
$JSON = @"
{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
  "Name": "NewConnectorName"
}
"@

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -d $JSON `
  http://localhost:2113/v1/connectors/rename
```

:::
::: code-group-item Bash

```bash
JSON='{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
  "Name": "NewConnectorName"
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -d "$JSON" \
  http://localhost:2113/v1/connectors/rename
```

:::
::::

| Parameter     | Description                                           |
| :------------ | :---------------------------------------------------- |
| `ConnectorId` | The unique identifier of the connector to be renamed. |
| `Name`        | The new name for the connector.                       |

## Reconfigure

Reconfigure an existing connector by sending a `POST` request to `/connectors/reconfigure`.

:::: code-group
::: code-group-item Powershell

```powershell
$JSON = @"
{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
  "Settings": {
    "Url": "https://new-endpoint.example.com",
    "Method": "PUT"
  }
}
"@

curl.exe -X POST `
  -H "Content-Type: application/json" `
  -u admin:changeit `
  -d $JSON `
  https://localhost:2113/v1/connectors/reconfigure
```

:::
::: code-group-item Bash

```bash
JSON='{
  "ConnectorId": "bcaa3afd-5031-4efb-8ab0-3815a8f03567",
  "Settings": {
    "Url": "https://new-endpoint.example.com",
    "Method": "PUT"
  }
}'

curl -X POST \
  -H "Content-Type: application/json" \
  -u admin:changeit \
  -d "$JSON" \
  https://localhost:2113/v1/connectors/reconfigure
```

:::
::::

| Parameter     | Description                                                  |
| :------------ | :----------------------------------------------------------- |
| `ConnectorId` | The unique identifier of the connector to be reconfigured.   |
| `Settings`    | A JSON object containing the new settings for the connector. |

::: note
The connector must be stopped before reconfiguring. If the connector is running, the reconfigure operation will fail.
:::
