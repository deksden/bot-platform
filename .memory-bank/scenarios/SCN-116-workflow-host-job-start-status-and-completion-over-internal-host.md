---
file: .memory-bank/scenarios/SCN-116-workflow-host-job-start-status-and-completion-over-internal-host.md
description: SCN-116 - verifies that the workflow host remains behind the canonical server boundary, starts a protected workflow run, and exposes observable lifecycle status.
purpose: Use as the first workflow-framework topology/access anchor so the shared workflow host contract is owned by `bot-platform` before product-specific workflow families layer on top.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
scenario: SCN-116
kind: capability
execution_status: planned
tags: [scenario, scn, bot-platform, workflow, host, framework]
parent: .memory-bank/scenarios/index.md
related_files:
  - .memory-bank/spec/architecture/containers/workflow-host.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/plans/verification-matrix.md
---

# SCN-116 Workflow Host Job Start Status And Completion Over Internal Host

## Goal

Prove that the shared workflow-host topology is real:
- the canonical server boundary remains the only public API surface;
- the workflow host exists as a protected internal sidecar or equivalent framework-owned contour;
- one protected workflow run can be started and observed through lifecycle status without opening a second public API surface.

## Kind

- `capability`

## Covered Features

- Primary: `workflow-framework`
- Secondary: `scenario-system`

## Execution Profile

- Execution modes: `local`, later `beta_api`
- Automation level: protected API or contract harness
- Acceptance level: framework topology/access anchor
- Beta gate: required before shared hosted workflow claims closure

## Preconditions

- a workflow-host contour is configured behind the canonical server boundary;
- protected internal auth for host routes is available;
- one minimal workflow family can be started without product-specific payload semantics.

## Hosted Preflight

- hosted proof must respect the framework hosted contour taxonomy (`beta_api` first, browser only if it adds governed value);
- the hosted run must prove it targets the stable beta deployment pair, not a preview alias.

## Phases

1. Confirm topology and access control
   - What happens: the framework surfaces advertise workflow-host topology and reject accidental public access.
   - Expected intermediate outcome: only the protected internal contract can start or observe the workflow run.

2. Start one protected workflow run
   - What happens: one framework-owned workflow run is started through the protected host contour.
   - Expected intermediate outcome: the run reaches observable lifecycle states without one long synchronous request.

3. Read lifecycle status
   - What happens: lifecycle status is read back through the canonical protected contour.
   - Expected intermediate outcome: run state stays observable and diagnosable through one framework-owned contract.

## Expected Evidence

- Run ids / flow refs: workflow run id, protected request ids
- Key artifacts: host topology readback, lifecycle status payload, terminal status evidence
- Reports / screenshots / logs: framework scenario or contract report
- Acceptance outputs: proof that the workflow host is real, protected, and observable

## Pass Criteria

- the canonical server boundary remains the only public surface;
- protected host routes reject accidental public access;
- one workflow run can be started and its lifecycle status is observable through the protected host contour;
- no second public replay or workflow API is required as a substitute.

## Supported Environments

- `local`
- later `beta_api`

## Related Decisions / Docs

- Container: [Workflow host](../spec/architecture/containers/workflow-host.md)
- Scenario model: [Hosted beta execution model](../spec/scenarios/hosted-beta-execution-model.md)
- Runtime: [Agent execution kernel](../spec/runtime/agent-execution-kernel.md)

## Notes

- This scenario intentionally stops at shared workflow-host topology and lifecycle visibility.
- Product replay content, result materialization, and domain workflow semantics remain product-owned follow-on layers.
