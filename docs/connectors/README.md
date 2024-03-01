
# Connectors Preview Introduction

Welcome to the Connectors Preview program!

::: note
The Connectors Preview is pre-installed in commercial versions of EventStoreDB.
:::

Connectors make it easy to integrate EventStoreDB data into other systems.

Each connector runs on the server-side (in process or out of process)
and uses a catch-up subscription to receive events, filter or transform
them, and push them to an external system via a [sink](https://en.wikipedia.org/wiki/Sink_(computing)).

::: card
![Connectors Anatomy](./images/connector-anatomy.png)
:::

This reduces the amount of work needed to process data from EventStoreDB instances and makes it easy to create data pipelines to implement complex use cases.

::: card
![Connectors Overview](./images/system-context.png)
:::


In this preview, there are two sinks:

- [Console Sink](./sinks.md#console_sink) for experimentation

- [HTTP Sink](./sinks.md#http_sink) for POSTing to an HTTP endpoint of
  an external system


## Motivation

Currently a pain point that users experience is that, on one hand,
they have a convenient EventStoreDB cloud service, on the other hand,
they have a convenient downstream database or processing engine cloud
service but there's nothing in between. As a result, users need to host and maintain their own
solution in their own infrastructure for subscribing to EventStoreDB and
sending the events to a downstream service. This solution in the middle often needs to be highly
available and needs to manage its own checkpoints: this quickly becomes cumbersome.

EventStore Connectors remove the need for users to develop, host and maintain such a solution.

::: card
![Connectors Motivation](./images/motivation.png)
:::


## Preview Program Goals

We will collect your input and feedback during the connectors preview program to:

* Validate the approach.

* Identify important areas for improvement.

* Allow EventStoreDB users to collaborate and contribute to the product.

* Iteratively improve and gather more feedback.






