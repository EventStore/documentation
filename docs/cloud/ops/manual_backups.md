# Manual Backup

Backups can be created on demand using the [Cloud Console](https://console.eventstore.cloud/) and the [Event Store Cloud CLI](https://github.com/EventStore/esc).

Manually created backups appear in the console alongside backups created by scheduled jobs.

To see the status of the backup, navigate to the `Backups` section of the console. There you can see all backups created manually or by a scheduled job.

::: card
![one off backup](./images/one_off_backup.png)
:::

You can customise the backup label using a combination of free-text and predefined variables:
- **index** - the auto-incremented value with the number of backups. You can format it as:
  - decimal: `index:decimal` (*default*),
  - hexadecimal: `index:hex`.
- **cluster** - value from the cluster information:
  - description: `cluster:description` (*default*),
  - id: `cluster:id`,
  - cloud provider: `cluster:provider`
- **datetime** - timestamp of when backup was made. You can format it as:
  - UTC time - `datetime:utc` (*default*),
  - [RFC 822](https://www.w3.org/Protocols/rfc822/#z28): `datetime:rfc822`,
  - [Unix](https://en.wikipedia.org/wiki/Unix_time): `datetime:unix`,
  - [JSON](https://en.m.wikipedia.org/wiki/ISO_8601): `datetime:json`,
  - [RFC3339](https://tools.ietf.org/html/rfc3339): `datetime:rfc3339`,

## Using the Cloud Console 

To create a backup in the console, navigate to the clusters view and click on the _Create backup_ icon. In the popup, click the `Create one-off backup` button. 

::: card
![take backup](./images/take_backup.png)
:::

## Using the command line

You can also take a backup of your cluster using the [Event Store Cloud CLI](https://github.com/EventStore/esc).

To create a backup, use the `backups create` command:

``` bash
$ esc mesdb backups create --description "on demand backup" --source-cluster-id c1eut65o0aeu6ojco7a0 --project-id btfjev2rh41scaatc1k0
BackupId("c1ev3l5o0aeu6ojco7b0")
```

To see the status of the backup use the `backups get` command:

``` bash
$ esc mesdb backups get  --project-id btfjev2rh41scaatc1k0 --id c1ev3l5o0aeu6ojco7b0
Backup { id: BackupId("c1ev3l5o0aeu6ojco7b0"), project_id: ProjectId("btfjev2rh41scaatc1k0"), source_cluster_id: ClusterId("c1eut65o0aeu6ojco7a0"), source_cluster_description: "Demo-Backup", description: "on demand backup", size_gb: 8, provider: Aws, region: "eu-central-1", status: "available", created: "2021-03-26T14:38:12Z", linked_resource: None }
```
