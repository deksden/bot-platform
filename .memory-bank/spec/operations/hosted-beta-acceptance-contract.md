---
file: .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
description: Framework hosted beta acceptance contract for deployed verification.
purpose: Define mandatory preflight, layer model, and evidence rules so hosted beta acceptance is deterministic and lane-correct.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
tags: [spec, operations, beta, acceptance, hosted, verification]
parent: .memory-bank/spec/operations/index.md
related_files:
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/plans/adr/ADR-003-deterministic-hosted-scenarios-and-browser-automation.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated the hosted-beta acceptance packet into bot-platform as framework-owned acceptance truth and removed product-specific hosted references.
---

# Hosted Beta Acceptance Contract

## Purpose

Fix one framework-wide hosted beta contract so acceptance depends on verified environment reality, not accidental deploy state.

## Hosted acceptance applies when

This contract is mandatory when verification touches:
- hosted operator/admin UI;
- protected auth/session surfaces;
- webhook/provider/external integration behavior;
- split-surface hosted interactions;
- live runtime behavior where preview and beta drift is possible.

## Hosted execution layers

Hosted acceptance is decomposed into:
- `beta_api`
- `beta_ui`
- `beta_external_manual`

Layer intent:
- `beta_api` is the deterministic default for canonical business/runtime truth;
- `beta_ui` is a thin browser proof layer over a preflighted hosted baseline;
- `beta_external_manual` is exception-only for truly external nondeterministic dependencies.

## Mandatory hosted beta preflight

Before scenario execution, all checks must pass:

1. `Target surfaces`
- verification points to intended beta lane endpoints/aliases.

2. `Deployment pair/group integrity`
- all required hosted surfaces point to compatible deployed revisions.

3. `Environment identity`
- runtime identity confirms beta lane (not preview/prod drift).

4. `Auth/session bootstrap`
- protected flows have a tested bootstrap path.

5. `External readiness`
- required tokens, bindings, and dependency links are available for beta lane.

If any preflight item fails, hosted acceptance is not started.

## Preview is not beta

Rule:
- preview cannot be counted as beta acceptance by default.

Allowed exception:
- only when explicitly documented in scenario/feature evidence with clear missing-beta constraints and environment identity proof.

Without this, closure cannot be marked as `accepted_beta`.

## Evidence contract

Minimum hosted evidence:
- target deployment/alias reference;
- environment identity proof;
- scenario outcome and verification verdict;
- traceable identifiers (request/run/deployment refs).

Preferred dual evidence for user-facing/operator-facing scenarios:
- UI/browser proof;
- protected API/read-model proof.

Determinism rule:
- business truth should remain reproducible through deterministic hosted APIs/read-models;
- browser proof stays narrow and confirmatory.

## Closure rule

Feature/packet can be marked `accepted_beta` only when:
- local acceptance is green;
- hosted preflight is green;
- hosted scenario verdict is green;
- evidence is archived in scenario/feature linkage.

## Non-goals

- this contract does not replace scenario-level playbooks;
- this contract does not define product-specific hosted bootstrap or operator procedures.
