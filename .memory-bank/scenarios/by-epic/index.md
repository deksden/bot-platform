---
file: .memory-bank/scenarios/by-epic/index.md
description: 'By-epic framework scenario index for bot-platform.'
purpose: Group framework scenarios by platform-owned epic families.
version: 0.7.0
date: 2026-04-24
status: DRAFT
tags: [scenarios, epics, bot-platform]
parent: .memory-bank/scenarios/index.md
history:
  - version: 0.7.0
    date: 2026-04-24
    changes: Added `SCN-178` to the EP-008 and EP-022 overlays so the second bounded shared-control-plane verifier anchor is discoverable by epic navigation.
  - version: 0.6.0
    date: 2026-04-23
    changes: Added `SCN-177` to the EP-008 and EP-022 overlays so the shared governed-content/import verifier anchor is discoverable by epic navigation.
  - version: 0.5.0
    date: 2026-04-23
    changes: Added `SCN-176` to the EP-008 and EP-022 overlays so the shared control-plane verifier anchor is discoverable by epic navigation.
  - version: 0.4.0
    date: 2026-04-22
    changes: Added the next framework scenario wave across epic families, including auth-bootstrap, hosted workflow durability, runtime provider/fail-fast governance, and support-package verdict export provenance.
  - version: 0.3.0
    date: 2026-04-22
    changes: Added the first concrete framework scenario doc links so the by-epic overlay now points to landed flat contracts instead of only matrix/spec anchors.
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
  - current anchors: [SCN-001](../SCN-001-typed-sdk-parity.md), [SCN-012](../SCN-012-scenario-auth-bootstrap.md), [SCN-041](../SCN-041-verdict-export-stability-and-provenance.md), [SCN-168](../SCN-168-openai-runtime-provider-registration-and-readiness-projection.md), [SCN-170](../SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md), [SCN-175](../SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md), [SCN-176](../SCN-176-shared-control-plane-channel-binding-and-readback-contract.md), [SCN-177](../SCN-177-shared-governed-content-import-readback-contract.md), [SCN-178](../SCN-178-shared-control-plane-execution-run-and-trace-artifact-readback-contract.md), [Scenario matrix](../scenario-matrix.md), [Verification matrix](../../plans/verification-matrix.md), `spec/scenarios/*`
- `EP-011 Deterministic Hosted Scenarios And Browser Automation`
  - current anchors: [SCN-012](../SCN-012-scenario-auth-bootstrap.md), [SCN-116](../SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md), [SCN-118](../SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md), `spec/scenarios/hosted-beta-execution-model.md`, [Hosted scenarios](../hosted/index.md)
- `EP-022 Agent Execution Platform And Multi-Plane Architecture`
  - current anchors: [SCN-116](../SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md), [SCN-118](../SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md), [SCN-168](../SCN-168-openai-runtime-provider-registration-and-readiness-projection.md), [SCN-170](../SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md), [SCN-175](../SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md), [SCN-176](../SCN-176-shared-control-plane-channel-binding-and-readback-contract.md), [SCN-177](../SCN-177-shared-governed-content-import-readback-contract.md), [SCN-178](../SCN-178-shared-control-plane-execution-run-and-trace-artifact-readback-contract.md), `spec/project/agent-execution-platform-architecture.md`, `spec/architecture/*`, `spec/runtime/*`

Reading rule:
- the flat `SCN-*` file remains canonical;
- this overlay groups them by framework epic families without replacing the scenario matrix or verification matrix.
