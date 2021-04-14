# Access Control Lists

Alongside authentication, EventStoreDB supports per stream configuration of Access Control Lists (ACL). To configure the ACL of a stream go to its head and look for the `metadata` relationship link to fetch the metadata for the stream.

For more information on the structure of Access Control Lists read [Access Control Lists](/server/generated/v20.10/docs/security/users-and-access-control-lists.md).

### ACL example

The ACL below gives `writer` read and write permission on the stream, while `reader` has read permission on the stream. Only users in the `$admins` group can delete the stream or read and write the metadata.

```csharp
var metadata = StreamMetadata.Build()
    .SetCustomPropertyWithValueAsRawJsonString(
        "customRawJson",
        @"{
            ""$acl"": {
                ""$w"": ""writer"",
                ""$r"": [
                    ""reader"",
                    ""also-reader""
                ],
                ""$d"": ""$admins"",
                ""$mw"": ""$admins"",
                ""$mr"": ""$admins""
            }
        }"
    );
await connection.SetStreamMetadataAsync(
    streamName, 
    ExpectedVersion.Any, 
    metadata, 
    adminCredentials
);
```
