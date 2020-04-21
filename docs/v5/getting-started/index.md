# Step 1 - Install, run, and write your first event

This getting started guide shows you how to get started with Event Store using the Atom publishing protocol as the primary interface. 

::: warning
The described is for development and evaluation of Event Store. It does not describe a production setup. The HTTP examples use cURL, but you can read Atom feeds with a wide variety of applications and languages.
:::

This first step covers installation and running Event Store, and writing your first event.

## Install and run Event Store

::: tip
Unless you pass a database option with `--db`, Event Store writes to a new database created in the host system's temporary files path each time it is started. For more information on Command Line Arguments read [this guide](/server/command-line-arguments.md).
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

The following command starts Event Store with the database stored at the path _./db_ and the logs in _./logs_. You can view further command line arguments in the [server docs](/server/index.md).

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

When you install the Event Store package, the service doesn't start by default. This is to allow you to change the configuration, located at _/etc/eventstore/eventstore.conf_ and to prevent creating a default database. To start Event Store on port 80 as a service, refer to [Configuring your installation](/server/configuring.md#start-as-a-service-on-a-custom-port)

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

## Interacting with an Event Store server

There are three ways to interact with Event Store:

1.  [With the Admin UI](/server/admin-ui.md).
2.  [With the HTTP API](/http-api/index.md).
3.  With a Client API, which you need to install first. Our documentation covers the [.NET Core client API](/dotnet-api/index.md) and the [JVM client](https://github.com/EventStore/EventStore.JVM) but [others](/getting-started/which-api-sdk.md) are available.

## Discover Event Store via Admin UI

Event Store ships with GUI called Admin UI, which allows browsing statistics, streams and events manipulation, user management and more. Admin UI is visible under `2113` port, navigate to <http://127.0.0.1:2113/> in your web browser to see it.

::: tip
The default username and password is `admin:changeit`
:::

![The Admin UI Dashboard](../images/es-web-admin-dashboard.png)

## First call to HTTP API

Event Store expose HTTP API that allows cross-platform integration. API is exposed under the same port `2113` as Admin UI. For example `curl -i http://127.0.0.1:2113/stats` for the HTTP API.

## Connecting to Event Store

Get on the fast-track with [a native SDK for your language of choice](/getting-started/which-api-sdk.md).

::::: tabs
:::: tab .NET Client

[Install the .NET client API](https://www.nuget.org/packages/EventStore.Client) using your preferred method.

Add it to your project:

```shell
dotnet add package EventStore.Client
```

And require it in your code:

@[code lang=cpp transclude={7-10}](@/docs/v5/code-examples/DocsExample/Program.cs)

::::
:::: tab JVM client

[Add the JVM client](https://github.com/EventStore/EventStore.JVM#setup) using Maven:

@[code lang=xml transclude={28-32}](@/docs/v5/code-examples/EventStore.Samples.Java/pom.xml)

And import it in your code.

::::
:::::

To use a client API, you use port `1113` and create a connection:

::::: tabs
:::: tab .NET client

When using the .NET client, you also need to give the connection a name.

@[code lang=cpp transclude={32-34}](@/docs/v5/code-examples/DocsExample/Program.cs)

In this example we used the [`EventStoreConnection.Create()`](xref:EventStore.ClientAPI.EventStoreConnection.Create(System.String,System.String)) overloaded method but [others are available](xref:EventStore.ClientAPI.EventStoreConnection).

::::
:::: tab JVM client

@[code lang=java transclude={16-21}](@/docs/v5/code-examples/EventStore.Samples.Java/src/main/java/org/eventstore/sample/WriteEventExample.java)

For our JVM examples we use [akka](https://akka.io), a toolkit for building highly concurrent and distributed JVM applications.

::::
:::::

## Writing events to an Event Stream

Event Store operates on a concept of Event Streams, and the first operation we look at is how to write to a stream. If you are Event Sourcing a domain model, a stream equates to an aggregate function. Event Store can handle hundreds of millions of streams, so create as many as you need.

If you post to a stream that doesn't exist, Event Store creates it before adding the events.

### Writing events using the admin UI

You can write events using the Admin UI by clicking the _Stream Browser_ tab, the _Add Event_ button, filling in the form with relevant values and clicking the _Add_ button at the bottom of the page.

![Creating an event with the Admin UI interface](../images/getting-started-add-event.gif)

Open a text editor, copy and paste the following event definition, and save it as _event.json_.

@[code](@/docs/v5/code-examples/getting-started/event.json)

### Writing events programmatically

::::: tabs
:::: tab HTTP API

Use the following cURL command, passing the name of the stream and the events to write:

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/getting-started/write-event.sh)

::: tip
You can also post events to the HTTP API as XML, by changing the `Content-Type` header to `XML`.
:::

::: tip Next steps
Read [this guide](/http-api/creating-writing-a-stream.md) for more information on how to write events with the HTTP API.
:::

::::
:::: tab .NET client

To use the .NET client, use the following method, passing the name of the stream, the version, and the events to write:

@[code lang=cpp transclude={12-17}](@/docs/v5/code-examples/DocsExample/GettingStarted/ConnectEventStore.cs)

::: tip Next steps
Read [this guide](/http-api/creating-writing-a-stream.md) for more information on how to write events with the .NET API. We don't cover version checking in this guide, but you can read more in [the optimistic concurrency guide](/dotnet-api/optimistic-concurrency-and-idempotence.md).
:::

::::
:::: tab JVM client

To use the JVM Client, use the following method, passing the name of the stream, the version, and the events to write. You also need an Akka `AbstractActor` to return the response from Event Store:

@[code lang=java transclude={23-55}](@/docs/v5/code-examples/EventStore.Samples.Java/src/main/java/org/eventstore/sample/WriteEventExample.java)

::::
:::::

## Next step

In this first part of our getting started guide you learned how to install and run Event Store and write your first event. The next part covers reading events from a stream.

-   [Step 2 - Read events from a stream and subscribe to changes](/v5/getting-started/reading-subscribing-events.md)
