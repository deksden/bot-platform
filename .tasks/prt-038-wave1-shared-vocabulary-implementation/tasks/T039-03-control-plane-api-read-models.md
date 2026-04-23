---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T039-03-control-plane-api-read-models.md
description: 'Implementation task for the next PRT-039 slice: add shared control-plane DTO/read-model envelopes in packages/api-contract.'
purpose: 'Read before coding so the first API-contract control-plane slice lands with package-local schemas/read-models only, without root export wiring, product IA, or runtime-side drift.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: implementation
protocol: PRT-038 / PRT-039
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-03-report.md
verification_class: framework extraction wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-01-report.md
  - packages/api-contract/src/runtime.ts
  - packages/api-contract/src/semantic-eval.ts
write_scope:
  - packages/api-contract/src/control-plane/**
no_touch:
  - packages/api-contract/src/index.ts
  - packages/api-contract/src/runtime.ts
  - packages/api-contract/src/semantic-eval.ts
  - packages/core/**
  - packages/scenario-system/**
  - .memory-bank/**
---

# Task T039-03: Control-Plane API Read Models

## Purpose

Implement the first shared control-plane API-contract slice in `packages/api-contract`.

This task should produce package-local read/write envelopes and schemas for later control-plane surfaces without claiming route ownership, product IA, or runtime-side storage logic.

## Scope / non-goals

### In scope

- add a new `packages/api-contract/src/control-plane/**` subtree;
- define control-plane DTO/read-model schemas and inferred types for the first shared surface families:
  - memberships
  - sessions
  - product instances
  - channels / pipeline binding readback
  - execution runs
  - trace artifacts
- stay aligned with the accepted `T039-01` vocabulary.

### Non-goals

- do not touch `packages/core/**`;
- do not wire package-root exports yet;
- do not add product IA, routes, screen ids, or UI composition;
- do not add HTTP transport/client wrappers unless they are trivial type-only helpers inside the subtree.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/api-contract/src/control-plane/**`

### No-touch boundaries

Do not edit:
- `packages/api-contract/src/index.ts`
- `packages/api-contract/src/runtime.ts`
- `packages/api-contract/src/semantic-eval.ts`
- `packages/core/**`
- `packages/scenario-system/**`
- `.memory-bank/**`

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038` for execution/closure discipline.
- `PRT-039` for shared surface families and the boundary between platform-owned contracts and product-local composition.
- `control-plane-configuration-and-observability-surfaces.md` for required read models and validation ownership.
- `typed-client-api-and-sdk.md` for contract-layer expectations.
- `delivery-standards.md`, `coding-style.md`, `git-flow.md`.

### Code anchors to inspect before coding

- `packages/api-contract/src/runtime.ts`
- `packages/api-contract/src/semantic-eval.ts`
- accepted `T039-01` report for the newly landed shared vocabulary

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` and `PRT-039`.
- [ ] Read the control-plane operations spec and typed client API spec.
- [ ] Read `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.
- [ ] Inspect the existing package style in `packages/api-contract/src/runtime.ts` and `semantic-eval.ts`.
- [ ] Confirm that all intended edits stay inside `packages/api-contract/src/control-plane/**`.

## Open questions / ambiguity gate

Stop and report instead of guessing if:
- the correct envelope shape depends on product UI composition rather than shared surface semantics;
- a desired schema appears to require edits to accepted core vocabulary files;
- root export wiring seems necessary for the task to compile.

## Task

Implement the first control-plane contract slice in `packages/api-contract/src/control-plane/**`.

Minimum required outcome:
1. Shared zod schemas and inferred types for the first-wave control-plane read models.
2. Envelope/readback shapes suitable for later API/surface work, aligned to `PRT-039`.
3. Package-local internal structure that later tasks can extend without root export wiring yet.

Design preference:
- follow the existing `api-contract` package style;
- keep the slice lean and schema-first;
- avoid product-local naming or layout semantics.

## Deliverables

- New or updated files only under `packages/api-contract/src/control-plane/**`
- Written report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-03-report.md`

## Constraints / anti-goals / required rules

- Default to ASCII.
- No `console.*`.
- No root export integration in this task.
- No edits in `packages/core/**`.
- Do not invent product screen models or route-layer DTOs.

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
- write it to `lessons/005-lessons-learned.md` or `lessons/005-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-03-report.md`

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
- the implementation stays entirely inside `packages/api-contract/src/control-plane/**`;
- it reflects shared control-plane read models rather than product-local IA;
- local package checks are green or honestly reported;
- the report is complete and saved to the required path.
