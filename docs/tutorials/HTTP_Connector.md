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
   
   1. Kafka
   2. MongoDB
   3. RabbitMQ
   4. HTTP
   5. Logger
   6. Serilog
      
3. "Url": "https://www.postb.in/1736471171412-2404703341890"
   
   This provides the HTTP url endpoint where data will be sent.
   
4. "Subscription:Filter:Scope": "Stream",
"Subscription:Filter:Expression": "order-.*?"

   This filters the results for streams starting with order-

#### **Step 2.4: Run the `create_connector.sh` script**

After running the script and creating the connector you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 18:20:43 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 3: Check the connector status (optional)**

Now that you’ve created a connector you can check the status of the connector and its settings. This is useful for troubleshooting purposes. 

#### **Step 3.1: Create a file named `status.sh`**

#### **Step 3.2: Add the following content to the file**

@tab Bash
```bash
#!/bin/bash

JSON=$(cat <<EOF
{
 "includeSettings": true,
 "paging": {
     "page": 1,
     "pageSize": 100
 }
}
EOF
)

curl -X GET \
 -H "Content-Type: application/json" \
 -d "$JSON" \
 http://localhost:2113/connectors
```

#### **Step 3.2: Run the `status.sh` script**

After running the script you will receive the setting details of the connector that you added in a previous step. Check to see that the details you entered are listed. There is also a “state” field that will mention if the connector is stopped or running. For now, we haven’t yet started the connector so the state should be “CONNECTOR_STATE_STOPPED”.

### **Step 4: Start the connector**

Start the connector by sending a `POST` request to `connectors/{connector_id}/start`, where `{connector_id}` is the unique identifier of the connector (in this case test-app).

#### **Step 4.1: Create a file named `start_connector.sh`**

#### **Step 4.2: Add the following content to the file**

@tab Bash
```bash
#!/bin/bash

curl -i -X POST http://localhost:2113/connectors/test-app/start
```

#### **Step 4.3: Run the `start_connector.sh` script**

After running the script and starting the connector you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 18:37:06 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 5: Add events in EventStoreDB**

Now we will head over to EventStoreDB and add events to have them transmitted through the connector to the endpoint.

#### **Step 5.1: Add events in EventStoreDB**

1. Navigate to the EventStoreDB admin interface (located at localhost:2113)
2. Click on Stream Browser → Add Event
3. In this case the stream id should start with order- since we provided a filter in the connector settings to filter for order- streams. Put in order-123 as the stream id.
4. The event type can be anything such as itemShipped
5. Now add some data such as {“count”:”5”} and click Add at the bottom

### **Step 6: Verify data was sent to the endpoint**

Let’s check that the newly created EventStoredb data has been transmitted to the connector endpoint.

#### **Step 6.1: Navigate to the bin url (example: https://www.postb.in/b/1737399256387-4331883823033)**

The bin url is the url you copied in the beginning of the tutorial after creating the bin at postb.in. Please note that you’ll need to add b/ before the bin id number as in the example above. If you get a 404 error it could mean that your http endpoint has expired. Each bin expires after 30 minutes. If that is the case just create another bin and follow the steps to create and start another connector (with the new bin http endpoint and a new unique identifier) then continue on with the next step.

#### **Step 6.2: Scroll to the bottom of the page. If the data was transmitted successfully through the connector to the endpoint you should see the details of the message. Below is an example:**

### **Step 7: Stop the connector**

Stop the connector by sending a `POST` request to `connectors/{connector_id}/stop`, where `{connector_id}` is the unique identifier of the connector (in this case test-app).

#### **Step 7.1: Create a file name `stop_connector.sh`**

#### **Step 7.2: Add the following content to the file**

@tab Bash
```bash
#!/bin/bash

curl -i -X POST http://localhost:2113/connectors/test-app3/stop
```

#### **Step 7.3: Run the `stop_connector.sh` script**
After running the script and stopping the connector you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 19:11:38 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 8: Delete the connector**

Delete the connector by sending a `DELETE` request to `connectors/{connector_id}`, where `{connector_id}` is the unique identifier of the connector (in this case test-app).

#### **Step 8.1: Create a file name `delete_connector.sh`**
#### **Step 8.2: Add the following content to the file**

@tab Bash
```bash
#!/bin/bash

curl -i -X DELETE http://localhost:2113/connectors/test-app
```

#### **Step 8.3: Run the `delete_connector.sh` script**

After running the script and deleting the connector you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 19:13:42 GMT
Server: Kestrel
Transfer-Encoding: chunked
```
