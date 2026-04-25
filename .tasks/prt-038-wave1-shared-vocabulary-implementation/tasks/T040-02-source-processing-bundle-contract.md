---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-02-source-processing-bundle-contract.md
description: 'Implementation task for the next PRT-040 slice: add source-processing bundle and classification helpers in packages/core.'
purpose: 'Read before coding so the source-processing contract lands as a package-local shared seam for bundle structure and classification honesty, without implementing a service, importer, or product-local activation flow.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: implementation
protocol: PRT-038 / PRT-040
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md
verification_class: framework extraction wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-01-report.md
  - packages/core/src/governed-content/vocabulary/statuses.ts
  - packages/core/src/governed-content/vocabulary/objects.ts
  - packages/core/src/governed-content/vocabulary/errors.ts
write_scope:
  - packages/core/src/governed-content/source-processing/**
no_touch:
  - packages/core/src/governed-content/index.ts
  - packages/core/src/governed-content/vocabulary/**
  - packages/core/src/governed-content/import-lifecycle/**
  - packages/api-contract/**
  - packages/scenario-system/**
  - .memory-bank/**
---

# Task T040-02: Source-Processing Bundle Contract

## Purpose

Implement the shared source-processing bundle contract as a package-local seam inside `packages/core/src/governed-content/source-processing/**`.

This task should cover the structure of the canonical extraction bundle and classification honesty helpers for:
- supported
- degraded
- unsupported

It must not implement a service or a concrete parser pipeline.

## Scope / non-goals

### In scope

- add a new `packages/core/src/governed-content/source-processing/**` subtree;
- define bundle/manfiest/item/result structures for the first-wave processing contract;
- define helpers for classification summary and honesty checks that later importer code can reuse;
- reuse `T040-01` vocabulary and error primitives.

### Non-goals

- do not edit the accepted governed-content vocabulary files unless absolutely unavoidable; if you need to, stop and report it;
- do not implement actual file parsing, OCR, markdown conversion, or workflow orchestration;
- do not implement API-contract DTOs or root export wiring;
- do not implement product review or activation logic.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/core/src/governed-content/source-processing/**`

### No-touch boundaries

Do not edit:
- `packages/core/src/governed-content/index.ts`
- `packages/core/src/governed-content/vocabulary/**`
- `packages/core/src/governed-content/import-lifecycle/**`
- `packages/api-contract/**`
- `packages/scenario-system/**`
- `.memory-bank/**`

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038` for execution/closure discipline.
- `PRT-040` for output contract, classification honesty, and minimality guardrails.
- `delivery-standards.md`, `coding-style.md`, `git-flow.md`.

### Code anchors to inspect before coding

- `packages/core/src/governed-content/vocabulary/statuses.ts`
- `packages/core/src/governed-content/vocabulary/objects.ts`
- `packages/core/src/governed-content/vocabulary/errors.ts`

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` and `PRT-040`.
- [ ] Read `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.
- [ ] Inspect the accepted `T040-01` governed-content vocabulary files.
- [ ] Confirm that all intended edits stay inside `packages/core/src/governed-content/source-processing/**`.

## Open questions / ambiguity gate

Stop and report instead of guessing if:
- a needed type appears to belong back in the shared vocabulary rather than the source-processing subtree;
- the desired helper would implicitly implement real parsing or workflow behavior rather than contract structure and honesty checks;
- root export wiring appears necessary.

## Task

Implement the package-local source-processing contract slice.

Minimum required outcome:
1. Canonical extraction-bundle structures for the first-wave contract.
2. Item/result/manfiest vocabulary supporting supported/degraded/unsupported honesty.
3. Reusable summary or validation helpers that keep later importer code honest about partial/unsupported outcomes.

Design preference:
- keep it contract-first and helper-light;
- make later implementation easier without pretending the processing engine already exists.

## Deliverables

- New or updated files only under `packages/core/src/governed-content/source-processing/**`
- Written report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md`

## Constraints / anti-goals / required rules

- Default to ASCII.
- No `console.*`.
- No service extraction or concrete parser logic.
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
- write it to `lessons/006-lessons-learned.md` or `lessons/006-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md`

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
- the implementation stays entirely inside `packages/core/src/governed-content/source-processing/**`;
- it defines a reusable bundle contract without pretending the real processing engine already exists;
- local checks are green or honestly reported;
- the report is complete and saved to the required path.
