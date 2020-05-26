# Security

Event Store supports basic authentication for HTTP API calls, and access control lists (ACL).

## Authentication

### Creating users

Event Store supports basic HTTP authentication to internal users. You create these users with the RESTful API or the admin console. You need to use the credentials of the default user in the request, which has the user name of `admin`, and the password of `changeit`.

![Create a user with the admin UI](/v5/images/http-api-create-user.png)

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](docs/v5/code-examples/http-api/new-user.sh)

::::
:::: tab Response

@[code lang=json transclude={3-20}](docs/v5/code-examples/http-api/new-user.sh)

::::
:::::

Once you have added users, you can use their details with requests.

::: tip
You can also use the 'trusted intermediary' header for externalized authentication that allows you to integrate almost any authentication system with Event Store. Read more about [the trusted intermediary header](optional-http-headers/trusted-intermediary.md).
:::

If you were to use the wrong user or no user when a request requires one, you receive a `401 Unauthorized` response.

::::: tabs
:::: tab Request

@[code lang=bash transclude={1-1}](docs/v5/code-examples/http-api/incorrect-user.sh)

::::
:::: tab Response

@[code lang=json transclude={3-13}](docs/v5/code-examples/http-api/incorrect-user.sh)

::::
:::::

As you pass the username and password in the request we recommend you run Event Store over HTTP, and enable SSL to encrypt the user information. [Read this guide for instructions](/v5/server/setting-up-ssl.md). If you are running the clustered version you can also setup SSL for the replication protocol.

<!-- TODO: Does this need further explanation? Any more details anywhere? -->

## Access control lists

Alongside authentication, Event Store supports per stream configuration of Access Control Lists (ACL). To configure the ACL of a stream go to its head and look for the `metadata` relationship link to fetch the metadata for the stream.

To set access control lists over HTTP you can post to the metadata stream as [with setting any other metadata](/v5/http-api/stream-metadata.md). You can also set Access Control Lists for a stream in the admin UI.

![Setting ACL with the admin UI](/v5/images/http-api-create-user.png)

For more information on the structure of Access Control Lists read [Access Control Lists](/v5/server/users-and-access-control-lists.md).

<!-- TODO: Merge ACL here? -->