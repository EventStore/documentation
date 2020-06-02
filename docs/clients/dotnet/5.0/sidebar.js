module.exports = [
    {
        title: "Getting Started",
        collapsable: true,
        children: [
            "getting-started/",
            "getting-started/subscriptions"
        ]
    },
    {
        title: ".NET API",
        collapsable: true,
        children: [
            "",
            "connecting-to-a-server.md",
            "streams.md",
            "reading-events.md",
            "deleting-a-stream.md",
            "projections.md",
            "persistent-subscriptions.md",
            "competing-consumers.md",
            "embedded-client.md",
            "optimistic-concurrency-and-idempotence.md",
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
