---
file: .tasks/prt-041-contract-dependency-boundary-realignment/index.md
description: Working task packet for PRT-041 cross-repo contract dependency boundary realignment.
purpose: Track execution artifacts, subagent tasks, reports, lessons, and phase state for PRT-041.
version: 0.1.0
date: 2026-04-24
status: ACTIVE
parent: .memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
---

# PRT-041 Task Packet

## Phase State

- Phase 1 read-only inventory: complete.
- Phase 2 platform extraction: not needed for this concrete defect; broader extraction deferred by symbol-level decision.
- Phase 3 Docoved cutover: complete.
- Phase 4 SellerAgent shrinkage: complete as classification/no-code decision; no Docoved consumers remain.
- Phase 5 documentation sync: complete for protocol entrypoints and local Docoved PRT-039.
- Phase 6 closeout: complete pending final `git diff --check` sweep.

## Working Rules

- Use this folder for task files, inventory reports, verifier reports, and lessons/insights.
- Do not move code before Phase 1 inventory classifies symbols and package graph surfaces.
- Record undocumented findings in `lessons/` and promote useful durable facts into Memory Bank before closeout.
- Product-local protocols are opened only when product-owned code, public package identity, scenarios, runbooks, or hosted gates need changes.

## Active Task Files

- `tasks/T041-I1-docoved-selleragent-import-inventory.md`
- `tasks/T041-I2-selleragent-shared-config-inventory.md`
- `tasks/T041-I3-platform-target-and-navigation-inventory.md`

## Expected Inventory Outputs

- `inventory/docoved-selleragent-imports.md`
- `inventory/selleragent-shared-and-config-exports.md`
- `inventory/platform-target-symbol-map.md`
- `inventory/product-navigation-truth-surface-map.md`


## Closeout

- `reports/T041-S1-docoved-package-identity-cutover-report.md`
- `reports/T041-closeout-report.md`

Current result: protocol implementation complete; final response should mention skipped hosted gates with rationale.
