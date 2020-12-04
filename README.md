# EventStoreDB documentation

Next Gen docos using VuePress.

## Local development

### Prerequisites

1. `NodeJs` installed (see [installation guide](https://nodejs.org/en/download//)).
2. `Yarn` installed (see [installation guide](https://classic.yarnpkg.com/en/docs/install/)).
3. For Windows development `Windows Subsystem for Linux` (it's neeeded because internally [sed](https://www.gnu.org/software/sed/manual/sed.html) is used in build scripts)\
   - [WSL 2 installation guide](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
   - [Windows Terminal](https://www.microsoft.com/pl-pl/p/windows-terminal/9n0dx20hk701?rtc=1&activetab=pivot:overviewtab)

### Running docs locally

1. Clone the repo
2. Run `yarn install`
3. Run `yarn docs:dev`

### Getting external samples

To get all samples run `yarn predocs:dev` - it will clone samples from the external client repositories.

### Troubleshooting

#### Windows

1. `EPERM: operation not permitted` during `yarn install` - this error may appear if you've run the `yarn install` from Windows before running it on the WSL2. See troubleshooting [link](https://stackoverflow.com/a/58414196).

#### Ubuntu

1. `ERROR: There are no scenarios; must have at least one.` while running `yarn` commands. Ubuntu has preinstalled `cmdtest` package that registers conflicting `yarn`. You might need to uninstall it and then configure yarn again. See troubleshooting [link](https://github.com/yarnpkg/yarn/issues/2821#issuecomment-284181365)

