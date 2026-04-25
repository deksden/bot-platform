---
file: .memory-bank/plans/protocols/PRT-042-channel-runtime-canonical-document-command-and-rendering.md
description: Framework protocol for extracting the first typed channel-runtime contract shared by SellerAgent, Docoved, and future product adapters.
purpose: Define the first cross-repo contract for canonical response documents and minimal channel rendering primitives so product channels do not drift semantically across Telegram, email, web, or future transports.
version: 1.5.0
date: 2026-04-25
status: ACTIVE
epic: EP-022
tags: [protocol, channel-runtime, contracts, rendering, docoved, selleragent]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
  - .memory-bank/plans/protocols/PRT-041-cross-repo-contract-dependency-boundary-realignment.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/three-layer-product-line-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/index.md
  - .memory-bank/spec/runtime/channel-runtime-contract.md
  - .memory-bank/spec/runtime/command-framework-contract.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/engineering/coding-style.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/spec/operations/git-flow.md
  - .memory-bank/spec/operations/deployment-architecture.md
  - .memory-bank/spec/operations/runbook.md
  - .memory-bank/spec/operations/hosted-beta-acceptance-contract.md
  - .memory-bank/spec/operations/private-registry-package-bridge.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/mbb/principles.md
  - .memory-bank/mbb/delivery-docs-guide.md
  - .memory-bank/mbb/indexing-guide.md
  - .memory-bank/mbb/templates/feature.md
  - .memory-bank/mbb/templates/protocol.md
  - .tasks/prt-042-channel-runtime-implementation-plan/index.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/operations/docoved-channel-adapter-contract.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-answer-artifact-contract.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/plans/protocols/PRT-038-docoved-shared-platform-adoption-control-plane-and-workflow-backed-knowledge-import.md
  - /Users/deksden/Documents/_Projects/sales-agent/.memory-bank/plans/protocols/PRT-026-docoved-workspace-control-plane-channel-access-and-locator-fidelity.md
history:
  - version: 1.5.0
    date: 2026-04-25
    changes: Added phase-3 operations planning: git-flow/worktree rules, CI/Vercel deployment gates, hosted beta scenario policy, backup/migration constraints, quality checks, and lessons/insights capture requirements for subagents.
  - version: 1.4.0
    date: 2026-04-25
    changes: Added the phase-2 implementation protocol: subagent workspace, task-file discipline, dependency graph, verification-by-subagent rules, testing/staging gates, and task packet pointers.
  - version: 1.3.0
    date: 2026-04-25
    changes: Added deferred-work rationale so postponed command, delivery, threading, HTML, DB, and UI work has explicit future purpose, target state, and start triggers.
  - version: 1.2.0
    date: 2026-04-25
    changes: Added explicit documentation-remediation decisions after review: framework runtime contract stub, MBB routing anchors, deferred-command wording, and required product index/update obligations.
  - version: 1.1.0
    date: 2026-04-25
    changes: Hardened the protocol after focused review: narrowed first-wave scope to canonical document and pure rendering helpers, deferred command/delivery orchestration, added reuse, reliability, observability, no-DB/no-UI, verification, release, and Memory Bank routing rules.
  - version: 1.0.0
    date: 2026-04-25
    changes: Opened the cross-repo channel-runtime protocol and defined the typed package, document, renderer, adapter, command, access-policy, migration, and verification boundaries for the first implementation wave.
---

# Protocol: Channel Runtime Canonical Response Document And Rendering

## Why this protocol exists

The platform now has more than one product and more than one live communication channel.

The current implementation has a clear design smell:
- Docoved core can produce a grounded answer artifact;
- Telegram and email both need to deliver the same answer semantics;
- command access and command catalogs are conceptually shared;
- formatting is transport-specific;
- but parts of the code still use channel-specific names for generic behavior, especially `telegram-*` command and markdown helpers.

That creates semantic drift:
- Telegram can expose commands that email does not expose;
- email can format answers differently from Telegram;
- channel code can accidentally decide product semantics instead of only rendering and delivering;
- product repos can copy helpers instead of depending on a shared typed contract.

This protocol opens the next framework-owned extraction wave: a typed channel-runtime contract that products can adopt without moving product truth into the framework repo.

The protocol deliberately keeps command runtime and outbound delivery orchestration as later work. They are documented here only to preserve architectural direction and prevent the first implementation from creating a second command framework or a premature transport layer.

## Core decision

Shared channel mechanics belong in `bot-platform`.

Product-specific answer artifacts, knowledge-source semantics, hosted provider runbooks, concrete adapters, provider secrets, and product DB stores remain in product repos.

Therefore:
- `bot-platform` owns the generic execution-time contract for canonical response documents, minimal rendering vocabulary, visibility rules, citations/source refs, and import-boundary verification;
- Docoved owns mapping from `DocovedAnswerArtifact` to the shared canonical document model;
- SellerAgent owns mapping from SellerAgent conversation/assist artifacts to the shared canonical document model;
- concrete hosted Telegram/email/web adapters stay in product apps until a later protocol proves that implementation can be extracted without product leakage.

`CanonicalResponseDocument` is a runtime delivery contract. It is not a persisted product artifact and not a replacement for product source-of-truth records.

## First-wave scope

The first wave is intentionally small.

In scope:
- canonical response-document types;
- public/operator/debug visibility model;
- citations and source references;
- stable response/run/trace reference slots;
- minimal channel render target vocabulary;
- pure markdown/plaintext helpers where immediately useful;
- deterministic fixtures and import-boundary proofs;
- Memory Bank routing for product adoption.

Out of scope for first wave:
- full command runtime extraction;
- transport senders;
- outbound delivery orchestration;
- threading abstractions as framework-owned objects;
- framework-owned HTML rendering in first wave;
- framework-owned DB tables, migrations, read models, or persistent delivery records;
- framework-owned UI/app-shell/admin screens.

This wave should prove the semantic seam before adding a broader command or delivery layer.

## Deferred work rationale

Deferred work is not rejected work.

It is intentionally postponed until the canonical response-document seam has a real product proof. The goal is to avoid building abstractions from guesses while preserving the direction toward one shared channel runtime model.

| Deferred area | Why it exists in the target architecture | Why it is not first-wave work | Start trigger |
| --- | --- | --- | --- |
| Command runtime extraction | Give Telegram, email, web, and future channels one command vocabulary, exposure policy, and result shape instead of channel-named command helpers. | Existing command-framework primitives already exist and must not be duplicated; channel command needs must first be reconciled with that contract. | Docoved proves canonical document rendering and a concrete email/Telegram command-parity gap remains. |
| Outbound delivery orchestration | Represent send attempts, retries, delivery lifecycle, and provider handoff consistently across channels. | First wave has no shared sender and no shared persistence; product adapters already own provider side effects. | At least two product/channel adapters show duplicated retry/lifecycle code that can be extracted without provider or product leakage. |
| Threading abstractions | Normalize reply/thread intent across email `Re:` chains, Telegram replies, web conversation refs, and future transports. | Threading has provider-specific rules and can accidentally drag transport payload semantics into the framework. | Product adapters expose repeated provider-neutral threading intent that cannot stay cleanly local. |
| Framework-owned HTML rendering | Allow products to share safe HTML projection from the same canonical markdown document. | Current shared value is unproven; HTML sanitization and email/web rendering constraints can over-specialize the framework. | A second product or second channel needs the same pure HTML renderer and can prove no provider-specific behavior leaks into it. |
| Universal renderer abstractions | Let channels plug into a common render interface when render policies and message parts become genuinely shared. | `ChannelRenderer`, `ChannelRenderPolicy`, and `RenderedChannelMessage` would be speculative before adapters prove repeated shape. | Two adapters implement equivalent local renderer contracts and the extraction removes real duplication. |
| DB/read-model/delivery records | Enable durable delivery audit, replay, diagnostics, or operator inspection if delivery state becomes shared infrastructure. | The canonical document is not persistence; first wave must not introduce migrations or shared product state. | A product has a proven delivery audit/replay need that cannot be satisfied by product-local storage and has a safe migration plan. |
| UI/admin surfaces | Expose diagnostics, delivery inspection, or command/channel configuration when those become shared operator workflows. | No framework-owned screen is needed to prove the channel document contract; UI would require its own route, selector, and scenario docs. | A real operator workflow requires shared framework UI and has product-local alternatives ruled out. |

Target state:
- core/product runtime produces a canonical response document;
- channel adapters render and deliver provider-specific payloads without changing answer/source semantics;
- command results can later use the same document envelope;
- command exposure and capability checks converge on existing framework command/access vocabulary;
- delivery orchestration is extracted only after duplicated product adapter behavior proves the seam.

## Implementation protocol

Стадия проработки плана: фаза 2 выполнена.

Стадия проработки плана: фаза 3 выполнена.

This means:
- first-wave scope is narrowed;
- deferred work has explicit rationale and start triggers;
- implementation slices are decomposed into non-overlapping subagent tasks;
- verifier tasks are planned separately from executor tasks;
- local/beta verification contours are defined before code execution starts.
- operations/runbook, git-flow, CI, hosted deployment, and lessons-learned rules are explicit before execution starts.

### Implementation workspace

Use one protocol task folder in `bot-platform`:

- `.tasks/prt-042-channel-runtime-implementation-plan/`

Required folder shape:
- `index.md` — implementation packet index, phase state, task graph, and orchestration notes;
- `inventory/` — read-only framework/product inventory reports and package placement evidence;
- `tasks/` — self-contained subagent task files;
- `reports/` — executor and verifier reports written by subagents;
- `verification/` — command outputs, import-boundary proof notes, pack/publish dry-run notes, and hosted evidence links;
- `lessons/` — numbered lessons that should later be promoted into Memory Bank docs;
- `summary/` — final integrated implementation synthesis.

Do not start implementation from chat history alone. Every executor and verifier subagent must receive a task file from this folder and must write its report back into this folder.

### Subagent orchestration rules

The implementation uses bounded subagent work, not free-form parallel editing.

Rules:
- create a fresh subagent for each new task unless an intentional follow-up needs the same context;
- close subagents after their report is accepted unless a follow-up is explicitly planned;
- run independent tasks in parallel only when their write scopes are disjoint;
- do not let two workers edit the same package, doc, or product repo slice at the same time;
- every worker must be told that other workers may exist and must not revert or overwrite work outside its write scope;
- every worker task must include exact report path under `.tasks/prt-042-channel-runtime-implementation-plan/reports/`;
- every verifier must read the original task file, the executor report, and the actual changed files before accepting the result;
- the orchestrator integrates accepted findings into Memory Bank and final synthesis rather than treating raw reports as canonical truth.

Preferred model selection:
- use a stronger coding model for implementation slices that create package/code/test surfaces;
- use a smaller/faster model for read-only inventory or documentation review when the task is bounded;
- use a fresh verifier subagent for each completed executor slice when verification can run in parallel with other non-overlapping work.

### Subagent task-file template

Each task file must be self-contained and follow the same discipline as MBB feature/protocol docs.

Required sections:
- `Context to read` — exact Memory Bank docs, package manifests, code paths, and prior reports to inspect before editing;
- `Goal` — one bounded outcome in plain terms;
- `Why this task exists` — architectural reason and relation to the target state;
- `Write scope` — exact repo, packages, files, or doc families the agent may change;
- `Do not touch` — files, repos, packages, provider config, DB, UI, or behavior outside the slice;
- `Required research` — codebase/documentation searches to run before implementation;
- `Implementation rules` — ownership decisions, compatibility rules, logging/error rules, and documentation standards;
- `Thin spots and risks` — known ambiguity, race, rollback, package graph, publish, or hosted-verification risks;
- `Verification gates` — local commands, fixture expectations, import-boundary checks, and when beta/staging proof is required;
- `Definition of done` — concrete acceptance checklist for the task;
- `Report format` — report path, changed files, checks run, skipped checks with rationale, risks, and follow-up recommendations.

Required standards to cite in task files:
- [Channel runtime contract](../../spec/runtime/channel-runtime-contract.md);
- [Command framework contract](../../spec/runtime/command-framework-contract.md) when commands are mentioned;
- [Coding style](../../spec/engineering/coding-style.md);
- [Delivery standards](../../spec/engineering/delivery-standards.md);
- [Git flow](../../spec/operations/git-flow.md);
- [Deployment architecture](../../spec/operations/deployment-architecture.md);
- [Operations runbook](../../spec/operations/runbook.md);
- [Hosted beta acceptance contract](../../spec/operations/hosted-beta-acceptance-contract.md);
- [Hosted beta execution model](../../spec/scenarios/hosted-beta-execution-model.md);
- [MBB principles](../../mbb/principles.md);
- [Delivery docs guide](../../mbb/delivery-docs-guide.md);
- [Indexing guide](../../mbb/indexing-guide.md);
- [Feature template](../../mbb/templates/feature.md);
- [Protocol template](../../mbb/templates/protocol.md).

### Implementation task graph

| Task | Type | Primary write scope | Depends on | Parallelism | Output |
| --- | --- | --- | --- | --- | --- |
| `T-042-00` framework inventory and placement | read-only/research | `.tasks/.../inventory/**` | none | can run first alone | package/module decision evidence |
| `T-042-01` framework contract package/module | implementation | `packages/channel-runtime/**` or chosen existing package, root build graph | `T-042-00` | not parallel with framework verifier | exported types/helpers/fixtures |
| `T-042-02` framework docs and Memory Bank routing | docs | `bot-platform/.memory-bank/**` only | `T-042-00` | can run after placement; avoid overlap with protocol edits | spec/index/protocol routing updates |
| `T-042-03` framework verification and publish readiness | verification | `.tasks/.../verification/**`, publish allowlist only if package exists | `T-042-01`, `T-042-02` | can run while product adoption planning starts | check/build/import-boundary/pack evidence |
| `T-042-04` Docoved adoption packet | product implementation/docs | `docoved-agent` mapping/docs/tests only | `T-042-01`, `T-042-02` | not parallel with Docoved verifier | mapping proof and channel adapter plan/code |
| `T-042-05` SellerAgent adoption readiness | product research/docs | `seller-agent` docs/research only | `T-042-01`, `T-042-02` | parallel with Docoved adoption if write scopes differ | adoption blocker/plan, no conflicting truth |
| `V-042-01` framework verifier | verifier | `.tasks/.../reports/**`, `.tasks/.../verification/**` | `T-042-01..03` | parallel with product work | accepted/rejected framework result |
| `V-042-02` Docoved verifier | verifier | `.tasks/.../reports/**`, `.tasks/.../verification/**` | `T-042-04` | after Docoved executor | accepted/rejected product result |
| `V-042-03` final synthesis | integration | `.tasks/.../summary/**`, protocol/MB docs if needed | all accepted verifiers | final | integrated report and closure checklist |

Dependency rules:
- `T-042-00` blocks any code movement because package placement and vocabulary reuse must be known first.
- `T-042-01` must not add command runtime, delivery orchestration, DB, UI, or provider SDK imports.
- `T-042-02` may proceed after `T-042-00`, but must not document behavior that `T-042-01` does not implement.
- `T-042-03` cannot start dist-based or pack-based verification until producing build has completed.
- product adoption tasks must not start from unpublished assumptions; they need either workspace link, local tarball, or documented package availability.

### Testing and scenario contour

Framework local gates:
- `pnpm typecheck`;
- `pnpm check`;
- public export import smoke for the new package/module;
- deterministic visibility fixture for public/operator/debug content;
- deterministic markdown/plaintext helper fixture if the helper is implemented;
- import-boundary proof that no product, DB, or provider SDK imports enter the framework package;
- `pnpm changeset:status` and pack/publish dry-run if a publishable package is created.

Docoved local gates:
- product typecheck/check commands from `docoved-agent`;
- mapping fixture: `DocovedAnswerArtifact` -> `CanonicalResponseDocument`;
- rendering fixture proving the same canonical document feeds email and Telegram render paths without answer/source semantic drift;
- command behavior is unchanged unless a later command-adoption task explicitly changes it.

Beta/staging gates:
- beta Telegram proof is required when Telegram adapter behavior changes;
- beta email proof is required when email adapter behavior changes;
- email threading proof must verify `ask@beta-mail.docoved.pro` receives and answers as `Re:` when the email adapter is touched;
- hosted proof must record environment, commit/deploy id, command/scenario used, result, and any skipped checks with rationale.

Not required in first wave:
- production rollout;
- DB migration verification;
- UI/browser POM proof;
- command parity proof, unless phase 5 is explicitly opened after document/rendering seam proof.

### Operations and DevOps plan

This protocol follows the project operations stack:
- [Git flow](../../spec/operations/git-flow.md);
- [Deployment architecture](../../spec/operations/deployment-architecture.md);
- [Operations runbook](../../spec/operations/runbook.md);
- [Hosted beta acceptance contract](../../spec/operations/hosted-beta-acceptance-contract.md);
- [Private registry package bridge](../../spec/operations/private-registry-package-bridge.md);
- [Delivery standards](../../spec/engineering/delivery-standards.md).

#### Branch and worktree rules

Default rule:
- implementation branches are `feature/*` branches from `develop`;
- protected `main` and `develop` do not receive direct pushes;
- merges into protected branches use PRs and the default merge-commit path;
- parallel implementation waves use separate `git worktree` directories.

Current repo caveat:
- this checkout is currently on `feature/EP-022-prt-038-wave1`;
- local branch list currently shows no active `develop` branch;
- if `develop` is still not materially activated when implementation starts, the executor must record the git-flow exception in the task report and branch from the current stable baseline instead of pretending a `develop -> beta` promotion happened.

Recommended implementation branch:
- `feature/EP-022-channel-runtime-canonical-document`

Recommended worktree:
- `bot-platform-ep022-channel-runtime`

Commit discipline:
- commit after coherent slices, not after every tiny edit;
- each commit should map to a task or verifier slice where practical;
- do not leave uncommitted local changes or unpushed commits after a closure stage;
- before handoff, record `git status --short`, branch name, latest commit SHA, and push/PR state in the relevant report.

#### Push, CI, and hosted build policy

Do not push only to "see what happens".

Push is appropriate when:
- a coherent local slice has passed its local gates and needs PR/CI evidence;
- a package publish-readiness or release workflow check must run;
- a hosted beta scenario requires a deployed revision;
- a verifier needs remote CI/deployment evidence to close a slice.

Push is not appropriate when:
- only documentation or local planning changed and no remote evidence is required yet;
- local typecheck/build/import-boundary gates are failing;
- the task does not yet have a documented target environment or scenario reason.

When a push triggers GitHub CI or Vercel:
- GitHub checks must be monitored to final `success` or documented failure with fix/follow-up;
- Vercel builds must be monitored to final `Ready` or documented failure with fix/follow-up;
- failed CI/Vercel checks that belong to the changed slice must be fixed before closure;
- unrelated infrastructure failures must be documented with evidence and owner/follow-up.

Framework package-only changes normally require GitHub/package CI evidence, not Vercel hosted deployment evidence.

Vercel or product-hosted deployment evidence is required only when:
- a hosted runtime/channel adapter behavior changed;
- a beta scenario must prove the behavior in the real lane;
- product adoption replaces a package/version consumed by a deployed product surface;
- a verifier explicitly requires hosted lane truth.

#### Deployment and hosted scenario policy

Hosted deployment is a means to run required hosted scenarios, not a default side effect of every push.

Before any hosted beta proof:
1. confirm target lane is `beta`, not preview;
2. confirm deployment pair/group integrity for all required surfaces;
3. confirm runtime identity and deployment metadata match the intended commit/ref;
4. confirm auth/session/bootstrap path where protected surfaces are involved;
5. confirm external readiness for Telegram/email providers when channel behavior is under test;
6. archive environment, deployment id/URL, commit SHA, scenario command/manual steps, and verdict.

Scenario/deployment expectations for first wave:
- framework contract/package work: local typecheck/build/import-boundary/import-smoke; no hosted deploy by default;
- Docoved mapping-only work: local mapping/rendering fixture; no hosted deploy unless adapters or package consumption in deployed runtime changed;
- Docoved Telegram adapter behavior change: beta Telegram proof on the real beta lane;
- Docoved email adapter behavior change: beta email proof on the real beta lane, including `ask@beta-mail.docoved.pro` responding as `Re:` in the same thread;
- SellerAgent readiness-only work: read-only/docs, no hosted deploy by default.

Preview deployments:
- may support PR smoke when web/server surfaces change;
- never count as beta acceptance unless the exception is explicitly documented with missing-beta constraints and environment identity proof.

Production:
- no production rollout is planned in first wave;
- production promotion can only be considered after beta acceptance is green and a separate production rollout decision follows the production runbook.

#### Backups, migrations, and data safety

First wave has no framework-owned DB tables, migrations, read models, or persistent delivery records.

Therefore:
- no backup/migration action is expected for framework first-wave work;
- any task that discovers a need for DB/storage/schema changes must stop and record a blocker;
- DB/storage/schema work requires a separate product-local or framework protocol update with backup, migration, rollback, RLS/grants, and hosted verification plan before implementation.

If a future phase introduces persistence:
- capture fresh governed backup evidence before risky rollout;
- use additive/backward-compatible migrations first;
- verify affected read/write paths in target lane before promotion;
- document rollback-safe handoff inputs.

#### Local quality gates and fix policy

Every code slice plans:
- local typecheck/build for touched repo;
- targeted fixture/unit/integration checks if test infrastructure exists;
- import-boundary proof for framework package work;
- markdown link and `git diff --check` for docs work;
- package pack/dry-run checks when a publishable package changes.

If checks fail:
- fix defects in the same slice when they are caused by the slice;
- do not fix unrelated failures unless the task is explicitly expanded;
- document unrelated failures with command output, suspected owner, and follow-up;
- rerun the narrowest failed gate before broader gates.

### Lessons learned and insights

Every executor and verifier must capture durable lessons, not narrative logs.

Record a lesson when implementation, research, verification, or documentation reveals:
- behavior required by code but missing from Memory Bank;
- documentation that is wrong, stale, or too vague;
- hidden operational constraint discovered through scripts, CI, Vercel, package publication, provider behavior, or product repo topology;
- unexpected failure mode or recovery pattern that future agents should know;
- reusable design insight that should influence future channel-runtime, command, delivery, or product-adoption work.

Do not record:
- step-by-step diary entries;
- raw command transcripts without a distilled lesson;
- opinions without actionable future value;
- findings already clearly documented in the owning Memory Bank doc.

File rules:
- write lessons as `.tasks/prt-042-channel-runtime-implementation-plan/lessons/NNN-lessons-learned.md`;
- write insights as `.tasks/prt-042-channel-runtime-implementation-plan/lessons/NNN-insights.md`;
- use zero-padded sequential numbers starting at `001`;
- each file must include frontmatter, context, observed fact, why it matters, future rule/recommendation, and proposed MBB destination.

Subagent instruction requirement:
- every subagent task file must tell the worker to create lessons/insights files when such findings appear;
- every subagent report must state whether lessons/insights were created or why none were needed;
- the final synthesis must review all lessons/insights and route accepted items into the proper Memory Bank section according to MBB ownership rules.

End-of-stage rule:
- accepted durable lessons must be promoted into the owning Memory Bank docs before the stage is considered fully closed, or explicitly deferred with destination, owner, and reason.

## Target package

Preferred target:

`packages/channel-runtime`

Published as:

`@dd-bot-platform/channel-runtime`

This package is justified only if it stays narrow and is adopted by at least one real product in the same protocol line. It must not become a mini-platform that duplicates `@dd-bot-platform/core` or `@dd-bot-platform/api-contract`.

If implementation inventory shows that the same result is better achieved by extending an existing package, this protocol allows that adjustment before code starts. The decision must be recorded in the framework docs before product adoption begins.

## Reuse existing framework vocabulary

The first implementation must inventory existing framework packages before adding new public names.

Rules:
- if a channel kind, execution ref, trace ref, capability family, result envelope, or pipeline-binding concept already exists in `@dd-bot-platform/core` or `@dd-bot-platform/api-contract`, `channel-runtime` must import, re-export, or reference it rather than defining a parallel vocabulary;
- new names are allowed only where the concept is genuinely channel-runtime-specific;
- command-related names must align with `spec/runtime/command-framework-contract.md`;
- pipeline and binding terms must align with `spec/runtime/pipeline-registry-and-binding-contract.md`;
- no code in the package may import from `docoved-agent`, `seller-agent`, or `sales-agent`.

The goal is one shared language, not another layer of synonyms.

## Package contents

The first package version should expose types and small pure helpers only.

### Canonical response document

First-wave type families:
- `CanonicalResponseDocument`
- `CanonicalResponseSection`
- `CanonicalResponseBlock`
- `CanonicalCitation`
- `CanonicalSourceRef`
- `CanonicalResponseMetadata`
- `CanonicalResponseVisibility`
- `CanonicalResponseArtifactRef`

The document model must support:
- public answer content;
- citations and source references;
- operator-only metadata;
- debug-only artifact references;
- bounded timings and usage summaries;
- stable `responseId` / `runId` / `traceId` slots when available;
- namespaced product extension data, preferably under `extensions: Record<string, unknown>`.

The document model must not encode:
- Docoved-only fields such as `source_table` as first-class framework names;
- SellerAgent-only fields such as deal/cart/customer memory as first-class framework names;
- provider-specific transport payloads such as Telegram `parse_mode` or email headers;
- framework-owned persistence semantics for response or delivery records.

### Minimal rendering contract

First-wave rendering vocabulary should stay small:
- `ChannelRenderTarget`
- `ChannelRenderedFormat`
- optional message-part type only if needed by the first product proof

The first wave may include pure helpers:
- `renderChannelMarkdownToPlainText`
- `splitRenderedMessageParts` if a first consumer needs deterministic chunking

The first wave should not require:
- a full `ChannelRenderer` abstraction;
- `ChannelRenderPolicy`;
- `RenderedChannelMessage`;
- `OutboundDeliveryPlan`;
- `OutboundDeliveryThreading`;
- framework-owned HTML renderer.

Those can be added later if product adoption proves they remove real duplication.

Rendering helpers must be deterministic and side-effect free. Product adapters remain responsible for actual Telegram/email/web payloads, provider-specific formatting, send attempts, retries, and transport errors.

### Markdown subset

The shared markdown subset should cover only the already-used authoring surface:
- paragraphs;
- headings up to level 3;
- unordered lists;
- ordered lists;
- bold spans;
- inline code;
- fenced code blocks.

The subset is a compatibility contract. It is not a full CommonMark implementation.

### Deferred command adoption

Commands are not first-wave implementation scope for `channel-runtime`.

This protocol keeps the command direction explicit:
- command results should eventually be represented as canonical response documents;
- command exposure should eventually be governed by the same product/channel capability policy across Telegram, email, and web;
- command handlers remain product-owned.

However, command vocabulary and dispatch rules must be reconciled with [Command framework contract](../../spec/runtime/command-framework-contract.md) before new `ChannelCommand*` public types are added.

Do not create a second command framework in `channel-runtime`.

### Access and capabilities

First-wave access work is limited to visibility rules on canonical documents.

Actor resolution remains product/app-owned:
- Telegram may resolve an actor through verified Telegram bindings;
- email may resolve an actor through sender email;
- web may resolve an actor through web/operator auth;
- anonymous customer channels may resolve only public-safe visibility.

Capability names for future channel commands must reuse or extend existing framework capability families. They must not replace product membership stores or control-plane access checks.

## Reliability and observability

The first package should avoid side effects, but the contract must still make failures diagnosable.

Rules:
- pure helpers may either return typed result envelopes or throw deterministic validation errors; the chosen style must be documented in `spec/runtime/channel-runtime-contract.md`;
- product adapters own transport/provider failures and must record structured failure events before bubbling errors;
- framework vocabulary should distinguish framework, product, adapter, transport, validation, conflict, retryable, and terminal failures where those failures cross the package boundary;
- correlation fields should be available where applicable: `responseId`, `runId`, `traceId`, `channelRef`, `commandId`, `attemptId`, `deliveryId`, and `transportMessageRef`;
- raw transport payloads, secrets, full answer bodies, and provider credentials must not be logged by generic helpers;
- provider-specific observability tooling such as Sentry, Resend, Telegram, or Vercel hooks stays product-local.

Retry ownership must be explicit in product adapters. Runtime retries, adapter retries, and provider retries must not stack implicitly for the same failure class.

The normative first-wave contract surface is [Channel runtime contract](../../spec/runtime/channel-runtime-contract.md). This protocol owns the delivery plan; the runtime spec owns the stable vocabulary that code and product adoption docs must cite.

## Product adoption model

### Docoved adoption

Docoved should add a product-local adoption protocol after this upstream protocol exists.

Docoved mapping:
- `DocovedAnswerArtifact` -> `CanonicalResponseDocument`;
- `answer_text` -> public markdown answer section;
- `source_table` -> canonical citations/source refs;
- `verification_summary` -> operator/public summary according to policy;
- execution trace and search report refs -> operator/debug artifact refs;
- `knowledgeSourceRef` and snapshot refs -> metadata or namespaced extensions.

Docoved channel adapters:
- email adapter renders the shared document to current email text/html behavior and handles `Re:`, `Message-ID`, `In-Reply-To`, and `References`;
- Telegram adapter renders the same document to current Telegram-safe output and handles reply parameters;
- neither adapter should decide answer/source semantics.

Docoved must keep product truth local:
- document-grounded answering semantics;
- source selection rules;
- verification rules;
- knowledge-source binding and active snapshot behavior;
- hosted beta/prod runbooks and provider secrets.

### SellerAgent adoption

SellerAgent should adopt the same contract for conversation and assist surfaces after Docoved proves the first consumer path or in a coordinated second product proof.

SellerAgent mapping:
- conversation/assist answer output -> `CanonicalResponseDocument`;
- customer-safe text -> public sections;
- internal decision traces -> operator/debug artifact refs;
- commerce/customer/deal metadata -> product namespaced extensions.

SellerAgent command surfaces should migrate later from product-local or Telegram-shaped command helpers to the shared command-framework vocabulary, while keeping SellerAgent-specific command handlers product-owned.

### Sales-agent mixed repo

`sales-agent` remains a mixed-repo tracker and historical source.

It must not become the canonical owner of the new contract.

Any surviving code in `sales-agent` may be used as migration input, but Memory Bank links should route readers to:
- `bot-platform` for the framework contract;
- `docoved-agent` for Docoved adoption;
- `seller-agent` for SellerAgent adoption;
- `sales-agent` only for lineage or transitional evidence.

## Implementation phases

### Phase 1: Framework inventory and contract decision

Before adding code:
- inventory existing `@dd-bot-platform/core` and `@dd-bot-platform/api-contract` channel, execution, trace, capability, and result vocabulary;
- decide whether `@dd-bot-platform/channel-runtime` is a new package or whether the first slice belongs in an existing package;
- record the decision in framework docs;
- keep the planned first slice limited to canonical document and pure helper contracts.

Definition of done:
- inventory notes exist in the task/protocol evidence;
- no duplicate vocabulary is knowingly introduced;
- package placement decision is documented.

### Phase 2: Minimal contract package or module

Create the first implementation with:
- package or module manifest as decided in Phase 1;
- exported TypeScript types;
- pure markdown/plaintext helpers only if needed;
- deterministic fixtures;
- no DB dependency;
- no provider SDK dependency;
- no product package dependency.

Definition of done:
- `pnpm check` passes in `bot-platform`;
- package/module exports are importable from a local consumer test or compile smoke;
- package is added to the workspace build graph;
- if publishing is in scope, package is added to the controlled publish allowlist, has a Changeset entry, and passes pack/publish dry-run inspection.

### Phase 3: Framework docs

Add framework specs:
- `spec/runtime/channel-runtime-contract.md`;
- package placement note under project/package docs if the repo has that section;
- runtime/spec index updates.

Definition of done:
- docs identify which fields are framework-owned versus product-owned;
- docs state that adapters render/deliver but do not decide product semantics;
- docs state that the canonical document is not shared persistence;
- docs state that first-wave DB/UI work is out of scope.

### Phase 4: Docoved adapter proof

In `docoved-agent`:
- add the product-local adoption protocol;
- import or locally link the framework contract;
- map `DocovedAnswerArtifact` to `CanonicalResponseDocument`;
- adapt current email/Telegram rendering through the canonical document without changing transport behavior.

Definition of done:
- current beta Telegram runtime proof remains green when Telegram behavior changes;
- current beta email runtime proof remains green when email behavior changes;
- one local proof verifies the same Docoved canonical document renders to email and Telegram without changing answer/source semantics;
- Docoved Memory Bank indexes route readers to upstream `PRT-042`.

### Phase 5: Command adoption design

After the canonical document/rendering seam is proven:
- reconcile channel command needs with `spec/runtime/command-framework-contract.md`;
- remove Telegram-named generic command vocabulary from product code where safe;
- design email/Telegram command parity through shared command-framework primitives.

Definition of done:
- command adoption plan is documented before `ChannelCommand*` public types are introduced;
- command access maps to existing capability/membership concepts;
- public customer channels do not expose operator/debug commands by default.

### Phase 6: SellerAgent adoption

In `seller-agent`:
- adopt the same contract for response rendering and command-result shape;
- keep SellerAgent-specific command handlers local;
- remove copied or Telegram-named generic helpers where possible.

Definition of done:
- SellerAgent can import or consume the contract without pulling Docoved dependencies;
- product-specific command handlers remain product-owned;
- SellerAgent Memory Bank routes readers to upstream `PRT-042`.

## Verification matrix

Required framework checks:
- package/module typecheck/build;
- import smoke for all public exports;
- deterministic fixture for canonical document visibility;
- deterministic fixture for markdown/plaintext helper if included;
- import-boundary proof that there are no imports from `docoved-agent`, `seller-agent`, `sales-agent`, product DB packages, or provider SDKs;
- pack/publish dry-run if a publishable package is created.

Required Docoved checks:
- `pnpm typecheck`;
- `pnpm check`;
- local mapping/rendering fixture for `DocovedAnswerArtifact`;
- hosted beta Telegram runtime proof when Telegram adapter behavior changes;
- hosted beta email runtime proof when email adapter behavior changes;
- later command parity proof for email and Telegram after command adoption.

Required SellerAgent checks:
- product typecheck/build after package adoption;
- product mapping/rendering fixture;
- product channel command smoke after command adoption;
- no dependency from the framework contract back into SellerAgent.

## Compatibility and rollback rules

The first rollout must be additive.

Do not:
- remove existing product answer artifact types before adapters are proven;
- force all channels to adopt every command;
- move hosted provider configuration into `bot-platform`;
- move product DB stores into `bot-platform`;
- introduce shared persistence for canonical response-document delivery records in first wave;
- introduce framework-owned UI screens in first wave;
- expose debug/operator metadata in public channel renders by default;
- rename product-specific fields in persisted product artifacts solely to match framework names.

Allowed:
- products keep existing artifacts and add mapping functions;
- products keep existing channel adapters and replace only their input/output contracts first;
- product adapters remain as compatibility bridges until product proofs pass.

Rollback:
- prefer consumer version-pin rollback over source-copy or schema surgery;
- keep old product adapters available until the new canonical-document mapping has product proof;
- if later persisted delivery records are introduced by a product, rollback must be additive and must not require destructive schema changes.

## Memory Bank documentation rules

This protocol follows the MBB ownership model:
- framework truth lives in `bot-platform`;
- product adoption truth lives in product repos;
- `sales-agent` remains mixed tracker/lineage only.

MBB anchors:
- [MBB principles](../../mbb/principles.md): Single Source of Truth and ownership routing;
- [Delivery docs guide](../../mbb/delivery-docs-guide.md): protocols/specs separation and closure evidence;
- [Indexing guide](../../mbb/indexing-guide.md): entrypoint/index update obligations.

Documentation routing rules:
- protocol decisions stay in this file until implemented;
- stable framework vocabulary moves into [Channel runtime contract](../../spec/runtime/channel-runtime-contract.md);
- product-specific mappings must be documented in product-local specs/protocols, not restated in `bot-platform`;
- review artifacts in `.tasks/prt-042-channel-runtime-protocol-review/` remain transient evidence and must not become canonical truth.

Required documentation updates:
- `bot-platform/.memory-bank/spec/runtime/channel-runtime-contract.md`;
- `bot-platform/.memory-bank/spec/runtime/index.md`;
- `bot-platform/.memory-bank/spec/index.md`;
- `bot-platform/.memory-bank/plans/index.md`;
- `bot-platform/.memory-bank/index.md`;
- Docoved product-local adoption protocol and related channel/answer-artifact specs;
- SellerAgent product-local adoption note or protocol;
- any surviving `sales-agent` references must point to target repo owners rather than restating contract truth.

Required product-index behavior:
- Docoved must route channel-adapter and answer-artifact readers to upstream `bot-platform` `PRT-042` for shared contract truth;
- SellerAgent must route channel/runtime readers to upstream `bot-platform` `PRT-042` once adoption begins;
- `sales-agent` may link the protocol only as lineage or migration evidence.

## Open questions

These are implementation-shaping questions, not blockers to the protocol direction:
- whether the first implementation is a new `@dd-bot-platform/channel-runtime` package or an extension of an existing framework package;
- whether the first package version should export only types, or types plus a minimal plaintext helper;
- whether HTML rendering should remain product-local until a second product proves shared value;
- whether public/operator/debug visibility should be per-section only or also per-block;
- whether command adoption should be a later `PRT-043` or a closed phase of this protocol after document/rendering proof.

Preferred first-wave answers:
- use the smallest package/module shape that gives typed cross-repo reuse;
- include only types plus small pure helpers that are immediately consumed;
- keep markdown as the primary public content representation;
- keep HTML/channel-specific formatting in product adapters for now;
- support visibility on sections first, with block-level visibility only if needed by product adoption;
- defer command public types until the command-framework contract is reconciled with channel needs.

## Closure criteria

This protocol can close when:
- the framework placement decision is recorded;
- the canonical response-document contract exists and is versioned;
- framework docs define the channel runtime contract and first-wave out-of-scope boundaries;
- Docoved has an adopted mapping and preserves live beta email/Telegram behavior;
- a framework import-boundary proof and product mapping/rendering proof are archived;
- SellerAgent has either adopted the contract or has a documented follow-up blocker with no conflicting local framework truth;
- Memory Bank entrypoints in `bot-platform`, `docoved-agent`, and `seller-agent` route readers to the correct owner for the shared channel runtime contract;
- `sales-agent` remains tracker/lineage only and does not restate the canonical contract.
