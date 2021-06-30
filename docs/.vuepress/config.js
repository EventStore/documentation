const containers = require("./lib/containers.js");
const versioning = require("./lib/versioning.js");
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '..', '.algolia', '.env')})

versioning.load();

module.exports = {
    base:            "/",
    dest:            "public",
    title:           "EventStoreDB Documentation",
    description:     "The stream database built for Event Sourcing",
    head:            [
        ['link', {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png"}],
        ['link', {rel: "shortcut icon", href: "/favicon.ico"}],
        ['script', {}, "if (typeof window != \"undefined\") window.global = window;"]
    ],
    plugins:         [
        "@vuepress/active-header-links",
        ["one-click-copy", {
            copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside', 'pre[class*="language-"]'],
        }],
        ["check-md", {pattern: "**/*.md"}],
        containers("code-group", "code-group"),
        containers("code", "code-block", title => `title="${title}"`),
        containers("tabs", "el-tabs", type => `${type ? ` type='${type}'` : ""}`),
        containers("tab", "el-tab-pane", label => `label="${label}"`),
        [
            "vuepress-plugin-container",
            {
                type:   "detail",
                before: title => `<details class="custom-block details"><summary>${title}</summary>`,
                after:  '</details>',
            },
        ],
        containers("card", "el-card", _ => `body-style="padding: 0px"`),
        containers("note", "note", title => `${title ? ` type='${title}'` : ""}`),
        [
            "vuepress-plugin-container", {
	            type:   "note",
	            before: _ => `<div class="custom-block note">`,
	            after:  `</div>`,
	        },
        ],
        require("./plugins/removeGeneratedPath"),
        require("./plugins/canonical/index")
    ],
    extraWatchFiles: [
        "**/sidebar.js",
        "store/**/*.js"
    ],
    themeConfig:     {
        logo: "/eventstore-logo-alt.svg",
        gtm:  "GTM-WLD9W3L",
        // if your docs are in a different repo from your main project:
        docsRepo: "EventStore/documentation",
        // if your docs are not at the root of the repo:
        docsDir: 'docs',
        editLinks: false,
        editLinkText: "Help us improve this page!",
        versions:             {
            latest:   versioning.versions.latest,
            selected: versioning.versions.latest,
            all:      versioning.versions.all
        },
        sidebarDepth:         1,
        searchPlaceholder:    "Search",
        searchMaxSuggestions: 20,
        lastUpdated:          "Last Updated",
        nav:                  [
            {
                text: "Getting started",
                link: "/latest.html"
            },
            {
                text:  "Server",
                items: versioning.linksFor("server", "introduction/") // TODO create custom component
            },
            {
                text:  "Clients & APIs",
                items: [
                    {text: "gRPC", link: "/clients/grpc/getting-started/"},
                    {text: "TCP", items: versioning.linksFor("dotnet-client")},
                    {text: "HTTP", items: versioning.linksFor("http-api")},
                ]
            },
            {text: "Cloud", link: "/cloud/intro/"},
            {
                text:  "Need help?",
                items: [
                    {text: "Community forum", link: "https://discuss.eventstore.com"},
                    {text: "Articles", link: "https://eventstore.com/blog/articles/"},
                    {text: "Webinars", link: "https://eventstore.com/webinars/"},
                    {text: "Release notes", link: "https://eventstore.com/blog/release-notes/"},
                ]
            },
            {text: 'Resources', link: '/resources/'},
            // {text: "Profile", link: "/profile/"}
        ],
        sidebar:              {
            ...versioning.sidebars,
            "/clients/grpc/": [
                {
                    title:       "Getting Started",
                    collapsable: true,
                    path:        "/clients/grpc/getting-started/",
                    children:    [
                        "/clients/grpc/getting-started/",
                        "/clients/grpc/getting-started/connecting",
                    ]
                },
                {
                    title: "Appending events",
                    collapsable: true,
                    path:        "/clients/grpc/appending-events/",
                    children:    [
                        "/clients/grpc/appending-events/"
                    ]
                },
                {
                    title:       "Reading events",
                    collapsable: true,
                    path:        "/clients/grpc/reading-events/",
                    children:    [
                        "/clients/grpc/reading-events/",
                        "/clients/grpc/reading-events/reading-from-a-stream",
                        "/clients/grpc/reading-events/reading-from-the-all-stream"
                    ]
                },
                {
                    title:       "Subscribing to streams",
                    collapsable: true,
                    path:        "/clients/grpc/subscribing-to-streams/",
                    children:    [
                        "/clients/grpc/subscribing-to-streams/",
                        "/clients/grpc/subscribing-to-streams/filtering",
                        "/clients/grpc/subscribing-to-streams/persistent-subscriptions"
                    ]
                },
            ],
            "/cloud/":        [
                {
                    title:    "Introduction",
                    path:     "/cloud/intro/",
                    children: [
                        "/cloud/intro/",
                        "/cloud/intro/quick-start.md",
                        "/cloud/intro/eventstore-cloud-status.md"
                    ]
                },
                {
                    title:       "Provisioning",
                    collapsable: true,
                    path:        "/cloud/provision/",
                    children:    [
                        "/cloud/provision/",
                        "/cloud/provision/aws/",
                        "/cloud/provision/gcp/",
                        "/cloud/provision/azure/",
                        "/cloud/provision/azure/considerations.md",
                        "/cloud/provision/cloud-instance-guidance/"
                    ]
                },
                {
                    title:      "Operations",
                    collapsable: true,
                    path:        "/cloud/ops",
                    children:    [
                        "/cloud/ops/",
                        "/cloud/ops/manual_backups.md",
                        "/cloud/ops/scheduled_backups.md",
                        "/cloud/ops/restore.md",
                        "/cloud/ops/disk_expand.md",
                    ]
                },
                {
                    title:       "Using cloud clusters",
                    collapsable: true,
                    path:        "/cloud/use/",
                    children:    [
                        "/cloud/use/",
                        "/cloud/use/migration/replicator.md",
                        "/cloud/use/tailscale.md",
                        "/cloud/use/kubernetes/eks.md",
                        "/cloud/use/kubernetes/gke.md",
                        "/cloud/use/kubernetes/aks.md"
                    ]
                },
                {
                    title:      "Integrations",
                    collapsable: true,
                    path:        "/cloud/integrations",
                    children:    [
                        "/cloud/integrations/",
                        "/cloud/integrations/issues.md",
                        "/cloud/integrations/notifications.md",
                        "/cloud/integrations/opsgenie.md",
                        "/cloud/integrations/slack.md",

                    ]
                },
                {
                    title:       "Automation",
                    collapsable: true,
                    path:        "/cloud/automation/",
                    children:    [
                        "/cloud/automation/",
                        "/cloud/automation/terraform.md"
                    ]
                },
                {
                    title:       "FAQ",
                    collapsable: true,
                    path:        "/cloud/faq/",
                    children:    [
                        "/cloud/faq/",
                        "/cloud/faq/cluster-provisioning.md",
                        "/cloud/faq/providers.md",
                        "/cloud/faq/roadmap.md",
                        "/cloud/faq/sla.md",
                        "/cloud/faq/support.md",
                        "/cloud/faq/troubleshooting.md",
                        "/cloud/faq/operational-characteristics.md"
                    ]
                }
            ],
            '/resources/': [
                ['', "Resources"],
                ["/tag/news/", "News"]
            ],
        },
        blogSidebarGroupTitle: "Categories",
        algolia: {
            apiKey: process.env.ALGOLIA_SEARCH_API_KEY,
            indexName: process.env.ALGOLIA_INDEX_NAME,
            appId: process.env.ALGOLIA_APPLICATION_ID,
            hitsPerPage: 10,
        }
    },
    markdown:        {
        extendMarkdown: md => {
            // md.use(require("./theme/markup/elementui"));
        }
    }
};
