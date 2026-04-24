---
file: .tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I3-platform-target-and-navigation-inventory.md
description: Read-only inventory task for platform target packages and Memory Bank truth-surface alignment.
purpose: Map candidate shared symbols to existing bot-platform packages and verify navigation docs distinguish active protocols from closed baselines.
version: 0.1.0
date: 2026-04-24
status: ACTIVE
parent: .memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
---

# T041-I3: Platform Target And Navigation Inventory

## Context To Read

- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/architecture/boundaries.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/feature-area-boundaries.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md`
- Bot-platform package manifests and exports for `packages/api-contract`, `packages/core`, `packages/scenario-system`.
- Memory Bank entrypoints in all three repos: root indexes, plans indexes, protocol hubs, current-status reports.

## Goal

Produce a read-only inventory mapping likely shared targets to existing bot-platform package homes and listing any stale truth-surface wording across the three repo Memory Banks.

## Write Scope

- May write only report files under `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/`.
- Primary report path: `reports/T041-I3-platform-target-and-navigation-inventory-report.md`.
- Also write/append structured inventory content suitable for `inventory/platform-target-symbol-map.md` and `inventory/product-navigation-truth-surface-map.md` if useful.

## Do Not Touch

- Do not edit platform/product source code.
- Do not edit Memory Bank docs.
- Do not run dependency install or lockfile update.

## Implementation Rules

- Prefer existing `@dd-bot-platform/api-contract` and `@dd-bot-platform/core`; do not recommend broad `@dd-bot-platform/shared` unless absolutely blocked and documented as future protocol.
- Identify whether candidate shared contracts already exist in bot-platform and can be reused instead of moved.
- Identify stale wording only when it appears in current normative entrypoints, not historical `history:` lines.
- Product Memory Banks must remain self-contained for product agents.

## Verification Gates

- This is read-only. Run search commands only.
- Include exact commands or query patterns used.
- No hosted, CI, build, or package publish gates.

## Lessons Learned / Insights

If you discover undocumented package graph behavior, stale Memory Bank claims, or surprising ownership facts, write a numbered note under `lessons/` with either `*-lessons-learned.md` or `*-insights.md` naming.

## Report Format

Report must include:
- executive summary;
- exact package/docs surfaces inspected;
- platform target map table;
- Memory Bank truth-surface table with current wording, risk, recommended change, and whether it is normative or historical;
- blockers/design decisions;
- recommended Phase 2/5 implementation slices;
- skipped checks with rationale.
