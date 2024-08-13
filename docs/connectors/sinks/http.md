# HTTP Sink Connector

<!-- The HTTP Sink connector allows for integration between EventStoreDB and external
APIs over HTTP or HTTPS. This connector consumes events from an EventStoreDB
stream and converts each event's data into JSON format before sending it in the
request body to a specified Url. Events are sent individually as they are
consumed from the stream, without batching. The event data is transmitted as the
request body, and metadata can be included as HTTP headers.

The connector supports secure connections to APIs using SSL and provides
authentication options, including Basic Authentication and Bearer Token
Authentication. Additionally, the connector offers resilience features, such as
configurable retry logic and backoff strategies for handling request failures.

## Features

- [At least once delivery](#at-least-once-delivery)
- [Template Parameters](#template-parameters)
- [Transformation](#transformation)
- [Authentication](#authentication)

### At least once delivery

The HTTP Sink connector guarantees at least once delivery by retrying failed
requests based on configurable resilience settings. It will continue to attempt
delivery until the event is successfully sent or the maximum number of retries
is reached, ensuring each event is delivered at least once.

If resilience is enabled (the default), the HTTP Sink connector will retry failed requests based on the configured HTTP
status codes (e.g., 404, 408, 5xx). By default, it retries on any non-2xx status code.

**Configuration Example**

```json
{
  "Resilience:Enabled": true,
  "Resilience:RequestTimeoutMs": 3000,
  "Resilience:MaxRetries": -1,
  "Resilience:TransientErrorDelay": "00:00:05",
  "Resilience:ReconnectBackoffMaxMs": 20000,
  "Resilience:RetryOnHttpCodes": "101" // defaults to retry on any non-2xx status code
}
```

### Template Parameters

The HTTP Sink connector supports the use of template parameters in the URL,
allowing for dynamic construction of the request URL based on event data. This
feature enables you to customize the destination URL for each event, making it
easier to integrate with APIs that require specific URL structures.

#### Available Template Parameters

The following template parameters are available for use in the URL:

| Parameter          | Description                                                     | Example           |
|--------------------|-----------------------------------------------------------------|-------------------|
| `{schema-subject}` | The event's schema subject, converted to lowercase with hyphens | `user-registered` |
| `{event-type}`     | Alias for `{schema-subject}`                                    | `user-registered` |
| `{stream}`         | The EventStoreDB stream ID                                      | `user-123`        |
| `{partition-key}`  | The event's partition key                                       | `123`             |

**Usage**

To use template parameters, include them in the `Url` option of your HTTP Sink configuration. The parameters will be
replaced with their corresponding values for each event.

Example:

```
"https://api.example.com/{schema-subject}/{partition-key}"
```

For an event with schema subject "TestEvent" and partition key "123", this would result in the URL:

```
https://api.example.com/TestEvent/123
```

### Transformation

The HTTP Sink connector supports transformation of event data before sending it
to the destination URL. This feature allows you to modify the event data or
metadata, or to add additional information to the request body or headers.

Learn more about transformations in the [Transformation](../settings.md#transformation-configuration) section.

### Authentication

The HTTP Sink supports the following authentication methods:

- **None**: No authentication is used.
- **Basic**: The sink uses basic authentication with a username and password.
- **Bearer**: The sink uses bearer token authentication.

The authentication options are configured using the `Authentication` property in the `HttpSinkOptions`.

## Settings

The HTTP sink inherits a set of common settings that are used to configure the connector. The settings can be found in
the [Common Settings](../settings.md) page.

The HTTP Sink Connector can be configured with the following options:

| Option                          | Description                                                                                                                                               | Required |
|---------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| `Url`                           | **Type**: string<br><br>**Description:** The URL to which the HTTP request will be sent.<br><br>**Default**: `""`                                         | Yes      |
| `Method`                        | **Type**: HttpMethod<br><br>**Description:** The HTTP method to use for the request.<br><br>**Default**: `"POST"`                                         | No       |
| `DefaultHeaders`                | **Type**: string<br><br>**Description:** Headers included in all produced messages.<br><br>**Default**: `Accept-Encoding:*`                               | No       |
| `PooledConnectionLifetime`      | **Type**: TimeSpan<br><br>**Description:** How long a connection can be in the pool to be considered reusable.<br><br>**Default**: `00:05:00`             | No       |
| `Authentication:Method`         | **Type**: HttpSinkAuthMethod<br><br>**Description:** The authentication method to use.<br><br>**Default**: `None`                                         | No       |
| `Authentication:Basic:Username` | **Type**: string<br><br>**Description:** The username for basic authentication.<br><br>**Default**: `""`                                                  | No       |
| `Authentication:Basic:Password` | **Type**: string<br><br>**Description:** The password for basic authentication.<br><br>**Default**: `""`                                                  | No       |
| `Authentication:Bearer:Token`   | **Type**: string<br><br>**Description:** The token for bearer authentication.<br><br>**Default**: `""`                                                    | No       |
| `Resilience:Enabled`            | **Type**: boolean<br><br>**Description:** Enables resilience features.<br><br>**Default**: `true`                                                         | No       |
| `Resilience:RequestTimeoutMs`   | **Type**: int<br><br>**Description:** Timeout for HTTP requests.<br><br>**Default**: `3000 ms`                                                            | No       |
| `Resilience:MaxRetries`         | **Type**: int<br><br>**Description:** Maximum number of retry attempts.<br><br>**Default**: `-1` (unlimited)                                              | No       |
| `Resilience:RetryOnHttpCodes`   | **Type**: string<br><br>**Description:** HTTP status codes to retry on (e.g., 404, 408, 5xx).<br><br>**Default**: `""` (retry on any non-2xx status code) | No       |
| `Resilience:FirstDelayBound`    | **Type**: HttpSinkBackoffDelayBound<br><br>**Description:** Delay bound for the first backoff attempt.<br><br>**Default**: `(60000, 5000)`                | No       |
| `Resilience:SecondDelayBound`   | **Type**: HttpSinkBackoffDelayBound<br><br>**Description:** Delay bound for the second backoff attempt.<br><br>**Default**: `(3600000, 600000)`           | No       |
| `Resilience:ThirdDelayBound`    | **Type**: HttpSinkBackoffDelayBound<br><br>**Description:** Delay bound for the third backoff attempt.<br><br>**Default**: `(3600001, 3600000)`           | No       | -->
