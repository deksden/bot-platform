---
file: .memory-bank/spec/architecture/architecture-guardrails.md
description: 'Framework architecture guardrails for bot-platform: non-negotiable boundaries for runtime ownership, thin surfaces, and container interaction discipline.'
purpose: Read before architecture changes and large refactors to keep framework boundaries stable and prevent product/runtime drift into the wrong containers.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
c4_level: L1
tags: [architecture, guardrails, framework, modular-monolith, boundaries]
parent: .memory-bank/spec/architecture/index.md
related_files:
  - .memory-bank/spec/architecture/index.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/architecture/container-architecture.md
  - .memory-bank/spec/architecture/dependency-and-placement-rules.md
  - .memory-bank/spec/architecture/containers/index.md
  - .memory-bank/spec/project/agent-execution-platform-architecture.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
history:
  - version: 0.1.0
    date: 2026-04-22
    changes: Migrated and reframed framework architecture guardrails into bot-platform as repo-local non-negotiable rules under PRT-036 Wave 151.
---

# Architecture Guardrails

## Purpose

This document defines non-negotiable framework architecture rules.
If a narrower document conflicts with these guardrails, the narrower document (or code) must be corrected.

## Platform shape rule

`bot-platform` remains a modular monolith with explicit boundaries.
Surface apps and adapters are containers over framework contracts, not independent semantic owners.

## Canonical boundary chain rule

Canonical chain for framework behavior:

`core -> api-contract -> client-sdk -> surfaces/adapters`

Meaning:
- execution semantics stay in canonical runtime owners;
- cross-boundary shape stays in contract owners;
- thin surfaces call contracts instead of owning behavior.

## One canonical path rule

One framework capability must have:
- one canonical input contract;
- one canonical execution path;
- one canonical result/intent contract;
- one canonical trace shape.

Parallel semantic paths for the same capability are architecture drift.

## Simplification-first rule

When dual ownership or duplicated semantics appear, fix order is:
1. identify canonical owner;
2. move semantics there;
3. keep outer layers thin;
4. remove duplicate path.

A new abstraction layer is not the default response to duplicated ownership.

## Thin-surface rule

Surface containers must not become second runtime cores.

Framework surfaces may:
- normalize transport/input;
- resolve context/binding;
- invoke canonical framework contracts;
- materialize outbound delivery.

Framework surfaces may not:
- own business/runtime semantics;
- redefine statuses/semantics locally;
- keep private semantic contracts that bypass canonical runtime owners.

## Runtime model rule

Canonical execution flow is:
1. normalize inbound request;
2. resolve binding/context;
3. execute canonical workflow family;
4. shape canonical result and intents;
5. persist canonical trace/evidence;
6. deliver through surface adapters.

The runtime must stay bounded, inspectable, and traceable.

## Compatibility seam rule

Compatibility seams are temporary migration aids only.
Every seam must have:
- explicit purpose;
- narrow scope;
- explicit retirement point.

Compatibility paths must not become permanent semantic owners.

## Persistence and observability rule

Framework contracts require:
- one canonical execution trace model;
- one canonical result/intent semantics model.

Read models/projections may optimize reads, but must not redefine runtime semantics.

## Workflow-host rule

Workflow-host containers own durable/background orchestration.
They do not own primary runtime semantics or transport API behavior.

## Change-discipline rule

Significant architecture changes must:
- update owning spec docs;
- use protocol-based tracking for cross-epic migration/refactoring waves;
- include scenario/contract evidence where runtime behavior changes.
