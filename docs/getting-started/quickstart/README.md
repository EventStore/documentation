---
title: Quickstart
---

# EventStoreDB Quickstart

This quickstart will guide you through getting started with EventStoreDB using GitHub Codespaces.

::: info
GitHub Codespaces provides an instant and preconfigured development environment in your browser for this quickstart. To learn more about Github Codespaces, [click here](https://github.com/features/codespaces).
:::

## Objectives

In this quickstart, you will:

- Start an EventStoreDB server using Docker in GitHub Codespaces.
- Append an event to EventStoreDB with sample code.
- View the appended event using the Admin UI.
- Read the appended event with sample code using the EventStoreDB client.

## Prerequisites

Before starting, ensure you have the following:

- A GitHub account to use GitHub Codespaces.
- Basic knowledge of one of the development languages/platforms below.
- Familiarity with command-line operations.

::: tip
If you have trouble with this quickstart, you can find more help in the ["EventStoreDB From Scratch" tutorial series on Event Store Academy](https://academy.eventstore.com/from-scratch).
:::

## Step 1: Set up Your Codespace

1. Choose one of the development languages/platforms below and click the Codespaces link:

::: tabs#dev-language-platform
@tab Select >

@tab Python
|Quickstart Language/Platform|Link to Codespaces|
|-----|--------|
|<div style="display: flex; justify-content: center; align-items: center;"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg" alt="Python" style="height: 64px;" /></div>|[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=793881789&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)|

@tab Java
|Quickstart Language/Platform|Link to Codespaces|
|-----|--------|
|<div style="display: flex; justify-content: center; align-items: center;"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg" alt="Python" style="height: 64px;" /></div>|[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=793886190&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)|

@tab .NET
|Quickstart Language/Platform|Link to Codespaces|
|-----|--------|
|<div style="display: flex; justify-content: center; align-items: center;"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-plain-wordmark.svg" alt="Python" style="height: 64px;" /></div>|[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=790993560&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)|

@tab node.js
|Quickstart Language/Platform|Link to Codespaces|
|-----|--------|
|<div style="display: flex; justify-content: center; align-items: center;"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg" alt="Python" style="height: 64px;" /></div>|[![Open in Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/?repo=793877904&devcontainer_path=.devcontainer%2Fquickstart%2Fdevcontainer.json)|

:::

2. Login to GitHub if required.
   
3. Follow the instructions to create a new Codespace.

4. Wait for your Codespace to build. This can take up to a few minutes. 

5. Once complete, you will see a welcome message in the terminal:

```
Hello!👋 Welcome to the EventStoreDB Getting Started Quickstart Guide.
```

::: tip
For this quickstart, you can safely ignore and close any Codespaces notification that appears on the bottom right of the page.
:::

## Step 2: Start the EventStoreDB Server

1. Once your Codespace is loaded, run the following command in the terminal to start the EventStoreDB server:

   ```sh
   ./start_cluster.sh
   ```

   This is a custom script written for this quickstart to help start EventStoreDB in Docker.

2. You will see the below message printed in the terminal:

```
🚀 EventStoreDB Server has started!! 🚀

URL to the EventStoreDB Admin UI 👉: https://XXXXXXXXX.XXX
```

::::: details (Optional) Learn more about how to start EventStoreDB in Docker and the start_cluster.sh script 

#### Understanding How to Start EventStoreDB Server in Docker and How `start_cluster.sh` Works

`start_cluster.sh` is a custom script written for the quickstart that will: 
- Check if Docker is currently running locally
- Pull the EventStoreDB server Docker container
- Start the server in Docker
- Print the EventStoreDB Admin UI URL in the terminal

To see how to start the EventStoreDB server in Docker, follow these steps

1. Run the following command to open `start_cluster.sh`:
   
   ```sh
   code ./start_cluster.sh
   ```

   ::: tip
   Alternatively, you can locate and open the file from the EXPLORER window found on the left side of Codespaces. You can find the path to the file in the command above.
   :::

2. In step 3 of the script, review how EventStoreDB is started with the `docker run` command:

```bash
docker run                        # Start a new Docker container using the 'docker run' command
     -d \                         # Run the container in detached mode (in the background)
     --name esdb-node \           # Assign the container a name ('esdb-node' in this case)
     -p 2113:2113 \               # Map port 2113 on the host to port 2113 in the Docker container. Required for the EventStoreDB
     eventstore/eventstore:lts \  # Specify the Docker image to use, in this case, the EventStoreDB long-term support version (lts)
     --insecure \                 # Run EventStoreDB in insecure mode, without authentication and SSL/TLS security (usually for development)
     --run-projections=All \      # Enable all projections in EventStoreDB, including system and user projections
     --enable-atom-pub-over-http  # Enable the AtomPub API over HTTP. Required for the EventStoreDB Admin UI
```

3. Review other parts of the script if you wish.

4. Feel free to modify and re-run the script in your Codespace.

::: info
For more information about other EventStoreDB parameters and settings, [click here](@server/configuration/README.md).
:::

:::: info
To view the source code in Github, click the link below:

::: tabs#dev-language-platform
@tab Select >

@tab Python
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Python-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Python)

@tab Java
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Java-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Java)

@tab .NET
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20.NET-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Dotnet)

@tab node.js
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Node.js-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Nodejs)
:::
::::
:::::

## Step 3: Navigate to the EventStoreDB Admin UI

1. In Codespaces, copy the URL to EventStoreDB Admin UI printed in the terminal from last step.
2. Open a new browser tab. 
3. In the address bar of the new tab, paste the URL to and navigate to it.
4. This will display the EventStoreDB Admin UI.
5. Keep the Admin UI open for the next steps.

![EventStoreDB Admin UI Dashboard](images/hello-world/admin-ui.png =300x)

## Step 4: Install Required Package for Sample Code

1. In Codespace, run this command to install the package for the EventStoreDB client. This will be used in the sample codes:

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
   This step is not required for .NET. Please continue to the next step. 
   
@tab node.js
   ```sh
   yarn install
   ```
:::

::::: details (Optional) Learn more about the EventStoreDB client packages

#### Understanding Required Packages for EventStoreDB Development

The EventStoreDB client packages enable your code to connect to the database, append events, and read events from streams in the language/platform of your choice.

To understand what packages are installed, follow these steps:

1. Run the following command to examine package dependencies:
   
::: tabs#dev-language-platform

@tab Select >

@tab Python
```sh
code ./requirements.txt
```

@tab Java
```sh
code ./pom.xml
```

@tab .NET
```sh
code ./SampleAppend/SampleAppend.csproj 
```

@tab node.js
```sh
code ./package.json
```
:::

::: tip
Alternatively, you can locate and open the file from the EXPLORER window on the left of Codespaces. You can find the path to the file in the command above.
:::

2. Review the EventStoreDB client packages listed as dependencies:

::: tabs#dev-language-platform

@tab Select >

@tab Python
```
esdbclient==1.0.19
```

@tab Java
```xml
<dependency>
   <groupId>com.eventstore</groupId>
   <artifactId>db-client-java</artifactId>
   <version>5.3.2</version>
</dependency>
```

@tab .NET
```xml
<ItemGroup>
   <PackageReference Include="EventStore.Client.Grpc.Streams" Version="23.1.0" />
</ItemGroup>
```
   
@tab node.js
```json
"dependencies": {
   "@eventstore/db-client": "^6.1.0"
}
```
:::


::: note
The version of the EventStoreDB client above may be outdated. For more information about the client, [click here](@clients/grpc/getting-started.md).
:::

:::: info
To view the source code in GitHub, click the link below:

::: tabs#dev-language-platform
@tab Select >

@tab Python

[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Python-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Python)


@tab Java
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Java-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Java)

@tab .NET
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20.NET-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Dotnet)

@tab node.js
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Node.js-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Nodejs)
:::

::::

:::::

## Step 5: Append an Event to EventStoreDB

1. In Codespaces, run this command to execute the sample. This appends an event to EventStoreDB:

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

2. You should see a confirmation for the event append, similar to this:

```
************************
🎉 Congratulations, you have written an event!
Stream: SampleStream
Event Type: SampleEventType
Event Body: {"id":"1","importantData":"some value"}
************************"
```

::::: details (Optional) Learn more about the sample code

#### Understanding How the Append Sample Works

To deepen your understanding of how events are appended to EventStoreDB programmatically, you will explore the sample code used in this step. 

The sample code demonstrates:

- **Establishing a Connection**: Connect to EventStoreDB using the client library.
- **Creating an Event**: Create a new event with a specific type and data payload.
- **Appending the Event to a Stream**: Append the new event to a specific stream.

To see how this works, follow these steps:

1. Run the following command to open sample code:
   
::: tabs#dev-language-platform
@tab Select >

@tab Python
```sh
code ./sample_append.py
```

@tab Java
```sh
code ./src/main/java/com/eventstoredb_demo/SampleWrite.java
```

@tab .NET
```sh
code ./SampleAppend/Program.cs
```

@tab node.js
```sh
code ./sample_append.js
```
:::

::: tip
Alternatively, you can locate and open the file from the EXPLORER window on the left of Codespaces. You can find the path to the file in the command above.
:::

2. In step 1 of the code, review how the client connects to EventStoreDB:

::: tabs#dev-language-platform
@tab Select >

@tab Python
```python
# Create an instance of EventStoreDBClient, connecting to the EventStoreDB at localhost without TLS
client = EventStoreDBClient(uri="esdb://localhost:2113?tls=false")  
```

@tab Java
```java
// configure the settings to connect to EventStoreDB locally without TLS
EventStoreDBClientSettings settings = EventStoreDBConnectionString.
   parseOrThrow("esdb://localhost:2113?tls=false");

// apply the settings and create an instance of the client
EventStoreDBClient client = EventStoreDBClient.create(settings); 
```

@tab .NET
```c#
// Create an instance of EventStoreDBClient, connecting to the EventStoreDB at localhost without TLS
var settings = EventStoreClientSettings.Create("esdb://localhost:2113?tls=false");
await using var client = new EventStoreClient(settings);
```

@tab node.js
```js
// Create an instance of EventStoreDBClient, connecting to the EventStoreDB at localhost without TLS
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");
```
:::

3. In step 2 of the code, review how a new event is initiated:

::: tabs#dev-language-platform
@tab Select >

@tab Python
```python
event_type = "SampleEventType"                        # Define the event type for the new event
new_event = NewEvent(                                 # Create a new event with a type and body
    type=event_type,                                  # Specify the event type
    data=b'{"id":"1", "importantData":"some value"}'  # Specify the event data body as a JSON in byte format
)
```

@tab Java
```java
// Build the EventStoreDB event data structure
String eventType = "SampleEventType";                                  // Define the name of the event type for the new event
byte[] eventBody = "{\"id\":\"1\", \"importantData\":\"some value\"}"  // Define the body of the event in a UTF8 encoded byte array
      .getBytes(StandardCharsets.UTF_8);

EventData eventData = 
      EventData.builderAsJson(eventType, eventBody)                    // Create the new event object with the type and body
               .build();
```

@tab .NET
```c#
var eventType = "SampleEventType";                           // Define the event type for the new event
var eventData = new EventData(                               // Create a new event with a type and body
    Uuid.NewUuid(),                                          // Specify a new UUID for the event
    eventType,                                               // Specify the event type
    @"{""id"": ""1"", ""importantData"": ""some value""}"u8  // Specify the event data body as JSON encoded with UTF8
        .ToArray()                                           // Convert the body into a byte array
);
```

@tab node.js
```js
const eventType = "SampleEventType"            // Define the event type for the new event     
const event = jsonEvent({                      // Create a new event with a type and body           
   type: eventType,                            // Specify the event type             
   data: {                                     //                
      "id":"1", "importantData":"some value"   // Specify the event data body                           
   },
});
```
:::

4. In step 3 of the code, review how the client appends the new event to EventStoreDB:

::: tabs#dev-language-platform
@tab Select >

@tab Python
```python
event_stream = "SampleStream"        # Define the stream name where the event will be appended
client.append_to_stream(             # Append the event to a stream
    event_stream,                    # Name of the stream to append the event to
    events=[new_event],              # The event to append (in a list)
    current_version=StreamState.ANY  # Set to append regardless of the current stream state (you can ignore this for now)
)
```

@tab Java
```java
// Set append option to append regardless of what revision the stream is at (i.e. disable concurrency check)
AppendToStreamOptions options = AppendToStreamOptions.get().expectedRevision(ExpectedRevision.any());

// Append event to stream
String eventStream = "SampleStream";
client.appendToStream(eventStream, options, eventData).get();
```

@tab .NET
```c#
var eventStream = "SampleStream";  // Define the stream name where the event will be appended
await client.AppendToStreamAsync(  // Append the event to a stream
    eventStream,                   // Name of the stream to append the event to       
    StreamState.Any,               // Set to append regardless of the current stream state (you can ignore this for now)        
    [eventData]                    // The event to append (in a list)
);
```

@tab node.js
```js
const eventStream = "SampleStream";
await client.appendToStream(eventStream, event);  // append the event to the stream
```
:::

5. Feel free to modify and re-run the sample in your Codespace.

::: info
To learn more about other EventStoreDB client functions, [click here](@clients/grpc/getting-started.md).
:::

:::: info
To view the source code in GitHub, click the link below:

::: tabs#dev-language-platform
@tab Select >

@tab Python

[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Python-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Python)


@tab Java
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Java-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Java)

@tab .NET
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20.NET-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Dotnet)

@tab node.js
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Node.js-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Nodejs)
:::

::::

:::::

## Step 6: Verify the Appended Event in the Admin UI

1. In the Admin UI, click the `Stream Browser` link from the top navigation bar.

2. Under `Recently Changed Streams`, click `SampleStream` link.

3. Click on the `JSON` link in the rightmost column of the table. 
   
4. You should see the content of the appended event.

## Step 7: Read the Event from EventStoreDB Programmatically

1. In Codespaces, run this command to execute the sample. This reads the event from EventStoreDB:

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

2. You should see the content of the appended event similar to this:

```
************************
You have read an event!
Stream: SampleStream
Event Type: SampleEventType
Event Body: {"id":"1","importantData":"some value"}
************************"
```

::::: details (Optional) Learn more about the sample code

#### Understanding How the Read Sample Works

You will explore the sample code used in this step to further understand how events are read from EventStoreDB programmatically. 
The sample code demonstrates the following:
- **Establishing a Connection**: Illustrates how to connect to EventStoreDB using the client library.
- **Reading Events from a Stream**: Reads events from a specific stream.
- **Processing Retrieved Events**: Iterates over the events retrieved from the stream.
- **Deserializing Event Data**: Extracts and deserializes the event data from the retrieved events.
- **Displaying Event Information**: Prints out the event details—such as the stream name, event type, and event body—to the console.

1. Run the following command to open sample code:

::: tabs#dev-language-platform
@tab Select >

@tab Python
```sh
code ./sample_read.py
```

@tab Java
```sh
code ./src/main/java/com/eventstoredb_demo/SampleRead.java
```

@tab .NET
```sh
code ./SampleRead/Program.cs
```

@tab node.js
```sh
code ./sample_read.js
```
:::

::: tip
Alternatively, you can locate and open the file from the EXPLORER window on the left of Codespaces. You can find the path to the file in the command above.
:::


2. In step 1 of the code, review how the client connects to EventStoreDB:

::: tabs#dev-language-platform
@tab Select >

@tab Python
```python
# Create an instance of EventStoreDBClient, connecting to the EventStoreDB at localhost without TLS
client = EventStoreDBClient(uri="esdb://localhost:2113?tls=false")  
```

@tab Java
```java
// configure the settings to connect to EventStoreDB locally without TLS
EventStoreDBClientSettings settings = EventStoreDBConnectionString.
   parseOrThrow("esdb://localhost:2113?tls=false");

// apply the settings and create an instance of the client
EventStoreDBClient client = EventStoreDBClient.create(settings); 
```

@tab .NET
```c#
// Create an instance of EventStoreDBClient, connecting to the EventStoreDB at localhost without TLS
var settings = EventStoreClientSettings.Create("esdb://localhost:2113?tls=false");
await using var client = new EventStoreClient(settings);
```

@tab node.js
```js
// Create an instance of EventStoreDBClient, connecting to the EventStoreDB at localhost without TLS
const client = EventStoreDBClient.connectionString("esdb://localhost:2113?tls=false");
```
:::

3. In step 2 of the code, review how the client reads all the events from the stream:

::: tabs#dev-language-platform
@tab Select >

@tab Python
```python
events = client.get_stream("SampleStream")  # Read all events from SampleStream
```

@tab Java
```java
ReadStreamOptions options =       
   ReadStreamOptions.get()  // Create a read option for client to read events
      .forwards()           // Client should read events forward in time
      .fromStart()          // Client should read from the start of stream
      .maxCount(10);        // Client should read at most 10 events

// get events from stream
String eventStream = "SampleStream";
ReadResult result = client.readStream(eventStream, options).get();
```

@tab .NET
```c#
var events = client.ReadStreamAsync(  // Read events from stream
   Direction.Forwards,                // Read events forward in time
   "SampleStream",                    // Name of stream to read from
   StreamPosition.Start               // Read from the start of the stream
);
```

@tab node.js
```js
// Read events from the SampleStream
const stream_name = "SampleStream";    // Define the name of the stream to read from
let events = client.readStream(        // Read events from stream
   stream_name,                        // Specify the stream name
   {                                   //
      fromRevision: START,             // Read from the start of the stream
      direction: FORWARDS,             // Read events forward in time
      maxCount: 20                     // Read at most 20 events
   }
);
```
:::

4. In step 3 of the code, review how the events are deserialized and printed:

::: tabs#dev-language-platform
@tab Select >

@tab Python
```python
for event in events:                             # For each event
   print("************************");            #
   print("You have read an event!");             #
   print("Stream: " + event.stream_name);        # Print the stream name of the event
   print("Event Type: " + event.type);           # Print the type of the event
   print("Event Body: " + event.data.decode());  # Print the body of the event after converting it to string from a byte array
   print("************************");
```

@tab Java
```java

for (ResolvedEvent resolvedEvent : result.getEvents()) {                          // For each event in stream
   RecordedEvent recordedEvent = resolvedEvent.getOriginalEvent();                // Get the original event (can ignore for now)
                                                                                  //
   System.out.println("************************");                                //
   System.out.println("You have read an event!");                                 //
   System.out.println("Stream: " + recordedEvent.getStreamId());                  // Print the stream name of the event
   System.out.println("Event Type: " + recordedEvent.getEventType());             // Print the type of the event 
   System.out.println("Event Body: " + new String(recordedEvent.getEventData(),   // Print the body of the event after converting it from a byte array
                                                   StandardCharsets.UTF_8));      // UTF8 is used to convert byte array to string
   System.out.println("************************");
}
```

@tab .NET
```c#
await foreach (var evt in events) {                                    // For each event in stream
   Console.WriteLine("************************");                      //
   Console.WriteLine("You have read an event!");                       //
   Console.WriteLine("Stream: " + evt.Event.EventStreamId);            // Print the stream name of the event
   Console.WriteLine("Event Type: " + evt.Event.EventType);            // Print the type of the event
   Console.WriteLine("Event Body: " + Encoding.UTF8.GetString(         // Print the body of the event. convert the byte array to string
                                          evt.Event.Data.ToArray()));  // Gets the event body as a byte array
   Console.WriteLine("************************");
}
```

@tab node.js
```js
for await (const resolvedEvent of events) {                                  // For each event found in SampleStream               
   console.log("************************");                                  //
   console.log("You have read an event!");                                   //
   console.log("Stream: " + resolvedEvent.event?.streamId);                  // Print the stream name of the event 
   console.log("Event Type: " + resolvedEvent.event?.type);                  // Print the type of the event
   console.log("Event Body: " + JSON.stringify(resolvedEvent.event?.data));  // Print the body of the event as a string
   console.log("************************");
}
```
:::

5. Feel free to modify and re-run the sample in your Codespace.

::: info
To learn more about other EventStoreDB client functions, [click here](@clients/grpc/getting-started.md).
:::

:::: info
To view the source code in Github, click the link below:

::: tabs#dev-language-platform
@tab Select >

@tab Python

[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Python-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Python)


@tab Java
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Java-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Java)

@tab .NET
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20.NET-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Dotnet)

@tab node.js
[![](https://img.shields.io/badge/GitHub-EventStoreDB%20From%20Scratch%20Node.js-blue?logo=github)](https://github.com/EventStore/EventStoreDB-From-Scratch-Nodejs)
:::

::::

:::::

## Summary

In this quickstart, you:

1. Started the EventStoreDB server.
2. Navigated to the Admin UI.
3. Appended an event to EventStoreDB.
4. Verified the event in the Admin UI.
5. Read the event from EventStoreDB programmatically.

Feel free to experiment further by appending more events, reading them, or even exploring advanced features of EventStoreDB!

## Next Steps

Now that you've completed the quickstart, you may want to explore the following:

- [EventStoreDB "From Scratch" Series](https://academy.eventstore.com/from-scratch): Find more explanations about the scripts and samples used in this quickstart along with other beginner tutorials.

- [Install EventStoreDB locally](@server/quick-start/installation.md): Learn how to install EventStoreDB on your local machine for deeper exploration and integration with your projects.

- [EventStoreDB Client SDK Documentation](@clients/grpc/getting-started.md): Understand how to interact with EventStoreDB programmatically with EventStoreDB clients.

- [EventStoreDB Server Configuration Documentation](@server/configuration/README.md): Explore how to configure EventStoreDB for your environment.

- [Event Store Cloud](https://www.eventstore.com/event-store-cloud): Run EventStoreDB from the fully managed environment without the need to host it yourself.

- [EventStoreDB Samples](https://github.com/EventStore/samples/tree/main): Experiment with different SDKs to interact with EventStoreDB using various programming languages.
