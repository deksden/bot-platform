---
file: .memory-bank/spec/architecture/system-context.md
description: 'L1 system context for bot-platform as a framework system consumed by product repositories.'
purpose: Read before container-level design to understand framework boundaries, external actors, and external dependencies.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
c4_level: L1
tags: [architecture, system-context, c4, bot-platform, framework]
parent: .memory-bank/spec/architecture/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/project/feature-area-boundaries.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Landed the repo-local framework system-context packet in bot-platform with explicit framework vs product boundary framing (PRT-036 Wave 115).
---

# System Context

## System under discussion

System: `bot-platform` framework.

This system provides reusable contracts and runtime foundations that product repositories consume.

It owns:
- framework architecture and boundary contracts;
- reusable runtime and persistence interfaces;
- framework package and SDK surfaces;
- shared scenario/evidence foundations.

It does not own product behavior.

## External actors

### `framework maintainer`

Defines and evolves framework contracts, package boundaries, and architecture docs.

### `product engineer`

Consumes framework packages/contracts in product repos and reports boundary gaps found during integration.

### `release operator`

Publishes framework packages and validates release compatibility for downstream product consumers.

### `review/verification agent`

Runs scenario and contract checks that protect framework invariants across extraction waves.

## External systems

### `product repositories`

Independent product codebases that import framework packages and implement product semantics.

### `package registry`

External package distribution system used to publish framework packages consumed by product repos.

### `CI/CD systems`

External automation systems that run build, verification, and release workflows.

### `runtime providers`

External infrastructure and provider systems (for example model providers, hosting vendors, or managed data services) accessed through framework contracts and product-owned adapters.

## Framework boundary

Inside `bot-platform`:
- framework contracts and kernels;
- framework runtime vocabulary;
- framework packaging and placement rules;
- shared scenario/evidence contracts;
- framework architecture and planning SSoT.

Outside `bot-platform`:
- product-specific runtime semantics;
- product channel/transport deployment overlays;
- product schemas, runbooks, and secrets;
- product operator workflows.

## Context diagram

```text
┌────────────────────────────────────────────────────────────────┐
│                   bot-platform framework                      │
│                                                                │
│   Architecture SSoT   Runtime Contracts   Package Surfaces     │
│   Boundaries/Rules    Kernel/Persistence  SDK/Scenario System  │
└────────────────────────────────────────────────────────────────┘

 framework maintainer ───────────────► framework ◄──────────── product engineer
        release operator ────────────► framework ◄────────── verification agent

 product repositories ◄────────────── consumes ────────────── framework packages
 package registry   ◄────────────── publish/resolve ───────── framework repo
 CI/CD systems      ◄──────────── verify/build/release ────── framework repo
 runtime providers  ◄──────── adapter contracts ───────────── product/runtime
```

## Architectural consequences

- Framework docs and packages must stay product-neutral by default.
- Product repos may implement transport/domain specifics, but should consume framework contracts for shared seams.
- Framework contracts should describe extension points, not embed product lifecycle semantics.
- Cross-repo compatibility may use explicit temporary seams, but canonical ownership must converge to one framework source of truth.
