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
      link: "/getting-started/concepts/",
      group: "Getting Started",
    },
    {
      text: "Features",
      link: "/getting-started/features/eventstoredb-feature-list.md",
      group: "Getting Started",
    },
    {
      text: "Evaluate",
      collapsible: true,
      expanded: false,
      group: "Getting Started",
      children: [
        "/getting-started/additional-reading/state-vs-event-based-data-model.md",
        "/getting-started/additional-reading/key-benefits-of-eventstoredb.md",
        "/getting-started/additional-reading/where-eventstoredb-fits-in-your-business.md",
        "/getting-started/additional-reading/role-of-eventstoredb-in-a-data-pipeline.md",
      ]
    },
  ],
  "/clients/grpc/": "structure",
  "/cloud/": "structure",
  // ...ver.getSidebars(),
  "/server/v24.10 Preview 1/": "structure",
  "/server/v24.6/": "structure",
  "/server/v23.10/": "structure",
  "/server/v22.10/": "structure",
  "/server/v5/": "structure",
  "/http-api/v24.6/": "structure",
  "/http-api/v23.10/": "structure",
  "/http-api/v22.10/": "structure",
  "/http-api/v5/": "structure",
  "/clients/tcp/dotnet/21.2/": "structure",
};
