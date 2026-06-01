import type {EsSidebarOptions} from "../lib/types";
import {instance as ver} from "../lib/versioning";

export const sidebarEn: EsSidebarOptions = {
    "/getting-started/": [
        {
            text: "Welcome",
            link: "/getting-started/introduction.md",
            group: "Getting Started",
        },
        {
            text: "The Kurrent Ecosystem",
            link: "/getting-started/kurrent-ecosystem.md",
            group: "Getting Started",
        },
        {
            text: "Why Kurrent?",
            link: "/getting-started/kurrent-why.md",
            group: "Getting Started",
        },
        {
            text: "Kurrent Concepts",
            link: "/getting-started/concepts.md",
            group: "Getting Started",
        },
        {
            text: "Self-Guided Demo",
            link: "/getting-started/quickstart/",
            group: "Getting Started",
        },
        {
            text: "Going Further",
            link: "/getting-started/going-further.md",
            group: "Getting Started",
        },
        {
            text: "Agent Skills",
            link: "/getting-started/agent-skills.md",
            group: "Getting Started",
        },
        {
            text: "MCP Servers",
            link: "/getting-started/mcp.md",
            group: "Getting Started",
        },

    ],
    "/clients/grpc/": "structure",
    "/cloud/": "structure",
    ...ver.getSidebars(),
    "/clients/tcp/dotnet/21.2/": "structure",
    "/dev-center/": "structure",

    // The way these docs were setup in server v22.10 and v5 are not compatible with the new sidebar structure.
    "/server/v22.10/": [
      "introduction",
      "installation",
      "configuration",
      "streams",
      "indexes",
      "projections",
      "persistent-subscriptions",
      "operations",
      "diagnostics",
      "networking",
      "cluster",
      "security",
      "upgrade-guide",
      "release-notes",
      "release-schedule",
      {
        text: "HTTP API",
        children: [
          "http-api/introduction.md",
          "http-api/security.md",
          "http-api/persistent.md",
          "http-api/projections.md",
          "http-api/optional-http-headers.md",
          "http-api/api.md"
        ],
        collapsible: true,
      }
    ],
    "/server/v5/": [
      "introduction",
      "installation",
      "configuration",
      "security",
      "networking",
      "cluster",
      "server-settings",
      "admin-ui",
      "indexes",
      "projections",
      "persistent-subscriptions",
      "operations",
      "diagnostics",
      {
        text: "HTTP API",
        children: [
          "http-api/introduction.md",
          "http-api/security.md",
          "http-api/persistent.md",
          "http-api/projections.md",
          "http-api/optional-http-headers.md",
          "http-api/api.md"
        ],
        collapsible: true,
      }
    ],
};
