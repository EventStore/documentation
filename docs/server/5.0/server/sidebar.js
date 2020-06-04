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
            "installation/setting-up-ssl.md",
            "installation/setting-up-varnish-in-linux.md",
            "installation/deploy-kubernetes-aks.md",
            "installation/deploy-kubernetes-gke.md",
            "installation/uninstalling.md"
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
            "projections/enable.md",
            "projections/system-projections.md",
            "projections/user-defined-projections.md",
            "projections/projections-config.md",
            "projections/debugging.md"
        ]
    }
]
