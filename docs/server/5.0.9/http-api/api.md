---
title: HTTP API v5.0.4
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="http-api">HTTP API v5.0.4</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

The HTTP API for Event Store

Base URLs:

* <a href="https://eventstore.com">https://eventstore.com</a>

Email: <a href="mailto:chris.ward@eventstore.com">Support</a> 
License: <a href="http://www.apache.org/licenses/LICENSE-2.0.html">Apache 2.0</a>

# Authentication

- HTTP Authentication, scheme: basic 

<h1 id="http-api-streams">Streams</h1>

Endpoints for Stream operations

## Read a stream

<a id="opIdRead a stream"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/streams/{stream}

```

```http
GET https://eventstore.com/streams/{stream} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/{stream}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/streams/{stream}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/streams/{stream}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/streams/{stream}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/streams/{stream}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /streams/{stream}`

*Reads a stream*

Read a stream, receiving a standard AtomFeed document as a response.

<h3 id="read-a-stream-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream ID|
|embed|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="read-a-stream-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Write to a stream

<a id="opIdWrite to a stream"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/streams/{stream} \
  -H 'Content-Type: application/json' \
  -H 'ES-ExpectedVersion: 0' \
  -H 'ES-EventType: string' \
  -H 'ES-EventId: 0' \
  -H 'ES-RequiresMaster: true'

```

```http
POST https://eventstore.com/streams/{stream} HTTP/1.1
Host: eventstore.com
Content-Type: application/json

ES-ExpectedVersion: 0
ES-EventType: string
ES-EventId: 0
ES-RequiresMaster: true

```

```javascript
const inputBody = '{
  "body": {}
}';
const headers = {
  'Content-Type':'application/json',
  'ES-ExpectedVersion':'0',
  'ES-EventType':'string',
  'ES-EventId':'0',
  'ES-RequiresMaster':'true'
};

fetch('https://eventstore.com/streams/{stream}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'ES-ExpectedVersion' => '0',
  'ES-EventType' => 'string',
  'ES-EventId' => '0',
  'ES-RequiresMaster' => 'true'
}

result = RestClient.post 'https://eventstore.com/streams/{stream}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'ES-ExpectedVersion': '0',
  'ES-EventType': 'string',
  'ES-EventId': '0',
  'ES-RequiresMaster': 'true'
}

r = requests.post('https://eventstore.com/streams/{stream}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'ES-ExpectedVersion' => '0',
    'ES-EventType' => 'string',
    'ES-EventId' => '0',
    'ES-RequiresMaster' => 'true',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/streams/{stream}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "ES-ExpectedVersion": []string{"0"},
        "ES-EventType": []string{"string"},
        "ES-EventId": []string{"0"},
        "ES-RequiresMaster": []string{"true"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/streams/{stream}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /streams/{stream}`

*Write to a stream*

Write to a stream.

> Body parameter

```json
{
  "body": {}
}
```

<h3 id="write-to-a-stream-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The name of the stream|
|ES-ExpectedVersion|header|integer|false|Expected stream version|
|ES-EventType|header|string|false|The event type associated to a posted body|
|ES-EventId|header|integer|false|Event ID associated to a posted body|
|ES-RequiresMaster|header|boolean|false|Wether to run on a master node|
|body|body|[streamData](#schemastreamdata)|true|Stream events to create|

<h3 id="write-to-a-stream-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|New stream created|None|
|307|[Temporary Redirect](https://tools.ietf.org/html/rfc7231#section-6.4.7)|Temporary Redirect|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Write request body invalid|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete a stream

<a id="opIdDelete a stream"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE https://eventstore.com/streams/{stream}

```

```http
DELETE https://eventstore.com/streams/{stream} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/{stream}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete 'https://eventstore.com/streams/{stream}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('https://eventstore.com/streams/{stream}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','https://eventstore.com/streams/{stream}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "https://eventstore.com/streams/{stream}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /streams/{stream}`

*Deletes a stream*

Delete specified stream

<h3 id="delete-a-stream-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream ID to delete|

<h3 id="delete-a-stream-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Stream deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## Alternative stream URL

<a id="opIdAlternative stream URL"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/streams/{stream}/incoming/{guid}

```

```http
POST https://eventstore.com/streams/{stream}/incoming/{guid} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/{stream}/incoming/{guid}',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/streams/{stream}/incoming/{guid}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/streams/{stream}/incoming/{guid}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/streams/{stream}/incoming/{guid}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}/incoming/{guid}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/streams/{stream}/incoming/{guid}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /streams/{stream}/incoming/{guid}`

*An alternative URL to post events to*

A URL generated by Event Store if you don't supply an ID when creating a stream. You then use this URL to post events to.

<h3 id="alternative-stream-url-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The name of the stream|
|guid|path|string|true|Autogenerated UUID|

<h3 id="alternative-stream-url-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|New event created|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="success">
This operation does not require authentication
</aside>

## Read stream event

<a id="opIdRead stream event"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/streams/{stream}/{event}

```

```http
GET https://eventstore.com/streams/{stream}/{event} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/{stream}/{event}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/streams/{stream}/{event}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/streams/{stream}/{event}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/streams/{stream}/{event}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}/{event}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/streams/{stream}/{event}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /streams/{stream}/{event}`

*Read a stream event*

Reads a single event from a stream.

<h3 id="read-stream-event-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream ID|
|event|path|string|true|The event ID|
|embed|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="read-stream-event-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get {n} events

<a id="opIdGet {n} events"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/streams/{stream}/{event}/{count}

```

```http
GET https://eventstore.com/streams/{stream}/{event}/{count} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/{stream}/{event}/{count}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/streams/{stream}/{event}/{count}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/streams/{stream}/{event}/{count}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/streams/{stream}/{event}/{count}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}/{event}/{count}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/streams/{stream}/{event}/{count}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /streams/{stream}/{event}/{count}`

*Paginate backwards through stream events*

Paginate backwards though stream events by a specified amount.

<h3 id="get-{n}-events-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream ID|
|event|path|string|true|The event ID|
|count|path|integer(int64)|true|How many events to skip backwards from in the request.|
|embed|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="get-{n}-events-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Page back through events

<a id="opIdPage back through events"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/streams/{stream}/{event}/backward/{count}

```

```http
GET https://eventstore.com/streams/{stream}/{event}/backward/{count} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/{stream}/{event}/backward/{count}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/streams/{stream}/{event}/backward/{count}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/streams/{stream}/{event}/backward/{count}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/streams/{stream}/{event}/backward/{count}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}/{event}/backward/{count}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/streams/{stream}/{event}/backward/{count}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /streams/{stream}/{event}/backward/{count}`

*Paginate backwards through stream events*

Paginate backwards though stream events by a specified amount.

<h3 id="page-back-through-events-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream ID|
|event|path|string|true|The event ID|
|count|path|integer(int64)|true|How many events to skip backwards from in the request.|
|embed|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="page-back-through-events-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Page forward through events

<a id="opIdPage forward through events"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/streams/{stream}/{event}/forward/{count}

```

```http
GET https://eventstore.com/streams/{stream}/{event}/forward/{count} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/{stream}/{event}/forward/{count}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/streams/{stream}/{event}/forward/{count}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/streams/{stream}/{event}/forward/{count}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/streams/{stream}/{event}/forward/{count}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}/{event}/forward/{count}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/streams/{stream}/{event}/forward/{count}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /streams/{stream}/{event}/forward/{count}`

*Paginate forwards through stream events*

Paginate forwards though stream events by a specified amount.

<h3 id="page-forward-through-events-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream ID|
|event|path|string|true|The event ID|
|count|path|integer(int64)|true|How many events to skip forwards in the request.|
|embed|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="page-forward-through-events-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Read stream metadata

<a id="opIdRead stream metadata"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/streams/{stream}/metadata

```

```http
GET https://eventstore.com/streams/{stream}/metadata HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/{stream}/metadata',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/streams/{stream}/metadata',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/streams/{stream}/metadata')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/streams/{stream}/metadata', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}/metadata");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/streams/{stream}/metadata", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /streams/{stream}/metadata`

*Reads the metadata of a stream*

Returns metadata of a stream, typically information associated with an event that is not part of the event.

<h3 id="read-stream-metadata-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream ID|
|embed|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="read-stream-metadata-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update stream metadata

<a id="opIdUpdate stream metadata"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/streams/{stream}/metadata \
  -H 'Content-Type: application/json'

```

```http
POST https://eventstore.com/streams/{stream}/metadata HTTP/1.1
Host: eventstore.com
Content-Type: application/json

```

```javascript
const inputBody = '{
  "eventId": "string",
  "eventType": "string",
  "data": {
    "maxAge": 0,
    "maxCount": 0,
    "truncateBefore": 0,
    "cacheControl": "string",
    "acl": {
      "r": "string",
      "w": "string",
      "d": "string",
      "mr": "string",
      "mw": "string"
    }
  }
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://eventstore.com/streams/{stream}/metadata',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post 'https://eventstore.com/streams/{stream}/metadata',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('https://eventstore.com/streams/{stream}/metadata', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/streams/{stream}/metadata', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/{stream}/metadata");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/streams/{stream}/metadata", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /streams/{stream}/metadata`

*Update stream metadata*

Update the metadata of a stream.

> Body parameter

```json
{
  "eventId": "string",
  "eventType": "string",
  "data": {
    "maxAge": 0,
    "maxCount": 0,
    "truncateBefore": 0,
    "cacheControl": "string",
    "acl": {
      "r": "string",
      "w": "string",
      "d": "string",
      "mr": "string",
      "mw": "string"
    }
  }
}
```

<h3 id="update-stream-metadata-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The name of the stream|
|body|body|[StreamMetadataItem](#schemastreammetadataitem)|false|Metadata object|

<h3 id="update-stream-metadata-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|New stream created|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get all events

<a id="opIdGet all events"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/streams/$all

```

```http
GET https://eventstore.com/streams/$all HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/streams/$all',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/streams/$all',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/streams/$all')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/streams/$all', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/streams/$all");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/streams/$all", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /streams/$all`

*Returns all events from all streams*

Returns all events from all streams, you must provide user details.

<h3 id="get-all-events-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|embed|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="get-all-events-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="http-api-subscriptions">Subscriptions</h1>

Endpoints for Subscription operations

## Get all subscriptions

<a id="opIdGet all subscriptions"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/subscriptions

```

```http
GET https://eventstore.com/subscriptions HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/subscriptions',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/subscriptions')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/subscriptions', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/subscriptions", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /subscriptions`

*Get information for all subscriptions*

Returns all subscriptions from all streams.

<h3 id="get-all-subscriptions-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|New persistant subscription|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|bad input parameter|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get subscription stream information

<a id="opIdGet subscription stream information"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/subscriptions/{stream}

```

```http
GET https://eventstore.com/subscriptions/{stream} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/subscriptions/{stream}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/subscriptions/{stream}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/subscriptions/{stream}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/subscriptions/{stream}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /subscriptions/{stream}`

*Returns information about the subscriptions for a stream*

Needed

<h3 id="get-subscription-stream-information-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream name|

<h3 id="get-subscription-stream-information-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get subscription information

<a id="opIdGet subscription information"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/subscriptions/{stream}/{subscription}/info

```

```http
GET https://eventstore.com/subscriptions/{stream}/{subscription}/info HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}/info',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/subscriptions/{stream}/{subscription}/info',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/subscriptions/{stream}/{subscription}/info')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/subscriptions/{stream}/{subscription}/info', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}/info");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/subscriptions/{stream}/{subscription}/info", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /subscriptions/{stream}/{subscription}/info`

*Reads stream information via a persistent subscription*

Needed

<h3 id="get-subscription-information-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|

<h3 id="get-subscription-information-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get a stream

<a id="opIdGet a stream"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/subscriptions/{stream}/{subscription}

```

```http
GET https://eventstore.com/subscriptions/{stream}/{subscription} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/subscriptions/{stream}/{subscription}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/subscriptions/{stream}/{subscription}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/subscriptions/{stream}/{subscription}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/subscriptions/{stream}/{subscription}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /subscriptions/{stream}/{subscription}`

*Read a stream*

Read a specified stream by a persistent subscription.

<h3 id="get-a-stream-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|
|embed|query|string|false|Needed|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="get-a-stream-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update subscription

<a id="opIdUpdate subscription"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/subscriptions/{stream}/{subscription} \
  -H 'Content-Type: application/json'

```

```http
POST https://eventstore.com/subscriptions/{stream}/{subscription} HTTP/1.1
Host: eventstore.com
Content-Type: application/json

```

```javascript
const inputBody = '{
  "minCheckPointCount": 2,
  "startFrom": 0,
  "ResolveLinkTos": true,
  "readBatchSize": 5,
  "namedConsumerStrategy": "RoundRobin",
  "extraStatistics": true,
  "maxRetryCount": 7,
  "liveBufferSize": 1,
  "messageTimeoutMilliseconds": 3,
  "maxCheckPointCount": 2,
  "maxSubscriberCount": 9,
  "checkPointAfterMilliseconds": 6,
  "bufferSize": 5
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post 'https://eventstore.com/subscriptions/{stream}/{subscription}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('https://eventstore.com/subscriptions/{stream}/{subscription}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/subscriptions/{stream}/{subscription}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/subscriptions/{stream}/{subscription}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /subscriptions/{stream}/{subscription}`

*Update a persistant subscription*

You can edit the settings of an existing subscription while it is running. This will drop the current subscribers and will reset the subscription internally.

> Body parameter

```json
{
  "minCheckPointCount": 2,
  "startFrom": 0,
  "ResolveLinkTos": true,
  "readBatchSize": 5,
  "namedConsumerStrategy": "RoundRobin",
  "extraStatistics": true,
  "maxRetryCount": 7,
  "liveBufferSize": 1,
  "messageTimeoutMilliseconds": 3,
  "maxCheckPointCount": 2,
  "maxSubscriberCount": 9,
  "checkPointAfterMilliseconds": 6,
  "bufferSize": 5
}
```

<h3 id="update-subscription-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|
|body|body|[SubscriptionItem](#schemasubscriptionitem)|false|Subscription to create|

<h3 id="update-subscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Subscription updated|None|

<aside class="success">
This operation does not require authentication
</aside>

## Create subscription

<a id="opIdCreate subscription"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://eventstore.com/subscriptions/{stream}/{subscription} \
  -H 'Content-Type: application/json'

```

```http
PUT https://eventstore.com/subscriptions/{stream}/{subscription} HTTP/1.1
Host: eventstore.com
Content-Type: application/json

```

```javascript
const inputBody = '{
  "minCheckPointCount": 2,
  "startFrom": 0,
  "ResolveLinkTos": true,
  "readBatchSize": 5,
  "namedConsumerStrategy": "RoundRobin",
  "extraStatistics": true,
  "maxRetryCount": 7,
  "liveBufferSize": 1,
  "messageTimeoutMilliseconds": 3,
  "maxCheckPointCount": 2,
  "maxSubscriberCount": 9,
  "checkPointAfterMilliseconds": 6,
  "bufferSize": 5
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.put 'https://eventstore.com/subscriptions/{stream}/{subscription}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.put('https://eventstore.com/subscriptions/{stream}/{subscription}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://eventstore.com/subscriptions/{stream}/{subscription}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://eventstore.com/subscriptions/{stream}/{subscription}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /subscriptions/{stream}/{subscription}`

*Create a persistent subscription*

Before interacting with a subscription group, you need to create one. You will receive an error if you attempt to create a subscription group more than once. This requires [admin permissions](/v5/server/access-control-lists).

> Body parameter

```json
{
  "minCheckPointCount": 2,
  "startFrom": 0,
  "ResolveLinkTos": true,
  "readBatchSize": 5,
  "namedConsumerStrategy": "RoundRobin",
  "extraStatistics": true,
  "maxRetryCount": 7,
  "liveBufferSize": 1,
  "messageTimeoutMilliseconds": 3,
  "maxCheckPointCount": 2,
  "maxSubscriberCount": 9,
  "checkPointAfterMilliseconds": 6,
  "bufferSize": 5
}
```

<h3 id="create-subscription-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|
|body|body|[SubscriptionItem](#schemasubscriptionitem)|false|Subscription to create|

<h3 id="create-subscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Subscription created|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete subscription

<a id="opIdDelete subscription"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE https://eventstore.com/subscriptions/{stream}/{subscription}

```

```http
DELETE https://eventstore.com/subscriptions/{stream}/{subscription} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete 'https://eventstore.com/subscriptions/{stream}/{subscription}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('https://eventstore.com/subscriptions/{stream}/{subscription}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','https://eventstore.com/subscriptions/{stream}/{subscription}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "https://eventstore.com/subscriptions/{stream}/{subscription}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /subscriptions/{stream}/{subscription}`

*Deletes a subscription*

Deletes a subscription

<h3 id="delete-subscription-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|

<h3 id="delete-subscription-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get {n} subscription events

<a id="opIdGet {n} subscription events"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/subscriptions/{stream}/{subscription}/{count}

```

```http
GET https://eventstore.com/subscriptions/{stream}/{subscription}/{count} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}/{count}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/subscriptions/{stream}/{subscription}/{count}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/subscriptions/{stream}/{subscription}/{count}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/subscriptions/{stream}/{subscription}/{count}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}/{count}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/subscriptions/{stream}/{subscription}/{count}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /subscriptions/{stream}/{subscription}/{count}`

*Reads a stream via a persistent subscription and return a specific number of events*

Reads a stream via a persistent subscription and return a specific number of events

<h3 id="get-{n}-subscription-events-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|
|count|path|integer(int64)|true|How many events to return for the request.|
|embed|query|string|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|embed|None|
|embed|Content|
|embed|Rich|
|embed|Body|
|embed|PrettyBody|
|embed|TryHarder|

<h3 id="get-{n}-subscription-events-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

## Acknowledge a single message

<a id="opIdAcknowledge a single message"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/subscriptions/{stream}/{subscription}/ack/{messageid}

```

```http
POST https://eventstore.com/subscriptions/{stream}/{subscription}/ack/{messageid} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}/ack/{messageid}',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/subscriptions/{stream}/{subscription}/ack/{messageid}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/subscriptions/{stream}/{subscription}/ack/{messageid}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/subscriptions/{stream}/{subscription}/ack/{messageid}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}/ack/{messageid}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/subscriptions/{stream}/{subscription}/ack/{messageid}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /subscriptions/{stream}/{subscription}/ack/{messageid}`

*Acknowledge a single message*

Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If the client fails to respond in the given timeout period, the message will be retried. You should use the `rel` links in the feed for acknowledgements not bookmark URIs as they are subject to change in future versions.

<h3 id="acknowledge-a-single-message-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|
|messageid|path|string|true|The id of the message that needs to be acked|

<h3 id="acknowledge-a-single-message-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|New persistant subscription|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|bad input parameter|None|

<aside class="success">
This operation does not require authentication
</aside>

## Acknowledge multiple messages

<a id="opIdAcknowledge multiple messages"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/subscriptions/{stream}/{subscription}/ack

```

```http
POST https://eventstore.com/subscriptions/{stream}/{subscription}/ack HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}/ack',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/subscriptions/{stream}/{subscription}/ack',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/subscriptions/{stream}/{subscription}/ack')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/subscriptions/{stream}/{subscription}/ack', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}/ack");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/subscriptions/{stream}/{subscription}/ack", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /subscriptions/{stream}/{subscription}/ack`

*Acknowledge multiple messages*

Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If the client fails to respond in the given timeout period, the message will be retried. You should use the `rel` links in the feed for acknowledgements not bookmark URIs as they are subject to change in future versions.

<h3 id="acknowledge-multiple-messages-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|
|ids|query|string|false|The ids of the messages that need to be acked separated by commas|

<h3 id="acknowledge-multiple-messages-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|New persistant subscription|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|bad input parameter|None|

<aside class="success">
This operation does not require authentication
</aside>

## Don't acknowledge a single message

<a id="opIdDon't acknowledge a single message"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/subscriptions/{stream}/{subscription}/nack/{messageid}

```

```http
POST https://eventstore.com/subscriptions/{stream}/{subscription}/nack/{messageid} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}/nack/{messageid}',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/subscriptions/{stream}/{subscription}/nack/{messageid}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/subscriptions/{stream}/{subscription}/nack/{messageid}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/subscriptions/{stream}/{subscription}/nack/{messageid}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}/nack/{messageid}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/subscriptions/{stream}/{subscription}/nack/{messageid}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /subscriptions/{stream}/{subscription}/nack/{messageid}`

*Negative acknowledge a single message*

Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If the client fails to respond in the given timeout period, the message will be retried. You should use the `rel` links in the feed for acknowledgements not bookmark URIs as they are subject to change in future versions.

<h3 id="don't-acknowledge-a-single-message-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|
|messageid|path|string|true|The id of the message that needs to be nacked|
|action|query|string|false|<ul><li>**Park** - Don't retry the message, park it until a request is sent to reply the parked messages<li>**Retry** - Retry the message<li>**Skip** - Discard the message<li>**Stop** - Stop the subscription</ul>|

#### Enumerated Values

|Parameter|Value|
|---|---|
|action|Park|
|action|Retyr|
|action|Skip|
|action|Stop|

<h3 id="don't-acknowledge-a-single-message-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|New persistant subscription|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|bad input parameter|None|

<aside class="success">
This operation does not require authentication
</aside>

## Don't acknowledge multiple messages

<a id="opIdDon't acknowledge multiple messages"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/subscriptions/{stream}/{subscription}/nack

```

```http
POST https://eventstore.com/subscriptions/{stream}/{subscription}/nack HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}/nack',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/subscriptions/{stream}/{subscription}/nack',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/subscriptions/{stream}/{subscription}/nack')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/subscriptions/{stream}/{subscription}/nack', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}/nack");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/subscriptions/{stream}/{subscription}/nack", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /subscriptions/{stream}/{subscription}/nack`

*Negative acknowledge multiple messages*

Clients must acknowledge (or not acknowledge) messages in the competing consumer model. If the client fails to respond in the given timeout period, the message will be retried. You should use the `rel` links in the feed for acknowledgements not bookmark URIs as they are subject to change in future versions.

<h3 id="don't-acknowledge-multiple-messages-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|
|ids|query|string|false|The ids of the messages that need to be nacked separated by commas|
|action|query|string|false|<ul><li>**Park** - Don't retry the message, park it until a request is sent to reply the parked messages<li>**Retry** - Retry the message<li>**Skip** - Discard the message<li>**Stop** - Stop the subscription</ul>|

#### Enumerated Values

|Parameter|Value|
|---|---|
|action|Park|
|action|Retry|
|action|Skip|
|action|Stop|

<h3 id="don't-acknowledge-multiple-messages-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|New persistant subscription|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|bad input parameter|None|

<aside class="success">
This operation does not require authentication
</aside>

## Replay previously parked messages

<a id="opIdReplay previously parked messages"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/subscriptions/{stream}/{subscription}/replayParked

```

```http
POST https://eventstore.com/subscriptions/{stream}/{subscription}/replayParked HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/subscriptions/{stream}/{subscription}/replayParked',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/subscriptions/{stream}/{subscription}/replayParked',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/subscriptions/{stream}/{subscription}/replayParked')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/subscriptions/{stream}/{subscription}/replayParked', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/subscriptions/{stream}/{subscription}/replayParked");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/subscriptions/{stream}/{subscription}/replayParked", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /subscriptions/{stream}/{subscription}/replayParked`

*Replay any previously parked messages in a stream*

Replay any previously parked messages in a stream that were parked by a negative acknowledgement action.

<h3 id="replay-previously-parked-messages-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|stream|path|string|true|The stream the persistent subscription is on|
|subscription|path|string|true|The name of the subscription group|

<h3 id="replay-previously-parked-messages-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="http-api-projections">Projections</h1>

Endpoints for Projection operations

## Get all projections

<a id="opIdGet all projections"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projections/any

```

```http
GET https://eventstore.com/projections/any HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/any',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projections/any',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projections/any')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projections/any', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/any");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projections/any", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projections/any`

*Get all projections*

Returns all projections defined in Event Store.

<h3 id="get-all-projections-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get all non-transient projections

<a id="opIdGet all non-transient projections"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projections/all-non-transient

```

```http
GET https://eventstore.com/projections/all-non-transient HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/all-non-transient',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projections/all-non-transient',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projections/all-non-transient')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projections/all-non-transient', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/all-non-transient");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projections/all-non-transient", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projections/all-non-transient`

*Get all non-transient projections*

Returns all known projections except ad-hoc projections.

<h3 id="get-all-non-transient-projections-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get all queries

<a id="opIdGet all queries"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projections/onetime

```

```http
GET https://eventstore.com/projections/onetime HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/onetime',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projections/onetime',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projections/onetime')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projections/onetime', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/onetime");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projections/onetime", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projections/onetime`

*Get all queries*

Returns all queries defined in Event Store.

<h3 id="get-all-queries-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Create a onetime projection

<a id="opIdCreate a onetime projection"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/projections/onetime

```

```http
POST https://eventstore.com/projections/onetime HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/onetime',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/projections/onetime',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/projections/onetime')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/projections/onetime', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/onetime");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/projections/onetime", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /projections/onetime`

*Create a onetime projection*

Create a new onetime projection.

<h3 id="create-a-onetime-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|query|string|false|Name of the projection|
|type|query|string|false|The projection type|
|enabled|query|boolean|false|Is the projection enabled|
|checkpoints|query|boolean|false|Are checkpoints enabled|
|emit|query|boolean|false|Is emit enabled|
|trackemittedstreams|query|boolean|false|Should your projection create a separate stream and write any streams it emits to that stream.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|type|JS|

<h3 id="create-a-onetime-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|New projection created|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get all continious projections

<a id="opIdGet all continious projections"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projections/continuous

```

```http
GET https://eventstore.com/projections/continuous HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/continuous',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projections/continuous',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projections/continuous')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projections/continuous', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/continuous");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projections/continuous", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projections/continuous`

*Get all continious projections*

Returns all continually running projections defined in Event Store.

<h3 id="get-all-continious-projections-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Create a continious projection

<a id="opIdCreate a continious projection"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/projections/continuous

```

```http
POST https://eventstore.com/projections/continuous HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/continuous',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/projections/continuous',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/projections/continuous')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/projections/continuous', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/continuous");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/projections/continuous", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /projections/continuous`

*Create a continious projection*

Create a new continious projection.

<h3 id="create-a-continious-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|query|string|false|Name of the projection|
|enabled|query|boolean|false|Is the projection enabled|
|checkpoints|query|boolean|false|Are checkpoints enabled|
|emit|query|boolean|false|Is emit enabled|
|type|query|string|false|The projection type|
|trackemittedstreams|query|boolean|false|Should your projection create a separate stream and write any streams it emits to that stream.|

#### Enumerated Values

|Parameter|Value|
|---|---|
|type|JS|

<h3 id="create-a-continious-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|New projection created|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="success">
This operation does not require authentication
</aside>

## Read projection events based on a query

<a id="opIdRead projection events based on a query"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/projections/read-events

```

```http
POST https://eventstore.com/projections/read-events HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/read-events',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/projections/read-events',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/projections/read-events')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/projections/read-events', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/read-events");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/projections/read-events", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /projections/read-events`

*Read events from projection based on a query definition*

Read events from projection based on a query definition, i.e. fromAll, fromStream, fromStreams

<h3 id="read-projection-events-based-on-a-query-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get all transient projections

<a id="opIdGet all transient projections"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projections/transient

```

```http
GET https://eventstore.com/projections/transient HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/transient',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projections/transient',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projections/transient')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projections/transient', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/transient");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projections/transient", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projections/transient`

*Get all transient projections*

Returns all transient projections defined in Event Store.

<h3 id="get-all-transient-projections-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Create a transient projection

<a id="opIdCreate a transient projection"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/projections/transient

```

```http
POST https://eventstore.com/projections/transient HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projections/transient',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/projections/transient',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/projections/transient')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/projections/transient', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projections/transient");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/projections/transient", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /projections/transient`

*Create a transient projection*

Create a new transient projection.

<h3 id="create-a-transient-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|query|string|false|Name of the projection|
|type|query|string|false|The projection type|
|enabled|query|boolean|false|Is the projection enabled|

#### Enumerated Values

|Parameter|Value|
|---|---|
|type|JS|

<h3 id="create-a-transient-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|New user created|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get projection definition

<a id="opIdGet projection definition"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projection/{name}/query

```

```http
GET https://eventstore.com/projection/{name}/query HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/query',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projection/{name}/query',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projection/{name}/query')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projection/{name}/query', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/query");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projection/{name}/query", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projection/{name}/query`

*Get projection definition*

Returns definition of the specified projection.

<h3 id="get-projection-definition-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|
|config|query|boolean|false|Wether to return the projection definition config.|

<h3 id="get-projection-definition-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update projection definition

<a id="opIdUpdate projection definition"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://eventstore.com/projection/{name}/query

```

```http
PUT https://eventstore.com/projection/{name}/query HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/query',
{
  method: 'PUT'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.put 'https://eventstore.com/projection/{name}/query',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.put('https://eventstore.com/projection/{name}/query')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://eventstore.com/projection/{name}/query', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/query");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://eventstore.com/projection/{name}/query", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /projection/{name}/query`

*Update projection definition*

Update the specified projection definition.

<h3 id="update-projection-definition-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|
|type|query|string|false|The projection type|
|emit|query|boolean|false|Is emit enabled|

#### Enumerated Values

|Parameter|Value|
|---|---|
|type|JS|

<h3 id="update-projection-definition-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get the projection state

<a id="opIdGet the projection state"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projection/{name}/state

```

```http
GET https://eventstore.com/projection/{name}/state HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/state',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projection/{name}/state',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projection/{name}/state')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projection/{name}/state', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/state");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projection/{name}/state", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projection/{name}/state`

*Get the projection state*

Return the current state of the specified projection.

<h3 id="get-the-projection-state-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|
|partition|query|string|false|The partition name in state|

<h3 id="get-the-projection-state-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get result of projection

<a id="opIdGet result of projection"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projection/{name}/result

```

```http
GET https://eventstore.com/projection/{name}/result HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/result',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projection/{name}/result',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projection/{name}/result')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projection/{name}/result', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/result");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projection/{name}/result", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projection/{name}/result`

*Get result of projection*

Get the final result of a projection.

<h3 id="get-result-of-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|
|partition|query|string|false|The partition name in state|

<h3 id="get-result-of-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get projection statistics

<a id="opIdGet projection statistics"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projection/{name}/statistics

```

```http
GET https://eventstore.com/projection/{name}/statistics HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/statistics',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projection/{name}/statistics',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projection/{name}/statistics')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projection/{name}/statistics', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/statistics");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projection/{name}/statistics", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projection/{name}/statistics`

*Get projection statistics*

Returns the statistics for a projection, such as how many events, the status etc.

<h3 id="get-projection-statistics-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|

<h3 id="get-projection-statistics-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Disable projection

<a id="opIdDisable projection"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/projection/{name}/command/disable

```

```http
POST https://eventstore.com/projection/{name}/command/disable HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/command/disable',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/projection/{name}/command/disable',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/projection/{name}/command/disable')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/projection/{name}/command/disable', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/command/disable");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/projection/{name}/command/disable", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /projection/{name}/command/disable`

*Disable projection*

Disable the specified projection.

<h3 id="disable-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|
|enableRunAs|query|boolean|false|Run as the user issuing the command.|

<h3 id="disable-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Enable projection

<a id="opIdEnable projection"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/projection/{name}/command/enable

```

```http
POST https://eventstore.com/projection/{name}/command/enable HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/command/enable',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/projection/{name}/command/enable',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/projection/{name}/command/enable')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/projection/{name}/command/enable', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/command/enable");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/projection/{name}/command/enable", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /projection/{name}/command/enable`

*Enable projection*

Enable the specified projection.

<h3 id="enable-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|
|enableRunAs|query|boolean|false|Run as the user issuing the command.|

<h3 id="enable-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Reset projection

<a id="opIdReset projection"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/projection/{name}/command/reset

```

```http
POST https://eventstore.com/projection/{name}/command/reset HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/command/reset',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/projection/{name}/command/reset',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/projection/{name}/command/reset')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/projection/{name}/command/reset', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/command/reset");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/projection/{name}/command/reset", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /projection/{name}/command/reset`

*Reset projection*

Reset the specified projection.

<h3 id="reset-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|
|enableRunAs|query|boolean|false|Run as the user issuing the command.|

<h3 id="reset-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Abort projection

<a id="opIdAbort projection"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/projection/{name}/command/abort

```

```http
POST https://eventstore.com/projection/{name}/command/abort HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/command/abort',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/projection/{name}/command/abort',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/projection/{name}/command/abort')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/projection/{name}/command/abort', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/command/abort");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/projection/{name}/command/abort", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /projection/{name}/command/abort`

*Abort projection*

Abort the specified projection.

<h3 id="abort-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|
|enableRunAs|query|boolean|false|Run as the user issuing the command.|

<h3 id="abort-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get projection config

<a id="opIdGet projection config"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projection/{name}/config

```

```http
GET https://eventstore.com/projection/{name}/config HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/config',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projection/{name}/config',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projection/{name}/config')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projection/{name}/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projection/{name}/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projection/{name}/config`

*Get the config of a projection*

Returns the performance configuration of the specified projection.

<h3 id="get-projection-config-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|

<h3 id="get-projection-config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update projection config

<a id="opIdUpdate projection config"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://eventstore.com/projection/{name}/config

```

```http
PUT https://eventstore.com/projection/{name}/config HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}/config',
{
  method: 'PUT'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.put 'https://eventstore.com/projection/{name}/config',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.put('https://eventstore.com/projection/{name}/config')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://eventstore.com/projection/{name}/config', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}/config");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://eventstore.com/projection/{name}/config", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /projection/{name}/config`

*Update the config of a projection*

Update the performance configuration of the specified projection.

<h3 id="update-projection-config-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|

<h3 id="update-projection-config-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get a projection

<a id="opIdGet a projection"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/projection/{name}

```

```http
GET https://eventstore.com/projection/{name} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/projection/{name}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/projection/{name}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/projection/{name}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/projection/{name}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /projection/{name}`

*Get a projection*

Returns a specific projection.

<h3 id="get-a-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The name of the projection|

<h3 id="get-a-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete a projection

<a id="opIdDelete a projection"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE https://eventstore.com/projection/{name}

```

```http
DELETE https://eventstore.com/projection/{name} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/projection/{name}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete 'https://eventstore.com/projection/{name}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('https://eventstore.com/projection/{name}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','https://eventstore.com/projection/{name}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/projection/{name}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "https://eventstore.com/projection/{name}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /projection/{name}`

*Deletes a projection*

Deletes a projection

<h3 id="delete-a-projection-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|The projection to delete|
|deleteStateStream|query|boolean|false|TBD|
|deleteCheckpointStream|query|boolean|false|TBD|
|deleteEmittedStreams|query|boolean|false|TBD|

<h3 id="delete-a-projection-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Projection deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="http-api-admin">Admin</h1>

Endpoints for Admin operations

## Shutdown a node

<a id="opIdShutdown a node"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/admin/shutdown

```

```http
POST https://eventstore.com/admin/shutdown HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/admin/shutdown',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/admin/shutdown',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/admin/shutdown')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/admin/shutdown', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/admin/shutdown");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/admin/shutdown", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /admin/shutdown`

*Shutdown a node*

Issues a shut down command to a node.

<h3 id="shutdown-a-node-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
basicAuth
</aside>

## Scavenge a node

<a id="opIdScavenge a node"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/admin/scavenge

```

```http
POST https://eventstore.com/admin/scavenge HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/admin/scavenge',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/admin/scavenge',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/admin/scavenge')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/admin/scavenge', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/admin/scavenge");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/admin/scavenge", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /admin/scavenge`

*Scavenge a node*

Scavenge reclaims disk space by rewriting database chunks, minus the events to delete, and then deleting the old chunks.

<h3 id="scavenge-a-node-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|startFromChunk|query|integer|false|The chunk ID to start the scavenge operation from.|
|threads|query|integer|false|The number of threads to run the scavenge operation on (max 4).|

<h3 id="scavenge-a-node-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
basicAuth
</aside>

## Stop a scavenge

<a id="opIdStop a scavenge"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE https://eventstore.com/admin/scavenge/{scavengeId}

```

```http
DELETE https://eventstore.com/admin/scavenge/{scavengeId} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/admin/scavenge/{scavengeId}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete 'https://eventstore.com/admin/scavenge/{scavengeId}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('https://eventstore.com/admin/scavenge/{scavengeId}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','https://eventstore.com/admin/scavenge/{scavengeId}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/admin/scavenge/{scavengeId}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "https://eventstore.com/admin/scavenge/{scavengeId}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /admin/scavenge/{scavengeId}`

*Stop a scavenge operation*

Stop a running scavenge operation.

<h3 id="stop-a-scavenge-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|scavengeId|path|integer|true|The scavenge ID|

<h3 id="stop-a-scavenge-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
basicAuth
</aside>

## Merge Indexes

<a id="opIdMerge Indexes"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE https://eventstore.com/admin/mergeindexes

```

```http
DELETE https://eventstore.com/admin/mergeindexes HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/admin/mergeindexes',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete 'https://eventstore.com/admin/mergeindexes',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('https://eventstore.com/admin/mergeindexes')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','https://eventstore.com/admin/mergeindexes', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/admin/mergeindexes");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "https://eventstore.com/admin/mergeindexes", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /admin/mergeindexes`

*Merge indexes*

Manually merge indexes after a scavenge operation

<h3 id="merge-indexes-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
basicAuth
</aside>

<h1 id="http-api-info">Info</h1>

Endpoints for Info operations

## Get info for node

<a id="opIdGet info for node"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/info

```

```http
GET https://eventstore.com/info HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/info',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/info',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/info')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/info', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/info");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/info", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /info`

*Get info for node*

Returns information about node.

<h3 id="get-info-for-node-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
basicAuth
</aside>

## Get configuration for node

<a id="opIdGet configuration for node"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/info/options

```

```http
GET https://eventstore.com/info/options HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/info/options',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/info/options',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/info/options')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/info/options', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/info/options");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/info/options", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /info/options`

*Get configuration for node*

Returns configuration details about node.

<h3 id="get-configuration-for-node-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
basicAuth
</aside>

<h1 id="http-api-users">Users</h1>

Endpoints for User operations

## Get all users

<a id="opIdGet all users"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/users/

```

```http
GET https://eventstore.com/users/ HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/users/',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/users/',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/users/')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/users/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/users/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users/`

*Get all users*

Returns all users defined in Event Store.

<h3 id="get-all-users-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Create a user

<a id="opIdCreate a user"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/users/ \
  -H 'Content-Type: application/json'

```

```http
POST https://eventstore.com/users/ HTTP/1.1
Host: eventstore.com
Content-Type: application/json

```

```javascript
const inputBody = '{
  "LoginName": "admin",
  "FullName": "EventStore Admin",
  "Groups": [
    "Admin",
    "DataScience"
  ],
  "Password": "aVerySecurePassword"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://eventstore.com/users/',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post 'https://eventstore.com/users/',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('https://eventstore.com/users/', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/users/', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/users/", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users/`

*Create a User*

Create a new user.

> Body parameter

```json
{
  "LoginName": "admin",
  "FullName": "EventStore Admin",
  "Groups": [
    "Admin",
    "DataScience"
  ],
  "Password": "aVerySecurePassword"
}
```

<h3 id="create-a-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[UserItem](#schemauseritem)|false|User to create|

<h3 id="create-a-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|New user created|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|
|401|[Unauthorized](https://tools.ietf.org/html/rfc7235#section-3.1)|Unauthorized|None|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
basicAuth
</aside>

## Get a user

<a id="opIdGet a user"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/users/{login}

```

```http
GET https://eventstore.com/users/{login} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/users/{login}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/users/{login}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/users/{login}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/users/{login}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/{login}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/users/{login}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /users/{login}`

*Get user*

Returns the user currently authenticated with the API, or the user specified.

<h3 id="get-a-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|login|path|string|true|The user passed to the API call.|

<h3 id="get-a-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update a user

<a id="opIdUpdate a user"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://eventstore.com/users/{login} \
  -H 'Content-Type: application/json'

```

```http
PUT https://eventstore.com/users/{login} HTTP/1.1
Host: eventstore.com
Content-Type: application/json

```

```javascript
const inputBody = '{
  "FullName": "EventStore Admin",
  "Groups": [
    "Admin",
    "DataScience"
  ]
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://eventstore.com/users/{login}',
{
  method: 'PUT',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.put 'https://eventstore.com/users/{login}',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.put('https://eventstore.com/users/{login}', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://eventstore.com/users/{login}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/{login}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://eventstore.com/users/{login}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/{login}`

*Update specified user*

Update the FullName of Groups of the specified user.

> Body parameter

```json
{
  "FullName": "EventStore Admin",
  "Groups": [
    "Admin",
    "DataScience"
  ]
}
```

<h3 id="update-a-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|login|path|string|true|The user's name|
|body|body|[UserUpdateItem](#schemauserupdateitem)|false|User to update|

<h3 id="update-a-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Delete a user

<a id="opIdDelete a user"></a>

> Code samples

```shell
# You can also use wget
curl -X DELETE https://eventstore.com/users/{login}

```

```http
DELETE https://eventstore.com/users/{login} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/users/{login}',
{
  method: 'DELETE'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.delete 'https://eventstore.com/users/{login}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.delete('https://eventstore.com/users/{login}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','https://eventstore.com/users/{login}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/{login}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "https://eventstore.com/users/{login}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /users/{login}`

*Deletes a user*

Delete specified user.

<h3 id="delete-a-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|login|path|string|true|The user's name|

<h3 id="delete-a-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|User deleted|None|

<aside class="success">
This operation does not require authentication
</aside>

## Enable a user

<a id="opIdEnable a user"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://eventstore.com/users/{login}/command/enable

```

```http
PUT https://eventstore.com/users/{login}/command/enable HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/users/{login}/command/enable',
{
  method: 'PUT'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.put 'https://eventstore.com/users/{login}/command/enable',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.put('https://eventstore.com/users/{login}/command/enable')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://eventstore.com/users/{login}/command/enable', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/{login}/command/enable");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://eventstore.com/users/{login}/command/enable", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/{login}/command/enable`

*Enable the specified user*

Enable the acount of the specified user.

<h3 id="enable-a-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|login|path|string|true|The user's name|

<h3 id="enable-a-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Disable a user

<a id="opIdDisable a user"></a>

> Code samples

```shell
# You can also use wget
curl -X PUT https://eventstore.com/users/{login}/command/disable

```

```http
PUT https://eventstore.com/users/{login}/command/disable HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/users/{login}/command/disable',
{
  method: 'PUT'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.put 'https://eventstore.com/users/{login}/command/disable',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.put('https://eventstore.com/users/{login}/command/disable')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PUT','https://eventstore.com/users/{login}/command/disable', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/{login}/command/disable");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PUT");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PUT", "https://eventstore.com/users/{login}/command/disable", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PUT /users/{login}/command/disable`

*Disable the specified user*

Disable the acount of the specified user.

<h3 id="disable-a-user-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|login|path|string|true|The user's name|

<h3 id="disable-a-user-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Reset password

<a id="opIdReset password"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/users/{login}/command/reset-password \
  -H 'Content-Type: application/json'

```

```http
POST https://eventstore.com/users/{login}/command/reset-password HTTP/1.1
Host: eventstore.com
Content-Type: application/json

```

```javascript
const inputBody = '{
  "NewPassword": "aNewSecurePassword"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://eventstore.com/users/{login}/command/reset-password',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post 'https://eventstore.com/users/{login}/command/reset-password',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('https://eventstore.com/users/{login}/command/reset-password', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/users/{login}/command/reset-password', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/{login}/command/reset-password");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/users/{login}/command/reset-password", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users/{login}/command/reset-password`

*Reset user password*

Reset the password of the specified user.

> Body parameter

```json
{
  "NewPassword": "aNewSecurePassword"
}
```

<h3 id="reset-password-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|login|path|string|true|The user's name|
|body|body|[PasswordResetItem](#schemapasswordresetitem)|true|The new password for the user|

<h3 id="reset-password-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="success">
This operation does not require authentication
</aside>

## Change password

<a id="opIdChange password"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/users/{login}/command/change-password \
  -H 'Content-Type: application/json'

```

```http
POST https://eventstore.com/users/{login}/command/change-password HTTP/1.1
Host: eventstore.com
Content-Type: application/json

```

```javascript
const inputBody = '{
  "CurrentPassword": "anOldSecurePassword",
  "NewPassword": "aNewSecurePassword"
}';
const headers = {
  'Content-Type':'application/json'
};

fetch('https://eventstore.com/users/{login}/command/change-password',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json'
}

result = RestClient.post 'https://eventstore.com/users/{login}/command/change-password',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json'
}

r = requests.post('https://eventstore.com/users/{login}/command/change-password', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/users/{login}/command/change-password', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/users/{login}/command/change-password");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/users/{login}/command/change-password", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /users/{login}/command/change-password`

*Change user password*

Change the password of the specified user.

> Body parameter

```json
{
  "CurrentPassword": "anOldSecurePassword",
  "NewPassword": "aNewSecurePassword"
}
```

<h3 id="change-password-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|login|path|string|true|The user's name|
|body|body|[PasswordChangeItem](#schemapasswordchangeitem)|true|The new password for the user|

<h3 id="change-password-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Bad request|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="http-api-stats">Stats</h1>

Endpoints for Statistics operations

<a href="http://docs.my-api.com/pet-operations.htm">External documentation</a>

## Get all stats

<a id="opIdGet all stats"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/stats \
  -H 'Accept: application/json'

```

```http
GET https://eventstore.com/stats HTTP/1.1
Host: eventstore.com
Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('https://eventstore.com/stats',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get 'https://eventstore.com/stats',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('https://eventstore.com/stats', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/stats', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/stats");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/stats", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /stats`

*Get all stats*

Returns all stats enabled for Event Store.

> Example responses

> 200 Response

```json
{
  "proc": {
    "startTime": "string",
    "id": 0,
    "mem": 0,
    "cpu": 0,
    "cpuScaled": 0,
    "threadsCount": 0,
    "contentionsRate": 0,
    "thrownExceptionsRate": 0,
    "gc": {
      "allocationSpeed": 0,
      "gen0ItemsCount": 0,
      "gen0Size": 0,
      "gen1ItemsCount": 0,
      "gen1Size": 0,
      "gen2ItemsCount": 0,
      "gen2Size": 0,
      "largeHeapSize": 0,
      "timeInGc": 0,
      "totalBytesInHeaps": 0
    },
    "diskIo": {
      "readBytes": 0,
      "writtenBytes": 0,
      "readOps": 0,
      "writeOps": 0
    },
    "tcp": {
      "connections": 0,
      "receivingSpeed": "string",
      "sendingSpeed": 0,
      "inSend": 0,
      "measureTime": 0,
      "pendingReceived": 0,
      "pendingSend": 0,
      "receivedBytesSinceLastRun": 0,
      "receivedBytesTotal": 0,
      "sentBytesSinceLastRun": 0,
      "sentBytesTotal": 0
    }
  },
  "sys": {
    "cpu": 0,
    "freeMem": 0,
    "drive": {
      "driveName": {
        "availableBytes": 0,
        "totalBytes": 0,
        "usage": 0,
        "usedBytes": 0
      }
    }
  },
  "es": {
    "checksum": 0,
    "checksumNonFlushed": 0,
    "queue": {
      "queueName": "string",
      "groupName": "string",
      "avgItemsPerSecond": 0,
      "avgProcessingTime": 0,
      "currentIdleTime": "string",
      "currentItemProcessingTime": "string",
      "idleTimePercent": 0,
      "length": 0,
      "lengthCurrentTryPeak": 0,
      "lengthLifetimePeak": 0,
      "totalItemsProcessed": 0,
      "inProgressMessage": "string",
      "lastProcessedMessage": "string"
    },
    "writer": {
      "lastFlushSize": 0,
      "lastFlushDelayMs": 0,
      "meanFlushSize": 0,
      "meanFlushDelayMs": 0,
      "maxFlushSize": 0,
      "maxFlushDelayMs": 0,
      "queuedFlushMessages": 0
    },
    "readIndex": {
      "cachedRecord": 0,
      "notCachedRecord": 0,
      "cachedStreamInfo": 0,
      "notCachedStreamInfo": 0,
      "cachedTransInfo": 0,
      "notCachedTransInfo": 0,
      "hashCollisions": 0
    }
  }
}
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Stats>
  <proc>
    <startTime>string</startTime>
    <id>0</id>
    <mem>0</mem>
    <cpu>0</cpu>
    <cpuScaled>0</cpuScaled>
    <threadsCount>0</threadsCount>
    <contentionsRate>0</contentionsRate>
    <thrownExceptionsRate>0</thrownExceptionsRate>
    <gc>
      <allocationSpeed>0</allocationSpeed>
      <gen0ItemsCount>0</gen0ItemsCount>
      <gen0Size>0</gen0Size>
      <gen1ItemsCount>0</gen1ItemsCount>
      <gen1Size>0</gen1Size>
      <gen2ItemsCount>0</gen2ItemsCount>
      <gen2Size>0</gen2Size>
      <largeHeapSize>0</largeHeapSize>
      <timeInGc>0</timeInGc>
      <totalBytesInHeaps>0</totalBytesInHeaps>
    </gc>
    <diskIo>
      <readBytes>0</readBytes>
      <writtenBytes>0</writtenBytes>
      <readOps>0</readOps>
      <writeOps>0</writeOps>
    </diskIo>
    <tcp>
      <connections>0</connections>
      <receivingSpeed>string</receivingSpeed>
      <sendingSpeed>0</sendingSpeed>
      <inSend>0</inSend>
      <measureTime>0</measureTime>
      <pendingReceived>0</pendingReceived>
      <pendingSend>0</pendingSend>
      <receivedBytesSinceLastRun>0</receivedBytesSinceLastRun>
      <receivedBytesTotal>0</receivedBytesTotal>
      <sentBytesSinceLastRun>0</sentBytesSinceLastRun>
      <sentBytesTotal>0</sentBytesTotal>
    </tcp>
  </proc>
  <sys>
    <cpu>0</cpu>
    <freeMem>0</freeMem>
    <drive>
      <driveName>
        <availableBytes>0</availableBytes>
        <totalBytes>0</totalBytes>
        <usage>0</usage>
        <usedBytes>0</usedBytes>
      </driveName>
    </drive>
  </sys>
  <es>
    <checksum>0</checksum>
    <checksumNonFlushed>0</checksumNonFlushed>
    <queue>
      <queueName>string</queueName>
      <groupName>string</groupName>
      <avgItemsPerSecond>0</avgItemsPerSecond>
      <avgProcessingTime>0</avgProcessingTime>
      <currentIdleTime>string</currentIdleTime>
      <currentItemProcessingTime>string</currentItemProcessingTime>
      <idleTimePercent>0</idleTimePercent>
      <length>0</length>
      <lengthCurrentTryPeak>0</lengthCurrentTryPeak>
      <lengthLifetimePeak>0</lengthLifetimePeak>
      <totalItemsProcessed>0</totalItemsProcessed>
      <inProgressMessage>string</inProgressMessage>
      <lastProcessedMessage>string</lastProcessedMessage>
    </queue>
    <writer>
      <lastFlushSize>0</lastFlushSize>
      <lastFlushDelayMs>0</lastFlushDelayMs>
      <meanFlushSize>0</meanFlushSize>
      <meanFlushDelayMs>0</meanFlushDelayMs>
      <maxFlushSize>0</maxFlushSize>
      <maxFlushDelayMs>0</maxFlushDelayMs>
      <queuedFlushMessages>0</queuedFlushMessages>
    </writer>
    <readIndex>
      <cachedRecord>0</cachedRecord>
      <notCachedRecord>0</notCachedRecord>
      <cachedStreamInfo>0</cachedStreamInfo>
      <notCachedStreamInfo>0</notCachedStreamInfo>
      <cachedTransInfo>0</cachedTransInfo>
      <notCachedTransInfo>0</notCachedTransInfo>
      <hashCollisions>0</hashCollisions>
    </readIndex>
  </es>
</Stats>
```

<h3 id="get-all-stats-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|A list of stats|[Stats](#schemastats)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Get specified stat

<a id="opIdGet specified stat"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/stats/{statPath}

```

```http
GET https://eventstore.com/stats/{statPath} HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/stats/{statPath}',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/stats/{statPath}',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/stats/{statPath}')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/stats/{statPath}', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/stats/{statPath}");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/stats/{statPath}", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /stats/{statPath}`

*Get stats sub path*

Returns the sub path of the Event Store statistics available.

<h3 id="get-specified-stat-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|statPath|path|string|true|The stats sub path|

<h3 id="get-specified-stat-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="http-api-gossip">Gossip</h1>

## Return Gossip details

<a id="opIdReturn Gossip details"></a>

> Code samples

```shell
# You can also use wget
curl -X GET https://eventstore.com/gossip

```

```http
GET https://eventstore.com/gossip HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/gossip',
{
  method: 'GET'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.get 'https://eventstore.com/gossip',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.get('https://eventstore.com/gossip')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','https://eventstore.com/gossip', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/gossip");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "https://eventstore.com/gossip", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /gossip`

*Return Gossip details for cluster*

Return Gossip details for nodes in cluster.

<h3 id="return-gossip-details-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

## Update Gossip details

<a id="opIdUpdate Gossip details"></a>

> Code samples

```shell
# You can also use wget
curl -X POST https://eventstore.com/gossip

```

```http
POST https://eventstore.com/gossip HTTP/1.1
Host: eventstore.com

```

```javascript

fetch('https://eventstore.com/gossip',
{
  method: 'POST'

})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

result = RestClient.post 'https://eventstore.com/gossip',
  params: {
  }

p JSON.parse(result)

```

```python
import requests

r = requests.post('https://eventstore.com/gossip')

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','https://eventstore.com/gossip', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("https://eventstore.com/gossip");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "https://eventstore.com/gossip", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /gossip`

*Update Gossip details for cluster*

Update Gossip details for nodes in a cluster.

<h3 id="update-gossip-details-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|OK|None|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Not found|None|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_UserItem">UserItem</h2>
<!-- backwards compatibility -->
<a id="schemauseritem"></a>
<a id="schema_UserItem"></a>
<a id="tocSuseritem"></a>
<a id="tocsuseritem"></a>

```json
{
  "LoginName": "admin",
  "FullName": "EventStore Admin",
  "Groups": [
    "Admin",
    "DataScience"
  ],
  "Password": "aVerySecurePassword"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|LoginName|string|false|none|The new users login name.|
|FullName|string|false|none|The full name for the new user.|
|Groups|[string]|false|none|The groups the new user is a member of.|
|Password|string|false|none|The password for the new user.|

<h2 id="tocS_UserUpdateItem">UserUpdateItem</h2>
<!-- backwards compatibility -->
<a id="schemauserupdateitem"></a>
<a id="schema_UserUpdateItem"></a>
<a id="tocSuserupdateitem"></a>
<a id="tocsuserupdateitem"></a>

```json
{
  "FullName": "EventStore Admin",
  "Groups": [
    "Admin",
    "DataScience"
  ]
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|FullName|string|false|none|The full name of the new user.|
|Groups|[string]|false|none|The groups the new user should become a member of.|

<h2 id="tocS_PasswordResetItem">PasswordResetItem</h2>
<!-- backwards compatibility -->
<a id="schemapasswordresetitem"></a>
<a id="schema_PasswordResetItem"></a>
<a id="tocSpasswordresetitem"></a>
<a id="tocspasswordresetitem"></a>

```json
{
  "NewPassword": "aNewSecurePassword"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|NewPassword|string|false|none|The new password for the user|

<h2 id="tocS_PasswordChangeItem">PasswordChangeItem</h2>
<!-- backwards compatibility -->
<a id="schemapasswordchangeitem"></a>
<a id="schema_PasswordChangeItem"></a>
<a id="tocSpasswordchangeitem"></a>
<a id="tocspasswordchangeitem"></a>

```json
{
  "CurrentPassword": "anOldSecurePassword",
  "NewPassword": "aNewSecurePassword"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|CurrentPassword|string|false|none|The current password for the user|
|NewPassword|string|false|none|The new password for the user|

<h2 id="tocS_streamData">streamData</h2>
<!-- backwards compatibility -->
<a id="schemastreamdata"></a>
<a id="schema_streamData"></a>
<a id="tocSstreamdata"></a>
<a id="tocsstreamdata"></a>

```json
{
  "body": {}
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|body|object|true|none|Event data|

<h2 id="tocS_StreamItem">StreamItem</h2>
<!-- backwards compatibility -->
<a id="schemastreamitem"></a>
<a id="schema_StreamItem"></a>
<a id="tocSstreamitem"></a>
<a id="tocsstreamitem"></a>

```json
{
  "minCheckPointCount": 2,
  "startFrom": 0,
  "ResolveLinkTos": true,
  "readBatchSize": 5,
  "namedConsumerStrategy": "RoundRobin",
  "extraStatistics": true,
  "maxRetryCount": 7,
  "liveBufferSize": 1,
  "messageTimeoutMilliseconds": 3,
  "maxCheckPointCount": 2,
  "maxSubscriberCount": 9,
  "checkPointAfterMilliseconds": 6,
  "bufferSize": 5
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ResolveLinkTos|boolean|false|none|Whether to resolve link events|
|startFrom|integer(int64)|false|none|Which event position in the stream the subscription should start from|
|extraStatistics|boolean|false|none|Whether to track latency statistics on this subscription|
|checkPointAfterMilliseconds|integer(int64)|false|none|The amount of time to try to checkpoint after|
|liveBufferSize|integer(int64)|false|none|The size of the buffer (in-memory) listening to live messages as they happen before paging occurs|
|readBatchSize|integer(int64)|false|none|The number of events to read per batch when reading the history|
|bufferSize|integer(int64)|false|none|The number of events to cache when paging through history|
|maxCheckPointCount|integer(int64)|false|none|The maximum number of messages not checkpointed before forcing a checkpoint|
|maxRetryCount|integer(int64)|false|none|The maximum number of retries (due to timeout) before a message is considered to be parked|
|maxSubscriberCount|integer(int64)|false|none|The maximum number of TCP subscribers allowed|
|messageTimeoutMilliseconds|integer(int64)|false|none|The amount of time after which to consider a message as timedout and retried|
|minCheckPointCount|integer(int64)|false|none|The minimum number of messages to write to a checkpoint|
|namedConsumerStrategy|string|false|none|The strategy to use for distributing events to client consumers|

#### Enumerated Values

|Property|Value|
|---|---|
|namedConsumerStrategy|RoundRobin|
|namedConsumerStrategy|DispatchToSingle|
|namedConsumerStrategy|Pinned|

<h2 id="tocS_StreamMetadataItem">StreamMetadataItem</h2>
<!-- backwards compatibility -->
<a id="schemastreammetadataitem"></a>
<a id="schema_StreamMetadataItem"></a>
<a id="tocSstreammetadataitem"></a>
<a id="tocsstreammetadataitem"></a>

```json
{
  "eventId": "string",
  "eventType": "string",
  "data": {
    "maxAge": 0,
    "maxCount": 0,
    "truncateBefore": 0,
    "cacheControl": "string",
    "acl": {
      "r": "string",
      "w": "string",
      "d": "string",
      "mr": "string",
      "mw": "string"
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|eventId|string|false|none|Alphanumeric ID|
|eventType|string|false|none|The type of event|
|data|[StreamMetadataItem_data](#schemastreammetadataitem_data)|false|none|none|

<h2 id="tocS_SubscriptionItem">SubscriptionItem</h2>
<!-- backwards compatibility -->
<a id="schemasubscriptionitem"></a>
<a id="schema_SubscriptionItem"></a>
<a id="tocSsubscriptionitem"></a>
<a id="tocssubscriptionitem"></a>

```json
{
  "minCheckPointCount": 2,
  "startFrom": 0,
  "ResolveLinkTos": true,
  "readBatchSize": 5,
  "namedConsumerStrategy": "RoundRobin",
  "extraStatistics": true,
  "maxRetryCount": 7,
  "liveBufferSize": 1,
  "messageTimeoutMilliseconds": 3,
  "maxCheckPointCount": 2,
  "maxSubscriberCount": 9,
  "checkPointAfterMilliseconds": 6,
  "bufferSize": 5
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ResolveLinkTos|boolean|false|none|Whether to resolve link events|
|startFrom|integer(int64)|false|none|Which event position in the stream the subscription should start from|
|extraStatistics|boolean|false|none|Whether to track latency statistics on this subscription|
|checkPointAfterMilliseconds|integer(int64)|false|none|The amount of time to try to checkpoint after|
|liveBufferSize|integer(int64)|false|none|The size of the buffer (in-memory) listening to live messages as they happen before paging occurs|
|readBatchSize|integer(int64)|false|none|The number of events to read per batch when reading the history|
|bufferSize|integer(int64)|false|none|The number of events to cache when paging through history|
|maxCheckPointCount|integer(int64)|false|none|The maximum number of messages not checkpointed before forcing a checkpoint|
|maxRetryCount|integer(int64)|false|none|The maximum number of retries (due to timeout) before a message is considered to be parked|
|maxSubscriberCount|integer(int64)|false|none|The maximum number of TCP subscribers allowed|
|messageTimeoutMilliseconds|integer(int64)|false|none|The amount of time after which to consider a message as timedout and retried|
|minCheckPointCount|integer(int64)|false|none|The minimum number of messages to write to a checkpoint|
|namedConsumerStrategy|string|false|none|The strategy to use for distributing events to client consumers|

#### Enumerated Values

|Property|Value|
|---|---|
|namedConsumerStrategy|RoundRobin|
|namedConsumerStrategy|DispatchToSingle|
|namedConsumerStrategy|Pinned|

<h2 id="tocS_StreamMetadataItem_data">StreamMetadataItem_data</h2>
<!-- backwards compatibility -->
<a id="schemastreammetadataitem_data"></a>
<a id="schema_StreamMetadataItem_data"></a>
<a id="tocSstreammetadataitem_data"></a>
<a id="tocsstreammetadataitem_data"></a>

```json
{
  "maxAge": 0,
  "maxCount": 0,
  "truncateBefore": 0,
  "cacheControl": "string",
  "acl": {
    "r": "string",
    "w": "string",
    "d": "string",
    "mr": "string",
    "mw": "string"
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|maxAge|integer|false|none|The maximum age of events in the stream|
|maxCount|integer|false|none|The maximum count of events in the stream|
|truncateBefore|integer|false|none|Events prior to this event are truncated and removed|
|cacheControl|string|false|none|Period of time to make feed head cacheable|
|acl|object|false|none|Access control list for this stream|
|» r|string|false|none|Read roles|
|» w|string|false|none|Write roles|
|» d|string|false|none|Delete roles|
|» mr|string|false|none|Metadata read roles|
|» mw|string|false|none|Metadata write roles|

<h2 id="tocS_Stats">Stats</h2>
<!-- backwards compatibility -->
<a id="schemastats"></a>
<a id="schema_Stats"></a>
<a id="tocSstats"></a>
<a id="tocsstats"></a>

```json
{
  "proc": {
    "startTime": "string",
    "id": 0,
    "mem": 0,
    "cpu": 0,
    "cpuScaled": 0,
    "threadsCount": 0,
    "contentionsRate": 0,
    "thrownExceptionsRate": 0,
    "gc": {
      "allocationSpeed": 0,
      "gen0ItemsCount": 0,
      "gen0Size": 0,
      "gen1ItemsCount": 0,
      "gen1Size": 0,
      "gen2ItemsCount": 0,
      "gen2Size": 0,
      "largeHeapSize": 0,
      "timeInGc": 0,
      "totalBytesInHeaps": 0
    },
    "diskIo": {
      "readBytes": 0,
      "writtenBytes": 0,
      "readOps": 0,
      "writeOps": 0
    },
    "tcp": {
      "connections": 0,
      "receivingSpeed": "string",
      "sendingSpeed": 0,
      "inSend": 0,
      "measureTime": 0,
      "pendingReceived": 0,
      "pendingSend": 0,
      "receivedBytesSinceLastRun": 0,
      "receivedBytesTotal": 0,
      "sentBytesSinceLastRun": 0,
      "sentBytesTotal": 0
    }
  },
  "sys": {
    "cpu": 0,
    "freeMem": 0,
    "drive": {
      "driveName": {
        "availableBytes": 0,
        "totalBytes": 0,
        "usage": 0,
        "usedBytes": 0
      }
    }
  },
  "es": {
    "checksum": 0,
    "checksumNonFlushed": 0,
    "queue": {
      "queueName": "string",
      "groupName": "string",
      "avgItemsPerSecond": 0,
      "avgProcessingTime": 0,
      "currentIdleTime": "string",
      "currentItemProcessingTime": "string",
      "idleTimePercent": 0,
      "length": 0,
      "lengthCurrentTryPeak": 0,
      "lengthLifetimePeak": 0,
      "totalItemsProcessed": 0,
      "inProgressMessage": "string",
      "lastProcessedMessage": "string"
    },
    "writer": {
      "lastFlushSize": 0,
      "lastFlushDelayMs": 0,
      "meanFlushSize": 0,
      "meanFlushDelayMs": 0,
      "maxFlushSize": 0,
      "maxFlushDelayMs": 0,
      "queuedFlushMessages": 0
    },
    "readIndex": {
      "cachedRecord": 0,
      "notCachedRecord": 0,
      "cachedStreamInfo": 0,
      "notCachedStreamInfo": 0,
      "cachedTransInfo": 0,
      "notCachedTransInfo": 0,
      "hashCollisions": 0
    }
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|proc|object|false|none|Stats on the currently active process|
|» startTime|string|false|none|Time the associated process started|
|» id|integer|false|none|Id of the associated process|
|» mem|integer|false|none|Virtual memory used by the associated process|
|» cpu|number|false|none|CPU usage of the process|
|» cpuScaled|number|false|none|CPU usage of the process scaled by logical processor count|
|» threadsCount|integer|false|none|Number of threads used by process|
|» contentionsRate|number|false|none|The rate at which threads in the process attempt to acquire a managed lock unsuccessfully|
|» thrownExceptionsRate|number|false|none|Number of exceptions thrown per second|
|» gc|object|false|none|Stats on garbage collection|
|»» allocationSpeed|number|false|none|Memory allocation speed|
|»» gen0ItemsCount|number|false|none|Number of generation 0 garbage collections|
|»» gen0Size|number|false|none|Generation 0 heap size|
|»» gen1ItemsCount|number|false|none|Number of generation 1 garbage collections|
|»» gen1Size|number|false|none|Generation 1 heap size|
|»» gen2ItemsCount|number|false|none|Number of generation 2 garbage collections|
|»» gen2Size|number|false|none|Generation 2 heap size|
|»» largeHeapSize|number|false|none|Large object heap size|
|»» timeInGc|number|false|none|Percentage of time in garbage collection|
|»» totalBytesInHeaps|number|false|none|Total bytes in all heaps|
|» diskIo|object|false|none|Disk input and output stats|
|»» readBytes|number|false|none|The number of bytes read by Event Store since server start|
|»» writtenBytes|number|false|none|The number of bytes written by Event Store since server start|
|»» readOps|number|false|none|The number of read operations by Event Store since server start|
|»» writeOps|number|false|none|The number of write operations by Event Store since server start|
|» tcp|object|false|none|TCP connection stats|
|»» connections|integer|false|none|Number of TCP connections to Event Store|
|»» receivingSpeed|string|false|none|Receiving speed in bytes per second|
|»» sendingSpeed|number|false|none|Sending speed in bytes per second|
|»» inSend|number|false|none|Number of bytes sent to connections but not yet acknowledged by the receiving party|
|»» measureTime|number|false|none|Time elapsed since last stats read|
|»» pendingReceived|number|false|none|Number of bytes waiting to be received by connections|
|»» pendingSend|number|false|none|Number of bytes waiting to be sent to connections|
|»» receivedBytesSinceLastRun|number|false|none|Total bytes received by TCP connections since last run|
|»» receivedBytesTotal|number|false|none|Total bytes received by TCP connections|
|»» sentBytesSinceLastRun|number|false|none|Total bytes sent to TCP connections since last run|
|»» sentBytesTotal|number|false|none|Total bytes sent from TCP connections|
|sys|object|false|none|System usage stats|
|» cpu|number|false|none|Total CPU usage in percentage|
|» freeMem|number|false|none|Free memory in bytes|
|» drive|object|false|none|Drive usage stats|
|»» driveName|object|false|none|Drive path|
|»»» availableBytes|number|false|none|Remaining bytes of space available to Event Store|
|»»» totalBytes|number|false|none|Total bytes of space available to Event Store|
|»»» usage|number|false|none|Percentage usage of space used by Event Store|
|»»» usedBytes|number|false|none|Total bytes of space used by Event Store|
|es|object|false|none|none|
|» checksum|number|false|none|none|
|» checksumNonFlushed|number|false|none|none|
|» queue|object|false|none|Multiple queue instance stats|
|»» queueName|string|false|none|Queue name|
|»» groupName|string|false|none|Group queue is a member of|
|»» avgItemsPerSecond|integer|false|none|The average number of items processed per second by the queue|
|»» avgProcessingTime|number|false|none|Average number of items processed per second|
|»» currentIdleTime|string|false|none|Time elapsed since queue went idle|
|»» currentItemProcessingTime|string|false|none|Time elapsed processing the current item|
|»» idleTimePercent|number|false|none|Percentage of time queue spent idle|
|»» length|integer|false|none|Number of items in the queue|
|»» lengthCurrentTryPeak|number|false|none|The highest number of items in the queue within the past 100ms|
|»» lengthLifetimePeak|number|false|none|The highest number of items in the queue|
|»» totalItemsProcessed|number|false|none|The total number of items processed by the queue|
|»» inProgressMessage|string|false|none|Current message type queue is processing|
|»» lastProcessedMessage|string|false|none|Last message type processed|
|» writer|object|false|none|Storage writing stats|
|»» lastFlushSize|number|false|none|Last flush size|
|»» lastFlushDelayMs|number|false|none|Last flush delay in ms|
|»» meanFlushSize|number|false|none|Average flush size|
|»» meanFlushDelayMs|number|false|none|Average flush delay in ms|
|»» maxFlushSize|number|false|none|Max flush size|
|»» maxFlushDelayMs|number|false|none|Max flush delay in ms|
|»» queuedFlushMessages|integer|false|none|Queued flush messages|
|» readIndex|object|false|none|none|
|»» cachedRecord|number|false|none|Number of cached record reads|
|»» notCachedRecord|number|false|none|Number of uncached record reads|
|»» cachedStreamInfo|number|false|none|none|
|»» notCachedStreamInfo|number|false|none|none|
|»» cachedTransInfo|number|false|none|none|
|»» notCachedTransInfo|number|false|none|none|
|»» hashCollisions|number|false|none|none|

