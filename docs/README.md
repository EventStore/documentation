---
home: true
heroText: Event Store Resources
heroImage: /eventstore.svg
tagline: Event-native database for storing immutable facts as events, complex event processing, and event-driven architectures.
actions:
- text: Get started
  link: /getting-started.html
  icon: hugeicons:start-up-02
  type: primary
- text: Start building
  icon: file-icons:easybuild
  link: /clients/grpc/

highlights:
  - header: Run locally with Docker
    highlights:
    - title: Run <code>docker run eventstore/eventstore:latest --dev</code> to start EventStoreDB in developers mode.

  - header: Deploy in your environment
    description: Deploy EventStoreDB in your environment using our binaries, Docker Compose, or Kubernetes Operator.
    features:
      - title: Linux
        icon: devicon:linux
        details: Use Event Store package feeds for Ubuntu, Debian, CentOS, and Red Hat Enterprise Linux.
        link: /server/v24.6/quick-start/installation.html#install-from-packagecloud

      - title: Windows
        icon: devicon:windows8
        details: Download the Windows binaries or use Chocolatey to install EventStoreDB.
        link: /server/v24.6/quick-start/installation.html#windows

      - title: Docker
        icon: devicon:docker
        details: Use Docker Compose to pull images from Docker Hub and run EventStoreDB in containers.
        link: /server/v24.6/quick-start/installation.html#use-docker-compose

      - title: Kubernetes
        icon: devicon:kubernetes
        details: Deploy EventStoreDB in Kubernetes using the EventStoreDB Operator.
        link: ./guide/markdown/stylize/hint.html

  - header: Develop in your language
    description: Use one of our client libraries to start building your application.
    features:
    - title: NodeJS
      icon: logos:nodejs-icon
      details: NodeJS client for JavaScript and TypeScript.
      link: ./guide/markdown/others.html#link-check

    - title: Java
      icon: devicon:java
      details: Decorate Markdown content with styles
      link: ./guide/markdown/stylize/hint.html

    - title: C#
      icon: devicon:csharp
      details: Build .NET applications with EventStoreDB using the .NET client for latest .NET and legacy .NET Framework.
      link: ./guide/markdown/stylize/hint.html

    - title: Python
      icon: devicon:python
      details: Decorate Markdown content with styles
      link: ./guide/markdown/stylize/hint.html

    - title: Rust
      icon: skill-icons:rust
      details: Decorate Markdown content with styles
      link: ./guide/markdown/stylize/hint.html

    - title: HTTP API
      icon: catppuccin:http
      details: Use EventStoreDB's HTTP API to interact with the database using any language or stack.
      link: ./guide/markdown/stylize/hint.html

footer: Copyright © Event Store Limited
---
