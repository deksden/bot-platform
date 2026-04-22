---
file: .memory-bank/scenarios/SCN-168-openai-runtime-provider-registration-and-readiness-projection.md
description: SCN-168 - verifies that the runtime provider registry accepts `openai` as a first-class provider kind and that readiness projections stay generic over provider kind.
purpose: Use as a runtime-kernel provider-registry anchor so `bot-platform` owns generic provider-kind registration and readiness projection without product-specific provider onboarding semantics.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
scenario: SCN-168
kind: capability
execution_status: planned
tags: [scenario, scn, bot-platform, runtime, providers, readiness]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/plans/verification-matrix.md
---

# SCN-168 OpenAI Runtime Provider Registration And Readiness Projection

## Goal

Prove that runtime-provider registration and readiness snapshots remain provider-generic:
- the registry accepts `openai` as a first-class provider kind rather than an exception path;
- readiness projection preserves provider kind and machine-readable status even when credentials are incomplete;
- the framework contract remains generic across provider families instead of encoding one product onboarding flow.

## Kind

- `capability`

## Covered Features

- Primary: `runtime-kernel`
- Secondary: `support-packages`

## Execution Profile

- Execution modes: `local`
- Automation level: scenario or provider-registry harness
- Acceptance level: framework provider-readiness anchor
- Beta gate: not required for the initial contract proof

## Preconditions

- one runtime-provider registry surface exists with explicit provider-kind vocabulary;
- one readiness refresh or projection surface exists for a registered provider;
- the run can omit live provider credentials so configuration-incomplete readiness remains observable without external API dependency.

## Phases

1. Register one `openai` provider entry
   - What happens: the framework registry receives one provider definition with `providerKind = openai`.
   - Expected intermediate outcome: the registry stores `openai` through the same generic shape used for other provider kinds.

2. Refresh readiness projection
   - What happens: one readiness refresh or projection path is executed for the new provider entry.
   - Expected intermediate outcome: readiness surfaces report the provider kind and an explicit incomplete/warn state instead of collapsing to generic failure or hidden fallback.

3. Read provider inventory
   - What happens: the provider inventory/read-model surface is inspected.
   - Expected intermediate outcome: the newly registered provider appears as a normal first-class registry entry.

## Expected Evidence

- Run ids / flow refs: scenario or registry run id
- Key artifacts: provider registration payload, readiness snapshot, provider inventory readback
- Reports / screenshots / logs: provider-registry contract report
- Acceptance outputs: proof that provider-kind registration and readiness projections stay generic across provider families

## Pass Criteria

- the provider registry accepts and persists `providerKind = openai`;
- readiness projection preserves provider kind and emits explicit configuration status when credentials are incomplete;
- the provider inventory includes the registered entry through normal framework registry surfaces;
- the proof remains framework-only and does not depend on product-specific control-plane policy or provider account onboarding UX.

## Supported Environments

- `local`

## Related Decisions / Docs

- Runtime: [Agent execution kernel](../spec/runtime/agent-execution-kernel.md)
- Runtime: [Pipeline registry and binding contract](../spec/runtime/pipeline-registry-and-binding-contract.md)
- Runtime: [Execution traces and token accounting](../spec/runtime/execution-traces-and-token-accounting.md)

## Notes

- This scenario is intentionally about provider registration and readiness projection, not about any one product's provider settings UI or business-default policy.
