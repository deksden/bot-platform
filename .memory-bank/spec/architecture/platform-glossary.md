---
file: .memory-bank/spec/architecture/platform-glossary.md
description: 'Canonical glossary for framework terms, ownership boundaries, and runtime vocabulary in bot-platform.'
purpose: Read when naming framework contracts, packages, and architecture docs so terminology stays stable across extraction waves.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
c4_level: L1
tags: [architecture, glossary, terminology, bot-platform, framework]
parent: .memory-bank/spec/architecture/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Landed the repo-local framework glossary packet in bot-platform with product-neutral ownership and runtime terms (PRT-036 Wave 115).
---

# Platform Glossary

## Scope

This glossary defines canonical framework vocabulary for `bot-platform`.

If code or docs use these terms with conflicting meaning, treat it as architecture drift and correct the owner document.

## System and ownership terms

### `framework platform`

The reusable architecture and package surface owned by `bot-platform`.

It includes:
- framework contracts and kernels;
- shared SDK and scenario-system surfaces;
- framework-level architecture and runtime documentation.

It does not include product business semantics.

### `framework repo`

The monorepo that owns framework truth (`bot-platform`).

### `product repo`

A separate monorepo that owns one product's runtime/business truth and consumes framework packages.

### `framework-owned truth`

Contracts, vocabulary, and behavior that remain valid across multiple products and do not require one product's domain meaning.

### `product-owned truth`

Behavior, lifecycle, schemas, and operations specific to one product.
This must stay in product repos, not in `bot-platform`.

### `canonical owner`

The single package or document that defines one semantic concern.

Rule:
- one concern, one owner;
- wrappers/adapters may render or invoke;
- wrappers/adapters must not redefine the semantic meaning.

### `compatibility seam`

A temporary bridge used during migration so old and new ownership models can coexist while preserving behavior.
It has explicit expiry intent and is not target architecture.

## Runtime and contract terms

### `execution kernel`

The framework runtime center that executes workflow families through normalized contracts.

### `workflow family`

A canonical execution behavior class selected through framework contracts (not raw transport details).

### `execution request`

Normalized kernel input with actor/context identity, selected workflow family, and policy context.

### `execution result`

Normalized kernel output with decision payload, artifacts, intents, verifier output, and traces.

### `result intent`

A transport-agnostic post-execution effect request (for example send, create, schedule, or state update).

### `execution trace`

Normalized run/step/attempt evidence for one execution lifecycle.

### `channel adapter`

A thin boundary adapter that normalizes inbound events and materializes outbound delivery around canonical runtime contracts.

### `persistence interface`

A framework-owned repository/store contract consumed by runtime/framework packages.
It is separate from concrete table design and query implementation.

### `projection/read model`

A persistence-optimized read surface derived from canonical runtime semantics.
It may denormalize data but must not redefine semantic meaning.

## Packaging and boundary terms

### `framework package`

A package under the canonical framework scope `@dd-bot-platform/*`.

### `product package`

A package under a product scope (for example `@selleragent/*` or `@docoved-agent/*`) that remains product-owned.

### `support package`

A cross-cutting framework helper package (observability/config/prompts style) that must stay product-neutral and must not absorb domain ownership.

### `cross-boundary contract`

A stable DTO/interface shape that crosses package or service boundaries.
Its home is contract-focused surfaces, not storage-row or adapter-local implementation files.

## Temporary compatibility vocabulary

Legacy mixed-repo identifiers may appear in compatibility code/docs during migration.
They are allowed only as transitional terms and are not canonical framework naming.
