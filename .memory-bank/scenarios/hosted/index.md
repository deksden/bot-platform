---
file: .memory-bank/scenarios/hosted/index.md
description: 'Hosted framework scenario index for bot-platform.'
purpose: Group shared hosted verification scenarios and patterns.
version: 0.4.0
date: 2026-04-22
status: DRAFT
tags: [scenarios, hosted, bot-platform]
parent: .memory-bank/scenarios/index.md
history:
  - version: 0.4.0
    date: 2026-04-22
    changes: Added hosted auth-bootstrap and hosted workflow-durability anchors (`SCN-012`, `SCN-118`) and updated the hosted hub to use the full framework contour vocabulary including `mixed`.
  - version: 0.3.0
    date: 2026-04-22
    changes: Added the first concrete hosted-adjacent framework contract anchor (`SCN-116`) and rewired the hosted hub around the landed framework scenario docs plus hosted contour taxonomy.
  - version: 0.2.0
    date: 2026-04-22
    changes: Replaced bootstrap placeholder wording with a hosted-verification navigation outline anchored to the hosted-beta execution model and scenario-system evidence contracts.
---

# Hosted Scenarios

This hub captures shared hosted verification patterns that are framework-owned and reused by product repos.
It does not own product acceptance checklists or product rollout overlays.

Primary specs:
- `spec/scenarios/hosted-beta-execution-model.md` (hosted contour taxonomy)
- `spec/scenarios/scenario-system-and-evidence.md` (evidence model)
- `spec/runtime/scenario-system-framework-contract.md` (framework ownership boundary)

## Hosted contours (framework vocabulary)

- `beta_api`: deterministic hosted proof through API/SDK assertions first
- `beta_ui`: thin browser proof on top of hosted state
- `beta_external_manual`: only for truly external channel/system checks
- `mixed`: explicit combination of multiple hosted contours when the split remains governed

## Hosted scenario families (anchors)

- `scenario-system` hosted-layer methodology
  - see `spec/scenarios/hosted-beta-execution-model.md`
- `workflow-framework` hosted proof
  - anchors: [SCN-116](../SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md), [SCN-118](../SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md), `spec/runtime/workflow-framework-contract.md`, `spec/architecture/containers/workflow-host.md`
- `auth-framework` hosted bootstrap methodology
  - anchors: [SCN-012](../SCN-012-scenario-auth-bootstrap.md), [Scenario matrix](../scenario-matrix.md), `spec/security/auth-core.md`, `spec/security/auth-and-access.md`

Current hosted-adjacent flat framework contract:
- [SCN-012 Scenario auth bootstrap](../SCN-012-scenario-auth-bootstrap.md)
- [SCN-116 Workflow host job start status and completion over internal host](../SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md)
- [SCN-118 Hosted hobby-safe long transcript replay via workflow host](../SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md)
