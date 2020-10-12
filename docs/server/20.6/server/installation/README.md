# Installation

EventStoreDB is available on multiple platforms. Below you can find instructions for installing an EventStoreDB instance. 

## Security considerations

EventStoreDB runs fully secure by default. All communication protocols must be secured with SSL (gRPC and HTTP) and TLS (TCP). It means that before starting it, you need to configure the certificates that the cluster will use.

You can also run EventStoreDB in insecure mode, which disables _all_ kinds of security, including client credentials and access control. We advise you not to use the insecure mode for production deployments, unless you absolutely have to.

The development mode allows you to easily spin up a secure cluster. We made some compromises for the development mode so it is not suitable for production either, but it lets you to try out EventStoreDB and use the local deployment for development purposes.

Follow the [security guidelines](../security/) to prepare your instance of cluster for production use.

## Highly-available cluster

Refer to the [clustering documentation](../clustering/) to upgrade your deployment to a highly available cluster. Clusters consists of several EventStoreDB nodes, follow the guidelines from this section to install each node of the cluster.

After installing an EventStoreDB instance you'd need to set up its [networking](../networking/) so you can connect to it from other machines.

## Configuration

Check the [configuration](configuration.md) page to find out how to configure your deployment.

## Installation guides

### Bare metal and VMs

- [Linux](./linux.md)
- [Windows](./windows.md)

### Docker

- [Docker and Docker Compose](./docker.md)

