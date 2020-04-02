---
outputFileName: index.html
---

# Default directories

The default directories used by Event Store vary by platform to fit with the common practices each platform.

> [!NOTE]
> Paths beginning with "." are relative to the directory in which _eventstored_ or _EventStore.ClusterNode.exe_ are located. Absolute paths are as written.

## Linux

-   **Application:** _/usr/bin_
-   **Content:** _/usr/share/eventstore_
-   **Configuration:** _/etc/eventstore/_
-   **Data:** _/var/lib/eventstore_
-   **Application Logs:** _/var/log/eventstore_
-   **Test Client Logs:** _./testclientlog_
-   **Web Content:** _./clusternode-web_ _then_ _{Content}/clusternode-web_
-   **Projections:** _./projections_ _then_ _{Content}/projections_
-   **Prelude:** _./Prelude_ _then_ _{Content}/Prelude_

## Windows and macOS

-   **Content:** _./_
-   **Configuration:** _./_
-   **Data:** _./data_
-   **Application Logs:** _./logs_
-   **Test Client Log:** _./testclientlogs_
-   **Web Content:** _./clusternode-web_ _then_ _{Content}/clusternode-web_
-   **Projections:** _./projections_ _then_ _{Content}/projections_
-   **Prelude:** _./Prelude_ _then_ _{Content}/Prelude_
