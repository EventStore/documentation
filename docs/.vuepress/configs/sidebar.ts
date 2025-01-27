import { instance as ver } from "../lib/versioning";
import type {EsSidebarOptions} from "../lib/types";

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
  ...ver.getSidebars(),
  "/clients/tcp/dotnet/21.2/": "structure",
};
