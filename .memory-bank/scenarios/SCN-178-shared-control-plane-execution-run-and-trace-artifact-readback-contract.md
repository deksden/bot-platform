---
file: .memory-bank/scenarios/SCN-178-shared-control-plane-execution-run-and-trace-artifact-readback-contract.md
description: SCN-178 - verifies shared control-plane execution-run and trace-artifact readback contracts through bounded runnable-local API-contract proof.
purpose: Use as the second flat framework scenario anchor for the shared control-plane substrate so execution-run and trace-artifact diagnostics readback stay explicit, reproducible, and clearly separated from product dashboards or adoption claims.
version: 0.1.0
date: 2026-04-24
status: ACTIVE
scenario: SCN-178
kind: capability
execution_status: runnable_local
tags: [scenario, scn, bot-platform, control-plane, diagnostics, execution-run, trace-artifact, verifier]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
  - .memory-bank/spec/operations/observability-and-incident-diagnostics.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - packages/api-contract/src/control-plane/read-models.spec.ts
  - .tasks/prt-038-wave2-control-plane-diagnostics-proof/tasks/T041-V2-control-plane-diagnostics-readback-verifier.md
  - .tasks/prt-038-wave2-control-plane-diagnostics-proof/reports/T041-V2-report.md
---

# SCN-178 Shared Control-Plane Execution-Run And Trace-Artifact Readback Contract

## Goal

Prove the second runnable framework-only control-plane substrate slice:
- execution-run read models parse representative shared payloads;
- trace-artifact read models parse representative shared payloads;
- control-plane surface readbacks for `cp-runs` and `cp-trace-artifacts` parse representative shared payloads;
- bounded invalid diagnostics shapes fail explicitly.

This scenario complements `SCN-176`.
It does not replace the channel-binding proof.

## Kind

- `capability`

## Covered Features

- Primary: `shared-control-plane-substrate`
- Secondary: `client-contracts`

## Execution Profile

- Execution modes: `local`
- Automation level: `node:test` over compiled `@dd-bot-platform/api-contract` verifier specs
- Acceptance level: framework verifier anchor
- Hosted gate: not required for this bounded local proof

## Preconditions

- `packages/api-contract` compiles against the current shared control-plane read-model contracts.
- Verifier specs exist in:
  - `packages/api-contract/src/control-plane/read-models.spec.ts`
- Local command lane is available for:
  - `pnpm --filter @dd-bot-platform/api-contract build`
  - `node --test packages/api-contract/dist/control-plane/**/*.spec.js`
  - `pnpm check`

## Hosted Preflight

- `N/A` for this scenario because the proof is intentionally local-only and does not claim hosted readiness.

## Phases

1. Build verifier artifacts
   - What happens: compile `packages/api-contract` sources to `dist`.
   - Expected intermediate outcome: the control-plane verifier spec is emitted to `dist/control-plane/**`.

2. Execute local verifier specs
   - What happens: run `node --test` over the compiled control-plane verifier spec.
   - Expected intermediate outcome: execution-run and trace-artifact read-model assertions pass.

3. Baseline guard
   - What happens: run repo baseline `pnpm check`.
   - Expected intermediate outcome: no regression against the current repo baseline.

## Expected Evidence

- Run ids / flow refs: local command executions recorded in the owning verifier report.
- Key artifacts: compiled `dist` verifier spec and command results.
- Reports / logs: `.tasks/prt-038-wave2-control-plane-diagnostics-proof/reports/T041-V2-report.md`.
- Acceptance outputs: explicit pass/fail outcomes for package build, local verifier execution, and baseline check.

## Pass Criteria

- local verifier specs prove execution-run and trace-artifact readback parsing against representative shared payloads;
- local verifier specs prove `cp-runs` and `cp-trace-artifacts` surface payloads parse under the shared contract;
- bounded invalid diagnostics shapes fail explicitly rather than being silently tolerated;
- no hosted, product dashboard, or downstream adoption claims are made by this scenario anchor.

## Supported Environments

- `local`

## Related Decisions / Docs

- Protocol: [PRT-039 shared control-plane substrate](../plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md)
- Operations: [Control-plane configuration and observability surfaces](../spec/operations/control-plane-configuration-and-observability-surfaces.md)
- Operations: [Observability and incident diagnostics](../spec/operations/observability-and-incident-diagnostics.md)
- Runtime: [Execution traces and token accounting](../spec/runtime/execution-traces-and-token-accounting.md)
- Runtime: [Trace artifact governance](../spec/runtime/trace-artifact-governance.md)

## Notes

- This scenario intentionally anchors only the framework verifier layer and does not claim product adoption or hosted acceptance.
- `SCN-176` remains the channel-binding and accepted-snapshot anchor; `SCN-178` adds bounded diagnostics/readback depth on top of it.
