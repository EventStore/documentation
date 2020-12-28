# Security options

On this page you find all the configuration options related to in-flight security of EventStoreDB.

The protocol security configuration depends a lot on the deployment topology and platform. We have created an interactive [configuration tool](../installation/README.md), which also has instructions on how to generate and install the certificates and configure EventStoreDB nodes to use them. 

Below you can find more details about each of the available security options.

## Running without security

Unlike previous versions, EventStoreDB v20+ is secure by default. It means that you have to supply valid certificates and configuration for the database node to work.

We realise that many users want to try out the latest version with their existing applications, and also run a previous version of EventStoreDB without any security in their internal networks.

For this to work, you can use the `Insecure` option:
 
| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--insecure` |
| YAML                 | `Insecure` |
| Environment variable | `EVENTSTORE_INSECURE` |

**Default**: `false`

::: warning
When running with protocol security disabled, everything is sent unencrypted over the wire. In the previous version it included the server credentials. Sending username and password over the wire without encryption is not secure by definition, but it might give a false sense of security. In order to make things explicit, EventStoreDB v20 **does not use any authentication and authorisation** (including ACLs) when running insecure.
:::

## Certificates configuration

In this section, you can find settings related to protocol security (HTTPS and TLS).

### Certificate common name

SSL certificates can be created with a common name (CN), which is an arbitrary string. Usually is contains the DNS name for which the certificate is issued. When cluster nodes connect to each other, they need to ensure that they indeed talk to another node and not something that pretends to be a node. Therefore, EventStoreDB expects the connecting party to have a certificate with a pre-defined CN `eventstoredb-node`.

When using the Event Store [certificate generator](https://github.com/EventStore/es-gencert-cli), the CN is properly set by default. However, you might want to change the CN and in this case, you'd also need to tell EventStoreDB what value it should expect instead of the default one, using the setting below:
 
| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--certificate-reserved-node-common-name` |
| YAML                 | `CertificateReservedNodeCommonName` |
| Environment variable | `EVENTSTORE_CERTIFICATE_RESERVED_NODE_COMMON_NAME` |

**Default**: `eventstoredb-node`

### Trusted root certificates

When getting an incoming connection, the server needs to ensure if the certificate used for the connection can be trusted. For this to work, the server needs to know where trusted root certificates are located.

EventStoreDB will not use the default trusted root certificates store location of the platform. So, even if you use a certificate signed by a public trusted CA, you'd need to explicitly tell the node to use the OS default root certificate store. For self-signed certificates, you just provide the path to the CA certificate file (but not the filename).

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--trusted-root-certificates-paths` |
| YAML                 | `TrustedRootCertificatesPath` |
| Environment variable | `EVENTSTORE_TRUSTED_ROOT_CERTIFICATES_PATH` |

**Default**: n/a

### Certificate file

The `CertificateFile` setting needs to point to the certificate file, which will be used by the cluster node.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--certificate-file` |
| YAML                 | `CertificateFile` |
| Environment variable | `EVENTSTORE_CERTIFICATE_FILE` |

If the certificate file is protected by password, you'd need to set the `CertificatePassword` value accordingly, so the server can load the certificate.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--certificate-password` |
| YAML                 | `CertificatePassword` |
| Environment variable | `EVENTSTORE_CERTIFICATE_PASSWORD` |

If the certificate file doesn't contain the certificate private key, you need to tell the node where to find the key file using the `CertificatePrivateKeyFile` setting.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--certificate-private-key-file` |
| YAML                 | `CertificatePrivateKeyFile` |
| Environment variable | `EVENTSTORE_CERTIFICATE_PRIVATE_KEY_FILE` |

::: warning RSA private key
EventStoreDB expects the private key to be in RSA format. Check the first line of the key file and ensure that it looks like this:
```
-----BEGIN RSA PRIVATE KEY-----
```
If you have non-RSA private key, you can use `openssl` to convert it:
```bash
openssl rsa -in privkey.pem -out privkeyrsa.pem
```
:::

### Certificate store (Windows)

The certificate store location is the location of the Windows certificate store, for example `CurrentUser`.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--certificate-store-location` |
| YAML                 | `CertificateStoreLocation` |
| Environment variable | `EVENTSTORE_CERTIFICATE_STORE_LOCATION` |

The certificate store name is the name of the Windows certificate store, for example `My`.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--certificate-store-name` |
| YAML                 | `CertificateStoreName` |
| Environment variable | `EVENTSTORE_CERTIFICATE_STORE_NAME` |

You need to add the certificate thumbprint setting on Windows so the server can ensure that it's using the correct certificate found in the certificates store.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--certificate-thumbprint` |
| YAML                 | `CertificateThumbprint` |
| Environment variable | `EVENTSTORE_CERTIFICATE_THUMBPRINT` |

## TCP protocol security

Although TCP is disabled by default for external connections (clients), cluster nodes still use TCP for replication. If you aren't running EventStoreDb in insecure mode, all TCP communication will use TLS using the same certificates as SSL.

You can, however, disable TLS for both internal and external TCP.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--disable-internal-tcp-tls` |
| YAML                 | `DisableInternalTcpTls` |
| Environment variable | `EVENTSTORE_DISABLE_INTERNAL_TCP_TLS` |

**Default**: `false`

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--disable-external-tcp-tls` |
| YAML                 | `DisableExternalTcpTls` |
| Environment variable | `EVENTSTORE_DISABLE_EXTERNAL_TCP_TLS` |

**Default**: `false`

