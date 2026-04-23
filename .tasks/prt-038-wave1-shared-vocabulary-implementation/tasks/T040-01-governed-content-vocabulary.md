---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-01-governed-content-vocabulary.md
description: 'Implementation task for the first PRT-040 slice: land the shared governed-content vocabulary in packages/core.'
purpose: 'Read before coding so the governed-content vocabulary slice lands with the correct shared object model, narrow write scope, and no accidental drift into product publication truth, API contracts, or service extraction.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: implementation
protocol: PRT-038 / PRT-040
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-01-report.md
verification_class: framework extraction wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/spec/project/three-layer-product-line-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
  - .memory-bank/spec/runtime/workflow-framework-contract.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/mbb/principles.md
  - .memory-bank/mbb/indexing-guide.md
  - .memory-bank/mbb/cross-references.md
  - .memory-bank/mbb/delivery-docs-guide.md
  - .tasks/prt-038-phase2-implementation/reports/T02-report.md
  - .tasks/prt-038-phase3-ops-runbook-alignment/reports/phase3-ops-runbook-alignment.md
  - packages/core/src/index.ts
  - packages/core/src/runtime/index.ts
  - packages/core/src/runtime/kernel.ts
write_scope:
  - packages/core/src/governed-content/**
no_touch:
  - packages/core/src/index.ts
  - packages/core/src/runtime/**
  - packages/api-contract/**
  - packages/scenario-system/**
  - .memory-bank/**
---

# Task T040-01: Governed-Content Vocabulary

## Purpose

Land the first reusable shared governed-content vocabulary slice in `packages/core`.

This slice should establish the canonical shared domain types and narrow supporting helpers for:
- `ConnectedSource`
- `SourceRevision`
- `ImportRun`
- `ProcessingArtifact`
- derived `ImportReport`

The goal is to make later source-processing and import-lifecycle work build on one explicit shared vocabulary without dragging product publication truth into the platform layer.

## Scope / non-goals

### In scope

- add a new `packages/core/src/governed-content/**` subtree;
- define shared governed-content object types and status unions required by `PRT-040`;
- define first-wave vocabulary for import lifecycle and bundle/artifact classification where the protocol already fixes it;
- define narrow typed error/envelope primitives for validation/conflict paths that later source-processing and import-lifecycle helpers can reuse;
- add small helper utilities only when they directly support the vocabulary slice and remain inside the write scope.

### Non-goals

- do not implement actual file processing, bundle generation, or import-run state transitions;
- do not implement API-contract DTOs in `packages/api-contract`;
- do not wire package-root exports yet;
- do not create a service boundary, workflow host, or new deployable;
- do not move Docoved or SellerAgent product publication truth into shared objects.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/core/src/governed-content/**`

### No-touch boundaries

Do not edit:
- `packages/core/src/index.ts`
- `packages/core/src/runtime/**`
- `packages/api-contract/**`
- `packages/scenario-system/**`
- `.memory-bank/**`

If a necessary change appears to require one of those files, stop and report it rather than widening the task implicitly.

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038`: execution model, task discipline, phase/gate language, and product handshake.
- `PRT-040`: shared governed-content objects, lifecycle rules, idempotency/concurrency expectations, candidate-vs-live boundary, and minimality guardrails.
- `three-layer-product-line-architecture.md` and `feature-area-boundaries.md`: what belongs in platform vs product.
- `persistence-interface-and-store-boundary.md`: storage authority remains product-local.
- `workflow-framework-contract.md`: later lifecycle work must fit the workflow vocabulary, so the shared types should not fight it.
- `delivery-standards.md`, `coding-style.md`: local verification and implementation style.
- `git-flow.md` and ops docs: local-only execution for this task; no remote triggers.

### Code anchors to inspect before coding

- `packages/core/src/runtime/kernel.ts`
  Purpose: existing shared type style and naming conventions for request/run lineage contexts.
- `packages/core/src/runtime/index.ts` and `packages/core/src/index.ts`
  Purpose: understand current subtree export style, but do not edit them in this task.

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` fully.
- [ ] Read `PRT-040` fully.
- [ ] Read `delivery-standards.md` and `coding-style.md`.
- [ ] Read `git-flow.md` and note that this task is local-only.
- [ ] Inspect the code anchors listed above.
- [ ] Confirm that the work remains inside `packages/core/src/governed-content/**`.
- [ ] Stop for clarification if the correct design would require root-export wiring, API contracts, product semantics, or storage decisions.

## Open questions / ambiguity gate

Resolve these before coding. If any remains materially ambiguous, stop and report instead of guessing.

- Which first-wave enums/status unions belong in the vocabulary slice now, and which should wait for the later source-processing/import-lifecycle tasks?
- How much artifact/bundle vocabulary is necessary now to support later tasks without prematurely encoding the whole processing engine?
- What is the leanest file structure inside `packages/core/src/governed-content/**` that keeps the slice readable without over-engineering?

## Task

Implement the first governed-content vocabulary slice in `packages/core/src/governed-content/**`.

Minimum required outcome:
1. Shared object types/interfaces for the canonical `PRT-040` governed-content objects.
2. Status/type vocabularies directly required by the protocol for this first wave.
3. Shared vocabulary needed later for source-processing bundle classification and import lifecycle without implementing the processing/lifecycle logic itself.
4. Narrow typed validation/conflict error or envelope helpers for later governed-content mutation/lifecycle work.
5. Internal structure that later tasks can extend without rewriting this slice.

Design preference:
- keep the slice lean and type-first;
- add helper functions only when they make the shared vocabulary safer or less repetitive;
- preserve the boundary that `SourceRevision` is candidate lineage, while live product truth remains product-local.

## Deliverables

- New or updated files only under `packages/core/src/governed-content/**`
- Written implementation report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-01-report.md`

## Constraints / anti-goals / required rules

### Required rules

- Default to ASCII.
- Keep comments sparse and only where they save real parsing effort.
- Use existing project style and naming patterns.
- Keep product-specific publication/activation semantics out of the shared layer.
- Keep storage authority and migration choices out of this slice.
- Do not introduce service abstractions, deploy units, or future-facing generic content platforms.
- Do not use `console.*` in runtime code.

### Avoid

- `KnowledgeSnapshot` or `BusinessProfileRelease` as shared canonical types;
- service or workflow-host implementation details;
- product review/activation UX concepts;
- edits to root barrels or unrelated runtime files.

## Execution lane / git-flow path / remote-trigger permissions

- Branch/workspace path for this run: `feature/EP-022-prt-038-wave1`
- This repo does not yet have an activated local `develop` branch, so do not branch or compare against `develop` in this task.
- Remote actions are forbidden for this task:
  - no `git push`
  - no PR creation/update
  - no CI/GitHub inspection as a closure step
  - no preview/beta/prod deploy actions
  - no release/package publication actions

## Verification plan

Run the narrowest honest local checks for the touched surface:
- `pnpm --filter @dd-bot-platform/core typecheck`
- `pnpm --filter @dd-bot-platform/core build`

Additionally:
- if a stronger repo-root check is cheap and still honest after your changes, you may also run `pnpm check`
- if you do not run an optional broader check, record explicit `N/A` with reason

Do not invent scenario, hosted, security, or CI checks for this task. If they are not applicable yet, say so explicitly in the report.

## Lessons learned / insights handling

If you discover a reusable non-obvious finding during this task:
- write it to the reserved file `lessons/003-lessons-learned.md` or `lessons/003-insights.md` under this working folder
- keep it concise and reusable, not diary-style
- propose the owning MBB destination (`spec`, `scenario`, `runbook`, `guide`, `ADR`, or `mbb`)

If you discover no such finding, say `none` explicitly in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-01-report.md`

The report must contain:
- summary of what was implemented;
- files changed;
- commands run;
- results of checks;
- explicit `not run` / `N/A` items with reasons;
- whether any remote actions were performed, deferred, or forbidden;
- lessons learned / insights files created, or `none`;
- proposed MBB routing for accepted findings, or `none`;
- blockers or follow-up notes if anything remains outside scope.

## Definition of done

This task is complete only if:
- the new governed-content vocabulary exists entirely inside `packages/core/src/governed-content/**`;
- it covers the canonical shared objects and first-wave vocabulary required by `PRT-040`;
- no product-specific publication truth or service assumptions leaked into the slice;
- local package checks are green or explicitly reported with a real reason;
- the written report is complete and saved to the required path.
