# Authentication

## Authenticate Using x.509 Certificates

x.509 certificates are digital certificates that use the x.509 public key infrastructure (PKI) standard to verify the identity of clients and servers. They play a crucial role in establishing a secure connection by providing a way to encrypt data and verify identities.

### Prerequisites

1. EventStoreDB 24.2.0 or later.
2. A valid x.509 certificate, which can be created using version `1.3` or higher of our [gencert tool](https://github.com/EventStore/es-gencert-cli).
3. [Enable User Certificates plugin on the server](https://developers.eventstore.com/server/v24.2/configuration.html#plugins-configuration)

#### Generate User Certificates

The following command uses the [gencert tool](https://github.com/EventStore/es-gencert-cli) to generate a user certificate for the user `admin` with a validity of 10 days:

:::: tabs
::: tab Linux and macOS

```shell
./es-gencert-cli create-user -username admin -days 10 -ca-certificate ./es-ca/ca.crt -ca-key ./es-ca/ca.key
```

:::
::: tab Windows

```powershell
.\es-gencert-cli.exe create-user -username admin -days 10 -ca-certificate ./es-ca/ca.crt -ca-key ./es-ca/ca.key
```

:::
::::

### Connect to EventStoreDB using the x.509 certificate

To connect to EventStoreDB using the x.509 certificate, you need to provide the
certificate and the private key to the client. If both username/password and
certificate authentication data are supplied, the client prioritizes user
credentials for authentication. This decision is handled on the server-side.
The client will throw an error if it receives only one component of the
certificate files (either the certificate or the key), rather than both.

::: note
Please note that currently, password-protected private key files are not supported.
:::

The client supports the following parameters:

| Parameter      | Description                                                                    |
| -------------- | ------------------------------------------------------------------------------ |
| `userCertFile` | The file containing the X.509 user certificate in PEM format.                  |
| `userKeyFile`  | The file containing the user certificate’s matching private key in PEM format. |

To authenticate, include these two parameters in your connection string or constructor when initializing the client.

:::: code-group
::: code-group-item JavaScript
@[code{client-with-user-certificates}](@grpc:user-certificates.js)
:::
::: code-group-item TypeScript
@[code{client-with-user-certificates}](@grpc:user-certificates.ts)
:::
::: code-group-item Java
@[code{client-with-user-certificates}](@grpc:authentication/UserCertificate.java)
:::
::: code-group-item C#
@[code{client-with-user-certificates}](@grpc:user-certificates/Program.cs)
:::
::::
