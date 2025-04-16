---
title: Tutorial
---

# Overview

This tutorial will guide you through the Polyglot Persistence sample with KurrentDB using GitHub Codespaces.

## Objectives

In this quickstart, you will:

- Learn how to project events from KurrentDB into read models in different databases
- Experience how to update these read models with exactly-once processing using catch-up subscription and checkpoints
- Understand how to update these read models in real time

## Prerequisites

Before starting, ensure you have the following:

- A GitHub account to use GitHub Codespaces
- Basic knowledge of one of the development languages/platforms below
- Familiarity with command-line operations

## Tutorial Overview

This tutorial consists of the following steps:

### Section 1: Setup and Initialize KurrentDB
1. **Setup your Codespaces**: Starts up an interactive coding environment in your browser where all tools and database are installed
2. **Start and Initialize KurrentDB with Sample Events**: Start up KurrentDB and initialize it with sample events
3. **Browse the Sample Events in KurrentDB's Admin UI**: Browse 
### Section 2: Project KurrentDB Events to Other Databases 
4. **Execute Projection Applications**: Starts up the projection sample applications that transforms KurrentDB events into read models in Postgres and Redis
5. **Review the Projected Read Models in Postgres**: Run the postgres command line tool to review the newly inserted records
6. **Examine the Postgres Projection Application Codebase**: Examine the postgres projection application codebase to see how events are transformed to read models in the tables
7. **Review the Projected Read Models in Redis**: Run the redis command line tool to review the newly added entries
8. **Examine the Redis Projection Application Codebase**: Examine the redis projection application codebase to see how events are transformed into read models in redis
### Section 3: Project KurrentDB Events in Real-Time
9. **Browse the Demo Web Page**: Navigate to the Demo Web Page to a sample of how the read models in Postgress and Redis are used
10.  **Start the Live Data Generator**: Start a live data generator program that appends events into KurrentDB continuously
11.  **Watch the Read Models Update in Real-Time**: See how the read models are updated in real-time in the Demo Web Page
12.  **Review Codebase**: Understand how the code projects events to the read models in real-time

# Section 1: Setup and Initialize KurrentDB

In this section, you will start a GitHub Codespaces session in your browser.

::: info
GitHub Codespaces provides an instant and preconfigured development environment all within in your browser. This environment contains all the tools and code for you to complete this tutorial. To learn more about Github Codespaces, [click here](https://github.com/features/codespaces).
:::

You will then initialize KurrentDB by appending some sample events that mimics an e-commerce application. The events are appending using a data generator program.

## Step 1: Set up Your Codespaces

1. Click the button below to start Codespaces:
   
   [![](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=951198039&skip_quickstart=true)

   Login to GitHub if required.

2. For `Branch`, select `polyglot-tutorial`
   
3. For `Dev container configuration`, select `Multimodal Data Transformation`
   
4. For `Region`, select `Southeast Asia`

4. Click `Create codespace`

5. Wait for your Codespace to build. This can take up to a few minutes. 


::: tip
For this quickstart, you can safely ignore and close any Codespaces notification that appears on the bottom right of the page.
:::

## Step 2: Start and Initialize KurrentDB with Sample Events

1. Once your Codespace is loaded, run the following command in the terminal to append sample events to KurrentDB:

   ```sh
   ./scripts/1-init-data.sh
   ```

   This is a custom script written for this quickstart to help start KurrentDB in Docker.

2. You will see the below message printed in the terminal:

   ```
   🚀 KurrentDB Server has started!! 🚀

   URL to the KurrentDB Admin UI 👉: https://XXXXXXXXX.XXX

   Appended sample data to KurrentDB
   ```

3. Copy the URL printed in the terminal from last step.

4. Open a new browser tab. 

5. In the address bar of the new tab, paste the URL to and navigate to it.

6. This will display the KurrentDB Admin UI.
   
![KurrentDB Admin UI Dashboard](images/admin-ui.png =300x)

## Step 3: Browse Sample Events in KurrentDB's Admin UI

1. Click the `Stream Browser` link from the top navigation bar.

1. Under `Recently Changed Streams`, click `$ce-cart` link. 

2. You should see the content of the appended event. Here you will see shopping cart events for two shopping carts.

::: info Introducing shopping cart events
In KurrentDB, events for each shopping cart are appended to a stream like `cart-2fbe05d1dcf043d782ea24923298ae3a`, where `2fbe05d1dcf043d782ea24923298ae3a` is the id of the cart.

The cart will contain events like these:

| Event                     | Description                                                                                     |
|---------------------------|-------------------------------------------------------------------------------------------------|
| `VisitorStartedShopping`  | When a visitor starts shopping and a cart is created.                     |
| `CustomerStartedShopping` | When a known customer starts shopping and a cart is associated with their ID.   |
| `CartShopperGotIdentified`| When a customer's identity is linked to a cart (e.g. a visitor logged in)                            |
| `ItemGotAdded`            | When an item is added to the cart, including details like quantity, price, and tax. |
| `ItemGotRemoved`          | When an item is removed from the cart, including the quantity removed.    |
| `CartGotCheckedOut`       | When a cart is checked out and converted into an order.                   |
| `CartGotAbandoned`        | When a cart is abandoned after being idle for a specified duration.       |
:::

::: info Quick Quiz

What products are in each cart and with what quantity?

:::

# Section 2: Project KurrentDB Events to Other Databases

Now that KurrentDB is filled with shopping cart events, you will learn how to project these events to other databases as read models.

You will do this by executing a few sample applications written for this section:

### Introducing the Postgres Projection Application
This application projects KurrentDB events to Postgres relational tables. The tables can be queried for reporting using standard SQL queries.

To do this, it subscribes to the shopping cart events. For each event it receives, it inserts/updates a record to a cart and cart_item table in Postgres. 

The schema of the tables are as follows:

`carts` Table
```sql
CREATE TABLE IF NOT EXISTS carts (
   cart_id TEXT PRIMARY KEY,
   customer_id TEXT NULL,
   status TEXT NOT NULL DEFAULT 'STARTED',
   created_at TIMESTAMP NOT NULL,
   updated_at TIMESTAMP NOT NULL
```

`cart_items` Table
```sql
CREATE TABLE IF NOT EXISTS cart_items (
   cart_id TEXT NOT NULL,
   product_id TEXT NOT NULL,
   product_name TEXT NOT NULL,
   quantity INTEGER NOT NULL,
   currency TEXT NULL,
   price_per_unit DECIMAL(10,2) NOT NULL,
   tax_rate DECIMAL(5,2) NOT NULL,
   updated_at TIMESTAMP NOT NULL,
   PRIMARY KEY (cart_id, product_id),
   FOREIGN KEY (cart_id) REFERENCES carts(cart_id) ON DELETE CASCADE
```

### Introducing the Redis Projection Application
This application projects KurrentDB events to Redis sorted sets. This is used to calculate the top 10 products across all carts over the past 24 hours.

To do this, it subscribes to the shopping cart events. For each item added or removed event it receives, it will increment/decrement its product's quantity in a Redis sorted set for the current hour.

## Step 4: Execute Projection Application

1. Run the following command in the terminal to execute the projection applications:

   ```sh
   ./scripts/2-start-projections.sh
   ```

## Step 5. Review the Projected Read Models in Postgres

In this step, you will review the records in the `carts` and `cart_items` tables that were created from executing the applications in the previous step:

1. Run the following command in the terminal to start postgres cli:
   
   ```sh
   docker exec -it postgres psql -U postgres
   ```

   You will a message, like below, printed in the termnal:

   ```
   psql (16.8 (Debian 16.8-1.pgdg120+1))
   Type "help" for help.

   postgres=#
   ```

2. Run the following command in postgres cli to list the shopping carts projected from the events:

   ```sql
   select * from carts;
   ``` 

   You will see two carts in the table.

::: info Quick Quiz

The carts should be checked out or abandonned according to the status. Does this match the events found in step 3?

:::

3. Run the following command in postgres cli to list the items in each cart:

   ```sql
   select * from cart_items;
   ``` 

   You will see a few items in each cart.

::: info Quick Quiz

Do the products and quantity in the carts match what the events indicate in step 3 ?

:::

4. Exit postgres cli by running the command:

```
exit
```

## Step 6. Examine the Postgres Projection Application Codebase

Projecting KurrentDB events to read models in another database often follows the following pattern:
1. Retrieve last checkpoint
2. Subscribe events from a stream from checkpoint
3. Process each event by updating the read model and checkpoint in the database

You will examine how this pattern is applied to the Postgres projection application.

1. Run the following command in the terminal to open the main program for the Postgres projection application:

   ```sql
   code ./PostgresProjection/program.cs
   ```

   Code snippets below in this step can mostly be found within this file.

2. Locate and examine code that retrieves the last checkpoint

Checkpoints for database projections can often be saved to a separate checkpoint table similar to this:

```sql
CREATE TABLE IF NOT EXISTS checkpoints (
   read_model_name TEXT PRIMARY KEY,
   checkpoint BIGINT NOT NULL
)
```

::: info Understanding Checkpoint
Checkpoint is often used by a projection to recover the position of the last processed event. This way, the projection does not have to process all the events it previously processed when an application unexpectedly crashes midway.

For more information about checkpoints, [click here](../best-practices/checkpoint.md)
:::

The checkpoint can be retrieved by a `SELECT` statement. If no checkpoint is found or it is the first time the application is executed, we can retrieve the default start position:

```cs
var checkpointValue = postgres.QueryFirstOrDefault<long?>(               // Get the checkpoint value from PostgreSQL checkpoint table
    "SELECT checkpoint " +
    "FROM checkpoints " +
    "WHERE read_model_name = 'carts'");                  

var streamPosition = checkpointValue.HasValue                            // Check if the checkpoint exists..
    ? FromStream.After(StreamPosition.FromInt64(checkpointValue.Value))  // if so, subscribe from stream after checkpoint..
    : FromStream.Start;                                                  // otherwise, subscribe from the start of the stream
                                               // otherwise, subscribe from the start of the stream
```

3. Locate and examine code that subscribes to stream

A subscription is created that subscribes to events from the `$ce-carts` stream. The subscription will only retrieve events starting from `streamPosition` in the stream (i.e. the checkpoint retrieve from previous step).

```cs
await using var subscription = esdb.SubscribeToStream(                   // Subscribe events..
    "$ce-cart",                                                          // from the cart category system projection..        
    streamPosition,                                                      // from this position..
    true);                                                               // with linked events automatically resolved (required for system projections)
```

::: info Different Types of Subscriptions
This sample uses catch-up subscription to subscribe to events. You can also use persistent subscription or connectors to achieve similar result. 

For more information about catch-up subscription, [click here](https://docs.kurrent.io/clients/grpc/subscriptions.html).
For more information about persistent subscription, [click here](https://docs.kurrent.io/clients/grpc/persistent-subscriptions.html). 
For more information about connectors, [click here](https://docs.kurrent.io/server/v24.10/features/connectors/)
:::

::: info Understanding Category System Projection
The `$ce-cart` stream contains events from all the carts in KurrentDB. This uses the category system projection stream feature. For more information [click here](https://docs.kurrent.io/server/v24.10/features/projections/system.html#by-category).
:::

4. Locate and examine code that processes each event

For each event, the projection will:
- Start a database transaction,
- Update the `carts`, `cart_items` tables in the database,
- Update the `checkpoint` table in the database,
- Commit the database transaction

::: tip 
The updates to the read model and checkpoint tables should be committed within the same transaction to atomicity and consistency. This guarantees that both updates succeed or fail together, preventing data inconsistencies like outdated read models or incorrect checkpoint positions. It also simplifies error recovery and ensures the system remains in sync.
:::

::: info Exactly-once processing
This implementation ensures exactly-once processing by using KurrentDB for reliable persistence, idempotent projection logic, and transactional updates. The read model and checkpoint are updated atomically, preventing duplicates or inconsistencies, unlike traditional message brokers that rely on at-least-once or at-most-once delivery.

For more information about exactly-once processing with catch-up subscription and transactional checkpoints, [click here](../best-practices/exactly-once-processing.md)

:::

```cs
await foreach (var message in subscription.Messages)                     // Iterate through the messages in the subscription
{
    if (message is not StreamMessage.Event(var e)) continue;             // Skip this message if it is not an event

    postgres.BeginTransaction();                                         // Begin a transaction for Postgres
    
    postgres.Execute(CartProjection.Project(e));                         // Update the Postgres read model based on the event being processed
    
    postgres.Execute(                                                    
        "INSERT INTO checkpoints (read_model_name, checkpoint) " +       // Insert checkpoint into the checkpoint table 
        "VALUES (@ReadModelName, @Checkpoint) " +
        "ON CONFLICT (read_model_name) DO " +                            // If the read model name already exists..
        "UPDATE SET checkpoint = @Checkpoint",                           // then update the checkpoint value
        new
        {
            ReadModelName = "carts", 
            Checkpoint = e.OriginalEventNumber.ToInt64()                 // Get the stream position from the event
        });

    postgres.Commit();                                                   // Commit the transaction only if the read model and checkpoint are updated successfully

    Console.WriteLine($"Projected event " +
                      $"#{e.OriginalEventNumber.ToInt64()} " +
                      $"{e.Event.EventType}");
}
```

The `CartProjection.Project(e)` function above returns a sql command that updates the read model depending on the event. 

For example, this returns a command that inserts a cart if `CustomerStartedShopping` event i received:

```cs
private static IEnumerable<CommandDefinition>? Project(CustomerStartedShopping evt)
{
   var sql = @"INSERT INTO carts(cart_id, customer_id, status, created_at, updated_at)
                  VALUES(@CartId, @CustomerId, @Status, @Timestamp, @Timestamp)
                  ON CONFLICT(cart_id) DO NOTHING";

   var parameters = new { CartId = evt.cartId, CustomerId = evt.customerId, Status = "STARTED", Timestamp = evt.at };

   yield return new CommandDefinition(sql, parameters);
}
```

This returns a command that updates a cart's status to `CHECKED_OUT` if the `CartGotCheckedOut` event is received:

```cs
private static IEnumerable<CommandDefinition>? Project(CartGotCheckedOut evt)
{
   var sql = @"UPDATE carts
                  SET status = @Status,
                        updated_at = @Timestamp
                  WHERE cart_id = @CartId";

   var parameters = new { CartId = evt.cartId, Status = "CHECKED_OUT", Timestamp = evt.at };

   yield return new CommandDefinition(sql, parameters);
}
```

These function as well as other ones can be found in `/PostgresProjection/CartProjection.cs`.

::: info Quick Quick
What does `CartProjection.Project()` return when `ItemGotRemoved` is received?
:::


## Step 7: Review the Projected Read Models in Redis

In this step, you will review the top 10 products that were recorded in Redis from executing the applications in a previous step:

1. Run the following command in the terminal to start postgres cli:
   
   ```sh
   docker exec -it redis redis-cli
   ```

   You will see a message, like below, printed in the termnal:

   ```
   127.0.0.1:6379>
   ```

2. Run the following command in redis-cli to list all keys in Redis:

   ```
   KEYS *
   ``` 

   You will see a list similar to, but different from this:

   ```
   1) "checkpoint"
   2) "product-names"
   3) "top-10-products:2025041508"
   ```

3. Run the following command in redis-cli to list the most popular products added to cart so far. Replace top-10-product:YYYYMMDDHH with the actual top-10-products key listed in the previous step.

   ```
   ZREVRANGE top-10-product:YYYYMMDDHH 0 9 WITHSCORES
   ```

   You will see a list similar to, but different from this:

   ```   
   1) "5449310139799"
   2) "9"
   3) "4291118428480"
   4) "6"
   5) "0563658703704"
   6) "4"
   7) "2256276792349"
   8) "1"
   ```

   The 13 digit number is the product ID, followed by its quantity across all shopping carts. In this case, `5449310139799` is the most popular product with 9 of them across all carts

::: info Quick Quiz
Given the quantity for a product above is the total add minus total removed from a cart, pick one of the products above and see if it matches what the events in step 3 indicate.
:::

4. Exit redis-cli by running the command:

```
exit
```

## Step 8. Examine the Redis Projection Application Codebase

Similar to step 6, projecting KurrentDB events to read models in another database like Redis can also follow the same pattern:
1. Retrieve last checkpoint
2. Subscribe events from a stream from checkpoint
3. Process each event by updating the read model and checkpoint in the database

You will examine how this pattern is applied to the Redis projection application.

1. Run the following command in the terminal to open the main program for the Postgres projection application:

   ```sql
   code ./RedisProjection/program.cs
   ```

   Code snippets below in this step can mostly be found within this file.

2. Locate and examine code that retrieves the last checkpoint

The checkpoint can be retrieved by the `redis.StringGet()` statement. If no checkpoint is found or it is the first time the application is executed, we can retrieve the default start position:

```cs
var checkpointValue = redis.StringGet("checkpoint");                     // Get the checkpoint value from redis
var streamPosition = long.TryParse(checkpointValue, out var checkpoint)  // Check if it exists and convertible to long
    ? FromStream.After(StreamPosition.FromInt64(checkpoint))             // If so, set var to subscribe events from stream after checkpoint
    : FromStream.Start;                                                  // Otherwise, set var to subscribe events from stream from the start
```

3. Locate and examine code that subscribes to stream

A catch-up subscription is created that subscribes to events from the `$ce-carts` stream. The subscription will only retrieve events starting from `streamPosition` in the stream (i.e. the checkpoint retrieve from previous step).

```cs
await using var subscription = esdb.SubscribeToStream(                   // Subscribe events..
    "$ce-cart",                                                          // from the cart category system projection..        
    streamPosition,                                                      // from this position..
    true);                                                               // with linked events automatically resolved (required for system projections)
```
4. Locate and examine code that processes each event

For each event, the projection will:
- Start a redi transaction,
- Save the appropriate key-value pairs in the database,
- Update the `checkpoint` key in the database,
- Commit the redis transaction


```cs
await foreach (var message in subscription.Messages)                     // Iterate through the messages in the subscription
{                                                                       
    if (message is not StreamMessage.Event(var e)) continue;             // Skip if message is not an event

    var txn = redis.CreateTransaction();                                 // Create a transaction for Redis

    if (!CartProjection.TryProject(txn, e)) continue;                    // Project the event into Redis

    txn.StringSetAsync("checkpoint", e.OriginalEventNumber.ToInt64());   // Set the checkpoint to the current event number
    
    txn.Execute();                                                       // Execute the transaction
}
```

The `CartProjection.TryProject()` function above will try to project the event into the appropriate key-value pair in redis. 

If the event is `ItemGotAdded` then a Redis sort set is incremented with the product key for that particular hour.

A hash set is also used to map product Ids to product names (Used later in the Demo Web Page to construct a top 10 products table).

```cs
public static void Project(ITransaction txn, ItemGotAdded addedEvent)
{
   var hourKey = $"top-10-products:{addedEvent.at:yyyyMMddHH}";            // Create a key for the current hour
   var productKey = addedEvent.productId;                                  // Use the product ID as the member in the sorted set
   var productName = addedEvent.productName;                               // Assuming `productName` is part of the event

   txn.SortedSetIncrementAsync(hourKey, productKey, addedEvent.quantity);  // Increment the quantity of the product in the sorted set
   txn.HashSetAsync("product-names", productKey, productName);             // Store product name in a hash;

   Console.WriteLine($"Incremented product {addedEvent.productId} in " +
                     $"{hourKey} by {addedEvent.quantity}");
}
```


If the event is `ItemGotRemoved` then a Redis sort set is decremented with the product key for that particular hour.

```cs
public static void Project(ITransaction txn, ItemGotRemoved removedEvent)
{
   var hourKey = $"top-10-products:{removedEvent.at:yyyyMMddHH}";          // Create a key for the current hour
   var productKey = removedEvent.productId;                                // Use the product ID as the member in the sorted set

   txn.SortedSetDecrementAsync(hourKey, productKey,                        // Decrement the quantity of the product in the sorted set
      removedEvent.quantity); 

   Console.WriteLine($"Decremented product {removedEvent.productId} in " +
                     $"{hourKey} by {removedEvent.quantity}");
}
```

These function as well can be found in `/RedisProjection/CartProjection.cs`.

# Section 3: Project KurrentDB Events in Real-Time 

Now that the read models on the databases are synchronized with events on KurrentDB, you will learn how to synchonize the read models in real-time.

## Step 9: Browse the Demo Web Page

1. Run the following command in the terminal to start the Demo Web Page application:

   ```sh
   ./scripts/3-start-demo-web-page.sh
   ```

   You will see the below message printed in the terminal:

   ```
   URL to the Demo web UI 👉: https://XXXXXXXXX.XXX
   ```

1. Open a new browser tab.

2. In the address bar of the new tab, paste the URL to and navigate to it.

3. This will display a demo web app for this sample. This page displays the top 10 products that has been added to cart in the past 24 hours. This table is retrieved with data from Redis that was generated from the Redis projection.

4. Click on `Carts Table (Postgres)` in the header

5. This page displays the contents of the cart and items tables from Postgres that was generated from the Postgres projection

::: info Quick Quiz

Do the products and quantity in the carts match what you queried in Step 5's quick quiz?

:::

::: info Quick Quiz

Are the contents of the Top 10 products table and Carts table in sync?

:::

## Step 10: Start the Live Data Generator

1. Run the following command in the terminal to start a live data generator:

   ```sh
   ./scripts/4-start-live-data-gen.sh
   ```

   You will see the below message printed in the terminal:

   ```
   URL to the KurrentDB Admin UI 👉: https://XXXXXXXXX.XXX

   URL to the Demo Web Page 👉: https://XXXXXXXXX.XXX


   10:10:33 info: edb-commerce[0] Executing command 'live-data-set' with settings {"ConfigurationFile":"./data/datagen.live.config","ConnectionString":"esdb://localhost:2113?tls=false"}
   10:10:34 info: edb-commerce[0] Generating 12 products
   10:10:35 info: edb-commerce[0] Generating 640 carts
   10:10:35 info: edb-commerce[0] With 399 carts concurrently
   ```

   The tool is now running in the background.

## Step 11: Watch the Read Models Update in Real-Time

2. Navigate to the KurrentDB Admin UI

3. Click the `Stream Browser` link from the top navigation bar.

4. Under `Recently Changed Streams`, click `$ce-cart` link. 
 
5. Notice how new events are being appended to the stream in real time

6. Return to the Demo Web Page and click on the `Top 10 Products` link from the top navigation bar. Notice how the Top 10 products are being updated in real-time.

7. Click on the `Cart Table` link from the top navigation bar. Notice how the data is updated and new carts in the Postgres tables are now available. You can click the `Refresh` button to see the most updated data.

8. Return to the terminal and stop the live data generator tool by inputting ctrl+c.

## Step 12: Understanding Catch-up Subscription and Real-Time Processing

1. Run the following command in the terminal to open the main program for the Postgres projection application:

   ```sql
   code ./PostgresProjection/program.cs
   ```

2. Locate and examine code that subscribes to stream

```cs
await using var subscription = esdb.SubscribeToStream(                   // Subscribe events..
    "$ce-cart",                                                          // from the cart category system projection..        
    streamPosition,                                                      // from this position..
    true);                                                               // with linked events automatically resolved (required for system projections)
```

The subscription will only retrieve events starting from `streamPosition` in the stream.

If `streamPosition` is not at the end of the stream, then the subscription will first return all the events from that position to the end of the stream. Afterwards, it will listen for any new events appended in real-time.

If `streamPosition` is at the end of stream, then the subscription will automatically listen to new events in real time.

::: info 

For more info on subscribing to a stream for live updates, [click here](https://docs.kurrent.io/clients/grpc/subscriptions.html#subscribing-to-a-stream-for-live-updates)

:::