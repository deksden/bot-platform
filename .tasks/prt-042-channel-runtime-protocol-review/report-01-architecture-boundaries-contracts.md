# PRT-042: review архитектурных границ и контрактов

## Сильные стороны

- Протокол правильно держит базовую ось ownership: `bot-platform` владеет фреймворк-истиной, а Docoved и SellerAgent — продуктовой истиной.
- Хорошо, что extraction задан как contract-first и additive: сначала типы и pure helpers, без БД, SDK и продуктовых зависимостей.
- Верно выделено различие между canonical document и transport-specific delivery: каналы должны рендерить и доставлять, но не решать продуктовую семантику.
- Полезно, что протокол сразу вводит visibility-слои `public / operator / debug` и не смешивает debug-метаданные с публичным ответом.
- Позитивно, что Docoved и SellerAgent описаны симметрично: это снижает риск, что контракт станет «Docoved-only в новой упаковке».
- Отдельно хорошо, что `sales-agent` явно зафиксирован как transitional/mixed lineage, а не как новый источник истины.

## Риски и пробелы

- Пакет `@dd-bot-platform/channel-runtime` сейчас выглядит слишком широким: в одном месте смешаны модель документа, рендеринг, command registry, access policy и outbound delivery plan. Это повышает риск нового «мини-монолита» внутри framework.
- Граница с уже существующими пакетами недостаточно жёсткая. В `packages/api-contract` уже есть `ChannelKind`, а в `packages/core` уже есть capability vocabulary и execution/trace vocabulary; протокол пока не говорит, что именно переиспользуется, а что только переэкспортируется или расширяется.
- `ChannelCommandCapability` и список `read_help/read_status/...` выглядят как отдельная authorization-vocabulary, но не связаны явно с существующими control-plane capability families. Без этого легко получить две параллельные системы прав.
- Разделение между framework renderer и product adapter описано, но не зафиксировано нормативно: из текста можно понять, что `ChannelRenderer` — это либо чистая функция, либо абстракция, либо место для будущих адаптеров.
- `CanonicalResponseDocument` определён семантически, но не как часть существующего execution/result/trace контура. Неясно, это новая persisted-форма, результат runtime, или только промежуточный канонический payload для delivery.
- В протоколе нет явного запрета на дублирование уже существующих shared refs и vocabularies. Для будущей поддержки типов важно сразу зафиксировать, что `channel-runtime` не переизобретает `ChannelKind`, `ExecutionRunRef`, `TraceArtifactRef` и близкие базовые идентификаторы.
- Внешние отношения с `packages/core`, `packages/api-contract` и `packages/scenario-system` описаны только косвенно; для boundary review этого недостаточно.

## Рекомендуемые правки протокола

- Сузить формулировку scope пакета: `channel-runtime` должен быть execution-time channel substrate, а не общий контейнер для любых channel-related типов.
- Явно разделить три слоя:
  1. canonical document model;
  2. pure rendering helpers;
  3. command/access policy vocabulary.
  Адаптеры и transport-specific delivery оставить вне пакета.
- Добавить норму о reuse: если базовый ref, kind, capability family или execution vocabulary уже существует в `@dd-bot-platform/core` или `@dd-bot-platform/api-contract`, новый пакет должен его импортировать или переэкспортировать, а не заводить параллельный термин.
- Прописать связь command-caps с control-plane access: channel-command capabilities — это execution-facing permissions, а не замена control-plane membership/capability families.
- Зафиксировать, что `CanonicalResponseDocument` — это каноническая runtime-форма ответа для рендера и delivery, а не новый product source of truth.
- Явно сказать, что renderers — pure, side-effect free; delivery plans — data only; sending message/email/web request делают product-local adapters.
- Добавить в protocol отдельный абзац о границе с `scenario-system`: если понадобится verification/fixture coverage для рендера и command policy, это scenario-level проверка, а не часть channel-runtime.
- Обновить publish/packaging guidance: новый пакет должен быть сразу включён в allowlist публикации и в package-graph proof, иначе boundary story останется неполной.

## Предлагаемые формулировки

- Вместо:
  `bot-platform owns the generic types and reusable contracts for canonical response documents, channel renderers, command registry primitives, actor capabilities, and outbound delivery plans;`
  
  Лучше:
  `bot-platform owns the execution-time channel substrate. The channel-runtime package may define canonical response-document, rendering, and command-policy contracts, but it must reuse existing framework vocabulary where that vocabulary already exists in core or api-contract.`

- Вместо:
  `The package may include pure helpers: renderChannelMarkdownToHtml ...`
  
  Лучше:
  `The package may include pure helpers only. Rendering helpers must be deterministic and side-effect free; transport adapters remain product-local and consume rendered delivery plans.`

- Добавить после описания command contract:
  `Channel-command capabilities are execution-time permissions. They do not replace control-plane membership or access families; products map their identity and membership model onto channel-command policy decisions.`

- Добавить после описания canonical response document:
  `CanonicalResponseDocument is a runtime delivery contract, not a persisted product artifact. Product artifacts remain the source of truth and are mapped into the canonical document at the boundary.`

- Добавить в section про target package:
  `If an identifier already exists in @dd-bot-platform/core or @dd-bot-platform/api-contract, channel-runtime must reference it by import or re-export unless the new package has a strong reason to define a stricter subtype.`

## Итог

- Направление протокола правильное: контракт нужен, и его лучше вводить в `bot-platform`.
- Основной недочёт сейчас не в самой идее, а в недостаточно жёстком разграничении с уже существующими framework-пакетами и vocabulary-слоями.
- Если протокол добавить явное reuse/alias правило и сузить scope пакета до execution-time substrate, он станет заметно безопаснее для дальнейшей реализации.
