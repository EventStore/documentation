# User management

EventStoreDB allows managing users programmatically using the .NET client. This guide covers details about default users, groups and managing users.

## Default users

By default EventStoreDB has two users `admin` and `ops` with the password `changeit`.

::: tip
We recommend you create separate functional account with minimal access rights for any connected application or service.
:::

## Default groups

By default EventStoreDB has two user groups `$admins` `$ops`. However it is possible to create custom groups with the .NET client.  

## User management

The EventStoreDB .NET client includes helper methods that use the HTTP API to allow for the management of users. This section describes the methods found in the `UsersManager` class. All methods in this class are asynchronous.

### Create UsersManager instance

<<< @/docs/clients/dotnet/20.10/sample-code/DotNetClient/UsersCreateUsersManager.cs#UserManager

Resolving the host name may be especially useful if the EventStoreDB Admin UI is not available under loopback address e.g., when container orchestrator assign dynamic DNS based on service name.

### Create a user

Creates a user, the credentials for this operation must be a member of the `$admins` group.

```csharp
public Task CreateUserAsync(string login, string fullName, string[] groups, string password, UserCredentials userCredentials = null)
```

### Disable a user

Disables a user, the credentials for this operation must be a member of the `$admins` group.

```csharp
public Task DisableAsync(string login, UserCredentials userCredentials = null)
```

### Enable a User

Enables a user, the credentials for this operation must be a member of the `$admins` group.

```csharp
public Task EnableAsync(string login, UserCredentials userCredentials = null)
```

### Delete a user

Deletes (non-recoverable) a user, the credentials for this operation must be a member of the `$admins` group. If you prefer this action to be recoverable, disable the user as opposed to deleting the user.

```csharp
public Task DeleteUserAsync(string login, UserCredentials userCredentials = null)
```

### List all users

Lists all users.

```csharp
public Task<List<UserDetails>> ListAllAsync(UserCredentials userCredentials = null)
```

### Get details of user

Return the details of the user supplied in user credentials (e.g. the user making the request).

```csharp
public Task<UserDetails> GetCurrentUserAsync(UserCredentials userCredentials)
```

### Get details of logged in user

```csharp
public Task<UserDetails> GetUserAsync(string login, UserCredentials userCredentials)
```

### Update user details / manage user groups

```csharp
public Task UpdateUserAsync(string login, string fullName, string[] groups, UserCredentials userCredentials = null)
```

Although `UsersManager` does not have separate methods for idempotent adding/removing user groups it can be extended:

<<< @/docs/clients/dotnet/20.10/sample-code/DotNetClient/UsersManagerExtensions.cs#Extensions

### Reset user password

Resets the password of a user. The credentials for this operation must be part of the `$admins` group.

```csharp
public Task ResetPasswordAsync(string login, string newPassword, UserCredentials userCredentials = null)
```
