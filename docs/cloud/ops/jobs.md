# Event Store Cloud Jobs

The Event Store Cloud runs scheduled jobs on the user's behalf such as in the case of scheduled backups.

All of these jobs consist of a human readable description and a schedule.

## Job Schedules

The schedule format used by the Event Store Cloud CLI tool and API is a simplified subset of cron.

In the future we may support more cron features, but for now though there are the following restrictions:

* the third and fourth fields (representing the day of month and month) accept nothing but wildcards ("*")
* the first field, minute, may be a wildcard ("*"), a number between 0 and 59 (inclusive), or a "rate" between (written as the number divided by a wildcard, like "15/*") (note: scheduled backups do not currently support frequencies of less than 60 minutes)
* the second field, hour, works like the first but the number must be between 0 and 23 (inclusive)
* the fifth and final field works like the first two but the number must be between 0 and 7 (inclusive)

### Examples:

Run a job once an hour, at minute 00:

    0 */1 * * *

Run a job at 12:00 PM on Monday:

    0 12 * * 1
