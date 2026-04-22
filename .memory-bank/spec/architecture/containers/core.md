---
file: .memory-bank/spec/architecture/containers/core.md
description: 'Core container contract for framework execution semantics, workflow-family runtime behavior, canonical result intents, and trace-shape ownership.'
purpose: Read when refactoring runtime behavior so execution semantics stay in canonical framework owners and do not drift into adapters or persistence code.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
c4_level: L2
tags: [architecture, container, core, runtime, execution-kernel]
parent: .memory-bank/spec/architecture/containers/index.md
related_files:
  - .memory-bank/spec/architecture/container-architecture.md
  - .memory-bank/spec/architecture/dependency-and-placement-rules.md
  - .memory-bank/spec/architecture/containers/server.md
  - .memory-bank/spec/architecture/containers/db-and-projections.md
  - .memory-bank/spec/architecture/containers/workflow-host.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
history:
  - version: 0.1.0
    date: 2026-04-22
    changes: Migrated and reframed the core container architecture into bot-platform as framework-only execution ownership guidance under PRT-036 Wave 151.
---

# Core Container

## Role

`packages/core` is the canonical owner of framework execution semantics.

It owns:
- execution-kernel behavior;
- workflow-family orchestration semantics;
- canonical result and intent shaping;
- canonical runtime trace payload semantics.

## Must own

- execution status meaning and lifecycle transitions;
- canonical execution contract behavior;
- canonical result/intent semantics;
- runtime validation semantics.

## Must not own

- transport protocol parsing;
- webhook/API adapter behavior;
- persistence implementation details;
- product-specific domain behavior as framework truth.

## Owner split

- `packages/core` owns runtime semantics.
- server/adapters own transport normalization and delivery materialization.
- persistence containers own rows/migrations/projections and storage mechanics.

## Allowed interactions

- may consume contract shapes from `packages/api-contract`;
- may call persistence interfaces through explicit contracts;
- may expose coarse commands used by workflow-host orchestration.

## Forbidden interactions

- must not keep parallel semantic behavior just for one surface;
- must not push semantic ownership into adapter-local helpers;
- must not treat compatibility seams as canonical runtime ownership.

## Current convergence direction

As extraction continues, `packages/core` should converge toward:
- one canonical execution path per capability;
- typed execution request/context contracts;
- explicit workflow-family boundaries;
- stable result intent and trace contracts.

## Container contract

Inputs from outer layers:
- canonical execution request;
- binding/context references;
- policy/model context through framework contracts.

Outputs to outer layers:
- canonical execution result;
- canonical result intents;
- canonical trace payloads ready for persistence and evidence.
