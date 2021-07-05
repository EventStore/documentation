# Cluster provisioning

### Is it possible to change the cluster instance size or topology?

We don't have this feature available yet. However, you can always do it using backup and restore.

### Are there plans to support automatic VM resize?

You will be able to do an online instance resize, but it won't be auto-scaling. You will have to change the instance size for your clusters yourself, when this feature will become available.

### Are there plans to support automatic disk resize?

No, you have to resize the disks yourself, read the procedure in the [documentation](/cloud/ops/disk_expand/) . Cloud providers set certain limitations on how often you can perform the disk resize operation, please follow your provider guidelines.
