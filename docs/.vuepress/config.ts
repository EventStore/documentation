import {defineUserConfig} from "vuepress";
import {instance as ver} from "./lib/versioning";
import {path} from '@vuepress/utils';
import {importCodePlugin} from "./markdown/xode/importCodePlugin";
import {navbar, sidebar} from "./configs";
import {projectionSamplesPath, resolveMultiSamplesPath} from "./lib/samples";
import {replaceLinkPlugin} from "./markdown/replaceLink";
import {linkCheckPlugin} from "./markdown/linkCheck";
import {docsearchPlugin} from '@vuepress/plugin-docsearch';
import {googleAnalyticsPlugin} from '@vuepress/plugin-google-analytics';
import viteBundler from "@vuepress/bundler-vite";
// @ts-ignore
import dotenv from 'dotenv';
import {defaultTheme} from '@vuepress/theme-default';
import {containerPlugin} from "@vuepress/plugin-container";
import vueDevTools from 'vite-plugin-vue-devtools'
import {markdownImagePlugin} from "@vuepress/plugin-markdown-image";
import {sitemapPlugin} from "@vuepress/plugin-sitemap";
import {fs} from "vuepress/utils";
import {seoPlugin} from "@vuepress/plugin-seo";

dotenv.config({path: path.join(__dirname, '..', '..', '.algolia', '.env')});
const hostname = "developers.eventstore.com";

// noinspection JSUnusedGlobalSymbols
export default defineUserConfig({
    base: "/",
    dest: "public",
    bundler: viteBundler({viteOptions: {plugins: [vueDevTools(),],}}),
    title: "EventStoreDB Documentation",
    description: "The stream database built for Event Sourcing",
    define: {
        __VERSIONS__: {
            latest: ver.latest,
            selected: ver.latest,
            all: ver.all
        },
    },
    markdown: {importCode: false},
    extendsMarkdown: md => {
        md.use(importCodePlugin, {
            handleImportPath: s => resolveMultiSamplesPath(s)
        });
        md.use(replaceLinkPlugin, {
            replaceLink: (link: string, _) => link
                .replace("@clients/grpc/", "/clients/grpc/")
                .replace("@client/dotnet/5.0/", "/clients/tcp/dotnet/21.2/")
                .replace("@clients/http-api/", "/http-api/{version}/")
                .replace("@clients/httpapi/", "/http-api/{version}/")
                .replace("@httpapi/data/", projectionSamplesPath)
                .replace("@httpapi/", "/http-api/{version}/")
        });
        md.use(linkCheckPlugin);
    },
    plugins: [
        docsearchPlugin(
            {
                apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
                indexName: process.env.ALGOLIA_INDEX_NAME,
                appId: process.env.ALGOLIA_APPLICATION_ID
            }),
        containerPlugin( {
            type: "note",
            before: title => `<div class="custom-container note"><p class="custom-container-title">${title === "" ? "NOTE" : title}</p>`,
            after: _ => `</div>`
        }),
        markdownImagePlugin({
            figure: true,
            lazyload: true,
            mark: true,
            size: true,
        }),
        sitemapPlugin({
            hostname: hostname,
            devServer: process.env.NODE_ENV === 'development',
            modifyTimeGetter: (page, app) =>
                fs.statSync(app.dir.source(page.filePathRelative!)).mtime.toISOString()
        }),
        seoPlugin({
            hostname: hostname
        })
        // googleAnalyticsPlugin({id: process.env.GOOGLE_TAG_ID}),
    ],
    theme: defaultTheme({
        logo: "/eventstore-dev-logo-dark.svg",
        logoDark: "/eventstore-logo-alt.svg",
        docsDir: 'docs',
        editLink: false,
        editLinkText: "Help us improve this page!",
        sidebarDepth: 2,
        // searchPlaceholder: "Search",
        // searchMaxSuggestions: 20,
        lastUpdated: true,
        navbar: navbar.en,
        sidebar: sidebar.en,
    }),
    head: [
        ['script', {
            src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
            'data-website-id': '9ff147dd-2c68-495d-9859-de159901d8c5',
            'data-project-name': 'Event Store',
            'data-project-color': '#1976d2',
            'data-project-logo': 'https://6850195.fs1.hubspotusercontent-na1.net/hubfs/6850195/Brand/ouroboros.png'
        }]
    ]
});
