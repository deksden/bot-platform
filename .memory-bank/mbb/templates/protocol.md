---
file: .memory-bank/plans/protocols/PRT-XXX-[slug].md
description: [Protocol Name] - factual implementation/remediation trace for [feature or cycle]
purpose: Reference what actually happened during delivery, remediation, or acceptance cycles
version: 1.2.0
date: YYYY-MM-DD
status: ACTIVE
epic: EP-XXX
feature: FT-XXX-YY
tags: [protocol, delivery, remediation, evidence, runs]
parent: .memory-bank/index.md
related_files:
  - .memory-bank/epics/[EP-XXX]/[FT-XXX-YY]/index.md
  - .memory-bank/specs/[SPEC-XXX].md
history:
  - version: 1.0.0
    date: YYYY-MM-DD
    changes: Initial protocol created from MBB template
---

# Protocol: [Protocol Name]

> Protocol хранит cross-epic execution/planning contract или фактический след delivery/remediation цикла там, где это неудобно держать только внутри `EP/FT`.
>
> Разделяй два вида protocol docs:
> - runtime-published summaries: отдельный generated evidence layer, если он позже появится;
> - hand-authored delivery protocols: `.memory-bank/plans/protocols/PRT-XXX-[slug].md`
>
> Этот шаблон предназначен для hand-authored cross-epic protocol / migration note, а не для автоматического runtime summary.
>
> В project operating model protocol также выполняет роль curated implementation/evidence log. Не создавай отдельный обязательный doc type только ради "implementation report", если эту функцию уже может выполнить protocol.

## Purpose

Что это за цикл:
- implementation
- remediation
- acceptance follow-up
- deploy/beta verification

## Scope of this cycle

- [What this cycle covered]
- [What it intentionally did not cover]

## Inputs

- Feature: [link]
- Spec: [link]
- Acceptance scenario / evidence target: [link]
- Run(s): [run ids / links]
- Security / access docs: [link]

## Open questions / required research

- [Open question or `none`]
- [Required research step or `none`]

> Если protocol описывает implementation wave и здесь остаются contract/boundary/fallback ambiguities,
> их нельзя silently решать уже в коде. Сначала нужен focused research pass, потом narrowed execution plan.

## Security / rollout impact

- Exposure decision: [`internal_only` / `explicit_exposed_surface` / `mixed` / `N/A`]
- RLS / grants / auth impact: [short summary]
- Rollback / containment note: [how to stop exposure or revert safely]
- Hosted verification gate: [`pnpm verify:security`, Advisor check, manual project settings proof, or `N/A`]

## Execution summary

Коротко, что реально произошло:
1. [Action / run / decision]
2. [Action / run / decision]
3. [Action / run / decision]

## Key decisions / deviations

- [Decision or deviation] — [why]
- [Decision or deviation] — [why]

> Если execution пошёл не по spec, это фиксируется здесь, а не теряется в raw logs.

## Evidence

- [Run / artifact / report / screenshot / log link]
- [Run / artifact / report / screenshot / log link]
- [Security verification artifact / Advisor proof if relevant]

## Outcome

- Result: `completed | partial | failed | follow_up_needed`
- Follow-up needed:
  - [gap / follow-up]
  - [gap / follow-up]

## Memory Bank impact

- [What docs/statuses were updated]
- [What still must be updated]
