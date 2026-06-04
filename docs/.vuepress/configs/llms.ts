/**
 * @fileoverview Curated LLMs plugin configuration for Kurrent documentation.
 *
 * This module configures the VuePress LLMs plugin to generate a structured `llms.txt`
 * file instead of a flat list of all documentation links. The output is organized by
 * importance for LLMs: overview and core concepts first, then client libraries and APIs,
 * then configuration, deployment, operations, and reference sections.
 *
 * Key behaviors:
 * - Uses full URLs (domain from baseUrl, e.g. https://docs.kurrent.io).
 * - Sections are built from versioned paths (latest server, latest Kubernetes operator).
 * - Descriptions come from frontmatter or theme excerpts; broken index URLs are normalized.
 * - HTTP API Security appears only under APIs (excluded from Security & Access Control).
 *
 * The template placeholders (e.g. {overview}, {concepts}) are filled by getter functions
 * that filter and order pages from the build. See getLlmsPluginOptions and the factory
 * helpers: createPrefixSection, createSlugOrderSection, createFilterSection.
 */

import type { TemplateGetter, TemplateGetterOptions } from "@vuepress/plugin-llms";
import type { LLMPage, LLMState } from "@vuepress/plugin-llms";
import { generateLink } from "@vuepress/plugin-llms";
import type { Versioning } from "../lib/versioning";
import { baseUrl } from "./plugins/shared";

// ---------------------------------------------------------------------------
// URL and description helpers
// ---------------------------------------------------------------------------

/**
 * Detects URLs that end with `/.md` (broken index links produced by the plugin).
 *
 * @param url - Generated link URL (e.g. from generateLink).
 * @returns true if the URL ends with `/.md`.
 */
function isBrokenIndexUrl(url: string): boolean {
  return /\/\.md$/i.test(url);
}

/**
 * Converts a broken index URL (e.g. `.../quick-start/.md`) to a valid one
 * (`.../quick-start/index.md`). Used in Core Concepts so index pages like
 * connectors and projections are included with working links.
 *
 * @param url - Generated link URL that may end with `/.md`.
 * @returns URL with `/.md` replaced by `/index.md`.
 */
function normalizeIndexUrl(url: string): string {
  return url.replace(/\/\.md$/i, "/index.md");
}

/**
 * Returns the description text for a page for use in llms.txt link lines.
 * Prefers frontmatter `description`; falls back to theme-generated `excerpt`.
 * Trailing ellipses from excerpts are stripped.
 *
 * To control what appears in llms.txt, add to a page's YAML frontmatter:
 *   description: Full summary for LLMs and search (no truncation).
 *
 * @param p - LLMPage (with optional excerpt and frontmatter).
 * @returns Description string or undefined if none available.
 */
function getPageDescription(p: LLMPage): string | undefined {
  const page = p as LLMPage & { excerpt?: string; frontmatter?: { description?: string } };
  const fromFrontmatter = page.frontmatter?.description?.trim();
  const fromExcerpt = page.excerpt?.trim();
  if (fromFrontmatter) return fromFrontmatter;
  if (fromExcerpt) return fromExcerpt.replace(/\s*\.\.\.\s*$/, "");
  return undefined;
}

/**
 * Formats an array of pages as markdown list items: `- [Title](url): description`.
 * Skips pages whose generated URL is broken (isBrokenIndexUrl). Newlines in
 * descriptions are replaced with ": " so the output stays one line per link.
 *
 * @param pages - Pages to format.
 * @param state - LLM state (used by generateLink).
 * @returns Multi-line string of list items, or empty string if no valid links.
 */
function formatLinkWithDescription(pages: LLMPage[], state: LLMState): string {
  return pages
    .map((p) => {
      const url = generateLink(p.path, state);
      if (isBrokenIndexUrl(url)) return null;
      const title = (p as LLMPage & { title?: string }).title ?? "Documentation";
      const desc = getPageDescription(p);
      return desc
        ? `- [${title}](${url}): ${desc.replace(/\n/g, ": ")}`
        : `- [${title}](${url})`;
    })
    .filter((line): line is string => line !== null)
    .join("\n");
}

// ---------------------------------------------------------------------------
// Client libraries section: supported languages and link formatting
// ---------------------------------------------------------------------------

/** Client path segments we include (legacy TCP and other deprecated clients are excluded). */
const CLIENT_BASES = ["dotnet", "golang", "java", "node", "python", "rust"] as const;

/** Display labels for each client base (e.g. "golang" → "Go"). */
const CLIENT_LABELS: Record<string, string> = {
  dotnet: ".NET",
  golang: "Go",
  java: "Java",
  node: "Node.js",
  python: "Python",
  rust: "Rust",
  tcp: "TCP (deprecated)",
};

/**
 * Extracts the client base from a path (e.g. `/clients/dotnet/v1.2.0/...` → "dotnet").
 *
 * @param path - Page path.
 * @returns First segment after `/clients/` or empty string.
 */
function getClientBase(path: string): string {
  return path.match(/^\/clients\/([^/]+)/)?.[1] ?? "";
}

/**
 * True if the path is a client page we want in the Client Libraries section:
 * one of CLIENT_BASES and one of getting-started, reading-events, appending-events.
 * Paths under /legacy/ are not wanted.
 */
function isWantedClientPage(path: string): boolean {
  const base = getClientBase(path);
  if (!CLIENT_BASES.includes(base as (typeof CLIENT_BASES)[number])) return false;
  return (
    path.includes("getting-started") ||
    path.includes("reading-events") ||
    path.includes("appending-events")
  );
}

/**
 * Formats a single client page as a list item: `- [Language – Title](url): description`.
 * Returns null if the generated URL is broken (skipped in output).
 */
function formatClientLink(p: LLMPage, state: LLMState): string | null {
  const url = generateLink(p.path, state);
  if (isBrokenIndexUrl(url)) return null;
  const base = getClientBase(p.path);
  const label = CLIENT_LABELS[base] ?? base;
  const title = (p as LLMPage & { title?: string }).title ?? "Documentation";
  const desc = getPageDescription(p);
  const suffix = desc ? `: ${desc.replace(/\n/g, ": ")}` : "";
  return `- [${label} – ${title}](${url})${suffix}`;
}

// ---------------------------------------------------------------------------
// Section getter factories (used by getLlmsPluginOptions)
// ---------------------------------------------------------------------------

/**
 * Builds a section getter that includes all pages under a path prefix, optionally
 * sorted by path and limited in count. Used for Cloud, Kubernetes Operator,
 * and Connectors Sinks.
 *
 * @param prefix - Path prefix (e.g. `/cloud/` or `/server/v26.0/features/connectors/sinks/`).
 * @param options - limit: max links (default 25); includeBase: include page with path === prefixBase (default true); sort: sort by path (default true).
 * @returns TemplateGetter that returns formatted list or "" when prefix is empty (e.g. no operator version).
 */
function createPrefixSection(
  prefix: string,
  options: { limit?: number; includeBase?: boolean; sort?: boolean } = {}
): TemplateGetter {
  const { limit = 25, includeBase = true, sort = true } = options;
  const prefixBase = prefix.replace(/\/$/, "");
  return (pages, state) => {
    if (!prefix) return "";
    const filtered = pages.filter(
      (p) =>
        (includeBase && p.path === prefixBase) || p.path.startsWith(prefix)
    );
    const list = sort
      ? [...filtered].sort((a, b) => a.path.localeCompare(b.path))
      : filtered;
    return formatLinkWithDescription(list.slice(0, limit), state);
  };
}

/**
 * Returns true when the page is the index/overview page for a segment (e.g. quick-start,
 * configuration). Reusable so slug-order sections don’t repeat the same index logic.
 */
function matchIndexSlug(
  p: LLMPage,
  prefix: string,
  prefixBase: string,
  segment: string
): boolean {
  return (
    p.path === prefix ||
    p.path === prefixBase ||
    p.path.endsWith(`/${segment}`) ||
    p.path.includes(`${segment}/index`)
  );
}

/**
 * Builds a section getter that selects exactly one page per slug in a fixed order,
 * using a custom matcher. Used for Installation, APIs, Configuration, and Diagnostics
 * where we want a curated order (e.g. index, then cluster, networking, db-config).
 *
 * @param prefix - Path prefix for candidate pages.
 * @param slugOrder - Ordered list of slugs; for each slug, the first matching page is chosen.
 * @param matchSlug - (slug, page, prefix, prefixBase) => true if this page matches the slug (e.g. index slug may match prefix or prefixBase).
 * @param options - exclude: optional predicate to remove pages from candidates before matching (e.g. exclude whatsnew for installation).
 * @returns TemplateGetter that returns formatted list of selected pages in slug order.
 */
function createSlugOrderSection(
  prefix: string,
  slugOrder: string[],
  matchSlug: (
    slug: string,
    page: LLMPage,
    prefix: string,
    prefixBase: string
  ) => boolean,
  options?: { exclude?: (p: LLMPage) => boolean }
): TemplateGetter {
  const prefixBase = prefix.replace(/\/$/, "");
  const exclude = options?.exclude;
  return (pages, state) => {
    let candidates = pages.filter(
      (p) => p.path.startsWith(prefix) || p.path === prefixBase
    );
    if (exclude) candidates = candidates.filter((p) => !exclude(p));
    const selected: LLMPage[] = [];
    for (const slug of slugOrder) {
      const page = candidates.find((p) =>
        matchSlug(slug, p, prefix, prefixBase)
      );
      if (page && !selected.some((x) => x.path === page.path))
        selected.push(page);
    }
    return formatLinkWithDescription(selected, state);
  };
}

/**
 * Builds a section getter that includes all pages matching a predicate, up to a limit.
 * Optional sortBy gives stable ordering (e.g. by path) instead of VuePress page order.
 * Used for Tutorials where we filter by path keywords and cap the number of links.
 *
 * @param filter - Predicate to include a page (e.g. path includes "tutorials").
 * @param limit - Maximum number of links to include.
 * @param options - sortBy: optional comparator for stable order (e.g. (a, b) => a.path.localeCompare(b.path)).
 * @returns TemplateGetter that returns formatted list.
 */
function createFilterSection(
  filter: (p: LLMPage) => boolean,
  limit: number,
  options?: { sortBy?: (a: LLMPage, b: LLMPage) => number }
): TemplateGetter {
  const sortBy = options?.sortBy;
  return (pages, state) => {
    let candidates = pages.filter(filter);
    if (sortBy) candidates = [...candidates].sort(sortBy);
    return formatLinkWithDescription(candidates.slice(0, limit), state);
  };
}

/**
 * Builds a section getter that filters pages by predicate, then picks one page per slug
 * in a fixed order (first match wins). Used for Security and Release Notes where
 * candidates span a prefix but we want deliberate slug order instead of positional slice.
 *
 * @param filter - Predicate to include a page (e.g. path includes "security", exclude "http-api").
 * @param slugOrder - Ordered list of slugs; for each slug, the first matching page is chosen.
 * @param matchSlug - (slug, page) => true if this page matches the slug.
 * @returns TemplateGetter that returns formatted list in slug order.
 */
function createFilterSlugOrderSection(
  filter: (p: LLMPage) => boolean,
  slugOrder: string[],
  matchSlug: (slug: string, page: LLMPage) => boolean
): TemplateGetter {
  return (pages, state) => {
    const candidates = pages.filter(filter);
    const selected: LLMPage[] = [];
    for (const slug of slugOrder) {
      const page = candidates.find((p) => matchSlug(slug, p));
      if (page && !selected.some((x) => x.path === page.path))
        selected.push(page);
    }
    return formatLinkWithDescription(selected, state);
  };
}

// ---------------------------------------------------------------------------
// Version-derived prefixes (used by section getters)
// ---------------------------------------------------------------------------

/**
 * Builds the VuePress LLMs plugin options for a curated llms.txt: categorized sections,
 * full domain URLs, and section order by importance for LLMs. Uses the provided versioning
 * to resolve latest server and latest Kubernetes operator paths.
 *
 * @param versioning - Versioning instance (from docs/.vuepress/lib/versioning); provides
 *   versioning.latest (e.g. "server/v26.0") and versioning.versions for operator path.
 * @returns Plugin options object: domain, llmsTxt, llmsFullTxt, llmsPageTxt,
 *   llmsTxtTemplate (markdown with placeholders), llmsTxtTemplateGetter (map of placeholder name → getter).
 */
export function getLlmsPluginOptions(versioning: Versioning) {
  const latestServer = versioning.latest; // e.g. "server/v26.0"
  const latestServerPrefix = `/${latestServer}/`;
  const opGroup = versioning.versions.find((v) => v.id === "kubernetes-operator");
  const latestOperatorPrefix =
    opGroup && opGroup.versions.length > 0
      ? `/${opGroup.basePath}/${opGroup.versions[0].path}/`
      : "";

  // --- Overview: home, getting-started intro and key pages ---
  const overview: TemplateGetter = (pages, state) => {
    const paths = [
      "/",
      "/getting-started/",
      "getting-started/introduction",
      "getting-started/kurrent-ecosystem",
      "getting-started/kurrent-why",
      "getting-started/concepts",
    ];
    const candidates = pages.filter((p) =>
      paths.some(
        (path) =>
          p.path === path ||
          (path !== "/" && path !== "/getting-started/" && p.path.includes(path))
      )
    );
    return formatLinkWithDescription(candidates.slice(0, 10), state);
  };

  // --- Installation & Deployment: quick-start (index, installation, default-directories, upgrade-guide); exclude whatsnew ---
  const installation: TemplateGetter = createSlugOrderSection(
    latestServerPrefix + "quick-start/",
    ["index", "installation", "default-directories", "upgrade-guide"],
    (slug, p, prefix, prefixBase) =>
      slug === "index"
        ? matchIndexSlug(p, prefix, prefixBase, "quick-start")
        : p.path.includes(slug),
    { exclude: (p) => p.path.includes("whatsnew") }
  );

  // --- Client Libraries: non-legacy clients only; up to 3 pages per language (getting-started, reading-events, appending-events) ---
  const clients: TemplateGetter = (pages, state) => {
    const clientPages = pages
      .filter(
        (p) =>
          p.path.startsWith("/clients/") &&
          !p.path.includes("/legacy/") &&
          isWantedClientPage(p.path)
      )
      .sort((a, b) => b.path.localeCompare(a.path));

    const byBase = new Map<string, LLMPage[]>();
    for (const p of clientPages) {
      const base = getClientBase(p.path);
      const list = byBase.get(base) ?? [];
      if (list.length < 3) list.push(p);
      byBase.set(base, list);
    }

    const selected = CLIENT_BASES.flatMap((base) => byBase.get(base) ?? []);
    return selected
      .map((p) => formatClientLink(p, state))
      .filter((line): line is string => line !== null)
      .join("\n");
  };

  // --- APIs: HTTP API intro, security, persistent subscriptions, optional headers, API reference ---
  const apis: TemplateGetter = createSlugOrderSection(
    latestServerPrefix + "http-api/",
    ["introduction", "security", "persistent", "optional-http-headers", "api"],
    (slug, p, _prefix, _prefixBase) => {
      if (!p.path.includes(`http-api/${slug}`)) return false;
      if (slug === "persistent" && p.path.includes("persistent-subscriptions"))
        return false;
      return true;
    }
  );

  // --- Core Concepts: streams, projections, persistent subscriptions, connectors, admin-ui, indexes, archiving, queries (with index URL normalization) ---
  const concepts: TemplateGetter = (pages, state) => {
    const prefix = latestServerPrefix + "features/";
    const featurePages = pages.filter((p) => p.path.startsWith(prefix));
    const pickOne = (pred: (p: LLMPage) => boolean) => featurePages.find(pred);
    const selected: LLMPage[] = [];
    const add = (p: LLMPage | undefined) => {
      if (p && !selected.some((x) => x.path === p.path)) selected.push(p);
    };
    const conceptPredicates: Array<(p: LLMPage) => boolean> = [
      (p) => p.path.includes("streams"),
      (p) =>
        p.path.includes("projections") &&
        (p.path.includes("projections/index") ||
          p.path.includes("projections/introduction") ||
          p.path.endsWith("projections/")),
      (p) => p.path.includes("persistent-subscriptions"),
      (p) =>
        p.path.includes("connectors") &&
        (p.path.endsWith("connectors/") || p.path.includes("connectors/index")),
      (p) => p.path.includes("admin-ui"),
      (p) => p.path.includes("indexes/default"),
      (p) => p.path.includes("archiving"),
      (p) => p.path.includes("queries/ui"),
    ];
    conceptPredicates.forEach((pred) => add(pickOne(pred)));
    if (!selected.some((p) => p.path.includes("indexes")))
      add(pickOne((p) => p.path.includes("indexes")));
    if (!selected.some((p) => p.path.includes("queries")))
      add(pickOne((p) => p.path.includes("queries")));
    return selected
      .map((p) => {
        let url = generateLink(p.path, state);
        if (isBrokenIndexUrl(url)) url = normalizeIndexUrl(url);
        const title = (p as LLMPage & { title?: string }).title ?? "Documentation";
        const desc = getPageDescription(p);
        return desc
          ? `- [${title}](${url}): ${desc.replace(/\n/g, ": ")}`
          : `- [${title}](${url})`;
      })
      .join("\n");
  };

  // --- Configuration: overview, cluster, networking, db-config ---
  const configuration: TemplateGetter = createSlugOrderSection(
    latestServerPrefix + "configuration/",
    ["configuration", "cluster", "networking", "db-config"],
    (slug, p, prefix, prefixBase) =>
      slug === "configuration"
        ? matchIndexSlug(p, prefix, prefixBase, "configuration") ||
          p.path.includes("/configuration/configuration")
        : p.path.includes(slug)
  );

  // --- Diagnostics: overview, logs, metrics, integrations, best-practices ---
  const diagnostics: TemplateGetter = createSlugOrderSection(
    latestServerPrefix + "diagnostics/",
    ["diagnostics", "logs", "metrics", "integrations", "best-practices"],
    (slug, p, prefix, prefixBase) =>
      slug === "diagnostics"
        ? matchIndexSlug(p, prefix, prefixBase, "diagnostics") ||
          p.path.includes("/diagnostics/diagnostics")
        : p.path.includes(slug)
  );

  // --- Security & Access Control: all server security pages (exclude http-api); stable order by path ---
  const security: TemplateGetter = createFilterSection(
    (p) =>
      p.path.startsWith(latestServerPrefix) &&
      (p.path.includes("security") || p.path.includes("configuration/security")) &&
      !p.path.includes("http-api"),
    8,
    { sortBy: (a, b) => a.path.localeCompare(b.path) }
  );

  // --- Release Notes: latest server only ---
  const releaseNotes: TemplateGetter = createFilterSection(
    (p) =>
      p.path.startsWith(latestServerPrefix) &&
      (p.path.includes("release-schedule") ||
        p.path.includes("release-notes") ||
        p.path.includes("whatsnew")),
    10,
    { sortBy: (a, b) => a.path.localeCompare(b.path) }
  );

  // --- Tutorials & Use Cases: dev-center tutorials and use-cases; stable order by path ---
  const tutorials: TemplateGetter = createFilterSection(
    (p) =>
      p.path.startsWith("/dev-center/") &&
      (p.path.includes("tutorials") || p.path.includes("use-cases")),
    20,
    { sortBy: (a, b) => a.path.localeCompare(b.path) }
  );

  // --- Kurrent Cloud: curated top pages; rest in llms-full.txt ---
  const cloud: TemplateGetter = createSlugOrderSection(
    "/cloud/",
    [
      "",
      "introduction",
      "getting-started",
      "ops/backups",
      "ops/sizing",
      "ops/events",
      "ops/account-security",
      "networking",
      "automation",
      "faq"
    ],
    (slug, p, prefix, prefixBase) =>
      slug === ""
        ? p.path === prefix || p.path === prefixBase
        : p.path.includes(slug)
  );

  // --- Kubernetes Operator: latest operator version docs (empty section if no operator version) ---
  const kubernetesOperator: TemplateGetter = createPrefixSection(
    latestOperatorPrefix,
    { limit: 25 }
  );

  // --- Operations & Management: all server operations pages; stable order by path (includes index, backup, restore, auto-scavenge, etc.) ---
  const operations: TemplateGetter = createFilterSection(
    (p) =>
      p.path.startsWith(latestServerPrefix) && p.path.includes("operations"),
    15,
    { sortBy: (a, b) => a.path.localeCompare(b.path) }
  );

  // --- Connectors Sinks: features/connectors/sinks under latest server ---
  const connectorsSinks: TemplateGetter = createPrefixSection(
    latestServerPrefix + "features/connectors/sinks/",
    { limit: 25 }
  );

  // --- Gaffer: static list pointing to the separate gaffer.kurrent.io site (projection development toolkit).
  // Gaffer is its own Astro/Starlight site, so these are external URLs, not pages in this build. It owns its
  // own llms.txt; we lead with that so tooling can fetch Gaffer's full index rather than relying on this list. ---
  const gaffer: TemplateGetter = () => {
    return `- [Gaffer - Projection Development Toolkit](https://gaffer.kurrent.io): Developer toolkit for KurrentDB projections - scaffold, run, debug, and test the same JavaScript projection engine that ships inside KurrentDB, locally.
- [Gaffer - llms.txt](https://gaffer.kurrent.io/llms.txt): Gaffer's own AI index; use [llms-full.txt](https://gaffer.kurrent.io/llms-full.txt) for the complete Gaffer docs in one file.
- [Gaffer - Install (CLI and VS Code extension)](https://gaffer.kurrent.io/getting-started/install/): Install the Gaffer CLI and VS Code extension.
- [Gaffer - MCP server setup](https://gaffer.kurrent.io/cli/mcp/): Configure the \`gaffer mcp\` server for VS Code, Claude Code, Cursor, and Claude Desktop.
- [Gaffer - Testing projections](https://gaffer.kurrent.io/testing/nodejs/): Test projections with \`@kurrent/projections-testing\`.`;
  };

  // --- Community & Learning: static list of Kurrent site, forum, blog, Discord, GitHub, Academy ---
  const community: TemplateGetter = () => {
    return `- [Kurrent – Main website](https://www.kurrent.io): Event-native data platform for event sourcing and event-driven architecture.
- [Kurrent Forum](https://discuss.kurrent.io): Community forum for KurrentDB and EventStoreDB questions and discussion.
- [Kurrent Blog](https://www.kurrent.io/blog): Articles, guides, and release updates.
- [Kurrent Webinars](https://www.kurrent.io/webinars): On-demand and upcoming webinars.
- [Kurrent Community Discord](https://discord.gg/Phn9pmCw3t): Join the Kurrent community on Discord.
- [Kurrent on YouTube](https://www.youtube.com/@Kurrent_io): Video tutorials, demos, and talks.
- [Kurrent on GitHub](https://github.com/kurrent-io): KurrentDB server, client libraries, and open-source projects.
- [Kurrent Academy](https://academy.kurrent.io): Free self-paced and live training on KurrentDB and event sourcing.`;
  };

  /**
   * Markdown template for llms.txt. Placeholders {overview}, {concepts}, etc. are
   * replaced by the corresponding getter's output. Section order is by importance
   * for LLMs (overview → concepts → clients → APIs → config → … → cloud → gaffer → … → community).
   */
  const CURATED_TEMPLATE = `# Kurrent Docs – Human-Readable Index for AI (llms.txt)

KurrentDB is the event-native stream database for event sourcing, CQRS, and event-driven architecture. In this documentation set, use "EventStoreDB" when referring to EventStoreDB ≤ 24.x content and "KurrentDB" for 25.0+ content. This file points to the most important documentation sections, ordered by importance for understanding and using KurrentDB. These links reflect authoritative, up-to-date docs from docs.kurrent.io.

For exhaustive coverage (all documentation pages in one file), use \`llms-full.txt\` at the same base URL (e.g. \`${baseUrl}/llms-full.txt\`). LLMs and tooling that need the complete list of docs can fetch that file instead.

---

## Overview
{overview}

---

## Core Concepts & Patterns
{concepts}

---

## Client Libraries & Examples
{clients}

---

## APIs
{apis}

---

## Configuration (KurrentDB Server)
{configuration}

---

## Installation & Deployment
{installation}

---

## Security & Access Control
{security}

---

## Operations & Management
{operations}

---

## Diagnostics
{diagnostics}

---

## Connectors Sinks (KurrentDB Server)
{connectorsSinks}

---

## Kubernetes Operator (KurrentDB Server)
{kubernetesOperator}

---

## Kurrent Cloud
{cloud}

---

## Gaffer (Projection Development Toolkit)
{gaffer}

---

## Tutorials & Use Cases
{tutorials}

---

## Release Notes / Changelog (KurrentDB Server)
{releaseNotes}

---

## Community & Learning
{community}
`;

  /** Map of template placeholder names to getter functions; keys must match placeholders in CURATED_TEMPLATE. */
  const getters: TemplateGetterOptions = {
    overview,
    cloud,
    installation,
    kubernetesOperator,
    configuration,
    diagnostics,
    clients,
    apis,
    concepts,
    gaffer,
    connectorsSinks,
    operations,
    security,
    releaseNotes,
    tutorials,
    community,
  };

  /** Plugin options: domain for full URLs, llms.txt curated + full + per-page, template and getters. */
  return {
    domain: baseUrl,
    llmsTxt: true,
    llmsFullTxt: true,
    llmsPageTxt: true,
    llmsTxtTemplate: CURATED_TEMPLATE,
    llmsTxtTemplateGetter: getters,
  };
}
