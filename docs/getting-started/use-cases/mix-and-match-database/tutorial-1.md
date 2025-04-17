---
title: Section 1 - Setup and Initialize KurrentDB
---

# Section 1: Setup and Initialize KurrentDB

In this section, you will start a GitHub Codespaces session in your browser.

   ::: info
   GitHub Codespaces provides an instant and preconfigured development environment all within your browser. This environment contains all the tools and code to complete this tutorial. To learn more about Github Codespaces, [click here](https://github.com/features/codespaces).
   :::

You will then initialize KurrentDB by appending sample events that mimic an e-commerce application. The events are appended using a data generator program.

## Step 1: Set up Your Codespaces

1. Click the button below to initiate Codespaces, then follow steps 2-5 to configure and start your environment:
   
   [![](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=951198039&skip_quickstart=true)

   Log in to GitHub if required.

2. For `Branch`, select `polyglot-tutorial`
   
3. For `Dev container configuration`, select `polyglot-persistence`
   
4. For `Region`, select `Southeast Asia`

4. Click `Create codespace`

5. Wait for your Codespace to build. This can take up to a few minutes. 

::: tip
For this quickstart, you can safely ignore and close any Codespaces notifications that appear on the bottom right of the page.
:::

## Step 2: Start and Initialize KurrentDB with Sample Events

1. Once your Codespace is loaded, run the following command in the terminal to append sample events to KurrentDB:

   ```sh
   ./scripts/1-init-data.sh
   ```

   This is a custom script for this quickstart to help start KurrentDB in Docker.

2. You will see the following message printed in the terminal:

   ```
   🚀 KurrentDB Server has started!! 🚀

   URL to the KurrentDB Admin UI 👉: https://XXXXXXXXX.XXX

   Appended sample data to KurrentDB
   ```

3. Copy the URL printed in the terminal from the last step.

4. Open a new browser tab. 

5. In the address bar of the new tab, paste the URL and navigate to it.

6. This will display the KurrentDB Admin UI.
   
   ![KurrentDB Admin UI Dashboard](images/admin-ui.png =300x)

## Step 3: Browse Sample Events in KurrentDB's Admin UI

1. Click the `Stream Browser` link from the top navigation bar.

1. Under `Recently Changed Streams`, click the `$ce-cart` link. 

2. You should see an ordered list of the appended events associated with two distinct, virtual shopping carts.

   ::: info Introducing shopping cart events
   In KurrentDB, events for each shopping cart are appended to a stream like `cart-2fbe05d1dcf043d782ea24923298ae3a`, where `2fbeone05d1dcf043d782ea24923298ae3a` is the cart's unique ID.

   The cart will contain events like these:

   | Event                     | Description                                                                                     |
   |---------------------------|-------------------------------------------------------------------------------------------------|
   | `VisitorStartedShopping`  | When a visitor starts shopping and a cart is created.                     |
   | `CustomerStartedShopping` | When a known customer starts shopping and a cart is associated with their ID.   |
   | `CartShopperGotIdentified`| When a customer's identity is linked to a cart (e.g., a visitor logged in)                            |
   | `ItemGotAdded`            | When an item is added to the cart, including details like quantity, price, and tax. |
   | `ItemGotRemoved`          | When an item is removed from the cart, including the quantity removed.    |
   | `CartGotCheckedOut`       | When a cart is checked out and converted into an order.                   |
   | `CartGotAbandoned`        | When a cart is abandoned after being idle for a specified duration.       |
   :::

   ::: info Quick Quiz

   What were the quantities of each product in the shopping carts before they were abandoned?

   :::
