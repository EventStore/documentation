# Manual Backup

Backups can be created on demand through the [Cloud Console](https://console.eventstore.cloud/) and the [Event Store Cloud CLI](https://github.com/EventStore/esc)

## Console 

To create a backup in the console, navigate to the clusters view and click on the create backup icon. Click `Create one off backup`.

::: card
![take backup](./images/take_backup.png)
:::

Backups created this way appear in the console alongside backups created by scheduled jobs.
To see the status of the backup navigate to the `Backups` section of the console. There you can see all backups created manually or by a scheduled job.

::: card
![one off backup](./images/one_off_backup.png)
:::

## ESC 

To create a backup using the [Event Store Cloud CLI](https://github.com/EventStore/esc):

``` bash
esc mesdb backups create --description "on demand backup" --source-cluster-id c1eut65o0aeu6ojco7a0 --project-id btfjev2rh41scaatc1k0
BackupId("c1ev3l5o0aeu6ojco7b0")
```

To see the status of the backup use the following command:
``` bash
> esc  mesdb backups get  --project-id btfjev2rh41scaatc1k0 --id c1ev3l5o0aeu6ojco7b0
Backup { id: BackupId("c1ev3l5o0aeu6ojco7b0"), project_id: ProjectId("btfjev2rh41scaatc1k0"), source_cluster_id: ClusterId("c1eut65o0aeu6ojco7a0"), source_cluster_description: "Demo-Backup", description: "on demand backup", size_gb: 8, provider: Aws, region: "eu-central-1", status: "available", created: "2021-03-26T14:38:12Z", linked_resource: None }
```
