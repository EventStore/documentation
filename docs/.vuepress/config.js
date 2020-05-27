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
        'check-md', {
            pattern: '**/*.md'
          }
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
                    {text: "Event Sourcing", link: "/v6/event-sourcing/"},
                    {text: "Server", link: "/v6/server/"},
                    {text: "Drivers", link: "/drivers/"},
                    {text: "Get help", link: "/get-help/"},
                ],
                sidebar: {
                    "/v6/event-sourcing/": [
                        {
                            title: "Introduction",
                            collapsable: false,
                            children: [
                                "",
                                "entities-as-streams",
                                "cqrs",
                                "projections",
                                "all-stream",
                                "microservices",
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
                nav: [
                    {text: "Guide", link: "/v5/getting-started/"},
                    {text: "Event Sourcing", link: "/v5/event-sourcing/"},
                    {text: "Server", link: "/v5/server/"},
                    {text: "Projections", link: "/v5/projections/"},
                    {text: "HTTP API", link: "/v5/http-api/"},
                    {text: ".NET API", link: "/v5/dotnet-api/"}
                ],
                sidebar: {
                    "/v5/event-sourcing/": [
                        {
                            title: "Introduction",
                            collapsable: false,
                            children: [
                                "",
                                "entities-as-streams",
                                "cqrs",
                                "projections",
                                "all-stream",
                                "microservices",
                                "benefits"
                            ]
                        }
                    ],
                    "/v5/getting-started/": [
                        {
                            title: "Getting Started",
                            collapsable: true,
                            children: [
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
                    ],
                    "/v5/projections/": [
                        {
                            title: "Projections",
                            collapsable: true,
                            children: [
                                "",
                                "system-projections.md",
                                "user-defined-projections.md",
                                "api.md",
                                "projections-config.md",
                                "debugging.md"
                            ]
                        },
                    ],
                    "/v5/http-api/": [
                        {
                            title: "HTTP API",
                            collapsable: true,
                            children: [
                                "",
                                "creating-writing-a-stream.md",
                                "reading-streams.md",
                                "deleting-a-stream.md",
                                "competing-consumers.md",
                                "description-document.md",
                                "optimistic-concurrency-and-idempotence.md",
                                "stream-metadata.md",
                                {
                                    title: "Optional HTTP headers",
                                    path: "optional-http-headers",
                                    "collapsable": true,
                                    "children": [
                                        "optional-http-headers/",
                                        "optional-http-headers/eventid.md",
                                        "optional-http-headers/eventtype.md",
                                        "optional-http-headers/expected-version.md",
                                        "optional-http-headers/harddelete.md",
                                        "optional-http-headers/longpoll.md",
                                        "optional-http-headers/requires-master.md",
                                        "optional-http-headers/resolve-linkto.md",
                                        "optional-http-headers/trusted-intermediary.md"
                                    ]
                                },
                                "security.md",
                                "api.md"
                            ]
                    }
                    ],
                    "/v5/dotnet-api/": [
                        {
                            title: ".NET API",
                            collapsable: true,
                            children: [
                                "",
                                "connecting-to-a-server.md",
                                "streams.md",
                                "reading-events.md",
                                "deleting-a-stream.md",
                                "persistent-subscriptions.md",
                                "competing-consumers.md",
                                "embedded-client.md",
                                "optimistic-concurrency-and-idempotence.md",
                                "projections.md",
                                "stream-metadata.md",
                                "users.md",
                                "security.md"
                            ]
                        },
                        {
                            title: "Code documentation",
                            collapsable: true,
                            children: [
                                "reference/EventStore.Client.md",
                                "reference/EventStore.Client.Operations.md",
                                "reference/EventStore.Client.PersistentSubscriptions.md",
                                "reference/EventStore.Client.Projections.md",
                                "reference/EventStore.Client.Streams.md",
                                "reference/EventStore.Client.Users.md",
                                "reference/Microsoft.Extensions.DependencyInjection.md"
                            ]
                        }
                    ]
                }
            },
        },
    },
    markdown: {
        externalLinks: {
            target: "_self"
        },
        extendMarkdown: md => {
            md.use(require("./theme/markup/include"));
            md.use(require("./theme/markup/code"));//, {root: "./docs"});
            md.use(require("./theme/markup/elementui"));
        }
    },
    // configureWebpack: (config) => {
    //     const WebpackShellPlugin = require("webpack-shell-plugin");
    //
    //     return {
    //         plugins: [
    //             new WebpackShellPlugin({
    //                 onBuildStart: ["cp -r docs/event-sourcing docs/v5/"]
    //             })
    //         ]
    //     }
    // }
};
