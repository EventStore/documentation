---
outputFileName: index.html
---

# Users and access control lists

## Default users

Event Store provides two default users, `$ops` and `$admin`.

`$admin` has full access to everything in Event Store. It can read and write to protected streams, which is any stream that starts with \$, such as `$projections-master`. Protected streams are usually system streams, for example, `$projections-master` manages some of the projections' states. The `$admin` user can also run operational commands, such as scavenges and shutdowns on Event Store.

An `$ops` user can do everything that an `$admin` can do except manage users and read from system streams (except for `$scavenges` and `$scavenges-streams`).

## New users

New users created in Event Store are standard non-authenticated users. Non-authenticated users are allowed `GET` access to the `/info`, `/ping`, `/stats`, `/elections`, and `/gossip` system streams.

`POST` access to the `/elections` and `/gossip` system streams is only allowed on the internal HTTP service.

By default, any user can read any non-protected stream unless there is an ACL preventing that.

## Stream ACLs

Event Store keeps the ACL of a stream in the streams [metadata](~/server/metadata-and-reserved-names.md) as JSON with the below definition:

```json
{
  "$acl": {
    "$w": "$admins",
    "$r": "$all",
    "$d": "$admins",
    "$mw": "$admins",
    "$mr": "$admins"
  }
}
```

These fields represent the following:

- `$w` The permission to write to this stream.
- `$r` The permission to read from this stream.
- `$d` The permission to delete this stream.
- `$mw` The permission to write the metadata associated with this stream.
- `$mr` The permission to read the metadata associated with this stream.

You can update these fields with either a single string or an array of strings representing users or groups (`$admins`, `$all`, or custom groups). It's possible to put an empty array into one of these fields, and this has the effect of removing all users from that permission.

> [!NOTE]
> We recommend you don't give people access to `$mw` as then they can then change the ACL.

### Example

The ACL below gives `writer` read and write permission on the stream, while `reader` has read permission on the stream. Only users in the `$admins` group can delete the stream or read and write the metadata.

### [HTTP API](#tab/tabid-http)

Inside a file named _metadata.json_:

[!code-json[http-api-metadata-json](~/code-examples/server/metadata.json)]

[!code-bash[http-api-update-metadata-request](~/code-examples/server/update-acl.sh?start=1&end=1)]

### [Response](#tab/tabid-8)

[!code-json[http-api-update-metadata-response](~/code-examples/server/update-acl.sh?range=3-)]

### [.NET API](#tab/tabid-net)

<!-- TODO: Refactor into demo application -->

```csharp
StreamMetadata metadata = StreamMetadata.Build()
    .SetCustomPropertyWithValueAsRawJsonString("customRawJson",
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
    }}");
conn.SetStreamMetadataAsync(streamName, ExpectedVersion.Any, metadata, adminCredentials);
```

---

## Default ACL

[!include[<Settings stream>](~/partials/_settings-acl.md)]

### Example

> [!NOTE]
> All these examples assume you have created a user named `ouro`. The examples also assume the password is `ouroboros`.

```json
{
  "$userStreamAcl": {
    "$r": "$all",
    "$w": "ouro",
    "$d": "ouro",
    "$mr": "ouro",
    "$mw": "ouro"
  },
  "$systemStreamAcl": {
    "$r": "$admins",
    "$w": "$admins",
    "$d": "$admins",
    "$mr": "$admins",
    "$mw": "$admins"
  }
}
```

This default ACL gives `ouro` and `$admins` create and write permissions on all streams, while everyone else can read from them. Be careful allowing default access to system streams to non-admins as they would also have access to `$settings` unless you specifically override it.

### [Request](#tab/tabid-1)

[!code-json[http-api-metadata-json](~/code-examples/server/override-default.json)]

[!code-bash[http-api-update-metadata-request](~/code-examples/server/update-default-acl.sh?start=1&end=1)]

> [!WARNING]
> You should not copy/paste the UUID in the command line above but generate a new one or not provide one (you will be redirected to a URI with one as described in [writing events](~/http-api/creating-writing-a-stream.md#writing-a-single-event) in the HTTP API).

### [Response](#tab/tabid-2)

[!code-json[http-api-update-metadata-response](~/code-examples/server/update-default-acl.sh?range=3-)]

### [.NET API](#tab/tabid-net2)

<!-- TODO: Refactor into demo application -->

```csharp
StreamMetadata metadata = StreamMetadata.Build()
    .SetCustomPropertyWithValueAsRawJsonString("customRawJson",
        @"{
            ""$userStreamAcl"": {
                ""$r"": ""$all"",
                ""$w"": ""ouro"",
                ""$d"": ""ouro"",
                ""$mr"": ""ouro"",
                ""$mw"": ""ouro""
            },
            ""$systemStreamAcl"": {
                ""$r"": ""$admins"",
                ""$w"": ""$admins"",
                ""$d"": ""$admins"",
                ""$mr"": ""$admins"",
                ""$mw"": ""$admins""
            }
    }}");
conn.SetStreamMetadataAsync("%24settings", ExpectedVersion.Any, metadata, adminCredentials);
```

---

If you try to access the `$settings` stream as an unauthorized user, Event Store returns a 401 response.

### [Request](#tab/tabid-3)

```bash
curl -i http://127.0.0.1:2113/streams/%24settings -u ouro:ouroboros
```

### [Response](#tab/tabid-4)

```http
HTTP/1.1 401 Unauthorized
Access-Control-Allow-Methods: POST, DELETE, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-PINGOTHER, Authorization, ES-LongPoll, ES-ExpectedVersion, ES-EventId, ES-EventType, ES-RequiresMaster, ES-HardDelete, ES-ResolveLinkTo, ES-ExpectedVersion
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Location, ES-Position
WWW-Authenticate: Basic realm="ES"
Content-Type: text/plain; charset=utf-8
Server: Mono-HTTPAPI/1.0
Date: Mon, 02 Mar 2015 15:21:27 GMT
Content-Length: 0
Keep-Alive: timeout=15,max=100
```

---

If you wanted to give `ouro` access by default to system streams, POST the following JSON:

```json
{
  "$userStreamAcl": {
    "$r": "$all",
    "$w": "ouro",
    "$d": "ouro",
    "$mr": "ouro",
    "$mw": "ouro"
  },
  "$systemStreamAcl": {
    "$r": ["$admins", "ouro"],
    "$w": "$admins",
    "$d": "$admins",
    "$mr": "$admins",
    "$mw": "$admins"
  }
}
```

At which point ouro can read system streams by default:

### [Request](#tab/tabid-5)

```bash
curl -i http://127.0.0.1:2113/streams/%24settings -u ouro:ouroboros
```

### [Response](#tab/tabid-6)

```http
HTTP/1.1 200 OK
Access-Control-Allow-Methods: POST, DELETE, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-PINGOTHER, Authorization, ES-LongPoll, ES-ExpectedVersion, ES-EventId, ES-EventType, ES-RequiresMaster, ES-HardDelete, ES-ResolveLinkTo, ES-ExpectedVersion
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Location, ES-Position
Cache-Control: max-age=0, no-cache, must-revalidate
Vary: Accept
ETag: "1;-1296467268"
Content-Type: application/atom+xml; charset=utf-8
Server: Mono-HTTPAPI/1.0
Date: Mon, 02 Mar 2015 15:25:17 GMT
Content-Length: 1286
Keep-Alive: timeout=15,max=100
```

---

You can also limit ACLs on particular streams which are then merged with the default ACLs.

```json
{
  "$acl": {
    "$r": ["reader", "also-reader"]
  }
}
```

If you add the above to a stream's ACL, then it overrides the read permission on that stream to allow `reader` and `also-reader` to read streams, but not `ouro`, resulting in the effective ACL below.

```json
{
  "$acl": {
    "$r": ["reader", "also-reader"],
    "$w": "ouro",
    "$d": "ouro",
    "$mr": "ouro",
    "$mw": "ouro"
  }
}
```

> [!WARNING]
> Caching is allowed on a stream if you have enabled it to be visible to `$all`. This is as a performance optimization to avoid having to set `cache=private` on all data. If people are bookmarking your URIs and they were cached by an intermediary then they may still be accessible after you change the permissions from `$all`. While clients should not be bookmarking URIs in this way, it's an important consideration.
