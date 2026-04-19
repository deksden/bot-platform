---
file: .memory-bank/epics/[EP-XXX]/index.md
description: [Epic Name] - [brief description of the value area and scope]
purpose: Reference when planning, slicing, or auditing the delivery of [epic area]
version: 1.0.0
date: YYYY-MM-DD
status: ACTIVE
epic: EP-XXX
user_value: [Clear statement of value delivered through this epic]
target_audience: [implementers, maintainers, stakeholders]
tags: [epic, value-area, delivery]
parent: .memory-bank/epics/index.md
related_files:
  - .memory-bank/epics/[EP-XXX]/[FT-XXX-01]/index.md
history:
  - version: 1.0.0
    date: YYYY-MM-DD
    changes: Initial epic documentation created from MBB template
---

# Epic [EP-XXX]: [Epic Name]

> Эпик — это не большой PRD. Это короткая delivery-рамка для группы связанных feature/value slices.

## Goal (user value)

Кому и какую ценность доставляет этот эпик.

> Пиши только ту ценность, которую можно потом разложить на features и подтвердить evidence.

## Scope (in / out)

### In scope
- [Value slice / capability 1]
- [Value slice / capability 2]

### Out of scope
- [Explicitly excluded area 1]
- [Explicitly excluded area 2]

> Out of scope обязателен. Он не даёт эпику расползаться и помогает агентам не “додумывать” лишнюю работу.

## Features (vertical slices)

- [FT-XXX-01](./FT-XXX-01/index.md) — [one-line statement of delivered value]
- [FT-XXX-02](./FT-XXX-02/index.md) — [one-line statement of delivered value]

> Здесь перечисляй именно delivery units. Не нужно в epic подробно дублировать spec-level или implementation-level детали.

## Context (SSoT links)

- [Relevant system/project doc](../docs/[path].md) — [why it matters for the epic]
- [Relevant architecture/doc](../docs/[path].md) — [why it matters for slicing and delivery]

> Добавляй только те SSoT ссылки, которые реально нужны для понимания области и slicing decisions.

## Progress Report (evidence-based)

- `as_of`: YYYY-MM-DD
- `total_features`: N
- `completed_features`: N
- `evidence_confirmed_features`: N
- `verification_link`: [link to verification/evidence source]

> Статус эпика должен быть evidence-based. Не ставь “completed”, если feature docs и acceptance evidence этого не подтверждают.

## Dependencies

### Internal
- [Dependency] — [why it matters]

### External
- [Dependency] — [why it matters]

## Risks & mitigations

- Risk: [description] -> Mitigation: [action]
- Risk: [description] -> Mitigation: [action]

## Definition of Done

- [ ] Все feature slices внутри эпика имеют свои docs.
- [ ] Для завершённых features есть acceptance evidence.
- [ ] Затронутые SSoT разделы и Memory Bank обновлены.
- [ ] Progress report опирается на реальное verification/evidence.

> Epic done = не “мы вроде всё доделали”, а состояние, где завершённые features и их evidence реально связаны между собой.
