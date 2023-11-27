# EventStoreDB Project Types: Strategies for transitioning to event sourcing with EventStoreDB

EventStoreDB is a powerful database for building event-sourced systems. Understanding the various project types and architectural approaches is crucial for a successful implementation. This overview outlines three primary EventStoreDB project types.


## 1. Greenfield projects

Greenfield projects involve starting from scratch, ideal for implementing modern, event-driven architectures from the ground up.


### Characteristics

- **Designed events**: Events are specifically designed for the domain, ensuring data relevance and quality.
- **Data continuity**: Regular updates maintain the relevancy and quality of the data over time.
- **Modern relevance**: This aligns with current trends in software architecture, like microservices and data meshes.


## 2. Brownfield Legacy Migration

Brownfield projects focus on incrementally migrating legacy systems to event-sourced architectures.


### Characteristics

- **Incremental migration**: This allows for a step-by-step approach, starting small and scaling over time.
- **Event sourced domain**: Utilizes EventStoreDB's real-time streaming capabilities.
- **Coexistence**: Legacy systems continue to operate during the migration process.
- **Strangulation pattern**: This gradually transfers functionality from old systems to the new event-sourced model.


## 3. Brownfield Sidecar Source of Truth

A sidecar approach serves as an auxiliary source of truth alongside existing systems.


### Data Pipeline

- **Fine-grained to Coarse-grained Events**: Low-level events are transformed into meaningful data points.
- **Projection**: Events are enriched and decorated to provide more context before being transferred.

[Learn more about projections here](https://developers.eventstore.com/server/v23.10/projections.html)


### Publishing
- **Integration Bus**: Uses tools like Kafka to push data to other systems.
- **Relational and Document Read Models**: Supports diverse data retrieval patterns like Postgres for relational data and document-based models for analytics.


## Conclusion
Each project type offers distinct benefits and challenges. Choosing the right approach depends on the specific needs and constraints of your organization. You can check out our illustration of project types here:

![Project types graphic](/images/projecttypes.png "Project types")


See how EventStoreDB can be used in different industries by checking out [our use cases here.](https://www.eventstore.com/use-cases)


