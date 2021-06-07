# Issues

Issues represent possibly problematic states detected within the Event Store Cloud.

## Examples

Note: these examples are a subset of issues created by the system. The exact details of why issues are created are subject to change, but the cause of the issue and steps to resolve it will hopefully be clear in the messages associated with the related events.

### Core Load Count

For each node of a cluster, the core load average is measured and divided by the number of physical cores on the node. If the result exceeds 2.0 an issue is opened. This issue is closed when the result consistently dips under 2.0.

If this happens consider increasing the size of the instance type for the cluster.

### Disk Usage

For each node of a cluster, the disk usage is measured several times a minute. If it starts to consistently exceed 80% an issue is opened. The issue is closed when the usage drops below 80%.

If this happens consider either removing data, running scavenge or increasing the disk size for the cluster.

## Memory Usage

For each node of a cluster, the memory usage is measured several times a minute. If it exceeds 90% an issue is opened. The issue is closed when memory usage consistently drops below 90%.

If this happens consider increasing the size of the instance type for the cluster.
