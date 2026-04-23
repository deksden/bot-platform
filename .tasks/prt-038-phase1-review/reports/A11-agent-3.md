# A11 Review: storage, DB migrations, and release safety

## Краткий вывод

По A11 базовое направление выбрано правильно: `PRT-038`/`039`/`040` уже держат важную first-wave рамку "shared contracts + product-local implementation", без обязательного shared hosted control plane и без общей shared DB на старте (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:72-95`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:195-203`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:149-157`). Это хорошая и безопасная стартовая позиция.

Главная недоработка не в выборе направления, а в том, что storage authority и migration/release-safe sequencing пока зафиксированы слишком общо. Shared vocabulary уже объявлен, но недостаточно явно сказано, что shared object vocabulary не равен shared physical schema, и что first-wave extraction должна идти через contract/adaptor layer поверх product-local stores, а не через ранний cross-product DB merge.

## Что уже достаточно хорошо

- `three-layer-product-line-architecture` и `ADR-005` очень правильно разделяют shared vocabulary и product truth: shared substrate поднимается в `bot-platform`, но SellerAgent business-profile semantics и Docoved publication/active-snapshot semantics остаются в product policy packs (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md:88-123`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md:52-99`).
- `persistence-interface-and-store-boundary` уже содержит правильный ownership split: framework owns interfaces/DTO/boundary guarantees, а store owns concrete schemas, migrations, indexes, query plans (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/persistence-interface-and-store-boundary.md:27-40`). Для A11 это сильнейший базовый guardrail.
- Ops-спеки уже требуют compatibility path before rollout, additive/backward-compatible sequencing, write/read verification in target lane, explicit backup evidence и rollback handoff (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/deployment-architecture.md:82-115`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/production-rollout-runbook.md:31-88`).
- `auth-and-access` корректно фиксирует, что auth/session/membership tables internal by default, а schema changes touching auth/access должны сопровождаться explicit RLS/grants/exposure decisions (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/security/auth-and-access.md:109-116`). Это хороший антидот против "раз shared object, значит можно сразу открыть/обобщить таблицы".
- Product overlays уже показывают правильные operational patterns, которые shared layer не должен сломать:
  - Docoved: one logical source identity across lanes, explicit snapshot state machine, idempotent import key, source-scoped activation lock, rollback by repointing active snapshot rather than patching rows in place (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md:76-108`, `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md:121-159`, `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md:261-276`).
  - SellerAgent: repo-backed publish -> release-create -> release-assign is canonical; legacy `upload/activate` is explicitly transitional and split-brain prone (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md:29-43`, `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md:106-141`).

## Главные пробелы

- В child protocols не хватает явной таблицы `data authority vs storage authority`. Сейчас shared objects перечислены как canonical vocabulary (`Membership`, `Channel`, `PipelineBinding`, `ConnectedSource`, `SourceRevision`, `ImportRun`), но не проговорено достаточно жестко, кто owns meaning, кто owns mutation policy, и кто owns physical persistence in first wave (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:70-156`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:60-167`).
- `PRT-039` говорит, что `Channel` несет optional product-local association refs, но эта формулировка опасно широкая (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:124-135`). Без явного ограничения туда легко протащить product-owned invariants в shared-looking shape.
- `PRT-040` фиксирует `SourceRevision` и "revision and activation lifecycle" как shared substrate, но не разводит минимальный shared invariant и product-owned activation truth (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md:88-99`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:60-75`). Это особенно рискованно рядом с Docoved, где active snapshot semantics уже сильно конкретнее shared wording.
- Нет явного first-wave migration contract для legacy terminology and storage bridges. В control-plane spec есть честная оговорка про legacy `integration` terms (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:187-192`), но не зафиксировано, что shared `Channel`/`PipelineBinding` могут долго жить как contract/read-model/adaptor layer поверх старых product-local tables без немедленного schema unification.
- Rollout safety в ops-спеках сильнее, чем в child protocols. `deployment-architecture` и `production-rollout-runbook` требуют compatibility proof и backup evidence, но `PRT-039/040` не превращают это в entity-specific migration notes для membership/channel/source/import changes. Из-за этого можно формально "следовать протоколу", но все еще сделать unsafe schema jump.

## Что стоит явно дописать

### 1. Data authority / storage authority matrix

Для first wave нужен короткий, но обязательный блок примерно такого смысла:

- `Membership`
  - shared authority: vocabulary, capability envelope, server-authoritative access decision.
  - product authority: role mapping, governance workflow, trust-policy overlays.
  - first-wave storage authority: product-local auth/session/membership store and migrations.
- `Channel`
  - shared authority: `workspace_ref`, `product_instance_ref`, `channel_kind`, `entry_pipeline`, generic binding status/capabilities.
  - product authority: `knowledge_source_ref`, `business_profile_ref`, product policy refs, transport-specific semantics beyond shared contract.
  - first-wave storage authority: product-local channel/integration tables behind compatibility adapters.
- `PipelineBinding`
  - shared authority: validation contract and canonical binding vocabulary.
  - product authority: product-specific refs implied by pipeline args or overlays.
  - first-wave storage authority: product-local binding persistence; pipeline registry may stay code-backed.
- `ConnectedSource` / `SourceRevision` / `ImportRun`
  - shared authority: substrate vocabulary, lifecycle skeleton, extraction bundle contract, report skeleton.
  - product authority: interpretation into product revisions, review semantics, activation semantics, serving truth.
  - first-wave storage authority: product-local Docoved/Seller stores and migrations.

Ключевая формулировка, которой сейчас не хватает: "platform owns canonical contract shape; product repo remains physical source of truth until a later explicit extraction wave proves multi-consumer need and operational justification".

### 2. Release-safe migration sequencing

Для A11 нужен явный sequencing note, а не только общий ops guardrail:

1. Сначала ship shared contract/read model and compatibility adapters.
2. Затем вводить additive schema changes only: новые refs, status fields, manifests, compatibility columns/tables.
3. Потом делать idempotent backfill/reconciliation with readback verification.
4. Потом включать new write path behind one canonical validation path.
5. Только после beta proof и rollback evidence делать cutover.
6. Только после stable read/write proof убирать legacy columns/paths/terms.

Важно дописать, что dual-write не должен быть дефолтом. Для first wave предпочтительнее:
- single writer + compatibility reads;
- additive backfill + controlled cutover;
- dual-write только там, где реально приходится держать два независимых durable stores/paths в переходе.

Это особенно важно, чтобы не повторить SellerAgent anti-pattern `upload/activate` vs publish/release/assign (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md:129-141`).

### 3. Explicit rollout notes per risky object family

- Для `Membership` / auth-touching changes: explicit RLS/grants/exposure review, lane-by-lane verification, no direct assumption that shared vocabulary implies shared exposure (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/security/auth-and-access.md:109-116`).
- Для `Channel` / `PipelineBinding`: compatibility bridge over legacy `integration` terms, plus beta read/write verification of effective binding before any destructive rename/drop (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md:150-192`).
- Для `ConnectedSource` / `SourceRevision` / `ImportRun`: candidate-first import, verification before activation, rollback by pointer/reassignment rather than in-place row mutation whenever possible, exactly как это уже формализовано для Docoved snapshots (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md:261-276`).

### 4. Backward compatibility clauses

Сейчас child protocols не говорят достаточно прямо:

- new shared contracts may be served by old product-local schemas through adapters;
- target vocabulary may appear in UI/API before storage renames complete;
- old identifiers/terms may remain internal until migration closure;
- removal of compatibility bridges requires proof that both beta and prod no longer depend on the old path.

Это особенно нужно для:
- `integration` -> `Channel`;
- Docoved publication-layout migrations;
- future introduction of explicit `ConnectedSource` / `ImportRun` records поверх существующих Docoved stores.

## Где wording сейчас опасно расплывчат

- `optional product-local association refs` в `Channel` надо сузить до "overlay refs only". Иначе shared `Channel` быстро превратится в скрытый контейнер product semantics (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:126-135`).
- `SourceRevision` как shared object acceptable, но без уточнения "shared substrate does not own product serving truth" это легко читается как право платформы нормализовать Docoved `KnowledgeSnapshot` или Seller release rows в один общий schema family, что на первой волне было бы ошибкой (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:62-75`).
- `ImportReport` стоит держать именно как structured skeleton, а не как повод заранее проектировать общую full-fidelity report DB domain. На сегодня Docoved остается первым и сильно доминирующим consumer (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:159-167`).

## Что точно не стоит выносить в shared DB на первой волне

- Полные auth/session/membership physical tables. Shared auth vocabulary нужен, но physical consolidation premature: auth tables internal by default, product overlays own governance and environment policy (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/security/auth-and-access.md:36-39`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/security/auth-and-access.md:109-120`).
- SellerAgent `BusinessProfileRelease`, `repo_publish`, `release assignment`, legacy compatibility around `upload/activate`, а также integration wiring, `judge/*`, `seeds/*`, provider/model-policy routing. Seller docs прямо говорят, что это не generic import/storage surface и даже не весь publish snapshot boundary (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md:86-104`, `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md:152-166`, `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md:234-251`).
- Docoved `KnowledgeSnapshot`, active snapshot pointer semantics, imported knowledge nodes/text, semantic navigation metadata, references/lineage, duplicate/conflict review state, temporal defaults. Это и есть продуктовая serving truth, и shared layer не должен ее "сплющивать" раньше времени (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md:67-108`, `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md:215-244`).
- Product-specific role ladders, invite/provisioning flows, trust-policy defaults, membership governance UX. Even if `Membership` is shared vocabulary, это не shared DB candidate in first wave (`/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/security/auth-and-access.md:36-39`, `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/security/auth-and-access.md:118-128`).
- Product-local refs inside shared objects как top-level shared columns: `knowledge_source_ref`, `business_profile_ref`, seller policy refs, Docoved activation/review refs. Если они нужны для отображения или linkage, пусть живут как product overlays or namespaced extension payloads, а не как новая "общая schema truth".

## Практический safe-first synthesis

Самая безопасная формула для первой волны:

- shared contracts in `bot-platform`;
- product-local repositories/stores/migrations in product repos;
- compatibility adapters over legacy terms/tables;
- additive schema changes + idempotent backfill;
- candidate-first rollout and pointer-style cutover;
- explicit rollback evidence before prod;
- no shared cross-product DB until there are at least two real storage consumers and a demonstrated operational reason.

Иначе есть высокий риск сделать именно то, от чего текущие документы пока хорошо защищают: перепутать shared vocabulary с shared physical ownership.

## Изученные документы

- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-phase1-review/tasks/A11-storage-db-migrations-and-release-safety.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/feature-area-boundaries.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/persistence-interface-and-store-boundary.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/deployment-architecture.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/production-rollout-runbook.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/security/auth-and-access.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/project/docoved-platform-adoption-boundary.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-access-and-knowledge-source-binding-model.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/architecture/domains/docoved-agentic-ingest-and-knowledge-projection-model.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md`
