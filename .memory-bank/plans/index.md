---
file: .memory-bank/plans/index.md
description: 'Plans hub для bot-platform: framework epics, ADRs, protocols, current status и verification planning.'
purpose: Читать для понимания delivery contour `bot-platform`, не смешивая framework delivery с SellerAgent и Docoved product waves.
version: 0.2.0
date: 2026-04-22
status: DRAFT
tags: [plans, bot-platform, adr, epics, protocols, delivery]
parent: .memory-bank/index.md
children:
  - adr/index.md
  - epics/index.md
  - current-status-report.md
  - protocols/index.md
  - verification-matrix.md
history:
  - version: 0.2.0
    date: 2026-04-22
    changes: Updated the verification-matrix navigation wording to match the now split-aware feature-group and scenario-anchor planning surfaces.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial draft plans hub for the future bot-platform Memory Bank under PRT-036.
---

# Plans Hub

Этот раздел фиксирует delivery-структуру framework-репозитория.
Он нужен для platform epics, shared architecture decisions и cross-epic migration waves.

## Что здесь хранится

- `ADR-*` по framework boundaries, package strategy и long-lived shared decisions;
- `EP-*` и `FT-*`, которые действительно принадлежат платформенному слою;
- `PRT-*` для cross-epic migration/refactoring waves;
- status snapshots и verification planning для framework repo.

## Что здесь не хранится

- SellerAgent product delivery plan;
- Docoved product delivery plan;
- product-specific release logs и product acceptance overlays;
- operational runbooks, которые должны жить в `guides/` или product repos.

## Current planning sections

- [ADR hub](adr/index.md): long-lived framework decisions, которые нельзя держать только в protocols.
- [Epic catalog](epics/index.md): platform-owned `EP-*` и их feature breakdown.
- [Current status report](current-status-report.md): краткий snapshot, что уже materialized в `bot-platform`, а что пока только planned.
- [Protocols hub](protocols/index.md): execution docs для migration waves и boundary cleanup.
- [Verification matrix](verification-matrix.md): map `feature_group -> contract anchors -> scenario anchors` для framework acceptance (split-aware).

## Must-exist docs immediately

- `adr/index.md`
- `epics/index.md`
- `current-status-report.md`
- `protocols/index.md`
- `protocols/PRT-036-platform-framework-and-product-repo-split.md`
- `verification-matrix.md`

## Immediate planning priorities

### 1. Stabilize the repo split narrative

Пока идет PRT-036, `protocols/PRT-036-platform-framework-and-product-repo-split.md` должен быть главным execution document.
После старта split-а здесь же должны жить follow-up protocols по:
- dependency bridge;
- package publication strategy;
- framework package extraction order.

### 2. Separate framework epics from product epics

В `epics/index.md` должны остаться только инициативы, которые после split-а по-настоящему принадлежат `bot-platform`, например:
- foundation/repo topology;
- auth framework;
- command framework;
- workflow framework;
- scenario/eval system;
- shared contracts and SDK.

SellerAgent и Docoved epic families здесь быть не должны.

### 3. Keep one framework status snapshot

`current-status-report.md` нужен сразу, чтобы не потерять ответ на вопросы:
- какие packages уже существуют в skeleton;
- какие contracts уже перенесены;
- какие docs еще остаются stub-only;
- какие acceptance gates еще не закрыты.
