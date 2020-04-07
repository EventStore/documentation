module.exports = {
    base: "/",
    dest: "public",
    title: "",
    description: "The stream database built for event sourcing",
    locales: {
        '/': {
            lang: "en-US",
            title: "Version 6",
            description: "Event Store Documentation"
        },
        '/v5/': {
            lang: "en-GB",
            title: "Version 5",
            description: "Event Store v5 Documentation"
        }
    },
    plugins: [
        "@vuepress/active-header-links",
        "one-click-copy"
    ],
    themeConfig: {
        logo: "/es-logo.png",
        codeLanguages: {
            csharp: "C#",
            go: "Go",
        },
        sidebarDepth: 1,
        searchPlaceholder: "Search...",
        lastUpdated: "Last Updated",
        locales: {
            "/": {
                selectText: "Versions",
                label: "v6",
                ariaLabel: "Versions",
                title: "EventStore",
                description: "EventStore v6",
                "nav": [
                    {text: "Guide", link: "/v6/guide/"},
                    {text: "Server", link: "/v6/server/"},
                    {text: "Drivers", link: "/drivers/"},
                    {text: "Get help", link: "/get-help/"},
                ],
                sidebar: {
                    "/v6/guide/": [
                        {
                            title: "Introduction",
                            collapsable: false,
                            children: [
                                "",
                                "getting-started",
                                "installation"
                            ]
                        },
                        {
                            title: "Event Sourcing",
                            collapsable: false,
                            children: [
                                "benefits",
                                "entities-as-streams"
                            ]
                        },
                        {
                            title: "Development",
                            collapsable: false,
                            children: [
                                "eventual-consistency",
                                "connection",
                                "faster-reads",
                                "scaling-read-models"
                            ]
                        }
                    ],
                    "/v6/server/": [
                        {
                            title: "Deployment",
                            collapsable: false,
                            children: [
                                "",
                                "cloud"
                            ]
                        },
                        {
                            title: "Clustering",
                            collapsable: false,
                            children: [
                                "clustering-model",
                                "configure-cluster"
                            ]
                        },
                        {
                            title: "Administration",
                            collapsable: false,
                            children: [
                                "directories",
                                "admin-ui",
                                "configuration"
                            ]
                        },
                        {
                            title: "Operations",
                            collapsable: false,
                            children: [
                                "upgrading",
                                "backup",
                                "metrics"
                            ]
                        }
                    ]
                },
                sidebar1: [
                    {
                        "title": "Introduction",
                        "path": "/introduction/",
                        "collapsable": false
                    },
                    {
                        "title": "Installation",
                        "path": "/installation/",
                        "collapsable": false,
                        "children": [
                            "/installation/docker",
                        ]
                    },
                    {
                        "title": "Event Sourcing",
                        "path": "/eventsourcing/",
                        "collapsable": false,
                        "children": [
                            "/eventsourcing/example",
                            "/eventsourcing/example1",
                        ]
                    },
                    {
                        "title": "Got stuck?",
                        "path": "/get-help/",
                        "collapsable": false,
                    },
                ],
            },
            "/v5/": {
                label: "v5",
                title: "EventStore v5",
                description: "EventStore v5",
                selectText: "Versions",
                ariaLabel: "Versions",
                sidebar: [
                    {
                        title: "Getting Started",
                        path: "/v5/getting-started/"
                    }
                ]
            }
        },
    },
    markdown: {
        externalLinks: {
            target: "_self"
        },
        extendMarkdown: md => {
            md.use(require("markdown-it-mermaid").default);
            md.use(require("markdown-it-textual-uml"), {"imageFormat": "png"});
            md.use(require('markdown-it-vuepress-code-snippet-enhanced'));
            md.use(require("./theme/markup"), {root: "./docs/docs"});
            md.use(require("markdown-it-include"));
        }
    }
};
