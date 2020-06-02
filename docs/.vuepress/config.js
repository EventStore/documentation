const versioning = require('./lib/versioning.js');

module.exports = {
    base: "/",
    dest: "public",
    title: "",
    description: "The stream database built for event sourcing",
    plugins: [
        "@vuepress/active-header-links",
        "one-click-copy",
        "vuepress-plugin-element-tabs",
        'check-md', {
            pattern: '**/*.md'
        }
    ],
    themeConfig: {
        logo: "/es-logo.png",
        codeLanguages: {
            csharp: "C#",
            go: "Go",
        },
        versions: {
            latest: versioning.versions.latest,
            selected: versioning.versions.latest,
            all: versioning.versions.all
        },
        sidebarDepth: 1,
        searchPlaceholder: "Search...",
        lastUpdated: "Last Updated",
        nav: [
            {
                text: "Server",
                items: versioning.linksFor("server", "getting-started/") // TODO create custom component
            },
            {
                text: "Drivers",
                items: [
                    {text: "Overview", link: "/clients/"},
                    {text: ".NET SDK", items: versioning.linksFor("dotnet-client", "")},
                    {text: "Java SDK", items: versioning.linksFor("java-client", "")},
                    {text: "HTTP API", items: versioning.linksFor("http-api", "")},
                ]
            },
            {text: "Event Sourcing", link: "/event-sourcing/"},
            {text: "Get help", link: "/get-help/"},
        ],
        sidebar: versioning.sidebars
    },
    markdown: {
        externalLinks: {
            target: "_self"
        },
        extendMarkdown: md => {
            md.use(require("./theme/markup/include"));
            md.use(require("./theme/markup/code"));//, {root: "./docs"});
            md.use(require("./theme/markup/elementui"));
            // md.use(require("./theme/markup/test"));
        }
    }
};
