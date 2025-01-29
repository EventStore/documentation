---
title: HTTP Sink
order: 3
---
## **Tutorial: Setting up and using an HTTP Sink in EventStoreDB**

Connectors make it easy to integrate EventStoreDB data into other systems. Each connector runs on the server-side and uses a catch-up subscription to receive events, filter or transform them, and push them to an external system via a sink.

This step-by-step tutorial guides you through setting up a connector using the **HTTP Sink** in EventStoreDB. This feature allows EventStoreDB to push event data to an http endpoint.

The following are the available sinks:

1. Kafka Sink
2. MongoDB Sink
3. RabbitMQ Sink
4. HTTP Sink
5. Logger Sink
6. Serilog Sink

#### **Prerequisites**

* [EventStoreDB 24.10 LTS installed and running.](https://developers.eventstore.com/server/v24.10/quick-start/installation.html)   

### **Step 1: Set up an HTTP endpoint**

In this example, you will use PostBin to create an HTTP endpoint that will consume the events from EventStoreDB. The following steps outline the process to generate a unique PostBin URL to collect (GET, POST, PUT, PATCH, DELETE, etc.) requests from EventStoreDB.

#### **Step 1.1: Create an HTTP bin at postb.in**

1. Navigate to https://www.postb.in/ and click **Create Bin**
2. Copy the bin URL

   After clicking create bin you will be directed to a page with the endpoint urls for curl, wget, and echo. Copy the bin url for curl

   Note: If you are testing with an endpoint from your custom application, ensure no CORS issues prevent the data from being transmitted from EventStoreDB.

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

#### **Step 2.3: Replace the value for “Url” with the curl URL you copied from Postb.in**

The following section outlines the important file contents.

1. http://localhost:2113/connectors/test-app

   This URL provides a **unique name identifier** for the connector ("test-app" in this case)
   
2. "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
   
   The instance type name provides the type of connector sink (HttpSink in this case). 
      
3. "Url": "https://www.postb.in/1736471171412-2404703341890"
   
   The Url provides the HTTP URL endpoint where the EventStoreDB will send the data.
   
4. "Subscription:Filter:Scope": "Stream",
"Subscription:Filter:Expression": "order-.*?"

   The “Filter” entries filter the results for streams starting with "order-".

#### **Step 2.4: Run the `create_connector.sh` script**

After running the script and creating the connector, you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 18:20:43 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 3: Check the connector status**

Now that you’ve created a connector, you can check its status and settings. This process is useful for troubleshooting purposes.  

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

#### **Step 3.3: Run the `status.sh` script**

After running the script you will receive the setting details for the connector that you added in a previous step. Check to see that the details you entered are listed. The "state" field will also indicate whether the connector is stopped or running. You have not started the connector, so the state should be "CONNECTOR_STATE_STOPPED".

### **Step 4: Start the connector**

Start the connector by sending a `POST` request to `connectors/{connector_id}/start`, where `{connector_id}` is the unique identifier of the connector (in this case, test-app).

#### **Step 4.1: Create a file named `start_connector.sh`**

#### **Step 4.2: Add the following content to the file**

@tab Bash
```bash
#!/bin/bash

curl -i -X POST http://localhost:2113/connectors/test-app/start
```

#### **Step 4.3: Run the `start_connector.sh` script**

After running the script and starting the connector, you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 18:37:06 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 5: Add events in EventStoreDB**

You will now add events to EventStoreDB and a transmit them through the HTTP sink connector to the endpoint.

#### **Step 5.1: Add events in EventStoreDB**

1. Navigate to the EventStoreDB admin interface (located at localhost:2113)
2. Click on Stream Browser → Add Event
3. Use order-123 as the stream id.  Remember that you provided a "order-" filter in the connector settings to filter for order- streams in an earlier step. The event type can be anything, such as itemShipped
4. Now add some data such as {"count":"5"} and click Add at the bottom of the page

### **Step 6: Verify data was sent to the endpoint**

Check that the newly created EventStoreDB data has been transmitted to the connector endpoint.

#### **Step 6.1: Navigate to the bin url (example: https://www.postb.in/b/1737399256387-4331883823033)**

This is the bin url you copied at the beginning of the tutorial after creating the bin at postb.in. Please note that you’ll need to add b/ before the bin id number as illustrated in the example above. If you receive a 404 error, it could mean that your http endpoint has expired. Each bin expires after 30 minutes. If that is the case, create another bin and follow the steps to create and start another connector (with the new bin http endpoint and a new unique identifier), then continue to the next step.

#### **Step 6.2: Scroll to the bottom of the page. If the data was transmitted successfully through the connector to the endpoint you should see the details of the message.**

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

### **Step 8: Reconfigure the connector**

Reconfigure an existing connector by sending a `PUT` request to `/connectors/{connector_id}/settings`, where `{connector_id}` is the unique identifier used when the connector was created. This endpoint allows you to modify the settings of a connector without having to delete and recreate it.

#### **Step 8.1: Create a file name `reconfigure_connector.sh`**
#### **Step 8.2: Add the following content to the file**

@tab Bash
```bash
#!/bin/bash

curl -i -X PUT \
 http://localhost:2113/connectors/test-app/settings \
 -H "Content-Type: application/json" \
 -u "admin:changeit" \
 -d '{
     "InstanceTypeName": "EventStore.Connectors.Http.HttpSink",
     "Url": "https://www.postb.in/1738100652703-1518676236737",
     "Subscription:Filter:Scope": "Stream",
     "Subscription:Filter:Expression": "order-.*?"
 }'
```

#### **Step 8.3: Create a new bin from Postb.in, copy the curl url and replace the value for “Url” with the curl url you copied from Postb.in**
#### **Step 8.4: Run the `reconfigure_connector.sh` script**

After running the script and reconfiguring the connector you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Tue, 28 Jan 2025 21:51:34 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

#### **Step 8.5: Add events in EventStoreDB**
#### **Step 8.6: Navigate to the bin url for the new bin you created and confirm that the connector has been reconfigured to transmit data to the new bin.**

### **Step 9: Delete the connector**

Delete the connector by sending a `DELETE` request to `connectors/{connector_id}`, where `{connector_id}` is the unique identifier of the connector (in this case test-app).

#### **Step 9.1: Create a file name `delete_connector.sh`**
#### **Step 9.2: Add the following content to the file**

@tab Bash
```bash
#!/bin/bash

curl -i -X DELETE http://localhost:2113/connectors/test-app
```

#### **Step 9.3: Run the `delete_connector.sh` script**

After running the script and deleting the connector you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 19:13:42 GMT
Server: Kestrel
Transfer-Encoding: chunked
```
