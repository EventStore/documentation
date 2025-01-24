---
title: HTTP Connector
order: 3
---
## **Tutorial: Setting up and using an HTTP Connector in EventStoreDB**

This step-by-step tutorial guides you through setting up and using an **HTTP Connector in EventStoreDB**. This feature allows EventStoreDB to push event data into an http endpoint.

#### **Prerequisites**

* [EventStoreDB 24.10 LTS installed and running.](https://developers.eventstore.com/server/v24.10/quick-start/installation.html)   

### **Step 1: Set up an HTTP endpoint**

Ensure you have an **HTTP endpoint** that can receive messages. In this example we will create an HTTP endpoint using a service named PostBin to receive the messages. 

#### **Step 1.1: Create an HTTP bin at postb.in**

1. Navigate to https://www.postb.in/ and click **create bin**

   PostBin is used to collect **(GET, POST, PUT, PATCH, DELETE, etc)** requests to a URL. We are using it to create an HTTP endpoint to send EventStoreDB data. 

2. Copy the bin url

   After clicking create bin you will be directed to a page with the endpoint urls for curl, wget, and echo. Copy the bin url for curl

Note: If testing with an endpoint from your own custom application, make sure there are no issues with CORS preventing the data transmission from EventStoreDB.

### **Step 2: Create the connector**

Create a connector by sending a POST request to `connectors/{connector_id}`, where `{connector_id}` is a unique identifier of your choice for the connector.

#### **Step 2.1: Create a file named `create_connector.sh`**
#### **Step 2.2: Add the following content to the file**

@tab Bash
```bash
#!/bin/bash

curl -i -X POST \
 http://localhost:2113/connectors/test-app \
 -H "Content-Type: application/json" \
 -u "admin:changeit" \
 -d '{
   "settings": {
     "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
     "Url": "https://www.postb.in/1736471171412-2404703341890",
     "Subscription:Filter:Scope": "Stream",
     "Subscription:Filter:Expression": "order-.*?"
   }
 }'
```

#### **Step 2.3: Replace the value for “Url” with the curl url you copied from Postb.in**

Below discusses the important contents of the file.

1. http://localhost:2113/connectors/test-app

   This provides a **unique name identifier** for the connector (**test-app** in this case)
   
2. "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
   
   This provides the type of connector sink (HTTP in this case). Connectors make it easy to integrate EventStoreDB data into other systems. Each connector runs on the server-side and uses a catch-up subscription to receive events, filter or transform them, and push them to an external system via a sink. The available sinks are listed below:
   
   1. Kafka Sink
   2. MongoDB Sink
   3. RabbitMQ Sink
   4. HTTP Sink
   5. Logger Sink
   6. Serilog Sink
      
3. "Url": "https://www.postb.in/1736471171412-2404703341890"
   
   This provides the HTTP url endpoint where data will be sent.
4. Subscription:Filter:Scope": "Stream",
"Subscription:Filter:Expression": "order-.*?"

   This filters the results for streams starting with order-

#### **Step 2.4: Run the create_connector.sh script**

After running the script and creating the connector you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 18:20:43 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 3: Check the connector status (optional)**
### **Step 4: Start the connector**
### **Step 5: Add events in EventStoreDB**
### **Step 6: Verify data was sent to the endpoint**
### **Step 7: Stop the connector**
### **Step 8: Delete the connector**
