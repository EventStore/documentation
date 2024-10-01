import viteBundler from "@vuepress/bundler-vite";
import {path} from 'vuepress/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import dotenv from 'dotenv';
import vueDevTools from 'vite-plugin-vue-devtools'
import {defineUserConfig} from "vuepress";
// import {fs} from "vuepress/utils";
import * as fs from "fs";
import {projectionSamplesPath, resolveMultiSamplesPath} from "./lib/samples";
import {instance as ver} from "./lib/versioning";
import {linkCheckPlugin} from "./markdown/linkCheck";
import {replaceLinkPlugin} from "./markdown/replaceLink";
import {importCodePlugin} from "./markdown/xode/importCodePlugin";
import {hopeTheme} from "vuepress-theme-hope";
import {dl} from "@mdit/plugin-dl";
import {themeOptions} from "./configs/theme";

dotenv.config({path: path.join(__dirname, '..', '..', '.algolia', '.env')});

const snippetSource = fs.readFileSync(path.join(__dirname, "snippet.js"), "utf8");

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
    markdown: {importCode: false, headers: {level: [2, 3]}},
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
    theme: hopeTheme(themeOptions),
    head: [
        ['script', {
            src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
            'data-website-id': '9ff147dd-2c68-495d-9859-de159901d8c5',
            'data-project-name': 'Event Store',
            'data-project-color': '#1976d2',
            'data-project-logo': 'https://6850195.fs1.hubspotusercontent-na1.net/hubfs/6850195/Brand/ouroboros.png'
        }],
        ['script', {}, snippetSource]
    ]
});
