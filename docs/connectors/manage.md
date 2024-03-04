# Manage Connectors

::: note
The Connector management API is idempotent.
:::

## Create

Create a connector by sending a `POST` request to `connectors/<connector-name>`.

:::: code-group
::: code-group-item Powershell
```powershell
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
:::
::: code-group-item Bash
```bash
export json="{
  \"Sink\": \"https://enkb1keveb5r.x.pipedream.net\"
}"

curl -i \
  -H "Content-Type: application/json" \
  -u "admin:changeit" \
  -d $json \
  https://localhost:2113/connectors/my-connector
```
:::
::::

::: tip
Replace `https://enkb1keveb5r.x.pipedream.net` with your own sink URL.
:::

| Parameter            | Description                                                                                                                                                                                                                                          |
|:---------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Sink`               | The URL where the sink will POST to.                                                                                                                                                                                                                 |
| `Filter`             | The JSONPath filter.                                                                                                                                                                                                                                 |
| `Affinity`           | The node type that the connector would like to run on. It can be `Leader`, `Follower` or `ReadOnlyReplica`. The default is `Leader`.                                                                                                                 |
| `CheckpointInterval` | How frequently to store the checkpoint, this is currently measured in events.                                                                                                                                                                        |
| `Enable`             | Set to `false` to create a connector without enabling it.                                                                                                                                                                                            |
#### Filter examples

Filtering is done using [JSONPath](https://goessner.net/articles/JsonPath/). The filter is used to select events from the stream. If the filter is not provided, all events will be selected.

The following objects are accessible to the filter:
* System metadata via `$`, for example `$.eventType` or `$.stream`
* Event data via `$.data`, for example `$.data.name` or `$.data.age`
* Event metadata via `$.metadata`, for example `$.metadata.user` or `$.metadata.correlationId`

The following are examples of filters:
```json
{
  "Sink": "console://", 
  "Filter": "$[?($.eventType=='someEventType')]"
}
```
```json
{
  "Sink": "console://", 
  "Filter": "$[?($.data.testField=='testValue')]" 
}
```

## List

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
::::

## Enable

Enable a connector by sending a `POST` request to `connectors/<connector-name>/enable`.

:::: code-group
::: code-group-item Powershell
``` powershell
curl.exe -i -u "admin:changeit" -X POST `
    https://localhost:2113/connectors/my-connector/enable
```
:::
::: code-group-item Bash
``` bash
curl -i -u "admin:changeit" -X POST \
    https://localhost:2113/connectors/my-connector/enable
```
:::
::::

## Disable

Disable a connector by sending a `POST` request to `connectors/<connector-name>/disable`. The system will not activate disabled connectors.

:::: code-group
::: code-group-item Powershell
``` powershell
curl.exe -i -u "admin:changeit" -X POST `
    https://localhost:2113/connectors/my-connector/disable
```
:::
::: code-group-item Bash
``` bash
curl -i -u "admin:changeit" -X POST \
    https://localhost:2113/connectors/my-connector/disable
```
:::
::::

## Reset

Reset a connector's checkpoint by sending a `POST` request to `connectors/<connector-name>/reset`.

With an empty payload the connector will be reset to the beginning.

:::: code-group
::: code-group-item Powershell
``` powershell
curl.exe -i                           `
  -H "Content-Type: application/json" `
  -u "admin:changeit"                 `
  -d "{}"                             `
  https://localhost:2113/connectors/my-connector/reset
```
:::
::: code-group-item Bash
``` bash
curl -i \
  -H "Content-Type: application/json" \
  -u "admin:changeit" \
  -d "{}" \
  https://localhost:2113/connectors/my-connector/reset
```
:::
::::

`CommitPosition` and `PreparePosition` can be specified to reset a
connector to a particular position. This position is treated as the new
checkpoint i.e. the position of a successfully processed event. The
connector will resume processing starting with the event *after* this.

:::: code-group
::: code-group-item Powershell
``` powershell
$JSON = @'
{
  "CommitPosition": 0,
  "PreparePosition": 0
}
'@ -replace '"', '\"'

curl.exe -i                           `
  -H "Content-Type: application/json" `
  -u "admin:changeit"                 `
  -d $JSON                            `
  https://localhost:2113/connectors/my-connector/reset
```
:::
::: code-group-item Bash
``` bash
export json="{
  \"CommitPosition\": 0,
  \"PreparePosition\": 0
}"

curl -i \
  -H "Content-Type: application/json" \
  -u "admin:changeit" \
  -d $json \
  https://localhost:2113/connectors/my-connector/reset
```
:::
::::

## Delete

Delete a connector by sending a `DELETE` request to `connectors/<connector-name>`.

:::: code-group
::: code-group-item Powershell
``` powershell
curl.exe -i -u "admin:changeit" -X DELETE `
  https://localhost:2113/connectors/my-connector
```
:::
::: code-group-item Bash
``` bash
curl -i -u "admin:changeit" -X DELETE \
    https://localhost:2113/connectors/my-connector
```
:::
::::