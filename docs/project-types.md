# EventStoreDB Project Types Overview: Strategies for transitioning to event sourcing with EventStoreDB

EventStoreDB is a powerful database for building event-sourced systems. Understanding the various project types and architectural approaches is crucial for a successful implementation. This overview outlines the three primary EventStoreDB project types.


## 1. Brownfield Legacy Migration
Brownfield legacy migration projects involve the process of upgrading, modernizing, or completely overhauling existing legacy systems with event-sourced architectures.


![Brownfield legacy migration graphic](/brownfield-project-type.png)


### **Characteristics**

- **Incremental migration:** One of the hallmarks of a brownfield project is the need for an incremental approach. Rather than a complete overhaul, which can be risky and disruptive, the migration is often done in stages (starting small and scaling over time). This allows for a gradual transition from the old system to the new, minimizing disruption to ongoing operations. 


- **Coexistence with legacy systems:** During the migration process, EventStoreDB can coexist with legacy systems, and this coexistence period is crucial for testing, data synchronization, and ensuring business continuity. 


- **Strangulation pattern:** A common strategy in brownfield migration is the strangler pattern, where new functionality gradually replaces old functionality. This is a gradual transfer of functionality from old systems to the new event-sourced model.


## 2. Greenfield projects
Greenfield projects involve projects that start from scratch, without any existing constraints from prior work. It’s ideal for implementing modern, event-driven architectures from the ground up. 

![Greenfield project type graphic](/greenfield-project-type.png)


### **Characteristics**

- **Fresh start:** Unlike brownfield projects, which involve modifying or upgrading existing systems, greenfield projects start with a clean slate. This allows the freedom to design and implement the most suitable technologies and architectures for the project without being limited by legacy systems. 


- **Modern relevance:** Greenfield projects often incorporate modern software design principles and architecture. This could include microservices, which allow for building a system as a suite of small, independently deployable services, or data meshes, which focus on decentralizing data ownership and architecture.  


- **Event-Driven Design:** In the context of EventStoreDB, greenfield projects typically employ an event-driven architecture. This involves designing systems around the production, detection, and reaction to events. These events are stored in EventStoreDB, which acts as the source of truth for the system. 


- **Scalability and flexibility:** Starting from scratch enables the application of scalable architectures from the beginning. This approach allows for the design of systems that can grow and evolve as requirements change over time.




## 3. Brownfield Sidecar Source of Truth
Sidecar approaches refer to a strategy of integrating a new system (in this case, an event store) alongside existing legacy systems. This approach is designed to enhance or augment the existing infrastructure without disruption. 

![Brownfield sidecar project type graphic](/brownfield-sidecar-project-type.png)


### **Characteristics**

- **Parallel operation with legacy systems:** The sidecar operates alongside existing legacy systems without replacing them, enhancing and extending their capabilities. It synchronizes with these systems to ensure processed data is consistent and current, adding new functions and improvements in a non-intrusive manner to minimize disruptions.  


- **Event capture and processing:** The sidecar collects detailed events from existing systems, transforming them into aggregated, meaningful data. It enriches events with additional context or information, such as metadata or data from multiple sources, making them more valuable for business analysis. 


- **Data integration:** Through an integration bus like Apache Kafka, the sidecar integrates with other systems, facilitating the distribution of processed data across the organization’s IT infrastructure. 


- **Support for multiple data models:** Designed to accommodate various data retrieval and storage patterns, the sidecar supports both relational (e.g, PostgreSQL) and document-based or NoSQL (e.g., MongoDB) databases, catering to a broad spectrum of data needs and use cases. 




## Conclusion
Each project type presents unique advantages and challenges. Choosing the right approach depends on the specific needs and constraints of your organization. Discover how EventStoreDB applies across various industries by exploring our use cases.
