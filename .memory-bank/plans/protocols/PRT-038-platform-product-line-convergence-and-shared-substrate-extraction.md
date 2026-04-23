---
file: .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
description: 'Umbrella post-split protocol for converging the three repos toward a three-layer product-line architecture, extracting the shared cross-product substrate in bot-platform, and declaring the kickoff gate for product adoption protocols.'
purpose: Use as the single active bot-platform execution contract after PRT-036 so shared-layer extraction, product handoff timing, and legacy retirement follow one explicit program instead of drifting across repos.
version: 1.7.0
date: 2026-04-23
status: ACTIVE
epic: EP-022
tags: [protocol, architecture, product-line, shared-substrate, bot-platform, selleragent, docoved, archive]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
  - .memory-bank/plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md
  - .memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md
  - .memory-bank/spec/project/three-layer-product-line-architecture.md
  - .memory-bank/guides/explanation/product-line-layering-and-split-rationale.md
  - .memory-bank/spec/operations/git-flow.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/spec/operations/production-rollout-runbook.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/guides/reference/npm-package-release-runbook.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/mbb/principles.md
  - .memory-bank/mbb/indexing-guide.md
  - .memory-bank/mbb/cross-references.md
  - .memory-bank/mbb/delivery-docs-guide.md
  - .memory-bank/mbb/scenario-docs-guide.md
  - .tasks/prt-038-phase2-implementation/reports/phase2-implementation-synthesis.md
  - .tasks/prt-038-phase3-ops-runbook-alignment/index.md
  - .tasks/prt-038-phase3-ops-runbook-alignment/reports/phase3-ops-runbook-alignment.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/project/selleragent-platform-adoption-boundary.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/selleragent-split-rationale-and-platform-adoption.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/project/docoved-platform-adoption-boundary.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/guides/explanation/docoved-split-rationale-and-platform-adoption.md
  - /Users/deksden/Documents/_Projects/sales-agent/.memory-bank/plans/protocols/PRT-034-docoved-burst-continuity-finalization-and-verification-repair.md
  - /Users/deksden/Documents/_Projects/sales-agent/.memory-bank/plans/protocols/PRT-035-docoved-semantic-folder-governance-indirect-references-temporal-defaults-and-duplicate-review.md
history:
  - version: 1.7.0
    date: 2026-04-23
    changes: Added the dist-verifier sequencing rule to the local verification contour so future runnable-local proofs do not race compiled `dist` output and accidentally validate stale artifacts.
  - version: 1.6.0
    date: 2026-04-23
    changes: Recorded the phase-3 operational execution model: git/worktree and promotion discipline, commit/push/CI/hosted trigger policy, deploy/preflight/rollout rules, and lessons-learned/insights routing requirements; marked phase 3 planning as complete.
  - version: 1.5.0
    date: 2026-04-23
    changes: Added the phase-2 implementation execution model: subagent task contract, task graph and milestone gates, verifier workflow, and staged verification/rollout expectations; marked phase 2 planning as complete.
  - version: 1.4.0
    date: 2026-04-23
    changes: Hardened the umbrella protocol after the phase-1 review by adding interaction-substrate placement, phase taxonomy, lean guardrails, anti-contamination rules, documentation/verification sync rules, and stricter shared-to-product contract handoff language.
  - version: 1.3.0
    date: 2026-04-23
    changes: Marked the plan-refinement review as phase 1 complete, linked the multi-aspect review packet, and clarified that the next platform step is protocol hardening before implementation waves can claim stronger closure states.
  - version: 1.2.0
    date: 2026-04-23
    changes: Added the product-local normativity rule so SellerAgent and Docoved can execute from self-contained repo-local adoption protocols while bot-platform remains the upstream owner of shared contracts.
  - version: 1.1.0
    date: 2026-04-23
    changes: Added explicit child protocols for the shared control-plane and governed-content/import substrates, and fixed the first-wave implementation stance so product adoption does not implicitly require one global hosted control-plane service or shared database.
  - version: 1.0.0
    date: 2026-04-23
    changes: Started the post-split product-line convergence program by fixing the three-layer target, defining workstreams and no-regression rules, and declaring the kickoff gate for SellerAgent and Docoved product adoption protocols.
---

# Protocol: Platform Product-Line Convergence And Shared-Substrate Extraction

## Purpose

This protocol starts the next program after `PRT-036`.

`PRT-036` split repository ownership.
`PRT-038` now converges the resulting repos toward a stable three-layer product-line model:
- platform substrate;
- shared cross-product substrate;
- product policy packs.

It is the single active protocol to continue in `bot-platform`.
Product repos will open their own adoption protocols later, but only after the kickoff gate defined here is satisfied.

Detailed child packets under this umbrella are now:
- `PRT-039` for the shared control-plane substrate;
- `PRT-040` for the governed-content and workflow-backed import substrate.

## Scope of this cycle

This cycle covers:
- fixing the three-layer target architecture;
- declaring the shared cross-product substrate as platform-owned;
- freezing the canonical shared object vocabulary;
- defining implementation workstreams and no-regression rules;
- defining the kickoff gate for product-level protocols;
- declaring `sales-agent` archive-only from this point forward.

This cycle does not yet cover:
- the full implementation of every extracted shared package;
- product-local execution details inside SellerAgent or Docoved;
- the final UI build-out for either product;
- a separate source-processing service deployment.

It also does not require in the first wave:
- one shared cross-product hosted control-plane service;
- one shared cross-product database.

First-wave stance is shared contracts plus product-local implementation unless and until later extraction is justified.

## Inputs

- Completed split baseline:
  - `PRT-036-platform-framework-and-product-repo-split.md`
- Stable terminology:
  - `ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md`
- New architecture decision:
  - `ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md`
- Normative placement model:
  - `spec/project/three-layer-product-line-architecture.md`
- Conceptual rationale:
  - `guides/explanation/product-line-layering-and-split-rationale.md`
- Product-local adoption anchors:
  - SellerAgent project and explanation docs
  - Docoved project and explanation docs
- Historical lineage kept only for context:
  - `sales-agent` `PRT-034`
  - `sales-agent` `PRT-035`

## Open questions / required research

- exact published package cuts for the shared middle layer;
- final persistence placement for `ConnectedSource`, `SourceRevision`, and `ImportRun`;
- the narrowest reusable UI primitive set that belongs in platform rather than product repos.

These questions are real, but they do not block the kickoff gate.
They are implementation questions for the next waves.

## Interaction substrate split

The shared interaction substrate is intentionally split across the two child packets rather than promoted into a third wave in phase 1.

Placement rule:
- `PRT-039` owns the shared interaction and management substrate for memberships, sessions, channels, protected-shell primitives, and diagnostics readback;
- `PRT-040` owns the workflow-backed governed-content interaction substrate for source registration, import entry, import status, and product review handoff.

This keeps the interaction layer explicit without creating an extra abstract packet too early.

## Security / rollout impact

- Exposure decision: `mixed`
- RLS / grants / auth impact: shared control-plane extraction affects user, membership, workspace, product-instance, and channel access semantics, so product protocols must preserve current product authorization rules while adopting the shared substrate.
- Rollback / containment note: legacy adapters and transition shims may remain temporarily, but no new feature work should originate in `sales-agent`.
- Hosted verification gate: each extraction wave must keep `bot-platform`, `seller-agent`, and `docoved-agent` on their repo-local verification baselines and preserve product acceptance anchors.

## Phase taxonomy and closure language

The convergence program uses the following progression vocabulary:
- `design_landed`
- `design_hardened`
- `implementation_in_progress`
- `implementation_proven`
- `adopted_in_product`
- `multi_product_adopted`
- `archive_ready`
- `archived`

Closure rules:
- `P0 ready_for_product_adoption_protocols` is a kickoff gate, not an implementation proof gate;
- `design_landed` or `design_hardened` does not imply runnable scenario proof;
- `implementation_proven` requires explicit verification evidence, not document presence alone;
- `adopted_in_product` requires linked product-local adoption proof, not only platform implementation;
- `archived` requires owner-side cutover proof and rollback containment notes.

## Target architecture

### Layer 1. Platform substrate

Owns:
- execution kernel;
- auth, sessions, memberships, and access primitives;
- workflow and command framework;
- typed client/API base contracts;
- traces, diagnostics, and observability.

### Layer 2. Shared cross-product substrate

Owns:
- interaction substrate;
- governed-content and import substrate.

This is where common channel-bound execution, governed source registration, import runs, and canonical processing artifacts belong.

### Layer 3. Product policy packs

Owns:
- SellerAgent product truth;
- Docoved product truth.

Products keep their own invariants, UI, prompts, runbooks, and acceptance overlays.

## Canonical shared object vocabulary

The following objects are fixed as the shared vocabulary for the next waves:
- `User`
- `Principal`
- `Session`
- `Membership`
- `Workspace`
- `ProductInstance`
- `Channel`
- `PipelineBinding`
- `ConnectedSource`
- `SourceRevision`
- `ImportRun`
- `ProcessingArtifact`
- `ExecutionRun`
- `TraceArtifact`

Product-local vocabularies must build on top of this layer rather than redefining it under product-specific names when the semantics are shared.

## Phase-1 minimality guardrails

The first wave must stay lean.

It must not introduce:
- one shared cross-product hosted control-plane service by implication;
- one shared cross-product database by vocabulary drift;
- a global admin app owned by `bot-platform`;
- a generic policy engine or generic content engine with no concrete second consumer;
- new cross-product owner leaks or hidden product dependencies in the shared layer;
- extra abstraction layers that exist only to “prepare for later” without first-wave value.

Promotion rule:
- prefer shared contracts, invariants, and reusable primitives;
- extract hosting, storage, or broader abstractions only after multi-consumer proof and a later explicit protocol.

## Workstreams

### W1. Shared control-plane substrate

Owns extraction and hardening of:
- auth and session shell;
- workspace and membership base model;
- product-instance registry;
- channel and pipeline-binding mechanics;
- diagnostics, traces, and platform-level management surfaces.

Detailed owner:
- `PRT-039-shared-control-plane-access-channel-and-management-substrate.md`

### W2. Shared governed-content and import substrate

Owns extraction and hardening of:
- connected-source registration;
- revision and activation lifecycle;
- import runs and reports;
- processing artifacts;
- source-processing contract `raw input -> canonical extraction bundle`;
- workflow-backed bot-mediated import lifecycle.

Detailed owner:
- `PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`

### W3. SellerAgent adoption

SellerAgent will adopt the shared layers while preserving:
- burst semantics;
- assist/review/takeover;
- customer memory;
- commerce and deal behavior;
- business-profile semantics;
- SellerAgent UI and operator workflows.

### W4. Docoved adoption

Docoved will adopt the shared layers while preserving:
- grounded answering;
- active snapshot and publication logic;
- semantic navigation and citation behavior;
- source review and duplicate/conflict handling;
- Docoved UI and operator workflows.

### W5. Legacy retirement and archive

This workstream retires:
- duplicated runtime files where extracted platform seams replace them;
- Seller-scoped dependencies still present in Docoved;
- fake shared ownership buckets such as the remaining `packages/shared` tail;
- narrow `sales-agent` wrappers once owner-side proof exists.

## Anti-contamination rule

No new execution wave may:
- introduce new cross-product owner leaks;
- hide SellerAgent-owned semantics behind Docoved-shaped shared names;
- hide Docoved-owned semantics behind Seller-shaped shared names;
- claim shared ownership for a seam that still has only one real product meaning.

If a seam already exists in `bot-platform`:
- prefer reusing and narrowing that seam instead of creating a second near-duplicate abstraction.

## No-regression rules

### SellerAgent must preserve

- live-customer burst behavior;
- draft review and operator takeover;
- customer-memory follow-up writes;
- commerce/cart/deal semantics;
- business-profile publication and seller channel behavior.

### Docoved must preserve

- document-grounded answering;
- active snapshot and source-binding behavior;
- semantic navigation and report/citation behavior;
- duplicate/conflict review and temporal defaults;
- current local and hosted Docoved acceptance contours.

### Shared governance rule

Bot-mediated import may become conversational at the entry surface, but it must remain workflow-backed and reviewable.
No wave may turn admin chat into the primary heavy structured editor.

## Kickoff gate for product adoption protocols

Gate name:
- `P0 ready_for_product_adoption_protocols`

Gate conditions:
1. `ADR-005` is landed in `bot-platform`.
2. `spec/project/three-layer-product-line-architecture.md` is landed in `bot-platform`.
3. the platform rationale guide is landed in `bot-platform`.
4. `PRT-039` and `PRT-040` are landed as detailed child protocols.
5. SellerAgent and Docoved each have repo-local adoption-boundary docs and rationale guides.
6. SellerAgent and Docoved protocol hubs explicitly state that new product protocols must start from this gate and their local adoption docs.
7. `sales-agent` is treated as archive-only lineage and not as an execution owner for new feature work.

Gate status on `2026-04-23`:
- `satisfied`

This means product-level agents may now start local protocols in `seller-agent` and `docoved-agent`, provided they anchor them to this protocol and their repo-local adoption docs.

## Product protocol start package

The first new SellerAgent protocol must read:
- this protocol;
- `seller-agent/spec/project/selleragent-platform-adoption-boundary.md`;
- `seller-agent/guides/explanation/selleragent-split-rationale-and-platform-adoption.md`.

The first new Docoved protocol must read:
- this protocol;
- `docoved-agent/spec/project/docoved-platform-adoption-boundary.md`;
- `docoved-agent/guides/explanation/docoved-split-rationale-and-platform-adoption.md`.

## Product-local normativity rule

Once a product repo opens its local adoption protocol and restates the imported platform assumptions, that repo-local protocol becomes the primary execution contract inside the product repo.

This means:
- `bot-platform` remains the upstream owner of shared contracts and vocabulary;
- SellerAgent and Docoved agents should normally execute from their repo-local protocols and boundary docs;
- product implementation should not require repeated cross-repo normative reading during day-to-day work.

Synchronization rule:
- if the shared-platform contract changes materially, first mirror the changed assumption into the affected product-local protocol or boundary doc;
- only after that mirror lands should the new upstream rule be treated as binding for product implementation.

Shared-to-product handshake rule:
1. harden or change the shared upstream contract in `bot-platform`;
2. mirror the imported assumption into the affected product-local protocol, boundary doc, or UI-doc packet;
3. only then start or continue product implementation against the changed rule;
4. do not mark the shared wave as `adopted_in_product` until the product-local proof is linked back upstream.

This is the intended operating model for parallel product execution after gate `P0 ready_for_product_adoption_protocols`.

## Plan refinement status

Stage of plan elaboration:
- `стадия проработки плана: фаза 3 выполнена`

Phase 1 review outputs:
- the multi-aspect protocol review packet is recorded in `.tasks/prt-038-phase1-review/reports/phase1-consolidated-review.md`;
- the synthesis packet is recorded in `.tasks/prt-038-phase1-review/reports/_phase1-synthesis.md`;
- `PRT-039` and `PRT-040` are now hardened with the accepted contract, verification, observability, UI-doc, and release-safety additions;
- the next step is implementation under those hardened child packets, with stronger closure states allowed only when the required evidence exists.

Phase 2 implementation-planning outputs:
- the subagent-oriented implementation planning work folder is recorded in `.tasks/prt-038-phase2-implementation/`;
- the synthesis packet is recorded in `.tasks/prt-038-phase2-implementation/reports/phase2-implementation-synthesis.md`;
- the umbrella protocol now carries the implementation execution model, subagent usage rules, task graph, verifier flow, and staged verification expectations for the next wave.

Phase 3 ops/runbook-alignment outputs:
- the ops/runbook-alignment working folder is recorded in `.tasks/prt-038-phase3-ops-runbook-alignment/`;
- the synthesis packet is recorded in `.tasks/prt-038-phase3-ops-runbook-alignment/reports/phase3-ops-runbook-alignment.md`;
- the umbrella protocol now carries the operational execution model for git/worktree discipline, push/CI/hosted trigger rules, deploy/preflight/rollout gates, and lessons-learned/insights routing.

## Implementation execution model

### `.tasks/` execution layer

Implementation under this packet uses `.tasks/` as a lean execution layer:
- task files in `.tasks/.../tasks/`;
- subagent and verifier reports in `.tasks/.../reports/`;
- phase-level synthesis in the same working folder.

Rule:
- `.tasks/` stores bounded execution artifacts only;
- it does not become a competing spec layer or a second normative protocol layer.

### Subagent dispatch model

Default operating model:
- one bounded task = one task file;
- one task file = one declared write scope;
- one execution agent writes one report file;
- verification is either included explicitly in the task or split into a dedicated verifier task;
- status/doc sync touching shared protocol/status surfaces is serialized behind dedicated sync tasks.

### Mandatory task-file contract

Every subagent implementation task file must include:
1. `Purpose`
2. `Scope / non-goals`
3. `Write scope / no-touch boundaries`
4. `Context (SSoT links and exact inspection anchors)`
5. `Project grounding (mandatory before coding)`
6. `Open questions / ambiguity gate`
7. `Task`
8. `Deliverables`
9. `Constraints / anti-goals / required rules`
10. `Execution lane / git-flow path / remote-trigger permissions`
11. `Verification plan`
12. `Lessons learned / insights handling`
13. `Report requirements`
14. `Definition of done`

Minimum frontmatter fields:
- `file`
- `description`
- `purpose`
- `version`
- `date`
- `status`
- `parent`
- `task_type`
- `protocol`
- `report_file`
- `related_files`
- `write_scope`

For executable tasks also include or explicitly inherit:
- `verification_class`
- `git_flow_path`
- `remote_triggers`
- `lessons_dir`

Strong recommendation:
- include `no_touch` where overlap prevention matters.

### Mandatory grounding before coding

Every implementation subagent must gather all of the following before changing files:
- read the task file fully;
- read the owning `PRT-*`;
- read linked `FT-*` / `SPEC-*` docs where relevant;
- read `git-flow.md`;
- read `delivery-standards.md`;
- read `coding-style.md`;
- read `deployment-architecture.md`, `runbook.md`, and `hosted-beta-acceptance-contract.md` when preview/beta/prod or hosted verification may be in scope;
- read `production-rollout-runbook.md` when the task can influence production promotion, migration sequencing, or rollback inputs;
- read `npm-package-release-runbook.md` when package versioning/publication or `Release Packages` can be touched;
- read `mbb/principles.md`, `mbb/indexing-guide.md`, and `mbb/cross-references.md` before routing lessons/insights or changing durable Memory Bank indexing/cross-links;
- read `delivery-docs-guide.md`;
- read `scenario-docs-guide.md` where verification maturity or hosted proof matters;
- inspect exact code anchors and exact verification anchors named in the task;
- inspect the real repo/package verification scripts before promising checks in the task or report;
- stop for research if ambiguity can materially change contract, ownership, fallback, rollout, or acceptance semantics.

### Report contract

Every implementation or verifier report must capture at least:
- summary of work completed;
- files changed or checked;
- commands/checks run;
- result of checks;
- whether push/PR/deploy/release actions were performed, deferred, or forbidden;
- unresolved follow-ups or blockers;
- doc/status updates performed or `N/A`;
- lessons learned / insights files touched, or explicit `none`;
- proposed MBB routing for accepted long-lived findings, or explicit `none`;
- explicit statement of anything not run and why.

## Operational execution model

### Git / worktree / branch discipline

Default branch path for `PRT-038` implementation waves:
- start the normal wave from `develop`;
- create one `feature/*` branch per active bounded wave;
- use one dedicated `git worktree` per active parallel wave;
- reserve `main` for governed production promotion and `hotfix/*` only for urgent production repair with required back-merge into `develop`.

Rules:
- do not start normal convergence work from `main`;
- protected branches accept changes only through PR merge commits;
- direct push to `develop` or `main` is forbidden;
- `squash` or `rebase` merge is an explicit exception path, not the default protocol path;
- shared-contract slices should merge early and small to reduce cross-worktree rebase debt.

### Commit and handoff rule

Commits should happen:
- when a bounded slice reaches a coherent local checkpoint;
- before handoff to a verifier or another subagent;
- before opening or updating a PR.

Do not:
- batch unrelated protocol slices into one commit;
- leave shared dependency handoffs only in a dirty worktree;
- rewrite history on protected branches.

### Push / CI / hosted-build trigger policy

Push only when at least one of the following is true:
- the slice is ready for PR review;
- GitHub evidence is required for the closure of the wave;
- another worktree or repo needs the slice as a real dependency;
- preview review, beta verification, or later production promotion is intentionally being prepared;
- a controlled package release is explicitly in scope.

Rules:
- do not push merely as a checkpoint if it would create unnecessary GitHub/Vercel churn;
- treat `Verification` as the default protected-branch health gate for ordinary implementation waves;
- treat `Release Packages` as release-readiness/publish evidence only when versioning or publication is explicitly in scope;
- package publication and release tags are intentional release actions governed by the npm package release runbook, not a side effect of ordinary feature pushes;
- docs-only, planning-only, and local-only refactor waves normally stop before remote hosted triggers;
- if GitHub or hosted checks fail, repair or re-scope the wave before promotion continues.

### Deploy / preflight / rollout rule

Operational lane model:
- `local`
- `preview`
- `beta`
- `prod`

Rules:
- `preview` is branch/PR validation and does not count as `beta` acceptance by default;
- deploy truth requires live lane readback, deployment metadata, and compatibility proof for the affected path;
- branch mapping, CI success, preview availability, or package publication alone is not deploy truth;
- merge or deploy toward `develop` only when required local proof is green and there is a real need for beta-hosted verification in the scoped wave;
- before any hosted `beta_api`, `beta_ui`, or `beta_external_manual`, run the documented preflight for target-lane identity, deployment pair/group integrity, auth/session bootstrap, external readiness, and evidence pinning;
- migration-sensitive waves must declare additive/compatibility sequencing, backup or safety-artifact requirement, rollback/containment note, and production stop conditions before promotion;
- later production promotion follows `develop -> main` plus the governed production rollout runbook and is never an automatic consequence of beta success.

### Hosted scenario planning rule

When deploy-time verification is required, the protocol must plan the hosted scenario set explicitly.

Preferred model:
1. `beta_api` or protected read-model proof as the business-truth layer.
2. `beta_ui` as thin confirmatory proof for operator/user-facing flows.
3. `beta_external_manual` only when a real external nondeterministic dependency cannot be isolated.

Hosted planning must record:
- the scenario pack being used;
- the target alias/deployment pair;
- the expected verification layer(s);
- the final verdict required for closure.

### Mandatory subagent operational briefing

Every executable subagent task must explicitly state:
- which git/runbook/MBB documents are mandatory reading before work starts;
- which branch/worktree path the task belongs to;
- whether the subagent is local-only or may also push, update PRs, inspect GitHub CI, trigger hosted verification, or enter release/promotion steps;
- which local checks, CI checks, and hosted checks are required, optional, or forbidden;
- that failures found in checks must be fixed or escalated inside the task rather than silently deferred;
- that reusable non-obvious findings must be written into the run-folder lessons/insights artifacts and not left only in chat or only in the executor/verifier report.

## Implementation task graph

The first implementation wave is split into two parallel workstreams with bounded package-scoped slices.

### W1 implementation tasks: shared control-plane substrate

- `T039-01-control-plane-vocabulary`
- `T039-02-channel-binding-contract`
- `T039-03-control-plane-api-read-models`
- `T039-04-control-plane-export-integration`
- `T039-V1-control-plane-verifier`
- `T039-S1-control-plane-sync`

Recommended write-scope rule:
- domain invariants and validation in `packages/core/src/control-plane/**`;
- shared envelopes/read models in `packages/api-contract/src/control-plane/**`;
- verifier work in tests/scenarios/evidence surfaces;
- status/protocol sync in dedicated serialized tasks only.

### W2 implementation tasks: shared governed-content/import substrate

- `T040-01-governed-content-vocabulary`
- `T040-02-source-processing-bundle-contract`
- `T040-03-import-lifecycle-idempotency`
- `T040-04-governed-content-api-read-models`
- `T040-05-governed-content-export-integration`
- `T040-V1-governed-content-verifier`
- `T040-S1-governed-content-sync`

Recommended write-scope rule:
- domain invariants and processing/lifecycle helpers in `packages/core/src/governed-content/**`;
- shared envelopes/read models in `packages/api-contract/src/governed-content/**`;
- verifier work in tests/scenarios/evidence surfaces;
- status/protocol sync in dedicated serialized tasks only.

### Parallelization rule

Safe early parallel work:
- `T039-01` and `T040-01` may start in parallel;
- after `T039-01`, `T039-02` and `T039-03` may run in parallel;
- after `T040-01`, `T040-02` and `T040-03` may run in parallel.

Unsafe to parallelize without serialization:
- root export/barrel integration tasks;
- `current-status-report.md`;
- `verification-matrix.md`;
- `scenario-matrix.md`;
- shared protocol/status surfaces.

### Existing seam reuse rule

Where a real shared seam already exists, implementation should reuse and narrow it rather than create a second abstraction.

Current first reuse target:
- `packages/core/src/runtime/pipeline-registry.ts`

### Milestone gates

- `G1-control-plane-shared-contract-ready`
  - all `T039-*` implementation, verifier, and sync tasks complete;
  - unlocks safe start for product-local control-plane adoption planning and implementation.

- `G2-governed-content-shared-contract-ready`
  - all `T040-*` implementation, verifier, and sync tasks complete;
  - unlocks safe start for Docoved import adoption and any later cautious reuse elsewhere.

- `G3-cross-repo-adoption-handshake`
  - `G1` complete;
  - `G2` complete where Docoved depends on it;
  - affected product-local assumptions mirrored downstream.

Rule:
- `P0` remains the planning kickoff gate;
- real shared-contract implementation handoff to products happens at `G1`, `G2`, and `G3`, not at `P0` alone.

## Verifier workflow and closure expectations

Verifier review is mandatory for implementation waves that claim stronger closure than `implementing`.

Verifier checklist must cover:
- contract alignment with the owning `PRT-*`;
- local proof;
- CI proof;
- scenario honesty;
- hosted proof when required;
- security/rollout notes when required;
- product adoption links when claimed;
- documentation/status sync.

Allowed verifier outcomes:
- `pass`
- `pass_with_followups`
- `partial_only`
- `blocked`

Rule:
- `partial_only` is the correct verdict when implementation is real but runnable scenario, hosted, or product-adoption proof is still missing.

## Verification, testing, and staged rollout contour

### Local baseline

Every code task must leave a local proof bundle.

Minimum baseline today in `bot-platform`:
- `pnpm check`
- `pnpm typecheck` when the changed slice affects TypeScript contracts, public exports, or package/build boundaries, or when the task explicitly requires stronger type proof;
- package-local `build` / `typecheck` when narrower proof is more honest or more informative than only the repo-root build.

Additionally:
- run the narrowest slice-specific verification path available;
- if the affected slice has repo-local lint, test, scenario, or security scripts, run the relevant ones and record them;
- if such scripts do not exist for the slice, record explicit `N/A` instead of inventing a command;
- if the chosen verifier path executes compiled `dist` artifacts, the producing build must complete before the dist-based test command starts; stale compiled output is not valid evidence;
- failures found in local checks must be fixed or the wave must be explicitly re-scoped before push/PR/deploy closure.

### CI gate

Every pushed wave that claims remote closure must record:
- the canonical GitHub workflow result(s) relevant to that wave;
- `Verification` for normal protected-branch health;
- `Release Packages` only when package release readiness/publication is intentionally in scope;
- commit SHA;
- workflow/run identifier(s);
- final status.

Rules:
- if a wave has not been pushed yet, remote evidence remains `pending` and must not be implied;
- green GitHub workflows are not deploy truth by themselves;
- red GitHub checks must be corrected or the wave must be explicitly re-scoped before promotion continues.

### Scenario and verification maturity rule

Planned anchors are not closure-ready evidence.

Rules:
- a task may reference a planned anchor honestly and still remain `partial`;
- it may not claim `implementation_proven` or `adopted` on a planned anchor alone;
- new full scenario contracts should be created only for acceptance-critical shared capabilities that truly need them.

### Hosted and staged proof

Hosted proof is mandatory only when the change touches:
- hosted operator/admin UI;
- protected auth/session surfaces;
- webhook/provider/external integration behavior;
- hosted runtime behavior where preview/beta drift matters.

Lane rule:
- `preview` may support branch review, but does not replace beta acceptance by default;
- hosted acceptance must use the real `beta` lane with aliased deployment-pair/group proof when the wave is beta-facing;
- `prod` proof is a separate governed promotion stage with narrow post-release smoke only.

Preferred hosted evidence model:
1. `beta_api` or protected read-model proof for business truth;
2. `beta_ui` as thin confirmatory proof;
3. `beta_external_manual` only for truly external nondeterministic systems.

Preflight rule:
- record target alias/deployment references, lane identity proof, deployment pair/group integrity proof, bootstrap/auth readiness, and external dependency readiness before scenario execution starts;
- record Vercel or other hosted readiness only when the wave actually triggered hosted deployment/build work.

### Security and rollout-sensitive changes

Explicit security/rollout notes are mandatory for:
- persisted session changes;
- membership model or membership mutation changes;
- channel authorization or protected-shell exposure changes;
- auth/bootstrap/session bootstrap changes;
- RLS, grants, exposure, retention, or redaction changes;
- governed artifact visibility changes;
- activation/cutover or rollback-path changes for governed content;
- schema/storage migrations where compatibility or rollback safety matters.

Such tasks must capture:
- exposure/RLS/grants/access or retention decision;
- additive compatibility path or migration-first sequencing choice;
- backup or safety-artifact requirement, or explicit `N/A`;
- rollback inputs and containment plan;
- production stop condition if later promoted;
- hosted verification expectation or explicit `N/A`.

## Lessons Learned And Insights Discipline

This protocol must capture reusable non-obvious findings during research, implementation, verification, deployment, and documentation work.

### Run-folder artifact rule

Each active protocol working folder under `.tasks/<protocol-run>/` should keep a `lessons/` area with monotonic zero-padded files such as:
- `lessons/001-lessons-learned.md`
- `lessons/002-lessons-learned.md`
- `lessons/003-insights.md`

### Trigger rule

Create or extend the next numbered lesson/insight artifact when execution reveals:
- a missing or incorrect runbook step;
- a code constraint that was not documented but materially affects future work;
- a documentation claim that proved false or incomplete;
- a reusable deployment, verification, migration, or tooling insight;
- a non-obvious failure mode that required investigation.

### Content rule

These artifacts must:
- avoid diary/history style;
- avoid raw log dumping;
- state the reusable truth, why it matters, and what action follows;
- name the owning SSoT that should absorb the knowledge if it is long-lived;
- follow the MBB principles and routing expectations from `mbb/principles.md`, `mbb/indexing-guide.md`, and `mbb/cross-references.md`.

### Closeout and MBB routing rule

Lessons/insights files are execution artifacts, not the final SSoT.

Before stage or protocol closeout:
- accepted long-lived lessons must be folded into the owning Memory Bank document;
- the run-folder artifact remains as evidence/routing support, not as the sole home of that knowledge;
- each accepted finding must propose one owning destination using the `spec / scenario / runbook / guide / ADR / mbb` routing model;
- closeout notes must say which Memory Bank document absorbed the finding, or why the finding was intentionally deferred;
- subagent and verifier reports must mention the created lessons/insights artifacts or state explicit `none`.

## Product implementation start rule

Product-repo agents may start:
- planning and local protocol work after `P0`;
- real implementation against a shared platform slice only after the relevant shared gate is reached and mirrored locally.

Concretely:
- control-plane product adoption may start after `G1`;
- Docoved governed-content/import adoption may start after `G2`;
- broader multi-repo execution should treat `G3` as the safe shared-contract handshake point.

## Documentation and verification sync rule

No non-draft wave may be treated as complete until the relevant Memory Bank surfaces are updated together.

Minimum sync set:
- owning `PRT-*` packet;
- `current-status-report.md`;
- `verification-matrix.md` when the verification contour changes;
- `scenario-matrix.md` when scenario anchors or execution status change;
- affected product-local adoption protocols or boundary docs;
- affected product-local UI-doc packet where governed surfaces are introduced or changed.

MBB rule:
- protocols remain curated execution contracts and evidence sinks;
- scenario and status surfaces must stay honest about `planned` vs runnable proof;
- no separate abstract doc type should be introduced when protocol, status, and scenario surfaces already cover the need.

## Key decisions / deviations

- The post-split program is intentionally modeled as one active platform umbrella protocol plus later product-local adoption protocols, not as one giant cross-repo protocol blob.
- `sales-agent` is now lineage only. New architecture truth must not be authored there.
- Source processing is introduced first as a contract, not as a prematurely separate product or service.
- Phase-1 hardening intentionally strengthens contracts and gates without introducing new infrastructure layers.

## Evidence

- `ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md`
- `spec/project/three-layer-product-line-architecture.md`
- `guides/explanation/product-line-layering-and-split-rationale.md`
- SellerAgent adoption-boundary and rationale docs
- Docoved adoption-boundary and rationale docs
- `.tasks/prt-038-phase1-review/reports/phase1-consolidated-review.md`
- `.tasks/prt-038-phase2-implementation/reports/phase2-implementation-synthesis.md`
- `.tasks/prt-038-phase3-ops-runbook-alignment/reports/phase3-ops-runbook-alignment.md`
- `PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`

## Outcome

- Result: `partial`
- Current completion state: `design_hardened`
- Follow-up needed:
  - implement W1 and W2 inside `bot-platform`;
  - continue execution through the product-local adoption protocols in SellerAgent and Docoved;
  - retire legacy seams as owner-side proofs become available.

## Memory Bank impact

- Added the long-lived decision doc `ADR-005`.
- Added the normative project-level three-layer architecture spec.
- Added the platform rationale explanation guide.
- Started the active umbrella protocol `PRT-038`.
- Declared the kickoff gate for product-level adoption protocols as satisfied.
- Added umbrella-level phase taxonomy, anti-contamination rules, and documentation/verification sync obligations.
- Added the phase-3 operational execution model for git/worktree/promotion discipline, remote-trigger governance, deploy-truth/preflight/rollout rules, and lessons-learned/insights routing.
