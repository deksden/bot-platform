---
file: .memory-bank/plans/verification-matrix.md
description: 'Framework verification matrix for bot-platform.'
purpose: Track the relationship between framework feature groups, repo-local contract anchors, extracted packages, and framework verification coverage.
version: 0.3.0
date: 2026-04-22
status: ACTIVE
tags: [verification, matrix, scenarios, bot-platform]
parent: .memory-bank/plans/index.md
history:
  - version: 0.3.0
    date: 2026-04-22
    changes: Synced the matrix with the first real `@dd-bot-platform/core` extraction slice and promoted the matrix from bootstrap draft to active framework verification truth.
  - version: 0.2.0
    date: 2026-04-22
    changes: Actualized the verification matrix to align with the framework feature registry, the scenario matrix, and the currently extracted packages (`api-contract`, `scenario-system`), replacing bootstrap placeholders with repo-local anchors.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework verification matrix created during Memory Bank bootstrap.
---

# Verification Matrix

This matrix is framework-only and split-aware.
It intentionally avoids encoding product acceptance or product journeys.

Canonical planning sources:
- [Framework feature registry](epics/framework-feature-registry.md)
- [Scenario matrix](../scenarios/scenario-matrix.md)

## Framework verification inventory (current anchors)

| feature_group (registry key) | primary docs (current repo-local anchors) | extracted packages (current reality) | scenario anchor (current) | current_state |
| --- | --- | --- | --- | --- |
| `client-contracts` | `spec/client-api/index.md`, `spec/client-api/api-namespace-registry.md`, `spec/client-api/typed-client-api-and-sdk.md` | `packages/api-contract` (`@dd-bot-platform/api-contract@0.2.0`) | `scenarios/contracts/index.md` + [Scenario matrix](../scenarios/scenario-matrix.md) | contract docs landed; scenario docs are planning anchors only |
| `scenario-system` | `spec/scenarios/index.md`, `spec/scenarios/scenario-system-and-evidence.md`, `spec/scenarios/hosted-beta-execution-model.md`, `spec/runtime/scenario-system-framework-contract.md` | `packages/scenario-system` (`@dd-bot-platform/scenario-system@0.2.0`) | `scenarios/hosted/index.md` + [Scenario matrix](../scenarios/scenario-matrix.md) | core contracts landed; hosted layering is specified; repo-local scenario catalog is still thin |
| `runtime-kernel` | `spec/runtime/index.md`, `spec/runtime/agent-execution-kernel.md`, `spec/runtime/pipeline-registry-and-binding-contract.md`, `spec/runtime/decision-explanation-envelope.md`, `spec/runtime/execution-traces-and-token-accounting.md`, `spec/runtime/trace-artifact-governance.md` | `packages/core` (`@dd-bot-platform/core`, repo-local first slice) plus earlier `api-contract`/`scenario-system` bridge packages | `scenarios/contracts/index.md` + [Scenario matrix](../scenarios/scenario-matrix.md) | contract docs landed; first code slice exists; broader runtime/result adapter extraction is still pending |
| `auth-framework` | `spec/security/index.md`, `spec/security/auth-core.md`, `spec/security/auth-and-access.md` | none extracted | `scenarios/contracts/index.md` + [Scenario matrix](../scenarios/scenario-matrix.md) | baseline contracts landed; product DB/membership overlays remain product-owned |
| `persistence-interfaces` | `spec/runtime/persistence-interface-and-store-boundary.md` | none extracted | [Scenario matrix](../scenarios/scenario-matrix.md) | contract boundary landed; runnable scenarios are still gated by split/extraction work |
| `workflow-framework` | `spec/runtime/index.md`, `spec/architecture/containers/workflow-host.md` | none extracted | `scenarios/hosted/index.md` + [Scenario matrix](../scenarios/scenario-matrix.md) | contract vocabulary is referenced, but a dedicated workflow contract spec is not yet landed |
| `command-framework` | `spec/runtime/index.md` | none extracted | [Scenario matrix](../scenarios/scenario-matrix.md) | framework scope is defined; concrete contract specs and split scenarios are still gated |
| `support-packages` | `spec/project/repo-structure.md`, `spec/project/feature-area-boundaries.md` | only proven slices: `api-contract`, `scenario-system` | [Scenario matrix](../scenarios/scenario-matrix.md) | keep provisional until multi-consumer proof exists |

## Reading rule

This matrix is capability-first and deliberately shallow while the repo split is active.
It should later evolve into:
- `feature_group -> contract docs -> scenario ids -> evidence location -> execution history`.
