---
title: HTTP Sink
order: 3
---
## **Tutorial: Setting up and using an HTTP Sink in EventStoreDB**

Connectors simplify the integration of EventStoreDB data into other systems. Each connector runs on the server-side and uses a catch-up subscription to receive events, filter or transform them, and push them to an external system via a sink.

The following are the available Event Store sinks:

1. [Kafka Sink](https://developers.eventstore.com/server/v24.10/features/connectors/sinks/kafka.html)
2. [MongoDB Sink](https://developers.eventstore.com/server/v24.10/features/connectors/sinks/mongo.html)
3. [RabbitMQ Sink](https://developers.eventstore.com/server/v24.10/features/connectors/sinks/rabbitmq.html)
4. [HTTP Sink](https://developers.eventstore.com/server/v24.10/features/connectors/sinks/http.html)
5. [Logger Sink](https://developers.eventstore.com/server/v24.10/features/connectors/sinks/logger.html)
6. [Serilog Sink](https://developers.eventstore.com/server/v24.10/features/connectors/sinks/serilog.html)

This step-by-step tutorial guides you through setting up a connector using the **HTTP Sink** in EventStoreDB. This feature allows EventStoreDB to push event data to an http endpoint.

#### **Prerequisites**

* [EventStoreDB 24.10 LTS installed and running.](https://developers.eventstore.com/server/v24.10/quick-start/installation.html)   

### **Step 1: Set up an HTTP endpoint using PostBin**

In this tutorial, you will use PostBin to create an HTTP endpoint that consumes events from EventStoreDB. PostBin supports creating a unique URL to collect requests from EventStoreDB (GET, POST, PUT, PATCH, DELETE, etc.).

**1.1** Navigate to [https://www.postb.in](https://www.postb.in) and click **Create Bin**.

**1.2** You will be directed to a page with the endpoint URLs for curl, wget, and echo. Copy the bin URL for curl.

   *Note: If you are testing with an endpoint from your custom application, ensure no Cross-Origin Resource Sharing (CORS) issues prevent the data from being transmitted from EventStoreDB.*

### **Step 2: Create the connector**

Create a connector by sending a POST request to `connectors/{connector_id}`, where `{connector_id}` is a unique identifier of your choice for the connector.

 **2.1:** Create a file named `create_connector.sh`.
 
 **2.2:** Add the following content to the file.  *Ensure you **replace the value for “Url”** with the curl URL you copied from Postb.in.*

::: tabs
@tab Bash
```bash
#!/bin/bash

curl -i -X POST \
 http://localhost:2113/connectors/test-app \
 -H "Content-Type: application/json" \
 -u "admin:changeit" \
 -d '{
   "settings": {
     "InstanceTypeName": "http-sink",
     "Url": "https://www.postb.in/1736471171412-2404703341890",
     "Subscription:Filter:Expression": "order-.*?"
   }
 }'
```
:::

The following section provides additional information about the file contents:

* `http://localhost:2113/connectors/test-app` provides a **unique name identifier** for the connector ("test-app" in this case).
   
* `"InstanceTypeName": "http-sink"` provides the type of connector sink (Http Sink in this case). 
      
* `"Url": "https://www.postb.in/1736471171412-2404703341890"` provides the HTTP URL endpoint to which the EventStoreDB will send the data.
   
* `"Subscription:Filter:Expression": "order-.*?"` filters the results for streams starting with "order-".

**2.3:** Run the `create_connector.sh` script.  After running the script and creating the connector, you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 18:20:43 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 3: Check the connector status**

Now that you’ve created a connector, you can check its status and settings. This process is helpful when troubleshooting.  

**3.1:** Create a file named `status.sh`.

**3.2:** Add the following content to the file:

::: tabs
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
:::

**3.3:** Run the `status.sh` script.

After running the script, you will receive the setting details for the connector added in **Step 2**. Check to see that the details you entered are listed. The "state" field will also indicate whether the connector is stopped or running. Since you have not started the connector, the state should be "CONNECTOR_STATE_STOPPED".

### **Step 4: Start the connector**

Start the connector by sending a `POST` request to `connectors/{connector_id}/start`, where `{connector_id}` is the unique identifier of the connector (in this case, test-app).

**4.1:** Create a file named `start_connector.sh`.

**4.2:** Add the following content to the file:

::: tabs
@tab Bash
```bash
#!/bin/bash

curl -i -X POST http://localhost:2113/connectors/test-app/start
```
:::

**4.3:** Run the `start_connector.sh` script.

After running the script and starting the connector, you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 18:37:06 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 5: Add events in EventStoreDB**

You will now add events to EventStoreDB and transmit them to the endpoint through the HTTP sink connector.

**5.1:** Navigate to the EventStoreDB UI (located at localhost:2113).

**5.2:** Click on Stream Browser → Add Event.

**5.3:** Use order-123 as the stream id.  Remember that you provided an "order-" filter in the connector settings to filter for order- streams in an earlier step. The event type can be anything, such as itemShipped.

**5.4:** Add some data such as {"count":"5"} and click Add at the bottom of the page.

### **Step 6: Verify data was sent to the endpoint**

Check that the newly created EventStoreDB data has been transmitted to the connector endpoint.

**6.1:** Navigate to the bin URL (example: https://www.postb.in/b/1737399256387-4331883823033).

This is the bin URL you copied at the beginning of the tutorial after creating the bin at postb.in. Please note that you’ll need to add b/ before the unique bin id number, as illustrated in the example URL above. 

If you receive a 404 error, it could mean that your http endpoint has expired. Each bin expires after 30 minutes. If that is the case, create another bin and follow the steps to create and start another connector (with the new bin http endpoint and a new unique identifier), then continue to the next step.

**6.2:** Scroll to the bottom of the page. If the data was transmitted successfully through the connector to the endpoint, you should see the details of the message.

### **Step 7: Stop the connector**

Stop the connector by sending a `POST` request to `connectors/{connector_id}/stop`, where `{connector_id}` is the unique identifier of the connector (in this case, test-app).

**7.1:** Create a file name `stop_connector.sh`.

**7.2:** Add the following content to the file:

::: tabs
@tab Bash
```bash
#!/bin/bash

curl -i -X POST http://localhost:2113/connectors/test-app3/stop
```
:::

**7.3:** Run the `stop_connector.sh` script.

After running the script and stopping the connector, you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 19:11:38 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Step 8: Reconfigure the connector**

Reconfigure an existing connector by sending a `PUT` request to `/connectors/{connector_id}/settings`, where `{connector_id}` is the unique identifier used when the connector was created. This endpoint allows you to modify the settings of a connector without having to delete and recreate it.

**8.1:** Create a file name `reconfigure_connector.sh`.

**8.2:** Add the following content to the file:

::: tabs
@tab Bash
```bash
#!/bin/bash

curl -i -X PUT \
 http://localhost:2113/connectors/test-app/settings \
 -H "Content-Type: application/json" \
 -u "admin:changeit" \
 -d '{
     "Url": "https://www.postb.in/1738100652703-1518676236737"
 }'
```
:::

**8.3:** Create a new bin from Postb.in, copy the curl URL, and replace the value for “Url” with the curl URL you copied from Postb.in.

**8.4:** Run the `reconfigure_connector.sh` script.

After running the script and reconfiguring the connector, you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Tue, 28 Jan 2025 21:51:34 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

**8.5:** Add events in EventStoreDB.

**8.6:** Navigate to the bin URL for the new bin you created. Confirm the connector has been reconfigured to transmit data to the latest bin.

### **Step 9: Delete the connector**

Delete the connector by sending a `DELETE` request to `connectors/{connector_id}`, where `{connector_id}` is the unique identifier of the connector (in this case, test-app).

**9.1:** Create a file name `delete_connector.sh`.

**9.2:** Add the following content to the file:

::: tabs
@tab Bash
```bash
#!/bin/bash

curl -i -X DELETE http://localhost:2113/connectors/test-app
```
:::

**9.3:** Run the `delete_connector.sh` script.

After running the script and deleting the connector, you should receive an HTTP 200 OK message similar to the one below:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Mon, 20 Jan 2025 19:13:42 GMT
Server: Kestrel
Transfer-Encoding: chunked
```

### **Summary**

By following this tutorial, you have successfully: 

* Configured a connector using the **HTTP Sink** in EventStoreDB to push event data to an http endpoint.
* Checked the connector status.
* Started the connector.
* Verified that data was successfully sent to the http endpoint.
* Stopped the connector.
* Reconfigured the connector.
* Deleted the connector.
