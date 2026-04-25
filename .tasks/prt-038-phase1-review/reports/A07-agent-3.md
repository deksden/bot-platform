# A07 Review — Error Handling, Reliability, and Concurrency (agent-3)

## Что уже хорошо

- В `PRT-040` уже зафиксирован workflow-backed подход и запрет на bypass через чат (`.../PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:111-133`), плюс обязательная честная классификация `supported/degraded/unsupported` (`...PRT-040...:102-110`).
- В `PRT-039` есть правильный каркас control-plane: единый словарь объектов/capabilities и import правил из auth/control-plane SSoT (`.../PRT-039-shared-control-plane-access-channel-and-management-substrate.md:63-69,70-101`).
- Базовые platform SSoT уже задают нужную надежностную рамку: normalized error classes + idempotency + transactional expectations (`.../spec/runtime/persistence-interface-and-store-boundary.md:69-123`), explicit lifecycle/idempotency для workflow start/callback (`.../spec/runtime/workflow-framework-contract.md:62-137`), no-silent-fallback + retry policy (`.../spec/operations/observability-and-incident-diagnostics.md:220-249`).
- В смежном Docoved runtime уже есть эталонные activation-конструкции (state machine, idempotency key, activation lock, concurrent publication rule), на которые можно опереться при формулировке shared-протокола (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md:121-160`).

## Пробелы и риски

Карта ключевых failure modes в `PRT-039/040`:

1. `ImportRun` double-submit / duplicate import.
Триггер: повторная отправка из UI/CLI/bot, webhook retry, network retry.
Риск: дублирующиеся `ImportRun`, двойной импорт, конфликтующие отчеты.
Пробел: в `PRT-040` нет idempotency/dedup key для шага `receive -> create ImportRun` (`...PRT-040...:113-121`).

2. Out-of-order/duplicate workflow callbacks.
Триггер: retry callback/worker replay.
Риск: неверный финальный статус run (например, поздний `failed` перетирает `completed` или наоборот).
Пробел: lifecycle есть только «shape», но нет transition policy и callback idempotency в самом `PRT-040`.

3. Partial success with silent failure.
Триггер: processing bundle создан, но report/state write упал.
Риск: «зависший» run без терминального статуса; оператор видит неконсистентную картину.
Пробел: нет явного требования terminal state + error envelope + escalation при частичном падении.

4. Activation race (conflicting activation).
Триггер: две почти одновременные активации разных candidate revisions одного source.
Риск: pointer flapping, lost update, неочевидно какой snapshot реально active.
Пробел: в `PRT-040` нет source-scoped serialization/lock/CAS для activation шага (`...PRT-040...:120,142,165`).

5. Stale approval / stale binding.
Триггер: approve приходит по старой ревизии после появления новой.
Риск: активация устаревшего кандидата вопреки последнему решению оператора.
Пробел: нет optimistic concurrency (version/etag/expected-current) для approval/activation.

6. Channel + pipeline binding lost updates.
Триггер: параллельные изменения из UI и CLI.
Риск: last-write-wins без детекта конфликтов, неожиданный откат `pipelineArgs`/policy override.
Пробел: `PRT-039` описывает модель и ownership, но не фиксирует OCC/serialization на write-path (`...PRT-039...:122-135,171-177,219-224`).

7. Runtime/config drift при смене binding во время входящего трафика.
Триггер: binding update совпадает с обработкой inbound сообщения.
Риск: часть событий идет по старому pipeline, часть по новому без явной границы cutover.
Пробел: нет atomic cutover semantics или «effective-from» правила для binding update.

8. Membership/access TOCTOU.
Триггер: роль/членство изменили, но активные сессии продолжают обладать старыми правами.
Риск: privilege linger после downgrade/revoke.
Пробел: `PRT-039` перечисляет capability vocabulary, но не задает policy для session invalidation/recheck on mutation.

9. Bot submission ↔ backend workflow handoff ambiguity.
Триггер: бот подтвердил принятие, но workflow старт фактически не принят в durable storage.
Риск: «принято в чат» без реального run; потеря задачи.
Пробел: нет обязательного правила «ack only after durable run id».

10. User-friendly masking of hard failures.
Триггер: стремление скрыть сложность оператору.
Риск: silent downgrade, ложный success, потеря диагностируемости.
Пробел: в `PRT-039/040` нет явной привязки к no-silent-fallback policy из observability spec (`.../observability-and-incident-diagnostics.md:220-229`).

## Что убрать/не вводить

- Не вводить best-effort auto-retry для неидемпотентных мутаций (`activate`, `rebind`, `membership change`) без idempotency key/OCC.
- Не вводить «мягкие» fallback-ветки, которые переводят ошибку в success без явного состояния `failed/conflict`.
- Не расширять direct-admin chat до primary surface для сложных структурных write-операций (это уже ограничено и нужно сохранить).
- Не нормализовать last-write-wins как baseline для channel binding и membership mutate.

## Что минимально добавить в протокол

1. Для `PRT-040` зафиксировать минимальный `ImportRun` state machine и allowed transitions.
Минимум: `created -> processing -> importing -> review_required|ready_for_activation -> activating -> activated|failed|canceled`.

2. Для `PRT-040` зафиксировать idempotency для старта import.
Минимум: required `submission_id`/`idempotency_key` на входе, повтор с тем же ключом обязан возвращать тот же `ImportRunRef`.

3. Для `PRT-040` зафиксировать activation concurrency policy.
Минимум: source-scoped activation lock или CAS по `expected_current_revision`; единственный active per `(source_ref, environment)`.

4. Для `PRT-039` зафиксировать OCC для channel/pipeline binding и membership writes.
Минимум: `version`/`etag` в write contract; mismatch => typed `Conflict`, без silent overwrite.

5. Для `PRT-039` зафиксировать atomicity scope для связанных полей binding.
Минимум: `entry_pipeline`, `pipelineArgs`, `policy override` обновляются как одна мутация.

6. Для bot-mediated handoff (PRT-040) зафиксировать durable acceptance rule.
Минимум: бот может отвечать «run started» только после устойчивого создания `ImportRun` и корреляции с workflow run id.

7. Добавить обязательный typed error policy (общий минимум для PRT-039/040).
Минимум классов: `Validation`, `Conflict`, `NotFound`, `AccessDenied`, `Unavailable`, `InvalidTransition`; machine-readable `reason_code`.

8. Добавить минимальные observability-события для эскалации.
Минимум: `import_run_failed`, `import_run_conflict`, `activation_conflict`, `channel_binding_conflict`, `membership_update_conflict`, `retry_exhausted`; с `correlation_id` и ссылкой на run/binding.

## Premature abstractions

- Глобальный распределенный lock-сервис для всех доменов сейчас избыточен; first-wave достаточно source-scoped lock/CAS в owning persistence.
- Универсальный «конструктор retry-политик» для всех операций сейчас лишний; достаточно фиксированных правил retriable/non-retriable по классам ошибок.
- Полноценный cross-product saga/orchestrator для control-plane и import одновременно преждевременен; достаточно строгих локальных контрактов идемпотентности и transition guards.
- Отдельный shared hosted control-plane/import service ради «чистой архитектуры» преждевременен (и противоречит first-wave stance в `PRT-038`).
