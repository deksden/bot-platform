---
file: .memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
description: Cross-repo protocol for realigning package dependencies and Memory Bank truth surfaces after the platform/product handoff closed.
purpose: Preserve the closed platform-owned dependency-boundary realignment after PRT-038 so future work understands why Docoved package identity was corrected, why SellerAgent was not kept as shared upstream, and which broader extraction questions were deferred.
version: 1.3.0
date: 2026-04-24
status: CLOSED
epic: EP-022
tags: [protocol, bot-platform, dependency-boundary, contract-realignment, repo-split, selleragent, docoved]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/three-layer-product-line-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/plans/current-status-report.md
  - .memory-bank/plans/verification-matrix.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/plans/protocols/PRT-008-selleragent-shared-platform-adoption-control-plane-and-business-profile-governance.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/project/docoved-platform-adoption-boundary.md
history:
  - version: 1.3.0
    date: 2026-04-24
    changes: Closed the protocol after read-only cross-repo inventory, Docoved package-identity cutover, SellerAgent no-code classification, product-local PRT-039 proof, and green Docoved local gates.
  - version: 1.2.0
    date: 2026-04-24
    changes: Added implementation-readiness gates, package-graph/manifest verification, subagent task-template requirements, decision-record rules, and a stricter phase definition of done before execution.
  - version: 1.1.0
    date: 2026-04-24
    changes: Hardened the protocol after review by adding task-folder discipline, symbol-level inventory schema, package/versioning strategy, compatibility and rollback rules, staged product handoff criteria, CI/branch gates, and explicit anti-goals against behavior refactors hidden inside dependency cleanup.
  - version: 1.0.0
    date: 2026-04-24
    changes: Started the post-handoff dependency-boundary cleanup protocol after inspecting actual cross-repo package imports, product Memory Bank hubs, and remaining sales-agent lineage references.
---

# Protocol: Cross-Repo Contract Dependency Boundary Realignment

## Why this protocol exists

`PRT-038` closed the wave-1 platform/product handoff.

The architecture now says:
- shared contracts live in `bot-platform`;
- SellerAgent owns SellerAgent product truth;
- Docoved owns Docoved product truth;
- `sales-agent` is archive lineage only.

At protocol start, the code and navigation surfaces were not fully aligned with that statement. The largest mismatch was concrete rather than conceptual: `docoved-agent` imported and published shared-looking contracts through `@selleragent/*` names, keeping SellerAgent in the technical upstream path for Docoved.

This protocol closed that gap for the actual package graph: Docoved now uses `@docoved-agent/api-contract` for its local contract package and no longer references `@selleragent/api-contract`, `@selleragent/shared`, or `@selleragent/core` in source, manifests, or lockfile. Broader neutral conversation/Telegram/status/config extraction remains future-protocol material.

## Opening evidence snapshot

Discovery on `2026-04-24` found these relevant facts before implementation.

### Platform state

`bot-platform` has the intended framework packages:
- `@dd-bot-platform/api-contract`
- `@dd-bot-platform/core`
- `@dd-bot-platform/scenario-system`

`PRT-038`, `PRT-039`, and `PRT-040` are closed for the wave-1 handoff.

### SellerAgent state

SellerAgent has a correct product package namespace for most owned packages:
- `@selleragent/core`
- `@selleragent/db`
- `@selleragent/api-contract`
- `@selleragent/client-sdk`
- `@selleragent/shared`
- `@selleragent/sa-admin`
- `@selleragent/sa-judge`
- `@selleragent/ui-contract`

Known boundary risks:
- `packages/shared` is still product-local but semantically ambiguous;
- `@selleragent/platform-config` is consumed as a published dependency and may contain framework-shaped config behavior;
- SellerAgent still imports `@docoved-agent/sa-docoved` for explicit compatibility/helper seams, which is acceptable only while documented as a bounded product-to-product seam rather than shared substrate.

### Docoved state

Docoved package ownership is only partially aligned:
- `@docoved-agent/core`, `@docoved-agent/db`, `@docoved-agent/dv-admin`, `@docoved-agent/sa-docoved`, and `@docoved-agent/prompt-catalog` are product-owned and correctly named;
- `packages/api-contract/package.json` still declares `name: "@selleragent/api-contract"`;
- `packages/core`, `packages/db`, `packages/dv-admin`, and `apps/api` still import `@selleragent/api-contract`;
- `packages/core`, `packages/db`, and `packages/dv-admin` still consume `@selleragent/shared`;
- `packages/db` still consumes `@selleragent/core@0.1.1`.

Known boundary risks:
- Docoved can accidentally treat SellerAgent as the upstream owner of shared control-plane/runtime types;
- future agents may continue adding new shared contracts to SellerAgent because imports already point there;
- product-local package identity is misleading where a Docoved package is still named `@selleragent/api-contract`.

### Documentation state

The first navigation cleanup already moved the main entrypoints toward closed-baseline wording, but this protocol still treats Memory Bank truth surfaces as part of the work because wording can drift during cross-repo execution.

Known documentation risks:
- closed adoption protocols can reappear as active execution entrypoints in root indexes, protocol hubs, or current-status reports;
- status-file metadata can lag behind body content and keep describing `PRT-038` as active after `PRT-041` opened;
- older related-file links to `sales-agent` remain useful as lineage but should not appear as current normative inputs where repo-local replacements exist;
- product agents need enough repo-local context to execute product protocols without reading platform-private planning notes.

## Goal

Make the dependency graph match the architecture.

By the end of this protocol:
- Docoved must not depend on SellerAgent for shared platform contracts;
- SellerAgent must not be the accidental home of reusable framework helpers;
- product-local packages must carry product-local names;
- shared packages needed by both products must either live in `bot-platform` or be explicitly documented as a temporary bridge;
- Memory Bank entrypoints must distinguish closed baselines from active execution protocols.

Success means the import graph, package names, Memory Bank navigation, and verification evidence all say the same thing.

This is a dependency-boundary cleanup protocol, not a feature delivery protocol. It should make ownership clearer without changing customer-visible behavior.

## Non-goals

This protocol does not:
- redesign the three-layer architecture;
- reopen `PRT-038`, `PRT-039`, or `PRT-040`;
- build new product features;
- remove every historical `sales-agent` link from history sections;
- force a single shared hosted control plane or a shared product database;
- remove bounded product-to-product compatibility seams before replacement contracts exist.

It also does not allow:
- mixing behavior refactors into package renames unless the behavior change has its own explicit task and verification contour;
- moving product semantics upward just because a type is imported by both repos;
- creating a broad new shared package as a shortcut around symbol classification;
- pushing product repos to hosted rollout only because import paths changed.

## Execution workspace

Use one protocol task folder in `bot-platform`:

- `.tasks/prt-041-contract-dependency-boundary-realignment/`

Required folder shape:
- `index.md` — task packet index, status, phase progress, and owner notes;
- `inventory/` — read-only symbol and package inventories;
- `tasks/` — bounded implementation task files when execution starts;
- `reports/` — executor/verifier reports;
- `lessons/` — lessons learned and insights promoted later into Memory Bank docs.

Phase 1 must create inventory reports before any code movement:
- `inventory/docoved-selleragent-imports.md`
- `inventory/selleragent-shared-and-config-exports.md`
- `inventory/platform-target-symbol-map.md`
- `inventory/product-navigation-truth-surface-map.md`

Each implementation task must state:
- exact write scope;
- allowed packages/apps;
- symbols being moved or renamed;
- compatibility/deprecation rule;
- local gates;
- rollback path;
- docs to update in the same slice.

Do not start a code slice from an informal chat summary. Start it from a task file in the protocol folder.

### Subagent task-file template

Every subagent task file must be self-contained and use the same MBB-style discipline as feature/protocol docs.

Required sections:
- `Context to read` — exact Memory Bank files, package manifests, and code paths to inspect before editing;
- `Goal` — the bounded outcome in one slice;
- `Write scope` — exact repo/packages/files the agent may change;
- `Do not touch` — files, packages, or behavior outside the slice;
- `Implementation rules` — ownership decisions, package-target decisions, compatibility rules, and coding/documentation standards;
- `Verification gates` — package-level and repo-level commands, plus when hosted gates are forbidden or required;
- `Lessons learned / insights` — instruction to write numbered notes into `lessons/` when undocumented facts or surprising constraints are found;
- `Report format` — required report path under `reports/`, changed files, checks run, skipped checks with rationale, remaining risks, and follow-up recommendations.

A verifier task must read the original task file, the executor report, and the actual diff. It must not accept a report-only claim without checking changed files and manifests.

## Ownership rule

Use this placement matrix for every moved symbol.

| Current source | Target if shared | Target if SellerAgent-owned | Target if Docoved-owned | Rule |
| --- | --- | --- | --- | --- |
| `@selleragent/api-contract` | `@dd-bot-platform/api-contract` | stay under `@selleragent/api-contract` | copy/adapt under `@docoved-agent/api-contract` | move only genuinely cross-product types upward |
| `@selleragent/shared` | `@dd-bot-platform/core` or a future support package | stay under `@selleragent/shared` | copy/adapt under Docoved package | do not keep generic helpers in product shared if Docoved consumes them |
| `@selleragent/core` | `@dd-bot-platform/core` only for product-agnostic runtime helpers | stay under `@selleragent/core` | replace with `@docoved-agent/*` | Docoved must not use SellerAgent core as runtime substrate |
| `@docoved-agent/sa-docoved` | no move by default | bounded SellerAgent consumer if explicitly needed | stay under `@docoved-agent/sa-docoved` | this is a product seam, not a shared substrate package |

Default rule:
- if only one product needs the behavior, keep it product-local;
- if both products need it and it has no product invariant, move it to `bot-platform`;
- if both products need it but product semantics differ, define a shared envelope in `bot-platform` and keep interpretation product-local.

## Symbol classification schema

Phase 1 inventory must classify imports at symbol level, not only package level.

Use this table shape in inventory reports:

| symbol | current package | importing repo/path | current behavior owner | proposed target | classification | migration action | compatibility rule | verification gate |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

Allowed `classification` values:
- `shared-platform-contract`
- `shared-platform-helper`
- `selleragent-product-contract`
- `docoved-product-contract`
- `product-to-product-bridge`
- `temporary-legacy-bridge`
- `dead-or-retirable`
- `needs-design-decision`

Allowed `migration action` values:
- `move-to-bot-platform-api-contract`
- `move-to-bot-platform-core`
- `keep-selleragent-local`
- `keep-docoved-local`
- `rename-docoved-package`
- `replace-with-product-local-helper`
- `retain-temporary-bridge-with-expiry`
- `delete-after-proof`
- `defer-new-protocol`

Any symbol marked `needs-design-decision` blocks implementation for that slice until the decision is recorded in this protocol or a linked spec/ADR.

### Decision record rule

Every non-mechanical classification decision must leave a durable trace.

Record in the relevant inventory report:
- why the symbol is shared or product-owned;
- why the chosen package target is the smallest sufficient target;
- what alternative was rejected and why;
- whether the decision is final, temporary, or deferred to a new protocol.

Do not encode unresolved design decisions only in commit messages or chat history.

## Package and versioning strategy

Package movement must be staged so products can cut over safely.

Rules:
- `bot-platform` exports shared contracts first;
- product repos consume the new platform export only after the platform package version or workspace path is available in that repo;
- old product exports may remain as temporary compatibility re-exports for one migration window if that avoids a big-bang cutover;
- compatibility re-exports must be documented with an expiry condition;
- package names must not lie about ownership after the cutover.

Versioning decisions must be explicit per slice:
- `workspace:*` internal workspace cutover only;
- published package version bump required;
- compatibility re-export without publish;
- docs-only classification.

If a shared symbol is already published from `@selleragent/*`, the protocol must choose one of these migration paths:
- additive platform export plus product cutover, then deprecate SellerAgent export;
- product-local Docoved copy/adaptation, then remove Docoved dependency;
- temporary bridge retained with a named retirement protocol.

Do not silently break downstream published package consumers.

### Package graph surfaces

Each implementation slice must inspect and update all package-graph surfaces affected by the move:
- `package.json` dependency/devDependency/peerDependency names and versions;
- package `name`, `exports`, `types`, `main`, `files`, and build output assumptions;
- workspace manifests and local package aliases;
- lockfiles when dependency names or versions change;
- TypeScript path aliases and build references;
- generated or committed `dist` only if the owning repo convention requires it;
- Changesets/changelogs when a published package boundary changes.

A slice is not complete if source imports changed but manifests still publish or resolve the old ownership story.

## Workstreams

### W1. Contract inventory and symbol classification

Inventory every cross-product import and classify each imported symbol as:
- `shared-platform-contract`
- `selleragent-product-contract`
- `docoved-product-contract`
- `product-to-product-bridge`
- `temporary-legacy-bridge`
- `dead-or-retirable`

Minimum inventory scope:
- `docoved-agent/apps/**`
- `docoved-agent/packages/**`
- `seller-agent/apps/**`
- `seller-agent/packages/**`
- root `package.json` files, package manifests, workspace manifests, lockfiles, TypeScript path aliases, and package export maps.

Required output:
- a task-folder report listing each symbol, current package, proposed target, migration risk, and validation gate.

Additional required checks:
- distinguish runtime imports from type-only imports;
- identify imports used in generated `dist` or published package entrypoints;
- identify package names that are wrong even if the code is locally working;
- identify duplicate local types that already exist in `bot-platform` and can be reused;
- identify historical `sales-agent` references that are lineage-only and should not drive implementation.

### W2. Bot-platform shared contract extraction

Promote only classified `shared-platform-contract` symbols into `bot-platform`.

Candidate areas likely to move:
- generic conversation/message carrier types;
- generic operation/result/error envelopes;
- channel and operation status read models;
- runtime provider configuration vocabulary where not SellerAgent-specific;
- small utility helpers currently imported from `@selleragent/shared` by Docoved.

Guardrails:
- do not move SellerAgent business-profile, commerce, customer-memory, or burst semantics;
- do not move Docoved grounded-answer, citation, semantic-map, or snapshot semantics;
- do not introduce a broad new `shared` dumping ground;
- prefer narrow exports from existing `@dd-bot-platform/api-contract` and `@dd-bot-platform/core` before adding new packages.

Required design checks before implementation:
- decide whether each target belongs in `api-contract`, `core`, `scenario-system`, or a later support package;
- update package barrel exports and package-level docs together;
- add or update focused contract tests where the package already has verifier coverage;
- avoid importing product packages into `bot-platform` tests or fixtures.

### W3. Docoved dependency realignment

Docoved is the highest-priority consumer cleanup.

Required outcomes:
- rename or replace Docoved `packages/api-contract` so it no longer publishes as `@selleragent/api-contract`;
- replace Docoved imports from `@selleragent/api-contract` with either `@dd-bot-platform/api-contract` or `@docoved-agent/api-contract`;
- replace Docoved imports from `@selleragent/shared` with either `@dd-bot-platform/core` helpers or Docoved-local helpers;
- remove Docoved dependency on `@selleragent/core` unless a documented temporary bridge remains with an explicit retirement gate.

Non-goal:
- do not weaken Docoved acceptance, grounding, import, or snapshot semantics to make type movement easier.

Required cutover order:
1. platform exports exist or Docoved-local replacement exists;
2. Docoved package naming is corrected;
3. Docoved imports are changed in the narrowest compile-safe slices;
4. compatibility bridges are removed only after local gates pass;
5. Memory Bank status records any remaining bridge explicitly.

Special rule:
- if `@selleragent/api-contract` in Docoved is only a package-name error for Docoved-owned code, fix it as a Docoved package rename rather than moving the code to platform.

### W4. SellerAgent shared-package shrinkage

SellerAgent cleanup is second priority after Docoved no longer depends on SellerAgent for shared contracts.

Required outcomes:
- classify `packages/shared` exports;
- move product-agnostic helpers to `bot-platform` only when they have real shared consumers;
- keep SellerAgent-only helpers in product-local packages with clearer names if needed;
- document any remaining `@selleragent/platform-config` usage as product-local or replace with a platform-owned config contract.

Non-goal:
- do not destabilize SellerAgent hosted beta/prod acceptance just to rename helpers.

Required cleanup order:
1. stop Docoved from consuming SellerAgent shared packages;
2. classify remaining `@selleragent/shared` exports as internal product helpers or platform candidates;
3. move only platform candidates with at least one real consumer or a clear framework contract owner;
4. rename or document SellerAgent-internal helpers so they do not look cross-product;
5. update SellerAgent Memory Bank only after the package graph matches the new claim.

### W5. Memory Bank truth-surface sync

Update navigation and boundary docs after dependency movement.

Minimum sync:
- `bot-platform/.memory-bank/index.md`
- `bot-platform/.memory-bank/plans/index.md`
- `bot-platform/.memory-bank/plans/protocols/index.md`
- `bot-platform/.memory-bank/plans/current-status-report.md`
- `seller-agent/.memory-bank/index.md`
- `seller-agent/.memory-bank/plans/protocols/index.md`
- `seller-agent/.memory-bank/plans/current-status-report.md`
- `docoved-agent/.memory-bank/index.md`
- `docoved-agent/.memory-bank/plans/protocols/index.md`
- `docoved-agent/.memory-bank/plans/current-status-report.md`

Required wording:
- closed adoption protocols are baselines, not active execution packets;
- new product work starts from a new local protocol that references this protocol where dependency-boundary cleanup is in scope;
- `sales-agent` links are lineage only unless explicitly marked as a temporary bridge with a retirement gate.

Do not remove useful history sections just to reduce search hits.

Instead:
- keep historical links in `history` or explicit lineage sections;
- remove or reword them from current normative entrypoints;
- mark temporary bridges with owner, expiry condition, and verification gate.

### W6. Release, CI, and branch hygiene

This protocol crosses repositories, so each repo must follow its own git flow and CI expectations.

Required planning per implementation slice:
- source branch and target branch;
- whether the slice is local-only, PR-bound, or release-bound;
- whether package publishing is needed;
- whether Vercel/hosted CI should run or must be avoided;
- what local checks run before commit;
- what remote checks are required before cross-repo dependent work starts.

Remote build rule:
- do not trigger hosted builds only for docs or local-only type movement;
- trigger hosted proof only when runtime-facing hosted behavior changes or product runbooks require it.

Cross-repo sequencing rule:
- platform package changes land first;
- product cutovers start only after the platform package path/version is available;
- bridge removals happen last.

## Suggested execution phases

### Phase 1. Read-only inventory

Run no code changes except task reports.

Acceptance:
- all cross-product imports are listed;
- every symbol has a proposed owner and package target;
- package manifests, exports, path aliases, workspace manifests, and lockfiles are included in the inventory;
- runtime imports are separated from type-only imports and published entrypoint imports;
- risky moves are separated from safe mechanical renames;
- task-folder inventory reports exist for Docoved imports, SellerAgent shared/config exports, platform targets, and Memory Bank truth surfaces;
- every `needs-design-decision` item is either resolved before Phase 2 or explicitly deferred out of this protocol.

### Phase 2. Platform extraction

Land the smallest shared exports needed by both products.

Acceptance:
- `bot-platform` typecheck/build gates pass;
- exports are documented in the relevant package entrypoints;
- no product semantics are introduced into platform packages.
- package versioning or workspace-consumption plan is recorded before product cutover starts.

### Phase 3. Docoved cutover

Cut Docoved away from SellerAgent-owned packages.

Acceptance:
- `docoved-agent` no longer imports `@selleragent/api-contract`, `@selleragent/shared`, or `@selleragent/core` except explicitly documented temporary bridges;
- package names match Docoved ownership;
- `pnpm typecheck`, `pnpm check`, and `pnpm docoved:verify:local:prt-038` or successor local gate pass.
- any retained bridge has owner, expiry condition, and next protocol/task reference.

### Phase 4. SellerAgent shrinkage

Shrink or reclassify SellerAgent `shared` and config bridges.

Acceptance:
- `seller-agent` imports platform-owned helpers from `@dd-bot-platform/*` where appropriate;
- SellerAgent-only helpers are not named as cross-product shared substrate;
- `pnpm typecheck`, `pnpm check`, and the local security gate expected by the product protocol pass.
- `packages/shared` has an explicit keep/split/move decision for every export that was in scope.

### Phase 5. Documentation and closure

Sync Memory Bank surfaces across all three repos.

Acceptance:
- root indexes no longer point at closed protocols as active execution packets;
- protocol hubs distinguish closed baselines from new active work;
- current-status reports list remaining bridges honestly;
- verification matrices or scenario hubs are updated when scenario ownership changes.

### Phase 6. Cross-repo closeout

Close the protocol only after the three repo states agree.

Acceptance:
- `bot-platform` records all platform-owned exports and remaining non-goals;
- `seller-agent` records no accidental framework ownership in product packages;
- `docoved-agent` records no accidental SellerAgent upstream dependency for shared-looking contracts;
- all retained bridges have explicit owner and expiry;
- final report links local gates and any skipped hosted gates with rationale.

## Definition of done

This protocol is done only when all of the following are true:
- the actual import graph contains no accidental Docoved dependency on SellerAgent packages for shared-looking contracts;
- every retained product-to-product bridge is named, owned, justified, and given an expiry/removal condition;
- every package touched by a boundary move has matching source imports, manifests, exports, docs, and verification evidence;
- platform packages expose only product-agnostic contracts or helpers;
- product Memory Banks can be read independently by product agents without needing hidden context from this platform protocol;
- final closeout reports explain skipped hosted/CI gates rather than silently omitting them;
- lessons learned and insights from `.tasks/prt-041-contract-dependency-boundary-realignment/lessons/` are promoted into the appropriate Memory Bank specs or guides.

## Verification gates

Minimum platform gates:
- `pnpm check`
- package-specific typecheck/build commands if touched
- focused tests for moved contracts if present
- package export/import smoke if a published package boundary changes

Minimum SellerAgent gates:
- `pnpm typecheck`
- `pnpm check`
- `pnpm verify:security` when DB/security surfaces are touched
- hosted proof only if runtime-facing hosted behavior changes
- package-specific build/typecheck for touched packages before repo-wide gates

Minimum Docoved gates:
- `pnpm typecheck`
- `pnpm check`
- `pnpm docoved:verify:local` or `pnpm docoved:verify:local:prt-038` while it remains the latest local owner-side gate
- hosted proof only if hosted channel/API behavior changes
- package-specific build/typecheck for touched packages before repo-wide gates

Documentation-only slices:
- run `git diff --check` at minimum;
- do not run hosted or package publish gates.

## Safety rules

- Do not move runtime behavior and rename dependencies in the same slice unless the verifier scope is small and explicit.
- Do not remove temporary bridges before both products pass their local gates.
- Do not replace product-owned APIs with platform APIs if the platform API does not yet carry the required product-safe semantics.
- Do not use `sales-agent` as an implementation source for new code; use it only as lineage while porting or verifying intent.
- Do not create a new broad `@dd-bot-platform/shared` package unless a later protocol proves that existing `core` / `api-contract` placement is insufficient.
- Do not use path aliases or package `name` hacks to make imports pass while ownership remains false.
- Do not leave a product package publishing under another product's namespace after the cutover slice that touches it.
- Do not update docs to claim a bridge is gone before code and package manifests prove it.
- Do not open product-local protocols for read-only inventory only; open them when product-owned code, package identity, public exports, scenarios, or runbooks need changes.
- Do not accept green repo-wide checks as proof if package-level export/import smoke was skipped after a public package boundary changed.

## Rollback and compatibility

Every implementation task must name one rollback path:
- revert import cutover while keeping additive platform export;
- keep compatibility re-export for one release window;
- restore product-local helper while leaving platform candidate unused;
- mark the bridge retained and close only the safe subset.

Rollback must not require `sales-agent` to become active again.

Compatibility bridges must include:
- current owner;
- why the bridge still exists;
- what proof allows removal;
- where the removal task is tracked.

## Product handoff rules

Open a product-local protocol when:
- product code changes beyond import replacement;
- product package names or public exports change;
- product docs/scenarios/guides need acceptance updates;
- product CI/hosted gates become required.

Do not open a product-local protocol when:
- phase 1 only inventories imports;
- a platform-only additive export is created;
- product docs only add a pointer to `PRT-041` without local execution.

Product-local protocols must be self-contained and may cite this protocol as upstream context. They must not require product agents to infer tasks from `bot-platform` docs alone.

## Open questions

1. Should `@selleragent/platform-config` become a platform package, stay SellerAgent-local, or be replaced by narrow config helpers in each product?
2. Which `@selleragent/api-contract` symbols used by Docoved are truly shared versus compatibility wrappers that should become `@docoved-agent/api-contract`?
3. Is SellerAgent's dependency on `@docoved-agent/sa-docoved` still an active product compatibility seam, or can it now be retired after Docoved adoption closure?
4. Should `packages/shared` in SellerAgent be split into named packages, or is a narrow internal `@selleragent/shared` acceptable after Docoved stops consuming it?
5. Which moved symbols require published package migration rather than workspace-only cutover?
6. Which compatibility bridges need deprecation notices or changelog entries?
7. Should a future platform support package exist for generic config/utility helpers, or should `core` remain the only target for now?

## Outcome

- Result: `closed`
- Current completion state: `complete`
- Closed evidence:
  - phase-1 inventory reports are stored under `.tasks/prt-041-contract-dependency-boundary-realignment/`;
  - Docoved local `PRT-039` records the product-owned package identity and SellerAgent dependency retirement slice;
  - Docoved source/manifests/lockfile no longer reference `@selleragent/api-contract`, `@selleragent/shared`, or `@selleragent/core`;
  - Docoved `pnpm typecheck`, `pnpm check`, and `pnpm docoved:verify:local:prt-038` passed;
  - SellerAgent required no code change because no Docoved consumer remains on `@selleragent/shared` or `@selleragent/platform-config`.
- Follow-up needed:
  - open future protocols only for broader neutral conversation/Telegram/status/config extraction if a real multi-product consumer appears;
  - do not reopen this protocol for optional SellerAgent internal package naming cleanup.

## Memory Bank impact

This protocol is now the closed post-`PRT-038` platform dependency-boundary cleanup packet.

Memory Bank updates completed during execution:
- product-local Docoved `PRT-039` contains the concrete product task, gates, and handoff point locally;
- closed adoption protocols remain visible as baselines, not active packets;
- protocol/task reports record package-identity and workspace-symlink lessons for future boundary moves;
- remaining larger extraction questions are explicitly future protocol material, not unfinished `PRT-041` scope.
