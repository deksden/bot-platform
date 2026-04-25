---
file: .memory-bank/spec/project/three-layer-product-line-architecture.md
description: 'Normative three-layer architecture for the post-split product line: platform substrate, shared cross-product substrate, and product policy packs.'
purpose: Read before moving code or docs between repos so shared capabilities are extracted into bot-platform without flattening SellerAgent and Docoved into generic configuration.
version: 0.1.0
date: 2026-04-23
status: ACTIVE
tags: [project, architecture, product-line, layering, shared-substrate, bot-platform]
parent: .memory-bank/spec/project/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/agent-execution-platform-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/security/auth-and-access.md
  - .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
  - .memory-bank/plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md
  - .memory-bank/plans/adr/ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
history:
  - version: 0.1.0
    date: 2026-04-23
    changes: Added the normative three-layer product-line architecture so platform extraction and product adoption can proceed from one stable ownership model after the repo split.
---

# Three-Layer Product-Line Architecture

## Position in the spec system

This file is the normative project-level architecture for the post-split product line.

Use it together with:
- `spec/architecture/boundaries.md` for the broad framework/product line;
- `spec/project/feature-area-boundaries.md` for framework feature ownership;
- `ADR-005` for the long-lived decision and rationale;
- `PRT-038` for the active execution program.

## Why this layer model is required

The current repo split removed mixed ownership at the repository level, but current behavior still shows a real shared layer:
- SellerAgent and Docoved reuse the same agent-cycle building blocks;
- identical runtime files exist in both product repos;
- channel-bound execution, traces, workflow-backed actions, and report artifacts already follow similar patterns.

At the same time, the products still carry non-extractable truths.
Therefore the target model must separate:
- general framework substrate;
- extracted cross-product substrate;
- product policy packs.

## Layer 1: Platform substrate

`bot-platform` owns the platform substrate.

It includes:
- execution kernel;
- workflow and command framework contracts;
- auth, session, principal, membership, and access primitives;
- pipeline registry and execution envelopes;
- typed client/API base contracts;
- trace, evidence, diagnostics, and observability primitives;
- platform control-plane base contracts.

It must stay product-agnostic.

It must not own:
- SellerAgent business semantics;
- Docoved knowledge semantics;
- product deployment/runbook truth.

## Layer 2: Shared cross-product substrate

`bot-platform` also owns the extracted shared middle layer.

This layer exists because multiple products already need more than the bare kernel, but less than each product's full semantics.

### 2A. Interaction substrate

This sub-layer owns the shared conversation and execution-start mechanics:
- canonical ingress normalization;
- conversation and continuity bundle carriers;
- channel-bound execution start contracts;
- run/result/report artifact envelopes;
- execution-run and trace-artifact association;
- reply/report intent handoff to product-local delivery behavior.

### 2B. Governed-content and import substrate

This sub-layer owns the shared governed-content lifecycle:
- connected-source registration;
- source binding to workspaces, product instances, and channels where applicable;
- revision and activation lifecycle;
- import-run orchestration;
- processing artifacts and import reports;
- workflow-backed import lifecycle;
- the source-processing contract from raw files or folders to a canonical extraction bundle.

This layer must stay generic enough to support more than one product, but it cannot ignore governance and revision semantics merely to look simpler.

## Layer 3: Product policy packs

Product repos own the policy-pack layer.

### SellerAgent policy pack

SellerAgent keeps:
- live-customer burst semantics;
- assist, review, takeover, and operator handoff behavior;
- customer memory;
- commerce, cart, deal, and follow-up behavior;
- business-profile publication and seller-side authoring semantics;
- seller-specific UI, prompts, and operator workflows.

### Docoved policy pack

Docoved keeps:
- document-grounded answering;
- active snapshot and publication semantics;
- semantic navigation and citation behavior;
- duplicate/conflict review and temporal defaults;
- document-aware knowledge-import interpretation;
- Docoved-specific UI, prompts, and operator workflows.

## Canonical shared object vocabulary

The following objects belong to the shared layers and should not be reinvented separately in each product without cause:

- `User`: human identity record.
- `Principal`: authenticated acting identity.
- `Session`: authenticated runtime context.
- `Membership`: principal-to-workspace role or capability binding.
- `Workspace`: tenancy boundary.
- `ProductInstance`: one installed product inside a workspace.
- `Channel`: one connected communication surface bound through a product instance.
- `PipelineBinding`: entry binding between channel and pipeline.
- `ConnectedSource`: one externally attached governed source.
- `SourceRevision`: a candidate or published source revision.
- `ImportRun`: one workflow-backed import execution.
- `ProcessingArtifact`: normalized artifact produced during source processing or import.
- `ExecutionRun`: one executable runtime or workflow run.
- `TraceArtifact`: governed diagnostics and evidence artifact for one run.

Product-local objects remain product-local, for example:
- SellerAgent `BusinessProfile`, `CustomerBurst`, `Deal`, `DraftReview`;
- Docoved `KnowledgeSnapshot`, `SearchReport`, `GroundedAnswerArtifact`.

## UI and control-plane placement rules

Platform owns the reusable mechanics and primitives:
- auth and session shell;
- membership and workspace switching;
- product-instance selection;
- channel registration primitives;
- source/import execution read models;
- trace and diagnostics views;
- shared form and capability envelope contracts.

Products own the actual product experience:
- SellerAgent operator shell, assist flows, business-profile screens, and seller role overlays;
- Docoved source-management, import review, answer inspection, and knowledge-operations screens.

## Bot-mediated import rule

Knowledge or governed-content import should be modeled as a workflow, not as free-form admin editing inside chat.

Canonical shape:
1. a file or folder is handed to a bot or UI surface;
2. the platform creates an `ImportRun`;
3. the source-processing contract produces a canonical extraction bundle;
4. the product-specific importer interprets that bundle;
5. the system returns a concise report and review outcome;
6. approval and activation remain governed surfaces.

## Promotion and placement rule

A capability may move upward into `bot-platform` only when one of these is true:
1. it is genuinely product-agnostic;
2. it already has multiple real product consumers.

If a product invariant remains in the behavior, the capability stays product-local even if its implementation looks reusable.

## Legacy retirement targets enabled by this model

The three-layer model makes the following cleanup work explicit:
- duplicated runtime files and identical pipeline catalogs between SellerAgent and Docoved;
- SellerAgent-scoped dependencies still present inside Docoved packages;
- fake shared ownership buckets such as the remaining `packages/shared` tail;
- transitional `sales-agent` wrappers once owner-side adoption is proven;
- over-broad admin or chat surfaces that try to replace structured workflow-driven import/governance.

## Product protocol kickoff rule

Product repos may start their next adoption protocols only after the kickoff gate declared in `PRT-038` is satisfied.

That gate requires:
- this spec;
- `ADR-005`;
- the platform rationale guide;
- product-local adoption-boundary docs in SellerAgent and Docoved;
- explicit treatment of `sales-agent` as archive-only lineage.
