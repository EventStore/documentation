# Introduction to projections

Projections is an Event Store subsystem that lets you write new events or link existing events to streams in a reactive manner.

Projections are good at solving one specific query type, a category known as 'temporal correlation queries'. This query type is common in business systems and few can execute these queries well.

::: tip
Projections require the event body to be in JSON.
:::

## Business case examples

For example. You are looking for how many Twitter users said "happy" within 5 minutes of the word "foo coffee shop" and within 2 minutes of saying "london".

This is the type of query that projections can solve. Let's try a more complex business problem.

As a medical research doctor you want to find people diagnosed with pancreatic cancer within the last year. During their treatment a patient should not have had any proxies for a heart condition such as taking aspirin every morning. Within three weeks of their diagnosis they should have been put on treatment X. Within one month after starting the treatment they should have failed with a lab result that looks like L1. Within another six weeks they should have been put on treatment Y, and within four weeks failed that treatment with a lab result that looks like L2.

You can use projections in nearly all examples of near real-time complex event processing. There are a large number of problems that fit into this category from monitoring of temperature sensors, to reacting to changes in the stock market.

It's important to remember the types of problems that projections help to solve. Many problems are not a good fit for projections and are better served by hosting another read model populated by a [catchup subscription](/v5/getting-started/reading-subscribing-events.md#catch-up-subscriptions).

## Continuous querying

Projections support the concept of continuous queries. When running a projection you can choose whether the query should run and give you all results present, or whether the query should continue running into the future finding new results as they happen and updating its result set.

In the medical example above the doctor could leave the query running to be notified of any new patients that meet the criteria. The output of all queries is a stream, you can listen to this stream like any other stream.

## Types of projections

There are two types of projections in Event Store:

- [Built in (system) projections](/v5/projections/system-projections.md) written in C#.
- [User-defined JavaScript projections](/v5/projections/user-defined-projections.md) which you create via the API or the admin UI.