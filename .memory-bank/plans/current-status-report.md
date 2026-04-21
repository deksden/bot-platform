---
file: .memory-bank/plans/current-status-report.md
description: 'Current status snapshot for bot-platform bootstrap under PRT-036.'
purpose: Give maintainers a short answer to what is already landed in bot-platform and what remains before framework extraction starts.
version: 0.12.0
date: 2026-04-21
status: ACTIVE
tags: [status, bot-platform, prt-036, migration]
parent: .memory-bank/plans/index.md
history:
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
This closes the earlier "target Memory Bank does not exist" blocker from `PRT-036`.

## Already landed

- root Memory Bank hubs
- spec/plans/guides/scenarios section hubs
- canonical `mbb/**`
- mirrored `git-flow.md`
- package bridge operations spec
- npm package release runbook
- initial architecture, project, and planning skeleton docs
- framework epic map and feature registry
- framework scenario matrix and verification matrix
- canonical `PRT-036` copy in `bot-platform`
- first publish-ready framework package metadata for:
  - `@dd-bot-platform/api-contract`
  - `@dd-bot-platform/scenario-system`
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

## Not landed yet

- remaining framework specs from the mixed source repo beyond the landed runtime, client/workflow-host, contract, and runtime-governance packets
- remaining framework contract docs from the `CB-*` workstream beyond the now-landed auth/persistence/namespace core
- moved framework ADRs and follow-up child protocols beyond `PRT-036`
- actual framework scenario catalog behind the current matrix
- actual framework code extraction
- broader consumer cutover proof beyond the first active `sales-agent` bridge exercise

## Current blockers before broader code extraction

- broader namespace split for `client-sdk` and later framework packages
- `packages/core` seam extraction map
- workflow host code/runtime split design
- persistence interface vs product store split

## Immediate next document wave

1. land remaining framework spec families:
   - remaining `CB-*` contracts not yet landed in repo-local form
   - remaining framework runtime/security/client-api/architecture docs still only present in the mixed repo
2. land framework planning docs:
   - follow-up split child protocols and ADR decisions after `PRT-036`
3. continue moving clearly framework-owned scenario/planning source docs into this repo
