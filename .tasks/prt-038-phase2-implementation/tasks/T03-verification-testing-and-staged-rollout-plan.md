---
file: .tasks/prt-038-phase2-implementation/tasks/T03-verification-testing-and-staged-rollout-plan.md
description: 'Research task for defining verification, testing, scenario, and staged rollout expectations for implementing PRT-038/039/040.'
purpose: 'Read before implementation planning so local tests, scenario work, verifier tasks, and hosted-stage checks are planned explicitly instead of being appended after coding.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [task, verification, testing, rollout, scenarios, staging, prt-038]
parent: .tasks/prt-038-phase2-implementation/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/mbb/scenario-docs-guide.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/spec/operations/production-rollout-runbook.md
  - .memory-bank/spec/security/auth-and-access.md
---

# Task T03: Verification, Testing, And Staged Rollout Plan

## Purpose

Define how implementation under `PRT-038/039/040` should be verified:
- what is checked locally;
- what is checked in CI;
- what requires scenario work;
- what requires hosted/beta/staged verification;
- how verifier subagents should validate implementation tasks.

## Scope / non-goals

### In scope
- current verification/testing expectations for shared-substrate implementation;
- local vs CI vs hosted/beta contours;
- task-level and wave-level verification expectations;
- verifier-subagent inputs and outputs;
- staged rollout and safety checkpoints for risky changes.

### Non-goals
- do not create runnable scenario docs in this task;
- do not run the tests now;
- do not define product-specific rollout runbooks beyond what the platform packet must require.

## Affected areas

- local development checks
- CI gates
- scenario maturity expectations
- hosted beta/staging proof
- security / rollout-sensitive changes
- verifier subagent workflow

## Context (SSoT links)

- `PRT-038` — phase taxonomy and umbrella closure language.
- `PRT-039` — control-plane verification and security-sensitive mutation rules.
- `PRT-040` — import/governed-content verification and rollback rules.
- `verification-matrix.md` — current verification inventory and new shared-substrate rows.
- `delivery-standards.md` — minimum quality/hosted/security closure expectations.
- `scenario-docs-guide.md` — planned vs runnable scenario maturity rules.
- `hosted-beta-acceptance-contract.md` — hosted preflight and evidence model.
- `production-rollout-runbook.md` — rollout/rollback expectations.
- `auth-and-access.md` — security-sensitive auth/access boundary and exposure rules.

## Project grounding (mandatory before reporting)

- [ ] Verification matrix read and current gaps identified.
- [ ] Delivery standards and hosted acceptance docs read.
- [ ] Security-sensitive mutation rules reviewed.
- [ ] Shared-substrate rows in the verification matrix understood as `design_hardened`, not implementation-closed.
- [ ] Verifier-agent role and evidence needs considered explicitly.

## Required research

Investigate and explain:
- what minimum local checks every implementation task should run;
- what CI expectations must be captured in task docs and closeout;
- what scenario work is needed now vs later;
- what changes need hosted/staged verification and in which environments;
- how a verifier subagent should validate a completed implementation task.

## Task

Produce a verification and rollout recommendation that answers:
1. What should every implementation task verify locally?
2. What should every implementation task leave for verifier-subagent review?
3. Which task families require scenario anchors or hosted proof before stronger closure states?
4. Which changes are security/release-sensitive and need staged rollout notes?
5. What should be checked on deploys, and in which stage or environment?

## Required output

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-phase2-implementation/reports/T03-report.md`

The report must contain:
- local verification baseline;
- CI / workflow expectations;
- scenario maturity recommendations;
- hosted / beta / staged verification map;
- security / rollout-sensitive change map;
- verifier-subagent checklist and report contract;
- explicit do / avoid guidance.

## Important constraints

- Do not pretend planned anchors are closure-ready scenarios.
- Do not assume every task requires hosted proof; be specific.
- Do not collapse local unit/integration verification into scenario language.
- Do not collapse product-repo adoption proof into platform-only local proof.
- Keep the plan lean and specific to current project infrastructure.

## Risks to watch

- implementation tasks closing with only local proof;
- hosted proof being required too late;
- security-sensitive changes not getting explicit exposure/rollback notes;
- verifier subagents lacking enough task/report context to validate work;
- overloading every task with the same heavy verification contour regardless of risk.

## Definition of done

This task is complete only if the report provides:
- a usable verification baseline for implementation tasks;
- a usable verifier-subagent checklist;
- a clear distinction between local, CI, scenario, and hosted proof;
- a staged rollout view for risky changes;
- concrete guidance suitable for inclusion in the implementation protocol.
