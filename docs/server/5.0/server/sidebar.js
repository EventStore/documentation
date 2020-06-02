module.exports = [
    {
        title: "Getting Started",
        collapsable: true,
        children: [
            "getting-started/",
            "getting-started/projections.md",
            "getting-started/which-api-sdk.md"
        ]
    },
    {
        title: "Server",
        collapsable: true,
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
        collapsable: true,
        children: [
            "cluster-without-manager-nodes.md",
            "cluster-with-manager-nodes.md",
            "node-roles.md",
        ]
    },
    {
        title: "Kubernetes",
        collapsable: true,
        children: [
            "deploy-kubernetes-aks.md",
            "deploy-kubernetes-gke.md",
        ]
    },
    {
        title: "Operations",
        collapsable: true,
        children: [
            "operations/database-backup.md",
            "operations/stats-debug.md",
            "operations/ports-and-networking.md",
            "operations/default-directories.md",
            "operations/scavenging.md",
            "operations/production-checklist.md",
        ]
    },
    {
        title: "Advanced topics",
        collapsable: true,
        children: [
            "caching.md",
            "indexing.md",
            "system-streams.md",
            "metadata-and-reserved-names.md",
            "64-bit-index.md",
        ]
    },
    {
        title: "Projections",
        collapsable: true,
        children: [
            "projections/",
            "projections/system-projections.md",
            "projections/user-defined-projections.md",
            "projections/projections-config.md",
            "projections/debugging.md"
        ]
    }
]
