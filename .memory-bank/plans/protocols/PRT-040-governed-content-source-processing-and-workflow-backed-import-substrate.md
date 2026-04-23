---
file: .memory-bank/plans/protocols/PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md
description: Framework child protocol for extracting the shared governed-content substrate: connected sources, source revisions, source processing, import runs, processing artifacts, derived reports, and workflow-backed bot-mediated import entry.
purpose: Use when implementing the shared governed-content and import layer so Docoved can adopt it first, later products can reuse it safely, and content ingest does not degrade into ad hoc admin chat editing or premature platformization of product truth.
version: 1.2.0
date: 2026-04-23
status: ACTIVE
epic: EP-022
tags: [protocol, bot-platform, governed-content, source-processing, import, workflow, product-line, shared-substrate]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md
  - .memory-bank/scenarios/SCN-177-shared-governed-content-import-readback-contract.md
  - .memory-bank/spec/project/three-layer-product-line-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
  - .memory-bank/spec/runtime/workflow-framework-contract.md
  - .memory-bank/spec/operations/control-plane-configuration-and-observability-surfaces.md
  - .memory-bank/spec/operations/observability-and-incident-diagnostics.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
  - .memory-bank/spec/engineering/delivery-standards.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/mbb/delivery-docs-guide.md
  - .memory-bank/mbb/scenario-docs-guide.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/wave1-verifier-acceptance.md
  - .tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-V1-report.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/architecture/domains/docoved-agentic-ingest-and-knowledge-projection-model.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-access-and-knowledge-source-binding-model.md
  - /Users/deksden/Documents/_Projects/docoved-agent/.memory-bank/spec/runtime/docoved-memory-bank-publication-and-active-snapshot-model.md
  - /Users/deksden/Documents/_Projects/seller-agent/.memory-bank/guides/explanation/business-profile-publication-model.md
history:
  - version: 1.2.0
    date: 2026-04-23
    changes: Synced the protocol to the landed wave-1 verifier tranche: shared governed-content/import implementation slices and the first runnable local framework proof (`SCN-177`) are now explicit protocol truth, while closure remains partial pending consumer-side retry/import proof, product-local UI-doc/adoption evidence, and downstream activation proof.
  - version: 1.1.0
    date: 2026-04-23
    changes: Hardened the protocol after the phase-1 review by narrowing the shared canon, defining lifecycle and idempotency rules, separating candidate from live truth, adding storage/rollback/observability/UI-doc obligations, and aligning closure gates with MBB and delivery standards.
  - version: 1.0.0
    date: 2026-04-23
    changes: Started the detailed governed-content and import extraction protocol so the post-split product line has one shared contract for connected sources, processing bundles, import runs, and workflow-backed bot-mediated ingest.
---

# Protocol: Governed-Content, Source Processing, And Workflow-Backed Import Substrate

## Purpose

This child protocol deepens `PRT-038` for the governed-content layer.

Its job is to define one shared reusable substrate for:
- connected sources;
- source revisions;
- server-side source processing;
- import runs and their derived readback;
- workflow-backed bot-mediated import entry.

## Why this protocol is needed

Several important questions remained under-specified after the umbrella protocol:
- what exactly the platform means by a connected source;
- how a raw file or folder becomes a canonical processed bundle;
- how bot-mediated import should work without becoming free-form chat editing;
- how to keep Docoved as the first consumer without forcing SellerAgent business profiles into a false generic content model;
- how to define import lifecycle, retries, review gates, observability, and rollback without prematurely centralizing product serving truth.

## Scope of this cycle

This cycle covers:
- canonical object model for governed content and import;
- source-processing contract;
- workflow-backed import lifecycle;
- derived import reports and review/activation handoff semantics at the shared substrate level;
- first-wave reliability, observability, verification, and release-safety rules for shared ingest flows.

This cycle does not cover:
- a separate new product or service by default;
- product-specific content semantics;
- replacing SellerAgent business-profile publication with a generic importer in the first wave;
- turning Docoved `KnowledgeSnapshot` or Seller `BusinessProfileRelease` into shared canonical storage tables.

## Imported framework truth

This protocol inherits and makes implementation-ready the following already-landed rules:
- `persistence-interface-and-store-boundary.md`: product/store ownership of schemas and migrations, boundary-level idempotency expectations, and atomicity intent;
- `workflow-framework-contract.md`: workflow start/callback/retry vocabulary and host-bound execution rules;
- `observability-and-incident-diagnostics.md`, `execution-traces-and-token-accounting.md`, and `trace-artifact-governance.md`: required correlation, lineage, and governed-artifact rules;
- `control-plane-configuration-and-observability-surfaces.md`: canonical write-path and diagnostics surface discipline when imports are initiated or inspected from first-party surfaces;
- `delivery-standards.md`, `delivery-docs-guide.md`, and `scenario-docs-guide.md`: closure evidence, status sync, and scenario maturity rules.

## Phase-1 minimality guardrails

The first wave is intentionally lean.

It must not introduce:
- a generic “content platform” that absorbs product meaning;
- a separate source-processing service without an explicit later extraction gate;
- product activation or publication truth inside `bot-platform`;
- direct-admin chat as the primary editor, review surface, or activation surface;
- new canonical shared objects just because one product happens to have a local concept with a similar name.

Rule:
- standardize ingress contracts, lifecycle invariants, and governed processing/reporting first;
- keep product review, activation, serving, and storage truth local until later multi-consumer proof exists.

## Canonical shared objects and boundary notes

The first-wave shared governed-content objects are:
- `ConnectedSource`
- `SourceRevision`
- `ImportRun`
- `ProcessingArtifact`

Derived shared read models:
- `ImportReport`

Optional later shared objects:
- `ActivationDecision`
- `SourceProcessingProfile`

Product-local objects remain product-local, for example:
- SellerAgent `BusinessProfileRelease`
- Docoved `KnowledgeSnapshot`

Rules:
- `ImportReport` is a required structured outcome/read model produced by `ImportRun`; it is not a mandatory standalone canonical root or mandatory standalone storage table in wave 1;
- `SourceRevision` is a candidate-governed revision envelope, not the shared owner of live product-serving truth;
- optional later objects do not block the first wave and must not be introduced without a concrete second consumer and explicit value.

## Alias and compatibility rule

Compatibility and product-local vocabulary may still appear at the read-model layer.

Allowed:
- Docoved-facing surfaces may continue to expose `KnowledgeSource` as a product read model over `ConnectedSource`;
- legacy internal fields may remain behind compatibility bridges while target shared vocabulary is exposed outwardly.

Forbidden:
- treating a product read model or legacy label as the canonical shared object meaning;
- forcing SellerAgent business-profile publication terminology into generic import terms when the semantics do not match.

## Authority and storage scope matrix

| object | shared meaning owner | product-owned overlays | first-wave storage authority | first-wave rule |
| --- | --- | --- | --- | --- |
| `ConnectedSource` | platform-owned shared source identity and ingress envelope | product-specific linkage, review labels, and local UI projections | product-local source store | shared identity, product-local serving context |
| `SourceRevision` | shared candidate revision envelope and provenance | product-specific review and serving interpretation | product-local publication/import store | not the owner of live product-serving truth |
| `ImportRun` | shared workflow-backed ingest lifecycle and status envelope | product-specific secondary review labels and local dashboards | product-local import/workflow store | must be idempotent and traceable |
| `ProcessingArtifact` | shared processed-bundle lineage, warnings, and governed derived assets | product-specific downstream projections | product-local import/artifact store | heavy payloads follow governed artifact policy |
| `ImportReport` | shared structured outcome/read model | product-specific enrichment | materialized where useful in product-local stores | not required to be a standalone shared table |

Rule:
- wave 1 standardizes lifecycle and lineage, not cross-product publication rows.

## Source-processing contract

### Input classes

The first-wave source processor must accept:
- one file;
- one folder;
- one archive containing files or folders.

It may later accept remote URLs or connected drives, but those are not required for the first implementation.

### Output contract

The processor returns one canonical extraction bundle containing:
- manifest and processing metadata;
- normalized Markdown derivatives where derivation is possible;
- extracted images or other assets where applicable;
- structural tree of the extracted corpus;
- file fingerprints and provenance;
- parser warnings and degradation markers;
- explicit unsupported-item records when conversion is not possible.

This is the contract behind the user's target phrase:
- “file or folder in -> md + images + structure + report out”.

### Honesty rule

The processor must classify each input item explicitly as:
- `supported`
- `degraded`
- `unsupported`

It must not:
- silently drop content;
- pretend unsupported formats imported cleanly;
- report success while only partial conversion happened without explicit degradation markers.

## Workflow-backed import lifecycle

Canonical flow:
1. receive file or folder from UI, CLI, or bot;
2. accept or deduplicate the semantic import request and create `ImportRun`;
3. process input into a canonical extraction bundle;
4. hand the bundle to the product-specific importer;
5. create or reconcile a candidate product revision;
6. produce `ImportReport` and next-action state;
7. let the product-local review and activation rules decide the live cutover.

## Minimal lifecycle contract

The minimal shared `ImportRun` status universe is:
- `accepted`
- `processing`
- `bundle_ready`
- `importing`
- `review_required`
- `ready_for_activation`
- `activated`
- `failed`
- `cancelled`

Rules:
- `accepted` means the semantic request is admitted and a logical run exists;
- `bundle_ready` means the canonical extraction bundle is available and product import may begin or resume;
- `review_required` means the product importer produced a candidate that still needs governed product review;
- `ready_for_activation` means the product importer confirmed a verified candidate eligible for product-local activation;
- `activated` means the product later confirmed the cutover; this records outcome lineage, not ownership of activation semantics;
- terminal failure must preserve enough lineage to explain whether processing, import, review handoff, or activation confirmation failed.

## Idempotency, retry, and concurrency rules

### `ImportRun`

Each import start surface must define one semantic idempotency key built from:
- target scope;
- environment where relevant;
- ingress artifact fingerprint or bundle fingerprint;
- requested operation kind.

Rules:
- repeated submission of the same semantic import request should converge to one logical `ImportRun` or explicitly return the existing logical run;
- workflow callbacks and activation confirmations must be idempotent on the same logical operation;
- duplicate submissions must not create multiple live cutovers for one semantic input by accident.

### `SourceRevision`

Each candidate revision must define a stable natural key over:
- `connected_source_ref`
- environment where relevant
- revision fingerprint or source fingerprint

Rules:
- the same verified input should not create duplicate candidate revisions without an explicit reason;
- product importers may enrich the candidate, but the shared lineage must remain deduplicable.

### Concurrency and stale-write rules

Required first-wave invariants:
- mutable review or activation operations must use compare-and-swap, lock, or equivalent precondition protection;
- only one active revision may exist per logical source per environment where the product contract demands singleton activity;
- retrying the same verified activation confirmation must be safe and non-duplicative;
- activation conflicts are typed `Conflict` errors, not silent retries.

## Candidate vs live truth boundary

Shared governed-content substrate owns:
- connected-source identity;
- processed-bundle lineage;
- candidate revision lineage;
- import-run status and derived report skeleton.

Product-local layers still own:
- review semantics beyond the shared next-action envelope;
- activation policy;
- live serving truth;
- release/publication cutover semantics.

Examples:
- Docoved `KnowledgeSnapshot` remains the serving truth and active-pointer owner;
- SellerAgent `BusinessProfileRelease` remains the publication and release-assignment truth.

## Activation and rollback invariants

The shared substrate must respect all of the following:
- activation is allowed only after a product-local verified or approved state;
- the same logical source may have different active revisions in different environments;
- beta activation must not imply prod activation;
- previous verified active revision must remain recoverable for rollback;
- preferred rollback shape is pointer or reassignment rollback, not destructive delete-and-rebuild.

## Bot-mediated import rule

Bot interaction is allowed for:
- submitting the input;
- tracking run status;
- returning concise result summaries.

Bot interaction is not the primary place for:
- heavy structured content editing;
- silent review bypass;
- direct activation without product-governed policy;
- dumping full extraction bundles or heavy raw artifacts by default.

## Product overlay rule

### Docoved

Docoved is the first consumer and should adopt the full flow:
- connected knowledge source;
- import run;
- candidate knowledge revision;
- review and activation.

### SellerAgent

SellerAgent may reuse only the pieces that are truly shared in the first wave.

Its repo-backed business-profile publication model remains SellerAgent-owned and is not to be collapsed into generic import just because both domains use governed content.

## First-wave shared surface matrix

The first wave must treat the following as shared surface families even if product repos compose them differently:

| surface_id | shared read model | minimum actions | platform-owned contract | product-local composition |
| --- | --- | --- | --- | --- |
| `gc-sources` | `ConnectedSource` | list, inspect, create/update source registration | source identity, status, lineage semantics | routes, layout, product labeling |
| `gc-source-detail` | `ConnectedSource`, `SourceRevision` | inspect lineage and current candidate/active references | shared source/revision/readback semantics | richer product-specific projections |
| `gc-imports` | `ImportRun` | list, inspect status, resume status tracking | shared run lifecycle and status meaning | route and operator workflow |
| `gc-import-detail` | `ImportRun`, `ImportReport`, `ProcessingArtifact` | inspect report summary, warnings, unsupported items, next action | shared outcome/readback contract | product-specific approval and activation UX |
| `gc-artifacts` | `ProcessingArtifact` | inspect bounded manifests and derived asset summary | governed artifact semantics | product-specific drilldown and rendering |

## UI contract deliverables

Product adoption is not complete unless the adopting repo links shared ingest semantics into its own UI-doc packet.

Required product-local deliverables when a governed source/import surface is implemented or materially changed:
- product-local IA or route-family spec for sources/imports;
- screen registry or equivalent surface inventory;
- screen-level contracts for the affected governed screens;
- automation-facing stable ids or POM mapping for the affected governed surfaces.

Platform rule:
- `bot-platform` owns the lowest shared surface contract only: `surface_id`, lifecycle semantics, action envelope, visible state vocabulary, and governed artifact/readback rules;
- product repos own routes, menus, layout composition, review UX, and activation UX.

## Observability inheritance

This protocol inherits the framework observability baseline and makes it mandatory for import and activation-adjacent flows.

Required correlation bundle where applicable:
- `request_id`
- `correlation_id`
- `operation_id`
- `connected_source_ref`
- `source_revision_ref`
- `import_run_ref`
- `processing_artifact_ref`
- `workflow_run_ref`
- `actor_ref`
- `env`
- `release`

Mandatory first-wave event checkpoints where applicable:
- `import_run_accepted`
- `source_processing_started`
- `source_processing_completed`
- `source_processing_failed`
- `product_import_started`
- `product_import_completed`
- `import_review_required`
- `import_ready_for_activation`
- `import_activation_confirmed`
- `import_activation_rejected`
- `compat_fallback_used`

Rules:
- import lineage must be traceable into workflow and artifact evidence;
- unsupported or degraded outcomes must be visible in structured readback, not hidden behind “success” status;
- elevated reads of heavy artifacts or derived reports remain governed and auditable.

## Deployment, storage, and migration stance

Initial stance:
- define the source-processing contract and shared package seam in `bot-platform`;
- let the first consumer use it as an in-process server-side module;
- keep storage and migration ownership product-local in wave 1.

Only later, if there is more than one real consumer or a clear operations reason, may it be extracted into a separate service.

### Compatibility bridge and migration sequencing

Required sequencing for governed-content convergence:
1. land the shared contract and compatibility adapters first;
2. apply additive schema changes only;
3. backfill or reconcile idempotently where physical shape changes are real;
4. prefer one writer plus compatibility reads over default dual-write;
5. remove legacy fields or terms only after verification parity and rollback inputs exist.

Rules:
- destructive renames or table swaps must not be the first migration step;
- product-local publication/storage truth may remain richer than the shared substrate;
- dual-write is exceptional, not the default first-wave migration shape.

## Verification contour

This protocol may not claim stronger closure than its verification contour can support.

| flow | primary anchors now | owner | minimum proof for stronger-than-`partial` closure |
| --- | --- | --- | --- |
| extraction bundle contract | this protocol, `SCN-177`, `T040-V1-report.md`, `verification-matrix.md` | platform | named command set and explicit bundle/readback proof |
| import lifecycle and idempotency | this protocol, `SCN-177`, workflow contract, product-local adoption protocol | shared contract in platform, overlay proof in product | at least one consumer-side proof of retry-safe import behavior |
| report/readback honesty | this protocol, `SCN-177`, and product-local import/readback docs | platform plus product | explicit degraded/unsupported evidence path |
| activation boundary and rollback | this protocol plus product-local publication protocol | product | product-local activation proof required before `adopted` status |
| governed UI surfaces | this protocol plus product-local UI-doc packet | product | sources/imports screens and automation docs updated in the same wave |

Scenario maturity rule:
- if an acceptance-critical anchor remains `planned`, the wave may remain `partial`;
- it must not be marked `implementation_proven` or `adopted` on that anchor alone.

## Documentation deliverables and MBB sync

Each material execution wave under this protocol must update the relevant Memory Bank surfaces in the same closure pass.

Minimum sync set:
- `PRT-040` itself;
- `current-status-report.md`;
- `verification-matrix.md` when the verification contour changes;
- `scenario-matrix.md` when scenario anchors or execution status change;
- affected product-local adoption protocols or boundary docs;
- affected product-local UI-doc packet where governed screens are introduced or changed.

MBB rule:
- this protocol is a curated execution contract and evidence sink, not a duplicate spec;
- scenario and status surfaces must be kept honest about `planned` vs runnable proof.

## Wave-1 runnable proof sync

Wave-1 shared governed-content/import execution is now partially landed in `bot-platform`:
- shared governed-content vocabulary, source-processing helpers, import-lifecycle/idempotency/conflict helpers, API read models, and package exports are implemented in the repo-local shared packages;
- `SCN-177` is the first flat framework-owned runnable anchor for this substrate;
- verifier evidence is recorded in `T040-V1-report.md` and accepted in `wave1-verifier-acceptance.md`.

Honesty rule:
- this is runnable local framework proof for the shared substrate only;
- it does not yet prove downstream Docoved or Seller adoption;
- it does not yet prove hosted readiness, product-local review UX, or product-local activation/cutover proof.

## Wave closure gates

| gate | required when | minimum proof |
| --- | --- | --- |
| local baseline | every code wave | current repo baseline command set, today at minimum `pnpm check` |
| scenario or verification gate | behavior changes | named verification row and scenario anchor, or explicit `N/A` with reason |
| CI gate | every code wave | green `Verification` workflow or successor canonical CI gate |
| hosted gate | runtime-facing ingest or protected-surface change | hosted-beta proof or explicit `N/A` with rationale |
| security and data gate | new governed artifact retention, source data exposure, or protected-surface change | explicit access/redaction/retention decision plus linked verification evidence |
| product adoption gate | claiming `adopted` | at least one linked product-local protocol or evidence packet proving adoption |
| status sync gate | any non-draft closure | current-status, verification, scenario, and affected product docs updated together |

Outcome rule:
- `design_landed` is not `implementation_proven`;
- `implementation_proven` is not `adopted`;
- `adopted` is not `archived`.

## Risks and mitigations

- Risk: over-generalizing Docoved semantics into the shared layer.
  - Mitigation: keep product interpretation, activation policy, and live truth local.
- Risk: admin chat becomes an unsafe editor for large content operations.
  - Mitigation: chat starts the workflow and reports status; it does not replace reviewable structured flows.
- Risk: a “source-processing product” gets created too early.
  - Mitigation: start with a contract and package seam first.
- Risk: `ImportReport` grows into an accidental new root entity without second-consumer proof.
  - Mitigation: treat it as a derived structured outcome/read model in wave 1.

## Key decisions / deviations

- The shared canon now excludes `ImportReport` as a mandatory standalone root and treats it as derived readback instead.
- The shared layer owns candidate revision lineage, not live product-serving truth.
- Service extraction is explicitly deferred behind a later multi-consumer and operations-justified gate.

## Evidence

- `PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `SCN-177-shared-governed-content-import-readback-contract.md`
- `persistence-interface-and-store-boundary.md`
- `workflow-framework-contract.md`
- `observability-and-incident-diagnostics.md`
- `trace-artifact-governance.md`
- `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/T040-V1-report.md`
- `.tasks/prt-038-wave1-shared-vocabulary-implementation/reports/wave1-verifier-acceptance.md`
- `docoved-memory-bank-publication-and-active-snapshot-model.md`
- `business-profile-publication-model.md`
- `.tasks/prt-038-phase1-review/reports/phase1-consolidated-review.md`

## Outcome

- Result: `partial`
- Current completion state: `implementation_in_progress`
- Follow-up needed:
  - prove at least one consumer-side retry-safe import path before claiming stronger-than-`partial` closure for the lifecycle contract;
  - land product-local governed UI-doc and review/activation evidence in the adopting repo before any adoption claim;
  - adopt the full flow in Docoved first without weakening its publication semantics;
  - reuse in SellerAgent only where the semantics truly match;
  - retire compatibility bridges only after additive migration proof and owner-side no-regression evidence.

## Memory Bank impact

- Hardened the governed-content/import protocol with authority, lifecycle, idempotency, rollback, observability, UI-doc, and closure rules.
- Narrowed the first-wave canon so derived report structures and optional abstractions do not overclaim shared ownership.
- Added explicit MBB-aligned documentation and verification sync obligations for future execution waves.
- Recorded the landed runnable-local verifier tranche so `SCN-177` and the accepted verifier reports are now first-class evidence for the shared governed-content/import substrate.
