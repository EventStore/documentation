import type {PluginsOptions} from "vuepress-theme-hope";
import { SeoPluginOptions } from '@vuepress/plugin-seo';
import {App, HeadConfig, Page} from "vuepress";
import {fs} from "vuepress/utils";
import {notices} from "./notices";

const seoPlugin: SeoPluginOptions = {
    hostname: 'https://developers.eventstore.com',
    customHead: (head: HeadConfig[], page: Page, app: App) => {
        if (!page.pathInferred) return;

        const pathSplit = page.pathInferred.split("/");
        const maybeVersion = pathSplit[1];
        if (maybeVersion && maybeVersion.startsWith("v") && maybeVersion.indexOf(".") > 0) {
            head.push(["meta", {name: "test:version", content: maybeVersion}]);
        }
        // console.log(page.pathInferred);
        // head.push(["meta", {name: "test:keywords", content: "EventStoreDB, Event Sourcing, Event Streams"}]);
    },
}

export default {
    components: {
        components: ["Badge", "VPBanner", "VPCard", "VidStack"]
    },
    docsearch: {
        apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        appId: process.env.ALGOLIA_APPLICATION_ID
    },
    mdEnhance: {
        figure: true,
        imgLazyload: true,
        imgMark: true,
        imgSize: true,
        tabs: true,
        codetabs: true,
        component: true,
    },
    seo: seoPlugin,
    sitemap: {
        devServer: process.env.NODE_ENV === 'development',
        modifyTimeGetter: (page, app) =>
            fs.statSync(app.dir.source(page.filePathRelative!)).mtime.toISOString()
    },
    shiki: {
        themes: {
            light: "one-light",
            dark: "one-dark-pro",
        },
    },
    watermark: {
        enabled(page) {
            const relPath = page.filePathRelative;
            if (relPath === null) return false;
            return (relPath.includes("clients/tcp") && !relPath.includes("/migration-to-gRPC")) || relPath.includes("server/v5") || relPath.includes("http-api/v5");
        },
        watermarkOptions: {
            content: "Deprecated",
            fontSize: '30px',
            globalAlpha: 0.3,
        }
    },
    notice: notices

} satisfies PluginsOptions;