<template><h2 id="expanding-disks" tabindex="-1"><a class="header-anchor" href="#expanding-disks" aria-hidden="true">#</a> Expanding disks</h2>
<p>Disks can be expanded on-demand, to accommodate database growth, through the <a href="https://console.eventstore.cloud/" target="_blank" rel="noopener noreferrer">Cloud Console<OutboundLink/></a> and the <a href="https://github.com/EventStore/esc" target="_blank" rel="noopener noreferrer">Event Store Cloud CLI<OutboundLink/></a></p>
<p>See also the cloud <a href="../provision/cloud-instance-guidance#sizes">sizing guide</a> for general guidance.</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>Limitations:</p>
<ul>
<li>on AWS expanding disks is subject to a rate limit, see <a href="https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyVolume.html" target="_blank" rel="noopener noreferrer">here<OutboundLink/></a> for more information.</li>
<li>on Azure, it is currently not possible to expand disks. To increase disk size you need to perform a backup and restore or replicate to a cluster with larger disks.</li>
</ul>
</div><h3 id="using-the-cloud-console" tabindex="-1"><a class="header-anchor" href="#using-the-cloud-console" aria-hidden="true">#</a> Using the Cloud Console</h3>
<p>To expand disks in the console, navigate to the clusters view and click on the <em>Expand Disks</em> icon.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/disk_expand_list.png" alt="cluster list"></p>
</template></Card><p>On the detail page specify the new disk size and click on <em>Expand cluster disk</em>.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/disk_expand_detail.png" alt="cluster_expand_detail"></p>
</template></Card><h3 id="using-the-command-line" tabindex="-1"><a class="header-anchor" href="#using-the-command-line" aria-hidden="true">#</a> Using the command line</h3>
<p>To expand disks with  the command line, use the <code>clusters expand</code> command, where <code>--id</code> is the cluster id.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc mesdb clusters <span class="token function">expand</span> <span class="token punctuation">\</span>
    --disk-size-in-gb <span class="token number">16</span> --id c3fi17to0aer9r834480 <span class="token punctuation">\</span>
    --project-id c3fhvdto0aepmg0789m0 <span class="token punctuation">\</span>
    --org-id bt77lfqrh41scaatc180
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="event-store-cloud-jobs" tabindex="-1"><a class="header-anchor" href="#event-store-cloud-jobs" aria-hidden="true">#</a> Event Store Cloud Jobs</h2>
<p>The Event Store Cloud runs scheduled jobs on the user's behalf. All of these jobs consist of a human-readable description and a schedule.</p>
<p>Currently, the following jobs are supported:</p>
<ul>
<li><a href="#scheduled-backups">Scheduled backups</a></li>
</ul>
<h3 id="job-schedules" tabindex="-1"><a class="header-anchor" href="#job-schedules" aria-hidden="true">#</a> Job Schedules</h3>
<p>The schedule format used by the Event Store Cloud CLI tool and API is a simplified subset of <a href="https://en.wikipedia.org/wiki/Cron#Overview" target="_blank" rel="noopener noreferrer">cron<OutboundLink/></a>, in the future we may support more cron features.</p>
<p>The supported subset is:</p>
<ul>
<li>for the first field, minute:
<ul>
<li>a wildcard <code>*</code></li>
<li>a number between <code>0</code> and <code>59</code> (inclusive).</li>
<li>a rate, written as a wildcard divided by a number. E.g:  <code>*/15</code></li>
</ul>
</li>
<li>For the second field, hour:
<ul>
<li>a wildcard <code>*</code></li>
<li>a number must be between <code>0</code> and <code>23</code> (inclusive)</li>
<li>a rate, written as a wildcard divided by a number. E.g:  <code>*/1</code></li>
</ul>
</li>
<li>for the third field, day of month:
<ul>
<li>a wildcard <code>*</code></li>
</ul>
</li>
<li>for the fourth field, month:
<ul>
<li>a wildcard <code>*</code></li>
</ul>
</li>
<li>for the fifth field, day of the week:
<ul>
<li>a wildcard <code>*</code></li>
<li>a number between <code>0</code> and <code>7</code> (inclusive), Sunday to Saturday</li>
</ul>
</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> ┌───────────── Minute: wildcard, number (0 - 59), rate
 │ ┌─────────── Hour: wildcard, number (0 - 23), rate
 │ │ ┌───────── Day of the month: wildcard
 │ │ │ ┌─────── Month: wildcard
 │ │ │ │ ┌───── Day of the week: wildcard, number (0 - 7) 
 │ │ │ │ │
 * * * * * 
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><div class="custom-container note"><p class="custom-container-title">NOTE</p><p>Scheduled backups have a minimum frequency of 60 minutes. Currently, it is not possible to schedule backups more frequently.</p>
</div><h4 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples:</h4>
<p><code>0 */1 * * *</code> runs a job once an hour, at minute 00.</p>
<p><code>0 12 * * 1</code> runs a job at 12:00 PM on Monday.</p>
<p><code>30 13 * * 0</code> runs a job at 13:30 PM on Sunday.</p>
<h2 id="manual-backup" tabindex="-1"><a class="header-anchor" href="#manual-backup" aria-hidden="true">#</a> Manual Backup</h2>
<p>Backups can be created on demand using the <a href="https://console.eventstore.cloud/" target="_blank" rel="noopener noreferrer">Cloud Console<OutboundLink/></a> and the <a href="https://github.com/EventStore/esc" target="_blank" rel="noopener noreferrer">Event Store Cloud CLI<OutboundLink/></a>.</p>
<p>Manually created backups appear in the console alongside backups created by scheduled jobs.</p>
<p>To see the status of the backup, navigate to the <code>Backups</code> section of the console. There you can see all backups created manually or by a scheduled job.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/one_off_backup.png" alt="one off backup"></p>
</template></Card><p>You can customise the backup label using a combination of free-text and predefined variables:</p>
<ul>
<li><strong>index</strong> - the auto-incremented value with the number of backups. You can format it as:
<ul>
<li>decimal: <code>index:decimal</code> (<em>default</em>),</li>
<li>hexadecimal: <code>index:hex</code>.</li>
</ul>
</li>
<li><strong>cluster</strong> - value from the cluster information:
<ul>
<li>description: <code>cluster:description</code> (<em>default</em>),</li>
<li>id: <code>cluster:id</code>,</li>
<li>cloud provider: <code>cluster:provider</code></li>
</ul>
</li>
<li><strong>datetime</strong> - timestamp of when backup was made. You can format it as:
<ul>
<li>UTC time - <code>datetime:utc</code> (<em>default</em>),</li>
<li><a href="https://www.w3.org/Protocols/rfc822/#z28" target="_blank" rel="noopener noreferrer">RFC 822<OutboundLink/></a>: <code>datetime:rfc822</code>,</li>
<li><a href="https://en.wikipedia.org/wiki/Unix_time" target="_blank" rel="noopener noreferrer">Unix<OutboundLink/></a>: <code>datetime:unix</code>,</li>
<li><a href="https://en.m.wikipedia.org/wiki/ISO_8601" target="_blank" rel="noopener noreferrer">JSON<OutboundLink/></a>: <code>datetime:json</code>,</li>
<li><a href="https://tools.ietf.org/html/rfc3339" target="_blank" rel="noopener noreferrer">RFC3339<OutboundLink/></a>: <code>datetime:rfc3339</code>,</li>
</ul>
</li>
</ul>
<h3 id="using-the-cloud-console-1" tabindex="-1"><a class="header-anchor" href="#using-the-cloud-console-1" aria-hidden="true">#</a> Using the Cloud Console</h3>
<p>To create a backup in the console, navigate to the clusters view and click on the <em>Create backup</em> icon. In the popup, click the <code>Create one-off backup</code> button.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/take_backup.png" alt="take backup"></p>
</template></Card><h3 id="using-the-command-line-1" tabindex="-1"><a class="header-anchor" href="#using-the-command-line-1" aria-hidden="true">#</a> Using the command line</h3>
<p>You can also take a backup of your cluster using the <a href="https://github.com/EventStore/esc" target="_blank" rel="noopener noreferrer">Event Store Cloud CLI<OutboundLink/></a>.</p>
<p>To create a backup, use the <code>backups create</code> command:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc mesdb backups create --description <span class="token string">"on demand backup"</span> <span class="token punctuation">\</span>
    --source-cluster-id c1eut65o0aeu6ojco7a0 <span class="token punctuation">\</span>
    --project-id btfjev2rh41scaatc1k0 

BackupId<span class="token punctuation">(</span><span class="token string">"c1ev3l5o0aeu6ojco7b0"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>To see the status of the backup use the <code>backups get</code> command:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc mesdb backups get --project-id btfjev2rh41scaatc1k0 <span class="token punctuation">\</span>
    --id c1ev3l5o0aeu6ojco7b0
    
Backup <span class="token punctuation">{</span> id: BackupId<span class="token punctuation">(</span><span class="token string">"c1ev3l5o0aeu6ojco7b0"</span><span class="token punctuation">)</span>, 
project_id: ProjectId<span class="token punctuation">(</span><span class="token string">"btfjev2rh41scaatc1k0"</span><span class="token punctuation">)</span>, 
source_cluster_id: ClusterId<span class="token punctuation">(</span><span class="token string">"c1eut65o0aeu6ojco7a0"</span><span class="token punctuation">)</span>, 
source_cluster_description: <span class="token string">"Demo-Backup"</span>, 
description: <span class="token string">"on demand backup"</span>, size_gb: <span class="token number">8</span>, 
provider: Aws, region: <span class="token string">"eu-central-1"</span>, 
status: <span class="token string">"available"</span>, created: <span class="token string">"2021-03-26T14:38:12Z"</span>, 
linked_resource: None <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="scheduled-backups" tabindex="-1"><a class="header-anchor" href="#scheduled-backups" aria-hidden="true">#</a> Scheduled Backups</h2>
<p>Scheduled backups can be created through the <a href="https://console.eventstore.cloud/" target="_blank" rel="noopener noreferrer">Cloud Console<OutboundLink/></a> and the <a href="https://github.com/EventStore/esc" target="_blank" rel="noopener noreferrer">Event Store Cloud CLI<OutboundLink/></a></p>
<p>Scheduled backup jobs can be run as frequently as once an hour. After each successful backup, older backups created by the same job will be automatically deleted based on the provided configuration.</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>Multiple scheduled backups can target the same cluster. However, if schedules overlap, one of the jobs will fail as the first backup job will already lock the cluster.</p>
</div><p>For example, you could create one scheduled backup that executes every hour, along with a second scheduled backup that executes once a week. Backups from these scheduled jobs are pruned independently regardless of their age, so if both saved a maximum of four backups, the oldest backup from the weekly job might be close to a month old, while the hourly job's backups would never be older than a fraction of a day.</p>
<h3 id="using-the-cloud-console-2" tabindex="-1"><a class="header-anchor" href="#using-the-cloud-console-2" aria-hidden="true">#</a> Using the Cloud Console</h3>
<p>To create a scheduled backup in the console, navigate to the clusters view and click on the <em>create backup</em> icon and then on <code>Create backup schedule</code>.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/take_backup.png" alt="take backup"></p>
</template></Card><p>Choose a description, the frequency as well as the number of backups to keep before pruning. Finally, click the <code>Create backup schedule</code> button.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/take_scheduled_backup.png" alt="take scheduled backup"></p>
</template></Card><p>Backups created this way appear in the console alongside backups created manually. All backups created by the same job will be grouped together in one row, which can be expanded by clicking the down arrow icon on the right side of the row.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/one_off_restore_scheduled.png" alt="list of scheduled backup"></p>
</template></Card><p>To see the status on the scheduled backup jobs, navigate to the <code>Jobs</code> section of the console.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/jobs_scheduled_backup.png" alt="backup jobs"></p>
</template></Card><p>There you can see all backups created by a job, as well as their history, which operations have failed (if any).</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>A backup might fail, for instance, if a cluster is locked by another operation when the backup tries to run. Such a locking operation could be the disk expand or manual backup.</p>
</div><h3 id="using-the-command-line-2" tabindex="-1"><a class="header-anchor" href="#using-the-command-line-2" aria-hidden="true">#</a> Using the command Line</h3>
<p>A scheduled backup can be created using the Event Store Cloud CLI by using the <code>orchestrate</code> subcommand.</p>
<p>The following call will create a new scheduled backup of the cluster with ID <code>c196ogto0aeqohe3ommq</code>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc orchestrate <span class="token function">jobs</span> create <span class="token punctuation">\</span>
    --description <span class="token string">'My Hourly Backup'</span> <span class="token punctuation">\</span>
    --schedule <span class="token string">'0 */1 * * *'</span> scheduled-backup <span class="token punctuation">\</span>
    --description <span class="token string">'{cluster} Hourly Backup {datetime:RFC3339}'</span> <span class="token punctuation">\</span>
    --max-backup-count <span class="token number">2</span> <span class="token punctuation">\</span>
    --cluster-id c196ogto0aeqohe3ommq
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>For details on the scheduled field, see <RouterLink to="/cloud/ops/">Job Schedules</RouterLink>.</p>
<p>To list current jobs, run:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc orchestrate <span class="token function">jobs</span> list
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>To view the history of a job, run:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc orchestrate <span class="token function">history</span> list --job-id <span class="token operator">&lt;</span>job-id<span class="token operator">></span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h2 id="restore-from-backup" tabindex="-1"><a class="header-anchor" href="#restore-from-backup" aria-hidden="true">#</a> Restore from backup</h2>
<p>Restores can be done on demand using the <a href="https://console.eventstore.cloud/" target="_blank" rel="noopener noreferrer">Cloud Console<OutboundLink/></a> and the <a href="https://github.com/EventStore/esc" target="_blank" rel="noopener noreferrer">Event Store Cloud CLI<OutboundLink/></a>.</p>
<div class="custom-container note"><p class="custom-container-title">NOTE</p><p>Restoring a backup will create a new cluster</p>
</div><p>The topology of the new cluster does not need to be the same as the source of the backup: you can restore a 3 nodes cluster backup to a single node one.
Do make sure that the disk size of the target cluster is large enough.</p>
<h3 id="using-the-cloud-console-3" tabindex="-1"><a class="header-anchor" href="#using-the-cloud-console-3" aria-hidden="true">#</a> Using the Cloud Console</h3>
<p>To restore a backup, navigate to the <code>Backups</code> section fo the <a href="https://console.eventstore.cloud/" target="_blank" rel="noopener noreferrer">Cloud Console<OutboundLink/></a> and click on the <code>Restore</code> icon of the backup you want to restore.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/one_off_restore_scheduled.png" alt="one off restore backup"></p>
</template></Card><p>Backups are restored as new clusters. You will be then redirected to the usual provisioning page, where you can choose your cluster parameters. Note that you are not limited to restoring the backup to exactly the same cluster as the cluster for which the backup was taken. You can change the cluster topology, the database software version, and the instance size. You cannot restore between different cloud providers though.</p>
<Card><template #content><p><img src="@source/cloud/ops/images/one_off_restore_cluster.png" alt="one off restore cluster backup"></p>
</template></Card><h3 id="using-the-command-line-3" tabindex="-1"><a class="header-anchor" href="#using-the-command-line-3" aria-hidden="true">#</a> Using the command line</h3>
<p>You can also restore a backup using the <a href="https://github.com/EventStore/esc" target="_blank" rel="noopener noreferrer">Event Store Cloud CLI<OutboundLink/></a>. As you cannot restore to the existing cluster, you should use the <code>source-backup-id</code> option of the <code>mesdb clusters create</code> command. When the backup id is provided, the CLI tool will create a new cluster using the provided backup.</p>
<p>Example: restoring the backup with ID <code>c10dvoarh41lb9otkdrg</code> to an F1 single node instance.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc mesdb clusters create <span class="token punctuation">\</span>
    --description <span class="token string">"restore"</span> <span class="token punctuation">\</span>
    --source-backup-id c10dvoarh41lb9otkdrg <span class="token punctuation">\</span>
    --instance-type F1 --disk-size-in-gb <span class="token number">10</span> <span class="token punctuation">\</span>
    --disk-type GP2 --network-id c10dr5qrh41lbabqa2j0 <span class="token punctuation">\</span>
    --projection-level off --server-version <span class="token number">20.10</span> <span class="token punctuation">\</span>
    --topology single-node  --project-id c10d0h2rh41lba1v92k0
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>The output will display the new cluster ID:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ClusterId<span class="token punctuation">(</span><span class="token string">"c1mnqjdo0aembuk4ljo0"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><p>You can then get the new cluster status with the following command:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ esc mesdb clusters get --id c1mnqjdo0aembuk4ljo0 <span class="token punctuation">\</span>
    --project-id c10d0h2rh41lba1v92k0 --json
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>The output will be similar to:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"c1mnqjdo0aembuk4ljo0"</span><span class="token punctuation">,</span>
    <span class="token property">"organizationId"</span><span class="token operator">:</span> <span class="token string">"bt77lfqrh41scaatc180"</span><span class="token punctuation">,</span>
    <span class="token property">"projectId"</span><span class="token operator">:</span> <span class="token string">"c10d0h2rh41lba1v92k0"</span><span class="token punctuation">,</span>
    <span class="token property">"networkId"</span><span class="token operator">:</span> <span class="token string">"c10dr5qrh41lbabqa2j0"</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"restore"</span><span class="token punctuation">,</span>
    <span class="token property">"provider"</span><span class="token operator">:</span> <span class="token string">"aws"</span><span class="token punctuation">,</span>
    <span class="token property">"region"</span><span class="token operator">:</span> <span class="token string">"eu-west-2"</span><span class="token punctuation">,</span>
    <span class="token property">"topology"</span><span class="token operator">:</span> <span class="token string">"single-node"</span><span class="token punctuation">,</span>
    <span class="token property">"instanceType"</span><span class="token operator">:</span> <span class="token string">"f1"</span><span class="token punctuation">,</span>
    <span class="token property">"diskSizeGb"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
    <span class="token property">"diskType"</span><span class="token operator">:</span> <span class="token string">"gp2"</span><span class="token punctuation">,</span>
    <span class="token property">"serverVersion"</span><span class="token operator">:</span> <span class="token string">"20.10"</span><span class="token punctuation">,</span>
    <span class="token property">"projectionLevel"</span><span class="token operator">:</span> <span class="token string">"off"</span><span class="token punctuation">,</span>
    <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"available"</span><span class="token punctuation">,</span>
    <span class="token property">"created"</span><span class="token operator">:</span> <span class="token string">"2021-03-26T09:37:17Z"</span><span class="token punctuation">,</span>
    <span class="token property">"addresses"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"tcp"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">"c1mnqjdo0aembuk4ljo0.mesdb.eventstore.cloud:1113"</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"grpc"</span><span class="token operator">:</span> <span class="token string">"esdb://c1mnqjdo0aembuk4ljo0.mesdb.eventstore.cloud:2113"</span><span class="token punctuation">,</span>
    <span class="token property">"ui"</span><span class="token operator">:</span> <span class="token string">"https://c1mnqjdo0aembuk4ljo0.mesdb.eventstore.cloud:2113"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div></template>
