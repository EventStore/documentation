# Contributing to Event Store Documentation

## Working with the Git

Event Store Documentation uses `master` as the main development branch. All the changes merged to this branch are deployed live. 

We do our best to ensure a clean history. To do so, we ask contributors to squash their commits into a set or single logical commit. Alternatively, those who merge the PRs will use the Squash and Merge feature of GitHub.

**To contribute to this repository**:

1. Fork the repository.
2. Create a feature branch from the `master` branch.
3. Make your changes.
4. Commit your changes.
5. Push your changes to your fork.
6. Create a pull request.

## Running the documentation locally

The docs website is generated from Markdown using [VuePress](https://vuepress.vuejs.org/) and [VuePress Theme Hope](https://theme-hope.vuejs.press).

After checking out the repository, you can run the following commands to run the documentation locally:

```bash
pnpm i
pnpm run import
pnpm dev
```

Before you open a pull request with your changes, make sure to run the build locally:

```bash
pnpm build
```

The local build must complete successfully before you open a pull request.

## Importing documentation

This repository contains documentation about Event Store and its client SDKs. The documentation for EventStoreDB, including its HTTP API, is imported from the respective repositories on build. To import the documentation manually, run:

```bash
pnpm run import
```

The import command also fetches the latest samples from the client SDK repositories.

Check the `/import/repos.json` file to see which repositories and branches are imported.

## Technical details

### Locations

The documentation sources are located in the `/docs` directory. The `/docs/.vuepress` directory contains the configuration and theme settings, as well as the custom components and plugins.

Other directors inside `/docs` include:
- `clients`: documentation for current and legacy clients
- `cloud`: Event Store Cloud documentation
- `server`: EventStoreDB documentation imported from the server repository
- `http-api`: EventStoreDB HTTP API documentation imported from the server repository
- `samples`: imported code samples for the client SDKs, server, and HTTP API

Directories with imported code like `server`, `http-api`, and `samples` are generated on build and should not be edited manually. They are also listed in `.gitignore` and won't be committed to the repository.

### Aliases

#### Markdown links

The documentation uses aliases to link between different parts of the documentation. For example, the server or client documentation can link to the `http-api` documentation using the `@http-api` alias. The aliases are defined in the `/docs/.vuepress/config.ts` file. When an alias is used in a versioned document, the build process will replace it with the correct path based on the version.

For example, the following link:

```markdown
[HTTP API](@http-api)
```

in the server 24.10 documentation (`server/v24.10`) will be replaced with:

```markdown
[HTTP API](/http-api/v24.10/)
```

List of available aliases:
- `@server` - latest server documentation, or server documentation for the current version (for versioned documents)
- `@http-api` - latest HTTP API documentation, or HTTP API documentation for the current version (for versioned documents)
- `@clients/grpc` - clients documentation

#### Code samples

Because code samples for versioned documentation (server and HTTP API) are also versioned, the code samples use aliases to link to the correct version. For example, the HTTP API documentation can reference a code sample from the same repository using `@httpapi` as a path alias:

```markdown
@[code](@httpapi/event.json)
```

The sample file will be extracted from the samples directory of a corresponding version of the HTTP API documentation.

Available code import aliases are:
- `@samples` - server code samples
- `@httpapi` - HTTP API code samples
- `@grpc` - client code samples

### Code samples

#### Inline code

Inline code samples should be decorated with code fences and a language identifier. For example:

```markdown
# This is an inline code sample in TypeScript
```

#### Tabs

Code samples that need to be displayed in multiple languages should be wrapped in tabs. For example:

~~~markdown
::: tabs#lang
@tab lang1
```lang1
var x = 1;
```
@tab lang2
```lang2
var y = 2;
```
:::
~~~

In `tabs#lang`, `lang` is the tabs group key. All tab groups with the same key will be displayed together.

#### Importing code samples

Code can be imported from the samples directory using the `@[code]` directive. The directive takes a path to the sample file and a list of languages. For example:

```markdown
::: code-tabs
@tab TypeScript
@[code{client-with-user-certificates}](@grpc:user-certificates.ts)
@tab Java
@[code{client-with-user-certificates}](@grpc:authentication/UserCertificate.java)
@tab C#
@[code{client-with-user-certificates}](@grpc:user-certificates/Program.cs)
:::
```

Here, the `@grpc` alias is used to import code samples from the client samples directory. The value specified after the `@grpc` alias is the path to the sample file relative to the client samples directory. Finally, the value inside the curly braces is the region of the snipped inside the imported file. The region is optional and can be used if the imported file contains more than one code snippet. Region syntax is different per language, check the existing samples for reference.

The `@[code]` directive detects the code language based on the file extension.

Because many client samples come as a tab group for all languages, the `@[code]` directive is used to import the same sample for multiple languages. It can use the same region name across different languages. For example:

```markdown
@[code{append-to-stream}](@grpc:appending_events.py;appending-events.js;appending-events.ts;appending_events/AppendingEvents.java;appending-events/Program.cs;appendingEvents.go;appending_events.rs)
```

will import the `append-to-stream` region from the specified files for Python, JavaScript, TypeScript, Java, C#, Go, and Rust. Code snippets will be automatically placed in tabs.

### Sidebars

Previously, explicit sidebar configuration file was required for each documentation section. Right now, only the documentation for older server version use explicit sidebars. Newer documentation uses filesystem and frontmatter to generate sidebars automatically.

Configuration for sidebars can be found in the `/docs/.vuepress/configs/sidebar.ts` file. Here's an example of the sidebar configuration for the server documentation:

```typescript
export const sidebarEn: EsSidebarOptions = {
  "/clients/grpc/": "structure",
  "/cloud/": "structure",
}
```

When using the filesystem and frontmatter to generate sidebars, consider the following:

- Each directory renders to a sidebar group, and will be shown in the sidebar accordingly.
- `README.md` files are used as sidebar group titles.
- Group title and order can be customized using frontmatter.
- Page order inside the group can be customized using frontmatter.

Group customization example:

```markdown
---
dir:
  text: "Quick Start"
  order: 1
---
```

Page order customization example:

```markdown
---
order: 2
---
```

The page `H1` title is used as the link text in the sidebar. If you want to customize the link text, you can use frontmatter:

```markdown
---
title: "Custom Title"
---
```

### Adding a new server version

The following changes are required to add a new server version:

1. Ensure the new server version is available as a branch in the server repository.
2. Add the new server branch to the list of branches for both server and HTTP API in the `/import/repos.json` file.
3. Add the sidebar line for the new server and HTTP API version in the `/docs/.vuepress/configs/sidebar.ts` file.
4. Remove versions that are no longer supported from the `/import/repos.json` file and the sidebar configuration.
5. Add necessary redirects to the `/docs/.vuepress/public/_redirects` file. It's especially relevant to add redirects when you remove a version from the sidebar configuration, so users will be redirected to the latest version.
6. When you decide to keep the documentation for an unsupported version, ensure to add a warning notice by making changes in the `/docs/.vuepress/configs/plugins/notices.ts` file.

After making these changes, run the import command to fetch the new server and HTTP API documentation:

```bash
pnpm run import
```

If you removed any version from the import configuration, you might want to delete directories for that version from the `/docs/server` and `/docs/http-api` directories.

Then, run `pnpm dev` to check if the new version is displayed correctly.
