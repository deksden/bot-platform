# Что уже хорошо

- Зафиксирован единый базовый shared vocabulary для слоя platform+substrate: `User`, `Principal`, `Session`, `Membership`, `Workspace`, `ProductInstance`, `Channel`, `PipelineBinding`, `ConnectedSource`, `SourceRevision`, `ImportRun`, `ProcessingArtifact`, `ExecutionRun`, `TraceArtifact` ([PRT-038](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md#L140), [three-layer spec](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md#L125)).
- Явно удержана граница product-local смысла: SellerAgent `BusinessProfile*` и Docoved `KnowledgeSnapshot*` не должны растворяться в generic content ([three-layer spec](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md#L144), [PRT-040](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md#L73), [Seller PRT-008](/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md#L234), [Docoved PRT-038](/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md#L250)).
- Канальная модель корректно разделяет generic substrate и product-local привязки (`Channel` общий, смысл биндится локально через product refs) ([PRT-039](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md#L122), [Seller PRT-008](/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md#L210), [Docoved PRT-038](/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md#L226)).
- Есть правильный анти-overengineering каркас: first wave без обязательного shared hosted control-plane и без принудительного shared DB ([PRT-038](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md#L72), [PRT-039](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md#L200)).

# Пробелы и риски

- Дрейф терминов между документами уже начался:
  - `ImportReport` объявлен как canonical shared object только в одном месте ([PRT-040](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md#L60)); в общем canonical vocabulary этого объекта нет ([PRT-038](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md#L140), [three-layer spec](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md#L125)).
  - В operations-спеке используются `KnowledgeSource`, `ExecutionTrace`, `PipelineDefinition` как canonical object classes/read models, тогда как в shared vocabulary зафиксированы `ConnectedSource`, `ExecutionRun`, `PipelineBinding` ([control-plane spec](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md#L80)).
  - В runtime и коде уже живут `ExecutionTrace`/`ExecutionSession` ([execution traces spec](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/execution-traces-and-token-accounting.md#L42), [kernel.ts](/Users/deksden/Documents/_Projects/bot-platform/packages/core/src/runtime/kernel.ts#L94)), что без явной alias-политики конфликтует с целевым `ExecutionRun`.
- Не дофиксирован ownership/persistence именно для governed-content сущностей: `ConnectedSource`, `SourceRevision`, `ImportRun` прямо оставлены как open question ([PRT-038](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md#L97)). При этом first-wave stance разрешает product-local storage ([PRT-039](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md#L200)), что повышает риск расхождения id/статусов между продуктами.
- Недостаточно формализована связь между runtime-артефактами и import lifecycle: `ImportRun` обязан выдать отчет/статус ([PRT-040](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md#L161)), но не зафиксировано обязательное связывание с `ExecutionRun`/`TraceArtifact`, хотя trace-модель это уже предполагает ([execution traces spec](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/execution-traces-and-token-accounting.md#L44)).
- Граница identity-классов местами размывается compatibility-лексикой (`integrationRef` и старые поля рядом с `channelRef`) ([kernel.ts](/Users/deksden/Documents/_Projects/bot-platform/packages/core/src/runtime/kernel.ts#L57), [agent-execution-kernel spec](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/agent-execution-kernel.md#L213)). Это риск смешения domain identity, runtime identity и transport legacy identity.

# Что убрать/не вводить

- Не вводить общий `GenericContent`/`GenericSnapshot`/`GenericRelease` для унификации SellerAgent и Docoved.
- Не вводить второй canonical объект `KnowledgeSource` параллельно `ConnectedSource`; допустим только read-model alias с явным маппингом.
- Не вводить отдельную глобальную RBAC-лестницу ролей; сохранять capability families + product overlays.
- Не вводить обязательную централизацию в один shared DB/hosted control-plane в этой фазе.
- Не вводить `ImportReport` как самостоятельный canonical object до появления как минимум второго реального потребителя и стабильного кросс-продуктового контракта.

# Что минимально добавить в протокол

- Добавить компактную таблицу canonical vocabulary (в `PRT-038` или приложении к нему): `entity -> class (domain identity/runtime identity/operational artifact/read model alias) -> owner layer -> canonical id/ref -> allowed aliases`.
- Зафиксировать терминологический маппинг, чтобы остановить дрейф:
  - `ConnectedSource` = canonical object, `KnowledgeSource` = read model alias.
  - `ExecutionRun` = canonical object, `ExecutionTrace` = diagnostic/read model alias.
  - `PipelineBinding` = binding object, `PipelineDefinition` = catalog/read model object.
- Для `ConnectedSource`, `SourceRevision`, `ImportRun` добавить минимальные ownership-правила: кто создает, кто может менять статус, где authoritative storage в first wave, и какие поля immutable.
- Для `ImportRun` и `SourceRevision` добавить минимально обязательные linkage refs, не создавая новых сущностей:
  - `ImportRun`: `import_run_ref`, `connected_source_ref`, `source_revision_ref` (или явный null-режим), `requested_by_principal_ref`, `execution_run_ref`, `status`.
  - `SourceRevision`: `source_revision_ref`, `connected_source_ref`, `revision_identity` (`commit_sha`/`manifest_hash` или эквивалент), `lifecycle_state`, `activated_by_principal_ref`.

# Premature abstractions

- `ActivationDecision` как отдельный shared object сейчас преждевременен; в первой волне достаточно статусов/атрибутов внутри `SourceRevision` + audit fields.
- `SourceProcessingProfile` как shared object тоже преждевременен до подтвержденных разных runtime-профилей у нескольких продуктов.
- Отдельный source-processing сервис/продукт преждевременен; текущий контракт package seam уже достаточен для wave-1 ([PRT-040](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md#L149)).
- “Универсальная no-code admin studio” преждевременна и противоречит заявленным границам фазы ([control-plane spec](/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md#L171)).
