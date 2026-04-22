---
file: .memory-bank/scenarios/index.md
description: 'Framework scenarios hub for bot-platform.'
purpose: Use as the repo-local navigation hub for framework-owned verification scenarios, contract checks, and shared evidence rules.
version: 0.3.0
date: 2026-04-22
status: DRAFT
tags: [scenarios, bot-platform, framework, verification]
parent: .memory-bank/index.md
children:
  - by-epic/index.md
  - contracts/index.md
  - hosted/index.md
history:
  - version: 0.3.0
    date: 2026-04-22
    changes: Landed the first framework-owned flat scenario docs (`SCN-001`, `SCN-116`, `SCN-175`) and updated the hub to distinguish those canonical contracts from the still-pending remainder of the framework catalog.
  - version: 0.2.0
    date: 2026-04-22
    changes: Removed bootstrap placeholder wording and aligned the scenarios hub with the landed scenario-system/hosted-beta specs plus the scenario/verification matrices as the current Wave 1B anchors.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework scenarios hub created during the PRT-036 Memory Bank bootstrap.
---

# Scenarios Hub

`bot-platform` owns only framework scenarios.

This hub is for:
- framework contract verification;
- shared scenario-system behavior;
- shared hosted verification patterns;
- evidence formats that product repos consume but do not own.

It is not for:
- SellerAgent product journeys;
- Docoved product acceptance;
- product-local rollout checklists.

## Initial sections

- [By epic](by-epic/index.md): framework scenarios grouped by platform epic or feature family.
- [Contract scenarios](contracts/index.md): API, auth, workflow, runtime, and persistence contract verification.
- [Hosted scenarios](hosted/index.md): shared hosted verification patterns and framework acceptance anchors.
- [Scenario matrix](scenario-matrix.md): initial capability-to-scenario ownership map for the framework repo.
- [Verification matrix](../plans/verification-matrix.md): capability-to-contract-to-scenario anchor inventory for the framework repo.

## Current Wave 1B posture

At this stage, the framework repo has canonical scenario-system and hosted-beta execution specs, planning matrices, and the first flat framework-owned scenario docs:
- [SCN-001](SCN-001-typed-sdk-parity.md)
- [SCN-116](SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md)
- [SCN-175](SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md)

The broader runnable catalog is still pending.
Until more flat scenario docs land:
- use the spec hubs under `spec/scenarios/` and `spec/runtime/` as canonical contract anchors;
- use [Scenario matrix](scenario-matrix.md) and [Verification matrix](../plans/verification-matrix.md) as the planning and traceability surfaces;
- treat remaining mixed-repo scenario IDs as source-side migration anchors only.

## First wave outcome

This hub exists now so future scenario migration can land into a stable framework-owned structure instead of a mixed source repo.
