---
file: .memory-bank/spec/project/index.md
description: 'Project docs hub for bot-platform with repo-shape, ownership boundaries, and high-level project architecture framing.'
purpose: Navigate framework project architecture direction, repo structure, and feature-area ownership for the framework monorepo.
version: 0.2.0
date: 2026-04-22
status: ACTIVE
tags: [project, architecture, repo-structure, bot-platform]
parent: .memory-bank/spec/index.md
children:
  - agent-execution-platform-architecture.md
  - repo-structure.md
  - feature-area-boundaries.md
history:
  - version: 0.2.0
    date: 2026-04-22
    changes: Added the repo-local project architecture framing doc and promoted this hub from placeholder text to active project documentation navigation (PRT-036 Wave 145).
  - version: 0.1.0
    date: 2026-04-19
    changes: Initial draft project docs hub for bot-platform.
---

# Project Hub

This section holds project-level framework truth for `bot-platform`.
It complements `spec/architecture/*` by keeping repo-shape and ownership framing in one navigable place.

## Current project docs

- [Agent execution platform architecture](agent-execution-platform-architecture.md): high-level project architecture framing for execution/control/evaluation/platform planes and framework-vs-product boundary invariants. Read first when aligning architectural direction without duplicating `spec/architecture/*`.
- [Repo structure](repo-structure.md): target monorepo shape, package placement rules, and scope/naming policy for framework-owned packages.
- [Feature area boundaries](feature-area-boundaries.md): framework ownership map and explicit non-owner areas that must stay product-local.

## Scope rule

Project docs in this folder must stay framework-scoped:
- include repo ownership and reusable architecture direction;
- exclude product-domain behavior, product deployment truth, and product runbook overlays.
