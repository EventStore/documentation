import type {PluginsOptions} from "vuepress-theme-hope";
import {fs} from "vuepress/utils";
import {notices} from "./notices";
import {watermark} from "./watermark";
import {seoPlugin} from "./seo";
import {hostname} from "./shared";

export default {
    components: {
        components: ["Badge", "VPBanner", "VPCard", "VidStack"]
    },
    // docsearch: {
    //     apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
    //     indexName: process.env.ALGOLIA_INDEX_NAME,
    //     appId: process.env.ALGOLIA_APPLICATION_ID
    // },
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
        hostname: hostname,
        devServer: process.env.NODE_ENV === 'development',
        modifyTimeGetter: (page, app) => fs.statSync(app.dir.source(page.filePathRelative!)).mtime.toISOString()
    },
    shiki: {
        themes: {
            light: "one-light",
            dark: "one-dark-pro",
        },
    },
    watermark: watermark,
    notice: notices

} satisfies PluginsOptions;