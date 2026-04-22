---
file: .memory-bank/spec/architecture/containers/db-and-projections.md
description: 'Container contract for persistence, snapshots, projections, and execution-trace storage in framework architecture.'
purpose: Read when changing store/projection behavior so persistence stays explicit and does not absorb runtime semantics ownership.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
c4_level: L2
tags: [architecture, container, persistence, projections, traces]
parent: .memory-bank/spec/architecture/containers/index.md
related_files:
  - .memory-bank/spec/architecture/container-architecture.md
  - .memory-bank/spec/architecture/dependency-and-placement-rules.md
  - .memory-bank/spec/architecture/containers/core.md
  - .memory-bank/spec/runtime/persistence-interface-and-store-boundary.md
  - .memory-bank/spec/runtime/execution-traces-and-token-accounting.md
  - .memory-bank/spec/runtime/trace-artifact-governance.md
history:
  - version: 0.1.0
    date: 2026-04-22
    changes: Migrated and reframed the DB/projections container architecture into bot-platform as framework-only persistence boundary guidance under PRT-036 Wave 151.
---

# DB And Projections

## Role

This container owns persistence and projection mechanics:
- schema and migration mechanics;
- repositories/stores;
- snapshot projections;
- execution-trace storage;
- read-model implementations.

## Must own

- persistence truth for rows, migrations, indexes, and snapshots;
- normalized storage for runtime traces and artifacts;
- read-optimized projections exposed through explicit contracts.

## Must not own

- runtime semantic meaning;
- workflow behavior ownership;
- transport parsing or delivery behavior;
- stable application-level contract ownership by accident.

## Allowed interactions

- may implement repositories/stores consumed by runtime and adapter containers;
- may expose projection read models behind explicit framework contracts;
- may persist canonical traces and artifacts produced by runtime owners.

## Forbidden interactions

- must not redefine status/result semantics through projection shape;
- must not hide business decisions inside repository implementation details;
- must not become the only source of a cross-boundary contract.

## Key rule

Projection models may optimize reads but never redefine runtime truth.
Contract ownership stays with canonical runtime/contract containers; this container implements storage mechanics.
