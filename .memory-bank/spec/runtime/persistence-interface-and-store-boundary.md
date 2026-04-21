---
file: .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
description: 'Framework runtime contract for persistence interfaces, repository/store ownership split, projection constraints, and boundary-level error/idempotency/transaction expectations.'
purpose: Read when defining or reviewing framework-facing repositories and DTOs so contract truth stays outside concrete store implementations.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [runtime, persistence, repositories, dto, projections, boundaries, bot-platform]
parent: .memory-bank/spec/runtime/index.md
related_files:
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/project/feature-area-boundaries.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Initial repo-local framework persistence interface and store-boundary contract for PRT-036 Wave 104.
---

# Persistence Interface And Store Boundary

## Goal

Define framework-level persistence rules so reusable runtime contracts stay stable even when storage engines, table layouts, or projection strategies evolve.

## Ownership split

Framework-owned truth:
- repository and store interface contracts that runtime/framework packages consume;
- stable DTO shapes crossing framework package boundaries;
- boundary rules for projection semantics, error classes, idempotency, and transaction behavior.

Store-owned truth:
- concrete SQL/NoSQL schemas, migrations, indexes, and query plans;
- serialization details and storage-engine optimization;
- implementation-specific performance tuning.

Rule:
- storage implementations may satisfy framework contracts, but must not become the only canonical definition of those contracts.

## Contract placement rules

Stable interface and DTO placement:
- place shared repository interfaces in framework-owned packages/docs, not inside one concrete persistence package;
- place stable DTO and filter/pagination contracts beside the owning feature area contract (`runtime-kernel`, `workflow-framework`, `client-contracts`, or another framework area);
- keep implementation-only row/entity shapes local to persistence implementations.

Anti-pattern:
- importing storage-row types as application-level truth across packages.

Expected layering:
1. Framework contract package defines interface + stable DTO.
2. Store implementation package maps contract DTO <-> storage row shape.
3. Product/service layer depends on contract package, not directly on storage rows.

## Projection and read-model constraints

Projection/read-models are allowed for runtime-read efficiency, but they must not redefine framework runtime semantics.

Required constraints:
- projection status/value labels must be derived from canonical domain/runtime semantics, not invented by storage convenience;
- projection docs and code must declare source-of-truth inputs and refresh/update behavior;
- a projection can denormalize and precompute, but cannot silently change the meaning of lifecycle state, intent, or trace semantics.

Boundary rule:
- framework contracts describe projection capabilities (`get`, `list`, `lookup`, filters, ordering) without prescribing one physical projection table design.

## Error contract at the persistence boundary

Framework-facing repositories should expose normalized error classes:
- `NotFound` for missing entities when absence is exceptional;
- `Conflict` for uniqueness/version/ownership invariant violations;
- `Validation` for contract-level input violations detected before write;
- `Unavailable` for transient infrastructure failures (timeouts, connectivity).

Rules:
- raw driver/SQL errors should be translated before crossing framework boundaries;
- persistence interfaces should document which methods are nullable-return vs exception-on-missing;
- ownership-invariant violations are contract errors, not hidden retries.

## Idempotency expectations

For writes triggered by retries, callbacks, or replay:
- every upsert/create-by-key surface must define its idempotency key or natural key;
- repeated submissions for the same semantic operation should converge to one logical record/effect;
- idempotency behavior must be explicit in the interface contract (`create`, `upsert`, `activate`, `appendIfAbsent`, etc.).

For activation/state-cutover flows:
- only one logical active state may be committed per scope where the contract demands singleton activity;
- retrying the same verified operation should be safe and non-duplicative.

## Transaction expectations

Framework contracts should define atomicity intent, not SQL syntax.

Required at boundary docs/interfaces:
- identify operations that must be atomic as one unit;
- identify acceptable eventual-consistency windows for projection/read-model updates;
- state whether cross-entity invariants require one transaction boundary or compensating workflow logic.

Rule of thumb:
- if partial write breaks framework invariants, contract must require atomic commit behavior from implementation.

## Product-owned truth that stays out of framework canon

Product repos still own:
- product table schemas and migration rollout procedure;
- product-specific entity vocabularies and lifecycle semantics;
- environment-specific deployment/runbook details;
- product-specific projection payload shape where not reused by at least two products.

`bot-platform` should capture only reusable persistence interface patterns and boundary guarantees.

## Review checklist for new persistence surfaces

- Is the interface contract defined outside concrete store implementation?
- Are stable DTOs free from storage-row leakage?
- Are projection semantics explicitly derived from canonical runtime semantics?
- Are error classes normalized at the boundary?
- Is idempotency behavior explicit for retried/replayed flows?
- Is atomicity/eventual-consistency expectation stated?
- Does the doc avoid product schema and deployment specifics?
