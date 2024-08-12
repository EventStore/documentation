import { instance as ver } from "../lib/versioning";
import type {EsSidebarOptions} from "../lib/types";

export const en: EsSidebarOptions = {
  "/connectors/": "structure",
  //   "/connectors/": [
  //   {
  //     text: "",
  //     group: "Connectors",
  //     children: [
  //       "/connectors/README.md",
  //       "/connectors/quickstart.md",
  //       "/connectors/manage.md",
  //       "/connectors/sinks.md",
  //       "/connectors/details.md",
  //     ],
  //   },
  // ],
  "/clients/grpc/": "structure",
  // "/clients/grpc/": [
  //   {
  //     text: "",
  //     group: "Clients",
  //     children: [
  //       "/clients/grpc/README.md",
  //       "/clients/grpc/appending-events.md",
  //       "/clients/grpc/reading-events.md",
  //       "/clients/grpc/subscriptions.md",
  //       "/clients/grpc/persistent-subscriptions.md",
  //       "/clients/grpc/projections.md",
  //       "/clients/grpc/authentication.md",
  //       "/clients/grpc/observability.md",
  //     ],
  //   },
  // ],
  "/cloud/": "structure",
  // ...ver.getSidebars(),
  "/server/v24.6/": "structure",
  "/server/v24.2/": "structure",
  "/server/v23.10/": "structure",
};
