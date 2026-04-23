---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
description: 'Execution workspace for the first implementation wave under PRT-038: shared control-plane and governed-content vocabulary slices.'
purpose: 'Use as the working index for the first bounded implementation wave so subagent tasks, reports, lessons learned, and stage progress stay organized under one execution packet.'
version: 1.1.0
date: 2026-04-23
status: ACTIVE
tags: [tasks, protocol, implementation, prt-038, wave1, subagents]
parent: .tasks/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .tasks/prt-038-phase2-implementation/reports/phase2-implementation-synthesis.md
  - .tasks/prt-038-phase3-ops-runbook-alignment/reports/phase3-ops-runbook-alignment.md
---

# PRT-038 Wave 1 Shared Vocabulary Implementation

## Goal

Start the first real implementation wave under `PRT-038` with the two bounded prerequisite tasks recommended by phase 2:
- `T039-01-control-plane-vocabulary`
- `T040-01-governed-content-vocabulary`

This wave is intentionally limited to shared domain vocabulary and supporting helpers in `packages/core`.

It does not yet include:
- API-contract envelopes;
- root barrel/export integration;
- scenario/verifier tasks;
- Memory Bank closure sync;
- product-repo adoption work.

## Working folders

- `tasks/` — implementation task files for subagents
- `reports/` — written executor and later verifier reports
- `lessons/` — reusable non-obvious findings and insights for later MBB routing

## Current execution stance

- Git lane: temporary feature-wave execution on `feature/EP-022-prt-038-wave1`
- Reason: `develop` is not yet activated as a real local branch in this repo state, so the wave starts from the current feature baseline with explicit local-only execution and no remote promotion by subagents
- Remote trigger stance for this first pass: local-only; no push, PR, hosted deploy, or release actions by subagents

## Task set

- `tasks/T039-01-control-plane-vocabulary.md`
- `tasks/T040-01-governed-content-vocabulary.md`
- `tasks/T039-02-channel-binding-contract.md`
- `tasks/T039-03-control-plane-api-read-models.md`
- `tasks/T040-02-source-processing-bundle-contract.md`
- `tasks/T040-03-import-lifecycle-idempotency.md`

## Reserved lessons / insights slots

- `lessons/001-lessons-learned.md` — protocol-start operational finding recorded by the main agent
- `lessons/002-lessons-learned.md` / `lessons/002-insights.md` — reserved for `T039-01` if needed
- `lessons/003-lessons-learned.md` / `lessons/003-insights.md` — reserved for `T040-01` if needed
- `lessons/004-lessons-learned.md` / `lessons/004-insights.md` — reserved for `T039-02` if needed
- `lessons/005-lessons-learned.md` / `lessons/005-insights.md` — reserved for `T039-03` if needed
- `lessons/006-lessons-learned.md` / `lessons/006-insights.md` — reserved for `T040-02` if needed
- `lessons/007-lessons-learned.md` / `lessons/007-insights.md` — reserved for `T040-03` if needed

## Progress notes

- `2026-04-23`: implementation workspace opened after phase-3 ops alignment, initial documentation baseline committed, and the first two bounded implementation tasks selected for parallel execution.
- `2026-04-23`: `T039-01` and `T040-01` accepted after main-agent review; local checks were re-run in the main branch context (`pnpm --filter @dd-bot-platform/core typecheck`, `pnpm --filter @dd-bot-platform/core build`, `pnpm check`) and passed.
- `2026-04-23`: accepted findings were routed into owning Memory Bank docs:
  - temporary pre-`develop` execution rule -> `spec/operations/git-flow.md`
  - `pipelineId` / `channelKind` naming alignment -> `spec/runtime/pipeline-registry-and-binding-contract.md`, `spec/operations/control-plane-configuration-and-observability-surfaces.md`
- `2026-04-23`: next implementation candidates are `T039-02`, `T039-03`, `T040-02`, and `T040-03`.
- `2026-04-23`: second implementation tranche opened with disjoint write scopes for channel-binding helpers, control-plane API envelopes, source-processing bundle helpers, and import-lifecycle/idempotency helpers.
