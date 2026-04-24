---
file: .memory-bank/scenarios/scenario-matrix.md
description: 'Framework scenario matrix for bot-platform: split-aware ownership baseline.'
purpose: Map canonical framework feature groups to framework contract scenario families, current repo-local anchors, and source-side migration anchors without pulling product acceptance into framework ownership.
version: 0.8.0
date: 2026-04-24
status: ACTIVE
tags: [scenarios, matrix, bot-platform, framework, traceability]
parent: .memory-bank/scenarios/index.md
history:
  - version: 0.8.0
    date: 2026-04-24
    changes: Added `SCN-178` as the second bounded shared-control-plane scenario anchor so diagnostics/execution-run/trace-artifact readback proof is explicit alongside the earlier channel-binding slice.
  - version: 0.7.0
    date: 2026-04-23
    changes: Added `shared-governed-content-and-import-substrate` as a first-class framework scenario family and promoted `SCN-177` from planned gap to landed runnable-local governed-content proof.
  - version: 0.6.0
    date: 2026-04-23
    changes: Added `shared-control-plane-substrate` as a first-class framework scenario family and promoted `SCN-176` from planned gap to landed runnable-local control-plane proof.
  - version: 0.5.0
    date: 2026-04-22
    changes: Added repo-local framework scenario anchors for auth-bootstrap, provider-registration/readiness, cross-provider fail-fast governance, hosted workflow durability, and verdict export provenance; linked the new workflow/command runtime contracts where scenario families are still thinner.
  - version: 0.3.0
    date: 2026-04-22
    changes: Actualized anchors to align with landed scenario-system/hosted-beta specs, the now-actualized verification matrix, and the extracted package bridge reality; clarified evidence and hosted execution contours as framework truth without pulling product acceptance into framework ownership.
  - version: 0.4.0
    date: 2026-04-22
    changes: Landed the first framework-owned flat scenario docs (`SCN-001`, `SCN-116`, `SCN-175`) and updated the matrix to point to those canonical target-repo contracts while keeping the remaining split-aware families explicit.
  - version: 0.2.0
    date: 2026-04-20
    changes: Replaced the bootstrap placeholder with a split-aware framework scenario matrix aligned to the canonical feature registry, current repo-local anchors, and explicit candidate/gated seams.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework scenario matrix created from the current mixed scenario pool and split ownership rules.
---

# Scenario Matrix

This matrix is framework-only.
It records:
- the canonical `bot-platform` feature groups that need framework scenario coverage;
- the current mixed-repo scenario families that act only as source-side migration anchors;
- the repo-local docs that already exist in `bot-platform` and should be used for traceability until concrete framework scenario docs land.

It also encodes two pieces of framework truth that matter for Wave 1B actualization:
- hosted execution contours are part of the framework scenario contract model (see `spec/scenarios/hosted-beta-execution-model.md`);
- extraction/bridge proof (published package + consumer cutover evidence) is a required framework readiness signal, but it is not a product acceptance overlay.

First landed flat framework contracts:
- [SCN-001](SCN-001-typed-sdk-parity.md)
- [SCN-012](SCN-012-scenario-auth-bootstrap.md)
- [SCN-041](SCN-041-verdict-export-stability-and-provenance.md)
- [SCN-116](SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md)
- [SCN-118](SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md)
- [SCN-168](SCN-168-openai-runtime-provider-registration-and-readiness-projection.md)
- [SCN-170](SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md)
- [SCN-175](SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md)
- [SCN-176](SCN-176-shared-control-plane-channel-binding-and-readback-contract.md)
- [SCN-177](SCN-177-shared-governed-content-import-readback-contract.md)
- [SCN-178](SCN-178-shared-control-plane-execution-run-and-trace-artifact-readback-contract.md)

## Framework evidence and execution contours (cross-cutting)

Framework scenarios must align with:
- the scenario taxonomy and evidence model in `spec/scenarios/scenario-system-and-evidence.md`;
- the runtime ownership boundary for scenario-system in `spec/runtime/scenario-system-framework-contract.md`;
- trace/evidence governance in `spec/runtime/trace-artifact-governance.md` and `spec/runtime/execution-traces-and-token-accounting.md`.

Hosted execution contours (framework-owned vocabulary):
- `beta_api`: deterministic hosted proof via API/SDK assertions first;
- `beta_ui`: thin browser proof on top of hosted state;
- `beta_external_manual`: only for truly external channel/system checks.
- `mixed`: intentional combination of more than one hosted contour where the split remains explicit.

Bridge/extraction contour (framework readiness signal):
- published package versions and downstream consumer cutover evidence are tracked as part of framework extraction readiness, and should be referenced by future scenario docs when they become runnable contracts.

## Framework ownership baseline

| feature_group | source-side scenario family (current mixed pool) | framework posture | current repo-local anchors | split-aware note |
| --- | --- | --- | --- | --- |
| `client-contracts` | [SCN-001](SCN-001-typed-sdk-parity.md) typed SDK parity | framework contract family | [Client API hub](../spec/client-api/index.md), [API namespace registry](../spec/client-api/api-namespace-registry.md), [Typed client API and SDK](../spec/client-api/typed-client-api-and-sdk.md), [Contract scenarios](contracts/index.md), [Verification matrix](../plans/verification-matrix.md) | Keep typed API / SDK envelope parity in `bot-platform` and track bridge readiness via the extracted `@dd-bot-platform/api-contract` package. Product namespaces, product operations, and product-first clients stay product-owned. |
| `auth-framework` | [SCN-012](SCN-012-scenario-auth-bootstrap.md) deterministic auth bootstrap and hosted bootstrap methodology | framework contract family | [Security hub](../spec/security/index.md), [Auth core](../spec/security/auth-core.md), [Auth and access](../spec/security/auth-and-access.md), [Contract scenarios](contracts/index.md), [Hosted scenarios](hosted/index.md), [Verification matrix](../plans/verification-matrix.md) | Framework owns auth/bootstrap helper contracts, session vocabulary, and guard semantics. Product tables, memberships, authority projections, and operator login acceptance remain product-owned. |
| `shared-control-plane-substrate` | [SCN-176](SCN-176-shared-control-plane-channel-binding-and-readback-contract.md) shared control-plane channel-binding and readback contract; [SCN-178](SCN-178-shared-control-plane-execution-run-and-trace-artifact-readback-contract.md) shared control-plane execution-run and trace-artifact readback contract | framework contract family with partial runnable-local proof | [PRT-039](../plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md), [Control-plane configuration and observability surfaces](../spec/operations/control-plane-configuration-and-observability-surfaces.md), [Auth and access](../spec/security/auth-and-access.md), [Contract scenarios](contracts/index.md), [Verification matrix](../plans/verification-matrix.md) | Framework now owns runnable-local proof for shared channel-binding validation/status/snapshot via `SCN-176` and bounded execution-run/trace-artifact diagnostics readback via `SCN-178`. Product memberships, product IA, downstream adoption, and broader consumer proof remain product-owned or later-wave. |
| `shared-governed-content-and-import-substrate` | [SCN-177](SCN-177-shared-governed-content-import-readback-contract.md) shared governed-content import readback contract | framework contract family with partial runnable-local proof | [PRT-040](../plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md), [Workflow framework contract](../spec/runtime/workflow-framework-contract.md), [Persistence interface and store boundary](../spec/runtime/persistence-interface-and-store-boundary.md), [Contract scenarios](contracts/index.md), [Verification matrix](../plans/verification-matrix.md) | Framework now owns the first runnable-local proof for source-processing honesty, lifecycle/idempotency/conflict guards, and governed-content readback parsing via `SCN-177`. Product review UX, activation/cutover proof, storage truth, and downstream adoption remain product-owned or later-wave. |
| `runtime-kernel` | `SCN-025`, [SCN-168](SCN-168-openai-runtime-provider-registration-and-readiness-projection.md), [SCN-170](SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md), [SCN-175](SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md) | framework contract family | [Runtime hub](../spec/runtime/index.md), [Agent execution kernel](../spec/runtime/agent-execution-kernel.md), [Execution traces and token accounting](../spec/runtime/execution-traces-and-token-accounting.md), [Trace artifact governance](../spec/runtime/trace-artifact-governance.md), [Contract scenarios](contracts/index.md), [Verification matrix](../plans/verification-matrix.md) | Keep prompt-manager/provider-registry/fail-fast/diagnostics governance checks here. Evidence must conform to the framework trace and artifact governance rules. Product reply behavior, business routing, and product readiness acceptance stay product-owned. |
| `workflow-framework` | [SCN-116](SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md) workflow-host topology/status, [SCN-118](SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md) hosted durable workflow-host proof | framework contract family with product split | [Runtime hub](../spec/runtime/index.md), [Workflow framework contract](../spec/runtime/workflow-framework-contract.md), [Workflow host container](../spec/architecture/containers/workflow-host.md), [Hosted scenarios](hosted/index.md), [Verification matrix](../plans/verification-matrix.md) | Framework owns host/start/callback/durability contracts and shared hosted workflow patterns. Replay content, result materialization, and product workflow families remain product-owned. |
| `scenario-system` | `EP-011` deterministic hosted scenario methodology family plus shared tier/evidence conventions across the mixed catalog | framework hosted-pattern and contract family | [Scenario specs hub](../spec/scenarios/index.md), [Scenario system and evidence](../spec/scenarios/scenario-system-and-evidence.md), [Hosted beta execution model](../spec/scenarios/hosted-beta-execution-model.md), [Scenario system runtime contract](../spec/runtime/scenario-system-framework-contract.md), [Hosted scenarios](hosted/index.md) | Framework owns taxonomy, runner assumptions, evidence classes, and hosted verification methodology. Product repos own actual product journeys, rollout smoke packs, and beta acceptance. The extracted `@dd-bot-platform/scenario-system` package is part of the framework-owned evidence/tooling surface. |
| `command-framework` | `SCN-158` command projection drift/reconcile, `SCN-065` repair/reconcile control-plane job surfaces | framework contract family with later split scenario | [Runtime hub](../spec/runtime/index.md), [Command framework contract](../spec/runtime/command-framework-contract.md), [Contract scenarios](contracts/index.md), [Framework feature registry](../plans/epics/framework-feature-registry.md) | Current mixed anchors are still Telegram/product-heavy. Only command envelope, parser, registry primitives, and diagnostics patterns are framework-owned; concrete commands, permission mapping, and channel behavior stay product-owned. |
| `persistence-interfaces` | `SCN-076` SQL migration ledger family and adjacent backup/restore/store-governance scenarios from the mixed pool | `candidate / gated` split required | [Persistence interface and store boundary](../spec/runtime/persistence-interface-and-store-boundary.md), [Feature area boundaries](../spec/project/feature-area-boundaries.md), [Framework feature registry](../plans/epics/framework-feature-registry.md) | Framework owns interface vocabulary and store-boundary rules only. Concrete DB schema, migrations, backup/restore procedures, and runtime bindings remain product-owned. |
| `support-packages` | `SCN-010` UI contract integrity, [SCN-041](SCN-041-verdict-export-stability-and-provenance.md) verdict export stability/provenance, and adjacent product-agnostic helper checks | framework contract family with selective anchors | [Repo structure](../spec/project/repo-structure.md), [Execution traces and token accounting](../spec/runtime/execution-traces-and-token-accounting.md), [Trace artifact governance](../spec/runtime/trace-artifact-governance.md), [Contract scenarios](contracts/index.md), [Framework feature registry](../plans/epics/framework-feature-registry.md) | Keep only truly cross-product support helpers in `bot-platform`. `packages/ui-contract` and similar seams stay provisional until they are proven product-agnostic and multi-consumer. |

## Explicit non-framework families

The following do not become framework-owned just because they currently share tooling with the mixed source repo:
- SellerAgent product journeys, admin/operator acceptance, commerce/catalog/memory/handoff behavior, and `XE-*` end-to-end flows;
- Docoved ingest/publication/grounded-answering acceptance and hosted delivery overlays;
- product DB, deploy, secret, and operator-runbook verification.

## Traceability rule for the next wave

For feature groups that still lack a concrete flat framework scenario doc in `bot-platform`:
- use the repo-local hubs/specs in the table above as the framework-side anchors;
- treat mixed-repo scenario IDs as source-side migration anchors only, not as proof that framework-owned scenario docs already exist here;
- when one mixed scenario splits, record one framework contract check in `bot-platform` and keep the product acceptance path in the owning product repo.
