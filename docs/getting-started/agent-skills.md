---
title: Agent Skills
---

# Agent Skills

Kurrent Agent Skills give AI coding assistants (Claude Code, Cursor, Codex, GitHub Copilot CLI, and other agent platforms) first-class knowledge of [Kurrent](https://kurrent.io) and its ecosystem.

The repository ships one plugin (`kurrent`) containing five skills and three agents. Each ships focused references that the agent loads on demand, so it can answer your questions and write your code with accurate, up-to-date context instead of guessing.

The skills are open source and maintained at [github.com/kurrent-io/skills](https://github.com/kurrent-io/skills).

## Skills

| Skill | What it covers |
|-------|----------------|
| [kurrent-docs](https://github.com/kurrent-io/skills/tree/main/skills/kurrent-docs) | The everyday router for SDK and server work. Covers the six client SDKs, the self-hosted KurrentDB server, Kurrent Cloud, and the `esc` CLI. **Start here.** |
| [kurrentdb-connection](https://github.com/kurrent-io/skills/tree/main/skills/kurrentdb-connection) | Opinionated guidance for configuring the gRPC client across all six SDKs. Covers connection strings, node discovery, keepalive, deadlines, serverless reuse, and connection failure triage. |
| [kurrentdb-client-detection](https://github.com/kurrent-io/skills/tree/main/skills/kurrentdb-client-detection) | Inventories the client surface in an application codebase. Finds which SDK, which connection scheme, and which call sites need rewriting. |
| [kurrentdb-server-detection](https://github.com/kurrent-io/skills/tree/main/skills/kurrentdb-server-detection) | Inventories a deployed server. Finds the version, cluster topology, license status, and deployment method. |
| [kurrent-upgrade](https://github.com/kurrent-io/skills/tree/main/skills/kurrent-upgrade) | Onboarding onto the gRPC client. Covers porting an app off the legacy TCP client and rebranding the EventStoreDB gRPC client to KurrentDB across six languages. |

## Agents

Three agents cover the KurrentDB application lifecycle: migration, review, and runtime diagnosis.

| Agent | What it covers |
|-------|----------------|
| [migration-specialist](https://github.com/kurrent-io/skills/tree/main/agents/migration-specialist.agent.md) | Orchestrates a client migration. Detects the current client and connection scheme, routes to the right upgrade flavour, and walks through it step by step. |
| [code-reviewer](https://github.com/kurrent-io/skills/tree/main/agents/code-reviewer.agent.md) | Reviews application code that uses the client SDKs. Covers idiomatic usage and anti-patterns, with a post-migration mode that audits the legacy surface and runs the build and tests as a gate. |
| [troubleshooter](https://github.com/kurrent-io/skills/tree/main/agents/troubleshooter.agent.md) | Diagnoses runtime failures. Covers connection and TLS errors, version conflicts, subscription lag, leader-election and gossip problems, scavenge hangs, and projection divergence. |

## Installation

### Claude Code

Run the following commands from a Claude Code session:

1. Add the marketplace:

   ```bash
   /plugin marketplace add kurrent-io/skills
   ```

2. Install the plugin:

   ```bash
   /plugin install kurrent@kurrent-skills
   ```

3. Follow the prompts to complete the installation, then run `/reload-plugins` to activate it.

### Cursor

Run the following commands from a Cursor session:

1. Add the marketplace:

   ```bash
   /add-plugin kurrent-io/skills
   ```

2. Follow the prompts to install the `kurrent` plugin from the marketplace UI.

### Codex

1. Add the `kurrent-io/skills` marketplace to Codex:

   ```bash
   codex plugin marketplace add kurrent-io/skills
   ```

2. Start Codex and open the plugins browser:

   ```bash
   /plugins
   ```

3. Navigate to the "Kurrent Skills" tab and install the `kurrent` plugin.

   > **Note:** Codex's native plugin spec installs the skills but not the agents. Skills that delegate to them will still work, but Codex handles the orchestration inline instead of spawning specialised subagents. Once Codex's plugin spec supports custom agents, this gap goes away.

### GitHub Copilot CLI

1. Add the marketplace:

   ```bash
   copilot plugin marketplace add kurrent-io/skills
   ```

2. Install the plugin:

   ```bash
   copilot plugin install kurrent
   ```

3. Verify it loaded:

   ```bash
   copilot plugin list
   ```

   From an interactive session, `/plugin list`, `/agent`, and `/skills list` should show the `kurrent` plugin.

### Vercel skills CLI (skills.sh)

Works with Claude Code, Cursor, Cline, opencode, and any other agent the [Vercel skills CLI](https://github.com/vercel-labs/skills) supports. The CLI auto-detects installed agents and links each skill into the right place.

1. List the skills available in the repository:

   ```bash
   npx skills add kurrent-io/skills --list
   ```

2. Install everything to every detected agent:

   ```bash
   npx skills add kurrent-io/skills --all
   ```

3. Or install a specific skill into a specific agent — for example, the everyday router into Claude Code globally:

   ```bash
   npx skills add kurrent-io/skills \
     --skill kurrent-docs \
     -a claude-code -g
   ```

   Pass `-y` for non-interactive installs in CI.

### Local install from repository

1. Clone the repository:

   ```bash
   git clone https://github.com/kurrent-io/skills.git
   ```

2. Install the skills for your harness:

   Copy the `skills/` directory (or individual skills under it) to the location where your coding agent reads its skills or context files. Refer to your agent's documentation for the correct path.

## Contributing

Contributions and feedback are welcome on the [`kurrent-io/skills`](https://github.com/kurrent-io/skills) repository. See [`AGENTS.md`](https://github.com/kurrent-io/skills/blob/main/AGENTS.md) for contribution guidelines.
