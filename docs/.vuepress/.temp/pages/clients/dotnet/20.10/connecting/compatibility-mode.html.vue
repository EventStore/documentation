<template><h1 id="compatibility-mode" tabindex="-1"><a class="header-anchor" href="#compatibility-mode" aria-hidden="true">#</a> Compatibility Mode</h1>
<p>Compatibility Mode was added in v5.0.10 and v21.2.0 of the client to set certain configuration options depending on the Event Store version the client is connecting to. It allows discovering whether the Event Store server is a v5 or v20 server.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Changes were not backported to the v20.10 TCP Client version. To use <code>Compatibility Mode</code> you have to upgrade to at least v21.2.0. It's fully compatible with v20.10.0. Check the details in the <RouterLink to="/clients/dotnet/21.2/connecting/compatibility-mode.html">TCP Compatibility Mode client v21.2 docs</RouterLink>.</p>
</div>
<h2 id="auto-compatibility-mode" tabindex="-1"><a class="header-anchor" href="#auto-compatibility-mode" aria-hidden="true">#</a> Auto-Compatibility Mode</h2>
<p>Auto-Compatibility mode was added to make the upgrade from an insecure v5 cluster to a secure v20+ cluster easier by allowing the client to connect to either server configuration without needing to change the client's connection settings.</p>
<p>It does this by sending both an insecure and a secure gossip request when first discovering the server. Whichever of these requests succeeds sets whether the gossip is to be done over HTTP or HTTPS. Once the cluster is discovered, the client will check the gossip to determine whether the TCP connection should be secure or insecure, and connect accordingly.</p>
<p>This means that you no longer need to specify <code>GossipOverTls</code> or <code>UseSslConnection</code> in the connection settings or connection string.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Changes were not backported to the v20.10 TCP Client version. To use <code>Auto-Compatibility Mode</code> you have to upgrade to at least v21.2.0. It's fully compatible with v20.10.0. Check the details in the <RouterLink to="/clients/dotnet/21.2/connecting/compatibility-mode.html#auto-compatibility-mode">Auto-Compatibility Mode client v21.2 docs</RouterLink>.</p>
</div>
</template>
