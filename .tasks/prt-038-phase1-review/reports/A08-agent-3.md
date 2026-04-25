# A08 Review — Observability, Logging, Diagnostics, and Investigability (agent-3)

## Что уже хорошо

- В `PRT-039` уже есть правильная рамка для control-plane diagnostics: импорт framework truth про observability surfaces (`.../PRT-039-shared-control-plane-access-channel-and-management-substrate.md:63-68`), канонические объекты `ExecutionRun`/`TraceArtifact` и соответствующие capability (`...PRT-039...:70-102`), плюс явное ограничение direct-admin chat как bounded inspection surface (`...PRT-039...:178-188`).
- В `PRT-040` уже зафиксирован workflow-backed import flow с обязательным `ImportRun` и структурированным `ImportReport` (`.../PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:111-120,159-167`), а также честная классификация `supported/degraded/unsupported` без silent drop (`...PRT-040...:102-110`).
- В operations SSoT есть зрелый observability baseline: обязательная structured log shape, correlation policy, event taxonomy, error classes, retry/crash policy и no-silent-fallback rule (`.../spec/operations/observability-and-incident-diagnostics.md:72-263`).
- В runtime SSoT уже формализованы trace lineage (`ExecutionTrace/Step/Attempt`) и связь с артефактами (`.../spec/runtime/execution-traces-and-token-accounting.md:44-100`), включая usage fields/token accounting (`...execution-traces-and-token-accounting.md:104-121`).
- Для sensitive diagnostics есть отдельная governance-модель: selective heavy capture, redaction states + reasons, retention classes, auditable access (`.../spec/runtime/trace-artifact-governance.md:55-123`).
- Для фоновых workflow уже есть явные требования к correlation/idempotency/lifecycle/status readback/traceability (`.../spec/runtime/workflow-framework-contract.md:62-152`), что хорошо ложится на import-path в `PRT-040`.

## Пробелы и риски

1. **В `PRT-039/040` нет явной нормализации observability inheritance на уровне самого протокола.**  
   В `related_files` у `PRT-039/040` нет прямых ссылок на `observability-and-incident-diagnostics`, `execution-traces-and-token-accounting`, `trace-artifact-governance`, а у `PRT-040` нет и `workflow-framework-contract` (`...PRT-039...:11-20`, `...PRT-040...:11-19`).  
   Риск: имплементация пойдёт “по памяти” и разные команды начнут расходиться по event/trace/log contract.

2. **Для import/control-plane операций не закреплён минимальный mandatory event coverage (start/finish/failure).**  
   `PRT-040` описывает lifecycle шагами (`...PRT-040...:113-120`), но не фиксирует обязательные события; `PRT-039` аналогично ограничен object/workstream уровнем (`...PRT-039...:212-224`).  
   Риск: operational incidents останутся “видимыми только местами”, без стабильных event anchors, несмотря на baseline event policy (`...observability-and-incident-diagnostics.md:114-150`).

3. **Не описана сквозная correlation chain для import workflow.**  
   В `PRT-040` нет требования склеивать `request_id/correlation_id` с `ImportRun` и workflow run/callback (`...PRT-040...:111-167`).  
   Риск: нельзя быстро расследовать путь “бот/CLI вход -> import run -> workflow callback -> финальный outcome”, хотя это прямо требуется в workflow/ops SSoT (`...workflow-framework-contract.md:66-85,145-149`, `...observability-and-incident-diagnostics.md:97-113,310-317`).

4. **Auditability для access/membership/channel/source изменений в протоколах недоспецифицирована.**  
   `PRT-039` вводит memberships/channels/pipeline bindings (`...PRT-039...:72-81,122-135,214-216`), но не раскрывает обязательный формат аудита mutation/read-sensitive операций.  
   Риск: сложно расследовать “кто/когда/что поменял” в access/channel incidents, хотя audit model уже определён в operations spec (`...control-plane-configuration-and-observability-surfaces.md:45-51,160-167`) и для elevated artifact reads (`...trace-artifact-governance.md:102-111`).

5. **Диагностика фоновых workflow failures для import-path не формализована на уровне `ImportRun` контракта.**  
   Сейчас есть только итоговый report skeleton (`summary/warnings/unsupported/next action`) (`...PRT-040...:159-167`).  
   Риск: отказы и ретраи воркфлоу будут жить в логах, а не в каноническом state/read model, что противоречит baseline (`...observability-and-incident-diagnostics.md:259-263`) и workflow contract (`...workflow-framework-contract.md:91-97,121-137`).

6. **`ProcessingArtifact` в `PRT-040` не привязан к redaction/retention/capture policy.**  
   Объект есть (`...PRT-040...:62-67`), но нет явного требования к `redaction_state`, retention class и selective heavy capture.  
   Риск: либо утечки (слишком много raw), либо бесполезный шум (слишком много ad hoc логов), при наличии уже готового governance SSoT (`...trace-artifact-governance.md:57-67,89-123,125-133`).

7. **No-silent-fallback закреплён в SSoT, но не перенесён как прямой protocol gate для `PRT-039/040`.**  
   В `PRT-040` есть only content honesty rule (`supported/degraded/unsupported`) (`...PRT-040...:102-110`), но нет явного требования логировать policy/config fallback events с correlation IDs.  
   Риск: скрытые downgrade-переходы при policy/config issues, что напрямую запрещено baseline и SCN-175 (`...observability-and-incident-diagnostics.md:220-229`, `.../SCN-175...:55-75`).

8. **Acceptance gates в `PRT-039/040` функциональные, но не observability-verifiable.**  
   Текущие gates не требуют controlled error drill, correlation headers, trace-link completeness (`...PRT-039...:219-224`, `...PRT-040...:177-182`).  
   Риск: можно “пройти протокол” с плохо расследуемой прод-аварией, хотя ops runbook и verification baseline это уже требуют (`...runbook.md:45-55,90-95`, `...observability-and-incident-diagnostics.md:319-325`).

## Что убрать/не вводить

- Не вводить ad hoc event naming для import/control-plane; использовать canonical event vocabulary из operations baseline, а не локальные “почти те же” названия.
- Не логировать raw prompt/context/секреты и длинные payload’ы в обычные application logs; heavy diagnostics только через governed artifacts.
- Не превращать direct-admin chat в дампер тяжелых trace artifacts или primary forensic surface.
- Не делать “success с предупреждением” вместо явного `failed/conflict` при policy/config fallback, retries exhausted и workflow terminal errors.
- Не разводить отдельные продуктовые “мини-аудиты” для membership/channel/source mutate paths, если уже есть единый audit trail model.

## Что минимально добавить в протокол

1. **Явный раздел `Observability inheritance` в обоих протоколах.**  
   Обязательные ссылки:  
   - `spec/operations/observability-and-incident-diagnostics.md`;  
   - `spec/runtime/execution-traces-and-token-accounting.md`;  
   - `spec/runtime/trace-artifact-governance.md`;  
   - для `PRT-040` дополнительно `spec/runtime/workflow-framework-contract.md` и `spec/runtime/decision-explanation-envelope.md`.

2. **Минимальный обязательный correlation envelope для всех критичных write/run событий.**  
   База: `request_id`, `correlation_id`, `operation_id`, `actor_ref`, `workspace_ref`, `product_instance_ref`.  
   Для import дополнительно: `import_run_ref`, `source_ref`, `source_revision_ref`, `workflow_run_id`, `processing_artifact_ref` (по необходимости).

3. **Минимальный mandatory event set для import workflow и control-plane mutations.**  
   Не придумывать новый словарь; закрепить использование baseline-событий (`request_*`, `operation_*`, `job_*`, `retry_*`, `policy_resolution_failed`, `compat_fallback_used`) по этапам протокола.

4. **Явный audit trail requirement для access/membership/channel/source/activation mutate paths.**  
   Минимум: actor, timestamp, target object, changed fields, old/new summary, reason code, invoking surface (`ui|cli|chat|workflow`).  
   Для trace artifacts: зафиксировать audit elevated-read операций.

5. **Для `ImportRun` добавить диагностический state/readback минимум.**  
   Минимум статусов: `queued/running/completed/failed/superseded` + retry/attempt summary + terminal failure category + trace/artifact refs.

6. **Для `ProcessingArtifact` зафиксировать governance-минимум.**  
   `artifact_kind`, `redaction_state`, `redaction_reason` (если применимо), `retention_class`, `storage_class` (`inline-small|linked-heavy`), `capture_trigger`.

7. **Явно закрепить no-silent-fallback как protocol-level правило.**  
   Любой fallback/policy-resolution failure обязан давать структурированное событие, машиночитаемый reason code и привязку к correlation context.

8. **Добавить 2 observability acceptance gates в `PRT-039/040`.**  
   - Controlled error drill для одного control-plane write path и одного import workflow path.  
   - Проверка end-to-end investigability: по `request_id/correlation_id` находятся logs + run lineage + bounded artifacts + terminal state.

## Premature abstractions

- Отдельный “универсальный observability microservice” до фиксации минимальных protocol contracts — преждевременно.
- Единая супер-онтология событий для всех будущих продуктов (с сотнями domain-specific event types) на первой волне — преждевременно.
- Полный custom trace viewer “как продукт” до внедрения обязательного correlation/event/readback минимума — преждевременно.
- Стоимостная/биллинговая аналитика в trace-write path (вместо usage evidence boundary) — преждевременно и против SSoT.
- Автоматический always-on full payload capture в production для “удобства дебага” — преждевременно и нарушает governance/retention/redaction принципы.
