curl -i -d "@new-user.json" "http://127.0.0.1:2113/users" -H "Content-Type:application/json"

HTTP/1.1 201 Created
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-Requested-With, X-Forwarded-Host, X-Forwarded-Prefix, X-PINGOTHER, Authorization, ES-LongPoll, ES-ExpectedVersion, ES-EventId, ES-EventType, ES-RequiresMaster, ES-HardDelete, ES-ResolveLinkTos
Access-Control-Allow-Origin: *
Access-Control-Expose-Headers: Location, ES-Position, ES-CurrentVersion
Location: http://127.0.0.1:2113/users/adminuser
Content-Type: application/json; charset=utf-8
Server: Mono-HTTPAPI/1.0
Date: Thu, 23 Aug 2018 09:08:40 GMT
Content-Length: 90
Keep-Alive: timeout=15,max=100

{
  "loginName": "adminuser",
  "success": true,
  "error": "Success",
  "msgTypeId": 50
}%