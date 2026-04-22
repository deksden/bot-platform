---
file: .memory-bank/plans/adr/ADR-003-deterministic-hosted-scenarios-and-browser-automation.md
description: 'ADR-003: deterministic hosted scenario stack using script-first scenario primitives, Vitest orchestration, and Playwright as a governed `beta_ui` proof layer.'
purpose: Keep hosted scenario automation deterministic and framework-owned while preserving thin browser proof over canonical hosted evidence.
version: 1.0.0
date: 2026-04-21
status: ACTIVE
tags: [adr, scenarios, hosted, browser-automation, playwright, vitest, beta, bot-platform]
parent: .memory-bank/plans/adr/index.md
related_files:
  - .memory-bank/spec/scenarios/scenario-system-and-evidence.md
  - .memory-bank/spec/scenarios/hosted-beta-execution-model.md
  - .memory-bank/spec/runtime/scenario-system-framework-contract.md
  - .memory-bank/plans/verification-matrix.md
  - .memory-bank/plans/protocols/PRT-036-platform-framework-and-product-repo-split.md
history:
  - version: 1.0.0
    date: 2026-04-21
    changes: Migrated ADR-003 into bot-platform as repo-local framework planning truth and rewired references to existing framework-owned scenario docs.
---

# ADR-003: Deterministic Hosted Scenarios And Browser Automation

## Status

Accepted on `2026-03-17` in mixed-source planning, now adopted as repo-local framework ADR truth on `2026-04-21`.

## Context

The framework scenario model already has:
- a shared scenario/evidence contract;
- hosted verification classes and layering policy;
- explicit framework ownership boundaries for scenario-system contracts.

The unresolved gap was execution consistency for hosted proof:
- hosted evidence could drift into browser-heavy/manual flows;
- session/bootstrap helpers could stay ad hoc instead of reusable primitives;
- browser automation could be treated as a primary engine instead of a thin governed layer.

The framework needs a deterministic hosted execution direction that remains product-neutral and does not absorb product-local route/auth/POM truth.

## Decision

1. Hosted scenario execution is `script-first`.
2. `Vitest` remains the scenario orchestration harness for deterministic phases, assertions, and evidence collection.
3. `Playwright` is used as a `beta_ui` execution layer, not as the sole scenario engine.
4. Hosted browser checks must stay governed by explicit UI contracts and stable mappings owned at the appropriate boundary.
5. Reusable hosted primitives are first-class verification building blocks:
   - preflight;
   - auth/session bootstrap;
   - actor/session reuse;
   - seeded setup;
   - canonical read-model assertions;
   - artifact/evidence capture.
6. Hosted business truth defaults to `beta_api`.
7. `beta_ui` is used only for route protection, visible-state proof, governed selector proof, and bounded user actions.
8. `beta_external_manual` is reserved for truly external dependencies that cannot be safely automated.

## Consequences

### Positive

- hosted acceptance becomes more deterministic;
- flaky browser-only proof pressure is reduced;
- reusable hosted helpers become durable across framework verification flows;
- automation agents can execute deterministic scripts instead of reproducing full manual operator behavior;
- governed browser mapping yields practical verification value instead of documentation-only value.

### Trade-offs

- browser/runtime shell integration adds one more implementation layer;
- bootstrap/session helper governance must stay disciplined;
- existing hosted scenario implementations may need migration to this model.

## Rejected alternatives

### Browser as primary hosted truth source

Rejected because browser-heavy proof is less deterministic and weakens canonical evidence quality for failure analysis.

### Manual hosted execution as default

Rejected because repeatability, scale, and reliable artifact generation degrade when manual steps become the standard path.

## Non-decisions

This ADR does not mandate:
- full visual-regression coverage;
- cross-browser matrix coverage;
- browser automation for every hosted scenario;
- elimination of manual external-channel proofs when external systems are inherently non-deterministic.

## Alignment

This ADR is a planning decision aligned with:
- [Scenario system and evidence](../../spec/scenarios/scenario-system-and-evidence.md) for shared taxonomy/evidence semantics;
- [Hosted beta execution model](../../spec/scenarios/hosted-beta-execution-model.md) for hosted-layer policy;
- [Scenario system framework contract](../../spec/runtime/scenario-system-framework-contract.md) for ownership boundaries.

It does not redefine product ownership of product-specific hosted auth/bootstrap, route maps, selector registries, or product POM implementations.
