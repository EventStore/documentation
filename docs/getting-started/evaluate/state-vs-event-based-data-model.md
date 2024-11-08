---
title: State vs Event-Based Data Model
---

## State vs Event-Based Data Model

In today’s fast-evolving tech landscape, businesses need to evaluate the role and function of their database and the data stored therein.  Traditional databases focus on maintaining the current state of an application or system.  Alternatively, EventStoreDB leverages an event-based data model where the history of changes is immutably stored as events and replayed to produce the current state.   Understanding the differences and nuances of disparate data models can lead to more informed decisions on how an organization opts to manage its data.

This article explores the rise of these models, the modern challenges they face, and how EventStoreDB offers a promising alternative that could reshape data management and system architecture.

## Two Perspectives: Current State and Historical Events

Business objects in a system can be understood in two ways: by current state or historical events. 

- **Current state (or state-based data model)** reflects an object’s condition at a specific moment, such as a digital wallet's balance or withdrawal limit.
- **Historical events** **(or event-based data model)** trace the actions that shape the object’s current state, including deposits, withdrawals, or limit updates.

### Example

Leveraging a state-based data model, an individual viewing the table below can understand the **current state** of a digital wallet. The wallet holder is John Doe. On September 24, 2024, the current balance was US$200 and the withdrawal limit was US$300.

| Date | September 24, 2024 |
| --- | --- |
| Wallet Holder | John Doe |
| Balance | $200 |
| Currency | USD |
| Withdraw Limit | $300 |

Under an event-based data model, an individual could sequentially replay the historical events that compose the current state.  

1. Registered John Doe to the USD digital wallet with a $100 withdrawal limit (July 1, 2024)
2. Deposited $100 to the digital wallet (July 3, 2024)
3. Withdrew $100 from the digital wallet (July 22, 2024)
4. Deposited $500 to the digital wallet (August 13, 2024)
5. Increased withdrawal limit of digital wallet to $300 (September 2, 2024)
6. Withdrew $300 from digital wallet (September 12, 2024)

The current state in the event-based data model can be represented as a read model in the consumer's desired format.  Based on EventStoreDB’s event retention, consumers can time travel to any previous date on which the digital wallet existed to derive the state at that moment in time.   

### Is focusing on the “Current State” better than “Historical Events”?

Neither perspective is better; they complement one another and offer unique insights. A digital wallet's current state provides quick and direct information, such as its balance or limits, offering a clear view of "what" exists now. In contrast, historical events, such as transactions or updates, provide broad and deep historical insights, providing "why" the wallet has run out of funds by replaying the actions that led to the present.

In practice, both perspectives are essential. The current state provides immediacy, while historical events provide context. To fully manage and understand any business object, both perspectives—"what" and "why"—are necessary.

## The Rise of State-Based Data Model in 1980s

In the 1990s, data storage was scarce and expensive as relational database management systems (RDBMS) became mainstream. Given the cost of storing every historical event for business objects, most database systems were designed to store only the current state of data, a far more space-efficient approach.

RDBMS excel at managing current states for several reasons:

1. RDBMS’s update operation typically overwrites existing data, replacing old information with new values without keeping version histories or previous records, significantly conserving storage.
2. RDBMS encourages normalization, which reduces redundancy and optimizes the use of available space. 
3. RDBMS follow the ACID (Atomicity, Consistency, Isolation, Durability) properties, which are suited for operations that ensure data consistency based on the most recent state

## Technologic Transformation since 1990s

Since the 1990s, the world has undergone a dramatic transformation fueled by the rise of the internet, the expansion of big data, and the growing impact of AI.

During this time, global connectivity has soared, with [internet users increasing 1,000-fold](https://ourworldindata.org/internet) and [internet speeds rising at a comparable rate](https://business.comcast.com/community/browse-all/details/infographic-from-bits-to-exabytes-a-brief-history-of-internet-speed) in developed countries. Meanwhile, storage costs have [plummeted by an astounding 1,000,000-fold](https://jcmit.net/diskprice.htm), making storing vast amounts of data more affordable than ever.

However, despite the radical technological advancements, the fundamental design of RDBMS and data management practices has evolved relatively slower, adhering mainly to the state-based model. This continued reliance on storing only the current state of data has led to several challenges.

## Modern Challenges of the State-Based Data Model

*Summary of modern challenges of the state-based data model:*

| **Challenge Area** | **Description of Challenge** |
| --- | --- |
| Data Analytics | **Absence of historical context**:<br>- Hinders advanced analytics and machine learning<br>- Restricts understanding of user behavior over time<br>- Limits root cause analysis and data lineage tracking |
| Data Integration | **Delays between data collection and processing:**<br>- Prevent real-time insights<br>- Lead to inefficiencies and inconsistencies<br><br>**Batching large datasets:**<br>- Slows down system synchronization<br>- Can be resource intensive and introduces delays |
| **Application Development** | **Tightly coupled systems**:<br>- Reduce scalability<br>- Make systems harder to evolve<br>- Make debugging difficult |

### Data Analytics

Traditional RDBMS only store current states and lack the historical context crucial for advanced analytics and predictive modeling using machine learning and AI. For instance, if an e-commerce company only stores the latest status of customer purchases, it becomes difficult to analyze why certain products were returned or why specific customers churned. This absence of historical data and the "why" behind actions and behaviors makes it harder to analyze root causes and trace data lineage. 

### Data Integration

Batch processing, commonly used to handle large datasets, often introduces delays between data collection and processing, making it harder to generate real-time insights or take swift action. For example, a logistics company may batch-process shipment data overnight, delaying the detection of errors in real-time package tracking. This lag can lead to inefficiencies and difficulties in synchronizing distributed systems, which can increase resource usage and result in inconsistencies.

### Application Development

Application development also faces challenges with systems that depend on state-based data models. Due to the centralized, transactional nature of RDBMS, these systems frequently lead to tightly coupled architectures. For example, in a healthcare application, updates to patient records might require changes to multiple interconnected internal and vendor services, making the system harder to scale and maintain as new features are added or the system grows more complex.

## EventStoreDB and Event-Based Data Model

EventStoreDB, an event-native database, effectively solves many of the challenges posed by traditional state-based models by focusing on events as the core unit of data. 

EventStoreDB preserves the entire history of entities and business processes by storing, processing, and delivering data as events, making it ideal for event-based data models. Unlike state-based data models, where updates overwrite previous data, EventStoreDB retains every event in its original form.

While historical events can be replayed to reconstruct the current state, the inverse is impossible with state-based systems. Once reduced to a single state, the detailed history of the events that shape the current state is irretrievably lost. The event-based model, being more raw and granular than the state-based model, offers broad and in-depth historical insights. At the same time, it can be transformed into the current state for quick and efficient analysis. 

::: info
Event-based models provide the best of both worlds offering the flexibility to present data in both state and event based data models.
:::

## EventStoreDB as a Solution to State-Based Challenges

*Summary of EventStoreDB Solution with Event-Based Data Model:*

| **Challenge Area** | **EventStoreDB Solution with Event-Based Data Model** | **Example** |
| --- | --- | --- |
| **Data Analytics** | - Provides granular insights into behaviors, actions, and system changes over time.<br>- Allows for time travel and temporal analysis.<br>- Enables tracking of system evolution and predicting future outcomes. | E-commerce: Track every step of a customer’s journey, from browsing to purchase, to analyze buying patterns. |
| **System Integration** | - Processes events incrementally, reducing computational overhead.<br>- Handles real-time updates efficiently.<br>- Ensures fast synchronization with other systems. | Logistics: Process each package scan in real-time, ensuring timely updates without lengthy batch processing delays. |
| **Application Development** | - Decouples the current state from business logic and actions.<br>- Simplifies scaling and maintenance.<br>- Facilitates adding new functionality incrementally without affecting other system parts. | Healthcare: Easily update patient records across internal and external systems without tightly coupling services, improving scalability. |

### Data Analytics

For data analytics, EventStoreDB’s event-based model offers new possibilities by providing raw, granular insights into behaviors, actions, and system changes over time—far beyond the properties and attributes available in state-based models. For example, in an e-commerce system, analysts can track every step of a customer’s journey, from browsing products to final purchase, allowing for detailed behavioral analysis. 

The historical context it preserves allows for time travel and temporal analysis, enabling analysts to track a system’s evolution, better understand past behaviors, reconstruct current states, and even predict future outcomes using machine learning models. For instance, understanding user purchase patterns over time could help predict future buying trends.

### System Integration

For system integration, EventStoreDB offers significant advantages for real-time applications by processing events incrementally. This reduces computational overhead by handling individual changes (events) instead of processing entire datasets as in batch processing. 

For example, in a logistics system, only specific updates—such as a package being scanned at a checkpoint—are processed in real-time rather than batch-processing millions of scans simultaneously. This triggers quick updates and immediate action to ensure fast, seamless synchronization that keeps systems up to date without delays.

### Application Development

For application development, EventStoreDB’s event-based model effectively decouples the current state (e.g., a table) from the business logic and actions that manipulate it. Decoupled systems are easier to scale, extend, and maintain. 

With fewer dependencies, they can scale horizontally more efficiently, allowing new functionality to be added incrementally without affecting other parts of the system. This leads to cleaner, more modular codebases less prone to breaking when changes are introduced, reducing the likelihood of bugs and issues.

## **Comparison of State-Based and Event-Based Data Models**

*Comparison table that contrasts the state-based and event-based data models:*

| **Aspect** | **State-Based Data Model** | **Event-Based Data Model** |
| --- | --- | --- |
| **Primary Focus** | Stores the current state of an object or entity. | Records and stores every event or change that occurs to an object or entity. |
| **Data Representation** | Focuses on "what" the current state is at any given time. | Focuses on "why" the current state is as it is by tracking the sequence of changes (events). |
| **Historical Data** | Only the latest state is stored; previous states are overwritten. | Retains the full history of events, allowing reconstruction of any past state. |
| **Storage Requirements** | Efficient in terms of storage as only the most recent state is saved. | Requires more storage since every event must be retained. |
| **Transparency & Traceability** | Lacks historical context, making it difficult to audit changes or trace past states. | Provides full transparency, enabling detailed traceability and auditing. |
| **Analytics & Machine Learning** | Limited, as only the current state is available for analysis, lacking the historical context. | Ideal for advanced analytics and machine learning, as every event can be analyzed in detail. |
| **Real-Time Processing** | Often relies on batch processing, leading to delays in real-time insights. | Supports real-time processing by handling and processing events as they occur. |
| **Scalability** | Tends to tightly couple systems, leading to challenges in scaling and adding new features. | Loosely coupled, making systems easier to scale and extend without affecting other parts. |
| **System Integration** | Typically relies on centralized, tightly coupled architectures. | Encourages decoupled, event-driven architectures, improving modularity and flexibility. |

## Summary

- Many objects can be understood from two perspectives: the current state, which presents the “what,“ and historical events, which present the “why.”
- Traditional state-based models emerged in the 1990s due to high storage costs and are prevalent in relational database management systems (RDBMS). They focus on storing only the most recent data.
- Despite technological advancements, the state-based model struggles with modern challenges like machine learning, real-time analytics, and scalability due to its limitations.
- EventStoreDB is a practical database that leverages an event-based storage model.  Storing all historical events preserves detailed insights and enables replayability for reconstructing current states.
- An event-based model provides the best of both worlds since it can generate the current state from historical events. However, the reverse is not possible since the state can not be reduced to events that were not stored.
- This event-based model offers better transparency, real-time processing, and loosely coupled systems while addressing key challenges in data analytics, system integration, and application development.