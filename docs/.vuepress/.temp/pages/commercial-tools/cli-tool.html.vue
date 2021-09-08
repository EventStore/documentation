<template><h1 id="node-administration-cli" tabindex="-1"><a class="header-anchor" href="#node-administration-cli" aria-hidden="true">#</a> Node administration CLI</h1>
<p>This CLI tool is a command line interface for administering EventStoreDB nodes. It allows you to run tasks similar to those available in the web admin interface and SDKs, including administrating users, projections and configuration.</p>
<h2 id="download" tabindex="-1"><a class="header-anchor" href="#download" aria-hidden="true">#</a> Download</h2>
<!-- TODO: Refactor to VuePress -->
<p class="call-to-action">
<a href="/downloads/es_cli.windows.1.7.0.zip" class="btn btn--primary">EventStoreDB CLI 1.7.0 for Windows</a>
<a href="/downloads/es_cli.osx.1.7.0.tar.gz" class="btn btn--primary">EventStoreDB CLI 1.7.0 for macOS</a>
<a href="/downloads/es_cli.linux.1.7.0.tar.gz" class="btn btn--primary">EventStoreDB CLI 1.7.0 for Linux</a>
</p>
<!-- TODO: packages? -->
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token operator">&lt;</span>sub-command<span class="token operator">></span> <span class="token punctuation">[</span>args<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Where <code>&lt;command&gt;</code> is equal to the section, and <code>&lt;sub-command&gt;</code> the operation. For example, to shutdown a node:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin <span class="token function">shutdown</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="connecting-and-authentication" tabindex="-1"><a class="header-anchor" href="#connecting-and-authentication" aria-hidden="true">#</a> Connecting and authentication</h3>
<p>Using the CLI tool requires specifying an EventStoreDB node by passing the URL with the <code>--serveurl</code> option, and your admin credentials with the <code>--username</code> and <code>--password</code> options:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli --serverurl<span class="token operator">=</span><span class="token string">"http://localhost:2113"</span> --username<span class="token operator">=</span>admin --password<span class="token operator">=</span>changeit
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration" aria-hidden="true">#</a> Configuration</h2>
<p>You can also create a file with configuration values at the correct file path for your operating system.</p>
<TabView ><TabPanel header="Windows"><div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token operator">%</span>AppData%<span class="token operator">/</span>eventstore<span class="token punctuation">.</span>rc
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></TabPanel><TabPanel header="Linux and macOS"><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>~/.eventstorerc
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div></TabPanel></TabView><p>The configuration file may contain any of the following values:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">serverurl</span><span class="token operator">=</span><span class="token string">"http://127.0.0.1:2113"</span>
<span class="token assign-left variable">username</span><span class="token operator">=</span><span class="token string">"admin"</span>
<span class="token assign-left variable">password</span><span class="token operator">=</span><span class="token string">"changeit"</span>
<span class="token assign-left variable">output</span><span class="token operator">=</span><span class="token string">"json"</span> <span class="token comment"># Or XML</span>
<span class="token assign-left variable">verbose</span><span class="token operator">=</span>true <span class="token comment"># Or false</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="commands" tabindex="-1"><a class="header-anchor" href="#commands" aria-hidden="true">#</a> Commands</h2>
<p>Usage:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli <span class="token punctuation">[</span><span class="token operator">&lt;</span>options<span class="token operator">></span><span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>args<span class="token operator">></span><span class="token punctuation">]</span>
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
<td><code>--version</code></td>
<td>Get the version of EventStoreDB CLI</td>
</tr>
<tr>
<td><code>--help</code></td>
<td>Display help</td>
</tr>
<tr>
<td><code>--output</code></td>
<td>How output should be formatted (<code>text</code> or <code>json</code>)</td>
</tr>
<tr>
<td><code>--password</code></td>
<td>The admin password</td>
</tr>
<tr>
<td><code>--serverurl</code></td>
<td>The url of the EventStoreDB server</td>
</tr>
<tr>
<td><code>--username</code></td>
<td>The admin username</td>
</tr>
<tr>
<td><code>--verbose</code></td>
<td>Verbose output of requests sent to the EventStoreDB node</td>
</tr>
</tbody>
</table>
<h3 id="commands-summary" tabindex="-1"><a class="header-anchor" href="#commands-summary" aria-hidden="true">#</a> Commands summary</h3>
<table>
<thead>
<tr>
<th>Command</th>
<th>Sub commands</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#admin">admin</a></td>
<td><a href="#admin-scavenge">scavenge</a>, <a href="#admin-shutdown">shutdown</a>, <a href="#admin-merge_indexes">merge_indexes</a>, <a href="#admin-calculate_stream_size">calculate_stream_size</a>, <a href="#admin-backup">backup</a>, <a href="#admin-restore">restore</a>, <a href="#admin-s3_backup">s3_backup</a>, <a href="#admin-s3_restore">s3_restore</a>, <a href="#admin-azure_backup">azure_backup</a>, <a href="#admin-azure_restore">azure_restore</a>, <a href="#admin-verify_db">verify_db</a>, <a href="#admin-clear_scavenge_streams">clear_scavenge_streams</a>, <a href="#admin-delete_streams">delete_streams</a></td>
</tr>
<tr>
<td><a href="#user">user</a></td>
<td><a href="#user-add">add</a>, <a href="#user-change_password">change_password</a>, <a href="#user-delete">delete</a>, <a href="#user-disable">disable</a>, <a href="#user-update">update</a>, <a href="#user-enable">enable</a>, <a href="#user-list">list</a>, <a href="#user-reset_password">reset_password</a></td>
</tr>
<tr>
<td><a href="#projections">projections</a></td>
<td><a href="#projections-delete">delete</a>, <a href="#projections-disable">disable</a>, <a href="#projections-enable">enable</a>, <a href="#projections-list">list</a>, <a href="#projections-new">new</a>, <a href="#projections-result">result</a>, <a href="#projections-state">state</a>, <a href="#projections-status">status</a>, <a href="#projections-restore_checkpoint">restore_checkpoint</a>, <a href="#projections-has_stalled">has_stalled</a></td>
</tr>
<tr>
<td><a href="#competing">competing</a></td>
<td><a href="#competing-list">list</a>, <a href="#competing-create">create</a>, <a href="#competing-update">update</a></td>
</tr>
<tr>
<td><a href="#config_generator">config_generator</a></td>
<td><a href="#config_generator-create_config">create_config</a></td>
</tr>
</tbody>
</table>
<h3 id="command-details" tabindex="-1"><a class="header-anchor" href="#command-details" aria-hidden="true">#</a> Command details</h3>
<h4 id="admin" tabindex="-1"><a class="header-anchor" href="#admin" aria-hidden="true">#</a> admin</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin <span class="token punctuation">[</span>--version<span class="token punctuation">]</span> <span class="token punctuation">[</span>--help<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>args<span class="token operator">></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><table>
<thead>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#admin-azure_backup">azure_backup</a></td>
<td>Backs up the EventStoreDB database to the specified container in Azure Blob Storage</td>
</tr>
<tr>
<td><a href="#admin-azure_restore">azure_restore</a></td>
<td>Restores an EventStoreDB database from a specified container in Azure Blob Storage</td>
</tr>
<tr>
<td><a href="#admin-backup">backup</a></td>
<td>Backs up the EventStoreDB database to the destination directory</td>
</tr>
<tr>
<td><a href="#admin-calculate_stream_size">calculate_stream_size</a></td>
<td>Calculates the size on disk of the give stream</td>
</tr>
<tr>
<td><a href="#admin-clear_scavenge_streams">clear_scavenge_streams</a></td>
<td>Deletes all the scavenge history streams</td>
</tr>
<tr>
<td><a href="#admin-delete_streams">delete_streams</a></td>
<td>Deletes streams matching the specified regular expression</td>
</tr>
<tr>
<td><a href="#admin-merge_indexes">merge_indexes</a></td>
<td>Manually merge indexes of EventStoreDB</td>
</tr>
<tr>
<td><a href="#admin-restore">restore</a></td>
<td>Restores the EventStoreDB database from the provided location to the destination directory</td>
</tr>
<tr>
<td><a href="#admin-s3_backup">s3_backup</a></td>
<td>Backs up the EventStoreDB to an S3 bucket</td>
</tr>
<tr>
<td><a href="#admin-s3_restore">s3_restore</a></td>
<td>Restores EventStoreDB from an S3 bucket</td>
</tr>
<tr>
<td><a href="#admin-scavenge">scavenge</a></td>
<td>Schedule a scavenge on EventStoreDB</td>
</tr>
<tr>
<td><a href="#admin-shutdown">shutdown</a></td>
<td>Shutdown the EventStoreDB instance</td>
</tr>
<tr>
<td><a href="#admin-verify_db">verify_db</a></td>
<td>Verify the integrity of an EventStore database</td>
</tr>
</tbody>
</table>
<h4 id="admin-azure-backup" tabindex="-1"><a class="header-anchor" href="#admin-azure-backup" aria-hidden="true">#</a> admin azure_backup</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin azure_backup <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Backs up the EventStoreDB database to the specified container in Azure Blob Storage.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-databasesource</code></td>
<td>The location of the EventStoreDB database</td>
</tr>
<tr>
<td><code>-indexsource</code></td>
<td>The location of the EventStoreDB index (default: databasesource/index)</td>
</tr>
<tr>
<td><code>-differential</code></td>
<td>Backup only new or changed files</td>
</tr>
<tr>
<td><code>-deleteextra</code></td>
<td>Delete extraneous files from the destination (with -differential only)</td>
</tr>
<tr>
<td><code>-storageaccountname</code></td>
<td>The name of the storage account</td>
</tr>
<tr>
<td><code>-storageaccountkey</code></td>
<td>The account key of the storage account (found in <strong>security</strong> &gt; <strong>access keys</strong> on azure)</td>
</tr>
<tr>
<td><code>-databasecontainer</code></td>
<td>The destination container of the database backup</td>
</tr>
<tr>
<td><code>-indexcontainer</code></td>
<td>The destination container of the index backup (default: databasecontainer-index)</td>
</tr>
<tr>
<td><code>-maxretrycount</code></td>
<td>The number of times to retry an upload before cancelling the backup (default: 3)</td>
</tr>
<tr>
<td><code>-y</code></td>
<td>Automatically confirm prompt to delete files from the destination directory</td>
</tr>
</tbody>
</table>
<h4 id="admin-azure-restore" tabindex="-1"><a class="header-anchor" href="#admin-azure-restore" aria-hidden="true">#</a> admin azure_restore</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin azure_restore <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Restores an EventStoreDB database from a specified container in Azure Blob Storage.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-databasesource</code></td>
<td>The location of the EventStoreDB database</td>
</tr>
<tr>
<td><code>-indexsource</code></td>
<td>The location of the EventStoreDB index (default: databasesource/index)</td>
</tr>
<tr>
<td><code>-storageaccountname</code></td>
<td>The name of the storage account</td>
</tr>
<tr>
<td><code>-storageaccountkey</code></td>
<td>The account key of the storage account (found in <strong>security</strong> &gt; <strong>access keys</strong> on azure)</td>
</tr>
<tr>
<td><code>-databasecontainer</code></td>
<td>The container of the database backup</td>
</tr>
<tr>
<td><code>-indexcontainer</code></td>
<td>The container of the index backup (default: databasecontainer-index)</td>
</tr>
<tr>
<td><code>-maxretrycount</code></td>
<td>The number of times to retry a download before cancelling the restore (default: 3)</td>
</tr>
<tr>
<td><code>-y</code></td>
<td>Automatically confirm prompt to delete the files in the destination folders if they exist</td>
</tr>
</tbody>
</table>
<h4 id="admin-backup" tabindex="-1"><a class="header-anchor" href="#admin-backup" aria-hidden="true">#</a> admin backup</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin backup <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Backs up the EventStoreDB database to the destination directory.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-databasesource</code></td>
<td>The location of the EventStoreDB database</td>
</tr>
<tr>
<td><code>-databasedestination</code></td>
<td>The backup destination</td>
</tr>
<tr>
<td><code>-indexsource</code></td>
<td>The location of the Index files (default: databasesource/index)</td>
</tr>
<tr>
<td><code>-indexdestination</code></td>
<td>The index backup destination (default: databasedestination/index)</td>
</tr>
<tr>
<td><code>-differential</code></td>
<td>Backup only new or changed files</td>
</tr>
<tr>
<td><code>-deleteextra</code></td>
<td>Delete extraneous files from the destination (with -differential only)</td>
</tr>
<tr>
<td><code>-y</code></td>
<td>Automatically confirm prompt to delete files from the destination directory</td>
</tr>
</tbody>
</table>
<h4 id="admin-calculate-stream-size" tabindex="-1"><a class="header-anchor" href="#admin-calculate-stream-size" aria-hidden="true">#</a> admin calculate_stream_size</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin calculate_stream_size <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Calculates the size on disk of the given stream.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-streamname</code></td>
<td>Stream Name</td>
</tr>
</tbody>
</table>
<h4 id="admin-clear-scavenge-streams" tabindex="-1"><a class="header-anchor" href="#admin-clear-scavenge-streams" aria-hidden="true">#</a> admin clear_scavenge_streams</h4>
<p>no options</p>
<h4 id="admin-delete-streams" tabindex="-1"><a class="header-anchor" href="#admin-delete-streams" aria-hidden="true">#</a> admin delete_streams</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin delete_streams <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Deletes streams matching the specified regular expression.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-pattern</code></td>
<td>Regular expression that the streams must match</td>
</tr>
<tr>
<td><code>-list</code></td>
<td>Only list the streams matching the pattern, do not delete them</td>
</tr>
<tr>
<td><code>-fromall</code></td>
<td>Force read stream names from $all</td>
</tr>
<tr>
<td><code>-fromstreams</code></td>
<td>Force read stream names from $streams</td>
</tr>
<tr>
<td><code>-noverify</code></td>
<td>Does not verify if the stream exists (faster)</td>
</tr>
<tr>
<td></td>
<td>USE THE FOLLOWING OPTIONS WITH CAUTION!</td>
</tr>
<tr>
<td><code>-hard</code></td>
<td>Hard delete the streams (Default: soft delete)</td>
</tr>
<tr>
<td><code>-system</code></td>
<td>Include system streams (starting with $) for deletion</td>
</tr>
<tr>
<td><code>-y</code></td>
<td>Automatically confirm prompt to delete a stream</td>
</tr>
</tbody>
</table>
<h4 id="admin-merge-indexes" tabindex="-1"><a class="header-anchor" href="#admin-merge-indexes" aria-hidden="true">#</a> admin merge_indexes</h4>
<p>No options.</p>
<h4 id="admin-restore" tabindex="-1"><a class="header-anchor" href="#admin-restore" aria-hidden="true">#</a> admin restore</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin restore <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Restores the EventStoreDB database from the provided location to the destination directory.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-databasesource</code></td>
<td>The location of the backup to restore</td>
</tr>
<tr>
<td><code>-databasedestination</code></td>
<td>The destination of the restore</td>
</tr>
<tr>
<td><code>-indexsource</code></td>
<td>The location of the index backup (default: databasesource/index)</td>
</tr>
<tr>
<td><code>-indexdestination</code></td>
<td>The destination of the index restore (default: databasedestination/index)</td>
</tr>
<tr>
<td><code>-y</code></td>
<td>Automatic yes to prompts to delete files from destination directory</td>
</tr>
</tbody>
</table>
<h4 id="admin-s3-backup" tabindex="-1"><a class="header-anchor" href="#admin-s3-backup" aria-hidden="true">#</a> admin s3_backup</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin s3_backup <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Backs up an EventStoreDB database to the destination S3 bucket.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-databasesource</code></td>
<td>The location of the EventStoreDB database</td>
</tr>
<tr>
<td><code>-databasedestination</code></td>
<td>The backup destination in the s3 bucket</td>
</tr>
<tr>
<td><code>-s3bucket</code></td>
<td>The name of the S3 bucket</td>
</tr>
<tr>
<td><code>-indexsource</code></td>
<td>The location of the Index files (default: databasesource/index)</td>
</tr>
<tr>
<td><code>-indexdestination</code></td>
<td>The index backup destination (default: databasedestination/index)</td>
</tr>
<tr>
<td><code>-differential</code></td>
<td>Backup only new or changed files</td>
</tr>
<tr>
<td><code>-deleteextra</code></td>
<td>Delete extraneous files from the destination (with -differential only)</td>
</tr>
<tr>
<td><code>-awsregion</code></td>
<td>The AWS region of the bucket</td>
</tr>
<tr>
<td><code>-awsaccesskeyid</code></td>
<td>The AWS access key to use (if not provided, use environment variables)</td>
</tr>
<tr>
<td><code>-awssecretkey</code></td>
<td>The AWS secret key to use (if not provided, use environment variables)</td>
</tr>
<tr>
<td><code>-awstoken</code></td>
<td>The AWS token to use</td>
</tr>
<tr>
<td><code>-y</code></td>
<td>Automatically confirm prompt to delete files from the destination directory</td>
</tr>
</tbody>
</table>
<h4 id="admin-s3-restore" tabindex="-1"><a class="header-anchor" href="#admin-s3-restore" aria-hidden="true">#</a> admin s3_restore</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin s3_restore <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Restores an EventStoreDB database from an S3 bucket.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-databasesource</code></td>
<td>The location in the S3 bucket of the backup to restore</td>
</tr>
<tr>
<td><code>-databasedestination</code></td>
<td>The destination of the restore</td>
</tr>
<tr>
<td><code>-s3bucket</code></td>
<td>The name of the S3 bucket</td>
</tr>
<tr>
<td><code>-indexsource</code></td>
<td>The location in the S3 bucket of the index backup (default: databasesource/index)</td>
</tr>
<tr>
<td><code>-indexdestination</code></td>
<td>The destination of the index restore (default: databasedestination/index)</td>
</tr>
<tr>
<td><code>-awsregion</code></td>
<td>The AWS region of the bucket</td>
</tr>
<tr>
<td><code>-awsaccesskeyid</code></td>
<td>The AWS access key to use (if not provided, use environment variables)</td>
</tr>
<tr>
<td><code>-awssecretkey</code></td>
<td>The AWS secret key to use (if not provided, use environment variables)</td>
</tr>
<tr>
<td><code>-awstoken</code></td>
<td>The AWS token to use</td>
</tr>
<tr>
<td><code>-y</code></td>
<td>Automatically confirm prompt to delete all files from the destination folder</td>
</tr>
</tbody>
</table>
<h4 id="admin-scavenge" tabindex="-1"><a class="header-anchor" href="#admin-scavenge" aria-hidden="true">#</a> admin scavenge</h4>
<p>No options.</p>
<h4 id="admin-shutdown" tabindex="-1"><a class="header-anchor" href="#admin-shutdown" aria-hidden="true">#</a> admin shutdown</h4>
<p>No options.</p>
<h4 id="admin-verify-db" tabindex="-1"><a class="header-anchor" href="#admin-verify-db" aria-hidden="true">#</a> admin verify_db</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli admin verify_db <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Verify the integrity of an EventStoreDB database.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-databasepath</code></td>
<td>The path to the EventStoreDB database directory on disk</td>
</tr>
<tr>
<td><code>-indexpath</code></td>
<td>The path to the EventStoreDB index directory on disk  (default: databasepath/index)</td>
</tr>
<tr>
<td><code>-skipdbverify</code></td>
<td>Skip database verification (default: false)</td>
</tr>
<tr>
<td><code>-skipindexverify</code></td>
<td>Skip index verification (default: false)</td>
</tr>
</tbody>
</table>
<p>An output file called 'verify_db.error.log' will be written to the current working directory.</p>
<h4 id="user" tabindex="-1"><a class="header-anchor" href="#user" aria-hidden="true">#</a> user</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli user <span class="token punctuation">[</span>--version<span class="token punctuation">]</span> <span class="token punctuation">[</span>--help<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>args<span class="token operator">></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><table>
<thead>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#user-add">add</a></td>
<td>Add a user</td>
</tr>
<tr>
<td><a href="#user-change_password">change_password</a></td>
<td>Change the user password</td>
</tr>
<tr>
<td><a href="#user-delete">delete</a></td>
<td>Delete a user</td>
</tr>
<tr>
<td><a href="#user-disable">disable</a></td>
<td>Disable a user</td>
</tr>
<tr>
<td><a href="#user-enable">enable</a></td>
<td>Enable a user</td>
</tr>
<tr>
<td><a href="#user-list">list</a></td>
<td>List all users</td>
</tr>
<tr>
<td><a href="#user-reset_password">reset_password</a></td>
<td>Reset a user's password</td>
</tr>
<tr>
<td><a href="#user-update">update</a></td>
<td>Update a user</td>
</tr>
</tbody>
</table>
<h4 id="user-add" tabindex="-1"><a class="header-anchor" href="#user-add" aria-hidden="true">#</a> user add</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli <span class="token function">useradd</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Add a user.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-loginname</code></td>
<td>Login Name</td>
</tr>
<tr>
<td><code>-password</code></td>
<td>Password</td>
</tr>
<tr>
<td><code>-fullname</code></td>
<td>Full Name</td>
</tr>
<tr>
<td><code>-isadmin</code></td>
<td>Is Administrator</td>
</tr>
<tr>
<td><code>-isoperations</code></td>
<td>Is Operations</td>
</tr>
</tbody>
</table>
<h4 id="user-change-password" tabindex="-1"><a class="header-anchor" href="#user-change-password" aria-hidden="true">#</a> user change_password</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli user change_password <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Change the password for the given user.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-loginname</code></td>
<td>The login name of the user to update</td>
</tr>
<tr>
<td><code>-newpassword</code></td>
<td>The new password for the given user</td>
</tr>
<tr>
<td><code>-currentpassword</code></td>
<td>The current password for the given user</td>
</tr>
</tbody>
</table>
<h4 id="user-delete" tabindex="-1"><a class="header-anchor" href="#user-delete" aria-hidden="true">#</a> user delete</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli user delete <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Delete a user.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-loginname</code></td>
<td>The login name of the user to delete</td>
</tr>
</tbody>
</table>
<h4 id="user-disable" tabindex="-1"><a class="header-anchor" href="#user-disable" aria-hidden="true">#</a> user disable</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli user disable <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Disable a user.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-loginname</code></td>
<td>The login name of the user to disable</td>
</tr>
</tbody>
</table>
<h4 id="user-update" tabindex="-1"><a class="header-anchor" href="#user-update" aria-hidden="true">#</a> user update</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli user update <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Update a user.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-loginname</code></td>
<td>Login Name</td>
</tr>
<tr>
<td><code>-fullname</code></td>
<td>Full Name</td>
</tr>
<tr>
<td><code>-isadmin</code></td>
<td>Is Administrator</td>
</tr>
<tr>
<td><code>-isoperations</code></td>
<td>Is Operations</td>
</tr>
</tbody>
</table>
<h4 id="user-enable" tabindex="-1"><a class="header-anchor" href="#user-enable" aria-hidden="true">#</a> user enable</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli user <span class="token builtin class-name">enable</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Enable a user.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-loginname</code></td>
<td>The login name of the user to enable</td>
</tr>
</tbody>
</table>
<h4 id="user-list" tabindex="-1"><a class="header-anchor" href="#user-list" aria-hidden="true">#</a> user list</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli user list <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>List all users.</p>
<h4 id="user-reset-password" tabindex="-1"><a class="header-anchor" href="#user-reset-password" aria-hidden="true">#</a> user reset_password</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli user reset_password <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Reset a user's password.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-loginname</code></td>
<td>The login name of the user</td>
</tr>
<tr>
<td><code>-newpassword</code></td>
<td>The new password for the given user</td>
</tr>
</tbody>
</table>
<h4 id="projections" tabindex="-1"><a class="header-anchor" href="#projections" aria-hidden="true">#</a> projections</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections <span class="token punctuation">[</span>--version<span class="token punctuation">]</span> <span class="token punctuation">[</span>--help<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>args<span class="token operator">></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><table>
<thead>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#projections-delete">delete</a></td>
<td>Delete a projection</td>
</tr>
<tr>
<td><a href="#projections-disable">disable</a></td>
<td>Disable a projection</td>
</tr>
<tr>
<td><a href="#projections-enable">enable</a></td>
<td>Enable a projection</td>
</tr>
<tr>
<td><a href="#projections-has_stalled">has_stalled</a></td>
<td>Determines whether a projection has possibly stalled</td>
</tr>
<tr>
<td><a href="#projections-list">list</a></td>
<td>List all of the projections</td>
</tr>
<tr>
<td><a href="#projections-new">new</a></td>
<td>Create a new projection</td>
</tr>
<tr>
<td><a href="#projections-restore_checkpoint">restore_checkpoint</a></td>
<td>Restore a previous checkpoint for a projection</td>
</tr>
<tr>
<td><a href="#projections-result">result</a></td>
<td>Get the result of a projection</td>
</tr>
<tr>
<td><a href="#projections-state">state</a></td>
<td>Get the state of a projection</td>
</tr>
<tr>
<td><a href="#projections-status">status</a></td>
<td>Get the status of a projection</td>
</tr>
</tbody>
</table>
<h4 id="projections-delete" tabindex="-1"><a class="header-anchor" href="#projections-delete" aria-hidden="true">#</a> projections delete</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections delete <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Delete a projection.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
<tr>
<td><code>-deletestatestream</code></td>
<td>Delete the State Stream</td>
</tr>
<tr>
<td><code>-deletecheckpointstream</code></td>
<td>Delete the Checkpoint Stream</td>
</tr>
</tbody>
</table>
<h4 id="projections-disable" tabindex="-1"><a class="header-anchor" href="#projections-disable" aria-hidden="true">#</a> projections disable</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections disable <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Disable a projection.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
</tbody>
</table>
<h4 id="projections-enable" tabindex="-1"><a class="header-anchor" href="#projections-enable" aria-hidden="true">#</a> projections enable</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections <span class="token builtin class-name">enable</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Enable a projection.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
</tbody>
</table>
<h4 id="projections-list" tabindex="-1"><a class="header-anchor" href="#projections-list" aria-hidden="true">#</a> projections list</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections list <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>List all the projections.</p>
<h4 id="projections-new" tabindex="-1"><a class="header-anchor" href="#projections-new" aria-hidden="true">#</a> projections new</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections new <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Create a new projection.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
<tr>
<td><code>-type</code></td>
<td>Type of projection ([o]netime, [c]ontinuous, [t]ransient)</td>
</tr>
<tr>
<td><code>-query</code></td>
<td>The projection query (Prefix with @ to load from file. e.g. @projectionquery.json)</td>
</tr>
</tbody>
</table>
<h4 id="projections-result" tabindex="-1"><a class="header-anchor" href="#projections-result" aria-hidden="true">#</a> projections result</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections result <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Get the result of a projection.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
<tr>
<td><code>-partition</code></td>
<td>The partition of the result you are querying for</td>
</tr>
</tbody>
</table>
<h4 id="projections-state" tabindex="-1"><a class="header-anchor" href="#projections-state" aria-hidden="true">#</a> projections state</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections state <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Get the state of a projection.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
<tr>
<td><code>-partition</code></td>
<td>The partition of the state you are querying for</td>
</tr>
</tbody>
</table>
<h4 id="projections-status" tabindex="-1"><a class="header-anchor" href="#projections-status" aria-hidden="true">#</a> projections status</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections status <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Get the status of a projection.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
</tbody>
</table>
<h4 id="projections-restore-checkpoint" tabindex="-1"><a class="header-anchor" href="#projections-restore-checkpoint" aria-hidden="true">#</a> projections restore_checkpoint</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections restore_checkpoint <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Restore a previous checkpoint for a projection.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
</tbody>
</table>
<h4 id="projections-has-stalled" tabindex="-1"><a class="header-anchor" href="#projections-has-stalled" aria-hidden="true">#</a> projections has_stalled</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli projections has_stalled <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Determines whether a projection has stalled.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-name</code></td>
<td>The projection name</td>
</tr>
</tbody>
</table>
<h4 id="competing" tabindex="-1"><a class="header-anchor" href="#competing" aria-hidden="true">#</a> competing</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli competing <span class="token punctuation">[</span>--version<span class="token punctuation">]</span> <span class="token punctuation">[</span>--help<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>args<span class="token operator">></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><table>
<thead>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#competing-create">create</a></td>
<td>Create a new subscription</td>
</tr>
<tr>
<td><a href="#competing-delete">delete</a></td>
<td>Delete an existing subscription</td>
</tr>
<tr>
<td><a href="#competing-list">list</a></td>
<td>List the subscriptions</td>
</tr>
<tr>
<td><a href="#competing-update">update</a></td>
<td>Update an existing subscription</td>
</tr>
</tbody>
</table>
<h4 id="competing-list" tabindex="-1"><a class="header-anchor" href="#competing-list" aria-hidden="true">#</a> competing list</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli competing list <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>List the subscriptions.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-streamid</code></td>
<td>The name of the stream to list subscriptions for</td>
</tr>
<tr>
<td><code>-subscription_name</code></td>
<td>The name of the subscription to list</td>
</tr>
</tbody>
</table>
<h4 id="competing-create" tabindex="-1"><a class="header-anchor" href="#competing-create" aria-hidden="true">#</a> competing create</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli competing create <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Create a new subscription.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-streamid</code></td>
<td>The stream to subscribe to</td>
</tr>
<tr>
<td><code>-subscription_name</code></td>
<td>The name of the subscription group</td>
</tr>
<tr>
<td><code>-config</code></td>
<td>The settings to create the subscription with (Prefix with @ to load from file. e.g. @subscriptionConfig.json)</td>
</tr>
</tbody>
</table>
<h4 id="competing-update" tabindex="-1"><a class="header-anchor" href="#competing-update" aria-hidden="true">#</a> competing update</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli competing update <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Update an existing subscription.</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-streamid</code></td>
<td>The stream to update the subscription on</td>
</tr>
<tr>
<td><code>-subscription_name</code></td>
<td>The name of the subscription group to update</td>
</tr>
<tr>
<td><code>-config</code></td>
<td>The settings to update the subscription with (Prefix with @ to load from file. e.g. @subscriptionConfig.json)</td>
</tr>
</tbody>
</table>
<h4 id="config-generator" tabindex="-1"><a class="header-anchor" href="#config-generator" aria-hidden="true">#</a> config_generator</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli config_generator <span class="token punctuation">[</span>--version<span class="token punctuation">]</span> <span class="token punctuation">[</span>--help<span class="token punctuation">]</span> <span class="token operator">&lt;</span>command<span class="token operator">></span> <span class="token punctuation">[</span><span class="token operator">&lt;</span>args<span class="token operator">></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><table>
<thead>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="config_generator-create_config">create_config</a></td>
<td>Generates config files with recommended settings based on the provided options.</td>
</tr>
</tbody>
</table>
<h4 id="config-generator-create-config" tabindex="-1"><a class="header-anchor" href="#config-generator-create-config" aria-hidden="true">#</a> config_generator create_config</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>es-cli config_generator createconfig <span class="token punctuation">[</span>options<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>Generates config files with recommended settings based on the provided options.</p>
<p>Output options:</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-output</code></td>
<td>The destination for the generated config files (if nothing, just prints to STDOUT)</td>
</tr>
</tbody>
</table>
<p>General options:</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-db</code></td>
<td>The location of the EventStoreDB database</td>
</tr>
<tr>
<td><code>-index</code></td>
<td>The location of the EventStoreDB index</td>
</tr>
<tr>
<td><code>-log</code></td>
<td>The location of the EventStoreDB logs</td>
</tr>
<tr>
<td><code>-run_projections</code></td>
<td>The level of projections to run (none, system, all)</td>
</tr>
</tbody>
</table>
<p>Cluster options:</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-node_count</code></td>
<td>The number of database nodes in the cluster (default: 1)</td>
</tr>
<tr>
<td><code>-gossip_discovery</code></td>
<td>How nodes in the cluster will discover each other (gossipseed, dns)</td>
</tr>
<tr>
<td><code>-dns_name</code></td>
<td>The DNS name to use for gossip discovery</td>
</tr>
</tbody>
</table>
<p>Network options:</p>
<table>
<thead>
<tr>
<th>Option</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>-network_type</code></td>
<td>The type of network the nodes will be running in (lan, cloud)</td>
</tr>
<tr>
<td><code>-internal_ips</code></td>
<td>The internal IP addresses of the nodes, separated by a comma (node order should be the same as other ip arguments</td>
</tr>
<tr>
<td><code>-external_ips</code></td>
<td>The external IP addresses of the nodes, separated by a comma (node order should be the same as other ip arguments</td>
</tr>
</tbody>
</table>
<h2 id="further-help" tabindex="-1"><a class="header-anchor" href="#further-help" aria-hidden="true">#</a> Further help</h2>
<p>For further information you can use the <code>--help</code> option at the <code>es-cli</code> top level, the section level, or for individual operations.</p>
<h2 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting" aria-hidden="true">#</a> Troubleshooting</h2>
<p>The CLI tools uses the HTTP API and you can output the requests and responses from the calls by setting the <code>--verbose</code> configuration value to <code>true</code>.</p>
<p>If you encounter any issues, please open a ticket on freshdesk.</p>
<h2 id="changelog" tabindex="-1"><a class="header-anchor" href="#changelog" aria-hidden="true">#</a> Changelog</h2>
<h3 id="_1-7-0" tabindex="-1"><a class="header-anchor" href="#_1-7-0" aria-hidden="true">#</a> 1.7.0</h3>
<ul>
<li>Added <code>verify_db</code> command under <code>admin</code> section to verify integrity of chunks, indexes and checkpoint files.</li>
</ul>
<h3 id="_1-6-0" tabindex="-1"><a class="header-anchor" href="#_1-6-0" aria-hidden="true">#</a> 1.6.0</h3>
<ul>
<li>Added <code>merge_indexes</code> command under <code>admin</code> section to trigger manual index merges when setting <code>MaxAutoMergeIndexLevel</code></li>
<li>Added <code>db_stats</code> command under <code>admin</code> section which processes chunk files locally and outputs stream statistics in CSV format</li>
</ul>
<h3 id="_1-5-0" tabindex="-1"><a class="header-anchor" href="#_1-5-0" aria-hidden="true">#</a> 1.5.0</h3>
<ul>
<li>Added -deleteextra option to differential backup (for local, s3 and azure) to allow deleting of extraneous files from the destination (useful do delete previous versions of scavenged chunks from the destination)</li>
<li>Bugfix: Copy last chunk file to a temporary location before backing it up</li>
<li>Miscellaneous bug fixes</li>
</ul>
<h3 id="_1-4-0" tabindex="-1"><a class="header-anchor" href="#_1-4-0" aria-hidden="true">#</a> 1.4.0</h3>
<ul>
<li>Added support for differential backup (for local, s3 and azure)</li>
<li>Improved backup UI</li>
</ul>
<h3 id="_1-3-0" tabindex="-1"><a class="header-anchor" href="#_1-3-0" aria-hidden="true">#</a> 1.3.0</h3>
<ul>
<li>Added a command to calculate the size on disk of a stream</li>
<li>Added a command to delete streams matching a specific pattern</li>
<li>Fixed the name of one of the S3 backup command options</li>
<li>Added backup/restore commands for Microsoft Azure</li>
<li>Added a config generator command that generates sample configuration based on provided criteria</li>
</ul>
<h3 id="_1-2-0" tabindex="-1"><a class="header-anchor" href="#_1-2-0" aria-hidden="true">#</a> 1.2.0</h3>
<ul>
<li>Added backup/restore commands for Amazon S3 as well as local disk</li>
<li>Added Restore Checkpoint for Projections</li>
<li>Added the ability for the CLI to check if a projection has potentially stalled</li>
</ul>
<h3 id="_1-1-0" tabindex="-1"><a class="header-anchor" href="#_1-1-0" aria-hidden="true">#</a> 1.1.0</h3>
<ul>
<li>There was an issue with versions prior to 3.7.0 of EventStoreDB where bad events could be appended to $scavenge-{id} and the $scavenges streams.</li>
<li>With the release of version 1.1.0 of the CLI we have included a clear_scavenge_streams command under the admin section which will read through the $all stream and delete the $scavenges-{id} and $scavenges streams.</li>
</ul>
</template>
