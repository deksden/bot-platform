---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-05-governed-content-export-integration.md
description: 'Implementation task for the next PRT-040 slice: integrate accepted governed-content subtrees into stable package entrypoints.'
purpose: 'Read before coding so the accepted governed-content slices become reachable through canonical package exports without mixing this pass with new DTO design, workflow behavior, or protocol-sync work.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: implementation
protocol: PRT-038 / PRT-040
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-05-report.md
verification_class: framework extraction wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-04-report.md
  - packages/core/src/governed-content/index.ts
  - packages/core/src/index.ts
  - packages/api-contract/src/governed-content/index.ts
  - packages/api-contract/src/index.ts
write_scope:
  - packages/core/src/governed-content/index.ts
  - packages/core/src/index.ts
  - packages/api-contract/src/governed-content/index.ts
  - packages/api-contract/src/index.ts
no_touch:
  - packages/core/src/governed-content/vocabulary/**
  - packages/core/src/governed-content/source-processing/**
  - packages/core/src/governed-content/import-lifecycle/**
  - packages/api-contract/src/governed-content/shared.ts
  - packages/api-contract/src/governed-content/vocabulary.ts
  - packages/api-contract/src/governed-content/models.ts
  - packages/api-contract/src/governed-content/read-models.ts
  - packages/core/src/control-plane/**
  - packages/api-contract/src/control-plane/**
  - packages/scenario-system/**
  - .memory-bank/**
---

# Task T040-05: Governed-Content Export Integration

## Purpose

Integrate the accepted governed-content slices into stable package entrypoints after the bounded core/helper and API-contract work has landed.

This task exists as one controlled barrel/entrypoint pass so the shared governed-content substrate becomes consumable without reopening already accepted internals or colliding with unrelated parallel work.

## Scope / non-goals

### In scope

- wire `source-processing` and `import-lifecycle` into `packages/core/src/governed-content/index.ts`;
- expose the governed-content subtree from `packages/core/src/index.ts`;
- expose the governed-content API-contract subtree through `packages/api-contract/src/index.ts`;
- keep entrypoint order and structure consistent with existing package style.

### Non-goals

- do not edit the accepted governed-content implementation files beyond export wiring;
- do not introduce new DTOs, workflow logic, or compatibility bridges;
- do not add verifier tests, scenario docs, or Memory Bank sync in this task;
- do not reopen control-plane implementation beyond the shared root entrypoints already in scope.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/core/src/governed-content/index.ts`
- `packages/core/src/index.ts`
- `packages/api-contract/src/governed-content/index.ts`
- `packages/api-contract/src/index.ts`

### No-touch boundaries

Do not edit:
- `packages/core/src/governed-content/vocabulary/**`
- `packages/core/src/governed-content/source-processing/**`
- `packages/core/src/governed-content/import-lifecycle/**`
- `packages/api-contract/src/governed-content/shared.ts`
- `packages/api-contract/src/governed-content/vocabulary.ts`
- `packages/api-contract/src/governed-content/models.ts`
- `packages/api-contract/src/governed-content/read-models.ts`
- `packages/core/src/control-plane/**`
- `packages/api-contract/src/control-plane/**`
- `packages/scenario-system/**`
- `.memory-bank/**`

If another export-integration task is still modifying the shared package root entrypoints, serialize this task instead of working in parallel.

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038` for execution/closure discipline and serialization rules for barrel integration.
- `PRT-040` for the first-wave governed-content surface boundary.
- `typed-client-api-and-sdk.md` for package-export expectations.
- `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.

### Code anchors to inspect before coding

- `packages/core/src/governed-content/index.ts`
- `packages/core/src/index.ts`
- `packages/api-contract/src/governed-content/index.ts`
- `packages/api-contract/src/index.ts`
- accepted reports `T040-02-report.md`, `T040-03-report.md`, and `T040-04-report.md`

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` and `PRT-040`.
- [ ] Read `typed-client-api-and-sdk.md`, `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.
- [ ] Inspect the accepted `T040-02`, `T040-03`, and `T040-04` results plus the current package entrypoints.
- [ ] Confirm that all intended edits stay inside the four declared entrypoint files.

## Open questions / ambiguity gate

Stop and report instead of guessing if:
- export wiring appears to require edits inside the accepted subtrees rather than the entrypoints;
- the package root should expose additional unrelated surfaces in the same pass;
- a missing symbol in the accepted governed-content slices suggests a real contract gap rather than an export omission.

## Task

Implement the controlled governed-content export integration pass.

Minimum required outcome:
1. `packages/core/src/governed-content/index.ts` re-exports the new `source-processing` and `import-lifecycle` helpers alongside the previously accepted vocabulary surfaces.
2. `packages/core/src/index.ts` exposes the `governed-content` subtree in the package root.
3. `packages/api-contract/src/index.ts` exposes the governed-content subtree in the package root.
4. The pass stays purely at the export/barrel layer with no domain or API shape drift.

Design preference:
- keep the integration minimal and deterministic;
- preserve barrel order/readability;
- avoid introducing new abstraction layers or compatibility shims.

## Deliverables

- Updated entrypoint files only within the declared write scope
- Written report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-05-report.md`

## Constraints / anti-goals / required rules

- Default to ASCII.
- No `console.*`.
- No edits outside the four declared files.
- No scenario or Memory Bank changes in this task.
- Serialize this task behind any still-running export-integration task that touches the same package root files.

## Execution lane / git-flow path / remote-trigger permissions

- Branch/workspace path for this run: `feature/EP-022-prt-038-wave1`
- This task is local-only.
- Forbidden: push, PR, CI/deploy/release actions.

## Verification plan

Run:
- `pnpm --filter @dd-bot-platform/core typecheck`
- `pnpm --filter @dd-bot-platform/core build`
- `pnpm --filter @dd-bot-platform/api-contract typecheck`
- `pnpm --filter @dd-bot-platform/api-contract build`
- `pnpm check`

Record explicit `N/A` for non-applicable scenario/hosted/security/CI checks.

## Lessons learned / insights handling

If you discover a reusable non-obvious finding:
- write it to `lessons/010-lessons-learned.md` or `lessons/010-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-05-report.md`

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
- the implementation stays entirely inside the declared entrypoint files;
- the accepted governed-content slices become reachable through stable package exports;
- local checks are green or honestly reported;
- the report is complete and saved to the required path.
