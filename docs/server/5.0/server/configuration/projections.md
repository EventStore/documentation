# Projections

| Command line parameter | Environment variable prefixed with `EVENTSTORE_` | Config file YAML  | Description |
|:--------|:----------|:-----------|:---------|
| -StartStandardProjections<br/>--start-standard-projections=VALUE<br/> | START_STANDARD_PROJECTIONS | StartStandardProjections | Start the built in system projections. (Default: False) |
| -RunProjections<br/>--run-projections=VALUE<br/> | RUN_PROJECTIONS | RunProjections | Enables the running of projections. System runs built-in projections, All runs user projections. (Default: None) Possible Values:None,System,All |
| -ProjectionThreads<br/>--projection-threads=VALUE<br/> | PROJECTION_THREADS | ProjectionThreads | The number of threads to use for projections. (Default: 3) |
| -FaultOutOfOrderProjections<br/>--fault-out-of-order-projections=VALUE<br/> | FAULT_OUT_OF_ORDER_PROJECTIONS | FaultOutOfOrderProjections | Specify if a projection should be faulted when there is a discontinuity in event ordering (Default: False) |
