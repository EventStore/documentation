---
outputFileName: index.html
---

# Optimistic concurrency and idempotence

Writing supports an [optimistic concurrency](https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/optimistic-concurrency) check on the version of the stream to which events are written. The method of specifying what the expected version is depends whether you are making writes using the HTTP or .NET API.

The .NET API has constants which you can use to represent certain conditions:

| Parameter                      | Description                                                                                                                                                |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ExpectedVersion.Any`          | Disables the optimistic concurrency check.                                                                                                                 |
| `ExpectedVersion.NoStream`     | Specifies the expectation that target stream does not yet exist.                                                                                           |
| `ExpectedVersion.EmptyStream`  | Specifies the expectation that the target stream has been explicitly created, but does not yet have any user events written in it.                         |
| `ExpectedVersion.StreamExists` | Specifies the expectation that the target stream or its metadata stream has been created, but does not expect the stream to be at a specific event number. |
| `Any other integer value`      | The event number that you expect the stream to currently be at.                                                                                            |

If the optimistic concurrency check fails during writing, a `WrongExpectedVersionException` is thrown.

## Idempotence

If identical write operations occur, Event Store treats them in a way which makes it idempotent. If a write is treated in this manner, Event Store acknowledges it as successful, but duplicate events are not written. The idempotence check is based on the `EventId` and `stream`. It is possible to reuse an `EventId` across streams whilst maintaining idempotence.

The level of idempotence guarantee depends on whether the optimistic concurrency check is not disabled during writing (by passing `ExpectedVersion.Any` as the `expectedVersion` for the write).

### If you specify an expected version

The specified `expectedVersion` is compared to the `currentVersion` of the stream. This will yield one of three results:

-   **`expectedVersion > currentVersion`** - a `WrongExpectedVersionException` is thrown.

-   **`expectedVersion == currentVersion`** - events are written and acknowledged.

-   **`expectedVersion < currentVersion`** - the `EventId` of each event in the stream starting from `expectedVersion` are compared to those in the write operation. This can yield one of three further results:

    -   **All events have been committed already** - the write is acknowledged as successful, but no duplicate events written.

    -   **None of the events were previously committed** - a `WrongExpectedVersionException` is thrown.

    -   **Some of the events were previously committed** - this is considered a bad request. If the write contains the same events as a previous request, either all or none of the events should have been previously committed. This surfaces as a `WrongExpectedVersionException`.

### If you specify `ExpectedVersion.Any`

> [!WARNING]
> Idempotence is **not** guaranteed if you use `ExpectedVersion.Any`. The chance of a duplicate event is small, but is possible.

The idempotence check will yield one of three results:

-   **All events have been committed already** - the write is acknowledged as successful, but no duplicate events written.

-   **None of the events were previously committed** - the events are written and the write acknowledged.

-   **Some of the events were previously committed** - this is considered a bad request. If the write contains the same events as a previous request, either all or none of the events should have been previously committed. This currently surfaces as a `WrongExpectedVersionException`.
