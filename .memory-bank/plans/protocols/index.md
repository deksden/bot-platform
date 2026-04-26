---
file: .memory-bank/plans/protocols/index.md
description: 'Framework protocol hub for bot-platform.'
purpose: Hold cross-epic migration, extraction, and hardening protocols for the framework repo.
version: 0.18.0
date: 2026-04-26
status: ACTIVE
tags: [protocols, bot-platform, planning]
parent: .memory-bank/plans/index.md
history:
  - version: 0.18.0
    date: 2026-04-26
    changes: Recorded PRT-043 platform implementation progress for core command-framework contracts and channel-runtime threading/delivery summary contracts.
  - version: 0.17.0
    date: 2026-04-26
    changes: Added PRT-043 phase-2 implementation companion for subagent task packets, dependency graph, verification workflow, and local/hosted test lanes.
  - version: 0.16.0
    date: 2026-04-26
    changes: Marked PRT-043 phase-1 protocol review complete after subagent review reports and documentation hardening for ownership, boundary contracts, MBB routing, verification, release/rollback, and UI/DB scope.
  - version: 0.15.0
    date: 2026-04-26
    changes: Marked PRT-043 phase-0 protocol elaboration complete after hardening policy precedence, command normalization, safe failures, configuration compatibility, idempotency, anti-abuse, observability, and implementation task graph.
  - version: 0.14.0
    date: 2026-04-26
    changes: Added draft PRT-043 for channel interaction runtime covering actor-aware commands, canonical rendering, threading intent, outbound delivery intent, logging-first diagnostics, and Docoved/SellerAgent adoption.
  - version: 0.13.0
    date: 2026-04-25
    changes: Marked PRT-042 closed after the first-wave channel-runtime package, publish-readiness proof, Docoved mapping proof, SellerAgent readiness review, and Memory Bank lesson promotion landed.
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
- `PRT-043-channel-interaction-runtime-command-render-thread-delivery.md`
- `PRT-043-channel-interaction-runtime-implementation-plan.md`
- `PRT-043-channel-interaction-runtime-review-details.md`

Follow-up protocol families will likely include:
- package publication and release;
- framework extraction seam maps.

Current rule:
- `PRT-036` is the completed split protocol.
- `PRT-038` is the closed wave-1 umbrella protocol for the platform/product handoff.
- `PRT-039` and `PRT-040` are closed child protocols for the wave-1 shared control-plane and governed-content/import substrata.
- `PRT-041` is the closed dependency-boundary cleanup protocol after the handoff; it removed Docoved accidental dependencies on SellerAgent package namespaces and classified retained future extraction questions.
- `PRT-042` is the closed first-wave shared channel-runtime protocol. It landed the `@dd-bot-platform/channel-runtime` package, local publish-readiness proof, Docoved mapping proof, SellerAgent readiness review, and Memory Bank lesson promotion. Command/delivery orchestration remains deferred until a later protocol opens it.
- `PRT-043` is the draft follow-up protocol for channel interaction runtime. Phase-2 implementation planning is complete and the first platform code slice has landed: typed command-framework contracts in `@dd-bot-platform/core` plus provider-neutral threading/delivery summary contracts in `@dd-bot-platform/channel-runtime`. Product adoption, hosted beta scenarios, and any package release/publish flow remain gated follow-up work. Subagent execution rules live in `PRT-043-channel-interaction-runtime-implementation-plan.md`; detailed phase-1 tables live in `PRT-043-channel-interaction-runtime-review-details.md`.
- future SellerAgent, Docoved, or shared-substrate expansion outside channel-runtime should open a new protocol rather than extending the closed `PRT-038` or `PRT-041` packets.
