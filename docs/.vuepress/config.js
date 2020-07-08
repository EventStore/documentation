const versioning = require('./lib/versioning.js');
versioning.load();

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
        logo: "/eventstore-logo-alt.svg",
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
                text: "Getting started",
                link: "/server/5.0.9/server/getting-started"
            },
            {
                text: "Server",
                items: versioning.linksFor("server", "getting-started/") // TODO create custom component
            },
            {
                text: "Clients and APIs",
                items: [
                    {text: "Overview", link: "/clients/"},
                    {text: ".NET SDK", items: versioning.linksFor("dotnet-client", "")},
                    {text: "HTTP API", items: versioning.linksFor("http-api", "")},
                ]
            },
            {text: "Resources", link: "/event-sourcing/"},
            {text: "Discuss", link: "https://discuss.eventstore.com"},
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
