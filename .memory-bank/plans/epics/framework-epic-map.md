---
file: .memory-bank/plans/epics/framework-epic-map.md
description: 'Framework epic map for bot-platform.'
purpose: Define the canonical framework epic families, their ownership boundaries, and how they trace into the framework feature/scenario layer after the split.
version: 0.2.0
date: 2026-04-22
status: ACTIVE
tags: [epics, bot-platform, framework, planning]
parent: .memory-bank/plans/epics/index.md
history:
  - version: 0.2.0
    date: 2026-04-22
    changes: Removed residual mixed-repo ambiguity from the epic ownership notes, clarified the Docoved epic boundary, and added explicit traceability pointers to the feature/scenario registries.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework epic map created from the mixed source epic catalog and PRT-036 ownership rules.
---

# Framework Epic Map

## Ownership rule

An epic belongs to `bot-platform` when its primary output is a reusable framework capability, shared contract, or shared verification system.

An epic does not belong here when its primary output is SellerAgent or Docoved product behavior.

Traceability:
- feature-level ownership lives in [Framework feature registry](framework-feature-registry.md);
- scenario-level ownership lives in [Scenario matrix](../../scenarios/scenario-matrix.md).
- verification-level anchors live in [Verification matrix](../verification-matrix.md).

## Primary framework epic families

### `EP-001 Platform Foundation`

Keep here as framework truth:
- Memory Bank bootstrap and documentation standards
- monorepo/package boundary rules
- typed contract and SDK baseline
- CLI-first reference and scenario baseline

### `EP-008 Scenarios And Verification`

Keep here as framework truth:
- shared scenario taxonomy
- evidence model
- verification tiers
- scenario runner baseline

### `EP-009 UI Contracts And Automation`

Keep here only for reusable UI contract and automation layers.
Any product-specific screen truth stays in product repos.

### `EP-010 Operator Auth And Access`

Split:
- framework auth model, sessions, roles vocabulary, and scenario bootstrap stay here;
- product authority overlays move to product repos.

### `EP-011 Deterministic Hosted Scenarios And Browser Automation`

Keep here as shared hosted-verification model and browser automation methodology.

### `EP-014 Expectation-Driven Semantic Scenario Evaluation`

Keep here where it defines shared evaluation machinery, judge contracts, and reusable evaluation semantics.

### `EP-017 Database Lifecycle, Backup Reliability, And Production Rollout Governance`

Split:
- shared migration/backup/verification framework rules stay here;
- concrete product rollout truth moves to product repos.

### `EP-020 Durable Workflow Replay Host, Protected Transcript Operations, And Burst-Aware Replay`

Split:
- workflow framework, host contracts, replay host mechanics, protected operation patterns stay here;
- product workflow families stay product-local.

### `EP-022 Agent Execution Platform And Multi-Plane Architecture`

Keep here as the main framework architecture epic.

### `EP-023`

`EP-023` is Docoved product truth and belongs to `docoved-agent` per `PRT-036`.
Only product-agnostic contracts that are proven multi-consumer and extracted behind an explicit seam may later re-enter `bot-platform` as separate framework features (not as a direct re-home of Docoved acceptance).

## Explicit non-framework epic families

These belong to `selleragent` as product truth:
- `EP-002`
- `EP-003`
- `EP-004`
- `EP-005`
- `EP-006`
- `EP-007`
- `EP-012`
- `EP-013`
- `EP-015`
- `EP-016`
- `EP-018`
- `EP-019`
- `EP-021`

This belongs to `docoved-agent` as product truth:
- `EP-023`

## Next refinement

This epic map should later grow into:
- `epic -> feature registry -> contract docs -> scenario families`.

Current repo state already supports that chain at the planning level:
- epic ownership is defined here;
- feature groups are canonicalized in the feature registry;
- scenario and verification anchors now live in repo-local matrices.
