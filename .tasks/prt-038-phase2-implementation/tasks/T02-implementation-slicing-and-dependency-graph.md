---
file: .tasks/prt-038-phase2-implementation/tasks/T02-implementation-slicing-and-dependency-graph.md
description: 'Research task for breaking PRT-038 implementation into optimal task slices, dependency edges, and parallelizable work packages.'
purpose: 'Read before implementation planning so the convergence program is decomposed into bounded, non-overlapping tasks with a clear dependency graph and parallel execution strategy.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [task, implementation, slicing, dependencies, parallelism, prt-038]
parent: .tasks/prt-038-phase2-implementation/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/plans/current-status-report.md
---

# Task T02: Implementation Slicing And Dependency Graph

## Purpose

Define the implementation task graph for the hardened convergence packet:
- how to slice the work into bounded tasks of optimal size for subagents;
- what depends on what;
- what can run in parallel safely;
- where write scopes must remain disjoint.

## Scope / non-goals

### In scope
- analyze the hardened `PRT-038/039/040` packet as an implementation program;
- identify natural work packages in `bot-platform`;
- group them into dependency-aware task slices;
- identify likely product-handshake and shared-seam milestones;
- identify follow-up verification tasks that should exist after implementation tasks.

### Non-goals
- do not implement the code;
- do not define product-repo implementation details beyond handshake boundaries;
- do not produce verification commands in full detail beyond what is needed for the task graph.

## Affected areas

- `bot-platform` implementation workstreams W1/W2
- shared-control-plane substrate
- shared-governed-content/import substrate
- future product adoption handoff

## Context (SSoT links)

- `PRT-038` — umbrella workstreams, phase taxonomy, product handshake, anti-contamination rules.
- `PRT-039` — control-plane implementation scope, authority, UI-doc, verification, and closure gates.
- `PRT-040` — governed-content/import implementation scope, lifecycle, idempotency, UI-doc, and closure gates.
- `feature-area-boundaries.md` — what belongs in `bot-platform` and what must remain product-local.
- `boundaries.md` — framework vs product ownership.
- `pipeline-registry-and-binding-contract.md` — existing reusable seam that likely affects channel/binding work.
- `current-status-report.md` — what is already landed and what still reads as next-wave work.

## Project grounding (mandatory before reporting)

- [ ] Hardened `PRT-038/039/040` read fully.
- [ ] Boundary docs read.
- [ ] Existing reusable seams and likely first implementation anchors inspected.
- [ ] Product-local implementation is kept out of platform-owned write scope.
- [ ] Hidden overlap risks and cross-task conflicts explicitly considered.

## Required research

Investigate and explain:
- what the optimal implementation slices are for `bot-platform`;
- what work must happen strictly before other work;
- what can be parallelized without overlapping write scope;
- where a dedicated verifier subagent task should follow an implementation task;
- what milestones should gate product adoption work in SellerAgent/Docoved.

## Task

Produce a task graph recommendation that answers:
1. What are the first implementation tasks to open in `bot-platform`?
2. How should `PRT-039` work be decomposed?
3. How should `PRT-040` work be decomposed?
4. Which tasks are serial prerequisites and which are parallelizable?
5. Where should verification tasks be inserted?
6. What should count as the “start point” after which product-repo agents may safely begin implementation against the shared platform layer?

## Required output

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-phase2-implementation/reports/T02-report.md`

The report must contain:
- recommended task list with stable task ids;
- dependency graph in readable text form;
- explicit parallelization opportunities;
- suggested task boundaries and disjoint write scopes;
- milestone gates;
- recommended order of verifier tasks;
- risks of bad slicing and what to avoid.

## Important constraints

- Do not propose tasks that are too large for one subagent to complete safely.
- Do not propose overlapping write scopes unless a serial dependency is explicit.
- Do not shift product-owned semantics or product-repo work into `bot-platform`.
- Do not recommend speculative infrastructure tasks without first-wave value.
- Prefer reuse of existing seams over inventing new generic layers.

## Risks to watch

- one task owning too many files and concerns;
- hidden overlap between control-plane and governed-content tasks;
- premature product adoption before shared seams are stable enough;
- tasks that are “conceptually neat” but impossible to verify independently;
- forgetting verifier tasks and leaving integration risk until the end.

## Definition of done

This task is complete only if the report provides:
- a usable implementation task graph;
- explicit dependency edges;
- explicit parallel tasks;
- explicit milestone gates;
- explicit non-overlapping task boundaries suitable for subagent execution.
