---
title: MongoDB Sink
order: 5
---

## Tutorial: Setting up and using a MongoDB Sink connector in KurrentDB

This step-by-step tutorial guides you through configuring and deploying a **MongoDB Sink** connector in KurrentDB. This connector enables seamless event streaming from KurrentDB to a MongoDB collection, facilitating real-time data integration and storage.

#### Prerequisites:

* A KurrentDB cluster with an active license key.  
* A MongoDB instance (self-hosted or cloud-based).  
* MongoDB connection details (e.g., URI, database name, collection name).  
* Basic command-line knowledge (e.g., using `curl` for API requests).  
* Access to KurrentDB UI and MongoDB tools (e.g., MongoDB Compass, `mongosh`).


### Step 1: Configure the MongoDB Sink connector

To enable event streaming from KurrentDB to a MongoDB collection, you must configure the MongoDB Sink connector.

#### Step 1.1: Create the configuration file

Create a new file named `mongodb-sink-config.json` with the following content:

```json
{
  "settings": {
    "instanceTypeName": "mongodb-sink",
    "subscription:filter:scope": "stream",
    "subscription:filter:filterType": "prefix",
    "subscription:filter:expression": "LoanRequest",
    "database": "your-database-name",
    "collection": "your-collection-name",
    "connectionString": "your-mongodb-connection-string",
    "documentId:source": "recordId",
    "batching:batchSize": 1000,
    "batching:batchTimeoutMs": 250
  }
}
```

::: note
Replace the placeholders:

* `"your-database-name"` → Your MongoDB database name.  
* `"your-collection-name"` → The target MongoDB collection.  
* `"your-mongodb-connection-string"` → Your MongoDB connection URI.
:::

#### Step 1.2: Deploy the MongoDB Sink connector

Create the MongoDB Sink connector instance in KurrentDB by sending a `POST` request to the KurrentDB API with the following `curl` command:

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-H "content-type: application/json" -d '@mongodb-sink-config.json' `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/mongodb-sink-quickstart  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-H "content-type: application/json" -d '@mongodb-sink-config.json' \
-X POST https://your-kurrentdb-cluster-url:2113/connectors/mongodb-sink-quickstart  
```
:::

::: note
Replace `admin:password` with your KurrentDB credentials and `your-kurrentdb-cluster-url` with the actual KurrentDB cluster URL. Do this in all following code snippets in this tutorial that contain `admin:password` and `your-kurrentdb-cluster-url`.
:::

#### Step 1.3: Verify the connector configuration

Run the following command to check the configuration:

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -u admin:password  `
-X GET https://your-kurrentdb-cluster-url:2113/connectors/mongodb-sink-quickstart/settings  
```
@tab Bash
```bash:no-line-numbers
curl -u admin:password  \ 
-X GET https://your-kurrentdb-cluster-url:2113/connectors/mongodb-sink-quickstart/settings  
```
:::


If successful, you should see a JSON response displaying your MongoDB Sink configuration matching the settings from your configuration file in **Step 1.1**.

### Step 2: Start the MongoDB Sink connector

After configuring the MongoDB Sink connector, you need to start it to begin streaming events from KurrentDB to MongoDB. To do this, send a `POST` request to the KurrentDB API:

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/mongodb-sink-quickstart/start  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-X POST https://your-kurrentdb-cluster-url:2113/connectors/mongodb-sink-quickstart/start  
```
:::


If the MongoDB Sink connector starts successfully, it should return an `HTTP/1.1 200 OK` response, as shown below:

```text:no-line-numbers
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

### Step 3: Append Events to KurrentDB

To test the MongoDB Sink connector, first append some sample events to KurrentDB using the KurrentDB UI with the following steps:

1. Log in to the KurrentDB UI.  
2. Navigate to **Stream Browser**.  
3. Click **Add Event**.  
4. Enter the following details:  
   * **Stream ID**: `LoanRequest-1`  
   * **Event Type**: `LoanRequested`  
   * **Event Body**:  
      ```json
      {
        "Amount": 10000,
        "loanTerm": 12
      }
      ```
5. Click **Add** to append the event to the `LoanRequest-1` stream.  
6. Repeat steps 3–5 to append more events to different streams (e.g., a stream with the **Stream ID** `LoanRequest-2`).

![Append events to LoanRequest streams ](images/kafka-sink-quickstart-add-event.png =300x)


### Step 4: Verify events in MongoDB

Now, you can use MongoDB Compass or CLI to verify that the sample events you appened have been successfully streamed to MongoDB.

1. Access your MongoDB client (e.g., MongoDB Compass, `mongosh`, or a cloud dashboard).  
2. Connect using the same database and collection as defined in the configuration.  
3. Run the query below to check for the streamed events, replacing `"your-collection-name"` with your MongoDB collection:  
   bash  
   `db.your-collection-name.find().pretty()`  
4. If the MongoDB Sink connector is working correctly, you should see the appended events stored in your collection.

### Step 5 (optional): Stop the MongoDB Sink connector

If the MongoDB Sink connector is no longer needed, you can stop it to free up resources. Run the following command to send a `POST` request to the KurrentDB API and stop the connector.

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/mongodb-sink-quickstart/stop  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-X POST https://your-kurrentdb-cluster-url:2113/connectors/mongodb-sink-quickstart/stop  
```
:::


If the MongoDB Sink connector stops successfully, it should return an `HTTP/1.1 200 OK` response, as shown below:

```text:no-line-numbers
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

The MongoDB Sink connector has now stopped processing events, but its configuration remains intact. You can restart it later by following **Step 2** without needing to reconfigure it.

### Summary

By following this tutorial, you should have successfully: 

* Configured and deployed the MongoDB Sink connector in KurrentDB.  
* Streamed events from KurrentDB to a MongoDB collection.  
* Verified event propagation using KurrentDB UI and MongoDB tools.  
* (Optional) Stopped the MongoDB Sink connector when no longer needed.

This setup enables real-time event streaming from KurrentDB to a MongoDB collection, making it easier to build event-driven applications with KurrentDB and MongoDB. 
