---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T039-02-channel-binding-contract.md
description: 'Implementation task for the next PRT-039 slice: add registry-backed channel-binding helpers on top of the shared control-plane vocabulary.'
purpose: 'Read before coding so the channel-binding slice reuses the accepted control-plane vocabulary and existing pipeline-registry seam without widening into API contracts, shared UI, or root-export integration.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: implementation
protocol: PRT-038 / PRT-039
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-02-report.md
verification_class: framework extraction wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-01-report.md
  - packages/core/src/control-plane/capabilities.ts
  - packages/core/src/control-plane/models.ts
  - packages/core/src/control-plane/mutation-envelopes.ts
  - packages/core/src/control-plane/refs.ts
  - packages/core/src/runtime/pipeline-registry.ts
write_scope:
  - packages/core/src/control-plane/channel-binding/**
no_touch:
  - packages/core/src/control-plane/index.ts
  - packages/core/src/control-plane/capabilities.ts
  - packages/core/src/control-plane/models.ts
  - packages/core/src/control-plane/mutation-envelopes.ts
  - packages/core/src/control-plane/refs.ts
  - packages/core/src/runtime/**
  - packages/api-contract/**
  - packages/scenario-system/**
  - .memory-bank/**
---

# Task T039-02: Channel-Binding Contract

## Purpose

Implement the next `PRT-039` slice: registry-backed helpers for channel binding, binding validation, status derivation, and accepted-binding snapshot capture.

This task should stand on top of:
- the accepted `T039-01` control-plane vocabulary;
- the existing runtime `pipeline-registry` seam;
- the protocol rule that channel-binding logic stays shared and canonical, but first-wave storage/UI/admin surfaces remain local or later.

## Scope / non-goals

### In scope

- add a new `packages/core/src/control-plane/channel-binding/**` subtree;
- implement helpers for binding validation and normalized validation outcomes;
- implement helpers for accepted binding snapshots used by later execution/run flows;
- implement small status or capability helpers when they are directly needed for channel-binding semantics;
- reuse `T039-01` types and `runtime/pipeline-registry.ts` rather than creating parallel contracts.

### Non-goals

- do not edit the accepted control-plane vocabulary files unless absolutely unavoidable; if you need to, stop and report instead;
- do not implement API-contract DTOs;
- do not wire root or subtree exports beyond files inside the new write scope;
- do not implement DB/storage, RLS, hosted admin surfaces, or product workflows;
- do not introduce logging/event emitters or observability sinks yet beyond typed values/constants if strictly needed.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/core/src/control-plane/channel-binding/**`

### No-touch boundaries

Do not edit:
- `packages/core/src/control-plane/index.ts`
- `packages/core/src/control-plane/capabilities.ts`
- `packages/core/src/control-plane/models.ts`
- `packages/core/src/control-plane/mutation-envelopes.ts`
- `packages/core/src/control-plane/refs.ts`
- `packages/core/src/runtime/**`
- `packages/api-contract/**`
- `packages/scenario-system/**`
- `.memory-bank/**`

If the correct solution appears to require changing the accepted vocabulary files or runtime seam, stop and report the gap instead of widening scope silently.

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038` for execution/closure discipline.
- `PRT-039` for channel and pipeline-binding rules, binding status universe, channel capability matrix, mutation invariants, and compatibility stance.
- `pipeline-registry-and-binding-contract.md` for canonical registry semantics and naming alignment.
- `control-plane-configuration-and-observability-surfaces.md` for control-plane write-path and validation expectations.
- `delivery-standards.md`, `coding-style.md`, `git-flow.md` for execution discipline.

### Code anchors to inspect before coding

- `packages/core/src/control-plane/models.ts`
- `packages/core/src/control-plane/mutation-envelopes.ts`
- `packages/core/src/runtime/pipeline-registry.ts`

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` fully.
- [ ] Read `PRT-039` fully.
- [ ] Read the runtime pipeline-registry spec and control-plane ops spec.
- [ ] Read `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.
- [ ] Inspect the accepted `T039-01` code plus the runtime pipeline-registry seam.
- [ ] Confirm that all intended edits stay inside `packages/core/src/control-plane/channel-binding/**`.

## Open questions / ambiguity gate

Stop and report instead of guessing if any of these remains materially unclear:
- which helpers can remain pure validation/snapshot helpers now versus what belongs in later control-plane API or execution integration tasks;
- whether a desired helper actually requires widening the accepted vocabulary files;
- whether any status derivation logic would implicitly encode storage or observability policy that should wait for later waves.

## Task

Implement a reusable channel-binding contract layer inside `packages/core/src/control-plane/channel-binding/**`.

Minimum required outcome:
1. Registry-backed binding validation helper(s) that reuse `runtime/pipeline-registry.ts`.
2. Normalized accepted-binding snapshot helper(s) that produce stable shared runtime input for later execution/run linkage.
3. Narrow typed status/capability derivation helper(s) needed for first-wave binding semantics.
4. Error/envelope usage that aligns with the `T039-01` mutation primitives and the naming-alignment rule.

Design preference:
- stay pure and helper-oriented;
- avoid hidden storage assumptions;
- avoid inventing a second registry or parallel validation contract.

## Deliverables

- New or updated files only under `packages/core/src/control-plane/channel-binding/**`
- Written report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-02-report.md`

## Constraints / anti-goals / required rules

- Default to ASCII.
- No `console.*`.
- Do not add product-specific logic or hosted/admin UI concepts.
- Do not duplicate `pipeline-registry` validation under new names.
- Do not touch root exports in this task.

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
- write it to `lessons/004-lessons-learned.md` or `lessons/004-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-02-report.md`

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
- the implementation stays entirely inside `packages/core/src/control-plane/channel-binding/**`;
- it reuses the accepted control-plane vocabulary and runtime registry seam rather than duplicating them;
- local checks are green or honestly reported;
- the report is complete and saved to the required path.
