---
file: .memory-bank/plans/protocols/PRT-039-shared-control-plane-access-channel-and-management-substrate.md
description: Framework child protocol for extracting the shared control-plane substrate: users, sessions, memberships, workspaces, product instances, channels, pipeline bindings, and the reusable management surfaces around them.
purpose: Use when implementing the shared control-plane layer so auth, access, channel management, diagnostics, and reusable admin primitives converge under one explicit object model without prematurely centralizing all product UI or storage.
version: 1.1.0
date: 2026-04-23
status: ACTIVE
epic: EP-022
tags: [protocol, bot-platform, control-plane, auth, access, channels, product-line, shared-substrate]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/spec/project/three-layer-product-line-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/security/auth-and-access.md
  - .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
  - .memory-bank/spec/operations/observability-and-incident-diagnostics.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/mbb/delivery-docs-guide.md
  - .memory-bank/mbb/scenario-docs-guide.md
  - .memory-bank/plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/authenticated-app-shell-and-information-architecture.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/spec/ui/role-based-employee-workflows.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-access-and-knowledge-source-binding-model.md
history:
  - version: 1.1.0
    date: 2026-04-23
    changes: Hardened the protocol after the phase-1 review by narrowing capability vocabulary, adding authority/storage rules, mutation and lifecycle invariants, UI-doc deliverables, observability inheritance, verification gates, and MBB-aligned closure criteria.
  - version: 1.0.0
    date: 2026-04-23
    changes: Started the detailed shared control-plane extraction protocol so the post-split product line has one explicit object, capability, and surface model for users, rights, channels, and diagnostics.
---

# Protocol: Shared Control-Plane, Access, Channel, And Management Substrate

## Purpose

This child protocol deepens `PRT-038` for the shared control-plane layer.

Its job is to define the shared reusable substrate for:
- users and operator identities;
- sessions and memberships;
- workspaces and product instances;
- channels and pipeline bindings;
- reusable management and diagnostics surfaces.

## Why this protocol is needed

The umbrella protocol fixes the three-layer model, but practical implementation still needs a more detailed answer to several questions:
- which objects are truly shared across products;
- how roles and permissions map onto those objects;
- what belongs in platform UI primitives versus product UI;
- how to manage current and future channels such as Telegram, email, Bitrix24 bots, and other messengers;
- how to avoid turning direct-admin chat into a second unsafely-editable control plane;
- how shared vocabulary can converge without forcing one shared DB, one shared admin app, or one pseudo-universal RBAC ladder.

## Scope of this cycle

This cycle covers:
- canonical control-plane object vocabulary;
- capability vocabulary and access envelope;
- write-ownership rules across UI, CLI, and bounded direct-chat surfaces;
- channel and pipeline-binding substrate;
- reusable protected-shell and diagnostics primitives;
- first-wave control-plane lifecycle, observability, verification, and closure rules.

This cycle does not cover:
- one global cross-product hosted control-plane service in the first wave;
- one shared cross-product database in the first wave;
- product-specific role ladders as framework canon;
- product-specific information architecture;
- one framework-owned admin application for all product surfaces;
- a generic policy engine.

## Imported framework truth

This protocol inherits and makes implementation-ready the following already-landed rules:
- `auth-and-access.md`: shared auth mechanics, session lifecycle, and server-authoritative access checks;
- `control-plane-configuration-and-observability-surfaces.md`: canonical structured write-path, object vocabulary, and auditability rules;
- `persistence-interface-and-store-boundary.md`: product/store ownership of schemas and migrations, plus boundary-level idempotency and atomicity expectations;
- `observability-and-incident-diagnostics.md`, `execution-traces-and-token-accounting.md`, and `trace-artifact-governance.md`: required correlation, event, trace, and artifact rules;
- `delivery-standards.md`, `delivery-docs-guide.md`, and `scenario-docs-guide.md`: closure evidence, status sync, and scenario maturity rules;
- `ADR-004`: stable terms for `Workspace`, `ProductInstance`, `Channel`, `Pipeline`, and `Environment`.

## Phase-1 minimality guardrails

The first wave is intentionally lean.

It must not introduce:
- a shared hosted control-plane service without a separate later extraction protocol;
- a shared cross-product DB as a side effect of vocabulary convergence;
- a framework-owned route tree, product screen registry, or product POM package;
- a generic policy engine hidden behind broad `policy.*` wording;
- a no-code CRUD/admin builder as the primary control-plane surface;
- new cross-product owner leaks from SellerAgent into Docoved or the reverse.

Rule:
- standardize shared contracts, invariants, read/write rules, and reusable primitives first;
- centralize hosting, storage, or full UI ownership only after there is concrete multi-consumer proof and a later explicit protocol.

## Canonical shared objects

The first-wave shared control-plane objects are:
- `User`
- `Principal`
- `Session`
- `Membership`
- `Workspace`
- `ProductInstance`
- `Channel`
- `PipelineBinding`
- `ExecutionRun`
- `TraceArtifact`

Notes:
- products may define richer local read models on top of these;
- products may not silently redefine these object meanings;
- `PipelineBinding` is a logical shared contract first, not a mandatory standalone physical table in wave 1;
- `ExecutionRun` and `TraceArtifact` are shared observability/readback objects, while product dashboards may project them further.

## Compatibility and alias rule

Migration may keep legacy terms or internal fields behind compatibility bridges.

Allowed:
- exposing target vocabulary such as `Channel`, `Workspace`, and `ProductInstance` while older storage names such as `integration` remain internal;
- using product-local overlay refs such as `knowledge_source_ref` or `business_profile_ref` as namespaced overlays behind shared objects.

Forbidden:
- treating compatibility field names as the canonical shared object model;
- pulling product-specific invariants into shared top-level fields just because a shared surface needs to render a link.

## Authority and storage scope matrix

| object | shared meaning owner | product-owned overlays | first-wave storage authority | first-wave rule |
| --- | --- | --- | --- | --- |
| `User` | platform auth vocabulary and identity envelope | none beyond product-local display/read projections | product-local auth store | auth tables remain internal by default |
| `Principal` | platform auth/access mechanics | product-local trust-policy interpretation | product-local auth store | no product may redefine principal semantics |
| `Session` | platform session lifecycle and revoke/replace semantics | product-specific UX around session listings | product-local auth store | authoritative resolve/revoke stays persisted and server-side |
| `Membership` | shared membership meaning and access envelope | product role names, invite UX, trust-policy overlays | product-local auth/access store | shared vocabulary does not imply one shared membership table |
| `Workspace` | shared workspace scope | product-specific labels and IA projections | product-local product store | shared identity, product-local projections |
| `ProductInstance` | shared product-instance registry meaning | product-specific display and linkage | product-local product store | one product may project richer context, not redefine identity |
| `Channel` | shared channel identity, kind, binding envelope, and lifecycle | namespaced overlay refs only | product-local channel/integration store | wave 1 allows compatibility bridges and inline binding storage |
| `PipelineBinding` | shared binding contract and validation semantics | product-specific interpretation of overlay refs | product-local channel/binding store | may stay inline with `Channel` until later additive extraction proves value |
| `ExecutionRun` | shared diagnostics lineage and readback meaning | product dashboards and product-focused drilldowns | product-local runtime/trace store | shared readback, not shared product dashboard truth |
| `TraceArtifact` | shared governed artifact/readback meaning | product-specific report renders and bounded projections | product-local runtime/trace store | heavy artifacts remain governed and auditable |

Rule:
- wave 1 standardizes contracts and invariants, not cross-product rows.

## Capability vocabulary

Framework capability families are:
- `workspace.read`
- `membership.read`
- `membership.manage`
- `session.read`
- `session.revoke`
- `product_instance.read`
- `product_instance.manage`
- `channel.read`
- `channel.manage`
- `pipeline_binding.manage`
- `policy_assignment.read`
- `policy_assignment.manage`
- `execution_run.read`
- `trace_artifact.read`

Products map these capability families into their own role ladders.
Framework does not freeze one global product RBAC ladder.

Narrowing rule:
- `policy_assignment.*` covers policy refs and override assignment only;
- it is not a generic “platform policy engine” capability family.

## Role and overlay rule

Framework owns:
- capability vocabulary;
- access decision envelope;
- server-authoritative evaluation rules.

Products own:
- role names;
- which role bundles which capabilities;
- product-specific visibility and workflow policy.

Examples:
- SellerAgent `observer`, `operator`, and `workspace_admin` remain SellerAgent overlays;
- Docoved may define its own knowledge-operations overlay without asking the platform to rename it into Seller terms.

## Shared control-plane mutation invariants

Structured control-plane mutation must satisfy all of the following:

- one canonical backend validation path per object class;
- stale writes must be blocked by compare-and-swap, version token, or equivalent precondition checks;
- invalid relation changes fail as typed `Validation` or `Conflict`, not hidden retries;
- direct-admin chat remains bounded to inspection and narrow toggles;
- execution that starts from a `Channel` binding must capture an effective binding/config snapshot at acceptance time so later edits do not silently rewrite in-flight intent;
- compatibility fallback or degraded config resolution must emit explicit structured events and diagnostics evidence.

## Channel and binding substrate

### Shared channel model

Each `Channel` must carry at least:
- `channel_ref`
- `workspace_ref`
- `product_instance_ref`
- `channel_kind`
- `entry_pipeline_ref`
- `binding_status`
- transport configuration summary
- effective policy-assignment ref when present
- namespaced overlay refs where product-local linkage is required

Overlay rule:
- overlay refs are link fields only;
- they must not smuggle product lifecycle truth into the shared object shape.

### Pipeline binding rule

`PipelineBinding` is the shared logical contract for:
- pipeline selection;
- compatibility validation;
- effective argument schema;
- policy-assignment compatibility.

Wave-1 physical rule:
- it may remain stored inline with `Channel` if that matches current product persistence;
- later extraction into a separate relation is allowed only through an additive migration.

### Binding lifecycle

The minimal first-wave binding status universe is:
- `unbound`
- `bound`
- `degraded`
- `disabled`
- `invalid`

Rules:
- `bound` means validation passed and the current effective binding is usable;
- `degraded` means the binding still exists but diagnostics show limited capability or partial transport/readiness loss;
- `disabled` means intentionally not serving traffic;
- `invalid` means a previously known binding no longer satisfies the canonical validation contract.

### Channel capability matrix

The substrate must support capability flags for at least:
- synchronous vs asynchronous delivery;
- inbound vs outbound support;
- reply-thread linking fidelity;
- attachment support;
- operator-command support;
- transport-specific diagnostics support.

### Supported roadmap

Current first-wave target channel kinds:
- `telegram`
- `email`

Explicit near-future targets:
- `bitrix24_bot`
- additional messenger adapters

The shared substrate must therefore avoid hard-coding Telegram-only assumptions into channel identity, threading, or command capability.

## Surface authority matrix

| surface class | allowed first-wave actions | disallowed first-wave actions | notes |
| --- | --- | --- | --- |
| Admin UI | common channel edits, membership reads/mutations, session list/revoke, diagnostics entry, curated policy-assignment inspection | opaque bulk mutation, unsupported direct storage edits, hidden validation bypass | platform may own reusable blocks; product keeps IA |
| Admin CLI / structured operations clients | precise structured reads/writes, maintenance-grade mutation, automation-friendly exact operations | private schema writes, product-only bypass flows | must use the same validation contracts as UI |
| Direct-admin chat | bounded inspection, concise status readback, narrow operational toggles | complex membership editing, heavy channel configuration, broad policy mutation, trace payload dumping | not the primary control-plane editor |

## First-wave shared surface matrix

The first wave must treat the following as shared surface families even if each product composes them differently:

| surface_id | shared read model | minimum actions | platform-owned contract | product-local composition |
| --- | --- | --- | --- | --- |
| `cp-memberships` | `Membership`, `Workspace`, `User` | list, inspect, add/remove, change capability bundle | shared object semantics, mutation rules, validation, auditability | route, layout, surrounding workflow |
| `cp-sessions` | `Session` | list active/recent sessions, revoke specific session | session lifecycle semantics and revoke contract | route, UX, explanatory copy |
| `cp-product-instances` | `ProductInstance` | list, inspect, bind related shared objects | identity and shared linkage semantics | product dashboards and deeper projections |
| `cp-channels` | `Channel`, `PipelineBinding` | list, inspect, create/update binding, assign/clear policy ref | binding contract, status vocabulary, validation, auditability | route, local overlays, secondary panels |
| `cp-runs` | `ExecutionRun` | list, inspect, follow related trace linkage | diagnostics readback semantics | product investigation workflow |
| `cp-trace-artifacts` | `TraceArtifact` | inspect bounded metadata and allowed governed payloads | artifact governance, access, and audit rules | product drilldown composition |

## UI contract deliverables

Product adoption is not complete unless the adopting repo links shared surface semantics into its own UI-doc packet.

Required product-local deliverables when a governed control-plane surface is implemented or materially changed:
- product-local protected-shell or app-shell IA spec;
- product-local screen registry or equivalent surface inventory;
- screen-level contracts for the affected governed screens;
- automation-facing stable ids or POM mapping for the affected governed surfaces.

Platform rule:
- `bot-platform` owns the lowest shared surface contract only: `surface_id`, object/action semantics, visible state vocabulary, and authority rules;
- product repos own routes, menus, layout composition, and product-specific operator workflows.

## Deployment and persistence stance

First-wave implementation stance:
- shared packages and contracts in `bot-platform`;
- product-local implementation and storage in product repos;
- no mandatory shared cross-product database or hosted control-plane service in this wave.

### Compatibility bridge and migration sequencing

Required sequencing for control-plane convergence:
1. land shared contract/read-model vocabulary and compatibility adapters first;
2. apply additive schema changes only;
3. run idempotent backfill or reconciliation only where physical shape changes are real;
4. prefer one writer plus compatibility reads over default dual-write;
5. remove legacy fields or terms only after verification parity and rollback inputs exist.

Rules:
- destructive table/field renames must not be the first migration step;
- dual-write is exceptional, not the default wave shape;
- internal legacy terms may remain temporarily, but their mapping to shared vocabulary must stay explicit.

### Auth and release-sensitive mutation rule

Any wave changing persisted sessions, memberships, channel authorization, or protected-surface exposure must also document:
- RLS, grants, or exposure decisions where applicable;
- additive compatibility path;
- hosted or beta verification expectations for the affected protected surfaces;
- rollback inputs and containment plan.

## Observability inheritance

This protocol inherits the framework observability baseline and makes it mandatory for control-plane mutations and diagnostics reads.

Required correlation bundle where applicable:
- `request_id`
- `correlation_id`
- `operation_id`
- `workspace_ref`
- `product_instance_ref`
- `channel_ref`
- `actor_ref`
- `env`
- `release`

Mandatory first-wave event checkpoints where applicable:
- `membership_read`
- `membership_updated`
- `session_revoked`
- `channel_binding_validated`
- `channel_binding_updated`
- `channel_binding_rejected`
- `policy_assignment_updated`
- `diagnostics_read`
- `trace_artifact_read`
- `compat_fallback_used`

Rules:
- elevated trace-artifact reads must be auditable;
- direct-admin chat must not dump heavy artifacts by default;
- degraded or invalid control-plane state must be diagnosable from structured events and bounded read models rather than raw DB spelunking alone.

## Verification contour

This protocol may not claim stronger closure than its verification contour can support.

| flow | primary anchors now | owner | minimum proof for stronger-than-`partial` closure |
| --- | --- | --- | --- |
| auth/session envelope | `auth-and-access.md`, `SCN-012`, `verification-matrix.md` `auth-framework` row | platform | named command set plus green repo baseline; security-sensitive changes require explicit hosted or `N/A` verdict |
| membership semantics | this protocol, `auth-and-access.md`, product-local adoption protocol | shared contract in platform, overlay proof in product | product-local adoption proof required before `adopted` status |
| channel binding and policy assignment | this protocol, `control-plane-configuration-and-observability-surfaces.md`, `verification-matrix.md` | platform | shared contract proof plus at least one consumer-side verification path |
| diagnostics and trace readback | this protocol, runtime trace specs, `verification-matrix.md` | platform | bounded readback proof and observability event evidence |
| protected-shell and governed UI surfaces | this protocol plus product-local UI-doc packet | product | product-local IA/screen/automation docs must be updated in the same wave |

Scenario maturity rule:
- if an acceptance-critical anchor remains `planned`, the wave may remain `partial`;
- it must not be marked `implementation_proven` or `adopted` on that anchor alone.

## Documentation deliverables and MBB sync

Each material execution wave under this protocol must update the relevant Memory Bank surfaces in the same closure pass.

Minimum sync set:
- `PRT-039` itself;
- `current-status-report.md`;
- `verification-matrix.md` when the verification contour changes;
- `scenario-matrix.md` when scenario anchors or execution status change;
- affected product-local adoption protocols or boundary docs;
- affected product-local UI-doc packet where governed screens are introduced or changed.

MBB rule:
- this protocol is a curated execution contract and evidence sink, not a duplicate spec;
- scenario and status surfaces must be kept honest about `planned` vs runnable proof.

## Wave closure gates

| gate | required when | minimum proof |
| --- | --- | --- |
| local baseline | every code wave | current repo baseline command set, today at minimum `pnpm check` |
| scenario or verification gate | behavior changes | named verification row and scenario anchor, or explicit `N/A` with reason |
| CI gate | every code wave | green `Verification` workflow or successor canonical CI gate |
| hosted gate | runtime-facing or protected-surface changes | hosted-beta proof or explicit `N/A` with rationale |
| security gate | auth, session, membership, or protected data-surface change | exposure/RLS/grants decision plus linked verification evidence |
| product adoption gate | claiming `adopted` | at least one linked product-local protocol or evidence packet proving adoption |
| status sync gate | any non-draft closure | current-status, verification, scenario, and affected product docs updated together |

Outcome rule:
- `design_landed` is not `implementation_proven`;
- `implementation_proven` is not `adopted`;
- `adopted` is not `archived`.

## Risks and mitigations

- Risk: accidental push toward one global admin app too early.
  - Mitigation: keep product IA local and reusable blocks platform-owned.
- Risk: role ladders collapse into one pseudo-universal RBAC.
  - Mitigation: standardize capabilities, not product role names.
- Risk: new channels smuggle transport-specific assumptions into shared objects.
  - Mitigation: keep channel capability matrix explicit and transport-agnostic.
- Risk: compatibility bridges become hidden second truth.
  - Mitigation: keep mapping explicit, additive, and time-bounded by later cleanup proof.

## Key decisions / deviations

- The shared layer narrows policy handling to policy-assignment refs, not a generic policy engine.
- `PipelineBinding` stays a logical shared contract first, with physical extraction deferred until additive migration is justified.
- Product-local UI packets remain the owners of routes, menus, and POM mappings even when the shared substrate defines reusable surface contracts.

## Evidence

- `PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `control-plane-configuration-and-observability-surfaces.md`
- `auth-and-access.md`
- `persistence-interface-and-store-boundary.md`
- `observability-and-incident-diagnostics.md`
- `delivery-standards.md`
- `.tasks/prt-038-phase1-review/reports/phase1-consolidated-review.md`

## Outcome

- Result: `partial`
- Current completion state: `design_hardened`
- Follow-up needed:
  - implement the shared control-plane contracts and read/write paths in `bot-platform`;
  - land explicit convergence-era verification rows and runnable anchors where needed;
  - adopt the shared control-plane substrate in SellerAgent and Docoved while keeping product IA and product overlays local;
  - retire compatibility bridges only after additive migration proof and owner-side no-regression evidence.

## Memory Bank impact

- Hardened the shared control-plane protocol with authority, storage, lifecycle, migration, observability, UI-doc, and closure rules.
- Narrowed capability vocabulary so policy handling does not over-claim framework ownership.
- Added explicit MBB-aligned documentation and verification sync obligations for future execution waves.
