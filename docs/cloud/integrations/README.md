# Event Store Cloud Integrations

Event Store Cloud offers integrations between internal sources such as cluster health, [issue](./issues.md) detection,  [notifications](./notifications.md) events and sinks which include external services such as Slack and OpsGenie.

## Integration sources

"Sources" are driven by events or other mechanism inside the Event Store Cloud.

Currently supported sources include:

* [Issues](./issues.md) - issues represent a potentially problematic condition detected inside a cluster or other Event Store Cloud resource. Issues consist of multiple "open" events and a single "closed" event and have different levels of severity.

* [Notifications](./notifications.md) - notifications are note worthy events detected within Event Store Cloud resources or the backend. For example notifications may be emitted when a cluster fails to provision.


## Integration sinks

"Sinks" are services outside of the Event Store Cloud which events from sources can be forwarded to.

* [OpsGenie](./opsgenie.md) - OpsGenie is an alerting an incidence response tool. It is possible to set up integrations which create OpsGenie alerts when cluster health issues are detected.

* [Slack](./slack.md) - Slack is a communication platform. It is possible to set up integrations which send Slack messages when issues and notifications are created or updated.
