The following information provides some technical details about plugins. 

# Plugin Hosting

The connectors management and activation logic is contained within a
plugin that can be loaded by EventStoreDB or by a Sidecar host. 

# Connector Persistence

Connectors are EventSourced

![](connectors:connector-stream.png)

The checkpoints are stored in a stream per connector

![](connectors:connector-checkpoint-stream.png)


TODO: link to these topics

Delivery Guarantees
Checkpointing
Internal/External hosting
Management and Activation