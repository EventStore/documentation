---
home: true
heroText: Getting started
tagline: Start your event-native journey with Event Store

highlights:
- header: Get started with Event Sourcing
  features:
    - title: Introduction to Event Sourcing
      details: For developers and software architects looking to build event-sourced systems within modern event-driven architectures.
      icon: noto:japanese-symbol-for-beginner
      link: https://www.eventstore.com/event-sourcing
    - title: Event Sourcing Training Videos
      details: Learn about Event Sourcing from the experts at Event Store. Click here to watch the video series on YouTube.
      icon: vscode-icons:file-type-video
      link: https://www.youtube.com/watch?v=mZAWsvym43Q&list=PLWG5TK2D4U_N3hiOYPu40FiYF7-quXp9X
    - title: What is CQRS?
      details: It's common to use CQRS (Command-Query Responsibility Segregation) with Event Sourcing. Learn more about CQRS.
      icon: vscode-icons:file-type-video
      link: https://www.youtube.com/watch?v=D-3N2vQ7ADE&list=PLWG5TK2D4U_Ny42uD4qz3zdafAJha_OYl&index=36

- header: Use EventStoreDB in your environment
  description: Run EventStoreDB locally using Docker, or spin up an instance in Event Store Cloud.
  features:
    - title: Run in Docker
      icon: devicon:docker
      details: Start using EventStoreDB in a local container with Docker. Get your local environment up and running in a few seconds.
      link: /latest/quick-start/installation.html#docker

    - title: Event Store Cloud
      icon: emojione:cloud
      details: Use fully-managed clusters in Event Store Cloud to deploy and manage EventStoreDB. Supports AWS, Azure and GCP.
      link: /cloud/introduction.html

    - title: Deploy in your environment
      icon: emojione:rocket
      details: Deploy EventStoreDB in your environment using our binaries, Docker Compose, or Kubernetes Operator.
      link: /latest/quick-start/installation.html

- header: Start using EventStoreDB
  description: Learn more about database features and how to use EventStoreDB in your applications.
  features:
    - title: Navigator Preview
      details: Use the EventStoreDB Navigator (Preview) to explore your data, manage streams, and interact with the database.
      link: https://learn.eventstore.com/event-store-navigator-preview
      icon: mdi:compass-outline
    - title: Projections
      details: Use projections to transform or aggregate events in EventStoreDB. Learn how to create and manage projections.
      link: /latest/features/projections/
      icon: mdi:projector-screen
    - title: Client libraries
      details: Use one of our client libraries to start building your application. Supporting .NET, Java, Node.js, and more.
      link: /clients/grpc/getting-started.html
      icon: mdi:code-braces