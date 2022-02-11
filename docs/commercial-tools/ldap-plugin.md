# LDAP Authentication Plugin for EventStoreDB

This plugin allows any LDAP protocol based directory services the ability to act as the authentication authority for EventStoreDB.

::: tip
The LDAP plugin is included as part of the commercial builds.
:::

To configure EventStoreDB to use the LDAP authentication plugin, make the following changes to [the configuration file of a database node](@server/configuration.md). You can make these changes after installation, but you need to stop the service, change the configuration and restart the service.

Set the authentication type to `ldaps`, and configure the plugin with an `LdapsAuth` section..

An example configuration file in YAML:

```yaml
AuthenticationType: ldaps
LdapsAuth:
  Host: 13.88.9.49
  Port: 636 #to use plaintext protocol, set Port to 389 and UseSSL to false 
  UseSSL: true
  ValidateServerCertificate: false #set this to true to validate the certificate chain
  AnonymousBind: false
  BindUser: cn=binduser,dc=mycompany,dc=local
  BindPassword: p@ssw0rd!
  BaseDn: ou=Lab,dc=mycompany,dc=local
  ObjectClass: organizationalPerson
  Filter: sAMAccountName
  RequireGroupMembership: false #set this to true to allow authentication only if the user is a member of the group specified by RequiredGroupDn
  GroupMembershipAttribute: memberOf
  RequiredGroupDn: cn=ES-Users,dc=mycompany,dc=local
  PrincipalCacheDurationSec: 60
  LdapGroupRoles:
      'cn=ES-Accounting,ou=Staff,dc=mycompany,dc=local': accounting
      'cn=ES-Operations,ou=Staff,dc=mycompany,dc=local': it
      'cn=ES-Admins,ou=Staff,dc=mycompany,dc=local': '$admins'
```

When a user authenticates against the LDAP server by attempting a bind using the provided username/password the user is assigned roles by using the active domain groups the user is part of. You can see this in the `LdapGroupRoles` section.

EventStoreDB has 2 built-in roles (`$admins` and `$ops`) which you can assign users. Users who belong to the `$admins` group can perform any operation in a non-restrictive manner.

## Troubleshooting common problems

If there is a misconfiguration an error is logged to the server's log file in most cases.

### Invalid bind credentials specified

-   Verify the `BindUser` and `BindPassword` parameters

### Exception during search - 'No such Object' or 'The object does not exist'

-   Verify the `BaseDn` parameter

### 'Server certificate error' or 'Connect Error - The authentication or decryption has failed'

-   Verify that the server certificate is valid. If it is a self-signed certificate, set `ValidateServerCertificate` to `false`.

### The LDAP server is unavailable.

-   Verify connectivity to the LDAP server from an EventStoreDB node (e.g. using `netcat` or `telnet`)
-   Verify the `Host` and `Port` parameters
-   Verify that the server certificate is valid. If it is a self-signed certificate, set `ValidateServerCertificate` to `false`.

### Error authenticating with LDAPS server. System.AggregateException: One or more errors occurred. ---> System.NullReferenceException: Object reference not set to an instance of an object. at Novell.Directory.Ldap.Connection.connect(String host, Int32 port, Int32 semaphoreId)

-   Due to a packaging bug, this error may be thrown when setting `UseSSL: true` on Windows. The workaround is to extract Mono.Security.dll to the _EventStore_ folder (where _EventStore.ClusterNode.exe_ is located)

### No errors in server logs but cannot login

-   Verify the `ObjectClass` and `Filter` parameters
-   If you have set `RequireGroupMembership` to `true`, verify that the user is part of the group specified by `RequiredGroupDn` and that the LDAP record has the `memberOf` attribute (specified by `GroupMembershipAttribute`)
