# Install and run EventStoreDB

The described installation is for development and evaluation of EventStoreDB. It does not describe a production setup. The HTTP examples use cURL, but you can use the HTTP API using the library of your choice or read Atom feeds with a wide variety of applications and languages. You can also use one of the [available SDKs](../getting-started/which-api-sdk.md).

## Linux

EventStoreDB has pre-built [packages available for Debian-based distributions](https://packagecloud.io/EventStore/EventStore-OSS), [manual instructions for distributions that use RPM](https://packagecloud.io/EventStore/EventStore-OSS/install#bash-rpm), or you can [build from source](https://github.com/EventStore/EventStore#linux). The final package name to install is `eventstore-oss`.

If you installed from a pre-built package, the server gets registered as a service. Therefore, you can start EventStoreDB with:

```bash
sudo systemctl start eventstore
```

When you install the EventStoreDB package, the service doesn't start by default. It's done to allow you to change the configuration, located at _/etc/eventstore/eventstore.conf_ and to prevent creating database and index files in the default location.

::: warning
We recommend that when using Linux you set the 'open file limit' to a high number. The precise value depends on your use case, but at least between `30,000` and `60,000`.
:::

You can also build EventStoreDB on Linux from source. Before doing that, you need to install Mono. We recommend [Mono 5.16.0](https://www.mono-project.com/download/stable/), but other versions may also work. EventStoreDB packages have Mono embedded, so you don't need to install anything except the EventStoreDB package.

## Docker

EventStoreDB has a Docker image available for any platform that supports Docker.

Pull the Docker image:

```bash
docker pull eventstore/eventstore:5
```

Run the container:

```bash
docker run --name eventstore-node -it -p 2113:2113 -p 1113:1113 eventstore/eventstore:5
```

Refer to the [image overview](https://hub.docker.com/r/eventstore/eventstore/) for more information.

The container won't accept command line parameters to the server executable. We recommend configuring EventStoreDB using the configuration file and mapping it as a volume.

In order to sustainably keep the data, we also recommend mapping the database and index volumes.

## Docker Compose

EventStoreDB has a Docker image available for any platform that supports Docker. In order to save keystrokes it is possible to run EventStoreDB via Docker Compose.

Create file `docker-compose.yaml` with following content:

<<< @/docs/server/5.0/server/sample-code/docker-compose.yaml

Run the container:

```bash
docker-compose -f docker-compose.yaml up
```

Refer to the [image overview](https://hub.docker.com/r/eventstore/eventstore/) for more information.

**TODO: explain more about using Docker and Compose. Volume mappings and other relevant configuration**

## Windows

The prerequisites for installing on Windows are:

- NET Framework 4.0+

EventStoreDB has [Chocolatey packages](https://chocolatey.org/packages/eventstore-oss) available that you can install with the following command in an elevated terminal:

```powershell
choco install eventstore-oss
```

You can also [download](https://eventstore.com/downloads/) a binary, unzip the archive and run from the folder location with an administrator console.

The following command starts EventStoreDB with the database stored at the path _./db_ and the logs in _./logs_. Read mode about configuring the EventStoreDB server node in the [Configuration section](../configuration/README.md).

```powershell
EventStore.ClusterNode.exe --db ./db --log ./logs
```

EventStoreDB runs in an administration context because it starts an HTTP server through `http.sys`. For permanent or production instances you need to provide an ACL such as:

```powershell
netsh http add urlacl url=http://+:2113/ user=DOMAIN\username
```

For more information, refer to Microsoft `add urlacl` [documentation](https://docs.microsoft.com/en-us/windows/win32/http/add-urlacl).

To build EventStoreDB from source, refer to the [Event Store README](https://github.com/EventStore/EventStore#windows).

## macOS

EventStoreDB has a macOS package [you can download](https://eventstore.com/downloads/) and install, and we maintain a Homebrew Cask formula you can install:

```bash
brew cask install eventstore
```

In each case you can run EventStoreDB with the `eventstore` command, and stop it with `Ctrl+C`. To use the default database location you need to use `sudo`, which we **strongly** recommend you don't do, or you can change the location with the `--db` parameter to a location your user account has access to.

To build EventStoreDB from source, refer to the [EventStoreDB README](https://github.com/EventStore/EventStore#mac-os-x).


