module.exports = [
    {
        title: "Getting Started",
        collapsable: true,
        children: [
            "getting-started/",
        ]
    },
    {
        title: "Connecting to server",
        path: "connecting/",
        collapsable: true,
        children: [
            "connecting/",
            "connecting/options.md",
            "connecting/connection-string.md",
        ]
    },
    {
        title: "Writing events",
        collapsable: true,
        children: [
            "writing/",
            "writing/optimistic-concurrency-and-idempotence.md",
        ]
    },
    {
        title: "Reading events",
        collapsable: true,
        children: [
            "reading/"
        ]
    },
    {
        title: "Projections",
        collapsable: true,
        children: [
            "projections/",
            "projections/projections-management.md"
        ]
    },
    {
        title: "Subscriptions",
        collapsable: true,
        children: [
            "subscriptions/",
            "subscriptions/catchup-subscriptions.md",
            "subscriptions/persistent-subscriptions.md",
            "subscriptions/persistent-subscription-manager.md",
        ]
    },
    {
        title: "Event streams",
        collapsable: true,
        children: [
            "streams/",
            "streams/deleting-a-stream.md",
            "streams/stream-metadata.md",
        ]
    },
    {
        title: "Security",
        collapsable: true,
        children: [
            "security/",
            "security/users.md",
            "security/acl.md"
        ]
    },
    {
        title: "Embedded",
        collapsable: true,
        children: [
            "embedded/"
        ]
    },
    // {
    //     title: "Examples",
    //     collapsable: true,
    //     children: [
    //         "examples/",
    //         "examples/aggregate.md",
    //         "examples/aggregate-store.md",
    //         "examples/read-models.md"
    //     ]
    // },
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
