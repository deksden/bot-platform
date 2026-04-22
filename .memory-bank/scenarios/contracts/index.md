---
file: .memory-bank/scenarios/contracts/index.md
description: 'Framework contract scenario index for bot-platform.'
purpose: Collect framework contract verification scenarios.
version: 0.3.0
date: 2026-04-22
status: DRAFT
tags: [scenarios, contracts, bot-platform]
parent: .memory-bank/scenarios/index.md
history:
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
- [SCN-116 Workflow host job start status and completion over internal host](../SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md)
- [SCN-175 Explicit model policy and config resolution diagnostics without silent fallback](../SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md)

## Contract families (framework-only)

- `client-contracts`
  - contract anchors: `spec/client-api/index.md`, `spec/client-api/api-namespace-registry.md`, `spec/client-api/typed-client-api-and-sdk.md`
  - bridge reality: extracted `@dd-bot-platform/api-contract`
- `auth-framework`
  - contract anchors: `spec/security/auth-core.md`, `spec/security/auth-and-access.md`
- `runtime-kernel`
  - contract anchors: `spec/runtime/agent-execution-kernel.md`, `spec/runtime/pipeline-registry-and-binding-contract.md`, trace/evidence governance docs under `spec/runtime/`
- `persistence-interfaces` (contract-only)
  - contract anchor: `spec/runtime/persistence-interface-and-store-boundary.md`
- `command-framework` (gated)
  - anchor: `spec/runtime/index.md` + [Feature registry](../../plans/epics/framework-feature-registry.md)
- `workflow-framework` (gated)
  - anchors: `spec/runtime/index.md`, `spec/architecture/containers/workflow-host.md`

Reading rule:
- the flat `SCN-*` file is canonical;
- this hub is a navigation overlay;
- future framework contract scenarios should stay flat under `scenarios/` and be linked here by family.
