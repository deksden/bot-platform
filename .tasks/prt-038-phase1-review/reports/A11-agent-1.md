# A11 Review: storage, DB migrations, and release safety

## 1. Краткая оценка текущего состояния

- Общая оценка: `yellow / partially ready`.
- В `PRT-039` и `PRT-040` уже есть правильная first-wave рамка: shared contracts and vocabulary are extracted into `bot-platform`, but implementation and storage remain product-local; протоколы явно не форсят shared cross-product DB/service в первой волне.
- `.memory-bank/spec/operations/deployment-architecture.md`, `.memory-bank/spec/operations/production-rollout-runbook.md` и `.memory-bank/spec/operations/runbook.md` уже задают хороший общий release-safe baseline: additive/backward-compatible sequencing first, beta/prod separation, compatibility proof, rollback inputs, backup evidence for risky waves.
- `.memory-bank/spec/runtime/persistence-interface-and-store-boundary.md` хорошо фиксирует boundary discipline: framework owns contracts, stores own schemas/migrations, idempotency and atomicity expectations must be explicit.
- Product-local docs уже содержат более зрелые storage/release semantics, чем shared protocols:
  - Docoved explicit about environment-specific active revision, idempotent import, activation lock, active-snapshot serving, and recoverable activation semantics.
  - SellerAgent explicit about repo-backed publish -> release -> assign and about not collapsing business-profile publication into generic import.
- Главная проблема A11 не в направлении, а в недоданном normative middle layer: shared protocols называют shared objects, но пока слишком слабо фиксируют data authority, lifecycle persistence semantics, migration sequencing, and rollback shape for those objects.

## 2. Найденные пробелы и риски

- `Membership`, `Channel`, `PipelineBinding` still lack explicit storage authority.
  Сейчас `PRT-039` фиксирует shared vocabulary и говорит “product-local implementation and storage”, но не говорит, кто является canonical writer per object scope, как избежать dual truth между product repos, и где проходит граница между shared identity and product-local materialization.

- `PipelineBinding` описан как shared object, while `Channel` simultaneously carries `entry_pipeline`.
  Это dangerously vague для migration planning: протокол не говорит, является ли `PipelineBinding` отдельной persisted relation, embedded part of `Channel`, or logical read/write contract over an inline field set. Без этого легко спровоцировать premature table split, unsafe backfill, or gratuitous schema rename.

- `ConnectedSource`, `SourceRevision`, and `ImportRun` lack minimal lifecycle and idempotency semantics at shared level.
  `PRT-040` фиксирует object names and happy-path flow, but does not define:
  - natural/idempotency keys;
  - retry/resume behavior;
  - singleton activation scope;
  - activation preconditions;
  - previous-active retention for rollback.
  На этом фоне shared protocol is materially weaker than the current Docoved product-local storage contract.

- Activation/publication persistence semantics are under-specified where they matter most.
  `PRT-040` says “approve and activate through governed product rules”, but A11 specifically needs the shared protocol to state the minimum safe substrate behavior around activation. Сейчас не зафиксировано even the minimal release-safe invariant: one logical source may have different active revisions in `beta` and `prod`, and activation must not behave like one global toggle.

- Missing explicit rollout note for auth/access-affecting storage changes.
  `auth-and-access.md` correctly requires persisted session truth and explicit RLS/grants/exposure decisions when auth/access schema changes. But `PRT-039` does not elevate this into its own rollout clause for membership/session/channel adoption waves, although those waves directly touch authorization state and protected admin surfaces.

- Missing compatibility-bridge guidance for first-wave adoption from existing product stores.
  Current docs say old terms like `integration` may remain behind compatibility bridges, but `PRT-039`/`PRT-040` do not say how long those bridges are expected to exist, what additive sequencing is required, or when dual-read / backfill / dual-write is actually warranted. This leaves migration shape too implicit.

- Missing explicit recovery/rollback minimum for live publication state.
  The framework rollout docs require rollback inputs, but `PRT-040` does not say that shared governed-content flows must preserve a recoverable previously verified revision and should prefer re-activation / pointer rollback over destructive replacement. Для live knowledge/publication systems this omission is real operational risk.

- The wording around “shared objects” is ahead of the wording around “shared storage”.
  This is the core A11 tension. The protocols are intentionally anti-centralization, which is good, but they have not yet spelled out how to standardize contracts without triggering unsafe shared-schema ambitions. That gap is exactly where future schema jumps and release confusion are likely to appear.

## 3. Concrete protocol-level additions

- Add a `Storage authority and scope` section to both `PRT-039` and `PRT-040`.
  Minimum requirement: one short authority matrix for each shared object, explicitly naming:
  - canonical scope key;
  - owning write boundary;
  - whether first-wave persistence is product-local only;
  - whether cross-product sharing is deferred.

- Make `PipelineBinding` a logical contract first, not a mandatory physical table.
  Protocol text should explicitly allow:
  - first-wave inline persistence with `Channel`, if that matches current product storage;
  - later extraction into a separate relation only via additive migration.
  This one sentence would remove a lot of avoidable schema churn.

- Add a `Compatibility bridge / migration sequencing` clause.
  Minimum wording should say:
  - old storage terms and fields may remain behind explainable compatibility bridges in wave 1;
  - table/field renames are not required just to match new vocabulary;
  - if a split/rename is unavoidable, migration must be additive first, with idempotent backfill and clear cutover criteria;
  - dual-write is exceptional, not default.

- Add a `Minimum lifecycle contract` for `ConnectedSource`, `SourceRevision`, and `ImportRun`.
  Shared substrate does not need full Docoved semantics, but it does need minimum safety semantics:
  - `ImportRun` has a stable idempotency key over ingress artifact + target scope;
  - `SourceRevision` is deduplicated by source scope + revision fingerprint;
  - activation is allowed only from a verified/review-approved state;
  - only one active revision exists per logical source per environment;
  - activation retry for the same verified revision is idempotent.

- Add an `Environment-scoped activation` note.
  The protocol should explicitly say:
  - the same logical source identity may have different active revisions in `local`, `beta`, and `prod`;
  - beta activation does not imply prod activation;
  - rollout between environments follows the governed rollout path rather than an implicit “latest wins” rule.

- Add a `Rollback / recovery minimums` clause for live governed-content activation.
  Minimum safe substrate rule:
  - previous verified active revision remains recoverable;
  - rollback should normally be re-activation / pointer switch, not destructive delete/rebuild;
  - artifact and report lineage needed for rollback must survive activation.

- Add an `Auth/access release-safety trigger` to `PRT-039`.
  It should explicitly point to the ops/security specs and say that any wave changing persisted memberships, sessions, channel authorization bindings, or exposure surfaces must document:
  - RLS/grants/exposure decisions;
  - additive compatibility path;
  - beta verification for affected protected surfaces;
  - rollback inputs.

- Add a `No premature shared DB` sentence to the storage sections, not only the high-level stance.
  Right now the protocols say this globally, but A11 needs the rule repeated exactly where storage decisions are discussed:
  - standardize refs, contracts, and lifecycle invariants first;
  - do not centralize rows across products without a concrete operational need and a separate migration protocol.

## 4. Рекомендации по сохранению простоты первой волны

- Keep storage product-local in both SellerAgent and Docoved.
  First wave should standardize object vocabulary, refs, validation paths, and minimum lifecycle invariants, not unify physical databases.

- Do not force one table per shared noun.
  In wave 1 it is fine if some shared objects are persisted as projections over existing product-local rows, as long as contract meaning is stable and migration bridges are explicit.

- Keep Docoved as the only full first-wave consumer of `ConnectedSource` / `SourceRevision` / `ImportRun`.
  SellerAgent should keep its repo-backed publication and release-assignment model until there is a genuinely matching second consumer for the broader governed-content substrate.

- Standardize release-safe behavior, not full generic workflow semantics.
  Shared protocol only needs the minimal substrate invariants:
  - scope;
  - idempotency;
  - singleton activation per environment;
  - rollback-friendly retention;
  - additive migration sequencing.
  Everything richer can stay product-local.

- Prefer additive read-model adoption over table renames.
  If a product already has working rows for source bindings, publication state, or channel wiring, first expose them through the new shared contract/read model. Rename/split only when there is a concrete operational payoff.

- Treat dual-read / dual-write / backfill as targeted tools, not mandatory ceremony.
  Use them only for real physical shape changes. If the change is primarily contract renaming or shared vocabulary adoption, keep it as a compatibility bridge and avoid extra migration machinery.

## Reviewed key documents

- `/Users/deksden/Documents/_Projects/bot-platform/.tasks/prt-038-phase1-review/tasks/A11-storage-db-migrations-and-release-safety.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/three-layer-product-line-architecture.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/project/feature-area-boundaries.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/security/auth-and-access.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/deployment-architecture.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/production-rollout-runbook.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/runbook.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/persistence-interface-and-store-boundary.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md`
- `/Users/deksden/Documents/_Projects/bot-platform/.memory-bank/spec/architecture/containers/db-and-projections.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-access-and-knowledge-source-binding-model.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/architecture/domains/docoved-agentic-ingest-and-knowledge-projection-model.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-telegram-channel-binding-and-hosted-acceptance.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-email-channel-binding-and-hosted-acceptance.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-027-docoved-kb-reglaments-production-knowledge-base-rollout.md`
- `/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-026-docoved-workspace-control-plane-channel-access-and-locator-fidelity.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md`
- `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md`
