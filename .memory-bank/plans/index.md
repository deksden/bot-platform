---
file: .memory-bank/plans/index.md
description: 'Plans hub для bot-platform: framework epics, ADRs, protocols, current status и verification planning.'
purpose: Читать для понимания delivery contour `bot-platform`, не смешивая framework delivery с SellerAgent и Docoved product waves.
version: 0.11.0
date: 2026-04-26
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
  - version: 0.11.0
    date: 2026-04-26
    changes: Marked PRT-043 phase-2 implementation planning complete and linked the subagent execution companion and task workspace.
  - version: 0.10.0
    date: 2026-04-26
    changes: Marked PRT-043 phase-1 review complete and noted new ownership, boundary contract, MBB routing, verification, release/rollback, and no-storage safeguards.
  - version: 0.9.0
    date: 2026-04-26
    changes: Noted that PRT-043 phase-0 elaboration is complete and expanded the plans hub summary with command normalization, safe failures, config compatibility, idempotency, anti-abuse, and observability requirements.
  - version: 0.8.0
    date: 2026-04-26
    changes: Added PRT-043 as the draft follow-up for channel interaction runtime after PRT-042 closed the canonical response document first wave.
  - version: 0.7.0
    date: 2026-04-25
    changes: Marked PRT-042 closed after first-wave channel-runtime implementation and retained publication/product direct-consumption as explicit follow-up.
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
- `protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- `protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`
- `protocols/PRT-043-channel-interaction-runtime-review-details.md`
- `verification-matrix.md`

## Immediate planning priorities

### 1. Draft channel interaction runtime follow-up

`protocols/PRT-043-channel-interaction-runtime-command-render-thread-delivery.md` is the draft follow-up to closed `PRT-042`.

Phase state:
- стадия проработки протокола: фаза 0 выполнена.
- стадия проработки протокола: фаза 1 выполнена.
- стадия проработки протокола: фаза 2 выполнена.

Draft scope:
- actor-aware command runtime policy for system admins, workspace admins, employees/members, known external users, unknown external users, and anonymous actors;
- channel-neutral command input normalization and typed safe command failures;
- canonical command responses through `CanonicalResponseDocument`;
- channel-owned rendering from canonical markdown-compatible content;
- channel-instance threading behavior such as email `Re:` and Telegram reply-to-message;
- outbound delivery intent/result contracts;
- command-policy compatibility migration from legacy product fields such as `commandAccessPolicy`;
- idempotency, anti-abuse/rate-limit hooks, fallback diagnostics, and logging-first observability with no framework DB/UI in the first implementation;
- Docoved and SellerAgent adoption waves with beta verification.

The protocol must reuse `spec/runtime/command-framework-contract.md` and must not create a second command framework inside `channel-runtime`.
Implementation code must not start until the pre-code gates in `PRT-043` are resolved.
Implementation task packets and subagent execution rules live in `protocols/PRT-043-channel-interaction-runtime-implementation-plan.md`.

### 2. Closed channel-runtime first wave

`protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md` is closed for the first-wave shared channel-runtime seam.

Closed result:
- canonical response documents;
- public/operator/debug visibility;
- citations/source refs;
- minimal render-target vocabulary;
- pure markdown/plaintext helpers;
- `@dd-bot-platform/channel-runtime` package;
- local publish-readiness proof;
- Docoved product-local mapping proof;
- SellerAgent readiness review.

Follow-ups:
- publish the package before direct product dependency adoption;
- replace Docoved's local fixture-only proof with direct package import after publication or a sanctioned bridge.

Still deferred by design:
- command runtime extraction;
- outbound delivery orchestration;
- threading abstractions;
- framework-owned HTML rendering;
- DB/UI surfaces.

The stable runtime vocabulary belongs in `spec/runtime/channel-runtime-contract.md`; product mappings belong in product-local Memory Banks.

### 3. Closed dependency-boundary cleanup

`protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md` is now closed for the concrete post-handoff package-boundary defect.

Closed result:
- Docoved imports and package manifests no longer depend on `@selleragent/api-contract`, `@selleragent/shared`, or `@selleragent/core`;
- SellerAgent `packages/shared` and `@selleragent/platform-config` are classified as product-local/no-code for this protocol unless a future real shared consumer appears;
- Memory Bank navigation treats adoption packets as closed baselines;
- `sales-agent` links remain lineage rather than normative sources.

### 4. Keep closed convergence docs as baseline

`protocols/PRT-036-platform-framework-and-product-repo-split.md` остается closed lineage for the repo split.
`protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md` остается closed baseline for the three-layer handoff.

Closed detailed child packets:
- `protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`

### 5. Separate framework epics from product epics

В `epics/index.md` должны остаться только инициативы, которые после split-а по-настоящему принадлежат `bot-platform`, например:
- foundation/repo topology;
- auth framework;
- command framework;
- workflow framework;
- scenario/eval system;
- shared contracts and SDK.

SellerAgent и Docoved epic families здесь быть не должны.

### 6. Keep one framework status snapshot

`current-status-report.md` нужен сразу, чтобы не потерять ответ на вопросы:
- какие packages уже существуют в skeleton;
- какие contracts уже перенесены;
- какие docs еще остаются stub-only;
- какие acceptance gates еще не закрыты.
