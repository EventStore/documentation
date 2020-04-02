---
outputFileName: index.html
---
# Optimistic concurrency and idempotence

## Idempotency

All operations on the HTTP interface are idempotent (unless the [expected version](~/http-api/creating-writing-a-stream.md#expected-version-header) is ignored). It is the responsibility of the client to retry operations under failure conditions, ensuring that the event IDs of the events posted are the same as the first attempt.

Provided the client maintains this Event Store will treat all operations as idempotent.

For example:

### [Request](#tab/tabid-1)

```bash
curl -i -d @event.txt "http://127.0.0.1:2113/streams/newstream"
```

### [Response](#tab/tabid-2)

```http
HTTP/1.1 201 Created
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, PUT, DELETE
Location: http://127.0.0.1:2113/streams/newstream444/1
Content-Type: application/json
Server: Mono-HTTPAPI/1.0
Date: Thu, 06 Sep 2012 19:49:37 GMT
Content-Length: 107
Keep-Alive: timeout=15,max=100
```

* * *

<!-- TODO: What's this? -->

### [Request](#tab/tabid-3)

```bash
curl -i -d @event.txt "http://127.0.0.1:2113/streams/newstream444"
```

### [Response](#tab/tabid-4)

```http
HTTP/1.1 201 Created
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, PUT, DELETE
Location: http://127.0.0.1:2113/streams/newstream444/1
Content-Type: application/json
Server: Mono-HTTPAPI/1.0
Date: Thu, 06 Sep 2012 19:49:37 GMT
Content-Length: 107
Keep-Alive: timeout=15,max=100
```

* * *

Assuming you were posting to a new stream you would get the event written once (and the stream created). The second event will return as the first but not write again.

> [!NOTE]
> This allows the client rule of “if you get an unknown condition, retry” to work.

For example:

### [Request](#tab/tabid-5)

```bash
curl -i "http://127.0.0.1:2113/streams/newstream444"
```

### [Response](#tab/tabid-6)

```http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, PUT, DELETE
Content-Type: application/json
Server: Mono-HTTPAPI/1.0
Date: Thu, 06 Sep 2012 19:50:30 GMT
Content-Length: 2131
Keep-Alive: timeout=15,max=100

{
	"title": "Event stream 'newstream444'",
	"id": "http://127.0.0.1:2113/streams/newstream444",
	"updated": "2012-09-06T16:39:44.695643Z",
	"author": {
		"name": "EventStore"
	},
	"links": [
		{
			"uri": "http://127.0.0.1:2113/streams/newstream444",
			"relation": "self"
		},
		{
			"uri": "http://127.0.0.1:2113/streams/newstream444",
			"relation": "first"
		}
	],
	"entries": [
		{
			"title": "newstream444 #1",
			"id": "http://127.0.0.1:2113/streams/newstream444/1",
			"updated": "2012-09-06T16:39:44.695643Z",
			"author": {
				"name": "EventStore"
			},
			"summary": "Entry #1",
			"links": [
				{
					"uri": "http://127.0.0.1:2113/streams/newstream444/1",
					"relation": "edit"
				},
				{
					"uri": "http://127.0.0.1:2113/streams/newstream444/event/1?format=text",
					"type": "text/plain"
				},
				{
					"uri": "http://127.0.0.1:2113/streams/newstream444/event/1?format=json",
					"relation": "alternate",
					"type": "application/json"
				},
				{
					"uri": "http://127.0.0.1:2113/streams/newstream444/event/1?format=xml",
					"relation": "alternate",
					"type": "text/xml"
				}
			]
		},
		{
			"title": "newstream444 #0",
			"id": "http://127.0.0.1:2113/streams/newstream444/0",
			"updated": "2012-09-06T16:39:44.695631Z",
			"author": {
				"name": "EventStore"
			},
			"summary": "Entry #0",
			"links": [
				{
					"uri": "http://127.0.0.1:2113/streams/newstream444/0",
					"relation": "edit"
				},
				{
					"uri": "http://127.0.0.1:2113/streams/newstream444/event/0?format=text",
					"type": "text/plain"
				},
				{
					"uri": "http://127.0.0.1:2113/streams/newstream444/event/0?format=json",
					"relation": "alternate",
					"type": "application/json"
				},
				{
					"uri": "http://127.0.0.1:2113/streams/newstream444/event/0?format=xml",
					"relation": "alternate",
					"type": "text/xml"
				}
			]
		}
	]
}
```

* * *

<!-- TODO: Still to do -->