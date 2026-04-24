---
file: .tasks/prt-041-contract-dependency-boundary-realignment/tasks/T041-I2-selleragent-shared-config-inventory.md
description: Read-only inventory task for SellerAgent shared and platform-config package boundaries.
purpose: Classify SellerAgent `packages/shared` and `@selleragent/platform-config` exports so only genuinely shared helpers move to bot-platform.
version: 0.1.0
date: 2026-04-24
status: ACTIVE
parent: .memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
---

# T041-I2: SellerAgent Shared/Config Inventory

## Context To Read

- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/feature-area-boundaries.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md`
- SellerAgent `packages/shared`, `packages/platform-config` if present, manifests, workspace config, lockfile, exports, and import sites.

## Goal

Produce a read-only inventory of SellerAgent shared/config exports and consumers, with keep/split/move decisions for each in-scope export.

## Write Scope

- May write only report files under `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-041-contract-dependency-boundary-realignment/`.
- Primary report path: `reports/T041-I2-selleragent-shared-config-inventory-report.md`.
- Also write/append structured inventory content suitable for `inventory/selleragent-shared-and-config-exports.md` if useful.

## Do Not Touch

- Do not edit SellerAgent source code.
- Do not edit package manifests.
- Do not run dependency install or lockfile update.
- Do not open a product-local protocol.

## Implementation Rules

- Classify exports using PRT-041 classifications.
- Identify whether an export has real multi-product consumers or is SellerAgent-only.
- Treat SellerAgent business-profile, commerce, customer memory, live burst, operator handoff, and seller-specific UI/workflow semantics as product-local unless a platform envelope already exists.
- Treat generic config/runtime/helper vocabulary as platform candidates only if product-agnostic and useful outside SellerAgent.
- Identify any current Docoved consumer references that make a SellerAgent export urgent for cutover.

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
- export/consumer table with current package, import kind, consumer paths, proposed target, classification, migration action, compatibility rule, verification gate;
- explicit keep/split/move decisions;
- blockers/design decisions;
- recommended Phase 2/4 implementation slices;
- skipped checks with rationale.
