---
file: .memory-bank/index.md
description: 'Memory Bank корневой вход для bot-platform: framework-only navigation по specs, planning, guides, scenario system и MBB standards.'
purpose: Читать как главный entrypoint в документацию `bot-platform`, чтобы быстро понять архитектурную правду framework-репозитория и не смешивать ее с product-owned truth.
version: 0.7.0
date: 2026-04-25
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
  - version: 0.7.0
    date: 2026-04-25
    changes: Marked PRT-042 as a closed first-wave channel-runtime protocol and kept the runtime contract as the stable framework vocabulary entrypoint.
  - version: 0.6.0
    date: 2026-04-25
    changes: Added PRT-042 as the active channel-runtime planning entrypoint and linked the new runtime channel-runtime contract.
  - version: 0.5.0
    date: 2026-04-24
    changes: Reframed PRT-041 as closed after dependency-boundary cleanup completed.
  - version: 0.4.0
    date: 2026-04-24
    changes: Updated root navigation after PRT-038/039/040 closure and added PRT-041 as the active dependency-boundary cleanup protocol.
  - version: 0.3.0
    date: 2026-04-23
    changes: Updated the root entrypoint for the post-split convergence phase by pointing readers at ADR-005 and PRT-038 as the current architecture and planning anchors after PRT-036 closure.
  - version: 0.2.0
    date: 2026-04-21
    changes: Added the framework Security spec entrypoint and linked the first auth-core contract for discoverability from the root Memory Bank hub.
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
- [Runtime and framework contracts](spec/runtime/index.md): execution kernel, channel-runtime contract, auth/command/workflow framework contracts и shared runtime semantics.
- [Security specs](spec/security/index.md): framework-owned auth primitives, access-check boundaries и reusable auth-core contract.
- [Client API specs](spec/client-api/index.md): typed operation catalog, SDK boundary и shared client-facing contracts.
- [Scenario specs](spec/scenarios/index.md): canonical scenario system, evidence model и hosted verification layering.
- [Plans hub](plans/index.md): framework-only ADRs, epics, protocols и delivery status.
- [Protocols hub](plans/protocols/index.md): cross-epic migration waves, включая closed channel-runtime first wave `PRT-042`, closed split/convergence protocols `PRT-036` / `PRT-038`, and closed dependency-boundary cleanup protocol `PRT-041`.
- [Guides hub](guides/index.md): Diataxis-layer для framework consumers, maintainers и product repos.
- [MBB rules](mbb/index.md): canonical documentation standards upstream, которые затем mirror'ятся в product repos.

## Что должно существовать сразу

Минимальный стартовый набор для Wave 1:
- `spec/architecture/index.md` и `spec/architecture/boundaries.md`
- `spec/project/repo-structure.md`
- `spec/project/feature-area-boundaries.md`
- `spec/runtime/index.md`
- `spec/security/index.md`
- `spec/client-api/index.md`
- `spec/scenarios/index.md`
- `plans/index.md`
- `plans/protocols/index.md`
- `plans/protocols/PRT-036-platform-framework-and-product-repo-split.md`
- `plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md`
- `plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `guides/index.md`
- `mbb/index.md`

## Reading order

1. Начать с `spec/architecture/index.md`.
2. Затем прочитать `spec/architecture/boundaries.md` и `spec/project/repo-structure.md`.
3. После этого перейти в `spec/client-api/index.md`, `spec/runtime/index.md` и `spec/scenarios/index.md`.
4. Затем прочитать `spec/security/index.md` и `spec/security/auth-core.md`.
5. Для закрытой channel-runtime first wave и будущих follow-ups прочитать `plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md` и `spec/runtime/channel-runtime-contract.md`.
6. Для закрытого dependency-boundary cleanup и будущих boundary decisions прочитать `plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md`.
7. `plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md` и `plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md` читать как закрытую architecture/handoff baseline.
8. `plans/protocols/PRT-036-platform-framework-and-product-repo-split.md` читать как закрытую split lineage, а не как активный execution contract.
9. Для authoring discipline и mirror policy использовать `mbb/index.md`.
