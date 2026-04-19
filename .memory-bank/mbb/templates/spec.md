---
file: .memory-bank/specs/SPEC-XXX-[slug].md
description: [Spec Name] - grounded implementation design for [feature/area]
purpose: Reference when implementing, reviewing, or verifying the planned change
version: 1.0.0
date: YYYY-MM-DD
status: DRAFT
spec: SPEC-XXX
feature: FT-XXX-YY # optional when the spec is not owned by one feature
epic: EP-XXX # optional when the spec spans multiple epics or stands on its own
tags: [spec, implementation, grounding, rollout]
parent: .memory-bank/specs/index.md
related_files:
  - .memory-bank/epics/[EP-XXX]/[FT-XXX-YY]/index.md
history:
  - version: 1.0.0
    date: YYYY-MM-DD
    changes: Initial SPEC created from MBB template
---

# SPEC-XXX: [Spec Name]

> Spec — это grounded implementation design. Не превращай spec в epic doc или в execution log.
> Spec может обслуживать одну feature, несколько features или shared capability layer.

## Goal

Что именно реализуем и зачем этот spec нужен для delivery unit.

> Если документ в первую очередь фиксирует long-lived architectural decision и trade-offs, это уже кандидат на `ADR`, а не на `spec`.

## Grounding

### Docs / SSoT
- [Relevant doc](../docs/[path].md) — [why it matters]

### Code grounding
- [Key implementation path]
- [Key tests path]
- [Key boundary / ownership note]

> Здесь фиксируется, на чём основан design. Если grounding неполон, spec считается предварительным.

## Current state

Коротко: как сейчас устроен relevant контур и какие ограничения уже существуют.

## Target design

Что меняется:
- [Design change 1]
- [Design change 2]

## Non-goals

- [Out of scope item 1]
- [Out of scope item 2]

## Risks

- Risk: [description] -> Mitigation: [action]

## Migration / implementation plan

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Regression gates

- Unit: [expected coverage]
- Integration: [expected coverage]
- Acceptance impact: [what scenarios must still pass]

## Docs impact

- [Docs / MB section to update]
- [Docs / MB section to update]

## Rollback / abort criteria

- [Abort criterion 1]
- [Rollback note 1]
