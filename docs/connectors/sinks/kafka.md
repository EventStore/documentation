# Kafka Sink Connector

The Kafka Sink Connector writes events to a Kafka topic. It can extract the
partition key from the record based on specific sources such as the stream ID,
headers, or record key and also supports basic authentication and resilience
features to handle transient errors.

## Features

- [At least once delivery](#at-least-once-delivery)
- [Transformation](#transformation)
- [Broker Acknowledgment](#broker-acknowledgment)
- [Authentication](#authentication)
- [Partition Key Extraction](#partition-key-extraction)

### At least once delivery

The Kafka Sink connector guarantees at least once delivery by retrying failed
requests based on configurable resilience settings. It will continue to attempt
delivery until the event is successfully sent or the maximum number of retries
is reached, ensuring each event is delivered at least once.

The Kafka Sink Connector currently retries transient errors based on the following error codes:

- **Local_AllBrokersDown**: All broker connections are down
- **OutOfOrderSequenceNumber**: Broker received an out of order sequence number
- **TransactionCoordinatorFenced**: Indicates that the transaction coordinator sending a WriteTxnMarker is no longer the
  current coordinator for a given producer
- **UnknownProducerId**: Unknown Producer Id.

For detailed information on the listed error codes, refer to
the [Kafka documentation](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.ErrorCode.html).

**Configuration Example**

```json
{
  "Resilience:Enabled": true,
  "Resilience:RequestTimeoutMs": 3000,
  "Resilience:MaxRetries": -1,
  "Resilience:TransientErrorDelay": "00:00:05",
  "Resilience:ReconnectBackoffMaxMs": 20000,
  "Resilience:MessageSendMaxRetries": 2147483647
}
```

### Transformation

The Kafka Sink connector supports transformation of event data before sending it
to the destination Kafka topic. This feature allows you to modify the event data or
metadata, or to add additional information to the record headers.

Learn more about transformations in the [Transformation](../settings.md#transformation-configuration) section.

### Broker Acknowledgment

By default, the connector waits for broker acknowledgment. Enabling broker acknowledgment ensures that each message sent
to Kafka is confirmed by the broker before the send operation is considered complete:

```json
{
  "WaitForBrokerAck": true
}
```

Disabling broker acknowledgment can significantly increase throughput by allowing the producer to continue sending
messages without waiting for confirmation from the broker. This is ideal for high-throughput scenarios where performance
is prioritized over delivery guarantees, despite a slight increase in the risk of message loss or duplication.

### Authentication

The Kafka Sink Connector supports basic authentication for connecting to the Kafka broker. To enable authentication, you
must provide the username and password in the configuration settings.

```json
{
  "Authentication:Username": "***********",
  "Authentication:Password": "**************************",
  "Authentication:SecurityProtocol": "SaslSsl"
}
```

To learn more about authentication in Kafka,
see [Authentication using SASL](https://kafka.apache.org/documentation/#security_sasl)

### Partition Key Extraction

The sink connector can extract partition keys from the record based on various sources to ensure that messages are
correctly partitioned in Kafka. This feature can be configured using the `PartitionKeyExtraction` option, to determine
how partition keys are derived from the records.

**Extracts the partition key from the stream ID using a regular expression**

```json
{
  "PartitionKeyExtraction:Enabled": true,
  "PartitionKeyExtraction:Source": "Stream",
  "PartitionKeyExtraction:Expression": "your-regex-pattern"
}
```

If the `Stream` source is selected, the partition key is extracted from the stream ID based on the provided regular
expression. If the regular expression matches part of the stream ID, that matched value is used as the partition key.

**Extracts the partition key from the suffix of the stream ID**

```json
{
  "PartitionKeyExtraction:Enabled": true,
  "PartitionKeyExtraction:Source": "StreamSuffix"
}
```

When the `StreamSuffix` source is chosen, the partition key is derived from the last segment of the stream ID, split
by the '-' character. For example, if the stream ID is `order-2021-05-15`, the partition key would be `2021-05-15`.

**Extracts the partition key from the record headers using a regular expression**

```json
{
  "PartitionKeyExtraction:Enabled": true,
  "PartitionKeyExtraction:Source": "Headers",
  "PartitionKeyExtraction:Expression": "your-regex-pattern",
  "PartitionKeyExtraction:HeaderKey": "your-header-key"
}
```

If the `Headers` source is selected, the partition key is extracted from the headers of the record using the provided
regular expression and header key. The connector searches through the headers, and if a match is found based on the
regular expression and header key, that value is used as the partition key. If no match is found, the record's key is
used instead.

**Use the record key as the partition key**

```json
{
  "PartitionKeyExtraction:Enabled": true,
  "PartitionKeyExtraction:Source": "RecordKey"
}
```

When the `RecordKey` source is chosen, the partition key is set to the value of the record key.

## Settings

::: note
The Kafka sink inherits a set of common settings that are used to configure the connector. The settings can be found in
the [Common Settings](../settings.md) page.
:::

The Kafka Sink Connector can be configured with the following options:

| Option                              | Description                                                                                                                                                                                                                                                   | Required |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `Topic`                             | **Type**: string<br><br>**Description:** The Kafka topic to produce records to.                                                                                                                                                                               | Yes      |
| `WaitForBrokerAck`                  | **Type**: boolean<br><br>**Description:** Whether the producer waits for broker acknowledgment before considering the send operation complete.<br><br>**Default**: true                                                                                       | No       |
| `DefaultHeaders`                    | **Type**: string<br><br>**Description:** Headers included in all produced messages.<br><br>**Default**: `Accept-Encoding:*`                                                                                                                                   | No       |
| `PartitionKeyExtraction:Enabled`    | **Type**: boolean<br><br>**Description:** Enables partition key extraction.<br><br>**Default**: false                                                                                                                                                         | No       |
| `PartitionKeyExtraction:Source`     | **Type**: PartitionKeySource<br><br>**Description:** Source for extracting the partition key.g<br><br>**Available Values:**`Stream`, `StreamSuffix`, `Headers`, `RecordKey`<br><br>**Default**: `Unspecified`                                                 | No       |
| `PartitionKeyExtraction:Expression` | **Type**: string<br><br>**Description:** Regular expression for extracting the partition key.                                                                                                                                                                 | No       |
| `BootstrapServers`                  | **Type**: string<br><br>**Description:** Comma-separated list of Kafka broker addresses.                                                                                                                                                                      | No       |
| `BrokerAddressFamily`               | **Type**: [BrokerAddressFamily](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.BrokerAddressFamily.html)<br><br>**Description:** Allowed broker IP address families.<br><br>**Default**: `V4`            | No       | `Compression:Type`                  | **Type**: [CompressionType](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.CompressionType.html)<br><br>**Description:** Kafka compression type.<br><br>**Default**: `Zstd`                              |          |
| `Compression:Level`                 | **Type**: int<br><br>**Description:** Kafka compression level.<br><br>**Default**: 6                                                                                                                                                                          | No       |
| `Resilience:Enabled`                | **Type**: boolean<br><br>**Description:** Enables resilience features.<br><br>**Default**: `true`                                                                                                                                                             | No       |
| `Resilience:RequestTimeoutMs`       | **Type**: int<br><br>**Description:** Timeout for Kafka requests in milliseconds.<br><br>**Default**: `3000`                                                                                                                                                  | No       |
| `Resilience:MaxRetries`             | **Type**: int<br><br>**Description:** Maximum number of retry attempts.<br><br>**Default**: `-1` (unlimited)                                                                                                                                                  | No       |
| `Resilience:TransientErrorDelay`    | **Type**: TimeSpan<br><br>**Description:** Delay between retries for transient errors.<br><br>**Default**: `00:00:05`                                                                                                                                         | No       |
| `Resilience:ReconnectBackoffMaxMs`  | **Type**: int<br><br>**Description:** Maximum backoff time for reconnect attempts in milliseconds.<br><br>**Default**: `20000`                                                                                                                                | No       |
| `Resilience:MessageSendMaxRetries`  | **Type**: int<br><br>**Description:** Maximum retry attempts for sending messages.<br><br>**Default**: `2147483647`                                                                                                                                           | No       |
| `Authentication:SecurityProtocol`   | **Type**: [SecurityProtocol](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.SecurityProtocol.html)<br><br>**Description:** Protocol used for Kafka broker communication.<br><br>**Default**: `Plaintext` | No       | `Authentication:SaslMechanism`      | **Type**: [SaslMechanism](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.SaslMechanism.html)<br><br>**Description:** SASL mechanism for authentication.<br><br>**Default**: `Plain`                      |          |
| `Authentication:Username`           | **Type**: string<br><br>**Description:** Username for authentication.                                                                                                                                                                                         | No       |
| `Authentication:Password`           | **Type**: string<br><br>**Description:** Password for authentication.                                                                                                                                                                                         | No       |

For Kafka client enum types, please refer to the
official [Kafka .NET client documentation](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.html).
