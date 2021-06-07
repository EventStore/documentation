# Notifications

Notifications represents note worthy events which occur within the Event Store Cloud.

## Examples

The following represent a subset of events which can lead to notifications.

### Cluster Instance Provisioning Failure

If, for some reason, the instances backing a cluster fail to provision the resource is marked as defunct by the API and a notification is sent with the message "Cluster instances failed to provision".

### Volume Expansion Failure

If the volume fails to expand while expanding an instances size a notification event is created with the message "Cluster volumes failed to provision".
