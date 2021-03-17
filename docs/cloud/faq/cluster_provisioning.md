# Cluster provisioning

### Is it possible to change the cluster instance size or topology?

We don't have this feature available yet. However, you can always do it using backup and restore. The sequence of steps would be:

### Are there plans to support automatic VM resize? Either online or offline, but without having to back up and restore the cluster.

You will be able to do an online instance resize, but it won't be auto-scaling. You will have to change the instance size for your clusters yourself, when this feature will become available.

### Are there plans to support automatic disk resize? Either online or offline, but without having to back up and restore the cluster.

No, you have to resize the disks yourself. Cloud providers set certain limitations on how often you can perform the disk resize operation, please follow your provider guidelines.
