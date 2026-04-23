---
file: .memory-bank/scenarios/SCN-177-shared-governed-content-import-readback-contract.md
description: SCN-177 - verifies the shared governed-content/import substrate stays honest across source-processing, lifecycle guards, idempotency keys, conflict checks, and API readback parsing through runnable local proof.
purpose: Use as the first flat framework-owned governed-content/import scenario so `bot-platform` has one local runnable verification anchor for the shared substrate before any product adoption claims are made.
version: 0.1.0
date: 2026-04-23
status: ACTIVE
scenario: SCN-177
kind: capability
execution_status: runnable_local
tags: [scenario, scn, bot-platform, governed-content, import, api-contract, framework]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/spec/scenarios/scenario-system-and-evidence.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/spec/runtime/workflow-framework-contract.md
  - .memory-bank/plans/verification-matrix.md
  - packages/core/src/governed-content/governed-content.verifier.spec.ts
  - packages/api-contract/src/governed-content/read-models.spec.ts
---

# SCN-177 Shared Governed-Content Import Readback Contract

## Goal

Prove that the shared governed-content/import substrate is runnable and honest at framework level:
- source-processing bundles expose explicit supported/degraded/unsupported outcomes;
- import lifecycle, idempotency, and conflict guards enforce the documented shared invariants;
- governed-content readback schemas accept representative shared payloads and reject bounded invalid shapes.

## Kind

- `capability`

## Covered Features

- Primary: `shared-governed-content-and-import-substrate`
- Secondary: `workflow-framework`

## Execution Profile

- Execution modes: `local`
- Automation level: `node:test` over compiled package artifacts
- Acceptance level: framework contract proof
- Beta gate: not required for this first shared local verifier slice

## Preconditions

- `packages/core` and `packages/api-contract` compile successfully to `dist`
- the governed-content verifier specs are present in the package source trees
- the run uses the existing package build pipeline rather than a new test harness

## Hosted Preflight

- `N/A` for this scenario because the proof is intentionally local-only and does not claim hosted readiness

## Fixtures

- Fixture project: repository-local representative governed-content payloads embedded in the verifier specs
- Fixture providers / profiles: none
- Required plugins: none
- Required external tooling / CLI: Node.js built-in `node:test`, `pnpm`

## Phases

1. Build the shared package artifacts
   - What happens: `packages/core` and `packages/api-contract` compile the governed-content spec files into `dist`.
   - Expected intermediate outcome: runnable compiled verifier artifacts exist without any new package script or framework.
   - Evidence: package build output and emitted `dist/governed-content/*.spec.js` files.

2. Execute the governed-content verifier specs
   - What happens: Node executes the compiled governed-content spec files directly from `dist`.
   - Expected intermediate outcome: source-processing honesty, lifecycle/idempotency/conflict invariants, and API readback parsing all pass under local proof.
   - Evidence: `node --test packages/core/dist/governed-content/**/*.spec.js packages/api-contract/dist/governed-content/**/*.spec.js`.

3. Inspect bounded invalid cases
   - What happens: the specs exercise dishonest unsupported bundle input, invalid lifecycle transitions, incomplete semantic-key input, typed conflict cases, and an invalid API-contract payload.
   - Expected intermediate outcome: failures are explicit, typed, and framework-owned rather than silently tolerated.
   - Evidence: assertions inside the same local verifier run.

## Expected Evidence

- Run ids / flow refs: local `node:test` run output for compiled governed-content verifier specs
- Key artifacts: compiled `dist` spec files for `packages/core` and `packages/api-contract`
- Reports / screenshots / logs: verifier report in `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-V1-report.md`
- Acceptance outputs: one local runnable framework proof for the governed-content/import substrate
- Hosted UI proof: `N/A`
- Hosted protected API / read-model proof: `N/A`
- Hosted bootstrap/session proof: `N/A`
- External manual proof if applicable: `N/A`

## Environment Evidence

- Local / dev evidence: package builds, direct `node --test` execution against compiled `dist` specs, and `pnpm check`
- Beta / live evidence: `N/A` for this first framework-only verifier slice
- Release-close evidence: `N/A` because this scenario does not claim deploy or product-adoption closure

## Pass Criteria

- honest supported/degraded source-processing bundles succeed and dishonest unsupported payloads fail explicitly
- the documented import lifecycle path is allowed and at least one invalid transition is rejected
- semantic import and revision keys are deterministic and reject incomplete inputs
- conflict guards distinguish stale state, duplicate import/source-revision collisions, and activation conflicts
- governed-content read models parse representative shared payloads and reject at least one bounded invalid shape
- the proof remains framework-only and does not claim hosted verification, product activation, or product adoption truth

## Supported Environments

- `local`

## Related Decisions / Docs

- Protocol: [PRT-040](../plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md)
- Scenario model: [Scenario system and evidence](../spec/scenarios/scenario-system-and-evidence.md)
- Runtime: [Scenario system framework contract](../spec/runtime/scenario-system-framework-contract.md)
- Runtime: [Workflow framework contract](../spec/runtime/workflow-framework-contract.md)

## Notes

- This scenario is intentionally framework-only and limited to local runnable proof for the shared substrate.
- Product review, activation, storage ownership, hosted readiness, and product adoption evidence remain outside this scenario.
