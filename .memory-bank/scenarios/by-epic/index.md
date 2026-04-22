---
file: .memory-bank/scenarios/by-epic/index.md
description: 'By-epic framework scenario index for bot-platform.'
purpose: Group framework scenarios by platform-owned epic families.
version: 0.2.0
date: 2026-04-22
status: DRAFT
tags: [scenarios, epics, bot-platform]
parent: .memory-bank/scenarios/index.md
history:
  - version: 0.2.0
    date: 2026-04-22
    changes: Replaced the bootstrap placeholder with a split-aware by-epic navigation view that points to the feature registry and scenario/verification matrices as the current anchors.
---

# By Epic

This index is an overlay navigation view.
It groups framework-owned scenario intent by platform epic families, without claiming ownership over product acceptance overlays.

Primary anchors:
- [Framework epic map](../../plans/epics/framework-epic-map.md)
- [Framework feature registry](../../plans/epics/framework-feature-registry.md)
- [Scenario matrix](../scenario-matrix.md)
- [Verification matrix](../../plans/verification-matrix.md)

## Epic families (framework-only)

- `EP-008 Scenarios And Verification`
  - current anchors: [Scenario matrix](../scenario-matrix.md), [Verification matrix](../../plans/verification-matrix.md), `spec/scenarios/*`
- `EP-011 Deterministic Hosted Scenarios And Browser Automation`
  - current anchors: `spec/scenarios/hosted-beta-execution-model.md`, [Hosted scenarios](../hosted/index.md)
- `EP-022 Agent Execution Platform And Multi-Plane Architecture`
  - current anchors: `spec/project/agent-execution-platform-architecture.md`, `spec/architecture/*`, `spec/runtime/*`

When concrete `SCN-*` docs land, this index should be expanded with per-epic lists that point to the canonical flat scenario files.
