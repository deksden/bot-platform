---
file: .memory-bank/spec/runtime/index.md
description: 'Runtime hub for bot-platform.'
purpose: Hold framework runtime contracts for kernels, providers, pipelines, prompts, workflow, auth, command, and shared scenario-system layers.
version: 0.11.0
date: 2026-04-26
status: DRAFT
tags: [runtime, bot-platform, contracts]
parent: .memory-bank/spec/index.md
children:
  - agent-execution-kernel.md
  - decision-explanation-envelope.md
  - execution-traces-and-token-accounting.md
  - pipeline-registry-and-binding-contract.md
  - channel-runtime-contract.md
  - command-framework-contract.md
  - persistence-interface-and-store-boundary.md
  - trace-artifact-governance.md
  - scenario-system-framework-contract.md
  - workflow-framework-contract.md
target_audience: [developers, ai-agents]
automation_ready: true
history:
  - version: 0.11.0
    date: 2026-04-26
    changes: Recorded PRT-043 platform implementation slice for command-framework contracts in `@dd-bot-platform/core` and threading/delivery summary contracts in `@dd-bot-platform/channel-runtime`.
  - version: 0.10.0
    date: 2026-04-26
    changes: Noted that PRT-043 is the draft follow-up connecting channel-runtime and command-framework contracts for actor-aware commands, rendering, threading, and delivery intent.
  - version: 0.9.0
    date: 2026-04-25
    changes: Linked the first-wave channel-runtime contract for canonical response documents and minimal rendering primitives under PRT-042.
  - version: 0.8.0
    date: 2026-04-22
    changes: Added the repo-local workflow-framework and command-framework runtime contract docs and linked them from the runtime hub (PRT-036 Wave 158).
  - version: 0.7.0
    date: 2026-04-21
    changes: Added the framework decision-explanation-envelope runtime contract and linked it from the runtime hub (PRT-036 Wave 112).
  - version: 0.6.0
    date: 2026-04-21
    changes: Added the repo-local framework trace-artifact governance runtime contract and linked it from the runtime hub (PRT-036 Wave 111).
  - version: 0.5.0
    date: 2026-04-21
    changes: Added the framework execution-traces and token-accounting runtime contract and linked it from the runtime hub (PRT-036 Wave 110).
  - version: 0.4.0
    date: 2026-04-21
    changes: Added the framework persistence-interface and store-boundary runtime contract and linked it from the runtime hub (PRT-036 Wave 104).
  - version: 0.3.0
    date: 2026-04-21
    changes: Added repo-local runtime framework docs for execution kernel and pipeline registry/binding contract (PRT-036 waves 91-92 migration packet).
  - version: 0.2.0
    date: 2026-04-20
    changes: Added the first canonical scenario-system runtime contract and made the runtime hub explicitly own shared scenario-system framework rules.
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial runtime hub for bot-platform.
---

# Runtime Hub

This section is reserved for framework runtime contracts:
- execution kernel;
- provider adapters;
- pipeline registry;
- prompt manager and prompt contracts;
- conversation kernel abstractions;
- channel-neutral response document and rendering contracts;
- workflow framework;
- auth and command framework seams;
- persistence interfaces and store-boundary contracts;
- shared scenario-system framework contracts.

Product runtime overlays stay out of this repo.

## Current runtime docs

- [Agent execution kernel](agent-execution-kernel.md): defines the shared kernel contracts, workflow-family boundary, capability model, execution split, and trace requirements.
- [Channel runtime contract](channel-runtime-contract.md): defines canonical response documents, visibility, citations/source refs, minimal render-target vocabulary, threading intent, outbound delivery result-summary contracts, and exclusions for delivery orchestration, provider senders, DB, and UI.
- [Command framework contract](command-framework-contract.md): defines the framework-owned command envelope, parser/registry/dispatch primitives, actor/channel availability, machine-readable diagnostics, product-owned exclusions, and the first PRT-043 implementation slice in `@dd-bot-platform/core`.
- [Decision explanation envelope](decision-explanation-envelope.md): defines the framework-shared final-outcome explainability contract (`subject`, `final_outcome`, `summaries`, `decisive_factors`, `missing_requirements`, `provenance`) and projection boundaries.
- [Execution traces and token accounting](execution-traces-and-token-accounting.md): defines framework-owned run/step/attempt trace layers, artifact linkage, usage accounting fields, and the billing boundary.
- [Pipeline registry and binding contract](pipeline-registry-and-binding-contract.md): defines canonical pipeline definitions, channel binding validation, ownership boundaries, and pipeline defaults.
- [Persistence interface and store boundary](persistence-interface-and-store-boundary.md): defines reusable repository/interface ownership rules, stable DTO placement, projection constraints, and boundary-level idempotency/error/transaction expectations.
- [Trace artifact governance](trace-artifact-governance.md): defines framework policy for artifact kinds, selective heavy capture, redaction states, retention classes, and audited access boundaries.
- [Scenario system framework contract](scenario-system-framework-contract.md): defines the lean framework-owned scenario vocabulary, evidence contracts, semantic-eval rules, and product-owned exclusions.
- [Workflow framework contract](workflow-framework-contract.md): defines protected workflow host/start/callback/status vocabulary, internal auth expectations, lifecycle/durability rules, and explicit product-owned exclusions.
