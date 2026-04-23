---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-04-governed-content-api-read-models.md
description: 'Implementation task for the next PRT-040 slice: add shared governed-content API read models in packages/api-contract.'
purpose: 'Read before coding so the governed-content readback layer lands as a package-local DTO/schema slice without leaking product review UX, activation UX, or root export integration into the wrong task.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: implementation
protocol: PRT-038 / PRT-040
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-04-report.md
verification_class: framework extraction wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
  - .memory-bank/spec/runtime/workflow-framework-contract.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md
  - packages/api-contract/src/control-plane/shared.ts
  - packages/api-contract/src/control-plane/models.ts
  - packages/api-contract/src/control-plane/read-models.ts
  - packages/core/src/governed-content/vocabulary/statuses.ts
  - packages/core/src/governed-content/vocabulary/objects.ts
  - packages/core/src/governed-content/vocabulary/errors.ts
  - packages/core/src/governed-content/source-processing/contracts.ts
  - packages/core/src/governed-content/source-processing/classification.ts
  - packages/core/src/governed-content/import-lifecycle/status-transitions.ts
  - packages/core/src/governed-content/import-lifecycle/conflict-guards.ts
write_scope:
  - packages/api-contract/src/governed-content/**
no_touch:
  - packages/api-contract/src/index.ts
  - packages/api-contract/src/control-plane/**
  - packages/core/**
  - packages/scenario-system/**
  - .memory-bank/**
---

# Task T040-04: Governed-Content API Read Models

## Purpose

Implement the first shared governed-content API-contract slice in `packages/api-contract`.

This task should expose shared readback/DTO semantics for governed sources, revisions, imports, derived reports, and governed artifacts, while keeping product review UX, activation UX, and product-local naming overlays out of the package-local contract layer.

## Scope / non-goals

### In scope

- add a new `packages/api-contract/src/governed-content/**` subtree;
- define shared schemas and inferred types for the first-wave governed-content read models:
  - `ConnectedSource`
  - `SourceRevision`
  - `ImportRun`
  - `ProcessingArtifact`
  - derived `ImportReport`
- define envelope/readback shapes for the first-wave governed-content surface families:
  - `gc-sources`
  - `gc-source-detail`
  - `gc-imports`
  - `gc-import-detail`
  - `gc-artifacts`
- align package-local naming and structure with the already accepted control-plane API-contract style.

### Non-goals

- do not edit `packages/core/**`;
- do not wire package-root exports yet;
- do not add product-local screen ids, route DTOs, review flows, or activation commands;
- do not introduce transport clients or HTTP wrappers beyond trivial package-local schema helpers if strictly needed.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/api-contract/src/governed-content/**`

### No-touch boundaries

Do not edit:
- `packages/api-contract/src/index.ts`
- `packages/api-contract/src/control-plane/**`
- `packages/core/**`
- `packages/scenario-system/**`
- `.memory-bank/**`

If the correct solution appears to require changing accepted core vocabulary or package root entrypoints, stop and report the gap instead of widening scope silently.

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038` for execution/closure discipline.
- `PRT-040` for canonical governed-content objects, surface families, and derived `ImportReport` rules.
- `typed-client-api-and-sdk.md` for contract-layer expectations.
- `workflow-framework-contract.md` for workflow-boundary vocabulary.
- `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.

### Code anchors to inspect before coding

- `packages/api-contract/src/control-plane/shared.ts`
- `packages/api-contract/src/control-plane/models.ts`
- `packages/api-contract/src/control-plane/read-models.ts`
- `packages/core/src/governed-content/vocabulary/statuses.ts`
- `packages/core/src/governed-content/vocabulary/objects.ts`
- `packages/core/src/governed-content/vocabulary/errors.ts`
- `packages/core/src/governed-content/source-processing/contracts.ts`
- `packages/core/src/governed-content/source-processing/classification.ts`
- `packages/core/src/governed-content/import-lifecycle/status-transitions.ts`
- `packages/core/src/governed-content/import-lifecycle/conflict-guards.ts`

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` and `PRT-040`.
- [ ] Read `typed-client-api-and-sdk.md`, `workflow-framework-contract.md`, `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.
- [ ] Inspect the accepted `T040-02` and `T040-03` results plus the `api-contract` control-plane subtree as the style anchor.
- [ ] Confirm that all intended edits stay inside `packages/api-contract/src/governed-content/**`.

## Open questions / ambiguity gate

Stop and report instead of guessing if:
- the correct schema shape depends on product review or activation UX rather than shared readback semantics;
- a desired field appears to belong back in the shared core vocabulary instead of the API-contract read-model layer;
- root export wiring appears necessary for the task to compile.

## Task

Implement the first governed-content API-contract slice in `packages/api-contract/src/governed-content/**`.

Minimum required outcome:
1. Shared zod schemas and inferred types for the first-wave governed-content read models and derived report structures.
2. Envelope/readback shapes for the shared governed-content surface families defined by `PRT-040`.
3. Package-local structure that later export-integration and verifier tasks can extend without editing `packages/core/**`.

Design preference:
- follow the existing `api-contract` package style;
- keep the slice schema-first and lean;
- treat `ImportReport` as a derived read model, not a forced standalone canonical root.

## Deliverables

- New or updated files only under `packages/api-contract/src/governed-content/**`
- Written report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-04-report.md`

## Constraints / anti-goals / required rules

- Default to ASCII.
- No `console.*`.
- No root export integration in this task.
- No edits in `packages/core/**`.
- Do not invent product review/approval surfaces or activation command DTOs.

## Execution lane / git-flow path / remote-trigger permissions

- Branch/workspace path for this run: `feature/EP-022-prt-038-wave1`
- This task is local-only.
- Forbidden: push, PR, CI/deploy/release actions.

## Verification plan

Run:
- `pnpm --filter @dd-bot-platform/api-contract typecheck`
- `pnpm --filter @dd-bot-platform/api-contract build`

Optional broader check:
- `pnpm check` only if cheap and useful after the slice lands

Record explicit `N/A` for non-applicable scenario/hosted/security/CI checks.

## Lessons learned / insights handling

If you discover a reusable non-obvious finding:
- write it to `lessons/009-lessons-learned.md` or `lessons/009-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-04-report.md`

The report must contain:
- summary of work;
- files changed;
- commands run;
- results of checks;
- explicit `N/A` / not-run items;
- remote-actions status;
- lessons/insights files created or `none`;
- blockers or scope gaps if any.

## Definition of done

This task is complete only if:
- the implementation stays entirely inside `packages/api-contract/src/governed-content/**`;
- it reflects shared governed-content readback semantics rather than product-local review or activation UX;
- local package checks are green or honestly reported;
- the report is complete and saved to the required path.
