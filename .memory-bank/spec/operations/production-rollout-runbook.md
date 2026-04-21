---
file: .memory-bank/spec/operations/production-rollout-runbook.md
description: Framework production rollout runbook for governed promotion from beta to prod.
purpose: Define one safe production promotion order for framework-owned changes with explicit compatibility, evidence, and stop conditions.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
tags: [spec, operations, rollout, production, framework, release]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated the production rollout packet into bot-platform as framework-only operational truth with product-specific commands and topology removed.
---

# Production Rollout Runbook

## Purpose

Define one canonical `beta -> prod` promotion path for framework-owned changes:
- preflight and compatibility gates first;
- promotion second;
- verification and evidence capture third.

## Preconditions

- required beta acceptance for target change is green;
- target production surfaces are reachable;
- rollback input artifacts are prepared and recoverable;
- compatibility path for schema/contract changes is explicit;
- target lane security/readiness checks are green.

## Canonical phase order

1. establish operator/authenticated release context
2. run rollout preflight for target surfaces and dependencies
3. run security/readiness verification required by the change class
4. resolve and document blockers/warnings
5. confirm compatibility proof for affected write/read paths
6. create or confirm fresh governed backup evidence for risky waves
7. execute production promotion
8. inspect rollout execution record
9. run post-promotion verification
10. write rollout verdict
11. archive rollout evidence bundle

## Promotion contract

Promotion should perform or explicitly validate:
1. safety artifact/backup capture;
2. required migration or compatibility step;
3. activation of intended framework revision;
4. readiness refresh and deploy-truth check;
5. persistence of one inspectable rollout record.

## Stop conditions

Rollout must stop when any condition holds:
- authenticated/operator release context is invalid;
- target deploy surfaces are unreachable;
- compatibility proof is missing for affected paths;
- readiness/security verification fails;
- post-promotion verification fails.

## Evidence to archive

Minimum production rollout evidence:
- rollout identifier;
- target release/reference identifier;
- safety artifact/backup identifier;
- deployment metadata references for affected surfaces;
- compatibility proof summary;
- per-phase status summary;
- final readiness and verification verdict.

## Rollback handoff inputs

- rollout record id and failing phase;
- latest known good revision;
- safety artifact/backup reference;
- explicit failure reason and impact scope;
- compatibility notes needed for safe revert/repair.

## Notes

- ad-hoc command chains must not replace the governed promotion flow;
- repair sub-commands may exist, but default production path remains the canonical phase order above;
- product-specific rollout commands remain product-repo truth and are out of scope for this framework runbook.
