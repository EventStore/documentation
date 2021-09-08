<template><h1 id="access-control-lists" tabindex="-1"><a class="header-anchor" href="#access-control-lists" aria-hidden="true">#</a> Access Control Lists</h1>
<p>Alongside authentication, EventStoreDB supports per stream configuration of Access Control Lists (ACL). To configure the ACL of a stream go to its head and look for the <code>metadata</code> relationship link to fetch the metadata for the stream.</p>
<p>For more information on the structure of Access Control Lists read <RouterLink to="/server/generated/v21.2/docs/security/users-and-access-control-lists.html">Access Control Lists</RouterLink>.</p>
<h3 id="acl-example" tabindex="-1"><a class="header-anchor" href="#acl-example" aria-hidden="true">#</a> ACL example</h3>
<p>The ACL below gives <code>writer</code> read and write permission on the stream, while <code>reader</code> has read permission on the stream. Only users in the <code>$admins</code> group can delete the stream or read and write the metadata.</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token class-name"><span class="token keyword">var</span></span> metadata <span class="token operator">=</span> StreamMetadata<span class="token punctuation">.</span><span class="token function">Build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">SetCustomPropertyWithValueAsRawJsonString</span><span class="token punctuation">(</span>
        <span class="token string">"customRawJson"</span><span class="token punctuation">,</span>
        <span class="token string">@"{
            ""$acl"": {
                ""$w"": ""writer"",
                ""$r"": [
                    ""reader"",
                    ""also-reader""
                ],
                ""$d"": ""$admins"",
                ""$mw"": ""$admins"",
                ""$mr"": ""$admins""
            }
        }"</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">await</span> connection<span class="token punctuation">.</span><span class="token function">SetStreamMetadataAsync</span><span class="token punctuation">(</span>
    streamName<span class="token punctuation">,</span> 
    ExpectedVersion<span class="token punctuation">.</span>Any<span class="token punctuation">,</span> 
    metadata<span class="token punctuation">,</span> 
    adminCredentials
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div></template>
