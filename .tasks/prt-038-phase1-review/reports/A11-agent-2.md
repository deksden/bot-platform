# A11 Review: storage, DB migrations, and release safety

## verdict

Yellow / conditional pass.

The storage story is directionally safe at the architecture level: the platform explicitly keeps Wave 1 storage product-local, does not require a shared cross-product DB or hosted control-plane service, and already has strong generic rollout rules around compatibility proof, staged promotion, and rollback evidence. The problem is that `PRT-039` and `PRT-040` are not yet migration-safe execution contracts on their own. They define the shared vocabulary, but they do not yet define enough storage authority, idempotency, activation, and compatibility-bridge semantics for the objects they introduce.

In practice, release safety currently comes from a combination of:
- framework-wide persistence and rollout specs;
- richer product-local storage contracts in `docoved-agent`;
- richer product-local publication/release semantics in `seller-agent`.

That is enough to avoid a dangerous “shared DB first” mistake, but not enough to treat `PRT-039` and `PRT-040` as fully closed on A11 without follow-up clauses.

## evidence

- The platform stance is intentionally lean and safe. `PRT-038` says Wave 1 does not require one shared cross-product DB, and `PRT-039` repeats the concrete implementation stance: shared contracts in `bot-platform`, but product-local implementation and storage in product repos, with no mandatory shared DB or hosted control-plane service in this wave (`.memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md:68-75`, `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:200-210`).
- The framework persistence boundary is already correctly drawn. `persistence-interface-and-store-boundary.md` keeps schemas, migrations, indexes, and rollout procedure store-owned/product-owned, while requiring framework-facing contracts to make idempotency and atomicity explicit (`.memory-bank/spec/runtime/persistence-interface-and-store-boundary.md:27-40`, `:82-103`, `:105-113`).
- The generic release model is already strong. `deployment-architecture.md` requires a compatibility path before rollout, additive/backward-compatible sequencing first, and target-lane write/read verification before promotion (`.memory-bank/spec/operations/deployment-architecture.md:82-93`). `production-rollout-runbook.md` separately requires explicit compatibility proof, recoverable rollback inputs, backup evidence for risky waves, and a governed promotion order (`.memory-bank/spec/operations/production-rollout-runbook.md:31-60`, `:62-88`).
- The auth/access boundary also already contains an important A11 rule: schema changes touching auth/access require explicit RLS, grants, and exposure decisions (`.memory-bank/spec/security/auth-and-access.md:109-117`). That matters directly for `Membership`, `Session`, and related control-plane tables.
- `PRT-039` is clear about object vocabulary and anti-centralization, but thin on storage semantics. It names `Membership`, `Workspace`, `ProductInstance`, `Channel`, and `PipelineBinding`, yet stops at shared object shapes/capabilities/surfaces and does not define single-writer authority, natural keys, migration bridges, or legacy-cutover sequencing for those objects (`.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md:70-105`, `:122-156`, `:212-224`).
- `PRT-040` has the same asymmetry. It correctly defines `ConnectedSource`, `SourceRevision`, `ImportRun`, `ProcessingArtifact`, and `ImportReport`, plus the honesty rule and the 7-step import lifecycle, but it does not define a shared state machine, idempotency rule, locking rule, rollback rule, or verified-only activation boundary (`.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md:60-120`, `:159-182`).
- Docoved already proves what “safe enough” looks like in a concrete product. Its product-local publication model defines logical source identity vs environment-specific activation, a snapshot state machine, import idempotency keyed by `(knowledge_source_ref, commit_sha, manifest_hash)`, activation locking, verified-only activation, and rollback by active-snapshot pointer switch rather than in-place mutation (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md:76-108`, `:121-159`, `:190-213`).
- Docoved also already fixes source-binding safety more concretely than `PRT-039`/`PRT-040`: surface-bound source resolution is explicit, override attempts are rejected, and failure on missing active snapshot is explicit (`/Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-access-and-knowledge-source-binding-model.md:31-49`, `:70-89`).
- SellerAgent proves a different but equally product-specific rollout shape. Its current governed publication model is `verify-repo -> publish -> release-create -> release-assign`; `publish` is not itself live rollout, and the publish boundary explicitly excludes integrations, memberships/access, and provider/model-policy routing (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md:29-43`, `:86-104`, `:106-141`). This is strong evidence that a shared substrate must not prematurely flatten SellerAgent and Docoved into one live-activation model.
- SellerAgent also already names the concrete migration/backfill anchors that shared extraction should reuse, not overwrite: `SCN-032` for snapshot readback/backfill safety and `SCN-076` for schema-ledger adoption and idempotent migration apply (`/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/scenarios/SCN-032-business-profile-snapshot-backfill-and-query-surface.md:23-29`, `:86-103`; `/Users/deksden/Documents/_Projects/seller-agent/.memory-bank/scenarios/SCN-076-sql-migration-ledger-adoption-and-idempotent-apply.md:22-29`, `:68-95`).

## release/migration risks

- Highest risk: `PRT-039` introduces shared control-plane objects without an explicit storage-authority matrix. Without a per-object rule for write owner, store of record, natural key, and legacy compatibility fields, SellerAgent and Docoved can implement incompatible schemas that still look nominally “shared”.
- High risk: `PRT-040` can be misread as if the shared substrate already owns live publication/activation semantics. That is unsafe. SellerAgent’s live cutover is release assignment; Docoved’s live cutover is active snapshot selection. A shared `SourceRevision` must not silently become the generic “live truth” object.
- High risk: workflow-backed import is retry-heavy by nature, but `PRT-040` does not yet state idempotent retry behavior for `ImportRun` or `SourceRevision`. Replayed inputs could otherwise create duplicate candidate revisions, duplicate reports, or accidental second activations.
- Medium-high risk: migration from legacy product-local identifiers to shared vocabulary will almost certainly need additive compatibility bridges. `PRT-039` acknowledges legacy terminology drift elsewhere in the stack, but it does not yet say whether `Channel`/`PipelineBinding` adoption uses additive columns, backfill + readback parity, bounded dual-read, or another cutover shape. That makes unsafe schema jumps easier than they should be.
- Medium risk: auth/membership changes are release-sensitive, but `PRT-039` does not surface that sensitivity locally. The security spec already requires explicit RLS/grants/exposure decisions; without an A11 reminder inside the control-plane protocol, teams may under-classify those waves.
- Medium risk: product-local docs already contain richer rollback models than the shared protocols. If `PRT-039`/`PRT-040` stay vague, future adopters may accidentally regress from “pointer switch / release reassignment / verified-only activation” into blunter migration or activation behavior.

## missing clauses

- Add a `storage authority` clause to `PRT-039` for `Membership`, `Workspace`, `ProductInstance`, `Channel`, and `PipelineBinding`: wave-1 store owner, canonical write owner, allowed mirrors/projections, and the compatibility fields that may remain temporarily.
- Add a `compatibility bridge` clause to `PRT-039`: shared vocabulary introduction must be additive first; destructive renames or one-step table swaps are not allowed in the same wave; old and new readback must be provably equivalent before cutover.
- Add a `minimal lifecycle semantics` clause to `PRT-040`: at least the allowed `ImportRun` states, terminal failures, retry behavior, and whether repeated submission returns the existing logical run or creates a new one.
- Add a `candidate vs live truth` clause to `PRT-040`: shared substrate may create candidate revisions and reports, but product-owned activation objects remain the live traffic authority until a later explicit protocol says otherwise.
- Add a `rollback/recovery` clause to both child protocols: for risky waves, the protocol must name the rollback mechanism in product-safe terms such as release reassignment, active-pointer switch, or governed migration repair, rather than relying on vague “deactivate/activate again” wording.
- Add a `security/data exposure` clause to `PRT-039`: membership/session/channel-access schema changes require explicit RLS, grants, and surface-exposure decisions before rollout.
- Add a `release note trigger` clause to both child protocols: auth/access tables, channel-binding state, source-binding state, and activation/publication tables automatically count as release-sensitive waves and require an explicit compatibility note before beta/prod promotion.

## lean-first recommendations

- Keep Wave 1 exactly where the platform docs are already strongest: shared contracts/packages in `bot-platform`, product-local storage and migrations in product repos. Do not introduce a shared cross-product DB, global control-plane service, or generic migration coordinator.
- Prefer additive migration plus bounded dual-read/readback parity over dual-write. Dual-write should be an exception, not the default, and only when one concrete product wave cannot preserve behavior otherwise.
- Reuse the product-local live-cutover patterns instead of trying to standardize them too early:
  - SellerAgent keeps `publish -> release -> assign`.
  - Docoved keeps verified snapshot import plus active-pointer activation/rollback.
  - The shared substrate should normalize metadata/provenance/reporting first, not live activation.
- Add only small A11 appendices to `PRT-039` and `PRT-040`, not a new mega-spec. A compact authority table plus a compact migration/rollback note would close most of the dangerous ambiguity without overdesigning the first wave.
- Reuse existing product-local proof anchors as the release-safety floor:
  - SellerAgent: `SCN-032`, `SCN-076`.
  - Docoved: `SCN-179`/`SCN-199` family and the acceptance-host contract for bound source/snapshot authority.
- Keep “future shared extraction” explicit but deferred. If later there is a real need for shared hosting/federation, that should start as a new protocol with fresh A11 review, not as an implicit consequence of `PRT-039` or `PRT-040`.
