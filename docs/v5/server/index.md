# Running Event Store

Event Store runs as a server that clients can connect to either [over HTTP](/docs/http-api/index.md) or using [one of the client APIs](/v5/getting-started/which-api-sdk.md). You can run both the open source and commercial versions as either a single node or a highly available cluster of nodes.

We distribute an [open source version of Event Store](https://eventstore.com/downloads) as a console application. There are separate distributions for Windows on .NET and Linux/macOS on Mono.

## Install and run Event Store

::: tip
Unless you pass a database option with `--db`, Event Store writes to a new database created in the host system's temporary files path each time it is started. For more information on Command Line Arguments read [this guide](/v5/server/command-line-arguments.md).
:::

::::: tabs
:::: tab Windows

The prerequisites for installing on Windows are:

-   NET Framework 4.0+

Event Store has [Chocolatey packages](https://chocolatey.org/packages/eventstore-oss) available that you can install with the following command in an elevated terminal:

```powershell
choco install eventstore-oss
```

You can also [download](https://eventstore.com/downloads/) a binary, unzip the archive and run from the folder location with an administrator console.

The following command starts Event Store with the database stored at the path _./db_ and the logs in _./logs_. You can view further command line arguments in the [server docs](/v5/server/index.md).

```powershell
EventStore.ClusterNode.exe --db ./db --log ./logs
```

Event Store runs in an administration context because it starts an HTTP server through `http.sys`. For permanent or production instances you need to provide an ACL such as:

```powershell
netsh http add urlacl url=http://+:2113/ user=DOMAIN\username
```

For more information, refer to Microsoft's `add urlacl` [documentation](https://docs.microsoft.com/en-us/windows/win32/http/add-urlacl).

To build Event Store from source, refer to the [Event Store README](https://github.com/EventStore/EventStore#windows).

::::
:::: tab Linux

The prerequisites for installing on Linux are:

-   We recommend [Mono 5.16.0](https://www.mono-project.com/download/stable/), but other versions may also work.

Event Store has pre-built [packages available for Debian-based distributions](https://packagecloud.io/EventStore/EventStore-OSS), [manual instructions for distributions that use RPM](https://packagecloud.io/EventStore/EventStore-OSS/install#bash-rpm), or you can [build from source](https://github.com/EventStore/EventStore#linux). The final package name to install is `eventstore-oss`.

If you installed from a pre-built package, start Event Store with:

```bash
sudo systemctl start eventstore
```

When you install the Event Store package, the service doesn't start by default. This is to allow you to change the configuration, located at _/etc/eventstore/eventstore.conf_ and to prevent creating a default database. To start Event Store on port 80 as a service, refer to [Configuring your installation](/v5/server/configuring.md#start-as-a-service-on-a-custom-port)

::: warning
We recommend that when using Linux you set the 'open file limit' to a high number. The precise value depends on your use case, but at least between `30,000` and `60,000`.
:::

::::
:::: tab Docker

Event Store has a Docker image available for any platform that supports Docker.

Pull the Docker image:

```bash
docker pull eventstore/eventstore
```

Run the container:

```bash
docker run --name eventstore-node -it -p 2113:2113 -p 1113:1113 eventstore/eventstore
```

Refer to the [image overview](https://hub.docker.com/r/eventstore/eventstore/) for more information.

::::
:::: tab Docker Compose

Event Store has a Docker image available for any platform that supports Docker. In order to save keystrokes it is possible to run Event Store via docker-compose.

Pull the Docker image:

```bash
docker pull eventstore/eventstore
```

Create file _docker-compose.yaml_ with following content:

@[code](@/docs/v5/code-examples/getting-started/docker-compose.yaml)

Run the container:

```bash
docker-compose -f docker-compose.yaml up
```

Refer to the [image overview](https://hub.docker.com/r/eventstore/eventstore/) for more information.

::::
:::: tab macOS

Event Store has a macOS package [you can download](https://eventstore.com/downloads/) and install, and we maintain a Homebrew Cask formula you can install:

```shell
brew cask install eventstore
```

In each case you can run Event Store with the `eventstore` command, and stop it with `Ctrl+c`. To use the default database location you need to use `sudo`, which we **strongly** recommend you don't do, or you can change the location with the `--db` parameter to a location your user account has access to.

To build Event Store from source, refer to the [Event Store README](https://github.com/EventStore/EventStore#mac-os-x).

::::
:::::

## Solving 503 errors from the Admin UI

There is a [known issue](http://stackoverflow.com/questions/8142396/what-causes-a-httplistener-http-503-error) with the .NET `HTTPListener` class (which Event Store uses) and bad URL ACL registrations, which can cause servers to return 503 errors for every request. If you see this, you can issue the following commands:

```posh
netsh http show urlacl
```

Look for an entry on the port you're trying to use (`2113` unless you've specified a custom port), then issue:

```posh
netsh http delete urlacl <the entry you just found>
```

For example:

```posh
netsh http delete urlacl http://+:2113/
```

These steps should resolve the issue.

## Shutting down an Event Store node

Event Store is designed to be safe by default, and it is expected that it will be shut down using `kill -9`. It is also possible to initiate a shutdown via the Admin UI, by clicking on the _Shutdown Server_ button located on the _Admin_ page. This may be useful if you do not have console access to the node or need to script initiating a shutdown.

## Securing Event Store

To secure Event Store, you can bind the server to the localhost interface and install a reverse proxy such as [nginx](http://nginx.org) or [Varnish](https://www.varnish-cache.org) on the public IP. Read [this guide](/v5/server/setting-up-varnish-in-linux.md) for an example of setting up Event Store with Varnish.

The reverse proxy is your public interface. Internally it handles the authentication and route requests to Event Store. Event Store is only accessible through the localhost adapter and is not exposed publicly. The locally running reverse proxy is allowed to cache responses, and because of this, reverse proxies are more performant than calling Event Store directly.

Even if you use a reverse proxy, you can support external authentication from Event Store itself. You do this by enabling the [ES-TrustedAuth](/v5/http-api/optional-http-headers/trusted-intermediary.md) trusted intermediary option in your configuration. This allows the intermediary to write a header with the user information that Event Store uses.