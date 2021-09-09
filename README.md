# EventStoreDB documentation

EventStoreDB is the open-source, functional database with Complex Event Processing in Javascript.

This repository contains documentation for both server and client SDK.

## Contributing

Feel free to [create a GitHub](https://github.com/EventStore/documentation/issues/new) issue if you have any questions or request for more explanation or samples.

We're open for any contribution. If you noticed some inconsistency, missing piece, or you'd like to extend existing docs - we'll be happy to [get your Pull Request](https://github.com/EventStore/documentation/compare).

## Samples

GRPC Clients:
- C# - [see more](https://github.com/EventStore/EventStore-Client-Dotnet/tree/master/samples)
- NodeJS - [see more](./samples/grpc/nodejs/)
- Java - [see more](https://github.com/EventStore/EventStoreDB-Client-Java/tree/trunk/db-client-java/src/test/java/com/eventstore/dbclient/samples)
- Rust - [see more](https://github.com/EventStore/EventStoreDB-Client-Rust/tree/master/examples)

## Local development

Documentation is written using [VuePress](https://vuepress.vuejs.org/).

### Prerequisites

1. `NodeJS` installed (see [installation guide](https://nodejs.org/en/download//)).
2. `Yarn` installed (see [installation guide](https://classic.yarnpkg.com/en/docs/install/)).

### Running docs locally

1. Clone the repo
2. Run `yarn install`
3. Run `yarn docs:dev`

### Running production build

To run the production build that will import documentation from database and client repositories run:

```bash
yarn docs:build-prod
```

To import documentation from external repositories:

```bash
yarn docs:import
```

To build documentation without importing documentation:

```bash
yarn docs:build
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

Go to the [.algolia](.algolia) folder and run the [scrape.sh](.algolia/scrape.sh) script.

### Adding new programming language snippets

To add new language snippet it's needed to add import of [Prism.JS](https://prismjs.com/) plugin to [VuePress plugins config](docs/.vuepress/enhanceApp.js), e.g.:

```javascript
import "prismjs/components/prism-java";
```

### Troubleshooting

#### Windows

1. `EPERM: operation not permitted` during `yarn install` - this error may appear if you've run the `yarn install` from Windows before running it on the WSL2. See troubleshooting [link](https://stackoverflow.com/a/58414196).

#### Ubuntu

1. `ERROR: There are no scenarios; must have at least one.` while running `yarn` commands. Ubuntu has preinstalled `cmdtest` package that registers conflicting `yarn`. You might need to uninstall it and then configure yarn again. See troubleshooting [link](https://github.com/yarnpkg/yarn/issues/2821#issuecomment-284181365)

#### Error: Cannot find module '../../server/generated/v21.2/docs/sidebar.js'

run `yarn predocs:build`