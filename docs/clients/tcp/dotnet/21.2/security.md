---
sitemap.priority: 0.005
---

# Security

EventStoreDB supports basic authentication for HTTP API and TCP calls, and supports access control lists (ACL) for streams.

## Authentication and authorization

EventStoreDB supports basic HTTP authentication to internal users. You create and manage these users with the RESTful API or the Admin UI. Read more in the [users management guide](@clients/http-api/api.md#create-a-user). Once you have added users, you can use their details with HTTP requests or native client's authorization process.

Alternatively, you can also use the 'trusted intermediary' header for externalized authentication that allows you to integrate almost any authentication system with EventStoreDB. Read more about [the trusted intermediary header](@server/security.md#trusted-intermediary).

If you were to use the wrong user or no user when connecting to EventStoreDB, you receive a `401 Unauthorized` response for HTTP API or Exception for the native client.

::: tip
Remember to change the default password for default users and disable unused users after the cluster setup is complete.
:::

## Secure EventStoreDB node

We recommend you connect to EventStoreDB over SSL to encrypt the user information. [Read this guide for instructions](@server/security.md#protocol-security).

::: warning
Avoid exposing EventStoreDB to the global internet network.
:::

## User management

The EventStoreDB .NET client includes helper methods that use the HTTP API to allow for the management of users. This section describes the methods found in the `UsersManager` class. All methods in this class are asynchronous.

### Default users

By default, EventStoreDB has two users `admin` and `ops` with the password `changeit`.

::: tip
We recommend you create separate functional account with minimal access rights for any connected application or service.
:::

### Default groups

By default, EventStoreDB has two user groups `$admins` `$ops`. However, it is possible to create custom groups with the .NET client.

### Create UsersManager instance

@[code{UserManager}](./sample-code/DotNetClient/UsersCreateUsersManager.cs)

Resolving the host name may be especially useful if the EventStoreDB Admin UI is not available under loopback address e.g., when container orchestrator assign dynamic DNS based on service name.

### Create a user

Creates a user, the credentials for this operation must be a member of the `$admins` group.

```csharp
Task CreateUserAsync(
    string login, string fullName, string[] groups, 
    string password, UserCredentials userCredentials = null
);
```

### Disable a user

Disables a user, the credentials for this operation must be a member of the `$admins` group.

```csharp
Task DisableAsync(string login, UserCredentials userCredentials = null);
```

### Enable a User

Enables a user, the credentials for this operation must be a member of the `$admins` group.

```csharp
Task EnableAsync(string login, UserCredentials userCredentials = null);
```

### Delete a user

Deletes (non-recoverable) a user, the credentials for this operation must be a member of the `$admins` group. If you prefer this action to be recoverable, disable the user as opposed to deleting the user.

```csharp
Task DeleteUserAsync(string login, UserCredentials userCredentials = null);
```

### List all users

Use this method to get a list of all users in the cluster.

```csharp
Task<List<UserDetails>> ListAllAsync(UserCredentials userCredentials = null);
```

### Get user details

Return the details of the user supplied in user credentials (e.g. the user making the request).

```csharp
Task<UserDetails> GetCurrentUserAsync(UserCredentials userCredentials);
```

### Get details of logged-in user

```csharp
Task<UserDetails> GetUserAsync(string login, UserCredentials userCredentials);
```

### Update user details and groups

Although `UsersManager` does not have separate methods for idempotent adding/removing user groups it can be extended:

@[code{Extensions}](./sample-code/DotNetClient/UsersManagerExtensions.cs)

```csharp
Task UpdateUserAsync(
    string login, string fullName, string[] groups, 
    UserCredentials userCredentials = null
);
```

### Reset user password

Resets the password of a user. The credentials for this operation must be part of the `$admins` group.

```csharp
Task ResetPasswordAsync(
    string login, string newPassword, 
    UserCredentials userCredentials = null
);
```

## Access control lists

Alongside authentication, EventStoreDB supports per stream configuration of Access Control Lists (ACL). To configure the ACL of a stream go to its head and look for the `metadata` relationship link to fetch the metadata for the stream.

For more information on the structure of Access Control Lists read [Access Control Lists](@server/security.md#access-control-lists).

### ACL example

The ACL below gives `writer` read and write permission on the stream, while `reader` has read permission on the stream. Only users in the `$admins` group can delete the stream or read and write the metadata.

```csharp
var metadata = StreamMetadata.Build()
    .SetCustomPropertyWithValueAsRawJsonString(
        "customRawJson",
        @"{
            ""$acl"": {
                ""$w"": ""writer"",
                ""$r"": [
                    ""reader"",
                    ""also-reader""
                ],
                ""$d"": ""$admins"",
                ""$mw"": ""$admins"",
                ""$mr"": ""$admins""
            }
        }"
    );
await connection.SetStreamMetadataAsync(
    streamName, 
    ExpectedVersion.Any, 
    metadata, 
    adminCredentials
);
```
