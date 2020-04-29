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
        "one-click-copy",
        "vuepress-plugin-element-tabs",
        // "element-ui"
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
                    {text: "Event Sourcing", link: "/eventsourcing/"},
                    {text: "Server", link: "/v6/server/"},
                    {text: "Drivers", link: "/drivers/"},
                    {text: "Get help", link: "/get-help/"},
                ],
                sidebar: {
                    "/eventsourcing/": [
                        {
                            title: "Introduction",
                            collapsable: false,
                            children: [
                                "",
                                "entities-as-streams",
                                "benefits"
                            ]
                        }
                    ],
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
            },
            "/v5/": {
                label: "v5",
                title: "EventStore v5",
                description: "EventStore v5",
                selectText: "Versions",
                ariaLabel: "Versions",
                "nav": [
                    {text: "Guide", link: "/v5/getting-started/"},
                    {text: "Server", link: "/v5/server/"},
                ],
                sidebar: {
                    "/v5/getting-started/": [
                        {
                            title: "Getting Started",
                            "collapsable": true,
                            "children": [
                                "",
                                "reading-subscribing-events",
                                "projections",
                                "which-api-sdk"
                            ]
                        }
                    ],
                    "/v5/server/": [
                        {
                            title: "Server",
                            collapsable: false,
                            children: [
                                "",
                                "command-line-arguments.md",
                                "configuring.md",
                                "users-and-access-control-lists.md",
                                "admin-ui.md",
                                "setting-up-ssl.md",
                                "setting-up-varnish-in-linux.md",
                                "uninstalling.md"
                            ]
                        },
                        {
                            title: "Clustering",
                            collapsable: false,
                            children: [
                                "cluster-without-manager-nodes.md",
                                "cluster-with-manager-nodes.md",
                                "node-roles.md",
                            ]
                        },
                        {
                            title: "Kubernetes",
                            collapsable: false,
                            children: [
                                "deploy-kubernetes-aks.md",
                                "deploy-kubernetes-gke.md",
                            ]
                        },
                        {
                            title: "Operations",
                            collapsable: false,
                            children: [
                                "database-backup.md",
                                "stats-debug.md",
                                "ports-and-networking.md",
                                "default-directories.md",
                                "scavenging.md",
                                "production-checklist.md",
                            ]
                        },
                        {
                            title: "Advanced topics",
                            collapsable: false,
                            children: [
                                "caching.md",
                                "indexing.md",
                                "system-streams.md",
                                "metadata-and-reserved-names.md",
                                "64-bit-index.md",
                            ]
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
                md.use(require('markdown-it-vuepress-code-snippet-enhanced'));
                md.use(require("./theme/markup/code"), {root: "./docs/docs"});
                md.use(require("./theme/markup/elementui"));
            }
        }
    }
};
