---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T039-04-control-plane-export-integration.md
description: 'Implementation task for the next PRT-039 slice: integrate accepted control-plane subtrees into stable package entrypoints.'
purpose: 'Read before coding so the accepted control-plane slices become reachable through canonical package exports without widening back into domain logic, new contracts, or documentation drift.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: implementation
protocol: PRT-038 / PRT-039
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-04-report.md
verification_class: framework extraction wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-02-report.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-03-report.md
  - packages/core/src/control-plane/index.ts
  - packages/core/src/index.ts
  - packages/api-contract/src/control-plane/index.ts
  - packages/api-contract/src/index.ts
write_scope:
  - packages/core/src/control-plane/index.ts
  - packages/core/src/index.ts
  - packages/api-contract/src/control-plane/index.ts
  - packages/api-contract/src/index.ts
no_touch:
  - packages/core/src/control-plane/channel-binding/**
  - packages/core/src/control-plane/capabilities.ts
  - packages/core/src/control-plane/models.ts
  - packages/core/src/control-plane/mutation-envelopes.ts
  - packages/core/src/control-plane/refs.ts
  - packages/api-contract/src/control-plane/shared.ts
  - packages/api-contract/src/control-plane/vocabulary.ts
  - packages/api-contract/src/control-plane/models.ts
  - packages/api-contract/src/control-plane/read-models.ts
  - packages/core/src/governed-content/**
  - packages/api-contract/src/governed-content/**
  - packages/scenario-system/**
  - .memory-bank/**
---

# Task T039-04: Control-Plane Export Integration

## Purpose

Integrate the accepted control-plane slices into stable package entrypoints after the bounded domain/helper and API-contract work has landed.

This task exists to do one controlled barrel/entrypoint pass after parallel work is complete, so we do not create repeated merge conflicts or accidental widening while `T039-02` and `T039-03` are still moving.

## Scope / non-goals

### In scope

- wire `channel-binding` into `packages/core/src/control-plane/index.ts`;
- expose the control-plane subtree from `packages/core/src/index.ts`;
- expose the `packages/api-contract/src/control-plane/**` subtree through `packages/api-contract/src/index.ts`;
- keep export order and entrypoint structure consistent with existing package style.

### Non-goals

- do not edit the accepted control-plane implementation files beyond export wiring;
- do not introduce new schemas, helpers, or compatibility wrappers;
- do not add verifier tests, scenario docs, or Memory Bank sync in this task;
- do not touch governed-content exports yet.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/core/src/control-plane/index.ts`
- `packages/core/src/index.ts`
- `packages/api-contract/src/control-plane/index.ts`
- `packages/api-contract/src/index.ts`

### No-touch boundaries

Do not edit:
- `packages/core/src/control-plane/channel-binding/**`
- `packages/core/src/control-plane/capabilities.ts`
- `packages/core/src/control-plane/models.ts`
- `packages/core/src/control-plane/mutation-envelopes.ts`
- `packages/core/src/control-plane/refs.ts`
- `packages/api-contract/src/control-plane/shared.ts`
- `packages/api-contract/src/control-plane/vocabulary.ts`
- `packages/api-contract/src/control-plane/models.ts`
- `packages/api-contract/src/control-plane/read-models.ts`
- `packages/core/src/governed-content/**`
- `packages/api-contract/src/governed-content/**`
- `packages/scenario-system/**`
- `.memory-bank/**`

If the correct solution appears to require changing accepted implementation files instead of entrypoints, stop and report the gap instead of widening scope silently.

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038` for execution/closure discipline and serialization rules for barrel integration.
- `PRT-039` for the first-wave shared control-plane surface boundary.
- `pipeline-registry-and-binding-contract.md` for the already accepted naming seam.
- `typed-client-api-and-sdk.md` for package-export expectations.
- `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.

### Code anchors to inspect before coding

- `packages/core/src/control-plane/index.ts`
- `packages/core/src/index.ts`
- `packages/api-contract/src/control-plane/index.ts`
- `packages/api-contract/src/index.ts`
- accepted reports `T039-02-report.md` and `T039-03-report.md`

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` and `PRT-039`.
- [ ] Read `typed-client-api-and-sdk.md`, `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.
- [ ] Inspect the accepted `T039-02` and `T039-03` results plus the current package entrypoints.
- [ ] Confirm that all intended edits stay inside the four declared entrypoint files.

## Open questions / ambiguity gate

Stop and report instead of guessing if:
- export wiring appears to require changes inside the accepted subtrees rather than the entrypoints;
- the package root should expose additional unrelated surfaces in the same pass;
- a missing symbol in the accepted slices suggests a real contract gap rather than an export omission.

## Task

Implement the controlled control-plane export integration pass.

Minimum required outcome:
1. `packages/core/src/control-plane/index.ts` re-exports the new channel-binding helpers alongside the previously accepted vocabulary surfaces.
2. `packages/core/src/index.ts` exposes the `control-plane` subtree in the package root.
3. `packages/api-contract/src/index.ts` exposes the `control-plane` subtree in the package root.
4. The pass stays purely at the export/barrel layer with no domain or API shape drift.

Design preference:
- keep the integration minimal and deterministic;
- preserve barrel order/readability;
- avoid introducing new abstraction layers or compatibility shims.

## Deliverables

- Updated entrypoint files only within the declared write scope
- Written report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-04-report.md`

## Constraints / anti-goals / required rules

- Default to ASCII.
- No `console.*`.
- No edits outside the four declared files.
- No governed-content export wiring in this task.
- No Memory Bank or protocol docs changes in this task.

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
- write it to `lessons/008-lessons-learned.md` or `lessons/008-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-04-report.md`

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
- the accepted control-plane slices become reachable through stable package exports;
- local checks are green or honestly reported;
- the report is complete and saved to the required path.
