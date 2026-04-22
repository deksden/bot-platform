---
file: .memory-bank/spec/architecture/containers/workflow-host.md
description: 'Workflow host container architecture: framework contract for durable orchestration, retries, and long-running background jobs.'
purpose: Read when designing workflow-host boundaries so orchestration remains a container concern and does not become a second runtime semantic owner.
version: 1.4.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [architecture, container, workflow, durable-jobs, orchestration, bot-platform]
parent: .memory-bank/spec/architecture/containers/index.md
related_files:
  - .memory-bank/spec/architecture/index.md
  - .memory-bank/spec/architecture/boundaries.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
  - .memory-bank/spec/project/feature-area-boundaries.md
history:
  - version: 1.4.0
    date: 2026-04-21
    changes: Migrated into bot-platform as a repo-local framework container contract under PRT-036 wave 98, with ownership framing and container-index linkage.
  - version: 1.3.0
    date: 2026-04-15
    changes: Linked workflow-host boundary to ingest-wave orchestration and store contracts to keep orchestration separate from semantic ownership.
  - version: 1.2.0
    date: 2026-04-14
    changes: Added explicit allowed/forbidden interactions and stronger navigation as an L2 container contract.
  - version: 1.1.0
    date: 2026-04-14
    changes: Added the coarse-command invocation rule so workflow-host stays orchestration-first.
  - version: 1.0.0
    date: 2026-04-14
    changes: Added the workflow-host container architecture and its orchestration-only role.
---

# Workflow Host Container

## Role

`workflow-host` owns durable and background orchestration:
- long-running jobs;
- fan-out/fan-in work;
- retries and resumable work;
- publication and quality refresh coordination.

## Must own

- execution of background workflow jobs;
- durable orchestration state;
- workflow-specific scheduling and retry mechanics;
- coordination of background activities owned by canonical runtime/contracts.

## Allowed interactions

- may invoke coarse commands exposed by canonical owners in framework packages;
- may receive enqueue/start requests from control-plane or server adapters;
- may coordinate background fan-out/fan-in over publication and quality workflows.

## Invocation rule

Workflow-host should invoke coarse commands through canonical owners.

It should not:
- choreograph fragmented callback chains into adapter internals;
- recreate product execution semantics locally;
- become a second API surface by accident.

## Must not own

- primary answer-generation semantics;
- product-specific runtime truth separate from framework contracts;
- transport/webhook parsing;
- control-plane HTTP API.

## Forbidden interactions

- must not depend on private server internals as its normal execution protocol;
- must not expose a second public API for runtime semantics;
- must not keep a second hosted selector or product-binding model.

## Current drift to remove

- workflow jobs that behave like remote scripting over server-owned internals;
- server files that act as workflow-host owners instead of invokers;
- product-specific execution logic embedded in orchestration code.

## Cross-product relevance

For product repos, this container is the right home for:
- quality refresh jobs;
- duplicate/staleness analysis fan-out;
- publication verification waves;
- server-owned ingest follow-up work once hosted orchestration is required;
- ingest-wave post-processing like rebalance evaluation and unresolved-reference retry, while semantic decisions stay in canonical owners.

It is not the right home for normal synchronous answer generation.
