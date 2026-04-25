# PRT-038 Phase 1 Consolidated Review Notes

## A01 Architecture, Layering, and Boundaries

Consensus findings across three independent reviews:
- Трехслойная модель в целом собрана хорошо и согласованно между ADR, spec, umbrella protocol и product-local adoption packets.
- Правильным решением остается first-wave stance без обязательного shared hosted control plane и без общей shared DB.
- Product-local normativity после `P0` работает как удачная операционная модель, но ей не хватает более жесткой handshake-механики при изменениях shared contracts.

Main gaps to carry forward:
- interaction substrate присутствует в architecture/spec, но недостаточно операционализирован как отдельный explicit contract packet;
- `policy.read/manage` в `PRT-039` слишком широко сформулирован и может втянуть product semantics в platform layer;
- canonical shared vocabulary и governed-content vocabulary не полностью синхронизированы между `PRT-038`, project spec и `PRT-040` (например, `ImportReport`);
- не хватает явного ownership/write-authority matrix по shared objects;
- нужно усилить anti-contamination rule, чтобы shared substrate не превратился в склад похожих product-specific seams;
- нужно зафиксировать contract-sync protocol для параллельной работы репозиториев.

Minimal protocol-level additions suggested by synthesis:
- mini-packet or explicit section for interaction substrate;
- shared object ownership/write-authority appendix;
- stricter sync/compatibility rule for upstream shared contract changes;
- narrowing or renaming of `policy.*` capabilities;
- explicit no-new-cross-product-deps / anti-contamination rule for the wave.

## A02 Domain Entities, Ownership, and Semantic Boundaries

Consensus findings across three independent reviews:
- Базовый shared vocabulary в целом выбран удачно и не пытается обобщить product meaning.
- Самый заметный риск сейчас не missing entities, а semantic drift между документами и кодом.
- Нужно сильнее различить canonical object, runtime object, operational artifact и read-model alias.

Main gaps to carry forward:
- drift между `ConnectedSource` и `KnowledgeSource`;
- drift между `ExecutionRun`, `ExecutionSession`, `ExecutionTrace`;
- `ImportReport` пока выглядит не как устойчивый shared root, а как outcome/read model у `ImportRun`;
- ownership/persistence rules for `ConnectedSource`, `SourceRevision`, `ImportRun` все еще слишком расплывчаты;
- есть риск преждевременно сделать `PipelineBinding` самостоятельной shared сущностью вместо relation/sub-object of `Channel`;
- нужно жестче развести shared lifecycle envelope и product serving truth.

Minimal protocol-level additions suggested by synthesis:
- canonical vocabulary mapping appendix with aliases/read models;
- explicit ownership and immutability rules for governed-content entities;
- clarification that `KnowledgeSource` is alias/read model over `ConnectedSource`;
- clarification that `ExecutionRun` and kernel/runtime terms are related but not competing canonical roots;
- keep `ActivationDecision`, `SourceProcessingProfile`, and a standalone `ImportReport` out of first-wave mandatory canon.

## A03 Contracts, Processes, and State Transitions

Consensus findings across three independent reviews:
- У protocol packet уже есть хороший narrative skeleton по control-plane writes и workflow-backed import.
- Самый большой пробел здесь не top-level flow, а отсутствие explicit shared state/action contracts.
- Docoved уже служит сильным reference model, но его statefulness не поднят в общий минимальный контракт.

Main gaps to carry forward:
- нет canonical shared state machine для `ImportRun` и связанных transitions;
- handoff `extraction bundle -> product importer -> candidate revision` недоописан как request/response contract;
- `ImportReport` и next-action states описаны слишком свободно;
- retry/failure semantics и linkage to `ExecutionRun`/`TraceArtifact` недостаточно закреплены;
- `binding_status` у channels/pipeline bindings не имеет state universe и rollback semantics;
- action-level authority envelope для import/review/activate flows не формализован на shared уровне.

Minimal protocol-level additions suggested by synthesis:
- compact transition table for `ImportRun`;
- explicit handoff contract between shared processor/workflow and product importer;
- split shared process states from product-specific review meaning;
- minimal lineage refs across import, execution, review, and activation;
- explicit capability/action vocabulary for import/review/activate flows;
- a small binding lifecycle contract for `Channel`/`PipelineBinding`.

## A04 MBB Documentation Coverage, Diataxis, and Linking Discipline

Consensus findings across three independent reviews:
- Базовый MBB/Diataxis каркас в `bot-platform` уже есть и верхняя traceability-цепочка стала заметно лучше.
- Но в сам execution protocol MBB встроен слишком слабо: требования на обязательное doc-closure почти не зафиксированы.
- Главный риск здесь не отсутствие папок, а отсутствие explicit documentation deliverables and status sync in the protocol wave itself.

Main gaps to carry forward:
- `PRT-039/040` не требуют явных updates to `current-status`, `verification`, `scenario`, `guides`, `spec`;
- в child protocols нет явных `Memory Bank impact` / `Evidence` / `Outcome` sections;
- execution docs почти не ссылаются прямо на MBB guidance;
- `current-status-report.md` не синхронизирован с новой convergence wave;
- UI-doc and import/operations doc layers недоопределены как обязательные deliverables.

Minimal protocol-level additions suggested by synthesis:
- umbrella-level `Documentation Deliverables / MBB sync` gate;
- explicit doc deliverables sections inside `PRT-039` and `PRT-040`;
- direct references from active protocols to current MBB guides;
- mandatory status/verification/scenario sync before wave closure;
- avoid creating new abstract doc types; strengthen existing chain instead.

## A05 Lean Design, Abstractions, and No Overengineering

Consensus findings across three independent reviews:
- В целом пакет уже движется в правильном lean-first направлении.
- Основные риски overengineering сейчас сидят не в уже принятых решениях, а в формулировках, которые могут подтолкнуть к premature generalization during implementation.
- Особенно чувствительны: shared vocabulary freeze, `policy.*`, reusable UI layer, source-processing expansion.

Main gaps to carry forward:
- слишком ранняя фиксация широкого shared vocabulary;
- риск превратить `policy.*` в зачаток общего policy engine;
- риск скатиться из UI primitives в framework-owned admin app;
- optional-later objects могут преждевременно стать schema/API targets;
- недостаточно жестко закреплены anti-goals against service/UI/generalized-content overbuild.

Minimal protocol-level additions suggested by synthesis:
- explicit `Phase-1 Minimality Guardrails` block;
- stronger extraction gate for new services/shared infra;
- split between `stable first-wave shared terms` and `candidate shared terms`;
- UI primitive budget for `PRT-039`;
- explicit negative list for `PRT-040` against connector/plugin/profile platformization.

## A06 Reuse, Duplication, Refactoring, and Code Smells

Consensus findings across three independent reviews:
- Протокол уже называет правильные cleanup targets, но их still нужно превратить в более измеримый burn-down plan.
- Главное правило здесь: reuse existing seams, not existing mixed implementations.
- Самые опасные smells: duplicated runtime catalogs/helpers, hidden Docoved seam inside Seller, Seller residue inside Docoved, fake shared buckets, hidden server-only compatibility paths.

Main gaps to carry forward:
- нет явного duplication burn-down inventory/gate;
- existing platform seam (`pipeline-registry`) не зафиксирован как mandatory first reuse target;
- hidden cross-product integrations пока недостаточно формализованы как cleanup scope;
- нет жесткого `no-new-cross-product-owner-leaks` rule;
- нет exit criterion for `packages/shared` and similar migration buckets.

Minimal protocol-level additions suggested by synthesis:
- duplication burn-down list with owners;
- `PreferPlatformSeamWhenExists` rule;
- `NoCrossProductCoreDeps` / `no new owner leaks` rule;
- explicit cleanup task for Seller `docoved_answer` integration seam;
- exit criteria for fake shared buckets and compat path retirement.

## A07 Error Handling, Reliability, and Concurrency

Consensus findings across three independent reviews:
- Framework-level reliability primitives already exist; the issue is not missing foundation but underuse inside `PRT-039/040`.
- Main risks center on missing lifecycle/error semantics and missing concurrency rules at the protocol level.
- The most important reliability gaps are around `ImportRun`, activation, binding mutations, duplicate submission, and stale authorization/config.

Main gaps to carry forward:
- no explicit shared `ImportRun` state machine and attempt model;
- no durable dedup/idempotency rule for bot/UI/CLI import start;
- no clear activation concurrency invariant at shared level;
- no stale-write/compare-and-swap rule for memberships/channels/bindings;
- insufficient linkage between import lifecycle and execution/trace lineage;
- no explicit escalation matrix for operator-visible vs incident-worthy failures.

Minimal protocol-level additions suggested by synthesis:
- compact state/error model for `ImportRun`;
- idempotency key rules for import start/workflow callback/activation;
- compare-and-swap or equivalent precondition rule for mutable objects;
- effective binding/config snapshot at run acceptance;
- explicit activation invariant and conflict behavior;
- typed error policy and escalation matrix for `PRT-039/040`.

## A08 Observability, Logging, Diagnostics, and Investigability

Consensus findings across three independent reviews:
- Framework observability baseline is already strong; child protocols underuse it.
- Main problem is not missing telemetry infra, but missing protocol-level obligations and linkage fields.
- Import workflow and control-plane mutations need explicit event/correlation/audit/readback requirements.

Main gaps to carry forward:
- `PRT-039/040` do not inherit observability standards explicitly enough;
- missing mandatory event sets and correlation bundle for import/control-plane flows;
- missing explicit audit trail model for sensitive mutations and elevated diagnostics reads;
- weak linkage between `ImportRun` and workflow/trace/artifact lineage;
- import diagnostics/readback too shallow for real investigations.

Minimal protocol-level additions suggested by synthesis:
- `Observability inheritance` section in both child protocols;
- required correlation/id bundle for critical flows;
- mandatory event checkpoints for import and mutation lifecycles;
- explicit governed-artifact rules for diagnostics viewers/import artifacts;
- observability acceptance gates and controlled error drill expectations.

## A09 Testing, Scenario Coverage, and Verification Strategy

Consensus findings across three independent reviews:
- Verification substrate and ownership split already exist; child protocols don't operationalize them enough.
- Main problem is not absence of scenario infrastructure, but lack of explicit verification contour per child protocol.
- Shared substrate needs a minimal framework contract pack plus product-owned no-regression overlays, not a new mega-suite.

Main gaps to carry forward:
- `PRT-039/040` lack layered verification maps and must-run packs;
- missing direct links from child protocols to verification/scenario SSoT;
- insufficient explicit failure-path coverage requirements;
- Seller/Docoved anchors exist but are not consistently bound to runnable wave closure criteria;
- no explicit fixture/helper reuse rules.

Minimal protocol-level additions suggested by synthesis:
- `Verification contour` section in each child protocol;
- table `flow -> anchor -> owner -> command -> execution status`;
- minimal must-run regression pack per wave;
- explicit failure coverage matrix for auth/binding/import/activation/error tails;
- rule that acceptance-critical anchors must graduate from `planned` to full contracts for closure.

## A10 UI Management Surfaces and UI Doc Contracts

Consensus findings across three independent reviews:
- Базовая ownership-модель выстроена правильно: platform owns reusable management primitives and shared surface classes, while product repos keep their own IA, route maps, and product-specific UI semantics.
- The main gap is not missing UI intent, but missing screen-level contracts and required UI-doc deliverables for the shared management surfaces.
- There is a real risk of either under-specifying shared surfaces so each product reinvents them differently, or over-centralizing them into a framework-owned admin app.

Main gaps to carry forward:
- `PRT-039/040` describe reusable surface families but do not define screen inventory, actions, visible states, feedback, or surface-level authority rules;
- no explicit `UI contract deliverables` gate in child protocols;
- missing minimal surface matrix for shared areas like memberships, sessions, channels, sources, imports, diagnostics, and run readback;
- missing automation-facing lowest shared contract such as stable surface ids / root ids for platform-owned surfaces;
- Docoved still lacks the more mature Seller-style UI spec packet, so drift risk remains high unless platform-level expectations are explicit.

Minimal protocol-level additions suggested by synthesis:
- add a compact `UI contract deliverables` section to `PRT-039` and `PRT-040`;
- require a first-wave shared surface matrix with `surface_id`, actors, displayed info, actions, visible states/feedback, and ownership boundary;
- define a `surface authority matrix` for UI vs CLI vs direct-admin chat;
- require product-local IA/screen docs to link back to shared surface contracts before adoption can be considered complete;
- explicitly prohibit a global framework-owned admin app, product route ownership in `bot-platform`, and generic CRUD/admin builders in wave 1.

## A11 Storage, DB, Migrations, and Release Safety

Consensus findings across three independent reviews:
- Направление первой волны выбрано правильно: shared contracts and vocabulary move into `bot-platform`, while physical storage, migrations, and rollout ownership stay product-local.
- Основной риск не в недостающей shared DB, а в том, что `PRT-039/040` пока недостаточно жестко фиксируют storage authority, lifecycle persistence semantics, compatibility bridges, and rollout-safe migration sequencing.
- Product-local docs in Docoved and Seller already contain stronger release-safe patterns than the child protocols; shared layer must inherit and normalize minimum invariants without flattening product truth.

Main gaps to carry forward:
- нет явной `data authority / storage authority` matrix for `Membership`, `Channel`, `PipelineBinding`, `ConnectedSource`, `SourceRevision`, `ImportRun`;
- `PipelineBinding` и `Channel.entry_pipeline` still leave physical persistence shape too open, inviting premature table extraction or schema churn;
- `PRT-040` lacks minimal idempotency/state/activation semantics for `ImportRun` and `SourceRevision`;
- child protocols do not explicitly say that shared vocabulary does not imply shared physical schema or shared live-serving truth;
- missing entity-specific compatibility bridge, rollback, and release-sensitive migration notes for auth/channel/source/import changes;
- current wording is too weak on environment-scoped activation and recoverable previous-active retention.

Minimal protocol-level additions suggested by synthesis:
- compact `Storage authority and scope` section in `PRT-039` and `PRT-040`;
- explicit rule: wave 1 standardizes contracts and refs, not cross-product rows or shared DB ownership;
- `Compatibility bridge / migration sequencing` clause with additive-first, idempotent backfill, bounded cutover, and dual-write as exception;
- minimal lifecycle contract for `ConnectedSource`, `SourceRevision`, and `ImportRun`, including idempotency and activation invariants;
- `Auth/access release-safety trigger` for membership/session/channel changes;
- `Rollback / recovery minimums` clause centered on pointer/reassignment rollback rather than destructive replacement.

## A12 Code Quality Checks, Delivery Gates, and Phase Completion Criteria

Consensus findings across three independent reviews:
- Framework-level delivery standards are already strong; the weak point is that `PRT-038/039/040` do not yet translate them into executable hard gates for the current convergence wave.
- The biggest A12 risk is false completion: docs can land, kickoff gates can be marked satisfied, and implementation can still remain unproven.
- Product-local protocols already show a stricter acceptance style than the platform child protocols; shared-wave completion should inherit that honesty instead of staying document-centric.

Main gaps to carry forward:
- no explicit hard distinction between `design landed`, `implementation proven`, `adopted`, and `archived`;
- `PRT-039/040` lack required commands, evidence sinks, CI/hosted/security expectations, and must-run verification anchors;
- `current-status-report.md`, `verification-matrix.md`, and scenario linkage are not yet synchronized to the new `PRT-038/039/040` program;
- current repo-enforced baseline exists (`pnpm check` + `Verification` workflow) but is not named inside protocol closure logic;
- no explicit rule that acceptance-critical anchors must be runnable, not merely listed as planned references.

Minimal protocol-level additions suggested by synthesis:
- add compact hard-gate tables to `PRT-039` and `PRT-040` covering local baseline, scenario proof, CI green, hosted proof when applicable, security gate when applicable, and status sync;
- introduce a small outcome taxonomy such as `design_landed`, `implementation_in_progress`, `implementation_proven`, `adopted_in_product`, `multi_product_adopted`, `archive_ready`, `archived`;
- require `current-status-report.md`, `verification-matrix.md`, `scenario-matrix.md`, and affected product-local adoption docs to be updated before wave completion;
- require at least one explicit product adoption proof before shared-wave status can advance from `implementation_proven` to `adopted`;
- treat acceptance-critical `planned` anchors as insufficient for `done`; they allow only `partial` unless replaced by runnable proof or explicit `N/A` justification.
