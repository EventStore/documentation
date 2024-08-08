# Built-in sinks

Sinks are Connector targets. They are the final destination for events from EventStoreDB point of view. Each sink requires its own configuration where the configuration options are specific to the sink type.

::: note
Sink configuration will likely change in future versions.
:::

## Logger Sink

The logger sink logs a message about the connector and record details.

Here is how to create a console sink connector in JSON:

```json
{
  "connectorId": "demo-logger-sink",
  "settings": {
    "InstanceTypeName": "EventStore.Connectors.Testing.LoggerSink"
  }
}
```

## HTTP Sink

The HTTP Sink posts events to specified endpoints and delivers record metadata as HTTP headers. The record payload is
sent as the body of the HTTP request.

### Sink Options

The HTTP Sink uses
the [System.Net.Http](https://learn.microsoft.com/en-us/dotnet/api/system.net.http.httpclient?view=net-8.0) to make
requests to the configured HTTP endpoint. The behavior of the HttpClient
can be customized through the following options:

| Option                          | Description                                        | Type                      | Default                               |
| ------------------------------- | -------------------------------------------------- | ------------------------- | ------------------------------------- |
| `Authentication:Method`         | The authentication method to use.                  | HttpSinkAuthMethod        | None                                  |
| `Authentication:Basic:Username` | The username for basic authentication.             | string                    | ""                                    |
| `Authentication:Basic:Password` | The password for basic authentication.             | string                    | ""                                    |
| `Authentication:Bearer:Token`   | The token for bearer authentication.               | string                    | ""                                    |
| `Resilience:Enabled`            | Enables resilience features.                       | boolean                   | true                                  |
| `Resilience:RequestTimeoutMs`   | Timeout for HTTP requests.                         | int                       | 3000 ms                               |
| `Resilience:MaxRetries`         | Maximum number of retry attempts.                  | int                       | -1 (unlimited)                        |
| `Resilience:RetryOnHttpCodes`   | HTTP status codes to retry on (e.g., 404,408,5xx). | string                    | "" (retry on any non-2xx status code) |
| `Resilience:FirstDelayBound`    | Delay bound for the first backoff attempt.         | HttpSinkBackoffDelayBound | `(60000, 5000)`                       |
| `Resilience:SecondDelayBound`   | Delay bound for the second backoff attempt.        | HttpSinkBackoffDelayBound | `(3600000, 600000)`                   |
| `Resilience:ThirdDelayBound`    | Delay bound for the third backoff attempt.         | HttpSinkBackoffDelayBound | `(3600001, 3600000)`                  |

### Authentication

The HTTP Sink supports the following authentication methods:

- **None**: No authentication is used.
- **Basic**: The sink uses basic authentication with a username and password.
- **Bearer**: The sink uses bearer token authentication.

The authentication options are configured using the `Authentication` property in the `HttpSinkOptions`.

### Resilience

The resilience feature ensures that the connector can handle transient errors gracefully by retrying operations based on
a predefined strategy.

**Configuration Options**

| Option                        | Description                                 | Defaults                              |
| ----------------------------- | ------------------------------------------- | ------------------------------------- |
| `Resilience:Enabled`          | Enables resilience features.                | true                                  |
| `Resilience:RequestTimeoutMs` | Timeout for HTTP requests.                  | 3000 ms                               |
| `Resilience:MaxRetries`       | Maximum number of retry attempts.           | -1 (unlimited)                        |
| `Resilience:RetryOnHttpCodes` | HTTP status codes to retry on.              | "" (retry on any non-2xx status code) |
| `Resilience:FirstDelayBound`  | Delay bound for the first backoff attempt.  | `(60000, 5000)`                       |
| `Resilience:SecondDelayBound` | Delay bound for the second backoff attempt. | `(3600000, 600000)`                   |
| `Resilience:ThirdDelayBound`  | Delay bound for the third backoff attempt.  | `(3600001, 3600000)`                  |

The resilience feature uses [Polly](https://www.pollydocs.org/) under the hood to ensure that the connector can handle
transient errors gracefully by retrying operations based on a predefined strategy.

## Kafka Sink

The Kafka Sink Connector writes events to a Kafka topic. It can extract the partition key from the record based on
specific sources such as the stream ID, headers, or record key and also supports basic authentication and
resilience features to handle transient errors.

### Sink Options

The Kafka Sink Connector can be configured with the following options:

### Kafka Sink Specific Options

| Option                              | Description                                                                                          | Type               | Default     |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------ | ----------- |
| `Topic`                             | The Kafka topic to produce records to.                                                               | string             |             |
| `WaitForBrokerAck`                  | Whether the producer waits for broker acknowledgment before considering the send operation complete. | boolean            | true        |
| `DefaultHeaders`                    | Headers included in all produced messages.                                                           | string             |             |
| `PartitionKeyExtraction:Enabled`    | Enables partition key extraction.                                                                    | boolean            | false       |
| `PartitionKeyExtraction:Source`     | Source for extracting the partition key.                                                             | PartitionKeySource | Unspecified |
| `PartitionKeyExtraction:Expression` | Regular expression for extracting the partition key.                                                 | string             |             |

### Kafka Client Options

| Option                             | Description                                     | Type                                                                                                                                                | Default                |
| ---------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `BootstrapServers`                 | Comma-separated list of Kafka broker addresses. | string                                                                                                                                              |                        |
| `BrokerAddressFamily`              | Allowed broker IP address families.             | [BrokerAddressFamily](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.BrokerAddressFamily.html) | V4                     |
| `Compression:Type`                 | Kafka compression type.                         | [CompressionType](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.CompressionType.html)         | Zstd                   |
| `Compression:Level`                | Kafka compression level.                        | int                                                                                                                                                 | 6                      |
| `Resilience:Enabled`               | Enables resilience features.                    | boolean                                                                                                                                             | true                   |
| `Resilience:RequestTimeoutMs`      | Timeout for Kafka requests.                     | int                                                                                                                                                 | 3000 ms                |
| `Resilience:MaxRetries`            | Maximum number of retry attempts.               | int                                                                                                                                                 | -1 (unlimited)         |
| `Resilience:TransientErrorDelay`   | Delay between retries for transient errors.     | TimeSpan                                                                                                                                            | 00:00:05               |
| `Resilience:ReconnectBackoffMaxMs` | Maximum backoff time for reconnect attempts.    | int                                                                                                                                                 | 20000 ms               |
| `Resilience:MessageSendMaxRetries` | Maximum retry attempts for sending messages.    | int                                                                                                                                                 | 2147483647 (unlimited) |
| `Authentication:SecurityProtocol`  | Protocol used for Kafka broker communication.   | [SecurityProtocol](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.SecurityProtocol.html)       | Plaintext              |
| `Authentication:SaslMechanism`     | SASL mechanism for authentication.              | [SaslMechanism](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.SaslMechanism.html)             | Plain                  |
| `Authentication:Username`          | Username for authentication.                    | string                                                                                                                                              |                        |
| `Authentication:Password`          | Password for authentication.                    | string                                                                                                                                              |                        |

### Enum Types

The following enum types are used in the configuration options:

#### PartitionKeySource

- `Stream`: Extracts the partition key from the stream ID using a regular expression.
- `StreamSuffix`: Extracts the partition key from the suffix of the stream ID (last segment split by '-').
- `Headers`: Extracts the partition key from the record headers using a regular expression or header value.
- `RecordKey`: Uses the record key as the partition key.

For Kafka client enum types, please refer to the official [Kafka .NET client documentation](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.html).

### Broker Acknowledgment

By default, the connector waits for broker acknowledgment. Enabling broker acknowledgment ensures that each message sent
to Kafka is confirmed by the broker before the send operation is considered complete:

```json
{
  ...
  "settings": {
    "WaitForBrokerAck": true
  }
}
```

Disabling broker acknowledgment can significantly increase throughput by allowing the producer to continue sending
messages without waiting for confirmation from the broker. This is ideal for high-throughput scenarios where performance
is prioritized over
delivery guarantees, despite a slight increase in the risk of message loss or duplication.

### Resilience

The resilience feature ensures that the connector can handle transient errors gracefully by retrying operations based on
a predefined strategy.

**Configuration Options**

| Option                             | Description                                  | Defaults               |
| ---------------------------------- | -------------------------------------------- | ---------------------- |
| `Resilience:Enabled`               | Enables resilience features.                 | true                   |
| `Resilience:RequestTimeoutMs`      | Timeout for Kafka requests.                  | 3000 ms                |
| `Resilience:MaxRetries`            | Maximum number of retry attempts.            | -1 (unlimited)         |
| `Resilience:TransientErrorDelay`   | Delay between retries for transient errors.  | 00:00:05               |
| `Resilience:ReconnectBackoffMaxMs` | Maximum backoff time for reconnect attempts. | 20000 ms               |
| `Resilience:MessageSendMaxRetries` | Maximum retry attempts for sending messages. | 2147483647 (unlimited) |

The resilience feature uses [Polly](https://www.pollydocs.org/) under the hood to ensure that the connector can handle
transient errors
gracefully by retrying operations based on
a predefined strategy. Transient Kafka errors that trigger retries are:

- **Local_AllBrokersDown**: All broker connections are down
- **OutOfOrderSequenceNumber**: Broker received an out of order sequence number
- **TransactionCoordinatorFenced**: Indicates that the transaction coordinator sending a WriteTxnMarker is no longer the
  current coordinator for a given producer
- **UnknownProducerId**: Unknown Producer Id.

For detailed information on the listed error codes, refer to
the [Kafka documentation](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.ErrorCode.html).

### Extract Partition Key

The sink connector can extract partition keys from the record based on various sources to ensure that messages are
correctly partitioned in Kafka. This feature can be configured using the `PartitionKeyExtraction` option, to determine
how
partition keys are derived from the records.

**Configuration Options:**

| Option       | Description                                                                                         | Type               |
| ------------ | --------------------------------------------------------------------------------------------------- | ------------------ |
| `Enabled`    | Enables partition key extraction.                                                                   | boolean            |
| `Source`     | Source for extracting the partition key. Options: `Stream`, `StreamSuffix`, `Headers`, `RecordKey`. | PartitionKeySource |
| `Expression` | Regular expression for extracting the partition key (used with `Stream` and `Headers`).             | string             |
| `HeaderKey`  | Header key to use for extracting the partition key (used with `Headers` source).                    | string             |

**Available Sources for Partition Key Extraction:**

1. **Stream**: Extracts the partition key from the stream ID using a regular expression.

   **Example Configuration:**

   ```json
   {
    ...
     "settings": {
       "PartitionKeyExtraction:Enabled": true,
       "PartitionKeyExtraction:Source": "Stream",
       "PartitionKeyExtraction:Expression": "your-regex-pattern"
     }
   }
   ```

   If the `Stream` source is selected, the partition key is extracted from the stream ID based on the provided regular
   expression. If the regular expression matches part of the stream ID, that matched value is used as the partition key.

2. **StreamSuffix**: Extracts the partition key from the suffix of the stream ID.

   **Example Configuration:**

   ```json
   {
    ...
     "settings": {
       "PartitionKeyExtraction:Enabled": true,
       "PartitionKeyExtraction:Source": "StreamSuffix"
     }
   }
   ```

   When the `StreamSuffix` source is chosen, the partition key is derived from the last segment of the stream ID, split
   by the '-' character. For example, if the stream ID is `order-2021-05-15`, the partition key would be `2021-05-15`.

3. **Headers**: Extracts the partition key from the record headers using a regular expression.

   **Example Configuration:**

   ```json
   {
    ...
     "settings": {
       "PartitionKeyExtraction:Enabled": true,
       "PartitionKeyExtraction:Source": "Headers",
       "PartitionKeyExtraction:Expression": "your-regex-pattern",
       "PartitionKeyExtraction:HeaderKey": "your-header-key"
     }
   }
   ```

   If the `Headers` source is selected, the partition key is extracted from the headers of the record using the provided
   regular expression and header key. The connector searches through the headers, and if a match is found based on the
   regular expression and header key, that value is used as the partition key. If no match is found, the record's key is
   used instead.

4. **RecordKey**: Uses the record key as the partition key.

   **Example Configuration:**

   ```json
   {
    ...
     "settings": {
       "PartitionKeyExtraction:Enabled": true,
       "PartitionKeyExtraction:Source": "RecordKey"
     }
   }
   ```

   When the `RecordKey` source is chosen, the partition key is set to the value of the record key.

### Authentication

The Kafka broker can be configured with authentication options. The following options are:

**Kafka Broker:**

| Option                            | Description                                   | Type                                                                                                                                          | Default   |
| --------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `Authentication:SecurityProtocol` | Protocol used for Kafka broker communication. | [SecurityProtocol](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.SecurityProtocol.html) | Plaintext |
| `Authentication:SaslMechanism`    | SASL mechanism for authentication.            | [SaslMechanism](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.SaslMechanism.html)       | Plain     |
| `Authentication:Username`         | Username for authentication.                  | string                                                                                                                                        |           |
| `Authentication:Password`         | Password for authentication.                  | string                                                                                                                                        |           |

For a complete list of available values for `SecurityProtocol` and `SaslMechanism`, please refer to the official Kafka
documentation:

- [SecurityProtocol Enum Values](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.SecurityProtocol.html)
- [SaslMechanism Enum Values](https://docs.confluent.io/platform/current/clients/confluent-kafka-dotnet/_site/api/Confluent.Kafka.SaslMechanism.html)

> **Note:** Currently, the connector supports only basic authentication for the Kafka broker
> This includes specifying the username and password directly in the configuration settings.
