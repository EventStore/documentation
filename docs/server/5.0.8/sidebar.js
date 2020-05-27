module.exports = [
    {
        title: "Getting Started",
        collapsable: true,
        children: [
            "getting-started/",
            "getting-started/reading-subscribing-events",
            "getting-started/projections",
            "getting-started/which-api-sdk"
        ]
    },
    {
        title: "Server",
        collapsable: true,
        children: [
            "server/",
            "server/command-line-arguments.md",
            "server/configuring.md",
            "server/users-and-access-control-lists.md",
            "server/admin-ui.md",
            "server/setting-up-ssl.md",
            "server/setting-up-varnish-in-linux.md",
            "server/uninstalling.md"
        ]
    },
    {
        title: "Clustering",
        collapsable: true,
        children: [
            "server/cluster-without-manager-nodes.md",
            "server/cluster-with-manager-nodes.md",
            "server/node-roles.md",
        ]
    },
    {
        title: "Kubernetes",
        collapsable: true,
        children: [
            "server/deploy-kubernetes-aks.md",
            "server/deploy-kubernetes-gke.md",
        ]
    },
    {
        title: "Operations",
        collapsable: true,
        children: [
            "server/database-backup.md",
            "server/stats-debug.md",
            "server/ports-and-networking.md",
            "server/default-directories.md",
            "server/scavenging.md",
            "server/production-checklist.md",
        ]
    },
    {
        title: "Advanced topics",
        collapsable: true,
        children: [
            "server/caching.md",
            "server/indexing.md",
            "server/system-streams.md",
            "server/metadata-and-reserved-names.md",
            "server/64-bit-index.md",
        ]
    },
    {
        title: "Projections",
        collapsable: true,
        children: [
            "projections/",
            "projections/system-projections.md",
            "projections/user-defined-projections.md",
            "projections/api.md",
            "projections/projections-config.md",
            "projections/debugging.md"
        ]
    }
]
