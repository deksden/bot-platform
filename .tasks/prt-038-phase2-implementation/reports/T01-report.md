# T01 Report: Subagent Operating Model And Task-Doc Contract

## Executive recommendation

`.tasks/` under `PRT-038/039/040` should be treated as a lean MBB-like execution layer, not as a new normative document type. Each subagent task should be a bounded implementation slice derived from the owning `PRT-*`, `FT-*`, and, when needed, `SPEC-*` surfaces. The task file must be concrete enough to execute safely without guessing, but lean enough that it does not duplicate protocol/spec truth.

The safest default operating model is:
- one task = one bounded slice, one declared write scope, one report file;
- task file = execution contract;
- protocol/spec/feature = normative truth;
- report file = structured evidence and handoff packet for main-agent and verifier-agent review;
- verification work = either explicitly included in the implementation task or split into a separate verification task with its own scope and report.

The main failure modes to prevent are the ones repeatedly called out by the source documents: vague grounding, coding through ambiguity, hidden overlap in write scope, over-generalizing phase-1 seams, and claiming closure from prose or local smoke alone.

## Recommended operating model

### What `.tasks/` is

`.tasks/` should hold execution artifacts for a wave:
- concrete delegated work items;
- bounded research or implementation slices;
- structured reports.

It should not become:
- a competing spec layer;
- a second protocol layer;
- an unstructured implementation diary;
- a place where normative design changes are invented ad hoc.

### Default delegation rule

Every implementation task should declare all of the following up front:
- which upstream document owns the truth;
- which files the subagent may change;
- which docs, code anchors, and verification anchors the subagent must inspect before changing anything;
- which checks must run before the task may be reported as done;
- what report structure the subagent must produce.

### Separation rule

The task contract should explicitly distinguish:
- implementation task: allowed to change code/docs inside a declared write scope;
- verification task: validates another slice, normally with no code write scope except evidence/report updates;
- research task: gathers grounding and recommendations, but does not implement.

This does not create a new MBB doc type; it only classifies `.tasks/` execution artifacts so implementation and verification do not blur together.

## Proposed task-file contract

## Minimal but sufficient frontmatter

```md
---
file: .tasks/[wave]/tasks/Txx-[slug].md
description: Short statement of the delegated slice
purpose: Why this slice exists and what it unblocks
version: 1.0.0
date: YYYY-MM-DD
status: ACTIVE
parent: .tasks/[wave]/index.md
task_type: implementation
protocol: .memory-bank/plans/protocols/PRT-0xx-[slug].md
report_file: .tasks/[wave]/reports/Txx-report.md
related_files:
  - [normative docs]
  - [code anchors]
  - [test / scenario anchors]
write_scope:
  - [allowed path or glob]
no_touch:
  - [forbidden path or glob]
---
```

Required frontmatter fields:
- `file`, `description`, `purpose`, `version`, `date`, `status`, `parent`
- `task_type`
- `protocol`
- `report_file`
- `related_files`
- `write_scope`

Strongly recommended:
- `no_touch` for overlap prevention
- `implementation_files` once concrete code owners are known

## Required body sections

Every implementation task file should contain these sections in this order:

1. `Purpose`
2. `Scope / non-goals`
3. `Write scope / no-touch boundaries`
4. `Context (SSoT links and concrete inspection anchors)`
5. `Project grounding (mandatory before coding)`
6. `Open questions / ambiguity gate`
7. `Task`
8. `Deliverables`
9. `Constraints / anti-goals / required rules`
10. `Verification plan`
11. `Report requirements`
12. `Definition of done`

## Section intent

### `Purpose`

State the delivered outcome, not just the activity.

### `Scope / non-goals`

Keep the slice narrow. Explicitly list what this task does not own so the subagent does not drift into adjacent work.

### `Write scope / no-touch boundaries`

This is mandatory for parallel work. It should name:
- allowed write paths;
- forbidden paths;
- known neighboring tasks or overlap risks, if any.

### `Context (SSoT links and concrete inspection anchors)`

This section must list exact documents and exact repo anchors to inspect. It should not say “read the codebase”.

Minimum expected anchors:
- owning `PRT-*` packet
- any linked `FT-*` / `SPEC-*` doc if the slice depends on them
- `delivery-standards.md`
- `coding-style.md`
- `delivery-docs-guide.md`
- `scenario-docs-guide.md` when verification, hosted acceptance, or scenario maturity matters
- exact implementation files/modules
- exact test files or verification rows/scenario anchors
- exact docs/status surfaces that may need sync

### `Project grounding (mandatory before coding)`

Use a checklist, not prose. The subagent must affirm that the required reading and inspection really happened before code changes begin.

### `Open questions / ambiguity gate`

If contract, boundary, fallback, rollout, ownership, or acceptance semantics are still unclear, the task must say so explicitly and tell the subagent to stop for a research pass instead of coding by guesswork.

### `Task`

Describe the actual requested work in actionable steps or outcomes.

### `Deliverables`

List expected outputs:
- code changes;
- doc/status changes, if in scope;
- tests;
- report file.

### `Constraints / anti-goals / required rules`

Restate the local execution constraints that matter for this slice so they are visible at the point of execution, not only in upstream standards.

### `Verification plan`

Name the concrete checks, scenario rows, hosted proof, security gate, and `N/A` cases expected for the slice.

### `Report requirements`

Bind the output report to a fixed structure so later review does not depend on free-form prose.

### `Definition of done`

Turn closure into a checklist. “Implemented” is not enough.

## Suggested task-file skeleton

```md
# Task Txx: [Title]

## Purpose

[Outcome-focused statement]

## Scope / non-goals

### In scope
- ...

### Non-goals
- ...

## Write scope / no-touch boundaries

### Allowed write scope
- ...

### No-touch
- ...

### Overlap watch
- ...

## Context (SSoT links and inspection anchors)

- [PRT / FT / SPEC doc] — why it matters
- [delivery standard / coding style / guide] — why it matters
- [exact code file/dir] — what to inspect
- [exact test/scenario/verification anchor] — what it proves
- [exact docs/status surfaces] — what may need sync

## Project grounding (mandatory before coding)

- [ ] Task read fully
- [ ] Owning protocol/spec/feature read
- [ ] Required standards/guides read
- [ ] Exact code anchors inspected
- [ ] Exact test/verification anchors inspected
- [ ] Current behavior and no-regression boundaries noted
- [ ] Write-scope and overlap risks checked
- [ ] Security/hosted/migration impact reviewed where relevant
- [ ] Ambiguities listed below or confirmed absent

## Open questions / ambiguity gate

- [question] or `none`
- Implementation must stop for research if any item can materially change contract, ownership, fallback, rollout, or acceptance.

## Task

1. ...
2. ...
3. ...

## Deliverables

- ...

## Constraints / anti-goals / required rules

- ...

## Verification plan

- Local checks:
  - `...`
- Scenario / verification anchors:
  - `...`
- Hosted / security / CI:
  - `...`
- Explicit `N/A` cases:
  - `...`

## Report requirements

- Write report only to `.../reports/Txx-report.md`
- Use the required report template below
- Include explicit `N/A` reasons for anything not run or not applicable

## Definition of done

- [ ] ...
```

## Mandatory grounding and context rules

Every task should explicitly require the subagent to do all of the following before coding:

1. Read the task file fully.
2. Read the owning `PRT-*` packet fully.
3. Read any linked `FT-*` and `SPEC-*` docs that define the slice’s contract.
4. Re-read `delivery-standards.md` and `coding-style.md`.
5. Read `delivery-docs-guide.md` so the task does not invent a competing doc role.
6. Read `scenario-docs-guide.md` whenever the task changes verification anchors, hosted acceptance, or scenario maturity claims.
7. Inspect the exact current implementation anchors named in the task.
8. Inspect the nearest tests, verification rows, scenario anchors, or acceptance surfaces named in the task.
9. Inspect the exact docs/status surfaces that may need same-wave synchronization.
10. Identify current behavior, no-regression boundaries, and any compatibility bridges already present.
11. Check for overlap risk with other tasks by comparing the intended edits against declared write scope and no-touch boundaries.
12. Evaluate whether the slice touches any of these risk classes:
    - contract shape
    - ownership boundary
    - fallback behavior
    - rollout/migration semantics
    - auth/session/data exposure
    - hosted runtime behavior
13. Stop for research if any of those risks remain ambiguous.

The task author should make this concrete by naming exact files, not areas. Good examples:
- exact service, route, adapter, and model files;
- exact tests to read or extend;
- exact status/protocol/matrix docs that may need updates.

Bad examples:
- “inspect the relevant code”
- “run the usual checks”
- “update docs if needed”

## Standards and rules that should be re-linked in every task

Every implementation task under `PRT-038/039/040` should re-link:
- the owning `PRT-*` packet for the slice
- `.memory-bank/spec/engineering/delivery-standards.md`
- `.memory-bank/spec/engineering/coding-style.md`
- `.memory-bank/mbb/delivery-docs-guide.md`

Re-link conditionally, but usually include:
- `.memory-bank/mbb/scenario-docs-guide.md` when verification, hosted acceptance, or scenario/status maturity is in play
- the relevant `FT-*` / `SPEC-*` / product-local adoption doc when the slice depends on a more specific contract

Reason: these sources contain the drift-prone rules that are easiest to violate during delegation:
- no competing doc types
- no vague acceptance language
- no coding through ambiguity
- no false “planned means proven” closure
- no hidden security shortcuts
- no overclaiming shared ownership

## Mandatory constraints to restate inside tasks

Every task should restate the following constraints in slice-specific language:

### Coding and design discipline

- Do not code through unresolved ambiguity.
- Do not invent new shared abstractions “for later” without current-wave value.
- Do not over-generalize product-local semantics into framework truth.
- Prefer additive migrations and compatibility bridges over destructive first steps.
- Do not expand beyond the declared write scope.
- Avoid drive-by refactors unless the task explicitly allows them.

### Runtime and observability discipline

- Use structured logging only.
- No `console.*` in production runtime modules.
- Preserve boundary ownership for error logging and handling.
- Keep correlation and trace context where the boundary requires it.

### Traceability discipline

- Primary implementation owners should carry the required JSDoc trace tags when the slice lands governed behavior.
- If docs are updated, `implementation_files` should be filled where practical.

### Data, security, and access discipline

- Any DB/auth/data-surface change must document exposure/RLS/grants decisions.
- Do not use public access as a shortcut for internal tables or operational data.
- Security verification must be part of closure for protected-surface changes.

### Documentation and evidence discipline

- Do not treat `.tasks` as normative truth over protocol/spec/feature docs.
- Do not claim closure from prose alone.
- Keep `planned`, `partial`, `implementation_proven`, and `adopted` states honest.
- If the task changes verification contour or governed surfaces, update the same-wave doc/status surfaces explicitly named in the task.
- Any skipped check, hosted proof, or docs update must be marked `N/A` with reason, not omitted silently.

## Explicit do / avoid list

## Do

- Use a single owning upstream contract and name it explicitly.
- Keep the slice vertical and bounded.
- Declare allowed write paths and no-touch paths.
- Name exact files/docs/tests to inspect before coding.
- Record ambiguities before implementation.
- Keep verification evidence concrete: commands, scenario rows, artifacts, hosted/security proof, or explicit `N/A`.
- Update protocol/status/matrix/product-doc surfaces in the same wave when the task says they are in scope.
- Leave a report that a verifier can use without reconstructing your reasoning from the diff alone.

## Avoid

- “Just read the codebase” or “run the usual checks”.
- Broad unplanned refactors.
- Cross-scope edits in neighboring task areas.
- Inventing new permanent MBB doc types or a second normative truth inside `.tasks/`.
- Treating planned scenario anchors as runnable proof.
- Treating browser/UI proof as the only business assertion when an API/read-model proof exists.
- Hiding uncertainty, skipped checks, or missing hosted proof behind vague completion language.
- Claiming shared ownership for a seam that still has only one real product meaning.
- Writing heavy admin/editor behavior into chat surfaces when the governed flow should stay structured and reviewable.

## Definition of done checklist

An implementation task should be considered done only if all applicable items below are satisfied:

- [ ] The task file was read fully.
- [ ] All required normative docs and guides were read.
- [ ] All exact code/test/doc anchors named in the task were inspected.
- [ ] Write scope and no-touch boundaries were respected.
- [ ] Overlap risk with neighboring tasks was checked explicitly.
- [ ] Any material ambiguity was either resolved through research or escalated before coding.
- [ ] Requested code/doc/test changes were completed within the declared scope.
- [ ] Required JSDoc/doc traceability updates were applied where relevant.
- [ ] Local baseline checks were run.
- [ ] Named scenario/verification anchors were exercised, or `N/A` was justified explicitly.
- [ ] Hosted/security/CI gates were satisfied or explicitly marked `N/A` with reason.
- [ ] Required same-wave protocol/status/scenario/verification/product-doc sync was completed, or `N/A` was justified explicitly.
- [ ] A structured report was written to the declared report path.
- [ ] The report lists evidence, `N/A` decisions, remaining risks, and follow-ups.

## Required report contract for implementation subagents

The report should be short, structured, and verifier-friendly. Free-form narrative alone is not enough.

## Recommended report structure

```md
# Txx Report: [Title]

## Completion verdict

- Verdict: `done | partial | blocked`
- Scope delivered:
- Out-of-scope or deferred:

## Grounding completed

- Docs read:
  - ...
- Code/test/doc anchors inspected:
  - ...
- Current behavior / no-regression notes:
  - ...

## Changes made

- [path] — what changed and why

## Verification

- Local checks:
  - `[command]` — `passed | failed | not run`
- Scenario / verification anchors:
  - [anchor] — result
- Hosted / security / CI evidence:
  - [artifact / run / URL / reasoned N/A]

## Documentation sync

- Updated:
  - ...
- Not updated:
  - ... — `N/A because ...`

## Risks / follow-ups

- ...

## N/A decisions

- ...
```

## Report writing rules

The report must always include:
- explicit verdict: `done`, `partial`, or `blocked`
- what was actually delivered
- exact files changed
- grounding completed
- exact commands/anchors used for verification
- hosted/security/CI evidence or explicit `N/A`
- doc sync performed or explicit `N/A`
- remaining risks and follow-ups

The report must not:
- rely on “see diff”
- hide unrun checks
- claim broader closure than the evidence supports
- replace protocol/spec truth with new normative prose

## Verifier-input checklist

A verifier subagent should be able to validate another subagent’s work from the following packet:

- original task file
- implementation report
- exact changed paths
- exact expected untouched paths or no-touch list
- list of docs read for grounding
- list of code/test/doc anchors inspected
- acceptance claims mapped to concrete evidence
- commands run and outcomes
- scenario/verification anchors referenced and outcomes
- hosted/security/CI evidence or explicit `N/A` reasons
- documentation sync list
- unresolved risks, caveats, or follow-ups

If any of those are missing, verifier effort becomes guesswork and the task contract is too weak.

## Practical conclusions for `PRT-038/039/040`

For this implementation wave specifically, future `.tasks/` authoring should optimize for five properties:
- bounded write scope because multiple agents may work in parallel;
- concrete grounding because `PRT-038/039/040` contain many subtle ownership and closure rules;
- anti-drift restatement of delivery/coding/scenario standards;
- evidence-first closure instead of “implemented locally” language;
- verifier-ready reporting so later review does not require rediscovering assumptions from upstream docs and diff archaeology.

That is the minimal contract that stays aligned with the source documents while remaining practical for delegated execution.

## Source basis

This recommendation was derived from:
- `.tasks/prt-038-phase2-implementation/tasks/T01-subagent-operating-model-and-task-doc-contract.md`
- `.memory-bank/mbb/templates/feature.md`
- `.memory-bank/mbb/templates/protocol.md`
- `.memory-bank/mbb/delivery-docs-guide.md`
- `.memory-bank/mbb/scenario-docs-guide.md`
- `.memory-bank/spec/engineering/delivery-standards.md`
- `.memory-bank/spec/engineering/coding-style.md`
- `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
