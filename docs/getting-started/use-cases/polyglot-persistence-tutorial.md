---
title: Tutorial
---

# KurrentDB Quickstart

This tutorial will guide you through the polyglot persistence sample with KurrentDB using GitHub Codespaces.

::: info
GitHub Codespaces provides an instant and preconfigured development environment in your browser for this quickstart. To learn more about Github Codespaces, [click here](https://github.com/features/codespaces).
:::

## Objectives

In this quickstart, you will:

- Start an KurrentDB server using Docker in GitHub Codespaces.
- Append an event to KurrentDB with sample code.
- View the appended event using the Admin UI.
- Read the appended event with sample code using the KurrentDB client.

## Prerequisites

Before starting, ensure you have the following:

- A GitHub account to use GitHub Codespaces.
- Basic knowledge of one of the development languages/platforms below.
- Familiarity with command-line operations.

::: tip
If you have trouble with this quickstart, you can find more help in the ["KurrentDB From Scratch" tutorial series on Event Store Academy](https://academy.eventstore.com/from-scratch).
:::

## Step 1: Set up Your Codespace

1. Click the button below to start Codespaces:
   
   [![](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=790993560&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)

2. Login to GitHub if required.
   
3. Follow the instructions to create a new Codespace.

4. Wait for your Codespace to build. This can take up to a few minutes. 

5. Once complete, you will see a welcome message in the terminal:

```
Hello!👋 Welcome to the KurrentDB Getting Started Quickstart Guide.
```

::: tip
For this quickstart, you can safely ignore and close any Codespaces notification that appears on the bottom right of the page.
:::

## Step 2: ⚠️ WORK IN PROGRESS ⚠️ 

1. Once your Codespace is loaded, run the following command in the terminal to start the KurrentDB server:

   ```sh
   ./start_cluster.sh
   ```

   This is a custom script written for this quickstart to help start KurrentDB in Docker.

2. You will see the below message printed in the terminal: