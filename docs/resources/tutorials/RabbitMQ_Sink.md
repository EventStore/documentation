---
title: RabbitMQ Sink
categories:
  - Connectors
  - Operations
tag:
  - Connectors
  - Sink
  - RabbitMQ
---

## Tutorial: Setting up and using a RabbitMQ Sink connector in KurrentDB

This tutorial guides you through the configuration and deployment of a RabbitMQ Sink connector in KurrentDB. The connector streams events in real time from KurrentDB to a RabbitMQ exchange, enabling message-based communication for microservices, task queues, and event-driven applications.

#### Prerequisites:

* A KurrentDB cluster with an active license key.  
* A RabbitMQ instance (self-hosted or cloud-based).  
* Connection details for RabbitMQ (e.g., host, port, username, password, exchange name).  
* Basic command-line knowledge (e.g., using `curl` for API requests).  
* Access to  KurrentDB UI and the RabbitMQ Management UI or CLI (`rabbitmqctl`) for event verification.


### Step 1: Configure the RabbitMQ Sink connector

The RabbitMQ Sink connector must be configured to define how KurrentDB streams events to RabbitMQ.

#### Step 1.1: Create the configuration file

Create a new file named `rabbitmq-sink-config.json` with the following content:

```json
{
  "settings": {
    "instanceTypeName": "rabbitmq-sink",
    "subscription:filter:scope": "stream",
    "subscription:filter:filterType": "prefix",
    "subscription:filter:expression": "LoanRequest",
    "host": "your-rabbitmq-host", 
    "port": 5672,  
    "username": "your-username", 
    "password": "your-password",  
    "virtualHost": "/",  
    "exchangeName": "your-exchange",  
    "routingKey": "your-routing-key"
  }
}
```

::: note
Replace the placeholders:

* `"your-rabbitmq-host"` → Your RabbitMQ server address.  
* `"your-username"` & `"your-password"` → Your RabbitMQ credentials.  
* `"your-exchange"` → The RabbitMQ exchange where events will be published.  
* `"your-routing-key"` → The routing key for message distribution.
:::

#### Step 1.2: Deploy the RabbitMQ Sink connector

Create the RabbitMQ Sink connector instance in KurrentDB by sending a `POST` request to the KurrentDB API with the following `curl` command:

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-H "content-type: application/json" -d '@rabbitmq-sink-config.json' `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/rabbitmq-sink-quickstart  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-H "content-type: application/json" -d '@rabbitmq-sink-config.json' \
-X POST https://your-kurrentdb-cluster-url:2113/connectors/rabbitmq-sink-quickstart  
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
-X GET https://your-kurrentdb-cluster-url:2113/connectors/rabbitmq-sink-quickstart/settings  
```
@tab Bash
```bash:no-line-numbers
curl -u admin:password  \ 
-X GET https://your-kurrentdb-cluster-url:2113/connectors/rabbitmq-sink-quickstart/settings  
```
:::


If successful, the response will display the current settings of your RabbitMQ Sink connector, matching your configuration file in **Step 1.1**.

### Step 2: Start the RabbitMQ Sink connector

Once configured, you need to start the RabbitMQ Sink connector to begin streaming events. To do this, send a `POST` request to the KurrentDB API:

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/rabbitmq-sink-quickstart/start  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-X POST https://your-kurrentdb-cluster-url:2113/connectors/rabbitmq-sink-quickstart/start  
```
:::

If the RabbitMQ Sink connector starts successfully, it should return an `HTTP/1.1 200 OK` response, as shown below:

```text:no-line-numbers
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

### Step 3: Append Events to KurrentDB

To test the RabbitMQ Sink connector, first append some sample events to KurrentDB using the KurrentDB UI with the following steps:

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


### Step 4: Verify events in RabbitMQ

Now, you can use RabbitMQ Management UI or CLI to verify that the events have been successfully streamed to RabbitMQ.

#### Option 1\. Use the RabbitMQ Management UI

1. Log in to the RabbitMQ Management UI (`http://your-rabbitmq-host:15672`), replacing `"your-rabbitmq-host"` with your RabbitMQ server address.  
2. Navigate to **Exchanges**.  
3. Find **your exchange** specified in the connector configuration.  
4. Check the **queues bound to the exchange** and inspect messages.

#### Option 2\. Use `rabbitmqctl` (Command Line)

Alternatively, check the messages using the RabbitMQ CLI `rabbitmqctl`, which is automatically installed with RabbitMQ. 

1. You need to start the RabbitMQ service to use `rabbitmqctl`.

   #### For Linux/macOS:

    ::: tabs
    @tab Bash
    ```bash:no-line-numbers
    sudo systemctl start rabbitmq-server 
    ```
    :::

   or

    ::: tabs
    @tab Bash
    ```bash:no-line-numbers
    rabbitmq-server -detached 
    ```
    :::
   

    #### For Windows:

   Start RabbitMQ via the **Windows Services Manager** or run:  
   
    ::: tabs
    @tab powershell
    ```bash:no-line-numbers
    rabbitmq-service start 
    ```
    :::

2. List queues.  

    ::: tabs
    @tab Bash
    ```bash:no-line-numbers
    rabbitmqctl list_queues 
    ```
    :::

3. Inspect a queue and retrieve messages.  

    ::: tabs
    @tab Bash
    ```bash:no-line-numbers
    rabbitmqadmin get queue=your-queue-name 
    ```
    :::

If the RabbitMQ Sink connector is working correctly, events from KurrentDB should be visible in the designated exchange or queue.

### Step 5 (optional): Stop the RabbitMQ Sink connector

If the RabbitMQ Sink connector is no longer needed, you can stop it to free up resources. Run the following command to send a `POST` request to the KurrentDB API and stop the connector.

::: tabs
@tab Powershell
```powershell:no-line-numbers
curl -i -L -u admin:password  `
-X POST https://your-kurrentdb-cluster-url:2113/connectors/rabbitmq-sink-quickstart/stop  
```
@tab Bash
```bash:no-line-numbers
curl -i -L -u admin:password  \ 
-X POST https://your-kurrentdb-cluster-url:2113/connectors/rabbitmq-sink-quickstart/stop  
```
:::


If the RabbitMQ Sink connector stops successfully, it should return an `HTTP/1.1 200 OK` response, as shown below:

```text:no-line-numbers
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

The RabbitMQ Sink connector has now stopped processing events, but its configuration remains intact. You can restart it later by following **Step 2**.

### Summary

By following this tutorial, you should have successfully: 

* Configured and deployed the RabbitMQ Sink connector in KurrentDB.  
* Streamed events from KurrentDB to a RabbitMQ exchange.  
* Verified event propagation using KurrentDB UI and the RabbitMQ Management UI or `rabbitmqctl`.  
* (Optional) Stopped the RabbitMQ Sink connector when no longer needed.

This setup enables real-time event streaming from KurrentDB to a RabbitMQ exchange, providing a reliable and scalable solution for seamless message routing for microservices, task queues, and distributed event-driven architectures.
