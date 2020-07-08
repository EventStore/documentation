# Security

Event Store supports basic authentication for HTTP API and TCP calls, and supports access control lists (ACL) for streams.

## Authentication

### User authentication and authorization

Event Store supports basic HTTP authentication to internal users. You create and manage these users with the RESTful API or the Admin UI. Read more in the [users management guide](/docs/server/5.0.9/server/users-and-access-control-lists.md). Once you have added users, you can use their details with HTTP requests or native client's authorization process.

Alternatively you can also use the 'trusted intermediary' header for externalized authentication that allows you to integrate almost any authentication system with Event Store. Read more about [the trusted intermediary header](/docs/server/5.0.9/http-api/optional-http-headers/trusted-intermediary.md).

If you were to use the wrong user or no user when connecting to Event Store, you receive a `401 Unauthorized` response for HTTP API or Exception for native client.

::: warning
Change default password for default users and disable unused users. 
:::

### Secure EventStoreDB node

We recommend you run Event Store over TLS to encrypt the user information. [Read this guide for instructions](/docs/server/5.0.9/server/installation/setting-up-ssl.md). If you are running the clustered version you can also setup TLS for the replication protocol.

::: warning
It is recommended to use latest TLS version instead of SSL [explanation available here](https://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_1.0,_2.0,_and_3.0). All references to SSL in documentation or code are there for only historical reasons and will be replaced with TLS in the future.  
:::

::: warning
Avoid exposing Event Store to the global internet network. 
:::


