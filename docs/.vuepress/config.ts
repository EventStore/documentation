import {dl} from "@mdit/plugin-dl";
import viteBundler from "@vuepress/bundler-vite";
import dotenv from 'dotenv';
import vueDevTools from 'vite-plugin-vue-devtools'
import {defineUserConfig} from "vuepress";
import {path} from 'vuepress/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import {hopeTheme} from "vuepress-theme-hope";
import {themeOptions} from "./configs/theme";
import {projectionSamplesPath, resolveMultiSamplesPath} from "./lib/samples";
import {instance as ver} from "./lib/versioning";
import {linkCheckPlugin} from "./markdown/linkCheck";
import {replaceLinkPlugin} from "./markdown/replaceLink";
import {importCodePlugin} from "./markdown/xode/importCodePlugin";


dotenv.config({path: path.join(__dirname, '..', '..', '.algolia', '.env')});

// noinspection JSUnusedGlobalSymbols
export default defineUserConfig({
    base: "/",
    dest: "public",
    bundler: viteBundler({viteOptions: {plugins: [vueDevTools(),],}}),
    title: "Kurrent Docs",
    description: "The stream database built for Event Sourcing",
    define: {
        __VERSIONS__: {
            latest: ver.latest,
            selected: ver.latest,
            all: ver.all
        },
    },
    markdown: {
        importCode: false,
        headers: {level: [2, 3]},
    },
    extendsMarkdown: md => {
        md.use(replaceLinkPlugin, {
            replaceLink: (link: string, _) => link
                .replace("@server/", "/server/{version}/")
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

        const originalHighlight = md.options.highlight || ((code, lang, attrs) => code);

        md.options.highlight = (code, lang, attrs) => {
        if (lang === "env") {
            lang = "bash";
        }
        return originalHighlight(code, lang, attrs);
        };
    },
    //allow to override with custom components
    theme: hopeTheme(themeOptions,{custom: true}),
    head: [
        ['script', {
            src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
            'data-website-id': '9ff147dd-2c68-495d-9859-de159901d8c5',
            'data-project-name': 'Kurrent',
            'data-project-color': '#631B3A',
            'data-project-logo': '/logo-white.png'
        }],
        ['script', { src: "/js/snippet.js" }],
        ['script', { type: "text/javascript", src: "https://secure.businessintuition247.com/js/sc/264384.js" }],
        ['noscript', {}, '<img alt="" src="https://secure.businessintuition247.com/264384.png" style="display:none;" />']
    ],   
    alias: {
        "@theme-hope/components/BreadCrumb": path.resolve(__dirname, "./components/breadCrumb.ts"),
        "@theme-hope/modules/info/components/TOC": path.resolve(__dirname, "./components/TocWithFeedback.ts"),
        // add our own components for blog theme (Tutorials & Guides)
        "@theme-hope/modules/blog/components/InfoPanel": path.resolve(__dirname, "./components/infoPanel.ts"),
    }
});