# Indexmap migration

From KurrentDB 5 onwards, the format of the indexmap file changed. The indexmap-migrate tool converts KurrentDB 5 indexmap files to a format compatible with previous KurrentDB versions. You will need this if you roll back from KurrentDB 5 to an earlier version.

<!-- TODO: Refactor to VuePress -->

## Download

<p class="call-to-action">
<a href="/downloads/indexmap-migrate.windows.zip" class="btn btn--primary">Indexmap migration tool for Windows</a>
<a href="/downloads/indexmap-migrate.macos.zip" class="btn btn--primary">Indexmap migration tool for macOS</a>
<a href="/downloads/indexmap-migrate.linux.x64.zip" class="btn btn--primary">Indexmap migration tool for Linux</a>
</p>

## Usage

```shell
indexmap-migrate [options]
```

### Options

| Option           | Description                                                  |
| ---------------- | ------------------------------------------------------------ |
| -h, -help        | Display help                                                 |
| -s, -source-file | Path to the indexmap file in your KurrentDB 5 installation |
