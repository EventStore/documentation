# Security

EventStoreDB supports basic authentication for HTTP API and TCP calls, and supports access control lists (ACL) for streams.

## Authentication

### User authentication and authorization

EventStoreDB supports basic HTTP authentication to internal users. You create and manage these users with the RESTful API or the Admin UI. Read more in the [users management guide](/server/v5/http-api/api/README.md#create-a-user). Once you have added users, you can use their details with HTTP requests or native client's authorization process.

Alternatively you can also use the 'trusted intermediary' header for externalized authentication that allows you to integrate almost any authentication system with EventStoreDB. Read more about [the trusted intermediary header](/server/v5/server/security/trusted-intermediary.md).

If you were to use the wrong user or no user when connecting to EventStoreDB, you receive a `401 Unauthorized` response for HTTP API or Exception for native client.

::: warning
Change default password for default users and disable unused users. 
:::

### Secure EventStoreDB node

We recommend you run EventStoreDB over TLS to encrypt the user information. [Read this guide for instructions](/server/v5/server/security/ssl-linux.md). If you are running the clustered version you can also setup TLS for the replication protocol.

::: warning
It is recommended to use latest TLS version instead of SSL [explanation available here](https://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_1.0,_2.0,_and_3.0). All references to SSL in documentation or code are there for only historical reasons and will be replaced with TLS in the future.  
:::

::: warning
Avoid exposing EventStoreDB to the global internet network. 
:::


