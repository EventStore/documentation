<template><h1 id="indexmap-migration" tabindex="-1"><a class="header-anchor" href="#indexmap-migration" aria-hidden="true">#</a> Indexmap migration</h1>
<p>From EventStoreDB 5 onwards, the format of the indexmap file changed. The indexmap-migrate tool converts EventStoreDB 5 indexmap files to a format compatible with previous EventStoreDB versions. You will need this if you roll back from EventStoreDB 5 to an earlier version.</p>
<!-- TODO: Refactor to VuePress -->
<h2 id="download" tabindex="-1"><a class="header-anchor" href="#download" aria-hidden="true">#</a> Download</h2>
<p class="call-to-action">
<a href="/downloads/indexmap-migrate.windows.zip" class="btn btn--primary">Indexmap migration tool for Windows</a>
<a href="/downloads/indexmap-migrate.macos.zip" class="btn btn--primary">Indexmap migration tool for macOS</a>
<a href="/downloads/indexmap-migrate.linux.x64.zip" class="btn btn--primary">Indexmap migration tool for Linux</a>
</p>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>indexmap-migrate <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="options" tabindex="-1"><a class="header-anchor" href="#options" aria-hidden="true">#</a> Options</h3>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>-h, -help</td>
<td>Display help</td>
</tr>
<tr>
<td>-s, -source-file</td>
<td>Path to the indexmap file in your EventStoreDB 5 installation</td>
</tr>
</tbody>
</table>
</template>
