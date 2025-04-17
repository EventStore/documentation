---
title: Section 3 - Project KurrentDB Events in Real-Time 
---

# Section 3: Project KurrentDB Events in Real-Time 

Now that the read models on the databases are synchronized with events on KurrentDB, you will learn how to synchronize the read models in real time.

## Step 9: Browse the Demo Web Page

1. Run the following command in the terminal to start the Demo Web Page application:

   ```sh
   ./scripts/3-start-demo-web-page.sh
   ```

   You will see the following message printed in the terminal:

   ```
   URL to the Demo web UI 👉: https://XXXXXXXXX.XXX
   ```

1. Open a new browser tab.

2. In the address bar of the new tab, paste the URL and navigate to it.

3. This will display a demo web app for this sample. This page displays the top 10 products added to carts in the past 24 hours. This table is retrieved with data from Redis generated from the Redis projection.

4. Click `Carts Table (Postgres)` in the header.

5. This page displays the contents of the cart and items tables in Postgres, which were generated from the Postgres projection.

::: info Quick Quiz

Do the products and quantity in the carts match what you calculated and queried in previous Quick Quizzes?

:::

::: info Quick Quiz

Are the contents of the Top 10 Products (Redis) table and the Carts Table (Postgres) in sync?

:::

## Step 10: Start the Live Data Generator

1. Run the following command in the terminal to start a live data generator:

   ```sh
   ./scripts/4-start-live-data-gen.sh
   ```

   You will see the following message printed in the terminal:

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

1. Navigate to the KurrentDB Admin UI

2. Click the `Stream Browser` link from the top navigation bar.

3. Under `Recently Changed Streams`, click `$ce-cart` link. 
 
4. Notice how new events are being appended to the stream in real time

5. Return to the Demo Web Page and click on the `Top 10 Products` link from the top navigation bar. Notice how the Top 10 products are being updated in real-time.

6. Click on the `Carts Table` link from the top navigation bar. Notice how the data is updated and that new carts are available in the Postgres tables. Click the `Refresh` button to see the most recent data.

7. Return to the terminal and stop the live data generator tool by typing Ctrl + C.

## Step 12: Understanding Catch-up Subscription and Real-Time Processing

1. Run the following command in the terminal to open the main program for the Postgres projection application:

   ```sql
   code ./PostgresProjection/program.cs
   ```

2. Locate and examine the code that subscribes to stream

   ```cs
   await using var subscription = esdb.SubscribeToStream(                   // Subscribe events..
      "$ce-cart",                                                          // from the cart category system projection..        
      streamPosition,                                                      // from this position..
      true);                                                               // with linked events automatically resolved (required for system projections)
   ```

   The subscription will only retrieve events starting from `streamPosition` in the stream.

   If `streamPosition` is not at the end of the stream, the subscription will first return all the events from that position to the end of the stream. Afterwards, it will listen for any new events appended in real time.

   If `streamPosition` is at the end of the stream, then the subscription will automatically listen to new events in real time.

   ::: info 

   For more info on subscribing to a stream for live updates, [click here](https://docs.kurrent.io/clients/grpc/subscriptions.html#subscribing-to-a-stream-for-live-updates)

   :::
