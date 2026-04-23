---
file: .memory-bank/scenarios/index.md
description: 'Framework scenarios hub for bot-platform.'
purpose: Use as the repo-local navigation hub for framework-owned verification scenarios, contract checks, and shared evidence rules.
version: 0.6.0
date: 2026-04-23
status: DRAFT
tags: [scenarios, bot-platform, framework, verification]
parent: .memory-bank/index.md
children:
  - by-epic/index.md
  - contracts/index.md
  - hosted/index.md
history:
  - version: 0.6.0
    date: 2026-04-23
    changes: Added `SCN-177` to the framework scenario navigation surfaces and updated the Wave 1B posture so the shared governed-content/import substrate no longer reads as a missing runnable anchor.
  - version: 0.5.0
    date: 2026-04-23
    changes: Added `SCN-176` to the framework scenario navigation surfaces and updated the Wave 1B posture so the shared control-plane substrate no longer reads as a missing runnable anchor.
  - version: 0.4.0
    date: 2026-04-22
    changes: Landed the next framework-owned scenario wave (`SCN-012`, `SCN-041`, `SCN-118`, `SCN-168`, `SCN-170`) and updated the hub to treat the obvious Wave 1B framework scenario gap as materially closed.
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

At this stage, the framework repo has canonical scenario-system and hosted-beta execution specs, planning matrices, and these flat framework-owned scenario docs:
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

The obvious Wave 1B framework gap is now materially closed for auth, runtime-kernel, workflow-framework hosted durability, support-package export/provenance anchors, and the first runnable verifier anchors for both shared substrates.
Deeper scenario families are still later-wave work.
Until those additional flat scenario docs land:
- use the spec hubs under `spec/scenarios/` and `spec/runtime/` as canonical contract anchors for still-thin families;
- use [Scenario matrix](scenario-matrix.md) and [Verification matrix](../plans/verification-matrix.md) as the planning and traceability surfaces;
- treat remaining mixed-repo scenario IDs as source-side migration anchors only where no repo-local child scenario exists yet.

## First wave outcome

This hub now carries a real framework-owned baseline for the main Wave 1B contract families, including the first flat verifier anchors for the shared control-plane and governed-content/import substrates via [SCN-176](SCN-176-shared-control-plane-channel-binding-and-readback-contract.md) and [SCN-177](SCN-177-shared-governed-content-import-readback-contract.md), so future migration can add depth without pretending the framework scenario layer is still only a placeholder.
