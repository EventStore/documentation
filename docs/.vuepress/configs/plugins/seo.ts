import {SeoPluginOptions} from "@vuepress/plugin-seo";
import {App, HeadConfig, Page} from "vuepress";
import {match} from "ts-pattern";
import {hostname} from "./shared";

const legacy = "Legacy";

export const seoPlugin: SeoPluginOptions = {
    hostname: hostname,
    customHead: (head: HeadConfig[], page: Page, app: App) => {
        if (!page.pathInferred) return;

        const pathSplit = page.pathInferred.split("/");
        let maybeVersion = pathSplit.length > 1 ? pathSplit[2] : null;

        if (maybeVersion && maybeVersion === "tcp") {
            maybeVersion = legacy;
        }

        if (maybeVersion && maybeVersion.startsWith("v") && (maybeVersion.indexOf(".") > 0 || maybeVersion === "v5") || maybeVersion === legacy) {
            head.push(["meta", {name: "es:version", content: maybeVersion}]);
        } else {
        }

        const category = pathSplit.length > 0 ? pathSplit[1] : null;
        if (!category) {
            return;
        }
        const readableCategory = match(category)
            .with("server", () => "Server")
            .with("clients", () => "Client")
            .with("cloud", () => "Cloud")
            .with("http-api", () => "HTTP API")
            .with("connectors", () => "Connectors")
            .with("getting-started", () => "Getting Started")
            .otherwise(() => category);
        head.push(["meta", {name: "es:category", content: readableCategory}]);
    },
}

