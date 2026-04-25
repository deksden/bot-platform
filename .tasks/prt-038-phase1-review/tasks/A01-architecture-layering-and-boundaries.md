# Aspect A01: Architecture, Layering, and Boundaries

Цель:
- проверить, что пакет протоколов `PRT-038/039/040` действительно задает цельную трехслойную архитектуру;
- убедиться, что слои не смешаны, а границы между `platform substrate`, `shared cross-product substrate`, `product policy pack` заданы ясно, без двусмысленностей и скрытых пересечений;
- найти места, где архитектурная модель либо недоопределена, либо создает риск повторного смешения платформы и продуктовых репозиториев.

Что смотреть:
- `.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `.memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md`
- `.memory-bank/spec/project/three-layer-product-line-architecture.md`
- `.memory-bank/spec/architecture/boundaries.md`
- `.memory-bank/spec/project/feature-area-boundaries.md`
- продуктовые adoption docs в `seller-agent` и `docoved-agent`

Что искать:
- согласован ли общий top-down architecture story между ADR, spec и protocol;
- нет ли конфликтов между декларативной архитектурой и execution-протоколом;
- достаточно ли ясно определено, что остается в `bot-platform`, а что навсегда остается в продуктах;
- не остались ли серые зоны, где ownership можно трактовать двояко;
- не вводится ли лишняя архитектурная сложность ради абстракции;
- нет ли мест, где слои названы правильно, но фактически обязанности распределены неудачно.

Особый фокус:
- проверить, не пытается ли платформа тихо стать “единым продуктом управления всем”;
- проверить, что shared substrate не превращается в “свалку всего похожего”;
- проверить, что separation достаточно практичен для рефакторинга, а не только красив на бумаге;
- проверить, что правила для параллельной работы продуктовых репозиториев действительно безопасны.

Ожидаемый отчет:
- перечисли сильные стороны текущей архитектурной схемы;
- перечисли неясные границы и почему это опасно;
- выдели места, где архитектуру надо упростить или сделать более явной;
- предложи минимальные правки в протокол, а не общие рассуждения;
- отдельно пометь, какие возможные “улучшения” были бы лишним overengineering.
