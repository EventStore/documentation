module.exports = [
    {
        title: "HTTP API",
        collapsable: true,
        children: [
            "",
            "writing-events.md",
            "reading-streams.md",
            "deleting-a-stream.md",
            "description-document.md",
            "optimistic-concurrency-and-idempotence.md",
            "stream-metadata.md",
            "security.md",
        ]
    },
    {
        title: "Persistent subscriptions",
        collapsable: true,
        children: [
            "persistent-subscriptions.md"
        ]
    },
    {
        title: "Projections",
        collapsable: true,
        children: [
            "projections/",
            "projections/api.md"
        ]
    },
    {
        title: "Optional headers",
        collapsable: true,
        children: [
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
    {
        title: "API reference",
        collapsable: true,
        children: [
            "swagger.md"
        ]
    }
]
