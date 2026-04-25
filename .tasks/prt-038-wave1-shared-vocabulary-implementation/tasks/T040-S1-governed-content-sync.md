---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-S1-governed-content-sync.md
description: 'Serialized sync task for the shared governed-content/import substrate after runnable verifier proof has landed.'
purpose: 'Read before editing so governed-content status/protocol/scenario surfaces are updated honestly after T040 implementation and verifier work, without colliding with the control-plane sync task or overclaiming downstream adoption.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: documentation-sync
protocol: PRT-038 / PRT-040
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-S1-report.md
verification_class: protocol sync wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/plans/current-status-report.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/scenarios/scenario-matrix.md
  - .memory-bank/scenarios/index.md
  - .memory-bank/scenarios/contracts/index.md
  - .memory-bank/scenarios/by-epic/index.md
  - .memory-bank/scenarios/SCN-177-shared-governed-content-import-readback-contract.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/wave1-verifier-acceptance.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-V1-report.md
write_scope:
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/plans/current-status-report.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/scenarios/scenario-matrix.md
  - .memory-bank/scenarios/index.md
  - .memory-bank/scenarios/contracts/index.md
  - .memory-bank/scenarios/by-epic/index.md
no_touch:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/spec/**
  - packages/**
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T039-S1-control-plane-sync.md
---

# Task T040-S1: Governed-Content Sync

## Purpose

Synchronize the shared governed-content/import protocol/status/scenario surfaces after the runnable verifier tranche has landed.

This is a serialized documentation task.
It must:
- make the Memory Bank honest about what is now landed;
- record the new runnable anchor `SCN-177`;
- avoid claiming downstream Docoved/Seller adoption or hosted proof that does not yet exist.

## Scope / non-goals

### In scope

- update `PRT-040` to reflect landed implementation/verifier evidence;
- update `verification-matrix.md` for the shared governed-content/import substrate row;
- update `scenario-matrix.md` so the governed-content/import substrate exists as a first-class framework scenario family;
- update scenario hubs/indexes so `SCN-177` is discoverable by MBB navigation;
- update `current-status-report.md` only for governed-content-related sync truth that now changed.

### Non-goals

- do not edit code or verifier specs;
- do not edit `PRT-038` yet; that umbrella closeout is handled after both sync tasks are accepted;
- do not sync control-plane surfaces here;
- do not claim `adopted` or product-local proof.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `current-status-report.md`
- `verification-matrix.md`
- `scenario-matrix.md`
- `scenarios/index.md`
- `scenarios/contracts/index.md`
- `scenarios/by-epic/index.md`

### No-touch boundaries

Do not edit:
- `PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `.memory-bank/spec/**`
- `packages/**`
- the control-plane sync task file

## Context (SSoT links and exact inspection anchors)

Read fully before editing:
- this task file
- `PRT-038`
- `PRT-040`
- `verification-matrix.md`
- `scenario-matrix.md`
- scenario hubs under `scenarios/`
- `SCN-177`
- verifier acceptance/report docs:
  - `wave1-verifier-acceptance.md`
  - `T040-V1-report.md`

## Sync goals

The synchronized result should make these truths explicit:
1. shared governed-content/import implementation slices and runnable local verifier proof are landed in `bot-platform`;
2. `SCN-177` is now a real flat framework scenario anchor, not a planned gap;
3. stronger-than-design wording must still stay honest about remaining downstream proof gaps;
4. Docoved/Seller product adoption is now unblocked by the shared gate, but not yet claimed.

## Design guidance

- prefer short truthful status language over big rewrites;
- update history/version blocks when the document style already uses them;
- if closure state is still `partial`, say why precisely;
- if `implementation_proven` would violate the protocol’s own stronger-than-partial rules, do not force it.

## Deliverables

- synced docs only inside the declared write scope
- report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-S1-report.md`

## Verification plan

Run:
- `pnpm check`

Record explicit `N/A` for code/package/hosted/CI checks that do not apply to this doc-sync task.

## Lessons learned / insights handling

If you discover a reusable non-obvious finding:
- write it to `lessons/014-lessons-learned.md` or `lessons/014-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Definition of done

This task is complete only if:
- the governed-content/import protocol and matrix surfaces are synchronized to the landed verifier truth;
- `SCN-177` is discoverable from the scenario navigation surfaces;
- no downstream adoption is overclaimed;
- the report is complete and saved to the required path.
