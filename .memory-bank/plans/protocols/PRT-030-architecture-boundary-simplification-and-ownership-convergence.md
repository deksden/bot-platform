---
file: .memory-bank/plans/protocols/PRT-030-architecture-boundary-simplification-and-ownership-convergence.md
description: Framework-owned architecture protocol for simplifying runtime boundaries, converging ownership language, and reducing transitional seam drift across the split program.
purpose: Keep repo-local planning truth for architecture-boundary simplification so follow-on extraction and migration work under PRT-036 stays aligned to one canonical framework packet.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
epic: EP-022
tags: [protocol, architecture, refactor, ownership, simplification, cross-epic, bot-platform]
parent: .memory-bank/plans/protocols/index.md
related_files:
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
  - .memory-bank/plans/current-status-report.md
  - .memory-bank/plans/epics/framework-epic-map.md
  - .memory-bank/plans/epics/framework-feature-registry.md
  - .memory-bank/plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md
  - .memory-bank/spec/architecture/index.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/architecture/platform-glossary.md
  - .memory-bank/spec/architecture/container-architecture.md
  - .memory-bank/spec/architecture/dependency-and-placement-rules.md
  - .memory-bank/spec/architecture/containers/workflow-host.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Landed PRT-030 as repo-local framework planning truth in bot-platform; reframed links and ownership anchors to existing bot-platform Memory Bank equivalents.
---

# Protocol: Architecture Boundary Simplification And Ownership Convergence

## Purpose

This protocol keeps the accepted architecture-boundary simplification program as framework-owned planning truth in `bot-platform`.

It exists so split-wave implementation and follow-up planning can stay aligned to one canonical repo-local packet, instead of drifting across mixed-source historical references.

## Framework ownership framing

This is a framework protocol. It governs:
- framework boundary rules;
- framework runtime and composition seam simplification;
- framework terminology and ownership anchors.

It does not make product-local execution behavior canonical in `bot-platform`.
Product-specific implementation details remain in product repos.

## Scope of this cycle

### In scope

- converge runtime entry patterns toward one canonical execution path per use case class;
- collapse duplicated runtime assembly and binding helpers where they violate framework boundary intent;
- keep server/workflow host layers thin and composition-focused;
- converge live ownership language around `workspaceRef` and `productInstanceRef` per `ADR-004`;
- reduce metadata-bag runtime dependency wiring in favor of typed request/context contracts;
- decompose transitional shared/support drift that still hides live domain ownership;
- keep support packages (`prompt-catalog`, `platform-config`, related support helpers) inside support scope;
- keep `knowledgeSourceRef` as canonical hosted runtime selector, with raw paths constrained to local/debug harnesses;
- preserve a packetized implementation and verification shape for bounded migration waves.

### Out of scope

- new product-facing feature delivery by itself;
- introducing another control-plane rewrite;
- permanent compatibility ownership for retired anchor models;
- turning framework planning docs into product execution logs.

## Inputs

- Repo-local framework SSoT:
  - [.memory-bank/spec/architecture/index.md](../../spec/architecture/index.md)
  - [.memory-bank/spec/architecture/boundaries.md](../../spec/architecture/boundaries.md)
  - [.memory-bank/spec/architecture/dependency-and-placement-rules.md](../../spec/architecture/dependency-and-placement-rules.md)
  - [.memory-bank/spec/project/feature-area-boundaries.md](../../spec/project/feature-area-boundaries.md)
  - [.memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md](../../spec/runtime/pipeline-registry-and-binding-contract.md)
  - [.memory-bank/plans/adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md](../adr/ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md)
  - [PRT-036](PRT-036-platform-framework-and-product-repo-split.md)
- Framework planning anchors:
  - [.memory-bank/plans/epics/framework-epic-map.md](../epics/framework-epic-map.md)
  - [.memory-bank/plans/epics/framework-feature-registry.md](../epics/framework-feature-registry.md)

## Open questions / required research

- Which remaining runtime seams still duplicate canonical execution path selection.
- Which ownership writes still bypass canonical workspace/product-instance terminology.
- Which support/shared packages still carry live domain semantics instead of framework-support contracts.
- Which workflow-host boundaries still act as fine-grained callback choreography rather than coarse durable commands.

## Security / rollout impact

- Exposure decision: `mixed`
- Auth/ownership impact: ownership convergence touches authority and binding resolution; fail-closed behavior remains mandatory.
- Rollback/containment: each migration wave keeps one tested compatibility anchor until parity proof is complete.
- Hosted verification gate: required for packets changing externally used execution, channel behavior, or runtime binding resolution.

## Execution summary

1. Keep accepted architecture-boundary findings durable and repo-local.
2. Prefer simplification and path collapse over adding new abstraction layers.
3. Converge ownership and typed execution contracts toward canonical framework language.
4. Decompose transitional shared/support drift and tighten package boundary ownership.
5. Retire temporary compatibility seams only after local and hosted parity proof.

## Key decisions / deviations

- Simplification is primary; new abstraction is not the default response.
- One live use case should map to one canonical execution path and trace path.
- Server/workflow surfaces stay composition-oriented, not hidden runtime centers.
- `workspaceRef` and `productInstanceRef` remain canonical live ownership anchors.
- Metadata bags are transitional only and should not remain long-term runtime dependencies.
- Compatibility branches are time-boxed migration aids, not new steady-state architecture.

## Target state after this protocol

When this protocol is complete:
- framework boundary docs, terminology, and migration packets align on one ownership model;
- duplicate runtime assembly/binding paths are reduced;
- typed execution context replaces the highest-risk metadata-bag seams;
- shared/support drift is explicitly reduced and owned by the right framework areas;
- compatibility seams are explicit, shrinking, and removable.

## Implementation waves

### Wave 0: Grounding and durable planning

Goal:
- keep review findings and migration logic durable in framework-owned planning artifacts.

### Wave 1: Canonical execution-path and server/workflow collapse

Goal:
- reduce duplicate runtime assembly and thin composition hosts.

### Wave 2: Ownership convergence and typed execution context

Goal:
- align writes and runtime binding around canonical ownership anchors and typed contracts.

### Wave 3: Shared/support decomposition and namespace convergence

Goal:
- move live domain semantics out of transitional shared/support ownership.

### Wave 4: Selector/workflow/surface boundary simplification

Goal:
- keep hosted selection on canonical selectors and keep workflow invocations coarse.

### Wave 5: Legacy seam retirement and closeout

Goal:
- remove temporary compatibility seams after parity proof.

## Work packet decomposition

### Packet group A: Planning and inventory

- `A1` protocol grounding and evidence map
- `A2` ownership-write inventory
- `A3` namespace and package-boundary inventory

### Packet group B: Execution-path and composition simplification

- `B1` duplicate execution-path collapse
- `B2` transport/surface adapter thinning
- `B3` trace/readback path convergence
- `B4` server/workflow helper retirement where ownership is misplaced

### Packet group C: Ownership and typed context

- `C1` seller-era anchor inventory
- `C2` canonical ownership-write convergence
- `C3` typed execution-context replacement for high-risk metadata seams

### Packet group D: Package decomposition

- `D1` `shared` semantics extraction
- `D2` support-package scope cleanup
- `D3` namespace convergence packetization

### Packet group E: Selector/workflow/surface cleanup

- `E1` canonical selector convergence (`knowledgeSourceRef` pathway)
- `E2` workflow-host command-boundary simplification
- `E3` surface invocation convergence onto canonical contracts

### Packet group V: Verification

- `V1` local parity proof
- `V2` hosted beta proof for touched externally used paths
- `V3` compatibility seam retirement validation

## Subagent execution policy

If executed through subagents:
- each packet has narrow write scope;
- each implementation packet is independently reviewed before dependent packets start;
- non-overlapping packets may run in parallel;
- evidence is written back into durable protocol/feature/spec docs, not left in ephemeral chat output.

## Run-folder and report contract

When this protocol is executed through subagents, use one run root:

`/Users/deksden/Documents/_Projects/bot-platform/.codex/tasks/prt-030-execution-<run-id>/`

Recommended structure:
- `briefs/impl/`
- `briefs/verify/`
- `reports/impl/`
- `reports/verify/`
- `summary/`

Minimum report contract for every packet:
- packet id
- sources read
- code/docs touched
- checks run
- result against acceptance criteria
- blockers or follow-ups
- explicit next recommendation: `accept_and_commit | accept_with_fixup | rework | blocked`

## Recommended launch batches

Suggested order:
1. `Batch 0` — research and inventory (`R-030-10..13`, then `RV-030-10`)
2. `Batch 1` — first bounded coding and review (`P-030-10`, `V-030-10`, then `P-030-20`, `V-030-20`)
3. `Batch 2` — server/runtime convergence slices (`P-030-21`, `V-030-21`, `P-030-11`, `V-030-11`)
4. `Batch 3` — package decomposition (`P-030-30..32` with paired `V-*`)
5. `Batch 4` — selector/workflow cleanup (`P-030-40`, `P-030-41`, with `V-*`)
6. `Batch 5` — surface convergence (`P-030-42`, `V-030-42`)
7. `Batch 6` — integrated local acceptance (`V-030-90`)
8. `Batch 7` — hosted closeout proof (`H-030-01`, `H-030-02` when relevant)

## Commit and push policy

- local commits after each accepted packet or tightly related packet set;
- push deferred until a hosted verification gate needs deployed code;
- hosted checks confirm local acceptance, not discover baseline drift.

## Verification contour

### Wave-to-proof rule

Before compatibility-seam retirement:
- canonical execution path proof for touched slices;
- ownership-write and binding-convergence proof where ownership changed;
- package-boundary proof where decomposition/namespace changed;
- selector/workflow/surface proof where those boundaries were touched;
- hosted verification for externally used changed paths.

### Local proof

Required before push:
- canonical-path entry proof;
- parity checks across touched API/channel surfaces;
- regression checks for ownership/binding behavior;
- targeted tests for extracted modules and removed duplicate helpers.

### Beta proof

Required before closure of externally visible packets:
- reviewed commit set deployed to beta;
- touched externally used surfaces validated;
- trace inspection confirms canonical path use.

### Prod proof

Required only for packets materially changing active production execution paths.

## Evidence

- this protocol document as the framework-owned packet anchor;
- [PRT-036](PRT-036-platform-framework-and-product-repo-split.md) as split governance envelope;
- [.memory-bank/plans/current-status-report.md](../current-status-report.md) for ongoing landed/not-landed framing.

Historical mixed-source packet artifacts remain archival context, not repo-local owner documents for `bot-platform`.

## Outcome

- Result: `follow_up_needed`
- Follow-up needed:
  - implementation packets for Waves 1 through 5 require bounded execution and verification evidence;
  - remaining ownership/namespace/runtime seam inventories should be refreshed before broad extraction waves.

## Memory Bank impact

- adds `PRT-030` as canonical repo-local framework planning truth in `bot-platform`;
- strengthens protocol linkage between architecture boundaries, ownership terminology, and split execution;
- keeps future follow-up updates anchored to framework-owned docs and existing repo-local planning hubs.
