---
file: .memory-bank/plans/current-status-report.md
description: 'Current status snapshot for bot-platform under the active PRT-038 convergence program.'
purpose: Give maintainers a short answer to what is already landed in bot-platform and what remains as the repo shifts from framework extraction into shared-substrate hardening and product adoption support.
version: 0.37.0
date: 2026-04-23
status: ACTIVE
tags: [status, bot-platform, prt-036, prt-038, migration, convergence]
parent: .memory-bank/plans/index.md
history:
  - version: 0.37.0
    date: 2026-04-23
    changes: Recorded the third real PRT-038 implementation tranche: control-plane export integration, governed-content API read models, and governed-content export integration are now landed and accepted locally, so the next bounded work shifts to runnable verifier proof and later status-sync tasks.
  - version: 0.36.0
    date: 2026-04-23
    changes: Recorded the second real PRT-038 implementation tranche: channel-binding, control-plane API read models, source-processing bundle helpers, and import-lifecycle/idempotency helpers are now landed, the tranche is accepted with rerun proof, and the next work shifts to export integration, the governed-content API-contract slice, and later verifier/sync tasks.
  - version: 0.35.0
    date: 2026-04-23
    changes: Recorded the first real PRT-038 implementation wave: bounded control-plane and governed-content vocabulary slices are now landed in `packages/core`, wave-local reports are captured, and the next implementation focus moves to channel-binding, API-envelope, source-processing, and import-lifecycle slices.
  - version: 0.34.0
    date: 2026-04-23
    changes: Recorded phase-3 ops/runbook alignment under PRT-038: the umbrella packet now includes git/worktree discipline, push/CI/hosted-trigger rules, deploy/preflight/rollout gates, and lessons-learned/insights routing with explicit subagent briefing requirements.
  - version: 0.33.0
    date: 2026-04-23
    changes: Recorded phase-2 implementation planning under PRT-038: the umbrella packet now includes the subagent execution model, implementation task graph, verifier workflow, and staged verification/rollout contour, and the phase-2 synthesis packet is linked as evidence.
  - version: 0.32.0
    date: 2026-04-23
    changes: Recorded the protocol-hardening pass after the completed phase-1 review: PRT-038/039/040 now carry stronger ownership/lifecycle/closure rules, and the verification matrix now has explicit convergence-era rows for the shared control-plane and governed-content/import substrates.
  - version: 0.31.0
    date: 2026-04-23
    changes: Synced the status snapshot to the active PRT-038 convergence program by recording ADR-005 plus PRT-038/039/040 as landed planning truth, marking the phase-1 protocol review as complete, and replacing outdated “next child protocols” wording with protocol-hardening and product-adoption follow-ups.
  - version: 0.30.0
    date: 2026-04-22
    changes: Closed Wave 2 in fully released state: the mainline release workflow was aligned to versioned-package publication, `bot-platform/main` was promoted through the governed release path, and `@dd-bot-platform/core@0.2.0` was published through the GitHub-hosted `Release Packages` workflow.
  - version: 0.29.0
    date: 2026-04-22
    changes: Added the missing minimal protected-branch verification baseline for `bot-platform` by introducing a root `pnpm check` alias plus a `Verification` push/PR workflow, while leaving `Release Packages` focused on the accepted mainline release-readiness and publish path.
  - version: 0.28.0
    date: 2026-04-22
    changes: Closed Wave 2 in safe-mode repo state by materializing `@dd-bot-platform/core@0.2.0` through `changeset version`; the framework core is now extracted, broadened into the generic runtime-helper tranche, release-allowlisted, and versioned, while actual npm publication remains a mainline release operation rather than additional extraction work.
  - version: 0.27.0
    date: 2026-04-22
    changes: Advanced Wave 2 again with a broader `@dd-bot-platform/core` runtime-helper pack: generic pipeline-registry primitives, generic provider-stage vocabulary/adapter-registry helpers, `provider-result` helpers, release allowlist inclusion, and a safer `prepack` clean step now all live in the framework package.
  - version: 0.26.0
    date: 2026-04-22
    changes: Advanced Wave 2 with a third real `@dd-bot-platform/core` slice for provider-result envelope helpers (`runtime/provider-result.ts`), keeping the move inside result/trace semantics rather than widening prematurely into provider adapters or pipeline registries.
  - version: 0.25.0
    date: 2026-04-22
    changes: Closed the remaining obvious Wave 1B framework contract/scenario gap by landing repo-local scenario docs (`SCN-012`, `SCN-041`, `SCN-118`, `SCN-168`, `SCN-170`) plus the workflow-framework and command-framework runtime contracts, and synced scenario/runtime/status surfaces accordingly.
  - version: 0.24.0
    date: 2026-04-22
    changes: Landed the first framework-owned flat scenario docs (`SCN-001`, `SCN-116`, `SCN-175`) and advanced Wave 2 by adding the next real `@dd-bot-platform/core` execution-result helper slice on top of the initial execution-kernel vocabulary bootstrap.
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
The remaining obvious Wave 1B framework contract/scenario gap is now materially closed as well: auth/runtime/workflow/support feature groups now have repo-local scenario anchors, and the runtime hub no longer points to workflow/command only as future placeholders.

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
- current flat framework scenario docs:
  - `.memory-bank/scenarios/SCN-001-typed-sdk-parity.md`
  - `.memory-bank/scenarios/SCN-012-scenario-auth-bootstrap.md`
  - `.memory-bank/scenarios/SCN-041-verdict-export-stability-and-provenance.md`
  - `.memory-bank/scenarios/SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md`
  - `.memory-bank/scenarios/SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md`
  - `.memory-bank/scenarios/SCN-168-openai-runtime-provider-registration-and-readiness-projection.md`
  - `.memory-bank/scenarios/SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md`
  - `.memory-bank/scenarios/SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md`
- remaining Wave 1B runtime contract docs that were previously missing:
  - `.memory-bank/spec/runtime/workflow-framework-contract.md`
  - `.memory-bank/spec/runtime/command-framework-contract.md`
- canonical `PRT-036` copy in `bot-platform`
- first publish-ready framework package metadata for:
  - `@dd-bot-platform/api-contract`
  - `@dd-bot-platform/scenario-system`
- first repo-local Wave 2 core extraction slice:
  - `@dd-bot-platform/core@0.1.0` in `packages/core`
- second repo-local Wave 2 core extraction slice:
  - generic execution-result helpers in `packages/core/src/runtime/execution-result.ts`
- third repo-local Wave 2 core extraction slice:
  - provider-result envelope helpers in `packages/core/src/runtime/provider-result.ts`
- broader runtime-helper tranche now also landed:
  - generic pipeline-registry primitives in `packages/core/src/runtime/pipeline-registry.ts`
  - generic provider-stage vocabulary and adapter-registry helpers in `packages/core/src/runtime/provider-stage.ts`
  - `@dd-bot-platform/core` is now included in the controlled publish allowlist and cleans `dist/` before `prepack`
- release-ready package state now also landed:
  - `@dd-bot-platform/core` has been versioned to `0.2.0` in repo state
  - the corresponding changelog entry is materialized
  - publish dry-run proof stays green on the controlled release path
- actual mainline release closure is now also landed:
  - `bot-platform/main` now carries the Wave 2 framework baseline
  - the GitHub-hosted `Release Packages` workflow has published `@dd-bot-platform/core@0.2.0`
  - the versioned-state release workflow now validates `pnpm changeset:publish --dry-run` before publish instead of expecting unconsumed `.changeset/*.md` intent
- minimal protected-branch verification baseline now also landed:
  - root `pnpm check` alias for the repo build baseline
  - `.github/workflows/ci.yml` provides the `Verification` push/PR check
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
- convergence-planning packet is now also landed in repo-local Memory Bank:
  - `.memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md`
  - `.memory-bank/spec/project/three-layer-product-line-architecture.md`
  - `.memory-bank/guides/explanation/product-line-layering-and-split-rationale.md`
  - `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
  - `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
  - `.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
  - SellerAgent and Docoved repo-local adoption-boundary/rationale docs are now the intended downstream start package
- protocol hardening review phase 1 is complete:
  - `стадия проработки плана: фаза 1 выполнена`
  - synthesis packet: `.tasks/prt-038-phase1-review/reports/_phase1-synthesis.md`
  - consolidated review packet: `.tasks/prt-038-phase1-review/reports/phase1-consolidated-review.md`
- implementation-planning review phase 2 is complete:
  - `стадия проработки плана: фаза 2 выполнена`
  - working folder: `.tasks/prt-038-phase2-implementation/`
  - synthesis packet: `.tasks/prt-038-phase2-implementation/reports/phase2-implementation-synthesis.md`
- ops/runbook-alignment review phase 3 is complete:
  - `стадия проработки плана: фаза 3 выполнена`
  - working folder: `.tasks/prt-038-phase3-ops-runbook-alignment/`
  - synthesis packet: `.tasks/prt-038-phase3-ops-runbook-alignment/reports/phase3-ops-runbook-alignment.md`
- protocol hardening is now landed in the active convergence packet:
  - `PRT-038` now carries umbrella-level phase taxonomy, anti-contamination, sync-handshake, and closure-language rules
  - `PRT-039` now carries explicit authority/storage, lifecycle, UI-doc, observability, and verification gates for the shared control-plane substrate
  - `PRT-040` now carries explicit canon narrowing, lifecycle/idempotency, candidate-vs-live-truth, rollback, UI-doc, observability, and verification gates for the governed-content/import substrate
- implementation execution planning is now landed in the umbrella packet:
  - `PRT-038` now carries the subagent task contract, implementation task graph, milestone gates, verifier workflow, and staged verification/rollout contour for the next execution wave
- operational execution planning is now landed in the umbrella packet:
  - `PRT-038` now carries git/worktree/feature-branch discipline aligned to `develop -> main`
  - `PRT-038` now gates push, GitHub CI, Vercel/hosted builds, and release actions so remote triggers happen only when the wave actually needs them
  - `PRT-038` now carries deploy-truth, beta preflight, backup/rollback, and lessons-learned/insights routing rules, including mandatory subagent operational briefing requirements
- the first real PRT-038 implementation slices are now landed in repo state:
  - control-plane shared vocabulary in `packages/core/src/control-plane/**`
  - governed-content shared vocabulary in `packages/core/src/governed-content/**`
  - accepted wave reports in `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-01-report.md`, `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-01-report.md`, and `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/wave1-vocabulary-acceptance.md`
- the second real PRT-038 implementation tranche is now landed in repo state:
  - control-plane channel-binding helpers in `packages/core/src/control-plane/channel-binding/**`
  - control-plane API-contract schemas and read models in `packages/api-contract/src/control-plane/**`
  - governed-content source-processing bundle helpers in `packages/core/src/governed-content/source-processing/**`
  - governed-content import-lifecycle and idempotency helpers in `packages/core/src/governed-content/import-lifecycle/**`
  - accepted tranche reports in `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-02-report.md`, `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-03-report.md`, `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-02-report.md`, `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-03-report.md`, and `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/wave1-second-tranche-acceptance.md`
- the third real PRT-038 implementation tranche is now landed in repo state:
  - control-plane package exports are wired through `packages/core/src/index.ts` and `packages/api-contract/src/index.ts`
  - governed-content API-contract schemas and read models are landed in `packages/api-contract/src/governed-content/**`
  - governed-content package exports are wired through `packages/core/src/index.ts` and `packages/api-contract/src/index.ts`
  - accepted tranche reports in `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T039-04-report.md`, `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-04-report.md`, `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-05-report.md`, and `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/wave1-third-tranche-acceptance.md`
- convergence-era verification inventory is now explicit:
  - `.memory-bank/plans/verification-matrix.md` now includes dedicated `shared-control-plane-substrate` and `shared-governed-content-and-import-substrate` rows with honest `design-hardened` status language

## Not landed yet

- remaining framework specs from the mixed source repo beyond the landed runtime, client/workflow-host, contract, runtime-governance, architecture-context, architecture-guardrails/container, scenario-system, hosted-scenario, operations, operations-observability, engineering/security, and project packets
- remaining framework contract docs from the `CB-*` workstream beyond the now-landed auth/persistence/namespace/access core
- additional framework scenario depth beyond the now-landed repo-local contract anchors (`SCN-001`, `SCN-012`, `SCN-041`, `SCN-116`, `SCN-118`, `SCN-168`, `SCN-170`, `SCN-175`) and the scenario-system/hosted-beta baseline
- broader consumer cutover proof beyond the first active `sales-agent` bridge exercise
- dedicated runnable framework scenario anchors for the shared control-plane and governed-content/import substrates
- first product-local adoption proof under the hardened convergence packet
- verifier and status-sync tasks under the new `T039-*` / `T040-*` execution graph

## Current blockers before broader code extraction

- downstream semver consumer adoption still belongs to later product-facing waves

## Immediate next document wave

1. continue the next bounded verifier slices under the phase-2 execution model and the phase-3 ops/runbook rules:
   - `T039-V1-control-plane-verifier`
   - `T040-V1-governed-content-verifier`
   - keep status/protocol/scenario-matrix sync serialized behind the verifier evidence
2. deepen convergence verification only where a clean framework-owned split exists:
   - add runnable framework anchors for the shared control-plane substrate where platform-owned proof is genuinely possible
   - add runnable framework anchors for the shared governed-content/import substrate where platform-owned proof is genuinely possible
3. continue later framework scenario depth only where a clean framework-owned split exists:
   - persistence-interface scenarios
   - command-framework split scenarios after Telegram/product semantics are stripped out
   - later scenario-system package/tier anchors beyond the current hosted/auth/workflow/runtime baseline
4. sync framework status surfaces to the active convergence program:
   - keep `current-status-report.md` aligned with real convergence progress
   - mirror shared-contract changes into product-local adoption docs before product implementation claims adoption

## Immediate next implementation wave

1. advance from landed shared contracts into runnable verifier proof in `bot-platform`
2. keep shared status-surface sync serialized behind dedicated later tasks
3. perform the first real downstream consumer adoption in later product waves:
   - start with the narrow `research-workflow.ts` path before broader conversation-runtime adoption
4. use the hardened platform packet as the upstream base for product-repo cutover and later host/runtime separation work
