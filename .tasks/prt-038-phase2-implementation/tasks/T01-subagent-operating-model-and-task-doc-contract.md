---
file: .tasks/prt-038-phase2-implementation/tasks/T01-subagent-operating-model-and-task-doc-contract.md
description: 'Research task for defining the subagent operating model, task-file contract, and execution rules for PRT-038 implementation.'
purpose: 'Read before proposing or executing subagent work so task dispatch, evidence, coding rules, and report formatting are consistent with MBB and project delivery standards.'
version: 1.0.0
date: 2026-04-23
status: ACTIVE
tags: [task, subagents, implementation, mbb, protocol, prt-038]
parent: .tasks/prt-038-phase2-implementation/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/mbb/templates/feature.md
  - .memory-bank/mbb/templates/protocol.md
  - .memory-bank/mbb/delivery-docs-guide.md
  - .memory-bank/mbb/scenario-docs-guide.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
---

# Task T01: Subagent Operating Model And Task-Doc Contract

## Purpose

Define how implementation work under `PRT-038/039/040` should be delegated to subagents:
- what a task file must contain;
- what context a subagent must gather before touching code or docs;
- how task reports must be written;
- what implementation rules and anti-patterns must be restated to subagents every time.

## Scope / non-goals

### In scope
- derive a reusable task-file contract for implementation tasks;
- define required grounding/context collection before subagent execution;
- define coding/doc/testing expectations that must be reiterated inside each task;
- define report format and verification expectations for completed subagent work.

### Non-goals
- do not produce the final implementation task graph for all workstreams;
- do not implement code;
- do not redesign MBB itself.

## Affected areas

- subagent dispatch workflow for `.tasks/`
- MBB-aligned task documentation
- implementation evidence discipline
- code/doc/test verification expectations

## Context (SSoT links)

- `.memory-bank/mbb/templates/feature.md` — task file should be feature-like, with grounding, risks, scope, acceptance intent, and closure criteria.
- `.memory-bank/mbb/templates/protocol.md` — task/report should fit curated execution/evidence expectations.
- `.memory-bank/mbb/delivery-docs-guide.md` — task docs must not invent a competing doc type or duplicate normative design.
- `.memory-bank/mbb/scenario-docs-guide.md` — verification and scenario maturity language must stay honest.
- `.memory-bank/spec/engineering/delivery-standards.md` — quality gates, hosted/security expectations, and closure evidence.
- `.memory-bank/spec/engineering/coding-style.md` — coding rules and expected implementation discipline.
- `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md` — umbrella execution model and product handshake.
- `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md` — control-plane implementation and closure rules.
- `.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md` — import/governed-content implementation and closure rules.

## Project grounding (mandatory before reporting)

- [ ] Task file read fully.
- [ ] Relevant MBB templates and delivery guides read.
- [ ] Relevant coding/delivery standards read.
- [ ] Relevant convergence protocols read.
- [ ] Clear distinction made between normative protocol docs and `.tasks` execution artifacts.
- [ ] Risks of over-delegation, overlap, hidden write conflicts, and shallow evidence are considered explicitly.

## Required research

Investigate and explain:
- what sections a subagent task file must always include;
- what implementation context must be gathered before starting work;
- how to encode constraints, anti-goals, coding rules, and thin spots/risk notes inside the task;
- what must count as “done” for a subagent task;
- what the required report format should be;
- what a verifier subagent later needs in order to validate another subagent's work.

## Task

Produce a recommendation packet that answers all of the following:
1. What is the minimal but sufficient MBB-like structure for a subagent task file in `.tasks/`?
2. What must every task file explicitly require the subagent to read or inspect before coding?
3. Which standards/rules must be re-linked in every task to avoid drift?
4. What should be considered successful completion of an implementation task?
5. What should always be forbidden or discouraged in subagent execution?
6. What written report structure best supports later human/main-agent review and verifier-agent review?

## Required output

Write the report only to:
- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-phase2-implementation/reports/T01-report.md`

The report must contain:
- executive recommendation;
- proposed task-file structure;
- mandatory grounding/context rules;
- mandatory coding/doc/testing constraints to restate in tasks;
- explicit do / avoid list;
- definition-of-done checklist;
- report-format template for implementation subagents;
- verifier-input checklist.

## Important constraints

- Do not edit protocol docs directly.
- Do not invent new permanent MBB doc types.
- Do not recommend vague “just read the codebase” instructions; make context-gathering concrete.
- Do not recommend open-ended report prose without structure.
- Do not blur the difference between implementation task, verification task, and protocol/spec.

## Risks to watch

- task files becoming too vague to safely delegate;
- task files becoming too long and unfocused to execute efficiently;
- missing grounding steps causing unsafe code changes;
- missing report structure making later review impossible;
- subagent tasks overlapping in write scope.

## Definition of done

This task is complete only if the report gives:
- a concrete reusable task-file contract;
- a concrete reusable report contract;
- explicit grounding and verification requirements;
- explicit anti-patterns to avoid;
- enough detail that future implementation tasks can be authored from it without guessing.
