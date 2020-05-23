---
title: Projections
---

:::: el-steps :active="3" align-center
::: el-step title="Install" description="Install, run, and write your first event"
:::
::: el-step title="Read" description="Read events and subscribe to changes"
:::
::: el-step title="Project" description="Use default and custom projections"
:::
::: el-step title="Choose SDK" description="Which SDK to use?"
:::
::::

# Projections

This getting started guide shows you how to get started with Event Store using the Atom publishing protocol as the primary interface. 

::: warning
The described is for development and evaluation of Event Store. It does not describe a production setup. The HTTP examples use cURL, but you can read Atom feeds with a wide variety of applications and languages.
:::

Projections is an Event Store subsystem that lets you write new events or link existing events to streams in a reactive manner.

Projections are good at solving one specific query type, a category known as 'temporal correlation queries'. This query type is common in business systems and few can execute these queries well.

::: tip
Projections require the event body to be in JSON.
:::

When running a projection, you can choose whether the query should run and give you all results present or whether the query should continue running into the future finding new results as they happen and updating its result set.

## Setting up projections

You enable projections with the command line argument `--run-projections`. For example, the command below enables all projection modes (system and user-defined):

::: tip Next steps
[Read this guide](/docs/v5/server/command-line-arguments.md#projections-options) for all the possible parameter values.
:::

::::: el-tabs
:::: el-tab-pane label="Windows"

```powershell
EventStore.ClusterNode.exe --run-projections=all --start-standard-projections=true
```

To disable them again, run:

```powershell
EventStore.ClusterNode.exe --run-projections=none
```

::::
:::: el-tab-pane label="Linux"

Add `EVENTSTORE_RUN_PROJECTIONS=All` and `EVENTSTORE_START_STANDARD_PROJECTIONS=true` to your environment variables, or the _/etc/eventstore/eventstore.conf_ configuration file and start Event Store:

```bash
sudo systemctl start eventstore
```

To disable them again, change the values to `EVENTSTORE_RUN_PROJECTIONS=none`.

::::
:::: el-tab-pane label="Docker"

The Event Store Docker image has projections enabled by default, but you need to enable standard projections:

```bash
docker run --name eventstore-node -it -p 2113:2113 -p 1113:1113 -e EVENTSTORE_RUN_PROJECTIONS=All -e EVENTSTORE_START_STANDARD_PROJECTIONS=true eventstore/eventstore
```

To disable them again:

```bash
docker run --name eventstore-node -it -p 2113:2113 -p 1113:1113 -e EVENTSTORE_RUN_PROJECTIONS=None eventstore/eventstore
```

::::
:::: el-tab-pane label="macOS"

```bash
eventstore --run-projections=all --start-standard-projections=true
```

To disable them again, run:

```bash
eventstore --run-projections=none
```

::: tip
To use the default database location on macOS you need to use `sudo`, or you can change the location with the `--db` parameter.
:::

::::
:::::

You then see new tabs enabled in the Admin UI with the four system projections in a `Stopped` state:

::: el-card :body-style="{ padding: '0px' }" 
![Projections tab](../images/projections-menu-item.png)
:::

::: el-card :body-style="{ padding: '0px' }" 
![Projections default state](../images/projections-default.png)
:::

You can also query the state of all projections using the HTTP API.

@[code lang=bash](@/docs/v5/code-examples/getting-started/list-all-projections.sh)

The response is a list of all known projections and useful information about them.

@[code lang=json](@/docs/v5/code-examples/getting-started/list-all-projections.json)

## Add sample data

Download the following files that contain sample data used throughout this step of the getting started guide.

-   [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164.json](/v5/code-examples/getting-started/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164.json)
-   [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1165.json](/v5/code-examples/getting-started/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1165.json)
-   [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1166.json](/v5/code-examples/getting-started/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1166.json)
-   [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1167.json](/v5/code-examples/getting-started/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1167.json)

Add the sample data to four different streams:

::::: el-tabs
:::: el-tab-pane label="HTTP API"

@[code lang=bash](@/docs/v5/code-examples/getting-started/add-sample-data.sh)

::::
:::: el-tab-pane label=".NET Client"

First, we need a function to read JSON files and construct the list of `EventData` instances:

@[code lang=csharp transcludeInner=ReadEventsFunction](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)

Then, we can use this function and push events to Event Store:

@[code lang=csharp transcludeInner=SeedEvents](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)


::::
:::: el-tab-pane label="JVM Client"

@[code lang=java transclude={23-85}](@/docs/v5/code-examples/EventStore.Samples.Java/src/main/java/org/eventstore/sample/WriteMultipleEventsExample.java)

::::
:::::

::: tip
While it's not the fastest method, you can also use the Admin UI for creating the streams, and all the tasks in this step, as we saw in [step 1](/v5/getting-started/index.md).
:::

## Writing your first projection

::: tip Next steps
Read [this guide](/docs/v5/projections/user-defined-projections.md) to find out more about the user defined projection's API.
:::

The projection counts the number of 'XBox One S's that customers added to their shopping carts.

A projection starts with a selector, in this case `fromAll()`. Another possibility is `fromCategory({category})` which this step discusses later, but for now, `fromAll` should do.

The second part of a projection is a set of filters. There is a special filter called `$init` that sets up an initial state. You want to start a counter from 0 and each time Event Store observes an `ItemAdded` event for an 'Xbox One S,' increment the counter.

Here is the projection, you can download it as a file [here](~/code-examples/getting-started/xbox-one-s-counter.json):

@[code lang=json](@/docs/v5/code-examples/getting-started/xbox-one-s-counter.json)

You create a projection by calling the projection API and providing it with the definition of the projection. Here you decide how to run the projection, declaring that you want the projection to start from the beginning and keep running. You can create a projection using the Admin UI by opening the _Projections_ tab, clicking the _New Projection_ button and filling in the details of your projection.

::: el-card :body-style="{ padding: '0px' }" 
![Creating a projection with the Event Store Admin UI](../images/getting-started-create-projection.png)
:::

You can also create projections programmatically by using one of the available APIs.

::::: el-tabs
:::: el-tab-pane label="HTTP API"

To use the HTTP, pass the projection JSON file as a parameter of your request, along with any other settings:

@[code lang=bash](@/docs/v5/code-examples/getting-started/create-projection.sh)

::: tip Next steps
[Read here](/docs/v5/projections/api.md) for more information on creating projections with the HTTP API and the parameters available, or [our projections section](~/projections/index.md) for details on projection syntax.
:::

::::
:::: el-tab-pane label=".NET Client"

You can send the projection code as text along the other parameters, using the `ProjectionsManager` instance:

@[code lang=csharp transcludeInner=ProjectionsManager,CreateUserProjection](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)

::: tip Next steps
[Read here](/docs/v5/dotnet-api/projections.md) for more information on creating projections with the .NET API and the parameters available, or [our projections section](~/projections/index.md) for details on projection syntax.
:::

::::
:::::

## Querying for the state of the projection

Now the projection is running, you can query the state of the projection. As this projection has a single state, query it with the following request:

::::: el-tabs
:::: el-tab-pane label="HTTP API"

@[code lang=bash](@/docs/v5/code-examples/getting-started/query-state.sh)

::::
:::: el-tab-pane label=".NET Client"

@[code lang=csharp transcludeInner=GetProjectionState](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)

::::
:::::

The server will send a response similar to this:

@[code lang=json](@/docs/v5/code-examples/getting-started/query-state.json)

## Writing to streams from projections

The above gives you the correct result but requires you to poll for the state of a projection. What if you wanted Event Store to notify you about state updates via subscriptions?

### Output state

Update the projection to output the state to a stream by calling the `outputState()` method on the projection which by default produces a `$projections-{projection-name}-result` stream.

Below is the updated projection, you can download it as a file [here](/docs/v5/code-examples/getting-started/xbox-one-s-counter-outputState.json):

@[code lang=json](@/docs/v5/code-examples/getting-started/xbox-one-s-counter-outputState.json)

To update the projection, edit the projection definition in the Admin UI, or issue the following request:

::::: el-tabs
:::: el-tab-pane label="HTTP API"

@[code lang=bash](@/docs/v5/code-examples/getting-started/xbox-one-s-counter-outputState.sh)

::::
:::: el-tab-pane label=".NET Client"

@[code lang=csharp transcludeInner=ProjectionsManager,UpdateUserProjection](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)

::::
:::::

Then reset the projection you created above:

::::: el-tabs
:::: el-tab-pane label="HTTP API"
@[code lang=bash](@/docs/v5/code-examples/getting-started/reset-projection.sh)
::::
:::: el-tab-pane label=".NET Client"
@[code lang=csharp transcludeInner=ResetUserProjection](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)
:::: 
:::::

You should get a response similar to the one below:

@[code lang=json](@/docs/v5/code-examples/getting-started/reset-projection.json)


You can now read the events in the result stream by issuing a read request.

::::: el-tabs
:::: el-tab-pane label="HTTP API"

@[code lang=bash](@/docs/v5/code-examples/getting-started/read-projection-events.sh)

::::
:::: el-tab-pane label=".NET Client"

@[code lang=csharp transcludeInner=QueryUpdatedProjection](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)

::::
:::::

And you'll get a response like this:

@[code lang=json](@/docs/v5/code-examples/getting-started/read-projection-events.json)

## Configure projection properties

You can configure properties of the projection by updating values of the `options` object. For example, the following projection changes the name of the results stream, you can download it as a file [here](/docs/v5/code-examples/getting-started/update-projection-options.json):

@[code lang=json highlight={2}](@/docs/v5/code-examples/getting-started/update-projection-options.json)

Then send the update to the projection:

::::: el-tabs
:::: el-tab-pane label="HTTP API"
@[code lang=bash](@/docs/v5/code-examples/getting-started/update-projection-options.sh)
::::
:::: el-tab-pane label=".NET Client"
@[code lang=csharp transcludeInner=ProjectionsManager,UpdateProjectionProperties](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)
::::
:::::

::: tip
You can find all the options available in the [user defined projections guide](/docs/v5/projections/user-defined-projections.md).
:::

Now you can read the result as above, but use the new stream name:

::::: el-tabs
:::: el-tab-pane label="HTTP API"
@[code lang=bash](@/docs/v5/code-examples/getting-started/read-projection-events-renamed.sh)
::::
:::: el-tab-pane label=".NET Client"
@[code lang=csharp transcludeInner=ReadUpdatedProjectionStream](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)
::::
:::::

## The number of items per shopping cart

The example in this step so far relied on a global state for the projection, but what if you wanted a count of the number of items in the shopping cart per shopping cart.

Event Store has a built-in `$by_category` projection that lets you select events from a particular list of streams. Enable this projection with the following command.

::::: el-tabs
:::: el-tab-pane label="HTTP API"
@[code lang=bash](@/docs/v5/code-examples/getting-started/enable-by-category.sh)
::::
:::: el-tab-pane label=".NET Client"
@[code lang=csharp transcludeInner=ProjectionsManager,EnableCategoryProjection](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)
::::
:::::

The projection links events from existing streams to new streams by splitting the stream name by a separator. You can configure the projection to specify the position of where to split the stream `id` and provide a separator.

By default, the category splits the stream `id` by a dash. The category is the first string.

| Stream Name        | Category                               |
| ------------------ | -------------------------------------- |
| shoppingCart-54    | shoppingCart                           |
| shoppingCart-v1-54 | shoppingCart                           |
| shoppingCart       | _No category as there is no separator_ |

You want to define a projection that produces a count per stream for a category, but the state needs to be per stream. To do so, use `$by_category` and its `fromCategory` API method.

Below is the projection, you can download the file [here](/docs/v5/code-examples/getting-started/shopping-cart-counter.json):

@[code lang=json](@/docs/v5/code-examples/getting-started/shopping-cart-counter.json)

Create the projection with the following request:

::::: el-tabs
:::: el-tab-pane label="HTTP API"
@[code lang=bash](@/docs/v5/code-examples/getting-started/shopping-cart-counter.sh)
::::
:::: el-tab-pane label=".NET Client"
@[code lang=csharp transcludeInner=CreatePartitionedProjection](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)
::::
:::::

#### Querying for the state of the projection by partition

Querying for the state of the projection is different due to the partitioning of the projection. You have to specify the partition and the name of the stream.

::::: el-tabs
:::: el-tab-pane label="HTTP API"
@[code lang=bash](@/docs/v5/code-examples/getting-started/read-state-partition.sh)
::::
:::: el-tab-pane label=".NET Client"
@[code lang=csharp transcludeInner=GetPartitionedProjectionState](@/docs/v5/code-examples/DocsExample/GettingStarted/Step3_UserProjections.cs)
::::
:::::

The server then returns the state for the partition:

@[code lang=json](@/docs/v5/code-examples/getting-started/read-state-partition.json)

## Next step

In this third part of our getting started guide you learned about projections. The next, and final part covers which API or SDK to use, and when.

-   [Step 4 - Which API or SDK](/v5/getting-started/which-api-sdk.md)
