---
title: Scheduled Jobs
order: 3
---

The Kurrent Cloud runs scheduled jobs on the user's behalf. All of these jobs consist of a human-readable description and a schedule.

Currently, the following jobs are supported:
* [Scheduled backups](#scheduled-backups)

### Job Schedules

The schedule format used by the Kurrent Cloud CLI tool and API is a simplified subset of [cron](https://en.wikipedia.org/wiki/Cron#Overview), in the future we may support more cron features.

The supported subset is:

* for the first field, minute:
    * a wildcard `*`
    * a number between `0` and `59` (inclusive).
    * a rate, written as a wildcard divided by a number. E.g:  `*/15`
* For the second field, hour:
    * a wildcard `*`
    * a number must be between `0` and `23` (inclusive)
    * a rate, written as a wildcard divided by a number. E.g:  `*/1`
* for the third field, day of month:
    * a wildcard `*`
* for the fourth field, month:
    * a wildcard `*`
* for the fifth field, day of the week:
    * a wildcard `*`
    * a number between `0` and `7` (inclusive), Sunday to Saturday

```
 ┌───────────── Minute: wildcard, number (0 - 59), rate
 │ ┌─────────── Hour: wildcard, number (0 - 23), rate
 │ │ ┌───────── Day of the month: wildcard
 │ │ │ ┌─────── Month: wildcard
 │ │ │ │ ┌───── Day of the week: wildcard, number (0 - 7)
 │ │ │ │ │
 * * * * *
```

::: note
Scheduled backups have a minimum frequency of 60 minutes. Currently, it is not possible to schedule backups more frequently.
:::

#### Examples:

`0 */1 * * *` runs a job once an hour, at minute 00.

`0 12 * * 1` runs a job at 12:00 PM on Monday.

`30 13 * * 0` runs a job at 13:30 PM on Sunday.
