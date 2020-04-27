# Stats and debug information

Event Store has a lot of debug and statistics information available about a cluster you can find with the following request:

::::: tabs
:::: tab HTTP API

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/server/stats.sh)

::::
:::: tab Response

@[code lang=bash transclude={3-393}](@/docs/v5/code-examples/server/stats.sh)

::::
:::::

This returns a lot of information that you can filter using the sub-path of the stat:

::::: tabs
:::: tab HTTP API

@[code lang=bash transclude={1-1}](@/docs/v5/code-examples/server/stats-tcp.sh)

::::
:::: tab Response

@[code lang=bash transclude={3-28}](@/docs/v5/code-examples/server/stats-tcp.sh)

::::
:::::

You can find more information on what each stat returns by searching for it in the reference code documentation under _.NET API -> Code Documentation_.

<!-- TODO: Make this better, embed -->
