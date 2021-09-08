<template><h1 id="projections" tabindex="-1"><a class="header-anchor" href="#projections" aria-hidden="true">#</a> Projections</h1>
<p>This page provides an example of using <RouterLink to="/server/generated/v21.2/docs/projections/#types-of-projections">user-defined projections</RouterLink> in your application.</p>
<h2 id="adding-sample-data" tabindex="-1"><a class="header-anchor" href="#adding-sample-data" aria-hidden="true">#</a> Adding sample data</h2>
<p>Download the following files that contain sample data used throughout this step of the getting started guide.</p>
<ul>
<li><a href="/server/generated/v21.2/samples/http-api/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164.json">shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1164.json</a></li>
<li><a href="/server/generated/v21.2/samples/http-api/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1165.json">shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1165.json</a></li>
<li><a href="/server/generated/v21.2/samples/http-api/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1166.json">shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1166.json</a></li>
<li><a href="/server/generated/v21.2/samples/http-api/data/shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1167.json">shoppingCart-b989fe21-9469-4017-8d71-9820b8dd1167.json</a></li>
</ul>
<p>Add the sample data to four different streams:
First, we need a function to read JSON files and construct the list of <code>EventData</code> instances:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#ReadEventsFunction</p>
<p>Then, we can use this function and push events to EventStoreDB:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#SeedEvents</p>
<h2 id="creating-your-first-projection" tabindex="-1"><a class="header-anchor" href="#creating-your-first-projection" aria-hidden="true">#</a> Creating your first projection</h2>
<div class="custom-container tip"><p class="custom-container-title">Next steps</p>
<p>Read <RouterLink to="/server/generated/v21.2/docs/projections/user-defined-projections.html">this guide</RouterLink> to find out more about the user defined projection's API.</p>
</div>
<p>The projection counts the number of 'XBox One S's that customers added to their shopping carts.</p>
<p>A projection starts with a selector, in this case <code>fromAll()</code>. Another possibility is <code>fromCategory({category})</code> which this step discusses later, but for now, <code>fromAll</code> should do.</p>
<p>The second part of a projection is a set of filters. There is a special filter called <code>$init</code> that sets up an initial state. You want to start a counter from 0 and each time EventStoreDB observes an <code>ItemAdded</code> event for an 'Xbox One S,' increment the counter.</p>
<p>Here is the projection code:</p>
<p>@[code](server/generated/v21.2/samples/http-api/xbox-one-s-counter.js</p>
<p>You create a projection by calling the projection API and providing it with the definition of the projection. Here you decide how to run the projection, declaring that you want the projection to start from the beginning and keep running.</p>
<p>You can send the projection code as text along the other parameters, using the <code>ProjectionsManager</code> instance:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#ProjectionsManager
@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#CreateUserProjection</p>
<div class="custom-container tip"><p class="custom-container-title">Next steps</p>
<p><RouterLink to="/clients/dotnet/21.2/projections/projections-management.html">Read here</RouterLink> for more information on creating projections with the .NET API and the parameters available, or <RouterLink to="/server/generated/v21.2/docs/projections/">our projections section</RouterLink> for details on projection syntax.</p>
</div>
<h2 id="querying-for-the-state-of-the-projection" tabindex="-1"><a class="header-anchor" href="#querying-for-the-state-of-the-projection" aria-hidden="true">#</a> Querying for the state of the projection</h2>
<p>Now the projection is running, you can query the state of the projection. As this projection has a single state, query it with the following request:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#GetProjectionState</p>
<h2 id="appending-to-streams-from-projections" tabindex="-1"><a class="header-anchor" href="#appending-to-streams-from-projections" aria-hidden="true">#</a> Appending to streams from projections</h2>
<p>The above gives you the correct result but requires you to poll for the state of a projection. What if you wanted EventStoreDB to notify you about state updates via subscriptions?</p>
<h3 id="output-state" tabindex="-1"><a class="header-anchor" href="#output-state" aria-hidden="true">#</a> Output state</h3>
<p>Update the projection to output the state to a stream by calling the <code>outputState()</code> method on the projection which by default produces a <code>$projections-{projection-name}-result</code> stream.</p>
<p>Below is the updated projection:</p>
<p>@[code](server/generated/v21.2/samples/http-api/xbox-one-s-counter-outputState.js</p>
<p>To update the projection, edit the projection definition with the following request:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#ProjectionsManager
@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#UpdateUserProjection</p>
<p>Then reset the projection you created above:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#ResetUserProjection</p>
<p>You should get a response similar to the one below:</p>
<p>You can now read the events in the result stream by issuing a read request.</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#QueryUpdatedProjection</p>
<h2 id="configure-projection-properties" tabindex="-1"><a class="header-anchor" href="#configure-projection-properties" aria-hidden="true">#</a> Configure projection properties</h2>
<p>You can configure properties of the projection by updating values of the <code>options</code> object. For example, the following projection changes the name of the results stream:</p>
<p>@[code](server/generated/v21.2/samples/http-api/projections/update-projection-options.js{2}</p>
<p>Then send the update to the projection:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#ProjectionsManager
@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#UpdateProjectionProperties</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>You can find all the options available in the <RouterLink to="/server/generated/v21.2/docs/projections/user-defined-projections.html">user defined projections guide</RouterLink>.</p>
</div>
<p>Now you can read the result as above, but use the new stream name:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#ReadUpdatedProjectionStream</p>
<h2 id="the-number-of-items-per-shopping-cart" tabindex="-1"><a class="header-anchor" href="#the-number-of-items-per-shopping-cart" aria-hidden="true">#</a> The number of items per shopping cart</h2>
<p>The example in this step so far relied on a global state for the projection, but what if you wanted a count of the number of items in the shopping cart per shopping cart.</p>
<p>EventStoreDB has a built-in <code>$by_category</code> projection that lets you select events from a particular list of streams. Enable this projection with the following command.</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#ProjectionsManager
@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#EnableCategoryProjection</p>
<p>The projection links events from existing streams to new streams by splitting the stream name by a separator. You can configure the projection to specify the position of where to split the stream <code>id</code> and provide a separator.</p>
<p>By default, the category splits the stream <code>id</code> by a dash. The category is the first string.</p>
<table>
<thead>
<tr>
<th>Stream Name</th>
<th>Category</th>
</tr>
</thead>
<tbody>
<tr>
<td>shoppingCart-54</td>
<td>shoppingCart</td>
</tr>
<tr>
<td>shoppingCart-v1-54</td>
<td>shoppingCart</td>
</tr>
<tr>
<td>shoppingCart</td>
<td><em>No category as there is no separator</em></td>
</tr>
</tbody>
</table>
<p>You want to define a projection that produces a count per stream for a category, but the state needs to be per stream. To do so, use <code>$by_category</code> and its <code>fromCategory</code> API method.</p>
<p>Below is the projection:</p>
<p>@[code](/server/generated/v21.2/samples/http-api/projections/shopping-cart-counter.js</p>
<p>Create the projection with the following request:</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#CreatePartitionedProjection</p>
<h4 id="querying-for-the-state-of-the-projection-by-partition" tabindex="-1"><a class="header-anchor" href="#querying-for-the-state-of-the-projection-by-partition" aria-hidden="true">#</a> Querying for the state of the projection by partition</h4>
<p>Querying for the state of the projection is different due to the partitioning of the projection. You have to specify the partition and the name of the stream.</p>
<p>@[code](clients/dotnet/21.2/sample-code/GettingStarted/UserProjections.cs#GetPartitionedProjectionState</p>
<p>The server then returns the state for the partition:</p>
<p>@[code](/server/generated/v21.2/samples/http-api/projections/read-state-partition.json</p>
</template>
