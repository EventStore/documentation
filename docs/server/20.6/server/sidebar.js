module.exports = [
    {
        title: "Introduction",
        collapsable: true,
        path: "introduction/",
        children: [
            "introduction/",
            "introduction/clients.md",
        ]
    },
    {
        title: "Installation",
        collapsable: true,
        path: "installation/",
        children: [
            "installation/",
            "installation/linux.md",
            "installation/windows.md",
            "installation/docker.md",
        ]
    },
    {
        title: "Configuration",
        collapsable: true,
        path: "configuration/",
        children: [
            "configuration/",
            "configuration/single-node.md",
            "configuration/cluster.md",
            "configuration/options.md",
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
]
