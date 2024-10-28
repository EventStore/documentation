import { instance as ver } from "../lib/versioning";
import type {EsSidebarOptions} from "../lib/types";

export const sidebarEn: EsSidebarOptions = {
  "/getting-started/": [
    {
      text: "Introduction",
      link: "/getting-started/README.md",
      group: "Getting Started",
    },
    {
      text: "Quickstart",
      link: "/getting-started/quickstarts/",
      group: "Getting Started",
    },
    {
      text: "Concepts",
      link: "/getting-started/concepts/",
      group: "Getting Started",
    },
    {
      text: "Features",
      group: "Getting Started",
      children: [
        "/getting-started/features/eventstoredb-core-features.md",
        "/getting-started/features/eventstoredb-feature-list.md"
      ]
    },
    {
      text: "Additional Reading",
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
