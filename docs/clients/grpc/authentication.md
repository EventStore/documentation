---
title: Authentication
order: 7
---

## Client x.509 certificate <Badge type="warning" text="Commercial" vertical="middle"/>

X.509 certificates are digital certificates that use the X.509 public key infrastructure (PKI) standard to verify the identity of clients and servers. They play a crucial role in establishing a secure connection by providing a way to authenticate identities and establish trust.

### Prerequisites

1. EventStoreDB 24.2.0 or greater with commercial license.
2. A valid x.509 certificate, which can be created using version `1.3` or higher of the [gencert tool](https://github.com/EventStore/es-gencert-cli).
3. The server must run in secure mode. See [Security Options](@server/security/protocol-security.md) for more information.
4. [Enable User Certificates plugin on the server](@server/security/user-authentication.md#user-x509-certificates)

#### Generate user certificates

The following command uses the [gencert tool](https://github.com/EventStore/es-gencert-cli) to generate a user certificate for the user `admin` that will expire in 10 days:

::: tabs#os
@tab bash
```bash
./es-gencert-cli create-user -username admin -days 10 -ca-certificate ./es-ca/ca.crt -ca-key ./es-ca/ca.key
```
@tab PowerShell
```powershell
.\es-gencert-cli.exe create-user -username admin -days 10 -ca-certificate ./es-ca/ca.crt -ca-key ./es-ca/ca.key
```
:::

### Connect to KurrentDB using an x.509 certificate

To connect to KurrentDB using an x.509 certificate, you need to provide the
certificate and the private key to the client. If both username/password and
certificate authentication data are supplied, the client prioritizes user
credentials for authentication. The client will throw an error if the
certificate and the key are not both provided.

::: tip
Please note that currently, password-protected private key files are not supported.
:::

The client supports the following parameters:

| Parameter      | Description                                                                    |
|----------------|--------------------------------------------------------------------------------|
| `userCertFile` | The file containing the X.509 user certificate in PEM format.                  |
| `userKeyFile`  | The file containing the user certificate’s matching private key in PEM format. |

To authenticate, include these two parameters in your connection string or constructor when initializing the client.

Check the samples for the following clients:

::: code-tabs
@tab TypeScript
@[code{client-with-user-certificates}](@grpc:user-certificates.ts)
@tab Java
@[code{client-with-user-certificates}](@grpc:authentication/UserCertificate.java)
@tab C##
@[code{client-with-user-certificates}](@grpc:user-certificates/Program.cs)
@tab Go
@[code{client-with-user-certificates}](@grpc:/userCertificates.go)
:::


