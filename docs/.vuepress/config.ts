import viteBundler from "@vuepress/bundler-vite";
import {path} from 'vuepress/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import dotenv from 'dotenv';
import vueDevTools from 'vite-plugin-vue-devtools'
import {defineUserConfig} from "vuepress";
import {fs} from "vuepress/utils";
import {navbar, sidebar} from "./configs";
import {projectionSamplesPath, resolveMultiSamplesPath} from "./lib/samples";
import {instance as ver} from "./lib/versioning";
import {linkCheckPlugin} from "./markdown/linkCheck";
import {replaceLinkPlugin} from "./markdown/replaceLink";
import {importCodePlugin} from "./markdown/xode/importCodePlugin";
import {hopeTheme} from "vuepress-theme-hope";
import { watermarkPlugin } from '@vuepress/plugin-watermark';
import {dl} from "@mdit/plugin-dl";

dotenv.config({path: path.join(__dirname, '..', '..', '.algolia', '.env')});

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
    markdown: {importCode: false, headers: {level: [2,3]}},
    extendsMarkdown: md => {
        md.use(replaceLinkPlugin, {
            replaceLink: (link: string, _) => link
                .replace("@clients/grpc/", "/clients/grpc/")
                .replace("@client/dotnet/5.0/", "/clients/tcp/dotnet/21.2/")
                .replace("@clients/http-api/", "/http-api/{version}/")
                .replace("@clients/httpapi/", "/http-api/{version}/")
                .replace("@httpapi/data/", projectionSamplesPath)
                .replace("@httpapi/", "/http-api/{version}/")
        });
        md.use(importCodePlugin, {
            handleImportPath: s => resolveMultiSamplesPath(s)
        });
        md.use(linkCheckPlugin);
        // @ts-ignore
        md.use(dl);
    },
    theme: hopeTheme({
        logo: "/eventstore-dev-logo-dark.svg",
        logoDark: "/eventstore-logo-alt.svg",
        docsDir: 'docs',
        editLink: false,
        lastUpdated: true,
        navbar: navbar.en,
        sidebar: sidebar.en,
        toc: true,
        pure: false,
        headerDepth: 3,
        iconAssets: "iconify",
        plugins: {
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
            seo: {
            },
            sitemap:{
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
            notice: {
                config: [
                    {
                        path: "/clients/tcp/dotnet/21.2/",
                        title: "This documentation is for the legacy TCP client",
                        content: "This client is no longer supported because newer versions of EventStoreDB only support gRPC-based client protocol. Please use the latest client libraries.",
                        actions: [
                            {
                                text: "Migration guide",
                                link: "/clients/tcp/dotnet/21.2/migration-to-gRPC.html"
                            }
                        ]
                    },
                    {
                        path: "/server/v5/",
                        title: "This documentation is for the unsupported EventStoreDB version",
                        content: "EventStoreDB v5 and below are out of support. Please migrate to the latest server version.",
                        actions: [
                            {
                                text: "View latest server documentation",
                                link: "/latest.html"
                            }
                        ]
                    }
                ]
            }
        }
    }),
    head: [
        ['script', {
            src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
            'data-website-id': '9ff147dd-2c68-495d-9859-de159901d8c5',
            'data-project-name': 'Event Store',
            'data-project-color': '#1976d2',
            'data-project-logo': 'https://6850195.fs1.hubspotusercontent-na1.net/hubfs/6850195/Brand/ouroboros.png'
        }],
    ]
});
