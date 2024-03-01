# Managing Connectors

::: note
The management API is idempotent.
:::


# Create

Create a connector by sending a `POST` to `connectors/<connector-name>`.

``` powershell
$JSON = @'
{
    "Sink": "https://enkb1keveb5r.x.pipedream.net",
    "Filter": "",
    "Affinity": "Leader",
    "CheckpointInterval": 3,
    "Enable": true
}
'@ -replace '"', '\"'

curl.exe -i                           `
  -H "Content-Type: application/json" `
  -u "admin:changeit"                 `
  -d $JSON                            `
  https://localhost:2113/connectors/my-connector
```

- The sink URL is where the sink will POST to.

- Filter is a JSON Path filter.

- Affinity is the node state that the connector would like to run on.
  It can be `Leader`, `Follower` or `ReadOnlyReplica`. The default is `Leader`

- CheckpointInterval is how frequently to store the checkpoint,
  currently measured in events.

- Set `Enable` to false to create a connector without enabling it.


- Leader

  These connectors activate only on the leader.

- Follower

  These connectors activate only on follower nodes. They are shared out evenly
  among whichever follower nodes are currently up in the cluster.

- ReadOnlyReplica

  These connectors activate on the ReadOnlyReplicas if there are any currently up
  in the cluster. Otherwise they activate on the followers. Either way,
  they are shared out between the nodes of the type that they are
  activated on.

# Enable

Enable a connector by sending a `POST` to
`connectors/<connector-name>/enable`.

``` powershell
curl.exe -i           `
  -u "admin:changeit" `
  -X POST             `
  https://localhost:2113/connectors/my-connector/enable
```

# Disable

Disable a connector by sending a `POST` to
`connectors/<connector-name>/disable`.

The system will not activate disabled connectors.

``` powershell
curl.exe -i           `
  -u "admin:changeit" `
  -X POST             `
  https://localhost:2113/connectors/my-connector/disable
```

# Reset

Reset a connector’s checkpoint by sending a `POST` to
`connectors/<connector-name>/reset`.

With an empty payload the connector will be reset to the beginning.

``` powershell
curl.exe -i                           `
  -H "Content-Type: application/json" `
  -u "admin:changeit"                 `
  -d "{}"                             `
  https://localhost:2113/connectors/my-connector/reset
```

`CommitPosition` and `PreparePosition` can be specified to reset a
connector to a particular position. This position is treated as the new
checkpoint i.e. the position of a successfully processed event. The
connector will resume processing starting with the event *after* this.

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

# Delete

Delete a connector by sending a `DELETE` to
`connectors/<connector-name>`.

``` powershell
curl.exe -i           `
  -u "admin:changeit" `
  -X DELETE           `
  https://localhost:2113/connectors/my-connector
```
