---
file: .memory-bank/scenarios/SCN-118-hosted-hobby-safe-long-transcript-replay-via-workflow-host.md
description: SCN-118 - verifies that a long-running transcript-style replay job completes on hosted infrastructure through the protected workflow host without relying on one blocking request.
purpose: Use as the hosted durability anchor for the workflow framework so `bot-platform` owns the shared async replay-style contract without importing product replay content or workflow families.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
scenario: SCN-118
kind: capability
execution_status: planned
tags: [scenario, scn, bot-platform, workflow, hosted, durability]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/spec/runtime/workflow-framework-contract.md
  - .memory-bank/spec/architecture/containers/workflow-host.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/plans/verification-matrix.md
---

# SCN-118 Hosted Hobby-Safe Long Transcript Replay Via Workflow Host

## Goal

Prove that the framework workflow host can carry one long-running replay-style job on hosted infrastructure:
- the job starts through the protected workflow-host contract instead of one long synchronous request;
- lifecycle status remains observable while the job spans multiple durable steps;
- the hosted execution model remains compatible with hobby-safe constraints and bounded async orchestration.

## Kind

- `capability`

## Covered Features

- Primary: `workflow-framework`
- Secondary: `scenario-system`

## Execution Profile

- Execution modes: `local`, later `beta_api`
- Automation level: protected API or workflow-harness proof
- Acceptance level: hosted durability anchor
- Beta gate: required before shared hosted workflow durability claims closure

## Preconditions

- one workflow-host contour is deployed behind the canonical server boundary;
- protected internal auth for workflow start/status surfaces is available;
- one framework-owned long-running fixture payload exists with transcript-style size or duration characteristics but without product-specific replay semantics;
- lifecycle/status reads can be collected without depending on browser-only evidence.

## Hosted Preflight

- hosted proof must use `beta_api` as the primary contour and keep browser/manual layers out unless they add governed value;
- the run must prove it targets the stable beta deployment pair rather than a preview alias;
- environment identity, protected host access, and durable-step readiness must be established before the long-running job is started.

## Phases

1. Start one long-running hosted job
   - What happens: one replay-style durable job is started through the protected workflow-host contour.
   - Expected intermediate outcome: the job is accepted without requiring one blocking request to carry the full work.

2. Observe lifecycle progression
   - What happens: lifecycle/status surfaces are read while the hosted job advances through durable steps.
   - Expected intermediate outcome: queued, running, retry, or resume states remain observable through the framework contract.

3. Confirm terminal durability evidence
   - What happens: terminal status, trace linkage, and bounded output artifacts are inspected.
   - Expected intermediate outcome: hosted completion is provable through canonical workflow-host evidence rather than product UI projections.

## Expected Evidence

- Run ids / flow refs: workflow run id, protected request ids, hosted trace refs
- Key artifacts: start payload snapshot, lifecycle-status snapshots, terminal-status evidence, durable-step or trace summary
- Reports / screenshots / logs: hosted scenario or contract report
- Acceptance outputs: proof that hosted long-running workflow execution is protected, durable, and observable

## Pass Criteria

- the long-running job completes on hosted infrastructure through the workflow host;
- no single long synchronous request is required for success;
- lifecycle progression and terminal outcome remain observable through framework-owned status/readback surfaces;
- the proof stays framework-only and does not depend on product transcript content, result materialization, or product workflow-family registries.

## Supported Environments

- `local`
- later `beta_api`

## Related Decisions / Docs

- Runtime: [Workflow framework contract](../spec/runtime/workflow-framework-contract.md)
- Container: [Workflow host](../spec/architecture/containers/workflow-host.md)
- Scenario model: [Hosted beta execution model](../spec/scenarios/hosted-beta-execution-model.md)

## Notes

- This scenario intentionally treats "long transcript replay" as a reusable replay-style durability pattern, not as product replay truth.
- Product-specific transcript sources, replay outputs, and business-side workflow consequences remain product-owned.
