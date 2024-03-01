
# Connectors Preview Introduction

::: note
The Connectors Preview is included in commercial versions of EventStoreDB.
:::

Welcome to the Connectors Preview program!

Connectors make it easy to feed data from EventStoreDB into other
systems.

Each connector runs on the server-side (in process or out of process)
and uses a catch-up subscription to receive events, filter or transform
them, and push them to an external system via a sink.

::: card
![Connectors Anatomy](./images/connector-anatomy.png)
:::


In this preview, there are two sinks:

- [Console Sink](./sinks.md#console_sink) for experimentation

- [HTTP Sink](./sinks.md#http_sink) for POSTing to an HTTP endpoint of
  an external system.

**Motivation**

Currently a pain point that users experience is that, on one hand
they have a convenient EventStoreDB cloud service, on the other hand
they have a convenient downstream database or processing engine cloud
service. In the middle, however, they need to host and maintain their own
solution in their own infrastructure for subscribing to EventStoreDB and
sending the events to the downstream service. This solution in the middle often has to be highly
available and needs to manage its own checkpoints: this quickly becomes
cumbersome.

EventStore Connectors remove the need for users to develop and host and maintain such a solution.

::: card
![Connectors Motivation](./images/motivation.png)
:::

**Preview Program Goals**

The connectors preview will collect your input and feedback to:

* Validate the approach.

* Identify important areas for improvement.

* Allow EventStoreDB users to collaborate and contribute to the product.

* Iteratively improve and gather more feedback.


**Quick start**
The Connectors Preview comes pre-installed in the commercial edition. 
Head to the [quick start guide](quickstart.md) to set up and run connectors.

**Sinks**
[Set up and run](sinks.md) an HTTP sink or a console sink.

**Managing Connectors**
Find out how to [manage](manage.md) connectors.


**Technical Details**
Find out more [details](technical.md) about connectors


::: card
![Connectors Overview](./images/system-context.png)
:::



