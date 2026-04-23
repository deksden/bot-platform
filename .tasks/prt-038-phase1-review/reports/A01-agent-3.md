# A01 — Architecture, Layering, and Boundaries (independent review)

Проверено по фокусу A01: `ADR-005`, `spec/project/three-layer-product-line-architecture.md`, `spec/architecture/boundaries.md`, `spec/project/feature-area-boundaries.md`, `PRT-038/039/040`, а также product adoption docs в `seller-agent` и `docoved-agent` плюс кодовые якоря по смешению слоев.

## Что уже хорошо

- Top-down story в целом согласован: в ADR, spec и umbrella protocol одинаково зафиксирована трехслойная модель `platform substrate -> shared cross-product substrate -> product policy packs` и ownership у `bot-platform` только для слоев 1-2 (`.memory-bank/plans/adr/ADR-005-...`, `.memory-bank/spec/project/three-layer-product-line-architecture.md:52-103`, `.memory-bank/plans/protocols/PRT-038-...:44-47`).
- Есть явные anti-flattening guardrails: что именно нельзя забирать из продуктов, включая Seller/Docoved invariants (`.memory-bank/spec/project/three-layer-product-line-architecture.md:67-70,107-123`, `.memory-bank/spec/project/feature-area-boundaries.md:121-135`).
- Архитектура не загоняется насильно в централизованный хостинг на первом шаге: несколько раз повторен first-wave stance без обязательного shared DB/one control-plane service (`PRT-038:72-76`, `PRT-039:202-210`, `PRT-040:146-154` + product protocols).
- В `PRT-039` корректно разделено: platform стандартизирует capability vocabulary, но product repos оставляют свои role ladders и IA (`PRT-039:90-120,192-199`).
- В `PRT-040` хорошо закреплен workflow-backed import и запрет на тяжелое редактирование через чат, что защищает границы governance (`PRT-040:107-133`).
- Для параллельной работы репозиториев введен практичный режим local normativity + mirror sync rule, и он отражен и в платформенном, и в product-local протоколах (`PRT-038:268-281`, `seller PRT-008:117-129`, `docoved PRT-038:125-137`).

## Пробелы и риски

- Риск нормативного дрейфа между репозиториями: local normativity есть, но нет формального механизма версии контракта/совместимости при mirror sync (есть правило “зеркалить”, но нет обязательного handshake) (`PRT-038:277-281`, `seller PRT-008:123-128`, `docoved PRT-038:131-136`). Опасность: тихий рассинхрон словаря и прав доступа между командами.
- Неполная согласованность канонического словаря между уровнями: `ImportReport` зафиксирован как shared object в `PRT-040`, но отсутствует в canonical shared vocabulary в проектной норме и umbrella (`three-layer spec:125-143`, `PRT-038:140-156`, `PRT-040:63-67`). Опасность: неодинаковое трактование обязательных shared сущностей.
- В capability vocabulary есть слишком широкий `policy.read/manage` без четкой привязки к объектной модели этого же протокола (`PRT-039:98-99`), что открывает серую зону для “platform policy engine обо всем”.
- В channel model присутствуют расплывчатые поля “transport configuration summary” и “optional product-local association refs” (`PRT-039:133-135`). Опасность: shared `Channel` станет “свалкой” продуктовых хвостов.
- Promotion rule слишком общий (“product-agnostic” или “2 real consumers”) без проверяемого критерия доказательств (`feature-area-boundaries:137-143`, `three-layer spec:175-181`). Опасность: преждевременное поднятие кода “по ощущению” и повторное смешение ownership.
- Практическая граница пока не дожата в коде: остаются прямые cross-product seams, несмотря на правильные целевые правила.
- Идентичный pipeline catalog в обоих продуктах, включая `seller_conversation` и `docoved_answer` (`seller-agent/packages/core/src/runtime/pipelines.ts:3-55`, `docoved-agent/packages/core/src/runtime/pipelines.ts:3-55`).
- В SellerAgent conversation service есть встроенный `docoved_answer` execution path (`seller-agent/packages/core/src/conversations/service.ts:923-1034,1089-1177`).
- В Docoved пакетах остаются зависимости на `@selleragent/*` (`docoved-agent/apps/api/package.json:20`, `docoved-agent/packages/core/package.json:17-18`, `docoved-agent/packages/db/package.json:15-17`).
- Это признано как cleanup target в docs (`three-layer spec:185-189`, product protocols), но не закреплено как обязательный архитектурный gate со сроком/критерием выхода.

## Что убрать/не вводить

- Не вводить единый “platform product” с централизованной IA для всех экранов; оставить платформе primitives/blocks, а продуктам — продуктовый UX (`PRT-039:192-199`, `three-layer spec:148-162`).
- Не вводить mandatory shared DB и единый hosted control-plane service в первой волне (`PRT-038:72-76`, `PRT-039:202-210`).
- Не вводить универсальную global RBAC-лестницу поверх продуктовых ролей; стандартизировать только capabilities (`PRT-039:90-120`).
- Не превращать shared governed-content в замену SellerAgent business-profile publication (`PRT-040:146-149`, `seller PRT-008:150-156,233-247`).
- Не расширять direct-admin chat до редактора сложной конфигурации и контента (`PRT-039:178-188`, `PRT-040:124-133`).
- Не выделять отдельный source-processing продукт/сервис до появления реального мультипродуктового операционного давления (`PRT-040:152-154`).

## Что минимально добавить в протокол

- В `PRT-038` добавить компактный `Shared Contract Versioning` блок: `contract_version`, список измененных shared сущностей/капабилити и обязательные mirror target revisions в `seller PRT-008` и `docoved PRT-038` до статуса “binding”.
- В `PRT-038` добавить gate `P1 shared-contract-sync-safe`: изменение shared vocabulary/capabilities считается завершенным только при явном подтверждении совместимости в трех репозиториях (bot-platform + seller-agent + docoved-agent).
- В `PRT-039` уточнить модель `policy.*`: либо убрать `policy.read/manage` до появления строго описанного shared `Policy` объекта, либо сразу добавить объект, ownership и минимальные поля.
- В `PRT-039` формализовать extension boundary для `Channel`: продуктовые расширения только через namespaced extension payload, запрет на внесение продуктовых инвариантов в top-level shared поля.
- В `PRT-040` и `three-layer spec` синхронизировать статус `ImportReport`: либо включить в канонический shared vocabulary в верхнеуровневых документах, либо явно пометить как optional overlay и условия, когда он становится core shared object.
- В `PRT-038` добавить “no-new-cross-product-deps” правило на волну: новые зависимости `@selleragent/*` в Docoved и `@docoved-agent/*` в SellerAgent допускаются только как time-boxed exception с owner и датой удаления.

## Premature abstractions

- Универсальный “policy platform” до стабилизации узких shared capability contracts.
- Полная унификация pipeline taxonomy между продуктами до закрытия текущих смешанных seams.
- Глобальный control-plane UI как единый продукт вместо набора platform primitives.
- Раннее выделение source-processing в отдельный сервис/продукт при единственном полном потребителе (Docoved).
- Обобщение Seller business-profile и Docoved knowledge lifecycle в одну “generic governed content” доменную модель на уровне policy, а не только substrate contracts.
