---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
description: 'Execution workspace for the first implementation wave under PRT-038: shared control-plane and governed-content substrate slices.'
purpose: 'Use as the working index for the first bounded implementation wave so subagent tasks, reports, lessons learned, acceptance notes, and stage progress stay organized under one execution packet.'
version: 1.5.0
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

# PRT-038 Wave 1 Shared Substrate Implementation

## Goal

Advance the first real implementation wave under `PRT-038` through the bounded shared-substrate slices recommended by phase 2:
- control-plane vocabulary, channel-binding helpers, and first API read models;
- governed-content vocabulary, source-processing helpers, and import-lifecycle/idempotency helpers.

This wave is still intentionally lean.

It does not yet include:
- root barrel/export integration for both shared substrates;
- the governed-content API-contract slice;
- verifier/scenario tasks;
- final protocol/status sync tasks;
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
- `tasks/T039-04-control-plane-export-integration.md`
- `tasks/T040-04-governed-content-api-read-models.md`
- `tasks/T040-05-governed-content-export-integration.md`
- `tasks/T039-V1-control-plane-verifier.md`
- `tasks/T040-V1-governed-content-verifier.md`
- `tasks/T039-S1-control-plane-sync.md`
- `tasks/T040-S1-governed-content-sync.md`

## Reserved lessons / insights slots

- `lessons/001-lessons-learned.md` — protocol-start operational finding recorded by the main agent
- `lessons/002-lessons-learned.md` / `lessons/002-insights.md` — reserved for `T039-01` if needed
- `lessons/003-lessons-learned.md` / `lessons/003-insights.md` — reserved for `T040-01` if needed
- `lessons/004-lessons-learned.md` / `lessons/004-insights.md` — reserved for `T039-02` if needed
- `lessons/005-lessons-learned.md` / `lessons/005-insights.md` — reserved for `T039-03` if needed
- `lessons/006-lessons-learned.md` / `lessons/006-insights.md` — reserved for `T040-02` if needed
- `lessons/007-lessons-learned.md` / `lessons/007-insights.md` — reserved for `T040-03` if needed
- `lessons/008-lessons-learned.md` / `lessons/008-insights.md` — reserved for `T039-04` if needed
- `lessons/009-lessons-learned.md` / `lessons/009-insights.md` — reserved for `T040-04` if needed
- `lessons/010-lessons-learned.md` / `lessons/010-insights.md` — reserved for `T040-05` if needed
- `lessons/011-lessons-learned.md` / `lessons/011-insights.md` — reserved for `T039-V1` if needed
- `lessons/012-lessons-learned.md` / `lessons/012-insights.md` — reserved for `T040-V1` if needed
- `lessons/013-lessons-learned.md` / `lessons/013-insights.md` — reserved for `T039-S1` if needed
- `lessons/014-lessons-learned.md` / `lessons/014-insights.md` — reserved for `T040-S1` if needed

## Progress notes

- `2026-04-23`: implementation workspace opened after phase-3 ops alignment, initial documentation baseline committed, and the first two bounded implementation tasks selected for parallel execution.
- `2026-04-23`: `T039-01` and `T040-01` accepted after main-agent review; local checks were re-run in the main branch context (`pnpm --filter @dd-bot-platform/core typecheck`, `pnpm --filter @dd-bot-platform/core build`, `pnpm check`) and passed.
- `2026-04-23`: accepted findings were routed into owning Memory Bank docs:
  - temporary pre-`develop` execution rule -> `spec/operations/git-flow.md`
  - `pipelineId` / `channelKind` naming alignment -> `spec/runtime/pipeline-registry-and-binding-contract.md`, `spec/operations/control-plane-configuration-and-observability-surfaces.md`
- `2026-04-23`: second implementation tranche opened with disjoint write scopes for channel-binding helpers, control-plane API envelopes, source-processing bundle helpers, and import-lifecycle/idempotency helpers.
- `2026-04-23`: `T039-02`, `T039-03`, `T040-02`, and `T040-03` were accepted after main-agent review; the combined rerun proof passed for `pnpm --filter @dd-bot-platform/core typecheck`, `pnpm --filter @dd-bot-platform/core build`, `pnpm --filter @dd-bot-platform/api-contract typecheck`, `pnpm --filter @dd-bot-platform/api-contract build`, and `pnpm check`.
- `2026-04-23`: next bounded tasks were opened for serialized continuation of the same wave:
  - `T039-04-control-plane-export-integration`
  - `T040-04-governed-content-api-read-models`
  - `T040-05-governed-content-export-integration`
- `2026-04-23`: `T039-04`, `T040-04`, and `T040-05` were accepted after main-agent review; root/package entrypoints now expose both shared substrates and the combined rerun proof again passed for package-local checks plus `pnpm check`.
- `2026-04-23`: next bounded verifier tasks were opened on top of the now-stable exports:
  - `T039-V1-control-plane-verifier`
  - `T040-V1-governed-content-verifier`
- `2026-04-23`: `T039-V1` and `T040-V1` were accepted after main-agent review; runnable local framework verifier proof now exists for both shared substrates via `node:test` on compiled package artifacts plus flat scenario anchors `SCN-176` and `SCN-177`.
- `2026-04-23`: next bounded tasks are the serialized documentation/sync closures:
  - `T039-S1-control-plane-sync`
  - `T040-S1-governed-content-sync`
