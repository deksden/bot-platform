---
file: .memory-bank/spec/architecture/container-architecture.md
description: 'L2 framework container map for bot-platform: container roles, ownership boundaries, and allowed interactions.'
purpose: Read when designing or refactoring framework packages/apps so ownership stays clean and product semantics do not drift into framework containers.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [architecture, containers, ownership, boundaries, bot-platform]
parent: .memory-bank/spec/architecture/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/architecture/containers/index.md
  - .memory-bank/spec/architecture/containers/workflow-host.md
  - .memory-bank/spec/project/repo-structure.md
  - .memory-bank/spec/project/feature-area-boundaries.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Landed the repo-local framework container architecture packet in bot-platform with product-neutral ownership rules (PRT-036 Wave 115).
---

# Container Architecture

## Goal

Define framework container roles in `bot-platform` so reusable contracts and kernels have clear owners and product semantics stay in product repos.

## What is not a container

These are important architecture concepts but not containers:
- product domains and business entities;
- package scopes by themselves;
- local folder labels like `support`, `helpers`, or `bridge`.

Naming alone never creates ownership rights.

## Canonical framework containers

### `packages/api-contract`

Role:
- cross-boundary contracts;
- operation and envelope shapes;
- framework namespace definitions.

Must not own:
- product domain behavior;
- storage implementation details.

### `packages/scenario-system`

Role:
- shared scenario vocabulary;
- framework evidence and verification helpers;
- reusable semantic-eval support utilities.

Must not own:
- product-specific scenario behavior as canonical framework truth.

### `packages/core` (target extraction container)

Role:
- execution-kernel semantics;
- reusable workflow/auth/command framework seams;
- framework runtime contracts that remain product-neutral.

Must not own:
- product business lifecycle semantics.

### `packages/client-sdk` (target extraction container)

Role:
- typed client invocation boundary for framework operations.

Must not own:
- product-local SDK overlays and product behavior policy.

### `packages/observability`, `packages/platform-config`, `packages/prompt-catalog` (target support containers)

Role:
- cross-cutting framework support capabilities.

Must not own:
- domain/runtime ownership that belongs to `core` or `api-contract`.

### `apps/workflow-host` (container contract already defined)

Role:
- durable/background orchestration host for framework-level workflow contracts.

Must not own:
- product answer semantics;
- transport API ownership.

See: [Workflow host container](containers/workflow-host.md).

### `apps/cli` and `apps/verification` (optional framework surfaces)

Role:
- framework-maintainer ergonomics, diagnostics, and verification entrypoints.

Must not own:
- duplicate runtime semantics already owned by framework packages.

## Current state note

`bot-platform` is in staged extraction.
Some containers are already represented in code, while others are represented first as contract/docs targets.
This is acceptable as long as ownership direction remains consistent with this map.

## Container interaction model

```text
framework maintainer tools/apps
        │
        ├────────► packages/client-sdk ───────► packages/api-contract
        │
        └────────► apps/workflow-host ────────► packages/core
                                               ├────────► packages/api-contract
                                               └────────► persistence/support contracts

packages/scenario-system ───────────────► packages/api-contract (where cross-boundary shape is needed)
```

## Key invariants

- Framework execution semantics should converge to one canonical owner (`packages/core`) as extraction progresses.
- `api-contract` owns shape contracts, not behavior semantics.
- Support packages provide cross-cutting primitives and must stay product-neutral.
- Container contracts in `bot-platform` define reusable framework truth; product behavior remains in product repos.
