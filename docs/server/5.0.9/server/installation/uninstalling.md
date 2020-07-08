# Uninstalling EventStoreDB

This document describes how to uninstall EventStoreDB. The instructions depend on which installation method you used. For different installation methods, refer to [Installation page] (README.md). These instructions cover how to uninstall EventStoreDB, but not how to remove dependencies such as the .NET framework or Mono.

## Linux

## Pre-built packages

If you installed one of the [pre-built packages for Debian based systems](https://packagecloud.io/EventStore/EventStore-OSS), you can remove it with:

```shell
sudo apt-get purge eventstore-oss
```

This removes EventStoreDB completely, including any user settings.

## Binary or built from source

If you built EventStoreDB from source, remove it by deleting the directory containing the source and build, and manually removing any environment variables.

## Windows

### Chocolatey

If you installed EventStoreDB with Chocolatey, you can uninstall with:

```powershell
choco uninstall eventstore-oss
```

This removes the `eventstore-oss` Chocolatey package.

### Binary or built from source

If you installed EventStoreDB by [downloading a binary](https://eventstore.com/downloads/), you can remove it by:

* Deleting the `EventStore-OSS-Win-*` directory.
* Removing the directory from your PATH.

## macOS

If you installed EventStoreDB using Homebrew, you can remove it with one of the following:

```shell
brew cask uninstall eventstore
```

## Binary or built from source

If you built EventStoreDB from source, remove it by deleting the directory containing the source and build, and manually removing any environment variables.

