# EventStoreDB documentation

Next Gen docos using VuePress.

## Local development

### Prerequisites

1. `NodeJS` installed (see [installation guide](https://nodejs.org/en/download//)).
2. `Yarn` installed (see [installation guide](https://classic.yarnpkg.com/en/docs/install/)).

### Running docs locally

1. Clone the repo
2. Run `yarn install`
3. Run `yarn docs:dev`

### Troubleshooting

#### Windows

1. `EPERM: operation not permitted` during `yarn install` - this error may appear if you've run the `yarn install` from Windows before running it on the WSL2. See troubleshooting [link](https://stackoverflow.com/a/58414196).

#### Ubuntu

1. `ERROR: There are no scenarios; must have at least one.` while running `yarn` commands. Ubuntu has preinstalled `cmdtest` package that registers conflicting `yarn`. You might need to uninstall it and then configure yarn again. See troubleshooting [link](https://github.com/yarnpkg/yarn/issues/2821#issuecomment-284181365)

