---
file: .memory-bank/scenarios/SCN-001-typed-sdk-parity.md
description: SCN-001 - verifies that the typed API contract and first-party client SDK expose one shared framework boundary across first-party surfaces.
purpose: Use as the first framework contract scenario for client-boundary parity so `bot-platform` owns the shared SDK/API contract independently from product acceptance.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
scenario: SCN-001
kind: capability
execution_status: planned
tags: [scenario, scn, bot-platform, sdk, api-contract, framework]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/spec/client-api/typed-client-api-and-sdk.md
  - .memory-bank/spec/client-api/api-namespace-registry.md
  - .memory-bank/spec/scenarios/scenario-system-and-evidence.md
  - .memory-bank/plans/verification-matrix.md
---

# SCN-001 Typed SDK Parity

## Goal

Prove that typed contract and client SDK are a real shared framework boundary:
- first-party surfaces read one canonical contract shape;
- one shared operation path runs through the same SDK boundary;
- no client-specific ad hoc transport logic is required outside that shared layer.

## Kind

- `capability`

## Covered Features

- Primary: `client-contracts`
- Secondary: `support-packages`

## Execution Profile

- Execution modes: `local`
- Automation level: scenario or contract harness
- Acceptance level: framework contract anchor
- Beta gate: not required for the initial contract proof

## Preconditions

- one framework server boundary is available for the run;
- the typed contract and SDK package surfaces are buildable;
- at least two first-party surfaces can read or execute through the same SDK boundary.

## Phases

1. Read baseline contract surfaces
   - What happens: two first-party surfaces read the same baseline operations or schema.
   - Expected intermediate outcome: one contract shape materializes identically.

2. Execute one shared operation path
   - What happens: both surfaces execute one shared operation through the same SDK.
   - Expected intermediate outcome: no client-specific business logic is required outside the SDK boundary.

## Expected Evidence

- Run ids / flow refs: scenario or contract-run id
- Key artifacts: contract snapshot, SDK output from both surfaces
- Reports / screenshots / logs: contract or scenario report
- Acceptance outputs: proof that first-party surfaces share one typed framework boundary

## Pass Criteria

- CLI and another first-party surface use the same typed boundary;
- no ad hoc transport logic is required outside the shared SDK;
- the proof is framework-level and does not depend on product-specific namespace ownership.

## Supported Environments

- `local`

## Related Decisions / Docs

- Spec: [Typed client API and SDK](../spec/client-api/typed-client-api-and-sdk.md)
- Spec: [API namespace registry](../spec/client-api/api-namespace-registry.md)
- Scenario taxonomy: [Scenario system and evidence](../spec/scenarios/scenario-system-and-evidence.md)

## Notes

- This is a framework contract check, not a SellerAgent or Docoved product journey.
- The target-repo scenario contract is now canonical even though the runnable harness is still transitioning from the mixed repo.
