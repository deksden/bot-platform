---
file: .tasks/prt-041-contract-dependency-boundary-realignment/lessons/T041-I3-platform-target-and-navigation-insights.md
description: Lessons and insights from T041-I3 read-only package target and navigation inventory.
purpose: Preserve surprising ownership/navigation facts for later Memory Bank promotion under PRT-041.
date: 2026-04-24
task: T041-I3
status: COMPLETE
---

# T041-I3 Platform Target And Navigation Insights

1. Existing `@dd-bot-platform/api-contract` and `@dd-bot-platform/core` already cover most of the shared control-plane and governed-content target surface. The current boundary gap is primarily import ownership/name drift, not absence of a platform package home.

2. `@selleragent/shared` usage in `docoved-agent` is concentrated in a very small helper set: `timestamp`, `parseYamlText`, and secret-envelope crypto helpers. The generic helpers should likely be product-local replacements; the crypto helpers need a narrower security/support ownership decision rather than a broad `@dd-bot-platform/shared` package.

3. Product root indexes and protocol hubs mostly already distinguish closed adoption baselines from active `PRT-041`, but product `plans/index.md` files lag behind and still call closed local adoption packets active/current planning start packets. This creates a navigation split where agents starting from root are safe, while agents starting from plans may reopen closed work by mistake.

4. `docoved-agent/packages/api-contract/package.json` declaring `name: "@selleragent/api-contract"` is the most misleading package-identity fact found during inventory. It should be treated as a staged package-rename/cutover problem, not just an import-path cleanup.

