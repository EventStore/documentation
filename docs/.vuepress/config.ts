import {defineUserConfig} from "@vuepress/cli";
import type {DefaultThemeOptions} from "@vuepress/theme-default";
import {instance as ver} from "./lib/versioning";
import {path} from '@vuepress/utils';
import {importCodePlugin} from "./markdown/xode/importCodePlugin";
import {navbar, sidebar} from "./configs";
import {resolveMultiSamplesPath} from "./samples";
import containers from "./lib/containers";

require('dotenv').config({path: path.join(__dirname, '..', '..', '.algolia', '.env')})

// noinspection JSUnusedGlobalSymbols
export default defineUserConfig<DefaultThemeOptions>({
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
    },
    plugins: [
        ["@vuepress/docsearch", {
            apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
            indexName: "scraper-test",// process.env.ALGOLIA_INDEX_NAME,
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
        }]
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
    }
});
