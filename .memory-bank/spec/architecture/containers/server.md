---
file: .memory-bank/spec/architecture/containers/server.md
description: 'Server container contract for API/webhook/control-plane ingress, composition, and thin adapter responsibilities over canonical framework runtime contracts.'
purpose: Read when changing server-side adapters so ingress/delivery stays thin and does not become a second runtime semantics owner.
version: 0.1.0
date: 2026-04-22
status: ACTIVE
c4_level: L2
tags: [architecture, container, server, adapters, ingress, composition]
parent: .memory-bank/spec/architecture/containers/index.md
related_files:
  - .memory-bank/spec/architecture/container-architecture.md
  - .memory-bank/spec/architecture/dependency-and-placement-rules.md
  - .memory-bank/spec/architecture/containers/core.md
  - .memory-bank/spec/architecture/containers/workflow-host.md
  - .memory-bank/spec/runtime/agent-execution-kernel.md
  - .memory-bank/spec/runtime/pipeline-registry-and-binding-contract.md
history:
  - version: 0.1.0
    date: 2026-04-22
    changes: Migrated and reframed the server container architecture into bot-platform as framework-only thin-adapter and composition-root guidance under PRT-036 Wave 151.
---

# Server Container

## Role

The server container is:
- API and webhook ingress host;
- control-plane entry surface;
- composition root for runtime and persistence contracts;
- outbound delivery materialization layer.

## Allowed responsibilities

- parse and validate ingress payloads;
- authenticate transport/webhook requests;
- resolve binding/context for canonical execution;
- invoke canonical runtime contracts;
- materialize outbound transport envelopes;
- persist observability artifacts through canonical seams.

## Allowed interactions

- may call runtime owners for canonical execution behavior;
- may call persistence containers through explicit stores/repositories;
- may enqueue/invoke coarse workflow-host commands for durable background work.

## Forbidden responsibilities

- owning execution semantics;
- assembling a second workflow logic path;
- inventing local status semantics;
- keeping adapter-local trace truth that diverges from canonical trace contracts.

## Thin adapter rule

Preferred flow:
1. normalize inbound event;
2. resolve context/binding;
3. invoke canonical runtime path;
4. materialize delivery;
5. persist canonical observability artifacts.

Anything beyond this belongs to canonical runtime or contract owners.

## Naming rule

Local folder names (`support`, `helpers`, `bridge`) do not create ownership.
If behavior is reusable framework semantics, it belongs to canonical owners.

## Target shape guidance

Convergence target for server code:

```text
ingress/        # transport parsing and normalization
api/            # typed API and control-plane HTTP surfaces
composition/    # bootstrap and dependency assembly
delivery/       # outbound transport materialization
hosted-jobs/    # workflow-host bridges for durable/background execution
```
