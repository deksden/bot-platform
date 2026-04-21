---
file: .memory-bank/spec/architecture/index.md
description: 'Architecture hub for bot-platform: boundaries, container surfaces, and top-level framework ownership rules.'
purpose: Read first for framework architecture, vocabulary, top-level boundaries, container-level seams, and placement rules.
version: 0.3.0
date: 2026-04-21
status: ACTIVE
tags: [architecture, bot-platform, framework]
parent: .memory-bank/spec/index.md
children:
  - boundaries.md
  - platform-glossary.md
  - system-context.md
  - container-architecture.md
  - dependency-and-placement-rules.md
  - containers/index.md
history:
  - version: 0.3.0
    date: 2026-04-21
    changes: Landed the framework architecture packet (platform glossary, system context, container architecture, dependency/placement rules) and linked it as canonical repo-local architecture truth (PRT-036 Wave 115).
  - version: 0.2.0
    date: 2026-04-21
    changes: Added the container-level architecture surface and linked the repo-local workflow-host container contract (PRT-036 wave 98).
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial architecture hub for bot-platform.
---

# Architecture Hub

This section holds canonical framework architecture for `bot-platform`.

Current canonical docs:
- [Framework boundaries](boundaries.md)
- [Platform glossary](platform-glossary.md)
- [System context](system-context.md)
- [Container architecture](container-architecture.md)
- [Dependency and placement rules](dependency-and-placement-rules.md)
- [Containers index](containers/index.md)
- [Workflow host container](containers/workflow-host.md)

Scope:
- framework vocabulary;
- repo and package boundaries;
- reusable kernels and contracts;
- what product repos may import from `bot-platform`.
