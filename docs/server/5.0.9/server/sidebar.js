module.exports = [
    {
        title: "Introduction",
        collapsable: true,
        path: "introduction/",
        children: [
            "introduction/",
            "introduction/introduction.md",
            "introduction/clients.md"
        ]
    },
    {
        title: "Installation",
        path: "installation/",
        collapsable: true,
        children: [
            "installation/",
            "installation/linux.md",
            "installation/docker.md",
            "installation/windows.md",
            "installation/macos.md",
            "installation/kubernetes.md",
            "installation/kubernetes-aks.md",
            "installation/kubernetes-gke.md",
            "installation/configuration.md"
        ]
    },
    {
        title: "Clustering",
        collapsable: true,
        path: "clustering/",
        children: [
            "clustering/",
            "clustering/using-dns.md",
            "clustering/using-ip-addresses.md",
            "clustering/gossip.md",
            // "clustering/cluster-without-manager-nodes.md",
            // "clustering/cluster-with-manager-nodes.md",
            "clustering/node-roles.md",
            "clustering/acknowledgements.md",
        ]
    },
    {
        title: "Networking",
        collapsable: true,
        path: "networking/",
        children: [
            "networking/",
            "networking/external.md",
            "networking/internal.md",
            "networking/nat.md",
            "networking/heartbeat.md",
            "networking/endpoints.md",
            "networking/mystery.md",
        ]
    },
    {
        title: "Security",
        collapsable: true,
        path: "security/",
        children: [
            "security/",
            "security/authentication.md",
            "security/trusted-intermediary.md",
            "security/acl.md",
            "security/ssl-linux.md",
            "security/ssl-docker.md",
            "security/ssl-windows.md",
            "security/configuration.md",
            "security/security.md"
        ]
    },
    {
        title: "Admin UI",
        collapsable: true,
        path: "admin-ui/",
        children: [
            "admin-ui/"
        ]
    },
    {
        title: "Configuration",
        collapsable: true,
        children: [
            "configuration/database.md",
            "configuration/caching.md",
            "configuration/advanced.md",
            "configuration/remove.md",
        ]
    },
    {
        title: "Indexes",
        collapsable: true,
        path: "indexes/",
        children: [
            "indexes/",
            "indexes/configuration.md",
            "indexes/tuning.md",
            "indexes/advanced.md",
        ]
    },
    {
        title: "Scavenge",
        collapsable: true,
        path: "scavenge/",
        children: [
            "scavenge/",
            "scavenge/options.md",
        ]
    },
    {
        title: "Diagnostics",
        collapsable: true,
        path: "diagnostics/",
        children: [
            "diagnostics/",
            "diagnostics/logging.md",
            "diagnostics/stats.md",
            "diagnostics/histograms.md",
            "diagnostics/prometheus.md",
            "diagnostics/datadog.md",
        ]
    },
    {
        title: "Operations",
        collapsable: true,
        children: [
            "operations/database-backup.md",
            "operations/default-directories.md",
        ]
    },
    {
        title: "Projections",
        collapsable: true,
        path: "projections/",
        children: [
            "projections/",
            "projections/enable.md",
            "projections/system-projections.md",
            "projections/user-defined-projections.md",
            "projections/projections-config.md",
            "projections/debugging.md",
            "projections/configuration.md",
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
