---
file: .memory-bank/spec/architecture/containers/index.md
description: 'Container-level architecture index for framework execution and orchestration containers in bot-platform.'
purpose: Read for container-level navigation after top-level architecture boundaries and before component-level split work.
version: 0.2.0
date: 2026-04-21
status: ACTIVE
c4_level: L2
tags: [architecture, containers, index, workflow, bot-platform]
parent: .memory-bank/spec/architecture/index.md
children:
  - workflow-host.md
related_files:
  - .memory-bank/spec/architecture/container-architecture.md
history:
  - version: 0.2.0
    date: 2026-04-21
    changes: Synced container index navigation with the landed top-level container architecture packet and clarified reading order (PRT-036 Wave 115).
  - version: 0.1.0
    date: 2026-04-21
    changes: Created the repo-local container index and linked the first landed container contract (`workflow-host`) for the PRT-036 wave 98 packet.
---

# Containers Index

## Current containers

- [Workflow host container](workflow-host.md): durable/background orchestration boundary for long-running jobs and retries.

## Planned additions

As extraction continues, this index should expand with additional framework-level container docs for runtime execution, API/control-plane adapters, and persistence interfaces.

## Reading order

1. `../container-architecture.md`
2. `workflow-host.md`

This order starts from the top-level container map and then drills into the first landed container contract in `bot-platform`.
