---
file: .memory-bank/plans/verification-matrix.md
description: 'Framework verification matrix for bot-platform.'
purpose: Track the relationship between framework feature groups, repo-local contract anchors, extracted packages, and framework verification coverage.
version: 0.6.0
date: 2026-04-22
status: ACTIVE
tags: [verification, matrix, scenarios, bot-platform]
parent: .memory-bank/plans/index.md
history:
  - version: 0.6.0
    date: 2026-04-22
    changes: Synced the runtime-kernel verification row after Wave 159 so `@dd-bot-platform/core` now explicitly includes the provider-result helper slice and the next consumer proof is framed around the narrow research-workflow adoption path rather than a broad runtime rewrite.
  - version: 0.5.0
    date: 2026-04-22
    changes: Added repo-local scenario anchors for auth-bootstrap, workflow durability, provider registration/readiness, cross-provider fail-fast governance, and verdict export provenance; linked the new workflow/command runtime contracts into the framework verification inventory.
  - version: 0.3.0
    date: 2026-04-22
    changes: Synced the matrix with the first real `@dd-bot-platform/core` extraction slice and promoted the matrix from bootstrap draft to active framework verification truth.
  - version: 0.4.0
    date: 2026-04-22
    changes: Added the first flat framework scenario docs (`SCN-001`, `SCN-116`, `SCN-175`) as direct verification anchors and updated runtime-kernel current-state wording to reflect the new execution-result helper slice in `@dd-bot-platform/core`.
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
| `client-contracts` | [SCN-001](../scenarios/SCN-001-typed-sdk-parity.md)<br>`spec/client-api/index.md`, `spec/client-api/api-namespace-registry.md`, `spec/client-api/typed-client-api-and-sdk.md` | `packages/api-contract` (`@dd-bot-platform/api-contract@0.2.0`) | `scenarios/contracts/index.md` + [Scenario matrix](../scenarios/scenario-matrix.md) | contract docs landed; first flat framework scenario doc is now landed |
| `scenario-system` | `spec/scenarios/index.md`, `spec/scenarios/scenario-system-and-evidence.md`, `spec/scenarios/hosted-beta-execution-model.md`, `spec/runtime/scenario-system-framework-contract.md` | `packages/scenario-system` (`@dd-bot-platform/scenario-system@0.2.0`) | `scenarios/hosted/index.md` + [Scenario matrix](../scenarios/scenario-matrix.md) | core contracts landed; hosted layering is specified; repo-local hosted/auth workflow anchors now exist, while deeper scenario-system coverage remains later-wave |
| `runtime-kernel` | [SCN-168](../scenarios/SCN-168-openai-runtime-provider-registration-and-readiness-projection.md)<br>[SCN-170](../scenarios/SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md)<br>[SCN-175](../scenarios/SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md)<br>`spec/runtime/index.md`, `spec/runtime/agent-execution-kernel.md`, `spec/runtime/pipeline-registry-and-binding-contract.md`, `spec/runtime/decision-explanation-envelope.md`, `spec/runtime/execution-traces-and-token-accounting.md`, `spec/runtime/trace-artifact-governance.md` | `packages/core` (`@dd-bot-platform/core`, repo-local execution-kernel plus execution-result plus provider-result helper slices) plus earlier `api-contract`/`scenario-system` bridge packages | [SCN-168](../scenarios/SCN-168-openai-runtime-provider-registration-and-readiness-projection.md) + [SCN-170](../scenarios/SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md) + [SCN-175](../scenarios/SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md) | contract docs landed; provider-registration/readiness and cross-provider fail-fast anchors are now repo-local; provider-result normalization/error-metadata helpers are now framework-owned in `packages/core`, and the next consumer proof should stay narrow around research-workflow rather than broaden into the full runtime |
| `auth-framework` | [SCN-012](../scenarios/SCN-012-scenario-auth-bootstrap.md)<br>`spec/security/index.md`, `spec/security/auth-core.md`, `spec/security/auth-and-access.md` | none extracted | [SCN-012](../scenarios/SCN-012-scenario-auth-bootstrap.md) + `scenarios/contracts/index.md` | baseline contracts landed; flat auth-bootstrap scenario is now repo-local; product DB/membership overlays remain product-owned |
| `persistence-interfaces` | `spec/runtime/persistence-interface-and-store-boundary.md` | none extracted | [Scenario matrix](../scenarios/scenario-matrix.md) | contract boundary landed; runnable scenarios are still gated by split/extraction work |
| `workflow-framework` | [SCN-116](../scenarios/SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md)<br>[SCN-118](../scenarios/SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md)<br>`spec/runtime/workflow-framework-contract.md`, `spec/runtime/index.md`, `spec/architecture/containers/workflow-host.md` | none extracted | [SCN-116](../scenarios/SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md) + [SCN-118](../scenarios/SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md) + `scenarios/hosted/index.md` | workflow topology/status and hosted durability anchors are now repo-local, and the dedicated workflow contract spec is landed |
| `command-framework` | `spec/runtime/command-framework-contract.md`, `spec/runtime/index.md` | none extracted | [Scenario matrix](../scenarios/scenario-matrix.md) + `scenarios/contracts/index.md` | framework contract spec is now landed; concrete split command scenarios remain later-wave work |
| `support-packages` | [SCN-041](../scenarios/SCN-041-verdict-export-stability-and-provenance.md)<br>`spec/project/repo-structure.md`, `spec/project/feature-area-boundaries.md`, `spec/runtime/execution-traces-and-token-accounting.md`, `spec/runtime/trace-artifact-governance.md` | only proven slices: `api-contract`, `scenario-system` | [SCN-041](../scenarios/SCN-041-verdict-export-stability-and-provenance.md) + `scenarios/contracts/index.md` | verdict export/provenance now has a repo-local framework scenario anchor; broader support-package extraction still requires multi-consumer proof |

## Reading rule

This matrix is capability-first and deliberately shallow while the repo split is active.
It should later evolve into:
- `feature_group -> contract docs -> scenario ids -> evidence location -> execution history`.
