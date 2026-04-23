---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-03-import-lifecycle-idempotency.md
description: 'Implementation task for the next PRT-040 slice: add import-lifecycle and idempotency helpers in packages/core.'
purpose: 'Read before coding so the import-lifecycle slice lands as a package-local shared seam for status transitions, idempotency keys, and conflict-safe helpers without widening into workflow-host code, storage, or activation UX.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: implementation
protocol: PRT-038 / PRT-040
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md
verification_class: framework extraction wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/spec/runtime/workflow-framework-contract.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-01-report.md
  - packages/core/src/governed-content/vocabulary/statuses.ts
  - packages/core/src/governed-content/vocabulary/objects.ts
  - packages/core/src/governed-content/vocabulary/errors.ts
write_scope:
  - packages/core/src/governed-content/import-lifecycle/**
no_touch:
  - packages/core/src/governed-content/index.ts
  - packages/core/src/governed-content/vocabulary/**
  - packages/core/src/governed-content/source-processing/**
  - packages/api-contract/**
  - packages/scenario-system/**
  - .memory-bank/**
---

# Task T040-03: Import Lifecycle And Idempotency

## Purpose

Implement the package-local import-lifecycle and idempotency helpers in `packages/core/src/governed-content/import-lifecycle/**`.

This slice should cover:
- allowed lifecycle/status transitions;
- semantic idempotency-key helpers;
- stable revision-key helpers where appropriate;
- typed conflict-safe helpers aligned to `PRT-040`.

It must not implement workflow-host code or product activation UX.

## Scope / non-goals

### In scope

- add a new `packages/core/src/governed-content/import-lifecycle/**` subtree;
- define reusable lifecycle helpers and state-transition rules for `ImportRun`;
- define idempotency key / stable revision key helpers and related conflict-safe helpers;
- reuse `T040-01` vocabulary and error primitives.

### Non-goals

- do not edit the accepted governed-content vocabulary files unless absolutely unavoidable; if you need to, stop and report it;
- do not implement workflow orchestration, callbacks, DB transactions, or storage adapters;
- do not implement actual activation UX or product publication truth;
- do not implement API-contract DTOs or root export wiring.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/core/src/governed-content/import-lifecycle/**`

### No-touch boundaries

Do not edit:
- `packages/core/src/governed-content/index.ts`
- `packages/core/src/governed-content/vocabulary/**`
- `packages/core/src/governed-content/source-processing/**`
- `packages/api-contract/**`
- `packages/scenario-system/**`
- `.memory-bank/**`

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038` for execution/closure discipline.
- `PRT-040` for import status universe, idempotency, concurrency, candidate-vs-live boundary, and activation/rollback invariants.
- `workflow-framework-contract.md` for shared workflow vocabulary boundaries.
- `delivery-standards.md`, `coding-style.md`, `git-flow.md`.

### Code anchors to inspect before coding

- `packages/core/src/governed-content/vocabulary/statuses.ts`
- `packages/core/src/governed-content/vocabulary/objects.ts`
- `packages/core/src/governed-content/vocabulary/errors.ts`

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` and `PRT-040`.
- [ ] Read `workflow-framework-contract.md`.
- [ ] Read `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.
- [ ] Inspect the accepted `T040-01` governed-content vocabulary files.
- [ ] Confirm that all intended edits stay inside `packages/core/src/governed-content/import-lifecycle/**`.

## Open questions / ambiguity gate

Stop and report instead of guessing if:
- a needed type appears to belong back in the shared vocabulary rather than the import-lifecycle subtree;
- a desired helper would implicitly implement workflow-host behavior or storage orchestration;
- root export wiring appears necessary.

## Task

Implement the package-local import-lifecycle/idempotency contract slice.

Minimum required outcome:
1. Reusable helpers for allowed `ImportRun` lifecycle transitions.
2. Idempotency-key and stable source-revision key helpers aligned to `PRT-040`.
3. Conflict-safe helpers or predicates for stale-write / duplicate / activation-conflict-adjacent cases, using the accepted error vocabulary.

Design preference:
- keep it contract-first and helper-light;
- make later workflow/import code easier without pretending the runtime orchestrator already exists.

## Deliverables

- New or updated files only under `packages/core/src/governed-content/import-lifecycle/**`
- Written report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md`

## Constraints / anti-goals / required rules

- Default to ASCII.
- No `console.*`.
- No workflow-host or DB-adapter implementation.
- No root export integration in this task.
- No edits outside the declared subtree.

## Execution lane / git-flow path / remote-trigger permissions

- Branch/workspace path for this run: `feature/EP-022-prt-038-wave1`
- This task is local-only.
- Forbidden: push, PR, CI/deploy/release actions.

## Verification plan

Run:
- `pnpm --filter @dd-bot-platform/core typecheck`
- `pnpm --filter @dd-bot-platform/core build`

Optional broader check:
- `pnpm check` only if cheap and useful after the slice lands

Record explicit `N/A` for non-applicable scenario/hosted/security/CI checks.

## Lessons learned / insights handling

If you discover a reusable non-obvious finding:
- write it to `lessons/007-lessons-learned.md` or `lessons/007-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md`

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
- the implementation stays entirely inside `packages/core/src/governed-content/import-lifecycle/**`;
- it defines reusable lifecycle/idempotency helpers without pretending the workflow or storage implementation already exists;
- local checks are green or honestly reported;
- the report is complete and saved to the required path.
