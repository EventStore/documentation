import { instance as ver } from "../lib/versioning";
import type {EsSidebarOptions} from "../lib/types";

export const en: EsSidebarOptions = {
  "/getting-started/": [
    {
      text: "Introduction",
      link: "/getting-started/README.md",
      group: "Getting Started (DRAFT)",
    },
    {
      text: "Quickstart",
      group: "Getting Started (DRAFT)",
      children: [
        "/getting-started/quickstart/README.md"
      ],
    },
    {
      text: "Concept",
      group: "Getting Started (DRAFT)",
      children: [
        "/getting-started/concept/architecture.md",
        "/getting-started/concept/key-benefit.md",
        "/getting-started/concept/business-process.md",
      ],
    },
  ],
  "/connectors/": [
    {
      text: "",
      group: "Connectors",
      children: [
        "/connectors/README.md",
        "/connectors/quickstart.md",
        "/connectors/manage.md",
        "/connectors/sinks.md",
        "/connectors/details.md",
      ],
    },
  ],
  "/clients/grpc/": [
    {
      text: "",
      group: "Clients",
      children: [
        "/clients/grpc/README.md",
        "/clients/grpc/appending-events.md",
        "/clients/grpc/reading-events.md",
        "/clients/grpc/subscriptions.md",
        "/clients/grpc/persistent-subscriptions.md",
        "/clients/grpc/projections.md",
        "/clients/grpc/authentication.md",
        "/clients/grpc/observability.md",
      ],
    },
  ],
  "/cloud/": [
    {
      text: "",
      group: "Event Store Cloud",
      children: [
        "/cloud/intro/README.md",
        "/cloud/provision/README.md",
        "/cloud/use/README.md",
        "/cloud/ops/README.md",
        "/cloud/integrations/README.md",
        "/cloud/automation/README.md",
        "/cloud/faq/README.md",
      ],
    },
  ],
  ...ver.getSidebars(),
};
