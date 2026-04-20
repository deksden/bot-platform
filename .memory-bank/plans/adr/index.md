---
file: .memory-bank/plans/adr/index.md
description: 'ADR hub for bot-platform.'
purpose: Collect long-lived framework architecture decisions that should not live only in protocols.
version: 0.2.0
date: 2026-04-20
status: ACTIVE
tags: [adr, bot-platform, planning]
parent: .memory-bank/plans/index.md
history:
  - version: 0.2.0
    date: 2026-04-20
    changes: Added ADR-001 for the private package registry bridge used by product repos during the split.
  - version: 0.1.0
    date: 2026-04-19
    changes: Created the ADR hub.
---

# ADR Hub

This section will contain framework-owned architecture decisions:
- repo and package topology;
- API/SDK layering;
- auth, workflow, scenario, and persistence framework decisions;
- release and dependency bridge decisions that outlive one migration wave.

## Decisions

- [ADR-001: Private Registry Bridge For Product Repos](ADR-001-private-registry-bridge-for-product-repos.md)
