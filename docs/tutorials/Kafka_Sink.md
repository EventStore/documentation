---
title: Kafka Sink
order: 4
---

## Tutorial: Setting up and using a Kafka Sink connector in KurrentDB

This step-by-step tutorial guides you through configuring and deploying a **Kafka Sink** connector in KurrentDB to stream events to a Kafka topic hosted on Confluent Cloud. This feature enables seamless event replication from KurrentDB to a Kafka cluster, facilitating real-time data integration and processing.

#### Prerequisites:

* A KurrentDB cluster with an active license key.  
  * This tutorial uses a cluster provisioned on a [Public Network](https://docs.kurrent.io/cloud/dedicated/networking/public-network.html) of [Kurrent Cloud](https://docs.kurrent.io/cloud/introduction.html)  
* A [Confluent Cloud](http://confluent.cloud) Kafka cluster with an API key that can write to a topic (e.g., `loans`).  
* Basic command-line knowledge (e.g., using `curl` for API requests).  
* Access to KurrentDB UI and Confluent Cloud UI to monitor events.


### Step 1: Configure the Kafka Sink connector

The Kafka Sink connector must be configured to define how KurrentDB streams events to Kafka. To do this, you need to create a configuration file that specifies the connection details for the Kafka cluster and the connector instance configuration.

#### 1.1: Create the configuration file

Create a new file named `kafka-sink-config.json` with the following content:

```json
{
  "settings": {
    "instanceTypeName": "kafka-sink",
    "subscription:filter:scope": "stream",
    "subscription:filter:filterType": "prefix",
    "subscription:filter:expression": "LoanRequest",
    "topic": "loans",
    "bootstrapServers": "your-kafka-cluster-url:9092",
    "authentication:username": "your-username",
    "authentication:password": "your-password",
    "authentication:securityProtocol": "SaslSsl",
    "waitForBrokerAck": "true"
  }
}
```

::: note
Replace the placeholders (`your-kafka-cluster-url`, `your-username`, `your-password`) with your actual Kafka cluster details.
:::

#### 1.2: Deploy the Kafka Sink connector

Create the Kafka Sink connector instance in KurrentDB by sending a `POST` request to the KurrentDB API with the following `curl` command:

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-H "content-type: application/json" -d '@kafka-sink-config.json' `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/kafka-sink-quickstart  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-H "content-type: application/json" -d '@kafka-sink-config.json' \
-X POST https://your-kurrentdb-cluster-url:2113/connectors/kafka-sink-quickstart  
```
:::

::: note
Replace `admin:password` with your KurrentDB credentials and `your-kurrentdb-cluster-url` with the actual KurrentDB cluster URL.
:::

#### 1.3: Verify the connector configuration

Run the following command to check the configuration:

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -u admin:password  `
-X GET https://your-kurrentdb-cluster-url:2113/connectors/kafka-sink-quickstart/settings  
```
@tab Bash
```bash:no-line-numbers
curl -u admin:password  \ 
-X GET https://your-kurrentdb-cluster-url:2113/connectors/kafka-sink-quickstart/settings  
```
:::

::: note
Replace `your-kurrentdb-cluster-url` with the actual KurrentDB cluster URL.
:::

If successful, you should see a JSON response displaying your Kafka Sink configuration, as shown in the example below:

```json
{
  "settings": {
    "instanceTypeName": "kafka-sink",
    "subscription:filter:scope": "stream",
    "subscription:filter:filterType": "prefix",
    "subscription:filter:expression": "LoanRequest",
    "topic": "loans",
    "bootstrapServers": "your-kafka-cluster-url:9092",
    "authentication:username": "your-username",
    "authentication:password": "your-password",
    "authentication:securityProtocol": "SaslSsl",
    "waitForBrokerAck": "true"
  },
  "timestamp": "2024-08-14T19:08:45.907847700Z"
}
```

### Step 2: Start the Kafka Sink connector

After configuring the Kafka Sink connector, you need to start it to begin streaming events from KurrentDB to Kafka. To do this, send a `POST` request to the KurrentDB API:

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/kafka-sink-quickstart/start  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-X POST https://your-kurrentdb-cluster-url:2113/connectors/kafka-sink-quickstart/start  
```
:::

::: note
Replace `admin:password` with your KurrentDB credentials and `your-kurrentdb-cluster-url` with the actual KurrentDB cluster URL.
:::

If the Kafka Sink connector starts successfully, it should return an `HTTP/1.1 200 OK` response, as shown below:

```text:no-line-numbers
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

### Step 3: Append Events to KurrentDB

To test the Kafka Sink connector, append sample events to KurrentDB using the KurrentDB UI with the following steps:

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


### Step 4: Verify events in Kafka

After appending events to KurrentDB, you need to check whether they have been successfully streamed to Kafka. This step ensures that the Kafka Sink connector is functioning correctly.

Check events in the Kafka topic with the following steps:

1. Log in to the Kafka cluster UI (i.e., [Confluent Cloud](https://confluent.cloud) in this tutorial).  
2. Navigate to your Kafka cluster and open the `loans` topic.  
3. View the appended events from KurrentDB.  
4. If the Kafka Sink connector is working correctly, the events you added to KurrentDB should appear here, as shown in the image below.

![Verify events in Kafka](images/kafka-sink-quickstart-verify-in-kafka.png =300x)

### Step 5 (optional): Stop the Kafka Sink connector

If the Kafka Sink connector is no longer needed, you can stop it to free up resources. Run the following command to send a POST request to the KurrentDB API and stop the connector.

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/kafka-sink-quickstart/stop  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-X POST https://your-kurrentdb-cluster-url:2113/connectors/kafka-sink-quickstart/stop  
```
:::

::: note
Replace `admin:password` with your KurrentDB credentials and `your-kurrentdb-cluster-url` with the actual KurrentDB cluster URL.
:::

If the Kafka Sink connector stops successfully, it should return an `HTTP/1.1 200 OK` response, as shown below:

```text:no-line-numbers
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

The Kafka Sink connector has now stopped processing events. This temporarily pauses event streaming while keeping the connector configuration intact. You can restart it later by following **Step 2** without needing to reconfigure it.

### Summary

By following this tutorial, you should have successfully: 

* Configured the Kafka Sink connector.  
* Deployed and started the Kafka Sink connector using API requests.  
* Appended events to KurrentDB and verified their propagation to Kafka through KurrentDB UI and Confluent Cloud UI.  
* (Optional) Stopped the Kafka Sink connector when it was no longer needed.

This setup allows real-time event streaming from KurrentDB to a Kafka topic hosted on Confluent Cloud, making it easier to build event-driven applications with KurrentDB and Kafka and help you integrate KurrentDB with Kafka-powered systems.
