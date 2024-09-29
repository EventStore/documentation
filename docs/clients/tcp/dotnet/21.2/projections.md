---
sitemap.priority: 0.005
---

# Projections

This page provides an example of using [user-defined projections](@server/features/projections/README.md#types-of-projections) in your application.

## Adding sample data

[Download](https://github.com/EventStore/documentation/tree/master/docs/clients/tcp/dotnet/21.2/sample-code/Seed) the following files that contain sample data used throughout this step of the getting started guide.

- [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164.json](https://raw.githubusercontent.com/EventStore/EventStore/53f84e55ea56ccfb981aff0e432581d72c23fbf6/samples/http-api/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164.json)
- [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1165.json](https://raw.githubusercontent.com/EventStore/EventStore/53f84e55ea56ccfb981aff0e432581d72c23fbf6/samples/http-api/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1165.json)
- [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1166.json](https://raw.githubusercontent.com/EventStore/EventStore/53f84e55ea56ccfb981aff0e432581d72c23fbf6/samples/http-api/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1166.json)
- [shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1167.json](https://raw.githubusercontent.com/EventStore/EventStore/53f84e55ea56ccfb981aff0e432581d72c23fbf6/samples/http-api/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1167.json)

Add the sample data to four different streams:
First, we need a function to read JSON files and construct the list of `EventData` instances:

@[code{ReadEventsFunction}](./sample-code/GettingStarted/UserProjections.cs)

Then, we can use this function and push events to EventStoreDB:

@[code{SeedEvents}](./sample-code/GettingStarted/UserProjections.cs)

## Creating your first projection

::: tip Next steps
Read [this guide](@server/features/projections/custom.md) to find out more about the user defined projection's API.
:::

The projection counts the number of 'XBox One S's that customers added to their shopping carts.

A projection starts with a selector, in this case `fromAll()`. Another possibility is `fromCategory({category})` which this step discusses later, but for now, `fromAll` should do.

The second part of a projection is a set of filters. There is a special filter called `$init` that sets up an initial state. You want to start a counter from 0 and each time EventStoreDB observes an `ItemAdded` event for an 'Xbox One S,' increment the counter.

Here is the projection code:

@[code](@httpapi/xbox-one-s-counter.js)

You create a projection by calling the projection API and providing it with the definition of the projection. Here you decide how to run the projection, declaring that you want the projection to start from the beginning and keep running.

You can send the projection code as text along the other parameters, using the `ProjectionsManager` instance:

@[code{ProjectionsManager}](./sample-code/GettingStarted/UserProjections.cs)
@[code{CreateUserProjection}](./sample-code/GettingStarted/UserProjections.cs)

::: tip Next steps
[Read here](#managing-projections) for more information on creating projections with the .NET API and the parameters available, or [our projections section](@server/features/projections/custom.md) for details on projection syntax.
:::

## Querying projection state

Now the projection is running, you can query the state of the projection. As this projection has a single state, query it with the following request:

@[code{GetProjectionState}](./sample-code/GettingStarted/UserProjections.cs)

#### Querying projection state by partition

You can partition the projection state to only include some events for aggregating the state rather than processing all the events. Querying with partitions because you have to specify the partition and the name of the stream.

@[code{GetPartitionedProjectionState}](./sample-code/GettingStarted/UserProjections.cs)

The server then returns the state for the partition:

@[code](@httpapi/projections/read-state-partition.json)

## Emitting new events

The above gives you the correct result but requires you to poll for the state of a projection. What if you wanted EventStoreDB to notify you about state updates via subscriptions?

### Output state

Update the projection to output the state to a stream by calling the `outputState()` method on the projection which by default produces a `$projections-{projection-name}-result` stream.

Below is the updated projection:

@[code](@httpapi/xbox-one-s-counter-outputState.js)

To update the projection, edit the projection definition with the following request:

@[code{ProjectionsManager}](./sample-code/GettingStarted/UserProjections.cs)
@[code{UpdateUserProjection}](./sample-code/GettingStarted/UserProjections.cs)

Then reset the projection you created above:

@[code{ResetUserProjection}](./sample-code/GettingStarted/UserProjections.cs)

You should get a response similar to the one below:

You can now read the events in the result stream by issuing a read request.

@[code{QueryUpdatedProjection}](./sample-code/GettingStarted/UserProjections.cs)

## Configuring projections

You can configure properties of the projection by updating values of the `options` object. For example, the following projection changes the name of the results stream:

@[code{2}](@httpapi/projections/update-projection-options.js)

Then send the update to the projection:

@[code{ProjectionsManager}](./sample-code/GettingStarted/UserProjections.cs)
@[code{UpdateProjectionProperties}](./sample-code/GettingStarted/UserProjections.cs)

::: tip
You can find all the options available in the [user defined projections guide](@server/features/projections/custom.md).
:::

Now you can read the result as above, but use the new stream name:

@[code{ReadUpdatedProjectionStream}](./sample-code/GettingStarted/UserProjections.cs)

#### Example: number of items per shopping cart

The example in this step so far relied on a global state for the projection, but what if you wanted a count of the number of items in the shopping cart per shopping cart.

EventStoreDB has a built-in `$by_category` projection that lets you select events from a particular list of streams. Enable this projection with the following command.

@[code{ProjectionsManager}](./sample-code/GettingStarted/UserProjections.cs)
@[code{EnableCategoryProjection}](./sample-code/GettingStarted/UserProjections.cs)

The projection links events from existing streams to new streams by splitting the stream name by a separator. You can configure the projection to specify the position of where to split the stream `id` and provide a separator.

By default, the category splits the stream `id` by a dash. The category is the first string.

| Stream Name        | Category                               |
|--------------------|----------------------------------------|
| shoppingCart-54    | shoppingCart                           |
| shoppingCart-v1-54 | shoppingCart                           |
| shoppingCart       | _No category as there is no separator_ |

You want to define a projection that produces a count per stream for a category, but the state needs to be per stream. To do so, use `$by_category` and its `fromCategory` API method.

Below is the projection:

@[code](@httpapi/projections/shopping-cart-counter.js)

Create the projection with the following request:

@[code{CreatePartitionedProjection}](./sample-code/GettingStarted/UserProjections.cs)

## Managing projections

The EventStoreDB Client API includes helper methods that use the HTTP API to allow you to manage projections. This document describes the methods found in the `ProjectionsManager` class. All methods in this class are asynchronous.

### Enable a projection

Enables an existing projection by name. You must have access to a projection to enable it.

```csharp
Task EnableAsync(string name, UserCredentials userCredentials = null);
```

### Disable a projection

Disables an existing projection by name. You must have access to a projection to disable it.

```csharp
Task DisableAsync(string name, UserCredentials userCredentials = null);
```

### Abort a projection

Aborts an existing projection by name. You must have access to a projection to abort it.

```csharp
Task AbortAsync(string name, UserCredentials userCredentials = null);
```

### Create a one-time projection

Creates a projection that runs until the end of the log and then stops. The query parameter contains the JavaScript you want created as a one time projection.

```csharp
Task CreateOneTimeAsync(string query, UserCredentials userCredentials = null);
```

### Create a continuous projection

Creates a projection that runs until the end of the log and then continues running. The query parameter contains the JavaScript you want created as a one time projection. Continuous projections have explicit names and you can enable or disable them via this name.

```csharp
Task CreateContinuousAsync(
    string name, string query, UserCredentials userCredentials = null
);
```

### List all projections

Returns a list of all projections.

```csharp
Task<List<ProjectionDetails>> ListAllAsync(UserCredentials userCredentials = null);
```

### List one-time projections

Returns a list of all One-Time Projections.

```csharp
Task<List<ProjectionDetails>> ListOneTimeAsync(UserCredentials userCredentials = null);
```

### Get statistics on a projection

Returns the statistics associated with a named projection.

```csharp
Task<string> GetStatisticsAsync(string name, UserCredentials userCredentials = null);
```

### Delete projection

Deletes a named projection. You must have access to a projection to delete it.

```csharp
Task DeleteAsync(string name, UserCredentials userCredentials = null);
```

### Get state

Retrieves the state of a projection.

```csharp
Task<string> GetState(string name, UserCredentials userCredentials = null);
```

### Get partition state

Retrieves the state of the projection via the given partition.

```csharp
Task<string> GetPartitionStateAsync(
    string name, string partition, UserCredentials userCredentials = null
);
```

### Get result

Retrieves the result of the projection.

```csharp
Task<string> GetResult(string name, UserCredentials userCredentials = null);
```

### Get partition result

Retrieves the result of the projection via the given partition.

```csharp
Task<string> GetPartitionResultAsync(
    string name, string partition, UserCredentials userCredentials = null
);
```
