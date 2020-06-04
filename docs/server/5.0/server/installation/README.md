## Install and run Event Store

::: warning
The described is for development and evaluation of Event Store. It does not describe a production setup. The HTTP examples use cURL, but you can read Atom feeds with a wide variety of applications and languages.
:::

**This needs attention**

::: tip
Unless you pass a database option with `--db`, Event Store writes to a new database created in the host system's temporary files path each time it is started. For more information on Command Line Arguments read [this guide](../command-line-arguments.md).
:::

::::: el-tabs 
:::: el-tab-pane label=Windows

The prerequisites for installing on Windows are:

- NET Framework 4.0+

Event Store has [Chocolatey packages](https://chocolatey.org/packages/eventstore-oss) available that you can install with the following command in an elevated terminal:

```powershell
choco install eventstore-oss
```

You can also [download](https://eventstore.com/downloads/) a binary, unzip the archive and run from the folder location with an administrator console.

The following command starts Event Store with the database stored at the path _./db_ and the logs in _./logs_. You can view further command line arguments in the [server docs](../).

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
:::: el-tab-pane label=Linux

The prerequisites for installing on Linux are:

- We recommend [Mono 5.16.0](https://www.mono-project.com/download/stable/), but other versions may also work.

Event Store has pre-built [packages available for Debian-based distributions](https://packagecloud.io/EventStore/EventStore-OSS), [manual instructions for distributions that use RPM](https://packagecloud.io/EventStore/EventStore-OSS/install#bash-rpm), or you can [build from source](https://github.com/EventStore/EventStore#linux). The final package name to install is `eventstore-oss`.

If you installed from a pre-built package, start Event Store with:

```bash
sudo systemctl start eventstore
```

When you install the Event Store package, the service doesn't start by default. This is to allow you to change the configuration, located at _/etc/eventstore/eventstore.conf_ and to prevent creating a default database. To start Event Store on port 80 as a service, refer to [Configuring your installation](../configuring.md#start-as-a-service-on-a-custom-port)

::: warning
We recommend that when using Linux you set the 'open file limit' to a high number. The precise value depends on your use case, but at least between `30,000` and `60,000`.
:::

::::
:::: el-tab-pane label=Docker

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
:::: el-tab-pane label="Docker Compose"

Event Store has a Docker image available for any platform that supports Docker. In order to save keystrokes it is possible to run Event Store via docker-compose.

Pull the Docker image:

```bash
docker pull eventstore/eventstore
```

Create file `docker-compose.yaml` with following content:

<<< @/docs/server/5.0/server/sample-code/docker-compose.yaml

Run the container:

```bash
docker-compose -f docker-compose.yaml up
```

Refer to the [image overview](https://hub.docker.com/r/eventstore/eventstore/) for more information.

::::
:::: el-tab-pane label=macOS

Event Store has a macOS package [you can download](https://eventstore.com/downloads/) and install, and we maintain a Homebrew Cask formula you can install:

```bash
brew cask install eventstore
```

In each case you can run Event Store with the `eventstore` command, and stop it with `Ctrl+c`. To use the default database location you need to use `sudo`, which we **strongly** recommend you don't do, or you can change the location with the `--db` parameter to a location your user account has access to.

To build Event Store from source, refer to the [Event Store README](https://github.com/EventStore/EventStore#mac-os-x).

::::
:::::

