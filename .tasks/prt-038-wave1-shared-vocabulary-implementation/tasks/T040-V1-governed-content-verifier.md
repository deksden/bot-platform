---
file: .tasks/prt-038-wave1-shared-vocabulary-implementation/tasks/T040-V1-governed-content-verifier.md
description: 'Verification task for the shared governed-content/import substrate: add runnable local proof and the first flat framework scenario anchor.'
purpose: 'Read before coding so the governed-content verifier adds real runnable evidence on top of the accepted shared contracts without inventing a new test framework or drifting into product review/activation truth.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
parent: .tasks/prt-038-wave1-shared-vocabulary-implementation/index.md
task_type: verification
protocol: PRT-038 / PRT-040
report_file: .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-V1-report.md
verification_class: framework verifier wave
git_flow_path: 'Temporary wave path: feature/EP-022-prt-038-wave1 (repo-local develop branch is not yet activated).'
remote_triggers: 'Forbidden for this task: no push, no PR updates, no hosted deploys, no release actions.'
lessons_dir: .tasks/prt-038-wave1-shared-vocabulary-implementation/lessons/
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/scenarios/scenario-matrix.md
  - .memory-bank/spec/scenarios/scenario-system-and-evidence.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/spec/runtime/workflow-framework-contract.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/operations/git-flow.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-04-report.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-05-report.md
  - packages/core/src/governed-content/source-processing/classification.ts
  - packages/core/src/governed-content/import-lifecycle/status-transitions.ts
  - packages/core/src/governed-content/import-lifecycle/conflict-guards.ts
  - packages/core/src/governed-content/import-lifecycle/idempotency-keys.ts
  - packages/core/src/governed-content/index.ts
  - packages/api-contract/src/governed-content/read-models.ts
  - packages/api-contract/src/index.ts
write_scope:
  - packages/core/src/governed-content/**/*.spec.ts
  - packages/api-contract/src/governed-content/**/*.spec.ts
  - .memory-bank/scenarios/SCN-177-shared-governed-content-import-readback-contract.md
no_touch:
  - packages/core/src/governed-content/**/*.ts
  - packages/api-contract/src/governed-content/**/*.ts
  - packages/core/src/index.ts
  - packages/api-contract/src/index.ts
  - packages/scenario-system/package.json
  - package.json
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/scenarios/scenario-matrix.md
  - .memory-bank/plans/current-status-report.md
---

# Task T040-V1: Governed-Content Verifier

## Purpose

Add the first runnable local proof for the shared governed-content/import substrate and record the corresponding flat framework scenario anchor.

The verifier must stay lean:
- prefer Node built-in `node:test` on compiled `dist` artifacts;
- do not invent or install a new test framework;
- do not turn verifier work into product review, activation, storage, or hosted-beta adoption work.

## Scope / non-goals

### In scope

- add focused local verifier specs for the accepted governed-content/import shared substrate;
- prove source-processing bundle honesty, import lifecycle transitions, idempotency/stable-key helpers, and conflict guards;
- prove governed-content API-contract read models parse representative shared payloads and reject at least one bounded invalid case;
- add one flat framework scenario doc that points at the runnable local proof.

### Non-goals

- do not edit accepted production code or package entrypoints in this task;
- do not add a new testing library, package script, or repo-wide harness;
- do not claim hosted proof, product adoption, or final protocol closure here;
- do not update `verification-matrix.md`, `scenario-matrix.md`, or status docs yet; that belongs to later sync tasks.

## Write scope / no-touch boundaries

### Write scope

You may edit only:
- `packages/core/src/governed-content/**/*.spec.ts`
- `packages/api-contract/src/governed-content/**/*.spec.ts`
- `.memory-bank/scenarios/SCN-177-shared-governed-content-import-readback-contract.md`

### No-touch boundaries

Do not edit:
- `packages/core/src/governed-content/**/*.ts`
- `packages/api-contract/src/governed-content/**/*.ts`
- `packages/core/src/index.ts`
- `packages/api-contract/src/index.ts`
- `packages/scenario-system/package.json`
- `package.json`
- `.memory-bank/plans/verification-matrix.md`
- `.memory-bank/scenarios/scenario-matrix.md`
- `.memory-bank/plans/current-status-report.md`

If you believe a reusable verifier helper is absolutely required outside this scope, stop and report instead of widening scope silently.

## Context (SSoT links and exact inspection anchors)

### Normative sources

- `PRT-038` for verifier workflow and closure-language rules.
- `PRT-040` for the contract/invariant surface that must be proven.
- `verification-matrix.md` and `scenario-matrix.md` for what is still missing today.
- `scenario-system-and-evidence.md` and `scenario-system-framework-contract.md` for flat scenario-doc expectations.
- `workflow-framework-contract.md` for the lifecycle boundary around import orchestration.

### Code anchors to inspect before coding

- `packages/core/src/governed-content/source-processing/classification.ts`
- `packages/core/src/governed-content/import-lifecycle/status-transitions.ts`
- `packages/core/src/governed-content/import-lifecycle/conflict-guards.ts`
- `packages/core/src/governed-content/import-lifecycle/idempotency-keys.ts`
- `packages/core/src/governed-content/index.ts`
- `packages/api-contract/src/governed-content/read-models.ts`
- `packages/api-contract/src/index.ts`

## Project grounding (mandatory before coding)

- [ ] Read this task fully.
- [ ] Read `PRT-038` and `PRT-040`.
- [ ] Read the scenario/evidence docs plus `verification-matrix.md`.
- [ ] Read `delivery-standards.md`, `coding-style.md`, and `git-flow.md`.
- [ ] Inspect the accepted `T040-02`, `T040-03`, `T040-04`, and `T040-05` results.
- [ ] Confirm that all intended edits stay inside the declared verifier/spec/doc files.

## Open questions / ambiguity gate

Stop and report instead of guessing if:
- the verifier appears to require changing accepted production code;
- proof seems to require a brand-new test runner or package-level tooling change;
- the scenario doc would need to claim hosted or product-owned acceptance.

## Task

Implement the first shared governed-content/import verifier slice.

Minimum required outcome:
1. Add lean runnable `node:test` specs that compile with the existing package build and can be executed against `dist` outputs.
2. Cover at least these shared assertions:
   - source-processing honesty succeeds for a consistent supported/degraded bundle and fails for a dishonest unsupported payload;
   - import lifecycle transitions allow the documented path and reject one invalid path;
   - idempotency/stable-key helpers build deterministic keys and reject incomplete input;
   - conflict guards distinguish stale state, duplicate import/source revision, and activation conflict cases;
   - governed-content API-contract read models accept representative shared payloads and reject at least one bounded invalid shape.
3. Add one flat framework scenario doc:
   - `SCN-177-shared-governed-content-import-readback-contract.md`
   - execution status should stay local/runnable and framework-only.

Design preference:
- keep proofs small, deterministic, and self-contained;
- favor direct imports and explicit assertions over helper abstraction;
- treat `node:test` plus the existing build pipeline as the default lean verifier path.

## Deliverables

- New verifier spec files only inside the declared write scope
- Scenario doc at:
  `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/scenarios/SCN-177-shared-governed-content-import-readback-contract.md`
- Written report at:
  `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-V1-report.md`

## Constraints / anti-goals / required rules

- Default to ASCII.
- No `console.*`.
- No new dependencies or test framework.
- No package script changes.
- No product review/approval/activation UX or product serving truth.

## Execution lane / git-flow path / remote-trigger permissions

- Branch/workspace path for this run: `feature/EP-022-prt-038-wave1`
- This task is local-only.
- Forbidden: push, PR, CI/deploy/release actions.

## Verification plan

Run:
- `pnpm --filter @dd-bot-platform/core build`
- `pnpm --filter @dd-bot-platform/api-contract build`
- `node --test packages/core/dist/governed-content/**/*.spec.js packages/api-contract/dist/governed-content/**/*.spec.js`
- `pnpm check`

Record explicit `N/A` for hosted/product/CI checks.

## Lessons learned / insights handling

If you discover a reusable non-obvious finding:
- write it to `lessons/012-lessons-learned.md` or `lessons/012-insights.md`
- propose the owning MBB destination

Otherwise say `none` in the report.

## Report requirements

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-V1-report.md`

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
- runnable local verifier proof exists for the shared governed-content/import substrate without new tooling layers;
- the scenario doc is framework-only and points at the real local proof;
- local checks are green or honestly reported;
- the report is complete and saved to the required path.
