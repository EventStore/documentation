<template><h1 id="security" tabindex="-1"><a class="header-anchor" href="#security" aria-hidden="true">#</a> Security</h1>
<p>EventStoreDB supports basic authentication for HTTP API and TCP calls, and supports access control lists (ACL) for streams.</p>
<h2 id="authentication" tabindex="-1"><a class="header-anchor" href="#authentication" aria-hidden="true">#</a> Authentication</h2>
<h3 id="user-authentication-and-authorization" tabindex="-1"><a class="header-anchor" href="#user-authentication-and-authorization" aria-hidden="true">#</a> User authentication and authorization</h3>
<p>EventStoreDB supports basic HTTP authentication to internal users. You create and manage these users with the RESTful API or the Admin UI. Read more in the <RouterLink to="/server/generated/v21.2/docs/http-api/api/#create-a-user">users management guide</RouterLink>. Once you have added users, you can use their details with HTTP requests or native client's authorization process.</p>
<p>Alternatively you can also use the 'trusted intermediary' header for externalized authentication that allows you to integrate almost any authentication system with EventStoreDB. Read more about <RouterLink to="/server/generated/v21.2/docs/security/trusted-intermediary.html">the trusted intermediary header</RouterLink>.</p>
<p>If you were to use the wrong user or no user when connecting to EventStoreDB, you receive a <code>401 Unauthorized</code> response for HTTP API or Exception for native client.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Change default password for default users and disable unused users.</p>
</div>
<h3 id="secure-eventstoredb-node" tabindex="-1"><a class="header-anchor" href="#secure-eventstoredb-node" aria-hidden="true">#</a> Secure EventStoreDB node</h3>
<p>We recommend you run EventStoreDB over TLS to encrypt the user information. <RouterLink to="/server/generated/v21.2/docs/security/ssl-linux.html">Read this guide for instructions</RouterLink>. If you are running the clustered version you can also setup TLS for the replication protocol.</p>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>It is recommended to use latest TLS version instead of SSL <a href="https://en.wikipedia.org/wiki/Transport_Layer_Security#SSL_1.0,_2.0,_and_3.0" target="_blank" rel="noopener noreferrer">explanation available here<OutboundLink/></a>. All references to SSL in documentation or code are there for only historical reasons and will be replaced with TLS in the future.</p>
</div>
<div class="custom-container warning"><p class="custom-container-title">WARNING</p>
<p>Avoid exposing EventStoreDB to the global internet network.</p>
</div>
</template>
