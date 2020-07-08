# Scavenging options

Scavenging is a necessary regular operation to free up disk space by cleaning up deleted events. Read more about it on the [scavenging page](../operations/scavenging.md). Below you can find some options that change the way how scavenging works on the server node.

## DisableScavengeMerging

--disable-scavenge-merging=VALUE<br/> | DISABLE_SCAVENGE_MERGING | DisableScavengeMerging | Disables the merging of chunks when scavenge is running (Default: False) |

## ScavengeHistoryMaxAge

--scavenge-history-max-age=VALUE<br/> | SCAVENGE_HISTORY_MAX_AGE | ScavengeHistoryMaxAge | The number of days to keep scavenge history (Default: 30) |

## AlwaysKeepScavenged

--always-keep-scavenged=VALUE<br/> | ALWAYS_KEEP_SCAVENGED | AlwaysKeepScavenged | Always keeps the newer chunks from a scavenge operation. (Default: False) |

## UnsafeIgnoreHardDelete

--unsafe-ignore-hard-delete=VALUE<br/> | UNSAFE_IGNORE_HARD_DELETE | UnsafeIgnoreHardDelete | Disables Hard Deletes (UNSAFE: use to remove hard deletes) (Default: False) |
