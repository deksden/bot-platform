# Lean Design Review: channel-runtime duplication and reuse

## Краткий вывод

Текущий вариант `PRT-042` слишком широкий для первого шага.
Новый пакет `@dd-bot-platform/channel-runtime` в заявленном объёме дублирует уже существующие рамки `core`, `api-contract` и `scenario-system`, а также пересекается с отдельным `command-framework-contract`.

Для Docoved и SellerAgent достаточно более узкого первого слоя:
- общий канонический документ ответа;
- минимальный набор render-target / visibility / citation типов;
- только pure helpers для markdown → plain text и разбиения сообщений;
- без отдельной новой command-надстройки и без transport scheduler-слоя.

## Overengineering risks

- `channel-runtime` сейчас пытается одновременно стать:
  - моделью канонического ответа;
  - rendering contract;
  - command framework;
  - access/capability layer;
  - outbound delivery planner.
  Это уже не lean extraction, а мини-платформа поверх платформы.
- `OutboundDeliveryPlan` и `OutboundDeliveryThreading` выглядят как скрытый транспортный оркестратор. Для первого шага это преждевременно: они фиксируют семантику доставки до того, как стабилизирован сам документ ответа.
- `ChannelRenderer` + `ChannelRenderPolicy` + `RenderedChannelMessagePart` + chunking создают слишком много уровней абстракции для стартовой adoption-волны.
- `product-specific extension metadata under a typed generic` выглядит как будущий свалочный контейнер. Это обычно приводит к скрытому «framework-owned JSON bag», который потом трудно стабилизировать.
- Предложение выделить `@dd-bot-platform/channel-runtime` как отдельный package сейчас слабее, чем расширение уже существующего `@dd-bot-platform/api-contract` или `@dd-bot-platform/core`. Для первого wave новый package добавит не полезную изоляцию, а дополнительный слой публикации и версионирования.

## Duplication

- Канальные и control-plane сущности уже существуют в `packages/core/src/control-plane/models.ts`:
  - `ChannelKind`;
  - `ChannelCapabilityMatrix`;
  - `PipelineBinding`;
  - `ExecutionRun`;
  - `TraceArtifact`.
- Те же вещи уже продублированы в schema-форме в `packages/api-contract/src/control-plane/models.ts` и `packages/api-contract/src/control-plane/vocabulary.ts`.
- Логика проверки binding/capability уже есть в `packages/core/src/control-plane/channel-binding/status.ts` и `packages/core/src/control-plane/channel-binding/validation.ts`.
- Registry/validation seam уже есть в `packages/core/src/runtime/pipeline-registry.ts`, а naming alignment rules уже закреплены в `.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`.
- Command mechanics уже описаны отдельно в `.memory-bank/spec/runtime/command-framework-contract.md`; тащить их в channel-runtime значит дублировать существующий контракт.
- Semantic packet / result / evidence / provenance уже покрыты в `packages/api-contract/src/semantic-eval.ts` и `packages/scenario-system/src/semantic-eval/*`.
- Message/transcript normalization и prompt rendering паттерны уже есть в `packages/scenario-system/src/semantic-eval/transcript.ts` и `packages/scenario-system/src/semantic-eval/judge-runtime.ts`.

## Existing capabilities to reuse

- `packages/core/src/control-plane/capabilities.ts` — готовый общий словарь capability families; его можно переиспользовать, если каналам нужен capability-aware доступ.
- `packages/core/src/control-plane/models.ts` и `packages/api-contract/src/control-plane/models.ts` — уже дают устойчивые refs, channel kinds, trace artifacts и execution runs, которые не нужно переизобретать в новом пакете.
- `packages/core/src/runtime/pipeline-registry.ts` — уже обеспечивает registry/validation primitives для keyed definitions и channel-kind compatibility.
- `packages/api-contract/src/runtime.ts` и `packages/api-contract/src/semantic-eval.ts` — хорошие примеры того, как держать contract shapes в `api-contract`, а не в отдельном helper package.
- `packages/scenario-system/src/artifacts.ts` и `packages/scenario-system/src/types.ts` — уже решают run-id, artifact path, manifest, tier artifact и result envelope patterns; это полезно как reference для message chunking / render artifact naming.
- `.memory-bank/spec/runtime/command-framework-contract.md` — правильное место для command envelope / registry / dispatch vocabulary, если нужно усилить command seam.

## Smallest viable first version

### Keep

- Канонический документ ответа:
  - `CanonicalResponseDocument`;
  - `CanonicalResponseSection`;
  - `CanonicalResponseBlock`;
  - `CanonicalCitation`;
  - `CanonicalSourceRef`;
  - `CanonicalResponseMetadata`;
  - `CanonicalResponseVisibility`;
  - `CanonicalResponseArtifactRef`.
- Минимальный render-target vocabulary:
  - `ChannelKind`;
  - `ChannelRenderTarget`.
- Pure helpers:
  - `renderChannelMarkdownToPlainText`;
  - `splitRenderedMessageParts`.
- Смысловую модель visibility: `public`, `operator`, `debug`.

### Remove

- Отдельный command-contract внутри `channel-runtime`.
- `OutboundDeliveryPlan` как обязательный first-wave объект.
- `OutboundDeliveryThreading` как framework-owned абстракцию.
- `renderChannelMarkdownToHtml` в первой версии.
- Любые transport-specific payload fields вроде `parse_mode`, email headers или channel reply parameters в shared model.

### Defer

- HTML rendering.
- Subject/title rendering for email-like transports.
- Message chunking policy как отдельный framework object.
- Channel-specific delivery orchestration.
- Capability evaluator beyond simple visibility/access mapping.
- Generic typed extension metadata как основной extension mechanism.

### First-wave shape

- Если нужен именно type-only package, то он должен быть почти статическим contract slice:
  - без delivery engine;
  - без transport scheduler;
  - без command registry;
  - без actor resolution ownership;
  - без product-specific semantics.
- Практически это больше похоже на расширение `@dd-bot-platform/api-contract` для схем и `@dd-bot-platform/core` для pure helpers, чем на новый самостоятельный package.

## Concrete protocol edits

1. **Сузить цель пакета**
   - Заменить формулировку «Create a new framework package `packages/channel-runtime`» на «переиспользовать существующий контрактный слой и вынести только неизбежные общие типы/хелперы».
   - В тексте явно указать, что новый package не создаётся до появления как минимум двух реальных consumers.

2. **Убрать command subsystem из этого protocol**
   - Перенести `ChannelCommand*`, `ChannelCommandAccessPolicy`, `ChannelCommandActor`, `ChannelCommandCapability` в отдельную правку к `.memory-bank/spec/runtime/command-framework-contract.md`.
   - В `PRT-042` оставить только ссылку на существующий command framework contract.

3. **Нарезать rendering contract до минимального слоя**
   - Оставить только canonical response document, section/block, citations, source refs, visibility, artifact refs и markdown→plain text helper.
   - Отложить `ChannelRenderer`, `ChannelRenderPolicy`, `RenderedChannelMessage`, `RenderedChannelMessagePart`, `OutboundDeliveryPlan`, `OutboundDeliveryThreading` до второй волны.

4. **Упростить extension metadata**
   - Заменить «typed generic or explicitly namespaced record» на один стабильный `extensions: Record<string, unknown>` с именованными namespace keys.
   - Не вводить отдельные first-class framework fields для Docoved-only или SellerAgent-only деталей.

5. **Переиспользовать существующие framework vocabularies**
   - `ChannelKind`, binding/status, refs, trace artifacts и capability families должны ссылаться на существующие определения из `packages/core` / `packages/api-contract`, а не на параллельные новые enums.
   - Для `responseId`, `runId`, `traceId` использовать уже существующие execution/trace refs там, где это возможно, вместо нового идентификатора-надстройки.

6. **Зафиксировать lean first version for Docoved + SellerAgent**
   - Docoved: public answer markdown + citations/source refs + operator/debug refs.
   - SellerAgent: тот же document model для assist/response surfaces, без привязки к transport semantics.
   - Это уже закрывает общий semantic substrate без premature transport abstraction.

