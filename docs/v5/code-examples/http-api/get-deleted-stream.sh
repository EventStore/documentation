curl -X GET "http://127.0.0.1:2113/streams/newstream" -H 'Accept: application/vnd.eventstore.events+json'

HTTP/1.1 410 Deleted
Access-Control-Allow-Methods: POST, DELETE, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-Forwarded-Host, X-Forwarded-Prefix, X-PINGOTHER, Authorization, ES-LongPoll, ES-ExpectedVersion, ES-EventId, ES-EventType, ES-RequiresMaster, ES-HardDelete, ES-ResolveLinkTos
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Location, ES-Position, ES-CurrentVersion
Content-Type: text/plain; charset=utf-8
Server: Mono-HTTPAPI/1.0
Date: Fri, 27 Jul 2018 12:04:10 GMT
Content-Length: 0
Connection: close