---
outputFileName: index.html
---

# Stats and debug information

Event Store has a lot of debug and statistics information available about a cluster you can find with the following request:

### [HTTP API](#tab/tabid-stats-bash)

[!code-bash[server-stats](~/code-examples/server/stats.sh?start=1&end=1)]

### [Response](#tab/tabid-stats-response)

[!code-bash[server-stats-response](~/code-examples/server/stats.sh?range=3-)]

* * *

This returns a lot of information that you can filter using the sub-path of the stat:

### [HTTP API](#tab/tabid-stats-sub-bash)

[!code-bash[server-stats-sub](~/code-examples/server/stats-tcp.sh?start=1&end=1)]

### [Response](#tab/tabid-stats-sub-response)

[!code-bash[server-stats-sub-response](~/code-examples/server/stats-tcp.sh?range=3-)]

* * *

You can find more information on what each stat returns by searching for it in the reference code documentation under _.NET API -> Code Documentation_.

<!-- TODO: Make this better, embed -->
