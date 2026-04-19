---
file: .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
description: Cross-epic architecture and migration protocol for splitting the current mixed repository into a framework-only `bot-platform` monorepo plus separate `selleragent` and `docoved-agent` product monorepos with independent deployment and Memory Bank ownership.
purpose: Reference when executing the repository split so framework code, product code, deployment boundaries, Memory Bank truth, and historical tails move in a controlled sequence instead of drifting through ad hoc folder moves.
version: 1.5.0
date: 2026-04-19
status: ACTIVE
epic: EP-022
tags: [protocol, architecture, repo-split, bot-platform, selleragent, docoved, monorepo, migration, ci-cd]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-030-architecture-boundary-simplification-and-ownership-convergence.md
  - .memory-bank/spec/project/agent-execution-platform-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/security/auth-and-access.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .tasks/prt-036-protocol-review-2026-04-19/summary/PRT-036-review-synthesis.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-00-execution-pack-index.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-01-ownership-matrix.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-02-dependency-bridge-decision.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-03-repo-skeleton-pack.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-04-memory-bank-split-map.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-05-ops-split-plan.md
  - .tasks/prt-036-protocol-review-2026-04-19/artifact-workspace/R-036-06-archive-and-history-policy.md
  - .tasks/prt-036-memory-bank-redesign-2026-04-19/summary/PRT-036-memory-bank-redesign-synthesis.md
  - .tasks/prt-036-boundary-contract-review-2026-04-19/summary/PRT-036-boundary-contract-review-synthesis.md
history:
  - version: 1.5.0
    date: 2026-04-19
    changes: Recorded the first substantive Memory Bank fill wave in target repos: framework/product boundary docs, repo-structure docs, current-status snapshots, and verification matrices were added to bot-platform, selleragent, and docoved-agent.
  - version: 1.4.0
    date: 2026-04-19
    changes: Recorded Wave 1 Memory Bank bootstrap progress: real target `.memory-bank` skeletons were created in `bot-platform`, `selleragent`, and `docoved-agent`, with MBB packs and root/section hubs landed for continued protocol-driven migration.
  - version: 1.3.0
    date: 2026-04-19
    changes: Added a contract-boundary workstream to the protocol, including CB-01..CB-06 tasks for runtime, API/SDK, auth/commands, workflow, persistence, and contract-document backlog closure before mixed-package extraction.
  - version: 1.2.0
    date: 2026-04-19
    changes: Added a unified protocol task register that consolidates decision closure, review artifacts, Memory Bank redesign tasks, and mixed-package extraction design into one execution backlog.
  - version: 1.1.0
    date: 2026-04-19
    changes: Integrated the Memory Bank redesign wave into the protocol as an explicit execution task program covering MBB mirroring, target repo Memory Bank skeletons, current-source transition, and index/move-map planning.
  - version: 1.0.0
    date: 2026-04-19
    changes: Initial protocol for splitting the current mixed codebase into a framework-only platform repo and two product repos with explicit ownership, deployment, Memory Bank, and migration-wave boundaries.
---

# Protocol: Platform Framework And Product Repo Split

## Purpose

This protocol turns the repository-split direction into an execution-grade migration contract.

The target state is no longer "one growing mixed repo with multiple product lines inside it".
The target state is:
- one framework monorepo: `bot-platform`;
- one SellerAgent product monorepo: `selleragent`;
- one Docoved product monorepo: `docoved-agent`.

This protocol exists so the split is performed as a boundary cleanup program, not as a sequence of accidental folder moves.

## Scope of this cycle

### In scope

- define the canonical repository topology for `bot-platform`, `selleragent`, and `docoved-agent`;
- define what counts as framework code versus product code;
- define where auth/users, Telegram slash-command surfaces, workflows, DB ownership, and deployment ownership live after the split;
- map the current mixed repository into target-repo ownership buckets;
- define the required Memory Bank split and documentation obligations for each resulting repo;
- define the migration waves, verification gates, and archival handling for historical tails such as legacy SellerAgent Python code and non-Memory-Bank documentation.

### Out of scope

- a big-bang code move in one step;
- introducing a shared live control-plane instance used by both products;
- forcing both products onto one shared database or one shared workflow deployment;
- inventing a generic framework abstraction for product-specific logic that only one product actually needs;
- immediate publication/versioning mechanics for every future internal package before the boundary map is accepted.

## Inputs

- Existing architecture and boundary SSoT:
  - [.memory-bank/spec/project/agent-execution-platform-architecture.md](../../spec/project/agent-execution-platform-architecture.md)
  - [.memory-bank/spec/project/feature-area-boundaries.md](../../spec/project/feature-area-boundaries.md)
  - [.memory-bank/spec/project/repo-structure.md](../../spec/project/repo-structure.md)
- Prior architecture cleanup protocol:
  - [PRT-030](PRT-030-architecture-boundary-simplification-and-ownership-convergence.md)
- Security and deployment references:
  - [.memory-bank/spec/security/auth-and-access.md](../../spec/security/auth-and-access.md)
  - [.memory-bank/spec/operations/deployment-architecture.md](../../spec/operations/deployment-architecture.md)
- Current source repository inventory:
  - `apps/server`
  - `apps/web`
  - `apps/workflow`
  - `packages/api-contract`
  - `packages/client-sdk`
  - `packages/core`
  - `packages/db`
  - `packages/dv-admin`
  - `packages/observability`
  - `packages/platform-config`
  - `packages/prompt-catalog`
  - `packages/sa-admin`
  - `packages/sa-docoved`
  - `packages/sa-judge`
  - `packages/scenario-runner`
  - `packages/shared`
  - `packages/ui-contract`

## Open questions / required research

- Package publication strategy still needs a follow-up decision:
  - workspace dependency only;
  - private package registry;
  - git reference or subtree bridge during migration.
- The exact split of current `packages/api-contract` and `packages/client-sdk` needs a contract inventory, because part of their surface is truly framework-level while part is product-specific.
- The exact extraction line inside `packages/core` still needs a code-level owner map, especially around runtime, channels, and workflow-family helpers.
- The exact split of `packages/scenario-runner` needs a scenario inventory:
  - scenario engine and generic evidence tooling may become platform-level;
  - SellerAgent and Docoved scenario suites should become product-local.
- Final naming still needs one explicit confirmation:
  - repo name `selleragent` versus keeping `sales-agent` as the long-term product repo name.

> This protocol is allowed to fix repository boundaries first and leave some package-publication mechanics for a later narrow decision.
> It is not allowed to postpone the boundary map itself.

## Security / rollout impact

- Exposure decision: `mixed`
- RLS / grants / auth impact: auth and user models become framework-defined in `bot-platform`, but concrete persistence, product memberships, sessions, and grants remain product-local in `selleragent` and `docoved-agent`.
- Rollback / containment note: the current mixed repository remains the migration source until each target repo reaches bounded parity; no destructive source cleanup should happen before the corresponding target repo has a minimal runnable contour.
- Hosted verification gate: each product repo must prove its own deploy path and environment isolation on its own hosted contour before old mixed deployment assumptions are retired.

## Execution summary

1. Treat `bot-platform` as a framework monorepo, not as a shared live product instance.
2. Treat `selleragent` and `docoved-agent` as separate product monorepos with their own DB truth, deployments, secrets, CI/CD, and Memory Banks.
3. Extract shared mechanisms upward into `bot-platform` only when they are truly product-agnostic or already needed by both products.
4. Split workflow into framework plus product hosts:
   - workflow framework in `bot-platform`;
   - concrete workflow deployments in each product repo.
5. Archive and remove historical tails from the active mainline early so the migration is not blocked by dead code ownership.

## Key decisions / deviations

- Decision: `bot-platform` is a framework/product-support repo, not a multi-tenant shared runtime serving both SellerAgent and Docoved as one live instance.
- Decision: auth/users live in `bot-platform` only as framework contracts, helpers, guards, and lifecycle patterns; each product owns its own actual user/auth tables and runtime authority data.
- Decision: Telegram slash commands and comparable system-command mechanics live in `bot-platform` as a command framework plus command contract vocabulary; product-specific commands, handlers, and enablement policies live in product repos.
- Decision: workflow core belongs in `bot-platform`, but concrete workflow hosts and workflow deployments remain product-local.
- Decision: DB ownership is product-local by default; framework repos do not own product tables.
- Decision: CI/CD is product-local by default; Vercel configuration should become simpler by giving each product repo its own deploy lifecycle.
- Decision: if a feature is needed by both SellerAgent and Docoved, it graduates into `bot-platform` only after its boundary is clear enough to be framework code rather than one product's accidental abstraction.
- Decision: legacy SellerAgent Python is retained only in git history, not as live source.

## Target repository topology

### `bot-platform`

Role:
- framework monorepo;
- reusable contracts, kernels, support packages, and tooling;
- no shared product data;
- no shared live product deployment.

Expected contents:
- platform execution/kernel abstractions;
- auth/access framework;
- command framework;
- workflow framework;
- framework-level contracts and SDK helpers;
- observability/config/prompt support packages;
- scenario/evidence framework pieces that are not product-specific;
- documentation and Memory Bank for platform truth only.

### `selleragent`

Role:
- SellerAgent product monorepo;
- owns SellerAgent web app, bot, server surfaces, workflows, DB, deploys, and runbooks.

Expected contents:
- SellerAgent product surfaces;
- SellerAgent product DB schema and repositories;
- SellerAgent-specific runtime policies, prompts, domains, and workflows;
- SellerAgent product Memory Bank, specs, features, and operational runbooks;
- archived non-Memory-Bank SellerAgent docs where still needed.

### `docoved-agent`

Role:
- Docoved product monorepo;
- owns Docoved runtime, knowledge publication/product surfaces, workflows, DB, deploys, and runbooks.

Expected contents:
- Docoved product surfaces and operators;
- Docoved ingest/publication/runtime code;
- Docoved product DB schema and repositories;
- Docoved product Memory Bank, specs, features, and hosted runbooks.

## Boundary rules

### Framework versus product

Move code to `bot-platform` only when both conditions hold:
1. the mechanism is product-agnostic or has at least two real product consumers;
2. the framework API can be described without SellerAgent-specific or Docoved-specific domain truth.

Otherwise the code remains product-local.

### Auth and users

`bot-platform` owns:
- auth framework primitives;
- user/account abstractions;
- guards, sessions, adapters, and policy interfaces;
- test helpers and extension points.

Product repos own:
- concrete tables;
- concrete migrations;
- product membership semantics;
- product authority projections;
- deploy-time auth wiring and secrets.

### System commands

`bot-platform` owns:
- command envelope shape;
- parser/registry primitives;
- command execution hooks;
- common diagnostics patterns.

Product repos own:
- actual commands;
- channel/product enablement;
- permission mapping;
- command side effects and read models.

### Workflow

`bot-platform` owns:
- workflow framework;
- durable-step conventions;
- resumability/retry helpers;
- common workflow instrumentation;
- generic workflow test harnesses.

Product repos own:
- workflow hosts;
- workflow deployment units;
- workflow storage bindings;
- workflow commands and business steps.

### Data and deployment

There is no shared live `bot-platform` DB or workflow service by default.

Each product repo owns:
- database;
- migrations;
- secrets;
- Vercel projects;
- runtime workers;
- hosted acceptance;
- rollback procedures.

## Current repository decomposition map

### Primary candidates for `bot-platform`

- `packages/observability`
- `packages/platform-config`
- framework-level slices of `packages/prompt-catalog`
- framework-level slices of `packages/api-contract`
- framework-level slices of `packages/client-sdk`
- framework-level slices of `packages/core`
  - execution-kernel abstractions
  - shared channel/runtime framework seams
  - auth/access framework pieces
  - command framework pieces
  - workflow framework pieces
- framework/evidence slices of `packages/scenario-runner`
- `packages/ui-contract` if it remains truly cross-product
- extracted generic utilities from `packages/shared`, followed by shrink/removal of `shared`

### Primary candidates for `selleragent`

- `apps/web` as SellerAgent web/control surface unless a route subset is explicitly Docoved-owned
- SellerAgent product server and ingress slices extracted from `apps/server`
- SellerAgent workflow host extracted from `apps/workflow`
- `packages/sa-admin`
- `packages/sa-judge`
- SellerAgent domains now living inside `packages/core`, especially:
  - `customers`
  - `commerce`
  - seller memory/handoff/follow-up logic
  - seller reply/runtime policies
- SellerAgent DB slices now living inside `packages/db`
- SellerAgent prompts and product-local operations/docs currently mixed into root materials

### Primary candidates for `docoved-agent`

- Docoved product server and ingress slices extracted from `apps/server`
- Docoved workflow host extracted from `apps/workflow`
- `packages/sa-docoved`
- `packages/dv-admin`
- Docoved runtime and publication slices inside `packages/core`
- Docoved DB slices inside `packages/db`, including:
  - `docoved-ingest-store`
  - `docoved-projection-store`
  - `docoved-snapshot-store`
  - `docoved-quality-job-store`
- Docoved hosted runbooks and acceptance tooling

### Archive, drop, or relocate

- legacy SellerAgent Python:
  - archived in git history;
  - removed from active mainline;
  - future home only if intentionally imported into the SellerAgent product archive.
- non-Memory-Bank root markdown documents:
  - inventory individually;
  - relocate into the owning product repo or archive folder;
  - do not leave them as mixed-root truth after the split.
- `packages/shared`:
  - transitional only;
  - should shrink through extraction rather than being copied wholesale into a new repo.

## Memory Bank split rules

Each resulting repo must own its own `.memory-bank`.

### `bot-platform/.memory-bank`

Owns:
- platform specs;
- framework boundaries;
- package contracts;
- framework features;
- platform runbooks;
- framework release notes and migration notes.

Must not own:
- SellerAgent product truth;
- Docoved product truth;
- product-specific operator runbooks.

### `selleragent/.memory-bank`

Owns:
- SellerAgent specs;
- SellerAgent product features;
- SellerAgent runbooks;
- SellerAgent deployment topology;
- SellerAgent CI/CD and operational guides;
- SellerAgent legacy/archive notes if still relevant.

### `docoved-agent/.memory-bank`

Owns:
- Docoved specs;
- Docoved product features;
- Docoved runbooks;
- Docoved deployment topology;
- Docoved operational knowledge publication guidance.

Protocol follow-up rule:
- once this split starts landing, the temporary cross-repo truth captured here must be decomposed into repo-local specs and features inside each owning repo.

## Memory Bank redesign task program

This protocol now treats Memory Bank redesign as a first-class Wave 1 workstream.

Goal:
- make each target repo immediately usable as a repo-local documentation home;
- stop the current `sales-agent/.memory-bank` from remaining a mixed multi-owner SSoT;
- move MBB and indexing rules into a stable, repeatable operating model across all three repos.

### MB-01: Shared MBB and standards pack

Primary output:
- define the canonical `mbb/` and shared-standards distribution policy for all three repos.

Task:
- `bot-platform` becomes the canonical upstream for `.memory-bank/mbb/**`;
- `selleragent` and `docoved-agent` receive exact mirrors of the full `.memory-bank/mbb/**` subtree;
- `git-flow.md` is the only non-MBB doc approved for exact mirroring as the initial shared standards extension;
- adjacent standards docs are classified as either:
  - platform-canonical reference docs;
  - or split into a platform standard plus repo-local overlays.

Deliverables:
- `MBB pack plan`
- mirror/sync policy
- whitelist of exact mirrors vs split standards

### MB-02: `bot-platform` Memory Bank skeleton

Primary output:
- create the initial framework-only Memory Bank shape for `bot-platform`.

Task:
- define repo-local root/index structure for:
  - `.memory-bank/index.md`
  - `.memory-bank/spec/index.md`
  - `.memory-bank/plans/index.md`
  - `.memory-bank/guides/index.md`
  - `.memory-bank/mbb/index.md`
- keep platform-only truth in this repo:
  - architecture
  - project/repo structure
  - client API and SDK contracts
  - scenario system
  - framework protocols
  - canonical MBB
- explicitly exclude SellerAgent and Docoved product truth.

Must-have docs:
- architecture hub
- project/repo structure docs
- runtime/framework contract docs
- planning hubs
- shared guides/reference standards
- canonical `mbb/`

### MB-03: `selleragent` Memory Bank skeleton

Primary output:
- create the initial product-local Memory Bank shape for `selleragent`.

Task:
- define repo-local root/index structure for:
  - `.memory-bank/index.md`
  - `.memory-bank/spec/index.md`
  - `.memory-bank/plans/index.md`
  - `.memory-bank/guides/index.md`
  - `.memory-bank/scenarios/index.md`
  - `.memory-bank/mbb/index.md`
- keep SellerAgent-owned truth only:
  - customers
  - commerce
  - seller runtime semantics
  - seller operations/security/ui
  - business-profile/operator guides
  - seller plans/protocols/scenarios
- treat `mbb/` as a read-only mirror from `bot-platform`.

Must-have docs:
- seller root/index set
- product domain specs
- seller rollout/deploy/security runbooks
- seller guides
- seller scenario hub

### MB-04: `docoved-agent` Memory Bank skeleton

Primary output:
- create the initial product-local Memory Bank shape for `docoved-agent`.

Task:
- define repo-local root/index structure for:
  - `.memory-bank/index.md`
  - `.memory-bank/spec/index.md`
  - `.memory-bank/plans/index.md`
  - `.memory-bank/guides/index.md`
  - `.memory-bank/scenarios/index.md`
  - `.memory-bank/mbb/index.md`
- keep Docoved-owned truth only:
  - Docoved architecture domains
  - Docoved runtime and grounded-answering contracts
  - Docoved operations/runbooks
  - Docoved guides/reference docs
  - `EP-023`, `PRT-025..035`, Docoved scenarios
- treat `mbb/` as a read-only mirror from `bot-platform`.

Must-have docs:
- docoved root/index set
- product architecture/runtime/operations hubs
- product planning hubs
- product guide hubs
- scenario hub

### MB-05: current `sales-agent` Memory Bank transition

Primary output:
- redefine the current repo Memory Bank as a migration-only surface.

Task:
- rewrite `.memory-bank/index.md` into a transitional routing hub;
- stop allowing new mixed-repo SSoT content here after target repo skeletons exist;
- convert mixed top-level hubs into migration stubs over time:
  - `spec/index.md`
  - `plans/index.md`
  - `scenarios/index.md`
  - `guides/index.md`
- convert especially misleading mixed hubs early:
  - `spec/runtime/index.md`
  - `spec/operations/index.md`
  - `plans/protocols/index.md`
  - `plans/adr/index.md`
- leave only:
  - migration stubs
  - archive/history-only pointers
  - `.tasks/**` workbench materials

Stub standard:
- `status: migrated-stub`
- `owner_repo`
- `canonical_doc`
- `replaced_on`
- `remove_by_wave: 6`

### MB-06: Memory Bank move map and index creation plan

Primary output:
- a practical move map for `.memory-bank/**` and required target indexes.

Task:
- define which target indexes must exist before any branch moves:
  - root indexes
  - section hubs
  - second-level hubs where needed
- classify current source hubs into:
  - move mostly intact
  - split
  - retire
  - replace with transition stub
- define branch-by-branch move destinations across:
  - `spec/**`
  - `plans/**`
  - `scenarios/**`
  - `guides/**`
  - `mbb/**`
- sequence the documentation migration:
  1. create target root and section hubs
  2. move canonical MBB and establish mirrors
  3. move clear single-owner branches
  4. move plan/protocol/ADR families
  5. move guides
  6. create repo-local scenario hubs and move scenarios
  7. split mixed docs and retire source hubs

### Memory Bank execution order

This documentation workstream should execute in this order:

1. `MB-01` shared MBB/standards pack
2. `MB-02` `bot-platform` skeleton
3. `MB-03` `selleragent` skeleton
4. `MB-04` `docoved-agent` skeleton
5. `MB-06` move map and target index creation plan
6. `MB-05` current-source transition and stub strategy

Reason:
- target repo skeletons and MBB mirrors must exist before source-repo stubbing begins;
- the move map depends on stable target index packs;
- current-source transition should follow, not precede, the existence of destination docs.

## Unified protocol task register

This section is the execution backlog for `PRT-036`.

Rule:
- these tasks are planning/protocol tasks first;
- they must be closed in protocol/doc form before broad code movement starts;
- implementation wave work may begin only after the required prerequisite tasks for that wave are accepted.

### Decision-closure tasks

#### D-01: SellerAgent target repo identity

Goal:
- lock the long-term target repo identity for SellerAgent.

Output:
- one naming decision for:
  - `selleragent`
  - or retained `sales-agent`
- bootstrap location agreed in `_Projects`
- repo role statement aligned with this protocol

#### D-02: Dependency bridge strategy

Goal:
- choose the interim consumption model between `bot-platform` and product repos.

Output:
- one approved bridge strategy:
  - workspace-only during extraction;
  - private package registry;
  - git/subtree bridge;
  - or another repeatable mechanism
- decision constraints:
  - release friction
  - CI/CD complexity
  - rollback behavior
  - local developer workflow

#### D-03: Product boundary confirmations

Goal:
- close the remaining ambiguous product/framework calls before extraction design starts.

Output:
- explicit decisions for:
  - Docoved publication/knowledge surfaces
  - shared vs product-local operator surfaces
  - `ui-contract` ownership conditions
  - scenario/evidence framework vs product scenario suites

### Review-artifact tasks

#### R-036-01: Ownership matrix

Goal:
- create the canonical `path -> target_repo -> action` matrix for source inventory.

Must cover:
- `apps/**`
- `packages/**`
- `.memory-bank/**`
- root docs outside Memory Bank
- archive-only zones

#### R-036-02: Dependency bridge decision

Goal:
- document and approve how target repos consume `bot-platform` during migration.

Must cover:
- package publication or bridging mode
- versioning expectations
- local development flow
- CI implications
- rollback path

#### R-036-03: Repo skeleton pack

Goal:
- define minimum viable repo skeletons for:
  - `bot-platform`
  - `selleragent`
  - `docoved-agent`

Must cover:
- root structure
- baseline README
- Memory Bank skeleton
- minimal app/package placeholders
- ownership statement

#### R-036-04: Memory Bank split map

Goal:
- classify current `.memory-bank/**` into:
  - platform truth
  - seller truth
  - docoved truth
  - migration/archive only

#### R-036-05: Ops split plan

Goal:
- define hosted/runtime separation across target repos.

Must cover:
- Vercel project mapping
- domains and aliases
- environment variables and secrets
- Supabase/project ownership
- deploy/cutover/reconnect order

#### R-036-06: Archive and history policy

Goal:
- define how legacy and non-active materials are retained without blocking the split.

Must cover:
- history-preserving move method
- archive-only rules
- root-doc inventory
- generated/binary/demo handling
- `.tasks/` retention policy

### Memory Bank redesign tasks

These tasks are mandatory Wave 1 sub-workstreams and are detailed in the section above:
- `MB-01` Shared MBB and standards pack
- `MB-02` `bot-platform` Memory Bank skeleton
- `MB-03` `selleragent` Memory Bank skeleton
- `MB-04` `docoved-agent` Memory Bank skeleton
- `MB-05` current `sales-agent` Memory Bank transition
- `MB-06` Memory Bank move map and index creation plan

Execution note:
- `MB-01..MB-06` close the documentation topology before repo-local SSOT migration begins.

### Contract-boundary tasks

These tasks convert the repo split from a topology plan into a contract-safe migration program.
They must close before broad mixed-package extraction starts.

#### CB-01: Runtime and domain boundary contracts

Goal:
- define the normative split between framework runtime kernel and product domain/runtime truth.

Must cover:
- `packages/core` runtime kernel
- conversation kernel vs product orchestration
- SellerAgent runtime domains
- Docoved grounded-answering runtime
- mixed seam inventory inside `packages/core`

#### CB-02: API and SDK namespace contracts

Goal:
- define the target namespace ownership and package layering for `api-contract` and `client-sdk`.

Must cover:
- framework namespaces
- SellerAgent namespaces
- Docoved namespaces
- operation envelopes
- SDK base transport vs product SDK layers

#### CB-03: Auth, users, roles, and command contracts

Goal:
- separate framework auth/users/command vocabulary from product-local authority and command policy.

Must cover:
- principal/session/invite/membership/token classes
- access decision semantics
- Telegram command parser/registry/projection hooks
- product-local role/capability policy
- product-local command surfaces

#### CB-04: Workflow host and callback contracts

Goal:
- separate workflow framework contracts from product workflow families and callback implementations.

Must cover:
- host routes
- start contract
- callback contract
- health/manifest contract
- S2S auth contract
- product workflow family registries

#### CB-05: Persistence, store, and schema contracts

Goal:
- define framework-facing persistence interfaces and product-local concrete store ownership.

Must cover:
- persistence interface limits
- product-local stores and tables
- migration ownership split
- trace/workflow correlation vocabulary
- risky mixed store inventory

#### CB-06: Contract-doc writing pack

Goal:
- define the concrete Memory Bank document set needed to support the split safely.

Must cover:
- doc title/path
- owner repo
- doc type
- purpose
- dependencies
- priority and writing order

### Mixed-package extraction design tasks

These tasks remain planning/design tasks until ownership, bridge, and Memory Bank prerequisites are closed.

#### X-01: `packages/core` extraction seam map

Goal:
- separate framework kernel/runtime surfaces from SellerAgent and Docoved business truth.

#### X-02: `packages/api-contract` split design

Goal:
- define framework contracts vs product contracts and target package layout.

#### X-03: `packages/client-sdk` split design

Goal:
- define framework SDK surface vs product SDK clients.

#### X-04: `packages/db` ownership split

Goal:
- define product-local persistence boundaries and any framework-facing interfaces without creating a shared product DB.

#### X-05: `apps/server` composition-root split

Goal:
- define separate SellerAgent and Docoved server roots and framework bootstrap seams.

#### X-06: `apps/workflow` host split

Goal:
- define workflow framework vs product workflow hosts/deployments.

#### X-07: `packages/scenario-runner` split

Goal:
- separate generic scenario/evidence tooling from product scenario suites.

#### X-08: `packages/shared` shrink-and-retire plan

Goal:
- eliminate `shared` as a mixed dumping ground by extracting generic utilities or relocating product code to owning repos.

### Execution dependency order

Planning dependencies:
1. `D-01..D-03`
2. `R-036-01..R-036-06`
3. `MB-01..MB-06`
4. `CB-01..CB-06`
5. `X-01..X-08`
6. migration wave implementation planning

Implementation gating rule:
- do not start broad source moves for mixed packages until the corresponding `CB-*` contract tasks and `X-*` design tasks are accepted and their repo/document owners are already established.

## Migration waves

### Wave 0: Historical-tail isolation

Goal:
- remove dead-code ownership ambiguity before major extraction.

Includes:
- archive legacy SellerAgent Python into git history;
- remove it from active mainline;
- identify non-Memory-Bank docs and decide:
  - SellerAgent-owned;
  - Docoved-owned;
  - platform-owned;
  - archive-only.

Status note:
- the legacy SellerAgent Python archival/removal step is already executed in git history.

### Wave 1: Ownership matrix and repo skeletons

Goal:
- turn this protocol into explicit repo-local placeholders.

Deliverables:
- `path -> target repo -> action` matrix;
- initial `README` and `.memory-bank` skeleton in `bot-platform`;
- initial `.memory-bank` skeleton in `docoved-agent`;
- initial `.memory-bank` skeleton in the SellerAgent target repo;
- first repo-local spec and feature stubs derived from this protocol.

Required sub-workstreams:
- Memory Bank redesign task program `MB-01..MB-06`;
- MBB mirror/bootstrap policy;
- source-repo transition/stub plan for the current mixed Memory Bank.

Progress snapshot:
- target `.memory-bank` skeletons are now physically bootstrapped in:
  - `bot-platform`
  - `selleragent`
  - `docoved-agent`
- canonical/mirrored `mbb/**` packs have been landed in those target repos;
- root and section hubs now exist for `spec`, `plans`, `guides`, and repo-local scenario navigation;
- first substantive docs are now landed in target repos:
  - framework/product boundary baselines
  - target repo-structure docs
  - repo-local current-status reports
  - repo-local verification matrices
- this closes the "target repo Memory Bank does not yet exist" blocker and shifts Wave 1 focus toward feature/epic/scenario population and source-repo transition routing.

### Wave 2: Extract `bot-platform` framework core

Goal:
- move reusable framework code out of the mixed source repo first.

Expected outcome:
- framework packages compile without product data ownership;
- product repos can consume framework code without inheriting each other's business domains.

### Wave 3: Land SellerAgent product repo

Goal:
- establish SellerAgent as an independently deployable monorepo.

Expected outcome:
- SellerAgent web app, server, workflows, and DB own one repo and one deployment chain;
- SellerAgent Memory Bank becomes product SSoT.

### Wave 4: Land Docoved product repo

Goal:
- establish Docoved as an independently deployable monorepo.

Expected outcome:
- Docoved runtime, ingest/publication, workflows, and operators own one repo and one deployment chain;
- Docoved Memory Bank becomes product SSoT.

### Wave 5: CI/CD and deploy separation

Goal:
- remove multi-product release coupling from one source repo.

Expected outcome:
- separate Vercel project configuration per product;
- separate environment variables and secrets per repo;
- simpler release management without repo-level deployment gymnastics.

### Wave 6: Mixed-source retirement

Goal:
- retire the current mixed-repo role once all three target repos have minimal parity and documentation coverage.

Expected outcome:
- no active product development depends on the old mixed layout;
- residual source either migrates, archives, or is intentionally deleted.

## Acceptance gates

- A target repo is not considered established until it has:
  - a runnable minimal contour;
  - a committed `.memory-bank/index.md`;
  - at least one repo-local architecture/spec boundary doc;
  - a documented deployment/readme baseline.
- A framework package is not considered extracted until:
  - it no longer imports product-local domain truth;
  - its public contract is documented in `bot-platform`;
  - at least one consuming product repo can build against it.
- A source path is not considered fully migrated until:
  - the owning target repo is explicit;
  - the old path is either removed or marked transitional with a planned deletion step.

## Outcome

- Result: `follow_up_needed`
- Follow-up needed:
  - create the path ownership matrix;
  - create repo-local Memory Bank skeletons;
  - perform package-by-package extraction planning for `api-contract`, `client-sdk`, `core`, `db`, and `scenario-runner`;
  - choose the final SellerAgent target repo naming and package-consumption strategy.

## Memory Bank impact

- Added a durable cross-epic protocol for the three-repo split strategy.
- Established the canonical decision that `bot-platform` is a framework repo rather than a shared live product instance.
- Established the rule that auth/users and workflow are framework-defined but product-bound in concrete data and deployment.
- Recorded the requirement that future product truth must move into repo-local Memory Banks rather than remaining mixed in this source repo.
