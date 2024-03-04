import {defineUserConfig} from "@vuepress/cli";
import type {DefaultThemeOptions} from "@vuepress/theme-default";
import {instance as ver} from "./lib/versioning";
import {path} from '@vuepress/utils';
import {importCodePlugin} from "./markdown/xode/importCodePlugin";
import {navbar, sidebar} from "./configs";
import {resolveMultiSamplesPath} from "./lib/samples";
import containers from "./lib/containers";
import {replaceLinkPlugin} from "./markdown/replaceLink";
import {linkCheckPlugin} from "./markdown/linkCheck";
import {ESSidebarConfig} from "./configs/sidebar";

require('dotenv').config({path: path.join(__dirname, '..', '..', '.algolia', '.env')})

type ESThemeOptions = DefaultThemeOptions | {sidebar: ESSidebarConfig };

// noinspection JSUnusedGlobalSymbols
export default defineUserConfig<ESThemeOptions>({
    base: "/",
    dest: "public",
    title: "EventStoreDB Documentation",
    description: "The stream database built for Event Sourcing",
    clientAppEnhanceFiles: path.resolve(__dirname, './clientAppEnhance.ts'),
    theme: path.resolve(__dirname, './theme'),
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
        // this is a quick hack, should be fixed properly to remove direct references from here
        md.use(replaceLinkPlugin, {
            replaceLink: (link: string, _) => link
                .replace("@clients/grpc/", "/clients/grpc/")
                .replace("@client/dotnet/5.0/", "/clients/tcp/dotnet/21.2/")
                .replace("@clients/http-api/", "/clients/http-api/")
                .replace("@httpapi/", "/clients/http-api/")
        });
        md.use(linkCheckPlugin);
    },
    plugins: [
        ["@vuepress/docsearch", {
            apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
            indexName: process.env.ALGOLIA_INDEX_NAME,
            appId: process.env.ALGOLIA_APPLICATION_ID
        }],
        containers("tabs", "TabView", type => `${type ? ` type='${type}'` : ""}`),
        containers("tab", "TabPanel", label => `header="${label}"`),
        ["@vuepress/container", {
            type: "note",
            before: title => `<div class="custom-container note"><p class="custom-container-title">${title === "" ? "NOTE" : title}</p>`,
            after: _ => `</div>`
        }],
        ["@vuepress/container", {
            type: "card",
            before: _ => `<Card><template #content>`,
            after: _ => `</template></Card>`
        }],
        ["@vuepress/plugin-google-analytics", {
            id: process.env.GOOGLE_TAG_ID,
        }],
    ],
    themeConfig: {
        logo: "/eventstore-dev-logo-dark.svg",
        logoDark: "/eventstore-logo-alt.svg",
        docsDir: 'docs',
        editLinks: false,
        editLinkText: "Help us improve this page!",
        sidebarDepth: 2,
        searchPlaceholder: "Search",
        searchMaxSuggestions: 20,
        lastUpdated: true,
        navbar: navbar.en,
        sidebar: sidebar.en,
        //     ...versioning.sidebars,
    },
    bundlerConfig: {
        viteOptions: {
            resolve: {
                dedupe: ['vue']
            },
        },
        vuePluginOptions: {
            isProduction: false
        }
    },
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
