#!/usr/bin/env python3
"""check-diffs.py

Validates the internal consistency of the YAML manifests in the operator
"Example Deployments" page (database-deployment.md).

It does this by:

  1. Parsing the whole document into a tree of dicts whose leaves are `Leaf`
     objects.  Each Leaf has a `.diff` (the ```diff block under a "what changed"
     tab, or None) and a `.full` (the full ```yaml manifest).

  2. Checking that the "Recommended Production Settings" `.full` matches exactly
     the final "From Zero to Prod" step's `.full`.

  3. Checking that each "From Zero to Prod" step's `.full` could plausibly be
     built by adding its diff's `+` lines to the previous step's `.full`.

  4. Checking that each "Additional Examples" `.full` could be built the same way
     from the Recommended `.full` (skipping the LetsEncrypt and Standalone RoR
     sections).

  5. Checking that the LetsEncrypt example's `.full` could be built from the
     Recommended `.full` by first removing the lines added by the self-signed
     example, then adding the LetsEncrypt diff's `+` lines.

The plausibility test models the starting `.full` and the diff's `+` lines as two
peekable line-iterators and the target `.full` as a normal iterator: the diff is
plausible if every line of the target can be consumed, in order, from the head of
one of the two peekable iterators (with every `+` line consumed).  Blank lines and
`---` document separators are ignored so the check focuses on field content.
"""

import sys
import re
import difflib

DEFAULT_DOC = "./database-deployment.md"


class Leaf:
    def __init__(self):
        self.diff = None   # list[str] or None
        self.full = None   # list[str] or None

    def __repr__(self):
        d = "diff" if self.diff is not None else "----"
        f = "full" if self.full is not None else "----"
        return f"<Leaf {d} {f}>"


# --------------------------------------------------------------------------- #
# Parsing
# --------------------------------------------------------------------------- #

HEADER_RE = re.compile(r"^(#{2,6})\s+(.*)$")
FENCE_RE = re.compile(r"^```(\w*)\s*$")


def parse(path):
    """Return (tree, leaves) where tree is a nested dict of dicts/Leaf and
    leaves maps a tuple-of-titles path to its Leaf."""
    with open(path, encoding="utf-8") as fh:
        lines = fh.read().split("\n")

    leaves = {}          # path-tuple -> Leaf
    path_stack = []      # list of (level, title)
    fence_lang = None
    buf = []

    def current_leaf():
        key = tuple(t for (_, t) in path_stack)
        return leaves.setdefault(key, Leaf())

    for raw in lines:
        fence = FENCE_RE.match(raw)
        if fence:
            if fence_lang is None:
                fence_lang = fence.group(1) or "plain"
                buf = []
            else:
                leaf = current_leaf()
                if fence_lang == "yaml":
                    leaf.full = buf            # keep last seen
                elif fence_lang == "diff":
                    leaf.diff = buf            # keep last seen
                fence_lang = None
                buf = []
            continue

        if fence_lang is not None:
            buf.append(raw)
            continue

        header = HEADER_RE.match(raw)
        if header:
            level = len(header.group(1))
            title = header.group(2).strip()
            while path_stack and path_stack[-1][0] >= level:
                path_stack.pop()
            path_stack.append((level, title))

    # Build nested tree of dicts with Leaf leaves.
    tree = {}
    for key, leaf in leaves.items():
        node = tree
        for part in key[:-1]:
            node = node.setdefault(part, {})
        node[key[-1]] = leaf
    return tree, leaves


# --------------------------------------------------------------------------- #
# Line helpers
# --------------------------------------------------------------------------- #

def clean(lines):
    """Drop blank lines and `---` separators; rstrip the rest."""
    out = []
    for line in lines:
        s = line.rstrip()
        stripped = s.strip()
        if not stripped or stripped == "---":
            continue
        out.append(s)
    return out


def plus_lines(diff):
    return clean([l[1:] for l in diff if l.startswith("+")])


def minus_lines(diff):
    return clean([l[1:] for l in diff if l.startswith("-")])


def remove_subseq(start, removes):
    """Remove `removes` from `start` as an ordered subsequence (earliest match).
    Returns (result, all_removed)."""
    result = []
    i = 0
    for line in start:
        if i < len(removes) and line == removes[i]:
            i += 1
        else:
            result.append(line)
    return result, (i == len(removes))


def can_match(start, plus, final):
    """True if every line of `final` can be consumed in order from the head of
    `start` or `plus`, with all of `plus` consumed.  `start` may have leftover
    lines only at the tail.

    Because document separators and blank lines are stripped, identical lines
    (e.g. repeated `namespace: kurrent`) create ambiguity, so we explore both
    choices at every tie instead of committing greedily.

    Returns (ok, info) where info aids diagnostics on failure.
    """
    n, m, L = len(start), len(plus), len(final)
    # Each consumed final line advances exactly one head, so for any reachable
    # state fi == si + pi.  That makes the state space just (si, pi).
    seen = {(0, 0)}
    stack = [(0, 0)]
    best_fi = 0
    end_states = []   # reachable states with fi == L
    while stack:
        si, pi = stack.pop()
        fi = si + pi
        if fi > best_fi:
            best_fi = fi
        if fi == L:
            end_states.append((si, pi))
            continue
        line = final[fi]
        if si < n and start[si] == line:
            nxt = (si + 1, pi)
            if nxt not in seen:
                seen.add(nxt)
                stack.append(nxt)
        if pi < m and plus[pi] == line:
            nxt = (si, pi + 1)
            if nxt not in seen:
                seen.add(nxt)
                stack.append(nxt)

    for si, pi in end_states:
        if pi == m:
            return True, None

    if best_fi < L:
        info = {"kind": "blocked", "line": final[best_fi], "index": best_fi}
    else:
        # final fully consumed but some + lines never appeared.
        max_pi = max((pi for (_, pi) in end_states), default=0)
        info = {"kind": "unconsumed_plus", "leftover": plus[max_pi:]}
    return False, info


def diff_plausible(start_full, diff, final_full, pre_remove=None):
    start = clean(start_full)
    final = clean(final_full)
    if pre_remove:
        start, ok = remove_subseq(start, pre_remove)
        if not ok:
            return False, {"kind": "pre_remove_incomplete"}
    start, _ = remove_subseq(start, minus_lines(diff))
    return can_match(start, plus_lines(diff), final)


# --------------------------------------------------------------------------- #
# Section lookup helpers
# --------------------------------------------------------------------------- #

def find_top(tree, needle):
    for key in tree:
        if needle.lower() in key.lower():
            return key, tree[key]
    return None, None


def find_child(container, needle):
    for key, val in container.items():
        if needle.lower() in key.lower():
            return key, val
    return None, None


# --------------------------------------------------------------------------- #
# Reporting
# --------------------------------------------------------------------------- #

class Report:
    def __init__(self):
        self.failures = 0
        self.checks = 0

    def ok(self, msg):
        self.checks += 1
        print(f"  \033[32mPASS\033[0m {msg}")

    def fail(self, msg, detail=None):
        self.checks += 1
        self.failures += 1
        print(f"  \033[31mFAIL\033[0m {msg}")
        if detail:
            for line in detail:
                print(f"         {line}")

    def describe(self, info):
        if info is None:
            return []
        if info["kind"] == "blocked":
            return [
                "first target line with no source in starting manifest or diff:",
                f"    {info['line']!r}",
            ]
        if info["kind"] == "unconsumed_plus":
            out = ["these diff `+` lines never appear in the target manifest:"]
            out += [f"    {l!r}" for l in info["leftover"][:12]]
            if len(info["leftover"]) > 12:
                out.append(f"    ... and {len(info['leftover']) - 12} more")
            return out
        if info["kind"] == "pre_remove_incomplete":
            return ["could not remove all self-signed lines from Recommended "
                    "(they don't match)"]
        return [str(info)]


# --------------------------------------------------------------------------- #
# Checks
# --------------------------------------------------------------------------- #

def check_recommended_matches_final_step(tree, rpt):
    print("\n[2] Recommended `.full` == final From-Zero-to-Prod `.full`")
    _, rec = find_top(tree, "recommended")
    fzp_key, fzp = find_top(tree, "from zero")
    if rec is None or fzp is None:
        rpt.fail("could not locate both sections")
        return
    steps = list(fzp.items())
    last_title, last_leaf = steps[-1]
    if rec.full is None or last_leaf.full is None:
        rpt.fail("a section is missing its full manifest")
        return
    a = [l.rstrip() for l in rec.full if l.strip()]
    b = [l.rstrip() for l in last_leaf.full if l.strip()]
    if a == b:
        rpt.ok(f"matches final step ({last_title!r})")
    else:
        diff = list(difflib.unified_diff(
            a, b, fromfile="Recommended", tofile=last_title, lineterm=""))
        rpt.fail(f"differs from final step ({last_title!r})", diff[:60])


def check_from_zero_to_prod(tree, rpt):
    print("\n[3] Each From-Zero-to-Prod step builds from the previous step")
    _, fzp = find_top(tree, "from zero")
    if fzp is None:
        rpt.fail("could not locate 'From Zero to Prod'")
        return
    steps = list(fzp.items())
    prev_title, prev_leaf = steps[0]
    if prev_leaf.full is None:
        rpt.fail(f"first step {prev_title!r} has no full manifest")
        return
    for title, leaf in steps[1:]:
        if leaf.full is None:
            rpt.fail(f"{title!r}: no full manifest")
            continue
        if leaf.diff is None:
            rpt.fail(f"{title!r}: no diff block")
            prev_title, prev_leaf = title, leaf
            continue
        ok, info = diff_plausible(prev_leaf.full, leaf.diff, leaf.full)
        if ok:
            rpt.ok(f"{title!r} builds from {prev_title!r}")
        else:
            rpt.fail(f"{title!r} does NOT build from {prev_title!r}",
                     rpt.describe(info))
        prev_title, prev_leaf = title, leaf


def check_additional_examples(tree, rpt):
    print("\n[4] Each Additional Example builds from Recommended "
          "(skipping LetsEncrypt + Standalone RoR)")
    _, rec = find_top(tree, "recommended")
    _, add = find_top(tree, "additional examples")
    if rec is None or add is None:
        rpt.fail("could not locate both sections")
        return
    for title, leaf in add.items():
        low = title.lower()
        if "letsencrypt" in low or "standalone" in low:
            print(f"  \033[33mSKIP\033[0m {title!r}")
            continue
        if leaf.full is None or leaf.diff is None:
            rpt.fail(f"{title!r}: missing diff or full manifest")
            continue
        ok, info = diff_plausible(rec.full, leaf.diff, leaf.full)
        if ok:
            rpt.ok(f"{title!r} builds from Recommended")
        else:
            rpt.fail(f"{title!r} does NOT build from Recommended",
                     rpt.describe(info))


def check_letsencrypt(tree, rpt):
    print("\n[5] LetsEncrypt builds from Recommended minus self-signed, plus its diff")
    _, rec = find_top(tree, "recommended")
    _, fzp = find_top(tree, "from zero")
    _, add = find_top(tree, "additional examples")
    if rec is None or fzp is None or add is None:
        rpt.fail("could not locate required sections")
        return
    _, selfsigned = find_child(fzp, "self-signed")
    le_title, letsencrypt = find_child(add, "letsencrypt")
    if selfsigned is None or selfsigned.diff is None:
        rpt.fail("could not locate self-signed step diff")
        return
    if letsencrypt is None or letsencrypt.diff is None or letsencrypt.full is None:
        rpt.fail("could not locate LetsEncrypt diff/full")
        return
    pre_remove = plus_lines(selfsigned.diff)
    ok, info = diff_plausible(rec.full, letsencrypt.diff, letsencrypt.full,
                              pre_remove=pre_remove)
    if ok:
        rpt.ok(f"{le_title!r} builds from Recommended minus self-signed")
    else:
        rpt.fail(f"{le_title!r} does NOT build as expected", rpt.describe(info))


# --------------------------------------------------------------------------- #
# main
# --------------------------------------------------------------------------- #

def print_tree(tree, rpt):
    print("\n[1] Parsed document tree")
    for top, val in tree.items():
        if isinstance(val, Leaf):
            print(f"  {top}  {val}")
        else:
            print(f"  {top}/")
            for child, leaf in val.items():
                print(f"      {child}  {leaf}")


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_DOC
    tree, _ = parse(path)
    rpt = Report()
    print(f"Checking: {path}")
    print_tree(tree, rpt)
    check_recommended_matches_final_step(tree, rpt)
    check_from_zero_to_prod(tree, rpt)
    check_additional_examples(tree, rpt)
    check_letsencrypt(tree, rpt)
    print(f"\n{'='*60}")
    print(f"{rpt.checks - rpt.failures}/{rpt.checks} checks passed.")
    sys.exit(1 if rpt.failures else 0)


if __name__ == "__main__":
    main()
