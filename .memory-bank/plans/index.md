---
file: .memory-bank/plans/index.md
description: 'Plans hub для bot-platform: framework epics, ADRs, protocols, current status и verification planning.'
purpose: Читать для понимания delivery contour `bot-platform`, не смешивая framework delivery с SellerAgent и Docoved product waves.
version: 0.6.0
date: 2026-04-25
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
  - version: 0.6.0
    date: 2026-04-25
    changes: Added PRT-042 as the active channel-runtime protocol after review hardening and linked its runtime-spec obligation.
  - version: 0.5.0
    date: 2026-04-24
    changes: Reframed PRT-041 as closed and moved broader extraction to future-protocol guidance.
  - version: 0.4.0
    date: 2026-04-24
    changes: Updated planning priorities after PRT-038 closure so PRT-041 becomes the active dependency-boundary cleanup packet.
  - version: 0.3.0
    date: 2026-04-23
    changes: Added the post-split convergence follow-up `PRT-038` and clarified that the next framework planning phase is the three-layer product-line extraction and product-protocol kickoff program.
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
- `protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md`
- `protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
- `verification-matrix.md`

## Immediate planning priorities

### 1. Active channel-runtime contract hardening

`protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md` is the active framework protocol for the shared channel-runtime seam.

Current first-wave scope:
- canonical response documents;
- public/operator/debug visibility;
- citations/source refs;
- minimal render-target vocabulary;
- pure markdown/plaintext helper only if a first consumer needs it;
- product adoption proof in Docoved before broader extraction.

Deferred by design:
- command runtime extraction;
- outbound delivery orchestration;
- threading abstractions;
- framework-owned HTML rendering;
- DB/UI surfaces.

The stable runtime vocabulary belongs in `spec/runtime/channel-runtime-contract.md`; product mappings belong in product-local Memory Banks.

### 2. Closed dependency-boundary cleanup

`protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md` is now closed for the concrete post-handoff package-boundary defect.

Closed result:
- Docoved imports and package manifests no longer depend on `@selleragent/api-contract`, `@selleragent/shared`, or `@selleragent/core`;
- SellerAgent `packages/shared` and `@selleragent/platform-config` are classified as product-local/no-code for this protocol unless a future real shared consumer appears;
- Memory Bank navigation treats adoption packets as closed baselines;
- `sales-agent` links remain lineage rather than normative sources.

### 3. Keep closed convergence docs as baseline

`protocols/PRT-036-platform-framework-and-product-repo-split.md` остается closed lineage for the repo split.
`protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md` остается closed baseline for the three-layer handoff.

Closed detailed child packets:
- `protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`

### 4. Separate framework epics from product epics

В `epics/index.md` должны остаться только инициативы, которые после split-а по-настоящему принадлежат `bot-platform`, например:
- foundation/repo topology;
- auth framework;
- command framework;
- workflow framework;
- scenario/eval system;
- shared contracts and SDK.

SellerAgent и Docoved epic families здесь быть не должны.

### 5. Keep one framework status snapshot

`current-status-report.md` нужен сразу, чтобы не потерять ответ на вопросы:
- какие packages уже существуют в skeleton;
- какие contracts уже перенесены;
- какие docs еще остаются stub-only;
- какие acceptance gates еще не закрыты.
