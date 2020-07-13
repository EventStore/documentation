module.exports = [
    {
        title: "Introduction",
        collapsable: true,
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
        ]
    },
    {
        title: "Clustering",
        collapsable: true,
        path: "clustering/",
        children: [
            "clustering/",
            "clustering/gossip.md",
            "clustering/cluster-without-manager-nodes.md",
            "clustering/cluster-with-manager-nodes.md",
            "clustering/node-roles.md",
            "clustering/acknowledgements.md",
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
        title: "Configuration",
        collapsable: true,
        path: "configuration/",
        children: [
            "configuration/",
            "configuration/network.md",
            "configuration/database.md",
            "configuration/caching.md",
            "configuration/scavenging.md",
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
        title: "Operations",
        collapsable: true,
        children: [
            "admin-ui.md",
            "operations/database-backup.md",
            "operations/diagnostics.md",
            "operations/ports-and-networking.md",
            "operations/default-directories.md",
            "operations/scavenging.md",
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
