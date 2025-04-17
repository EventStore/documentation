---
title: Introduction
---

# Introduction

This tutorial will guide you through the Mix-and-Match Database sample with KurrentDB using GitHub Codespaces.

## Objectives

In this quickstart, you will:

- Learn how to project events from KurrentDB into read models in different databases
- Experience how to update read models with exactly-once processing using catch-up subscription and checkpoints
- Understand how to update read models in real time

## Prerequisites

Before starting, ensure you have the following:

- A GitHub account to use GitHub Codespaces
- Basic knowledge of one of the development languages/platforms below
- Familiarity with command-line operations

## Tutorial Overview

This tutorial consists of the following steps:

### Section 1: Setup and Initialize KurrentDB
1. **Setup your Codespaces**: Starts up an interactive coding environment in your browser where all tools and database are installed
2. **Start and Initialize KurrentDB with Sample Events**: Start up KurrentDB and initialize it with sample events
3. **Browse the Sample Events in KurrentDB's Admin UI**: Access the Admin UI to browse the appended events
### Section 2: Project KurrentDB Events to Other Databases 
4. **Execute Projection Applications**: Starts up the projection sample applications that transform KurrentDB events into read models in Postgres and Redis
5. **Review the Projected Read Models in Postgres**: Run the PostgreSQL command line tool to review the newly inserted records
6. **Examine the Postgres Projection Application Codebase**: Examine the PostgreSQL projection application codebase to see how events are transformed to read models in the tables
7. **Review the Projected Read Models in Redis**: Run the Redis command line tool to review the newly added entries
8. **Examine the Redis Projection Application Codebase**: Examine the Redis projection application codebase to see how events are transformed into read models in Redis
### Section 3: Project KurrentDB Events in Real-Time
9. **Browse the Demo Web Page**: Navigate to the Demo Web Page to see a sample of how the read models in Postgres and Redis are used
10.  **Start the Live Data Generator**: Start a live data generator program that continuously appends events into KurrentDB
11.  **Watch the Read Models Update in Real-Time**: See how the read models are updated in real-time in the Demo Web Page
12.  **Review Codebase**: Understand how the code projects events to the read models in real-time
