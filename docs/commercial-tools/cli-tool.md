# Node administration CLI

This CLI tool is a command line interface for administering EventStoreDB nodes. It allows you to run tasks similar to those available in the web admin interface and SDKs, including administrating users, projections and configuration.

## Download

<!-- TODO: Refactor to VuePress -->

<p class="call-to-action">
<a href="/downloads/es_cli.windows.1.7.0.zip" class="btn btn--primary">EventStoreDB CLI 1.7.0 for Windows</a>
<a href="/downloads/es_cli.osx.1.7.0.tar.gz" class="btn btn--primary">EventStoreDB CLI 1.7.0 for macOS</a>
<a href="/downloads/es_cli.linux.1.7.0.tar.gz" class="btn btn--primary">EventStoreDB CLI 1.7.0 for Linux</a>
</p>

<!-- TODO: packages? -->

## Usage

```shell
es-cli [options] <command> <sub-command> [args]
```

Where `<command>` is equal to the section, and `<sub-command>` the operation. For example, to shutdown a node:

```shell
es-cli admin shutdown
```

### Connecting and authentication

Using the CLI tool requires specifying an EventStoreDB node by passing the URL with the `--serveurl` option, and your admin credentials with the `--username` and `--password` options:

```bash
es-cli --serverurl="http://localhost:2113" --username=admin --password=changeit
```

## Configuration

You can also create a file with configuration values at the correct file path for your operating system.

:::: tabs
::: tab Windows

```powershell
%AppData%/eventstore.rc
```

:::
::: tab Linux and macOS

```shell
~/.eventstorerc
```

:::
::::

The configuration file may contain any of the following values:

```shell
serverurl="http://127.0.0.1:2113"
username="admin"
password="changeit"
output="json" # Or XML
verbose=true # Or false
```

## Commands

Usage:

```shell
es-cli [<options>] <command> [<args>]
```

### Options

| Option        | Description                                              |
|---------------|----------------------------------------------------------|
| `--version`   | Get the version of EventStoreDB CLI                      |
| `--help`      | Display help                                             |
| `--output`    | How output should be formatted (`text` or `json`)        |
| `--password`  | The admin password                                       |
| `--serverurl` | The url of the EventStoreDB server                       |
| `--username`  | The admin username                                       |
| `--verbose`   | Verbose output of requests sent to the EventStoreDB node |

### Commands summary

| Command                               | Sub commands                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [admin](#admin)                       | [scavenge](#admin-scavenge), [shutdown](#admin-shutdown), [merge_indexes](#admin-merge_indexes), [calculate_stream_size](#admin-calculate_stream_size), [backup](#admin-backup), [restore](#admin-restore), [s3_backup](#admin-s3_backup), [s3_restore](#admin-s3_restore), [azure_backup](#admin-azure_backup), [azure_restore](#admin-azure_restore), [verify_db](#admin-verify_db), [clear_scavenge_streams](#admin-clear_scavenge_streams), [delete_streams](#admin-delete_streams) |
| [user](#user)                         | [add](#user-add), [change_password](#user-change_password), [delete](#user-delete), [disable](#user-disable), [update](#user-update), [enable](#user-enable), [list](#user-list), [reset_password](#user-reset_password)                                                                                                                                                                                                                                                                |
| [projections](#projections)           | [delete](#projections-delete), [disable](#projections-disable), [enable](#projections-enable), [list](#projections-list), [new](#projections-new), [result](#projections-result), [state](#projections-state), [status](#projections-status), [restore_checkpoint](#projections-restore_checkpoint), [has_stalled](#projections-has_stalled)                                                                                                                                            |
| [competing](#competing)               | [list](#competing-list), [create](#competing-create), [update](#competing-update)                                                                                                                                                                                                                                                                                                                                                                                                       |
| [config_generator](#config_generator) | [create_config](#config_generator-create_config)                                                                                                                                                                                                                                                                                                                                                                                                                                        |

### Command details

#### admin

```shell
es-cli admin [--version] [--help] <command> [<args>]
```

| Command                                                 | Description                                                                                |
|---------------------------------------------------------|--------------------------------------------------------------------------------------------|
| [azure_backup](#admin-azure_backup)                     | Backs up the EventStoreDB database to the specified container in Azure Blob Storage        |
| [azure_restore](#admin-azure_restore)                   | Restores an EventStoreDB database from a specified container in Azure Blob Storage         |
| [backup](#admin-backup)                                 | Backs up the EventStoreDB database to the destination directory                            |
| [calculate_stream_size](#admin-calculate_stream_size)   | Calculates the size on disk of the give stream                                             |
| [clear_scavenge_streams](#admin-clear_scavenge_streams) | Deletes all the scavenge history streams                                                   |
| [delete_streams](#admin-delete_streams)                 | Deletes streams matching the specified regular expression                                  |
| [merge_indexes](#admin-merge_indexes)                   | Manually merge indexes of EventStoreDB                                                     |
| [restore](#admin-restore)                               | Restores the EventStoreDB database from the provided location to the destination directory |
| [s3_backup](#admin-s3_backup)                           | Backs up the EventStoreDB to an S3 bucket                                                  |
| [s3_restore](#admin-s3_restore)                         | Restores EventStoreDB from an S3 bucket                                                    |
| [scavenge](#admin-scavenge)                             | Schedule a scavenge on EventStoreDB                                                        |
| [shutdown](#admin-shutdown)                             | Shutdown the EventStoreDB instance                                                         |
| [verify_db](#admin-verify_db)                           | Verify the integrity of an EventStore database                                             |

#### admin azure_backup

```shell
es-cli admin azure_backup [options]
```

Backs up the EventStoreDB database to the specified container in Azure Blob Storage.

| Option                | Description                                                                               |
|-----------------------|-------------------------------------------------------------------------------------------|
| `-databasesource`     | The location of the EventStoreDB database                                                 |
| `-indexsource`        | The location of the EventStoreDB index (default: databasesource/index)                    |
| `-differential`       | Backup only new or changed files                                                          |
| `-deleteextra`        | Delete extraneous files from the destination (with -differential only)                    |
| `-storageaccountname` | The name of the storage account                                                           |
| `-storageaccountkey`  | The account key of the storage account (found in **security** > **access keys** on azure) |
| `-databasecontainer`  | The destination container of the database backup                                          |
| `-indexcontainer`     | The destination container of the index backup (default: databasecontainer-index)          |
| `-maxretrycount`      | The number of times to retry an upload before cancelling the backup (default: 3)          |
| `-y`                  | Automatically confirm prompt to delete files from the destination directory               |

#### admin azure_restore

```shell
es-cli admin azure_restore [options]
```

Restores an EventStoreDB database from a specified container in Azure Blob Storage.

| Option                | Description                                                                               |
|-----------------------|-------------------------------------------------------------------------------------------|
| `-databasesource`     | The location of the EventStoreDB database                                                 |
| `-indexsource`        | The location of the EventStoreDB index (default: databasesource/index)                    |
| `-storageaccountname` | The name of the storage account                                                           |
| `-storageaccountkey`  | The account key of the storage account (found in **security** > **access keys** on azure) |
| `-databasecontainer`  | The container of the database backup                                                      |
| `-indexcontainer`     | The container of the index backup (default: databasecontainer-index)                      |
| `-maxretrycount`      | The number of times to retry a download before cancelling the restore (default: 3)        |
| `-y`                  | Automatically confirm prompt to delete the files in the destination folders if they exist |

#### admin backup

```shell
es-cli admin backup [options]
```

Backs up the EventStoreDB database to the destination directory.

| Option                 | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `-databasesource`      | The location of the EventStoreDB database                                   |
| `-databasedestination` | The backup destination                                                      |
| `-indexsource`         | The location of the Index files (default: databasesource/index)             |
| `-indexdestination`    | The index backup destination (default: databasedestination/index)           |
| `-differential`        | Backup only new or changed files                                            |
| `-deleteextra`         | Delete extraneous files from the destination (with -differential only)      |
| `-y`                   | Automatically confirm prompt to delete files from the destination directory |

#### admin calculate_stream_size

```shell
es-cli admin calculate_stream_size [options]
```

Calculates the size on disk of the given stream.

| Option        | Description |
|---------------|-------------|
| `-streamname` | Stream Name |

#### admin clear_scavenge_streams

no options

#### admin delete_streams

```shell
es-cli admin delete_streams [options]
```

Deletes streams matching the specified regular expression.

| Option         | Description                                                    |
|----------------|----------------------------------------------------------------|
| `-pattern`     | Regular expression that the streams must match                 |
| `-list`        | Only list the streams matching the pattern, do not delete them |
| `-fromall`     | Force read stream names from $all                              |
| `-fromstreams` | Force read stream names from $streams                          |
| `-noverify`    | Does not verify if the stream exists (faster)                  |
|                | USE THE FOLLOWING OPTIONS WITH CAUTION!                        |
| `-hard`        | Hard delete the streams (Default: soft delete)                 |
| `-system`      | Include system streams (starting with $) for deletion          |
| `-y`           | Automatically confirm prompt to delete a stream                |

#### admin merge_indexes

No options.

#### admin restore

```shell
es-cli admin restore [options]
```

Restores the EventStoreDB database from the provided location to the destination directory.

| Option                 | Description                                                               |
|------------------------|---------------------------------------------------------------------------|
| `-databasesource`      | The location of the backup to restore                                     |
| `-databasedestination` | The destination of the restore                                            |
| `-indexsource`         | The location of the index backup (default: databasesource/index)          |
| `-indexdestination`    | The destination of the index restore (default: databasedestination/index) |
| `-y`                   | Automatic yes to prompts to delete files from destination directory       |

#### admin s3_backup

```shell
es-cli admin s3_backup [options]
```

Backs up an EventStoreDB database to the destination S3 bucket.

| Option                 | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `-databasesource`      | The location of the EventStoreDB database                                   |
| `-databasedestination` | The backup destination in the s3 bucket                                     |
| `-s3bucket`            | The name of the S3 bucket                                                   |
| `-indexsource`         | The location of the Index files (default: databasesource/index)             |
| `-indexdestination`    | The index backup destination (default: databasedestination/index)           |
| `-differential`        | Backup only new or changed files                                            |
| `-deleteextra`         | Delete extraneous files from the destination (with -differential only)      |
| `-awsregion`           | The AWS region of the bucket                                                |
| `-awsaccesskeyid`      | The AWS access key to use (if not provided, use environment variables)      |
| `-awssecretkey`        | The AWS secret key to use (if not provided, use environment variables)      |
| `-awstoken`            | The AWS token to use                                                        |
| `-y`                   | Automatically confirm prompt to delete files from the destination directory |

#### admin s3_restore

```shell
es-cli admin s3_restore [options]
```

Restores an EventStoreDB database from an S3 bucket.

| Option                 | Description                                                                       |
|------------------------|-----------------------------------------------------------------------------------|
| `-databasesource`      | The location in the S3 bucket of the backup to restore                            |
| `-databasedestination` | The destination of the restore                                                    |
| `-s3bucket`            | The name of the S3 bucket                                                         |
| `-indexsource`         | The location in the S3 bucket of the index backup (default: databasesource/index) |
| `-indexdestination`    | The destination of the index restore (default: databasedestination/index)         |
| `-awsregion`           | The AWS region of the bucket                                                      |
| `-awsaccesskeyid`      | The AWS access key to use (if not provided, use environment variables)            |
| `-awssecretkey`        | The AWS secret key to use (if not provided, use environment variables)            |
| `-awstoken`            | The AWS token to use                                                              |
| `-y`                   | Automatically confirm prompt to delete all files from the destination folder      |

#### admin scavenge

No options.

#### admin shutdown

No options.

#### admin verify_db

```shell
es-cli admin verify_db [options]
```

Verify the integrity of an EventStoreDB database.

| Option             | Description                                                                         |
|--------------------|-------------------------------------------------------------------------------------|
| `-databasepath`    | The path to the EventStoreDB database directory on disk                             |
| `-indexpath`       | The path to the EventStoreDB index directory on disk  (default: databasepath/index) |
| `-skipdbverify`    | Skip database verification (default: false)                                         |
| `-skipindexverify` | Skip index verification (default: false)                                            |

An output file called 'verify_db.error.log' will be written to the current working directory.

#### user

```shell
es-cli user [--version] [--help] <command> [<args>]
```

| Command                                  | Description              |
|------------------------------------------|--------------------------|
| [add](#user-add)                         | Add a user               |
| [change_password](#user-change_password) | Change the user password |
| [delete](#user-delete)                   | Delete a user            |
| [disable](#user-disable)                 | Disable a user           |
| [enable](#user-enable)                   | Enable a user            |
| [list](#user-list)                       | List all users           |
| [reset_password](#user-reset_password)   | Reset a user's password  |
| [update](#user-update)                   | Update a user            |

#### user add

```shell
es-cli useradd [options]
```

Add a user.

| Option          | Description      |
|-----------------|------------------|
| `-loginname`    | Login Name       |
| `-password`     | Password         |
| `-fullname`     | Full Name        |
| `-isadmin`      | Is Administrator |
| `-isoperations` | Is Operations    |

#### user change_password

```shell
es-cli user change_password [options]
```

Change the password for the given user.

| Option             | Description                             |
|--------------------|-----------------------------------------|
| `-loginname`       | The login name of the user to update    |
| `-newpassword`     | The new password for the given user     |
| `-currentpassword` | The current password for the given user |

#### user delete

```shell
es-cli user delete [options]
```

Delete a user.

| Option       | Description                          |
|--------------|--------------------------------------|
| `-loginname` | The login name of the user to delete |

#### user disable

```shell
es-cli user disable [options]
```

Disable a user.

| Option       | Description                           |
|--------------|---------------------------------------|
| `-loginname` | The login name of the user to disable |

#### user update

```shell
es-cli user update [options]
```

Update a user.

| Option          | Description      |
|-----------------|------------------|
| `-loginname`    | Login Name       |
| `-fullname`     | Full Name        |
| `-isadmin`      | Is Administrator |
| `-isoperations` | Is Operations    |

#### user enable

```shell
es-cli user enable [options]
```

Enable a user.

| Option       | Description                          |
|--------------|--------------------------------------|
| `-loginname` | The login name of the user to enable |

#### user list

```shell
es-cli user list [options]
```

List all users.

#### user reset_password

```shell
es-cli user reset_password [options]
```

Reset a user's password.

| Option         | Description                         |
|----------------|-------------------------------------|
| `-loginname`   | The login name of the user          |
| `-newpassword` | The new password for the given user |

#### projections

```shell
es-cli projections [--version] [--help] <command> [<args>]
```

| Command                                               | Description                                          |
|-------------------------------------------------------|------------------------------------------------------|
| [delete](#projections-delete)                         | Delete a projection                                  |
| [disable](#projections-disable)                       | Disable a projection                                 |
| [enable](#projections-enable)                         | Enable a projection                                  |
| [has_stalled](#projections-has_stalled)               | Determines whether a projection has possibly stalled |
| [list](#projections-list)                             | List all of the projections                          |
| [new](#projections-new)                               | Create a new projection                              |
| [restore_checkpoint](#projections-restore_checkpoint) | Restore a previous checkpoint for a projection       |
| [result](#projections-result)                         | Get the result of a projection                       |
| [state](#projections-state)                           | Get the state of a projection                        |
| [status](#projections-status)                         | Get the status of a projection                       |

#### projections delete

```shell
es-cli projections delete [options]
```

Delete a projection.

| Option                    | Description                  |
|---------------------------|------------------------------|
| `-name`                   | The projection name          |
| `-deletestatestream`      | Delete the State Stream      |
| `-deletecheckpointstream` | Delete the Checkpoint Stream |

#### projections disable

```shell
es-cli projections disable [options]
```

Disable a projection.

| Option  | Description         |
|---------|---------------------|
| `-name` | The projection name |

#### projections enable

```shell
es-cli projections enable [options]
```

Enable a projection.

| Option  | Description         |
|---------|---------------------|
| `-name` | The projection name |

#### projections list

```shell
es-cli projections list [options]
```

List all the projections.

#### projections new

```shell
es-cli projections new [options]
```

Create a new projection.

| Option   | Description                                                                        |
|----------|------------------------------------------------------------------------------------|
| `-name`  | The projection name                                                                |
| `-type`  | Type of projection ([o]netime, [c]ontinuous, [t]ransient)                          |
| `-query` | The projection query (Prefix with @ to load from file. e.g. @projectionquery.json) |

#### projections result

```shell
es-cli projections result [options]
```

Get the result of a projection.

| Option       | Description                                      |
|--------------|--------------------------------------------------|
| `-name`      | The projection name                              |
| `-partition` | The partition of the result you are querying for |

#### projections state

```shell
es-cli projections state [options]
```

Get the state of a projection.

| Option       | Description                                     |
|--------------|-------------------------------------------------|
| `-name`      | The projection name                             |
| `-partition` | The partition of the state you are querying for |

#### projections status

```shell
es-cli projections status [options]
```

Get the status of a projection.

| Option  | Description         |
|---------|---------------------|
| `-name` | The projection name |

#### projections restore_checkpoint

```shell
es-cli projections restore_checkpoint [options]
```

Restore a previous checkpoint for a projection.

| Option  | Description         |
|---------|---------------------|
| `-name` | The projection name |

#### projections has_stalled

```shell
es-cli projections has_stalled [options]
```

Determines whether a projection has stalled.

| Option  | Description         |
|---------|---------------------|
| `-name` | The projection name |

#### competing

```shell
es-cli competing [--version] [--help] <command> [<args>]
```

| Command                     | Description                     |
|-----------------------------|---------------------------------|
| [create](#competing-create) | Create a new subscription       |
| delete                      | Delete an existing subscription |
| [list](#competing-list)     | List the subscriptions          |
| [update](#competing-update) | Update an existing subscription |

#### competing list

```shell
es-cli competing list [options]
```

List the subscriptions.

| Option               | Description                                      |
|----------------------|--------------------------------------------------|
| `-streamid`          | The name of the stream to list subscriptions for |
| `-subscription_name` | The name of the subscription to list             |

#### competing create

```shell
es-cli competing create [options]
```

Create a new subscription.

| Option               | Description                                                                                                   |
|----------------------|---------------------------------------------------------------------------------------------------------------|
| `-streamid`          | The stream to subscribe to                                                                                    |
| `-subscription_name` | The name of the subscription group                                                                            |
| `-config`            | The settings to create the subscription with (Prefix with @ to load from file. e.g. @subscriptionConfig.json) |

#### competing update

```shell
es-cli competing update [options]
```

Update an existing subscription.

| Option               | Description                                                                                                   |
|----------------------|---------------------------------------------------------------------------------------------------------------|
| `-streamid`          | The stream to update the subscription on                                                                      |
| `-subscription_name` | The name of the subscription group to update                                                                  |
| `-config`            | The settings to update the subscription with (Prefix with @ to load from file. e.g. @subscriptionConfig.json) |

#### config_generator

```shell
es-cli config_generator [--version] [--help] <command> [<args>]
```

| Command                                          | Description                                                                     |
|--------------------------------------------------|---------------------------------------------------------------------------------|
| [create_config](#config_generator-create_config) | Generates config files with recommended settings based on the provided options. |

#### config_generator create_config

```shell
es-cli config_generator createconfig [options]
```

Generates config files with recommended settings based on the provided options.

Output options:

| Option    | Description                                                                        |
|-----------|------------------------------------------------------------------------------------|
| `-output` | The destination for the generated config files (if nothing, just prints to STDOUT) |

General options:

| Option             | Description                                         |
|--------------------|-----------------------------------------------------|
| `-db`              | The location of the EventStoreDB database           |
| `-index`           | The location of the EventStoreDB index              |
| `-log`             | The location of the EventStoreDB logs               |
| `-run_projections` | The level of projections to run (none, system, all) |

Cluster options:

| Option              | Description                                                         |
|---------------------|---------------------------------------------------------------------|
| `-node_count`       | The number of database nodes in the cluster (default: 1)            |
| `-gossip_discovery` | How nodes in the cluster will discover each other (gossipseed, dns) |
| `-dns_name`         | The DNS name to use for gossip discovery                            |

Network options:

| Option          | Description                                                                                                       |
|-----------------|-------------------------------------------------------------------------------------------------------------------|
| `-network_type` | The type of network the nodes will be running in (lan, cloud)                                                     |
| `-internal_ips` | The internal IP addresses of the nodes, separated by a comma (node order should be the same as other ip arguments |
| `-external_ips` | The external IP addresses of the nodes, separated by a comma (node order should be the same as other ip arguments |

## Further help

For further information you can use the `--help` option at the `es-cli` top level, the section level, or for individual operations.

## Troubleshooting

The CLI tools uses the HTTP API and you can output the requests and responses from the calls by setting the `--verbose` configuration value to `true`.

If you encounter any issues, please open a ticket on freshdesk.

## Changelog

### 1.7.0

-   Added `verify_db` command under `admin` section to verify integrity of chunks, indexes and checkpoint files.

### 1.6.0

-   Added `merge_indexes` command under `admin` section to trigger manual index merges when setting `MaxAutoMergeIndexLevel`
-   Added `db_stats` command under `admin` section which processes chunk files locally and outputs stream statistics in CSV format

### 1.5.0

-   Added -deleteextra option to differential backup (for local, s3 and azure) to allow deleting of extraneous files from the destination (useful do delete previous versions of scavenged chunks from the destination)
-   Bugfix: Copy last chunk file to a temporary location before backing it up
-   Miscellaneous bug fixes

### 1.4.0

-   Added support for differential backup (for local, s3 and azure)
-   Improved backup UI

### 1.3.0

-   Added a command to calculate the size on disk of a stream
-   Added a command to delete streams matching a specific pattern
-   Fixed the name of one of the S3 backup command options
-   Added backup/restore commands for Microsoft Azure
-   Added a config generator command that generates sample configuration based on provided criteria

### 1.2.0

-   Added backup/restore commands for Amazon S3 as well as local disk
-   Added Restore Checkpoint for Projections
-   Added the ability for the CLI to check if a projection has potentially stalled

### 1.1.0

-   There was an issue with versions prior to 3.7.0 of EventStoreDB where bad events could be appended to $scavenge-{id} and the $scavenges streams.
-   With the release of version 1.1.0 of the CLI we have included a clear_scavenge_streams command under the admin section which will read through the $all stream and delete the $scavenges-{id} and $scavenges streams.
