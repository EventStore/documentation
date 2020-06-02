# Stats and debug information

Event Store has a lot of debug and statistics information available about a cluster you can find with the following request:

:::: el-tabs type="border-card"
::: el-tab-pane label="Request"
<<< @/docs/server/5.0/server/sample-code/stats.sh#curl
:::
::: el-tab-pane label="Response"
<<< @/docs/server/5.0/server/sample-code/stats.sh#response
:::
::::

This returns a lot of information that you can filter using the sub-path of the stat:

:::: el-tabs type="border-card"
::: el-tab-pane label="Request"
<<< @/docs/server/5.0/server/sample-code/stats-tcp.sh#curl
:::
::: el-tab-pane label="Response"
<<< @/docs/server/5.0/server/sample-code/stats-tcp.sh#response
:::
::::

You can find more information on what each stat returns by searching for it in the reference code documentation under _.NET API -> Code Documentation_.

<!-- TODO: Make this better, embed -->
