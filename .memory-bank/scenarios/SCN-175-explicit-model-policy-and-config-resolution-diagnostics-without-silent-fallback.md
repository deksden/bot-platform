---
file: .memory-bank/scenarios/SCN-175-explicit-model-policy-and-config-resolution-diagnostics-without-silent-fallback.md
description: SCN-175 - verifies missing or invalid model-policy/config resolution fails with explicit diagnostics instead of silently degrading through undocumented fallback behavior.
purpose: Use as a framework runtime-kernel contract anchor so model-policy and execution-path configuration stays explicit, diagnosable, and aligned with no-silent-fallback rules.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
scenario: SCN-175
kind: capability
execution_status: planned
tags: [scenario, scn, bot-platform, runtime, diagnostics, fallback]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - .memory-bank/spec/operations/observability-and-incident-diagnostics.md
  - .memory-bank/plans/verification-matrix.md
---

# SCN-175 Explicit Model Policy And Config Resolution Diagnostics Without Silent Fallback

## Goal

Prove that missing or invalid policy/config resolution does not get silently swallowed:
- broken resolution becomes explicit failure or explicit bounded compatibility evidence;
- diagnostics contain stable correlation ids and reason codes;
- the runtime path does not silently switch to an undocumented fallback target.

## Kind

- `capability`

## Covered Features

- Primary: `runtime-kernel`
- Secondary: `auth-framework`

## Execution Profile

- Execution modes: `local`
- Automation level: scenario or integration harness
- Acceptance level: framework diagnostics anchor
- Beta gate: optional follow-up when hosted control-plane editors become the main framework policy surface

## Preconditions

- one runtime path requests an explicit model or policy role key;
- one fixture configuration makes that resolution missing, invalid, or disabled;
- diagnostics capture is enabled;
- the runtime kernel can emit trace and anomaly evidence without product-specific assumptions.

## Phases

1. Broken resolution attempt
   - What happens: the framework runtime requests an undeclared role or invalid policy target.
   - Expected intermediate outcome: explicit failure or explicit compatibility evidence is emitted instead of silent fallback.

2. Observability verification
   - What happens: diagnostics and trace evidence are inspected.
   - Expected intermediate outcome: stable identifiers and machine-meaningful reason codes are present.

## Expected Evidence

- Run ids / flow refs: scenario or integration run id
- Key artifacts: broken policy fixture, trace or anomaly output, diagnostics snapshot
- Reports / screenshots / logs: explicit diagnostic event or bounded compatibility evidence
- Acceptance outputs: proof that the runtime kernel remains explicit and diagnosable

## Pass Criteria

- missing or invalid policy/config resolution does not silently choose an undocumented target;
- emitted diagnostics include stable correlation identifiers and meaningful reasons;
- canonical runtime diagnostics snapshots make the failure mode explicit;
- if compatibility behavior still exists, it is surfaced as explicit bounded evidence rather than normal success.

## Supported Environments

- `local`

## Related Decisions / Docs

- Runtime: [Agent execution kernel](../spec/runtime/agent-execution-kernel.md)
- Runtime: [Execution traces and token accounting](../spec/runtime/execution-traces-and-token-accounting.md)
- Runtime: [Trace artifact governance](../spec/runtime/trace-artifact-governance.md)
- Ops: [Observability and incident diagnostics](../spec/operations/observability-and-incident-diagnostics.md)

## Notes

- This scenario is intentionally framework-only and should not encode SellerAgent or Docoved policy semantics.
- The target-repo contract is now canonical even though the runnable harness still needs further migration into `bot-platform`.
