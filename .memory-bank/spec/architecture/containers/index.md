---
file: .memory-bank/spec/architecture/containers/index.md
description: 'Container-level architecture index for framework execution, adapter, persistence, and surface containers in bot-platform.'
purpose: Read for container-level navigation after top-level architecture boundaries and before component-level split work.
version: 0.3.0
date: 2026-04-22
status: ACTIVE
c4_level: L2
tags: [architecture, containers, index, workflow, bot-platform]
parent: .memory-bank/spec/architecture/index.md
children:
  - core.md
  - server.md
  - workflow-host.md
  - db-and-projections.md
  - web-and-cli-surfaces.md
related_files:
  - .memory-bank/spec/architecture/container-architecture.md
history:
  - version: 0.3.0
    date: 2026-04-22
    changes: Landed the remaining framework container packet (core, server, db/projections, web/CLI surfaces) and promoted this index from a single-doc placeholder into the full packet navigator (PRT-036 Wave 151).
  - version: 0.2.0
    date: 2026-04-21
    changes: Synced container index navigation with the landed top-level container architecture packet and clarified reading order (PRT-036 Wave 115).
  - version: 0.1.0
    date: 2026-04-21
    changes: Created the repo-local container index and linked the first landed container contract (`workflow-host`) for the PRT-036 wave 98 packet.
---

# Containers Index

## Current containers

- [Core container](core.md): framework execution-kernel semantics, result/intent contracts, and runtime ownership boundaries.
- [Server container](server.md): API/webhook/control-plane ingress, composition-root rules, and thin-adapter constraints.
- [Workflow host container](workflow-host.md): durable/background orchestration boundary for long-running jobs and retries.
- [DB and projections](db-and-projections.md): persistence/projection ownership and the rule that storage does not redefine runtime semantics.
- [Web and CLI surfaces](web-and-cli-surfaces.md): framework-facing control/tooling surface boundaries over canonical contracts.

## Reading order

1. `../container-architecture.md`
2. `core.md`
3. `server.md`
4. `workflow-host.md`
5. `db-and-projections.md`
6. `web-and-cli-surfaces.md`

This order starts from the top-level container map, then walks semantics first, adapters/orchestration second, and persistence/surfaces last.
