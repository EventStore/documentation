<template><h1 id="ldap-authentication-plugin-for-eventstoredb" tabindex="-1"><a class="header-anchor" href="#ldap-authentication-plugin-for-eventstoredb" aria-hidden="true">#</a> LDAP Authentication Plugin for EventStoreDB</h1>
<p>This plugin allows any LDAP protocol based directory services the ability to act as the authentication authority for EventStoreDB.</p>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>The LDAP plugin is included as part of the commercial builds.</p>
</div>
<p>To configure EventStoreDB to use the LDAP authentication plugin, make the following changes to <RouterLink to="/v5/server/cluster-with-manager-nodes.html#configuring-nodes">the configuration file of a database node</RouterLink>. You can make these changes after installation, but you need to stop the service, change the configuration and restart the service.</p>
<p>Set the authentication type to <code>ldaps</code>, and configure the plugin with an <code>LdapsAuth</code> section..</p>
<p>An example configuration file in YAML:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">AuthenticationType</span><span class="token punctuation">:</span> ldaps
<span class="token key atrule">LdapsAuth</span><span class="token punctuation">:</span>
  <span class="token key atrule">Host</span><span class="token punctuation">:</span> 13.88.9.49
  <span class="token key atrule">Port</span><span class="token punctuation">:</span> <span class="token number">636</span> <span class="token comment">#to use plaintext protocol, set Port to 389 and UseSSL to false </span>
  <span class="token key atrule">UseSSL</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">ValidateServerCertificate</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment">#set this to true to validate the certificate chain</span>
  <span class="token key atrule">AnonymousBind</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">BindUser</span><span class="token punctuation">:</span> cn=binduser<span class="token punctuation">,</span>dc=mycompany<span class="token punctuation">,</span>dc=local
  <span class="token key atrule">BindPassword</span><span class="token punctuation">:</span> p@ssw0rd<span class="token tag">!</span>
  <span class="token key atrule">BaseDn</span><span class="token punctuation">:</span> ou=Lab<span class="token punctuation">,</span>dc=mycompany<span class="token punctuation">,</span>dc=local
  <span class="token key atrule">ObjectClass</span><span class="token punctuation">:</span> organizationalPerson
  <span class="token key atrule">Filter</span><span class="token punctuation">:</span> sAMAccountName
  <span class="token key atrule">RequireGroupMembership</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment">#set this to true to allow authentication only if the user is a member of the group specified by RequiredGroupDn</span>
  <span class="token key atrule">GroupMembershipAttribute</span><span class="token punctuation">:</span> memberOf
  <span class="token key atrule">RequiredGroupDn</span><span class="token punctuation">:</span> cn=ES<span class="token punctuation">-</span>Users<span class="token punctuation">,</span>dc=mycompany<span class="token punctuation">,</span>dc=local
  <span class="token key atrule">PrincipalCacheDurationSec</span><span class="token punctuation">:</span> <span class="token number">60</span>
  <span class="token key atrule">LdapGroupRoles</span><span class="token punctuation">:</span>
      <span class="token key atrule">'cn=ES-Accounting,ou=Staff,dc=mycompany,dc=local'</span><span class="token punctuation">:</span> accounting
      <span class="token key atrule">'cn=ES-Operations,ou=Staff,dc=mycompany,dc=local'</span><span class="token punctuation">:</span> it
      <span class="token key atrule">'cn=ES-Admins,ou=Staff,dc=mycompany,dc=local'</span><span class="token punctuation">:</span> <span class="token string">'$admins'</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>When a user authenticates against the LDAP server by attempting a bind using the provided username/password the user is assigned roles by using the active domain groups the user is part of. You can see this in the <code>LdapGroupRoles</code> section.</p>
<p>EventStoreDB has 2 built-in roles (<code>$admins</code> and <code>$ops</code>) which you can assign users. Users who belong to the <code>$admins</code> group can perform any operation in a non-restrictive manner.</p>
<h2 id="troubleshooting-common-problems" tabindex="-1"><a class="header-anchor" href="#troubleshooting-common-problems" aria-hidden="true">#</a> Troubleshooting common problems</h2>
<p>If there is a misconfiguration an error is logged to the server's log file in most cases.</p>
<h3 id="invalid-bind-credentials-specified" tabindex="-1"><a class="header-anchor" href="#invalid-bind-credentials-specified" aria-hidden="true">#</a> Invalid bind credentials specified</h3>
<ul>
<li>Verify the <code>BindUser</code> and <code>BindPassword</code> parameters</li>
</ul>
<h3 id="exception-during-search-no-such-object-or-the-object-does-not-exist" tabindex="-1"><a class="header-anchor" href="#exception-during-search-no-such-object-or-the-object-does-not-exist" aria-hidden="true">#</a> Exception during search - 'No such Object' or 'The object does not exist'</h3>
<ul>
<li>Verify the <code>BaseDn</code> parameter</li>
</ul>
<h3 id="server-certificate-error-or-connect-error-the-authentication-or-decryption-has-failed" tabindex="-1"><a class="header-anchor" href="#server-certificate-error-or-connect-error-the-authentication-or-decryption-has-failed" aria-hidden="true">#</a> 'Server certificate error' or 'Connect Error - The authentication or decryption has failed'</h3>
<ul>
<li>Verify that the server certificate is valid. If it is a self-signed certificate, set <code>ValidateServerCertificate</code> to <code>false</code>.</li>
</ul>
<h3 id="the-ldap-server-is-unavailable" tabindex="-1"><a class="header-anchor" href="#the-ldap-server-is-unavailable" aria-hidden="true">#</a> The LDAP server is unavailable.</h3>
<ul>
<li>Verify connectivity to the LDAP server from an EventStoreDB node (e.g. using <code>netcat</code> or <code>telnet</code>)</li>
<li>Verify the <code>Host</code> and <code>Port</code> parameters</li>
<li>Verify that the server certificate is valid. If it is a self-signed certificate, set <code>ValidateServerCertificate</code> to <code>false</code>.</li>
</ul>
<h3 id="error-authenticating-with-ldaps-server-system-aggregateexception-one-or-more-errors-occurred-system-nullreferenceexception-object-reference-not-set-to-an-instance-of-an-object-at-novell-directory-ldap-connection-connect-string-host-int32-port-int32-semaphoreid" tabindex="-1"><a class="header-anchor" href="#error-authenticating-with-ldaps-server-system-aggregateexception-one-or-more-errors-occurred-system-nullreferenceexception-object-reference-not-set-to-an-instance-of-an-object-at-novell-directory-ldap-connection-connect-string-host-int32-port-int32-semaphoreid" aria-hidden="true">#</a> Error authenticating with LDAPS server. System.AggregateException: One or more errors occurred. ---&gt; System.NullReferenceException: Object reference not set to an instance of an object. at Novell.Directory.Ldap.Connection.connect(String host, Int32 port, Int32 semaphoreId)</h3>
<ul>
<li>Due to a packaging bug, this error may be thrown when setting <code>UseSSL: true</code> on Windows. The workaround is to extract Mono.Security.dll to the <em>EventStore</em> folder (where <em>EventStore.ClusterNode.exe</em> is located)</li>
</ul>
<h3 id="no-errors-in-server-logs-but-cannot-login" tabindex="-1"><a class="header-anchor" href="#no-errors-in-server-logs-but-cannot-login" aria-hidden="true">#</a> No errors in server logs but cannot login</h3>
<ul>
<li>Verify the <code>ObjectClass</code> and <code>Filter</code> parameters</li>
<li>If you have set <code>RequireGroupMembership</code> to <code>true</code>, verify that the user is part of the group specified by <code>RequiredGroupDn</code> and that the LDAP record has the <code>memberOf</code> attribute (specified by <code>GroupMembershipAttribute</code>)</li>
</ul>
</template>
