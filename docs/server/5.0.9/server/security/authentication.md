# Authentication

EventStoreDB supports authentication based on usernames and passwords out of the box.

External authentication?

| -AuthenticationType<br/>--authentication-type=VALUE<br/> | AUTHENTICATION_TYPE | AuthenticationType | The type of authentication to use. (Default: internal) |

| -AuthenticationConfig<br/>--authentication-config=VALUE<br/> | AUTHENTICATION_CONFIG | AuthenticationConfig | Path to the configuration file for authentication configuration (if applicable). |

## Default users

EventStoreDB provides two default users, `$ops` and `$admin`.

`$admin` has full access to everything in Event Store. It can read and write to protected streams, which is any stream that starts with \$, such as `$projections-master`. Protected streams are usually system streams, for example, `$projections-master` manages some of the projections' states. The `$admin` user can also run operational commands, such as scavenges and shutdowns on Event Store.

An `$ops` user can do everything that an `$admin` can do except manage users and read from system streams (except for `$scavenges` and `$scavenges-streams`).

## New users

New users created in Event Store are standard non-authenticated users. Non-authenticated users are allowed `GET` access to the `/info`, `/ping`, `/stats`, `/elections`, and `/gossip` system streams.

`POST` access to the `/elections` and `/gossip` system streams is only allowed on the internal HTTP service.

By default, any user can read any non-protected stream unless there is an ACL preventing that.

## Externalised authentication

You can also use the trusted intermediary header for externalized authentication that allows you to integrate almost any authentication system with EventStoreDB. Read more about [the trusted intermediary header](trusted-intermediary.md).
