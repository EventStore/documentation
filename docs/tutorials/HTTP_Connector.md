---
title: HTTP Connector
order: 3
---
## **Tutorial: Setting up and using an HTTP Connector in EventStoreDB**

This step-by-step tutorial guides you through setting up and using an **HTTP Connector in EventStoreDB**. This feature allows EventStoreDB to push event data into an http endpoint.

#### **Prerequisites**

* [EventStoreDB 24.10 LTS installed and running.](https://developers.eventstore.com/server/v24.10/quick-start/installation.html)   

### **Step 1: Set up an HTTP endpoint**

Ensure you have an **HTTP endpoint** that can receive messages. In this example we will create an HTTP endpoint using a service named PostBin to receive the messages. 

#### **Step 1.1: Create an HTTP bin at postb.in**

1. Navigate to https://www.postb.in/ and click **create bin**

PostBin is used to collect **(GET, POST, PUT, PATCH, DELETE, etc)** requests to a URL. We are using it to create an HTTP endpoint to send EventStoreDB data. 

2. Copy the bin url

After clicking create bin you will be directed to a page with the endpoint urls for curl, wget, and echo. Copy the bin url for curl

Note: If testing with an endpoint from your own custom application, make sure there are no issues with CORS preventing the data transmission from EventStoreDB.

### **Step 2: Create the connector**
### **Step 3: Check the connector status (optional)**
### **Step 4: Start the connector**
### **Step 5: Add events in EventStoreDB**
### **Step 6: Verify data was sent to the endpoint**
### **Step 7: Stop the connector**
### **Step 8: Delete the connector**
