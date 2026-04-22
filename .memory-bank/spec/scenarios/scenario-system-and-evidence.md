---
file: .memory-bank/spec/scenarios/scenario-system-and-evidence.md
description: Canonical framework scenario-system and evidence contract for bot-platform.
purpose: Define framework-owned scenario taxonomy, run/evidence model, tier semantics, and hosted-verification layering without product-specific scenario truth.
version: 0.1.0
date: 2026-04-21
status: ACTIVE
tags: [spec, scenarios, evidence, verification, framework, bot-platform]
parent: .memory-bank/spec/scenarios/index.md
related_files:
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/scenarios/index.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
target_audience: [developers, ai-agents]
automation_ready: true
history:
  - version: 0.1.0
    date: 2026-04-21
    changes: Migrated the bounded scenario-system/evidence packet into bot-platform as framework-owned canonical truth under PRT-036 Wave 121.
---

# Scenario System And Evidence

## Goal

Define a framework-owned scenario verification model so that:
- `SCN-*` and `XE-*` remain first-class executable contracts;
- scenario runs are reproducible and inspectable;
- evidence contracts stay stable across products;
- tiered and hosted verification scale without mixing in product-owned truth.

## Grounding

### Canonical docs

- [Scenario system framework contract](../runtime/scenario-system-framework-contract.md) for framework-owned scope and product-owned exclusions.
- [Verification matrix](../../plans/verification-matrix.md) for capability-to-scenario traceability at framework level.
- [Scenarios hub](../../scenarios/index.md) for framework scenario navigation and ownership routing.

### Ownership boundary

This document defines shared framework scenario/evidence semantics.
It does not make `bot-platform` the owner of SellerAgent or Docoved scenario suites, fixture data, or hosted bootstrap flows.

## Target design

### 1. Taxonomy

- `SCN-*` for capability scenarios.
- `XE-*` for cross-feature and cross-epic journeys.

Each scenario contract must define:
- stable identifier and purpose;
- owning capability or contract family;
- allowed environments;
- fixture profile expectations;
- acceptance assertions;
- expected evidence/artifact classes.

### 2. Run model

A scenario run contract must capture:
- `runId`;
- `scenarioId`;
- environment;
- fixture profile/seed snapshot;
- execution phase/status;
- evidence/artifact manifest linkage.

Minimum framework artifact outputs:
- per-run JSON artifact;
- a stable `latest` pointer per scenario;
- manifest indexing for cross-run lookup;
- tier-level result artifact for grouped execution.

### 3. Seeds and fixtures

Scenario execution starts from named fixture profiles, never undocumented local state.

Framework requirements:
- scenario definitions reference stable fixture profile IDs;
- fixture profiles declare environment intent and prerequisites;
- run artifacts preserve the resolved fixture profile snapshot.

Product-specific fixture data remains product-local.

### 4. Evidence model

Framework evidence may include:
- logs and step events;
- structured scenario outputs;
- trace/artifact references;
- screenshots where relevant;
- manifest records for tooling and audit.

Evidence contracts must stay append-only compatible: products may extend payloads but must preserve framework base fields.

### 5. Verification tiers

Shared tier vocabulary:
- `dev_smoke`;
- `pre_merge`;
- `nightly`;
- `beta_on_demand`.

Framework ownership:
- tier meaning and contract semantics.

Product ownership:
- concrete scenario membership in each tier, except for framework-owned scenarios.

### 6. Hosted verification layering

Hosted verification is layered:
- `beta_api` as primary hosted capability proof;
- `beta_ui` as thin governed browser-surface validation;
- `beta_external_manual` only for truly external-channel dependencies.

Rule:
- hosted browser/manual checks augment API/read-model evidence; they do not replace core scenario/evidence contracts.

## Non-goals

- Replacing unit/integration/contract testing with scenarios.
- Building one giant pipeline that runs every scenario in every environment.
- Treating product-specific hosted flows as framework-owned by default.

## Risks and mitigations

- Risk: scenario docs drift into descriptive-only narrative.
  Mitigation: keep run model, fixture model, and evidence model co-versioned.
- Risk: tier growth creates flaky pre-merge signal.
  Mitigation: explicit tier admission and quarantine/escalation policy.
- Risk: framework docs absorb product truth.
  Mitigation: enforce scope from the runtime scenario-system framework contract.

## Migration and maintenance

1. Extend framework taxonomy only for product-agnostic scenario/evidence semantics.
2. Keep verification-matrix mappings aligned with scenario contract changes.
3. Promote hosted verification from `beta_api` first, widening to `beta_ui` only after deterministic bootstrap exists.
4. Require artifact/schema compatibility when changing evidence fields.

## Regression gates

- Unit: catalog/schema and fixture-profile contract validation.
- Integration: tier execution and artifact manifest generation.
- Acceptance: tier semantics and hosted-layer classification remain policy-compliant.

## Rollback / abort criteria

- Scenario contracts requiring undocumented manual setup by default.
- Evidence too weak to explain failures or reproduce run state.
- Hosted-tier expansion that materially degrades deterministic pre-merge signal.
