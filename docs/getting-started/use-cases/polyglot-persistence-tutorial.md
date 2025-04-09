---
title: Tutorial
---

## Overview

This tutorial will guide you through the polyglot persistence sample with EventStoreDB using GitHub Codespaces.

::: info
GitHub Codespaces provides an instant and preconfigured development environment in your browser for this quickstart. To learn more about Github Codespaces, [click here](https://github.com/features/codespaces).
:::

## Objectives

In this quickstart, you will learn:

TBD

## 

## Prerequisites

Before starting, ensure you have the following:

- A GitHub account to use GitHub Codespaces.
- Basic knowledge of one of the development languages/platforms below.
- Familiarity with command-line operations.

::: tip
If you have trouble with this quickstart, you can find more help in the ["EventStoreDB From Scratch" tutorial series on Event Store Academy](https://academy.eventstore.com/from-scratch).
:::

## Architecture

TBD

## Step 1: Set up Your Codespace

1. Click the button below to start Codespaces:
   
   [![](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=951198039&skip_quickstart=true)

2. Login to GitHub if required.
   
3. Follow the instructions to create a new Codespace.

4. Wait for your Codespace to build. This can take up to a few minutes. 

5. Once complete, you will see a welcome message in the terminal:

```
Hello!👋 Welcome to the EventStoreDB Polyglot Persistence Use Case Tutorial (Work in Progress)
```

::: tip
For this quickstart, you can safely ignore and close any Codespaces notification that appears on the bottom right of the page.
:::

## Step 2: Initialize EventStoreDB with sample data

1. Once your Codespace is loaded, run the following command in the terminal to append sample events to EventStoreDB:

   ```sh
   ./scripts/1-init-data.sh
   ```

   This is a custom script written for this quickstart to help start EventStoreDB in Docker.

2. You will see the below message printed in the terminal:

   ```
   🚀 EventStoreDB Server has started!! 🚀

   URL to the EventStoreDB Admin UI 👉: https://XXXXXXXXX.XXX

   Appended sample data to EventStoreDB
   ```

3. Copy the URL printed in the terminal from last step.

4. Open a new browser tab. 

5. In the address bar of the new tab, paste the URL to and navigate to it.

6. This will display the EventStoreDB Admin UI.
   
![EventStoreDB Admin UI Dashboard](images/admin-ui.png =300x)

## Step 3: Browse Sample Data

1. Click the `Stream Browser` link from the top navigation bar.

1. Under `Recently Changed Streams`, click `$ce-cart` link. 

1. Click on the `JSON` link in the rightmost column of the table. 
   
1. You should see the content of the appended event. Here you will see shopping cart events for two shopping carts.

::: info Quick Quiz

How many products and quantity is currently in the carts based on the events?

:::

## Step 4: Start the Postgres and Redis Projections

1. Run the following command in the terminal to append sample events to EventStoreDB:

   ```sh
   ./scripts/2-start-projections.sh
   ```

   You will see the below message printed in the terminal:

   ```
   URL to the Demo web UI 👉: https://XXXXXXXXX.XXX
   ```

This command starts two application that takes the events from last step and projects it to Redis and Postgres. The Redis projection will transform the events into Redis sorted sets that tracks the popularity of the products. The Postgres projection will transform the events into normalized relational tables that is querable with SQL.

1. Copy the URL printed in the terminal from last step.

2. Open a new browser tab. 

3. In the address bar of the new tab, paste the URL to and navigate to it.

4. This will display a demo web app for this sample. This page displays the top 10 products that has been added to cart in the past 24 hours. This table is retrieved with data from Redis that was generated from the Redis projection.

5. Click on `Carts Table (Postgres)` in the header

6. This page displays the contents of the cart and items tables from Postgres that was generated from the Postgres projection

::: info Quick Quiz

Do the products and quantity in the carts match what you calculated in the previous quiz?

:::

::: info Quick Quiz

Are the contents of the Top 10 products table and Carts table in sync?

:::

## Step 5: Start real-time project to Redis and Postgres

1. Run the following command in the terminal to start a live data generator:

```sh
./tools/Kurrent.Extensions.Commerce/linux-x64/edb-commerce live-data-set --configuration ./data/datagen.live.config
```

2. While the tool is running, return to the EventStoreDB Web UI

1. Click the `Stream Browser` link from the top navigation bar.

1. Under `Recently Changed Streams`, click `$ce-cart` link. Notice how new events are being appended to the stream in real time

1. Return to the demo web UI and click on the `Top 10 Products` link from the top navigation bar. Notice how the Top 10 products are being updated in real-time

1. Click on the `Cart Table` link from the top navigation bar. Notice how the table is being updated in real-time.

1. Return to the terminal and stop the live data generator tool by inputting ctrl+c.

::: info Quick Quiz

Return to the demo web UI and examine the content of both demo pages. Are both pages in sync?

:::

## Step 6: Understanding the sample code

Work in Progress