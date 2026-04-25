# A06 Review — Reuse, Duplication, Refactoring, and Code Smells

## Что уже хорошо

- В платформенных документах правильно зафиксированы reuse-границы: поднимать в `bot-platform` только product-agnostic или уже multi-consumer, иначе оставлять локально (`.memory-bank/spec/project/feature-area-boundaries.md:137-155`, `.memory-bank/spec/architecture/boundaries.md:41-53`).
- В `PRT-038` есть явный cleanup-фокус на дубли runtime, fake shared buckets и Seller-residue в Docoved (`.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:206-213`).
- Product-local протоколы уже правильно называют ключевые smell-зоны:
  - Seller: hidden Docoved seam + server-only implicit config + `packages/shared` tail (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md:253-275`);
  - Docoved: Seller-scoped deps + duplicated runtime (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md:293-304`).
- Уже существует usable shared seam в `bot-platform`: generic kernel + pipeline-registry (`/Users/deksden/Documents/_Projects/bot-platform/packages/core/src/runtime/kernel.ts:3-222`, `/Users/deksden/Documents/_Projects/bot-platform/packages/core/src/runtime/pipeline-registry.ts:1-167`), и есть рабочий пример product-side reuse через `@dd-bot-platform/*` в `sa-judge` (`/Users/deksden/Documents/_Projects/seller-agent/packages/sa-judge/package.json:35-43`).
- Прямых `@sales-agent/*` импортов в `ts`/`package.json` (вне changelog/markdown) по текущему коду не найдено; это хороший сигнал, что новый runtime-код уже не возвращается к старому scope.

## Пробелы и риски

- Протоколы недооценивают фактический объем duplicated runtime. Зафиксированы только отдельные якоря, но реально есть большой идентичный пласт между Seller и Docoved (`kernel.ts`, `pipelines.ts`, `docoved-execution*.ts`, `docoved-search*.ts`, `research-workflow.ts` и др.; подтверждено побайтным сравнением).
- Hidden product integration уже живет в “ядре” Seller conversation path: `createConversationService` напрямую вшивает `docoved_answer` execution lane и Docoved-specific context/metadata (`/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/conversations/service.ts:923-1033`, `:1089-1177`).
- В Docoved runtime сохранились Seller-предпосылки в базовом kernel: workflow families включают `seller_conversation`/`draft_review`, а default reply-mode маппится в `seller_conversation` (`/Users/deksden/Documents/_Projects/docoved-agent/packages/core/src/runtime/kernel.ts:12-15`, `:157-179`, `:194-198`). Это mixed ownership smell.
- Есть дублирование уже существующего platform seam: локальные `pipelines.ts` в обоих продуктах дублируют идею валидации из `@dd-bot-platform/core` (`/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/runtime/pipelines.ts:1-130`, `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/src/runtime/pipelines.ts:1-130` vs `/Users/deksden/Documents/_Projects/bot-platform/packages/core/src/runtime/pipeline-registry.ts:98-167`).
- Cross-product dependency direction пока нарушен в Docoved: зависимости на `@selleragent/*` в core/db/api (`/Users/deksden/Documents/_Projects/docoved-agent/apps/api/package.json:15-22`, `/Users/deksden/Documents/_Projects/docoved-agent/packages/core/package.json:14-19`, `/Users/deksden/Documents/_Projects/docoved-agent/packages/db/package.json:14-18`).
- “Implicit server-only configuration paths” подтверждаются кодом, но не закрыты backlog-гейтом sunset: fallback на `memoryBankRootPath/entryDocumentPath` при отсутствии knowledge source (`/Users/deksden/Documents/_Projects/docoved-agent/apps/api/src/docoved-answer-service.ts:139-153`; аналогично `/Users/deksden/Documents/_Projects/seller-agent/apps/server/src/delivery-support/email-research.ts:537-551`).
- Legacy compatibility tail в Seller conversation path все еще глубокий (`LEGACY_TELEGRAM_DIRECT_*` + normalizer flow), но в протоколах нет явного критерия, когда эти compat-ветки должны быть удалены (`/Users/deksden/Documents/_Projects/seller-agent/packages/core/src/conversations/service.ts:248-284`, `:2372-2434`).

## Что убрать/не вводить

- Не вводить новые cross-product импорты вида `@selleragent/*` в Docoved runtime/core/db и наоборот; разрешать только platform scope и product-local scope.
- Не расширять `packages/shared` как “общий” слой для продуктовой семантики; этот bucket уже помечен как migration tail, а не owner (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/business-profile-project-and-package-ownership.md:33-35`).
- Не добавлять новые runtime-копии одинаковых helper’ов в Seller/Docoved, если в `@dd-bot-platform/core` уже есть эквивалентный контрактный seam.
- Не вводить новые implicit raw-path входы (`memoryBankRootPath`/`entryDocumentPath`) как нормальный путь поверх control-plane binding.
- Не реанимировать `@sales-agent/*` в новом коде/пакетах (оставить только исторический контекст в архивных docs/changelog).

## Что минимально добавить в протокол

- Добавить в `PRT-038` обязательный `Duplication Burn-down` список с file-level инвентарем и владельцем/сроком:
  - минимум: `runtime/kernel.ts`, `runtime/pipelines.ts`, `runtime/docoved-execution*.ts`, `runtime/research-workflow.ts`, `apps/*/docoved-answer-service or email-research invocation helpers`.
- Добавить gate `NoCrossProductCoreDeps` для product-local adoption протоколов:
  - Docoved runtime не должен зависеть от `@selleragent/core`/`@selleragent/shared`;
  - Seller runtime не должен становиться хостом Docoved logic вне явного integration adapter boundary.
- Добавить gate `PreferPlatformSeamWhenExists`:
  - при наличии `@dd-bot-platform/core` seam (kernel/pipeline-registry) новые изменения в дублируемых helper’ах допускаются только через миграцию на shared package или через documented exception.
- Добавить явную задачу sunset для raw-path compatibility mode:
  - когда разрешен;
  - где задокументирован;
  - по какому сигналу удаляется.
- Добавить отдельный cleanup-task на “compat layer retirement” для legacy Telegram metadata normalization в Seller conversation service.

## Premature abstractions

- Полная унификация всего conversation service между Seller и Docoved в этой волне (слишком высокий риск регрессии продуктовых инвариантов).
- Раннее выделение отдельного hosted/shared control-plane сервиса и shared DB до закрытия duplicate/runtime ownership хвостов (`PRT-039` уже правильно предупреждает не форсировать это в first wave).
- Вынос source-processing в отдельный сетевой сервис до второго реального потребителя (`PRT-040` уже задает правильный порядок: contract/package seam сначала).
- Попытка “универсализировать” продуктовые role ladders и workflow naming поверх текущего mixed legacy до завершения cleanup dependency direction.
