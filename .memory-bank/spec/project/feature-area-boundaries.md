---
file: .memory-bank/spec/project/feature-area-boundaries.md
description: 'Framework feature-area boundaries for bot-platform.'
purpose: Define which framework areas bot-platform owns and where product repos must take over.
version: 0.1.0
date: 2026-04-19
status: DRAFT
tags: [feature-areas, boundaries, bot-platform, framework]
parent: .memory-bank/spec/project/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/repo-structure.md
history:
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial framework feature-area boundary map created from the current mixed source and the PRT-036 ownership model.
---

# Feature Area Boundaries

## Principle

`bot-platform` owns framework feature areas, not product domains.

This repo answers:
- what framework capability exists;
- what contract it exposes;
- what product repos may import from it.

It does not answer:
- how SellerAgent behaves as a product;
- how Docoved behaves as a product.

## Framework-owned areas

### `runtime-kernel`

Owns:
- execution kernel;
- provider adapters;
- pipeline registry;
- prompt manager;
- turn-analysis and decision-envelope contracts.

### `auth-framework`

Owns:
- principal/session/invite/membership vocabulary;
- access decision semantics;
- auth hooks and guards;
- framework auth extension points.

### `command-framework`

Owns:
- command envelope and parser;
- command registry primitives;
- command execution hooks;
- projection hooks and diagnostics patterns.

### `workflow-framework`

Owns:
- host/start/callback contracts;
- retry and resumability rules;
- health and manifest contracts;
- workflow S2S auth vocabulary.

### `client-contracts`

Owns:
- operation catalog plumbing;
- API namespace registry;
- success/error envelopes;
- SDK base transport layer.

### `scenario-system`

Owns:
- scenario taxonomy;
- evidence and hosted-verification classes;
- shared runner and generic fixture tooling.

### `persistence-interfaces`

Owns:
- framework-facing persistence contracts;
- trace/workflow correlation vocabulary;
- store boundary rules.

### `support-packages`

Owns:
- observability helpers;
- platform config helpers;
- shared prompt infrastructure;
- other package-level support that remains product-agnostic.

## Explicit non-owners

These areas do not belong to `bot-platform` as product truth:
- `customers`
- `catalog`
- `commerce`
- `memory`
- `handoff`
- `followups`
- Docoved `knowledge-publication` as product behavior
- Docoved `grounded-answering` as product behavior

Framework overlap is allowed only at the contract level.

## Promotion rule

Code or docs graduate into `bot-platform` only when:
1. they are genuinely product-agnostic, or
2. they already have at least two real product consumers.

Otherwise they remain product-local.

## Current risky seams to resolve before broad extraction

- `packages/core`
- `packages/api-contract`
- `packages/client-sdk`
- `apps/server` framework host glue
- `apps/workflow` framework helpers
- mixed-source `packages/scenario-runner` to target `packages/scenario-system`
- `packages/shared`

These areas must be split by seam first, not moved wholesale.
