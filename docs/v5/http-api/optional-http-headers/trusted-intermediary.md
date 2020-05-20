# Optional HTTP Headers: Trusted Intermediary

The trusted intermediary header helps Event Store support a common security architecture. There are thousands of possible methods for handling authentication and it is impossible for us to support them all. The header allows you to configure a trusted intermediary to handle the authentication instead of Event Store. A sample configuration is to enable OAuth2 with the following steps:

- Configure Event Store to run on the local loopback.
- Configure nginx to handle OAuth2 authentication.
- After authenticating the user, nginx rewrites the request and forwards it to the loopback to the Event Store that serves the request.

The header has the form of `{user}; group, group1` and the Event Store ACLs use the information to handle security.

```http
ES-TrustedAuth: "root; admin, other"
```

::: tip
This feature is **DISABLED** by default. You must specifically opt into this feature by running Event Store with the Enable Trusted Intermediary [configuration](/v5/dotnet-api/embedded-client.md) or [command line option](/v5/server/command-line-arguments.md).
:::