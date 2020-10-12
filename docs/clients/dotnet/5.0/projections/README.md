# Projections

This page provides an example of using [user-defined projections](/docs/server/5.0.8/server/projections/README.md#types-of-projections) in your application.

## Adding sample data

Download the following files that contain sample data used throughout this step of the getting started guide.

- [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164.json](/docs/server/5.0.8/http-api/sample-code/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164.json)
- [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1165.json](/docs/server/5.0.8/http-api/sample-code/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1165.json)
- [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1166.json](/docs/server/5.0.8/http-api/sample-code/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1166.json)
- [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1167.json](/docs/server/5.0.8/http-api/sample-code/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1167.json)

Add the sample data to four different streams:
First, we need a function to read JSON files and construct the list of `EventData` instances:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#ReadEventsFunction

Then, we can use this function and push events to EventStoreDB:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#SeedEvents

## Writing your first projection

::: tip Next steps
Read [this guide](/docs/server/5.0.8/server/projections/user-defined-projections.md) to find out more about the user defined projection's API.
:::

The projection counts the number of 'XBox One S's that customers added to their shopping carts.

A projection starts with a selector, in this case `fromAll()`. Another possibility is `fromCategory({category})` which this step discusses later, but for now, `fromAll` should do.

The second part of a projection is a set of filters. There is a special filter called `$init` that sets up an initial state. You want to start a counter from 0 and each time EventStoreDB observes an `ItemAdded` event for an 'Xbox One S,' increment the counter.

Here is the projection code:

<<< @/docs/server/5.0.9/http-api/sample-code/xbox-one-s-counter.json

You create a projection by calling the projection API and providing it with the definition of the projection. Here you decide how to run the projection, declaring that you want the projection to start from the beginning and keep running. 

You can send the projection code as text along the other parameters, using the `ProjectionsManager` instance:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#ProjectionsManager
<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#CreateUserProjection

::: tip Next steps
[Read here](projections-management.md) for more information on creating projections with the .NET API and the parameters available, or [our projections section](/docs/server/5.0.8/server/projections/README.md) for details on projection syntax.
:::

## Querying for the state of the projection

Now the projection is running, you can query the state of the projection. As this projection has a single state, query it with the following request:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#GetProjectionState

## Writing to streams from projections

The above gives you the correct result but requires you to poll for the state of a projection. What if you wanted EventStoreDB to notify you about state updates via subscriptions?

### Output state

Update the projection to output the state to a stream by calling the `outputState()` method on the projection which by default produces a `$projections-{projection-name}-result` stream.

Below is the updated projection:

<<< @/docs/server/5.0.9/http-api/sample-code/xbox-one-s-counter-outputState.json

To update the projection, edit the projection definition with the following request:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#ProjectionsManager
<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#UpdateUserProjection

Then reset the projection you created above:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#ResetUserProjection

You should get a response similar to the one below:

You can now read the events in the result stream by issuing a read request.

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#QueryUpdatedProjection

## Configure projection properties

You can configure properties of the projection by updating values of the `options` object. For example, the following projection changes the name of the results stream:

<<< @/docs/server/5.0.9/http-api/sample-code/projections/update-projection-options.json{2}

Then send the update to the projection:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#ProjectionsManager
<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#UpdateProjectionProperties

::: tip
You can find all the options available in the [user defined projections guide](/docs/server/5.0.8/server/projections/user-defined-projections.md).
:::

Now you can read the result as above, but use the new stream name:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#ReadUpdatedProjectionStream

## The number of items per shopping cart

The example in this step so far relied on a global state for the projection, but what if you wanted a count of the number of items in the shopping cart per shopping cart.

EventStoreDB has a built-in `$by_category` projection that lets you select events from a particular list of streams. Enable this projection with the following command.

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#ProjectionsManager
<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#EnableCategoryProjection

The projection links events from existing streams to new streams by splitting the stream name by a separator. You can configure the projection to specify the position of where to split the stream `id` and provide a separator.

By default, the category splits the stream `id` by a dash. The category is the first string.

| Stream Name        | Category                               |
| ------------------ | -------------------------------------- |
| shoppingCart-54    | shoppingCart                           |
| shoppingCart-v1-54 | shoppingCart                           |
| shoppingCart       | _No category as there is no separator_ |

You want to define a projection that produces a count per stream for a category, but the state needs to be per stream. To do so, use `$by_category` and its `fromCategory` API method.

Below is the projection:

<<< @/docs/server/5.0.9/http-api/sample-code/projections/shopping-cart-counter.json

Create the projection with the following request:

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#CreatePartitionedProjection

#### Querying for the state of the projection by partition

Querying for the state of the projection is different due to the partitioning of the projection. You have to specify the partition and the name of the stream.

<<< @/docs/clients/dotnet/5.0/sample-code/GettingStarted/UserProjections.cs#GetPartitionedProjectionState

The server then returns the state for the partition:

<<< @/docs/server/5.0.9/http-api/sample-code/projections/read-state-partition.json
