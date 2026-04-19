---
file: .memory-bank/index.md
description: 'Memory Bank корневой вход для bot-platform: framework-only navigation по specs, planning, guides, scenario system и MBB standards.'
purpose: Читать как главный entrypoint в документацию `bot-platform`, чтобы быстро понять архитектурную правду framework-репозитория и не смешивать ее с product-owned truth.
version: 0.1.0
date: 2026-04-19
status: DRAFT
c4_level: L1
tags: [memory-bank, navigation, bot-platform, framework, mbb, repo-split]
parent: null
children:
  - spec/index.md
  - plans/index.md
  - guides/index.md
  - scenarios/index.md
  - mbb/index.md
history:
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial draft root index for the future bot-platform Memory Bank under PRT-036.
---

# Memory Bank

`bot-platform` хранит только framework truth.
Это repo-local SSoT для:
- platform architecture;
- reusable package contracts;
- shared verification model;
- shared documentation standards.

Здесь не живут:
- SellerAgent или Docoved product truth;
- product DB topology, secrets и deploy runbooks;
- product operator guides и acceptance overlays;
- product-local epics, features и protocols.

## Entry points

- [Specs hub](spec/index.md): основной нормативный слой framework-репозитория.
- [Architecture hub](spec/architecture/index.md): top-down карта системы, glossary, container model и framework/product boundaries.
- [Project structure](spec/project/repo-structure.md): on-disk shape `bot-platform` и правила package/container placement.
- [Runtime and framework contracts](spec/runtime/index.md): execution kernel, auth/command/workflow framework contracts и shared runtime semantics.
- [Client API specs](spec/client-api/index.md): typed operation catalog, SDK boundary и shared client-facing contracts.
- [Scenario specs](spec/scenarios/index.md): canonical scenario system, evidence model и hosted verification layering.
- [Plans hub](plans/index.md): framework-only ADRs, epics, protocols и delivery status.
- [Protocols hub](plans/protocols/index.md): cross-epic migration waves, включая `PRT-036`.
- [Guides hub](guides/index.md): Diataxis-layer для framework consumers, maintainers и product repos.
- [MBB rules](mbb/index.md): canonical documentation standards upstream, которые затем mirror'ятся в product repos.

## Что должно существовать сразу

Минимальный стартовый набор для Wave 1:
- `spec/architecture/index.md` и `spec/architecture/boundaries.md`
- `spec/project/repo-structure.md`
- `spec/project/feature-area-boundaries.md`
- `spec/runtime/index.md`
- `spec/client-api/index.md`
- `spec/scenarios/index.md`
- `plans/index.md`
- `plans/protocols/index.md`
- `plans/protocols/PRT-036-platform-framework-and-product-repo-split.md`
- `guides/index.md`
- `mbb/index.md`

## Reading order

1. Начать с `spec/architecture/index.md`.
2. Затем прочитать `spec/architecture/boundaries.md` и `spec/project/repo-structure.md`.
3. После этого перейти в `spec/client-api/index.md`, `spec/runtime/index.md` и `spec/scenarios/index.md`.
4. Для текущей migration wave посмотреть `plans/protocols/PRT-036-platform-framework-and-product-repo-split.md`.
5. Для authoring discipline и mirror policy использовать `mbb/index.md`.
