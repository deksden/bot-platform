---
file: .memory-bank/scenarios/contracts/index.md
description: 'Framework contract scenario index for bot-platform.'
purpose: Collect framework contract verification scenarios.
version: 0.8.0
date: 2026-04-24
status: DRAFT
tags: [scenarios, contracts, bot-platform]
parent: .memory-bank/scenarios/index.md
history:
  - version: 0.8.0
    date: 2026-04-24
    changes: Added `SCN-221` and expanded the shared-control-plane contract family so observability-event evidence is discoverable from the framework contract scenario hub.
  - version: 0.7.0
    date: 2026-04-24
    changes: Added `SCN-178` and expanded the shared-control-plane contract family so bounded diagnostics and trace readback proof is discoverable from the framework contract scenario hub.
  - version: 0.6.0
    date: 2026-04-23
    changes: Added `SCN-177` and the shared governed-content/import contract family so governed-content verifier proof is discoverable from the framework contract scenario hub.
  - version: 0.5.0
    date: 2026-04-23
    changes: Added `SCN-176` and the shared-control-plane contract family so control-plane verifier proof is discoverable from the framework contract scenario hub.
  - version: 0.4.0
    date: 2026-04-22
    changes: Added repo-local contract scenario links for auth bootstrap, verdict export provenance, provider registration/readiness, and cross-provider fail-fast governance; linked the new workflow/command runtime contracts for the remaining command/workflow families.
  - version: 0.3.0
    date: 2026-04-22
    changes: Added the first concrete framework contract scenario docs (`SCN-001`, `SCN-116`, `SCN-175`) and turned the hub into a real flat-contract navigation surface.
  - version: 0.2.0
    date: 2026-04-22
    changes: Actualized the contract-scenario index to align with the feature registry, the scenario matrix, and landed contract specs, replacing placeholder wording with current navigation anchors.
---

# Contract Scenarios

This hub covers framework-owned contract verification.
It excludes product journeys and product acceptance overlays.

Current flat framework contract docs:
- [SCN-001 Typed SDK parity](../SCN-001-typed-sdk-parity.md)
- [SCN-012 Scenario auth bootstrap](../SCN-012-scenario-auth-bootstrap.md)
- [SCN-041 Verdict export stability and provenance](../SCN-041-verdict-export-stability-and-provenance.md)
- [SCN-116 Workflow host job start status and completion over internal host](../SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md)
- [SCN-118 Hosted hobby-safe long transcript replay via workflow host](../SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md)
- [SCN-168 OpenAI runtime provider registration and readiness projection](../SCN-168-openai-runtime-provider-registration-and-readiness-projection.md)
- [SCN-170 Cross-provider fail-fast on schema or prompt error](../SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md)
- [SCN-175 Explicit model policy and config resolution diagnostics without silent fallback](../SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md)
- [SCN-176 Shared control-plane channel binding and readback contract](../SCN-176-shared-control-plane-channel-binding-and-readback-contract.md)
- [SCN-177 Shared governed-content import readback contract](../SCN-177-shared-governed-content-import-readback-contract.md)
- [SCN-178 Shared control-plane execution-run and trace-artifact readback contract](../SCN-178-shared-control-plane-execution-run-and-trace-artifact-readback-contract.md)
- [SCN-221 Shared control-plane observability-event evidence contract](../SCN-221-shared-control-plane-observability-event-evidence-contract.md)

## Contract families (framework-only)

- `client-contracts`
  - contract anchors: `spec/client-api/index.md`, `spec/client-api/api-namespace-registry.md`, `spec/client-api/typed-client-api-and-sdk.md`
  - bridge reality: extracted `@dd-bot-platform/api-contract`
- `auth-framework`
  - contract anchors: [SCN-012](../SCN-012-scenario-auth-bootstrap.md), `spec/security/auth-core.md`, `spec/security/auth-and-access.md`
- `shared-control-plane-substrate`
  - contract anchors: [SCN-176](../SCN-176-shared-control-plane-channel-binding-and-readback-contract.md), [SCN-178](../SCN-178-shared-control-plane-execution-run-and-trace-artifact-readback-contract.md), [SCN-221](../SCN-221-shared-control-plane-observability-event-evidence-contract.md), `plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`, `spec/operations/control-plane-configuration-and-observability-surfaces.md`, `spec/security/auth-and-access.md`
- `shared-governed-content-and-import-substrate`
  - contract anchors: [SCN-177](../SCN-177-shared-governed-content-import-readback-contract.md), `plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`, `spec/runtime/workflow-framework-contract.md`, `spec/runtime/persistence-interface-and-store-boundary.md`
- `runtime-kernel`
  - contract anchors: [SCN-168](../SCN-168-openai-runtime-provider-registration-and-readiness-projection.md), [SCN-170](../SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md), [SCN-175](../SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md), `spec/runtime/agent-execution-kernel.md`, `spec/runtime/pipeline-registry-and-binding-contract.md`, trace/evidence governance docs under `spec/runtime/`
- `persistence-interfaces` (contract-only)
  - contract anchor: `spec/runtime/persistence-interface-and-store-boundary.md`
- `command-framework`
  - anchors: `spec/runtime/command-framework-contract.md`, `spec/runtime/index.md`, [Feature registry](../../plans/epics/framework-feature-registry.md)
- `workflow-framework`
  - anchors: [SCN-116](../SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md), [SCN-118](../SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md), `spec/runtime/workflow-framework-contract.md`, `spec/architecture/containers/workflow-host.md`
- `support-packages`
  - contract anchors: [SCN-041](../SCN-041-verdict-export-stability-and-provenance.md), `spec/runtime/execution-traces-and-token-accounting.md`, `spec/runtime/trace-artifact-governance.md`

Reading rule:
- the flat `SCN-*` file is canonical;
- this hub is a navigation overlay;
- future framework contract scenarios should stay flat under `scenarios/` and be linked here by family.
