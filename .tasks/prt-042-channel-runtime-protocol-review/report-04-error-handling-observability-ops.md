# PRT-042: review reliability / observability / ops

Протокол хорошо фиксирует ownership и общую идею канонического документа, но в reliability-слое пока остаются важные нестыковки. Ниже — что именно не дожато и какие точечные правки нужны.

## Error handling gaps

- В протоколе нет явного контракта на ошибки для канонического документа, renderer’ов, command registry и delivery-plan’ов: не определено, как выглядит `ok/error`-ответ, где допускается throw, а где нужен typed failure envelope.
- Не различены классы ошибок по ownership: framework error, product error, adapter error и transport error. Сейчас из текста можно понять только, что продуктовые handlers остаются локальными, но не как их ошибки должны классифицироваться и пробрасываться наружу.
- Нет обязательного требования не “глотать” ошибки на boundary: например, silent fallback from render failure to plain text, или silent downgrade from command failure to generic response, остаются допустимыми по умолчанию.
- Не зафиксировано, какие ошибки retryable, а какие terminal. Для канонического delivery-потока это особенно важно, потому что часть ошибок должна завершать turn, а часть — переводить его в retry/blocked state.
- В protocol нет минимальной ошибки-формы с кодом, сообщением, bounded details и trace refs, хотя именно это нужно для совместимости с runtime trace / incident diagnostics.

## Observability gaps

- Протокол упоминает `responseId` / `runId` / `traceId`, но не требует их системно протаскивать через logs, events, delivery attempts и command invocations. Без этого корреляция между каналом, рендером и ответом будет дырявой.
- Не описан обязательный набор event names для channel-runtime: сейчас нет явных `render_started`, `render_failed`, `delivery_plan_built`, `delivery_attempt_failed`, `command_invoked`, `command_failed`, `retry_scheduled`, `retry_exhausted`.
- Не хватает обязательного log shape для этого слоя: `requestId`, `correlationId`, `operationId`, `channelRef`, `commandId`, `deliveryId`, `attemptId`, `responseId`, `runId`, `traceId`, `transportMessageRef`. Сейчас observability остаётся слишком общей.
- Протокол не говорит, где проходят границы между generic observability hooks и provider-specific tooling. Это оставляет риск протащить Sentry/Resend/Telegram-специфику в framework contract вместо product-local instrumentation.
- Нет нормы про body payloads в логах: для reliability-дебага нужен bounded structured detail, но без автоматического проталкивания больших ответов, секретов или raw transport payloads в обычные логи.

## Race/retry concerns

- Не определена idempotency model для delivery: если renderer или adapter будут ретраиться, неясно, какой ключ обеспечивает защиту от дублей и где живёт `deliveryPlanId` / `idempotencyKey`.
- Нет правила, как обрабатывать retries после частичного успеха: например, отправка в канал прошла, а persistence of outbound message failed. Это прямой путь к duplicate delivery on replay.
- Не описаны race conditions вокруг command execution и channel delivery: parallel webhook retries, duplicate inbound events, late-arriving reply threading refs и concurrent outbound attempts могут породить inconsistent state.
- Протокол не фиксирует ordering boundary между “план построен”, “доставлен”, “persisted”, “acknowledged”. Для email/чат-адаптеров это критично, потому что сейчас порядок side effects может различаться.
- Нет явного требования distinguish between retry by adapter, retry by runtime, и retry by transport. Без этого один и тот же fail может ретраиться на нескольких уровнях сразу.

## Operations rollout concerns

- Rollout section сейчас additive-only, но не задаёт operational proof requirements: что именно должно быть проверено в beta/prod, какие traces/logs нужны, и когда можно считать adoption безопасным.
- Нет явного beta/prod gate для runtime contract: например, proof that same canonical document renders consistently across at least two transports, and command parity remains stable after adoption.
- Не описаны stop conditions для rollout failure в терминах observability: отсутствие trace/correlation evidence, repeated delivery failures, or command/access regression should block promotion.
- Не хватает rollback guidance: если новый contract ломает rendering or command dispatch, protocol не говорит, какая минимальная reversible boundary должна остаться у продуктов.
- Для операционного слоя важно явно сказать, что framework contract не должен требовать product-specific provider secrets / transport runbooks; сейчас это не проговорено достаточно жестко.

## Concrete protocol edits

- Добавить в protocol отдельный раздел `Reliability and error contract` и зафиксировать, что каждый public boundary возвращает typed result envelope с `ok`, `error.code`, `error.kind`, `message`, `details`, `requestId`, `correlationId`, `responseId`, `runId`, `traceId`.
- Ввести taxonomy ошибок: `framework_error`, `product_error`, `adapter_error`, `transport_error`, `validation_error`, `conflict_error`, `retryable_error`, `terminal_error`; при этом runtime/adapter boundary должен различать retryable vs terminal.
- Дописать норматив: renderers и command helpers are pure and side-effect free; adapters may throw only at transport boundary; transport adapters must emit structured failure events before bubbling the error.
- Добавить explicit observability contract: canonical event names for start/fail/success/retry paths, plus required log keys `operationId`, `channelRef`, `commandId`, `deliveryId`, `attemptId`, `responseId`, `runId`, `traceId`, `transportMessageRef`.
- Зафиксировать idempotency rule: every delivery plan and command invocation must carry a stable dedupe key or equivalent attempt identity, and retries must reuse it unless a brand-new attempt is intentionally created.
- Добавить race-handling rule: adapter retries, runtime retries, and transport retries must not stack implicitly; only one layer owns retry for a given failure class.
- Уточнить rollout criteria: beta/prod adoption requires evidence of additive compatibility, deterministic rendering fixture parity, command parity, and at least one trace-linked failure path proving errors are observable, not swallowed.
- Explicitly prohibit provider-specific observability tooling in the generic contract: Sentry/Resend/Telegram hooks can exist only as product-local adapters, not as framework-owned requirements.

