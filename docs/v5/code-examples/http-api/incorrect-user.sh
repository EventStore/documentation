curl -i 'http://127.0.0.1:2113/streams/$all' -u admin:password

HTTP/1.1 401 Unauthorized
Access-Control-Allow-Methods:
Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-Forwarded-Host, X-Forwarded-Prefix, X-PINGOTHER, Authorization, ES-LongPoll, ES-ExpectedVersion, ES-EventId, ES-EventType, ES-RequiresMaster, ES-HardDelete, ES-ResolveLinkTos
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Location, ES-Position, ES-CurrentVersion
WWW-Authenticate: Basic realm="ES"
Content-Type:
Server: Mono-HTTPAPI/1.0
Date: Thu, 23 Aug 2018 09:27:34 GMT
Content-Length: 0
Keep-Alive: timeout=15,max=100