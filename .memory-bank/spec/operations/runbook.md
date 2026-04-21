---
file: .memory-bank/spec/operations/runbook.md
description: Framework operations runbook for deployment verification, controlled drills, and incident investigation.
purpose: Provide a repeatable framework-level procedure for health checks, deploy-truth validation, hosted preflight, and rollback-safe investigation.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
tags: [spec, operations, runbook, framework, incidents, verification]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/production-rollout-runbook.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/plans/adr/ADR-003-deterministic-hosted-scenarios-and-browser-automation.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated the framework operations runbook into bot-platform and generalized all procedures to framework-owned, product-neutral execution.
---

# Operations Runbook

## Purpose

Give a short, reproducible sequence for:
- deploy smoke and deploy-truth checks;
- controlled error drills;
- hosted verification preflight;
- incident triage and rollback-safe decisions.

## Health baseline

For every target lane (`local`, `preview`, `beta`, `prod`):
1. check canonical health endpoint(s);
2. confirm runtime identity headers/fields are present;
3. capture request/correlation identifiers for traceability.

Expected baseline:
- healthy status response;
- stable request correlation fields;
- lane identity consistent with the intended target.

## Controlled error drill

Run a governed controlled-error endpoint or equivalent framework-safe fault probe in the target lane.

Expected:
- explicit failure status;
- machine-readable error envelope;
- request/correlation identifiers available for observability linking.

If incident tooling is configured, correlate returned identifiers with runtime telemetry before closing the drill.

## Deploy-truth quick check order

When uncertain whether target lane runs the intended revision:
1. check live stable lane endpoint(s);
2. inspect deployment metadata for the exact target surface(s);
3. compare commit/ref/timestamp against expected revision;
4. only then evaluate feature behavior.

Do not treat as sufficient:
- CI/release workflow success alone;
- preview URL checks for beta/prod acceptance;
- branch mapping without live readback.

## Schema/contract compatibility gate

Before rollout affecting auth/persistence/envelope contracts:
1. identify compatibility-sensitive paths;
2. choose migration-first or backward-compatible path;
3. verify affected path in the target lane;
4. capture explicit proof in rollout evidence.

If compatibility proof is missing, promotion stops.

## Hosted beta scenario preflight

Before any `beta_api`, `beta_ui`, `beta_external_manual`, or mixed hosted verification:
1. verify target endpoints belong to beta lane;
2. verify compatible deployment pair/group for required surfaces;
3. verify auth/session/bootstrap path for protected flows;
4. verify required external dependency readiness;
5. pin deployment/evidence references in scenario tracking.

If one item fails, hosted acceptance does not start.

## Incident triage minimum path

1. Capture failing endpoint, lane, time window, request/correlation ids.
2. Confirm whether failure is lane drift, deploy mismatch, or runtime regression.
3. Re-run minimal deterministic probe (`beta_api`-style if possible).
4. If regression is confirmed, hand off rollback inputs from rollout evidence.

## Rollback-safe handoff inputs

Minimum rollback/repair handoff artifact set:
- rollout or deployment id;
- target lane and affected surfaces;
- latest known good revision reference;
- failing phase and stop reason;
- compatibility and data-safety notes for affected paths.
