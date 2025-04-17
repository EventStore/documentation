---
title: Section 2 - Project KurrentDB Events to Other Databases
---

# Section 2: Project KurrentDB Events to Other Databases

Now that KurrentDB is filled with shopping cart events, you will learn how to project these events to other databases as read models.

You will do this by executing a few sample applications written for this section.

### Introducing the Postgres Projection Application
This application projects KurrentDB events to Postgres relational tables. The tables can be queried for reporting using standard SQL queries.

To do this, the application subscribes to the shopping cart events. For each event it receives, it inserts or updates a record to a cart and cart_item table in Postgres. 

The schemas of the tables are as follows:

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
This application projects KurrentDB events to Redis sorted sets to calculate the top 10 products across all carts over the past 24 hours.

To do this, it subscribes to the shopping cart events. Each item added or removed event the application receives will increment/decrement the product's quantity in a Redis sorted set for the current hour.

## Step 4: Execute Projection Application

1. Run the following command in the terminal to execute the projection applications:

   ```sh
   ./scripts/2-start-projections.sh
   ```

## Step 5. Review the Projected Read Models in Postgres

In this step, you will review the records in the `carts` and `cart_items` tables that were created from executing the applications in the previous step:

1. Run the following command in the terminal to start Postgres CLI:
   
   ```sh
   docker exec -it postgres psql -U postgres
   ```

   You will receive a message, like below, printed in the terminal:

   ```
   psql (16.8 (Debian 16.8-1.pgdg120+1))
   Type "help" for help.

   postgres=#
   ```

2. Run the following command in Postgres CLI to list the shopping carts projected from the events:

   ```sql
   select * from carts;
   ``` 

   You should see two carts in the table.

::: info Quick Quiz

The carts' status should be checked out or abandoned. Do the cart statuses match those you saw when manually calculating the number of events in each cart during step 3 in the last section?

:::

3. Type `\q` and press Return to access the Postgres CLI prompt, then run the following command to list the items in each cart:

   ```sql
   select * from cart_items;
   ``` 

   You will see a few items in each cart.

::: info Quick Quiz

Do the products and their quantities in the carts match the totals calculated in step 3 in the last section?

:::

4. Exit Postgres CLI by running the command:

```
exit
```

## Step 6. Examine the Postgres Projection Application Codebase

Projecting KurrentDB events to read models in another database often adheres to the following pattern:
1. Retrieve the last checkpoint
2. Subscribe to events from a stream from the checkpoint
3. Process each event by updating the read model and checkpoint in the database

You will examine how this pattern is applied to the Postgres projection application.

1. Run the following command in the terminal to open the main program for the Postgres projection application:

   ```sql
   code ./PostgresProjection/program.cs
   ```

   Most of the code snippets leveraged in this step can be found within this file in Codespaces.

2. Locate and examine the code that retrieves the last checkpoint

Checkpoints for database projections can often be saved to a separate checkpoint table similar to this:

```sql
CREATE TABLE IF NOT EXISTS checkpoints (
   read_model_name TEXT PRIMARY KEY,
   checkpoint BIGINT NOT NULL
)
```

::: info Understanding Checkpoint
A projection often uses a checkpoint to recover the position of the last processed event. This way, when an application unexpectedly crashes mid-process, the projection does not have to process all the previously processed events.

For more information about checkpoints, [click here](../best-practices/checkpoint.md)

:::

A `SELECT` statement can retrieve the checkpoint. If no checkpoint is found or it is the first time the application is executed, we can retrieve the default start position:

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

3. Locate and examine the code that subscribes to stream

A subscription is created that subscribes to events from the `$ce-carts` stream. The subscription will only retrieve events starting from `streamPosition` in the stream (i.e., the checkpoint retrieved from the previous step).

```cs
await using var subscription = esdb.SubscribeToStream(                   // Subscribe events..
    "$ce-cart",                                                          // from the cart category system projection..        
    streamPosition,                                                      // from this position..
    true);                                                               // with linked events automatically resolved (required for system projections)
```

::: info Different Types of Subscriptions
This sample uses catch-up subscriptions to subscribe to events. You can also use persistent subscriptions or connectors to achieve a similar result. 

For more information about catch-up subscriptions, [click here](https://docs.kurrent.io/clients/grpc/subscriptions.html).
For more information about persistent subscriptions, [click here](https://docs.kurrent.io/clients/grpc/persistent-subscriptions.html). 
For more information about connectors, [click here](https://docs.kurrent.io/server/v24.10/features/connectors/)
:::

::: info Understanding Category System Projection
The `$ce-cart` stream contains events from all the carts in KurrentDB. This uses the category system projection stream feature. For more information, [click here](https://docs.kurrent.io/server/v24.10/features/projections/system.html#by-category).
:::

4. Locate and examine the code that processes each event

For each event, the projection will:
- Start a database transaction,
- Update the `carts`, `cart_items` tables in the database,
- Update the `checkpoint` table in the database,
- Commit the database transaction

::: tip 
To ensure atomicity and consistency, the updates to the read model and checkpoint tables should be committed within the same transaction. This guarantees that both updates succeed or fail together, preventing data inconsistencies like outdated read models or incorrect checkpoint positions. It also simplifies error recovery and ensures the system remains in sync.
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

The `CartProjection.Project(e)` function above returns a SQL command that updates the read model depending on the event. 

For example, this returns a command that inserts a cart if `CustomerStartedShopping` event is received:

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

These functions and others can be found in `/PostgresProjection/CartProjection.cs`.

::: info Quick Quick
What does `CartProjection.Project()` return when `ItemGotRemoved` is received?
:::


## Step 7: Review the Projected Read Models in Redis

In this step, you will review the top 10 products that were recorded in Redis from executing the applications in a previous step:

1. Run the following command in the terminal to start Redis CLI:
   
   ```sh
   docker exec -it redis redis-cli
   ```

   You will see a message, like below, printed in the terminal:

   ```
   127.0.0.1:6379>
   ```

2. Run the following command in the Redis CLI to list all keys in Redis:

   ```
   KEYS *
   ``` 

   You will see a list similar to, but different from this:

   ```
   1) "checkpoint"
   2) "product-names"
   3) "top-10-products:2025041508"
   ```

3. Run the following command in the Redis CLI to list the most popular products added to a cart. Replace top-10-product:YYYYMMDDHH with the actual top-10-products key listed in the previous step.

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

   The 13-digit number is the product ID, followed by its quantity across all shopping carts. In this case, `5449310139799` is the most popular product with 9 of them across all carts.

::: info Quick Quiz
Given that the quantity for a product above is the total added minus the total removed from a cart, pick one of the products above and confirm it matches what the events in step 3 from the previous section indicate.
:::

4. Exit the Redis CLI by running the command:

```
exit
```

## Step 8. Examine the Redis Projection Application Codebase

Similar to step 6, projecting KurrentDB events to read models in another database like Redis can also follow the same pattern:
1. Retrieve the last checkpoint
2. Subscribe to events in a stream from the checkpoint
3. Process each event by updating the read model and checkpoint in the database

You will examine how this pattern is applied to the Redis projection application.

1. Run the following command in the terminal to open the main program for the Postgres projection application:

   ```sql
   code ./RedisProjection/program.cs
   ```

   Most of the code snippets included in this step can be found in this file.

2. Locate and examine the code that retrieves the last checkpoint

The `redis.StringGet()` statement can retrieve the checkpoint. If no checkpoint is found or it is the first time the application is executed, we can retrieve the default start position:

```cs
var checkpointValue = redis.StringGet("checkpoint");                     // Get the checkpoint value from redis
var streamPosition = long.TryParse(checkpointValue, out var checkpoint)  // Check if it exists and convertible to long
    ? FromStream.After(StreamPosition.FromInt64(checkpoint))             // If so, set var to subscribe events from stream after checkpoint
    : FromStream.Start;                                                  // Otherwise, set var to subscribe to events from the stream from the start.
```

3. Locate and examine the code that subscribes to stream

A catch-up subscription is created that subscribes to events from the `$ce-carts` stream. The subscription will only retrieve events starting from `streamPosition` in the stream (i.e., the checkpoint retrieved from the previous step).

```cs
await using var subscription = esdb.SubscribeToStream(                   // Subscribe events..
    "$ce-cart",                                                          // from the cart category system projection..        
    streamPosition,                                                      // from this position..
    true);                                                               // with linked events automatically resolved (required for system projections)
```
4. Locate and examine the code that processes each event

For each event, the projection will:
- Start a Redis transaction,
- Save the appropriate key-value pairs in the database,
- Update the `checkpoint` key in the database,
- Commit the Redis transaction


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

The `CartProjection.TryProject()` function above will try to project the event into the appropriate key-value pair in Redis. 

If the event is `ItemGotAdded`, then a Redis sort set is incremented with the product key for that particular hour.

A hash set is also used to map product IDs to product names (this is used later in the Demo Web Page to construct a table of the top 10 products).

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


If the event is `ItemGotRemoved`, then a Redis sort set is decremented with the product key for that particular hour.

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

These functions can also be found in `/RedisProjection/CartProjection.cs`.
