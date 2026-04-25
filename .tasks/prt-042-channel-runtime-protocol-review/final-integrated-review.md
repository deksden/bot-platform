# Integrated Review: PRT-042 Channel Runtime Canonical Document, Command, And Rendering

Дата: 2026-04-25
Репозиторий: `/Users/deksden/Documents/_Projects/bot-platform`
Проверяемый протокол: `.memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md`
Рабочая папка: `.tasks/prt-042-channel-runtime-protocol-review`

## Использованные subagent reports

- `report-01-architecture-boundaries-contracts.md`
- `report-02-mbb-documentation-routing.md`
- `report-03-lean-design-duplication-existing-capabilities.md`
- `report-04-error-handling-observability-ops.md`
- `report-05-testing-verification-scenarios-quality-gates.md`
- `report-06-storage-ui-scope-migration.md`

## Executive summary

Направление `PRT-042` правильное: shared channel-runtime contract должен жить в `bot-platform`, а Docoved/SellerAgent должны быть product adopters. Но текущая версия протокола слишком широка для первого wave: она одновременно планирует canonical document, rendering, command framework, access policy и delivery plan. Это риск оверинжиниринга и дублирования уже существующих `@dd-bot-platform/core` / `api-contract` контуров.

Главная рекомендация: сузить первую волну до минимального contract-first слоя:
- canonical response document;
- visibility/public-operator-debug модель;
- citations/source refs;
- минимальные render target types;
- pure markdown/plaintext helpers;
- import/build/package smoke.

Command registry, delivery plans, threading abstractions, HTML rendering и transport orchestration лучше оформить как deferred phases или отдельные follow-up протоколы/спеки после первого consumer proof.

## Принятый архитектурный вывод

### Что хорошо

- Ownership разделён верно: `bot-platform` — framework truth, `docoved-agent` и SellerAgent — product truth.
- Верно выбран contract-first подход: типы и pure helpers до runtime/orchestration.
- Верно запрещены продуктовые зависимости, provider SDK и DB dependency в first package wave.
- Верно зафиксирована идея: core/product runtime выпускает canonical artifact/document, канал только адаптирует и доставляет.
- Правильно отделён `sales-agent` как mixed/historical tracker, а не источник нового канона.

### Что нужно поправить

- Протокол должен явно сказать, что `CanonicalResponseDocument` — runtime delivery contract, а не persisted product artifact и не новый product source of truth.
- Новый пакет не должен переизобретать уже существующие framework vocabularies. Нужно reuse/import/re-export правило для `ChannelKind`, execution refs, trace refs, capability families, result envelopes.
- Command capability model должен быть связан с существующими control-plane/auth capability families, а не стать второй системой прав.
- Renderer должен быть pure and side-effect free; adapters остаются product-local и выполняют side effects.

## Lean-design решение

### Риск текущего текста

Текущий `@dd-bot-platform/channel-runtime` описан как слишком большой пакет:
- canonical document;
- renderers;
- command registry;
- access/capability layer;
- outbound delivery planner;
- threading;
- future channel orchestration.

Это превращает маленький contract package в мини-платформу поверх платформы.

### Рекомендуемый first-wave scope

Keep:
- `CanonicalResponseDocument`
- `CanonicalResponseSection`
- `CanonicalResponseBlock`
- `CanonicalCitation`
- `CanonicalSourceRef`
- `CanonicalResponseMetadata`
- `CanonicalResponseVisibility`
- `CanonicalResponseArtifactRef`
- `ChannelRenderTarget` / minimal target vocabulary
- `renderChannelMarkdownToPlainText`
- `splitRenderedMessageParts` only if immediate consumer needs it

Defer:
- `ChannelRenderer`
- `ChannelRenderPolicy`
- `RenderedChannelMessage`
- `OutboundDeliveryPlan`
- `OutboundDeliveryThreading`
- HTML rendering as framework-owned helper
- full `ChannelCommand*` subsystem
- delivery retry/orchestration abstractions

Important nuance: subagent 03 recommended not creating a new package until two consumers exist. I do not fully accept that as a hard blocker. A small package can be justified now if it stays narrow and is immediately consumed by Docoved. But the protocol should require a second-product adoption plan before calling the package stable/general.

## MBB / documentation findings

### Issues

- Protocol frontmatter has too many tags; MBB guidance prefers 3-6 focused tags.
- `related_files` uses absolute cross-repo paths. This is acceptable in existing docs but should be deliberate; protocol should distinguish cross-repo lineage links from repo-local normative links.
- `bot-platform` runtime/spec indexes do not yet reserve/link `spec/runtime/channel-runtime-contract.md`.
- `docoved-agent` and `seller-agent` entrypoints do not yet route to `PRT-042`.
- Closure wording `SellerAgent/sales-agent` mixes canonical product owner and mixed tracker.

### Required doc updates

In `bot-platform`:
- update `.memory-bank/spec/runtime/index.md` when `channel-runtime-contract.md` is added;
- update `.memory-bank/spec/index.md` when runtime spec is added;
- keep `PRT-042` linked from `.memory-bank/plans/protocols/index.md`.

In `docoved-agent`:
- create/adopt a product-local adoption protocol, likely `PRT-040-docoved-channel-runtime-adoption.md`;
- update channel adapter and answer artifact docs;
- route from Docoved Memory Bank indexes to upstream `PRT-042`.

In SellerAgent:
- create equivalent adoption note/protocol in `seller-agent`, not `sales-agent`.

In `sales-agent`:
- keep as mixed tracker only; do not make it canonical owner.

## Error handling / reliability / observability findings

### Current gaps

The current protocol does not define enough about failure behavior:
- no typed error/result envelope for rendering or command policy helpers;
- no ownership taxonomy for framework/product/adapter/transport errors;
- no retryable vs terminal classification;
- no required correlation fields across render/command/delivery flow;
- no idempotency guidance for duplicate inbound webhook or adapter retries;
- no rule preventing stacked retries at runtime + adapter + transport layers.

### Recommended additions

Add a `Reliability and observability` section, but keep it lean:
- pure helpers return typed results or throw only deterministic validation errors; choose one style and document it;
- product adapters own transport errors and structured failure events;
- framework contract defines common fields, not provider-specific tools;
- required correlation fields: `responseId`, `runId`, `traceId`, `channelRef`, `commandId`, `attemptId`, `deliveryId` where applicable;
- provider-specific Sentry/Resend/Telegram instrumentation stays product-local;
- no raw transport payloads, secrets, or full answer bodies in generic logs by default.

For first wave, do not overbuild a universal error bus. Define vocabulary and required references only.

## Testing / verification findings

### Missing proof contours

The protocol needs a tighter first-wave verification matrix:
- markdown/plaintext deterministic fixtures;
- canonical document schema/type import smoke;
- public/operator/debug visibility fixture;
- Docoved artifact mapping fixture;
- import-boundary proof that package has no product, DB, or provider imports;
- package publish/pack smoke if package is publishable.

### Scenario gaps

Existing control-plane scenarios do not prove channel-runtime rendering and command policy. Add/plan a framework scenario anchor for channel-runtime import/render stability, and product-local adoption anchors in Docoved and SellerAgent.

### Quality gates

Required gates before first package/adoption claim:
- `pnpm typecheck` / `pnpm check` in `bot-platform`;
- package build included in root graph;
- `pnpm pack` or equivalent tarball import smoke;
- publish allowlist update if publishing package;
- Docoved beta Telegram/email proofs stay green when Docoved adapter changes.

## Storage / UI / migration / release findings

### DB and UI scope

First wave should explicitly exclude:
- framework-owned DB tables;
- migrations;
- delivery records;
- response persistence;
- read models;
- UI/app-shell/admin screens.

If future UI appears, it needs product-local UI docs: routes, screen specs, stable ids/selectors, POM/automation contract.

### Release process

The current publish allowlist only includes existing packages. If a new `@dd-bot-platform/channel-runtime` package is created, protocol must require:
- package added to workspace build graph;
- package added to `scripts/publish-private-packages.mjs` allowlist;
- Changeset entry;
- dry-run publish or pack inspection;
- consumer import smoke.

### Rollback

Recommended rollback rule:
- first rollback is consumer version pin rollback, not source-copy or DB surgery;
- product adapters remain as compatibility bridge until product proofs pass;
- no destructive renames or storage moves in first wave.

## Concrete protocol edits to make before implementation

1. Narrow `Target package` section:
   - define `@dd-bot-platform/channel-runtime` as a minimal contract/pure-helper package;
   - state that command runtime and delivery orchestration are deferred unless first-wave implementation proves immediate need.

2. Add `Reuse existing framework vocabulary` section:
   - `channel-runtime` must import/re-export existing core/api-contract refs where possible;
   - it must not define parallel `ChannelKind`, execution refs, trace refs, capability families.

3. Add `Canonical document boundary` section:
   - document is runtime delivery contract;
   - product artifacts remain source of truth;
   - no persisted shared response/delivery records in first wave.

4. Move command subsystem out of first-wave scope:
   - reference existing `command-framework-contract.md`;
   - keep command adoption as later phase after canonical document/rendering proof.

5. Tighten rendering scope:
   - first wave supports markdown/plaintext and visibility separation;
   - HTML/channel-specific rendering stays product adapter unless/until pure helper is proven useful.

6. Add `Reliability and observability` section:
   - typed error vocabulary;
   - correlation fields;
   - idempotency/retry ownership guidance;
   - no provider-specific observability in framework package.

7. Add `No DB/UI in wave 1` section:
   - explicit exclusion of migrations, read models, persistent delivery logs, screens.

8. Add `Verification matrix` section:
   - deterministic fixtures;
   - import boundary smoke;
   - package build/pack gates;
   - Docoved/SellerAgent adoption proofs.

9. Fix MBB routing:
   - reduce tags;
   - separate `seller-agent` from `sales-agent` in closure criteria;
   - require Memory Bank index/spec updates in each repo.

## Recommended revised phase plan

### Phase 1: Framework contract spike

- Decide whether package is new or existing package extension.
- Inventory existing `core` and `api-contract` vocabularies.
- Add or draft `CanonicalResponseDocument` and visibility/citation/source-ref model.
- Add import-boundary proof.

### Phase 2: Minimal package/spec

- Create `@dd-bot-platform/channel-runtime` only if still justified after inventory.
- Add types + pure helpers only.
- Add `spec/runtime/channel-runtime-contract.md`.
- Update runtime/spec/protocol indexes.

### Phase 3: Docoved mapping proof

- Map `DocovedAnswerArtifact` to canonical document.
- Render same document to existing email/Telegram adapters without changing transport behavior.
- Keep beta email and Telegram proofs green.

### Phase 4: Command adoption design

- Reconcile existing `command-framework-contract.md` with channel command needs.
- Move Telegram-named command helpers into product-neutral command vocabulary only after document/rendering seam is stable.
- Add email/Telegram command parity proof.

### Phase 5: SellerAgent adoption

- Adopt same contract in SellerAgent.
- Keep SellerAgent handlers local.
- Prove no product dependency leaks into framework package.

## Final decision recommendation

Do not implement current `PRT-042` as-is.

Approve the direction, but revise protocol before coding:
- make first wave smaller;
- explicitly reuse existing framework packages;
- defer command and delivery orchestration;
- add observability/error/idempotency contracts at vocabulary level;
- add MBB routing and verification gates.

The protocol should remain ACTIVE, but it needs a `1.1.0` hardening edit before implementation tasks are opened.
