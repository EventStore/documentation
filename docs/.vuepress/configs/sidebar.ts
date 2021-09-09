import type { SidebarConfig, SidebarItem } from "@vuepress/theme-default";
import { instance as ver } from "../lib/versioning";

export type ESSidebarItem = SidebarItem & { header: string};
export type ESSidebarConfig = SidebarConfig | Record<string, ESSidebarItem[]>

export const en: ESSidebarConfig = {
  "/clients/grpc/": [
    {
      text: "",
      header: "gRPC clients",
      children: [
        "/clients/grpc/README.md",
        "/clients/grpc/appending-events.md",
        "/clients/grpc/reading-events.md",
        "/clients/grpc/subscriptions.md",
        "/clients/grpc/competing-consumers.md",
      ],
    },
  ],
  "/cloud/": [
    {
      text: "",
      header: "Event Store Cloud",
      children: [
        "/cloud/intro/README.md",
        "/cloud/provision/README.md",
        "/cloud/use/README.md",
        "/cloud/ops/README.md",
        "/cloud/integrations/README.md",
        "/cloud/automation/README.md",
        "/cloud/faq/README.md",
        "/cloud/faq/operational-characteristics.md",
      ],
    },
  ],
  ...ver.getSidebars(),
};
