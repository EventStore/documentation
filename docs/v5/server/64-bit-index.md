---
outputFileName: index.html
sinceVersion: 3.9.0
---

# Rebuilding indexes

As of version 3.9.0 all future indexes use 64-bit hashes instead of 32-bit hashes. Event Store automatically transitions your indexes from 32-bit to 64-bit by writing all new indexes as 64-bit indexes during the merge process.

If you prefer to use only 64-bit indexes immediately you can force this change. For a small database, delete the _index_ folder in your database folder, and let it rebuild (this might take a while)

If you have a large database, or it's stored in remote storage, and you can't lose downtime, you can run this operation offline on another node with the following steps:

1.  [Take a back up](~/server/database-backup.md).
2.  [Restore the backup](~/server/database-backup.md) to fast local disks.
3.  Delete the _index_ folder from back up.
4.  Run Event Store with a cluster size 3 to prevent other writes. It will rebuild the index.
5.  Restore the index back to a node (_index_ folder).
6.  Let Event Store catch up from master.
7.  Repeat the restore for other nodes.

For other indices, your index will change to 64-bit due to the merging process that occurs over time.
