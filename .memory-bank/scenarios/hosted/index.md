---
file: .memory-bank/scenarios/hosted/index.md
description: 'Hosted framework scenario index for bot-platform.'
purpose: Group shared hosted verification scenarios and patterns.
version: 0.2.0
date: 2026-04-22
status: DRAFT
tags: [scenarios, hosted, bot-platform]
parent: .memory-bank/scenarios/index.md
history:
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

## Hosted scenario families (anchors)

- `scenario-system` hosted-layer methodology
  - see `spec/scenarios/hosted-beta-execution-model.md`
- `workflow-framework` hosted proof (gated)
  - anchor: [Scenario matrix](../scenario-matrix.md) + `spec/architecture/containers/workflow-host.md`
- `auth-framework` hosted bootstrap methodology (split-aware)
  - anchor: [Scenario matrix](../scenario-matrix.md) + `spec/security/*`

When concrete `SCN-*` docs land in this repo, this hub should list them by hosted contour and link to the evidence expectations and artifact governance rules.
