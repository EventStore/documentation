module.exports = {
    "base": "/",
    "dest": "public",
    "title": "",
    "description": "The stream database built for event sourcing",
    "plugins": [
        "@vuepress/active-header-links",
        "code-switcher",
        "one-click-copy"
    ],
    "themeConfig": {
        "logo": "/es-logo.png",
        "nav": [
            {"text": "Get help", "link": "/get-help/"},
        ],
        "codeLanguages": {
            csharp: "C#",
            go: "Go",
        },
        "sidebarDepth": 1,
        "sidebar": [
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
        "searchPlaceholder": "Search...",
        "lastUpdated": "Last Updated",
    },
    "markdown": {
        "extendMarkdown": md => {
            md.use(require("markdown-it-mermaid").default);
            md.use(require("markdown-it-textual-uml"), {"imageFormat": "png"});
            md.use(require('markdown-it-vuepress-code-snippet-enhanced'));

            const markup = require("./theme/markup");
            md.use(markup);
        }
    }
};
