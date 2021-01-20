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
- Java# - [see more](https://github.com/EventStore/EventStoreDB-Client-Java/tree/trunk/db-client-java/src/test/java/com/eventstore/dbclient/samples)

## Local development

Documentation is written using [VuePress](https://vuepress.vuejs.org/).

### Prerequisites

1. `NodeJS` installed (see [installation guide](https://nodejs.org/en/download//)).
2. `Yarn` installed (see [installation guide](https://classic.yarnpkg.com/en/docs/install/)).

### Running docs locally

1. Clone the repo
2. Run `yarn install`
3. Run `yarn docs:dev`

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

