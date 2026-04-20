---
file: .memory-bank/scenarios/scenario-matrix.md
description: 'Framework scenario matrix for bot-platform: split-aware ownership baseline.'
purpose: Map canonical framework feature groups to framework contract scenario families, current repo-local anchors, and source-side migration anchors without pulling product acceptance into framework ownership.
version: 0.2.0
date: 2026-04-20
status: ACTIVE
tags: [scenarios, matrix, bot-platform, framework, traceability]
parent: .memory-bank/scenarios/index.md
history:
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

## Framework ownership baseline

| feature_group | source-side scenario family (current mixed pool) | framework posture | current repo-local anchors | split-aware note |
| --- | --- | --- | --- | --- |
| `client-contracts` | `SCN-001` typed SDK parity | framework contract family | [Client API hub](../spec/client-api/index.md), [Contract scenarios](contracts/index.md), [Verification matrix](../plans/verification-matrix.md) | Keep typed API / SDK envelope parity in `bot-platform`; product namespaces, product operations, and product-first clients stay product-owned. |
| `auth-framework` | `SCN-012` scenario auth bootstrap and adjacent hosted auth-bootstrap methodology from the mixed pool | framework contract family | [Runtime hub](../spec/runtime/index.md), [Contract scenarios](contracts/index.md), [Verification matrix](../plans/verification-matrix.md) | Framework owns auth/bootstrap helper contracts, session vocabulary, and guard semantics. Product tables, memberships, authority projections, and operator login acceptance remain product-owned. |
| `runtime-kernel` | `SCN-025`, `SCN-168`, `SCN-170`, `SCN-175` | framework contract family | [Runtime hub](../spec/runtime/index.md), [Feature area boundaries](../spec/project/feature-area-boundaries.md), [Verification matrix](../plans/verification-matrix.md) | Keep prompt-manager, provider-registry, fail-fast, and diagnostics-governance checks here. Product reply behavior, business routing, and product readiness acceptance stay product-owned. |
| `workflow-framework` | `SCN-116` workflow-host topology/status, `SCN-118` hosted durable workflow-host proof | framework contract family with product split | [Runtime hub](../spec/runtime/index.md), [Hosted scenarios](hosted/index.md), [Verification matrix](../plans/verification-matrix.md) | Framework owns host/start/callback/durability contracts and shared hosted workflow patterns. Replay content, result materialization, and product workflow families remain product-owned. |
| `scenario-system` | `EP-011` deterministic hosted scenario methodology family plus shared tier/evidence conventions across the mixed catalog | framework hosted-pattern and contract family | [Scenario specs hub](../spec/scenarios/index.md), [Scenarios hub](index.md), [Hosted scenarios](hosted/index.md) | Framework owns taxonomy, runner assumptions, evidence classes, and hosted verification methodology. Product repos own actual product journeys, rollout smoke packs, and beta acceptance. |
| `command-framework` | `SCN-158` command projection drift/reconcile, `SCN-065` repair/reconcile control-plane job surfaces | `candidate / gated` split required | [Runtime hub](../spec/runtime/index.md), [Contract scenarios](contracts/index.md), [Framework feature registry](../plans/epics/framework-feature-registry.md) | Current mixed anchors are still Telegram/product-heavy. Only command envelope, parser, registry primitives, and diagnostics patterns are framework-owned; concrete commands, permission mapping, and channel behavior stay product-owned. |
| `persistence-interfaces` | `SCN-076` SQL migration ledger family and adjacent backup/restore/store-governance scenarios from the mixed pool | `candidate / gated` split required | [Runtime hub](../spec/runtime/index.md), [Feature area boundaries](../spec/project/feature-area-boundaries.md), [Framework feature registry](../plans/epics/framework-feature-registry.md) | Framework owns interface vocabulary and store-boundary rules only. Concrete DB schema, migrations, backup/restore procedures, and runtime bindings remain product-owned. |
| `support-packages` | `SCN-010` UI contract integrity, `SCN-041` verdict export stability/provenance, and adjacent product-agnostic helper checks | `candidate / gated` split required | [Repo structure](../spec/project/repo-structure.md), [Framework feature registry](../plans/epics/framework-feature-registry.md), [Contract scenarios](contracts/index.md) | Keep only truly cross-product support helpers in `bot-platform`. `packages/ui-contract` and similar seams stay provisional until they are proven product-agnostic and multi-consumer. |

## Explicit non-framework families

The following do not become framework-owned just because they currently share tooling with the mixed source repo:
- SellerAgent product journeys, admin/operator acceptance, commerce/catalog/memory/handoff behavior, and `XE-*` end-to-end flows;
- Docoved ingest/publication/grounded-answering acceptance and hosted delivery overlays;
- product DB, deploy, secret, and operator-runbook verification.

## Traceability rule for the next wave

Until concrete framework scenario docs exist in `bot-platform`:
- use the repo-local hubs/specs in the table above as the framework-side anchors;
- treat mixed-repo scenario IDs as source-side migration anchors only, not as proof that framework-owned scenario docs already exist here;
- when one mixed scenario splits, record one framework contract check in `bot-platform` and keep the product acceptance path in the owning product repo.
