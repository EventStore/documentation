---
title: Tutorial
---

## Overview

This tutorial will guide you through the Multimodal Data Transformation sample with KurrentDB using GitHub Codespaces.

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

## Architecture

TBD

## Step 1: Set up Your Codespace

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

## Step 2: Initialize KurrentDB with sample data

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

## Step 3: Browse Sample Data

1. Click the `Stream Browser` link from the top navigation bar.

1. Under `Recently Changed Streams`, click `$ce-cart` link. 

2. You should see the content of the appended event. Here you will see shopping cart events for two shopping carts.

::: info Quick Quiz

How many products and quantity is currently in the carts based on the events?

:::

## Step 4: Start the Postgres and Redis Projections

1. Run the following command in the terminal to append sample events to KurrentDB:

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
   ./scripts/3-start-live-data-gen.sh
   ```

2. While the tool is running, return to the KurrentDB Web UI

1. Click the `Stream Browser` link from the top navigation bar.

1. Under `Recently Changed Streams`, click `$ce-cart` link. Notice how new events are being appended to the stream in real time

2. Return to the demo web UI and click on the `Top 10 Products` link from the top navigation bar. Notice how the Top 10 products are being updated in real-time.

3. Click on the `Cart Table` link from the top navigation bar. Notice how the table is being updated in real-time.

4. Return to the terminal and stop the live data generator tool by inputting ctrl+c.

::: info Quick Quiz

Return to the demo web UI and examine the content of both demo pages. Are both pages in sync?

:::

## Step 6: Understanding the sample code

Work in Progress