---
file: .memory-bank/plans/protocols/index.md
description: 'Framework protocol hub for bot-platform.'
purpose: Hold cross-epic migration, extraction, and hardening protocols for the framework repo.
version: 0.12.0
date: 2026-04-25
status: ACTIVE
tags: [protocols, bot-platform, planning]
parent: .memory-bank/plans/index.md
history:
  - version: 0.12.0
    date: 2026-04-25
    changes: Noted that PRT-042 phase-3 planning now includes git-flow, CI/Vercel, hosted beta, backup/migration, and lessons/insights operating rules.
  - version: 0.11.0
    date: 2026-04-25
    changes: Noted that PRT-042 now includes a phase-2 implementation protocol and task workspace for subagent-based execution planning.
  - version: 0.10.0
    date: 2026-04-25
    changes: Linked PRT-042 to the new runtime channel-runtime contract and clarified that stable vocabulary belongs in specs while sequencing stays in the protocol.
  - version: 0.9.0
    date: 2026-04-25
    changes: Tightened PRT-042 hub wording after protocol review so the active scope is canonical response documents, minimal rendering primitives, and cross-repo adoption boundaries, with command/delivery orchestration deferred until the document seam is proven.
  - version: 0.8.0
    date: 2026-04-25
    changes: Added PRT-042 as the active framework protocol for the shared channel-runtime contract covering canonical response documents, channel renderers, adapters, and command registry primitives across Docoved and SellerAgent.
  - version: 0.7.0
    date: 2026-04-24
    changes: Marked PRT-041 closed after Docoved package graph cutover and retained-design classification.
  - version: 0.6.0
    date: 2026-04-24
    changes: Added PRT-041 as the active post-handoff dependency-boundary cleanup protocol.
  - version: 0.5.0
    date: 2026-04-24
    changes: Marked `PRT-038`, `PRT-039`, and `PRT-040` as closed for the wave-1 platform/product handoff after SellerAgent and Docoved linked downstream proof upstream.
  - version: 0.4.0
    date: 2026-04-23
    changes: Added PRT-039 and PRT-040 as detailed child protocols for the shared control-plane substrate and the governed-content/import substrate under the PRT-038 umbrella.
  - version: 0.3.0
    date: 2026-04-23
    changes: Added PRT-038 as the active post-split umbrella protocol for the three-layer product-line convergence program and product-protocol kickoff gate.
  - version: 0.2.0
    date: 2026-04-21
    changes: Added repo-local PRT-030 as an active framework-owned architecture-boundary simplification protocol alongside PRT-036.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial protocols hub bootstrap for bot-platform.
---

# Protocols Hub

This section holds framework execution protocols.

Protocol anchors:
- `PRT-030-architecture-boundary-simplification-and-ownership-convergence.md`
- `PRT-036-platform-framework-and-product-repo-split.md`
- `PRT-038-platform-product-line-convergence-and-shared-substrate-extraction.md`
- `PRT-039-shared-control-plane-access-channel-and-management-substrate.md`
- `PRT-040-governed-content-source-processing-and-workflow-backed-import-substrate.md`
- `PRT-041-cross-repo-contract-dependency-boundary-realignment.md`
- `PRT-042-channel-runtime-canonical-document-command-and-rendering.md`

Follow-up protocol families will likely include:
- package publication and release;
- framework extraction seam maps.

Current rule:
- `PRT-036` is the completed split protocol.
- `PRT-038` is the closed wave-1 umbrella protocol for the platform/product handoff.
- `PRT-039` and `PRT-040` are closed child protocols for the wave-1 shared control-plane and governed-content/import substrata.
- `PRT-041` is the closed dependency-boundary cleanup protocol after the handoff; it removed Docoved accidental dependencies on SellerAgent package namespaces and classified retained future extraction questions.
- `PRT-042` is the active shared channel-runtime protocol; its hardened first-wave scope is canonical response documents, minimal rendering primitives, reuse of existing framework vocabulary, and product adoption proof, while command/delivery orchestration stays deferred until the document seam is proven. Stable vocabulary belongs in `spec/runtime/channel-runtime-contract.md`; the protocol owns sequencing, subagent task graph, ops/devops gates, and closure criteria.
- future SellerAgent, Docoved, or shared-substrate expansion outside channel-runtime should open a new protocol rather than extending the closed `PRT-038` or `PRT-041` packets.
