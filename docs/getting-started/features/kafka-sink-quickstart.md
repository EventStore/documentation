---
title: Kafka-Sink Quickstart
---

## Objectives 
In this quickstart, you will:

* Configure the Kafka Sink connector to write events to a kafka topic.
* Start the Kafka Sink connector.
* Append events to KurrentDB through the UI.
* View the appended events in the Kafka topic.


## Prerequisites
Before starting, ensure you have the following:

* a KurrentDB cluster with the appropriate license key 
  * this quickstart uses a cluster provisioned on a [public network](cloud/networking/public-network) of [Kurrent Cloud](/cloud) 
* a Kafka cluster, with an API kley allowed to write to a topic named `loans`
  * this quickstart uses a public Kafka cluster provisioned on [Confluent Cloud](https://confluent.cloud/)
* Familiarity with command-line operations (curl)


## Step 1. Configure the Kafka Sink connector

To configure the Kafka Sink connector, you need to create a configuration file that specifies the connection details 
for the Kafka cluster and the connector instance configuration 

1. Create a file named `kafka-sink-config.json` with the following content:

::: note
Replace the values of  `bootstrapServers`, `authentication:username`, and `authentication:password` with the appropriate values for your Kafka cluster
::: 

```json lines
{
  "settings": {
    "instanceTypeName": "kafka-sink",
    "subscription:filter:scope": "stream",
    "subscription:filter:filterType": "prefix",
    "subscription:filter:expression": "LoanRequest",
    "topic": "loans",
    "bootstrapServers": "pkc-z9doz.eu-west-1.aws.confluent.cloud:9092",
    "authentication:username": "UJ",
    "authentication:password": "Nh",
    "authentication:securityProtocol": "SaslSsl",
    "waitForBrokerAck": "true"
  }
}
```


2. Create the Kafka Sink connector instance by sending a POST request to the KurrentDB API:

::: note
Replace `admin:password` with your KurrentDB username and password and the URL `https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113` with the URL of your KurrentDB cluster
:::

::: tabs
@tab Powershell
```PowerShell
curl -i -L -u admin:password  `
-H "content-type: application/json" -d '@kafka-sink-config.json' `
-X POST https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113/connectors/kafka-sink-quickstart  
```
@tab Bash
```Bash
curl -i -L -u admin:password  \ 
-H "content-type: application/json" -d '@kafka-sink-config.json' \
-X POST https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113/connectors/kafka-sink-quickstart  
```
:::

3. View the configuration of the Kafka Sink connector instance by sending a GET request to the KurrentDB API:

::: note
Replace `admin:password` with your KurrentDB username and password and the URL `https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113` with the URL of your KurrentDB cluster
:::

::: tabs
@tab Powershell
```PowerShell
curl -u admin:password  https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113/connectors/kafka-sink-quickstart/settings  
```
@tab Bash
```Bash
curl -u admin:password  https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113/connectors/kafka-sink-quickstart/settings  
```
:::


The output will display the configuration of the Kafka Sink connector instance:

```json
{
  "settings": {
    "instanceTypeName": "kafka-sink",
    "subscription:filter:scope": "stream",
    "subscription:filter:filterType": "prefix",
    "subscription:filter:expression": "LoanRequest",
    "topic": "loans",
    "bootstrapServers": "pkc-z9doz.eu-west-1.aws.confluent.cloud:9092",
    "authentication:username": "UJ",
    "authentication:password": "Nh",
    "authentication:securityProtocol": "SaslSsl",
    "waitForBrokerAck": "true"
  },
  "timestamp": "2024-08-14T19:08:45.907847700Z"
}
```

## Step 2. Start the Kafka Sink connector

1. Start the Kafka Sink connector instance by sending a POST request to the KurrentDB API:

::: note
Replace `admin:password` with your KurrentDB username and password and the URL `https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113` with the URL of your KurrentDB cluster
:::

::: tabs
@tab Powershell
```PowerShell
curl -i -L -u admin:password  https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113/connectors/kafka-sink-quickstart/start  
```
@tab Bash
```Bash
curl -i -L -u admin:password  https://cu8i0e3tv1lr03.mesdb.eventstore.cloud:2113/connectors/kafka-sink-quickstart/start  
```
:::

The start request will return a `HTTP/1.1 200 OK` response code to confirm that the Kafka Sink connector instance has started successfully. 
```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
```

## Step 3. Append events to KurrentDB through the UI.

1. Browse to the KurrentDB UI and log in with your credentials.
2. Click on the `Stream Browser` tab in navigation menu.
3. click on the `Add Event` button.
4. In the `Stream ID` field, enter `LoanRequest-1`.
5. In the `Event Type` field, enter `LoanRequested`.
6. In the `Event Body` field, enter the following JSON object:
```json
{
  "Amount": 10000,
  "loanTerm": 12
}
```
7. Click the `Add` button to append the event to the `LoanRequest-1` stream.
8. Repeat steps 3-7 to append more events to the `LoanRequest-2` stream.

![Append events to LoanRequest streams ](images/kafka-sink-quickstart-add-event.png =300x)

## Step 4. View the appended events in the Kafka topic.

1. Browse to the Kafka cluster UI and log in with your credentials.
2. Navigate to the `loans` topic.
3. View the appended events in the `loans` topic.



![kafka loans topic messages](images/kafka-sink-quickstart.png =300x)