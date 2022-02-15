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
        md.use(linkCheckPlugin);
        // this is a quick hack, should be fixed properly to remove direct references from here
        md.use(replaceLinkPlugin, {
            replaceLink: (link: string, _) => link
                .replace("@clients/http-api/", "/clients/http-api/v5/")
                .replace("@clients/httpapi/", "/clients/http-api/v5/")
                .replace("@clients/grpc/", "/clients/grpc/")
                .replace("@httpapi/", "/samples/clients/http-api/v5/")
        });
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
    }
});
