# Security

Event Store supports basic authentication for HTTP API and TCP calls, and supports access control lists (ACL) for streams.

## Authentication

### User authentication and authorization

Event Store supports basic HTTP authentication to internal users. You create and manage these users with the RESTful API or the Admin UI. Read more in the [users management guide](/v5/server/users.md). Once you have added users, you can use their details with HTTP requests or native client's authorization process.

Alternatively you can also use the 'trusted intermediary' header for externalized authentication that allows you to integrate almost any authentication system with Event Store. Read more about [the trusted intermediary header](/v5/http-api/optional-http-headers/trusted-intermediary.md).

If you were to use the wrong user or no user when connecting to Event Store, you receive a `401 Unauthorized` response for HTTP API or Exception for native client.

::: warning
Change default password for default users and disable unused users. 
:::

### Secure Event Store node

We recommend you run Event Store over TLS to encrypt the user information. [Read this guide for instructions](/v5/server/setting-up-ssl.md). If you are running the clustered version you can also setup TLS for the replication protocol.

::: warning
It is recommended to use latest TLS version instead of SSL [explanation available here](https://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_1.0,_2.0,_and_3.0). All references to SSL in documentation or code are there for only historical reasons and will be replaced with TLS in the future.  
:::

::: warning
Avoid exposing Event Store to the global internet network. 
:::

## Access control lists

Alongside authentication, Event Store supports per stream configuration of Access Control Lists (ACL). To configure the ACL of a stream go to its head and look for the `metadata` relationship link to fetch the metadata for the stream.

To set access control lists over HTTP you can post to the metadata stream as [with setting any other metadata](/v5/http-api/stream-metadata.md). You can also set Access Control Lists for a stream in the admin UI.

For more information on the structure of Access Control Lists read [Access Control Lists](/v5/server/users-and-access-control-lists.md).
