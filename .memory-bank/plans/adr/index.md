---
file: .memory-bank/plans/adr/index.md
description: 'ADR hub for bot-platform.'
purpose: Collect long-lived framework architecture decisions that should not live only in protocols.
version: 0.6.0
date: 2026-04-23
status: ACTIVE
tags: [adr, bot-platform, planning]
parent: .memory-bank/plans/index.md
history:
  - version: 0.6.0
    date: 2026-04-23
    changes: Added ADR-005 to record the accepted three-layer product-line architecture and shared-substrate boundary for the post-split convergence program.
  - version: 0.5.0
    date: 2026-04-21
    changes: Added ADR-003 (deterministic hosted scenarios and browser automation) and updated hub wording to reflect the newly landed hosted-scenario execution decision.
  - version: 0.4.0
    date: 2026-04-21
    changes: Added ADR-004 (workspace/product-instance/pipeline/channel/environment terminology) and updated hub wording to reflect landed decisions.
  - version: 0.3.0
    date: 2026-04-20
    changes: Added ADR-002 to record the public scoped npm bridge for the first framework-safe packages after restricted npm publication proved unavailable.
  - version: 0.2.0
    date: 2026-04-20
    changes: Added ADR-001 for the private package registry bridge used by product repos during the split.
  - version: 0.1.0
    date: 2026-04-19
    changes: Created the ADR hub.
---

# ADR Hub

This section contains framework-owned architecture decisions:
- repo and package topology;
- API/SDK layering;
- auth, workflow, scenario, and persistence framework decisions;
- release and dependency bridge decisions that outlive one migration wave.

## Decisions

- [ADR-001: Private Registry Bridge For Product Repos](ADR-001-private-registry-bridge-for-product-repos.md)
- [ADR-002: Public npm Bridge For Framework Packages](ADR-002-public-npm-bridge-for-framework-packages.md)
- [ADR-003: Deterministic Hosted Scenarios And Browser Automation](ADR-003-deterministic-hosted-scenarios-and-browser-automation.md)
- [ADR-004: Workspace, Product Instance, Pipeline, Channel, And Environment Terminology](ADR-004-workspace-product-instance-pipeline-and-environment-terminology.md)
- [ADR-005: Three-Layer Product-Line Architecture And Shared-Substrate Boundary](ADR-005-three-layer-product-line-architecture-and-shared-substrate-boundary.md)
