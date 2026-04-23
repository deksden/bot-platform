# T02 Report: Implementation Slicing And Dependency Graph

## Summary

Recommended implementation shape for `bot-platform` is two parallel workstreams with narrow package-scoped slices:
- `PRT-039` should start from control-plane domain contracts and the existing `pipeline-registry` seam in `packages/core`, then expose shared read/write envelopes through `packages/api-contract`, then add verifier artifacts, then sync Memory Bank surfaces.
- `PRT-040` should start from governed-content domain contracts in `packages/core`, split source-processing and import-lifecycle logic into separate subtrees, then expose shared readback envelopes through `packages/api-contract`, then add verifier artifacts, then sync Memory Bank surfaces.

The current repo state strongly favors this shape:
- `packages/core` already contains the only real reusable runtime seam, including `packages/core/src/runtime/pipeline-registry.ts` and kernel/result helpers.
- `packages/api-contract` is the natural home for shared control-plane and governed-content read/write envelopes.
- `packages/scenario-system` plus the Memory Bank scenario surfaces are the natural home for dedicated verifier tasks.
- `apps/` is effectively empty, so opening shared admin UI, shared server host, or shared storage tasks now would be premature and would violate the phase-1 minimality guardrails.

## Grounded observations

1. `PRT-038` says `P0 ready_for_product_adoption_protocols` is a kickoff gate only, not implementation proof. Product work may start protocol planning from `P0`, but safe implementation against shared layers needs a later code-and-verification gate.
2. `PRT-039` requires shared control-plane vocabulary, channel and pipeline-binding mechanics, bounded diagnostics readback, observability events, and product-local UI-doc handoff. It explicitly forbids a shared hosted control-plane service, a shared DB, and a framework-owned global admin app in wave 1.
3. `PRT-040` requires shared governed-content vocabulary, source-processing bundle honesty, import lifecycle and idempotency, candidate-vs-live truth separation, and workflow-backed import entry. It explicitly forbids turning product publication truth into platform-owned storage.
4. `feature-area-boundaries.md` and `boundaries.md` keep product semantics, product DB ownership, routes, layout, and operator workflows out of `bot-platform`.
5. `pipeline-registry-and-binding-contract.md` already gives one concrete first anchor for `PRT-039`: registry-backed pipeline binding validation. This is the narrowest existing reusable seam and should be reused rather than replaced.
6. `verification-matrix.md` says both shared-substrate rows are only `design-hardened` today and still lack dedicated runnable framework scenario anchors. That means dedicated verifier tasks are mandatory, not optional cleanup.

## Recommended Task List

| task id | scope | depends on | disjoint write scope | outcome |
| --- | --- | --- | --- | --- |
| `T039-01-control-plane-vocabulary` | Add canonical control-plane domain types, status vocabularies, capability families, and typed validation/conflict envelopes. | none | `packages/core/src/control-plane/vocabulary/**` | Shared object and mutation vocabulary for `User`/`Session`/`Membership`/`Workspace`/`ProductInstance`/`Channel`/`PipelineBinding`/`ExecutionRun`/`TraceArtifact`. |
| `T039-02-channel-binding-contract` | Implement `Channel` + `PipelineBinding` helpers on top of the existing pipeline registry seam. | `T039-01-control-plane-vocabulary` | `packages/core/src/control-plane/channel-binding/**` | Registry-backed validation, binding status semantics, channel capability flags, snapshot rules for effective binding/config. |
| `T039-03-control-plane-api-read-models` | Add shared control-plane read/write envelopes for surfaces such as memberships, sessions, channels, runs, and trace artifacts. | `T039-01-control-plane-vocabulary` | `packages/api-contract/src/control-plane/**` | Shared DTO/read-model layer without product IA or route ownership. |
| `T039-04-control-plane-export-integration` | Wire exports and package-level entrypoints after the domain and API slices land. | `T039-02-channel-binding-contract`, `T039-03-control-plane-api-read-models` | `packages/core/src/control-plane/index.ts`, `packages/api-contract/src/control-plane/index.ts`, `packages/core/src/index.ts`, `packages/api-contract/src/index.ts` | One controlled integration pass that prevents barrel-file conflicts during parallel work. |
| `T039-V1-control-plane-verifier` | Add runnable verification for the shared control-plane substrate. | `T039-04-control-plane-export-integration` | `packages/core/src/control-plane/**/*.spec.ts`, `packages/scenario-system/src/**`, `.memory-bank/scenarios/SCN-*.md` | Dedicated framework proof for channel binding, validation failures, bounded diagnostics readback, and observability checkpoints. |
| `T039-S1-control-plane-sync` | Sync protocol/status/verification/scenario surfaces after evidence exists. | `T039-V1-control-plane-verifier` | `.memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md`, `.memory-bank/plans/current-status-report.md`, `.memory-bank/plans/verification-matrix.md`, `.memory-bank/scenarios/scenario-matrix.md` | Honest closure state for W1 without over-claiming product adoption. |
| `T040-01-governed-content-vocabulary` | Add canonical governed-content domain types and status vocabularies. | none | `packages/core/src/governed-content/vocabulary/**` | Shared object model for `ConnectedSource`, `SourceRevision`, `ImportRun`, `ProcessingArtifact`, and derived `ImportReport` readback vocabulary. |
| `T040-02-source-processing-bundle-contract` | Implement the extraction-bundle contract and supported/degraded/unsupported classification helpers. | `T040-01-governed-content-vocabulary` | `packages/core/src/governed-content/source-processing/**` | The wave-1 “file or folder in -> md + images + structure + report out” contract, without creating a service. |
| `T040-03-import-lifecycle-idempotency` | Implement import lifecycle, semantic idempotency, retry-safe callback rules, and candidate-vs-live boundary helpers. | `T040-01-governed-content-vocabulary` | `packages/core/src/governed-content/import-lifecycle/**` | Import-run status machine, idempotency keys, conflict semantics, activation boundary invariants. |
| `T040-04-governed-content-api-read-models` | Add shared source/import/artifact/report envelopes for API and operator-facing readback. | `T040-02-source-processing-bundle-contract`, `T040-03-import-lifecycle-idempotency` | `packages/api-contract/src/governed-content/**` | Shared DTO/readback layer for sources, imports, reports, and artifacts, without product review UX or activation UX. |
| `T040-05-governed-content-export-integration` | Wire exports and package entrypoints after the governed-content slices land. | `T040-04-governed-content-api-read-models` | `packages/core/src/governed-content/index.ts`, `packages/api-contract/src/governed-content/index.ts`, `packages/core/src/index.ts`, `packages/api-contract/src/index.ts` | Controlled barrel integration, again avoiding parallel collisions. |
| `T040-V1-governed-content-verifier` | Add runnable verification for the shared governed-content/import substrate. | `T040-05-governed-content-export-integration` | `packages/core/src/governed-content/**/*.spec.ts`, `packages/scenario-system/src/**`, `.memory-bank/scenarios/SCN-*.md` | Dedicated framework proof for bundle honesty, idempotent import behavior, degraded/unsupported readback, and activation-boundary guards. |
| `T040-S1-governed-content-sync` | Sync protocol/status/verification/scenario surfaces after evidence exists. | `T040-V1-governed-content-verifier` | `.memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`, `.memory-bank/plans/current-status-report.md`, `.memory-bank/plans/verification-matrix.md`, `.memory-bank/scenarios/scenario-matrix.md` | Honest closure state for W2 without over-claiming product adoption. |

## Dependency Graph

Readable dependency graph:

```text
T039-01-control-plane-vocabulary
  -> T039-02-channel-binding-contract
  -> T039-03-control-plane-api-read-models
T039-02-channel-binding-contract
T039-03-control-plane-api-read-models
  -> T039-04-control-plane-export-integration
T039-04-control-plane-export-integration
  -> T039-V1-control-plane-verifier
T039-V1-control-plane-verifier
  -> T039-S1-control-plane-sync
T039-S1-control-plane-sync
  -> G1-control-plane-shared-contract-ready

T040-01-governed-content-vocabulary
  -> T040-02-source-processing-bundle-contract
  -> T040-03-import-lifecycle-idempotency
T040-02-source-processing-bundle-contract
T040-03-import-lifecycle-idempotency
  -> T040-04-governed-content-api-read-models
T040-04-governed-content-api-read-models
  -> T040-05-governed-content-export-integration
T040-05-governed-content-export-integration
  -> T040-V1-governed-content-verifier
T040-V1-governed-content-verifier
  -> T040-S1-governed-content-sync
T040-S1-governed-content-sync
  -> G2-governed-content-shared-contract-ready

G1-control-plane-shared-contract-ready
  + product-local mirror docs in SellerAgent/Docoved
  -> safe start for product control-plane adoption

G2-governed-content-shared-contract-ready
  + Docoved local mirror docs/UI-doc packet
  -> safe start for Docoved import adoption

G1-control-plane-shared-contract-ready
  + G2-governed-content-shared-contract-ready
  + mirrored downstream assumptions
  -> G3-cross-repo-adoption-handshake
```

## Parallelization Opportunities

Safe parallel work after opening the program:

1. `T039-01-control-plane-vocabulary` and `T040-01-governed-content-vocabulary` can start immediately in parallel because they live in different package subtrees.
2. After `T039-01-control-plane-vocabulary`, `T039-02-channel-binding-contract` and `T039-03-control-plane-api-read-models` can run in parallel because one writes only `packages/core`, the other only `packages/api-contract`.
3. After `T040-01-governed-content-vocabulary`, `T040-02-source-processing-bundle-contract` and `T040-03-import-lifecycle-idempotency` can run in parallel because they are separate governed-content subtrees inside `packages/core`.
4. `T039-V1-control-plane-verifier` can run while `T040-02`/`T040-03`/`T040-04` are still in progress because its write scope is verification-only and W1/W2 are otherwise independent.
5. `T039-S1-control-plane-sync` and `T040-V1-governed-content-verifier` should not run in parallel if both plan to touch `current-status-report.md` or `verification-matrix.md`. Those shared status surfaces need serialized ownership.

## First Tasks To Open

Open these first:

1. `T039-01-control-plane-vocabulary`
2. `T040-01-governed-content-vocabulary`

Reason:
- both are true prerequisites for their workstreams;
- both establish stable shared vocabularies before downstream API/readback layers appear;
- neither requires product-local semantics, storage, or UI ownership;
- both reserve natural write scopes early and reduce later overlap risk.

Open these second, as soon as their parent vocabulary slice lands:

1. `T039-02-channel-binding-contract`
2. `T039-03-control-plane-api-read-models`
3. `T040-02-source-processing-bundle-contract`
4. `T040-03-import-lifecycle-idempotency`

Do not open first-wave `bot-platform` tasks for:
- shared admin UI routes or a shared global app shell;
- shared DB schemas or a cross-product hosted control-plane service;
- product review/activation UX;
- SellerAgent business-profile publication logic;
- Docoved product serving truth such as active snapshot ownership.

## Suggested Task Boundaries And Write Scopes

Boundary rules:

1. Keep `packages/core` for shared domain invariants and reusable validation/helpers.
2. Keep `packages/api-contract` for surfaced DTOs, read models, mutation envelopes, and typed responses.
3. Keep `packages/scenario-system` plus `.memory-bank/scenarios/**` for verifier-only work.
4. Reserve root package barrels (`packages/core/src/index.ts`, `packages/api-contract/src/index.ts`) for short export-integration tasks only. This is important because the current package layout has single root entrypoints and would otherwise create guaranteed merge conflicts.
5. Keep Memory Bank sync files serialized behind dedicated sync tasks, because `current-status-report.md` and `verification-matrix.md` are shared evidence surfaces.

This produces non-overlapping subagent scopes:
- W1 implementation agents mostly stay in `packages/core/src/control-plane/**` and `packages/api-contract/src/control-plane/**`.
- W2 implementation agents mostly stay in `packages/core/src/governed-content/**` and `packages/api-contract/src/governed-content/**`.
- verifier agents stay in test/scenario/evidence surfaces.
- sync agents stay in status/protocol matrix surfaces.

## Recommended Order Of Verifier Tasks

1. `T039-V1-control-plane-verifier`
2. `T039-S1-control-plane-sync`
3. `T040-V1-governed-content-verifier`
4. `T040-S1-governed-content-sync`

Rationale:
- `verification-matrix.md` currently shows W1 and W2 as design-hardened only, so each workstream should produce proof immediately after its export-integration step rather than waiting for both streams to finish.
- W1 verification should run first because `PRT-039` includes the existing `pipeline-registry` seam and is the narrowest shared implementation anchor.
- W2 should follow once its lifecycle and readback contracts are wired; its verifier must prove degraded/unsupported honesty and idempotent replay behavior before Docoved adoption begins.

## Milestone Gates

### `G1-control-plane-shared-contract-ready`

Counts as reached only when:
- `T039-01` through `T039-04` are landed;
- `T039-V1` adds runnable proof, not only protocol text;
- `T039-S1` updates the protocol, verification matrix, scenario matrix, and status report together.

What it unlocks:
- SellerAgent and Docoved may begin product-local control-plane adoption against the shared layer, but only after mirroring the imported assumptions into their repo-local adoption docs and UI-doc packets.

### `G2-governed-content-shared-contract-ready`

Counts as reached only when:
- `T040-01` through `T040-05` are landed;
- `T040-V1` adds runnable proof of bundle honesty, idempotency, and boundary guards;
- `T040-S1` updates the protocol, verification matrix, scenario matrix, and status report together.

What it unlocks:
- Docoved may begin product-local import adoption against the shared layer after its local protocol/UI-doc mirror lands.
- SellerAgent may only adopt the pieces proven to be truly shared; its publication model remains product-local.

### `G3-cross-repo-adoption-handshake`

Counts as reached only when:
- `G1` is complete for shared control-plane work;
- `G2` is complete for governed-content/import work where Docoved needs it;
- downstream repos have mirrored the assumptions into their local adoption docs before implementation proceeds.

This is the real “safe start” gate for product implementation against changed shared contracts. `P0` remains the planning kickoff gate, not this implementation handshake gate.

## Start Point For Product-Repo Agents

Recommended rule:

- Product-repo agents should not start implementing against a shared platform slice immediately after `P0`.
- They may start planning and local protocol work after `P0`, because `P0` is already satisfied.
- They should start real implementation only after the relevant shared slice reaches its workstream gate:
  - control-plane adoption may start after `G1-control-plane-shared-contract-ready`;
  - Docoved governed-content/import adoption may start after `G2-governed-content-shared-contract-ready`;
  - broader multi-repo implementation against both layers should treat `G3-cross-repo-adoption-handshake` as the safe start point.

This matches the `PRT-038` shared-to-product handshake rule and avoids product code binding itself to doc-only contracts.

## Risks Of Bad Slicing And What To Avoid

1. Do not create one mega-task called “implement PRT-039” or “implement PRT-040”. Each packet spans domain contracts, API envelopes, verification, and doc sync, which are too large and too conflict-prone for one subagent.
2. Do not mix W1 and W2 implementation in the same package subtree or the same export/barrel task. The hidden overlap risk is highest around shared status files and package entrypoints, not the domain logic itself.
3. Do not start from UI/admin surfaces inside `bot-platform`. The repo has no established app surface yet, and both protocols keep route trees, layout, screen inventory, and operator workflows product-local.
4. Do not move product activation/publication truth into platform-owned storage or object roots. `KnowledgeSnapshot` and `BusinessProfileRelease` stay product-local.
5. Do not skip dedicated verifier tasks. The verification inventory explicitly says W1/W2 still lack runnable framework anchors; leaving proof until the end would turn both workstreams into document-led integration risk.
6. Do not let integration tasks grow. Barrel/export wiring should stay tiny and serial; otherwise every parallel slice converges into the same conflict-heavy files.
7. Do not use “future flexibility” to justify a shared service, shared DB, generic policy engine, or generic content platform. None of those are first-wave requirements and all violate the hardening guardrails.

## Final Recommendation

The optimal first-wave task graph is:
- two parallel vocabulary-first workstreams;
- `packages/core` for shared domain invariants;
- `packages/api-contract` for surfaced envelopes;
- verifier tasks immediately after each workstream integration step;
- serialized Memory Bank sync tasks after each verifier;
- product adoption only after per-workstream implementation gates, not after `P0` alone.

That gives bounded subagent slices, clear dependency edges, minimal write-scope overlap, and a realistic handshake point for SellerAgent and Docoved without pulling product-owned semantics into `bot-platform`.
