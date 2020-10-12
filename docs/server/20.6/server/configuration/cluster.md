# Cluster configuration

EventStoreDB runs fully secure by default. All communication protocols must be secured with SSL (gRPC and HTTP) and TLS (TCP). It means that before starting it, you need to configure the certificates that the cluster will use.

You can also run EventStoreDB in insecure mode, which disables _all_ kinds of security, including client credentials and access control. We advise you not to use the insecure mode for production deployments, unless you absolutely have to.

Follow the instructions on this page to set up a cluster with or without security.

:::: el-tabs
::: el-tab-pane label="Secure"

Secure configuration

:::
::: el-tab-pane label="Insecure"

Insecure

:::
