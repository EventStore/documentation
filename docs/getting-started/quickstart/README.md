---
title: Quickstart with Github Codespaces
---

# EventStoreDB Quickstart using GitHub Codespaces

This quickstart will guide you through getting started with EventStoreDB using [GitHub Codespaces](https://github.com/features/codespaces).

::: info
GitHub Codespaces provides an instant and preconfigured development environment in your browser for this quickstart.
:::

## Objectives

In this quickstart, you will:

- Set up a Codespace development environment.
- Start an EventStoreDB server using Docker.
- Append an event to EventStoreDB with sample code.
- View the appended event using the Admin UI.
- Read the appended event with sample code using the EventStoreDB client.

## Prerequisites

Before starting, ensure you have the following:

- A GitHub account to use GitHub Codespaces.
- Basic knowledge of one of the development languages/platforms below.
- Familiarity with command-line operations.

## Step 1: Set up Your Codespace

1. Choose one of development languages/plaforms below and click the Codespaces link:

::: tabs#dev-language-platform

@tab Select >


@tab Python
|Language/Platform|Link to Codespaces|
|-----|--------|
|<div style="display: flex; justify-content: center; align-items: center;"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" alt="Python" style="height: 64px;" /></div>|[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=793881789&ref=stephen-getting-started&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)|

@tab Java
|Language/Platform|Link to Codespaces|
|-----|--------|
|<div style="display: flex; justify-content: center; align-items: center;"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg" alt="Python" style="height: 64px;" /></div>|[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=793886190&ref=stephen-getting-started&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)|

@tab .NET
|Language/Platform|Link to Codespaces|
|-----|--------|
|<div style="display: flex; justify-content: center; align-items: center;"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-plain-wordmark.svg" alt="Python" style="height: 64px;" /></div>|[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=790993560&ref=stephen-getting-started&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)|

@tab node.js
|Language/Platform|Link to Codespaces|
|-----|--------|
|<div style="display: flex; justify-content: center; align-items: center;"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg" alt="Python" style="height: 64px;" /></div>|[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=793877904&ref=stephen-getting-started&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)|

:::

2. Follow the instructions to create a new Codespace.

3. Wait for your Codespace to build. This will take a few moments. Once complete, you will see a welcome message in the terminal.

::: info

For this quickstart, you can safely ignore or close any notification that appear on the bottom right of the Codespace page.

:::

## Step 2: Start the EventStoreDB Server

1. Once your Codespace is loaded, run the following custom script in the terminal to start the EventStoreDB server:

   ```sh
   ./start_cluster.sh
   ```

   This script will: 
   - Pull the EventStoreDB server Docker container,
   - Start the server, and
   - Print the URL to the EventStoreDB Admin UI. 

2. Open your browser and navigate to the printed URL. This will display the EventStoreDB Admin UI.
3. Keep the Admin UI open for the next steps.
4. (Optional) Review the content of custom script.

## Step 3: Install Required Pacakge for Sample Code

1. Run this command to install the package for EventStoreDB client. This will be used in the sample codes:

::: tabs#dev-language-platform
@tab Select >

@tab Python
   ```sh
   pip install -r requirements.txt
   ```

@tab Java
   ```sh
   mvn package
   ```

@tab .NET
   This step is not required for .NET. Please continue with next step. 
   
@tab node.js
   ```sh
   yarn install
   ```
:::

## Step 4: Append an Event to EventStoreDB

1. Run this command to execute the sample. This appends an event to EventStoreDB:

::: tabs#dev-language-platform
@tab Select >

@tab Python
   ```sh
   python3 sample_append.py
   ```

@tab Java
   ```sh
   java -cp \
      target/eventstoredb-demo-1.0-SNAPSHOT-jar-with-dependencies.jar \
      com.eventstoredb_demo.SampleWrite
   ```

@tab .NET
   ```sh
   dotnet run --project SampleAppend/
   ```

@tab node.js
   ```sh
   node sample_append.js
   ```
:::

2. You should see a confirmation for the event append.
3. (Optional) Review the content of sample code.

## Step 5: Verify the Appended Event in the Admin UI

1. Return to the Admin UI and click the **Stream Browser** link from the top navigation bar.

2. Under `Recently Changed Streams`, click `SampleStream` link.

3. Click on the `JSON` link in the right most column of the table. 
   
4. You should see the content of the appended event.

## Step 6: Read the Event from EventStoreDB Programmatically

1. Run this command to execute the sample. This reads the event from EventStoreDB:

::: tabs#dev-language-platform
@tab Select >

@tab Python
   ```sh
   python3 sample_read.py
   ```

@tab Java
   ```sh
   java -cp \
      target/eventstoredb-demo-1.0-SNAPSHOT-jar-with-dependencies.jar \
      com.eventstoredb_demo.SampleRead
   ```

@tab .NET
   ```sh
   dotnet run --project SampleRead/
   ```

@tab node.js
   ```sh
   node sample_read.js
   ```
:::

2. You should see the content of the appended event.
3. (Optional) Review the content of sample code.

## Troubleshooting

If you encounter difficulties with this quickstart, you can follow a more detailed tutorial in the ["EventStoreDB From Scratch" series on Event Store Academy](https://academy.eventstore.com/from-scratch).

## Summary

In this quickstart, you:

1. Started the EventStoreDB server.
2. Browsed to the Admin UI.
3. Appended an event to EventStoreDB.
4. Verified the event in the Admin UI.
5. Read the event from EventStoreDB programmatically.

Feel free to experiment further by appending more events, reading them, or even exploring advanced features of EventStoreDB!

## Next Steps

Now that you've completed the quickstart, you may want to explore the following:

- [EventStoreDB "From Scratch" Series](https://academy.eventstore.com/from-scratch): Find more explanations about the scripts and samples used in this quickstart along with other beginner tutorials.

- [Install EventStoreDB locally](https://developers.eventstore.com/server/v23.10/quick-start/installation.html): Learn how to installEventStoreDB on your local machine for deeper exploration and integration with your projects.

- [EventStoreDB Client SDK Documentation](https://developers.eventstore.com/clients/grpc/getting-started.html): Understand how to interact with EventStoreDB programmatically with EventStoreDB clients.

- [EventStoreDB Server Configuration Documentation](https://developers.eventstore.com/server/v23.10/configuration/): Explore how to configure EventStoreDB for your environment.

- [Event Store Cloud](https://www.eventstore.com/event-store-cloud): Run EventStoreDB from the fully managed environment without the need to host it yourself.

- [EventStoreDB Samples](https://github.com/EventStore/samples/tree/main): Experiment with different SDKs to interact with EventStoreDB using various programming languages.