# Documentation Remediation: PRT-042 Review Findings

Дата: 2026-04-25
Репозиторий: `/Users/deksden/Documents/_Projects/bot-platform`

## Accepted fixes

- Added normative runtime spec stub: `.memory-bank/spec/runtime/channel-runtime-contract.md`.
- Updated runtime/spec/plans/root indexes so `PRT-042` is discoverable from Memory Bank entrypoints.
- Tightened protocol wording so the first wave is canonical response document + minimal rendering primitives, not command runtime or delivery orchestration.
- Added MBB anchors to protocol documentation rules: principles, delivery docs guide, and indexing guide.
- Added a deferred-work rationale table covering purpose, first-wave exclusion reason, and trigger-to-start for postponed areas.
- Added a phase-2 implementation protocol section with subagent workspace rules, task-file template, dependency graph, executor/verifier separation, and testing/staging gates.
- Added phase-3 ops/runbook planning: git-flow/worktree, push/CI/Vercel policy, hosted beta deployment triggers, backup/migration constraints, quality-gate fix policy, and lessons/insights capture rules.
- Recorded that `.tasks/prt-042-channel-runtime-protocol-review/` reports are transient evidence, not canonical contract truth.

## Remaining product-repo obligations

- `docoved-agent` must add a product-local adoption protocol and route answer/channel docs to upstream `bot-platform` `PRT-042`.
- `seller-agent` must add adoption routing once its channel-runtime work begins.
- `sales-agent` may remain lineage/migration evidence only and must not restate the new contract as canonical truth.

## Deferred by design

- Command runtime extraction.
- Outbound delivery orchestration.
- Threading abstractions.
- Framework-owned HTML renderer.
- DB migrations, read models, and UI screens.
