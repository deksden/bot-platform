---
file: .memory-bank/plans/current-status-report.md
description: 'Current status snapshot for bot-platform bootstrap under PRT-036.'
purpose: Give maintainers a short answer to what is already landed in bot-platform and what remains as framework extraction moves from planning into implementation.
version: 0.23.0
date: 2026-04-22
status: ACTIVE
tags: [status, bot-platform, prt-036, migration]
parent: .memory-bank/plans/index.md
history:
  - version: 0.23.0
    date: 2026-04-22
    changes: Actualized the framework planning/scenario truth for Wave 1B: verification matrix is now aligned to the feature registry and extracted packages, scenario matrix anchors reflect the landed scenario-system/hosted-beta specs, the scenario hubs no longer read as bootstrap placeholders, and the first repo-local `@dd-bot-platform/core` extraction slice is now landed.
  - version: 0.22.0
    date: 2026-04-22
    changes: Closed framework architecture/operations waves 151-152 by landing repo-local architecture guardrails plus remaining container contracts (`core`, `server`, `db-and-projections`, `web-and-cli-surfaces`) and the framework control-plane/evaluation/observability packet (`control-plane-configuration-and-observability-surfaces`, `evaluation-plane-and-judge-runtime`, `observability-and-incident-diagnostics`) with synced architecture/operations/spec hubs.
  - version: 0.21.0
    date: 2026-04-22
    changes: Closed framework project packet wave 145 by landing repo-local `agent-execution-platform-architecture` plus project/spec hub linkage, and narrowed immediate-next wording to still-unlanded framework doc families beyond the now-landed project packet.
  - version: 0.20.0
    date: 2026-04-21
    changes: Closed framework engineering/security packet wave 139 by landing repo-local `delivery-standards`, `coding-style`, and `auth-and-access` plus engineering/security/spec hub linkage, and narrowed immediate-next wording to still-unlanded framework doc families beyond the now-landed engineering/security packet.
  - version: 0.19.0
    date: 2026-04-21
    changes: Closed framework operations packet wave 135 by landing repo-local `deployment-architecture`, `runbook`, `production-rollout-runbook`, and `hosted-beta-acceptance-contract` plus operations/spec hub linkage, and narrowed immediate-next wording to still-unlanded framework doc families beyond the now-landed operations packet.
  - version: 0.18.0
    date: 2026-04-21
    changes: Closed framework protocol packet wave 131 by landing repo-local `PRT-030-architecture-boundary-simplification-and-ownership-convergence` plus protocol hub linkage, and narrowed immediate-next wording to still-unlanded framework doc families beyond the now-landed protocol and ADR packet set.
  - version: 0.17.0
    date: 2026-04-21
    changes: Closed framework ADR packet wave 127 by landing repo-local `ADR-003-deterministic-hosted-scenarios-and-browser-automation` plus ADR hub linkage, and narrowed immediate-next wording to still-unlanded framework doc families beyond the now-landed ADR packet set.
  - version: 0.16.0
    date: 2026-04-21
    changes: Closed framework hosted-scenario packet wave 124 by landing repo-local `hosted-beta-execution-model` plus scenarios/spec hub linkage, and narrowed immediate-next wording to still-unlanded framework doc families beyond the now-landed scenario packets.
  - version: 0.15.0
    date: 2026-04-21
    changes: Closed framework scenario packet wave 121 by landing repo-local `scenario-system-and-evidence` plus scenarios/spec hub linkage, and narrowed immediate-next wording to still-unlanded framework doc families beyond the now-landed scenario baseline.
  - version: 0.14.0
    date: 2026-04-21
    changes: Closed framework ADR packet wave 118 by landing repo-local `ADR-004-workspace-product-instance-pipeline-and-environment-terminology` plus ADR index linkage, and narrowed immediate-next wording to still-unlanded framework doc families beyond `PRT-036` and `ADR-004`.
  - version: 0.13.0
    date: 2026-04-21
    changes: Closed framework architecture-context packet wave 115 by landing repo-local `platform-glossary`, `system-context`, `container-architecture`, and `dependency-and-placement-rules` docs with synced architecture/spec hubs; immediate-next wording now names only still-unlanded framework doc families.
  - version: 0.12.0
    date: 2026-04-21
    changes: Closed framework runtime-governance packet waves 110-112 by landing repo-local `execution-traces-and-token-accounting`, `trace-artifact-governance`, and `decision-explanation-envelope` docs with synced runtime/spec hubs; immediate-next wording now names only still-unlanded framework doc families.
  - version: 0.11.0
    date: 2026-04-21
    changes: Closed framework contract packet waves 103-105 by landing repo-local `auth-core`, `persistence-interface-and-store-boundary`, and `api-namespace-registry` docs with synced security/runtime/client-api/spec hubs; immediate-next wording now advances to the next still-unlanded framework docs/planning tranche.
  - version: 0.10.0
    date: 2026-04-21
    changes: Completed the W99 sync pass after waves 94-99: the next framework surface packet remains landed, the framework boundary baseline is now explicitly active architecture truth, and blockers/next-step wording now distinguishes landed docs from the remaining code-split design backlog.
  - version: 0.9.0
    date: 2026-04-21
    changes: Closed framework surface packet waves 97-98 by landing repo-local typed client API and workflow-host container docs, creating architecture container indexing, and updating spec hubs to treat these surfaces as landed instead of pending.
  - version: 0.8.0
    date: 2026-04-21
    changes: Completed the W93 sync pass after waves 91-92: the first framework runtime migration packet remains landed, and the next-doc framing now explicitly continues broader framework source-doc migration instead of describing it as not yet started.
  - version: 0.7.0
    date: 2026-04-21
    changes: Closed runtime migration packet waves 91-92 by landing repo-local execution-kernel and pipeline-registry docs in bot-platform, updating spec/runtime indexes, and removing runtime-kernel from the immediate next-doc wave.
  - version: 0.6.0
    date: 2026-04-20
    changes: Closed the first bridge exercise instead of leaving it "underway": the published `@dd-bot-platform/*` path is proven by active `sales-agent` consumers, vendored mirrors are retired there, and the remaining blocker is no longer bridge validation but later framework extraction/adoption scope.
  - version: 0.5.0
    date: 2026-04-20
    changes: Recorded the first real npm bridge exercise: `@dd-bot-platform/api-contract@0.2.0` and `@dd-bot-platform/scenario-system@0.2.0` are published, the bridge policy moved to public scoped npm via ADR-002, and the first active consumer cutover in `sales-agent` is now underway.
  - version: 0.4.0
    date: 2026-04-20
    changes: Switched the framework release target to npm scope `@dd-bot-platform`, added Changesets/release-workflow scaffolding, and established the first concrete npm release runbook for extracted packages.
  - version: 0.3.0
    date: 2026-04-20
    changes: Recorded the first publish-readiness tranche for extracted framework packages: package metadata is now aligned with the private-registry bridge and the operational bridge contract is documented in repo-local operations specs.
  - version: 0.2.0
    date: 2026-04-20
    changes: Refreshed the bootstrap snapshot to match the actual repo state: framework epic/feature docs, scenario matrix, verification matrix, and the canonical PRT-036 copy are already landed, but remain draft and still need truth actualization.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework status snapshot created during the first real Memory Bank bootstrap wave.
---

# Current Status Report

## State

`bot-platform` now has a real `.memory-bank/**` skeleton and canonical `mbb/**`.
This closes the earlier "target Memory Bank does not exist" blocker from `PRT-036`, and the first framework scenario-system packet, hosted-beta execution-model packet, next hosted-scenarios ADR packet, architecture-boundary simplification protocol packet, framework operations packet, framework engineering/security packet, framework project packet, framework architecture guardrails/container packet, and framework operations-observability packet are now landed in repo-local form.

## Already landed

- root Memory Bank hubs
- spec/plans/guides/scenarios section hubs
- canonical `mbb/**`
- mirrored `git-flow.md`
- package bridge operations spec
- npm package release runbook
- initial architecture, project, and planning skeleton docs
- framework epic map and feature registry
- framework scenario matrix (actualized anchors) and verification matrix (actualized inventory)
- scenario navigation hubs (`scenarios/`, `scenarios/contracts/`, `scenarios/hosted/`, `scenarios/by-epic/`) are no longer bootstrap placeholders
- canonical `PRT-036` copy in `bot-platform`
- first publish-ready framework package metadata for:
  - `@dd-bot-platform/api-contract`
  - `@dd-bot-platform/scenario-system`
- first repo-local Wave 2 core extraction slice:
  - `@dd-bot-platform/core@0.1.0` in `packages/core`
- Changesets/release workflow scaffolding for the first publishable framework packages
- first published framework package versions:
  - `@dd-bot-platform/api-contract@0.2.0`
  - `@dd-bot-platform/scenario-system@0.2.0`
- first active consumer cutover proof in `sales-agent`:
  - `packages/sa-judge` now consumes the published bridge
  - `packages/scenario-runner` now consumes the published bridge
  - temporary vendored semantic-eval mirrors are retired from those packages
- runtime migration packet waves 91-92 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/runtime/agent-execution-kernel.md`
  - `.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`
  - runtime/spec index linkage refreshed for these contracts
- framework surface packet waves 97-98 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/client-api/typed-client-api-and-sdk.md`
  - `.memory-bank/spec/architecture/containers/workflow-host.md`
  - `.memory-bank/spec/architecture/containers/index.md`
  - spec/architecture/client-api hub linkage refreshed for these contracts
- framework contract packet waves 103-105 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/security/auth-core.md`
  - `.memory-bank/spec/runtime/persistence-interface-and-store-boundary.md`
  - `.memory-bank/spec/client-api/api-namespace-registry.md`
  - security/runtime/client-api/spec hub linkage refreshed for these contracts
- framework runtime-governance packet waves 110-112 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/runtime/execution-traces-and-token-accounting.md`
  - `.memory-bank/spec/runtime/trace-artifact-governance.md`
  - `.memory-bank/spec/runtime/decision-explanation-envelope.md`
  - runtime/spec hub linkage refreshed for these contracts
- framework architecture-context packet wave 115 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/architecture/platform-glossary.md`
  - `.memory-bank/spec/architecture/system-context.md`
  - `.memory-bank/spec/architecture/container-architecture.md`
  - `.memory-bank/spec/architecture/dependency-and-placement-rules.md`
  - architecture/spec hub linkage refreshed for these contracts
- framework ADR packet wave 118 is landed in repo-local Memory Bank:
  - `.memory-bank/plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md`
  - `.memory-bank/plans/adr/index.md`
  - ADR/plans hub linkage refreshed for this decision packet
- framework scenario packet wave 121 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/scenarios/scenario-system-and-evidence.md`
  - `.memory-bank/spec/scenarios/index.md`
  - `.memory-bank/spec/index.md`
  - scenario/spec hub linkage refreshed for this packet
- framework hosted-scenario packet wave 124 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/scenarios/hosted-beta-execution-model.md`
  - `.memory-bank/spec/scenarios/index.md`
  - `.memory-bank/spec/index.md`
  - scenario/spec hub linkage refreshed for this packet
- framework ADR packet wave 127 is landed in repo-local Memory Bank:
  - `.memory-bank/plans/adr/ADR-003-deterministic-hosted-scenarios-and-browser-automation.md`
  - `.memory-bank/plans/adr/index.md`
  - ADR/plans hub linkage refreshed for this decision packet
- framework protocol packet wave 131 is landed in repo-local Memory Bank:
  - `.memory-bank/plans/protocols/PRT-030-architecture-boundary-simplification-and-ownership-convergence.md`
  - `.memory-bank/plans/protocols/index.md`
  - protocol/plans hub linkage refreshed for this decision packet
- framework operations packet wave 135 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/operations/deployment-architecture.md`
  - `.memory-bank/spec/operations/runbook.md`
  - `.memory-bank/spec/operations/production-rollout-runbook.md`
  - `.memory-bank/spec/operations/hosted-beta-acceptance-contract.md`
  - `.memory-bank/spec/operations/index.md`
  - `.memory-bank/spec/index.md`
  - operations/spec hub linkage refreshed for this packet
- framework engineering/security packet wave 139 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/engineering/index.md`
  - `.memory-bank/spec/engineering/delivery-standards.md`
  - `.memory-bank/spec/engineering/coding-style.md`
  - `.memory-bank/spec/security/auth-and-access.md`
  - `.memory-bank/spec/security/index.md`
  - `.memory-bank/spec/index.md`
  - engineering/security/spec hub linkage refreshed for this packet
- framework project packet wave 145 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/project/agent-execution-platform-architecture.md`
  - `.memory-bank/spec/project/index.md`
  - `.memory-bank/spec/index.md`
  - project/spec hub linkage refreshed for this packet
- framework architecture packet wave 151 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/architecture/architecture-guardrails.md`
  - `.memory-bank/spec/architecture/containers/core.md`
  - `.memory-bank/spec/architecture/containers/server.md`
  - `.memory-bank/spec/architecture/containers/db-and-projections.md`
  - `.memory-bank/spec/architecture/containers/web-and-cli-surfaces.md`
  - `.memory-bank/spec/architecture/index.md`
  - `.memory-bank/spec/architecture/containers/index.md`
  - `.memory-bank/spec/index.md`
  - architecture/spec hub linkage refreshed for this packet
- framework operations packet wave 152 is landed in repo-local Memory Bank:
  - `.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
  - `.memory-bank/spec/operations/evaluation-plane-and-judge-runtime.md`
  - `.memory-bank/spec/operations/observability-and-incident-diagnostics.md`
  - `.memory-bank/spec/operations/index.md`
  - `.memory-bank/spec/index.md`
  - operations/spec hub linkage refreshed for this packet

## Not landed yet

- remaining framework specs from the mixed source repo beyond the landed runtime, client/workflow-host, contract, runtime-governance, architecture-context, architecture-guardrails/container, scenario-system, hosted-scenario, operations, operations-observability, engineering/security, and project packets
- remaining framework contract docs from the `CB-*` workstream beyond the now-landed auth/persistence/namespace/access core
- moved framework ADRs and follow-up child protocols beyond the now-landed `PRT-030`, `PRT-036`, `ADR-003`, and `ADR-004`
- remaining framework scenario docs/catalog beyond the now-landed scenario-system/evidence and hosted-beta execution baseline
- broader framework code extraction beyond the first contract-first `packages/core` slice
- broader consumer cutover proof beyond the first active `sales-agent` bridge exercise

## Current blockers before broader code extraction

- broader namespace split for `client-sdk` and later framework packages
- next `packages/core` follow-on seams beyond the now-landed execution-contract vocabulary
- workflow host code/runtime split design
- persistence interface vs product store split

## Immediate next document wave

1. convert planning anchors into the first repo-local framework scenario docs:
   - contract scenarios for extracted bridge slices (`api-contract`, `scenario-system`) and the core framework runtime/security contracts that are already landed
   - hosted preflight/pattern scenarios that exercise the hosted-beta execution model without embedding product acceptance overlays
2. land the next framework contract/spec docs that unblock gated feature groups without importing product truth:
   - workflow framework contract spec (host/start/callback/durability vocabulary)
   - command framework contract spec (envelope/registry primitives; no channel/product commands)
3. continue PRT-036 planning migration:
   - remaining `CB-*` contract docs not yet landed in repo-local form
   - follow-up split child protocols and ADR decisions after `PRT-030`, `PRT-036`, `ADR-003`, and `ADR-004`

## Immediate next implementation wave

1. extend `@dd-bot-platform/core` only through framework-safe seams:
   - result/trace abstractions that do not import product DTOs
   - adapter boundaries instead of copied SellerAgent or Docoved request models
2. prepare the next runtime/workflow split after the now-landed contract vocabulary slice
