# Restore

Restores can be done on demand using the [Cloud Console](https://console.eventstore.cloud/) and the [Event Store Cloud CLI](https://github.com/EventStore/esc).

::: note
Restoring a backup will create a new cluster
:::

The topology of the new cluster does not need to be the same as the source of the backup: you can restore a 3 nodes cluster backup to a single node one.
Do make sure that the disk size of the target cluster is large enough.

## Using the Cloud Console

To restore a backup, navigate to the `Backups` section fo the [Cloud Console](https://console.eventstore.cloud/) and click on the `Restore` icon of the backup you want to restore.

::: card
![one off restore backup](./images/one_off_restore_scheduled.png)
:::

Backups are restored as new clusters. You will be then redirected to the usual provisioning page, where you can choose your cluster parameters. Note that you are not limited to restoring the backup to exactly the same cluster as the cluster for which the backup was taken. You can change the cluster topology, the database software version, and the instance size. You cannot restore between different cloud providers though.

::: card
![one off restore cluster backup](./images/one_off_restore_cluster.png)
:::

## Using the command line

You can also restore a backup using the [Event Store Cloud CLI](https://github.com/EventStore/esc). As you cannot restore to the existing cluster, you should use the `source-backup-id` option of the `mesdb clusters create` command. When the backup id is provided, the CLI tool will create a new cluster using the provided backup.

Example: restoring the backup with ID `c10dvoarh41lb9otkdrg` to an F1 single node instance
``` bash
$ esc mesdb clusters  create --description "restore" --source-backup-id c10dvoarh41lb9otkdrg --instance-type F1 --disk-size-in-gb 10 --disk-type GP2 --network-id c10dr5qrh41lbabqa2j0 --projection-level off --server-version 20.10 --topology single-node  --project-id c10d0h2rh41lba1v92k0
```
The output will display the new cluster ID:
``` bash
ClusterId("c1mnqjdo0aembuk4ljo0")
```
You can then get the new cluster status with the following command : 
``` bash
$ esc mesdb clusters get --id c1mnqjdo0aembuk4ljo0  --project-id c10d0h2rh41lba1v92k0 --json
```
The output will be similar to:
``` json
{
    "id": "c1mnqjdo0aembuk4ljo0",
    "organizationId": "bt77lfqrh41scaatc180",
    "projectId": "c10d0h2rh41lba1v92k0",
    "networkId": "c10dr5qrh41lbabqa2j0",
    "description": "restore",
    "provider": "aws",
    "region": "eu-west-2",
    "topology": "single-node",
    "instanceType": "f1",
    "diskSizeGb": 10,
    "diskType": "gp2",
    "serverVersion": "20.10",
    "projectionLevel": "off",
    "status": "available",
    "created": "2021-03-26T09:37:17Z",
    "addresses": {
        "tcp": [
            "c1mnqjdo0aembuk4ljo0.mesdb.eventstore.cloud:1113"
        ],
    "grpc": "esdb://c1mnqjdo0aembuk4ljo0.mesdb.eventstore.cloud:2113",
    "ui": "https://c1mnqjdo0aembuk4ljo0.mesdb.eventstore.cloud:2113"
    }
}
```