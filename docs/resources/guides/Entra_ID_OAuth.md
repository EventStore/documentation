---
title: Using Entra ID for authentication with KurrentDB on Azure
categories:
  - Server
  - Operations
tag:
  - Security
  - Operations
  - Authentication
  - Azure
---

## Guide: Using Entra ID for authentication with KurrentDB on Azure

### Prerequisites

- The [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/) is installed
- The user you have used to log into the Azure CLI has the ... permissions
- A tenant exists in Entra ID
- At least one user exists in the tenant

### Setup

1. First, populate environment variables with your Entra Tenant ID and the DNS hostname used for KurrentDB:

```sh
TENANT_ID= 
KURRENTDB_HOSTNAME=my.domain
```

2. Register a new app for KurrentDB

```sh
az ad app create --display-name "kurrentdb-dev" \               
    --web-redirect-uris "https://my.domain:2113/signin-oidc" \
    --sign-in-audience "AzureADMyOrg"
```

The Azure CLI should return a JSON object representing the newly created app. Take note of the `appId` returned in the JSON response.

If you need to retrieve the `appId` again, use the following command:

```sh
az ad app list --display-name "kurrentdb"
```

3. Add your user (the user which you are using with the Azure CLI) as an Owner of the application:

```sh
az ad app owner add --id $APP_ID --owner-object-id $(az ad signed-in-user show --query id --output tsv)
```

4. Add your user as an owner of the Service Principal associated with the application:

```sh
SP_ID=$(az ad sp show --id $APP_ID --query id --output tsv)
USER_ID=$(az ad signed-in-user show --query id --output tsv)
az rest --method POST --uri https://graph.microsoft.com/beta/servicePrincipals/$SP_ID/owners/\$ref --body "{\"@odata.id\": \"https://graph.microsoft.com/v1.0/directoryObjects/$USER_ID\"}"
```

2. Optionally, create a client secret:

```sh
az ad app credential reset --id $APP_ID --append --display-name "kurrentdb-secret"
```

Copy the password which is returned. The password will not be displayed again.

3. Add the following configuration into your [KurrentDB YAML configuration file](https://docs.kurrent.io/server/latest/configuration/#yaml), replacing `{tenant-id}` and `{app-id}`:

```yaml
AuthenticationType: oauth
OAuth:
  Audience: AzureADMyOrg
  Issuer: https://login.microsoftonline.com/{tenant-id}/v2.0
  ClientId: {app-id}
  ClientSecret: {client-secret}
  AdditionalEndpointBaseAddresses:
    - https://login.microsoftonline.com/{tenant-id}
    - https://graph.microsoft.com/oidc/userinfo
```

4. Start KurrentDB and try to navigate to the database UI in your browser. You should be redirected to the Entra login page. Upon logging in with a user, you should see that you cannot see the statistics or any streams. In order to access the database features, we need to assign a role to the user.


5. Create a JSON file called `admin-role.json` representing an admin role (using the [built-in `$admins` KurrentDB role](https://docs.kurrent.io/server/v25.0/security/user-authorization.html#admins-role)) as follows:

```json
[{
    "allowedMemberTypes": [
      "User"
    ],
    "description": "KurrentDB admin role",
    "displayName": "Admin",
    "isEnabled": "true",
    "value": "$admins"
}]
```

6. Create the role with the following command:

```sh
az ad app update --id $APP_ID --app-roles @admin-role.json

ROLE_ID=$(az ad app show --id $APP_ID --query "appRoles[0].id" -o tsv) 
```

7. Assign the role with:

```sh
az rest --method POST \                                                       
  --uri "https://graph.microsoft.com/v1.0/servicePrincipals/$SP_ID/appRoleAssignments" \
  --body "{
    \"principalId\": \"$USER_ID\",
    \"resourceId\": \"$SP_ID\",
    \"appRoleId\": \"$ROLE_ID\"
  }"
```

8. Log into KurrentDB again. You should now have access to read and write streams.


### Use in clients

TODO