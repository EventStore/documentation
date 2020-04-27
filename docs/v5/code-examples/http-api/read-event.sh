curl -i http://127.0.0.1:2113/streams/newstream/0 -H "accept:application/vnd.eventstore.atom+json"

HTTP/1.1 200 OK
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-Forwarded-Host, X-Forwarded-Prefix, X-PINGOTHER, Authorization, ES-LongPoll, ES-ExpectedVersion, ES-EventId, ES-EventType, ES-RequiresMaster, ES-HardDelete, ES-ResolveLinkTos
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Location, ES-Position, ES-CurrentVersion
Cache-Control: max-age=31536000, public
Vary: Accept
Content-Type: application/vnd.eventstore.atom+json; charset=utf-8
Server: Mono-HTTPAPI/1.0
Date: Mon, 27 Aug 2018 08:37:46 GMT
Content-Length: 625
Keep-Alive: timeout=15,max=100

{
  "title": "0@newstream",
  "id": "http://127.0.0.1:2113/streams/newstream/0",
  "updated": "2018-08-27T08:27:58.986756Z",
  "author": {
    "name": "EventStore"
  },
  "summary": "SomeEvent",
  "content": {
    "eventStreamId": "newstream",
    "eventNumber": 0,
    "eventType": "SomeEvent",
    "eventId": "c322e299-cb73-4b47-97c5-5054f920746e",
    "data": {
      "a": "1"
    },
    "metadata": ""
  },
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