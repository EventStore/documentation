export const themeData = {
  "logo": "/eventstore-logo-alt.svg",
  "docsDir": "docs",
  "editLinks": false,
  "editLinkText": "Help us improve this page!",
  "sidebarDepth": 2,
  "searchPlaceholder": "Search",
  "searchMaxSuggestions": 20,
  "lastUpdated": true,
  "navbar": [
    {
      "text": "Getting started",
      "link": "/latest.html"
    },
    {
      "text": "Server",
      "children": [
        {
          "text": "21.6",
          "link": "/server/generated/v21.6/docs/introduction/"
        },
        {
          "text": "21.2",
          "link": "/server/generated/v21.2/docs/introduction/"
        },
        {
          "text": "20.10 LTS",
          "link": "/server/generated/v20.10/docs/introduction/"
        },
        {
          "text": "5.0.11",
          "link": "/server/generated/v5/docs/introduction/"
        }
      ]
    },
    {
      "text": "Clients & APIs",
      "children": [
        {
          "text": "gRPC",
          "link": "/clients/grpc/"
        },
        {
          "text": "TCP",
          "children": [
            {
              "text": "5.0.11 (.NET)",
              "link": "/clients/dotnet/5.0/"
            },
            {
              "text": "20.10.0 (.NET)",
              "link": "/clients/dotnet/20.10/"
            },
            {
              "text": "21.2.0 (.NET)",
              "link": "/clients/dotnet/21.2/"
            }
          ]
        }
      ]
    },
    {
      "text": "Cloud",
      "link": "/cloud/intro/"
    },
    {
      "text": "Need help?",
      "children": [
        {
          "text": "Community forum",
          "link": "https://discuss.eventstore.com"
        },
        {
          "text": "Articles",
          "link": "https://eventstore.com/blog/articles/"
        },
        {
          "text": "Webinars",
          "link": "https://eventstore.com/webinars/"
        },
        {
          "text": "Release notes",
          "link": "https://eventstore.com/blog/release-notes/"
        }
      ]
    }
  ],
  "sidebar": {
    "/clients/grpc/": [
      {
        "text": "gRPC Clients",
        "children": [
          "/clients/grpc/README.md",
          "/clients/grpc/appending-events.md",
          "/clients/grpc/reading-events.md",
          "/clients/grpc/subscriptions.md",
          "/clients/grpc/competing-consumers.md"
        ]
      }
    ],
    "/cloud/": [
      {
        "text": "Event Store Cloud",
        "children": [
          "/cloud/intro/README.md",
          "/cloud/provision/README.md",
          "/cloud/use/README.md",
          "/cloud/ops/README.md",
          "/cloud/integrations/README.md",
          "/cloud/automation/README.md",
          "/cloud/faq/README.md",
          "/cloud/faq/operational-characteristics.md"
        ]
      }
    ],
    "/clients/dotnet/5.0/": [
      {
        "text": ".NET TCP client v5",
        "children": [
          "README.md",
          "connecting.md",
          "appending.md",
          "reading.md",
          "subscriptions.md",
          "projections.md",
          "security.md",
          "streams.md",
          "embedded.md"
        ],
        "path": "..undefined",
        "version": "5.0.11 (.NET)",
        "group": "TCP SDK"
      }
    ],
    "/clients/dotnet/20.10/": [
      {
        "text": ".NET TCP client v20.10",
        "children": [
          "README.md",
          "connecting.md",
          "appending.md",
          "reading.md",
          "subscriptions.md",
          "projections.md",
          "security.md",
          "streams.md",
          "embedded.md"
        ],
        "path": "..undefined",
        "version": "20.10.0 (.NET)",
        "group": "TCP SDK"
      }
    ],
    "/clients/dotnet/21.2/": [
      {
        "text": ".NET TCP client v21.2",
        "children": [
          "README.md",
          "connecting.md",
          "appending.md",
          "reading.md",
          "subscriptions.md",
          "projections.md",
          "security.md",
          "streams.md",
          "embedded.md"
        ],
        "path": "..undefined",
        "version": "21.2.0 (.NET)",
        "group": "TCP SDK"
      }
    ],
    "/server/generated/v21.6/docs/": [
      {
        "title": "Introduction",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/introduction/",
        "children": [
          "../introduction/",
          "../introduction/clients.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Introduction"
      },
      {
        "title": "Installation",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/installation/",
        "children": [
          "../installation/",
          "../installation/linux.md",
          "../installation/windows.md",
          "../installation/docker.md",
          "../installation/compatibility.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Installation"
      },
      {
        "title": "Configuration",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/configuration/",
        "children": [
          "../configuration/",
          "../configuration/auto-configured-options.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Configuration"
      },
      {
        "title": "Security",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/security/",
        "children": [
          "../security/",
          "../security/configuration.md",
          "../security/authentication.md",
          "../security/acl.md",
          "../security/trusted-intermediary.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Security"
      },
      {
        "title": "Networking",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/networking/",
        "children": [
          "../networking/",
          "../networking/http.md",
          "../networking/tcp.md",
          "../networking/nat.md",
          "../networking/heartbeat.md",
          "../networking/endpoints.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Networking"
      },
      {
        "title": "Clustering",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/clustering/",
        "children": [
          "../clustering/",
          "../clustering/using-dns.md",
          "../clustering/using-ip-addresses.md",
          "../clustering/gossip.md",
          "../clustering/node-roles.md",
          "../clustering/acknowledgements.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Clustering"
      },
      {
        "title": "Indexes",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/indexes/",
        "children": [
          "../indexes/",
          "../indexes/configuration.md",
          "../indexes/tuning.md",
          "../indexes/advanced.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Indexes"
      },
      {
        "title": "Projections",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/projections/",
        "children": [
          "../projections/",
          "../projections/configuration.md",
          "../projections/system-projections.md",
          "../projections/user-defined-projections.md",
          "../projections/projections-config.md",
          "../projections/debugging.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Projections"
      },
      {
        "title": "Persistent Subscriptions",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/persistent-subscriptions/",
        "children": [
          "../persistent-subscriptions/"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Persistent Subscriptions"
      },
      {
        "title": "Operations",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/operations/",
        "children": [
          "../operations/",
          "../operations/scavenge.md",
          "../operations/scavenge-options.md",
          "../operations/database-backup.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Operations"
      },
      {
        "title": "Diagnostics",
        "collapsable": true,
        "path": "../server/generated/v21.6/docs/diagnostics/",
        "children": [
          "../diagnostics/",
          "../diagnostics/logging.md",
          "../diagnostics/stats.md",
          "../diagnostics/histograms.md",
          "../diagnostics/prometheus.md",
          "../diagnostics/datadog.md"
        ],
        "version": "21.6",
        "group": "Server",
        "text": "Diagnostics"
      },
      {
        "title": "Event streams",
        "collapsable": true,
        "children": [
          "streams/metadata-and-reserved-names.md",
          "streams/deleting-streams-and-events.md",
          "streams/system-streams.md"
        ],
        "path": "..undefined",
        "version": "21.6",
        "group": "Server",
        "text": "Event streams"
      }
    ],
    "/server/generated/v21.2/docs/": [
      {
        "title": "Introduction",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/introduction/",
        "children": [
          "../introduction/",
          "../introduction/clients.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Introduction"
      },
      {
        "title": "Installation",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/installation/",
        "children": [
          "../installation/",
          "../installation/linux.md",
          "../installation/windows.md",
          "../installation/docker.md",
          "../installation/compatibility.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Installation"
      },
      {
        "title": "Configuration",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/configuration/",
        "children": [
          "../configuration/"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Configuration"
      },
      {
        "title": "Security",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/security/",
        "children": [
          "../security/",
          "../security/configuration.md",
          "../security/authentication.md",
          "../security/acl.md",
          "../security/trusted-intermediary.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Security"
      },
      {
        "title": "Networking",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/networking/",
        "children": [
          "../networking/",
          "../networking/http.md",
          "../networking/tcp.md",
          "../networking/nat.md",
          "../networking/heartbeat.md",
          "../networking/endpoints.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Networking"
      },
      {
        "title": "Clustering",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/clustering/",
        "children": [
          "../clustering/",
          "../clustering/using-dns.md",
          "../clustering/using-ip-addresses.md",
          "../clustering/gossip.md",
          "../clustering/node-roles.md",
          "../clustering/acknowledgements.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Clustering"
      },
      {
        "title": "Indexes",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/indexes/",
        "children": [
          "../indexes/",
          "../indexes/configuration.md",
          "../indexes/tuning.md",
          "../indexes/advanced.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Indexes"
      },
      {
        "title": "Projections",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/projections/",
        "children": [
          "../projections/",
          "../projections/configuration.md",
          "../projections/system-projections.md",
          "../projections/user-defined-projections.md",
          "../projections/projections-config.md",
          "../projections/debugging.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Projections"
      },
      {
        "title": "Persistent Subscriptions",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/persistent-subscriptions/",
        "children": [
          "../persistent-subscriptions/"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Persistent Subscriptions"
      },
      {
        "title": "Operations",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/operations/",
        "children": [
          "../operations/",
          "../operations/scavenge.md",
          "../operations/scavenge-options.md",
          "../operations/database-backup.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Operations"
      },
      {
        "title": "Diagnostics",
        "collapsable": true,
        "path": "../server/generated/v21.2/docs/diagnostics/",
        "children": [
          "../diagnostics/",
          "../diagnostics/logging.md",
          "../diagnostics/stats.md",
          "../diagnostics/histograms.md",
          "../diagnostics/prometheus.md",
          "../diagnostics/datadog.md"
        ],
        "version": "21.2",
        "group": "Server",
        "text": "Diagnostics"
      },
      {
        "title": "Event streams",
        "collapsable": true,
        "children": [
          "streams/metadata-and-reserved-names.md",
          "streams/deleting-streams-and-events.md",
          "streams/system-streams.md"
        ],
        "path": "..undefined",
        "version": "21.2",
        "group": "Server",
        "text": "Event streams"
      }
    ],
    "/server/generated/v20.10/docs/": [
      {
        "title": "Introduction",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/introduction/",
        "children": [
          "../introduction/",
          "../introduction/clients.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Introduction"
      },
      {
        "title": "Installation",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/installation/",
        "children": [
          "../installation/",
          "../installation/linux.md",
          "../installation/windows.md",
          "../installation/docker.md",
          "../installation/compatibility.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Installation"
      },
      {
        "title": "Configuration",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/configuration/",
        "children": [
          "../configuration/",
          "../configuration/auto-configured-options.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Configuration"
      },
      {
        "title": "Security",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/security/",
        "children": [
          "../security/",
          "../security/configuration.md",
          "../security/authentication.md",
          "../security/acl.md",
          "../security/trusted-intermediary.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Security"
      },
      {
        "title": "Networking",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/networking/",
        "children": [
          "../networking/",
          "../networking/http.md",
          "../networking/tcp.md",
          "../networking/nat.md",
          "../networking/heartbeat.md",
          "../networking/endpoints.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Networking"
      },
      {
        "title": "Clustering",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/clustering/",
        "children": [
          "../clustering/",
          "../clustering/using-dns.md",
          "../clustering/using-ip-addresses.md",
          "../clustering/gossip.md",
          "../clustering/node-roles.md",
          "../clustering/acknowledgements.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Clustering"
      },
      {
        "title": "Indexes",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/indexes/",
        "children": [
          "../indexes/",
          "../indexes/configuration.md",
          "../indexes/tuning.md",
          "../indexes/advanced.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Indexes"
      },
      {
        "title": "Projections",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/projections/",
        "children": [
          "../projections/",
          "../projections/configuration.md",
          "../projections/system-projections.md",
          "../projections/user-defined-projections.md",
          "../projections/projections-config.md",
          "../projections/debugging.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Projections"
      },
      {
        "title": "Persistent Subscriptions",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/persistent-subscriptions/",
        "children": [
          "../persistent-subscriptions/"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Persistent Subscriptions"
      },
      {
        "title": "Operations",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/operations/",
        "children": [
          "../operations/",
          "../operations/scavenge.md",
          "../operations/scavenge-options.md",
          "../operations/database-backup.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Operations"
      },
      {
        "title": "Diagnostics",
        "collapsable": true,
        "path": "../server/generated/v20.10/docs/diagnostics/",
        "children": [
          "../diagnostics/",
          "../diagnostics/logging.md",
          "../diagnostics/stats.md",
          "../diagnostics/histograms.md",
          "../diagnostics/prometheus.md",
          "../diagnostics/datadog.md"
        ],
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Diagnostics"
      },
      {
        "title": "Event streams",
        "collapsable": true,
        "children": [
          "streams/metadata-and-reserved-names.md",
          "streams/deleting-streams-and-events.md",
          "streams/system-streams.md"
        ],
        "path": "..undefined",
        "version": "20.10 LTS",
        "group": "Server",
        "text": "Event streams"
      }
    ],
    "/server/generated/v5/docs/": [
      {
        "title": "Introduction",
        "collapsable": true,
        "path": "../server/generated/v5/docs/introduction/",
        "children": [
          "../introduction/",
          "../introduction/clients.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Introduction"
      },
      {
        "title": "Installation",
        "path": "../server/generated/v5/docs/installation/",
        "collapsable": true,
        "children": [
          "../installation/",
          "../installation/linux.md",
          "../installation/docker.md",
          "../installation/windows.md",
          "../installation/macos.md",
          "../installation/configuration.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Installation"
      },
      {
        "title": "Clustering",
        "collapsable": true,
        "path": "../server/generated/v5/docs/clustering/",
        "children": [
          "../clustering/",
          "../clustering/using-dns.md",
          "../clustering/using-ip-addresses.md",
          "../clustering/gossip.md",
          "../clustering/node-roles.md",
          "../clustering/acknowledgements.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Clustering"
      },
      {
        "title": "Networking",
        "collapsable": true,
        "path": "../server/generated/v5/docs/networking/",
        "children": [
          "../networking/",
          "../networking/external.md",
          "../networking/internal.md",
          "../networking/nat.md",
          "../networking/heartbeat.md",
          "../networking/endpoints.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Networking"
      },
      {
        "title": "Security",
        "collapsable": true,
        "path": "../server/generated/v5/docs/security/",
        "children": [
          "../security/",
          "../security/authentication.md",
          "../security/trusted-intermediary.md",
          "../security/acl.md",
          "../security/ssl-linux.md",
          "../security/ssl-windows.md",
          "../security/ssl-docker.md",
          "../security/configuration.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Security"
      },
      {
        "title": "Admin UI",
        "collapsable": true,
        "path": "../server/generated/v5/docs/admin-ui/",
        "children": [
          "../admin-ui/"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Admin UI"
      },
      {
        "title": "Server",
        "collapsable": true,
        "path": "../server/generated/v5/docs/server/",
        "children": [
          "../server/",
          "../server/default-directories.md",
          "../server/database.md",
          "../server/threading.md",
          "../server/caching.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Server"
      },
      {
        "title": "Indexes",
        "collapsable": true,
        "path": "../server/generated/v5/docs/indexes/",
        "children": [
          "../indexes/",
          "../indexes/configuration.md",
          "../indexes/tuning.md",
          "../indexes/advanced.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Indexes"
      },
      {
        "title": "Operations",
        "collapsable": true,
        "path": "../server/generated/v5/docs/operations/",
        "children": [
          "../operations/",
          "../operations/scavenge.md",
          "../operations/scavenge-options.md",
          "../operations/database-backup.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Operations"
      },
      {
        "title": "Diagnostics",
        "collapsable": true,
        "path": "../server/generated/v5/docs/diagnostics/",
        "children": [
          "../diagnostics/",
          "../diagnostics/logging.md",
          "../diagnostics/stats.md",
          "../diagnostics/histograms.md",
          "../diagnostics/prometheus.md",
          "../diagnostics/datadog.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Diagnostics"
      },
      {
        "title": "Projections",
        "collapsable": true,
        "path": "../server/generated/v5/docs/projections/",
        "children": [
          "../projections/",
          "../projections/configuration.md",
          "../projections/system-projections.md",
          "../projections/user-defined-projections.md",
          "../projections/projections-config.md",
          "../projections/debugging.md"
        ],
        "version": "5.0.11",
        "group": "Server",
        "text": "Projections"
      },
      {
        "title": "Event streams",
        "collapsable": true,
        "children": [
          "streams/metadata-and-reserved-names.md",
          "streams/deleting-streams-and-events.md",
          "streams/system-streams.md"
        ],
        "path": "..undefined",
        "version": "5.0.11",
        "group": "Server",
        "text": "Event streams"
      }
    ],
    "/server/generated/v5/docs/http-api/": [
      {
        "title": "HTTP API",
        "collapsable": true,
        "path": "../server/generated/v5/docs/http-api/",
        "children": [
          "../",
          "../appending-events.md",
          "../reading-streams.md",
          "../deleting-a-stream.md",
          "../description-document.md",
          "../optimistic-concurrency-and-idempotence.md",
          "../stream-metadata.md"
        ],
        "version": "5.0.11",
        "group": "HTTP API",
        "text": "HTTP API"
      },
      {
        "title": "Security",
        "collapsable": true,
        "path": "../server/generated/v5/docs/http-api/security/",
        "children": [
          "../security/"
        ],
        "version": "5.0.11",
        "group": "HTTP API",
        "text": "Security"
      },
      {
        "title": "Persistent subscriptions",
        "collapsable": true,
        "path": "../server/generated/v5/docs/http-api/persistent/",
        "children": [
          "../persistent/"
        ],
        "version": "5.0.11",
        "group": "HTTP API",
        "text": "Persistent subscriptions"
      },
      {
        "title": "Projections",
        "collapsable": true,
        "path": "../server/generated/v5/docs/http-api/projections/",
        "children": [
          "../projections/",
          "../projections/api.md"
        ],
        "version": "5.0.11",
        "group": "HTTP API",
        "text": "Projections"
      },
      {
        "title": "Optional headers",
        "collapsable": true,
        "path": "../server/generated/v5/docs/http-api/optional-http-headers/",
        "children": [
          "../optional-http-headers/",
          "../optional-http-headers/eventid.md",
          "../optional-http-headers/eventtype.md",
          "../optional-http-headers/expected-version.md",
          "../optional-http-headers/harddelete.md",
          "../optional-http-headers/longpoll.md",
          "../optional-http-headers/requires-master.md",
          "../optional-http-headers/resolve-linkto.md"
        ],
        "version": "5.0.11",
        "group": "HTTP API",
        "text": "Optional headers"
      },
      {
        "title": "API reference",
        "collapsable": true,
        "path": "../server/generated/v5/docs/http-api/api/",
        "children": [
          "../api/"
        ],
        "version": "5.0.11",
        "group": "HTTP API",
        "text": "API reference"
      }
    ]
  },
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "repo": null,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "editLink": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
