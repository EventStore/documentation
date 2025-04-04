import type {EsSidebarOptions} from "../lib/types";
import { instance as ver } from "../lib/versioning";

export const sidebarEn: EsSidebarOptions = {
  "/getting-started/": [
    {
      text: "Quickstart",
      link: "/getting-started/quickstart/",
      group: "Getting Started",
    },
    {
      text: "Introduction",
      link: "/getting-started/introduction.md",
      group: "Getting Started",
    },
    {
      text: "Concepts",
      link: "/getting-started/concepts.md",
      group: "Getting Started",
    },
    {
      text: "Features",
      link: "/getting-started/features.md",
      group: "Getting Started",
    },    
    {
      text: "Use Cases",
      collapsible: true,
      expanded: false,
      group: "Getting Started",
      children: [
        {
          text: "Polyglot Persistence",
          collapsible: true,
          expanded: false,
          group: "Getting Started",
          children: [
            "/getting-started/use-cases/what-is-polyglot-persistence.md",
            "/getting-started/use-cases/polyglot-persistence-tutorial.md"
          ]
        },
        "/getting-started/use-cases/outbox-out-of-the-box.md",
        "/getting-started/use-cases/kurrentdb-in-microservices.md",
        "/getting-started/use-cases/operational-audit-log.md",
        "/getting-started/use-cases/temporal-query.md",
        "/getting-started/use-cases/business-workflow.md",
      ]
    },
    {
      text: "Evaluate",
      collapsible: true,
      expanded: false,
      group: "Getting Started",
      children: [
        "/getting-started/evaluate/business-process-support.md",
        "/getting-started/evaluate/state-vs-event-based-data-model.md",
        "/getting-started/evaluate/data-pipeline.md",
      ]
    },
  ],
  "/clients/grpc/": "structure",
  "/cloud/": "structure",
  "/server/kubernetes-operator/": "structure",
  ...ver.getSidebars(),
  "/clients/tcp/dotnet/21.2/": "structure",
};
