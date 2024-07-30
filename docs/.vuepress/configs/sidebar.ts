import { instance as ver } from "../lib/versioning";
import type { EsSidebarOptions } from "../lib/types";

export const en: EsSidebarOptions = {
  "/connectors/": [
    {
      text: "",
      group: "Connectors",
      children: [
        "README.md",
        "quickstart.md",
        "details.md",
        "sinks.md",
        "settings.md",
        "manage.md"
      ]
    }
  ],
  "/connectors/sinks/logger": [
    {
      text: "",
      group: "Logger Sink",
      children: [
        "/connectors/sinks/logger.md",
      ],
    },
  ],
  "/connectors/sinks/kafka": [
    {
      text: "",
      group: "Kafka Sink",
      children: [
        "/connectors/sinks/kafka.md",
      ],
    },
  ],
  "/connectors/sinks/http": [
    {
      text: "",
      group: "Http Sink",
      children: [
        "/connectors/sinks/http.md",
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
        "/clients/grpc/observability.md"
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