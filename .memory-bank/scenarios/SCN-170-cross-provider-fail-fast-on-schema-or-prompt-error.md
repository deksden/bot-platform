---
file: .memory-bank/scenarios/SCN-170-cross-provider-fail-fast-on-schema-or-prompt-error.md
description: SCN-170 - verifies that schema or prompt defects remain fail-fast runtime errors and do not trigger cross-provider failover to another target.
purpose: Use as the runtime-kernel fail-fast anchor so `bot-platform` owns cross-provider error-class governance and diagnostics without importing product routing semantics.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
scenario: SCN-170
kind: capability
execution_status: planned
tags: [scenario, scn, bot-platform, runtime, fail-fast, diagnostics]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - .memory-bank/plans/verification-matrix.md
---

# SCN-170 Cross-Provider Fail-Fast On Schema Or Prompt Error

## Goal

Prove that governed runtime fail-fast classes remain explicit even across provider boundaries:
- schema or prompt defects stop execution at the current target instead of silently failing over to the next provider;
- diagnostics and trace evidence make the blocked transition explicit;
- cross-provider fallback policy stays governed by error class rather than by undocumented "try the next provider" behavior.

## Kind

- `capability`

## Covered Features

- Primary: `runtime-kernel`
- Secondary: `support-packages`

## Execution Profile

- Execution modes: `local`
- Automation level: scenario or integration harness
- Acceptance level: framework fail-fast/governance anchor
- Beta gate: optional follow-up when hosted policy editors become the main framework surface

## Preconditions

- one governed runtime path can resolve a multi-target provider chain;
- one fixture target can produce a schema or prompt defect classified as fail-fast;
- trace and fallback diagnostics capture are enabled;
- runtime evidence can be inspected without product reply-routing or business-side delivery semantics.

## Phases

1. Seed mixed-provider target chain
   - What happens: the framework runtime resolves a chain where the first target and the fallback target belong to different provider kinds.
   - Expected intermediate outcome: the chain is valid before execution begins.

2. Trigger fail-fast defect
   - What happens: the first target hits a schema or prompt defect that belongs to the fail-fast class.
   - Expected intermediate outcome: execution stops at that target rather than continuing to the next provider.

3. Inspect fallback and trace evidence
   - What happens: fallback events, trace records, and diagnostics snapshots are read back.
   - Expected intermediate outcome: emitted evidence shows that failover was intentionally blocked by policy.

## Expected Evidence

- Run ids / flow refs: execution run id, step/attempt refs
- Key artifacts: policy or target fixture snapshot, fallback diagnostics, trace or anomaly output
- Reports / screenshots / logs: runtime governance report and explicit fail-fast diagnostic event
- Acceptance outputs: proof that cross-provider fallback remains governed and fail-fast classes do not silently degrade

## Pass Criteria

- a schema or prompt defect does not trigger cross-provider failover;
- fallback diagnostics explicitly record that the transition was blocked by policy or error class;
- runtime traces account only for the attempted target and preserve explicit failure evidence;
- the contract stays framework-only and does not depend on product-specific channel routing, reply generation, or business outcome handling.

## Supported Environments

- `local`

## Related Decisions / Docs

- Runtime: [Agent execution kernel](../spec/runtime/agent-execution-kernel.md)
- Runtime: [Execution traces and token accounting](../spec/runtime/execution-traces-and-token-accounting.md)
- Runtime: [Trace artifact governance](../spec/runtime/trace-artifact-governance.md)

## Notes

- This scenario focuses on error-class governance and evidence shape.
- Product prompt content, product fallback policies beyond the shared error classes, and product delivery behavior remain outside framework ownership.
