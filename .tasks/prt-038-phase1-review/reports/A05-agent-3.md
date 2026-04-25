# A05 Review — Lean Design, Abstractions, and No Overengineering

## Что уже хорошо

- В протоколах явно зафиксирован lean-first курс: в phase 1 нужны `shared contracts + product-local implementation`, без обязательного общего hosted control-plane и без shared DB (`PRT-038:72-77`, `PRT-039:202-206`, `PRT-040:151-157`).
- По source-processing выбран правильный anti-overengineering порядок: сначала контракт/пакетный seam, а не отдельный продукт/сервис (`ADR-005:125-129`, `PRT-040:152-157,190-191`, `product-line-layering-and-split-rationale.md:117-124`).
- Есть явный запрет на universal RBAC в framework: стандартизируются capability families, а role ladders остаются product-local (`PRT-039:103-105,108-117`).
- Есть явный запрет на преждевременную UI-централизацию: платформа дает primitives, а продуктовая IA остается в product repos (`PRT-039:190-199`).
- Product-local normativity rule снижает риск “централизации через документацию”: ежедневная разработка идет из локальных протоколов, а upstream синхронизируется через mirror-rule (`PRT-038:268-281`, `seller-agent PRT-008:117-126`, `docoved-agent PRT-038:125-134`).
- Promotion rule зафиксирован в простом и здоровом виде: поднимать вверх только действительно product-agnostic или уже имеющее 2+ реальных потребителя (`three-layer-product-line-architecture.md:177-181`, `feature-area-boundaries.md:139-143`).
- В коде пока нет признаков преждевременной сервисной декомпозиции: validation pipeline binding реализован как компактный контрактный модуль, а не как слой из лишних сервисов/адаптеров (`packages/core/src/runtime/pipeline-registry.ts:39-167`).

## Пробелы и риски

- Слишком ранняя “заморозка” богатой shared object vocabulary при том, что ключевые вопросы еще открыты (package cuts, persistence placement). Это риск зафиксировать лишнюю абстракцию раньше, чем появится подтвержденная польза (`PRT-038:61,97-101,140-156`).
- Несогласованность канона объектов между документами: `ImportReport` есть в PRT-040, но отсутствует в umbrella/spec canonical lists. Это создает дрейф модели и шанс на лишние промежуточные сущности (`PRT-040:60-68`, `PRT-038:140-156`, `three-layer-product-line-architecture.md:125-143`).
- В PRT-039 формулировка “Freeze shared object shapes and capability vocabulary” может подтолкнуть к избыточному раннему замыканию API/RBAC до реальной двупродуктовой проверки (`PRT-039:214-216`, `PRT-039:90-101`).
- UI-формулировки про reusable protected-shell + generic table/detail patterns могут спровоцировать premature UI-framework extraction вместо поставки узких рабочих surfaces (`PRT-039:162-169,216`).
- Канальный roadmap (telegram/email + bitrix24/other adapters) полезен как направление, но без явного “not now” легко уводит в future-proofing архитектуру раньше бизнес-нужды (`PRT-039:148-156`).
- Source-processing output contract уже богатый; без деления на “минимум phase 1” и “расширения” есть риск сделать тяжелый shared engine до подтвержденного второго потребителя (`PRT-040:90-97`).
- `ActivationDecision` и `SourceProcessingProfile` перечислены как optional later, но само появление в canonical section может преждевременно запускать schema/API работу (`PRT-040:69-72`).
- Текущее требование “only later if >1 real consumer” есть в тексте, но не закреплено как обязательный extraction gate; это оставляет лазейку для раннего выделения сервиса под давлением “чтобы было красиво” (`PRT-040:155`, `PRT-040:177-183`).

## Что убрать/не вводить

- Не вводить в phase 1 глобальный hosted control-plane service.
- Не вводить в phase 1 shared cross-product database.
- Не вводить universal RBAC ladder (единые продуктовые роли в framework).
- Не выносить продуктовые экраны/IA в platform UI framework layer.
- Не создавать отдельный source-processing product/service до подтвержденного второго реального потребителя.
- Не поднимать `ActivationDecision` и `SourceProcessingProfile` в обязательный shared schema scope phase 1.
- Не строить “универсальный канал-фреймворк на будущее” под неиспользуемые adapters.
- Не подменять SellerAgent business-profile publication generic import-моделью (`seller-agent PRT-008:150-153,245-246`).

## Что минимально добавить в протокол

- Добавить в `PRT-038` короткий блок `Phase-1 Minimality Guardrails`:
  - “No new network boundary for control-plane/governed-content in phase 1.”
  - “No shared DB mandate in phase 1.”
  - “Contracts/packages first, hosting later by explicit gate.”
- Добавить `Canonical Vocabulary Consistency Rule`: новый shared объект появляется только после синхронного обновления umbrella + spec + child-protocol, иначе объект считается `experimental` и не блокирует phase 1.
- Добавить `Extraction Gate` (явно в acceptance): отдельный сервис разрешен только при `>=2` реальных потребителях + явной ops-причине.
- Для `PRT-039` добавить `UI Primitive Budget` на phase 1: shell + selectors + membership/channel forms + diagnostics viewers; без platform-owned product routes/IA.
- Для `PRT-039` ограничить capability freeze только минимальным набором phase 1; families типа `policy.*` оставить как optional до второго потребителя.
- Для `PRT-040` разделить extraction bundle на `required now` и `best-effort later`, чтобы не раздувать первую реализацию.
- Для `PRT-040` добавить жесткую фразу: “optional later objects are non-blocking and must not trigger schema-first implementation in phase 1.”

## Premature abstractions

- “Богатый и полностью frozen shared object canon” до закрытия вопросов по persistence/package cuts и до подтверждения 2+ потребителей.
- “Опциональные future-objects в каноне” как триггер преждевременного schema/API проектирования.
- “Reusable generic table/detail + protected-shell framework” как ранняя цель вместо локальных продуктовых surfaces.
- “Канальная супер-абстракция под будущие adapters” до фактической необходимости за пределами `telegram/email`.
- “Capability vocabulary как скрытый universal RBAC” (когда framework начинает диктовать продуктовые роли через слишком широкий first-wave scope).
