curl -i -d "@event-append.json" "http://127.0.0.1:2113/streams/newstream" -H "Content-Type:application/vnd.eventstore.events+json" -H "ES-EventType: SomeEvent"

HTTP/1.1 410 Deleted
Access-Control-Allow-Methods: POST, DELETE, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-PINGOTHER
Access-Control-Allow-Origin: *
Location: http://127.0.0.1:2113/streams/newstream/1
Content-Type: text/plain; charset: utf-8
Server: Mono-HTTPAPI/1.0
Date: Fri, 28 Jun 2013 12:32:18 GMT
Content-Length: 0
Keep-Alive: timeout=15,max=100