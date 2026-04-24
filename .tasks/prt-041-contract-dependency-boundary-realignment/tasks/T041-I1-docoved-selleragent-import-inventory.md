---
file: .tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I1-docoved-selleragent-import-inventory.md
description: Read-only inventory task for Docoved dependencies on SellerAgent package namespaces.
purpose: Classify every Docoved import/dependency on @selleragent/* and identify safe target ownership before code movement.
version: 0.1.0
date: 2026-04-24
status: ACTIVE
parent: .memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
---

# T041-I1: Docoved SellerAgent Import Inventory

## Context To Read

- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/architecture/boundaries.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/project/docoved-platform-adoption-boundary.md`
- Docoved `package.json`, `pnpm-workspace.yaml`, package manifests, TypeScript configs, package export maps, and lockfile.

## Goal

Produce a read-only, symbol-level inventory of every Docoved dependency/import from `@selleragent/api-contract`, `@selleragent/shared`, `@selleragent/core`, or other `@selleragent/*` namespaces.

## Write Scope

- May write only report files under `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/`.
- Primary report path: `reports/T041-I1-docoved-selleragent-import-inventory-report.md`.
- Also write/append structured inventory content suitable for `inventory/docoved-selleragent-imports.md` if useful.

## Do Not Touch

- Do not edit Docoved source code.
- Do not edit package manifests.
- Do not run dependency install or lockfile update.
- Do not open a product-local protocol.

## Implementation Rules

- Classify symbols using PRT-041 allowed classifications.
- Separate runtime imports, type-only imports, package manifest dependencies, lockfile references, tsconfig/path references, and published/exported entrypoints.
- For each symbol, decide whether the target should be `@dd-bot-platform/api-contract`, `@dd-bot-platform/core`, `@docoved-agent/*`, retained bridge, deleted, or design-decision.
- If the same package name is used for Docoved-owned code, identify it as package identity correction rather than platform extraction.

## Verification Gates

- This is read-only. Run search commands only.
- Include exact commands or query patterns used.
- No hosted, CI, build, or package publish gates.

## Lessons Learned / Insights

If you discover undocumented package graph behavior, stale Memory Bank claims, or surprising ownership facts, write a numbered note under `lessons/` with either `*-lessons-learned.md` or `*-insights.md` naming.

## Report Format

Report must include:
- executive summary;
- exact files/manifests inspected;
- table with columns: symbol/package, import kind, importing path, current owner, proposed target, classification, migration action, compatibility rule, verification gate;
- blocker/design-decision list;
- recommended Phase 2/3 implementation slices;
- skipped checks with rationale.
