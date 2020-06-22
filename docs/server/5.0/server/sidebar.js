module.exports = [
    {
        title: "Getting Started",
        collapsable: true,
        children: [
            "getting-started/",
            "getting-started/which-api-sdk.md"
        ]
    },
    {
        title: "Installation",
        collapsable: true,
        children: [
            "installation/",
            "installation/deploy-kubernetes-aks.md",
            "installation/deploy-kubernetes-gke.md",
            "installation/uninstalling.md"
        ]
    },
    {
        title: "Clustering",
        collapsable: true,
        children: [
            "clustering/cluster-without-manager-nodes.md",
            "clustering/cluster-with-manager-nodes.md",
            "clustering/node-roles.md",
        ]
    },
    {
        title: "Security",
        collapsable: true,
        children: [
            "security/setting-up-ssl.md",
            "security/users-and-access-control-lists.md",
        ]
    },
    {
        title: "Configuration",
        collapsable: true,
        children: [
            "configuration/",
            "configuration/diagnostics.md",
            "configuration/application.md",
            "configuration/network.md",
            "configuration/cluster.md",
            "configuration/database.md",
            "configuration/indexing.md",
            "configuration/security.md",
            "configuration/projections.md",
            "configuration/caching.md",
            "configuration/scavenging.md",
        ]
    },
    {
        title: "Operations",
        collapsable: true,
        children: [
            "admin-ui.md",
            "operations/database-backup.md",
            "operations/stats-debug.md",
            "operations/ports-and-networking.md",
            "operations/default-directories.md",
            "operations/scavenging.md",
            "operations/64-bit-index.md",
        ]
    },
    {
        title: "Projections",
        collapsable: true,
        children: [
            "projections/",
            "projections/enable.md",
            "projections/system-projections.md",
            "projections/user-defined-projections.md",
            "projections/projections-config.md",
            "projections/debugging.md"
        ]
    },
    {
        title: "Event streams",
        collapsable: true,
        children: [
            "streams/metadata-and-reserved-names.md",
            "streams/deleting-streams-and-events.md",
            "streams/system-streams.md"
        ]
    }
]
