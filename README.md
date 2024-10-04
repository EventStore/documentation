# EventStoreDB documentation

EventStoreDB is an open-source, functional database with Complex Event Processing in JavaScript.

This repository maintains documentation for EventStoreDB (imported from the server repository on build) and client SDKs.

## Contributing

Feel free to [create a GitHub](https://github.com/EventStore/documentation/issues/new) issue if you have any questions or request for more explanation or samples.

We're open to any contribution. If you noticed some inconsistency, missing piece, or you'd like to extend existing docs - we'll be happy to [get your Pull Request](https://github.com/EventStore/documentation/compare).

Note that EventStoreDB documentation is located in the [server repository](https://github.com/EventStore/EventStore). Open issues and PRs for server documentation in there.

## Samples

EventStoreDB clients:
- C# - [see more](https://github.com/EventStore/EventStore-Client-Dotnet/tree/master/samples)
- NodeJS - [see more](https://github.com/EventStore/EventStore-Client-NodeJS/tree/master/packages/test/src/samples)
- Java - [see more](https://github.com/EventStore/EventStoreDB-Client-Java/tree/trunk/db-client-java/src/test/java/com/eventstore/dbclient/samples)
- Rust - [see more](https://github.com/EventStore/EventStoreDB-Client-Rust/tree/master/examples)

## Local development

Documentation is written using [VuePress](https://vuepress.vuejs.org/).

### Prerequisites

1. `NodeJS` installed (see [the installation guide](https://nodejs.org/en/download//)).
2. `pnpm` installed (see [the installation guide](https://pnpm.io/installation)).

### Running docs locally

1. Clone the repo
2. Run `pnpm i`
3. Run `pnpm run import`
4. Run `pnpm dev`

### Running production build

To run the production build that will import documentation from database and client repositories run:

```bash
pnpm run build-prod
```

To import documentation from external repositories:

```bash
pnpm run import
```

To build documentation without importing documentation:

```bash
pnpm build
```

### Algolia Search

Documentation is using Algolia for indexing and searching through the contents.

To run Algolia search locally, create [.algolia/.env](.algolia/.env) file filled with contents based on the Algolia configuration:

```bash
ALGOLIA_APPLICATION_ID=
ALGOLIA_WRITE_API_KEY=
ALGOLIA_SITE_URL=
ALGOLIA_INDEX_NAME=
ALGOLIA_SEARCH_API_KEY=
```

_**Note:** Make sure that you saved it with LF eol characters._

### Scraping data locally

The scraping script uses a Docker, so you need to have Docker installed and running before running it.

Go to the [.algolia](.algolia) folder and run the [scrape.sh](.algolia/scrape.sh) script. 

*Note: On windows we recommend running the script in [Git Bash](https://gitforwindows.org/).*

### Troubleshooting

#### Windows

1. `EPERM: operation not permitted` during `pnpm i` - this error may appear if you've run the `pnpm i` from Windows before running it on the WSL2. See troubleshooting [link](https://stackoverflow.com/a/58414196).
2. If `pnpm dev` fails, verify if your path does not contain spaces. We noticed some issues related to that.
