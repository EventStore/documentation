import type { SidebarConfig, SidebarItem } from "@vuepress/theme-default";
import { instance as ver } from "../lib/versioning";

export type GroupItem = { group: string, children: string[] };
export type ESSidebarConfig = Record<string, GroupItem[]> | SidebarConfig | Record<string, SidebarItem[]>

export const en: ESSidebarConfig = {
  "/clients/grpc/": [
    {
      group: "gRPC clients",
      children: [
        "/clients/grpc/README.md",
        "/clients/grpc/appending-events.md",
        "/clients/grpc/reading-events.md",
        "/clients/grpc/projections.md",
        "/clients/grpc/subscriptions.md",
        "/clients/grpc/persistent-subscriptions.md",
      ],
    },
  ],
  "/cloud/": [
    {
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
