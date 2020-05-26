curl -i http://127.0.0.1:2113/streams/newstream -H "Accept: application/json"

HTTP/1.1 200 OK
Access-Control-Allow-Methods: POST, DELETE, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-Forwarded-Host, X-Forwarded-Prefix, X-PINGOTHER, Authorization, ES-LongPoll, ES-ExpectedVersion, ES-EventId, ES-EventType, ES-RequiresMaster, ES-HardDelete, ES-ResolveLinkTos
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Location, ES-Position, ES-CurrentVersion
Cache-Control: max-age=0, no-cache, must-revalidate
Vary: Accept
ETag: "1;1391431453"
Content-Type: application/json; charset=utf-8
Server: Mono-HTTPAPI/1.0
Date: Mon, 27 Aug 2018 09:37:21 GMT
Content-Length: 1749
Keep-Alive: timeout=15,max=100

{
  "title": "Event stream 'newstream'",
  "id": "http://127.0.0.1:2113/streams/newstream",
  "updated": "2018-08-27T09:21:39.668888Z",
  "streamId": "newstream",
  "author": {
    "name": "EventStore"
  },
  "headOfStream": true,
  "selfUrl": "http://127.0.0.1:2113/streams/newstream",
  "eTag": "1;-2060438500",
  "links": [
    {
      "uri": "http://127.0.0.1:2113/streams/newstream",
      "relation": "self"
    },
    {
      "uri": "http://127.0.0.1:2113/streams/newstream/head/backward/20",
      "relation": "first"
    },
    {
      "uri": "http://127.0.0.1:2113/streams/newstream/2/forward/20",
      "relation": "previous"
    },
    {
      "uri": "http://127.0.0.1:2113/streams/newstream/metadata",
      "relation": "metadata"
    }
  ],
  "entries": [
    {
      "title": "1@newstream",
      "id": "http://127.0.0.1:2113/streams/newstream/1",
      "updated": "2018-08-27T09:21:39.668888Z",
      "author": {
        "name": "EventStore"
      },
      "summary": "event-type",
      "links": [
        {
          "uri": "http://127.0.0.1:2113/streams/newstream/1",
          "relation": "edit"
        },
        {
          "uri": "http://127.0.0.1:2113/streams/newstream/1",
          "relation": "alternate"
        }
      ]
    },
    {
      "title": "0@newstream",
      "id": "http://127.0.0.1:2113/streams/newstream/0",
      "updated": "2018-08-27T08:27:58.986756Z",
      "author": {
        "name": "EventStore"
      },
      "summary": "SomeEvent",
      "links": [
        {
          "uri": "http://127.0.0.1:2113/streams/newstream/0",
          "relation": "edit"
        },
        {
          "uri": "http://127.0.0.1:2113/streams/newstream/0",
          "relation": "alternate"
        }
      ]
    }
  ]
}