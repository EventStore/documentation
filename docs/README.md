---
home: true
heroText: Kurrent Resources
tagline: Event-native database for storing immutable facts as events, complex event processing, and event-driven architectures.
actions:
- text: Get started
  link: /getting-started/quickstart/
  icon: hugeicons:start-up-02
  type: primary
- text: Start building
  icon: file-icons:easybuild
  link: /clients/grpc/getting-started.html

highlights:
  - header: Jump start development
    highlights:
    - title: Start database in a container
      details: Run <code>docker run eventstore/eventstore:latest --dev</code> to start EventStoreDB in developers mode.
      icon: devicon:docker
      link: /latest/quick-start/installation.html#docker
    - title: Start using the client
      details: Use one of our client libraries to start building your application.
      icon: file-icons:easybuild
      link: /clients/grpc/getting-started.html

  - header: Deploy in your environment
    description: Deploy EventStoreDB in your environment using our binaries, Docker Compose, or Kubernetes Operator.
    features:
      - title: AWS
        icon: skill-icons:aws-dark
        details: Spin up a managed deployment in Amazon Web Services for free, in less than 10 minutes.
        link: https://www.kurrent.io/kurrent-cloud

      - title: Azure
        icon: devicon:azure
        details: Kurrent Cloud allows you to provision a KurrentDB cluster in Azure.
        link: https://www.kurrent.io/kurrent-cloud

      - title: GCP
        icon: devicon:googlecloud
        details: Kurrent Cloud allows you to provision a KurrentDB cluster in GCP.
        link: https://www.kurrent.io/kurrent-cloud

      - title: Linux
        icon: devicon:linux
        details: Use Event Store package feeds for Ubuntu, Debian, CentOS, and Red Hat Enterprise Linux.
        link: /latest/quick-start/installation.html#install-from-packagecloud

      - title: Windows
        icon: devicon:windows8
        details: Download the Windows binaries or use Chocolatey to install EventStoreDB.
        link: /latest/quick-start/installation.html#windows

      - title: Docker
        icon: devicon:docker
        details: Use Docker Compose to pull images from Docker Hub and run EventStoreDB in containers.
        link: /latest/quick-start/installation.html#use-docker-compose

  - header: Develop in your language
    description: Use one of our client libraries to start building your application.
    features:
    - title: NodeJS
      icon: logos:nodejs-icon
      details: NodeJS client for JavaScript and TypeScript.
      link: /client/TypeScript

    - title: Java
      icon: devicon:java
      details: Use the Java client to build applications in Java or other JVM languages.
      link: /client/Java

    - title: C#
      icon: devicon:csharp
      details: Build .NET applications with EventStoreDB using the .NET client for latest .NET and legacy .NET Framework.
      link: /client/csharp

    - title: Python
      icon: devicon:python
      details: Create applications and scripts in Python using the EventStoreDB client.
      link: /client/Python

    - title: Rust
      icon: skill-icons:rust
      details: Bring EventStoreDB to your Rust applications using the Rust client.
      link: /client/Rust

    - title: Go
      icon: skill-icons:golang
      details: Connect EventStoreDB with your Go applications using the Go client.
      link: /client/Go

    - title: HTTP API
      icon: catppuccin:http
      details: Use EventStoreDB's HTTP API to interact with the database using any language or stack.
      link: https://docs.kurrent.io/http-api/v24.10/introduction.html

footer: Copyright © Kurrent, Inc
---
