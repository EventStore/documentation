---
title: MCP Servers
---

# MCP Servers

[Model Context Protocol](https://modelcontextprotocol.io) (MCP) servers let your coding assistant — Claude Desktop, Claude Code, Cursor, Windsurf, VS Code, and others — talk directly to KurrentDB. With an MCP server connected, the agent can read and write events, explore streams, and build, test, and deploy projections without leaving the editor.

Kurrent maintains two MCP servers, each tuned for a different workflow.

## Available servers

| Server | Repository | Best for | What it does |
|--------|------------|----------|--------------|
| **Kurrent MCP Server** | [`kurrent-io/mcp-server`](https://github.com/kurrent-io/mcp-server) | Exploring data and prototyping projections from a chat-style agent | Reads and writes events on streams, lists streams, and builds, creates, updates, tests, and inspects projections |
| **Gaffer MCP Server** | [gaffer.kurrent.io](https://gaffer.kurrent.io/) | Local projection development, debugging, and testing | The `gaffer mcp` server exposes Gaffer's projection lifecycle — scaffold, validate, run, debug, and inspect state — to any MCP-aware assistant |

## Kurrent MCP Server

The [Kurrent MCP Server](https://github.com/kurrent-io/mcp-server) gives an MCP-compatible client access to a running KurrentDB instance through eight tools.

### Available tools

| Category | Tool | Purpose |
|----------|------|---------|
| Streams | `read_stream` | Read events from a stream (forwards or backwards, with a limit) |
| Streams | `write_events_to_stream` | Append a new event with data, event type, and metadata |
| Streams | `list_streams` | List streams via the `$streams` system stream |
| Projections | `build_projection` | Generate projection code from a natural-language description |
| Projections | `create_projection` | Create a projection in KurrentDB from provided code |
| Projections | `update_projection` | Update an existing projection's code |
| Projections | `test_projection` | Write sample events to verify projection behavior |
| Projections | `get_projections_status` | Retrieve status and statistics for a projection |

### Prerequisites

The server uses the `$streams` system stream and projections, so the KurrentDB instance must be started with:

```sh
--run-projections=all --start-standard-projections
```

You also need [`uv`](https://docs.astral.sh/uv/) on the machine where the server runs (`brew install uv` on macOS) and the Python dependencies from the repository's `requirements.txt`.

### Configure your client

Replace `path to mcp-server folder` with the cloned repository path and `insert kurrentdb connection here` with your `kurrentdb://` (or `esdb://`) connection string.

#### VS Code (`.vscode/mcp.json`)

```json
{
  "servers": {
    "KurrentDB": {
      "type": "stdio",
      "command": "uv",
      "args": [
        "--directory",
        "path to mcp-server folder",
        "run",
        "server.py"
      ],
      "env": {
        "KURRENTDB_CONNECTION_STRING": "insert kurrentdb connection here"
      }
    }
  }
}
```

#### Claude Desktop

```json
{
  "mcpServers": {
    "KurrentDB": {
      "type": "stdio",
      "command": "uv",
      "args": [
        "--directory",
        "path to mcp-server folder",
        "run",
        "server.py"
      ],
      "env": {
        "KURRENTDB_CONNECTION_STRING": "insert kurrentdb connection here"
      }
    }
  }
}
```

See the [Claude Desktop MCP quickstart](https://modelcontextprotocol.io/quickstart/user) for how to load this configuration.

#### Cursor or Windsurf

Cursor reads `.cursor/mcp.json`; Windsurf reads `.codeium/windsurf/mcp_config.json`.

```json
{
  "mcpServers": {
    "kurrentdb": {
      "command": "python",
      "args": ["path to mcp-server folder/server.py"],
      "env": {
        "KURRENTDB_CONNECTION_STRING": "insert kurrentdb connection here"
      }
    }
  }
}
```

Access control is enforced by the credentials embedded in `KURRENTDB_CONNECTION_STRING`, so scope that user to whatever the agent should be able to do.

## Gaffer MCP Server

[Gaffer](https://gaffer.kurrent.io/) is the developer toolkit for KurrentDB projections — local run, debug, and test loops for the same JavaScript projection engine that ships inside KurrentDB. The `gaffer mcp` server exposes that projection lifecycle and debugging surface to any MCP-aware assistant (Claude Code, Cursor, Claude Desktop, VS Code, and others), so an agent can scaffold, validate, run, and inspect projections without leaving the editor.

Gaffer has its own documentation site. Rather than duplicate it here, follow it directly:

- **MCP server setup** (per-client config for VS Code, Claude Code, Cursor, Claude Desktop): [gaffer.kurrent.io/cli/mcp](https://gaffer.kurrent.io/cli/mcp/)
- **Install** (CLI and VS Code extension): [gaffer.kurrent.io/getting-started/install](https://gaffer.kurrent.io/getting-started/install/)
- **Testing projections** with `@kurrent/projections-testing`: [gaffer.kurrent.io/testing/nodejs](https://gaffer.kurrent.io/testing/nodejs/)

## Picking a server

- **Working from a chat-style agent (Claude Desktop, Claude Code) and want it to inspect or mutate a KurrentDB instance directly** → use the [Kurrent MCP Server](https://github.com/kurrent-io/mcp-server).
- **Authoring, debugging, or testing projections locally** → use [Gaffer](https://gaffer.kurrent.io/) and its `gaffer mcp` server.

Both can be active at the same time — the Kurrent MCP Server talks to a running KurrentDB, while Gaffer drives the local projection runtime.
